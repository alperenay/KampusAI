// Synthetic native bridge + SSE fixtures. This tests UI contracts, not model accuracy.
import assert from 'node:assert/strict';import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness();
try{
 const context=await h.browser.newContext({serviceWorkers:'block'});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 await context.addInitScript(()=>{
  localStorage.setItem('da:pref:tourDone','true');window.__calls=[];
  let state={kurulu:false,asama:'yok',destek:true},notify=()=>{};
  window.desktopApp={stem:{status:async()=>state,onProgress:f=>{notify=f;return()=>{};},download:async()=>{window.__calls.push('download');state={...state,asama:'iniyor',toplam:100,indirilen:30};notify(state);await new Promise(r=>setTimeout(r,100));state={...state,asama:'kurulu',kurulu:true,indirilen:100};notify(state);return state;},start:async()=>{window.__calls.push('start');state={...state,asama:'hazir',adresler:{sohbet:'http://127.0.0.1:9876'}};notify(state);return state;},remove:async()=>{state={...state,kurulu:false,asama:'yok'};notify(state);return state;},cancel:async()=>state}};
 });
 const p=await context.newPage();p.on('pageerror',e=>h.errors.push(e.message));let bad=false,requests=0;
 await p.route('http://127.0.0.1:9876/**',async r=>{
  requests++;const body=r.request().postDataJSON();assert.equal(body.model,'kampusai-stem-v2');assert.equal(body.max_tokens,768);assert.equal(JSON.stringify(body).includes('images'),false);
  const events=[{choices:[{delta:{content:'Adım 1: $2x=8$.\nSonuç: $x=4$'}}]}];if(!bad)events.push({choices:[{finish_reason:'stop',delta:{}}]});
  await r.fulfill({contentType:'text/event-stream',body:events.map(x=>'data: '+JSON.stringify(x)+'\n\n').join('')+'data: [DONE]\n\n'});
 });
 await p.goto(h.baseUrl+'/#/sayisal');await p.locator('#stemDownload').waitFor();
 assert.equal(await p.locator('#stemMode').inputValue(),'auto');await p.locator('#stemDownload').click();await p.waitForFunction(()=>App.stemRuntime.state()?.kurulu===true);
 assert.equal(await p.locator('#stemMode').inputValue(),'device');
 await p.locator('#stemQuestion').fill('2x+3=11 denkleminde x?');await p.locator('#stemSolve').click();await p.waitForFunction(()=>document.querySelector('#stemAnswer .katex'));
 assert.equal(requests,1);assert.deepEqual(await p.evaluate(()=>window.__calls),['download','start']);
 await p.waitForFunction(()=>!document.querySelector('#stemSolve').disabled);bad=true;await p.locator('#stemSolve').click();await p.waitForFunction(()=>document.querySelector('#stemStatus').classList.contains('stem-error'));assert.match(await p.locator('#stemStatus').innerText(),/tamamlanmadı/);
 await p.waitForFunction(()=>!document.querySelector('#stemSolve').disabled);await p.locator('#stemMode').selectOption('cloud');const before=requests;await p.locator('#stemSolve').click();await p.waitForFunction(()=>document.querySelector('#stemStatus').textContent.includes('henüz etkin değil'));assert.equal(requests,before,'Unconfigured cloud must not transmit a question or substitute Gemini');
 await p.waitForFunction(()=>!document.querySelector('#stemSolve').disabled);await p.locator('#stemRemove').click();await p.waitForFunction(()=>!App.stemRuntime.state().kurulu);
 for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});assert.equal(await p.locator('.stem-page').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);}
 assert.deepEqual(h.errors,[]);console.log('STEM device UI: download/progress, local-only SSE+KaTeX, explicit incomplete response, removal, unavailable cloud without transmission/fallback and responsive widths passed.');
 await context.close();
}finally{await h.close();}
