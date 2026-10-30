import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import {uiHarness,navigate} from './ui-harness.mjs';
const h=await uiHarness();
try{
  const {page}=await h.device('dokumanlar');await page.evaluate(()=>App.startup.dismiss());
  await page.evaluate(async()=>{
    App.prefs.set('pinnedTools',['notlar','belge-paketi','sunum','deney-raporu','konular']);
    App.prefs.set('homeWidgets',['sunum','belgeden','calisma-odasi','bugun']);
    await App.db.put('notes',{id:'not:existing',title:'Existing document',text:'Saved original',custom:'preserve',updatedAt:'2026-01-01'});
  });
  await page.reload();await page.waitForSelector('#ntText');await page.evaluate(()=>App.startup.dismiss());
  assert.deepEqual(await page.evaluate(()=>App.prefs.get('pinnedTools',[])),['dokumanlar','konular']);
  assert.deepEqual(await page.evaluate(()=>App.prefs.get('homeWidgets',[])),['dokumanlar','bugun']);
  assert.equal(await page.locator('#sidebar .nav-category a[data-route="dokumanlar"]').count(),1);
  for(const old of ['notlar','belge-paketi','belgeden','calisma-odasi','deney-raporu','sunum'])assert.equal(await page.locator('#sidebar a[data-route="'+old+'"]').count(),0);
  await page.click('[data-nt-edit="not:existing"]');await page.fill('#ntText','Updated original');await page.click('#ntSave');
  await page.waitForFunction(async()=> (await App.db.get('notes','not:existing')).text==='Updated original');
  assert.equal(await page.evaluate(async()=> (await App.db.get('notes','not:existing')).custom),'preserve');
  await page.fill('#ntTitle','Local draft');await page.fill('#ntText','A draft that survives document tabs.');
  await page.click('.documents-tabs a[href="#/dokumanlar/paket"]');await page.waitForSelector('#swSource');
  await page.fill('#swSource','A source draft that survives changing tabs.');
  await page.click('.documents-tabs a[href="#/dokumanlar/notlar"]');await page.waitForSelector('#ntText');
  assert.equal(await page.inputValue('#ntText'),'A draft that survives document tabs.');
  await page.reload();await page.waitForSelector('#ntText');await page.evaluate(()=>App.startup.dismiss());
  assert.equal(await page.inputValue('#ntTitle'),'Local draft');
  await page.setInputFiles('#ntFile',{name:'local.txt',mimeType:'text/plain',buffer:Buffer.from('Imported local file text.')});await page.click('#ntImport');
  await page.waitForFunction(()=>document.querySelector('#ntText').value.includes('Imported local file text.'));
  await page.fill('#ntText','# Heading\n\n$x^2$\n\n<img src=x onerror="window.badPreview=1">');
  await page.click('#ntPreviewPane summary');await page.waitForSelector('#ntPreview .katex');
  assert.equal(await page.locator('#ntPreview img').count(),0);assert.equal(await page.evaluate(()=>window.badPreview),undefined);
  const download=page.waitForEvent('download');await page.click('#ntExportMd');const file=await download;assert.ok(file.suggestedFilename().endsWith('.md'));
  await page.click('#ntSave');await page.waitForFunction(async()=> (await App.db.getAll('notes')).some(x=>x.title==='Local draft'));
  const saved=await page.evaluate(async()=> (await App.db.getAll('notes')).find(x=>x.title==='Local draft'));
  await page.fill('#ntSearch','Local draft');await page.waitForFunction(()=>document.querySelectorAll('#ntList [data-nt-edit]').length===1);
  await page.click('[data-nt-del="'+saved.id+'"]');await page.waitForFunction(async id=>!(await App.db.get('notes',id)),saved.id);
  assert.ok(await page.evaluate(async()=>!!await App.db.get('notes','not:existing')));
  const aliases={notlar:'notlar','belge-paketi':'paket',belgeden:'paket','calisma-odasi':'ortak','deney-raporu':'rapor'};
  for(const [old,section]of Object.entries(aliases)){
    await page.evaluate(({old,section})=>new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{removeEventListener('da:route',done);reject(new Error('Alias did not finish'));},15000);
      function done(e){if(e.detail.path==='dokumanlar/'+section){clearTimeout(timer);removeEventListener('da:route',done);resolve(true);}}
      addEventListener('da:route',done);App.router.go(old);
    }),{old,section});
    await page.waitForSelector(section==='notlar'?'#ntText':section==='paket'?'#swSource':section==='ortak'?'#studyCode':'#srName');
    assert.equal(await page.locator('.documents-tabs a[aria-current="page"]').count(),1);
    assert.ok(!page.url().endsWith('#/'+old));
  }
  assert.equal(await page.evaluate(()=>typeof App.v159Studio.presentation),'undefined');
  await page.click('#srBuild');await page.waitForSelector('#srChart');
  await navigate(page,'dokumanlar/notlar');
  await page.evaluate(()=>App.prefs.set('discovery:labData',{source:'simulation',name:'New lab data',unit:'m',samples:[{t:0,x:4},{t:1,x:8}]}));
  await navigate(page,'dokumanlar/rapor');assert.equal(await page.inputValue('#srSource'),'simulation');assert.equal(await page.inputValue('#srName'),'New lab data');
  let layouts=0;
  for(const theme of ['dark','light'])for(const width of [320,768,1440])for(const section of ['notlar','paket','rapor','ortak']){
    await page.evaluate(t=>App.theme.set(t),theme);await page.setViewportSize({width,height:900});
    await navigate(page,'dokumanlar/'+section);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,theme+' '+width+' '+section);layouts++;
  }
  await page.evaluate(async()=>{const backup=await App.db.exportAll();await App.db.importAll(backup);});
  assert.equal(await page.evaluate(async()=> (await App.db.get('notes','not:existing')).text),'Updated original');
  await page.evaluate(()=>App.i18n.setLang('en'));await navigate(page,'dokumanlar');
  assert.equal(await page.locator('.documents-page > .page-head h1').textContent(),'Documents');
  await page.waitForTimeout(350);await page.screenshot({path:path.join(h.qa,'documents-workspace.png')});
  assert.deepEqual(h.errors,[]);
  fs.writeFileSync(path.join(h.qa,'documents-report.json'),JSON.stringify({engine:h.engineName,layouts,aliases:5,noteIdentity:true,drafts:true,localImport:true,export:true,safePreview:true,backup:true,errors:h.errors},null,2));
  console.log(h.engineName+': documents editor/import/export/search, preserved records/drafts/backup, five aliases, four sections, retired slides and 24 responsive layouts passed.');
}finally{await h.close();}
