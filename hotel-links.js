/* One HTTPS link per platform; displayed-date acceptance is audited separately. */
window.HOTEL_LINKS=(()=>{
 const compact=d=>d.replaceAll('-',''),q=o=>new URLSearchParams(o).toString();
 function build(s,m){
  const nights=(Date.parse(s.out)-Date.parse(s.in))/86400000;
  const ctrip=m.ctripId?`https://m.ctrip.com/html5/hotel/hoteldetail/${m.ctripId}.html?${q({atime:s.in,days:String(nights),checkin:s.in,checkout:s.out,adult:'2',room:'1',currency:'CNY'})}`:`https://hotels.ctrip.com/hotels/list?${q({keyword:s.en,checkin:s.in,checkout:s.out,adults:'2',rooms:'1',currency:'CNY'})}`;
  const booking=(m.booking||'https://www.booking.com/searchresults.html')+'?'+q({...(m.booking?{}:{ss:s.en}),checkin:s.in,checkout:s.out,group_adults:'2',group_children:'0',no_rooms:'1',selected_currency:'CNY'});
  const agoda=m.agoda+'?'+q({checkIn:s.in,checkOut:s.out,adults:'2',children:'0',rooms:'1',currency:'CNY'});
  const ikyu=m.ikyu+'?'+q({cid:compact(s.in),cod:compact(s.out),rc:'1',ppc:'2'});
  return [
   {name:'酒店官网',web:m.official,label:'查看官网 · 选择本次日期',dateMode:'manual',note:'具体订房系统需手选下方日期；官网介绍页不代表已预填日期。'},
   {name:'携程',web:ctrip,label:m.ctripId?'携程 · 查看本次住宿':'携程 · 按酒店名查询',dateMode:'encoded',note:m.ctripId?'已匹配具体酒店，链接携带本次日期；接收情况见核验状态。':'未匹配具体酒店ID，搜索可能无收录；日期与结果需复核。'},
   {name:'Agoda',web:agoda,label:'Agoda · 查看本次住宿',dateMode:'encoded',note:'具体酒店页携带本次日期和人民币币种；登录、风控与库存可能影响显示。'},
   {name:'Booking',web:booking,label:m.booking?'Booking · 查看本次住宿':'Booking · 按酒店名查询',dateMode:'encoded',note:'携带本次日期、2成人1房与人民币参数；验证页可能阻止读取。'},
   {name:'一休',web:ikyu,label:'一休 · 查看本次住宿',dateMode:'encoded',note:'具体酒店页携带本次日期；一休原站以日元计价，人民币仅用于本页参考。'}
  ];
 }
 return {build};
})();
