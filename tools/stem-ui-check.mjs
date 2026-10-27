// UI fixtures test navigation, rendering and cancellation; not real model/OCR accuracy.
import assert from 'node:assert/strict';
import path from 'node:path';
import { uiHarness } from './ui-harness.mjs';
const h=await uiHarness();
try {
 const {page:p}=await h.device('sayisal');
 await p.route('http://127.0.0.1:8766/**',async r=>{
  const url=r.request().url();let body;
  if(url.endsWith('/health'))body=JSON.stringify({ok:true,model:'kampusai-stem-v2'});
  else if(url.endsWith('/ocr'))body=JSON.stringify({text:'2x + 3 = 11',confidence:.9,requires_confirmation:true});
  else body=[{delta:'Adım 1: $2x+3=11$.\n'},{delta:'Adım 2: $2x=8$.\nSonuç: $x=4$'},{done:true,model:'kampusai-stem-v2'}].map(x=>JSON.stringify(x)).join('\n')+'\n';
  await r.fulfill({status:200,contentType:url.endsWith('/solve')?'application/x-ndjson':'application/json',body});
 });
 await p.locator('.stem-connect summary').click();await p.locator('#stemToken').fill('test-only-stem-token-not-production-123');await p.locator('#stemCheck').click();
 await p.waitForFunction(()=>document.querySelector('#stemConnection').textContent.includes('kampusai-stem-v2'));
 for(const subject of ['Matematik','Fizik','Kimya','Biyoloji']){
  await p.locator('#stemSubject').selectOption(subject);await p.locator('#stemQuestion').fill('2x + 3 = 11, x kaçtır?');await p.locator('#stemSolve').click();
  await p.locator('.stem-step--result').waitFor();await p.waitForFunction(()=>!document.querySelector('#stemSolve').disabled);
  assert.ok(await p.locator('.stem-step .katex').count());assert.equal(await p.locator('.stem-step').count(),3);
 }
 const stores=await p.evaluate(async()=>({quizzes:(await App.db.getAll('quizzes')).length,research:(await App.db.getAll('research')).length,reviews:(await App.db.getAll('reviews')).length}));
 assert.deepEqual(stores,{quizzes:0,research:0,reviews:0});
 const backupPrefs=await p.evaluate(async()=>Object.keys((await App.db.exportAll()).prefs));
 assert.equal(backupPrefs.includes('stemToken'),false);assert.equal(backupPrefs.includes('stemServiceUrl'),false);
 const png=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=960;c.height=320;c.getContext('2d').fillRect(0,0,960,320);return c.toDataURL('image/png').split(',')[1]});
 await p.locator('#stemFile').setInputFiles({name:'question.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});await p.locator('#stemPreview').waitFor({state:'visible'});
 await p.locator('#stemRead').click();await p.waitForFunction(()=>document.querySelector('#stemQuestion').value==='2x + 3 = 11');
 await p.waitForFunction(()=>!document.querySelector('#stemRead').disabled);
 assert.equal(await p.locator('#stemAnswer .stem-step').count(),0,'OCR must clear stale answers and must not automatically solve');
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});
  for(const theme of ['light','dark']){
   await p.evaluate(theme=>App.theme.set(theme),theme);
   assert.equal(await p.locator('.stem-page').evaluate(el=>el.scrollWidth>el.clientWidth+1),false,`overflow ${width} ${theme}`);
  }
 }
 await p.setViewportSize({width:390,height:900});await p.screenshot({path:path.join(h.qa,'stem-mobile.png'),animations:'disabled'});
 // Simulated camera checks media lifetime, not physical camera optics.
 await p.evaluate(()=>{navigator.mediaDevices.getUserMedia=async()=>{const c=document.createElement('canvas');c.width=640;c.height=480;c.getContext('2d').fillRect(0,0,640,480);const stream=c.captureStream(1);window.__stemCameraTrack=stream.getTracks()[0];return stream;};});
 await p.locator('#stemCamera').click();await p.locator('#stemSnap').waitFor();await p.waitForFunction(()=>!document.querySelector('#stemSnap').disabled);
 await p.locator('.modal [data-close]').last().click();assert.equal(await p.evaluate(()=>window.__stemCameraTrack.readyState),'ended');
 // A route change cancels a pending solve; a new screen must not receive its result.
 let delayed=false;await p.route('**/solve',async r=>{delayed=true;await new Promise(resolve=>setTimeout(resolve,500));try{await r.fulfill({status:200,contentType:'application/x-ndjson',body:'{"delta":"late"}\n{"done":true}\n'})}catch(e){/* aborted */}});
 await p.locator('#stemSolve').click();await p.waitForFunction(()=>document.querySelector('#stemSolve').disabled);
 await p.evaluate(()=>App.router.go('kartlar'));await p.locator('#cardsChoose').waitFor();await p.waitForTimeout(650);
 assert.equal(await p.locator('#stemAnswer').count(),0);assert.deepEqual(h.errors,[]);
 console.log('STEM UI: four subjects, OCR confirmation, streamed KaTeX cards, no profile/research contamination, cancellation and two themes/320–1440px passed.');
}finally{await h.close();}
