import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();try{
 const {page}=await h.device();
 await page.waitForSelector('[data-workspace-mode]');
 assert.equal(await page.inputValue('[data-workspace-mode]'),'student');
 assert.equal(await page.locator('#sidebar [data-group=classroom]').isVisible(),false);
 for(const id of ['hedefim','gelisimim','dunya-tarih'])assert.equal(await page.locator('#sidebar a[data-route="'+id+'"]').count(),1);
 for(const id of ['kariyer','meslek','puan','tercih','rapor','harita','kok','karne','kure','atlas','zaman','tarih-haritasi'])assert.equal(await page.locator('#sidebar a[data-route="'+id+'"]').count(),0);
 await navigate(page,'araclar');assert.equal(await page.locator('[data-hub-category=classroom]').count(),0);assert.equal(await page.locator('.hub-tile[data-r=arastirma]').count(),0);assert.equal(await page.locator('.hub-tile[data-r=rapor]').count(),0);
 // Migration collapses legacy page entries, keeps custom prompts and does not modify legacy data.
 const migrated=await page.evaluate(()=>{App.prefs.set('pinnedTools',['kariyer','meslek','rapor','tarih-haritasi','konular']);App.prefs.set('aiFavoriteTools',['coach','summary']);const id=App.aiFavorites.saveCustom({title:'Korunan metnim',prompt:'Notumu incele: '});App.prefs.set('aiFavoriteTools',['coach',id]);App.prefs.set('favoritesV2',null);return {id,keys:App.favorites.list(),legacy:App.prefs.get('pinnedTools')};});
 assert.deepEqual(migrated.keys,['tool:hedefim','tool:gelisimim','tool:konular','ai:coach','ai:'+migrated.id]);assert.equal(migrated.legacy.length,5);
 await navigate(page,'favorilerim');await page.click('[data-favorite-remove="tool:konular"]');await page.click('[data-favorite-move="ai:coach"][data-delta="-1"]');
 const order=await page.evaluate(()=>App.favorites.list());assert.equal(order[1],'ai:coach');
 await page.reload();await page.waitForSelector('[data-favorites-list]');assert.deepEqual(await page.evaluate(()=>App.favorites.list()),order);assert.equal(await page.evaluate(()=>App.aiFavorites.customTools()[0].tr),'Korunan metnim');
 await page.locator('[data-favorites-list] [data-favorite-open="ai:'+migrated.id+'"]').click();await page.waitForFunction(()=>document.querySelector('#composer textarea')?.value.includes('Notumu incele:'));assert.equal(await page.evaluate(()=>App.router.current().name),'');
 await page.evaluate(()=>App.workspaceNavigation.setMode('educator'));await navigate(page,'araclar');assert.equal(await page.locator('[data-hub-category=classroom]').count(),1);assert.equal(await page.locator('.hub-tile[data-r=arastirma]').count(),1);
 await page.evaluate(()=>App.favorites.toggle('tool:arastirma'));await page.reload();await page.waitForSelector('[data-workspace-mode]');assert.equal(await page.inputValue('[data-workspace-mode]'),'educator');
 await page.evaluate(()=>App.workspaceNavigation.setMode('student'));await navigate(page,'favorilerim');assert.equal(await page.locator('[data-favorites-list] [data-favorite-open="tool:arastirma"]').count(),0);assert.ok(await page.evaluate(()=>App.favorites.list().includes('tool:arastirma')),'hidden educator favourites preserved');
 await navigate(page,'gelisimim');await page.waitForSelector('#repPrint');assert.ok((await page.locator('.rep-tiles').innerText()).length>0);
 for(const parent of ['hedefim','dunya-tarih']){await navigate(page,parent);assert.ok(await page.locator('.workspace-step').count()>=3);}
 for(const r of ['kariyer','meslek','puan','tercih','rapor','harita','kok','karne','kure','atlas','zaman']){await navigate(page,r);assert.equal(await page.locator('.workspace-context').count(),1);assert.ok((await page.locator('#view').innerText()).length>100);}
 await navigate(page,'atlas/dunya');await page.waitForTimeout(250);assert.equal(await page.locator('.workspace-context').count(),1,'async atlas renderer retains shell');await page.locator('.workspace-context a[href="#/zaman"]').click();await page.waitForSelector('.workspace-context a[aria-current=page][href="#/zaman"]');
 await navigate(page,'tarih-haritasi');assert.equal(await page.evaluate(()=>App.router.current().name),'dunya-tarih');assert.equal(await page.locator('#hmMap').count(),0);
 assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(e=>/history-(map|explorer)/.test(e.name))),false);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:800});for(const theme of ['light','dark']){await page.evaluate(t=>App.theme.set(t),theme);for(const r of ['hedefim','gelisimim','dunya-tarih','favorilerim']){await navigate(page,r);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,r+' '+width+' '+theme);}}}
 await page.screenshot({path:path.join(h.qa,'navigation-consolidation.png'),fullPage:true});assert.deepEqual(h.errors,[]);
 for(const f of ['js/modules/history-map.js','js/modules/history-explorer.js','js/data/history-map-data.js'])assert.equal(fs.existsSync(f),false);
 console.log(h.engineName+': grouped flows, real weekly summary, legacy child links, migration/custom preservation, shared favourite ordering/persistence/activation, educator visibility, history retirement and 320–1440px themes passed.');
}finally{await h.close();}
