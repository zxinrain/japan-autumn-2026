/* Private build-time AMap Global route fetcher. No secret is written into website files. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const PROVIDER='AMap Global Routes',ORIGIN='https://sg-restapi.opnavi.com';
const keyOf=leg=>`${leg.mode}:${leg.from}:${leg.to}`;
const allowed=new Set(['driving','walking']);
function parseResponse(body,leg,points){
 if(String(body.status)!=='1')throw new Error('AMap response failed: '+String(body.infocode||body.info||'UNKNOWN').replace(/[^A-Z0-9_]/g,'').slice(0,60));
 const route=body.route?.paths?.[0];
 if(!route||!Array.isArray(route.steps))throw new Error('No route steps returned');
 const polylines=route.steps.map(step=>{if(typeof step.polyline!=='string')throw new Error('Missing route coordinates');return step.polyline.split(';').filter(Boolean).map(pair=>{const p=pair.split(',').map(Number);if(p.length!==2||!p.every(Number.isFinite)||p[0]<=129||p[0]>=134||p[1]<=32||p[1]>=35)throw new Error('Coordinates outside Japan trip region');return p;});}).filter(line=>line.length>=2);
 if(!polylines.length)throw new Error('Empty route geometry');
 const a=points[leg.from],b=points[leg.to],first=polylines[0][0],last=polylines.at(-1).at(-1);
 const meters=(p,q)=>Math.hypot((p[0]-q.lng)*Math.cos(q.lat*Math.PI/180)*111000,(p[1]-q.lat)*111000);
 if(meters(first,a)>1200||meters(last,b)>1200)throw new Error('Returned route does not match requested endpoints');
 return {status:'verified',provider:PROVIDER,mode:leg.mode,origin:[a.lng,a.lat],destination:[b.lng,b.lat],polylines,distanceMeters:Number(route.distance)||null,durationSeconds:Number(route.duration)||null,checked:new Date().toISOString()};
}
function requestURL(leg,points,key){
 if(!allowed.has(leg.mode))throw new Error('Unsupported mode: '+leg.mode);
 const coordinate=id=>`${points[id].lng.toFixed(6)},${points[id].lat.toFixed(6)}`;
 const u=new URL(`/v3/direction/${leg.mode}`,ORIGIN);u.search=new URLSearchParams({key,origin:coordinate(leg.from),destination:coordinate(leg.to),output:'JSON',...(leg.mode==='driving'?{extensions:'all',strategy:'0'}:{})});return u;
}
async function main(){
 const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(ROOT,'route-data.js'),'utf8'),context);
 const {points,routes}=context.window.JAPAN_ROUTE_DATA,plan=JSON.parse(fs.readFileSync(path.join(ROOT,'amap-route-plan.json'),'utf8'));
 for(const [i,legs] of plan.days.entries()){if(legs.length!==routes[i].length-1||legs.some((l,n)=>l.from!==routes[i][n]||l.to!==routes[i][n+1]))throw new Error('Route plan is stale on day '+(i+1));}
 const allLegs=[...new Map([...plan.days.flat(),...Object.values(plan.alternatives).flat()].map(l=>[keyOf(l),l])).values()];
 const dayArg=process.argv.indexOf('--day');let unique=allLegs;
 if(dayArg>=0){const day=process.argv[dayArg+1],trip=JSON.parse(fs.readFileSync(path.join(ROOT,'trip.json'),'utf8'));const n=Math.round((Date.parse(day+'T00:00:00Z')-Date.parse(trip.departure+'T00:00:00Z'))/86400000);if(!Number.isInteger(n)||n<0||n>=plan.days.length)throw new Error('Use --day YYYY-MM-DD within the trip dates');unique=[...new Map(plan.days[n].map(l=>[keyOf(l),l])).values()];}
 if(!process.argv.includes('--generate')){console.log(JSON.stringify({mode:'dry-run',eligibleRequests:unique.filter(l=>allowed.has(l.mode)).length,unsupportedLegs:unique.filter(l=>!allowed.has(l.mode)).length,secretConfigured:!!process.env.AMAP_GLOBAL_KEY,docs:plan.docs}));return;}
 const key=process.env.AMAP_GLOBAL_KEY;if(!key)throw new Error('Configure AMAP_GLOBAL_KEY in the local process, then run with --generate. No requests were sent.');
 const old=JSON.parse(fs.readFileSync(path.join(ROOT,'amap-routes.json'),'utf8')),segments={};let failures=0;
 for(const leg of allLegs){const cached=old.segments?.[keyOf(leg)],a=points[leg.from],b=points[leg.to];if(allowed.has(leg.mode)&&cached?.status==='verified'&&JSON.stringify(cached.origin)===JSON.stringify([a.lng,a.lat])&&JSON.stringify(cached.destination)===JSON.stringify([b.lng,b.lat]))segments[keyOf(leg)]=cached;}
 for(const leg of unique.filter(l=>allowed.has(l.mode))){
  const id=keyOf(leg),a=points[leg.from],b=points[leg.to],cached=old.segments?.[id];
  if(cached?.status==='verified'&&JSON.stringify(cached.origin)===JSON.stringify([a.lng,a.lat])&&JSON.stringify(cached.destination)===JSON.stringify([b.lng,b.lat])&&!process.argv.includes('--refresh')){segments[id]=cached;continue;}
  try{const response=await fetch(requestURL(leg,points,key),{signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error('HTTP '+response.status);segments[id]=parseResponse(await response.json(),leg,points);console.log('Verified '+id);}catch(error){failures++;console.error('Route unavailable '+id+': '+String(error.message).replaceAll(key,'[redacted]'));if(failures>=3)throw new Error('Stopped after three failed requests; existing route file was kept.');}
  await new Promise(resolve=>setTimeout(resolve,500));
 }
 const payload={schema:1,provider:PROVIDER,status:failures||Object.keys(segments).length<allLegs.filter(l=>allowed.has(l.mode)).length?'partial':'generated',generatedAt:new Date().toISOString(),coordinateSystem:'WGS-84 (Japan)',docs:plan.docs,segments};
 fs.writeFileSync(path.join(ROOT,'amap-routes.json'),JSON.stringify(payload,null,2)+'\n');fs.writeFileSync(path.join(ROOT,'amap-routes.js'),'window.JAPAN_AMAP_ROUTES='+JSON.stringify(payload)+';\n');console.log(`Saved ${Object.keys(segments).length} verified road/walking segments. Other transport is not drawn.`);
}
module.exports={parseResponse,requestURL,keyOf};
if(require.main===module)main().catch(error=>{console.error(String(error.message).replaceAll(process.env.AMAP_GLOBAL_KEY||'__NO_KEY__','[redacted]'));process.exitCode=1;});
