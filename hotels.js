const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cities=[['all','全部'],['hiroshima','广岛'],['takeo','武雄'],['nagasaki','长崎'],['beppu','别府'],['yufuin','由布院'],['fukuoka','福冈'],['kagoshima','鹿儿岛']];
const requested=new URLSearchParams(location.search).get('city');
let city=cities.some(c=>c[0]===requested)?requested:'all';
const filters=document.querySelector('#hotel-filters');
filters.innerHTML=cities.map(c=>`<button type="button" data-city="${c[0]}" aria-pressed="${city===c[0]}">${c[1]}</button>`).join('');
const pageQuery = new URLSearchParams(location.search);
const requestedDate = pageQuery.get('date') || '';
const chosenStays = new Map(HOTELS.map(h=>[h.id,HOTEL_LINKS.initialStay(h,requestedDate)]));
const androidChrome = /Android/i.test(navigator.userAgent) && /Chrome\//i.test(navigator.userAgent);
function links(h,stay){ return HOTEL_LINKS.build(h,stay); }
function row(h,stay){
 const l=links(h,stay);
 const a=(url,label,app=false)=>`<a href="${safe(url)}" ${app?'data-app-launch="true"':''}${url.startsWith('https:')&&!app?' target="_blank" rel="noopener noreferrer"':''}>${label} ↗</a>`;
 const cell=(appUrl,web,note)=>`<span class="price-status">CNY 待查询</span>${a(appUrl,'App 优先打开',true)}${a(web,'同日期网页')}<small>${safe(note)}</small>`;
 return `<tr><td>${cell(androidChrome?l.agodaIntent:l.agodaApp,l.agoda,'已带酒店与日期；手机显示仍需核对')}</td><td>${cell(androidChrome?l.bookingIntent:l.booking,l.booking,'按酒店名称搜索；App 接收情况待实测')}</td><td>${cell(androidChrome?l.ctripIntent:l.app,l.ctrip,'已修正携程实际读取的入住日与晚数')}</td><td>${l.ikyu?cell(androidChrome?l.ikyuIntent:l.ikyu,l.ikyu,'一休宿泊 App；未接收时回同日期网页'):'<span class="price-status">收录待确认</span><small>未核实酒店页面，暂不提供无日期首页跳转</small>'}</td><td><span class="price-status">CNY 待查询</span>${a(l.official,l.officialDated?'按日期查官网':'打开官网预订')}<small>${l.officialDated?'已带日期；官网页面仍需核对':'官网日期需手选；未核实该酒店 App 直达方式'}</small></td></tr>`;
}
function render(){
  const hotels=HOTELS.filter(h=>city==='all'||h.city===city);
  document.querySelector('#hotel-count').textContent=`${hotels.length} 家候选酒店 · 2 位成人／1 间房 · 当前价格与房态均待查询`;
  document.querySelector('#hotel-list').innerHTML=hotels.map(h=>`<article class="hotel-card" id="hotel-${h.id}"><div class="hotel-card-top"><figure><img src="assets/hotel${String(h.id).padStart(2,'0')}.webp" alt="${safe(h.cn)}酒店图片参考" loading="lazy"><figcaption>历史图片参考 · <a href="${safe(h.imageSource)}" target="_blank" rel="noopener noreferrer">图片来源：${safe(h.imageCredit||'一休')} ↗</a></figcaption></figure><div><p class="eyebrow">${safe(h.region)}</p><h3>${safe(h.cn)}</h3><p class="hotel-en">${safe(h.en)}</p><span class="hotel-feature">${safe(h.feature)}</span><p class="hotel-detail">房型方向：${safe(h.room)}<br>${safe(h.note)}</p><div class="hotel-date-label"><label for="dates-${h.id}">查询入住段</label><select id="dates-${h.id}" data-hotel="${h.id}">${h.stays.map((s,i)=>`<option value="${i}" ${i===chosenStays.get(h.id)?'selected':''}>${s[0]} → ${s[1]} · ${(Date.parse(s[1])-Date.parse(s[0]))/86400000} 晚</option>`).join('')}</select></div><p class="hotel-warn">未确认独立双床库存、餐食及取消政策；照片不等同最终预订房型。</p></div></div><div class="hotel-handoff" id="handoff-${h.id}" role="status"><span>${h.stays[chosenStays.get(h.id)][0]} 入住 → ${h.stays[chosenStays.get(h.id)][1]} 退房 · 2 位成人／1 间房</span><button type="button" data-copy-stay="${h.id}">复制酒店与日期</button></div><div class="comparison-scroll" tabindex="0" role="region" aria-label="${safe(h.cn)}五平台比较，窄屏可横向滚动"><table class="comparison-table"><caption class="sr-only">${safe(h.cn)}五平台价格状态与查询入口</caption><thead><tr><th scope="col">Agoda</th><th scope="col">Booking</th><th scope="col">携程</th><th scope="col">一休 Ikyu</th><th scope="col">酒店官网</th></tr></thead><tbody>${row(h,h.stays[chosenStays.get(h.id)])}</tbody></table></div></article>`).join('');
  document.querySelectorAll('[data-hotel]').forEach(select=>select.addEventListener('change',()=>{const h=HOTELS.find(h=>h.id===Number(select.dataset.hotel));const stay=h.stays[Number(select.value)];HOTELS.filter(other=>other.city===h.city).forEach(other=>{const i=other.stays.findIndex(s=>s[0]===stay[0]&&s[1]===stay[1]);if(i>=0)chosenStays.set(other.id,i);});render();document.querySelector(`#dates-${h.id}`).focus();}));
}
filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;city=b.dataset.city;filters.querySelectorAll('button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.city===city)));render();});
render();

document.querySelector('#hotel-list').addEventListener('click',e=>{
 const a=e.target.closest('[data-app-launch]');if(!a)return;
 const card=a.closest('.hotel-card'),h=HOTELS.find(h=>`hotel-${h.id}`===card.id),stay=h.stays[chosenStays.get(h.id)];
 card.querySelector('.hotel-handoff span').textContent=`正在请求打开 App：${h.cn} · ${stay[0]} 入住 → ${stay[1]} 退房。若未打开，请点“同日期网页”；打开后请核对页面日期。`;
});
if(location.hash.startsWith('#hotel-'))document.getElementById(location.hash.slice(1))?.scrollIntoView();

document.querySelector('#hotel-list').addEventListener('click',async e=>{
 const button=e.target.closest('[data-copy-stay]');if(!button)return;
 const h=HOTELS.find(h=>h.id===Number(button.dataset.copyStay)),[a,b]=h.stays[chosenStays.get(h.id)];
 const text=`${h.cn} / ${h.en}\n入住 ${a} · 退房 ${b}\n2 位成人 · 1 间房 · 优先独立双床`;
 try{await navigator.clipboard.writeText(text);button.textContent='已复制';}
 catch{const note=document.querySelector(`#handoff-${h.id} span`);note.textContent=text+'（可长按选择复制）';}
});
