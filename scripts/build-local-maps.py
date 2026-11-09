# -*- coding: utf-8 -*-
"""Build same-origin GSI maps with real coastlines, roads and water.
Build dependencies: scripts/map-build-requirements.txt (use an isolated environment).
The website itself has no build dependency or remote map API requirement.
"""
from pathlib import Path
import json,math,urllib.request,base64,time,hashlib,html,io
from PIL import Image
import resvg_py
from concurrent.futures import ThreadPoolExecutor
import mapbox_vector_tile
from shapely.geometry import shape,mapping
R=Path(__file__).resolve().parents[1];out=R/'assets/maps';out.mkdir(exist_ok=True)
s=(R/'route-data.js').read_text();data=json.loads(s[s.index('{'):s.rindex('}')+1]);points=data['points']
# Cache source tiles outside the published tree; each map embeds only its small viewport.
cache=Path('/tmp/japan-gsi-blank-cache');cache.mkdir(exist_ok=True)
vcache=Path('/tmp/japan-gsi-vector-cache');vcache.mkdir(exist_ok=True)
def vector(z,x,y):
 f=vcache/f'{z}-{x}-{y}.pbf';url=f'https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'
 if not f.exists():
  try:
   b=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'JapanAutumn2026TravelGuide/1.0'}),timeout=20).read();f.write_bytes(b)
  except urllib.error.HTTPError as e:
   if e.code==404:return {},url
   raise
 return mapbox_vector_tile.decode(f.read_bytes(),default_options={'y_coord_down':True}),url

