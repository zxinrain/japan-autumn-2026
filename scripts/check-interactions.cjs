// Regression contracts for calendar focus and interruptible navigation; browser QA covers layout.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../journey-ui.js'),'utf8');
class Target{
 constructor(){this.handlers={};this.dataset={};this.style={};}
 addEventListener(type,fn,{signal}={}){(this.handlers[type]??=[]).push(fn);signal?.addEventListener('abort',()=>{this.handlers[type]=this.handlers[type].filter(x=>x!==fn);},{once:true});}
 emit(type,event){for(const fn of [...(this.handlers[type]||[])])fn(event);}
}
function harness(){
 let focus=null,reduced=false;const doc=new Target(),panel=new Target(),nav=new Target(),toggle=new Target(),label={textContent:''};
 panel.hidden=true;panel.cells=[];panel.scrollIntoView=()=>{};
 function button(day,selected=false){return{dataset:{calendarDay:String(day)},tabIndex:selected?0:-1,selected,focus(){focus=this;}};}
 Object.defineProperty(panel,'innerHTML',{set(html){panel.cells=[...html.matchAll(/data-calendar-day="(\d+)"([^>]*)>/g)].filter(x=>!x[2].includes(' disabled')).map(x=>button(Number(x[1]),x[2].includes('aria-current')));}});
 panel.querySelector=selector=>selector==='[aria-current=date]'?panel.cells.find(x=>x.selected):selector==='[data-calendar-day]:not(:disabled)'?panel.cells[0]:panel.cells.find(x=>selector.includes(`="${x.dataset.calendarDay}"`));
 panel.querySelectorAll=()=>panel.cells;
 toggle.setAttribute=(name,value)=>{toggle[name]=value;};toggle.querySelector=()=>label;toggle.focus=()=>{focus=toggle;};
 nav.querySelector=selector=>selector==='[data-calendar-panel]'?panel:toggle;
 nav.contains=node=>[nav,panel,toggle,...panel.cells].includes(node);
 const trip={departure:'2026-11-30',days:Array.from({length:20},()=>({city:'City',title:'Day'}))};
 const ctx=vm.createContext({window:{JAPAN_TRIP:{trip}},document:doc,Date,AbortController,innerWidth:390,performance:{now:()=>100},requestAnimationFrame:fn=>{fn();return 1;},cancelAnimationFrame(){},matchMedia:()=>({matches:reduced})});
 vm.runInContext(source,ctx);const ui=ctx.window.JAPAN_JOURNEY_UI;
 ui.bindCalendar({querySelectorAll:()=>[nav]},{onDay(){},onOverview(){}});
 function click(selector,dataset={}){const target={dataset,closest(){return this;},matches:s=>s===selector};nav.emit('click',{target,detail:1});}
 return{ui,panel,nav,toggle,doc,label,click,getFocus:()=>focus,setReduced:v=>{reduced=v;}};
}
(async()=>{
 const h=harness();h.click('[data-calendar-toggle]');assert.equal(h.panel.hidden,false);assert.equal(h.toggle['aria-expanded'],'true');
 h.click('[data-month]',{month:'11'});
 assert.equal(h.panel.cells.filter(x=>x.tabIndex===0).length,1,'Cross-month calendar must retain one Tab entry');
 assert.equal(h.getFocus().dataset.calendarDay,'1','December first available day receives focus');
 assert.match(h.label.textContent,/收起/);
 h.doc.emit('pointerdown',{target:{}});assert.equal(h.panel.hidden,true,'Outside press dismisses calendar');
 assert.equal(h.doc.handlers.pointerdown.length,0,'Dismissal removes global handler');
 h.click('[data-calendar-toggle]');h.nav.emit('keydown',{key:'Escape',preventDefault(){},target:h.toggle});
 assert.equal(h.getFocus(),h.toggle,'Escape restores focus');assert.equal(h.panel.hidden,true);
 h.click('[data-calendar-toggle]');h.nav.emit('focusout',{relatedTarget:{}});assert.equal(h.panel.hidden,true,'Tab away dismisses');
 h.click('[data-calendar-toggle]');h.ui.clearSwipes();assert.equal(h.doc.handlers.pointerdown.length,0,'Navigation cleans up outside listener');
 const calls=[],surface={style:{},animate(frames,options){let finish,reject;const a={finished:new Promise((res,rej)=>{finish=res;reject=rej;}),cancel(){reject(Object.assign(new Error('cancelled'),{name:'AbortError'}));},finish(){finish();}};calls.push({a,frames,options});return a;}};
 let day=0;const first=h.ui.change(()=>surface,1,()=>day++);assert.equal(day,1,'Navigation commits before animation settles');
 const second=h.ui.change(()=>surface,1,()=>day++);assert.equal(day,2,'Rapid navigation must not drop latest input');calls[1].a.finish();await Promise.all([first,second]);
 assert(calls.every(c=>c.options.duration<=250&&!c.options.easing.includes('ease-in')));
 const before=calls.length;await h.ui.change(()=>surface,1,()=>day++,{animate:false});assert.equal(calls.length,before,'Keyboard navigation is immediate');
 h.setReduced(true);await h.ui.change(()=>surface,1,()=>day++);assert.equal(calls.length,before,'Reduced motion skips movement');h.setReduced(false);
 const last=h.ui.change(()=>surface,1,()=>day++);h.ui.clearSwipes();await last;assert.equal(surface.style.transform,'','Navigation cancellation clears transient transform');
 const gestureSurface=new Target(),moves=[];h.ui.swipe(gestureSurface,{canMove:()=>true,onMove:(...args)=>moves.push(args)});
 const link={closest:()=>({})},plain={closest:()=>null};
 gestureSurface.emit('touchstart',{target:link,touches:[{clientX:200,clientY:100}]});gestureSurface.emit('touchend',{});assert.equal(moves.length,0,'Swiping from links must leave date unchanged');
 gestureSurface.emit('touchstart',{target:plain,touches:[{clientX:200,clientY:100}]});gestureSurface.emit('touchmove',{touches:[{clientX:100,clientY:101}],cancelable:true,preventDefault(){}});gestureSurface.emit('touchend',{});assert.equal(moves[0][0],1,'Horizontal touch gesture advances');
 gestureSurface.emit('keydown',{target:gestureSurface,key:'ArrowRight',preventDefault(){}});assert.equal(moves[1][1].animate,false,'Keyboard gesture must disable motion');h.ui.clearSwipes();
 console.log('PASS: calendar cross-month focus, outside/Escape/Tab dismissal and cleanup; immediate keyboard, rapid navigation, cancellation and reduced motion.');
})().catch(error=>{console.error(error);process.exitCode=1;});
