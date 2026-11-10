# 广岛与北九州旅行杂志

线上：https://zxinrain.github.io/japan-autumn-2026/

## 维护入口

- 唯一现行设计规范：[DESIGN.md](DESIGN.md) V2。公共实现：design-system.css，所有页面最后加载。
- LAYOUT-RULES.md只提供规范入口；旧规范已归档docs/design-history/pre-v2，不参与现行规则合并。
- trip.json／destinations.json／restaurants.json／hotel-catalog.json维护事实内容；衍生文件沿用scripts内生成器。
- style.css、layout.css和cost-layout.css负责结构与必要的页面布局，禁止新增全局视觉变量；typography.css仅作兼容入口。

## 本地验收

python3 scripts/validate.py，以及node scripts/check-data.cjs、check-interactions.cjs、check-design-system.cjs、check-dining.cjs、check-hotel-links.cjs、check-amap-routes.cjs。Pages工作流包含以上检查。浏览器再检查五档屏宽、地图、日历、折叠与轮播。

awesome-design-md参考库已在本地安装，Codex入口为本地适配，并非上游官方Skill。公开项目沿用已确认的旅行杂志风格。
