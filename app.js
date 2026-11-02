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
    return `<details class="day" id="day-${d.number}"><summary><div><span class="day-date">${date}</span><span class="day-week">DAY ${String(d.number).padStart(2,'0')} · ${weekday[dt.getUTCDay()]}</span></div><div class="day-title"><h3>${safe(d.title)}</h3><p>${safe(d.subtitle)}<span class="day-badge">${safe(d.badge)}</span></p></div><div class="day-stay"><b>${safe(d.stay)}</b>${d.number===25?'当日抵达':'当晚住宿'}</div><span class="day-plus" aria-hidden="true"></span></summary><div class="day-content"><div class="day-schedule"><div><span>MORNING / 上午</span><p>${safe(d.am)}</p></div><div><span>AFTERNOON & EVENING / 午后与夜晚</span><p>${safe(d.pm)}</p></div></div><div class="day-transport"><span>GETTING THERE / 今日交通</span><p>${safe(d.transport)}</p></div><p class="day-note">${safe(d.note)}</p><div class="day-links">${d.url?ext(d.url,d.source):''}${ext(map,'地图搜索')}<a href="hotels.html?city=${d.city}">住宿候选 ↗</a></div></div></details>`;
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
$('#building-list').innerHTML=TRIP.buildings.map((b,i)=>`<article class="building"><span class="building-index">${String(i+1).padStart(2,'0')}</span><div><h4>${safe(b[1])}</h4><p>${safe(b[2])} · ${safe(b[3])}</p>${b[5]?`<p class="building-status">${safe(b[5])}</p>`:''}</div><a href="${safe(b[4])}" target="_blank" rel="noopener noreferrer">${safe(b[0])} ↗</a></article>`).join('');
$('#charter-list').innerHTML=TRIP.charters.map(c=>`<article class="charter-card"><span>${safe(c[0])}</span><h4>${safe(c[1])}</h4><p>${safe(c[2])}</p><small>${safe(c[3])}</small></article>`).join('');
$('#source-links').innerHTML=TRIP.sources.map(s=>ext(s[1],s[0])).join('');
window.addEventListener('beforeprint',()=>document.querySelectorAll('.day').forEach(d=>d.open=true));
