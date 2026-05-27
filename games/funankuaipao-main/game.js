const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const progressFill = document.getElementById('progressFill');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const shootBtn = document.getElementById('shootBtn');
const restartBtn = document.getElementById('restartBtn');
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');
const historyList = document.getElementById('historyList');
const bestScoreEl = document.getElementById('bestScore');
const resetHistoryBtn = document.getElementById('resetHistoryBtn');
const themeToggle = document.getElementById('themeToggle');

const WORLD = {
    width: 400,
    height: 600,
    lanes: 4
};

const config = {
    bossTriggerScore: 2000,
    bossMaxHp: 1000,
    playerDamage: 20,
    shootCooldown: 170,
    baseSpeed: 170,
    maxSpeed: 460,
    playerSpeed: 560,
    obstacleEvery: 660,
    buffEvery: 5200,
    buffPoints: 100,
    invincibleAfterHit: 700
};

const HISTORY_KEY = 'researchFlightHistory';
const HISTORY_LIMIT = 10;
const THEME_KEY = 'researchFlightTheme';
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

const assets = {
    player: document.getElementById('playerImg'),
    bg: document.getElementById('bgImg'),
    obstacle: document.getElementById('obstacleImg'),
    buff: document.getElementById('buffImg'),
    buffEaten: document.getElementById('buffEatenImg'),
    announcement: document.getElementById('announcementImg'),
    boss: document.getElementById('bossImg'),
    bullet500: document.getElementById('bullet500Img'),
    bulletStar: document.getElementById('bulletStarImg')
};

const keys = {
    left: false,
    right: false
};

let dpr = 1;
let gameActive = false;
let gameEnded = false;
let score = 0;
let bgOffset = 0;
let lastTime = 0;
let elapsed = 0;
let obstacleTimer = 0;
let buffTimer = 1800;
let messageTimer = 0;
let flashTimer = 0;
let networkWarningTimer = 0;
let combo = 0;
let lastObstacleLane = -1;
let bossIntro = false;
let bossActive = false;
let bossDefeated = false;
let bossBulletMode = '500';
let bossModeTimer = 0;
let bossBulletTimer = 0;
let shootTimer = 0;

const obstacles = [];
const buffs = [];
const particles = [];
const playerShots = [];
const bossBullets = [];

const player = {
    x: WORLD.width / 2,
    y: WORLD.height - 106,
    width: 74,
    height: 96,
    targetX: WORLD.width / 2,
    lane: 1,
    invincible: 0
};

const boss = {
    x: WORLD.width / 2,
    y: 34,
    width: 132,
    height: 118,
    hp: config.bossMaxHp,
    direction: 1
};

function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(WORLD.width * dpr);
    canvas.height = Math.round(WORLD.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function laneWidth() {
    return WORLD.width / WORLD.lanes;
}

function laneCenter(lane) {
    return laneWidth() * lane + laneWidth() / 2;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function lerp(from, to, amount) {
    return from + (to - from) * amount;
}

function setScore(value) {
    score = Math.max(0, Math.floor(value));
    scoreEl.textContent = score;
    progressFill.style.width = `${Math.min(100, score / config.bossTriggerScore * 100)}%`;
}

function currentLevel() {
    return Math.min(8, Math.floor(elapsed / 14000) + 1);
}

function currentSpeed() {
    const secondsAlive = elapsed / 1000;
    return Math.min(config.maxSpeed, config.baseSpeed + secondsAlive * 5.4);
}

function loadHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

function systemTheme() {
    return systemThemeQuery.matches ? 'dark' : 'light';
}

function storedTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_KEY);
        return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
    } catch (error) {
        return null;
    }
}

function applyTheme(theme, source = 'system') {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themeSource = source;
    themeToggle.textContent = theme === 'dark' ? '亮色' : '暗色';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换亮色模式' : '切换暗色模式');
    themeToggle.title = source === 'system' ? '当前跟随系统主题' : '当前使用手动主题';
}

function loadTheme() {
    const savedTheme = storedTheme();
    applyTheme(savedTheme ?? systemTheme(), savedTheme ? 'manual' : 'system');
}

