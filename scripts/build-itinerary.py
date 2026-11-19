# -*- coding: utf-8 -*-
from pathlib import Path
import json,datetime,urllib.parse
R=Path(__file__).resolve().parents[1]
t=json.loads((R/'trip.json').read_text())
def write(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
restaurants={r['id']:r for r in json.loads((R/'restaurants.json').read_text())['restaurants']}
lines=['# 广岛与北九州 2026｜确定酒店版','',f"11/30–12/19，20天19晚｜两位成人1间房｜香港→广岛、福冈→香港",'', '行程更新2026-11-20；餐食预约更新2026-11-20。12/2 19:00酔心本店、12/5 19:00あん梅、12/16 19:00めしや コヤマパーキング、12/18 19:00郷土料理嗣味晚餐已预订（用户确认）；福冈NID与丽思各三晚，调整后酒店订单待核对。其余订单状态按实际确认。独立双床、含餐、取消与库存仍以实际订单为准。','', '## 住宿安排','', '| 入住—退房 | 酒店（中／英） | 晚数 |','|---|---|---:|']
for s in t['stays']:lines.append(f"| {s['in']}—{s['out']} | [{s['cn']} / {s['en']}]({t['sources'][s['source']][1]}) | {s['nights']} |")
lines+=['','## 此次调整','','- 12/7かもめ17号11:03–11:28抵达，先到Hotel Nagasaki寄存行李，再游浦上北线。','- 12/8换英迪格，县美术馆重点参观后，以电车5号、斜行电梯与短途车串起相生地狱坂、大浦天主堂和锅冠山。美术馆从整日改为约2小时15分。','- 12/13 包车经北九州本馆后入住 NID。福冈12/13–16住NID三晚，12/16–19住丽思三晚。','- 12/14 糸岛、12/15 太宰府、12/16 九州芸文馆。12/17–18 游福冈市区。','- 12/15从NID轻装往返太宰府；12/16 NID退房后先到丽思寄存，再去九州芸文馆，返城入住休息后赴Koyama 19:00已预订晚餐。12/17不再换酒店。','','- 12/9–11界别府，12/11–12 ENOWA，12/12–13别府洲际。12/10轻装往返大分，12/11 COMICO与金鳞湖，12/12默认直达洲际；国东备选行李随车。','- 12/13 09:00从洲际包车出发，看北九州美术馆本馆两小时，再游小仓与门司港。','','- 12/18市内交通改地铁优先；18:00丽思出发，经天神南→七隈线往桥本1站→渡边通1号口，赴嗣味19:00预约。出租车只作备用。','- 12/13晚餐改中洲屋台；12/14天神ShinShin、12/15博多一双中洲店、12/17元気一杯为顺路拉面候选，均未预约。12/18嗣味19:00已预订。','','## 每日安排','']
for i,d in enumerate(t['days']):
 if i==t['keyDays']['kunisaki'] and t.get('defaultKunisakiPlan')=='beppu':d={**d,**t['alternative']}
 dt=datetime.date(2026,11,30)+datetime.timedelta(days=i);stay=next((s for s in t['stays'] if s['in']<=dt.isoformat()<s['out']),None)
 lines +=[f"### Day {i+1}｜{dt:%m/%d} 周{'一二三四五六日'[dt.weekday()]}｜{d['title']}",'',f"住宿：{stay['cn']+' / '+stay['en'] if stay else '返港'}。",'']
 if d.get('transfer'):
  v=d['transfer'];lines +=[f"**跨城交通**：{v['route']}。全程预留：{v['duration']}；计划出发：{v['departure']}；15:00目标最迟出发：{v['latest']}；预计抵达：{v['arrival']}。{v['status']}。{v['note']}",'']
 for k,label in [('am','上午'),('noon','中午'),('pm','下午'),('night','夜晚'),('transport','交通'),('rest','休息'),('cut','取舍'),('photo','摄影')]:lines +=[f"**{label}**：{d[k]}",'']
 for meal,label in [('breakfast','早餐'),('lunch','午餐'),('dinner','晚餐')]:
  aa=[a for a in d.get('dining',[]) if a['meal']==meal]
  suggested=[a for a in d.get('mealRecommendations',[]) if a['meal']==meal]
  booked=[a for a in d.get('mealReservations',[]) if a['meal']==meal]
  if booked:
   lines +=[f'**{label}推荐**：'+'；'.join(f"[{a['name']}]({a['map']}) · {a['time']} · {a['status']}（{a['confirmedBy']}）。{a['address']}。{a['note']}" for a in booked),'']
   continue
  if suggested:
   lines +=[f'**{label}推荐**：'+'；'.join(f"[{a['name']}]({a['map']}) · {a['time']} · {a['status']}。{a['note']}" for a in suggested),'']
   continue
  lines +=[f'**{label}推荐**：'+('；'.join(f"[{restaurants[a['restaurant']]['name']}]({restaurants[a['restaurant']]['map']}) · {a['time']} · {'收藏主选' if a['priority']=='primary' else '替换备选'}。{a['reason']} 未预约。" for a in aa) if aa else '　'),'']
 lines +=['[查看美食图鉴](https://zxinrain.github.io/japan-autumn-2026/index.html#destinations?tab=food)','', '导航：'+' → '.join(f"[{q}](https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(q)})" for q in d['maps']),'','来源：'+' · '.join(f"[{t['sources'][k][0]}]({t['sources'][k][1]})" for k in dict.fromkeys(d['sources'])),'']
lines+=['## 在地料理与屋台','']
for _,dish,name,note,url in t.get('localFood',[]):
 lines += [f'- **{dish}** · [{name}]({url})。{note}','']
lines+=['## 费用、门票与购票','', '[完整费用估算与线上购票](https://zxinrain.github.io/japan-autumn-2026/cost-estimate.html) · [独立酒店比价](https://zxinrain.github.io/japan-autumn-2026/hotels.html)','', '跨城包车供应商成交价未提供，当前是规划预留。国际机票、购物、水疗与高额酒水另计；不把往年照片当作2026叶况。']
(R/'itinerary.md').write_text('\n'.join(lines)+'\n');write('plans/itinerary-20261112.json',t)
