/* KampüsAI 1.59: customizable home, smart navigation, five visual styles and lazy study tools. */
(function(){
  const esc=App.utils.esc, T=(tr,en)=>App.i18n.lang==="en"?en:tr;
  const tools=[
    ["panel","widget",["Ana Panelim","My Dashboard"],["Kişisel ana ekran ve kart yerleşimi","Personalize widgets and shortcuts"],"track","ana ekran kişiselleştir widget"],
    ["portfolyo","grad",["Öğrenci Portfolyosu","Student Portfolio"],["Projelerini ve başarılarını yerel olarak sakla","Save projects and achievements privately"],"track","portfolyo proje başarı"],
    ["sunum","layers",["AI Sunum Hazırlama","AI Presentation Maker"],["Konudan slayt taslağı oluştur ve dışa aktar","Generate and export slide decks"],"ai","sunum yapay zeka slayt"],
    ["calisma-odasi","chat",["Ortak Çalışma Odası","Shared Study Room"],["Davet koduyla ortak notlar","Collaborative notes with invite codes"],"classroom","arkadaş ortak çalışma oda eşli"]
  ];
  for(const item of tools){
    App.toolCategories.groups.find(g=>g.id===item[4])?.routes.push(item[0]);
    App.hub.TOOLS.push(item);
  }
  const isMobile=()=>matchMedia("(max-width:860px),(pointer:coarse)").matches;
  const defaults=["bugun","konular","program","tekrar","portfolyo","belgeden","sunum","calisma-odasi"];
  const title=(r)=>{
    const tool=App.hub.TOOLS.find(x=>x[0]===r);
    return !tool?r:Array.isArray(tool[2])?T(...tool[2]):App.t(tool[2]);
  };
  const nameIcon=(r)=>App.hub.TOOLS.find(x=>x[0]===r)?.[1]||"widget";
  const routeList=()=>App.hub.TOOLS.filter(x=>x[0]).map(x=>x[0]);
  const widgets=[
    ["bugun","sun",["Bugün","Today"],["Bugünün planı ve çalışma özeti","Today's plan and study summary"]],
    ["konular","book",["Dersler","Lessons"],["Konu anlatımlarına devam et","Continue lesson topics"]],
    ["tekrar","refresh",["Tekrarlar","Reviews"],["Bilgilerini pekiştir","Strengthen what you learned"]],
    ["program","calendar",["Ders Programı","Schedule"],["Haftalık hedef ve dersler","Weekly goals and lessons"]],
    ["portfolyo","grad",["Portfolyom","My Portfolio"],["Projeler ve başarılar","Projects and achievements"]],
    ["belgeden","note",["Belge Çalış","Study Documents"],["PDF/ODF'den çalışma paketi","Build a study pack from PDF/ODF"]],
    ["sunum","layers",["Sunum","Presentations"],["AI ile slayt hazırlama","Create slides with AI"]],
    ["calisma-odasi","chat",["Çalışma Odası","Study Room"],["Arkadaşlarla ortak notlar","Shared notes with friends"]]
  ];
  const allowed=new Set(widgets.map(x=>x[0]));
  const order=()=>{
    const raw=App.prefs.get("homeWidgets",null);
    return (Array.isArray(raw)?raw:defaults).filter((x,i,arr)=>allowed.has(x)&&arr.indexOf(x)===i);
  };
  function widgetHtml(item){
    return '<a href="#/'+item[0]+'" class="v159-widget">'+
      '<span class="v159-widget__icon">'+App.icon(item[1])+'</span><strong>'+esc(T(...item[2]))+'</strong>'+
      '<small>'+esc(T(...item[3]))+'</small></a>';
  }
  function homeHtml(){
    const current=order(),list=current.map(r=>widgets.find(x=>x[0]===r)).filter(Boolean);
    return '<section class="v159-home"><div class="v159-home__head"><span>'+esc(T("Benim Alanım","My Workspace"))+
      '</span><a href="#/panel">'+App.icon("settings")+esc(T("Düzenle","Customize"))+'</a></div>'+
      '<div class="v159-home__grid">'+list.map(widgetHtml).join("")+'</div></section>';
  }
  function panel(view){
    App.setTitle(T("Ana Panelim","My Dashboard"));
    let list=order();
    function paint(){
      view.innerHTML='<div class="page v159-page"><div class="page-head"><div><h1>'+esc(T("Ana Panelim","My Dashboard"))+'</h1><p>'+esc(T("Kartların sırasını değiştir, istemediklerini gizle. Tercihler bu cihazda saklanır.","Reorder or hide widgets. Preferences stay on this device."))+'</p></div></div>'+
        '<div class="v159-manage">'+widgets.map(w=>{
          const selected=list.includes(w[0]),idx=list.indexOf(w[0]);
          return '<div class="v159-manage__item" data-widget="'+w[0]+'"><span class="v159-manage__icon">'+App.icon(w[1])+'</span><span class="v159-manage__label">'+esc(T(...w[2]))+'</span>'+
          '<button type="button" class="btn btn--sm" data-action="toggle" aria-pressed="'+selected+'">'+esc(selected?T("Görünür","Visible"):T("Gizli","Hidden"))+'</button>'+
          '<button type="button" class="icon-btn" data-action="up" aria-label="'+esc(T("Yukarı taşı","Move up"))+'" '+(idx<1?'disabled':'')+'>'+App.icon("arrowUp")+'</button>'+
          '<button type="button" class="icon-btn" data-action="down" aria-label="'+esc(T("Aşağı taşı","Move down"))+'" '+(idx<0||idx===list.length-1?'disabled':'')+'>'+App.icon("chevronD")+'</button></div>';
        }).join("")+'</div><p class="hint">'+esc(T("Ana sohbet ekranı ve bu panel aynı kart düzenini kullanır.","The chat home and dashboard share this layout."))+'</p>'+
        '<div class="v159-home__grid">'+list.map(r=>widgets.find(x=>x[0]===r)).filter(Boolean).map(widgetHtml).join("")+'</div></div>';
      App.hydrateIcons(view);
    }
    view.onclick=e=>{
      const b=e.target.closest("[data-action]"),parent=b?.closest("[data-widget]");if(!parent)return;
      const r=parent.dataset.widget,idx=list.indexOf(r);
      if(b.dataset.action==="toggle")list=idx<0?[...list,r]:list.filter(x=>x!==r);
      if(b.dataset.action==="up"&&idx>0)[list[idx-1],list[idx]]=[list[idx],list[idx-1]];
      if(b.dataset.action==="down"&&idx>=0&&idx<list.length-1)[list[idx],list[idx+1]]=[list[idx+1],list[idx]];
      App.prefs.set("homeWidgets",list);paint();
    };
    paint();return()=>{view.onclick=null;};
  }
  // Classify task complexity locally. No prompt data is stored or sent to a classifier.
  // Explicit engine/model preferences always override automatic selection.
  App.aiSmart={
    classify(text){
      if(App.prefs.get("aiSmartRouting",true)===false)return "default";
      const value=String(text||"").toLocaleLowerCase("tr");
      if(value.length>220||/(kanıtla|ispatla|ayrıntılı|karşılaştır|analiz|tartış|nedenleri|makale|araştırma|proof|derive|analyze|compare|step by step|denklem|integral|türev|olasılık|programla|debug)/i.test(value))return "complex";
      if(value.length<115)return "fast";
      return "default";
    }
  };
  App.smartHome={html:homeHtml,order,render:panel};
  App.router.register("panel",panel);

  // Theme variants are accent/atmosphere presets layered over existing light/dark accessibility mode.
  const themes=[
    ["cosmic","Cosmic","Kozmik",["#8b7bff","#49e0ff"]],
    ["frost","Frost","Buz",["#6fa8db","#a5c8ec"]],
    ["forest","Forest","Orman",["#27b398","#67ddbd"]],
    ["sunset","Sunset","Gün Batımı",["#e69b55","#f3be84"]],
    ["rose","Rose","Gül",["#d77ab9","#f2b6d7"]]
  ];
  function theme(){const v=App.prefs.get("v159Theme","cosmic");return themes.some(x=>x[0]===v)?v:"cosmic";}
  function applyTheme(){document.documentElement.dataset.uiTheme=theme();}
  function chooseTheme(){
    const modal=App.ui.modal({title:T("Arayüz Temaları","Interface Themes"),
      body:'<p class="hint">'+esc(T("Açık/koyu modunu değiştirmeden renk stilini seç.","Choose a visual style without changing light/dark mode."))+'</p>'+
      '<div class="v159-theme-grid">'+themes.map(x=>'<button class="v159-theme" data-ui-choice="'+x[0]+'" aria-pressed="'+(theme()===x[0])+'" type="button"><span class="v159-theme__swatch" style="--sw-a:'+x[3][0]+';--sw-b:'+x[3][1]+'"></span><strong>'+esc(T(x[2],x[1]))+'</strong></button>').join("")+'</div>'});
    modal.el.addEventListener("click",e=>{const b=e.target.closest("[data-ui-choice]");if(!b)return;App.prefs.set("v159Theme",b.dataset.uiChoice);applyTheme();modal.el.querySelectorAll("[data-ui-choice]").forEach(q=>q.setAttribute("aria-pressed",String(q===b)));});
  }
  App.visualThemes={themes,theme,chooseTheme,applyTheme};applyTheme();

  // Keep the established navigation intact, add a tiny smart/favourites row on mobile.
  function smartMenu(){
    const sidebar=document.querySelector("#sidebar"),scroll=sidebar?.querySelector(".sidebar__scroll");
    if(!scroll||scroll.querySelector(".v159-smart-menu"))return;
    const nav=document.createElement("section");
    nav.className="v159-smart-menu sidebar__label-block";
    scroll.prepend(nav);
    function paint(){
      const available=routeList(),pins=(App.hub.pins?.()||[]).filter(x=>available.includes(x));
      const recent=(App.hub.recents?.()||[]).filter(x=>available.includes(x));
      const list=[...new Set([...pins,...recent,"panel"])].filter(Boolean).slice(0,4);
      nav.innerHTML='<div class="v159-smart-menu__title">'+esc(T("Hızlı Erişim","Quick Access"))+
        '<a href="#/araclar">'+esc(T("Düzenle","Edit"))+'</a></div><div class="v159-smart-menu__links">'+
        list.map(x=>'<a href="#/'+x+'">'+App.icon(nameIcon(x))+'<span>'+esc(title(x))+'</span></a>').join("")+
        '</div>';
    }
    window.addEventListener("da:route",paint);paint();
  }
  App.smartMenu={init:smartMenu};

  // Dynamic code loading applies to NEW resource-intensive modules; existing lesson content is already lazy.
  const lazyRoutes=new Set(["portfolyo","belgeden","sunum","calisma-odasi"]);
  let promise=null;
  App.router.need(async r=>{
    if(!lazyRoutes.has(r.name))return;
    if(App.v159Studio)return;
    if(!promise)promise=new Promise((resolve,reject)=>{
      const script=document.createElement("script");script.src="js/modules/v159-studio.js";
      script.onload=()=>App.v159Studio?resolve():reject(Error("Study module not initialized"));
      script.onerror=()=>reject(Error("Study module could not load"));
      document.body.appendChild(script);
    }).catch(e=>{promise=null;throw e;});
    return promise;
  });
})();