function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
        localStorage.setItem(THEME_KEY, nextTheme);
    } catch (error) {
        // 主题偏好写入失败时仍允许本次切换生效。
    }
    applyTheme(nextTheme, 'manual');
}

function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(rankHistory(history).slice(0, HISTORY_LIMIT)));
    } catch (error) {
        // 历史记录写入失败时不阻断游戏主流程。
    }
}

function rankHistory(history) {
    return [...history].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (Number(b.won) !== Number(a.won)) return Number(b.won) - Number(a.won);
        return b.createdAt - a.createdAt;
    });
}

function formatHistoryTime(timestamp) {
    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(timestamp));
}

function renderHistory() {
    const history = rankHistory(loadHistory());
    const bestScore = history[0]?.score ?? 0;
    bestScoreEl.textContent = bestScore;

    if (!history.length) {
        historyList.innerHTML = '<li class="history-empty">暂无战绩<br>完成一局后会自动记录</li>';
        return;
    }

    historyList.innerHTML = history.map((item, index) => `
        <li class="history-item">
            <span class="history-rank">#${index + 1}</span>
            <span class="history-score">${item.score}</span>
            <span class="history-meta">${item.won ? '打败bvvd了' : '网络状况不佳'} · ${formatHistoryTime(item.createdAt)}</span>
        </li>
    `).join('');
}

function resetHistory() {
    try {
        localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        // 历史记录清理失败时保持界面可用。
    }
    renderHistory();
}

function recordHistory(won) {
    const history = loadHistory();
    history.push({
        score,
        won,
        createdAt: Date.now()
    });
    saveHistory(history);
    renderHistory();
}

function hitbox(entity, shrink) {
    return {
        x: entity.x - entity.width / 2 + entity.width * shrink.x,
        y: entity.y + entity.height * shrink.top,
        width: entity.width * (1 - shrink.x * 2),
        height: entity.height * (1 - shrink.top - shrink.bottom)
    };
}

function intersects(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function drawRoundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
}

