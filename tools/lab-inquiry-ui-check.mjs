import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();try{const{page}=await h.device('bilim-lab/deneyler/ph');const go=r=>navigate(page,r);
await page.waitForSelector('#inquiryAnswer');await page.click('[data-inquiry-next]');assert.match(await page.locator('[data-inquiry-status]').innerText(),/notunu yaz/);
const notes=['Su eklenince pH nötre yaklaşır.','Suyu artırdım; asit miktarı aynı kaldı.','pH değişti; bu sanal bir gözlemdir.','Tahminimi karşılaştırdım. <img src=x onerror=alert(1)>'];
for(let i=0;i<4;i++){await page.fill('#inquiryAnswer',notes[i]);await page.click('[data-inquiry-next]');}
assert.match(await page.locator('[data-inquiry-status]').innerText(),/tamamlandı/);assert.equal(await page.locator('.lab-inquiry img').count(),0);
const dl=page.waitForEvent('download');await page.click('[data-inquiry-export]');const file=await dl,dest=path.join(h.qa,'inquiry.json');await file.saveAs(dest);const data=JSON.parse(fs.readFileSync(dest));assert.equal(data.complete,true);assert.deepEqual(data.steps.map(s=>s.note),notes);
await page.click('[data-inquiry-mode="free"]');assert.equal(await page.locator('#inquiryAnswer').count(),0);assert.ok(await page.locator('.science-lab-content').isVisible());
await page.click('[data-inquiry-mode="guided"]');assert.equal(await page.inputValue('#inquiryAnswer'),notes[3]);
await go('bilim-lab/modeller/rc');assert.equal(await page.inputValue('#inquiryAnswer'),'');await page.fill('#inquiryAnswer','Akım zamanla azalır.');await page.click('[data-inquiry-next]');await page.fill('[data-model-param="resistance"]','20');assert.match(await page.locator('[data-inquiry-change]').innerText(),/kontrol değiştirildi/);
await go('bilim-lab/deneyler/ph');assert.equal(await page.inputValue('#inquiryAnswer'),notes[3]);await page.reload();await page.waitForSelector('#inquiryAnswer');assert.equal(await page.inputValue('#inquiryAnswer'),notes[3]);
await go('bilim-lab');assert.equal(await page.locator('.lab-inquiry').count(),0);
await page.evaluate(()=>App.lazy.load(['labs']));const ids=await page.evaluate(()=>Object.keys(App.labs.LABS));for(const id of ids){await go('bilim-lab/deneyler/'+id);assert.equal(await page.locator('.lab-inquiry').count(),1,id);}
for(const route of ['bilim-lab/deneyler/ekosistem','bilim-lab/sensor','bilim-lab/fizik','bilim-lab/titresim','bilim-lab/gokyuzu','bilim-lab/grafik','bilim-lab/vatandas']){await go(route);assert.equal(await page.locator('.lab-inquiry').count(),1,route);}
for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>{const v=document.querySelector('#view');return v.scrollWidth<=v.clientWidth+1;}));}
await page.screenshot({path:path.join(h.qa,'guided-inquiry.png'),fullPage:true});assert.deepEqual(h.errors,[]);console.log(h.engineName+': four stages, validation, persistence/reload, route isolation, free mode, safe text export, '+ids.length+' experiments and seven lab sections passed.');}finally{await h.close();}
