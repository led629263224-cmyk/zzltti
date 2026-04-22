// ==========================================
// 陆战数据区
// ==========================================
const groundQuizData = [
    { type: "choice", q: "第一部分 Q1. 新版本更新，你登录游戏做的第一件事是？", options: [ { text: "A. 打开载具预览，看哪个权重强势、装甲厚、好上手", targets: ["轮椅者"] }, { text: "B. 看飞机有什么新挂载或新机制，能不能舔地更爽", targets: ["CAS者"] }, { text: "C. 找一辆各项指标均衡的载具，能打能跑能抗", targets: ["性能者"] }, { text: "D. 不管版本，继续开我的本命弱鸡载具", targets: ["赤石者"] }, { text: "E. 研究新载具的独特机制和非常规打法", targets: ["裸奔者", "绕侧者"] }, { text: "F. 看新防空车能不能对付新出的CAS", targets: ["防空者"] }, { text: "G. 看新空优战机能不能制霸高空", targets: ["制空者"] } ] },
    { type: "choice", q: "第一部分 Q2. 陆战出击，你的第一辆出生载具通常是？", options: [ { text: "A. 重装甲主战坦克，能扛线能推进", targets: ["轮椅者"] }, { text: "B. 轻坦或轮式战车，直奔地图边缘", targets: ["绕侧者"] }, { text: "C. 均衡型主战坦克，根据局势调整打法", targets: ["性能者"] }, { text: "D. 纸糊装甲但炮还行的坦歼", targets: ["裸奔者"] }, { text: "E. 公认的版本陷阱，但我爱它", targets: ["赤石者"] }, { text: "F. 直接上攻击机/直升机", targets: ["CAS者"] }, { text: "G. 防空车，先确保头顶安全", targets: ["防空者"] }, { text: "H. 空优战机，先拿下制空权", targets: ["制空者"] } ] },
    { type: "choice", q: "第一部分 Q3. 当你被敌方CAS炸死，你的第一反应是？", options: [ { text: "A. 换条路线，继续出地面载具，他总不可能一直炸我", targets: ["轮椅者", "赤石者"] }, { text: "B. 上防空车，不把他打下来我不出车", targets: ["防空者"] }, { text: "C. 上飞机，用空战把他揍下来", targets: ["制空者"] }, { text: "D. 上飞机，炸回去，让他也尝尝被舔的滋味", targets: ["CAS者"] }, { text: "E. 记住他的ID，找机会绕后偷他", targets: ["绕侧者", "裸奔者"] } ] },
    { type: "choice", q: "第一部分 Q4. 你最喜欢的地图风格是？", options: [ { text: "A. 城市巷战，转角遇到爱，容错率高", targets: ["轮椅者"] }, { text: "B. 开阔大地图，有无数绕侧路线", targets: ["绕侧者"] }, { text: "C. 无所谓，我能在任何地图找到击杀角度", targets: ["性能者", "裸奔者"] }, { text: "D. 我讨厌的地图列表比喜欢的多，但照打不误", targets: ["赤石者"] } ] },
    { type: "choice", q: "第一部分 Q5. 当你发现一条没人守的侧袭路线，但需要绕路3分钟，你会？", options: [ { text: "A. 毫不犹豫绕过去，这是绝佳机会", targets: ["绕侧者"] }, { text: "B. 视载具机动性而定，跑得动就去", targets: ["性能者", "裸奔者"] }, { text: "C. 太费时间，不如正面扛线", targets: ["轮椅者"] }, { text: "D. 标记给队友，自己继续当前位置", targets: ["防空者"] } ] },
    { type: "choice", q: "第一部分 Q6. 你如何定义一局游戏的“成功”？", options: [ { text: "A. 自己杀得爽，数据好看就行，输赢随缘", targets: ["CAS者", "裸奔者"] }, { text: "B. 团队赢了，我哪怕零杀也开心", targets: ["防空者"] }, { text: "C. 团队赢且我数据排前三", targets: ["性能者"] }, { text: "D. 用垃圾载具反杀了一个强势载具，够我吹一天", targets: ["赤石者"] }, { text: "E. 一整局没有敌方CAS敢进我空域", targets: ["制空者"] }, { text: "F. 完成了一次完美的侧袭并成功起飞机", targets: ["绕侧者"] } ] },
    { type: "choice", q: "第一部分 Q7. 你如何看待游戏内的“版本强势载具”？", options: [ { text: "A. 必须玩，不玩就是给自己上难度", targets: ["轮椅者"] }, { text: "B. 知道很强，但我更喜欢玩有挑战性的", targets: ["裸奔者", "赤石者"] }, { text: "C. 会玩，但不会只玩版本之子", targets: ["性能者"] }, { text: "D. 与我无关，我只玩飞机/防空", targets: ["CAS者", "制空者", "防空者"] } ] },
    { type: "scale", q: "第二部分 Q8. 装甲厚度是我选车的第一考量。", high: ["轮椅者"], low: ["裸奔者", "绕侧者"] },
    { type: "scale", q: "第二部分 Q9. 我愿意牺牲装甲换取更高的机动性。", high: ["绕侧者", "裸奔者"], low: ["轮椅者"] },
    { type: "scale", q: "第二部分 Q10. 我倾向于玩那些公认版本强势的载具。", high: ["轮椅者"], low: ["赤石者", "裸奔者"] },
    { type: "scale", q: "第二部分 Q11. 即使某载具被社区评为“粪车”，只要我喜欢就会坚持玩。", high: ["赤石者"], low: ["轮椅者", "性能者"] },
    { type: "scale", q: "第二部分 Q12. 我喜欢尝试高风险高回报的非常规点位。", high: ["裸奔者", "绕侧者"], low: ["轮椅者", "防空者"] },
    { type: "scale", q: "第二部分 Q13. 我宁愿少杀一个人，也不愿意冒险暴露位置。", high: ["性能者", "轮椅者"], low: ["裸奔者", "CAS者"] },
    { type: "scale", q: "第二部分 Q14. 明知某个位置很可能被对面架着，我还是会去试探。", high: ["裸奔者"], low: ["性能者", "防空者"] },
    { type: "scale", q: "第二部分 Q15. 看到队友被围攻，我会放弃当前有利位置去支援。", high: ["防空者", "制空者"], low: ["CAS者", "绕侧者"] },
    { type: "scale", q: "第二部分 Q16. 我愿意玩一整局防空车，即使可能一个空中目标都打不下来。", high: ["防空者"], low: ["CAS者"] },
    { type: "scale", q: "第二部分 Q17. 舔地击杀比护航队友更让我有成就感。", high: ["CAS者"], low: ["制空者"] },
    { type: "scale", q: "第二部分 Q18. 我更喜欢独自行动，配合队友太拖节奏。", high: ["绕侧者", "裸奔者"], low: ["轮椅者", "性能者"] },
    { type: "scale", q: "第二部分 Q19. 我会花时间在自定义房间研究每张地图的特殊点位。", high: ["绕侧者", "裸奔者"], low: ["轮椅者"] },
    { type: "scale", q: "第二部分 Q20. 我的打法在不同地图上差别不大，不需要特别适应。", high: ["轮椅者", "赤石者"], low: ["绕侧者", "性能者"] },
    { type: "scale", q: "第二部分 Q21. 我知道很多“本不该有人出现”的位置并能在实战中利用。", high: ["绕侧者"], low: ["轮椅者"] },
    { type: "scale", q: "第二部分 Q22. 被连续击杀三次以上，我会感到急躁并可能换玩法。", high: ["裸奔者", "CAS者"], low: ["轮椅者", "赤石者"] },
    { type: "scale", q: "第二部分 Q23. 无论输赢，只要我自己打出了精彩操作就会满意。", high: ["裸奔者", "绕侧者"], low: ["防空者", "性能者"] },
    { type: "scale", q: "第二部分 Q24. 被“恶心”的方式击杀（如CAS）会让我特别恼火。", high: ["性能者", "裸奔者"], low: ["轮椅者", "赤石者"] },
    { type: "choice", q: "第三部分 Q25. 你是最后一个存活的队员，敌方还有三人，你会？", options: [ { text: "A. 找个角落蹲着，保底维修费和kd", targets: ["轮椅者", "性能者"] }, { text: "B. 主动出击，尝试逐个击破", targets: ["裸奔者", "绕侧者"] }, { text: "C. 上飞机/防空车，看能不能翻盘", targets: ["CAS者", "防空者"] }, { text: "D. 无所谓，死了下一局", targets: ["赤石者"] } ] },
    { type: "choice", q: "第三部分 Q26. 你正在绕侧，途中看到队友和敌人交火，你会？", options: [ { text: "A. 停下来帮队友打掉敌人", targets: ["防空者", "性能者"] }, { text: "B. 继续绕侧，我的目标是敌方重生点", targets: ["绕侧者"] }, { text: "C. 看情况，能稳收人头就帮，有风险就走", targets: ["CAS者", "裸奔者"] } ] },
    { type: "choice", q: "第三部分 Q27. 一局游戏里，你起制空飞机后发现对面没有飞机了，你会？", options: [ { text: "A. j3换地面载具", targets: ["性能者"] }, { text: "B. 古法舔地，来都来了", targets: ["CAS者"] }, { text: "C. 巡航等对面起飞机", targets: ["制空者"] }, { text: "D. 找对面防空车决战", targets: ["裸奔者", "防空者"] } ] },
    { type: "choice", q: "第三部分 Q28. 你对“白给”的定义是？", options: [ { text: "A. 没有造成任何伤害就死了", targets: ["性能者"] }, { text: "B. 没有达成战术目标就死了（如没能绕到位）", targets: ["绕侧者"] }, { text: "C. 死得很憋屈（如被一发送走）", targets: ["轮椅者"] }, { text: "D. 我玩弱势载具，每局都是白给，习惯了", targets: ["赤石者"] } ] }
];

