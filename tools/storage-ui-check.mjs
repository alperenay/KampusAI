import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { uiHarness } from './ui-harness.mjs';
const h=await uiHarness(),checks=[];
try {
 const {page}=await h.device();
 const result=await page.evaluate(async()=>{
   const snapshot=()=>App.db.exportAll();
   const key='9/matematik/t1/k1',date=new Date().toISOString();
   const fixtures={reviews:{id:'audit_reviews',kind:'audit'},research:{id:'audit_research',kind:'audit'},exams:{id:'audit_exam',type:'TYT',name:'Audit',date:date.slice(0,10),results:{turkce:{d:20,y:2},sosyal:{d:10,y:2},matematik:{d:15,y:3},fen:{d:8,y:1}}},quizzes:{id:'audit_quiz',key,label:'Audit',date,total:10,correct:7},meta:{id:'audit_meta',kind:'audit'},notes:{id:key,key,text:'Audit'},cards:{id:key+'#o0',key,h:'audit',box:1,due:date,added:date,reps:1,lapses:0}};
   for(const [store,row] of Object.entries(fixtures))await App.db.put(store,row);
   App.prefs.set('geminiKey','not-a-real-key');App.prefs.set('syncCode','not-a-real-code');App.prefs.set('userName','Test');
   const backup=await snapshot();
   if(backup.prefs.geminiKey||backup.prefs.syncCode)throw new Error('Secrets in exported backup');
   const before=JSON.stringify(backup.stores);
   const malformed=JSON.parse(JSON.stringify(backup));malformed.stores.meta={invalid:'not an array'};
   let rejected=false;try{await App.db.importAll(malformed);}catch{rejected=true;}
   const after=JSON.stringify((await snapshot()).stores);
   return {rejected,preserved:before===after,backup};
 });
 assert.equal(result.rejected,true);assert.equal(result.preserved,true,'Malformed backup must not erase any original store');checks.push('reject malformed backup before any data change');
 // A valid backup is independent of caller objects and restores separate study/research/practice state.
 const valid=await page.evaluate(async backup=>{await App.db.resetAll();await App.db.importAll(backup);return{counts:Object.fromEntries(await Promise.all(['reviews','research','exams','quizzes','meta','notes','cards'].map(async s=>[s,(await App.db.getAll(s)).length]))),name:App.prefs.get('userName'),key:App.prefs.get('geminiKey')};},result.backup);
 for(const [s,n] of Object.entries(valid.counts))assert.equal(n,result.backup.stores[s].length);assert.equal(valid.name,'Test');assert.equal(valid.key,'not-a-real-key');checks.push('all independent stores round-trip without importing secrets');
 // A synchronous clone failure inside an IDB transaction must roll back every cleared store.
 const rolled=await page.evaluate(async backup=>{const before=JSON.stringify((await App.db.exportAll()).stores);const broken=JSON.parse(JSON.stringify(backup));broken.stores.notes.push({id:'bad',impossible:()=>{}});let rejected=false;try{await App.db.importAll(broken);}catch{rejected=true;}return{rejected,same:before===JSON.stringify((await App.db.exportAll()).stores)};},result.backup);
 assert.ok(rolled.rejected&&rolled.same,'A failed import transaction must roll back');checks.push('all-store transaction rollback on clone failure');
 const invalid=await page.evaluate(async backup=>{const before=JSON.stringify((await App.db.exportAll()).stores);let rejected=0;for(const mutate of [b=>b.schema=999,b=>b.prefs=[],b=>b.stores.notes.push({...b.stores.notes[0]})]){const b=JSON.parse(JSON.stringify(backup));mutate(b);try{await App.db.importAll(b);}catch{rejected++;}if(before!==JSON.stringify((await App.db.exportAll()).stores))return false;}return rejected===3;},result.backup);assert.equal(invalid,true);checks.push('future schema, duplicate IDs and malformed preferences are rejected safely');
 const fallback=await h.device('aktarim',{storageFallback:true});
 const ls=await fallback.page.evaluate(async()=>{
  if(App.db.engine!=='localstorage')throw new Error('Fallback not active');
  await App.db.put('meta',{id:'__proto__',kind:'audit',value:1});await App.db.put('notes',{id:'audit_ls',text:'Original'});
  const backup=await App.db.exportAll(),before=JSON.stringify(backup.stores),changed=JSON.parse(JSON.stringify(backup));changed.stores.notes[0].text='Replacement';
  const set=Storage.prototype.setItem;let once=true,rejected=false;
  Storage.prototype.setItem=function(k,v){if(once&&k==='da:store:meta'){once=false;throw new DOMException('Test quota','QuotaExceededError');}return set.call(this,k,v);};
  try{await App.db.importAll(changed);}catch{rejected=true;}finally{Storage.prototype.setItem=set;}
  return{rejected,preserved:before===JSON.stringify((await App.db.exportAll()).stores),prototypeKey:(await App.db.get('meta','__proto__')).value};
 });assert.ok(ls.rejected&&ls.preserved);assert.equal(ls.prototypeKey,1);checks.push('localStorage fallback: quota failure restores all prior stores and special IDs are safe');
 assert.deepEqual(h.errors,[]);fs.writeFileSync(path.join(h.qa,'storage-report.json'),JSON.stringify({engine:h.engineName,checks},null,2));console.log(h.engineName+': storage isolation, malformed backup, atomic IDB restore and quota-safe fallback passed.');
}finally{await h.close();}
