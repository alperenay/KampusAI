// Export the existing lessons without changing routes or student progress keys.
// Official-code matches are candidates, never proof of semantic coverage.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dest=path.join(root,'curriculum');
const read=p=>JSON.parse(fs.readFileSync(path.join(dest,p),'utf8'));
const write=(p,data)=>{const file=path.join(dest,p);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');};
const sha=text=>crypto.createHash('sha256').update(text).digest('hex');
const official=read('official/manifest.json');
const catalogue=read('official/program-catalogue.json');
const pdfCatalogue=read('pdf-index/manifest.json');
const pdfSources=pdfCatalogue.modules.map(m=>({...m,data:read('pdf-index/'+m.file)}));
const programs=official.modules.map(entry=>({...entry,data:read('official/'+entry.file)}));
const subjectSlugs={edebiyat:['turk-dili-ve-edebiyati-dersi'],matematik:['matematik-dersi'],fizik:['fizik-dersi'],kimya:['kimya-dersi'],biyoloji:['biyoloji-dersi'],tarih:['tarih-dersi'],inkilap:['tc-inkilap-tarihi-ve-ataturkculuk-dersi-2'],cografya:['cografya-dersi'],felsefe:['felsefe-dersi'],din:['din-kulturu-ve-ahlak-bilgisi-dersi'],ingilizce:['ingilizce-dersi-9-12','ingilizce-dersi-hazirlik-12'],beden:['beden-egitimi-ve-spor-dersi'],gorsel:['gorsel-sanatlar-dersi'],muzik:['muzik-dersi'],saglik:['saglik-bilgisi-ve-trafik-kulturu-dersi'],psikoloji:['psikoloji-dersi'],sosyoloji:['sosyoloji-dersi'],cagdas:['cagdas-turk-ve-dunya-tarihi-dersi'],almanca:[]};
const ctx={App:{data:{},t:x=>x}};vm.createContext(ctx);
const entries=[];
for(const file of fs.readdirSync(path.join(root,'js/data/content')).filter(f=>f.endsWith('.js')).sort()){
  const source=fs.readFileSync(path.join(root,'js/data/content',file),'utf8');
  vm.runInContext(source,ctx,{filename:file,timeout:2000});
  entries.push({file,source});
}
vm.runInContext(fs.readFileSync(path.join(root,'js/data/curriculum-data.js'),'utf8'),ctx,{timeout:2000});
const modules=[], allOutcomes=[], issues=[];
for(const [key,units] of Object.entries(ctx.App.data.content).sort()){
  const [grade,subjectId]=key.split('/');
  const course=ctx.App.data.curriculum.findSubject(grade,subjectId);
  if(!course)throw new Error('Orphan subject '+key);
  const relevant=programs.filter(m=>m.grade===Number(grade)&&(subjectSlugs[subjectId]||[]).includes(m.slug));
  const duplicateCodes=new Map();
  const rows=units.map(u=>({id:u.id,name:u.name,outcomes:u.outcomes.map(o=>{
    const item={id:o.id,key:[key,u.id,o.id].join('/'),localCode:o.code||null,title:o.title,content:o.content,
      review:{content:'existing-project-not-independently-reviewed',alignment:'unverified',rights:'existing-project-provenance-review-required'},
      officialCandidates:relevant.flatMap(m=>m.data.units.flatMap(ou=>ou.codes.includes(o.code)?[{program:m.slug,unitId:ou.id,code:o.code,url:ou.url}]:[]))};
    if(!item.content||typeof item.content.anlatim!=='string'||!Array.isArray(item.content.ornekler)||!Array.isArray(item.content.ozet))throw new Error('Invalid lesson '+item.key);
    if(o.code){const ks=duplicateCodes.get(o.code)||[];ks.push(item.key);duplicateCodes.set(o.code,ks);}
    allOutcomes.push({grade:Number(grade),subjectId,...item});
    return item;
  })}));
  for(const [code,keys]of duplicateCodes)if(keys.length>1)issues.push({type:'duplicate-local-code',subject:key,code,keys});
  const file='notes/'+key+'.json';
  const entry=entries.find(x=>x.source.includes('App.data.content["'+key+'"]'));
  if(!entry)throw new Error('Missing source provenance '+key);
  const referenceIds=subjectId==='almanca'?[333]:subjectId==='din'?[2153,319]:[];
  const additionalReferences=catalogue.programs.filter(p=>referenceIds.some(id=>p.url.endsWith('PID='+id)));
  const module={schemaVersion:1,grade:Number(grade),subjectId,name:course.name,programEdition:'legacy-project-unverified',
    source:{file:'js/data/content/'+entry.file,sha256:sha(entry.source),additionalReferences,
      pdfReferenceCandidates:pdfSources.filter(p=>p.subjectId===subjectId).map(p=>({file:'pdf-index/'+p.file,url:p.data.sourceUrl,edition:p.edition,status:'programme-and-grade-review-required'}))},
    officialProgramCandidates:relevant.map(m=>({slug:m.slug,url:m.data.sourceUrl})),units:rows};
  write(file,module);
  const text=fs.readFileSync(path.join(dest,file),'utf8');
  modules.push({grade:Number(grade),subjectId,file,units:rows.length,outcomes:rows.reduce((n,u)=>n+u.outcomes.length,0),sha256:sha(text)});
}
const coverage=[];
for(const p of programs){
  const templates=[];
  for(const unit of p.data.units){
    const rows=unit.codes.map(code=>{
      const candidates=allOutcomes.filter(o=>o.grade===p.grade&&o.officialCandidates.some(c=>c.program===p.slug&&c.code===code)).map(o=>o.key);
      const template={schemaVersion:1,grade:p.grade,program:p.slug,unitId:unit.id,officialCode:code,
        source:{url:unit.url,sha256:unit.sourceSha256},status:'draft',title:'',content:{anlatim:'',ornekler:[],ozet:[]},
        review:{alignmentApproved:false,contentApproved:false,reviewer:null},
        rights:{status:'unverified',licence:null,sourceUrls:[unit.url]},legacyCandidates:candidates};
      templates.push(template);
      return {code,legacyCandidates:candidates,status:candidates.length?'candidate-requires-review':'lesson-required'};
    });
    coverage.push({grade:p.grade,program:p.slug,unitId:unit.id,title:unit.title,url:unit.url,sourceStatus:unit.status,outcomes:rows});
  }
  // Never overwrite edited lesson drafts when regenerating source templates.
  const templatePath='authoring/'+p.file;
  const oldFile=path.join(dest,templatePath);
  if(fs.existsSync(oldFile)){
    const old=read(templatePath);
    if(old.lessons.some(l=>l.status!=='draft'||l.title||l.content?.anlatim||l.content?.ornekler?.length||l.content?.ozet?.length)){
      issues.push({type:'edited-drafts-preserved',file:templatePath});
      continue;
    }
  }
  write(templatePath,{schemaVersion:1,grade:p.grade,program:p.slug,lessons:templates});
}
const unassigned=official.modules.filter(m=>m.grade===null);
const summary={localModules:modules.length,localUnits:modules.reduce((n,m)=>n+m.units,0),localLessons:allOutcomes.length,
  officialCourses:official.courseCount,officialModules:official.modules.length,officialUnits:coverage.length,
  officialCodeReferences:coverage.reduce((n,u)=>n+u.outcomes.length,0),
  referencesWithLegacyCandidates:coverage.flatMap(u=>u.outcomes).filter(o=>o.legacyCandidates.length).length,
  unresolvedSourceUnits:coverage.filter(u=>u.sourceStatus!=='codes-indexed').length,
  emptySourceModules:official.modules.filter(m=>m.units===0).map(m=>m.file),
  localModulesWithoutGradeSpecificPortalMatch:modules.filter(m=>!read(m.file).officialProgramCandidates.length).map(m=>m.grade+'/'+m.subjectId),
  verifiedLessonMappings:0,allMebLessonsComplete:false};
write('coverage.json',{schemaVersion:1,summary,issues,
  limitations:['Code matches alone do not verify lesson content or programme edition.','TYMM portal reference includes future-grade programmes; it is not a school timetable.','Ungraded electives are not assigned to all four grades.','Legacy programme outcomes and school-specific programmes require a separate edition audit.','Public access is not an open-content licence; no textbook text or images are imported.'],
  units:coverage});
write('manifest.json',{schemaVersion:1,datasetId:'kampusai-curriculum',snapshotDate:official.snapshotDate,
  model:'grade/subject/unit/outcome',summary,modules,unassignedElectives:unassigned.map(m=>m.slug),
  catalogue:'official/manifest.json',pdfCatalogue:'pdf-index/manifest.json',coverage:'coverage.json',lessonSchema:'lesson.schema.json',
  integrationPolicy:'explicit-import-only-preserve-existing-keys',allMebLessonsComplete:false});
console.log(JSON.stringify(summary,null,2));
