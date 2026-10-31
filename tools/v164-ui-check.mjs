import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();try{const {page}=await h.device();
await page.waitForSelector('#composer');
// Synthetic provider, real pipeline: high-frequency tokens must yield to input/painting.
const responsiveness=await page.evaluate(async()=>{
  const resolve=App.engine.resolve, originalWarm=App.rag.warmup;App.rag.warmup=()=>Promise.resolve();
  let frames=0,painting=true,callbacks=0,final='',ticks=0,inputReceived=false;
  const probe=document.createElement('button');probe.textContent='Synthetic input probe';probe.onclick=()=>{inputReceived=true;};document.body.appendChild(probe);const inputTimer=setTimeout(()=>probe.click(),20);
  const loop=()=>{if(painting){frames++;requestAnimationFrame(loop);}};requestAnimationFrame(loop);
  const timer=setInterval(()=>ticks++,10);
  App.engine.resolve=async()=>({kind:'cloud',id:'synthetic',prepare:async()=>{},config:()=>({direct:false,chatModel:'fixture'}),chat:async({onDelta})=>{let text='';for(let i=0;i<200;i++){text+=' x';onDelta(' x',text);if(i%10===0)await new Promise(r=>setTimeout(r,8));}return{text,stats:null};}});
  try{const result=await App.ai.run({text:'Synthetic responsiveness test',useData:false,on:{delta:full=>{callbacks++;final=full;}}});return{frames,ticks,inputReceived,callbacks,complete:final===result.text,length:result.text.length};}
  finally{painting=false;clearInterval(timer);clearTimeout(inputTimer);probe.remove();App.engine.resolve=resolve;App.rag.warmup=originalWarm;}
});
assert.ok(responsiveness.ticks>0&&responsiveness.inputReceived,'timers and DOM input run while the provider is pending');assert.ok(responsiveness.callbacks<20,'200 tokens are batched');assert.equal(responsiveness.complete,true);assert.equal(responsiveness.length,400);
fs.writeFileSync(path.join(h.qa,'v164-stream-profile.json'),JSON.stringify({synthetic:true,...responsiveness},null,2));
for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});for(const theme of ['light','dark']){await page.evaluate(t=>App.theme.set(t),theme);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,'workspace overflow '+width+' '+theme);}}
await page.evaluate(()=>{window.__b=App.voiceBoard.create(document.querySelector('#composer'));__b.update('1. Yol $x=20$ m\n2. Süre $t=4$ s\n3. Hız $v=5$ m/s');__b.reach(0);});
assert.equal(await page.locator('.vboard__step:not([hidden])').count(),1);assert.equal(await page.locator('.vboard .katex').count(),3);
await page.evaluate(()=>__b.reach(40));assert.ok(await page.locator('.vboard__step:not([hidden])').count()>=2);await page.evaluate(()=>__b.finish());assert.equal(await page.locator('.vboard__step:not([hidden])').count(),3);
await navigate(page,'bilim-lab/vatandas');await page.waitForSelector('.science-lab');assert.match(await page.locator('.science-lab-content').innerText(),/ölç|Ölç/);
await navigate(page,'bilim-lab/gokyuzu');await page.waitForSelector('#skyStop');
assert.equal(await page.locator('#sidebar [data-route="canlanan-kitap"]').count(),0);
await navigate(page,'gokyuzu');assert.equal(await page.evaluate(()=>App.router.current().path),'bilim-lab/gokyuzu');
for(const width of [320,768,1440]){await page.setViewportSize({width,height:900});for(const r of ['bilim-lab','bilim-lab/gokyuzu','bilim-lab/vatandas','dunya-tarih','formuller']){await navigate(page,r);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,r+' '+width);}}
const key=await page.evaluate(()=>{const s=App.data.curriculum.findSubject('12','ingilizce');const u=s.units.find(x=>x.id==='t10');return 'konular/12/ingilizce/t10/'+u.outcomes[0].id;});await navigate(page,key);assert.match(await page.locator('#view').innerText(),/Manners/);
await navigate(page,'dunya-tarih');await page.screenshot({path:path.join(h.qa,'v164-history.png'),fullPage:true});assert.deepEqual(h.errors,[]);
console.log(h.engineName+': workspace themes, real board rendering, unified lab/legacy aliases, added lesson and responsive views passed.');
}finally{await h.close();}
