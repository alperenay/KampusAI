// Every discoverable tool: contextual orientation and actual horizontal layout.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { uiHarness } from './ui-harness.mjs';
const h=await uiHarness(),results=[];
try {
  const {page}=await h.device();
  const routes=await page.evaluate(()=>App.hub.TOOLS.map(x=>x[0]).filter(Boolean));
  for(const width of [320,768,1440]) for(const theme of ['dark','light']) {
    await page.setViewportSize({width,height:900});await page.evaluate(t=>App.theme.set(t),theme);
    for(const route of routes) {
      await page.evaluate(r=>new Promise(resolve=>{let timer;const done=()=>{clearTimeout(timer);window.removeEventListener('da:route',done);resolve();};window.addEventListener('da:route',done);timer=setTimeout(done,10000);App.router.go(r);}),route);
      await page.waitForTimeout(70);
      const result=await page.evaluate(()=>{const guide=document.querySelector('#view .page-guide');return{path:App.router.current().name,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,guide:!!guide,text:document.querySelector('#view').innerText.slice(0,80),offenders:[...document.querySelectorAll('#view *')].filter(e=>e.getBoundingClientRect().right>innerWidth+2&&getComputedStyle(e).position!=='fixed').slice(0,5).map(e=>({tag:e.tagName,cls:e.className}))};});
      results.push({route,width,theme,...result});
      if(result.overflow>1)await page.screenshot({path:path.join(h.qa,'layout-'+route+'-'+width+'-'+theme+'.png'),fullPage:true});
    }
  }
  const failures=results.filter(r=>r.overflow>1),missing=results.filter(r=>r.path===r.route&&!['sesli','rehber'].includes(r.route)&&!r.guide);
  fs.writeFileSync(path.join(h.qa,'usability-report.json'),JSON.stringify({results,failures,missing,errors:h.errors},null,2));
  assert.deepEqual(failures,[],'Tool layout overflow');assert.deepEqual(missing,[],'Missing contextual help');assert.deepEqual(h.errors,[]);
  console.log('Usability: '+results.length+' complete-tool layout checks at 320/768/1440 px and two themes, plus contextual help passed.');
}finally{await h.close();}
