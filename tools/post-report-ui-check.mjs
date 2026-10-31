import assert from 'node:assert/strict';
import path from 'node:path';
import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();
try {
 const {page}=await h.device('bilim-lab');
 const go=r=>navigate(page,r);
 assert.equal(await page.evaluate(()=>App.toolCategories.groupFor('bilim-lab').id),'study');
 for(const r of ['vatandas','gokyuzu','dokunsal-grafik','kesif']) assert.equal(await page.evaluate(r=>App.workspaceNavigation.menuRoute(r),r),'bilim-lab');
 assert.equal(await page.evaluate(()=>App.hub.TOOLS.some(t=>t[0]==='kesif')),false);
 await go('dokunsal-grafik');await page.waitForSelector('#hgExpr');
 assert.equal(await page.evaluate(()=>App.router.current().path),'bilim-lab/grafik');
 await page.fill('#hgExpr','x^2-4');await page.click('#hgDraw');
 await go('kesif');await page.waitForSelector('.science-lab');
 await go('');await page.waitForSelector('#composerInput');
 assert.equal(await page.locator('.ai-favs').count(),0);
 for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});
  await page.fill('#composerInput','Bir soru yazıyorum');
  assert.ok(await page.locator('.composer__send:not(.composer__stop)').isVisible());
  assert.ok(await page.evaluate(()=>document.querySelector('#composer').scrollWidth<=document.querySelector('#composer').clientWidth+1));
 }
 await page.screenshot({path:path.join(h.qa,'assistant-refined.png'),fullPage:true});
 await go('evren');await page.waitForSelector('.ev-summary');
 await page.waitForSelector('#evStage canvas, .ev-load');
 assert.match(await page.locator('.ev-summary').innerText(),/kazanım/);
 await page.locator('.ev-list summary').click();
 await page.fill('#evSearch','zzzzzzzz');assert.match(await page.locator('#evCount').innerText(),/uygun konu yok/);
 await page.fill('#evSearch','');
 await page.screenshot({path:path.join(h.qa,'cosmos-refined.png'),fullPage:true});
 for(const route of ['bilim-lab','evren']) {
  await go(route);
  for(const width of [320,390,768,1440]) {
   await page.setViewportSize({width,height:900});
   assert.ok(await page.evaluate(()=>{const v=document.querySelector('#view');return v.scrollWidth<=v.clientWidth+1;}),route+' overflow at '+width);
  }
 }
 assert.deepEqual(h.errors,[]);
 console.log('Document requests: laboratory grouping, migrated routes, haptic graph, retired workshops, composer at four widths, cosmos filters and responsive layouts passed.');
} finally {await h.close();}
