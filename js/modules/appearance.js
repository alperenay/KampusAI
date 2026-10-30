/* Personal visual atmosphere and distraction-free lesson reading. */
(function () {
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr),
    esc = App.utils.esc;
  const C = window.KampusAppearanceConfig;
  const transparency = matchMedia('(prefers-reduced-transparency: reduce)');
  let settings = C.read((k, fallback) => App.prefs.get(k, fallback));
  const palettes = C.atmospheres.map(p => [p.id, p.tr, p.en]);
  let atmosphere,
    restore,
    reading = false,
    returnFocus;
  function palette() { return settings.atmosphere; }
  function apply() {
    const name = App.router.current()?.name || "",
      active = ["", "bugun", "araclar"].includes(name), root = document.documentElement;
    C.apply(root, settings, App.theme.current);
    atmosphere.hidden = !active || palette() === "off" || root.hasAttribute("data-a11y-contrast");
    root.toggleAttribute("data-ambient-running", !atmosphere.hidden && !document.hidden &&
      !App.motion.reduced() && !transparency.matches && !root.classList.contains('lite') && !root.classList.contains('nogpu') && settings.motion === "full" && settings.ambientMotion);
  }
  function update(patch) {
    settings = C.normalize({...settings, ...patch});
    App.prefs.set("appearanceOptions", settings);
    App.prefs.set("v159Theme", settings.palette);
    App.prefs.set("appearanceAtmosphere", settings.atmosphere);
    App.prefs.set("appearanceAmbientMotion", settings.ambientMotion);
    apply();
    window.dispatchEvent(new CustomEvent("da:appearance"));
  }
  function reload() {
    settings = C.read((k, fallback) => App.prefs.get(k, fallback));
    apply();
    window.dispatchEvent(new CustomEvent("da:appearance"));
  }
  function setReading(on) {
    if (on && !document.querySelector("#view .lesson")) return;
    reading = !!on;
    document.documentElement.toggleAttribute("data-lesson-reading", reading);
    restore.hidden = !reading;
    if (reading) {
      returnFocus = document.activeElement;
      document.querySelector("#app").classList.remove("is-menu-open");
      document.getElementById("scrim").hidden = true;
      restore.focus();
    } else if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
  }
  function lesson() {
    setReading(false);
    const view = document.getElementById("view");
    if (!view.querySelector(".lesson")) return;
    const actions = view.querySelector(".page-head__actions");
    if (!actions || actions.querySelector("[data-reading-mode]")) return;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "btn";
    b.dataset.readingMode = "";
    b.innerHTML = App.icon("book") + esc(T("Menüleri gizle", "Hide menus"));
    b.addEventListener("click", () => setReading(true));
    actions.prepend(b);
  }
  const groups = {
    style: [["glass","Cam","Glass"],["clean","Minimal","Minimal"],["soft","Yumuşak","Soft"],["outline","Çizgisel","Outline"],["paper","Kâğıt","Paper"]],
    font: [["system","Sistem","System"],["humanist","Hümanist","Humanist"],["rounded","Yuvarlak","Rounded"],["serif","Serif","Serif"],["mono","Eş aralıklı","Monospace"]],
    readingFont: [["same","Arayüzle aynı","Same as interface"],["system","Sistem sans","System sans"],["serif","Kitap serif","Book serif"],["mono","Eş aralıklı","Monospace"]],
    readingSize: [["small","16 px","16 px"],["normal","17 px","17 px"],["large","19 px","19 px"],["extra","21 px","21 px"]],
    lineHeight: [["compact","Sık · 1,55","Compact · 1.55"],["normal","Dengeli · 1,8","Balanced · 1.8"],["wide","Geniş · 2","Wide · 2"]],
    readingWidth: [["narrow","Dar · 60 karakter","Narrow · 60 characters"],["balanced","Dengeli · 76 karakter","Balanced · 76 characters"],["wide","Geniş · 92 karakter","Wide · 92 characters"]],
    tracking: [["normal","Normal","Normal"],["wide","Geniş","Wide"]],
    corners: [["round","Yuvarlak","Round"],["soft","Daha yuvarlak","Extra round"],["sharp","Hafif köşeli","Slightly square"]],
    density: [["normal","Dengeli","Balanced"],["compact","Sıkı","Compact"],["roomy","Ferah","Roomy"]],
    motion: [["full","Akıcı","Fluid"],["gentle","Hafif","Gentle"],["off","Kapalı","Off"]],
    blur: [["normal","Standart","Standard"],["subtle","Hafif","Subtle"],["off","Kapalı","Off"]],
    background: [["subtle","Hafif","Subtle"],["balanced","Dengeli","Balanced"],["vivid","Belirgin","Vivid"]]
  };
  function select(key, tr, en) {
    return '<label class="field"><span class="field__label">'+esc(T(tr,en))+'</span><select class="select" data-appearance-option="'+key+'">'+
      groups[key].map(x=>'<option value="'+x[0]+'"'+(settings[key]===x[0]?' selected':'')+'>'+esc(T(x[1],x[2]))+'</option>').join('')+'</select></label>';
  }
  function toggle(key, tr, en, id) {
    return '<label class="appearance-toggle"><input type="checkbox" '+(id?'id="'+id+'" ':'')+'data-appearance-option="'+key+'" '+(settings[key]?'checked':'')+'><span>'+esc(T(tr,en))+'</span></label>';
  }
  function open(section = 'colours') {
    const sections=[['colours','Renkler','Colours'],['layout','Arayüz','Interface'],['reading','Yazı ve okuma','Type & reading'],['effects','Hareket ve efekt','Motion & effects']];
    if(!sections.some(s=>s[0]===section))section='colours';
    const m=App.ui.modal({title:T('Görünümü özelleştir','Personalise appearance'),body:
      '<p class="hint">'+esc(T('Seçimler anında uygulanır ve bu cihazda saklanır. Depolama kapalıysa yalnız bu oturumda geçerlidir.','Changes apply instantly and are saved on this device. With storage blocked, they last for this session.'))+'</p>'+
      '<div class="appearance-preview"><span class="appearance-preview__tag">Aa</span><div><strong>'+esc(T('Senin çalışma alanın','Your workspace'))+'</strong><small data-appearance-summary></small></div></div>'+
      '<nav class="appearance-tabs" aria-label="'+esc(T('Görünüm bölümleri','Appearance sections'))+'">'+sections.map(s=>'<button type="button" id="appearance-tab-'+s[0]+'" data-appearance-tab="'+s[0]+'" aria-controls="appearance-section-'+s[0]+'" aria-pressed="'+(s[0]===section)+'">'+esc(T(s[1],s[2]))+'</button>').join('')+'</nav>'+
      '<form id="appearanceForm">'+
      '<section class="appearance-section" id="appearance-section-colours" data-appearance-section="colours" aria-labelledby="appearance-tab-colours"'+(section==='colours'?'':' hidden')+'><h3>'+esc(T('12 renk paleti','12 colour palettes'))+'</h3><div class="appearance-palette-grid">'+C.palettes.map(p=>'<button class="appearance-palette" data-ui-choice="'+p.id+'" type="button" aria-pressed="'+(settings.palette===p.id)+'"><span class="appearance-palette__swatch" style="--sw-a:'+p.swatch[0]+';--sw-b:'+p.swatch[1]+'" aria-hidden="true"></span><span>'+esc(T(p.tr,p.en))+'</span></button>').join('')+'</div><h3>'+esc(T('Arka plan atmosferi','Background atmosphere'))+'</h3><div class="atmosphere-options">'+palettes.map(p=>'<button class="btn atmosphere-option" type="button" data-atmosphere-choice="'+p[0]+'" aria-pressed="'+(palette()===p[0])+'"><span class="atmosphere-swatch" style="background:linear-gradient(135deg,'+C.atmospheres.find(a=>a.id===p[0]).a+','+C.atmospheres.find(a=>a.id===p[0]).b+')" aria-hidden="true"></span>'+esc(T(p[1],p[2]))+'</button>').join('')+'</div>'+select('background','Arka plan yoğunluğu','Background intensity')+toggle('ambientMotion','Arka plan ışıkları hareket etsin','Animate background lights','ambientMotion')+'</section>'+
      '<section class="appearance-section" id="appearance-section-layout" data-appearance-section="layout" aria-labelledby="appearance-tab-layout"'+(section==='layout'?'':' hidden')+'><h3>'+esc(T('Yüzeyler ve yerleşim','Surfaces & layout'))+'</h3><div class="appearance-fields">'+select('style','Arayüz stili','Interface style')+select('corners','Kart köşeleri','Card corners')+select('density','Kart aralıkları','Card spacing')+'</div><p class="hint">'+esc(T('Üst çubuk şeffaf kalır. Sıkı görünümde de dokunma hedefleri küçültülmez.','The header stays transparent. Compact cards keep their touch targets.'))+'</p></section>'+
      '<section class="appearance-section" id="appearance-section-reading" data-appearance-section="reading" aria-labelledby="appearance-tab-reading"'+(section==='reading'?'':' hidden')+'><h3>'+esc(T('Tipografi','Typography'))+'</h3><div class="appearance-fields">'+select('font','Arayüz yazı tipi','Interface font')+select('readingFont','Ders okuma yazı tipi','Lesson reading font')+select('readingSize','Ders metni boyutu','Lesson text size')+select('lineHeight','Ders satır aralığı','Lesson line height')+select('readingWidth','Ders metni genişliği','Lesson text width')+select('tracking','Ders harf aralığı','Lesson letter spacing')+'</div><p class="hint">'+esc(T('Yazı tipleri cihazdaki sistem fontlarını kullanır; görünüm cihaza göre değişebilir. Disleksi yazı tipi ve erişilebilirlik aralıkları önceliklidir. Formüller ve kodlar kendi fontunu korur.','Fonts use installed system families and may vary by device. Dyslexia and accessible spacing take priority. Formulae and code keep their own fonts.'))+'</p></section>'+
      '<section class="appearance-section" id="appearance-section-effects" data-appearance-section="effects" aria-labelledby="appearance-tab-effects"'+(section==='effects'?'':' hidden')+'><h3>'+esc(T('Hareket ve efektler','Motion & effects'))+'</h3><div class="appearance-fields">'+select('motion','Animasyon seviyesi','Animation level')+select('blur','Cam bulanıklığı','Glass blur')+'</div>'+toggle('shadows','Kart gölgeleri','Card shadows')+toggle('touchFeedback','Dokunma parıltısı','Touch glow')+toggle('intro','Başlangıç animasyonu','Launch animation')+'<p class="hint">'+esc(T('Hafif mod, sürekli arka plan hareketi ve dokunma parıltısı yerine kısa geçişler kullanır. Sistem hareket/saydamlık azaltma ve düşük GPU ayarları önceliklidir.','Gentle mode uses short transitions instead of continuous ambient motion or touch glow. System motion/transparency reduction and low-GPU settings take priority.'))+'</p></section></form>'+
      '<div class="appearance-footer"><button class="btn" type="button" data-appearance-reset>'+esc(T('Varsayılan görünüme dön','Restore default appearance'))+'</button><small class="hint" role="status" aria-live="polite" data-appearance-status></small></div>'});
    m.el.closest('.modal-backdrop').classList.add('appearance-backdrop');
    m.el.classList.add('modal--appearance');
    function refreshControls(){
      m.el.querySelectorAll('[data-ui-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.uiChoice===settings.palette)));
      m.el.querySelectorAll('[data-atmosphere-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.atmosphereChoice===settings.atmosphere)));
      m.el.querySelectorAll('[data-appearance-option]').forEach(el=>{if(el.type==='checkbox')el.checked=settings[el.dataset.appearanceOption];else el.value=settings[el.dataset.appearanceOption];});
      const p=C.palettes.find(p=>p.id===settings.palette),style=groups.style.find(s=>s[0]===settings.style);
      m.el.querySelector('[data-appearance-summary]').textContent=T(p.tr,p.en)+' · '+T(style[1],style[2]);
    }
    function changed(patch){update(patch);refreshControls();m.el.querySelector('[data-appearance-status]').textContent=T('Görünüm uygulandı','Appearance applied');}
    m.el.addEventListener('click',e=>{
      const tab=e.target.closest('[data-appearance-tab]');
      if(tab){m.el.querySelectorAll('[data-appearance-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b===tab)));m.el.querySelectorAll('[data-appearance-section]').forEach(s=>s.hidden=s.dataset.appearanceSection!==tab.dataset.appearanceTab);return;}
      const paletteButton=e.target.closest('[data-ui-choice]'),atmosphereButton=e.target.closest('[data-atmosphere-choice]');
      if(paletteButton)changed({palette:paletteButton.dataset.uiChoice});
      else if(atmosphereButton)changed({atmosphere:atmosphereButton.dataset.atmosphereChoice});
      else if(e.target.closest('[data-appearance-reset]'))changed({...C.defaults});
    });
    m.el.querySelector('#appearanceForm').addEventListener('submit',e=>e.preventDefault());
    m.el.querySelector('#appearanceForm').addEventListener('change',e=>{const el=e.target.closest('[data-appearance-option]');if(el)changed({[el.dataset.appearanceOption]:el.type==='checkbox'?el.checked:el.value});});
    refreshControls();
  }
  function init() {
    const main = document.getElementById("main");
    atmosphere = document.createElement("div");
    atmosphere.className = "motion-atmosphere";
    atmosphere.setAttribute("aria-hidden", "true");
    // Original vector ribbons; no reference-video pixels, libraries or network assets.
    const ribbons = Array.from(
      { length: 20 },
      (_, i) =>
        '<path d="M -120 ' +
        (850 - i * 12) +
        " C " +
        (200 + i * 8) +
        " " +
        (200 - i * 7) +
        ", " +
        (660 + i * 9) +
        " " +
        (940 - i * 5) +
        ", " +
        (860 + i * 5) +
        " " +
        (390 - i * 7) +
        " S 1280 " +
        (160 - i * 6) +
        ", 1520 " +
        (140 + i * 5) +
        '" opacity="' +
        (0.12 + (i % 5) * 0.045) +
        '"/>',
    ).join("");
    atmosphere.innerHTML =
      '<svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" focusable="false"><g class="atmosphere-flow">' +
      ribbons +
      '</g><g class="atmosphere-flow atmosphere-flow--echo" transform="translate(80 -80)">' +
      ribbons +
      "</g></svg>";
    main.prepend(atmosphere);
    restore = document.createElement("button");
    restore.type = "button";
    restore.className = "reading-restore btn";
    restore.hidden = true;
    restore.innerHTML =
      App.icon("menu") + esc(T("Menüleri göster", "Show menus"));
    restore.addEventListener("click", () => setReading(false));
    document.body.appendChild(restore);
    const q = document.getElementById("quickSettings"),
      b = document.createElement("button");
    b.type = "button";
    b.className = "qs__item";
    b.id = "appearanceSettings";
    b.innerHTML =
      App.icon("sparkle") +
      '<span class="qs__text">' +
      esc(T("Görünümü özelleştir", "Personalise appearance")) +
      "</span>";
    q.before(b);
    b.addEventListener("click", () => {
      document.getElementById("quickPanel").hidden = true;
      document
        .getElementById("quickBtn")
        .setAttribute("aria-expanded", "false");
      open();
    });
    const close = document.createElement("button");
    close.type = "button";
    close.className = "icon-btn sidebar-close";
    close.setAttribute("aria-label", T("Menüyü kapat", "Close menu"));
    close.innerHTML = App.icon("close");
    document.querySelector(".sidebar__head").appendChild(close);
    close.addEventListener("click", () => {
      document.getElementById("app").classList.remove("is-menu-open");
      document.getElementById("scrim").hidden = true;
      document.getElementById("menuBtn").focus();
    });
    document.addEventListener("keydown", (e) => {
      if (reading && e.key === "Escape") {
        e.preventDefault();
        setReading(false);
      }
    });
    window.addEventListener("da:route", () => {
      lesson();
      apply();
    });
    window.addEventListener("hashchange", () => {
      if (reading) setReading(false);
    });
    document.addEventListener("visibilitychange", apply);
    new MutationObserver(apply).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-a11y-motion", "data-a11y-contrast", "class"],
    });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.addEventListener) media.addEventListener("change", apply);
    else media.addListener(apply);
    if (transparency.addEventListener) transparency.addEventListener('change', apply);
    else transparency.addListener(apply);
    App.i18n.onChange(() => {
      b.querySelector(".qs__text").textContent = T(
        "Görünümü özelleştir",
        "Personalise appearance",
      );
      restore.innerHTML =
        App.icon("menu") + esc(T("Menüleri göster", "Show menus"));
      close.setAttribute("aria-label", T("Menüyü kapat", "Close menu"));
    });
    App.theme.onChange(apply);
    window.addEventListener("storage", e => { if(e.key===null || ["da:pref:appearanceOptions","da:pref:v159Theme","da:pref:appearanceAtmosphere","da:pref:appearanceAmbientMotion"].includes(e.key)) reload(); });
    apply();
  }
  App.appearance = { open, setReading, palette, update, reload, options: () => ({...settings}), palettes: C.palettes };
  init();
})();
