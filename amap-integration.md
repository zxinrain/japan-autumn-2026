# 高德海外路线接入

本项目采用高德官方 **AMap Global Routes**，而非把日本点位提交国内默认路线产品。官方说明海外服务需要开通权限的 Web Service Key：[概览](https://developer.amap.com/api/web-service/overview)、[海外路线文档](https://developer.amap.com/api/web-service/guide/routes)。

当前状态：接入代码、交通方式清单、无密钥数据文件和渲染已准备；用户已有海外权限 Key，尚未配置到本地进程，因此**还没有从高德取得真实路线**。公开站点不显示未取得真实轨迹的区间，不以直线或曲线替代道路。

## 本地配置与生成

Key仅从环境变量 `AMAP_GLOBAL_KEY` 读取。不要把真实Key写进前端、JSON、文档、公开仓库或构建日志。先在本机终端安全配置环境变量，再执行：

```sh
# 默认仅检查清单，无API请求
node scripts/build-amap-routes.cjs

# 先对御船山一天核验：正常为2个驾车区间
node scripts/build-amap-routes.cjs --generate --day 2026-12-06

# 确认返回数据、权限与用量后，生成全程驾车／步行区间
node scripts/build-amap-routes.cjs --generate
```

现有清单全程有59个不重复驾车／步行区间可请求；另16个跨城铁路、渡轮、巴士或混合区间，不套驾车请求。请求结果是路线参考，不代表预约、班次或实际乘坐轨迹；用量和计费以用户账户服务规则为准。没有Key时生成命令会直接停止，不发送请求。

- 驾车：`https://sg-restapi.opnavi.com/v3/direction/driving`
- 步行：`https://sg-restapi.opnavi.com/v3/direction/walking`
- 坐标：日本现有WGS-84，输入六位小数，不进行中国大陆GCJ-02纠偏。
- 只接受官方成功状态、有效`route.paths[].steps[].polyline`与匹配的路线端点；失败不会伪造曲线。
- 分段绘制API返回的步进折线，不把缺失步进用自画道路补齐。
- API连续失败三次会停止并保留原数据；不反复消耗无效请求。
- 已有有效数据会复用；需要重新查询时加`--refresh`。

## 公开文件

`amap-route-plan.json`／`.js`维护每一段的真实交通方式；`amap-routes.json`／`.js`只保存无密钥的坐标与来源状态。生成后先检查结果，再同步这两份路线数据到GitHub。未取得API结果、端点已改变或不支持的交通方式不画连线。

在线地图使用OpenStreetMap街道瓦片，本地Natural Earth仅作离线轮廓；用户要求的路线轨迹只在高德实际返回后叠加。路线与编号点都用蓝染蓝`--route-ink`，不采用红绿交通色或多彩点位。铁路／渡轮等未取得真实数据的区间不显示轨迹。

每日地图下方只保留一份地点名称导航清单。酒店等同一地点出现一次，保留“出发／返回”；小仓合并标注“寄存／取件”。完整交通顺序与内部路径仍保留往返，不为简化列表删除实际行程。

在线地图采用本地 Leaflet 1.9.4 与按需加载的 OpenStreetMap 街道瓦片；离线时回退到带真实坐标的 Natural Earth 轮廓。点位采用统一蓝染蓝。坐标代表地点／建筑位置，不保证车辆上下客入口；临行须复核接车点。
