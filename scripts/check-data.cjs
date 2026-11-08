const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const file of ['app.js','hotel-links.js','travel-data.js'])new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
const context=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(root,'travel-data.js'),'utf8'),context);
const {trip,catalog,hotelMeta}=context.window.JAPAN_TRIP;
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
