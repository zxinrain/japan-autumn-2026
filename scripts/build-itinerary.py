# -*- coding: utf-8 -*-
from pathlib import Path
import argparse
parser=argparse.ArgumentParser()
parser.add_argument("--workspace-output",type=Path,help="Optional directory for an extra local document copy")
args=parser.parse_args()
import json,datetime,urllib.parse,shutil
R=Path(__file__).resolve().parents[1];t=json.loads((R/'trip.json').read_text());c=json.loads((R/'destinations.json').read_text());start=datetime.date.fromisoformat(t['departure'])
lines=['# 广岛与北九州 2026｜最新文字行程','', '2026/11/30—12/19 · 20天19晚｜香港进广岛、福冈回香港｜两位成人、1间房、独立双床优先。','', '资料核对：2026-11-09。航班、酒店、车票、门票与餐位均未预订。未取得2026年12月最终时刻的交通以合理区间规划，不能当作已订班次。','', '## 本版的决定与取舍','', '- 广岛全部安排在前段：宫岛、和平资料馆、SIMOSE、MOCA保留完整日，离开后不返回。','- 12/9长崎→别府采用铁路纯转移；长崎两晚，取消原独立军舰岛日。','- 12/13别府→小仓乘Sonic，寄存行李、出租车往返北九州市立美术馆本馆，再另买小仓→博多Sonic，不从福冈折返。','- 12/16新增糸岛公共交通日归，只走二见浦一个海湾，不包车、不登山。','- 福冈市美术馆12/17、九州芸文馆12/18分开；福冈第二家酒店尚未选定，当前丽思连住6晚。','- 首日09:30出发直航暂保留，早出门例外仍待确认；御船山12/6为红叶祭末日，不承诺盛叶。','', '## 六段住宿','', '| 地区 | 酒店（中／英） | 入住—退房 | 晚数 | 房型与状态 |','|---|---|---|---:|---|']
for s in t['stays']:
 lines+=[f"| {s['city']} | [{s['cn']} / {s['en']}]({t['sources'][s['source']][1]}) | {s['in']}—{s['out']} | {s['nights']} | {s['room']} |"]
lines+=['','酒店均为推荐，房量未核。OND暂定；界宮島寄存至傍晚和附近付费船班需单独确认。官网、携程、Agoda、Booking、一休入口及人民币公开参考见[独立住宿页](https://zxinrain.github.io/japan-autumn-2026/hotels.html)。价格样本不等于本次日期报价；界宮島与OND暂无可靠公开范围。','', '## 每日行程','']
restaurants={r['id']:r for r in json.loads((R/'restaurants.json').read_text())['restaurants']}
lines +=['## 收藏餐厅与晚餐安排','', '31家餐厅按10个城市分类，详见[餐厅收藏索引](restaurants.md)；网页在「每日行程→按城市查看31家收藏餐厅」，各日「餐食推荐」卡片内有主选与备选。每个餐段只设一个主选，所有餐位均未预约。','', '| 日期 | 晚餐主选建议 | 衔接要点 |','|---|---|---|', '| 12/14 周一 | 水たき長野 18:00 | 市内休整，下午先回酒店 |','| 12/16 周三 | 鮨さかい本店 18:00 | 糸岛16:00–16:30返店，留休息与去西中洲时间 |','| 12/17 周四 | 嗣味 18:00 | 美术馆后下午留市内休息 |','| 12/18 周五 | 焼き鳥こと 18:00 | 芸文馆14:30前后离馆、16:30前返店才执行，否则预约前改晚席备选 |','', '吉宗通常周二休，已移到12/7周一；12/8改四海楼午餐。12/9铁路转移在博多站内用餐，不排站外拉面店。','']
for i,d in enumerate(t['days']):
 date=start+datetime.timedelta(days=i);week='一二三四五六日'[date.weekday()];lines +=[f"### Day {i+1}｜{date:%m/%d} 周{week}｜{d['title']}",'',f"住宿：{d['city']}。{d.get('tag','')}",'']
 for k,label in [('am','上午'),('noon','中午'),('pm','下午'),('night','夜晚'),('transport','交通'),('breakfast','早餐推荐'),('lunch','午餐推荐'),('dinner','晚餐推荐'),('rest','休息'),('cut','天气与体力删减'),('photo','摄影观察')]:lines +=[f"**{label}**：{d[k]}",'']
 
 for a in d.get('dining',[]):
  r=restaurants[a['restaurant']];label={'primary':'建议主选','backup':'替换备选','conditional':'条件备选'}[a['priority']];meal={'lunch':'午餐','dinner':'晚餐'}[a['meal']]
  lines +=[f"**收藏餐厅 · {meal} · {label}**：[ {r['name']} / {r['en']}]({r['map']}) · {a['time']}。{a['reason']} {r['rules']} [营业与订位资料]({r['source']})。未预约。",'']
 links=[f"[{q}](https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(q)})" for q in d['maps']]
 lines +=['导航顺序：'+' → '.join(links),'','资料来源（核对2026-11-09）：'+' · '.join(f"[{t['sources'][k][0]}]({t['sources'][k][1]})" for k in dict.fromkeys(d['sources'])),'']
 if i==11:
  alt=t['alternative'];lines +=['**国东替代方案**：若天气差或不想包车，改别府竹工艺馆＋铁轮。'+alt.get('note',''),'']
