import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {uiHarness} from './ui-harness.mjs';
const h=await uiHarness(),results=[];
try{
 const {page}=await h.device();const ids=await page.evaluate(()=>{App.lab3d.setMode('2d');return Object.keys(App.labs.LABS);});
 for(const id of ids){
  await page.evaluate(id=>App.router.go('lab/'+id),id);await page.waitForSelector('#labHost .lab__cv');
  const r=await page.evaluate(()=>{
   let changes=0;const host=document.querySelector('#labHost');
   for(const input of [...host.querySelectorAll('input[type="range"][data-p]')]){
    const min=Number(input.min),max=Number(input.max);for(const v of [min,(min+max)/2,max]){input.value=String(v);input.dispatchEvent(new Event('input',{bubbles:true}));changes++;}
   }
   for(const input of [...host.querySelectorAll('select[data-ps]')])for(const option of [...input.options]){input.value=option.value;input.dispatchEvent(new Event('change',{bubbles:true}));changes++;}
   for(const input of [...host.querySelectorAll('input[data-pt]')]){input.click();input.click();changes+=2;}
   for(const action of ['play','play','reset']){const b=host.querySelector('[data-lab="'+action+'"]');if(b){b.click();changes++;}}
   const fav=document.querySelector('#labFav');fav.click();const favourite=fav.getAttribute('aria-pressed')==='true';
   const task=document.querySelector('[data-task]');if(task&&!task.checked)task.click();
   const cv=host.querySelector('.lab__cv');return{changes,favourite,canvas:cv.width>0&&cv.height>0,text:host.innerText.slice(0,2400),invalid:host.querySelectorAll('.katex-error').length};
  });
  results.push({id,...r});assert.ok(r.canvas,id+' canvas');assert.ok(!/\bNaN\b|\bundefined\b/.test(r.text),id+' invalid numeric output: '+r.text);assert.equal(r.invalid,0,id+' formula parse error');
 }
 const games=await page.evaluate(()=>Object.keys(App.games.GAMES));
 for(const id of games){await page.evaluate(id=>App.router.go('oyunlar/'+id),id);await page.waitForSelector('#gArea');const start=page.locator('#gArea [data-go]');if(await start.count())await start.click();await page.waitForTimeout(80);const button=page.locator('#gArea button:visible:enabled').first();if(await button.count())await button.click();results.push({game:id,started:await page.locator('#gArea').innerText()});}
 await page.evaluate(()=>App.router.go('bugun'));await page.waitForSelector('.tday-grid');await page.waitForTimeout(150);
 assert.deepEqual(h.errors,[]);fs.writeFileSync(path.join(h.qa,'lab-interactions-report.json'),JSON.stringify({engine:h.engineName,simulatedHardware:false,results,errors:h.errors},null,2));console.log(h.engineName+': '+ids.length+' labs at parameter limits/selectors/play/reset/favourites; '+games.length+' game starts and actions passed.');
}finally{await h.close();}
