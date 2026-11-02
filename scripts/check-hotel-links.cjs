const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const ctx=vm.createContext({URL,URLSearchParams,btoa:s=>Buffer.from(s).toString('base64')});
vm.runInContext(fs.readFileSync(path.join(__dirname,'..','hotels-data.js'),'utf8')+';this.hotels=HOTELS',ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'..','hotel-links.js'),'utf8')+';this.build=HOTEL_LINKS.build;this.initial=HOTEL_LINKS.initialStay',ctx);
let n=0;
for(const h of ctx.hotels)for(const stay of h.stays){
 const l=ctx.build(h,stay),[a,b]=stay; n++;
 for(const k of ['ctrip','app','ctripIntent','booking','bookingIntent','agoda','agodaApp','agodaIntent','official'])assert.ok(l[k],`${h.id} ${k}`);
 const c=new URL(l.ctrip);assert.equal(c.searchParams.get('atime'),a.replaceAll('-',''));assert.equal(Number(c.searchParams.get('days')),(Date.parse(b)-Date.parse(a))/86400000);
 const decoded=Buffer.from(new URL(l.app).searchParams.get('url'),'base64').toString();assert.equal('https://m.ctrip.com/webapp/'+decoded,l.ctrip);
 for(const [key,web,pkg] of [['ctripIntent','ctrip','ctrip.android.view'],['agodaIntent','agoda','com.agoda.mobile.consumer'],['bookingIntent','booking','com.booking'],...(l.ikyu?[['ikyuIntent','ikyu','com.ikyu.stay.android']]:[])]){
  assert.ok(l[key].includes(';package='+pkg+';'));
  assert.equal(decodeURIComponent(l[key].split('S.browser_fallback_url=')[1].split(';end')[0]),l[web]);
 }
 for(const key of ['booking','agoda','agodaApp',...(l.ikyu?['ikyu']:[])]){
  const u=new URL(l[key]); const names=key==='ikyu'?['cid','cod']:key.startsWith('agoda')?['checkIn','checkOut']:['checkin','checkout'];
  assert.equal(u.searchParams.get(names[0]),key==='ikyu'?a.replaceAll('-',''):a);assert.equal(u.searchParams.get(names[1]),key==='ikyu'?b.replaceAll('-',''):b);
 }
 assert.equal(ctx.initial(h,a),h.stays.indexOf(stay));
 assert.equal(ctx.initial(h,new Date(Date.parse(b)-86400000).toISOString().slice(0,10)),h.stays.indexOf(stay));
 assert.throws(()=>ctx.build(h,['2026-01-01','2026-01-02']));
}
assert.equal(n,24);console.log('PASS: 24 hotel/stay cases, date ranges, decoded App destinations, Android packages and same-date fallbacks.');
vm.runInContext(fs.readFileSync(path.join(__dirname,'..','data.js'),'utf8')+';this.trip=TRIP',ctx);
for(const d of ctx.trip.daysData.slice(0,24)){
 const options=ctx.hotels.filter(h=>h.city===(d.stayCity||d.city));assert.ok(options.length,`Missing hotels for ${d.date}`);
 for(const h of options){const chosen=h.stays[ctx.initial(h,d.date)];assert.ok(chosen[0]<=d.date&&d.date<chosen[1],`Wrong stay for ${d.date} / ${h.cn}`);}
}
