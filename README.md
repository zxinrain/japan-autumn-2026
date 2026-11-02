# 山海之间，深秋慢行

广岛 × 九州 · 2026.11.23—12.17 · 25 天 24 晚。

简约旅行展示网页，纯 HTML / CSS / JavaScript，无需安装依赖或构建。中文标题不含“方案／提案”，保留编辑式旅行展示风格。未包含用户联系方式、账号凭证或预订资料。

## 内容

- 交互路线示意图、六城停留信息与交通。
- 25 天可筛选、可展开的详细行程。
- 建筑索引、四个包车日、航班及开放限制说明。
- 独立酒店页：17 家双语酒店、图片、特点、按日期查询链接。
- `hotel-comparison.csv`：独立人民币口径比价表，旧价不沿用；实时报价均待查询。
- `itinerary.md`：完整文字行程备份。

最终路线：香港直飞广岛 → 武雄／佐贺 → 长崎 → 别府／大分 → 福冈 → 鹿儿岛／雾岛 → 广岛 → 福冈飞香港。11/23 去程按广岛机场公布班表安排，12/17 返程具体航班待核实、未预订。

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

检查静态资源、文档锚点、JS 语法、连续 25 天日期、24 晚住宿、酒店新日期、五平台状态及携程协议。

## 发布到 GitHub Pages

目标公开仓库：[`zxinrain/japan-autumn-2026`](https://github.com/zxinrain/japan-autumn-2026)。仓库已创建；网站是否已上线以 GitHub Pages 部署结果为准。

1. 在 GitHub 创建公开仓库 `japan-autumn-2026`，可初始化 README；确保当前 GitHub 连接有该仓库访问权。
2. 将本目录内容上传至仓库 `main` 分支根目录，包含 `assets/` 和 `.github/workflows/pages.yml`。
3. 仓库 **Settings → Pages → Build and deployment → Source → GitHub Actions**。
4. 在 **Actions** 中运行 `Deploy travel website to GitHub Pages`，或再次推送 `main`。
5. 等待 Actions 成功后检查站点。预期网址（部署前不可用）：`https://zxinrain.github.io/japan-autumn-2026/`。

纯静态文件也支持分支部署：移除 Actions 工作流后，选择 `Deploy from a branch → main → /(root)`。不要同时混用两种发布方式。

GitHub 官方步骤：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 维护内容

- `data.js`：路线、每日行程、建筑、包车及来源。
- `hotels-data.js`：酒店、入住段、查询 ID；不保存历史价格。
- `style.css`：桌面／移动端响应式布局，系统中文字体与打印样式。
- `app.js` / `hotels.js`：交互，不依赖第三方脚本，不收集访问者信息。

酒店外链是否有房、价税与 App 唤起效果以渠道及设备实际结果为准。平台图片为历史参考，图片与内容归原权利方所有；页面已列出来源。实时红叶、场馆临时闭馆及交通需出行前复核。

## 当前核验范围

数据、语法、资源及本地 HTTP 检查可运行。当前 Work 设置禁用了浏览器操作，未完成桌面及手机浏览器截图验收；上线前建议补做两端目视检查。
