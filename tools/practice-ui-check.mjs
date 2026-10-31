// Real browser, local deterministic activities. No live AI or physical-device certification.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { uiHarness } from './ui-harness.mjs';
const h = await uiHarness(), report = { flows: [], layouts: [], tour: [] };
try {
  const { page, context } = await h.device('aktarim');
  await page.waitForSelector('.pr-grid');
  async function go(r) { await page.evaluate((r) => App.router.go(r), r); await page.waitForTimeout(220); }
  await page.evaluate(() => { App.ai.generate = async () => { throw new Error('Offline practice must not request AI'); }; });
  const countsBefore = await page.evaluate(async () => Object.fromEntries(await Promise.all(['quizzes','research','reviews','cards'].map(async (s) => [s,(await App.db.getAll(s)).length]))));
  await go('aktarim/calis/oran'); await page.waitForSelector('#prForm');
  await page.locator('.pr-submit').click();
  assert.equal(await page.evaluate(async () => (await App.practice.load('transfer','oran')).responses.length), 0, 'Native form validation requires a choice');
  // An interrupted answer persists and resumes after a genuine reload.
  await page.locator('[name="choice"][value="0"]').check(); await page.locator('.pr-submit').click(); await page.waitForSelector('#prNext');
  await page.reload(); await page.waitForSelector('#prForm');
  assert.match(await page.locator('.pr-progress').innerText(), /2\/3/);
  for (let i = 1; i < 3; i++) { await page.locator('[name="choice"][value="0"]').check(); await page.locator('.pr-submit').click(); await page.waitForSelector('#prNext'); await page.locator('#prNext').click(); if(i<2)assert.equal(await page.evaluate(()=>document.activeElement===document.querySelector('#prForm fieldset')),true,'Next question group receives keyboard focus'); }
  await page.waitForSelector('.pr-result'); assert.match(await page.locator('.pr-result h2').innerText(), /3\/3/); report.flows.push('transfer: validation, three contexts, reload/resume, result');
  // No-network mode is real browser offline, not an AI response fixture.
  await context.setOffline(true);
  await go('hata-avcisi/calis/Fizik'); await page.waitForSelector('#prForm');
  for (let i = 0; i < 3; i++) {
    const key = await page.evaluate(async () => { const s = await App.practice.load('error','Fizik'), q = App.practice.question(s,s.responses.length); return { bad:q.bad, reason:q.reason }; });
    await page.locator('[name="choice"][value="'+key.bad+'"]').check(); await page.locator('[name="reason"][value="'+key.reason+'"]').check();
    await page.locator('.pr-submit').click(); await page.waitForSelector('#prNext'); await page.locator('#prNext').click();
  }
  await page.waitForSelector('.pr-result'); assert.match(await page.locator('.pr-result h2').innerText(),/3\/3/); report.flows.push('error: first step + reason + corrected solution, fully offline');
  const countsAfter = await page.evaluate(async () => Object.fromEntries(await Promise.all(['quizzes','research','reviews','cards'].map(async (s) => [s,(await App.db.getAll(s)).length])))); assert.deepEqual(countsAfter,countsBefore);
  await context.setOffline(false);
  // Simulate one failed state write. The selected answer remains available for retry.
  await go('aktarim/calis/yuzde'); await page.waitForSelector('#prForm');
  await page.evaluate(() => { const put=App.db.put.bind(App.db);let once=true;App.db.put=async (...a)=>{if(once&&a[1]?.kind==='practice-draft'){once=false;throw new Error('simulated disk failure');}return put(...a);}; });
  await page.locator('[name="choice"][value="0"]').check(); await page.locator('.pr-submit').click(); await page.waitForSelector('.pr-error');
  assert.equal(await page.locator('[name="choice"][value="0"]').isChecked(),true); await page.locator('.pr-submit').click(); await page.waitForSelector('#prNext'); report.flows.push('failed write: preserves selection and retries without duplication');
  for (const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:900});
    for (const lang of ['tr','en']) for (const theme of ['dark','light']) {
      await page.evaluate(([l,t])=>{App.i18n.setLang(l);App.theme.set(t);},[lang,theme]);
      for (const route of ['aktarim','aktarim/calis/kuvvet','hata-avcisi','hata-avcisi/calis/Biyoloji','rehber']) {
        await go(route); await page.waitForSelector('.pr-page,.guide-page');
        const over=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);assert.ok(over<=1,route+' @'+width+' '+lang+' '+theme+' overflow '+over);
        report.layouts.push({route,width,lang,theme,overflow:over});
      }
    }
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{App.i18n.setLang('tr');App.theme.set('dark');});
  console.log('Practice UI: offline, resume, retry and '+report.layouts.length+' responsive language/theme layouts passed.');
  await go('aktarim/calis/dogrusal'); await page.waitForSelector('#prForm'); await page.screenshot({path:path.join(h.qa,'practice-mobile.png'),fullPage:true});
  await go('hata-avcisi/calis/Matematik'); await page.waitForSelector('#prForm'); await page.screenshot({path:path.join(h.qa,'error-hunt-mobile.png'),fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await go('rehber');await page.screenshot({path:path.join(h.qa,'guide-desktop.png'),fullPage:true});
  // All tour steps: navigation, real targets/fallbacks, keyboard, sections, escape.
  await page.evaluate(()=>App.tour.start(0)); const total=await page.evaluate(()=>App.tour.steps.length);assert.ok(total>=40);
  for(let i=0;i<total;i++) {
    try { await page.waitForFunction((i)=>App.tour.current()===i&&document.querySelector('.tour__card:not(.is-moving)'),i,{timeout:12000}); }
    catch(e) { throw new Error('Tour step '+i+' did not settle: '+JSON.stringify(await page.evaluate(()=>({step:App.tour.current(),route:location.hash,active:App.tour.isActive(),card:document.querySelector('.tour__card')?.className}))),{cause:e}); }
    const text=await page.locator('.tour__body').innerText();assert.ok(text.trim().length>25&&!/tour\.\w+\.(title|text)/.test(text));report.tour.push({i,text:text.slice(0,90)});
    if(i<total-1)await page.locator('[data-tour="next"]').click();
  }
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!App.tour.isActive());
  console.log('Tour: all '+total+' steps opened with complete copy.');
  for(const size of [{width:320,height:568},{width:390,height:844},{width:768,height:600},{width:1440,height:900}]) {
    await page.setViewportSize(size);await page.evaluate(()=>App.tour.start(0));await page.waitForSelector('#tourSection');
    for(const step of await page.evaluate(()=>App.tour.sections.map(s=>s.step))) {
      await page.locator('#tourSection').selectOption(String(step));await page.waitForFunction((s)=>App.tour.current()===s&&document.querySelector('.tour__card:not(.is-moving)'),step);
      const r=await page.locator('.tour__card').boundingBox();assert.ok(r.x>=-1&&r.y>=-1&&r.x+r.width<=size.width+1&&r.y+r.height<=size.height+1,'tour overflow '+JSON.stringify({size,step,r}));
    }
    await page.keyboard.press('Escape');await page.waitForFunction(()=>!App.tour.isActive());await page.waitForTimeout(250);
  }
  assert.deepEqual(h.errors,[]);report.errors=h.errors;
  fs.writeFileSync(path.join(h.qa,'practice-ui-report.json'),JSON.stringify(report,null,2));
  console.log('Practice UI: '+report.layouts.length+' layouts, '+total+' tour steps, offline/resume/retry flows and isolation passed.');
} finally {await h.close();}
