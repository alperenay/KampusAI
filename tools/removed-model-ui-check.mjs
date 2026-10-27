import assert from 'node:assert/strict';import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness();
try{
 const context=await h.browser.newContext({serviceWorkers:'block'});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 await context.addInitScript(()=>{
  localStorage.setItem('da:pref:tourDone','true');
  for(const key of ['stemToken','stemServiceUrl','stemMode'])localStorage.setItem('da:pref:'+key,JSON.stringify('retired-fixture'));
  localStorage.setItem('da:pref:oaKey',JSON.stringify('existing-key-fixture'));
 });
 const page=await context.newPage();page.on('pageerror',e=>h.errors.push(e.message));
 await page.goto(h.baseUrl+'/#/sohbet');await page.waitForFunction(()=>window.App&&App.engine&&App.research&&App.adaptive&&App.metacognition&&App.scaffolding);
 assert.equal(await page.locator('a[href="#/sayisal"]').count(),0);
 const state=await page.evaluate(()=>({removed:['stemToken','stemServiceUrl','stemMode'].map(k=>localStorage.getItem('da:pref:'+k)),other:App.prefs.get('oaKey'),module:typeof App.stem,runtime:typeof App.stemRuntime,gemini:!!App.cloud.gemini,server:!!App.cloud.server,local:!!App.engine.local}));
 assert.deepEqual(state,{removed:[null,null,null],other:'existing-key-fixture',module:'undefined',runtime:'undefined',gemini:true,server:true,local:true});
 assert.deepEqual(h.errors,[]);await context.close();console.log('Removed custom model UI/settings verified; Gemini, server/local assistants and adaptive/research/scaffolding modules preserved.');
}finally{await h.close();}
