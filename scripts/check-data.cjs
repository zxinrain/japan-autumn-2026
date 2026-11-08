const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const file of ['app.js','hotel-links.js','travel-data.js','destination-notes.js','map-geography.js','route-data.js','route-map.js'])new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
const context=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(root,'travel-data.js'),'utf8'),context);
const {trip,catalog,hotelMeta}=context.window.JAPAN_TRIP;
vm.runInContext(fs.readFileSync(path.join(root,'destination-notes.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'route-data.js'),'utf8'),context);
const map=context.window.JAPAN_ROUTE_DATA;
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
assert.equal(trip.stays.reduce((n,s)=>n+s.nights,0),19);assert.equal(hotelMeta.length,6);assert.equal(catalog.length,14);
let cursor=trip.departure,index=0;
for(const s of trip.stays){assert.equal(s.in,cursor);assert.equal((Date.parse(s.out)-Date.parse(s.in))/86400000,s.nights);for(let n=0;n<s.nights;n++)assert.equal(trip.days[index++].city,s.city);cursor=s.out;}
assert.equal(cursor,trip.returnDate);
for(const d of trip.days){for(const k of ['am','noon','pm','night','transport','breakfast','lunch','dinner','rest','cut','photo'])assert(d[k]);for(const s of d.sources)assert(trip.sources[s]);}
assert.match(trip.days[4].title,/御船山/);assert.match(trip.days[17].title,/MOCA/);assert.match(trip.days[18].title,/SIMOSE/);
assert.match(trip.days[5].pm,/16:00/);assert.match(trip.days[10].title,/由布院日归/);
for(const p of catalog){assert(p.reason&&p.tradeoff&&p.look&&p.effort);for(const image of p.images){assert(fs.existsSync(path.join(root,'assets',image[0])),image[0]);assert(trip.sources[image[3]]);}for(const day of p.days)assert(day>=0&&day<20);}
for(const m of hotelMeta)if(m.photo)assert(fs.existsSync(path.join(root,'assets',m.photo[0])),m.photo[0]);
assert(!trip.days.some(d=>/鹿儿岛|雾岛|陶瓷镇|云仙|大船山/.test(d.title)));
console.log('PASS: JS syntax; 20 continuous days / 19 nights; 14 illustrated themes; six hotel stays; required full days preserved.');
