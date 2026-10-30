import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness(), layouts=[];
try {
  const {page}=await h.device('araclar');
  await page.evaluate(()=>App.startup.dismiss());
  const style=selector=>page.locator(selector).first().evaluate(el=>{const c=getComputedStyle(el);return {blur:c.backdropFilter||c.webkitBackdropFilter,bg:c.backgroundColor,image:c.backgroundImage,shadow:c.boxShadow,border:c.borderBottomWidth};});
  for(const theme of ['dark','light'])for(const width of [320,390,768,1440]) {
    await page.evaluate(theme=>App.theme.set(theme),theme);await page.setViewportSize({width,height:900});
    for(const route of ['araclar','bugun','notlar','konular/9/edebiyat/u1/k1']) {
      await navigate(page,route);await page.waitForTimeout(120);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,theme+' '+width+' '+route);
      layouts.push({theme,width,route});
    }
    await navigate(page,'araclar');
    const toolbar=await style('.topbar');
    assert.equal(toolbar.bg,'rgba(0, 0, 0, 0)','Toolbar blends into the app background');
    assert.equal(toolbar.blur,'none');assert.equal(toolbar.shadow,'none');assert.equal(toolbar.border,'0px');
    const tile=await style('.hub-tile');assert.equal(tile.blur,'none','Cards do not allocate blur layers');assert.match(tile.image,/linear-gradient/);
    if(width===390||width===1440) {
      await page.waitForTimeout(600);
      await page.screenshot({path:path.join(h.qa,'glass-'+theme+'-'+width+'.png')});
    }
  }
  await page.setViewportSize({width:1440,height:900});
  assert.match((await style('.sidebar')).blur,/blur\(16px\)/);
  await page.setViewportSize({width:390,height:844});await page.click('#menuBtn');await page.waitForTimeout(350);
  assert.match((await style('.sidebar')).blur,/blur\(8px\)/);
  await page.click('.sidebar-close');
  await page.evaluate(()=>window.__nativeInsets({top:28,bottom:48}));
  const toolbar=await page.locator('.topbar').boundingBox();assert.ok(toolbar.y>=28,'Toolbar clears the native status bar');
  await page.click('#quickBtn');await page.waitForSelector('#quickPanel:not([hidden])');await page.click('#quickBtn');
  await page.click('#menuBtn');
  await page.click('#profileBtn');await page.waitForSelector('.modal');
  assert.match((await style('.modal')).blur,/blur\(8px\)/);
  await page.locator('.modal-backdrop [data-close]').last().click();
  await page.evaluate(()=>document.documentElement.classList.add('lite'));
  assert.equal((await style('.sidebar')).blur,'none');assert.ok(!/rgba\([^)]*,\s*0\./.test((await style('.sidebar')).bg),'Lite frame is opaque');
  await page.evaluate(()=>{document.documentElement.classList.remove('lite');document.documentElement.setAttribute('data-a11y-contrast','');});
  assert.equal((await style('.sidebar')).blur,'none');assert.equal((await style('.hub-tile')).image,'none');
  await page.evaluate(()=>document.documentElement.removeAttribute('data-a11y-contrast'));
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>App.motion.reduced());
  assert.deepEqual(h.errors,[]);
  fs.writeFileSync(path.join(h.qa,'glass-report.json'),JSON.stringify({engine:h.engineName,layouts,frameBlur:{desktop:16,mobile:8},cardBlur:false,liteSolid:true,highContrast:true,errors:h.errors},null,2));
  console.log(h.engineName+': 32 glass layouts, 16/8px frame blur, no nested card blur, solid lite fallback, high contrast and reduced motion passed.');
} finally {await h.close();}
