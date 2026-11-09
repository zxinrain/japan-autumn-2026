/* Verified coordinates; road geometry appears only after a validated AMap response. */
(()=>{
'use strict';
const data=window.JAPAN_ROUTE_DATA;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unique=a=>[...new Set(a)];
const latitude=lat=>-Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))*180/Math.PI;
const hotelIds=new Set(['kai','hilton','ond','gardenterrace','intercontinental','ritz','chikurintei','simosevilla','enowa','kaiBeppu','miyako','one','hotelNagasaki','indigo']);
const dayRoute=(i,choice)=>i===window.JAPAN_TRIP.trip.keyDays.kunisaki&&choice==='beppu'?['kaiBeppu','bamboo','food-hirokado','kaiBeppu']:i===window.JAPAN_TRIP.trip.keyDays.kunisaki?['kaiBeppu','fukiji','makiodo','kaiBeppu']:data.routes[i];
const navigate=p=>p.map||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.query||p.name);
const segmentKey=leg=>`${leg.mode}:${leg.from}:${leg.to}`;
function plannedLegs(day,choice){
 if(day===null)return [];
 const ids=dayRoute(day,choice),plan=window.JAPAN_AMAP_PLAN;
 const legs=day===window.JAPAN_TRIP.trip.keyDays.kunisaki&&choice==='beppu'?plan?.alternatives?.beppu:day===window.JAPAN_TRIP.trip.keyDays.kunisaki?plan?.alternatives?.kunisaki:plan?.days?.[day];
 return ids.slice(1).map((to,i)=>{const leg=legs?.[i];return leg?.from===ids[i]&&leg?.to===to?leg:{from:ids[i],to,mode:'mixed'};});
}
function verifiedLines(leg){
 if(!['walking','driving'].includes(leg.mode))return null;
 const item=window.JAPAN_AMAP_ROUTES?.segments?.[segmentKey(leg)];
 if(item?.status!=='verified'||item.provider!=='AMap Global Routes'||!Array.isArray(item.polylines))return null;
 const from=data.points[leg.from],to=data.points[leg.to];
 if(!from||!to||!item.origin||!item.destination)return null;
 if(Math.abs(item.origin[0]-from.lng)>1e-6||Math.abs(item.origin[1]-from.lat)>1e-6||Math.abs(item.destination[0]-to.lng)>1e-6||Math.abs(item.destination[1]-to.lat)>1e-6)return null;
 const valid=item.polylines.length>0&&item.polylines.every(line=>Array.isArray(line)&&line.length>=2&&line.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&p[0]>129&&p[0]<134&&p[1]>32&&p[1]<35));
 return valid?item.polylines:null;
}
function render({day=null,choice='kunisaki',picker=true,title,transport}){
 const all=unique(Array.from({length:20},(_,i)=>dayRoute(i,choice)).flat());
 const ids=day===null?['hiroshima','simose','takeo','nagasaki','beppu','kitakyushumuseum','fukuoka']:dayRoute(day,choice);
 const listIds=unique(ids),visible=day===null?all.filter(id=>data.points[id].place):listIds;
 const legs=plannedLegs(day,choice).map(leg=>({...leg,lines:verifiedLines(leg)}));
 const actual=legs.filter(l=>l.lines).length;
 const extent=unique([...ids,...visible]).map(id=>[data.points[id].lng,data.points[id].lat]);
 legs.forEach(l=>{if(l.lines)extent.push(...l.lines.flat());});
 const xs=extent.map(p=>p[0]),ys=extent.map(p=>latitude(p[1]));
 const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
 const scale=Math.min(560/Math.max(x1-x0,day===null?3.5:.028),310/Math.max(y1-y0,day===null?2.1:.022));
 const tx=340-(x0+x1)/2*scale,ty=215-(y0+y1)/2*scale;
 const project=(lng,lat)=>[lng*scale+tx,latitude(lat)*scale+ty];
 const point=id=>project(data.points[id].lng,data.points[id].lat);
 const draw=coords=>coords.map((p,i)=>(i?'L':'M')+project(...p).map(n=>n.toFixed(1)).join(',')).join(' ');
 const land=window.JAPAN_GEOGRAPHY.map(r=>'M'+r.map(p=>project(...p).map(v=>v.toFixed(1)).join(',')).join('L')+'Z').join('');
 const marks=unique([...visible,...(day===null?[...ids,'fukuokaairport']:[])]);
 const labelCities=day===null?[['九州',130.75,32.8],['本州',132.45,34.55],['濑户内海',132.75,33.98],['四国',133.15,33.6]].filter(([,x,y])=>{const [px,py]=project(x,y);return px>20&&px<620&&py>24&&py<410;}):[];
 const pathMarkup=legs.filter(l=>l.lines).map(l=>l.lines.map(line=>`<path class="map-link map-verified" data-route-provider="amap" d="${draw(line)}"/>`).join('')).join('');
 return `<section class="journey-map" aria-label="${day===null?'全程':'当日'}地图"><div class="map-heading"><div><h2>${day===null?'行程地图':'当日地图'}</h2>${day===null?'<p>广岛 — 北九州</p>':''}</div>${picker?window.JAPAN_JOURNEY_UI.calendar(day):''}</div><div class="route-map-canvas" data-map-day="${day===null?'all':day}" data-map-choice="${esc(choice)}"><div class="street-map" role="group" aria-label="可缩放的地点地图"></div><svg class="map-fallback" viewBox="0 0 680 430" role="group" aria-label="${esc(title||'行程')}地点与路线"><title>地点与路线</title><desc>地图下方地点名称可直接导航。仅显示已核对坐标；没有真实路线数据的区间不画连线。</desc><path class="map-land" d="${land}"/>${labelCities.map(([n,x,y])=>{const [px,py]=project(x,y);return `<text class="${n==='濑户内海'?'map-sea':'map-context'}" x="${px.toFixed(1)}" y="${py.toFixed(1)}">${n}</text>`;}).join('')}${pathMarkup}${marks.map(id=>{const p=data.points[id],[x,y]=point(id),index=listIds.indexOf(id),label=index>=0?String(index+1):'';return `<g class="map-pin" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><a href="${esc(navigate(p))}" target="_blank" rel="noopener noreferrer" aria-label="打开${esc(p.name)}导航"><title>${esc(p.name)}</title><circle r="${label?11:4.5}"/>${label?`<text>${label}</text>`:''}</a></g>`;}).join('')}${day===null?listIds.map((id,i)=>{const [x,y]=point(id),names=['广岛','SIMOSE','武雄','长崎','别府','北九州','福冈'];return `<text class="map-pin-label" x="${(x+([14,-66,-45,-44,14,14,-44][i])).toFixed(1)}" y="${(y+([-14,24,23,23,-12,-14,-14][i])).toFixed(1)}">${names[i]}</text>`;}).join(''):''}</svg></div><div class="map-footer"><ol class="map-route-list" aria-label="地点导航">${listIds.map((id,i)=>{const p=data.points[id],count=ids.filter(v=>v===id).length;const repeat=count>1?(id==='kokura'?'寄存／取件':hotelIds.has(id)?'出发／返回':'往返'):'';return `<li data-route-point="${esc(id)}"><span class="map-stop-number">${String(i+1).padStart(2,'0')}</span><a href="${esc(navigate(p))}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>${repeat?`<small class="map-stop-note">${repeat}</small>`:''}</li>`;}).join('')}</ol>${day===null?'':`<p class="map-transport">${esc(transport)}</p>`}<p class="map-legend">${actual?'<span class="map-legend-solid">高德道路路线</span>':''}<span>未核实路线不显示；地点名称可打开导航。</span></p><p class="map-credit">在线底图 © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> · 离线轮廓 <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · <a href="route-map-sources.json" target="_blank" rel="noopener noreferrer">地点来源</a>${actual?' · <a href="https://developer.amap.com/api/web-service/guide/routes" target="_blank" rel="noopener noreferrer">高德路线</a>':''}</p></div></section>`;
}

