/* Calendar and deliberate horizontal navigation; native nested scrolling stays independent. */
(()=>{
'use strict';
const trip=window.JAPAN_TRIP.trip,start=Date.parse(trip.departure+'T00:00:00Z'),count=trip.days.length;
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=i=>new Date(start+i*86400000),iso=i=>date(i).toISOString().slice(0,10),label=i=>`${date(i).getUTCMonth()+1}月${date(i).getUTCDate()}日`,week=i=>'周'+'日一二三四五六'[date(i).getUTCDay()];
let current=0,transition=null;
const calendarBindings=[];
const swipeBindings=[];
function cancelTransition(){if(!transition)return;const {animation,element}=transition;transition=null;animation.cancel();element.style.transform='';element.style.opacity='';}
function clearSwipes(){cancelTransition();for(const controller of calendarBindings)controller.abort();calendarBindings.length=0;for(const {el,controller} of swipeBindings){controller.abort();el.style.transform='';el.style.opacity='';delete el.dataset.swipeBound;}swipeBindings.length=0;}
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const arrow=side=>`<img class="date-arrow ${side}" src="assets/icons/ui-chevron-down.svg" width="20" height="20" alt="" aria-hidden="true">`;
function calendar(day){if(day!==null)current=day;return `<div class="date-navigation" data-current-day="${current}"><div class="date-controls"><button class="button date-step" type="button" data-step-day="-1" aria-label="前一天"${current===0?' disabled':''}>${arrow('left')}<span>前一天</span></button><button class="button calendar-trigger" type="button" data-calendar-toggle aria-expanded="false" aria-controls="trip-calendar"><img src="assets/icons/ui-calendar-days.svg" width="18" height="18" alt="" aria-hidden="true"><span>${label(current)} · ${week(current)}</span><span class="sr-only">，打开日历</span></button><button class="button date-step" type="button" data-step-day="1" aria-label="后一天"${current===count-1?' disabled':''}><span>后一天</span>${arrow('right')}</button></div><div class="date-status"><span role="status" aria-live="polite">Day ${current+1} / ${count} · ${day===null?'正在看全程地图':'左右滑动切换日期'}</span><button type="button" class="date-map-switch" data-map-overview>${day===null?'回到当天地图':'查看全程地图'}</button></div><section id="trip-calendar" class="trip-calendar" aria-label="选择行程日期" hidden data-calendar-panel></section></div>`;}
const firstMonth=date(0).getUTCMonth(),lastMonth=date(count-1).getUTCMonth(),year=date(0).getUTCFullYear();
function monthGrid(month){const offset=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7,days=new Date(Date.UTC(year,month+1,0)).getUTCDate();return `<div class="calendar-heading"><button type="button" class="calendar-month" data-month="${month-1}" aria-label="上个月"${month===firstMonth?' disabled':''}>${arrow('left')}</button><h3 id="calendar-month-title">${year} 年 ${month+1} 月</h3><button type="button" class="calendar-month" data-month="${month+1}" aria-label="下个月"${month===lastMonth?' disabled':''}>${arrow('right')}</button></div><div role="grid" aria-labelledby="calendar-month-title"><div class="calendar-week" role="row">${['一','二','三','四','五','六','日'].map(w=>`<span role="columnheader">${w}</span>`).join('')}</div>${Array.from({length:6},(_,r)=>`<div class="calendar-week" role="row">${Array.from({length:7},(_,c)=>{const n=r*7+c-offset+1;if(n<1||n>days)return '<span role="gridcell"></span>';const i=Math.round((Date.UTC(year,month,n)-start)/86400000),valid=i>=0&&i<count;return `<span role="gridcell"><button type="button" data-calendar-day="${i}"${valid?'':' disabled'} tabindex="${valid&&i===current?'0':'-1'}"${i===current?' aria-current="date"':''} aria-label="${month+1}月${n}日${valid?'，'+week(i)+'，'+trip.days[i].city:''}" title="${valid?e(trip.days[i].title):'不在本次行程内'}">${n}</button></span>`}).join('')}</div>`).join('')}</div><p class="calendar-note">可选 ${label(0)}—${label(count-1)} · 蓝色为当前日期</p>`;}
function bindCalendar(root,{onDay,onOverview}){
 root.querySelectorAll('.date-navigation').forEach(nav=>{
  if(nav.dataset.bound)return;nav.dataset.bound='true';
  const panel=nav.querySelector('[data-calendar-panel]'),toggle=nav.querySelector('[data-calendar-toggle]');
  const controller=new AbortController();calendarBindings.push(controller);
  const listen=(el,type,fn)=>el.addEventListener(type,fn,{signal:controller.signal});
  let month=date(current).getUTCMonth();
  const close=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.querySelector('.sr-only').textContent='，打开日历';};
  const focusDay=n=>{
   const target=panel.querySelector(`[data-calendar-day="${n}"]:not(:disabled)`)
    ||panel.querySelector('[aria-current=date]')||panel.querySelector('[data-calendar-day]:not(:disabled)');
   for(const b of panel.querySelectorAll('[data-calendar-day]'))b.tabIndex=b===target?0:-1;
   target?.focus({preventScroll:true});
  };
  // Listeners live only while this calendar is open; opening another never leaks handlers.
  let dismiss=null;
  const dismissClose=()=>{close();dismiss?.abort();dismiss=null;};
  controller.signal.addEventListener('abort',()=>dismiss?.abort(),{once:true});
  listen(nav,'click',ev=>{
   const target=ev.target.closest('button');if(!target||target.disabled)return;
   const motion={animate:ev.detail!==0};
   if(target.matches('[data-calendar-toggle]')){
    if(!panel.hidden){dismissClose();return}
    panel.innerHTML=monthGrid(month);panel.hidden=false;toggle.setAttribute('aria-expanded','true');
    toggle.querySelector('.sr-only').textContent='，收起日历';
    panel.scrollIntoView({block:'nearest',behavior:reduced()||!motion.animate?'instant':'smooth'});
    focusDay(current);dismiss=new AbortController();
    document.addEventListener('pointerdown',event=>{if(!nav.contains(event.target))dismissClose();},{signal:dismiss.signal});
   }else if(target.matches('[data-step-day]')){
    dismissClose();onDay(current+Number(target.dataset.stepDay),Number(target.dataset.stepDay),motion);
   }else if(target.matches('[data-calendar-day]')){
    const n=Number(target.dataset.calendarDay);dismissClose();
    if(n===current)toggle.focus({preventScroll:true});else onDay(n,Math.sign(n-current),motion);
   }else if(target.matches('[data-month]')){
    month=Number(target.dataset.month);panel.innerHTML=monthGrid(month);focusDay(current);
   }else if(target.matches('[data-map-overview]')){dismissClose();onOverview();}
  });
  listen(nav,'focusout',ev=>{if(ev.relatedTarget&&!nav.contains(ev.relatedTarget))dismissClose();});
  listen(nav,'keydown',ev=>{
   if(ev.key==='Escape'&&!panel.hidden){ev.preventDefault();dismissClose();toggle.focus({preventScroll:true});return}
   const cell=ev.target.closest('[data-calendar-day]');if(!cell)return;
   let n=Number(cell.dataset.calendarDay);const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};
   if(ev.key in delta)n+=delta[ev.key];else if(ev.key==='Home')n-=((date(n).getUTCDay()+6)%7);else if(ev.key==='End')n+=6-((date(n).getUTCDay()+6)%7);else return;
   ev.preventDefault();n=Math.min(count-1,Math.max(0,n));
   if(date(n).getUTCMonth()!==month){month=date(n).getUTCMonth();panel.innerHTML=monthGrid(month);}
   focusDay(n);
  });
 });
}
async function change(getElement,direction,commit,{animate=true}={}){
 cancelTransition();
 const old=getElement();if(old){old.style.transform='';old.style.opacity='';}
 // Commit immediately so repeated navigation always starts from the visible date.
 commit();
 const next=getElement();if(!next||!animate||reduced())return;
 const animation=next.animate([
  {transform:`translate3d(${direction*24}px,0,0)`,opacity:0},
  {transform:'translate3d(0,0,0)',opacity:1}
 ],{duration:180,easing:'cubic-bezier(.23,1,.32,1)'});
 transition={animation,element:next};
 try{await animation.finished;}catch(error){if(error.name!=='AbortError')throw error;}
 finally{if(transition?.animation===animation)transition=null;}
}
function swipe(el,{canMove,onMove}){if(!el||el.dataset.swipeBound)return;el.dataset.swipeBound='true';const controller=new AbortController();swipeBindings.push({el,controller});const listen=(type,fn,options={})=>el.addEventListener(type,fn,{...options,signal:controller.signal});let gesture=null,frame=null,wheel=0,last=0;const ignore='a,button,input,select,textarea,summary,[contenteditable],[role=tab],.horizontal-timeline,.gallery-track,.journey-map,.trip-calendar';const reset=()=>{cancelAnimationFrame(frame);el.style.transform='';el.style.opacity='';gesture=null;};listen('touchstart',ev=>{if(ev.touches.length!==1||ev.target.closest(ignore))return;const p=ev.touches[0];if(p.clientX<24||p.clientX>innerWidth-24)return;gesture={x:p.clientX,y:p.clientY,dx:0,dy:0,t:performance.now(),axis:null};},{passive:true});listen('touchmove',ev=>{if(!gesture)return;if(ev.touches.length!==1){reset();return}const p=ev.touches[0];gesture.dx=p.clientX-gesture.x;gesture.dy=p.clientY-gesture.y;if(!gesture.axis&&Math.max(Math.abs(gesture.dx),Math.abs(gesture.dy))>9)gesture.axis=Math.abs(gesture.dx)>Math.abs(gesture.dy)*1.4?'x':'y';if(gesture.axis!=='x')return;if(ev.cancelable)ev.preventDefault();if(!reduced()){const dx=gesture.dx*(canMove(gesture.dx<0?1:-1)?.28:.09);cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{el.style.transform=`translate3d(${dx}px,0,0)`;el.style.opacity=String(1-Math.min(.1,Math.abs(dx)/900));});}},{passive:false});listen('touchend',()=>{if(!gesture)return;const g=gesture,dir=g.dx<0?1:-1,velocity=Math.abs(g.dx)/Math.max(1,performance.now()-g.t);cancelAnimationFrame(frame);gesture=null;if(g.axis==='x'&&canMove(dir)&&(Math.abs(g.dx)>64||(Math.abs(g.dx)>28&&velocity>.45))){onMove(dir);}else{if(!reduced()&&el.style.transform)el.animate([{transform:el.style.transform},{transform:'translate3d(0,0,0)'}],{duration:170,easing:'cubic-bezier(.16,1,.3,1)'});reset();}},{passive:true});listen('touchcancel',reset,{passive:true});listen('wheel',ev=>{if(ev.target.closest(ignore)||Math.abs(ev.deltaX)<=Math.abs(ev.deltaY)*1.4||Math.abs(ev.deltaX)<4)return;if(performance.now()-last<450){ev.preventDefault();return}wheel+=ev.deltaX;if(Math.abs(wheel)>70){const dir=wheel>0?1:-1;wheel=0;if(canMove(dir)){ev.preventDefault();last=performance.now();onMove(dir);}}},{passive:false});listen('keydown',ev=>{if(ev.target!==el||!['ArrowLeft','ArrowRight'].includes(ev.key))return;const dir=ev.key==='ArrowRight'?1:-1;if(canMove(dir)){ev.preventDefault();onMove(dir,{animate:false});}});}
function tabs(mode){return `<div class="atlas-switch" role="tablist" aria-label="目的地图鉴分类"><button type="button" id="atlas-tab-places" role="tab" data-atlas-tab="places" aria-selected="${mode==='places'}" aria-controls="atlas-panel" tabindex="${mode==='places'?0:-1}"><img src="assets/icons/ui-map.svg" alt="" aria-hidden="true" width="20" height="20">景点</button><button type="button" id="atlas-tab-food" role="tab" data-atlas-tab="food" aria-selected="${mode==='food'}" aria-controls="atlas-panel" tabindex="${mode==='food'?0:-1}"><img src="assets/icons/food-utensils.svg" alt="" aria-hidden="true" width="20" height="20">美食</button><span class="atlas-swipe-hint">左右滑动切换栏目</span></div>`;}
window.JAPAN_JOURNEY_UI={calendar,bindCalendar,swipe,clearSwipes,change,tabs,setCurrent:i=>{current=i},label,iso};
})();
