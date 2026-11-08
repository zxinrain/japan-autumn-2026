# 广岛与北九州｜卡片杂志旅行 App

2026 年 11 月 30 日至 12 月 19 日，20 天 19 晚，香港直飞往返广岛。全新卡片杂志界面，手机底部五入口、目的地图鉴、独立目的地与单日详情、六段高端住宿及独立人民币比价页。

- 14 个目的地主题，真实照片、特色、推荐理由、体力和取舍。
- 宫岛、御船山、和平资料馆、MOCA、SIMOSE 各保留完整日。
- 国东两寺与别府工艺／铁轮可切换，12/11 同步避免重复参观。
- 由布院当天往返；不住无量塔，不安排鹿儿岛、陶瓷镇、云仙或大船山。
- 酒店名称中英文、独立双床优先，按景观与设计、地理位置、交通便利排序。
- 官方／携程／Agoda／Booking／一休五个平台按实际能力提供入口；价格未查、App 日期未实测明确标注。

## 页面

线上：https://zxinrain.github.io/japan-autumn-2026/

`index.html` 主应用；`hotels.html` 独立比价核对；`hotel-comparison.csv` 人民币比价表；`itinerary.md` 完整文字。

`trip.json` 是当前行程，`destinations.json` 是图鉴原文；`scripts/build-travel-data.py` 合并图片与酒店入口，生成离线可读的 `travel-data.js`。网页无需第三方字体、CDN 或运行时 API。

## 归档

旧 25 天网站完整保存在 [archive/pre-20-day-trip-2026-11-08](https://github.com/zxinrain/japan-autumn-2026/tree/archive/pre-20-day-trip-2026-11-08)，对应提交 `420c924794aa3e16fe135c1b5141295a81168526`。新网站不再发布旧日期的行程与酒店数据。

## 维护和检查

```sh
python3 scripts/build-travel-data.py
python3 scripts/validate.py
node scripts/check-data.cjs
node scripts/check-hotel-links.cjs
python3 -m http.server 4173 --bind 127.0.0.1
```

GitHub Actions 在推送 `main` 后运行检查并部署 Pages。平台入口编码检查不等于已核对目标网页或实体 App；未取得实时报价、未锁房、未实际预订门票、餐厅或交通。首日早航班尚待确认。

图文版权归原权利方。页面逐图列出来源，新增实景来源另见 `image-provenance.json`。历史照片不代表本次叶况、房型或开放状态。事实核验主要为 2026-11-08，长崎酒店 16:00 入住规则在 11/09 再核；具体临休、可售与时刻出行前复核。
