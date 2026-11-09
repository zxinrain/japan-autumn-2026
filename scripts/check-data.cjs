const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const file of ['app.js','hotel-links.js','hotel-audit.js','travel-data.js','destination-notes.js','map-geography.js','route-data.js','route-map.js','layout.js'])new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
const context=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(root,'travel-data.js'),'utf8'),context);
const {trip,catalog,hotelMeta}=context.window.JAPAN_TRIP;
vm.runInContext(fs.readFileSync(path.join(root,'destination-notes.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'route-data.js'),'utf8'),context);
const map=context.window.JAPAN_ROUTE_DATA;
assert.equal(trip.routing.outbound.from,'香港');assert.equal(trip.routing.outbound.to,'广岛');
assert.equal(trip.routing.inbound.from,'福冈');assert.equal(trip.routing.inbound.to,'香港');
assert.match(trip.days[19].title,/福冈/);assert(!trip.days[19].maps.includes('Hiroshima Airport'));
assert(map.routes[19].includes('fukuokaairport')&&!map.routes[19].includes('airport'),'Return map must use Fukuoka airport');
assert.equal(map.routes.length,20,'Map must cover every travel day');
for(const p of Object.values(map.points))assert(Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&p.lat>32.5&&p.lat<34.7&&p.lng>129&&p.lng<133.3,'Map point is outside the trip region');
for(const route of map.routes)for(const id of route)assert(map.points[id],'Unknown route point: '+id);
for(const place of catalog){assert(Object.values(map.points).some(p=>p.place===place.id),'Destination missing from the map: '+place.id);assert(context.window.JAPAN_DESTINATION_CONTEXT[place.id],'Missing destination background: '+place.id);}
const noteIds=new Set();
for(const n of context.window.JAPAN_DESTINATION_NOTES){
  assert(!noteIds.has(n.id),'Duplicate note: '+n.id);noteIds.add(n.id);
  const place=catalog.find(p=>p.id===n.place);assert(place,'Unknown destination: '+n.place);
  assert(place.days.includes(n.day),'Note is assigned to a different travel day: '+n.id);
  assert(place.images[n.imageIndex||0],'Missing credited venue image: '+n.id);
  assert(new URL(n.source[1]).protocol==='https:','Official source must use HTTPS');
  if(n.period){const date=new Date(Date.parse(trip.departure+'T00:00:00Z')+n.day*86400000).toISOString().slice(0,10);assert(date>=n.period[0]&&date<=n.period[1],'Exhibition does not cover the visit: '+n.id);}
}
assert.equal(trip.days.length,20);assert.equal(trip.departure,'2026-11-30');assert.equal(trip.returnDate,'2026-12-19');
assert.equal(trip.stays.reduce((n,s)=>n+s.nights,0),19);assert.equal(hotelMeta.length,6);assert.equal(catalog.length,17);
let cursor=trip.departure,index=0;
for(const s of trip.stays){assert.equal(s.in,cursor);assert.equal((Date.parse(s.out)-Date.parse(s.in))/86400000,s.nights);for(let n=0;n<s.nights;n++)assert.equal(trip.days[index++].city,s.city);cursor=s.out;}
assert.equal(cursor,trip.returnDate);
for(const d of trip.days){for(const k of ['am','noon','pm','night','transport','breakfast','lunch','dinner','rest','cut','photo'])assert(d[k]);for(const s of d.sources)assert(trip.sources[s]);}
assert.match(trip.days[6].title,/御船山/);assert.match(trip.days[4].title,/MOCA/);assert.match(trip.days[3].title,/SIMOSE/);
assert.match(trip.days[7].pm,/16:00/);assert.match(trip.days[12].title,/由布院日归/);
assert(trip.days.slice(5,19).every(d=>!d.city.includes('广岛')),'Do not return to Hiroshima after leaving');
assert.deepEqual(Array.from(trip.stays,s=>s.source),['kai','hilton','ond','garden','beppuHotel','ritz']);
assert.equal(trip.stays[5].out,'2026-12-19');
for(let i=0;i<trip.stays.length;i++){assert.equal(hotelMeta[i].official,trip.sources[trip.stays[i].source][1]);const p=hotelMeta[i].priceReference;if(p)assert(p.lowJPY>0&&p.highJPY>=p.lowJPY&&p.source&&p.status);else assert(['kai','ond'].includes(trip.stays[i].source));}
for(const p of catalog){assert(p.reason&&p.tradeoff&&p.look&&p.effort);for(const image of p.images){assert(fs.existsSync(path.join(root,'assets',image[0])),image[0]);assert(trip.sources[image[3]]);}for(const day of p.days)assert(day>=0&&day<20);}
for(const m of hotelMeta)if(m.photo)assert(fs.existsSync(path.join(root,'assets',m.photo[0])),m.photo[0]);
assert(!trip.days.some(d=>/鹿儿岛|雾岛|陶瓷镇|云仙|大船山/.test(d.title)));
console.log('PASS: JS syntax; 20 continuous days / 19 nights; 17 destination themes (one links official imagery); six hotel stays; required full days preserved.');

assert.equal(map.routes[13].filter(x=>x==='kokura').length,2);assert.match(trip.days[13].transport,/分段/);assert.match(trip.days[16].title,/糸岛/);assert.match(trip.days[17].title,/福冈市美术馆/);assert.match(trip.days[18].title,/九州芸文馆/);

if(trip.refinement){assert(trip.days.every(d=>typeof d.walkingNote==='string'&&d.walkingNote.length>0));assert.equal(trip.mealPresentation,'template');assert(map.routes[7].includes('nagasakimemorial'));assert(map.routes[12].includes('unagihime'));assert(map.routes[14].includes('tochoji'));assert(map.routes.every(r=>r.every(id=>!id.startsWith('food-'))));}
