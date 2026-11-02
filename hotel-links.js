/* Date-preserving links. App handoff still depends on the installed client. */
const HOTEL_LINKS = (() => {
  const compact = d => d.replaceAll('-', '');
  const nights = ([a,b]) => (Date.parse(b)-Date.parse(a))/86400000;
  const query = obj => new URLSearchParams(obj).toString();
  function intent(appUrl, packageName, fallback) {
    const u = new URL(appUrl);
    if (!['https:','ctrip:','agoda:'].includes(u.protocol)) throw new Error('Unsupported app destination');
    return `intent://${u.host}${u.pathname}${u.search}#Intent;scheme=${u.protocol.slice(0,-1)};package=${packageName};S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
  }
  function initialStay(h, date) {
    const i = h.stays.findIndex(([a,b])=>a<=date&&date<b);
    return i<0?0:i;
  }
  function build(h, stay) {
    if (!h.stays.some(s=>s[0]===stay[0]&&s[1]===stay[1])) throw new Error('Stay must match the itinerary');
    const [checkin,checkout]=stay;
    // The mobile hotel page actually reads atime + days; checkin/checkout alone silently use today.
    const rel=`hotel/hoteldetail/${h.ctripId}.html?${query({atime:compact(checkin),days:String(nights(stay)),checkin,checkout,adult:'2',room:'1',currency:'CNY'})}`;
    const ctrip='https://m.ctrip.com/webapp/'+rel;
    const ctripApp='ctrip://wireless/h5?url='+encodeURIComponent(btoa(rel))+'&type=1';
    const booking=`https://www.booking.com/searchresults.html?${query({ss:h.en,checkin,checkout,group_adults:'2',group_children:'0',no_rooms:'1',selected_currency:'CNY'})}`;
    const agoda=`${h.agoda}?${query({checkIn:checkin,checkOut:checkout,adults:'2',children:'0',rooms:'1',currency:'CNY'})}`;
    // Scheme and hotel IDs were read from each property's own Agoda mobile banner.
    const agodaApp=`agoda://hotel/${encodeURIComponent(h.agodaName||h.en).replaceAll('%20','+')}/${h.agodaId}?${query({site_id:'-1',adults:'2',children:'0',rooms:'1',checkIn:checkin,checkOut:checkout})}`;
    const ikyu=h.ikyu?`${h.ikyu}?${query({cid:compact(checkin),cod:compact(checkout),rc:'1',ppc:'2'})}`:null;
    let official=h.official, officialDated=false;
    if(h.id===17){official=`https://sansou-murata.com/reservation/result/?${query({startDate:checkin,endDate:checkout,adult:'2',age7to12:'0',age6under:'0',rooms:'raku.shin.kichi.tou.meiji.showa.nishi.higashi.hou.sou.gyou.kyu'})}`;officialDated=true;}
    if(h.officialBooking){official=`${h.officialBooking}?${query({checkin_date:compact(checkin),checkout_date:compact(checkout),adults:'2',rooms:'1'})}`;officialDated=true;}
    return {ctrip,app:ctripApp,ctripIntent:intent(ctripApp,'ctrip.android.view',ctrip),booking,bookingIntent:intent(booking,'com.booking',booking),agoda,agodaApp,agodaIntent:intent(agodaApp,'com.agoda.mobile.consumer',agoda),ikyu,ikyuIntent:ikyu?intent(ikyu,'com.ikyu.stay.android',ikyu):null,official,officialDated};
  }
  return {build,initialStay,intent};
})();
