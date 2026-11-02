/* Updated for the current itinerary. All reservations remain unconfirmed. */
const RESERVATIONS = {
  "checked": "2026-11-03",
  "levels": {
    "conditional": "条件必约",
    "recommend": "建议提前订",
    "onsite": "通常可现场",
    "contact": "先联系确认"
  },
  "tickets": [
    {
      "id": "peace",
      "dates": [
        "2026-11-24"
      ],
      "name": "和平纪念资料馆",
      "level": "conditional",
      "when": "来馆前 90 天开放网购预约；本次日期已进入窗口",
      "detail": "11 月 07:30–08:30、17:30–18:30 的指定入馆时段，仅限提前网购预约。日间通常可现场购票；本行程建议提前选择时段，网购不等于免排队。",
      "url": "https://hpmmuseum.jp/modules/info/index.php?action=PageView&page_id=475"
    },
    {
      "id": "miyajima",
      "dates": [
        "2026-11-25"
      ],
      "name": "宫岛渡轮与严岛神社",
      "level": "onsite",
      "when": "普通渡轮与常规参拜通常当天办理",
      "detail": "本次不安排弥山登山。渡轮与神社门票分别处理；特殊活动不视为普通参拜票所含内容。",
      "url": "https://www.miyajima.or.jp/"
    },
    {
      "id": "simose",
      "dates": [
        "2026-11-26"
      ],
      "name": "下濑美术馆 SIMOSE",
      "level": "recommend",
      "when": "确认当期展览后，提前购买官网 Web 票",
      "detail": "普通个人观览没有核实到统一的强制提前预约要求；建议预购。餐厅、别墅及团体预约不属于普通观览票。",
      "url": "https://www.simose-museum.jp/en/info/"
    },
    {
      "id": "kunenan",
      "dates": [
        "2026-11-27"
      ],
      "name": "九年庵秋季公开",
      "level": "onsite",
      "when": "2026/11/14–11/29 公开；按现场购票与入园引导",
      "detail": "官方公开页未列普通个人提前预约要求。重点是公开日期、到场时间和临时交通安排，包车不能替代现场入园手续。",
      "url": "https://kunenan-saga.jp/"
    },
    {
      "id": "nagasaki",
      "dates": [
        "2026-11-28"
      ],
      "name": "长崎县美术馆",
      "level": "onsite",
      "when": "当期展览通常可现场购票；特展规则另查",
      "detail": "普通展览通常可现场购票；11/28 从武雄日归，建筑公共空间与付费展览分开判断。特别展览或导览以当期公告为准。",
      "url": "https://www.nagasaki-museum.jp/"
    },
    {
      "id": "mifuneyama",
      "dates": [
        "2026-11-30"
      ],
      "name": "御船山乐园：日枫＋夜枫",
      "level": "onsite",
      "when": "提前选定日夜票种，按官方售票办理",
      "detail": "官方未列普通入园必须提前预约。日场、夜场与日夜通票不同；若入住享入园权益的旅馆，先问酒店，避免重复购票。",
      "url": "https://www.mifuneyamarakuen.jp/cn/autumn/"
    },
    {
      "id": "oita",
      "dates": [
        "2026-12-03"
      ],
      "name": "OPAM／Art Plaza",
      "level": "contact",
      "when": "先确认 Art Plaza 施工与开放范围",
      "detail": "OPAM 展览票按当期展览购买。Art Plaza 外墙施工、3F 矶崎新常设展暂停，提前订票也不能保证完整建筑参观。",
      "url": "https://www.art-plaza.jp/"
    },
    {
      "id": "murata",
      "dates": [
        "2026-12-03",
        "2026-12-04"
      ],
      "name": "山庄无量塔：两晚住宿候选",
      "level": "contact",
      "when": "优先查询 12/3 入住、12/5 退房，成人 2 位",
      "detail": "官网单日库存有西别墅 12/3、4 可售记录，但未完成同房连住验证；完整套餐人民币价、早晚餐、二楼双床卧室与取消条款需确认。不是普通景点门票，也未锁房。",
      "url": "https://sansou-murata.com/room/nishi/",
      "booking": "https://sansou-murata.com/reservation/"
    },
    {
      "id": "comico",
      "dates": [
        "2026-12-05"
      ],
      "name": "COMICO ART MUSEUM YUFUIN",
      "level": "recommend",
      "when": "12/5 参观 → 按官网规则自 11/5 起预约",
      "detail": "预约优先制，强烈建议提前选择时段。官方允许有空位时接待未预约访客，因此不标为一律强制预约；满位时可能无法入馆。",
      "url": "https://www.camy.oita.jp/museumguide",
      "booking": "https://reserva.be/comicoartmuseumyufuin"
    },
    {
      "id": "acros",
      "dates": [
        "2026-12-07"
      ],
      "name": "ACROS 福冈公共空间",
      "level": "onsite",
      "when": "普通公共区域通常无需预约",
      "detail": "阶梯花园按天气与管理开放；演出、特别展览需另购对应票，不包含在建筑外观参观中。",
      "url": "https://www.acrosfukuoka.com/acros/"
    },
    {
      "id": "kyuhaku",
      "dates": [
        "2026-12-08"
      ],
      "name": "九州国立博物馆／太宰府",
      "level": "onsite",
      "when": "文化交流展通常现场购票，特别展另查",
      "detail": "国博特别展可能另售门票或采用指定入场方式。天满宫一般参拜、参道星巴克与国博门票分别处理。",
      "url": "https://www.kyuhaku.jp/visit/visit_qanda.html"
    },
    {
      "id": "kitakyushu",
      "dates": [
        "2026-12-09"
      ],
      "name": "北九州市立美术馆本馆",
      "level": "onsite",
      "when": "收藏展通常可现场购票，特展另查",
      "detail": "订票或查展时选择山丘上的本馆，避免误选小仓分馆；特展及相关活动以当期公告为准。",
      "url": "https://kmma.jp/visitor/honkan/guide/"
    },
    {
      "id": "fukuoka-art",
      "dates": [
        "2026-12-10"
      ],
      "name": "福冈市美术馆／九州芸文馆",
      "level": "contact",
      "when": "先确认芸文馆开放空间；收费展览各自购票",
      "detail": "福冈美术馆收藏展通常可现场购票；芸文馆的活动、茶室与部分室内空间可能需预约或不对普通访客开放。",
      "url": "https://www.kyushu-geibun.jp/"
    },
    {
      "id": "forest",
      "dates": [
        "2026-12-12"
      ],
      "name": "雾岛艺术之森",
      "level": "onsite",
      "when": "12/12 起室内新展恢复；门票按当日规则购买",
      "detail": "官方年度日程列 12/1–11 室内休展。本次选择 12/12；室内特展与园区收费口径以当期售票为准。",
      "url": "https://open-air-museum.org/schedule"
    },
    {
      "id": "senganen",
      "dates": [
        "2026-12-13"
      ],
      "name": "仙岩园／尚古集成馆",
      "level": "recommend",
      "when": "提前看清票种与开放区域，再选择购买",
      "detail": "不同区域可能使用不同票种；本行程未加入需另约的文化体验。普通入园不标为一律必须提前预约。",
      "url": "https://www.senganen.jp/"
    },
    {
      "id": "sakurajima",
      "dates": [
        "2026-12-14"
      ],
      "name": "樱岛渡轮与岛内交通",
      "level": "onsite",
      "when": "普通客运渡轮与巴士通常现场办理",
      "detail": "如改为岛内包车，需提前联系车辆；普通渡轮不等同预约观光游船。",
      "url": "https://www.sakurajima.gr.jp/"
    },
    {
      "id": "miyama",
      "dates": [
        "2026-12-15"
      ],
      "name": "雾岛国际音乐厅内部参观",
      "level": "contact",
      "when": "先联系馆方确认 12/15 是否可入内",
      "detail": "常规内部参观时段 09:30–11:30／13:30–15:30，租场与维护时可能无法进入。确认参观不等于购买演出票；若听演出，另查场次和门票。",
      "url": "https://miyama-conseru.or.jp/facility/"
    },
    {
      "id": "shrine",
      "dates": [
        "2026-12-15"
      ],
      "name": "雾岛神宫 Kirishima Jingu",
      "level": "onsite",
      "when": "一般参拜免费，无需预约门票",
      "detail": "午后预留约 2–2.5 小时，一般开放区域参拜与短距离散步。祈愿、特别拝观另询；不承诺进入本殿内部。",
      "url": "https://kirishimajingu.or.jp/access/"
    },
    {
      "id": "moca",
      "dates": [
        "2026-12-16"
      ],
      "name": "广岛市现代美术馆",
      "level": "onsite",
      "when": "普通展览通常可现场购票，特展另查",
      "detail": "先锁定当天早班新干线，保证午后参观时间；通常 16:30 最后入馆，不把购票等同预约延迟入馆。",
      "url": "https://www.hiroshima-moca.jp/moca/guide"
    }
  ],
  "rail": [
    {
      "id": "rail-1127",
      "date": "2026-11-27",
      "name": "广岛 → 博多",
      "train": "山阳新干线",
      "release": "2026-10-27",
      "priority": "优先划位",
      "detail": "接九年庵包车，先定早班与到站时间，再确认司机。普通票有无自由席取决于所选列车；建议两人相邻指定席。",
      "url": "https://www.jr-odekake.net/goyoyaku/e5489/"
    },
    {
      "id": "rail-1128",
      "date": "2026-11-28",
      "name": "武雄温泉 ↔ 长崎",
      "train": "Kamome 新干线，日归往返",
      "release": "2026-10-28",
      "priority": "建议划位",
      "detail": "长崎美术馆前移至本日。单程约半小时，需计入车站与美术馆间交通，返程给武雄旅馆晚餐留余量；普通个人票按所选列车席别购买。",
      "url": "https://www.jrkyushu.co.jp/railway/netyoyaku/"
    },
    {
      "id": "rail-1201",
      "date": "2026-12-01",
      "name": "武雄温泉 → 长崎",
      "train": "西九州新干线 Kamome",
      "release": "2026-11-01",
      "priority": "建议划位",
      "detail": "本段较短，普通列车通常提供自由席；若希望确定座位与时间，可提前买指定席。",
      "url": "https://www.jrkyushu.co.jp/railway/netyoyaku/"
    },
    {
      "id": "rail-1202",
      "date": "2026-12-02",
      "name": "长崎 → 武雄温泉 → 博多 → 别府",
      "train": "Kamome＋Relay Kamome＋Sonic",
      "release": "2026-11-02",
      "priority": "优先划位",
      "detail": "长途多次换乘，建议一次核对并购买整段连接。各列车、各区间席位需分别确认，不只订首段。",
      "url": "https://www.jrkyushu.co.jp/railway/netyoyaku/"
    },
    {
      "id": "rail-1207",
      "date": "2026-12-07",
      "name": "别府 → 博多",
      "train": "Sonic 特急",
      "release": "2026-11-07",
      "priority": "建议划位",
      "detail": "通常有自由席；为两人相邻与携行李移动，建议提前指定席。Sonic 是在来线特急，不是新干线。",
      "url": "https://www.jrkyushu.co.jp/railway/netyoyaku/"
    },
    {
      "id": "rail-1209",
      "date": "2026-12-09",
      "name": "博多 ↔ 小仓",
      "train": "山阳新干线，往返",
      "release": "2026-11-09",
      "priority": "可临近购票",
      "detail": "车程较短，不要求必须提前预约；想确定往返时间与相邻座位可提前划位。",
      "url": "https://www.jr-odekake.net/goyoyaku/e5489/"
    },
    {
      "id": "rail-1210",
      "date": "2026-12-10",
      "name": "博多 ↔ 筑后船小屋",
      "train": "九州新干线，往返",
      "release": "2026-11-10",
      "priority": "建议划位",
      "detail": "先核对是否停靠筑后船小屋，不是每班快车都停；按美术馆参观结束时间选择去程。",
      "url": "https://www.jrkyushu.co.jp/railway/netyoyaku/"
    },
    {
      "id": "rail-1211",
      "date": "2026-12-11",
      "name": "博多 → 鹿儿岛中央",
      "train": "九州新干线 Sakura／Mizuho 等",
      "release": "2026-11-11",
      "priority": "建议划位",
      "detail": "长距离酒店转移，建议相邻指定席；有特大行李时同时处理对应席位。",
      "url": "https://www.jrkyushu.co.jp/railway/netyoyaku/"
    },
    {
      "id": "rail-1216",
      "date": "2026-12-16",
      "name": "鹿儿岛中央 → 广岛",
      "train": "九州／山阳新干线，直达或换乘",
      "release": "2026-11-16",
      "priority": "优先划位",
      "detail": "必须先落实早班计划，给午后的广岛 MOCA 留足时间；直达与换乘方案按实际车次购买。这里的“优先”是行程建议，不代表全列车强制预约。",
      "url": "https://www.jr-odekake.net/goyoyaku/e5489/"
    },
    {
      "id": "rail-1217",
      "date": "2026-12-17",
      "name": "广岛 → 博多",
      "train": "山阳新干线，衔接福冈返港",
      "release": "2026-11-17",
      "priority": "优先划位",
      "detail": "先确定福冈→香港航班，再反推早班新干线；博多到站至航班起飞建议预留至少 4–5 小时。铁路与航班分开购票，不保证衔接。",
      "url": "https://www.jr-odekake.net/goyoyaku/e5489/"
    }
  ],
  "services": [
    {
      "name": "四个包车日",
      "date": "11/27、12/6、12/12、12/15",
      "detail": "提前落实车型、行李空间、用车时长、停车及高速费用、司机等候与取消条款；尤其 11/27 的博多接站和 12/15 音乐厅开放时段。"
    },
    {
      "name": "山庄无量塔两晚可行性",
      "date": "优先 12/3–5 · 备选日期另查",
      "detail": "西别墅的公开库存有连续两夜可售线索，未完成结算与连住验证。需核对成人 2 位、同一客房、独立床位、早晚餐及取消条款；二楼卧室有楼梯。"
    },
    {
      "name": "温泉旅馆与独立双床",
      "date": "住宿日期已在酒店独立页更新",
      "detail": "武雄仍住四晚。别府改为前段一晚、后段两晚，由布院另两晚；各段酒店与独立双床库存均须重新确认，不能沿用旧版四晚连住报价。"
    },
    {
      "name": "返港航班",
      "date": "12/17 福冈 → 香港",
      "detail": "目前具体班次、余票与时间仍待确认；先确定机票，再最终锁定当天的广岛→博多铁路时间。"
    }
  ],
  "sources": [
    [
      "JR 指定席开售规则",
      "https://www.jrkyushu.co.jp/railway/ticket/rule/01/index.html"
    ],
    [
      "JR 九州事前申请说明",
      "https://www.jrkyushu.co.jp/railway/netyoyaku/guide/search.html"
    ],
    [
      "JR 新干线特大行李规则",
      "https://www.jrkyushu.co.jp/railway/ticket/rule/tokudai_baggage/"
    ],
    [
      "Nozomi 全席指定期间",
      "https://railway.jr-central.co.jp/nozomi/"
    ],
    [
      "山庄无量塔预订入口",
      "https://sansou-murata.com/reservation/"
    ]
  ]
};
