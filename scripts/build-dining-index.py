# -*- coding: utf-8 -*-
"""Render city-based restaurant notes from the same canonical data as the website."""
from pathlib import Path
import argparse
parser=argparse.ArgumentParser()
parser.add_argument("--workspace-output",type=Path,help="Optional directory for an extra local document copy")
args=parser.parse_args()
import json,datetime,shutil
R=Path(__file__).resolve().parents[1]
D=json.loads((R/'restaurants.json').read_text());T=json.loads((R/'trip.json').read_text());start=datetime.date.fromisoformat(T['departure'])
cities=['广岛市','廿日市·宫岛','长崎市','别府市','福冈市','春日市','那珂川市','久留米市','熊本市','唐津市'];restaurants={r['id']:r for r in D['restaurants']}
def price(r):
 n=lambda v:round(v*D['cnyPerJPY']/10)*10
 if r.get('menuReference'):return f"约¥{n(r['menuReference']['totalJPY'])}{'起' if r['menuReference']['from'] else ''}／人（当前套餐参考）"
 p=r['priceJPY'];lo=p['low'];hi=p['high']
 return '约'+(f'¥{n(lo)}–¥{n(hi)}' if lo and hi else f'¥{n(lo)}以上' if lo else f'¥{n(hi)}以内')+'／人（Google用户消费参考）'
lines=['# 九州 · Winn｜餐厅收藏与用餐安排','', '核对2026-11-09。53个收藏地点中整理31家餐厅，分属10个城市。保留原有分店，不将22个非餐饮地点自动写入住宿或目的地。餐厅均未预约；主选、备选与条件备选是规划建议，备选用于替换，不增加同一餐段用餐次数。','', '价格以人民币估算展示。'+D['priceNote']+' Google评分为收藏页核对时快照，不是食べログ评分、奖项或实时评分；高分不等于目标日可订。','', '## 沿线每日安排','', '| 日期 | 餐段 | 餐厅与时段 | 安排理由／交通与限制 |','|---|---|---|---|']
for i,d in enumerate(T['days']):
 for a in d.get('dining',[]):
  r=restaurants[a['restaurant']];meal={'lunch':'午餐','dinner':'晚餐'}[a['meal']];priority={'primary':'建议主选','backup':'替换备选','conditional':'条件备选'}[a['priority']]
  lines.append(f"| {start+datetime.timedelta(days=i):%m/%d} | {meal} · {priority} | [{r['name']}]({r['map']}) · {a['time']} | {a['reason']} |")
lines+=['', '其他日期沿用[完整文字行程](itinerary.md)的酒店、馆内或路线内餐厅，不为了凑收藏而增加跨城吃饭。12/11六盛仅适用于选别府市内替代日，国东主线不去；春日菊鮨与那珂川たけうち均只作为12/15替换选项，须先取得席位并重排太宰府返程。','', '## 按城市分类','']
for c in cities:
 rr=[r for r in D['restaurants'] if r['city']==c];lines +=[f"### {c} · {len(rr)}家",'']
 if c in ['久留米市','熊本市','唐津市']:lines+=['**路线外收藏**：本版不新增这些城市，也不把餐厅当作顺路地点。','']
 for r in rr:
  lines +=[f"#### {r['name']} / {r['en']}",'', f"**分类**：{r['category']}。**人均参考**：{price(r)}。",'', r['feature'],'',f"**推荐菜**：{r['dishes']}。",'',f"**具体安排**：{r['suggestion']}。",'',f"**营业与订位**：{r['rules']}",'', f"**地址**：{r['city']} · {r['address']}。[Google Maps导航]({r['map']}) · [营业与订位资料]({r['source']})"+(f" · [官方预约]({r['reservation']})" if r.get('reservation') else ''),'',f"Google {r['googleRating']}／5，{r['googleReviews']}条评价（2026-11-09核对）。非食べログ评分、非奖项。",'']
  if r.get('extraSources'):lines+=['营业资料存在冲突，另见：'+' · '.join(f'[{n}]({u})' for n,u in r['extraSources']),'']
lines+=['## 关键修订与预约顺序','', '1. 吉宗通常周二休，午餐从12/8移至12/7周一；12/8用四海楼，排队过长回美术馆内简餐，完整参观时间优先。','2. 12/9是长崎→别府铁路纯转移，午餐为博多站内；不再出现服务区或司机安排，也不硬排博多一双。','3. 优先询鮨さかい本店12/16 18:00、嗣味12/17 18:00、焼き鳥こと12/18 18:00、長野12/14 18:00；这是建议优先级，不代表余位或完成订座。','4. 焼き鳥こと当前基础套餐13,000日元含税另10%服务费，约人民币600元／人，不含饮品及可选包间。18:00席需14:30前后离开芸文馆；若正式列车无法支持16:30返店，预约前换晚席备选，不能极限接续或临时爽约。','5. 鮨さかい收藏指本店，不自动替换为我逢人或在；近松完全介绍制，无介绍渠道不列为普通可预约备选。','6. 八ちゃん本店的开门时间资料冲突，未向门店确认前不作固定晚餐；如21:00才开，按本次作息不纳入。','7. 熊本ひょご鳥与福冈赤坂ひょご鳥分开；唐津Caravan不是二见浦邻近餐厅，久留米丸星也不是博多站旁餐厅。','', f"汇率参考核对：[中国银行外汇牌价]({D['exchangeSource']})。当前菜单不保证2026年12月仍相同，所有营业、过敏对应、取消政策与目标日价格需预约时再次确认。",'']
(R/'restaurants.md').write_text('\n'.join(lines))
if args.workspace_output:
 out=args.workspace_output;out.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/'restaurants.md',out/'九州-Winn-餐厅分类与逐日安排.md')
print('Wrote 31 restaurant notes / 10 cities and workspace copy')
