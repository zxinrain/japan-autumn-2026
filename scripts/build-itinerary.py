# -*- coding: utf-8 -*-
from pathlib import Path
import json,datetime,urllib.parse
R=Path(__file__).resolve().parents[1]
t=json.loads((R/'trip.json').read_text())
def write(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
restaurants={r['id']:r for r in json.loads((R/'restaurants.json').read_text())['restaurants']}
lines=['# 广岛与北九州 2026｜确定酒店版','',f"11/30–12/19，20天19晚｜两位成人1间房｜香港→广岛、福冈→香港",'', '更新2026-11-12。NID 已预订。其余订单状态按实际确认。独立双床、含餐、取消与库存仍以实际订单为准。','', '## 住宿安排','', '| 入住—退房 | 酒店（中／英） | 晚数 |','|---|---|---:|']
for s in t['stays']:lines.append(f"| {s['in']}—{s['out']} | [{s['cn']} / {s['en']}]({t['sources'][s['source']][1]}) | {s['nights']} |")
lines+=['','## 此次调整','','- 12/13 包车经北九州本馆后入住 NID。福冈依次住 NID、中洲 CANVAS、丽思，每家两晚。','- 12/14 糸岛、12/15 太宰府、12/16 九州芸文馆。12/17–18 游福冈市区。','- 12/15 先寄存行李，再搭西铁去太宰府。12/17 打车换到丽思，轻装可搭一站地铁。','','## 每日安排','']
for i,d in enumerate(t['days']):
 if i==t['keyDays']['kunisaki'] and t.get('defaultKunisakiPlan')=='beppu':d={**d,**t['alternative']}
 dt=datetime.date(2026,11,30)+datetime.timedelta(days=i);stay=next((s for s in t['stays'] if s['in']<=dt.isoformat()<s['out']),None)
 lines +=[f"### Day {i+1}｜{dt:%m/%d} 周{'一二三四五六日'[dt.weekday()]}｜{d['title']}",'',f"住宿：{stay['cn']+' / '+stay['en'] if stay else '返港'}。",'']
 if d.get('transfer'):
  v=d['transfer'];lines +=[f"**跨城交通**：{v['route']}。全程预留：{v['duration']}；计划出发：{v['departure']}；15:00目标最迟出发：{v['latest']}；预计抵达：{v['arrival']}。{v['status']}。{v['note']}",'']
 for k,label in [('am','上午'),('noon','中午'),('pm','下午'),('night','夜晚'),('transport','交通'),('rest','休息'),('cut','取舍'),('photo','摄影')]:lines +=[f"**{label}**：{d[k]}",'']
 for meal,label in [('breakfast','早餐'),('lunch','午餐'),('dinner','晚餐')]:
  aa=[a for a in d.get('dining',[]) if a['meal']==meal]
  lines +=[f'**{label}推荐**：'+('；'.join(f"[{restaurants[a['restaurant']]['name']}]({restaurants[a['restaurant']]['map']}) · {a['time']} · {'收藏主选' if a['priority']=='primary' else '替换备选'}。{a['reason']} 未预约。" for a in aa) if aa else '　'),'']
 lines +=['[查看美食图鉴](https://zxinrain.github.io/japan-autumn-2026/index.html#destinations?tab=food)','', '导航：'+' → '.join(f"[{q}](https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(q)})" for q in d['maps']),'','来源：'+' · '.join(f"[{t['sources'][k][0]}]({t['sources'][k][1]})" for k in dict.fromkeys(d['sources'])),'']
lines+=['## 在地料理与屋台','']
for _,dish,name,note,url in t.get('localFood',[]):
 lines += [f'- **{dish}** · [{name}]({url})。{note}','']
lines+=['## 费用、门票与购票','', '[完整费用估算与线上购票](https://zxinrain.github.io/japan-autumn-2026/cost-estimate.html) · [独立酒店比价](https://zxinrain.github.io/japan-autumn-2026/hotels.html)','', '跨城包车供应商成交价未提供，当前是规划预留。国际机票、购物、水疗与高额酒水另计；不把往年照片当作2026叶况。']
(R/'itinerary.md').write_text('\n'.join(lines)+'\n');write('plans/itinerary-20261112.json',t)
