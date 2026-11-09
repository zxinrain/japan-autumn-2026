# -*- coding: utf-8 -*-
from pathlib import Path
import json,csv,html
R=Path(__file__).resolve().parents[1];b=json.loads((R/'cost-estimate.json').read_text());esc=html.escape
lines=['# 广岛与北九州｜两人总费用估算','', '核对2026-11-10。2位成人、1间房、独立双床优先。所有金额人民币；未提供订单成交价。本表为预算，不代表已预订或五平台最低价。','',b['rateNote'],'',b['scope'],'','## 总费用','', '| 类别 | 低位预留 | 高位预留 |','|---|---:|---:|']
rows=[['酒店19晚',b['totals']['hotelLow'],b['totals']['hotelHigh']],['两段已选跨城包车',round(sum(v['lowJPY']*b['rate'] for v in b['transfers'])),round(sum(v['highJPY']*b['rate'] for v in b['transfers']))]]+[[v['name'],v['low'],v['high']] for v in b['other']]
for v in rows:lines.append(f'| {v[0]} | {v[1]:,} | {v[2]:,} |')
for name,a,c in [('基础合计','baseLow','baseHigh'),('另留10%后','withReserveLow','withReserveHigh')]:lines.append(f"| **{name}** | **{b['totals'][a]:,}** | **{b['totals'][c]:,}** |")
lines+=['','以上不含下方可选包车、国际机票、购物和水疗。酒店餐食假设变化时须重新核算，不把两餐方案重复计入外食。未定特展纳入门票预留，不能将未核收费项目写成免费。','', '## 酒店估价与本次日期价格样本','', '下列预留按整住宿段计。人工预算区间考虑优先房型、早餐与税费弹性，不是平台真实报价区间。Booking返回价格没有床型、餐食或取消条款，不能直接比较同条件优劣。','', '| 酒店／日期 | 晚数 | 整段人民币预留 | 本次日期样本 |','|---|---:|---:|---|']
for v in b['hotels']:
 q=v['quote'];sample=f"Booking ¥{q['totalCNY']:,.2f}／整段；床型餐食取消待核" if q else '未取得本日期报价'
 lines.append(f"| [{v['name']} / {v['en']}]({v['official']}) · {v['checkin']}—{v['checkout']} | {v['nights']} | {v['low']:,}–{v['high']:,} | {sample} |")
lines+=['', '五平台同日期入口见[酒店比价页](hotels.html)。官网、携程、Agoda、一休同条件实时报价尚未取得，不标“已完成五平台比价”。Booking博多都与界别府本次未返回可售，不代表所有渠道满房；ENOWA未匹配，优先[官网](https://enowa-yufuin.jp/)与[一休](https://www.ikyu.com/00002995/)。一休公开样本可能包含积分即用折扣，不直接作为人人可得价格。','', '## 两段已选包车','', '车型按舒适MPV／Alphard级询价，2成人＋行李；参考运营方通常为日语司机。中文司机、具体车辆年份、等待、空驶、通行、停车、超时均须写入固定报价。以下为人工规划预留，不是已成交价或当地均价。','', '| 日期／路线 | 时长 | 日元整车预留 | 人民币整车预留 |','|---|---|---:|---:|']
for v in b['transfers']:lines.append(f"| [{v['date']} {v['name']}]({v['source']}) | {v['hours']} | {v['lowJPY']:,}–{v['highJPY']:,} | {round(v['lowJPY']*b['rate']):,}–{round(v['highJPY']*b['rate']):,} |")
lines+=['','长崎市内Alphard公开8,680日元/小时、8小时69,440日元，只能说明市内时租，不能直接套给长崎→别府跨县送车；亀之井大型车8,080日元/小时且不含通行停车等费用。跨县路线、返程空驶与车辆调度需正式询价。样本不足，不计算当地均价。','', '## 其他单日包车优先级','', '| 日期／路线 | 人民币整车预留 | 建议 |','|---|---:|---|']
for v in b['optional']:lines.append(f"| {v['date']} {v['name']} | {round(v['lowJPY']*b['rate']):,}–{round(v['highJPY']*b['rate']):,} | {v['reason']} |")
lines+=['','建议优先增加12/11半日车，其次是决定去国东时的12/12；太宰府与糸岛不必默认包车。上表为待询路线报价；未纳入总价。若启用12/11全日车，先从“其余交通”扣除1,500元分段接送预留，再加实际包车，避免重复。12/10洲际→由布院与12/11ENOWA退房的车站接驳不能互相替代；ENOWA免费接驳仅酒店确认的由布院站区间，不默认跨城。','', '## 门票与线上购票','', '优先按真实票种；网上只能进入指南的明确写“入口”，不宣称已选好日期或已付款。现场售票场所不会伪造购票按钮。','', '| 日期／目的地 | 成人日元／人 | 两人人民币 | 官方入口与操作 |','|---|---:|---:|---|']
for v in b['tickets']:
 fee='待核' if v['perAdultJPY'] is None else str(v['perAdultJPY']);rmb='待核' if v['totalJPY'] is None else str(round(v['totalJPY']*b['rate'],2));lines.append(f"| {v['date']} {v['name']} | {fee} | {rmb} | [{v['method']}]({v['url']})。{v['note']} **{v['status']}** |")
