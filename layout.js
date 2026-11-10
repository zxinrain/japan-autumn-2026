/* Frozen presentation components. Edit content in the data files; see LAYOUT-RULES.md. */
(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Lucide line icons, same family as the existing navigation (ISC).
const actionPaths={pause:'<path d="M8 5v14M16 5v14"/>',play:'<path d="m8 5 11 7-11 7Z"/>',car:'<path d="m5 6-3 7v6h20v-6l-3-7ZM2 13h20M6 19v3m12-3v3M6 16h.01M18 16h.01"/>',plane:'<path d="m22 2-7 20-4-9-9-4ZM11 13 22 2"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',meal:'<path d="M4 3v7a2 2 0 0 0 4 0V3M6 3v19M20 22V3c-4 2-5 8 0 10"/>',afternoon:'<path d="M3 17h18M5 21h14M7 17a5 5 0 0 1 10 0M12 3v4M3 10l3 2m12 0 3-2"/>',moon:'<path d="M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11Z"/>',route:'<path d="M5 4h14v13H5zM8 21l2-4m6 4-2-4M5 10h14M9 14h.01M15 14h.01"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',camera:'<path d="M3 7h4l2-3h6l2 3h4v14H3z"/><circle cx="12" cy="13" r="4"/>',adjust:'<path d="M4 7h16M4 17h16M8 4v6m8 4v6"/>',external:'<path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2ZM13 5v2m0 10v2m0-8v2"/>',download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',comparison:'<path d="M8 3H4v18h4M16 3h4v18h-4M9 7h6M9 12h6M9 17h6"/>',budget:'<path d="M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6m18 7h-5v4h5m-3-2h.01"/>',back:'<path d="m12 5-7 7 7 7M5 12h15"/>'};
function icon(name){return `<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${actionPaths[name]||actionPaths.external}</svg>`;}
function actionLink(text,url,type='external',{external=false,download=false}={}){return `<a class="action-link" href="${esc(url)}"${external?' target="_blank" rel="noopener noreferrer"':''}${download?' download':''}>${icon(type)}<span>${esc(text)}</span></a>`;}
// Lucide chevron-down, @iconify-json/lucide 1.2.100, ISC.
const chevron='<svg class="fold-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9l6 6l6-6"/></svg>';
function foldSummary(title,description=''){
 return `<summary class="fold-summary"><span class="fold-heading"><span class="fold-title">${esc(title)}</span>${description?`<span class="fold-description">${esc(description)}</span>`:''}</span><span class="fold-control">${chevron}<span class="fold-closed">展开</span><span class="fold-open">收起</span></span></summary>`;
}
function gallery(destination,sources){
 const images=destination.images;
 if(!images.length)return '';
 return `<div class="place-gallery detail-photo" data-gallery role="region" aria-roledescription="图片轮播" aria-label="${esc(destination.name)}实景图片"><div class="gallery-track" tabindex="${images.length>1?'0':'-1'}" aria-label="${images.length>1?'左右滑动浏览目的地图片':'目的地实景'}">${images.map((p,i)=>`<figure class="gallery-slide" role="group" aria-label="第 ${i+1} 张，共 ${images.length} 张"><img src="assets/${esc(p[0])}" alt="${esc(p[1])}" width="1200" height="800" loading="${i?'lazy':'eager'}"${i?'':' fetchpriority="high"'}><figcaption class="sr-only">${esc(p[1])} · ${esc(p[2])}</figcaption></figure>`).join('')}</div>${images.length>1?`<div class="gallery-tools"><input class="gallery-position" type="range" min="1" max="${images.length}" value="1" step="1" aria-label="选择目的地照片" aria-valuetext="第1张，共${images.length}张"><button type="button" class="gallery-autoplay utility-icon" aria-label="暂停自动切换" aria-pressed="false">${icon('pause')}</button></div>`:''}</div>`;
}
function dayNotes(day){return `<section class="field-notes detail-block"><h2>现场提示</h2><div class="field-notes-grid"><section><h3>${icon('adjust')}行程调整</h3><p>${esc(day.cut)}</p></section><section><h3>${icon('camera')}摄影观察</h3><p>${esc(day.photo)}</p></section></div></section>`;}
function timeline(day,index){
 const transfer=day.transfer;
 const first=transfer?(()=>{const t=transfer.timeline||transfer;return `<section class="session transfer-session" aria-label="跨城交通"><h3>${icon([0,19].includes(index)?'plane':[5,7].includes(index)?'route':'car')}跨城交通</h3><p class="session-route">${esc(transfer.route)}</p><dl class="session-facts">${[['出发',t.departure],['全程',t.duration],['抵达',t.arrival]].map(([k,v])=>`<div><dt>${icon('clock')}${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p class="session-note">${esc(transfer.status)}</p></section>`;})():'';
 const phases=[['上午','am','sun'],['中午','noon','meal'],['下午','pm','afternoon'],['夜晚','night','moon']];
 const sessions=phases.map(([name,key,symbol])=>`<section class="session" aria-label="${name}"><h3>${icon(symbol)}${name}</h3><ul class="session-stops">${(day.timelineCompact?.[key]||day[key]).split('\n').map(line=>{const split=line.indexOf('｜');return `<li>${split>=0?`<time>${esc(line.slice(0,split))}</time><span>${esc(line.slice(split+1))}</span>`:esc(line)}</li>`}).join('')}</ul></section>`).join('');
 return `<div class="timeline-shell" data-timeline><div class="schedule horizontal-timeline" id="timeline-${index}" tabindex="0" role="region" aria-label="全天安排，左右滑动或用方向键横向浏览">${first}${sessions}</div><p class="timeline-hint">左右滑动查看全天安排</p></div>`;
}

function bind(root){
 const behavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
 root.querySelectorAll('[data-timeline]').forEach(shell=>{
  if(shell.dataset.bound)return;shell.dataset.bound='true';const track=shell.querySelector('.horizontal-timeline');
  track.addEventListener('keydown',e=>{if(e.target!==track||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();track.scrollTo({left:e.key==='Home'?0:e.key==='End'?track.scrollWidth:track.scrollLeft+(e.key==='ArrowRight'?1:-1)*track.children[0].getBoundingClientRect().width,behavior:'instant'});});
 });
 root.querySelectorAll('[data-gallery]').forEach(gallery=>{
  if(gallery.dataset.bound)return;gallery.dataset.bound='true';const track=gallery.querySelector('.gallery-track'),slides=[...track.children];if(slides.length<2)return;
  const slider=gallery.querySelector('.gallery-position'),toggle=gallery.querySelector('.gallery-autoplay');
  let current=0,target=null,frame=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,hover=false,interacting=false;
  const updateToggle=()=>{toggle.setAttribute('aria-label',paused?'开始自动切换':'暂停自动切换');toggle.setAttribute('aria-pressed',String(paused));toggle.innerHTML=icon(paused?'play':'pause');};
  const sync=()=>{const left=track.getBoundingClientRect().left;current=slides.reduce((best,slide,i)=>Math.abs(slide.getBoundingClientRect().left-left)<Math.abs(slides[best].getBoundingClientRect().left-left)?i:best,0);if(target!==null&&Math.abs(slides[target].getBoundingClientRect().left-left)<2)target=null;slider.value=String(current+1);slider.setAttribute('aria-valuetext',`第${current+1}张，共${slides.length}张`);};
  const go=(i,animate=true)=>{target=Math.max(0,Math.min(slides.length-1,i));const left=track.scrollLeft+slides[target].getBoundingClientRect().left-track.getBoundingClientRect().left;track.scrollTo({left,behavior:animate?behavior():'instant'});};
  const selectPhoto=()=>{paused=true;updateToggle();go(Number(slider.value)-1,false);};slider.addEventListener('input',selectPhoto);slider.addEventListener('change',selectPhoto);
  toggle.addEventListener('click',()=>{paused=!paused;updateToggle();});
  for(const type of ['pointerdown','wheel'])track.addEventListener(type,()=>{target=null;paused=true;updateToggle();},{passive:true});
  gallery.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')hover=true;});gallery.addEventListener('pointerleave',()=>{hover=false;});
  track.addEventListener('touchstart',()=>{interacting=true;paused=true;updateToggle();},{passive:true});track.addEventListener('touchend',()=>{interacting=false;},{passive:true});
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync)},{passive:true});
  track.addEventListener('keydown',e=>{if(e.target!==track||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();paused=true;updateToggle();go(e.key==='Home'?0:e.key==='End'?slides.length-1:(target??current)+(e.key==='ArrowRight'?1:-1),false);});
  const timer=setInterval(()=>{if(!gallery.isConnected){clearInterval(timer);return}const rect=gallery.getBoundingClientRect();if(paused||hover||interacting||document.hidden||(gallery.contains(document.activeElement)&&document.activeElement!==toggle)||rect.bottom<=0||rect.top>=innerHeight||matchMedia('(prefers-reduced-motion: reduce)').matches)return;go((current+1)%slides.length);},5000);
  updateToggle();sync();
 });
}
window.TRAVEL_LAYOUT={foldSummary,gallery,timeline,bind,icon,actionLink,dayNotes};
})();
