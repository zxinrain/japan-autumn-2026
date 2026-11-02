const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const context = vm.createContext({});
for(const file of ['hotel-links.js','data.js','app.js','hotels.js','hotels-data.js','architecture-data.js','reservations-data.js']) new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';this.trip=TRIP;',context);
vm.runInContext(fs.readFileSync(path.join(root,'hotels-data.js'),'utf8')+';this.hotels=HOTELS;',context);
vm.runInContext(fs.readFileSync(path.join(root,'architecture-data.js'),'utf8')+';this.architecture=ARCHITECTURE_DETAILS;',context);
vm.runInContext(fs.readFileSync(path.join(root,'reservations-data.js'),'utf8')+';this.reservations=RESERVATIONS;',context);
const {trip,hotels} = context;
assert.equal(trip.daysData.length,25);
assert.equal(trip.daysData[0].date,'2026-11-23');
assert.equal(trip.daysData.at(-1).date,'2026-12-17');
let nights = {};
trip.daysData.forEach((d,i)=>{
  assert.equal(d.number,i+1);
  assert.equal(Date.parse(d.date)-Date.parse(trip.start),i*86400000);
  for(const k of ['am','pm','transport','note','stay']) assert.ok(d[k],`${d.date}: missing ${k}`);
  assert.ok(trip.cities.some(c=>c.id===d.city));
  if(i<24) nights[d.stay]=(nights[d.stay]||0)+1;
});
assert.deepEqual(nights,{'广岛':5,'武雄':4,'长崎':1,'别府':3,'由布院':2,'福冈':4,'鹿儿岛':5});
assert.equal(hotels.length,18);
for(const h of hotels){
  assert.ok(h.cn&&h.en&&h.official&&h.ctripId);
  assert.ok(fs.existsSync(path.join(root,'assets',`hotel${String(h.id).padStart(2,'0')}.webp`)));
  for(const [start,end] of h.stays){assert.ok(start>=trip.start&&end<=trip.end&&end>start);}
}
assert.equal(trip.daysData.find(d=>d.date==='2026-11-27').city,'takeo');
assert.ok(trip.daysData.find(d=>d.date==='2026-11-30').title.includes('御船山'));
assert.ok(trip.daysData.find(d=>d.date==='2026-12-12').title.includes('艺术之森'));
assert.ok(trip.daysData.at(-1).note.includes('未核实'));
assert.ok(trip.daysData.find(d=>d.date==='2026-12-03').note.includes('暂停'));
assert.equal(trip.buildings.length,17);
for(const b of trip.buildings){
  const a=context.architecture[b[1]];
  assert.ok(a,`Missing architecture detail: ${b[1]}`);
  assert.ok(a.intro&&a.booking&&a.credit&&a.source);
  assert.ok(fs.existsSync(path.join(root,a.image)),`Missing architecture image: ${a.image}`);
}
for(const r of context.reservations.rail){
  const dt=new Date(r.date+'T10:00:00Z');dt.setUTCMonth(dt.getUTCMonth()-1);
  assert.equal(r.release,dt.toISOString().slice(0,10));
  assert.ok(trip.daysData.some(d=>d.date===r.date));
}
assert.equal(context.reservations.rail.length,10);
assert.equal(context.reservations.tickets.find(t=>t.id==='comico').level,'recommend');
assert.equal(context.reservations.tickets.find(t=>t.id==='shrine').level,'onsite');
for(const t of context.reservations.tickets){assert.ok(context.reservations.levels[t.level]);for(const date of t.dates)assert.ok(trip.daysData.some(d=>d.date===date));}
assert.ok(!trip.daysData.some(d=>/云仙|大船山/.test(d.title)));
assert.ok(trip.daysData.find(d=>d.date==='2026-12-15').pm.includes('13:15–15:30'));
console.log('PASS: JS syntax, 25 days / 24 nights, 17 illustrated buildings, 19 ticket items, 10 rail opening dates, 18 hotels.');

assert.ok(!trip.buildings.some(b=>/佐贺县立|大隈/.test(b[1])));
assert.equal(trip.daysData.find(d=>d.date==='2026-12-04').stay,'由布院');
assert.equal(trip.daysData.find(d=>d.date==='2026-11-28').stayCity,'takeo');
assert.equal(JSON.stringify(hotels.find(h=>h.id===17).stays),JSON.stringify([['2026-12-03','2026-12-05']]));
