/* =========================================================
   formuller.js — Formül Defteri (v1.32)   #/formuller
   Matematik, Fizik ve Kimya formülleri sınıfa ve üniteye göre; arama, yıldızlama,
   "ne zaman kullanılır" notu, tek dokunuşla konu anlatımına geçiş, hızlı tekrar ve yazdırma.
   Konu sayfalarında "Bu konunun formülleri" kartı (cardHtml) da buradan gelir.
   Veri: js/data/formuller.js (yalnızca gerektiğinde yüklenir).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const DERS = [["matematik", ["Matematik", "Mathematics"], "sMath"], ["fizik", ["Fizik", "Physics"], "sPhys"], ["kimya", ["Kimya", "Chemistry"], "sChem"]];
  const GRADES = ["9", "10", "11", "12"];
  const norm = (s) => String(s || "").toLocaleLowerCase("tr").replace(/[âà]/g, "a").replace(/[îì]/g, "i").replace(/[ûù]/g, "u");
  const texHtml = (tex) => App.markdown.render("$$" + tex + "$$");

  let loading = null;
  function load() {
    if (App.data.formuller) return Promise.resolve(App.data.formuller);
    return (loading = loading || new Promise((res) => {
      const sc = document.createElement("script"); sc.src = "js/data/formuller.js";
      sc.onload = () => res(App.data.formuller || []); sc.onerror = () => { loading = null; res([]); };
      document.head.appendChild(sc);
    }));
  }
  const stars = () => new Set(App.prefs.get("fmStar", []) || []);
  const idOf = (f) => f.g + "/" + f.d + "/" + f.k + "/" + f.ad;
  const unitOf = (f) => {
    const units = (App.data.content || {})[f.g + "/" + f.d] || [];
    const u = units.find((x) => x.id === f.k.split("/")[0]);
    return u ? App.L(u.name).replace(/^\d+\.\s*(Tema|Ünite|Unit|Theme)\s*(\([A-Z]\))?:\s*/, "") : "";
  };
  const topicHref = (f) => "#/konular/" + f.g + "/" + f.d + "/" + f.k;

  function cardOne(f, st, opts) {
    const id = idOf(f), on = st.has(id);
    return '<article class="card fm-card" data-id="' + esc(id) + '">' +
      '<div class="fm-card__head"><h3>' + esc(f.ad) + "</h3>" +
        '<button type="button" class="fm-star' + (on ? " is-on" : "") + '" data-star aria-pressed="' + on + '" title="' + esc(T("Tekrar listeme ekle", "Add to my review list")) + '" aria-label="' + esc(T("Yıldızla", "Star")) + '">' + App.icon("star") + "</button></div>" +
      '<div class="fm-tex">' + texHtml(f.tex) + "</div>" +
      '<p class="fm-when"><b>' + esc(T("Ne zaman: ", "When: ")) + "</b>" + esc(f.ne) + "</p>" +
      (f.v ? '<p class="fm-vars">' + esc(f.v) + "</p>" : "") +
      (opts && opts.noLink ? "" : '<a class="fm-link" href="' + topicHref(f) + '">' + App.icon("book") + esc(T("Konu anlatımı", "Lesson")) + (opts && opts.showGrade ? " · " + esc(f.g + ". " + T("sınıf", "grade")) : "") + App.icon("chevron") + "</a>") +
      "</article>";
  }

  /* ---------- ana sayfa ---------- */
  async function page(view, params) {
    App.setTitle(T("Formül Defteri", "Formula Book"));
    view.innerHTML = '<div class="page fm"><div class="page-head"><div><h1>' + esc(T("Formül Defteri", "Formula Book")) + '</h1><p class="hint">' +
      esc(T("Matematik, fizik ve kimya formülleri; her birinin ne zaman kullanıldığı ve konu anlatımı bir dokunuş uzakta.", "Maths, physics and chemistry formulas with when to use each one and a link to the lesson.")) + "</p></div></div>" +
      '<div class="hm-loading">' + esc(T("Yükleniyor…", "Loading…")) + "</div></div>";
    const all = await load();
    if (!view.isConnected) return;
    const st = stars();
    let ders = (params && params[0]) || App.prefs.get("fmDers", "fizik");
    if (ders !== "tumu" && !DERS.some((d) => d[0] === ders)) ders = "fizik";
    let grade = App.prefs.get("fmG", "hepsi"), q = "", onlyStar = false;

    view.innerHTML = '<div class="page fm"><div class="page-head"><div><h1>' + esc(T("Formül Defteri", "Formula Book")) + '</h1><p class="hint">' +
      esc(T("Matematik, fizik ve kimya formülleri; her birinin ne zaman kullanıldığı ve konu anlatımı bir dokunuş uzakta.", "Maths, physics and chemistry formulas with when to use each one and a link to the lesson.")) + "</p></div>" +
      '<div class="page-head__actions no-print"><button class="btn btn--primary" type="button" id="fmReview">' + App.icon("layers") + esc(T("Hızlı tekrar", "Quick review")) + '</button><button class="btn" type="button" id="fmPrint">' + App.icon("download") + esc(T("Yazdır", "Print")) + "</button></div></div>" +
      '<div class="fm-tools no-print">' +
        '<label class="tc-search fm-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="fmQ" placeholder="' + esc(T("Ara: ivme, mol, türev, pH…", "Search: acceleration, mole, derivative…")) + '" aria-label="' + esc(T("Formül ara", "Search formulas")) + '"></label>' +
        '<div class="yz-seg" role="radiogroup" aria-label="' + esc(T("Ders", "Subject")) + '" id="fmD">' + [["tumu", ["Tümü", "All"]]].concat(DERS).map(([k, n]) => '<button type="button" role="radio" data-d="' + k + '" aria-checked="' + (k === ders) + '">' + esc(T(n[0], n[1])) + "</button>").join("") + "</div>" +
        '<div class="yz-seg" role="radiogroup" aria-label="' + esc(T("Sınıf", "Grade")) + '" id="fmG">' + ["hepsi"].concat(GRADES).map((g) => '<button type="button" role="radio" data-g="' + g + '" aria-checked="' + (g === grade) + '">' + esc(g === "hepsi" ? T("Tüm sınıflar", "All grades") : g + ".") + "</button>").join("") + "</div>" +
        '<label class="check-row fm-only"><input type="checkbox" id="fmStarOnly"> ' + App.icon("star") + esc(T("Yalnızca yıldızlılar", "Starred only")) + "</label>" +
      "</div>" +
      '<p class="hint fm-count" id="fmCount" aria-live="polite"></p>' +
      '<div id="fmList"></div><div id="fmReviewBox" hidden></div></div>';
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);

    const filtered = () => {
      const nq = norm(q).trim(), words = nq ? nq.split(/\s+/) : [];
      return all.filter((f) => (ders === "tumu" || f.d === ders) && (grade === "hepsi" || f.g === grade) && (!onlyStar || st.has(idOf(f))) &&
        (!words.length || words.every((w) => norm(f.ad + " " + f.ne + " " + f.v + " " + unitOf(f) + " " + f.d + " " + f.tex).indexOf(w) >= 0)));
    };
    const paint = () => {
      App.prefs.set("fmDers", ders); App.prefs.set("fmG", grade);
      const list = filtered();
      $("#fmCount").textContent = T(list.length + " formül", list.length + " formulas");
      if (!list.length) { $("#fmList").innerHTML = App.ui.empty("search", T("Formül bulunamadı", "No formulas found"), T("Aramayı ya da süzgeçleri değiştir.", "Change the search or filters.")); App.hydrateIcons($("#fmList")); return; }
      // ders → sınıf → ünite
      let html = "", last = "";
      DERS.forEach(([d, dn, ic]) => {
        const ofD = list.filter((f) => f.d === d); if (!ofD.length) return;
        if (ders === "tumu") html += '<h2 class="fm-subj">' + App.icon(ic) + esc(T(dn[0], dn[1])) + "</h2>";
        GRADES.forEach((g) => {
          const ofG = ofD.filter((f) => f.g === g); if (!ofG.length) return;
          const units = [];
          ofG.forEach((f) => { const u = f.k.split("/")[0]; if (units.indexOf(u) < 0) units.push(u); });
          units.forEach((u) => {
            const ofU = ofG.filter((f) => f.k.split("/")[0] === u);
            const head = g + ". " + T("sınıf", "grade") + " · " + unitOf(ofU[0]);
            if (head !== last) { html += '<h3 class="fm-unit">' + esc(head) + "</h3>"; last = head; }
            html += '<div class="fm-grid">' + ofU.map((f) => cardOne(f, st)).join("") + "</div>";
          });
        });
      });
      $("#fmList").innerHTML = html; App.hydrateIcons($("#fmList"));
    };
    let tm = 0;
    $("#fmQ").addEventListener("input", (e) => { q = e.target.value; clearTimeout(tm); tm = setTimeout(paint, 150); });
    $("#fmD").addEventListener("click", (e) => { const b = e.target.closest("[data-d]"); if (!b) return; ders = b.dataset.d; $("#fmD").querySelectorAll("button").forEach((x) => x.setAttribute("aria-checked", String(x === b))); paint(); });
    $("#fmG").addEventListener("click", (e) => { const b = e.target.closest("[data-g]"); if (!b) return; grade = b.dataset.g; $("#fmG").querySelectorAll("button").forEach((x) => x.setAttribute("aria-checked", String(x === b))); paint(); });
    $("#fmStarOnly").addEventListener("change", (e) => { onlyStar = e.target.checked; paint(); });
    view.addEventListener("click", (e) => {
      const b = e.target.closest("[data-star]"); if (!b) return;
      const id = b.closest("[data-id]").dataset.id;
      if (st.has(id)) st.delete(id); else st.add(id);
      App.prefs.set("fmStar", Array.from(st));
      const on = st.has(id); b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", String(on));
      if (onlyStar && !on) paint();
    });
    $("#fmPrint").addEventListener("click", () => window.print());
    $("#fmReview").addEventListener("click", () => review(view, filtered(), st));
    paint();
  }

  /* ---------- hızlı tekrar: adı ve ne zaman kullanıldığını gör, formülü hatırla, aç ---------- */
  function review(view, list, st) {
    const box = view.querySelector("#fmReviewBox"), lst = view.querySelector("#fmList");
    if (!list.length) { App.ui.toast(T("Tekrar için önce formül seç.", "Choose some formulas first."), "info"); return; }
    const deck = list.slice().sort(() => Math.random() - 0.5).slice(0, 20);
    let i = 0, known = 0, open = false;
    const close = () => { box.hidden = true; box.innerHTML = ""; lst.hidden = false; view.querySelector(".fm-tools").hidden = false; };
    const show = () => {
      if (i >= deck.length) {
        box.innerHTML = '<div class="card fm-rev"><h2>' + esc(T("Tekrar bitti", "Review finished")) + '</h2><p class="fm-rev__score">' + known + " / " + deck.length + "</p><p>" +
          esc(T("Hatırlamadıkların yıldızlandı; \"Yalnızca yıldızlılar\" ile yeniden çalışabilirsin.", "The ones you missed were starred so you can review them again.")) + '</p><div class="fm-rev__acts"><button class="btn btn--primary" type="button" data-rev="again">' + esc(T("Yeniden", "Again")) + '</button><button class="btn" type="button" data-rev="close">' + esc(T("Listeye dön", "Back to list")) + "</button></div></div>";
        return;
      }
      const f = deck[i];
      box.innerHTML = '<div class="card fm-rev"><div class="fm-rev__top"><span>' + (i + 1) + " / " + deck.length + '</span><button class="btn btn--sm btn--ghost" type="button" data-rev="close">' + App.icon("close") + esc(T("Kapat", "Close")) + "</button></div>" +
        '<h2>' + esc(f.ad) + '</h2><p class="fm-when"><b>' + esc(T("Ne zaman: ", "When: ")) + "</b>" + esc(f.ne) + "</p>" +
        (open ? '<div class="fm-tex fm-rev__tex">' + texHtml(f.tex) + "</div>" + (f.v ? '<p class="fm-vars">' + esc(f.v) + "</p>" : "") +
          '<div class="fm-rev__acts"><button class="btn" type="button" data-rev="miss">' + esc(T("Hatırlamadım", "Didn't know")) + '</button><button class="btn btn--primary" type="button" data-rev="ok">' + esc(T("Hatırladım", "Knew it")) + "</button></div>"
          : '<p class="hint">' + esc(T("Formülü aklında yaz, sonra aç.", "Recall the formula, then reveal it.")) + '</p><div class="fm-rev__acts"><button class="btn btn--primary" type="button" data-rev="show">' + esc(T("Formülü göster", "Show formula")) + "</button></div>") +
        "</div>";
      App.hydrateIcons(box);
    };
    box.onclick = (e) => {
      const b = e.target.closest("[data-rev]"); if (!b) return;
      const a = b.dataset.rev;
      if (a === "close") return close();
      if (a === "again") { i = 0; known = 0; open = false; deck.sort(() => Math.random() - 0.5); return show(); }
      if (a === "show") { open = true; return show(); }
      if (a === "ok") known++;
      if (a === "miss") { st.add(idOf(deck[i])); App.prefs.set("fmStar", Array.from(st)); }
      i++; open = false; show();
    };
    lst.hidden = true; view.querySelector(".fm-tools").hidden = true; box.hidden = false; show();
    box.scrollIntoView({ block: "start" });
  }

  /* ---------- konu sayfası kartı ---------- */
  async function cardHtml(key) {
    const parts = String(key).split("/"); if (parts.length < 4) return "";
    const [g, d, u, k] = parts;
    if (["matematik", "fizik", "kimya"].indexOf(d) < 0) return "";
    const all = await load();
    const list = all.filter((f) => f.g === g && f.d === d && f.k === u + "/" + k);
    if (!list.length) return "";
    const st = stars();
    return '<section class="card lesson__section fm-lesson"><h2>' + App.icon("sMath") + esc(T("Bu konunun formülleri", "Formulas for this topic")) + "</h2>" +
      '<div class="fm-grid fm-grid--lesson">' + list.map((f) => cardOne(f, st, { noLink: true })).join("") + "</div>" +
      '<p class="hint"><a href="#/formuller/' + d + '">' + esc(T("Formül Defteri'nde tümünü gör", "See all in the Formula Book")) + "</a></p></section>";
  }
  // Konu sayfasındaki yıldız düğmeleri
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".fm-lesson [data-star]"); if (!b) return;
    const st = stars(), id = b.closest("[data-id]").dataset.id;
    if (st.has(id)) st.delete(id); else st.add(id);
    App.prefs.set("fmStar", Array.from(st));
    const on = st.has(id); b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", String(on));
  });

  App.formuller = { load, cardHtml, idOf };
  App.router.register("formuller", (view, params) => page(view, params));
})();