let maps=[],observer;
function release(){observer?.disconnect();observer=null;maps.forEach(m=>m.remove());maps=[];}
function bind(root=document){
 if(!window.L)return;
 observer?.disconnect();
 const start=box=>{
  if(box.dataset.mapBound)return;box.dataset.mapBound='true';
  const day=box.dataset.mapDay==='all'?null:Number(box.dataset.mapDay),choice=box.dataset.mapChoice;
  const ids=unique(day===null?['hiroshima','simose','takeo','nagasaki','beppu','kitakyushumuseum','fukuoka']:dayRoute(day,choice));
  const bounds=ids.map(id=>[data.points[id].lat,data.points[id].lng]);
  const el=box.querySelector('.street-map');
  const m=L.map(el,{scrollWheelZoom:false,zoomControl:true,attributionControl:true});maps.push(m);
  m.fitBounds(bounds,{padding:[36,36],maxZoom:15,animate:false});
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
  let errors=0,loaded=false;
  tiles.on('tileload',()=>{loaded=true;box.classList.add('has-street-map');});
  tiles.on('tileerror',()=>{errors++;if(!loaded&&errors>=3){box.classList.remove('has-street-map');}});
  tiles.addTo(m);
  ids.forEach((id,i)=>{const p=data.points[id];
   const icon=L.divIcon({className:'street-marker',html:'<span>'+String(i+1)+'</span>',iconSize:[32,32],iconAnchor:[16,16]});
   const marker=L.marker([p.lat,p.lng],{icon,title:p.name,alt:p.name,keyboard:true}).addTo(m);
   const a=document.createElement('a');a.textContent=p.name;a.href=navigate(p);a.target='_blank';a.rel='noopener noreferrer';
   marker.bindPopup(a);marker.bindTooltip(p.name,{direction:'top',offset:[0,-12]});
  });
  plannedLegs(day,choice).forEach(leg=>{const lines=verifiedLines(leg);if(lines)lines.forEach(line=>L.polyline(line.map(p=>[p[1],p[0]]),{color:'#3c5b76',weight:3,opacity:.9}).addTo(m));});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)m.options.zoomAnimation=true;
  else m.options.zoomAnimation=false;
 };
 if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){observer.unobserve(e.target);start(e.target);}}),{rootMargin:'120px'});root.querySelectorAll('.route-map-canvas').forEach(el=>observer.observe(el));}
 else root.querySelectorAll('.route-map-canvas').forEach(start);
}
window.JAPAN_ROUTE_MAP={render,dayRoute,plannedLegs,verifiedLines,bind,release};
})();
