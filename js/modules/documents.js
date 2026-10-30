/* One document workspace; existing stores and record IDs stay unchanged. */
(function () {
  const T=(tr,en)=>App.i18n.lang==='en'?en:tr, esc=App.utils.esc;
  const aliases={notlar:'dokumanlar/notlar','belge-paketi':'dokumanlar/paket',belgeden:'dokumanlar/paket','calisma-odasi':'dokumanlar/ortak','deney-raporu':'dokumanlar/rapor'};
  Object.entries(aliases).forEach(([from,to])=>App.router.alias(from,to));
  function pathFor(route){return App.router.resolve(route);}
  function migrateTools(raw){
    if(!Array.isArray(raw))return null;
    return [...new Set(raw.filter(r=>typeof r==='string'&&r.split('/')[0]!=='sunum').map(r=>aliases[r.split('/')[0]]||r.startsWith('dokumanlar/')?'dokumanlar':r))];
  }
  for(const key of ['pinnedTools','recentTools','homeWidgets']){
    const value=migrateTools(App.prefs.get(key,null));if(value)App.prefs.set(key,value);
  }
  const sections=[['notlar','note','Belge Düzenleyici','Document Editor'],['paket','book','Belgeden Çalış','Study from a Document'],['rapor','chart','Deney Raporu','Experiment Report'],['ortak','chat','Ortak Belge','Shared Document']];
  const drafts={};
  function remember(mode,host,labToken){
    if(!['paket','rapor'].includes(mode))return;
    const values={};
    host.querySelectorAll('input[id],textarea[id],select[id]').forEach(el=>{
      if(el.type!=='file'&&el.type!=='radio'&&el.type!=='checkbox'&&el.value.length<=60000)values[el.id]=el.value;
    });
    drafts[mode]={values,labToken};
  }
  function render(view,params=[]){
    const mode=sections.some(s=>s[0]===params[0])?params[0]:'notlar';
    view.innerHTML='<div class="page documents-page"><div class="page-head"><div><h1>'+esc(T('Dokümanlar','Documents'))+'</h1><p>'+esc(T('Belgelerini yaz, notlarını düzenle, dosyalardan çalış ve raporlarını hazırla.','Write documents, edit notes, study files and prepare reports.'))+'</p></div></div><nav class="documents-tabs" aria-label="'+esc(T('Doküman bölümleri','Document sections'))+'">'+sections.map(s=>'<a class="btn'+(s[0]===mode?' btn--primary':'')+'" href="#/dokumanlar/'+s[0]+'"'+(s[0]===mode?' aria-current="page"':'')+'>'+App.icon(s[1])+esc(T(s[2],s[3]))+'</a>').join('')+'</nav><div class="documents-content"></div></div>';
    const host=view.querySelector('.documents-content');
    const labToken=mode==='rapor'?JSON.stringify(App.prefs.get('discovery:labData',null)):null;
    const cleanup=mode==='paket'?App.studyWorkspace.renderPack(host,params.slice(1)):
      mode==='rapor'?App.scienceReport.render(host):
      mode==='ortak'?App.v159Studio.rooms(host):App.studyWorkspace.renderNotes(host,params.slice(1));
    if(drafts[mode]&&(mode!=='rapor'||drafts[mode].labToken===labToken))Object.entries(drafts[mode].values).forEach(([id,value])=>{const el=host.querySelector('#'+id);if(el&&el.type!=='file')el.value=value;});
    const heading=host.querySelector('.page-head h1, .discovery > h1');
    if(heading){const h=document.createElement('h2');h.className='documents-section-title';h.textContent=heading.textContent;heading.replaceWith(h);}
    App.setTitle(T('Dokümanlar','Documents'));
    return()=>{remember(mode,host,labToken);if(typeof cleanup==='function')cleanup();};
  }
  App.documents={render,pathFor,migrateTools};
  App.router.register('dokumanlar',render);
})();
