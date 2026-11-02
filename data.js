/* Updated for the current itinerary. All reservations remain unconfirmed. */
const TRIP = {
  "start": "2026-11-23",
  "end": "2026-12-17",
  "days": 25,
  "nights": 24,
  "cities": [
    {
      "id": "hiroshima",
      "name": "广岛",
      "en": "HIROSHIMA",
      "nights": "前段 4 晚＋回访 1 晚",
      "dates": "11/23–27 · 12/16–17",
      "description": "从和平公园的历史轴线，到宫岛的海与红叶，再到坂茂和黑川纪章的建筑。前段完整游览，末段回访现代美术馆。",
      "transport": "香港直飞入境；末段新干线回访，返港经福冈。",
      "highlights": "和平纪念馆 · 宫岛 · SIMOSE · 广岛 MOCA"
    },
    {
      "id": "takeo",
      "name": "武雄",
      "en": "TAKEO ONSEN",
      "nights": "4 晚",
      "dates": "11/27–12/1",
      "description": "九年庵安排在周五，御船山保留周一完整游览。武雄作为四晚温泉基地，11/28 乘新干线日归长崎美术馆，留出由布院住宿时间。",
      "transport": "博多接站包车，经九年庵抵达武雄；之后乘 Kamome 前往长崎。",
      "highlights": "九年庵 · 御船山 · 温泉 · 长崎美术馆日归"
    },
    {
      "id": "nagasaki",
      "name": "长崎",
      "en": "NAGASAKI",
      "nights": "1 晚＋美术馆日归",
      "dates": "11/28 日归 · 12/1–2 住宿",
      "description": "11/28 从武雄日归，完整参观长崎县美术馆；12/1 再到港口与街巷慢游，住一晚后前往别府。",
      "transport": "武雄 ↔ 长崎日归乘 Kamome；12/2 离开经武雄、博多换乘至别府。",
      "highlights": "长崎县美术馆 · 港口 · 南山手"
    },
    {
      "id": "beppu",
      "name": "别府",
      "en": "BEPPU & OITA",
      "nights": "前段 1 晚＋后段 2 晚",
      "dates": "12/2–3 · 12/5–7",
      "description": "别府住宿分两段：先抵达温泉区，之后看大分建筑再赴由布院；两晚山庄停留后回别府，作为国东半岛包车基地。界 别府仍是建筑住宿候选。",
      "transport": "JR 用于博多与大分方向；别府／大分与由布院间以预约出租车接送衔接。",
      "highlights": "OPAM · Art Plaza · 国东寺院 · 界 别府"
    },
    {
      "id": "yufuin",
      "name": "由布院",
      "en": "YUFUIN · SANSOU MURATA",
      "nights": "2 晚，住宿待确认",
      "dates": "12/3–5 · 12/5 COMICO",
      "description": "优先尝试山庄无量塔两晚，12/4 完整留给客房温泉、酒廊与馆内空间。12/5 退房后参观 COMICO，再回别府。官网单日库存有连住线索，尚未锁房。",
      "transport": "12/3 大分看馆后预约专车至旅馆，12/5 由布院看展后乘车回别府。",
      "highlights": "山庄无量塔 · Tan’s bar · COMICO · 客房温泉"
    },
    {
      "id": "fukuoka",
      "name": "福冈",
      "en": "FUKUOKA",
      "nights": "4 晚",
      "dates": "12/7–11 · 12/17 离境",
      "description": "四晚基地串联太宰府、北九州与筑后，重点看前川国男、矶崎新与隈研吾相关作品。最后一天经福冈机场返回香港。",
      "transport": "Sonic 入城；新干线用于北九州、筑后及鹿儿岛方向。",
      "highlights": "ACROS · 九州国博 · 北九州本馆 · 芸文馆"
    },
    {
      "id": "kagoshima",
      "name": "鹿儿岛",
      "en": "KAGOSHIMA & KIRISHIMA",
      "nights": "5 晚",
      "dates": "12/11–16",
      "description": "把樱岛与仙岩园留作完整日程；雾岛艺术之森安排在室内新展恢复后。另一天上午参观音乐厅，午后留给雾岛神宫的国宝社殿、参拜与杉林短距离散步，不安排登山。",
      "transport": "九州新干线进入；雾岛艺术之森、音乐厅与神宫按各自日期包车往返，之后早班新干线回广岛。",
      "highlights": "雾岛神宫 · 樱岛 · 仙岩园 · 艺术之森 · 音乐厅"
    }
  ],
  "daysData": [
    {
      "number": 1,
      "date": "2026-11-23",
      "city": "hiroshima",
      "title": "直飞广岛，抵达深秋",
      "subtitle": "香港 → 广岛",
      "stay": "广岛",
      "badge": "到达日",
      "am": "香港快运 UO822／国泰共享 CX5822，按机场公布班表 09:30 起飞。出发与抵达均为当地时间。",
      "pm": "13:45 抵达后办理入境，乘机场巴士或专车前往酒店；傍晚附近用餐、休息。",
      "transport": "香港 → 广岛直航；广岛机场 → 市区巴士约 50–60 分钟，另计等车及进城交通。",
      "note": "勤劳感谢日：只安排抵达与入住，不叠加热门景区。班表已核对，余票与机票未确认。",
      "url": "https://www.hij.airport.jp/flight/kokusai/hongkong.html",
      "source": "广岛机场班表"
    },
    {
      "number": 2,
      "date": "2026-11-24",
      "city": "hiroshima",
      "title": "和平纪念馆与和平公园",
      "subtitle": "完整历史与建筑日",
      "stay": "广岛",
      "badge": "完整一天",
      "am": "从和平纪念资料馆开始，按自己的节奏观看展览，重点看历史叙事与丹下健三建筑。",
      "pm": "和平公园、原爆圆顶馆与河岸散步，留出安静消化展览的时间。",
      "transport": "酒店 → 资料馆乘电车／出租车；公园范围以步行为主。",
      "note": "主馆、纪念碑与原爆圆顶的轴线可一并观察；资料馆预约及开放情况以官网为准。",
      "url": "https://hpmmuseum.jp/",
      "source": "和平纪念资料馆"
    },
    {
      "number": 3,
      "date": "2026-11-25",
      "city": "hiroshima",
      "title": "宫岛：海上神社与红叶谷",
      "subtitle": "严岛神社 · 大圣院 · 红叶谷",
      "stay": "广岛",
      "badge": "完整一天",
      "am": "早出发上岛，依潮汐安排严岛神社及海上大鸟居，避开午间最集中的到达时段。",
      "pm": "大圣院、红叶谷与岛内散步；保留咖啡、休息及等候渡轮的时间。",
      "transport": "JR 广岛 → 宫岛口约 30 分钟，步行至码头后乘渡轮约 10 分钟；另计候船。",
      "note": "红叶是季节预期，非当年最佳叶况保证。不安排弥山登山，以岛内参拜与散步为主。",
      "url": "https://www.miyajima.or.jp/",
      "source": "宫岛观光协会"
    },
    {
      "number": 4,
      "date": "2026-11-26",
      "city": "hiroshima",
      "title": "SIMOSE：玻璃、木与海",
      "subtitle": "下濑美术馆 · 坂茂",
      "stay": "广岛",
      "badge": "建筑日",
      "am": "前往下濑美术馆，看建筑体量、玻璃立面与展览空间，预留入内参观时间。",
      "pm": "继续看展、庭园及海景，按开放情况使用馆内咖啡；傍晚回广岛。",
      "transport": "JR 山阳本线至大竹／玖波方向，再乘出租车或当日适用接驳；单程规划约 1–1.5 小时。",
      "note": "不与宫岛合并；园区部分餐饮及别墅并非普通美术馆门票包含内容。",
      "url": "https://www.simose-museum.jp/en/info/",
      "source": "SIMOSE 来馆信息"
    },
    {
      "number": 5,
      "date": "2026-11-27",
      "city": "takeo",
      "title": "九年庵，赶在关园之前",
      "subtitle": "广岛 → 九年庵 → 武雄",
      "stay": "武雄",
      "badge": "包车推荐",
      "am": "早班新干线到博多，包车接站后前往九年庵。园内与仁比山神社合计预留约 3–4 小时。",
      "pm": "完成庭园游览、用餐后乘车赴武雄，入住温泉旅馆。",
      "transport": "广岛 → 博多新干线约 1–1.5 小时；包车博多接站 → 神埼九年庵 → 武雄，建议 6–8 小时用车。",
      "note": "公开期截至 11/29。选择周五降低周末人流影响；车辆遵守临时停车与接驳安排，不能承诺直达入口。",
      "url": "https://kunenan-saga.jp/",
      "source": "九年庵公开与交通"
    },
    {
      "number": 6,
      "date": "2026-11-28",
      "city": "nagasaki",
      "title": "长崎美术馆，从武雄日归",
      "subtitle": "武雄 → 长崎县美术馆 → 武雄",
      "stay": "武雄",
      "badge": "建筑日",
      "am": "早餐后乘 Kamome 前往长崎，参观长崎县美术馆，充分观看日本设计与隈研吾合作的建筑及滨水空间。",
      "pm": "继续看展、运河与开放公共空间；下午适时返回武雄，保留温泉旅馆晚餐时间。",
      "transport": "JR 武雄温泉 ↔ 长崎，Kamome 新干线单程约半小时；长崎站与美术馆之间电车／出租车。",
      "note": "本日替代佐贺市建筑参观。为保留 11/30 御船山的工作日游览，增加一次长崎日归；之后 12/1 再赴长崎住宿。",
      "url": "https://www.nagasaki-museum.jp/",
      "source": "长崎县美术馆",
      "stayCity": "takeo"
    },
    {
      "number": 7,
      "date": "2026-11-29",
      "city": "takeo",
      "title": "留一天，给温泉与天气",
      "subtitle": "武雄慢行 · 旅馆休息",
      "stay": "武雄",
      "badge": "休息日",
      "am": "早餐后不赶路，温泉、旅馆庭园或附近散步。",
      "pm": "武雄市内轻松活动，亦可用作天气调整；不安排额外跨城参观。",
      "transport": "酒店接送／短程出租车；当天无城际移动。",
      "note": "连续入住温泉旅馆前确认每日餐食变化；两张床需逐一确认具体房型。",
      "url": "",
      "source": ""
    },
    {
      "number": 8,
      "date": "2026-11-30",
      "city": "takeo",
      "title": "御船山，从白昼到夜色",
      "subtitle": "日枫 · 温泉 · 夜间点灯",
      "stay": "武雄",
      "badge": "完整一天",
      "am": "上午进入御船山乐园，从镜池、山景与红叶步道慢慢游览。",
      "pm": "午后回酒店休息，傍晚再入园看夜枫与倒影，不安排跨城转移。",
      "transport": "酒店接送／出租车；当天步行为主，夜间注意坡道与照明。",
      "note": "官方红叶节 11/6–12/6，白天 08:00–17:30，夜间 17:30–22:00。提前协调旅馆晚餐。",
      "url": "https://www.mifuneyamarakuen.jp/cn/autumn/",
      "source": "御船山红叶节"
    },
    {
      "number": 9,
      "date": "2026-12-01",
      "city": "nagasaki",
      "title": "向港口，进入长崎",
      "subtitle": "武雄 → 长崎 · 出岛与滨水",
      "stay": "长崎",
      "badge": "移动日",
      "am": "早餐后退房，乘 Kamome 前往长崎，酒店寄存行李。",
      "pm": "长崎港口、出岛附近慢游，依体力安排咖啡与晚餐。",
      "transport": "西九州新干线 Kamome：武雄温泉 → 长崎，车程约半小时；市内电车／步行。",
      "note": "长崎县美术馆已前移至 11/28 日归参观；这次在长崎住一晚，12/2 午后转往别府。",
      "url": "https://www.jrkyushu.co.jp/trains/kamome/",
      "source": "JR 九州 Kamome"
    },
    {
      "number": 10,
      "date": "2026-12-02",
      "city": "beppu",
      "title": "山坡街巷，转入别府温泉",
      "subtitle": "长崎 → 武雄 → 博多 → 别府",
      "stay": "别府",
      "badge": "长途移动",
      "am": "早起轻游南山手／哥拉巴园一带，控制在半天内，之后取行李前往车站。",
      "pm": "午后乘车前往别府，入住后休息与温泉；界 别府为建筑住宿候选，需先确认房态。",
      "transport": "Kamome 至武雄温泉 → Relay Kamome 至博多 → Sonic 至别府；连同换乘规划 4–5 小时。",
      "note": "大分县住宿段比原版提前一天开始，共五晚：别府前段 1 晚、由布院 2 晚、别府后段 2 晚。均未预订。",
      "url": "https://www.jrkyushu.co.jp/english/booking/list_of_trains.html",
      "source": "JR 九州列车信息"
    },
    {
      "number": 11,
      "date": "2026-12-03",
      "city": "yufuin",
      "title": "大分双馆，入住山庄无量塔",
      "subtitle": "OPAM · Art Plaza · Sansou Murata",
      "stay": "由布院",
      "badge": "入住待确认",
      "am": "别府酒店退房后赴大分，建议 10:00–12:30 参观 OPAM；再按开放情况看 Art Plaza，保留午餐。",
      "pm": "预约专车从大分前往由布院山庄无量塔，争取 15:00–15:30 入住；之后留在旅馆，客房温泉、酒廊与晚餐。",
      "transport": "别府 → 大分乘 JR 或出租车；大分市区 → 山庄无量塔预约出租车／单程专车，规划约 1–1.5 小时，另计馆际移动。",
      "note": "优先尝试“西 Nishi”12/3 入住、12/5 退房，官网单日库存返回 12/3、4 可售线索，尚未完成两人连住订单验证。Art Plaza 外墙施工、3F 常设展暂停；只按开放范围参观。",
      "url": "https://sansou-murata.com/reservation/",
      "source": "无量塔官网空房查询"
    },
    {
      "number": 12,
      "date": "2026-12-04",
      "city": "yufuin",
      "title": "山庄无量塔，把一天留给旅馆",
      "subtitle": "客房温泉 · Tan’s bar · 住宿美学",
      "stay": "由布院",
      "badge": "完整旅馆日",
      "am": "在旅馆用早餐、享客房温泉与室内空间，不安排大分、别府往返。",
      "pm": "依当日营业情况选择 Tan’s bar、馆内店铺或附近 artegio；以短距离散步和休息为主，晚餐留在旅馆。",
      "transport": "旅馆内及周边短距离移动；需要时联系旅馆安排由布院温泉区接送，范围与时段须确认。",
      "note": "入住无量塔仍以同房连住、餐食及最终报价确认成立。“西”约 115㎡，卧室在二楼，需走楼梯；各客房有专用温泉，大浴场与露天公共浴场不列入设施预期。",
      "url": "https://sansou-murata.com/room/nishi/",
      "source": "西 Nishi 房型与设施"
    },
    {
      "number": 13,
      "date": "2026-12-05",
      "city": "yufuin",
      "title": "由布院看展，午后回别府",
      "subtitle": "无量塔退房 · COMICO ART MUSEUM",
      "stay": "别府",
      "badge": "预约优先",
      "am": "从容用早餐，约 11:00 前退房，提前安排车辆与行李寄存／随车运输。",
      "pm": "建议预约 COMICO 午后时段，充分观看建筑与展览；之后乘车回别府，入住后段两晚酒店。",
      "transport": "旅馆 → 由布院市区乘预约接送／出租车；参观后由布院 → 别府乘出租车或巴士，规划约 1–1.5 小时，另计候车。",
      "note": "COMICO 为预约优先制，12/5 按官网规则自 11/5 起预约，有空位时可接待未预约访客。别府首尾如选同一家，可事先询问跨两晚行李寄存；不承诺酒店提供该服务。",
      "url": "https://www.camy.oita.jp/museumfaq",
      "source": "COMICO 预约说明",
      "stayCity": "beppu"
    },
    {
      "number": 14,
      "date": "2026-12-06",
      "city": "beppu",
      "title": "国东半岛，走入古寺",
      "subtitle": "富贵寺 · 真木大堂 · 山间风景",
      "stay": "别府",
      "badge": "包车推荐",
      "am": "包车前往国东半岛，以富贵寺、真木大堂为主要停留点。",
      "pm": "按体力与天气决定是否加入熊野磨崖佛，保留返程与温泉时间。",
      "transport": "别府出发往返包车，约 8–9 小时；景点之间公共交通不适合当天串联。",
      "note": "熊野磨崖佛有台阶及不平路面，可减点延长其他寺院停留。",
      "url": "",
      "source": ""
    },
    {
      "number": 15,
      "date": "2026-12-07",
      "city": "fukuoka",
      "title": "回到福冈，读一座绿色建筑",
      "subtitle": "别府 → 博多 · ACROS",
      "stay": "福冈",
      "badge": "建筑日",
      "am": "乘 Sonic 前往博多，入住或寄存行李。",
      "pm": "ACROS 福冈外部与公共空间、天神街区散步，保留移动后的休息。",
      "transport": "Sonic 特急：别府 → 博多约 2–2.5 小时；市内地铁／出租车。",
      "note": "周一主要安排公共建筑与城市步行。阶梯花园开放受天气、时段与管理规定影响。",
      "url": "https://www.acrosfukuoka.com/acros/",
      "source": "ACROS 官方"
    },
    {
      "number": 16,
      "date": "2026-12-08",
      "city": "fukuoka",
      "title": "太宰府，古意与当代结构",
      "subtitle": "九州国立博物馆 · 天满宫 · 星巴克",
      "stay": "福冈",
      "badge": "建筑日",
      "am": "前往九州国立博物馆，参观建筑与展览。",
      "pm": "太宰府天满宫、参道及隈研吾设计的星巴克；按体力分配步行。",
      "transport": "福冈市区乘地铁／西铁，经二日市换乘至太宰府；当地步行与坡道交通。",
      "note": "国博为菊竹清训／久米设计联合团队作品；天满宫修缮与参拜区域以现场公告为准。",
      "url": "https://www.kyuhaku.jp/",
      "source": "九州国立博物馆"
    },
    {
      "number": 17,
      "date": "2026-12-09",
      "city": "fukuoka",
      "title": "北九州，山丘上的双筒建筑",
      "subtitle": "北九州市立美术馆本馆 · 矶崎新",
      "stay": "福冈",
      "badge": "建筑日",
      "am": "博多乘新干线至小仓，再乘出租车前往山丘上的美术馆本馆。",
      "pm": "充分参观建筑与展览后回福冈；今天不再叠加门司港。",
      "transport": "博多 ↔ 小仓山阳新干线约 15–20 分钟；小仓至本馆出租车约 30 分钟。",
      "note": "参观目标为山丘上的本馆，非小仓分馆；原免费接驳已取消，不依赖旧攻略。",
      "url": "https://kmma.jp/visitor/honkan/guide/",
      "source": "本馆来馆指南"
    },
    {
      "number": 18,
      "date": "2026-12-10",
      "city": "fukuoka",
      "title": "福冈与筑后，两种建筑语言",
      "subtitle": "福冈市美术馆 · 九州芸文馆",
      "stay": "福冈",
      "badge": "较集中",
      "am": "09:30 左右参观福冈市美术馆，重点看前川国男建筑与选定展区，预留约 2–2.5 小时。",
      "pm": "午餐后前往筑后船小屋，参观九州芸文馆建筑与开放空间，晚些回福冈。",
      "transport": "市内地铁；博多 → 筑后船小屋新干线，出站步行至芸文馆；计入往返与馆际移动。",
      "note": "这是较集中的建筑日。芸文馆部分展厅、茶室等需另查活动与预约，不承诺全部空间开放。",
      "url": "https://www.kyushu-geibun.jp/",
      "source": "九州芸文馆"
    },
    {
      "number": 19,
      "date": "2026-12-11",
      "city": "kagoshima",
      "title": "向南，抵达鹿儿岛",
      "subtitle": "福冈 → 鹿儿岛",
      "stay": "鹿儿岛",
      "badge": "移动日",
      "am": "退房后乘九州新干线前往鹿儿岛中央。",
      "pm": "酒店入住、市区轻松散步与用餐，为次日雾岛行程休息。",
      "transport": "博多 → 鹿儿岛中央，九州新干线约 1.5–2 小时；市内电车／出租车。",
      "note": "在鹿儿岛连续住 5 晚，雾岛景点以包车往返，减少携行李换酒店。",
      "url": "https://www.jrkyushu.co.jp/english/",
      "source": "JR 九州"
    },
    {
      "number": 20,
      "date": "2026-12-12",
      "city": "kagoshima",
      "title": "雾岛艺术之森，完整一天",
      "subtitle": "室内新展 · 户外雕塑",
      "stay": "鹿儿岛",
      "badge": "包车推荐",
      "am": "包车前往雾岛艺术之森，参观室内新展与建筑空间。",
      "pm": "户外雕塑步道、山林与休息，下午返回鹿儿岛。",
      "transport": "鹿儿岛出发往返包车，约 8–9 小时，按天气与停留时长调整。",
      "note": "官方公告 12/1–11 室内休展，12/12 起恢复冬季展览；户外体验受天气影响。",
      "url": "https://open-air-museum.org/schedule",
      "source": "艺术之森年度日程"
    },
    {
      "number": 21,
      "date": "2026-12-13",
      "city": "kagoshima",
      "title": "仙岩园，把樱岛借入庭园",
      "subtitle": "仙岩园 · 尚古集成馆",
      "stay": "鹿儿岛",
      "badge": "完整游览",
      "am": "仙岩园庭园、御殿及山海借景，留出摄影与用餐时间。",
      "pm": "尚古集成馆与周边历史内容，按兴趣选择展览细看。",
      "transport": "出租车／观光巴士前往仙岩园；园区与周边以步行为主。",
      "note": "园内不同参观区域可能使用不同票种，以官方售票为准。",
      "url": "https://www.senganen.jp/",
      "source": "仙岩园官方"
    },
    {
      "number": 22,
      "date": "2026-12-14",
      "city": "kagoshima",
      "title": "樱岛，与火山相处一天",
      "subtitle": "渡轮 · 熔岩步道 · 展望台",
      "stay": "鹿儿岛",
      "badge": "完整一天",
      "am": "渡轮前往樱岛，依天气、风向与火山信息选择展望点。",
      "pm": "熔岩步道、足汤或游客中心，傍晚回鹿儿岛。",
      "transport": "鹿儿岛港 ↔ 樱岛渡轮；岛内巴士／出租车。要串联较远展望台可加包车。",
      "note": "根据当日火山与交通管制调整路线，不进入限制区域；与仙岩园可按天气互换。",
      "url": "https://www.sakurajima.gr.jp/",
      "source": "樱岛观光信息"
    },
    {
      "number": 23,
      "date": "2026-12-15",
      "city": "kagoshima",
      "title": "雾岛神宫：朱红社殿与杉林",
      "subtitle": "霧島神宮 Kirishima Jingu · Miyama Conseru",
      "stay": "鹿儿岛",
      "badge": "包车推荐",
      "am": "建议 08:00 从鹿儿岛酒店出发，09:30–11:30 参观雾岛国际音乐厅，保留槙文彦团队建筑及场地的观看时间；随后午餐。",
      "pm": "建议 13:15–15:30 留给雾岛神宫：鸟居、参道、一般开放区域的国宝社殿观赏与参拜，结合御神木、杉林短距离散步及休息；之后回鹿儿岛，约 17:00 抵达。",
      "transport": "鹿儿岛酒店 → 雾岛国际音乐厅 → 午餐 → 雾岛神宫 → 原酒店，推荐全天包车约 9 小时；时点为规划预留，按交通及馆方确认调整。",
      "note": "不安排登山或长线徒步。神宫表参道约有 80 级陡石阶，入场路线请司机与神宫确认；本殿内部不属于一般参拜开放区域。音乐厅内部须提前确认，上午无法入内时可与神宫对调，仍保留神宫约 2 小时。",
      "url": "https://kirishimajingu.or.jp/access/",
      "source": "雾岛神宫参拜与交通"
    },
    {
      "number": 24,
      "date": "2026-12-16",
      "city": "hiroshima",
      "title": "回访广岛，补全建筑拼图",
      "subtitle": "鹿儿岛 → 广岛 · 广岛 MOCA",
      "stay": "广岛",
      "badge": "长途移动",
      "am": "选择早班新干线回广岛，酒店寄存行李与午餐；建议午间前后抵达。",
      "pm": "约 14:00–17:00 参观广岛市现代美术馆与比治山，观看黑川纪章建筑及选定展览。",
      "transport": "鹿儿岛中央 → 广岛新干线约 3–4 小时，直达或换乘依具体班次；市内出租车。",
      "note": "这是较忙的交通＋参观日，需先锁定早班车；美术馆通常 16:30 最后入馆。",
      "url": "https://www.hiroshima-moca.jp/moca/guide",
      "source": "广岛 MOCA 来馆指南"
    },
    {
      "number": 25,
      "date": "2026-12-17",
      "city": "fukuoka",
      "title": "经福冈返港，旅程落在香港",
      "subtitle": "广岛 → 博多 → 福冈机场 → 香港",
      "stay": "抵达香港",
      "badge": "航班待确认",
      "am": "早餐后乘新干线到博多，再前往福冈机场国际航站楼。",
      "pm": "预留充足地面交通及值机时间，选择下午或晚间直飞香港的班次，当日抵港。",
      "transport": "广岛 → 博多新干线约 1–1.5 小时；出租车直达国际航站楼，或地铁至国内航站楼后换接驳。",
      "note": "具体航班未核实、未预订。建议博多到站至航班起飞预留至少 4–5 小时；跨城与机票分开预订，不保证衔接。",
      "url": "https://www.fukuoka-airport.jp/flight/",
      "source": "福冈机场航班查询"
    }
  ],
  "buildings": [
    [
      "11/24",
      "和平纪念资料馆与和平公园",
      "丹下健三",
      "广岛",
      "https://hpmmuseum.jp/"
    ],
    [
      "11/26",
      "下濑美术馆 SIMOSE",
      "坂茂",
      "广岛",
      "https://artsimose.jp/architecture/"
    ],
    [
      "11/28",
      "长崎县美术馆",
      "日本设计＋隈研吾",
      "长崎",
      "https://www.nagasaki-museum.jp/visitor/facility"
    ],
    [
      "12/03",
      "大分县立美术馆 OPAM",
      "坂茂",
      "大分",
      "https://www.opam.jp/about/construction.html"
    ],
    [
      "12/03",
      "Art Plaza 旧大分县立图书馆",
      "矶崎新",
      "大分",
      "https://www.art-plaza.jp/",
      "外墙施工、3F 常设展暂停"
    ],
    [
      "12/03–05",
      "山庄无量塔 Sansou Murata",
      "古民家再生 · 住宿美学",
      "由布院",
      "https://sansou-murata.com/",
      "住宿候选，连住及套餐待确认"
    ],
    [
      "12/05",
      "COMICO ART MUSEUM YUFUIN",
      "隈研吾",
      "由布院",
      "https://www.camy.oita.jp/",
      "预约优先，建议提前订"
    ],
    [
      "12/02 或后段",
      "界 别府 KAI Beppu",
      "隈研吾 · 通过入住体验",
      "别府",
      "https://hoshinoresorts.com/zh_cn/hotels/kaibeppu/sp/kenchiku/",
      "入住候选，未预订"
    ],
    [
      "12/07",
      "ACROS 福冈",
      "日本设计＋竹中工务店＋Emilio Ambasz",
      "福冈",
      "https://www.nihonsekkei.co.jp/projects/2060/"
    ],
    [
      "12/08",
      "九州国立博物馆",
      "菊竹清训／久米设计联合团队",
      "太宰府",
      "https://www.kyuhaku.jp/museum/museum_info06.html"
    ],
    [
      "12/08",
      "太宰府天满宫表参道星巴克",
      "隈研吾",
      "太宰府",
      "https://store.starbucks.co.jp/detail-1058/"
    ],
    [
      "12/09",
      "北九州市立美术馆本馆",
      "矶崎新",
      "北九州",
      "https://kmma.jp/visitor/honkan/guide/"
    ],
    [
      "12/10",
      "福冈市美术馆",
      "前川国男",
      "福冈",
      "https://www.fukuoka-art-museum.jp/"
    ],
    [
      "12/10",
      "九州芸文馆",
      "隈研吾团队",
      "筑后",
      "https://www.kyushu-geibun.jp/",
      "部分空间需核对开放与预约"
    ],
    [
      "12/15",
      "雾岛国际音乐厅 Miyama Conseru",
      "槙文彦团队",
      "雾岛",
      "https://miyama-conseru.or.jp/facility/",
      "内部需提前确认"
    ],
    [
      "12/15",
      "雾岛神宫 Kirishima Jingu",
      "传统建筑 · 国宝社殿",
      "雾岛",
      "https://kirishimajingu.or.jp/",
      "一般参拜免票；不安排登山"
    ],
    [
      "12/16",
      "广岛市现代美术馆",
      "黑川纪章",
      "广岛",
      "https://www.hiroshima-moca.jp/moca/about"
    ]
  ],
  "charters": [
    [
      "11.27",
      "九年庵 → 武雄",
      "博多接站，庭园与神社，之后入住武雄。",
      "建议 6–8 小时"
    ],
    [
      "12.06",
      "国东半岛寺院",
      "别府往返，富贵寺、真木大堂等按体力选择。",
      "建议 8–9 小时"
    ],
    [
      "12.12",
      "雾岛艺术之森",
      "鹿儿岛往返，室内展与户外作品从容参观。",
      "建议 8–9 小时"
    ],
    [
      "12.15",
      "音乐厅 → 雾岛神宫",
      "鹿儿岛往返；上午看建筑，午后神宫停留约 2–2.5 小时，参拜与短距离散步。",
      "建议约 9 小时"
    ]
  ],
  "sources": [
    [
      "日本法定假期",
      "https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html"
    ],
    [
      "广岛机场班表",
      "https://www.hij.airport.jp/flight/kokusai/hongkong.html"
    ],
    [
      "JR 九州",
      "https://www.jrkyushu.co.jp/english/"
    ],
    [
      "九年庵公开日程",
      "https://kunenan-saga.jp/"
    ],
    [
      "御船山活动与图片",
      "https://www.mifuneyamarakuen.jp/cn/autumn/"
    ],
    [
      "SIMOSE 建筑与图片",
      "https://artsimose.jp/architecture/"
    ],
    [
      "艺术之森年度日程",
      "https://open-air-museum.org/schedule"
    ],
    [
      "Art Plaza 施工与展览",
      "https://www.art-plaza.jp/"
    ],
    [
      "音乐厅参观",
      "https://miyama-conseru.or.jp/facility/"
    ],
    [
      "雾岛神宫参拜与交通",
      "https://kirishimajingu.or.jp/access/"
    ],
    [
      "神宫境内与参道",
      "https://kirishimajingu.or.jp/precincts/"
    ],
    [
      "仙岩园图片",
      "https://www.senganen.jp/"
    ],
    [
      "OPAM 图片",
      "https://www.opam.jp/"
    ],
    [
      "福冈美术馆图片",
      "https://www.fukuoka-art-museum.jp/"
    ],
    [
      "长崎图片",
      "https://glover-garden.jp/"
    ],
    [
      "无量塔客房与预订",
      "https://sansou-murata.com/reservation/"
    ],
    [
      "无量塔西别墅房型",
      "https://sansou-murata.com/room/nishi/"
    ]
  ]
};
