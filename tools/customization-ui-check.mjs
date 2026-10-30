import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();let layouts=0;
try{
  const {page}=await h.device('araclar');await page.evaluate(()=>App.startup.dismiss());
  const read=selector=>page.locator(selector).first().evaluate(el=>{const c=getComputedStyle(el);return{bg:c.backgroundColor,shadow:c.boxShadow,blur:c.backdropFilter||c.webkitBackdropFilter,font:c.fontFamily,size:c.fontSize,line:c.lineHeight};});
  await page.evaluate(()=>App.appearance.open());
  assert.equal(await page.locator('[data-ui-choice]').count(),12);assert.equal(await page.locator('[data-atmosphere-choice]').count(),8);
  await page.click('[data-ui-choice="teal"]');await page.click('[data-appearance-tab="layout"]');
  await page.selectOption('[data-appearance-option="style"]','outline');
  await page.selectOption('[data-appearance-option="corners"]','sharp');
  await page.click('[data-appearance-tab="reading"]');await page.selectOption('[data-appearance-option="font"]','serif');
  await page.click('[data-appearance-tab="effects"]');await page.selectOption('[data-appearance-option="motion"]','gentle');
  await page.uncheck('[data-appearance-option="intro"]');
  const before=await page.evaluate(()=>App.appearance.options());await page.reload();await page.waitForFunction(()=>!!App.appearance);
  assert.deepEqual(await page.evaluate(()=>App.appearance.options()),before);assert.equal(await page.evaluate(()=>App.startup.active),false);
  await page.evaluate(()=>App.appearance.update({font:'system',motion:'off'}));
  const palettes=await page.evaluate(()=>App.appearance.palettes.map(p=>p.id));
  for(const theme of ['dark','light'])for(const palette of palettes)for(const style of ['glass','clean','soft','outline','paper']){
    await page.evaluate(({theme,palette,style})=>{App.theme.set(theme);App.appearance.update({palette,style});},{theme,palette,style});
    for(const width of [320,1440]){
      await page.setViewportSize({width,height:900});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,theme+' '+palette+' '+style+' '+width);
      const bar=await read('.topbar');assert.equal(bar.bg,'rgba(0, 0, 0, 0)');assert.equal(bar.shadow,'none');
      if(style!=='glass')assert.equal((await read('.sidebar')).blur,'none');
      layouts++;
    }
  }
  await page.evaluate(()=>App.appearance.update({style:'glass',blur:'off',shadows:false}));
  assert.equal((await read('.sidebar')).blur,'none');assert.equal((await read('.hub-tile')).shadow,'none');
  await page.evaluate(()=>App.appearance.update({blur:'subtle'}));assert.match((await read('.sidebar')).blur,/blur\(6px\)/);
  await page.evaluate(()=>{document.documentElement.classList.add('lite');App.appearance.update({blur:'normal'});});
  assert.equal((await read('.sidebar')).blur,'none');await page.evaluate(()=>document.documentElement.classList.remove('lite'));
  await page.setViewportSize({width:320,height:720});await page.evaluate(()=>window.__nativeInsets({top:44,bottom:48}));
  await navigate(page,'konular/9/matematik/t1/k1');
  await page.waitForSelector('.lesson__body.md');
  for(const font of ['system','humanist','rounded','serif','mono']){
    await page.evaluate(font=>App.appearance.update({font,readingFont:'serif',readingSize:'extra',lineHeight:'wide',readingWidth:'wide',tracking:'wide',density:'roomy'}),font);
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('.lesson__body.md')).fontSize==='21px');
    assert.equal((await read('.lesson__body.md')).size,'21px');assert.equal((await read('.lesson__body.md')).line,'42px');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'Large reading '+font);
  }
  await page.evaluate(()=>{document.documentElement.setAttribute('data-a11y-dys','');document.documentElement.setAttribute('data-a11y-spacing','');document.documentElement.setAttribute('data-a11y-contrast','');});
  assert.match((await read('.lesson__body.md')).font,/OpenDyslexic/);assert.ok(Math.abs(parseFloat((await read('.lesson__body.md')).line)-40.95)<.1);
  assert.equal((await read('.sidebar')).blur,'none');
  await page.evaluate(()=>{['data-a11y-dys','data-a11y-spacing','data-a11y-contrast'].forEach(a=>document.documentElement.removeAttribute(a));});
  await page.evaluate(()=>App.appearance.open('effects'));
  const bounds=await page.locator('.modal--appearance').boundingBox();assert.ok(bounds.y>=44-1);assert.ok(bounds.y+bounds.height<=720-48+1);
  await page.selectOption('[data-appearance-option="motion"]','full');await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>App.motion.reduced()&&!document.documentElement.hasAttribute('data-ambient-running'));assert.equal(await page.evaluate(()=>document.documentElement.hasAttribute('data-ambient-running')),false);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.click('[data-appearance-reset]');assert.equal(await page.evaluate(()=>App.appearance.options().palette),'cosmic');
  assert.equal(await page.evaluate(()=>App.theme.current),'light','Reset does not change light/dark mode');
  await page.locator('.modal-backdrop [data-close]').last().click();
  await page.evaluate(()=>{const original=Storage.prototype.setItem;window.restoreStorage=()=>Storage.prototype.setItem=original;Storage.prototype.setItem=()=>{throw new Error('blocked');};App.appearance.update({palette:'cherry',font:'mono'});});
  assert.equal(await page.evaluate(()=>App.appearance.options().palette),'cherry');await page.evaluate(()=>window.restoreStorage());
  await page.evaluate(()=>App.appearance.update({...KampusAppearanceConfig.defaults,palette:'ocean'}));
  // Unknown values from old/corrupt preferences fall back instead of entering CSS.
  assert.equal(await page.evaluate(()=>App.appearance.options().palette),'cosmic');
  await navigate(page,'araclar');await page.evaluate(()=>App.appearance.open('reading'));
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.appearance-backdrop')).opacity==='1');
  await page.screenshot({path:path.join(h.qa,'customization-mobile.png')});
  await page.setViewportSize({width:1440,height:1000});await page.click('[data-appearance-tab="colours"]');
  await page.screenshot({path:path.join(h.qa,'customization-desktop.png')});
  assert.deepEqual(h.errors,[]);
  fs.writeFileSync(path.join(h.qa,'customization-report.json'),JSON.stringify({engine:h.engineName,layouts,fonts:5,persistence:true,nativeInsets:true,accessibility:true,blockedStorage:true,errors:h.errors},null,2));
  console.log(h.engineName+': '+layouts+' palette/style/theme/width layouts, typography, persistence, safe-area dialog, effects, accessibility, reset and blocked-storage passed.');
}finally{await h.close();}
