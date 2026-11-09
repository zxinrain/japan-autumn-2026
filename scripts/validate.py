"""Validate public page references and the current 20-day publishing inputs."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import csv,json
R=Path(__file__).resolve().parents[1]
errors=[]
class Page(HTMLParser):
 def __init__(self,name):super().__init__();self.name=name;self.ids=set();self.h1=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:
   if a['id'] in self.ids:errors.append(f'{self.name}: duplicate {a["id"]}')
   self.ids.add(a['id'])
  if tag=='img' and not a.get('alt'):errors.append('Image without alt')
  if tag=='h1':self.h1=True
  for k in ['href','src']:
   if a.get(k):
    u=urlsplit(a[k])
    if not u.scheme and not u.netloc and u.path and not (R/unquote(u.path)).is_file():errors.append(f'Missing {u.path}')
for name in ['index.html','hotels.html']:
 p=Page(name);p.feed((R/name).read_text())
 if not p.h1:errors.append(f'{name}: missing fallback heading')
trip=json.loads((R/'trip.json').read_text())
rows=list(csv.DictReader((R/'hotel-comparison.csv').open(encoding='utf-8-sig')))
assert len(rows)==len(trip['stays'])
for row,stay in zip(rows,trip['stays']):
 assert row['入住']==stay['in'] and row['退房']==stay['out']
 assert row['价格币种']=='CNY'
 assert all(row[k]=='待查询' for k in ['官网含税总价','携程含税总价','Agoda含税总价','一休含税总价'])
for f in ['travel-data.js','app.js','hotel-links.js','style.css','trip.json','destinations.json','hotel-platforms.json','image-provenance.json','itinerary.md','.nojekyll']:
 if not (R/f).is_file():errors.append(f'Missing {f}')
if errors:raise SystemExit('\n'.join(errors))
print('PASS: two public pages, local resources, ten date-aligned CNY hotel rows.')
