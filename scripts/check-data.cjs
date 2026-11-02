const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const context = vm.createContext({});
for(const file of ['data.js','app.js','hotels.js','hotels-data.js']) new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';this.trip=TRIP;',context);
vm.runInContext(fs.readFileSync(path.join(root,'hotels-data.js'),'utf8')+';this.hotels=HOTELS;',context);
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
assert.deepEqual(nights,{'广岛':5,'武雄':4,'长崎':2,'别府':4,'福冈':4,'鹿儿岛':5});
assert.equal(hotels.length,17);
for(const h of hotels){
  assert.ok(h.cn&&h.en&&h.official&&h.ctripId);
  assert.ok(fs.existsSync(path.join(root,'assets',`hotel${String(h.id).padStart(2,'0')}.webp`)));
  for(const [start,end] of h.stays){assert.ok(start>=trip.start&&end<=trip.end&&end>start);}
}
assert.equal(trip.daysData.find(d=>d.date==='2026-11-27').city,'takeo');
assert.ok(trip.daysData.find(d=>d.date==='2026-11-30').title.includes('御船山'));
assert.ok(trip.daysData.find(d=>d.date==='2026-12-12').title.includes('艺术之森'));
assert.ok(trip.daysData.at(-1).note.includes('未核实'));
assert.ok(trip.daysData.find(d=>d.date==='2026-12-04').note.includes('暂停'));
console.log('PASS: JS syntax, 25 continuous days / 24 nights, protected dates, 17 hotels and current stay dates.');
