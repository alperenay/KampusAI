(function () {
  App.router.alias("tarih-haritasi","dunya-tarih");
  const W=App.workspaceNavigation, F=App.favorites, esc=App.utils.esc;
  const T=(tr,en)=>W.text([tr,en]);
  let observer=null;
  function tabs(section,active) {
    return '<nav class="workspace-tabs no-print" aria-label="'+esc(W.text(section.title))+'"><a class="btn" href="#/'+section.id+'"'+(active===section.id?' aria-current="page"':'')+'>'+T('Genel görünüm','Overview')+'</a>'+section.children.map(([route,tr,en])=>'<a class="btn" href="#/'+route+'"'+(active===route?' aria-current="page"':'')+'>'+esc(T(tr,en))+'</a>').join('')+'</nav>';
  }
  function decorate(view,r) {
    observer?.disconnect();observer=null;
    view.querySelectorAll(':scope > .workspace-context').forEach(n=>n.remove());
    const section=W.sectionFor(r.name);if (!section || section.id===r.name) return;
    function ensure() {
      if(view.querySelector(':scope > .workspace-context'))return;
      const bar=document.createElement('section');bar.className='workspace-context no-print';
      bar.innerHTML='<a class="workspace-parent" href="#/'+section.id+'">'+App.icon(section.icon)+esc(W.text(section.title))+'</a>'+tabs(section,r.name);
      view.prepend(bar);
    }
    ensure();observer=new MutationObserver(ensure);observer.observe(view,{childList:true});
  }
  function beforeRender(){observer?.disconnect();observer=null;}
  for(const section of W.sections) App.router.register(section.id,async view=>{
    App.setTitle(W.text(section.title));
    view.innerHTML='<div class="page workspace-overview"><h1 class="no-print">'+esc(W.text(section.title))+'</h1><p class="hint">'+esc(W.text(section.description))+'</p>'+tabs(section,section.id)+'<div class="workspace-steps no-print">'+section.children.map(([r,tr,en],i)=>'<a class="card workspace-step" href="#/'+r+'"><span class="workspace-step__number">'+(i+1)+'</span><b>'+esc(T(tr,en))+'</b><span aria-hidden="true">→</span></a>').join('')+'</div><div data-workspace-summary></div></div>';
    if(section.id==='gelisimim') { const cleanup=await App.router.handler('rapor')(view.querySelector('[data-workspace-summary]'),[]);App.setTitle(W.text(section.title));return cleanup; }
  });
  function shortcuts(root) {
    const paint=()=>{
      if(!root.isConnected)return;
      const list=F.list().map(F.item).filter(Boolean).slice(0,6);
      root.innerHTML='<div class="ai-fav-grid">'+list.map(x=>'<button class="btn" data-favorite-open="'+esc(x.key)+'">'+App.icon(x.icon)+esc(x.title)+'</button>').join('')+'</div>'+(!list.length?'<p class="hint">'+T('Henüz favorin yok.','No favourites yet.')+'</p>':'')+'<a class="btn" href="#/favorilerim">'+App.icon('star')+T('Favorilerimi düzenle','Manage my favourites')+'</a>';
    };
    root.addEventListener('click',e=>{const b=e.target.closest('[data-favorite-open]');if(b)F.open(b.dataset.favoriteOpen);});paint();
  }
  App.router.register('favorilerim',view=>{
    App.setTitle(T('Favorilerim','My Favourites'));
    view.innerHTML='<div class="page"><h1>'+T('Favorilerim','My Favourites')+'</h1><p class="hint">'+T('Sayfalar ve AI şablonları tek listede. Sırala, kaldır veya yeni favori ekle; seçimlerin bu cihazda saklanır.','Pages and AI templates share one list. Reorder, remove or add favourites; choices stay on this device.')+'</p><section class="card"><h2>'+T('Sıralı favorilerim','My ordered favourites')+'</h2><div data-favorites-list></div></section><section class="card"><h2>'+T('Sayfa ekle','Add a page')+'</h2><div class="workspace-tool-picker" data-favorites-tools></div></section><section class="card"><h2>'+T('AI şablonları ve kişisel metinler','AI templates and personal prompts')+'</h2><div data-favorites-ai></div></section></div>';
    function paint(){
      const list=F.list().map(F.item).filter(Boolean);
      view.querySelector('[data-favorites-list]').innerHTML=list.map((x,i)=>'<div class="workspace-favorite"><button class="btn" data-favorite-open="'+esc(x.key)+'">'+App.icon(x.icon)+esc(x.title)+'</button><div><button class="btn" data-favorite-move="'+esc(x.key)+'" data-delta="-1" aria-label="'+esc(T('Yukarı taşı: ','Move up: ')+x.title)+'" '+(i===0?'disabled':'')+'>↑</button><button class="btn" data-favorite-move="'+esc(x.key)+'" data-delta="1" aria-label="'+esc(T('Aşağı taşı: ','Move down: ')+x.title)+'" '+(i===list.length-1?'disabled':'')+'>↓</button><button class="btn" data-favorite-remove="'+esc(x.key)+'" aria-label="'+esc(T('Favoriden kaldır: ','Remove favourite: ')+x.title)+'">'+T('Kaldır','Remove')+'</button></div></div>').join('')||'<p>'+T('Henüz favorin yok.','No favourites yet.')+'</p>';
      view.querySelector('[data-favorites-tools]').innerHTML=App.hub.TOOLS.filter(t=>W.visible(t[0])&&t[0]!=='favorilerim').map(t=>{const key='tool:'+t[0],x=F.item(key);return '<button class="btn" data-favorite-toggle="'+esc(key)+'" aria-pressed="'+F.list().includes(key)+'">'+App.icon('star')+esc(x.title)+'</button>';}).join('');
    }
    view.addEventListener('click',click);
    function click(e){const b=e.target.closest('button');if(!b)return;const d=b.dataset;if(d.favoriteOpen)F.open(d.favoriteOpen);else if(d.favoriteRemove)F.toggle(d.favoriteRemove);else if(d.favoriteToggle)F.toggle(d.favoriteToggle);else if(d.favoriteMove)F.move(d.favoriteMove,Number(d.delta));}
    App.aiFavorites.mount(view.querySelector('[data-favorites-ai]'),true);paint();window.addEventListener('da:favorites',paint);
    return()=>{view.removeEventListener('click',click);window.removeEventListener('da:favorites',paint);};
  });
  function installModePicker(nav) {
    const label=document.createElement('label');label.className='workspace-mode';
    label.innerHTML='<span data-workspace-mode-label>'+esc(T('Menü görünümü','Menu view'))+'</span><select data-workspace-mode><option value="student">'+T('Öğrenci','Student')+'</option><option value="educator">'+T('Öğretmen / Araştırmacı','Teacher / Researcher')+'</option></select>';
    nav.prepend(label);const select=label.querySelector('select');select.value=W.mode();select.addEventListener('change',()=>{W.setMode(select.value);App.router.refresh();});
    const sync=()=>{select.value=W.mode();const group=nav.querySelector('[data-group="classroom"]');if(group)group.hidden=W.mode()!=='educator';App.hub.paintSidebar();nav.querySelector('#navFilter')?.dispatchEvent(new Event('input'));};
    sync();window.addEventListener('da:workspace-view',sync);
    App.i18n.onChange(()=>{label.querySelector('[data-workspace-mode-label]').textContent=T('Menü görünümü','Menu view');select.options[0].text=T('Öğrenci','Student');select.options[1].text=T('Öğretmen / Araştırmacı','Teacher / Researcher');});
  }
  App.workspaceSections={decorate,beforeRender,shortcuts,installModePicker,tabs};
})();