lines+=['## 目的地导读与推荐理由','']
for d in c:
 lines +=[f"### {d['name']} / {d['en']}",'',d['feature'],'',f"**为什么去**：{d['reason']}",'',f"**现场看什么**：{d['look']}",'',f"**强度与取舍**：{d['effort']} {d['tradeoff']}",'', '来源：'+' · '.join(f"[{t['sources'][k][0]}]({t['sources'][k][1]})" for k in d['sources']),'']
lines+=['## 交通、预约与执行清单','', '1. 航班：11/30香港→广岛UO822／CX5822暂留09:30–13:45，同一实际运营航班；12/19福冈→香港具体班次待核，国际线优先起飞前3小时抵达。','2. 酒店：确认独立双床、取消政策、税费、餐食与过敏；OND送迎按规则提前3天联系，12/5用车最迟按12/2前询问，勿等临到。','3. COMICO：12/12时段通常提前一个月开放，11/12起查看官方可订；先定时段再排由布院接送。','4. 指定席通常乘车日前一个月日本时间10:00起售；12/5、7、9、13、18分别查看11/5、7、9、13、18，具体产品规则优先。','5. 12/13两段Sonic分别购票；网络直达优惠不支持中途出站参观后续乘。小仓寄存、出租车双向和美术馆午餐先确认。分段票总价待按实际车次查询。','6. 费用对照：别府→博多直达Sonic网络样本每人3,500日元、普通指定席6,910日元，两人约人民币296／584元；不能套给本次中停分段路线。8小时Alphard公开时租样本约人民币2,550–2,730元，跨城回程空驶、高速、停车另核，不是本路线报价。汇率参考每100日元人民币4.2286元，非未来结算保证。','7. 推荐包车／接送：机场到首晚酒店；12/11国东两寺6–7小时；12/12由布院往返。12/10大分两馆预约车可减少换乘；12/15太宰府按体力选专车。12/9与12/13主线铁路，糸岛不包车。','8. 糸岛现行平日巴士参考：天神三丁目10:22→二见浦茶房前11:18；PALMBEACH前15:02→天神四丁目15:54。2026年4月表仅参考，12月再查；旧夫妇岩前站已撤销，高速线有当地乘降限制，不能作沿海随上随下接驳。','9. SIMOSE周四平日无土日祝免费接驳，大竹站出租车往返预先约；不假定现场必有车。','10. 御船山红叶祭官方2026/11/6—12/6，点灯17:30起；本次为末日周日，票种再入与晚餐席次先协调。叶况、天气不保证。','11. 本行程无日本法定假日；周末12/6、12/12–13及当地活动仍可能拥挤。','12. 交通卡用于市内支持线路；指定席与机场直送另安排，不为尚未比价的JR Pass承诺省钱。','', '主要核验渠道：'+ ' · '.join(f"[{t['sources'][k][0]}]({t['sources'][k][1]})" for k in ['flight','returnFlight','railSplit','railFare','kokuraLuggage','kokuraStorage','itoshimaBus','itoshimaStops','mifuneyama','holiday','boc']), '', '## 图片与地图说明','', '网页使用有出处的真实照片；新增界宮島、OND与二见浦图片。实景照片是历史参考，不等于2026年12月天气或已订房型。逐日地图连线为地点顺序示意，实际乘车导航按当天道路、铁路与运营方规则执行。','']
(R/'itinerary.md').write_text('\n'.join(lines))
(R/'plans/itinerary-20261109.json').write_text(json.dumps(t,ensure_ascii=False,indent=2)+'\n')
if args.workspace_output:
 out=args.workspace_output;out.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/'itinerary.md',out/'广岛北九州-20261130-20天-核查修订.md')

print('Wrote full itinerary, structured plan and workspace copy.')