def xy(lng,lat,z):
 n=2**z;return ((lng+180)/360*n,(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n)
def ll(x,y,z):
 n=2**z;return [x/n*360-180,math.degrees(math.atan(math.sinh(math.pi*(1-2*y/n))))]
variants={'all':list(points)}
variants['all']=list(dict.fromkeys(sum(data['routes'],[])))
for i,route in enumerate(data['routes']):variants[f'day-{i:02}']=route
variants['kunisaki']=['kaiBeppu','fukiji','makiodo'];meta={}
for key,ids in variants.items():
 ids=list(dict.fromkeys(ids));loc=[points[i] for i in ids];west=min(p['lng'] for p in loc);east=max(p['lng'] for p in loc);south=min(p['lat'] for p in loc);north=max(p['lat'] for p in loc)
 # Cover the visible map around a fitted route at phone and desktop aspect ratios.
 # Compute padding in Mercator space so north/south and east/west distances share one scale.
 ax,ay=xy(west,north,14);bx,by=xy(east,south,14);cx=(ax+bx)/2;cy=(ay+by)/2
 sx=max(.8,bx-ax);sy=max(.6,by-ay);cover_x=max(sx*1.65,sy*4.3);cover_y=max(sy*1.65,sx*2.1)
 west,north=ll(cx-cover_x/2,cy-cover_y/2,14);east,south=ll(cx+cover_x/2,cy+cover_y/2,14)
 for z in range(14,4,-1):
  ax,ay=xy(west,north,z);bx,by=xy(east,south,z)
  if bx-ax<=8 and by-ay<=6:break
 x0,y0=math.floor(ax),math.floor(ay);x1,y1=math.ceil(bx),math.ceil(by);width=(x1-x0)*256;height=(y1-y0)*256;items=[];sources=[]
 for x in range(x0,x1):
  for y in range(y0,y1):
   f=cache/f'{z}-{x}-{y}.png';url=f'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png'
   if not f.exists():
    req=urllib.request.Request(url,headers={'User-Agent':'JapanAutumn2026TravelGuide/1.0'})
    b=urllib.request.urlopen(req,timeout=20).read();assert b.startswith(b'\x89PNG');f.write_bytes(b);time.sleep(.06)
   b=f.read_bytes();items.append(f'<image x="{(x-x0)*256}" y="{(y-y0)*256}" width="256" height="256" href="data:image/png;base64,{base64.b64encode(b).decode()}"/>');sources.append(url)
 bounds=[ll(x0,y1,z),ll(x1,y0,z)]
 # Every street/water path comes from the official GSI vector tiles, not trip-point joins.
 vector_sources=[];labels=[];occupied=set();road_count=0
 tiles=[(z,x,y) for x in range(x0,x1) for y in range(y0,y1)]
 with ThreadPoolExecutor(max_workers=4) as pool:decoded=list(pool.map(lambda t:vector(*t),tiles))
 for (vz,x,y),(layers,url) in zip(tiles,decoded):
  vector_sources.append(url);parts=[];extent=next(iter(layers.values()))['extent'] if layers else 4096;unit=256/extent
  def paths(coords,close=False):
   return ' '.join(('M' if i==0 else 'L')+f'{a*unit:.1f},{b*unit:.1f}' for i,(a,b,*_) in enumerate(coords))+('Z' if close else '')
  for layer in ['waterarea','road','railway']:
   for feature in layers.get(layer,{}).get('features',[]):
    g=feature['geometry'];props=feature.get('properties',{})
    if not g or g.get('type') not in ['LineString','MultiLineString','Polygon','MultiPolygon']:continue
    g=mapping(shape(g).simplify(.45/unit,preserve_topology=True));typ=g['type'];cs=g['coordinates']
    if layer=='waterarea':
     polygons=cs if typ=='MultiPolygon' else [cs] if typ=='Polygon' else []
     for rings in polygons:parts.append('<path d="'+''.join(paths(r,True) for r in rings)+'" fill="#e2ebf1" fill-rule="evenodd"/>')
    else:
     lines=cs if typ=='MultiLineString' else [cs] if typ=='LineString' else []
     for line in lines:
      major=props.get('motorway')==1 or props.get('rdCtg') in [0,1,2]
      color='#aebdc9' if major else '#cdd7e0' if layer=='road' else '#adbac5';stroke_width=1.35 if major else .65
      parts.append(f'<path d="{paths(line)}" fill="none" stroke="{color}" stroke-width="{stroke_width}" stroke-linecap="round"'+(' stroke-dasharray="3 2"' if layer=='railway' else '')+'/>');road_count+=1
  cid=f'clip-{x}-{y}';items.append(f'<defs><clipPath id="{cid}"><rect width="256" height="256"/></clipPath></defs><g transform="translate({(x-x0)*256} {(y-y0)*256})" clip-path="url(#{cid})">'+''.join(parts)+'</g>')
  for feature in layers.get('label',{}).get('features',[]):
   g=feature.get('geometry',{});props=feature.get('properties',{});name=props.get('annoChar','')
   if g.get('type')!='Point' or not name or len(name)>12:continue
   a,b=g['coordinates'][:2];px=(x-x0)*256+a*unit;py=(y-y0)*256+b*unit;cell=(int(px/115),int(py/55))
   if not 15<px<width-15 or not 15<py<height-15 or cell in occupied:continue
   occupied.add(cell);labels.append(f'<text x="{px:.1f}" y="{py:.1f}" text-anchor="middle" fill="#788a9a" font-family="system-ui,sans-serif" font-size="11" paint-order="stroke" stroke="#f8fafb" stroke-width="3">{html.escape(name)}</text>')
 items.extend(labels)
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><title>国土地理院白地図与真实道路水系</title><rect width="100%" height="100%" fill="#f7f9fb"/>'+''.join(items)+'</svg>'
 f=out/f'{key}.webp';raster=resvg_py.svg_to_bytes(svg_string=svg,width=1400);im=Image.open(io.BytesIO(raster));im.save(f,'WEBP',quality=86,method=6);old=out/f'{key}.svg';old.unlink(missing_ok=True);meta[key]={'file':str(f.relative_to(R)),'bounds':bounds,'zoom':z,'width':width,'height':height,'sourceTiles':sources,'vectorTiles':vector_sources,'roadFeatures':road_count,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()};print('Built',key,f.stat().st_size,flush=True)
payload={'provider':'GSI blank + GSI vector experiment','checked':'2026-11-10','coordinateSystem':'WGS-84 / Web Mercator','attribution':'地理院タイル（白地図）・国土地理院ベクトルタイル提供実験を加工','source':'https://maps.gsi.go.jp/development/ichiran.html#blank','vectorSource':'https://github.com/gsi-cyberjapan/gsimaps-vector-experiment','license':'https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html','maps':meta}
(R/'local-maps.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');(R/'local-maps.js').write_text('window.JAPAN_LOCAL_MAPS='+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n')