function drawWrappedText(text, x, y, maxWidth, lineHeight) {
    const chars = [...text];
    let line = '';
    let currentY = y;

    chars.forEach((char) => {
        const testLine = line + char;
        if (ctx.measureText(testLine).width > maxWidth && line) {
            ctx.fillText(line, x, currentY);
            line = char;
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    });

    if (line) ctx.fillText(line, x, currentY);
    return currentY;
}

function drawImageCover(img, x, y, width, height) {
    if (!img || !img.complete || !img.naturalWidth) {
        ctx.fillStyle = '#0a1220';
        ctx.fillRect(x, y, width, height);
        return;
    }

    const imageRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = width / height;
    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;

    if (imageRatio > targetRatio) {
        sw = img.naturalHeight * targetRatio;
        sx = (img.naturalWidth - sw) / 2;
    } else {
        sh = img.naturalWidth / targetRatio;
        sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
}

function heightForImageWidth(img, width, fallbackHeight) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return fallbackHeight;
    return width * img.naturalHeight / img.naturalWidth;
}

function drawBackground(delta) {
    bgOffset = (bgOffset + currentSpeed() * 0.18 * delta) % WORLD.height;
    drawImageCover(assets.bg, 0, bgOffset, WORLD.width, WORLD.height);
    drawImageCover(assets.bg, 0, bgOffset - WORLD.height, WORLD.width, WORLD.height);

    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = '#75dcff';
    ctx.lineWidth = 1;
    ctx.setLineDash([12, 18]);
    for (let lane = 1; lane < WORLD.lanes; lane++) {
        const x = laneWidth() * lane;
        ctx.beginPath();
        ctx.moveTo(x, -20);
        ctx.lineTo(x, WORLD.height + 20);
        ctx.stroke();
    }
    ctx.restore();

    const gradient = ctx.createLinearGradient(0, 0, 0, WORLD.height);
    gradient.addColorStop(0, 'rgba(3, 8, 15, 0.14)');
    gradient.addColorStop(0.82, 'rgba(3, 8, 15, 0.05)');
    gradient.addColorStop(1, 'rgba(3, 8, 15, 0.42)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
}

function drawPlayer() {
    const pulse = player.invincible > 0 ? Math.sin(elapsed / 60) * 0.38 + 0.62 : 1;
    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.shadowColor = 'rgba(101, 231, 255, 0.5)';
    ctx.shadowBlur = 18;
    ctx.drawImage(
        assets.player,
        player.x - player.width / 2,
        player.y,
        player.width,
        player.height
    );
    ctx.restore();
}

function drawObstacle(obstacle) {
    const drawHeight = heightForImageWidth(assets.obstacle, obstacle.width, obstacle.height);
    ctx.save();
    ctx.shadowColor = 'rgba(255, 93, 115, 0.34)';
    ctx.shadowBlur = 12;
    ctx.drawImage(
        assets.obstacle,
        obstacle.x - obstacle.width / 2,
        obstacle.y,
        obstacle.width,
        drawHeight
    );
    ctx.restore();
}

function drawBuff(buff) {
    const img = buff.collected ? assets.buffEaten : assets.buff;
    const bob = Math.sin((elapsed + buff.seed) / 160) * 4;
    const drawWidth = buff.width;
    const drawHeight = buff.collected
        ? heightForImageWidth(img, drawWidth, buff.height)
        : buff.height;
    ctx.save();
    ctx.shadowColor = 'rgba(255, 209, 102, 0.45)';
    ctx.shadowBlur = buff.collected ? 4 : 18;
    ctx.drawImage(img, buff.x - drawWidth / 2, buff.y + bob, drawWidth, drawHeight);
    ctx.restore();
}

function drawBoss() {
    if (!bossActive) return;

    ctx.save();
    ctx.shadowColor = 'rgba(239, 68, 68, 0.34)';
    ctx.shadowBlur = 18;
    ctx.drawImage(
        assets.boss,
        boss.x - boss.width / 2,
        boss.y,
        boss.width,
        boss.height
    );
    ctx.restore();

    const barWidth = boss.width;
    const barHeight = 8;
    const hpRatio = Math.max(0, boss.hp / config.bossMaxHp);
    const barX = boss.x - barWidth / 2;
    const barY = boss.y - 14;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    drawRoundedRect(barX, barY, barWidth, barHeight, 4);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    drawRoundedRect(barX, barY, barWidth * hpRatio, barHeight, 4);
    ctx.fill();
    ctx.restore();
}

function drawNetworkWarning() {
    if (networkWarningTimer <= 0) return;

    ctx.save();
    ctx.globalAlpha = 0.14 + Math.abs(Math.sin(elapsed / 90)) * 0.18;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    ctx.globalAlpha = Math.min(1, networkWarningTimer / 300);
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'center';
    ctx.font = '700 30px "Microsoft YaHei", Arial';
    ctx.fillText('网络状况不佳', WORLD.width / 2, WORLD.height / 2 - 12);
    ctx.restore();
}

function drawMessage() {
    if (messageTimer <= 0) return;

    const alpha = Math.min(1, messageTimer / 260);
    const width = 156;
    const height = heightForImageWidth(assets.announcement, width, 48);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(assets.announcement, WORLD.width / 2 - width / 2, 112, width, height);
    ctx.restore();
}

function drawEndScreen(title, subtitle, tone) {
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.setLineDash([]);
    ctx.fillStyle = tone === 'win' ? 'rgba(2, 34, 38, 0.9)' : 'rgba(38, 6, 12, 0.9)';
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    ctx.fillStyle = tone === 'win' ? '#65e7ff' : '#ff6b7e';
    drawRoundedRect(42, 184, WORLD.width - 84, 208, 8);
    ctx.fill();

    ctx.fillStyle = 'rgba(5, 10, 16, 0.92)';
    drawRoundedRect(46, 188, WORLD.width - 92, 200, 8);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = tone === 'win' ? '#65e7ff' : '#ff6b7e';
    ctx.font = '700 30px "Microsoft YaHei", Arial';
    ctx.fillText(title, WORLD.width / 2, 252);
    ctx.fillStyle = '#f5fbff';
    ctx.font = '17px "Microsoft YaHei", Arial';
    const subtitleBottom = drawWrappedText(subtitle, WORLD.width / 2, 294, WORLD.width - 96, 24);
    ctx.fillStyle = 'rgba(245, 251, 255, 0.78)';
    ctx.font = '14px "Microsoft YaHei", Arial';
    ctx.fillText('按 Enter 重新开始', WORLD.width / 2, Math.max(348, subtitleBottom + 42));
    ctx.restore();
}

function drawStartScreen() {
    drawBackground(0);
    player.x = WORLD.width / 2;
    player.targetX = WORLD.width / 2;
    drawPlayer();

    ctx.save();
    ctx.fillStyle = 'rgba(5, 10, 16, 0.38)';
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    ctx.restore();
}

function isLaneOccupied(lane, minY, maxY, collection) {
    return collection.some((item) =>
        item.lane === lane &&
        !item.collected &&
        item.y > minY &&
        item.y < maxY
    );
}

function spawnObstacle() {
    const blockedCount = currentLevel() >= 3 && Math.random() < 0.34 ? 2 : 1;
    const lanes = [...Array(WORLD.lanes).keys()].filter((lane) =>
        !isLaneOccupied(lane, -150, 190, buffs)
    );
    const selected = [];

    const repeatedLaneIndex = lanes.indexOf(lastObstacleLane);
    if (repeatedLaneIndex >= 0 && lanes.length > blockedCount) {
        lanes.splice(repeatedLaneIndex, 1);
    }

    while (selected.length < blockedCount && lanes.length) {
        const index = Math.floor(Math.random() * lanes.length);
        selected.push(lanes.splice(index, 1)[0]);
    }

    selected.forEach((lane, index) => {
        obstacles.push({
            type: 'obstacle',
            lane,
            x: laneCenter(lane),
            y: -90 - index * 20,
            width: blockedCount > 1 ? 14 : 17,
            height: heightForImageWidth(assets.obstacle, blockedCount > 1 ? 14 : 17, 60)
        });
    });

    lastObstacleLane = selected[0] ?? lastObstacleLane;
    return selected.length > 0;
}

function spawnBuff() {
    const safeLanes = [...Array(WORLD.lanes).keys()].filter((lane) => {
        return !isLaneOccupied(lane, -190, 260, obstacles) &&
            !isLaneOccupied(lane, -120, 160, buffs);
    });
    if (!safeLanes.length) return false;

    const lane = safeLanes.length
        ? safeLanes[Math.floor(Math.random() * safeLanes.length)]
        : Math.floor(Math.random() * WORLD.lanes);

    buffs.push({
        type: 'buff',
        lane,
        x: laneCenter(lane),
        y: -74,
        width: 66,
        height: 66,
        collected: false,
        seed: Math.random() * 1000
    });
    return true;
}

function startBossIntro() {
    bossIntro = true;
    networkWarningTimer = 1600;
    obstacles.length = 0;
    buffs.length = 0;
    boss.x = WORLD.width / 2;
    boss.y = 34;
    boss.hp = config.bossMaxHp;
    boss.direction = 1;
}

function activateBoss() {
    bossIntro = false;
    bossActive = true;
    bossBulletMode = '500';
    bossModeTimer = 3600;
    bossBulletTimer = 900;
}

function firePlayerShot() {
    if (!gameActive || !bossActive || shootTimer > 0) return;

    shootTimer = config.shootCooldown;
    playerShots.push({
        x: player.x,
        y: player.y + 14,
        width: 6,
        height: 18,
        vy: -560
    });
}

function spawnBossBullet(type) {
    const fromX = boss.x + (Math.random() - 0.5) * boss.width * 0.62;
    const fromY = boss.y + boss.height - 8;

    if (type === '500') {
        const width = 34;
        bossBullets.push({
            type,
            x: fromX,
            y: fromY,
            width,
            height: heightForImageWidth(assets.bullet500, width, 26),
            vx: (Math.random() < 0.5 ? -1 : 1) * (130 + Math.random() * 70),
            vy: 175 + Math.random() * 55
        });
        return;
    }

    bossBullets.push({
        type,
        x: fromX,
        y: fromY,
        width: 30,
        height: 30,
        vx: 0,
        vy: 220 + Math.random() * 70
    });
}

function drawPlayerShot(shot) {
    ctx.save();
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = 'rgba(249, 115, 22, 0.72)';
    ctx.shadowBlur = 10;
    drawRoundedRect(shot.x - shot.width / 2, shot.y, shot.width, shot.height, 3);
    ctx.fill();
    ctx.restore();
}

function drawBossBullet(bullet) {
    const img = bullet.type === '500' ? assets.bullet500 : assets.bulletStar;
    ctx.drawImage(img, bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height);
}

function updateBoss(delta) {
    if (bossIntro) {
        networkWarningTimer -= delta * 1000;
        if (networkWarningTimer <= 0) activateBoss();
        return;
    }

    if (!bossActive) return;

    boss.x += boss.direction * 86 * delta;
    const minX = boss.width / 2 + 10;
    const maxX = WORLD.width - boss.width / 2 - 10;
    if (boss.x <= minX || boss.x >= maxX) {
        boss.x = clamp(boss.x, minX, maxX);
        boss.direction *= -1;
    }

    bossModeTimer -= delta * 1000;
    if (bossModeTimer <= 0) {
        bossBulletMode = bossBulletMode === '500' ? 'star' : '500';
        bossModeTimer = bossBulletMode === '500' ? 3600 : 3000;
        bossBulletTimer = 450;
    }

    bossBulletTimer -= delta * 1000;
    if (bossBulletTimer <= 0) {
        spawnBossBullet(bossBulletMode);
        bossBulletTimer = bossBulletMode === '500'
            ? Math.max(760, 1350 - elapsed / 180)
            : Math.max(620, 1120 - elapsed / 190);
    }
}

function addParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 120,
            vy: -Math.random() * 110 - 30,
            life: 420,
            color
        });
    }
}