const groundResults = {
    "轮椅者": { title: "🎯 轮椅者\nBMPT", desc: "你是纯粹的版本信徒与强度收割者。你偏爱防护极佳、下限极低且上限极高的版本强势陆地载具。依靠强大的载具性能正面碾压平推，就是你的终极浪漫！", image: "images/bmpt.png" },
    "CAS者": { title: "✈️ CAS者\nKH38MT", desc: "你是令地面玩家闻风丧胆的轰炸狂魔。你对飞行器情有独钟，地面战斗只是积攒重生的跳板，你的灵魂属于天空。你总是迫不及待地升空狂轰滥炸！", image: "images/kh38mt.png" },
    "性能者": { title: "🛡️ 性能者\nLEOP2", desc: "你是战线最坚实的中流砥柱。你追求各方面性能均衡的主战载具，享受在陆地上与敌人正面“绞肉”的快感，用扎实的基本功带领团队走向胜利。", image: "images/leopard2.png" },
    "裸奔者": { title: "💃 裸奔者\nARIETE", desc: "你是战场上刀尖起舞的技术流大佬。凭借极其恐怖的地图理解和吸睛的神仙操作，完美弥补了“裸奔”载具的先天不足，在绝境中打出最华丽的反杀。", image: "images/ariete.png" },
    "赤石者": { title: "💩 赤石者\nMSC", desc: "你是值得全场“瑞思拜”的硬核苦行僧。偏执于性能垃圾、防护稀烂的弱势载具。你坚持用这种大恶心自己的方式挑战极限，纯粹的坚持让人佩服不已。", image: "images/msc.png" },
    "绕侧者": { title: "🦊 绕侧者\nHSTV", desc: "你是神出鬼没的致命幽灵。深谙轻型坦克的机动优势，总能如手术刀般精准切入战场侧翼。不过，地面的杀戮往往只是你起飞机的前兆。", image: "images/hstv.png" },
    "制空者": { title: "🦅 制空者\nF15C", desc: "你是这片虚拟苍穹的绝对守护神。你的眼底只有纯粹的空战荣耀，热衷于用顶级空中载具去对抗敌方空军，为队友撑起一片绝对安全的净空。", image: "images/f15c.png" },
    "防空者": { title: "☂️ 防空者\nIRIST", desc: "你是全队最无私的保护伞。常年驾驶防空车默默承担起对抗敌方空军的重任。你无私的对空火力网是战局走向胜利的关键，是队友最可靠的后盾。" , image: "images/irist.png" }
};

