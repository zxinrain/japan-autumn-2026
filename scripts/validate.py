"""Check deployment inputs and internal references using only the stdlib."""
import csv
import re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
errors = []

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.links = path, set(), []
        self.heading = ''
        self.in_h1 = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:
                errors.append(f'{self.path.name}: duplicate id {a["id"]}')
            self.ids.add(a['id'])
        if tag == 'h1': self.in_h1 = True
        if tag == 'img' and not a.get('alt'): errors.append(f'{self.path.name}: image without alt')
        for key in ['src', 'href']:
            if a.get(key): self.links.append(a[key])
    def handle_endtag(self, tag):
        if tag == 'h1': self.in_h1 = False
    def handle_data(self, data):
        if self.in_h1: self.heading += data

pages = {}
for name in ['index.html','hotels.html']:
    p = Page(ROOT/name)
    p.feed(p.path.read_text())
    pages[name] = p
    if not p.heading: errors.append(f'{name}: missing h1')
    if any(word in p.heading for word in ['方案','提案']): errors.append(f'{name}: forbidden title text')

dynamic_ids = {'day-list','hotel-list','building-list','source-links'}
for name,p in pages.items():
    for link in p.links:
        u = urlsplit(link)
        if u.scheme or u.netloc: continue
        dest = (ROOT/unquote(u.path)) if u.path else p.path
        if u.path and not dest.is_file(): errors.append(f'{name}: missing {u.path}')
        if u.fragment and dest.name in pages and u.fragment not in pages[dest.name].ids | dynamic_ids:
            errors.append(f'{name}: missing anchor {link}')

for url in re.findall(r"url\(['\"]?([^)'\"]+)", (ROOT/'style.css').read_text()):
    if not (ROOT/url).is_file(): errors.append(f'missing CSS image {url}')

rows = list(csv.DictReader((ROOT/'hotel-comparison.csv').open(encoding='utf-8-sig')))
if len(rows) != 20: errors.append(f'Expected 20 hotel/stay comparison rows, got {len(rows)}')
for r in rows:
    if r['价格币种'] != 'CNY': errors.append('Non-CNY comparison row')
    if not r['入住'] >= '2026-11-23': errors.append('Outdated hotel dates')
    for k in ['Agoda每晚含税价','Booking每晚含税价','携程每晚含税价','一休折算每晚价','官网折算每晚价']:
        if r[k] not in ['待查询','收录待确认']: errors.append('Unverified price carried forward')

for name in ['data.js','app.js','hotels-data.js','hotels.js','architecture-data.js','reservations-data.js','itinerary.md','.nojekyll']:
    if not (ROOT/name).is_file(): errors.append(f'Missing deployment file {name}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: 2 pages, internal files/anchors, image alt text, CNY comparison ({len(rows)} rows).')
