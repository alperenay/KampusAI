import assert from 'node:assert/strict';import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness();
try{
 for(const mode of ['normal','system-reduce','saved-reduce','keyboard']){
  const c=await h.browser.newContext({serviceWorkers:'block',reducedMotion:mode==='system-reduce'?'reduce':'no-preference'});
  await c.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  await c.addInitScript(mode=>{localStorage.setItem('da:pref:tourDone','true');if(mode==='saved-reduce')localStorage.setItem('da:pref:a11yMotion','true');window.__startupTrace=[];new MutationObserver(rows=>{for(const row of rows){for(const n of row.addedNodes)if(n.nodeType===1&&n.classList.contains('startup-brand')){window.__startupTrace.push('added');if(mode==='keyboard')dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));}for(const n of row.removedNodes)if(n.nodeType===1&&n.classList.contains('startup-brand'))window.__startupTrace.push('removed');}}).observe(document,{subtree:true,childList:true});},mode);
  const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(h.baseUrl+'/#/');await p.waitForSelector('[data-ai-favs]');
  await p.waitForFunction(()=>!App.startup.active);assert.equal(await p.locator('.startup-brand').count(),0);
  const trace=await p.evaluate(()=>window.__startupTrace);assert.deepEqual(trace,mode.includes('reduce')?[]:['added','removed']);
  await p.evaluate(()=>App.router.go('araclar'));await p.waitForSelector('#hubQ');assert.deepEqual(await p.evaluate(()=>window.__startupTrace),trace,'No replay on navigation');assert.deepEqual(errors,[]);await c.close();
 }
 console.log(h.engineName+': startup renders/cleans, route changes do not replay, keyboard skip and system/saved reduced motion passed.');
}finally{await h.close();}
