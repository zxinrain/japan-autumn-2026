"""Build the offline-readable browser data and the separate CNY comparison file."""
from pathlib import Path
import csv,json
R=Path(__file__).resolve().parents[1]
trip=json.loads((R/'trip.json').read_text())
catalog=json.loads((R/'destinations.json').read_text())
added={
 'miyajima':[['miyajima-shrine.webp','严岛神社与海边社殿','宫岛观光协会','miyajima']],
 'kunisaki':[['kunisaki-makiodo.webp','真木大堂的阿弥陀如来与造像','真木大堂官网','makiodo']],
 'beppu':[['beppu-bamboo.webp','竹工艺体验：四海波花篮制作','别府市官方旅游资料','bamboo']]
}
for d in catalog:
 if d['id'] in added:d['images']=added[d['id']]
hotel_catalog=json.loads((R/'hotel-catalog.json').read_text())
meta=[dict(hotel_catalog[s['source']]) for s in trip['stays']]
for s,m in zip(trip['stays'],meta):m['official']=trip['sources'][s['source']][1]
dining=json.loads((R/'restaurants.json').read_text())
payload={'trip':trip,'catalog':catalog,'hotelMeta':meta,'dining':dining}
(R/'travel-data.js').write_text('window.JAPAN_TRIP = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n')
(R/'hotel-platforms.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
with (R/'hotel-comparison.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f,lineterminator='\n');w.writerow(['酒店中文','Hotel English','入住','退房','晚数','成人','房间','价格币种','房型条件','官网含税总价','携程含税总价','Agoda含税总价','Booking含税总价','一休含税总价','状态','公开参考人民币每房晚','原始样本日元','样本条件','样本来源','核对日'])
 for s,m in zip(trip['stays'],meta):
  p=m.get('priceReference');convert=lambda v:round(v*p['rateCNYPer100JPY']/100/10)*10
  ref=[f"约{convert(p['lowJPY'])}–{convert(p['highJPY'])}",f"{p['lowJPY']}–{p['highJPY']}",p['scope']+' 非指定日期样本，非本次可售。',p['source'],p['checked']] if p else ['待查询','待查询','未取得可靠公开价格，不引用其他酒店报价',m['official'],trip['verified']]
  w.writerow([s['cn'],s['en'],s['in'],s['out'],s['nights'],2,1,'CNY',s['room'],*(['待查询']*5),'未取得本次同口径报价；目标页日期待复核',*ref])
print(f"Built {len(trip['days'])} days / 19 nights, {len(catalog)} illustrated destination themes, 6 hotel rows.")
