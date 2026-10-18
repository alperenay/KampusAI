/* =========================================================
   nav.js — menü grupları, hızlı ayarlar, arama (Ctrl+K) ve
   asistan açılışındaki "Bugün" şeridi

   • Sol menü gruplara ayrılır (Sabitlenenler · Çalış · Pratik · Takip · Araçlar); gruplar açılıp
     kapanır, açık olduğu sayfanın grubu her zaman açılır. Kapalı grupta
     bekleyen bir rozet varsa başlığında nokta görünür.
   • Üst çubuk sadeleşti: tema, dil, yedek ve ayarlar tek bir açılır panelde.
   • Arama paleti: sayfalar, eylemler, tüm kazanımlar ve sohbetler; Türkçe
     karakterlerden bağımsız arar (ş = s, ı = i …). Ctrl/⌘ + K ya da "/".
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const $ = (s, r) => (r || document).querySelector(s);
  const route = () => location.hash.replace(/^#\/?/, "").split("/")[0];
  const isMobile = () => window.matchMedia("(max-width: 860px)").matches;

  /* ---------------- Menü grupları ---------------- */
  const DEFAULT_OPEN = { pins: true, study: true, practice: true, track: true, tools: false, chats: true, grades: false, recentExams: false };
  const openState = () => Object.assign({}, DEFAULT_OPEN, App.prefs.get("navOpen", {}));

  function setGroup(el, open, save) {
    el.classList.toggle("is-closed", !open);
    const head = el.querySelector(".nav-group__head, [data-side-toggle]");
    if (head) head.setAttribute("aria-expanded", String(open));
    if (save) { const s = App.prefs.get("navOpen", {}); s[el.dataset.group || el.dataset.side] = open; App.prefs.set("navOpen", s); }
  }
  function syncGroups() {
    const st = openState(), r = route();
    document.querySelectorAll(".nav-group").forEach((g) => {
      const hasActive = !!g.querySelector('.nav__item[data-route="' + r + '"]');
      setGroup(g, st[g.dataset.group] || hasActive, false);
    });
    document.querySelectorAll("[data-side-toggle]").forEach((b) => {
      const sec = b.closest(".side-section");
      sec.dataset.side = b.dataset.sideToggle;
      setGroup(sec, st[b.dataset.sideToggle], false);
    });
  }
  function bindGroups() {
    document.querySelectorAll(".nav-group__head").forEach((h) => h.addEventListener("click", () => {
      const g = h.closest(".nav-group"); setGroup(g, g.classList.contains("is-closed"), true);
    }));
    document.querySelectorAll("[data-side-toggle]").forEach((b) => b.addEventListener("click", () => {
      const sec = b.closest(".side-section"); setGroup(sec, sec.classList.contains("is-closed"), true);
    }));
    window.addEventListener("hashchange", () => {
      const r = route();
      document.querySelectorAll(".nav-group.is-closed").forEach((g) => { if (g.querySelector('.nav__item[data-route="' + r + '"]')) setGroup(g, true, false); });
      closeQuick();
      // Telefonda menüden bir sayfa seçilince menü kapanır
      if (isMobile()) { const app = $("#app"); if (app.classList.contains("is-menu-open")) { app.classList.remove("is-menu-open"); $("#scrim").hidden = true; } }
    });
    syncGroups();
  }

  /* ---------------- Hızlı ayarlar paneli ---------------- */
  function paintQuick() {
    const ic = $("#quickIcon");
    if (ic) { ic.innerHTML = App.icon(App.theme.current === "light" ? "sun" : "moon"); }
    const w = $("#backupWhen");
    if (w) { const last = App.prefs.get("lastBackup", null); w.textContent = last ? t("quick.last", { date: new Date(last).toLocaleDateString(App.i18n.locale) }) : t("quick.never"); }
  }
  function openQuick() {
    paintQuick();
    $("#quickPanel").hidden = false; $("#quickBtn").setAttribute("aria-expanded", "true");
    const first = $("#quickPanel [aria-checked='true']"); if (first && !window.matchMedia("(pointer: coarse)").matches) first.focus();
  }
  function closeQuick() { const p = $("#quickPanel"); if (p && !p.hidden) { p.hidden = true; $("#quickBtn").setAttribute("aria-expanded", "false"); } }
  function bindQuick() {
    $("#quickBtn").addEventListener("click", (e) => { e.stopPropagation(); $("#quickPanel").hidden ? openQuick() : closeQuick(); });
    document.addEventListener("click", (e) => { if (e.target.isConnected && !e.target.closest(".qs")) closeQuick(); });   // seçici yeniden çizilince tıklanan düğme kopar
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#quickPanel").hidden) { closeQuick(); $("#quickBtn").focus(); } });
    $("#backupBtn").addEventListener("click", () => setTimeout(() => { paintQuick(); }, 300));
    $("#quickSettings").addEventListener("click", () => { closeQuick(); App.modules.settings.open(); });
    App.theme.onChange(paintQuick);
    paintQuick();
  }

  /* ---------------- Arama paleti ---------------- */
  const norm = (s) => String(s || "").toLocaleLowerCase("tr").replace(/[ıİ]/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();

  function pages() {
    return Array.from(document.querySelectorAll("#sidebar .nav__item")).filter((a) => !a.closest("#navPins")).map((a) => {
      const lab = a.querySelector(".sidebar__label"), ic = a.querySelector("[data-icon]");
      const grp = a.closest(".nav-group");
      return { kind: "page", title: lab ? lab.textContent.trim() : "", sub: grp ? grp.querySelector(".nav-group__head .sidebar__label").textContent : "", icon: ic ? ic.dataset.icon : "chevron", href: a.getAttribute("href") };
    }).filter((p) => p.title && p.href !== "#/");
  }
  function actions() {
    const A = (title, icon, run, extra) => ({ kind: "action", title, icon, run, extra: extra || "" });
    const other = Object.keys(App.i18n.langs).find((c) => c !== App.i18n.lang);
    return [
      A(t("act.newChat"), "sparkle", () => { App.modules.assistant.reset(); location.hash = "#/"; App.router.refresh(); }, "sohbet chat soru"),
      A(t("act.voice"), "mic", () => App.voice && App.voice.open(), "ses konuş voice"),
      A(t("act.studyCards"), "layers", () => { location.hash = "#/kartlar/calis"; }, "kart tekrar flashcard"),
      A(t("act.focus"), "timer", () => { location.hash = "#/odak"; }, "pomodoro sayaç"),
      A(t("act.addExam"), "plus", () => { location.hash = "#/denemeler/yeni"; }, "deneme net exam"),
      A(t("act.theme"), App.theme.current === "light" ? "moon" : "sun", () => App.theme.set(App.theme.current === "light" ? "dark" : "light"), "karanlık aydınlık tema dark light"),
      A(other === "en" ? "Switch to English" : "Türkçeye geç", "chat", () => App.i18n.setLang(other), "dil language english türkçe"),
      A(t("act.backup"), "download", () => App.modules.settings.exportBackup(), "yedek backup indir"),
      A(t("act.a11y"), "a11y", () => App.a11y.open(), "erişilebilirlik yazı boyutu disleksi"),
      A(t("act.settings"), "settings", () => App.modules.settings.open(), "ayar yapay zeka gemini eşitleme")
    ];
  }
  let OUTCOMES = null;
  function outcomes() {
    if (OUTCOMES && OUTCOMES.lang === App.i18n.lang) return OUTCOMES.list;
    const C = App.data.curriculum, L = App.L, list = [];
    C.grades.forEach((g) => (g.subjects || []).forEach((s) => (s.units || []).forEach((u) => (u.outcomes || []).forEach((o) => {
      const title = L(o.title);
      list.push({ kind: "topic", title, sub: C.gradeName(g) + " · " + L(s.name) + " · " + L(u.name), icon: "book",
        href: "#/konular/" + [g.id, s.id, u.id, o.id].join("/"), n: norm(title + " " + L(s.name) + " " + g.id + " " + (o.code || "")), nt: norm(title) });
    }))));
    OUTCOMES = { lang: App.i18n.lang, list };
    return list;
  }

  function score(item, q, words) {
    const hay = item.n || (item.n = norm(item.title + " " + (item.sub || "") + " " + (item.extra || "")));
    if (!words.every((w) => hay.includes(w))) return -1;
    const tt = item.nt || (item.nt = norm(item.title));
    if (tt.startsWith(q)) return 3;
    if (tt.includes(q)) return 2;
    return 1;
  }

  let P = null;     // açık palet durumu
  async function openPalette(initial) {
    if (P) return;
    closeQuick();
    const chats = App.modules.assistant ? (await App.modules.assistant.listChats().catch(() => [])).slice(0, 40) : [];
    const chatItems = chats.map((c) => ({ kind: "chat", title: c.title, icon: "chat", href: "#/sohbet/" + encodeURIComponent(c.id) }));
    const el = document.createElement("div");
    el.className = "palette-backdrop";
    el.innerHTML = '<div class="palette" role="dialog" aria-modal="true" aria-label="' + esc(t("search.title")) + '">' +
      '<div class="palette__bar">' + App.icon("search") +
        '<input class="palette__input" type="search" autocomplete="off" spellcheck="false" placeholder="' + esc(t("search.input")) + '" aria-controls="palList" aria-autocomplete="list" role="combobox" aria-expanded="true">' +
        '<button class="icon-btn icon-btn--sm palette__close" type="button" aria-label="' + esc(t("close")) + '">' + App.icon("close") + "</button></div>" +
      '<div class="palette__list" id="palList" role="listbox"></div>' +
      '<p class="palette__hint">' + esc(t("search.hint")) + "</p></div>";
    document.body.appendChild(el);
    const input = el.querySelector("input"), list = el.querySelector(".palette__list");
    P = { el, input, list, items: [], sel: 0, prevFocus: document.activeElement, chats: chatItems };

    function build(qRaw) {
      const q = norm(qRaw), words = q.split(" ").filter(Boolean);
      const groups = [];
      const pick = (arr, max) => {
        if (!q) return arr.slice(0, max);
        return arr.map((it) => [score(it, q, words), it]).filter((x) => x[0] >= 0).sort((a, b) => b[0] - a[0]).slice(0, max).map((x) => x[1]);
      };
      const acts = pick(actions(), q ? 4 : 5), pgs = pick(pages(), q ? 5 : 30);
      if (q) {
        groups.push([t("search.g.topics"), pick(outcomes(), 8)]);
        groups.push([t("search.g.pages"), pgs]);
        groups.push([t("search.g.actions"), acts]);
        groups.push([t("search.g.chats"), pick(P.chats, 5)]);
      } else {
        groups.push([t("search.g.actions"), acts]);
        groups.push([t("search.g.pages"), pgs]);
        if (P.chats.length) groups.push([t("search.g.chats"), P.chats.slice(0, 5)]);
      }
      const items = [];
      let html = "";
      groups.forEach(([name, arr]) => {
        if (!arr.length) return;
        html += '<div class="palette__group" role="presentation">' + esc(name) + "</div>";
        arr.forEach((it) => {
          const i = items.length; items.push(it);
          html += '<div class="palette__item" role="option" id="pal' + i + '" data-i="' + i + '">' + App.icon(it.icon) +
            '<span class="palette__text"><span class="palette__title">' + esc(it.title) + "</span>" + (it.sub ? '<span class="palette__sub">' + esc(it.sub) + "</span>" : "") + "</span></div>";
        });
      });
      if (q) {
        const i = items.length;
        items.push({ kind: "ask", title: t("search.askAi", { q: qRaw.trim() }), icon: "sparkle", q: qRaw.trim() });
        if (items.length === 1) html += '<p class="palette__empty">' + esc(t("search.empty")) + "</p>";
        html += '<div class="palette__item palette__item--ask" role="option" id="pal' + i + '" data-i="' + i + '">' + App.icon("sparkle") + '<span class="palette__text"><span class="palette__title">' + esc(items[i].title) + "</span></span></div>";
      }
      list.innerHTML = html;
      P.items = items; P.sel = 0;
      mark();
    }
    function mark() {
      list.querySelectorAll(".palette__item").forEach((n) => n.setAttribute("aria-selected", String(Number(n.dataset.i) === P.sel)));
      const cur = list.querySelector("#pal" + P.sel);
      input.setAttribute("aria-activedescendant", cur ? cur.id : "");
      if (cur) cur.scrollIntoView({ block: "nearest" });
    }
    function run(i) {
      const it = P.items[i]; if (!it) return;
      closePalette(false);
      if (it.kind === "action") it.run();
      else if (it.kind === "ask") askAi(it.q);
      else location.hash = it.href;
    }
    input.addEventListener("input", () => build(input.value));
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); P.sel = Math.min(P.items.length - 1, P.sel + 1); mark(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); P.sel = Math.max(0, P.sel - 1); mark(); }
      else if (e.key === "Enter") { e.preventDefault(); run(P.sel); }
      else if (e.key === "Escape") { e.preventDefault(); closePalette(true); }
    });
    list.addEventListener("click", (e) => { const n = e.target.closest(".palette__item"); if (n) run(Number(n.dataset.i)); });
    list.addEventListener("mousemove", (e) => { const n = e.target.closest(".palette__item"); if (n && Number(n.dataset.i) !== P.sel) { P.sel = Number(n.dataset.i); mark(); } });
    el.addEventListener("mousedown", (e) => { if (e.target === el) closePalette(true); });
    el.querySelector(".palette__close").addEventListener("click", () => closePalette(true));
    App.hydrateIcons(el);
    input.value = initial || "";
    build(input.value);
    requestAnimationFrame(() => { el.classList.add("is-open"); input.focus(); });
  }
  function closePalette(restore) {
    if (!P) return;
    const { el, prevFocus } = P; P = null;
    el.remove();
    if (restore && prevFocus && prevFocus.focus) prevFocus.focus();
  }
  /** Aramada sonuç yoksa: soruyu asistana gönder */
  function askAi(q) { App.modules.assistant.startWith(q); }
  function bindPalette() {
    $("#searchBtn").addEventListener("click", () => openPalette());
    document.addEventListener("keydown", (e) => {
      const typing = /input|textarea|select/i.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") { e.preventDefault(); P ? closePalette(true) : openPalette(); }
      else if (e.key === "/" && !typing && !P && !document.querySelector(".modal-backdrop, .voice-overlay")) { e.preventDefault(); openPalette(); }
    });
    App.i18n.onChange(() => { OUTCOMES = null; });
  }

  /* ---------------- Asistan açılışında "Bugün" şeridi ---------------- */
  async function fillToday(root) {
    const el = (root || document).querySelector("[data-home-today]");
    if (!el || !App.learnmap) return;
    try {
      const d = await App.learnmap.dailyPlan();
      const parts = [t("home.todayTasks", { d: d.doneCount, n: d.total })];
      if (d.review && d.review.due) parts.push(t("home.todayMis", { n: d.review.due }));
      if (d.cards && d.cards.todo) parts.push(t("home.todayCards", { n: d.cards.todo }));
      if (!el.isConnected) return;
      el.innerHTML = '<a class="home-today" href="#/bugun" title="' + esc(t("home.todayGo")) + '">' + App.icon(d.completed ? "checkCircle" : "sun") +
        "<b>" + esc(t("home.today")) + '</b><span class="home-today__info">' + esc(parts.join(" · ")) + "</span>" +
        '<span class="home-today__bar" aria-hidden="true"><i style="width:' + Math.round((d.doneCount / Math.max(1, d.total)) * 100) + '%"></i></span>' + App.icon("chevron") + "</a>";
      App.hydrateIcons(el);
    } catch (e) { /* yoksa şerit görünmez */ }
  }

  /** Daraltılmış menüde simgelerin adı görünsün */
  function titles() {
    document.querySelectorAll("#sidebar .nav__item").forEach((a) => { const l = a.querySelector(".sidebar__label"); if (l) { a.title = l.textContent.trim(); } });
  }
  function init() {
    titles(); App.i18n.onChange(titles);
    bindGroups();
    bindQuick();
    bindPalette();
  }

  App.nav = { init, open: openPalette, close: closePalette, fillToday, syncGroups, norm };
})();
