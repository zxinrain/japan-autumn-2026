const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');const c=vm.createContext({window:{},URL,URLSearchParams});
for(const f of ['travel-data.js','hotel-links.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
const {trip,hotelMeta}=c.window.JAPAN_TRIP;
for(let i=0;i<6;i++){
 const s=trip.stays[i],m=hotelMeta[i],links=c.window.HOTEL_LINKS.build(s,m);assert.equal(links.length,5);
 for(const p of links){assert(p.name&&p.note&&p.label);assert(new URL(p.web).protocol==='https:');assert(!p.intent,'No App button links');assert(['manual','encoded'].includes(p.dateMode));}
 const booking=new URL(links.find(p=>p.name==='Booking').web);assert.equal(booking.searchParams.get('checkin'),s.in);assert.equal(booking.searchParams.get('checkout'),s.out);assert.equal(booking.searchParams.get('selected_currency'),'CNY');
 const agoda=new URL(links.find(p=>p.name==='Agoda').web);assert.equal(agoda.searchParams.get('checkIn'),s.in);assert.equal(agoda.searchParams.get('checkOut'),s.out);
 if(m.ctripId){const ctr=new URL(links.find(p=>p.name==='携程').web);assert.equal(ctr.searchParams.get('atime'),s.in);assert.equal(Number(ctr.searchParams.get('days')),s.nights);}
 const ikyu=new URL(links.find(p=>p.name==='一休').web);assert.equal(ikyu.searchParams.get('cid'),s.in.replaceAll('-',''));assert.equal(ikyu.searchParams.get('cod'),s.out.replaceAll('-',''));
}
console.log('PASS: six stays × five single HTTPS links; updated check-in/out dates and CNY; no App links. Target-page date acceptance is separately audited, not guaranteed by encoding checks.');
