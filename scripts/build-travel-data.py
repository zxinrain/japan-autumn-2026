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
officials=[trip['sources'][s['source']][1] for s in trip['stays']]
meta=[
 {'ctripId':'97964943','agoda':'https://www.agoda.com/hilton-hiroshima/hotel/hiroshima-jp.html','ikyu':'https://www.ikyu.com/00002983/','photo':['hotel02.webp','希尔顿广岛客房环境参考，非已订房型','一休酒店图库','https://www.ikyu.com/00002983/']},
 {'ctripId':'1498446','agoda':'https://www.agoda.com/onyado-chikurintei/hotel/takeo-jp.html','ikyu':'https://www.ikyu.com/00000735/','photo':['hotel03.webp','竹林亭庭园与旅馆环境参考','一休酒店图库','https://www.ikyu.com/00000735/']},
 {'photo':['nagasaki-garden.webp','长崎花园露台客房参考；具体房型待核','酒店官网','https://www.gt-nagasaki.jp/stay/']},
 {'ctripId':'27391867','agoda':'https://www.agoda.com/ana-intercontinental-beppu-resort-and-spa/hotel/beppu-jp.html','ikyu':'https://www.ikyu.com/00002626/','photo':['hotel11.webp','别府洲际客房环境参考，非已订房型','一休酒店图库','https://www.ikyu.com/00002626/']},
 {},
 {'photo':['simose-villa.webp','SIMOSE 海边别墅 Kielsteg House A 参考，非已确认栋型','SIMOSE 官网','https://artsimose.jp/en/villa-waterfront/']}
]
for i,m in enumerate(meta):m['official']=officials[i]
payload={'trip':trip,'catalog':catalog,'hotelMeta':meta}
(R/'travel-data.js').write_text('window.JAPAN_TRIP = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n')
(R/'hotel-platforms.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
with (R/'hotel-comparison.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.writer(f,lineterminator='\n');w.writerow(['酒店中文','Hotel English','入住','退房','晚数','成人','房间','价格币种','房型条件','官网含税总价','携程含税总价','Agoda含税总价','Booking含税总价','一休含税总价','状态'])
 for s in trip['stays']:w.writerow([s['cn'],s['en'],s['in'],s['out'],s['nights'],2,1,'CNY',s['room'],*(['待查询']*5),'未取得同口径报价；手机 App 日期接收待实测'])
print('Built 20 days / 19 nights, 14 illustrated destination themes, 6 hotel comparison rows.')
