// Permission timing is simulated; no real microphone/camera is accessed.
import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';
import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness(),results=[];
try{
 const {page}=await h.device();
 for(const mode of ['ses','isik']){
  await page.evaluate(r=>App.router.go(r),'sensor/'+mode);await page.waitForSelector('#slGo');
  await page.evaluate(()=>{window.__stopped=0;window.__requested=false;const track={stop(){window.__stopped++;},getCapabilities:()=>({})};window.__stream={getTracks:()=>[track],getVideoTracks:()=>[track]};Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:()=>{window.__requested=true;return new Promise(r=>window.__grant=r);}}});});
  const param=page.locator('[data-p]').first();await param.fill('-1');await param.dispatchEvent('change');await page.click('#slGo');
  assert.equal(await page.evaluate(()=>window.__requested),false,'Invalid physical parameters must not start capture');
  await param.fill(mode==='ses'?'440':'1');await param.dispatchEvent('change');
  await page.click('#slGo');await page.waitForFunction(()=>window.__requested);
  await page.evaluate(()=>App.router.go('bugun'));await page.waitForSelector('.tday-grid');
  await page.evaluate(()=>window.__grant(window.__stream));await page.waitForTimeout(80);
  assert.equal(await page.evaluate(()=>window.__stopped),1,mode+': late media grant must stop every track');results.push(mode+' delayed grant disposed after route change');
 }
 assert.deepEqual(h.errors,[]);fs.writeFileSync(path.join(h.qa,'lifecycle-report.json'),JSON.stringify({engine:h.engineName,simulatedPermissions:true,results},null,2));console.log(h.engineName+': camera/microphone late permission cleanup passed.');
}finally{await h.close();}
