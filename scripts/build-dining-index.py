# -*- coding: utf-8 -*-
from pathlib import Path
import json,datetime
R=Path(__file__).resolve().parents[1]
D=json.loads((R/'restaurants.json').read_text());T=json.loads((R/'trip.json').read_text());by={r['id']:r for r in D['restaurants']}
preferred=sum(r['userPriority']=='preferred' for r in D['restaurants']);scheduled=len({a['restaurant'] for d in T['days'] for a in d['dining'] if a['priority']=='primary'})
lines=['# 九州 · Winn｜收藏餐厅与逐日安排','',f'核对2026-11-10。共35家餐厅，默认收藏{preferred}家；{scheduled}家作为逐日主选，六盛同餐替换，なかしま待安排。其余为备选。网页右上角星标可调整，选择只保存在当前浏览器，不自动改变已排餐段。所有餐厅均未预约，未安排餐段保持空白。','','## 每日餐饮','','| 日期 | 早餐 | 午餐 | 晚餐 |','|---|---|---|---|']
for i,d in enumerate(T['days']):
 cells=[]
 for meal in ['breakfast','lunch','dinner']:
  aa=[a for a in d['dining'] if a['meal']==meal];cells.append('<br>'.join(f"[{by[a['restaurant']]['name']}]({by[a['restaurant']]['map']}) {a['time']} {'收藏主选' if a['priority']=='primary' else '收藏替换备选'}" for a in aa))
 lines.append('| '+(datetime.date(2026,11,30)+datetime.timedelta(days=i)).strftime('%m/%d')+' | '+' | '.join(cells)+' |')
lines+=['','12/12上述安排仅适用于别府休整；选择国东则廣門与六盛均不纳入当天。不替换ENOWA及界的酒店晚餐；OND若含夕食先与あん梅择一。12/13先入住休息，一双排队超过20分钟或抵达延误则删。12/16こと需先核巴士，不能卡点赴约。','','## 逐日交通与预约理由','']
for i,d in enumerate(T['days']):
 for a in d['dining']:
  r=by[a['restaurant']];date=(datetime.date(2026,11,30)+datetime.timedelta(days=i)).strftime('%m/%d');lines +=[f"- **{date} {a['time']} {r['name']}**：{a['reason']} {r['rules']} [核查与订位]({r['source']})。未预约。",'']
lines+=['## 按城市分类','']
for city in ['武雄市','广岛市','廿日市·宫岛','长崎市','别府市','福冈市','春日市','那珂川市','久留米市','熊本市','唐津市']:
 rows=sorted([r for r in D['restaurants'] if r['city']==city],key=lambda r:(r['userPriority']!='preferred',r['listIndex']));lines +=[f'### {city}','']
 for r in rows:
  lines +=[f"#### {'已收藏' if r['userPriority']=='preferred' else '备选'} · {r['name']} / {r['en']}",'',f"{r['category']}｜{r['feature']}",'',f"推荐菜：{r['dishes']}。安排：{r['suggestion']}。",'',f"营业与预约：{r['rules']}",'',f"[地图导航]({r['map']}) · [核查与订位]({r['source']})。地址：{r['city']} · {r['address']}。",'']
lines+=['所有价格仍为参考，不把Google评分当作食べログ奖项。营业、目标日期空位、取消条款与过敏对应须在订座时确认。收藏夹共享ID、账号与个人备注原始页面不发布。']
(R/'restaurants.md').write_text('\n'.join(lines)+'\n')
print('Built priority dining index from 35 restaurants and daily selections.')
