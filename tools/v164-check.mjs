import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const App={data:{},utils:{esc:String},router:{register(){}},t:x=>x};
const c=vm.createContext({App,console,setTimeout,clearTimeout,AbortController,performance});
const run=f=>vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
for(const f of fs.readdirSync('js/data/content'))run('js/data/content/'+f);
run('js/data/formuller.js');run('assets/vendor/katex/katex.min.js');
const spec=JSON.parse(fs.readFileSync('curriculum/enrichment-1.64.json','utf8'));
const lessons=Object.entries(App.data.content).flatMap(([course,us])=>us.flatMap(u=>u.outcomes.map(o=>({course,unit:u.id,o}))));
const extras=lessons.filter(x=>x.o.provenance?.officialOutcome===false);
assert.equal(extras.length,spec.lessons.length);assert.equal(extras.filter(x=>x.course.startsWith('12/')).length,35);
for(const g of ['9','10','11','12'])assert.ok(extras.some(x=>x.course.startsWith(g+'/')));
for(const {course,unit,o}of extras){assert.ok(o.code.startsWith('EK.'));assert.ok(o.content.anlatim.length>400);assert.ok(o.content.ornekler.length&&o.content.ozet.length>=3);assert.ok(o.content.anlatim.includes(o.provenance.programmeReference));assert.equal(lessons.filter(x=>x.course===course&&x.unit===unit&&x.o.id===o.id).length,1);}
const en=App.data.content['12/ingilizce'];for(const id of ['t3','t10'])assert.equal(en.find(u=>u.id===id).outcomes.length,3);
assert.equal(App.data.formuller.filter(f=>f.edition==='supplement-1.64').length,32);
const formulaIds=new Set();
for(const f of App.data.formuller){const units=App.data.content[f.g+'/'+f.d];assert.ok(units?.some(u=>u.id===f.k.split('/')[0]&&u.outcomes.some(o=>o.id===f.k.split('/')[1])),'Broken formula topic '+f.ad+' '+f.g+'/'+f.k);c.katex.renderToString(f.tex,{throwOnError:true,strict:"error"});const key=[f.g,f.d,f.k,f.ad].join('/');assert.ok(!formulaIds.has(key),'Duplicate formula '+key);formulaIds.add(key);if(f.edition){assert.match(f.source,/^https:\/\/openstax.org\//);assert.ok(f.v&&f.level);}}
assert.ok(!fs.existsSync('js/modules/history-map.js'));
run('js/ai/pipeline.js');
const calls=[];const batch=App.ai.streamBatch((...a)=>calls.push(a),null,12);
for(let i=0;i<1000;i++)batch.push('part',String(i));assert.equal(calls.length,0,'burst yields to UI');
await new Promise(r=>setTimeout(r,30));assert.deepEqual(calls,[['part','999']],'latest full text retained');
batch.push('last','complete');batch.flush();assert.equal(calls.at(-1)[1],'complete');batch.close();
const ac=new AbortController(),cancelled=App.ai.streamBatch(()=>assert.fail('aborted callback'),ac.signal,10);cancelled.push('stale');ac.abort();await new Promise(r=>setTimeout(r,25));cancelled.flush();cancelled.close();
assert.ok(!fs.existsSync('js/modules/equation-camera.js'));
for(const f of ['index.html','js/core/lazy.js','js/data/discovery.js','js/data/tool-categories.js','js/modules/onboarding.js'])assert.doesNotMatch(fs.readFileSync(f,'utf8'),/canlanan-kitap|Canlanan Ders Kitabı/);
console.log('1.64: 47 sourced original supplements, 35 grade12; all formula routes/KaTeX, 32 new formula conditions, stream batching/final flush/abort and feature retirement passed.');
