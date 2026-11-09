# 广岛与北九州｜旅行项目

> **最新同步（2026-11-09）**：网页、[文字行程](itinerary.md)、[结构化行程](plans/itinerary-20261109.json)、地图与六段酒店日期已统一。住宿界宮島1晚、希尔顿4晚、OND暂定2晚、长崎2晚、别府4晚、丽思6晚。

## 当前交互网页

2026 年 11 月 30 日至 12 月 19 日，20 天 19 晚，香港飞广岛、福冈回香港。广岛段前置，最终福冈连住六晚；具体航班、房型与库存待核实。蓝灰卡片杂志界面，手机底部五入口、目的地图鉴、独立目的地与单日详情、六段高端住宿及独立人民币比价页。

- 15 个目的地主题，真实照片、特色、推荐理由、体力和取舍。
- 宫岛、御船山、和平资料馆、MOCA、SIMOSE 各保留完整日。
- SIMOSE 12/3日归、MOCA 12/4；12/5经广岛站西行，离开后不从九州返回广岛。
- 国东两寺与别府工艺／铁轮在12/11二选一；12/13别府经北九州美术馆至福冈，Sonic分段经小仓寄存＋出租车，不再从福冈往返。
- 由布院当天往返；不住无量塔，不安排鹿儿岛、陶瓷镇、云仙或大船山。
- 酒店名称中英文、独立双床优先，按景观与设计、地理位置、交通便利排序。
- 官网／携程／Agoda／Booking／一休每个平台只留一个网页入口，无App按钮。卡片首列人民币公开样本参考，本次同口径报价仍待查询；日期接收状态按实际核验区分。

## 页面

线上：https://zxinrain.github.io/japan-autumn-2026/

`index.html` 主应用；`hotels.html` 独立比价核对；`hotel-comparison.csv` 人民币比价表；`itinerary.md` 完整文字。

`trip.json` 是当前行程，`destinations.json` 是图鉴原文；`scripts/build-travel-data.py` 合并图片与酒店入口，生成离线可读的 `travel-data.js`。网页无需第三方字体、CDN 或运行时 API。

## 归档

旧 25 天网站完整保存在 [archive/pre-20-day-trip-2026-11-08](https://github.com/zxinrain/japan-autumn-2026/tree/archive/pre-20-day-trip-2026-11-08)，对应提交 `420c924794aa3e16fe135c1b5141295a81168526`。新网站不再发布旧日期的行程与酒店数据。

## 固定版式与内容维护

V1.1规则见 [LAYOUT-RULES.md](LAYOUT-RULES.md)；仅改内容时保留已确认的版式、组件和交互。

酒店元数据源为`hotel-catalog.json`，按稳定酒店标识生成`hotel-platforms.json`；重排住宿不会串用图片或平台ID。公开价格样本列明原币、人数、餐食、出处和汇率，非指定日期库存报价。`hotel-link-audit.json`与`hotel-audit.js`记录30个入口的访问／日期核验状态；官网需手选，部分平台有验证限制，不能把参数编码当作日期已接收。

## 维护和检查

```sh
python3 scripts/build-travel-data.py
python3 scripts/validate.py
node scripts/check-data.cjs
node scripts/check-hotel-links.cjs
python3 -m http.server 4173 --bind 127.0.0.1
```

GitHub Actions 在推送 `main` 后运行检查并部署 Pages。平台入口编码检查不等于目标页面已接收日期；未取得本次日期同口径报价、未锁房、未实际预订门票、餐厅或交通。首日早航班尚待确认。

图文版权归原权利方。页面逐图列出来源，新增实景来源另见 `image-provenance.json`。历史照片不代表本次叶况、房型或开放状态。事实核验主要为 2026-11-08，长崎酒店 16:00 入住规则在 11/09 再核；具体临休、可售与时刻出行前复核。

新增糸岛12/16公共交通日归；12/17福冈市美术馆、12/18九州芸文馆分开。长崎两晚取消独立军舰岛日；福冈第二家酒店尚未选定，保持丽思六晚。旧文字版本见`archive/itinerary-text-before-sonic-itoshima.md`。

## 收藏餐厅同步（2026-11-09）

[餐厅分类与逐日安排](restaurants.md)：用户Google Maps收藏53处中提取31家餐厅，按10个城市分类。网页「每日行程」内进入餐厅索引，支持城市／类型筛选、Lucide分类图标、预约与导航；每日餐食卡区分主选和替换项，地图仅串联主选建议。餐位均未预订。吉宗移至12/7避开周二例休，12/8四海楼午餐，12/9保留博多站内换乘用餐。

餐厅唯一数据源`restaurants.json`；逐日关联在`trip.json`的`days[].dining`，构建执行：

```sh
python3 scripts/build-travel-data.py
python3 scripts/build-itinerary.py
python3 scripts/build-dining-index.py
node scripts/check-data.cjs
node scripts/check-dining.cjs
```

保持V1.1设计、五个底栏入口与六段酒店日期，不公开原收藏夹分享标识及账户资料。

## V1.2交互更新（2026-11-09）

每日行程采用日历选日、前后日期与左右滑动，地图／日程同步；支持跨月、键盘及减少动态。目的地图鉴增加景点／美食双栏目，可点击或左右切换，旧`#food`链接继续可用。每日餐食卡仅显示三餐空模板与美食图鉴入口，原有31家收藏及参考文档保留，待后续确认。既有五个底栏、酒店及V1.1视觉保持。`journey-ui.js`集中管理日历、横滑与动效，操作图片、时间轴、地图或表单不会切换日期。