function updateParticles(delta) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.life -= delta * 1000;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy += 260 * delta;

        if (particle.life <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, particle.life / 420);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function updatePlayer(delta) {
    const keyboardDirection = Number(keys.right) - Number(keys.left);
    if (keyboardDirection !== 0) {
        player.targetX += keyboardDirection * config.playerSpeed * delta;
        player.targetX = clamp(player.targetX, player.width / 2 + 8, WORLD.width - player.width / 2 - 8);
    }

    player.x = lerp(player.x, player.targetX, Math.min(1, delta * 12));
    player.lane = clamp(Math.round((player.x - laneWidth() / 2) / laneWidth()), 0, WORLD.lanes - 1);

    if (player.invincible > 0) {
        player.invincible -= delta * 1000;
    }
}

function updatePlayerShots(delta) {
    if (shootTimer > 0) shootTimer -= delta * 1000;

    for (let i = playerShots.length - 1; i >= 0; i--) {
        const shot = playerShots[i];
        shot.y += shot.vy * delta;
        drawPlayerShot(shot);

        if (bossActive) {
            const shotBox = {
                x: shot.x - shot.width / 2,
                y: shot.y,
                width: shot.width,
                height: shot.height
            };
            const bossBox = hitbox(boss, { x: 0.12, top: 0.08, bottom: 0.08 });
            if (intersects(shotBox, bossBox)) {
                playerShots.splice(i, 1);
                boss.hp -= config.playerDamage;
                setScore(score + config.playerDamage);
                addParticles(shot.x, shot.y, '#ef4444');
                if (boss.hp <= 0) {
                    boss.hp = 0;
                    bossDefeated = true;
                    endGame(true);
                    return;
                }
                continue;
            }
        }

        if (shot.y < -30) {
            playerShots.splice(i, 1);
        }
    }
}

