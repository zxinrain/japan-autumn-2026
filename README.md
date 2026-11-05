# 广岛与九州｜2026 深秋旅行

广岛 × 九州 · 2026.11.23—12.17 · 25 天 24 晚。

简约旅行展示网页，纯 HTML / CSS / JavaScript，无需安装依赖或构建。中文标题不含“方案／提案”，保留编辑式旅行展示风格。未包含用户联系方式、账号凭证或预订资料。

## 内容

- 交互路线示意图、七处停留信息与交通。
- 25 天可筛选、可展开的详细行程。
- 17 个可折叠建筑图文条目：照片、设计者、简介、看点、预约提示与图片来源。
- 19 项门票／场馆规则，区分条件必约、建议提前订、通常可现场与先联系确认。
- 10 段铁路车票清单，逐段列出指定席开售日期、预订优先级及官方入口。
- 四个包车日、航班及开放限制说明；12/15 雾岛神宫午后约 2–2.5 小时，不安排登山。
- 独立酒店页：18 家双语酒店、图片、特点、按日期查询链接。
- `hotel-comparison.csv`：独立人民币口径比价表，旧价不沿用；实时报价均待查询。
- `itinerary.md`：完整文字行程备份。

最终路线：香港直飞广岛 → 武雄 → 长崎 → 别府／大分 → 由布院 → 别府 → 福冈 → 鹿儿岛／雾岛 → 广岛 → 福冈飞香港。11/23 去程按广岛机场公布班表安排，12/17 返程具体航班待核实、未预订。

## 旧版归档

改版前的线上版本保存在 [归档分支](https://github.com/zxinrain/japan-autumn-2026/tree/archive/pre-redesign-2026-11-06)，对应提交 `906b2c0`。归档包括旧版网页、图片、行程与酒店比价数据。[下载完整 ZIP](https://github.com/zxinrain/japan-autumn-2026/archive/906b2c0d7e432f4ddb495f97e03e3514514c6258.zip) 后解压，打开其中的 `index.html` 即可浏览。

## 本地预览

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 `http://127.0.0.1:4173/`。无需 Node 或 Python 第三方依赖。直接打开 `index.html` 亦可使用主要交互。

## 校验

```sh
python3 scripts/validate.py
node scripts/check-data.cjs
```

检查静态资源、文档锚点、JS 语法、连续 25 天日期、24 晚住宿、17 个建筑图文资源、铁路开售日期及酒店新日期。

## 发布到 GitHub Pages

公开仓库：[`zxinrain/japan-autumn-2026`](https://github.com/zxinrain/japan-autumn-2026)。站点：<https://zxinrain.github.io/japan-autumn-2026/>。

当前采用 GitHub Actions 发布：**Settings → Pages → GitHub Actions**。

推送到 `main` 后，`.github/workflows/pages.yml` 会校验网站、打包静态文件并部署。也可从 Actions 手动运行该工作流。

GitHub 官方步骤：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 维护内容

- `data.js`：路线、每日行程、建筑、包车及来源。
- `architecture-data.js`：建筑图片、版权来源、简介、看点及预约提示。
- `reservations-data.js`：门票／场馆要求、铁路车票开售日期、预约优先级与官方渠道。
- `hotels-data.js`：酒店、入住段、查询 ID；不保存历史价格。
- `style.css`：桌面／移动端响应式布局，系统中文字体与响应式表格。
- `app.js` / `hotels.js`：交互，不依赖第三方脚本，不收集访问者信息。

酒店外链是否有房、价税与 App 唤起效果以渠道及设备实际结果为准。平台图片为历史参考，图片与内容归原权利方所有；页面已列出来源。实时红叶、场馆临时闭馆及交通需出行前复核。

## 当前核验范围

已完成数据、语法、资源检查，并在 Chromium 的 320、390、768、1024 和 1440 像素宽度验证两页布局与关键交互。实体手机的 App 唤起与日期接收仍待实测。

## 山庄无量塔可行性更新

删除佐贺市两座建筑参观点，九年庵与武雄御船山保留。11/28从武雄日归长崎美术馆，长崎住宿缩为一晚，12/2转别府。大分县段五晚：别府12/2–3、无量塔候选12/3–5、别府12/5–7。

官网公开日历在2026/11/3返回“西 Nishi”12/3、4的单日可售记录，提供两晚入住线索；同房连住、两位成人、餐食及完整人民币报价未完成订单验证，未锁房。西约115㎡，卧室在二楼，有楼梯。查询快照见`murata-feasibility.json`。

## 酒店日期与 Android App 跳转

`hotel-links.js` 统一生成 App 目标、Android Intent 与同日期网页备用入口。携程使用移动页实际读取的 `atime` 和 `days`；仅传 `checkin/checkout` 会使页面沿用默认日期。每日行程通过 `date` 选择对应住宿段，同城候选的日期选择同步，避免回广岛或第二段别府错用首段日期。

2026-11-03 读取目标网页数据核对：携程 24/24、Agoda 24/24、一休 22/22 日期匹配。Agoda 18 家酒店的 ID 与 App scheme 取自各自移动页。Booking 返回访问验证，暂使用官方支持的日期搜索参数，未声称目标页面已验证。一休未核实“界·别府”收录，暂不提供其 App 按钮。

Android Intent 使用 Chrome 文档格式和同日期网页 fallback。App 未在实体 Android 手机上实测；指定包与携带参数不代表客户端必定接收。官网没有统一 App，部分预订系统仍需手选日期。核对记录见 `hotel-link-status.json`。CSV 同步提供 App 优先入口及各项限制。

验证：`node scripts/check-hotel-links.cjs` 覆盖 24 个酒店入住段、编码后的 App 目标、包名、网页回退与每日住宿段对应关系。