// ==========================================
// 空战数据区
// ==========================================
const airQuizData = [
    { type: "choice", q: "第一部分 Q1. 你打开空战线的主要原因是什么？", options: [ { text: "A. 体验能量碾压的快感，用速度和高度统治天空", targets: ["能量拥护者"] }, { text: "B. 导弹拍拍拍的感觉太爽了，我就想多按几次发射键", targets: ["火力爱好者"] }, { text: "C. 找一架好上手、不容易让人血压升高的战机，稳定拿收益", targets: ["轮椅享受者"] }, { text: "D. 为了某架特定战机而来——可能是电影情怀，也可能是历史情结", targets: ["情怀坚守者"] }, { text: "E. 给陆战队列配一架靠谱的CAS机，丰富战术选择", targets: ["陆战需求者"] }, { text: "F. 收集癖犯了，每个系的飞机都想摸一遍", targets: ["载具收藏者"] }, { text: "G. 我就喜欢螺旋桨狗斗，喷气机太快了反而没那个味儿", targets: ["古董品鉴者"] }, { text: "H. 专门玩公认的弱势飞机，用它们打赢了特别有成就感", targets: ["大粪舔食者"] }, { text: "I. 空战？我基本不碰，除非任务逼着我去", targets: ["没开空战者"] } ] },
    { type: "choice", q: "第一部分 Q2. 开局起飞后，你通常选择哪种爬升策略？", options: [ { text: "A. 侧爬，确保接敌时拥有绝对的能量优势", targets: ["能量拥护者", "古董品鉴者"] }, { text: "B. 直爬，尽快接敌——反正我火力够猛", targets: ["火力爱好者"] }, { text: "C. 看开的什么飞机再决定，不同飞机不同待遇", targets: ["轮椅享受者", "载具收藏者"] }, { text: "D. 我开的是CAS机，贴地飞才是我的路", targets: ["陆战需求者"] }, { text: "E. 爬升？我在地上开坦克呢", targets: ["没开空战者"] } ] },
    { type: "choice", q: "第一部分 Q3. 一架敌机在你上方有明显能量优势，你的第一反应是？", options: [ { text: "A. 尝试对头，赌一把，我火力比他猛", targets: ["火力爱好者"] }, { text: "B. 拖带或规避，等他犯错误自己把能量耗光", targets: ["能量拥护者", "古董品鉴者"] }, { text: "C. 看飞机性能，能绕就绕，绕不了就认命", targets: ["轮椅享受者", "情怀坚守者"] }, { text: "D. 弱势机嘛，这种情况见多了，习惯就好", targets: ["大粪舔食者"] }, { text: "E. 我压根不在他视野里，我在低空舔地呢", targets: ["陆战需求者"] } ] },
    { type: "choice", q: "第一部分 Q4. 你如何看待当前版本的“强势战机”？", options: [ { text: "A. 必须跟上版本，能量优势决定一切", targets: ["能量拥护者"] }, { text: "B. 火力够猛我就开，导弹多就是硬道理", targets: ["火力爱好者"] }, { text: "C. 只开好上手的，强不强无所谓", targets: ["轮椅享受者"] }, { text: "D. 我开我喜欢的，Meta与我无关", targets: ["情怀坚守者", "古董品鉴者"] }, { text: "E. 专门开非Meta，打赢Meta才叫本事", targets: ["大粪舔食者"] }, { text: "F. 不管强不强都想开，收集就是快乐", targets: ["载具收藏者"] } ] },
    { type: "choice", q: "第一部分 Q5. 你心中最理想的击杀方式是？", options: [ { text: "A. 高空BVR，敌机还没看到我就被导弹拍死", targets: ["火力爱好者"] }, { text: "B. 螺旋爬或剪刀机动后咬住六点，用机炮解决", targets: ["能量拥护者", "古董品鉴者"] }, { text: "C. 什么方式都行，只要稳定拿到人头就好", targets: ["轮椅享受者"] }, { text: "D. 舔地，舔死对面的坦克是最踏实的快乐", targets: ["陆战需求者"] }, { text: "E. 用弱势机反杀强势机，截图留念够我吹一天", targets: ["大粪舔食者", "情怀坚守者"] } ] },
    { type: "choice", q: "第一部分 Q6. 被击落之后，你的心态通常是什么样的？", options: [ { text: "A. 复盘刚才的能量管理哪里出了问题", targets: ["能量拥护者"] }, { text: "B. 可惜了，刚才要是多拍两发导弹说不定就赢了", targets: ["火力爱好者"] }, { text: "C. 正常，下一局", targets: ["轮椅享受者", "载具收藏者"] }, { text: "D. 唉，但这架飞机太帅了，我还要继续开它", targets: ["情怀坚守者"] }, { text: "E. 又死了，但刚才反杀了一个，不亏", targets: ["大粪舔食者"] }, { text: "F. 无所谓，我继续回地面开坦克", targets: ["陆战需求者"] }, { text: "G. 我根本不起飞，不存在被击落这个问题", targets: ["没开空战者"] } ] },
    { type: "choice", q: "第一部分 Q7. 你对“1v1狗斗”的态度是？", options: [ { text: "A. 这是空战的精髓，我愿意花时间反复练习", targets: ["能量拥护者", "古董品鉴者"] }, { text: "B. 能不打就不打，我更喜欢靠导弹数量解决问题", targets: ["火力爱好者"] }, { text: "C. 尽量避开，我常开的飞机不太适合单挑", targets: ["轮椅享受者", "陆战需求者"] }, { text: "D. 我开的飞机不配主动找人单挑，能偷一个是一个", targets: ["大粪舔食者", "情怀坚守者"] }, { text: "E. 我在忙着开下一架收藏品，没空狗斗", targets: ["载具收藏者"] } ] },
    { type: "scale", q: "第二部分 Q8. “能量就是一切”是空战的核心真理。", high: ["能量拥护者", "古董品鉴者"], low: ["没开空战者"] },
    { type: "scale", q: "第二部分 Q9. 我会花时间去研究不同战机的产能、存能和爬升率数据。", high: ["能量拥护者"], low: ["没开空战者"] },
    { type: "scale", q: "第二部分 Q10. 相比能量管理，我更看重载弹量和火力密度。", high: ["火力爱好者"], low: ["能量拥护者"] },
    { type: "scale", q: "第二部分 Q11. 导弹当然是越多越好，我不喜欢每发都精打细算。", high: ["火力爱好者"], low: ["能量拥护者"] },
    { type: "scale", q: "第二部分 Q12. 我宁愿开一架火力中等但机动优秀的战机。", high: ["能量拥护者", "古董品鉴者"], low: ["火力爱好者", "轮椅享受者"] },
    { type: "scale", q: "第二部分 Q13. 机炮或导弹的命中率，是我最看重的个人数据。", high: ["能量拥护者", "火力爱好者"], low: ["载具收藏者"] },
    { type: "scale", q: "第二部分 Q14. 我不想碰那些容易让我“红温”的飞机。", high: ["轮椅享受者"], low: ["大粪舔食者"] },
    { type: "scale", q: "第二部分 Q15. 用公认的弱势战机打出好战绩，这个过程本身就很享受。", high: ["大粪舔食者"], low: ["轮椅享受者"] },
    { type: "scale", q: "第二部分 Q16. 游戏体验的稳定性，比偶尔一次的高光时刻更重要。", high: ["轮椅享受者"], low: ["大粪舔食者"] },
    { type: "scale", q: "第二部分 Q17. 我开某架飞机，主要是因为它现实中服役过、或者电影里太帅了。", high: ["情怀坚守者"], low: ["轮椅享受者"] },
    { type: "scale", q: "第二部分 Q18. 即使性能落后，我也会因为喜欢它而坚持开。", high: ["情怀坚守者", "古董品鉴者"], low: ["轮椅享受者"] },
    { type: "scale", q: "第二部分 Q19. 螺旋桨时代的空战，比喷气时代更有“空战的味道”。", high: ["古董品鉴者"], low: ["火力爱好者"] },
    { type: "scale", q: "第二部分 Q20. 我开空战线，主要是为了给陆战体验服务。", high: ["陆战需求者"], low: ["能量拥护者", "火力爱好者"] },
    { type: "scale", q: "第二部分 Q21. 我的目标是尽可能多地解锁和收集各个系别的战机。", high: ["载具收藏者"], low: ["陆战需求者"] },
    { type: "scale", q: "第二部分 Q22. 我不太在乎战绩，能体验每一架不同的飞机本身就很有趣。", high: ["载具收藏者"], low: ["能量拥护者", "火力爱好者"] },
    { type: "scale", q: "第二部分 Q23. 我在空战上投入的时间和精力，远不如在陆战上。", high: ["没开空战者", "陆战需求者"], low: ["能量拥护者", "火力爱好者"] },
    { type: "scale", q: "第二部分 Q24. “从空中发起进攻是小人行为”——我对这句话的态度是？", high: ["没开空战者"], low: ["陆战需求者", "火力爱好者"] },
    { type: "choice", q: "第三部分 Q25. 你发现一架敌机比你高，而且正朝你俯冲下来，你会怎么做？", options: [ { text: "A. 尝试对头，拼火力", targets: ["火力爱好者"] }, { text: "B. 浅俯冲加速脱离，把他拖进低空消耗他的能量", targets: ["能量拥护者"] }, { text: "C. 看飞机性能，能跑就跑，跑不掉就下一局", targets: ["轮椅享受者", "情怀坚守者"] }, { text: "D. 找山或者云层躲避，等他放弃目标", targets: ["大粪舔食者", "古董品鉴者"] }, { text: "E. 我不在那个高度，我在地面附近活动", targets: ["陆战需求者", "没开空战者"] } ] },
    { type: "choice", q: "第三部分 Q26. 你玩得最舒服的空战权重是哪个区间？", options: [ { text: "A. 顶级喷气（12.0以上），超视距和能量管理的博弈", targets: ["能量拥护者", "火力爱好者"] }, { text: "B. 高级喷气（9.0-11.0），导弹和机炮混合使用", targets: ["轮椅享受者", "载具收藏者"] }, { text: "C. 二战螺旋桨（3.0-6.0），纯机炮狗斗", targets: ["古董品鉴者"] }, { text: "D. 无所谓权重，取决于我当前在开哪架收藏品", targets: ["载具收藏者", "情怀坚守者"] }, { text: "E. 我不挑权重，我挑的是哪架能CAS", targets: ["陆战需求者"] } ] },
    { type: "choice", q: "第三部分 Q27. 你对公认的“大粪”载具的态度是？", options: [ { text: "A. 有好的不吃，为什么要吃这个？", targets: ["能量拥护者", "轮椅享受者"] }, { text: "B. 偶尔吃一口，为了情怀可以忍", targets: ["情怀坚守者"] }, { text: "C. 专门吃，不仅要吃还要吃出水平", targets: ["大粪舔食者"] }, { text: "D. 我在走科技树，有些粪不得不吃", targets: ["载具收藏者"] }, { text: "E. 什么是大粪？我只开坦克", targets: ["没开空战者"] } ] },
    { type: "choice", q: "第三部分 Q28. 你空战中最有“甜点”感觉的击杀区域是？", options: [ { text: "A. 高空高速，超视距解决敌人", targets: ["火力爱好者"] }, { text: "B. 中空，能量格斗后咬尾机炮击杀", targets: ["能量拥护者", "古董品鉴者"] }, { text: "C. 低空舔地时顺手带走一架不长眼的敌机", targets: ["陆战需求者"] }, { text: "D. 偷人、收残血，用弱势机捡漏", targets: ["大粪舔食者", "情怀坚守者"] } ] }
];

