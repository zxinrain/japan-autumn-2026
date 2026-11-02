const $ = s => document.querySelector(s);
const safe = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ext = (url,label) => `<a href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(label)} ↗</a>`;
const cityName = id => TRIP.cities.find(c=>c.id===id)?.name || id;
let selectedFilter = 'all';
function selectCity(id){
  const c=TRIP.cities.find(c=>c.id===id); if(!c) return;
  document.querySelectorAll('#city-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.city===id)));
  document.querySelectorAll('.map-node').forEach(n=>{n.classList.toggle('selected',n.dataset.city===id);n.setAttribute('aria-pressed',String(n.dataset.city===id));});
  $('#city-detail').innerHTML=`<p class="city-count">${safe(c.nights)}</p><h3>${safe(c.name)}</h3><p class="city-en">${safe(c.en)}</p><p class="city-description">${safe(c.description)}</p><div class="city-meta"><div><span>停留</span>${safe(c.dates)}</div><div><span>重点</span>${safe(c.highlights)}</div><div><span>移动</span>${safe(c.transport)}</div></div><button class="text-button inline-link" id="see-city-days" type="button">查看${safe(c.name)}每日安排 ↓</button>`;
  $('#see-city-days').addEventListener('click',()=>{filterDays(id);$('#journey').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
}
$('#city-tabs').innerHTML=TRIP.cities.map(c=>`<button type="button" data-city="${c.id}" aria-pressed="false">${safe(c.name)}</button>`).join('');
document.querySelectorAll('#city-tabs button,.map-node').forEach(el=>{el.addEventListener('click',()=>selectCity(el.dataset.city));if(el.classList.contains('map-node'))el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectCity(el.dataset.city);}});});
selectCity('hiroshima');
$('#journey-filters').innerHTML=[['all','全部 25 天'],...TRIP.cities.map(c=>[c.id,c.name])].map(([id,name])=>`<button type="button" data-filter="${id}" aria-pressed="${id==='all'}">${safe(name)}</button>`).join('');
const weekday=['周日','周一','周二','周三','周四','周五','周六'];
function renderDays(){
  const days=TRIP.daysData.filter(d=>selectedFilter==='all'||d.city===selectedFilter);
  $('#filter-count').textContent=selectedFilter==='all'?'25 天完整行程 · 点击日期展开详情':`${cityName(selectedFilter)} · ${days.length} 天相关安排（含抵达与离开日）`;
  $('#day-list').innerHTML=days.map(d=>{
    const dt=new Date(d.date+'T12:00:00+09:00');const date=d.date.slice(5).replace('-','.');
    const map='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.title.split(/[：，]/)[0]+' 日本');
    const tickets=RESERVATIONS.tickets.filter(t=>t.dates.includes(d.date));
    const rail=RESERVATIONS.rail.filter(t=>t.date===d.date);
    const hints=[...tickets.map(t=>`<a href="#reservations" data-booking-tab="tickets">${safe(t.name)}：${safe(RESERVATIONS.levels[t.level])} ↗</a>`),...rail.map(t=>`<a href="#reservations" data-booking-tab="rail">${safe(t.train)}：${safe(t.priority)} ↗</a>`)];
    return `<details class="day" id="day-${d.number}"><summary><div><span class="day-date">${date}</span><span class="day-week">DAY ${String(d.number).padStart(2,'0')} · ${weekday[dt.getUTCDay()]}</span></div><div class="day-title"><h3>${safe(d.title)}</h3><p>${safe(d.subtitle)}<span class="day-badge">${safe(d.badge)}</span></p></div><div class="day-stay"><b>${safe(d.stay)}</b>${d.number===25?'当日抵达':'当晚住宿'}</div><span class="day-plus" aria-hidden="true"></span></summary><div class="day-content"><div class="day-schedule"><div><span>MORNING / 上午</span><p>${safe(d.am)}</p></div><div><span>AFTERNOON & EVENING / 午后与夜晚</span><p>${safe(d.pm)}</p></div></div><div class="day-transport"><span>GETTING THERE / 今日交通</span><p>${safe(d.transport)}</p></div><p class="day-note">${safe(d.note)}</p>${hints.length?`<div class="day-reservations"><span>预约提示</span>${hints.join('')}</div>`:''}<div class="day-links">${d.url?ext(d.url,d.source):''}${ext(map,'地图搜索')}<a href="hotels.html?city=${d.stayCity||d.city}">住宿候选 ↗</a></div></div></details>`;
  }).join('');
  if(days.length)$('#day-list details').open=true;
  updateExpandLabel();
  document.querySelectorAll('.day').forEach(d=>d.addEventListener('toggle',updateExpandLabel));
}
function filterDays(id){selectedFilter=id;document.querySelectorAll('#journey-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===id)));renderDays();}
function updateExpandLabel(){const nodes=[...document.querySelectorAll('.day')];const all=nodes.length>0&&nodes.every(d=>d.open);$('#expand-all').innerHTML=all?'收起全部 <span>−</span>':'展开全部 <span>＋</span>';$('#expand-all').setAttribute('aria-expanded',String(all));}
$('#journey-filters').addEventListener('click',e=>{const b=e.target.closest('button');if(b)filterDays(b.dataset.filter);});
$('#expand-all').addEventListener('click',()=>{const nodes=[...document.querySelectorAll('.day')];const next=!nodes.every(d=>d.open);nodes.forEach(d=>d.open=next);updateExpandLabel();});
renderDays();
$('#building-list').innerHTML=TRIP.buildings.map((b,i)=>{
  const a=ARCHITECTURE_DETAILS[b[1]];
  return `<details class="building building-detail" id="building-${i+1}"><summary><span class="building-index">${String(i+1).padStart(2,'0')}</span><div><h4>${safe(b[1])}</h4><p>${safe(b[2])} · ${safe(b[3])}</p>${b[5]?`<p class="building-status">${safe(b[5])}</p>`:''}</div><span class="building-toggle"><small>${safe(b[0])}</small><span aria-hidden="true">＋</span></span></summary><div class="building-body"><figure><img src="${safe(a.image)}" alt="${safe(b[1]+' · '+a.caption)}" loading="lazy"><figcaption>${safe(a.caption)} · ${ext(a.source,a.credit)}</figcaption></figure><p class="building-intro">${safe(a.intro)}</p><p class="building-look"><b>看点</b>${safe(a.look)}</p><div class="building-booking"><span class="booking-level ${safe(a.level)}">${safe(RESERVATIONS.levels[a.level])}</span><p>${safe(a.booking)}</p></div><div class="building-links">${ext(b[4],'官网与参观信息')}<a href="#reservations" data-booking-tab="tickets">查看预约清单 ↓</a></div></div></details>`;
}).join('');
function updateBuildingsLabel(){const nodes=[...document.querySelectorAll('.building-detail')];const all=nodes.every(n=>n.open);$('#expand-buildings').textContent=all?'收起全部图片 −':'展开全部图片 ＋';$('#expand-buildings').setAttribute('aria-expanded',String(all));}
$('#expand-buildings').addEventListener('click',()=>{const nodes=[...document.querySelectorAll('.building-detail')];const open=!nodes.every(n=>n.open);nodes.forEach(n=>n.open=open);updateBuildingsLabel();});
document.querySelectorAll('.building-detail').forEach(n=>n.addEventListener('toggle',()=>{n.querySelector('.building-toggle>span').textContent=n.open?'−':'＋';updateBuildingsLabel();}));
$('#charter-list').innerHTML=TRIP.charters.map(c=>`<article class="charter-card"><span>${safe(c[0])}</span><h4>${safe(c[1])}</h4><p>${safe(c[2])}</p><small>${safe(c[3])}</small></article>`).join('');
$('#source-links').innerHTML=TRIP.sources.map(s=>ext(s[1],s[0])).join('');
let reservationTab='tickets',priorityOnly=false;
function renderReservations(){
  document.querySelectorAll('#reservation-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===reservationTab)));
  $('#priority-only').hidden=reservationTab!=='tickets';
  if(reservationTab==='tickets'){
    const rows=RESERVATIONS.tickets.filter(t=>!priorityOnly||t.level!=='onsite');
    $('#reservation-panel').innerHTML=`<p class="filter-count">${rows.length} 项门票与场馆安排 · “通常可现场”仅指普通个人参观，特别展览另查。</p><div class="reservation-table-wrap"><table class="reservation-table"><caption class="sr-only">门票与场馆预约清单</caption><thead><tr><th scope="col">参观日期</th><th scope="col">项目</th><th scope="col">处理级别</th><th scope="col">时间与操作</th><th scope="col">官方入口</th></tr></thead><tbody>${rows.map(t=>`<tr><td data-label="参观日期">${t.dates.map(d=>safe(d.slice(5).replace('-','/'))).join('、')}</td><td data-label="项目"><b>${safe(t.name)}</b></td><td data-label="处理级别"><span class="booking-level ${safe(t.level)}">${safe(RESERVATIONS.levels[t.level])}</span></td><td data-label="时间与操作"><strong>${safe(t.when)}</strong><p>${safe(t.detail)}</p></td><td data-label="官方入口">${ext(t.url,'官方规则')}${t.booking?ext(t.booking,'预约入口'):''}</td></tr>`).join('')}</tbody></table></div>`;
  }else if(reservationTab==='rail'){
    $('#reservation-panel').innerHTML=`<p class="filter-count">${RESERVATIONS.rail.length} 段铁路安排 · 所列为通常指定席开售日，班次与余票未查询，未实际购票。</p><div class="reservation-table-wrap"><table class="reservation-table rail-table"><caption class="sr-only">铁路指定席开售与预订清单</caption><thead><tr><th scope="col">乘车日期</th><th scope="col">区间与列车</th><th scope="col">指定席通常开售</th><th scope="col">优先级与说明</th><th scope="col">官方入口</th></tr></thead><tbody>${RESERVATIONS.rail.map(t=>`<tr><td data-label="乘车日期">${safe(t.date.slice(5).replace('-','/'))}</td><td data-label="区间与列车"><b>${safe(t.name)}</b><p>${safe(t.train)}</p></td><td data-label="指定席通常开售"><strong>${safe(t.release)}</strong><small>日本 10:00<br>香港／中国 09:00</small></td><td data-label="优先级与说明"><span class="booking-level ${t.priority==='优先划位'?'recommend':'onsite'}">${safe(t.priority)}</span><p>${safe(t.detail)}</p></td><td data-label="官方入口">${ext(t.url,'官方订票')}</td></tr>`).join('')}</tbody></table></div>`;
  }else{
    $('#reservation-panel').innerHTML=`<div class="reservation-service-list">${RESERVATIONS.services.map(t=>`<article><span>${safe(t.date)}</span><h3>${safe(t.name)}</h3><p>${safe(t.detail)}</p></article>`).join('')}</div>`;
  }
}
function selectReservationTab(tab){if(!['tickets','rail','services'].includes(tab))return;reservationTab=tab;renderReservations();}
$('#reservation-tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)selectReservationTab(b.dataset.tab);});
$('#priority-only').addEventListener('click',()=>{priorityOnly=!priorityOnly;$('#priority-only').setAttribute('aria-pressed',String(priorityOnly));$('#priority-only').textContent=priorityOnly?'显示全部项目':'只看需提前处理';renderReservations();});
document.addEventListener('click',e=>{const a=e.target.closest('a[data-booking-tab]');if(a)selectReservationTab(a.dataset.bookingTab);});
$('#reservation-sources').innerHTML=RESERVATIONS.sources.map(s=>ext(s[1],s[0])).join('');
renderReservations();
window.addEventListener('beforeprint',()=>document.querySelectorAll('.day,.building-detail').forEach(d=>d.open=true));
