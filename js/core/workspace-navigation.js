(function () {
  const sections = [
    {id:'hesaplar',title:['Hesaplar ve Araçlar','Calculations & Tools'],icon:'calc',description:['Bilimsel hesap, birim dönüşümü, grafik, mol ve ölçüm analizi tek yerde. Hepsi cihazda çalışır.','Scientific calculations, units, functions, moles and measurement analysis in one offline workspace.'],children:[['hesap','Hesap makinesi','Calculator'],['birim-cevirici','Birim dönüştürücü','Unit converter'],['fonksiyon-cizici','Fonksiyon çizici','Function plotter'],['mol-cozelti','Mol ve çözelti','Moles & solutions'],['olcum-analizi','Ölçüm ve belirsizlik','Measurements & uncertainty']]},
    { id:'dinle-konus', title:['Dinle ve Konuş','Listen & Speak'], icon:'volume', description:['Dinleyerek tekrar et, sesli soru sor veya dil pratiği yap. Her aracın amacı ve gereksinimi aşağıda.','Revise by listening, ask aloud or practise languages. Each tool has a clear purpose below.'],children:[['sesli','Sesli öğretmen','Voice teacher'],['podcast','Konu podcast’i','Topic podcast'],['konusma','Dil ve konuşma pratiği','Language and speaking practice'],['sozlu-prova','Sözlü sınav provası','Oral exam practice']] },
    { id: 'hedefim', title: ['Hedefim ve Geleceğim', 'My Goals & Future'], icon: 'compass', description: ['İlgini keşfet, meslekleri incele, puanını değerlendir ve bölüm hedefini belirle.', 'Explore interests, careers, scores and programme goals.'], children: [['kariyer','İlgilerim','My interests'],['meslek','Meslekler','Careers'],['puan','Puanım','My score'],['tercih','Bölümler','Programmes']] },
    { id: 'gelisimim', title: ['Gelişimim','My Progress'], icon: 'chart', description: ['Haftalık özet, öğrenme haritası, eksik analizi ve karnen aynı yerde.', 'Your weekly summary, learning map, gaps and report in one place.'], children: [['rapor','Haftalık özet','Weekly summary'],['harita','Öğrenme haritam','Learning map'],['kok','Eksik analizi','Gap analysis'],['karne','Üstbiliş karnem','Metacognition report']] },
    { id: 'dunya-tarih', title: ['Dünya ve Tarih','World & History'], icon: 'globe', description: ['Dünya küresi, coğrafya atlası ve tarih zaman çizelgesini birlikte keşfet.', 'Explore the globe, geography atlas and historical timeline.'], children: [['kure','3B Dünya Küresi','3D Globe'],['atlas','Coğrafya Atlası','Geography Atlas'],['zaman','Zaman Çizelgesi','Timeline']] }
  ];
  const teacherRoutes = ['sinif-modu','sinif','degerlendirme','arastirma'];
  const sectionFor = route => sections.find(s => s.id === String(route).split('/')[0] || s.children.some(c => c[0] === String(route).split('/')[0]));
  const mode = () => App.prefs.get('workspaceView','student') === 'educator' ? 'educator' : 'student';
  const permitted = route => mode() === 'educator' || !teacherRoutes.includes(String(route).split('/')[0]);
  function menuRoute(route) {
    if(String(route).split('/')[0]==='yolculuk')return 'gelisimim';
    if (['tarih-haritasi','ciz-calissin'].includes(String(route).split('/')[0])) return null;
    if (['ph','ekosistem'].includes(String(route).split('/')[0])) return 'bilim-lab';
    const section = sectionFor(route);
    return section ? section.id : route;
  }
  function visible(route) { return permitted(route) && menuRoute(route) === route; }
  function setMode(value) {
    App.prefs.set('workspaceView',value === 'educator' ? 'educator' : 'student');
    window.dispatchEvent(new CustomEvent('da:workspace-view'));
  }
  const text = pair => pair[App.i18n?.lang === 'en' ? 1 : 0];
  const validKey = key => {
    if (typeof key !== 'string') return false;
    if (key.startsWith('ai:')) return !!App.aiFavorites?.all().some(t => 'ai:'+t.id === key);
    return key.startsWith('tool:') && !!App.hub?.TOOLS.some(t => 'tool:'+t[0] === key) && key !== 'tool:favorilerim' && key !== 'tool:tarih-haritasi';
  };
  function normalize(keys) {
    return [...new Set((Array.isArray(keys) ? keys : []).filter(k => typeof k === 'string').map(k => k.startsWith('tool:') ? (menuRoute(k.slice(5)) === null ? '' : 'tool:'+menuRoute(k.slice(5))) : k))].filter(validKey).slice(0,32);
  }
  function favorites() {
    let saved = App.prefs.get('favoritesV2',null);
    if (!Array.isArray(saved)) {
      const pages = App.prefs.get('pinnedTools',[]), ai = App.prefs.get('aiFavoriteTools',['solve','coach','summary']);
      saved = normalize([...(Array.isArray(pages) ? pages : []).map(r => 'tool:'+r),...(Array.isArray(ai) ? ai : []).map(r => 'ai:'+r)]);
      App.prefs.set('favoritesV2',saved);
    }
    return normalize(saved);
  }
  function save(keys) {
    App.prefs.set('favoritesV2',normalize(keys));
    window.dispatchEvent(new CustomEvent('da:favorites'));
  }
  function toggle(key) {
    if (!validKey(key)) return false;
    const keys = favorites(), on = !keys.includes(key);
    if (on && keys.length >= 32) { App.ui?.toast(text(['En fazla 32 favori ekleyebilirsin.','You can add up to 32 favourites.'])); return false; }
    save(on ? keys.concat(key) : keys.filter(k => k !== key));return on;
  }
  function move(key,delta) {
    const keys=favorites(), visibleKeys=keys.filter(k=>item(k)), at=visibleKeys.indexOf(key), next=at+delta;
    if (![-1,1].includes(delta) || at<0 || next<0 || next>=visibleKeys.length) return false;
    const i=keys.indexOf(key), j=keys.indexOf(visibleKeys[next]);
    [keys[i],keys[j]]=[keys[j],keys[i]];save(keys);return true;
  }
  function item(key) {
    if (key.startsWith('ai:')) { const t=App.aiFavorites?.all().find(x => 'ai:'+x.id===key);return t ? {key,title:text([t.tr,t.en]),icon:t.icon,href:'#/'} : null; }
    const t=App.hub?.TOOLS.find(x => 'tool:'+x[0]===key);
    return t && permitted(t[0]) ? {key,title:Array.isArray(t[2])?text(t[2]):App.t(t[2]),icon:t[1],href:'#/'+t[0]} : null;
  }
  let openSequence=0;
  function open(key) {
    const sequence=++openSequence;
    const entry=item(key);if (!entry) return;
    if (!key.startsWith('ai:')) { App.router.go(entry.href.slice(2));return; }
    const t=App.aiFavorites.all().find(x=>'ai:'+x.id===key);
    if (App.router.current().name === '') { App.modules.assistant.prepareTool(t.prompt,t.coach);return; }
    const done=e => { clearTimeout(timer);window.removeEventListener('da:route',done);if(sequence===openSequence && e.detail.name==='')App.modules.assistant.prepareTool(t.prompt,t.coach); };
    const timer=setTimeout(()=>window.removeEventListener('da:route',done),25000);
    window.addEventListener('da:route',done);App.router.go('');
  }
  App.workspaceNavigation={sections,sectionFor,teacherRoutes,mode,setMode,permitted,visible,menuRoute,text};
  App.favorites={list:favorites,save,toggle,move,item,open};
})();
