import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {toAppUnits,loadModule} from '../curriculum/adapter.mjs';
import {validateLesson} from '../curriculum/validate-lesson.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=rel=>JSON.parse(fs.readFileSync(path.join(root,'curriculum',rel),'utf8'));
const manifest=read('manifest.json'),official=read(manifest.catalogue),coverage=read(manifest.coverage);
assert.equal(manifest.schemaVersion,1);assert.equal(manifest.allMebLessonsComplete,false);
assert.equal(official.openLicenceVerified,false);
const ctx={App:{data:{}}};vm.createContext(ctx);
for(const file of fs.readdirSync(path.join(root,'js/data/content')))vm.runInContext(fs.readFileSync(path.join(root,'js/data/content',file),'utf8'),ctx);
let lessons=0;
const keys=new Set();
for(const entry of manifest.modules){
  assert.match(entry.file,/^notes\/(9|10|11|12)\/[a-z]+\.json$/);
  const bytes=fs.readFileSync(path.join(root,'curriculum',entry.file));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.sha256);
  const module=JSON.parse(bytes),units=toAppUnits(module);
  assert.match(module.source.file,/^js\/data\/content\/[a-z]+-\d+\.js$/);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,module.source.file))).digest('hex'),module.source.sha256,'Source provenance must be current');
  const existing=ctx.App.data.content[entry.grade+'/'+entry.subjectId];
  assert.deepEqual(units,JSON.parse(JSON.stringify(existing)),'Legacy notes, IDs and order round-trip exactly');
  for(const u of module.units)for(const o of u.outcomes){
    assert.ok(!keys.has(o.key));keys.add(o.key);lessons++;
    assert.equal(o.review.alignment,'unverified');
    assert.ok(o.content.anlatim.length>=400);assert.ok(o.content.ornekler.length);assert.ok(o.content.ozet.length>=2);
  }
}
assert.equal(lessons,manifest.summary.localLessons);
let references=0,unitCount=0;
for(const entry of official.modules){
  assert.match(entry.file,/^(9|10|11|12|electives)\/[a-z0-9-]+\.json$/);
  const p=read('official/'+entry.file),draft=read('authoring/'+entry.file);
  assert.equal(p.grade,entry.grade);assert.equal(p.courseId,entry.courseId);
  for(const lesson of draft.lessons)assert.deepEqual(validateLesson(lesson,{sourceModule:p}),[],entry.file+' '+lesson.officialCode);
  for(const u of p.units){
    unitCount++;
    assert.match(u.url,/^https:\/\/tymm\.meb\.gov\.tr\/[a-z0-9-]+\/unite\/\d+$/);
    assert.equal(new Set(u.codes).size,u.codes.length);
    references+=u.codes.length;
    for(const code of u.codes)assert.ok(draft.lessons.some(l=>l.unitId===u.id&&l.officialCode===code),'Every code has an authoring template');
  }
  if(entry.grade===null)assert.ok(entry.file.startsWith('electives/'),'Ungraded elective is not assigned to a class');
}
assert.equal(unitCount,manifest.summary.officialUnits);assert.equal(references,manifest.summary.officialCodeReferences);
assert.equal(coverage.summary.verifiedLessonMappings,0,'Candidate code matches must not count as verified coverage');
const source=read('official/11/matematik-dersi.json'),draft=read('authoring/11/matematik-dersi.json').lessons[0];
assert.ok(validateLesson(draft,{forPublication:true,sourceModule:source}).length>0,'Empty draft must not be published');
const stale=structuredClone(draft);stale.source.sha256='0'.repeat(64);
assert.ok(validateLesson(stale,{sourceModule:source}).some(e=>e.includes('Source changed')));
const reviewed=structuredClone(draft);
Object.assign(reviewed,{status:'reviewed',title:'Synthetic validator fixture',content:{anlatim:'Synthetic test fixture. '.repeat(30),ornekler:[{soru:'Fixture question',cozum:'Fixture answer'}],ozet:['Fixture one','Fixture two']},review:{alignmentApproved:true,contentApproved:true,reviewer:'test-fixture'},rights:{status:'original',licence:'test-fixture-only',sourceUrls:[draft.source.url]}});
assert.deepEqual(validateLesson(reviewed,{forPublication:true,sourceModule:source}),[]);
reviewed.rights.status='unverified';assert.ok(validateLesson(reviewed,{forPublication:true,sourceModule:source}).some(e=>e.includes('rights')));
for(const entry of read('pdf-index/manifest.json').modules){
  const pdf=read('pdf-index/'+entry.file);assert.equal(pdf.licenceVerified,false);
  assert.equal(pdf.fullTextRedistributed,false);assert.match(pdf.pdfSha256,/^[a-f0-9]{64}$/);
  for(const candidate of pdf.codeCandidates){assert.equal(candidate.status,'candidate-requires-review');assert.ok(candidate.pages.every(p=>Number.isInteger(p)&&p>0&&p<=pdf.pageCount));}
}
const sample=read(manifest.modules[0].file);
const invalid=structuredClone(sample);invalid.units[0].outcomes[0].key='another/student/key';
assert.throws(()=>toAppUnits(invalid),/progress key mismatch/);
await assert.rejects(loadModule('https://localhost/curriculum/',9,'../secrets'),/invalid module/);
await assert.rejects(loadModule('https://localhost/curriculum/',9,'almanca',{fetcher:async()=>({ok:false,status:404})}),/HTTP 404/);
await assert.rejects(loadModule('https://localhost/curriculum/',10,'almanca',{fetcher:async()=>({ok:true,json:async()=>sample})}),/mismatch/);
const loaded=await loadModule('https://localhost/curriculum/',sample.grade,sample.subjectId,{fetcher:async()=>({ok:true,json:async()=>sample})});
assert.deepEqual(loaded,toAppUnits(sample));loaded[0].outcomes[0].content.anlatim='changed';assert.notEqual(sample.units[0].outcomes[0].content.anlatim,'changed');
console.log('Curriculum: '+lessons+' notes round-trip; '+unitCount+' official units / '+references+' code references; stable progress keys, provenance, templates and loader errors passed.');
