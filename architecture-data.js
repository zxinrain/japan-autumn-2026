/* Updated for the current itinerary. All reservations remain unconfirmed. */
const ARCHITECTURE_DETAILS = {
  "和平纪念资料馆与和平公园": {
    "image": "assets/building-peace.webp",
    "caption": "资料馆本馆外观",
    "credit": "广岛县「ひろしまたてものがたり」",
    "source": "https://www.pref.hiroshima.lg.jp/soshiki_file/tatemonogatari/page001.html",
    "intro": "丹下健三把资料馆本馆架空，以水平体量、列柱与公园轴线组织纪念空间。建筑与慰灵碑、原爆圆顶的视线关系，是这一天值得细看的部分。",
    "look": "架空层、立面遮阳构件、公园轴线。",
    "booking": "资料馆早晚指定时段须提前网购预约；日间通常可现场购票，仍建议提前购买。",
    "level": "conditional"
  },
  "下濑美术馆 SIMOSE": {
    "image": "assets/simose.webp",
    "caption": "美术馆入口与建筑外观",
    "credit": "下濑美术馆官网",
    "source": "https://simose-museum.jp/about/",
    "intro": "坂茂以玻璃、木结构与濑户内海景观构成这座美术馆。通透的入口和展览空间，让看建筑、看展与看海成为连续的体验。",
    "look": "入口木结构、玻璃立面、展厅与水面的关系。",
    "booking": "普通个人观览可查看当日票；建议先选展览与日期，再购买官网 Web 票。团体、餐厅及其他体验另查。",
    "level": "recommend"
  },
  "长崎县美术馆": {
    "image": "assets/building-nagasaki.webp",
    "caption": "运河两侧的美术馆建筑",
    "credit": "长崎县美术馆官网",
    "source": "https://www.nagasaki-museum.jp/visitor/facility",
    "intro": "日本设计与隈研吾合作，以运河为中心连接两侧馆舍。玻璃、石材与桥把城市水岸带入建筑，适合从外部绕行后再进入展厅。",
    "look": "跨越运河的连接空间、石材与玻璃、屋顶公共空间。",
    "booking": "公共空间与付费展览分开判断；普通展览通常可现场购票，特展先核对售票规则。",
    "level": "onsite"
  },
  "大分县立美术馆 OPAM": {
    "image": "assets/opam.webp",
    "caption": "OPAM 外立面",
    "credit": "大分县立美术馆官网",
    "source": "https://www.opam.jp/about/construction.html",
    "intro": "坂茂以木格构立面和开放的公共空间回应城市。建筑本身的通透感，与内部展览、入口大厅及街道之间的联系同样值得停留。",
    "look": "立面木格构、底层公共空间、内外视线。",
    "booking": "建筑公共空间与展览票分开；特展可能单独售票，按 12/3 当期展览页面确认。",
    "level": "onsite"
  },
  "Art Plaza 旧大分县立图书馆": {
    "image": "assets/building-artplaza.webp",
    "caption": "历史外观参考；不代表施工期间现场",
    "credit": "Art Plaza 官网",
    "source": "https://www.art-plaza.jp/",
    "intro": "由矶崎新设计的旧图书馆转为艺术空间，混凝土构件、突出体量和外部空间关系体现其早期建筑语言。此站仍保留，但参观范围取决于维修情况。",
    "look": "混凝土梁与突出构件、外部空间组织。",
    "booking": "先查维修与开放区域；外墙施工、3F 矶崎新常设展暂停，预约也不能保证完整参观。",
    "level": "contact"
  },
  "COMICO ART MUSEUM YUFUIN": {
    "image": "assets/building-comico.webp",
    "caption": "美术馆室内与由布岳景观",
    "credit": "© Mitsumasa Fujitsuka／隈研吾建筑都市设计事务所",
    "source": "https://kkaa.co.jp/en/project/comico-art-museum-yufuin/",
    "intro": "隈研吾以烧杉等材料营造低调的艺术空间，建筑与由布院的山景、庭院及作品彼此呼应。应把它作为看展与建筑共同体验，而非只拍入口。",
    "look": "烧杉材料、屋顶与室内框景、庭院作品。",
    "booking": "预约优先，建议提前订；12/5 退房后参观，按官网规则自 11/5 起预约。有空位时可接待未预约访客。",
    "level": "recommend"
  },
  "界 别府 KAI Beppu": {
    "image": "assets/building-kai.webp",
    "caption": "界 别府建筑外观",
    "credit": "© Shimizu Corporation／隈研吾建筑都市设计事务所",
    "source": "https://kkaa.co.jp/project/kai-beppu/",
    "intro": "隈研吾设计的海滨温泉旅馆，以客房与海景的关系形成住宿体验。此站通过入住实现，建筑、温泉与餐食共同构成停留内容。",
    "look": "临海立面、客房框景、公共空间与海的关系。",
    "booking": "需要先订住宿，非普通美术馆门票；目前只是候选酒店，未确认双床库存，不能保证非住客入内。",
    "level": "contact"
  },
  "ACROS 福冈": {
    "image": "assets/building-acros.webp",
    "caption": "面向公园的阶梯绿化立面",
    "credit": "日本设计项目官网",
    "source": "https://www.nihonsekkei.co.jp/projects/2060/",
    "intro": "日本设计、竹中工务店与 Emilio Ambasz 合作，让阶梯绿化与城市公共设施叠合。面向公园的一侧与城市立面形成不同表情。",
    "look": "阶梯花园与公园连接、建筑两侧立面对比。",
    "booking": "普通公共空间通常不需预约；花园开放受天气与管理影响，演出、展览另购相应票。",
    "level": "onsite"
  },
  "九州国立博物馆": {
    "image": "assets/building-kyuhaku.webp",
    "caption": "博物馆屋顶与山林环境",
    "credit": "九州国立博物馆官网",
    "source": "https://www.kyuhaku.jp/museum/museum_info06.html",
    "intro": "由菊竹清训／久米设计联合团队设计，大跨度、起伏的屋顶与太宰府山林相连。建筑尺度与文化交流展共同构成主要参观内容。",
    "look": "波浪形屋顶、玻璃立面与入口大厅。",
    "booking": "文化交流展通常可现场购票；特别展可能单独售票或设入场安排，须查 12/8 当期公告。",
    "level": "onsite"
  },
  "太宰府天满宫表参道星巴克": {
    "image": "assets/building-starbucks.webp",
    "caption": "木构件交织的店内空间",
    "credit": "© Masao Nishikawa／隈研吾建筑都市设计事务所",
    "source": "https://kkaa.co.jp/en/project/starbucks-coffee-at-dazaifutenmangu-omotesando/",
    "intro": "隈研吾在狭长店铺内以斜向交织的木构件形成空间，让历史参道上的日常咖啡店拥有鲜明的当代木构表达。",
    "look": "木构件交叉节点、入口与纵深视线。",
    "booking": "普通到店无需建筑门票；按门店营业与排队情况进入，不保证有座位。",
    "level": "onsite"
  },
  "北九州市立美术馆本馆": {
    "image": "assets/building-kitakyushu.webp",
    "caption": "山丘本馆的双筒形建筑外观",
    "credit": "北九州市官方旅游网站",
    "source": "https://kitakyushucity.guide/spots/detail/5bc6d304-00ef-4c65-86ec-e20279678a85",
    "intro": "矶崎新以向外突出的双筒形体塑造山丘上的美术馆，常被称作“丘上的望远镜”。应前往本馆，连同城市远景与外部空间一起观看。",
    "look": "双筒体量、悬挑关系、山丘上的城市视野。",
    "booking": "普通展览通常现场购票；特别展另核对。山丘本馆与小仓分馆不是同一处。",
    "level": "onsite"
  },
  "福冈市美术馆": {
    "image": "assets/fukuoka.webp",
    "caption": "美术馆与大濠公园环境",
    "credit": "福冈市美术馆官网",
    "source": "https://www.fukuoka-art-museum.jp/",
    "intro": "前川国男设计的美术馆位于大濠公园，以有温度的外墙色彩、庭院与层次丰富的公共空间，形成适合步行观看的现代建筑。",
    "look": "外墙色彩、庭院、入口及公园联系。",
    "booking": "收藏展通常可现场购票，特别展另查售票规则；本次上午参观后需转往筑后。",
    "level": "onsite"
  },
  "九州芸文馆": {
    "image": "assets/building-geibun.webp",
    "caption": "本馆连续折坡屋顶",
    "credit": "© Hiroyuki Kawano／隈研吾建筑都市设计事务所",
    "source": "https://kkaa.co.jp/project/kyushu-geibun-kan-museum-main-building/",
    "intro": "隈研吾团队把连续的坡屋顶组织成近似聚落的文化设施，与周边住宅和公园相呼应。紧邻筑后船小屋站，适合观察低矮体量和屋顶之间的关系。",
    "look": "折坡屋顶、馆舍间隙、建筑与公园的连接。",
    "booking": "先确认当日开放空间；活动、展览、茶室或特殊体验可能需单独预约，不能保证全部室内可进入。",
    "level": "contact"
  },
  "雾岛国际音乐厅 Miyama Conseru": {
    "image": "assets/building-miyama.webp",
    "caption": "馆方提供的外部与主厅组合参考图",
    "credit": "雾岛国际音乐厅官网",
    "source": "https://miyama-conseru.or.jp/facility/",
    "intro": "槙文彦团队把音乐厅放入雾岛高原的自然场地。建筑外部与木质主厅应共同观看，内部参观是否开放将决定这站体验的完整程度。",
    "look": "场地与建筑体量、主厅木质空间。",
    "booking": "须提前联系确认 12/15 内部参观时段；常规参观不等于购买演出票，租场与维护可能限制进入。",
    "level": "contact"
  },
  "雾岛神宫 Kirishima Jingu": {
    "image": "assets/building-shrine.webp",
    "caption": "朱红社殿与境内景观",
    "credit": "雾岛神宫官网",
    "source": "https://kirishimajingu.or.jp/national-treasure/",
    "intro": "传统建筑补充站。现有社殿于 1715 年重建，国宝本殿、币殿与拜殿以朱漆、彩饰和层次分明的空间构成体现南九州神社建筑特色。",
    "look": "一般开放区域的社殿观赏、参道与杉林。",
    "booking": "一般参拜免费，无需预订门票；祈愿、特别拝观另询。表参道有约 80 级陡石阶，不安排登山。",
    "level": "onsite"
  },
  "广岛市现代美术馆": {
    "image": "assets/building-moca.webp",
    "caption": "比治山上的美术馆与城市环境",
    "credit": "广岛市现代美术馆官网；摄影署名见原页",
    "source": "https://www.hiroshima-moca.jp/moca/about",
    "intro": "黑川纪章将美术馆组织在比治山上，建筑与地形、入口公共空间及城市景观共同构成体验。回访广岛的下午，重点看建筑与选定展览。",
    "look": "入口空间、馆舍与山丘地形、公共区域。",
    "booking": "普通展览通常可现场购票；特别展按当期公告。12/16 须先锁定鹿儿岛出发的早班新干线。",
    "level": "onsite"
  },
  "山庄无量塔 Sansou Murata": {
    "image": "assets/hotel17.webp",
    "caption": "西 Nishi 别墅客厅参考图",
    "credit": "山庄无量塔官网／© MURATA",
    "source": "https://sansou-murata.com/room/nishi/",
    "intro": "位于由布院鸟越地区的离栋温泉旅馆，以古民家与现代室内美学形成各不相同的客房。本次优先核对西别墅，保留完整一天体验客房温泉与馆内空间。",
    "look": "古梁与室内家具、客房温泉、Tan’s bar；客房体验以实际预订房型为准。",
    "booking": "优先尝试 12/3–5 两晚。官网单日库存有“西”12/3、4 可售记录，未锁房；两人同房连住、早晚餐、二楼双床卧室与完整人民币报价仍须确认。",
    "level": "contact"
  }
};