const airResults = {
    "能量拥护者": { title: "⚡ 能量拥护者\nEF2K", desc: "你是天空的骑士，坚信“能量就是一切”。你热衷于通过高度和速度的转化建立绝对优势，在优雅的能量流转中将敌人戏弄于股掌之间。对你来说，真正的空战不仅仅是击杀，更是一门关于物理与几何的艺术。", image: "images/energy.png" },
    "火力爱好者": { title: "🔥 火力爱好者\nSU30SM", desc: "你是暴力的化身，火力即是真理。与其计算复杂的能量，你更享受简单直接的火力覆盖。超视距的致命一击或是迎头倾泻的弹雨，是你带给敌人的绝望。在你看来，如果一发导弹解决不了问题，那就再来一发。", image: "images/firepower.png" },
    "轮椅享受者": { title: "🦽 轮椅享受者\nRAFL", desc: "你是务实的收益掠夺者。你拒绝高血压和无效操作，偏爱那些好上手、下限极高的版本强势战机。你的目标明确：稳定地拿到击杀，轻松地赚取银狮和研发点。游戏嘛，自己玩得舒服最重要。", image: "images/air_wheelchair.png" },
    "情怀坚守者": { title: "🎬 情怀坚守者\nFA18E", desc: "你是为爱发电的浪漫主义者。你选择某架战机往往不是因为它的性能，而是因为它承载的历史厚重感或大银幕上的飒爽英姿。哪怕它在这个版本被暴打，只要这架飞机的引擎轰鸣声响起，你就觉得一切都值得。", image: "images/romance.png" },
    "陆战需求者": { title: "💥 陆战需求者\nA10C", desc: "你本质上是个心系地面的无情舔地机器。你攀爬空战科技树的唯一目的，就是为了给陆战队列配置最强力的CAS。在天空中，你的眼睛总是死死盯着地面的履带，敌方战机只是你眼中的阻碍。", image: "images/cas_air.png" },
    "载具收藏者": { title: "🏆 载具收藏者\nR2Y2", desc: "你是战雷的收藏家。对你而言，每一场空战都只是为了点亮科技树上下一个图标的途径。不管是神车还是大粪，你都要亲手摸一摸。看到机库里满满当当的各个系别载具，就是你最大的成就感。", image: "images/collector.png" },
    "古董品鉴者": { title: "🕰️ 古董品鉴者\nBF109K", desc: "你是迷恋旧时代的古典飞行员。你对喷气时代的超视距和对弹嗤之以鼻，唯独对二战的螺旋桨狗斗情有独钟。纯粹的机炮交锋、极致的机动拉扯，这才是你心中真正的“空战味道”。", image: "images/antique.png" },
    "大粪舔食者": { title: "💩 大粪舔食者\nJ10C", desc: "你是迎难而上的硬核受虐狂。你故意避开强势机型，专挑那些让常人崩溃的“绝活”载具。用最烂的飞机打出最骚的操作并反杀摇轮椅的   玩家，这种极其扭曲但纯度极高的快感，是常人无法理解的境界。", image: "images/air_msc.png" },
    "没开空战者": { title: "🪖 没开空战者\nTIGER ", desc: "你是一个纯粹的陆战分子。天空对你来说只是被CAS折磨的来源，你对飞行器毫无兴趣。你的双脚坚实地踩在泥土上，比起在天上乱飞，你更愿意在地面上用履带丈量世界。", image: "images/no_air.png" }
};