function updateBossBullets(delta) {
    const playerBox = hitbox(player, { x: 0.27, top: 0.24, bottom: 0.18 });

    for (let i = bossBullets.length - 1; i >= 0; i--) {
        const bullet = bossBullets[i];
        bullet.x += bullet.vx * delta;
        bullet.y += bullet.vy * delta;

        if (bullet.type === '500') {
            const left = bullet.width / 2;
            const right = WORLD.width - bullet.width / 2;
            if (bullet.x <= left || bullet.x >= right) {
                bullet.x = clamp(bullet.x, left, right);
                bullet.vx *= -1;
            }
        }

        drawBossBullet(bullet);

        const bulletBox = hitbox(bullet, { x: 0.16, top: 0.16, bottom: 0.12 });
        if (player.invincible <= 0 && intersects(playerBox, bulletBox)) {
            endGame(false);
            return;
        }

        if (bullet.y > WORLD.height + 70) {
            bossBullets.splice(i, 1);
        }
    }
}

function updateObjects(delta) {
    const speed = currentSpeed();
    obstacleTimer -= delta * 1000;
    buffTimer -= delta * 1000;

    if (score >= config.bossTriggerScore && !bossIntro && !bossActive && !bossDefeated) {
        startBossIntro();
    }

    if (bossIntro || bossActive) {
        updateBoss(delta);
        if (!gameActive) return;
        drawBoss();
        updateBossBullets(delta);
        if (!gameActive) return;
        updatePlayerShots(delta);
        return;
    }

    if (obstacleTimer <= 0) {
        const spawned = spawnObstacle();
        obstacleTimer = spawned
            ? Math.max(320, config.obstacleEvery - (currentLevel() - 1) * 46)
            : 130;
    }

    if (buffTimer <= 0) {
        const spawned = spawnBuff();
        buffTimer = spawned
            ? Math.max(3600, config.buffEvery - currentLevel() * 110)
            : 650;
    }

    const playerBox = hitbox(player, { x: 0.27, top: 0.24, bottom: 0.18 });

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.y += speed * delta;
        drawObstacle(obstacle);

        const obstacleBox = hitbox(obstacle, { x: 0.1, top: 0.08, bottom: 0.04 });
        if (player.invincible <= 0 && intersects(playerBox, obstacleBox)) {
            endGame(false);
            return;
        }

        if (obstacle.y > WORLD.height + 120) {
            obstacles.splice(i, 1);
        }
    }

    for (let i = buffs.length - 1; i >= 0; i--) {
        const buff = buffs[i];
        buff.y += speed * 0.88 * delta;
        drawBuff(buff);

        const buffBox = hitbox(buff, { x: 0.22, top: 0.2, bottom: 0.18 });
        if (!buff.collected && intersects(playerBox, buffBox)) {
            buff.collected = true;
            combo += 2;
            messageTimer = 900;
            flashTimer = 160;
            setScore(score + config.buffPoints);
            addParticles(buff.x, buff.y + 28, '#ffd166');
        }

        if (buff.y > WORLD.height + 90 || (buff.collected && buff.y > player.y + 60)) {
            buffs.splice(i, 1);
        }
    }
}

