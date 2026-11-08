/* Query dates are explicit; real Android App acceptance remains unverified. */
window.HOTEL_LINKS=(()=>{
 const compact=d=>d.replaceAll('-','');
 function intent(url,packageName,web){const u=new URL(url);return `intent://${u.host}${u.pathname}${u.search}#Intent;scheme=${u.protocol.slice(0,-1)};package=${packageName};S.browser_fallback_url=${encodeURIComponent(web)};end`;}
 function build(s,m){
  const dates={checkin:s.in,checkout:s.out,adults:'2',rooms:'1',currency:'CNY'};
  const q=o=>new URLSearchParams(o).toString();
  const days=(Date.parse(s.out)-Date.parse(s.in))/86400000;
  const ctrip=m.ctripId?`https://m.ctrip.com/webapp/hotel/hoteldetail/${m.ctripId}.html?${q({atime:compact(s.in),days:String(days),checkin:s.in,checkout:s.out,adult:'2',room:'1',currency:'CNY'})}`:`https://hotels.ctrip.com/hotels/list?${q({...dates,keyword:s.en})}`;
  const booking=`https://www.booking.com/searchresults.html?${q({ss:s.en,checkin:s.in,checkout:s.out,group_adults:'2',group_children:'0',no_rooms:'1',selected_currency:'CNY'})}`;
  const agoda=m.agoda?`${m.agoda}?${q({checkIn:s.in,checkOut:s.out,adults:'2',children:'0',rooms:'1',currency:'CNY'})}`:`https://www.agoda.com/search?${q({textToSearch:s.en,checkIn:s.in,checkOut:s.out,adults:'2',rooms:'1',currency:'CNY'})}`;
  const ikyu=m.ikyu?`${m.ikyu}?${q({cid:compact(s.in),cod:compact(s.out),rc:'1',ppc:'2'})}`:'https://www.ikyu.com/';
  return [
   {name:'酒店官网',web:m.official,label:'打开官网订房入口',note:'官网按具体系统手选本次日期；有无官方 App 依酒店实际服务。'},
   {name:'携程',web:ctrip,intent:m.ctripId?intent(ctrip,'ctrip.android.view',ctrip):null,label:m.ctripId?'按本次日期查看酒店':'按名称搜索，核对日期',note:m.ctripId?'具体酒店入口已匹配；本次目标日期与 App 接收仍待实测。':'酒店具体 ID 尚未匹配；搜索页接收日期待核，不能保证显示本次日期。'},
   {name:'Agoda',web:agoda,intent:m.agoda?intent(agoda,'com.agoda.mobile.consumer',agoda):null,label:m.agoda?'按本次日期查看酒店':'搜索酒店并核对日期',note:'价格、税费、餐食、收录与跳转后的日期均需重新核对。'},
   {name:'Booking',web:booking,intent:intent(booking,'com.booking',booking),label:'按名称与本次日期搜索',note:'带日期搜索入口；酒店具体房型、库存及 App 接收日期未实测。'},
   {name:'一休',web:ikyu,intent:m.ikyu?intent(ikyu,'com.ikyu.stay.android',ikyu):null,label:m.ikyu?'按本次日期查看酒店':'打开一休，手选酒店日期',note:m.ikyu?'酒店入口已匹配；本次日期、海外支付与餐食条件待核。':'平台收录及酒店页面待匹配，需手选日期；不提供未经验证的 App 深链。'}
  ];
 }
 return {build,intent};
})();
