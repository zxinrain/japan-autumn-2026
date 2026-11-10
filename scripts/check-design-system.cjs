const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const file of ['index.html','hotels.html','cost-estimate.html']){
 const html=fs.readFileSync(path.join(root,file),'utf8');const css=[...html.matchAll(/rel="stylesheet" href="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(css.filter(x=>x.startsWith('design-system.css')).length,1,file+' must load canonical design system once');
 assert(css.at(-1).startsWith('design-system.css'),file+' must load canonical design system last');
}
for(const file of ['style.css','layout.css','cost-layout.css'])assert(!/:root\s*\{/.test(fs.readFileSync(path.join(root,file),'utf8')),file+' must not own competing tokens');
assert(fs.readFileSync(path.join(root,'scripts/build-cost-report.py'),'utf8').includes('design-system.css'),'Cost generator must preserve shared stylesheet');
console.log('PASS: all public entry points and cost generator share one final design stylesheet; legacy files own no competing root tokens.');
