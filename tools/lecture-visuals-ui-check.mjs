import assert from 'node:assert/strict';
import path from 'node:path';
import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness();
try{
 const {page}=await h.device('konular/9/edebiyat/u1/k1');await page.waitForSelector('.lesson-main');
 const examples=await page.evaluate(()=>['biyoloji','fizik','kimya','matematik'].map(subject=>{
  const row=App.learnmap.allOutcomes().find(x=>x.subject.id===subject&&(x.outcome.content||x.outcome.curatedContent));
  return row?.key;
 }).filter(Boolean));assert.equal(examples.length,4);
 const go=async key=>{await page.evaluate(key=>App.router.go('konular/'+key),key);await page.waitForSelector('.gv-visual');await page.waitForTimeout(80);};
 await page.waitForFunction(()=>!App.startup.active);
 await go(examples[0]);
 const initial=await page.locator('[data-gv-recipe]').count();assert.ok(initial>0,'Below-fold visual SVG is not constructed at lesson startup');
 assert.equal(await page.locator('.gv-visual svg').count(),0);
 const figure=page.locator('.gv-visual').first();await figure.scrollIntoViewIfNeeded();
 await page.waitForSelector('.gv-visual[data-gv-ready] svg');assert.equal(await page.locator('.gv-visual[data-gv-ready] svg').first().getAttribute('role'),'img');
 await page.locator('[data-gv-expand]').first().click();await page.waitForSelector('.gv-lightbox');
 const conceptMap=await page.locator('.gv-lightbox .gv-node').count();
 if(conceptMap){assert.ok((await page.locator('.gv-lightbox .modal__head h2').textContent()).replace(/^(Kavram haritası|Concept map):\s*/, '').trim().length>0);assert.match(await page.locator('.gv-detail-caption').textContent(),/kapatıp|Close this viewer/);}
 await page.click('[data-gv-zoom=in]');await page.click('[data-gv-zoom=in]');assert.equal(await page.locator('.gv-detail-stage').getAttribute('data-zoom'),'1.5');
 await page.locator('.gv-detail-stage').focus();await page.keyboard.press('+');assert.equal(await page.locator('.gv-detail-stage').getAttribute('data-zoom'),'1.75');await page.keyboard.press('0');assert.equal(await page.locator('.gv-detail-stage').getAttribute('data-zoom'),'1');
 // Browser pointer events carry two independently tracked touch IDs: no native hardware claim.
 await page.locator('.gv-detail-stage').evaluate(stage=>{
  const send=(type,id,x,y)=>stage.dispatchEvent(new PointerEvent(type,{pointerId:id,pointerType:'touch',bubbles:true,clientX:x,clientY:y,button:0}));
  send('pointerdown',1,100,100);send('pointerdown',2,200,100);send('pointermove',2,300,100);send('pointerup',1,100,100);send('pointerup',2,300,100);
 });assert.equal(await page.locator('.gv-detail-stage').getAttribute('data-zoom'),'2');
 for(let i=0;i<12;i++)await page.click('[data-gv-zoom=in]');assert.equal(await page.locator('.gv-detail-stage').getAttribute('data-zoom'),'4');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.gv-lightbox').count(),0);
 assert.equal(await page.evaluate(()=>document.activeElement.matches('[data-gv-expand]')),true,'Closing restores keyboard focus');
 for(const theme of ['light','dark'])for(const width of [320,768,1440]){
  await page.evaluate(theme=>App.theme.set(theme),theme);await page.setViewportSize({width,height:900});
  await page.locator('[data-gv-expand]').first().click();await page.waitForSelector('.gv-lightbox');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,theme+' '+width);
  assert.ok(await page.locator('.gv-detail-stage svg').evaluate(el=>el.getBoundingClientRect().width>200));
  await page.locator('.gv-lightbox [data-close]').click();
 }
 await page.setViewportSize({width:1440,height:1000});
 for(const key of examples){await go(key);await page.locator('.gv-visual').first().scrollIntoViewIfNeeded();await page.waitForSelector('[data-gv-ready] svg');
  const refs=await page.evaluate(()=>[...document.querySelectorAll('.gv-visual svg [marker-end]')].every(el=>document.getElementById(el.getAttribute('marker-end').slice(5,-1))));assert.equal(refs,true,'All SVG arrow marker references resolve');
 }
 // A manual loader remains available with IntersectionObserver pending; route cleanup closes the viewer.
 await page.locator('[data-gv-expand]').first().click();await page.evaluate(()=>App.router.go('bugun'));await page.waitForSelector('.tday-grid');assert.equal(await page.locator('.gv-lightbox').count(),0);
 await go(examples[1]);await page.locator('.gv-visual').first().scrollIntoViewIfNeeded();await page.waitForSelector('[data-gv-ready] svg');await page.locator('[data-gv-expand]').first().click();await page.waitForTimeout(350);await page.screenshot({path:path.join(h.qa,'lecture-detail.png')});await page.keyboard.press('Escape');
 const claims=await page.evaluate(()=>{const host=document.createElement('div');App.gorsel.galeri(host);const ids=[...host.querySelectorAll('[id]')].map(el=>el.id);if(new Set(ids).size!==ids.length)throw new Error('Duplicate vector marker IDs');if(host.querySelectorAll('svg').length<30)throw new Error('Figure gallery unexpectedly empty');return host.textContent;});assert.ok(!claims.includes('36–38'));assert.ok(!claims.includes('~37 °C'));
 await go(examples[0]);await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));assert.equal(await page.locator('[data-gv-recipe]').count(),0,'Print constructs every deferred figure');
 await page.evaluate(()=>{window.__io=window.IntersectionObserver;window.IntersectionObserver=undefined;App.router.refresh();});await page.waitForTimeout(150);assert.equal(await page.locator('[data-gv-recipe]').count(),0,'No-observer fallback remains usable');await page.evaluate(()=>{window.IntersectionObserver=window.__io;delete window.__io;});
 assert.deepEqual(h.errors,[]);console.log(h.engineName+': four subject figures, lazy SVGs, marker IDs, semantic captions, zoom/keyboard/two-pointer pinch, 320–1440px themes, route cleanup and cautious scientific labels passed.');
}finally{await h.close();}
