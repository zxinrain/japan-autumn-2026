/* Frozen presentation components. Edit content in the data files; see LAYOUT-RULES.md. */
(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Lucide chevron-down, @iconify-json/lucide 1.2.100, ISC.
const chevron='<svg class="fold-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9l6 6l6-6"/></svg>';
function foldSummary(title,description=''){
 return `<summary class="fold-summary"><span class="fold-heading"><span class="fold-title">${esc(title)}</span>${description?`<span class="fold-description">${esc(description)}</span>`:''}</span><span class="fold-control">${chevron}<span class="fold-closed">展开</span><span class="fold-open">收起</span></span></summary>`;
}
function gallery(destination,sources){
 const images=destination.images;
 if(!images.length)return '';
 return `<div class="place-gallery detail-photo" data-gallery role="region" aria-roledescription="图片轮播" aria-label="${esc(destination.name)}实景图片"><div class="gallery-track" tabindex="${images.length>1?'0':'-1'}" aria-label="${images.length>1?'左右滑动浏览目的地图片':'目的地实景'}">${images.map((p,i)=>`<figure class="gallery-slide" role="group" aria-label="第 ${i+1} 张，共 ${images.length} 张"><img src="assets/${esc(p[0])}" alt="${esc(p[1])}" width="1200" height="800" loading="${i?'lazy':'eager'}"${i?'':' fetchpriority="high"'}><figcaption>${esc(p[1])} · <a href="${esc(sources[p[3]][1])}" target="_blank" rel="noopener noreferrer">${esc(p[2])}</a></figcaption></figure>`).join('')}</div>${images.length>1?`<div class="gallery-tools"><p class="gallery-progress" role="status" aria-live="polite">1 / ${images.length}</p><p class="gallery-hint">左右滑动看更多实景</p><div class="gallery-buttons"><button type="button" class="button" data-photo-step="-1" aria-label="查看上一张目的地照片" disabled>上一张</button><button type="button" class="button" data-photo-step="1" aria-label="查看下一张目的地照片">下一张</button></div></div>`:''}</div>`;
}
function timeline(day,index){
 const transfer=day.transfer;
 const first=transfer?(()=>{const t=transfer.timeline||transfer;return `<section class="session transfer-session" aria-label="跨城交通"><h3>跨城交通</h3><p class="session-route">${esc(transfer.route)}</p><dl class="session-facts">${[['全程预留',t.duration],['计划出发',t.departure],['最迟出发 · 15:00目标',t.latest],['预计抵达',t.arrival]].map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p class="session-note">${esc(transfer.status)}</p></section>`;})():'';
 return `<div class="timeline-shell" data-timeline><div class="schedule horizontal-timeline" id="timeline-${index}" tabindex="0" role="region" aria-label="全天安排，左右滑动或用方向键横向浏览">${first}${[['上午',day.am],['中午',day.noon],['下午',day.pm],['夜晚',day.night]].map(([name,text])=>`<section class="session" aria-label="${name}"><h3>${name}</h3><p>${esc(text)}</p></section>`).join('')}</div><p class="timeline-hint">左右滑动查看全天安排</p></div>`;
}

function bind(root){
 const behavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
 root.querySelectorAll('[data-timeline]').forEach(shell=>{
  if(shell.dataset.bound)return;shell.dataset.bound='true';const track=shell.querySelector('.horizontal-timeline');
  track.addEventListener('keydown',e=>{if(e.target!==track||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();track.scrollTo({left:e.key==='Home'?0:e.key==='End'?track.scrollWidth:track.scrollLeft+(e.key==='ArrowRight'?1:-1)*track.children[0].getBoundingClientRect().width,behavior:behavior()});});
 });
 root.querySelectorAll('[data-gallery]').forEach(gallery=>{
  if(gallery.dataset.bound)return;gallery.dataset.bound='true';const track=gallery.querySelector('.gallery-track'),slides=[...track.children];if(slides.length<2)return;
  const previous=gallery.querySelector('[data-photo-step="-1"]'),next=gallery.querySelector('[data-photo-step="1"]');let current=0,frame=0;
  const sync=()=>{const left=track.getBoundingClientRect().left;current=slides.reduce((best,slide,i)=>Math.abs(slide.getBoundingClientRect().left-left)<Math.abs(slides[best].getBoundingClientRect().left-left)?i:best,0);previous.disabled=current===0;next.disabled=current===slides.length-1;gallery.querySelector('.gallery-progress').textContent=`${current+1} / ${slides.length}`;};
  const go=i=>track.scrollTo({left:slides[Math.max(0,Math.min(slides.length-1,i))].offsetLeft,behavior:behavior()});
  previous.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync)},{passive:true});
  track.addEventListener('keydown',e=>{if(e.target!==track||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();go(e.key==='Home'?0:e.key==='End'?slides.length-1:current+(e.key==='ArrowRight'?1:-1));});sync();
 });
}
window.TRAVEL_LAYOUT={foldSummary,gallery,timeline,bind};
})();