// ==========================================
// 逻辑引擎区 (支持双模式切换)
// ==========================================
let currentQuizData = [];
let currentResults = {};
let userAnswers = [];

const scaleOptionsText = [ "1 - 非常不同意", "2 - 比较不同意", "3 - 中立 / 视情况而定", "4 - 比较同意", "5 - 非常同意" ];

function startQuiz(type) {
    if (type === 'ground') {
        currentQuizData = groundQuizData;
        currentResults = groundResults;
    } else {
        currentQuizData = airQuizData;
        currentResults = airResults;
    }
    
    userAnswers = new Array(currentQuizData.length).fill(null);
    
    // 隐藏模式选择，显示答题区
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    
    renderAllQuestions();
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAllQuestions() {
    const listContainer = document.getElementById('questions-list');
    listContainer.innerHTML = '';

    currentQuizData.forEach((q, qIndex) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `question-card-${qIndex}`;

        const qText = document.createElement('div');
        qText.className = 'question-text';
        qText.innerText = q.q;
        card.appendChild(qText);

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';

        const currentOptions = q.type === "choice" 
            ? q.options 
            : scaleOptionsText.map((text, idx) => ({ text: text, value: idx + 1 }));

        currentOptions.forEach((opt, optIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `opt-${qIndex}-${optIndex}`;
            btn.innerText = opt.text;
            
            btn.onclick = () => {
                if (q.type === 'choice') {
                    selectOption(qIndex, optIndex, { type: 'choice', targets: opt.targets });
                } else {
                    selectOption(qIndex, optIndex, { type: 'scale', value: opt.value, high: q.high, low: q.low });
                }
            };
            optionsGrid.appendChild(btn);
        });

        card.appendChild(optionsGrid);
        listContainer.appendChild(card);
    });
}

