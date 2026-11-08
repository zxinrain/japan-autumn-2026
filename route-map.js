/* Local geographic map: Natural Earth coastline, OpenStreetMap-derived points.
   Lines show the order of stops, never claimed as a road or rail alignment. */
(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data=window.JAPAN_ROUTE_DATA;
const unique=a=>[...new Set(a)];
const latitude=lat=>-Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))*180/Math.PI;
const dayRoute=(i,choice)=>i===9&&choice==='beppu'?['intercontinental','bamboo','kannawa','intercontinental']:i===11&&choice==='beppu'?['intercontinental','beppu','fukuoka','ritz']:data.routes[i];
function render({day=null,choice='kunisaki',picker=true,title,transport}){
 const all=unique(Array.from({length:20},(_,i)=>dayRoute(i,choice)).flat());
 const ids=day===null?['hiroshima','takeo','nagasaki','beppu','fukuoka','simose']:dayRoute(day,choice);
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
 const routeNames=unique(ids).map(id=>data.points[id]);
 const marks=unique([...visible,...(day===null?[...ids,'fukuokaairport']:[])]);
 const dayLabel=i=>{const date=new Date(Date.parse('2026-11-30T00:00:00Z')+i*86400000);return `${date.getUTCMonth()+1}月${date.getUTCDate()}日`;};
 const labelCities=day===null?[['九州',130.75,32.8],['本州',132.45,34.55],['濑户内海',132.75,33.98],['四国',133.15,33.6]].filter(([,x,y])=>{const [px,py]=project(x,y);return px>20&&px<620&&py>24&&py<410;}):[];
 return `<section class="journey-map" aria-label="${day===null?'全程':dayLabel(day)}目的地地图"><div class="map-heading"><div><h2>${day===null?'把 20 天，放在一张地图上':dayLabel(day)+' · 当天线路'}</h2><p>${esc(title)}</p></div>${picker?`<div class="map-picker"><label for="map-day">选择地图范围</label><select id="map-day" data-map-day><option value="all"${day===null?' selected':''}>全程 · 所有目的地</option>${window.JAPAN_TRIP.trip.days.map((d,i)=>`<option value="${i}"${day===i?' selected':''}>${dayLabel(i)} · ${esc(d.title)}</option>`).join('')}</select></div>`:''}</div><div class="route-map-canvas"><svg viewBox="0 0 680 430" role="group" aria-label="${day===null?'广岛与北九州全程线路':dayLabel(day)+'目的地位置与停留顺序'}"><title>目的地地理位置与停留顺序</title><desc>真实海岸线为背景，连线表示先后顺序。地图下方提供等效地点列表及导航链接。</desc><defs><marker id="route-direction" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="none" stroke="#3c5b76" stroke-width="1.2"/></marker></defs><path class="map-land" d="${land}"/>${labelCities.map(([n,x,y])=>{const [px,py]=project(x,y);return `<text class="${n==='濑户内海'?'map-sea':'map-context'}" x="${px.toFixed(1)}" y="${py.toFixed(1)}">${n}</text>`;}).join('')}<path class="map-link" d="${path(ids)}" marker-end="url(#route-direction)"/>${day===null?`<path class="map-link map-return" d="${path(['simose','fukuokaairport'])}"/>`:''}${marks.map((id,i)=>{const p=data.points[id],[x,y]=point(id),main=day===null?ids.indexOf(id):-1,label=day===null?(main>=0?String(main+1):''):String(unique(ids).indexOf(id)+1);return `<g class="map-pin" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">${p.place?`<a href="#place/${esc(p.place)}" aria-label="查看${esc(p.name)}介绍">`:''}<title>${esc(p.name)}</title><circle r="${label?11:4.5}"/>${label?`<text>${label}</text>`:''}${p.place?'</a>':''}</g>`;}).join('')}${day===null?ids.map((id,i)=>{const [x,y]=point(id),names=['广岛','武雄','长崎','别府','福冈','SIMOSE'],dx=[14,-45,-44,14,-44,-66][i],dy=[-14,23,23,-12,-14,24][i];return `<text class="map-pin-label" x="${(x+dx).toFixed(1)}" y="${(y+dy).toFixed(1)}">${names[i]}</text>`;}).join(''):''}</svg></div><div class="map-footer"><ol class="map-route-list">${routeNames.map((p,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${p.place?`<a href="#place/${esc(p.place)}">${esc(p.name)}</a>`:esc(p.name)}</li>`).join('')}</ol>${day===null?'<p class="map-transport">去程香港 → 广岛，返程福冈 → 香港。图中保留现有目的地占位，广岛海岸至福冈的末段衔接待确认。</p>':`<p class="map-transport">${esc(transport)}${day===19?' · 福冈 → 香港，航班待确认。':''}</p>`}${day===null?`<details class="map-destinations card-fold">${window.TRAVEL_LAYOUT.foldSummary(`全部目的地（${visible.length} 处）`,"打开地点介绍")}<div class="actions">${visible.map(id=>{const p=data.points[id];return `<a href="#place/${esc(p.place)}">${esc(p.name)}</a>`;}).join('')}</div></details>`:`<div class="actions map-destinations">${unique(ids).map(id=>{const p=data.points[id];return `<a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(p.query)}" target="_blank" rel="noopener noreferrer">导航 · ${esc(p.name)}</a>`;}).join('')}</div>`}<p class="map-credit">连线表示停留顺序，非道路或铁路实线；地点为位置参考，具体出入口请打开导航。底图：<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · 地点：场馆官网与 <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors · ODbL</a> · <a href="route-map-sources.json" target="_blank" rel="noopener noreferrer">位置资料</a></p></div></section>`;
}
window.JAPAN_ROUTE_MAP={render,dayRoute};
})();
