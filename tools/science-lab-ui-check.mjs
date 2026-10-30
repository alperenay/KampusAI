import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { uiHarness, navigate } from './ui-harness.mjs';
const h=await uiHarness();
try {
  const {page}=await h.device('bilim-lab'), go=r=>navigate(page,r);
  await page.waitForSelector('.science-lab');
  assert.equal(await page.locator('#view h1').count(),1);
  const tools=await page.evaluate(()=>App.hub.TOOLS.map(t=>t[0]));
  assert.ok(tools.includes('bilim-lab'));
  for(const old of ['lab','sensor','telefon-fizik','sismograf']) assert.ok(!tools.includes(old));
  for(const [old,target,selector] of [
    ['lab/atis','deneyler/atis','#labHost'], ['sensor','sensor','.sl-card'], ['sensor/olcum','sensor/olcum','#swStart'],
    ['telefon-fizik','fizik','#ppCompute'], ['sismograf','titresim','#sgSim'],
  ]) { await go(old); assert.equal(await page.evaluate(()=>App.router.current().path),'bilim-lab/'+target); await page.waitForSelector(selector); }
  for (const id of ['rc','cooling','halfLife','polarization']) {
    await go('bilim-lab/modeller/'+id);
    assert.match(await page.locator('#scienceModelStatus').innerText(),/201/);
    const dl=page.waitForEvent('download'); await page.click('#scienceModelJSON');
    const file=await dl, dest=path.join(h.qa,'science-'+id+'.json'); await file.saveAs(dest);
    const data=JSON.parse(fs.readFileSync(dest,'utf8')); assert.equal(data.source,'simulation'); assert.equal(data.experiment,id); assert.equal(data.samples.length,201);
    await page.click('#scienceModelReport'); await page.waitForSelector('#srSource');
    assert.equal(await page.inputValue('#srSource'),'simulation');
    assert.equal(await page.inputValue('#srName'),data.name);
  }
  await go('bilim-lab/modeller/rc');
  await page.fill('[data-model-param="resistance"]','-1');
  assert.ok(await page.locator('#scienceModelJSON').isDisabled());
  await page.evaluate(()=>document.querySelector('#scienceModelForm').dispatchEvent(new Event('submit',{cancelable:true})));
  assert.match(await page.locator('#scienceModelStatus').innerText(),/Geçerli/);
  await page.fill('[data-model-param="resistance"]','20'); await page.click('#scienceModelForm button');
  assert.match(await page.locator('#scienceModelResult').innerText(),/2.0000 s/);
  const csv=page.waitForEvent('download'); await page.click('#scienceModelCSV');
  const csvFile=await csv, csvPath=path.join(h.qa,'science-rc.csv'); await csvFile.saveAs(csvPath); assert.match(fs.readFileSync(csvPath,'utf8'), /V,simulation/);

  // Explicit simulation, report transfer and background pause; no physical hardware claim.
  await go('sensor/olcum');
  await page.selectOption('#swSource','simulation'); await page.click('#swStart');
  await page.waitForFunction(()=>!document.querySelector('#swReport').disabled);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));delete document.hidden;});
  assert.ok(await page.locator('#swStart').isEnabled()); assert.ok(await page.locator('#swStop').isDisabled());
  await page.click('#swReport'); await page.waitForSelector('#srSource'); assert.equal(await page.inputValue('#srSource'),'simulation');

  // Controlled motion: leaving a section removes the event listener immediately.
  await go('sensor/olcum');
  await page.evaluate(()=>{
    window.DeviceMotionEvent=class extends Event {};
    window.__labMotion=new Set();
    const add=window.addEventListener.bind(window), remove=window.removeEventListener.bind(window);
    window.addEventListener=(type,fn,...rest)=>{if(type==='devicemotion')window.__labMotion.add(fn);return add(type,fn,...rest);};
    window.removeEventListener=(type,fn,...rest)=>{if(type==='devicemotion')window.__labMotion.delete(fn);return remove(type,fn,...rest);};
  });
  await page.click('#swStart');
  assert.equal(await page.evaluate(()=>window.__labMotion.size),1);
  await go('bilim-lab/titresim'); assert.equal(await page.evaluate(()=>window.__labMotion.size),0);
  await page.click('#sgSim'); assert.match(await page.locator('#sgResult').innerText(),/100.0 Hz/);
  await page.click('#sgReport'); await page.waitForSelector('#srSource'); assert.equal(await page.inputValue('#srSource'),'simulation');

  // Late permission must release stream after switching laboratory sections.
  await go('sensor/olcum'); await page.selectOption('#swSensor','sound');
  await page.evaluate(()=>{ window.__released=0; window.AudioContext=class {}; Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{}}); App.media.microphone=()=>new Promise(resolve=>{window.__grantLab=()=>resolve({getTracks:()=>[{stop:()=>window.__released++}]});}); });
  await page.click('#swStart'); await page.waitForFunction(()=>typeof window.__grantLab==='function');
  await go('bilim-lab/modeller/rc'); await page.evaluate(()=>window.__grantLab()); await page.waitForFunction(()=>window.__released===1);

  // A late 3D engine load may not mount a scene after its laboratory was closed.
  await page.evaluate(()=>{
    window.__lab3dOriginal={...App.lab3d}; window.__lateScenes=0;
    App.lab3d.supported=()=>true; App.lab3d.has=()=>true; App.lab3d.mode=()=> '3d';
    App.lab3d.load=()=>new Promise(resolve=>window.__finishLab3d=resolve);
    App.lab3d.mount=()=>{window.__lateScenes++;throw new Error('Disposed laboratory mounted a late scene');};
  });
  await go('lab/atis'); await page.waitForFunction(()=>!!window.__finishLab3d);
  await go('bilim-lab/modeller/rc'); await page.evaluate(async()=>{window.__finishLab3d();await Promise.resolve();Object.assign(App.lab3d,window.__lab3dOriginal);});
  assert.equal(await page.evaluate(()=>window.__lateScenes),0);

  let layouts=0;
  for(const theme of ['light','dark']) for(const width of [320,768,1440]) {
    await page.setViewportSize({width,height:900}); await page.evaluate(theme=>App.theme.set(theme),theme);
    for(const section of ['genel','deneyler','sensor','sensor/olcum','fizik','titresim','modeller/rc','modeller/cooling','modeller/halfLife','modeller/polarization']) {
      await go('bilim-lab/'+section);
      assert.equal(await page.locator('#view h1').count(),1,section);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,section+' overflow '+width);
      assert.equal(await page.locator('.science-lab-tabs [aria-current]').count(),1);
      layouts++;
    }
  }
  await page.setViewportSize({width:390,height:844}); await go('bilim-lab/modeller/rc'); await page.waitForTimeout(400);
  await page.screenshot({path:path.join(h.qa,'science-lab-mobile.png'),fullPage:true});
  await page.setViewportSize({width:1280,height:900});await go('bilim-lab');
  await page.screenshot({path:path.join(h.qa,'science-lab.png'),fullPage:true});
  assert.deepEqual(h.errors,[]);
  fs.writeFileSync(path.join(h.qa,'science-lab-report.json'),JSON.stringify({engine:h.engineName,layouts,physicalHardwareTested:false,errors:h.errors},null,2));
  console.log(h.engineName+': unified laboratory, legacy links, four model exports/report transfers, invalid-input guards, sensor fixtures, lifecycle and '+layouts+' layouts passed.');
} finally {await h.close();}
