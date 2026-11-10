const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Node{constructor(){this.dataset={};this.handlers={};this.attrs={};}addEventListener(k,f){(this.handlers[k]??=[]).push(f);}emit(k,e={}){for(const f of this.handlers[k]||[])f(e);}setAttribute(k,v){this.attrs[k]=v;}getBoundingClientRect(){return{left:0,top:0,bottom:300};}}
const track=new Node(),slider=new Node(),toggle=new Node(),gallery=new Node();let tick,cleared=false,reduced=false;
track.scrollLeft=0;track.children=[0,1,2].map(i=>({getBoundingClientRect:()=>({left:i*300-track.scrollLeft})}));track.scrollTo=({left})=>{track.scrollLeft=left;track.emit('scroll');};
gallery.isConnected=true;gallery.contains=()=>false;gallery.querySelector=s=>s==='.gallery-track'?track:s==='.gallery-position'?slider:toggle;
const document={hidden:false,activeElement:null};const ctx={window:{},document,innerHeight:900,matchMedia:()=>({matches:reduced}),requestAnimationFrame:f=>{f();return 1;},cancelAnimationFrame(){},setInterval:f=>{tick=f;return 1;},clearInterval(){cleared=true;}};
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../layout.js'),'utf8'),ctx);ctx.window.TRAVEL_LAYOUT.bind({querySelectorAll:s=>s==='[data-gallery]'?[gallery]:[]});
tick();assert.equal(track.scrollLeft,300,'Autoplay advances one photo');tick();tick();assert.equal(track.scrollLeft,0,'Autoplay loops after last photo');
track.emit('keydown',{target:track,key:'End',preventDefault(){}});assert.equal(track.scrollLeft,600,'Keyboard selects last photo');
document.hidden=true;tick();assert.equal(track.scrollLeft,600,'Hidden page pauses');document.hidden=false;reduced=true;tick();assert.equal(track.scrollLeft,600,'Reduced motion prevents autoplay');reduced=false;gallery.emit('pointerenter',{pointerType:'mouse'});tick();assert.equal(track.scrollLeft,600,'Hover pauses');gallery.emit('pointerleave');tick();assert.equal(track.scrollLeft,0,'Leaving resumes');gallery.isConnected=false;tick();assert(cleared,'Removed gallery clears interval');
console.log('PASS: control-free gallery autoplay, loop, keyboard, hover, visibility, reduced motion and cleanup.');
