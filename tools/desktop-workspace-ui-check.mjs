import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();
try {
  const {page}=await h.device();
  await page.evaluate(()=>App.startup.dismiss());
  await page.setViewportSize({width:1440,height:900});
  const links=page.locator('#desktopNav a');
  assert.deepEqual(await links.evaluateAll(els=>els.map(a=>a.getAttribute('href'))),['#/konular','#/bilim-lab','#/','#/kure','#/program']);
  assert.equal(await links.count(),5);
  const firstRoute=await page.evaluate(()=>App.router.current().path);
  await links.nth(3).hover();
  assert.equal(await page.evaluate(()=>App.router.current().path),firstRoute,'Hover previews indicator without changing the page');
  for(const [i,route] of ['konular','bilim-lab','','kure','program'].entries()) {
    await links.nth(i).click();
    await page.waitForFunction(r=>App.router.current().path===r,route);
    await page.waitForFunction(route=>document.querySelector('#desktopNav [aria-current="page"]')?.getAttribute('href')==='#/'+route,route);
    assert.equal(await page.locator('#desktopNav [aria-current]').getAttribute('href'),'#/'+route);
  }
  await links.nth(0).focus();await page.keyboard.press('ArrowRight');assert.ok(await links.nth(1).evaluate(el=>el===document.activeElement));
  await page.keyboard.press('End');assert.ok(await links.nth(4).evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Home');await page.keyboard.press('Enter');await page.waitForFunction(()=>App.router.current().name==='konular');
  await navigate(page,'dokumanlar');await page.mouse.move(0,0);await links.nth(0).blur();await page.waitForFunction(()=>document.querySelector('#desktopNav .desktop-nav__indicator').hidden);
  await page.click('#desktopAppearance');await page.waitForSelector('[data-ui-choice="olive"]');await page.click('[data-ui-choice="olive"]');
  await page.locator('.modal-backdrop [data-close]').last().click();
  await page.reload();await page.waitForSelector('#desktopNav');assert.equal(await page.evaluate(()=>App.appearance.options().palette),'olive');
  let layouts=0;
  for(const theme of ['light','dark'])for(const width of [320,860,1099,1100,1280,1440,1920]) {
    await page.setViewportSize({width,height:900});await page.evaluate(theme=>App.theme.set(theme),theme);
    await navigate(page,'bilim-lab');
    assert.equal(await page.locator('#desktopNav').isVisible(),width>=1100);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,theme+' '+width);
    if(width>=1100) {
      const boxes=await links.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return{l:r.left,r:r.right};}));
      for(let i=1;i<boxes.length;i++)assert.ok(boxes[i].l>=boxes[i-1].r-1,'No overlapping links');
      assert.ok(boxes[4].r<=width);
    }
    layouts++;
  }
  await page.setViewportSize({width:1440,height:900});
  for(const palette of await page.evaluate(()=>App.appearance.palettes.map(p=>p.id))) {
    await page.evaluate(palette=>App.appearance.update({palette}),palette);await navigate(page,'konular');
    assert.ok(await page.locator('#desktopNav a.is-current').isVisible());
  }
  await page.emulateMedia({reducedMotion:'reduce'});await links.nth(4).hover();await page.waitForTimeout(100);
  assert.equal(await page.locator('.desktop-nav__indicator').evaluate(el=>el.getAnimations().length),0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>App.appearance.update({palette:'olive',atmosphere:'sunrise'}));
  await navigate(page,'bilim-lab');await page.mouse.move(0,0);await page.waitForTimeout(450);
  await page.screenshot({path:path.join(h.qa,'desktop-workspace.png'),fullPage:true});
  assert.deepEqual(h.errors,[]);
  fs.writeFileSync(path.join(h.qa,'desktop-workspace-report.json'),JSON.stringify({engine:h.engineName,layouts,palettes:12,errors:h.errors},null,2));
  console.log(h.engineName+': five ordered desktop routes, keyboard/hover, settings persistence, 12 palettes, reduced motion and '+layouts+' responsive layouts passed.');
} finally {await h.close();}