function drawEffects(delta) {
    if (messageTimer > 0) {
        messageTimer -= delta * 1000;
    }

    if (flashTimer > 0) {
        flashTimer -= delta * 1000;
        ctx.save();
        ctx.globalAlpha = Math.max(0, flashTimer / 320);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(0, 0, WORLD.width, WORLD.height);
        ctx.restore();
    }

    updateParticles(delta);
    drawMessage();
    drawNetworkWarning();
}

function endGame(won) {
    if (gameEnded) return;
    gameActive = false;
    gameEnded = true;
    keys.left = false;
    keys.right = false;
    restartBtn.classList.add('is-visible');
    recordHistory(won);

    if (won) {
        const title = 'Boss 已击败';
        const subtitle = '你打败了邪恶的bvvd，你现在是一个合格的黑奴了';
        drawEndScreen(title, subtitle, 'win');
        window.setTimeout(() => drawEndScreen(title, subtitle, 'win'), 60);
    } else {
        const title = 'Man!';
        const subtitle = `最终研发点：${score}`;
        drawEndScreen(title, subtitle, 'lose');
        window.setTimeout(() => drawEndScreen(title, subtitle, 'lose'), 60);
    }
}

function resetGame() {
    gameActive = true;
    gameEnded = false;
    restartBtn.classList.remove('is-visible');
    startOverlay.classList.add('is-hidden');
    elapsed = 0;
    lastTime = performance.now();
    obstacleTimer = 400;
    buffTimer = 2100;
    messageTimer = 0;
    flashTimer = 0;
    networkWarningTimer = 0;
    combo = 0;
    lastObstacleLane = -1;
    bossIntro = false;
    bossActive = false;
    bossDefeated = false;
    bossBulletMode = '500';
    bossModeTimer = 0;
    bossBulletTimer = 0;
    shootTimer = 0;
    bgOffset = 0;
    obstacles.length = 0;
    buffs.length = 0;
    particles.length = 0;
    playerShots.length = 0;
    bossBullets.length = 0;
    boss.x = WORLD.width / 2;
    boss.y = 34;
    boss.hp = config.bossMaxHp;
    boss.direction = 1;
    player.x = WORLD.width / 2;
    player.targetX = WORLD.width / 2;
    player.lane = 1;
    player.invincible = config.invincibleAfterHit;
    keys.left = false;
    keys.right = false;
    setScore(0);
    requestAnimationFrame(animate);
}

