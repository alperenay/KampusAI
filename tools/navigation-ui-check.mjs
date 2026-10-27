// Real browser: feature discovery, map filtering, route links and responsive layout.
import assert from 'node:assert/strict';
import path from 'node:path';
import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness();
try {
 const {page}=await h.device();
 await page.setViewportSize({width:1280,height:900});
 assert.equal(await page.locator('.home .quick, .home .home-pins, .home .study-card, [data-home-today]').count(),0);
 const missing=await page.evaluate(()=>App.hub.TOOLS.filter(x=>!document.querySelector('#sidebar a[data-route="'+x[0]+'"]')).map(x=>x[0]));
 assert.deepEqual(missing,[], 'Every standalone tool must have a sidebar entry');
 await page.fill('#navFilter','duello');
 assert.equal(await page.locator('#sidebar a.nav__item:visible').count(),1);
 await page.click('#sidebar a[data-route="duello"]');
 await page.waitForSelector('#duJoin');
 assert.equal(await page.inputValue('#navFilter'),'');
 await page.fill('#navFilter','arastirma');
 await page.locator('#navFilter').press('Enter');
 await page.waitForURL('**/#/arastirma');
 await page.evaluate(()=>App.router.go('evren/9/matematik'));
 await page.waitForSelector('#evInfo .ev-acts');
 const hasGL=await page.evaluate(()=>App.lab3d.supported());
 if(hasGL) await page.waitForSelector('.ev-stage canvas');
 else { assert.match(await page.locator('#evStage').innerText(),/3B görüntü açılamıyor/); console.log('WebGL unavailable: topic-list fallback tested; no 3D rendering claim.'); }
 assert.equal(await page.locator('.ev-li[aria-pressed="true"]').count(),1);
 await page.locator('.ev-list').evaluate(el=>{el.open=true;});
 await page.selectOption('#evUnit','0');
 assert.ok(await page.locator('.ev-list li:not([hidden])').count()>0);
 assert.ok(await page.locator('.ev-list li:not([hidden])').count()<await page.locator('.ev-li').count());
 await page.fill('#evSearch','zzzzz-no-topic');
 assert.equal(await page.locator('.ev-list li:not([hidden])').count(),0);
 assert.match(await page.locator('#evCount').innerText(),/uygun konu yok/);
 await page.fill('#evSearch','');await page.selectOption('#evUnit','');
 await page.selectOption('#evStatus','weak');
 assert.equal(await page.locator('.ev-list li:not([hidden])').count(),0,'Fresh profile has no weak topics');
 await page.selectOption('#evStatus','unknown');
 assert.equal(await page.locator('.ev-list li:not([hidden])').count(),await page.locator('.ev-li').count());
 await page.selectOption('#evStatus','');
 await page.locator('.ev-li').nth(4).click();
 const selected=await page.locator('.ev-li[aria-pressed="true"]').getAttribute('data-k');
 assert.equal(await page.locator('#evInfo a').first().getAttribute('href'),'#/konular/'+selected);
 if(hasGL) { await page.click('#evRotate');assert.equal(await page.getAttribute('#evRotate','aria-pressed'),'true');
 await page.click('#evRotate');assert.equal(await page.getAttribute('#evRotate','aria-pressed'),'false'); }
 else assert.equal(await page.locator('#evRotate').isDisabled(),true);
 for(const width of [320,390,768,1280]) {
  await page.setViewportSize({width,height:900});
  await page.waitForTimeout(350);
  const over=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert.ok(over<=1,'Cosmos overflow @'+width+': '+over);
  await page.screenshot({path:path.join(h.qa,'cosmos-'+width+'.png'),fullPage:true});
 }
 await page.setViewportSize({width:1280,height:900});
 await page.evaluate(()=>App.i18n.setLang('en'));await page.waitForTimeout(150);
 assert.equal(await page.locator('[data-nav-label="cosmos"]').innerText(),'Knowledge Cosmos');
 await page.fill('#navFilter','no-such-feature');assert.equal(await page.locator('#navEmpty').isVisible(),true);
 await page.locator('#navFilter').press('Escape');assert.equal(await page.locator('#navEmpty').isVisible(),false);
 await page.evaluate(()=>App.i18n.setLang('tr'));
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(350);
 await page.click('#menuBtn');await page.fill('#navFilter','bilgi evreni');
 await page.click('#sidebar a[data-route="evren"]');
 await page.waitForFunction(()=>!document.querySelector('#app').classList.contains('is-menu-open'));
 await page.waitForSelector('#evInfo .ev-acts');
 // An unavailable 3D engine must leave the entire searchable topic workflow usable.
 await page.evaluate(()=>{App.lab3d.supported=()=>false;App.router.go('evren/10/fizik');});
 await page.waitForFunction(()=>document.querySelector('#evStage').textContent.includes('3B görüntü açılamıyor'));
 await page.locator('.ev-list').evaluate(el=>{el.open=true;});await page.locator('.ev-li').first().click();
 assert.equal(await page.locator('#evInfo .ev-acts a').count(),2);
 assert.deepEqual(h.errors,[]);
 console.log(h.engineName+': full menu catalogue, search/keyboard/language, clean home, cosmos selection/filter/rotation, 320–1280 px and no-WebGL fallback passed.');
} finally {await h.close();}

