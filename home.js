function parseMessages(text) {
    const groups = [];
    let current = null;

    text.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const dateMatch = trimmed.match(/^\[(.+)]$/);
        if (dateMatch) {
            current = { date: dateMatch[1], messages: [] };
            groups.push(current);
            return;
        }

        if (!current) {
            current = { date: "未注明日期", messages: [] };
            groups.push(current);
        }
        current.messages.push(trimmed);
    });

    return groups.filter((group) => group.messages.length);
}

function renderMessages(groups) {
    const container = document.getElementById("message-list");
    if (!container) return;

    if (!groups.length) {
        container.innerHTML = '<p class="message-loading">暂无留言。</p>';
        return;
    }

    const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));

    container.innerHTML = groups.map((group) => `
        <article class="message-group">
            <time>${escapeHtml(group.date)}</time>
            ${group.messages.map((message) => `<p>${escapeHtml(message)}</p>`).join("")}
        </article>
    `).join("");
}

fetch("messages.txt", { cache: "no-store" })
    .then((response) => {
        if (!response.ok) throw new Error("messages.txt not found");
        return response.text();
    })
    .then((text) => renderMessages(parseMessages(text)))
    .catch(() => {
        renderMessages([{
            date: "本地预览提示",
            messages: ["如果直接用 file:// 打开页面，浏览器可能会阻止读取 txt。请使用本地服务或部署后访问。"]
        }]);
    });