function animate(timestamp) {
    if (!gameActive) return;

    if (!lastTime) lastTime = timestamp;
    const delta = Math.min(0.033, (timestamp - lastTime) / 1000);
    lastTime = timestamp;
    elapsed += delta * 1000;

    drawBackground(delta);
    updatePlayer(delta);
    updateObjects(delta);
    if (!gameActive) return;
    drawPlayer();
    drawEffects(delta);

    if (gameActive) requestAnimationFrame(animate);
}

function changeLane(direction) {
    const nextLane = clamp(player.lane + direction, 0, WORLD.lanes - 1);
    player.lane = nextLane;
    player.targetX = laneCenter(nextLane);
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') keys.left = true;
    if (event.code === 'ArrowRight' || event.code === 'KeyD') keys.right = true;
    if (!gameActive && event.code === 'Enter') resetGame();
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') keys.left = false;
    if (event.code === 'ArrowRight' || event.code === 'KeyD') keys.right = false;
});

function bindMobileButton(button, direction) {
    const setPressed = (pressed) => {
        if (!gameActive) {
            if (pressed) resetGame();
            return;
        }

        if (direction < 0) keys.left = pressed;
        if (direction > 0) keys.right = pressed;
    };

    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        setPressed(true);
    }, { passive: false });

    button.addEventListener('touchend', (event) => {
        event.preventDefault();
        setPressed(false);
    }, { passive: false });

    button.addEventListener('touchcancel', (event) => {
        event.preventDefault();
        setPressed(false);
    }, { passive: false });
}

bindMobileButton(leftBtn, -1);
bindMobileButton(rightBtn, 1);

function bindShootButton(button) {
    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        firePlayerShot();
    }, { passive: false });
}

bindShootButton(shootBtn);

resetHistoryBtn.addEventListener('click', resetHistory);

themeToggle.addEventListener('click', toggleTheme);

restartBtn.addEventListener('click', resetGame);

systemThemeQuery.addEventListener('change', () => {
    if (!storedTheme()) applyTheme(systemTheme(), 'system');
});

startBtn.addEventListener('click', () => {
    resetGame();
});

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0 && gameActive) firePlayerShot();
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

window.addEventListener('resize', () => {
    resizeCanvas();
    if (!gameActive && !gameEnded) drawStartScreen();
});

resizeCanvas();
loadTheme();
setScore(0);
renderHistory();
drawStartScreen();

window.gameDemo = {
    startBoss() {
        resetGame();
        setScore(config.bossTriggerScore);
        startBossIntro();
    },
    defeatBoss() {
        if (!gameActive) resetGame();
        bossIntro = false;
        bossActive = true;
        boss.hp = 0;
        endGame(true);
    },
    shoot() {
        firePlayerShot();
    }
};

if (new URLSearchParams(window.location.search).get('demo') === 'boss') {
    window.setTimeout(() => {
        window.gameDemo.startBoss();
        window.setTimeout(() => {
            for (let i = 0; i < 8; i++) window.gameDemo.shoot();
        }, 2200);
        window.setTimeout(() => {
            window.gameDemo.defeatBoss();
        }, 3300);
    }, 500);
}
