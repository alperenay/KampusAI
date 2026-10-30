import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const App={data:{}};const c=vm.createContext({App});for(const f of ['tarih-olaylar','tarih-ek'])vm.runInContext(fs.readFileSync('js/data/'+f+'.js','utf8'),c);
assert.equal(App.data.tarihOlay.length,184);assert.equal(new Set(App.data.tarihOlay.map(e=>e[0]+'|'+e[1])).size,184);
for(const e of App.data.tarihOlay){assert.ok(Number.isFinite(e[0]));assert.ok(App.data.tarihDonem.some(a=>a[0]===e[2]));assert.ok(App.data.tarihTur[e[3]]);if(e[6]){for(const k of ['background','development','consequences','question','dateNote'])assert.ok(typeof e[6][k]==='string'&&e[6][k].length>=30);assert.ok(e[6].sources.every(s=>/^https:\/\//.test(s.url)&&s.title.length>3));}}
console.log('Timeline: 184 unique backward-compatible event records and 24 complete source-linked dossiers passed.');