function selectOption(qIndex, optIndex, answerData) {
    userAnswers[qIndex] = answerData;

    const card = document.getElementById(`question-card-${qIndex}`);
    card.classList.remove('unanswered-error');
    document.getElementById('error-msg').classList.remove('show');

    const allOptionsInCard = card.querySelectorAll('.option-btn');
    allOptionsInCard.forEach(btn => btn.classList.remove('selected'));

    const selectedBtn = document.getElementById(`opt-${qIndex}-${optIndex}`);
    selectedBtn.classList.add('selected');
    
    updateProgress();
}

function updateProgress() {
    const answeredCount = userAnswers.filter(ans => ans !== null).length;
    const progressPercentage = (answeredCount / currentQuizData.length) * 100;
    
    const progressFill = document.getElementById('progress-fill');
    if(progressFill) progressFill.style.width = `${progressPercentage}%`;
    
    const counter = document.getElementById('question-counter');
    if(counter) counter.innerText = `当前进度 : ${answeredCount} / ${currentQuizData.length}`;
}

function submitQuiz() {
    const firstUnansweredIndex = userAnswers.indexOf(null);

    if (firstUnansweredIndex !== -1) {
        document.getElementById('error-msg').classList.add('show');
        const errorCard = document.getElementById(`question-card-${firstUnansweredIndex}`);
        errorCard.classList.add('unanswered-error');
        errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const counts = {};

    userAnswers.forEach((ans) => {
        if (!ans) return;
        
        if (ans.type === 'choice') {
            ans.targets.forEach(t => { counts[t] = (counts[t] || 0) + 2; });
        } else if (ans.type === 'scale') {
            let val = ans.value;
            if (val === 5 && ans.high) ans.high.forEach(t => { counts[t] = (counts[t] || 0) + 2; });
            else if (val === 4 && ans.high) ans.high.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
            else if (val === 2 && ans.low) ans.low.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
            else if (val === 1 && ans.low) ans.low.forEach(t => { counts[t] = (counts[t] || 0) + 2; });
        }
    });

    let maxScore = -1; 
    let finalPersonality = Object.keys(currentResults)[0]; 
    for (const [type, score] of Object.entries(counts)) {
        if (score > maxScore) {
            maxScore = score;
            finalPersonality = type;
        }
    }

    displayResult(finalPersonality);
}

function displayResult(personality) {
    document.getElementById('quiz-screen').style.display = 'none';
    const resultScreen = document.getElementById('result-screen');
    resultScreen.style.display = 'block';

    const resultData = currentResults[personality];
    document.getElementById('final-personality').innerText = resultData.title;
    document.getElementById('final-desc').innerText = resultData.desc;
    
    const imgEl = document.getElementById('result-image');
    if(resultData.image) {
        imgEl.src = resultData.image;
        imgEl.style.display = 'block';
        imgEl.onerror = function() { this.parentElement.style.display = 'none'; };
        imgEl.parentElement.style.display = 'flex';
    } else {
        imgEl.parentElement.style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    let isLight = localStorage.getItem('theme') === 'light';
    
    if(isLight) root.setAttribute('data-theme', 'light');

    themeBtn.addEventListener('click', () => {
        isLight = !isLight;
        if (isLight) {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
}

window.onload = () => {
    initThemeToggle();
};