/* Local geographic map: Natural Earth coastline, OpenStreetMap-derived points.
   Lines show the order of stops, never claimed as a road or rail alignment. */
(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data=window.JAPAN_ROUTE_DATA;
const unique=a=>[...new Set(a)];
const latitude=lat=>-Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))*180/Math.PI;
const dayRoute=(i,choice)=>i===window.JAPAN_TRIP.trip.keyDays.kunisaki&&choice==='beppu'?['intercontinental','bamboo','selectbeppu','takegawara','watertower','intercontinental']:data.routes[i];
function render({day=null,choice='kunisaki',picker=true,title,transport}){
 const all=unique(Array.from({length:20},(_,i)=>dayRoute(i,choice)).flat());
 const ids=day===null?['hiroshima','simose','takeo','nagasaki','beppu','kitakyushumuseum','fukuoka']:dayRoute(day,choice);
 const visible=day===null?all.filter(id=>data.points[id].place):unique(ids);
 const extent=unique([...ids,...visible]).map(id=>data.points[id]);
 const xs=extent.map(p=>p.lng),ys=extent.map(p=>latitude(p.lat));
 let x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
 const cx=(x0+x1)/2,cy=(y0+y1)/2;
 const rangeX=Math.max(x1-x0,day===null?3.5:.028),rangeY=Math.max(y1-y0,day===null?2.1:.022);
 const scale=Math.min(560/rangeX,310/rangeY),tx=340-cx*scale,ty=215-cy*scale;
 const project=(lng,lat)=>[lng*scale+tx,latitude(lat)*scale+ty];
 const point=id=>project(data.points[id].lng,data.points[id].lat);
 const path=ids=>ids.map((id,i)=>(i?'L':'M')+point(id).map(n=>n.toFixed(1)).join(',')).join(' ');
 const land=window.JAPAN_GEOGRAPHY.map(r=>'M'+r.map(([x,y])=>project(x,y).map(v=>v.toFixed(1)).join(',')).join('L')+'Z').join('');
 const routeNames=ids.map(id=>data.points[id]);
 const marks=unique([...visible,...(day===null?[...ids,'fukuokaairport']:[])]);
 const dayLabel=i=>{const date=new Date(Date.parse('2026-11-30T00:00:00Z')+i*86400000);return `${date.getUTCMonth()+1}月${date.getUTCDate()}日`;};
 const labelCities=day===null?[['九州',130.75,32.8],['本州',132.45,34.55],['濑户内海',132.75,33.98],['四国',133.15,33.6]].filter(([,x,y])=>{const [px,py]=project(x,y);return px>20&&px<620&&py>24&&py<410;}):[];
 return `<section class="journey-map" aria-label="${day===null?'全程':dayLabel(day)}目的地地图"><div class="map-heading"><div><h2>${day===null?'把 20 天，放在一张地图上':dayLabel(day)+' · 当天线路'}</h2><p>${esc(title)}</p></div>${picker?window.JAPAN_JOURNEY_UI.calendar(day):''}</div><div class="route-map-canvas"><svg viewBox="0 0 680 430" role="group" aria-label="${day===null?'广岛与北九州全程线路':dayLabel(day)+'目的地位置与停留顺序'}"><title>目的地地理位置与停留顺序</title><desc>真实海岸线为背景，连线表示先后顺序。地图下方提供等效地点列表及导航链接。</desc><defs><marker id="route-direction" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="none" stroke="#3c5b76" stroke-width="1.2"/></marker></defs><path class="map-land" d="${land}"/>${labelCities.map(([n,x,y])=>{const [px,py]=project(x,y);return `<text class="${n==='濑户内海'?'map-sea':'map-context'}" x="${px.toFixed(1)}" y="${py.toFixed(1)}">${n}</text>`;}).join('')}<path class="map-link" d="${path(ids)}" marker-end="url(#route-direction)"/>${marks.map((id,i)=>{const p=data.points[id],[x,y]=point(id),main=day===null?ids.indexOf(id):-1,label=day===null?(main>=0?String(main+1):''):String(unique(ids).indexOf(id)+1);return `<g class="map-pin" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">${p.place?`<a href="#place/${esc(p.place)}" aria-label="查看${esc(p.name)}介绍">`:''}<title>${esc(p.name)}</title><circle r="${label?11:4.5}"/>${label?`<text>${label}</text>`:''}${p.place?'</a>':''}</g>`;}).join('')}${day===null?ids.map((id,i)=>{const [x,y]=point(id),names=['广岛','SIMOSE','武雄','长崎','别府','北九州','福冈'],dx=[14,-66,-45,-44,14,14,-44][i],dy=[-14,24,23,23,-12,-14,-14][i];return `<text class="map-pin-label" x="${(x+dx).toFixed(1)}" y="${(y+dy).toFixed(1)}">${names[i]}</text>`;}).join(''):''}</svg></div><div class="map-footer"><ol class="map-route-list">${routeNames.map((p,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${p.restaurant?`<a href="#food/${esc(p.restaurant)}">${esc(p.name)}</a>`:p.place?`<a href="#place/${esc(p.place)}">${esc(p.name)}</a>`:esc(p.name)}</li>`).join('')}</ol>${day===null?'<p class="map-transport">广岛与SIMOSE前置一次完成，离开后不再返回。北九州安排在别府至福冈途中，最终从福冈返港；由布院、太宰府、糸岛与筑后作当日往返。12/13在小仓寄存、参观后乘Sonic继续博多。</p>':`<p class="map-transport">${esc(transport)}${day===19?' · 福冈 → 香港，航班待确认。':''}</p>`}${day===null?`<details class="map-destinations card-fold">${window.TRAVEL_LAYOUT.foldSummary(`全部目的地（${visible.length} 处）`,"打开地点介绍")}<div class="actions">${visible.map(id=>{const p=data.points[id];return `<a href="#place/${esc(p.place)}">${esc(p.name)}</a>`;}).join('')}</div></details>`:`<div class="actions map-destinations">${unique(ids).map(id=>{const p=data.points[id];return `<a href="${p.map?esc(p.map):'https://www.google.com/maps/search/?api=1&amp;query='+encodeURIComponent(p.query)}" target="_blank" rel="noopener noreferrer">导航 · ${esc(p.name)}</a>`;}).join('')}</div>`}<p class="map-credit">连线表示停留顺序，非道路或铁路实线；地点为位置参考，具体出入口请打开导航。底图：<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · 餐食地点：Google Maps公开餐厅资料；其余地点：场馆官网与 <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors · ODbL</a> · <a href="route-map-sources.json" target="_blank" rel="noopener noreferrer">位置资料</a></p></div></section>`;
}
window.JAPAN_ROUTE_MAP={render,dayRoute};
})();