lines+=['', 'MOCA若同时看收藏，另预留350日元/人，除非馆方确认特展票包含。SIMOSE网上优惠按实际票种结算，预算保守用2000日元。御船山昼夜票只针对红叶祭庭园；teamLab、桑拿与其他酒店体验不默认包含。本次不安排军舰岛，不计其船票。','', '## 预算依据及待落实','', '- 酒店房型最终未指定，全部优先独立双床。ENOWA以含夕朝食作为预算假设；界两段亦按夕朝食，实际以订单为准。','- 公开起价锚点：[博多都一休](https://www.ikyu.com/00002619/)每房两人31,910日元起（折扣前）；[ENOWA一休](https://www.ikyu.com/00002995/)别墅夕朝食公开样本221,376日元起（折扣前）；[界别府官方秋季样本](https://hoshinoresorts.com/jp/cards/e99kgxzcq/)每人38,200日元起。均非本次日期报价。','- 指定日期Booking：希尔顿12/1–5、OND12/5–7、Hotel Nagasaki12/7–8、英迪格12/8–9、洲际12/9–10、ONE12/17–19。返回价格仅作快照，库存及最终税费可能变化。','- 长崎酒店观景露天汤池官网2800日元/60分钟，需入住时预约；未计入基础总价。','- 国际机票仍待确认，不能把上述基础总价称为包含往返机票的全包总价。','- 铁路余票、指定席与巴士时刻另核；原12/9与12/13铁路已从主线删除。']
(R/'cost-estimate.md').write_text('\n'.join(lines)+'\n')
with (R/'cost-estimate.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f);w.writerow(['分类','项目','日期／条件','数量','人民币低位','人民币高位','价格性质／备注','来源'])
 for v in b['hotels']:w.writerow(['酒店',v['name'],v['checkin']+'—'+v['checkout'],str(v['nights'])+'晚',v['low'],v['high'],'人工整段预留，非可售报价；'+('Booking日期样本'+str(v['quote']['totalCNY'])+'，床型餐食取消待核' if v['quote'] else '未取得本次日期报价'),v['official']])
 for kind,key in [('已选包车','transfers'),('可选包车（未入总计）','optional')]:
  for v in b[key]:w.writerow([kind,v['name'],v['date'],'整车',round(v['lowJPY']*b['rate']),round(v['highJPY']*b['rate']),v['status'],v['source']])
 for v in b['other']:w.writerow(['其余费用',v['name'],'20天','2人',v['low'],v['high'],v['note'],'cost-estimate.json'])
 w.writerow(['合计','基础总额（不含可选包车与国际机票）','20天19晚','2人',b['totals']['baseLow'],b['totals']['baseHigh'],'规划预算','']);w.writerow(['合计','另留10%后','20天19晚','2人',b['totals']['withReserveLow'],b['totals']['withReserveHigh'],'规划预算',''])
 for v in b['tickets']:w.writerow(['门票明细（已包含在门票预留，勿重复相加）',v['name'],v['date'],'2成人',None if v['totalJPY'] is None else round(v['totalJPY']*b['rate'],2),'',v['method']+'；'+v['status']+'；'+v['note'],v['url']])
# Plain Markdown renderer supporting links, tables, paragraphs; no remote assets.
import re
def inline(s):
 s=esc(s);s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>',s);s=re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s);return s
out=[];intable=False
for line in lines:
 if line.startswith('|'):
  if re.match(r'^\|[-:| ]+\|$',line):continue
  if not intable:out.append('<div class="table-wrap"><table class="data-table">');intable=True
  out.append('<tr>'+''.join('<td>'+inline(x.strip())+'</td>' for x in line.strip('|').split('|'))+'</tr>');continue
 if intable:out.append('</table></div>');intable=False
 if line.startswith('# '):out.append('<header class="page-intro"><p class="overlabel">旅行费用</p><h1>'+inline(line[2:])+'</h1></header>')
 elif line.startswith('## '):out.append('<h2 class="detail-block">'+inline(line[3:])+'</h2>')
 elif line:out.append('<p>'+inline(line)+'</p>')
if intable:out.append('</table></div>')
(R/'cost-estimate.html').write_text('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f1f4f7"><title>旅行费用与购票｜广岛与北九州</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="layout.css"><style>.data-table td:nth-child(2),.data-table td:nth-child(3){white-space:nowrap}.data-table td{min-width:80px}.data-table tr:first-child{font-weight:500;background:#e7ecf2}main>p{max-width:65ch;line-height:1.8}</style><body><main style="max-width:1120px;margin:auto;padding:32px 20px 100px"><div class="actions"><a class="button" href="index.html#booking">返回行前预约</a><a class="button" href="hotels.html">酒店比价</a><a class="button" href="cost-estimate.csv">下载费用表</a></div>'+''.join(out)+'</main></body></html>')
print('Wrote cost HTML, Markdown and CSV; all derive from cost-estimate.json.')
