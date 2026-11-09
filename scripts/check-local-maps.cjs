const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),d=JSON.parse(fs.readFileSync(path.join(root,'local-maps.json'))),ctx=vm.createContext({window:{}});
for(const f of ['route-data.js','local-maps.js','layout.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
assert.equal(d.coordinateSystem,'WGS-84 / Web Mercator');assert.equal(Object.keys(d.maps).length,22);
assert.equal(JSON.stringify(ctx.window.JAPAN_LOCAL_MAPS),JSON.stringify(d));
const routes=ctx.window.JAPAN_ROUTE_DATA,trip=JSON.parse(fs.readFileSync(path.join(root,'trip.json')));
for(const [key,m] of Object.entries(d.maps)){
 assert.match(m.file,/^assets\/maps\/[a-z0-9-]+\.webp$/);
 const b=fs.readFileSync(path.join(root,m.file));assert.equal(b.subarray(0,4).toString(),'RIFF');assert.equal(b.subarray(8,12).toString(),'WEBP');
 assert.equal(crypto.createHash('sha256').update(b).digest('hex'),m.sha256,key+' image differs from metadata');
 assert(b.length<800000,key+' is too large for mobile');assert(m.roadFeatures>0,key+' has no street data');
 for(const u of [...m.sourceTiles,...m.vectorTiles])assert(u.startsWith('https://cyberjapandata.gsi.go.jp/xyz/'));
 const ids=key==='all'?[...new Set(routes.routes.flat())]:key==='kunisaki'?['kaiBeppu','fukiji','makiodo']:routes.routes[Number(key.slice(4))];
 const [[w,s],[e,n]]=m.bounds;for(const id of ids){const p=routes.points[id];assert(p.lng>=w&&p.lng<=e&&p.lat>=s&&p.lat<=n,key+' clips '+id);}
}
for(const [i,day] of trip.days.entries()){
 const html=ctx.window.TRAVEL_LAYOUT.timeline(day,i),first=html.indexOf('<section class="session');
 assert.equal((html.match(/<section class="session/g)||[]).length,day.transfer?5:4);
 if(day.transfer)assert(html.slice(first,first+120).includes('transfer-session'),'Transfer must lead the timeline');
}
const runtime=fs.readFileSync(path.join(root,'route-map.js'),'utf8');assert(!runtime.includes('basemaps.cartocdn.com'));assert(runtime.includes("params.get('map')==='online'"));
console.log('PASS: 22 same-origin real basemaps, source attribution, file hashes, mobile image budgets, all trip coordinates in bounds and transfer-first timeline.');
