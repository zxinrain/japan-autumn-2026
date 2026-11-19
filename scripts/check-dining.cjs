/* Verify saved-list identity, meal constraints, canonical sync and public privacy. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const R=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(R,f),'utf8'),data=JSON.parse(read('restaurants.json')),trip=JSON.parse(read('trip.json')),rows=data.restaurants;
assert.equal(rows.length,35);assert.equal(data.sourceCount,82);assert.equal(new Set(rows.map(r=>r.id)).size,35);assert.equal(new Set(rows.map(r=>r.listIndex)).size,35);
const counts={};rows.forEach(r=>counts[r.city]=(counts[r.city]||0)+1);assert.deepEqual(counts,{'福冈市':16,'熊本市':1,'广岛市':4,'春日市':1,'长崎市':3,'别府市':3,'武雄市':3,'久留米市':1,'那珂川市':1,'唐津市':1,'廿日市·宫岛':1});
const by=Object.fromEntries(rows.map(r=>[r.id,r]));assert.notEqual(by['hyogodori-fukuoka'].map,by['hyogodori-kumamoto'].map);assert.equal(by.kiyotan.city,'广岛市');assert.equal(by.kiku.city,'春日市');assert.equal(by.takeuchi.city,'那珂川市');
for(const r of rows){assert.equal(new URL(r.map).hostname,'www.google.com');assert.match(r.map,/^https:\/\/www\.google\.com\/maps\?cid=\d+$/);assert.equal(new URL(r.source).protocol,'https:');assert(r.lat>32&&r.lat<35&&r.lng>129&&r.lng<133);assert(fs.existsSync(path.join(R,'assets/icons/food-'+r.icon+'.svg')));assert(r.googleRating>=1&&r.googleRating<=5);assert(r.googleReviews>0);assert(r.feature&&r.dishes&&r.rules);assert.equal(typeof r.suggestion,'string');}
for(const [i,d] of trip.days.entries()){for(const a of d.dining){assert(by[a.restaurant]);assert(['primary','backup','conditional'].includes(a.priority));if(a.priority==='primary'){assert(!['熊本市','唐津市','久留米市'].includes(by[a.restaurant].city));assert(d[a.meal].includes(by[a.restaurant].name));assert(!['chikamatsu','hacchan','rokusei'].includes(a.restaurant));}}for(const meal of ['lunch','dinner'])assert(d.dining.filter(a=>a.meal===meal&&a.priority==='primary').length<=1);}
assert.equal(trip.mealPresentation,'selected');assert.equal(rows.filter(r=>r.userPriority==='preferred').length,18);assert.equal(trip.days.flatMap(d=>d.dining).filter(a=>a.priority==='primary').length,11);assert(trip.days.every(d=>!d.dining.some(a=>a.meal==='breakfast')));for(const d of trip.days)for(const a of d.dining)if(a.priority==='primary')assert.equal(by[a.restaurant].userPriority,'preferred');assert.match(trip.days[9].transport,/包车/);assert.match(by.hacchan.rules,/资料冲突/);assert.match(by.chikamatsu.rules,/介绍制/);
const sandbox={window:{}};vm.runInNewContext(read('travel-data.js'),sandbox);assert.deepEqual(JSON.parse(JSON.stringify(sandbox.window.JAPAN_TRIP.dining)),data);assert.deepEqual(JSON.parse(read('plans/itinerary-20261112.json')),trip);
const m=JSON.parse(read('route-data.js').split('window.JAPAN_ROUTE_DATA=')[1].trim().replace(/;$/,''));if(trip.mealPresentation!=='template')for(const [i,d] of trip.days.entries())for(const a of d.dining.filter(a=>a.priority==='primary'))assert(m.routes[i].includes('food-'+a.restaurant));assert(m.routes[13].includes('kitakyushumuseum'));assert(!m.routes[11].includes('bamboo'));
for(const r of rows)assert(read('restaurants.md').includes(r.en));for(const f of ['restaurants.json','restaurants.md','dining.js','travel-data.js','itinerary.md'])assert(!/maps\.app\.goo\.gl|authuser=|!11m|accounts\.google\.com|cAANaYf8nqbrQnw89/.test(read(f)),f+' should not expose private account/list parameters');
console.log('PASS: 35 restaurants / 11 cities, 18 default favorites / 11 saved-list primary, unique branches, one primary per meal, closed-day correction, railway meals, map/document/data consistency, sanitized public links.');

// Defaults migrate to stars, local overrides persist, and scheduling stays explicit.
const memory=new Map(),favoritesContext={window:{JAPAN_TRIP:sandbox.window.JAPAN_TRIP,TRAVEL_LAYOUT:{foldSummary:()=>''}},localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)}};
vm.runInNewContext(read('dining.js'),favoritesContext);let fd=favoritesContext.window.JAPAN_DINING;assert.equal(fd.isFavorite(by.nakashima),true);fd.setFavorite('nakashima',false);assert.equal(fd.isFavorite(by.nakashima),false);
vm.runInNewContext(read('dining.js'),favoritesContext);fd=favoritesContext.window.JAPAN_DINING;assert.equal(fd.isFavorite(by.nakashima),false);fd.setFavorite('nakashima',true);assert.equal(fd.isFavorite(by.nakashima),true);assert.equal(trip.days.flatMap(d=>d.dining).filter(a=>a.priority==='primary').length,11);assert(!fd.index(new URLSearchParams()).includes('未标收藏，保留备选，不自动填入空餐段'));
console.log('PASS: favorite defaults, local persistence, reversible toggle and explicit meal assignments.');

// User-confirmed reservations stay visible without inventing a saved-list identity.
const bookedDay=trip.days[2],reservation=bookedDay.mealReservations[0];
assert.equal(reservation.time,'19:00');assert.equal(reservation.status,'已预订');
assert.equal(reservation.address,'広島市中区立町6-7');
assert.equal(new URL(reservation.map).searchParams.get('query'),'酔心本店 広島市中区立町6-7');
const bookedHtml=fd.mealCard(bookedDay,2);
assert.match(bookedHtml,/19:00 · 已预订/);assert.match(bookedHtml,/<h4>釜饭 酔心本店<\/h4>/);
assert(!bookedHtml.includes('晚餐尚未安排'));assert(!bookedHtml.includes('未预约'));
assert.equal((bookedHtml.match(/<h[34]>[^<]*酔心本店<\/h[34]>/g)||[]).length,1,'Do not duplicate the booked restaurant as a local-food candidate');
assert.match(fd.mealCard(trip.days[3],3),/未预约/,'Unconfirmed candidates must retain their status');
assert.equal(trip.localFood.filter(([, ,name])=>name==='酔心本店').length,1);
assert.equal(trip.localFood.find(([, ,name])=>name==='酔心本店')[0],2);
for(const file of ['itinerary.md','restaurants.md'])assert.match(read(file),/19:00[^\n]*已预订/);
const {execFileSync}=require('node:child_process');
const calendar=execFileSync('python3',['-c',`import runpy,json,sys
m=runpy.run_path('scripts/build-calendar.py')
sys.stdout.buffer.write(m['build'](json.load(open('trip.json')), '20261118T100000Z'))`],{cwd:R});
for(const line of calendar.toString().split('\r\n'))assert(Buffer.byteLength(line)<=75,'ICS line folding follows the UTF-8 byte limit');
const events=calendar.toString().replace(/\r\n[ \t]/g,'').split('BEGIN:VEVENT\r\n').slice(1);
assert.equal(events.length,20);assert.equal(new Set(events.map(event=>event.match(/^UID:(.+)$/m)[1].trim())).size,20);
const bookedEvent=events.find(event=>event.includes('DTSTART;VALUE=DATE:20261202\r\n'));
assert(bookedEvent.includes('UID:japan-autumn-2026-day-3@zxinrain.github.io\r\n'),'Preserve the subscribed event identity');
assert(bookedEvent.includes('SEQUENCE:2\r\n'));assert.match(bookedEvent,/SUMMARY:广岛｜[^\r\n]*19:00 釜饭 酔心本店（已预订）/);
assert.match(bookedEvent,/餐食预约｜19:00 釜饭 酔心本店/);assert(bookedEvent.includes('広島市中区立町6-7'));
assert(!bookedEvent.includes('晚餐待定'));assert(!bookedEvent.includes('ekie'));
console.log('PASS: booked dinner rendering and navigation, no duplicate candidate, documents and 20-event subscription with stable UIDs and UTF-8 folding.');

// The confirmed Takeo dinner replaces the following day's candidate and keeps night viewing feasible.
const takeoDay=trip.days[5],takeoReservation=takeoDay.mealReservations.find(r=>r.restaurant==='anbai');
assert.equal(takeoReservation.time,'19:00');assert.equal(takeoReservation.status,'已预订');
assert.equal(takeoDay.dining.find(a=>a.restaurant==='anbai').status,'已预订');
assert(!trip.days[6].dining.some(a=>a.restaurant==='anbai'));assert.equal(trip.days[6].dinner,'');
assert.match(takeoDay.timelineCompact.night,/17:30–18:15/);assert.match(takeoDay.timelineCompact.night,/18:20/);
assert.match(fd.mealCard(takeoDay,5),/19:00 · 已预订/);
const anbaiDetail=fd.detail('anbai');assert(anbaiDetail.includes('#day/2026-12-05'));assert(!anbaiDetail.includes('#day/2026-12-06'));
assert(!anbaiDetail.includes('未实际预订'));assert(!anbaiDetail.includes('12/6拟'));
assert(m.routes[5].includes('food-anbai'));assert(!m.routes[6].includes('food-anbai'));
const takeoEvent=events.find(event=>event.includes('DTSTART;VALUE=DATE:20261205\r\n'));
assert(takeoEvent.includes('UID:japan-autumn-2026-day-6@zxinrain.github.io\r\n'));
assert.match(takeoEvent,/SUMMARY:武雄｜[^\r\n]*19:00 あん梅 Anbai（已预订）/);
assert.match(takeoEvent,/17:30–18:15/);assert.match(takeoEvent,/18:20/);
assert(!events.find(event=>event.includes('DTSTART;VALUE=DATE:20261206\r\n')).includes('19:00 あん梅 Anbai（已预订）'));
const plan=JSON.parse(read('amap-route-plan.json'));
for(const i of [5,6])assert.deepEqual(plan.days[i].map(leg=>[leg.from,leg.to]),m.routes[i].slice(1).map((id,j)=>[m.routes[i][j],id]));
console.log('PASS: 12/5 19:00 Anbai confirmed, dinner moved from 12/6, shortened night viewing, map legs and subscribed calendar stay consistent.');

// Fukuoka hotel change and the confirmed Koyama booking share the same date.
const fukuokaDinner=trip.days[16],koyama=fukuokaDinner.mealReservations.find(r=>r.name==='めしや コヤマパーキング');
assert.equal(koyama.time,'19:00');assert.equal(koyama.status,'已预订');
assert(!fukuokaDinner.dining.some(a=>a.meal==='dinner'),'Do not retain the replaced dinner candidate');
assert.match(fd.mealCard(fukuokaDinner,16),/19:00 · 已预订/);
assert(!fd.mealCard(fukuokaDinner,16).includes('ひょご鳥'));
const fukuokaEvent=events.find(e=>e.includes('DTSTART;VALUE=DATE:20261216\r\n'));
assert(fukuokaEvent.includes('UID:japan-autumn-2026-day-17@zxinrain.github.io\r\n'));
assert.match(fukuokaEvent,/19:00 めしや コヤマパーキング（已预订）/);
assert(fukuokaEvent.includes('住宿｜福冈丽思卡尔顿酒店'));
assert(!events.join('').includes('CANVAS'));
assert.deepEqual(trip.stays.slice(-2).map(s=>[s.source,s.in,s.out,s.nights]),[['nid','2026-12-13','2026-12-16',3],['ritz','2026-12-16','2026-12-19',3]]);
assert(m.routes[16].includes('food-koyama'));assert(m.routes[16].includes('ritz'));
assert(!m.routes[16].includes('food-hyogodori-fukuoka'));
console.log('PASS: Fukuoka NID/Ritz three-night stays, confirmed Koyama dinner, replaced candidate removed, map and stable subscription updated.');

// Confirmed Tsugumi dinner and route-researched options retain distinct booking status.
const tsugumiDay=trip.days[18],tsugumiReservation=tsugumiDay.mealReservations.find(r=>r.restaurant==='tsugumi');
assert.equal(tsugumiReservation.time,'19:00');assert.equal(tsugumiReservation.status,'已预订');
assert(!trip.days[15].dining.some(a=>a.restaurant==='tsugumi'));
assert(!tsugumiDay.dining.some(a=>a.restaurant==='choji'));
assert.match(fd.detail('tsugumi'),/#day\/2026-12-18/);
assert(!fd.detail('tsugumi').includes('#day/2026-12-15'));
assert(!fd.detail('tsugumi').includes('未实际预订'));
assert.match(fd.mealCard(tsugumiDay,18),/19:00 · 已预订/);
for(const i of [13,14,15]){
 const option=trip.days[i].mealRecommendations[0],html=fd.mealCard(trip.days[i],i);
 assert(!trip.days[i].mealReservations?.length);assert.match(option.status,/未预约/);
 assert(html.includes('<h4>'+option.name+'</h4>'));
 assert.equal(html.split('<h4>'+option.name+'</h4>').length-1,1);
 assert(!html.includes('晚餐尚未安排'));
}
assert.match(trip.days[13].night,/中洲/);assert(!m.routes[13].includes('food-issou'));
assert(m.routes[18].includes('food-tsugumi'));assert(!m.routes[18].includes('food-choji'));
const tsugumiEvent=events.find(e=>e.includes('DTSTART;VALUE=DATE:20261218\r\n'));
assert.match(tsugumiEvent,/19:00 郷土料理 嗣味（已预订）/);
assert(!events.find(e=>e.includes('DTSTART;VALUE=DATE:20261215\r\n')).includes('郷土料理 嗣味（已预订）'));
for(const i of [13,14,15,17,18])assert.deepEqual(plan.days[i].map(l=>[l.from,l.to]),m.routes[i].slice(1).map((id,j)=>[m.routes[i][j],id]));
console.log('PASS: Dec 18 Tsugumi at 19:00, Dec 13 yatai, unbooked route ramen cards, no duplicate meals, map and calendar consistency.');

// Public transit is the main plan; booking time and subscribed event identity stay fixed.
assert.match(tsugumiDay.night,/天神南/);assert.match(tsugumiDay.night,/往桥本方向1站/);
assert.match(tsugumiDay.night,/往博多方向1站/);assert.match(tsugumiDay.night,/18:00/);
assert.match(tsugumiDay.mealReservations[0].note,/35–45分钟/);
for(const leg of plan.days[18].filter(l=>[l.from,l.to].includes('food-tsugumi'))){assert.equal(leg.mode,'mixed');assert.match(leg.label,/七隈线/);}
assert.match(tsugumiEvent,/天神南/);assert.match(tsugumiEvent,/往桥本方向1站/);
console.log('PASS: Dec 18 subway directions, walking and waiting buffers, fixed 19:00 reservation, map modes and subscription.');
