/* =========================================================
   app.js — uygulamayı başlatır: depolama, dil, menü, rotalar
   ========================================================= */
(function () {
  const { $, esc, fmtNum } = App.utils;
  const app = $("#app");
  const t = App.t;

  /** Üst çubuk ve sekme başlığı */
  App.setTitle = function (text) {
    $("#topbarTitle").textContent = text || "";
    document.title = text ? text + " · " + t("appName") : t("appName");
  };

  App.applyProfile = function () {
    const name = App.prefs.get("userName", "");
    $("#profileName").textContent = name || t("defaultName");
    $("#avatar").textContent = App.utils.initials(name || t("defaultName"));
  };

  /* ---------------- Sol menü içeriği ---------------- */
  function renderSideGrades() {
    $("#sideGrades").innerHTML = App.data.curriculum.grades.map((g) =>
      '<a class="side-link" href="#/konular/' + g.id + '" data-path="konular/' + g.id + '"><span class="side-link__text">' + esc(App.data.curriculum.gradeName(g)) + "</span></a>"
    ).join("");
  }

  async function renderSideExams() {
    const all = await App.db.getAll("exams");
    const recent = App.exams.sortChrono(all).reverse().slice(0, 6);
    $("#sideExams").innerHTML = recent.length
      ? recent.map((e) =>
          '<a class="side-link" href="#/denemeler/duzenle/' + encodeURIComponent(e.id) + '" data-path="denemeler/duzenle/' + esc(e.id) + '" title="' + esc(e.name) + '">' +
          '<span class="side-link__text">' + esc(e.name) + '</span><span class="side-link__meta">' + fmtNum(App.exams.compute(e).total, 1) + "</span></a>"
        ).join("")
      : '<p class="side-empty">' + esc(t("nav.noExams")) + "</p>";
  }

  /* Sohbet geçmişi (Gemini'deki "Son kullanılanlar" gibi) */
  async function renderSideChats() {
    const chats = (await App.modules.assistant.listChats()).slice(0, 12);
    const here = location.hash.replace(/^#\/?/, "");
    $("#sideChats").innerHTML = chats.length
      ? chats.map((c) =>
          '<div class="side-chat">' +
            '<a class="side-link' + (here === "sohbet/" + c.id ? " is-active" : "") + '" href="#/sohbet/' + encodeURIComponent(c.id) + '" data-path="sohbet/' + esc(c.id) + '" title="' + esc(c.title) + '">' +
              '<span class="side-link__text">' + esc(c.title) + "</span></a>" +
            '<button class="side-chat__del" type="button" data-del-chat="' + esc(c.id) + '" title="' + esc(t("ai.deleteChat")) + '" aria-label="' + esc(t("ai.deleteChat")) + '">' + App.icon("close") + "</button>" +
          "</div>").join("")
      : '<p class="side-empty">' + esc(t("nav.noChats")) + "</p>";
  }

  /* ---------------- Dil seçici ---------------- */
  function renderLangSwitch() {
    $("#langSwitch").innerHTML = Object.entries(App.i18n.langs).map(([code, l]) =>
      '<button type="button" role="radio" data-lang="' + code + '" aria-checked="' + (code === App.i18n.lang) + '" title="' + esc(l.name) + '">' + l.short + "</button>"
    ).join("");
  }

  /* ---------------- Tema seçici ---------------- */
  function renderThemeSwitch() {
    $("#themeSwitch").innerHTML = Object.entries(App.theme.list).map(([key, th]) =>
      '<button type="button" role="radio" data-theme-set="' + key + '" aria-checked="' + (key === App.theme.current) + '" title="' + esc(t(th.labelKey)) + '" aria-label="' + esc(t(th.labelKey)) + '">' + App.icon(th.icon) + "</button>"
    ).join("");
  }

  /* ---------------- Menü davranışı ---------------- */
  const isMobile = () => window.matchMedia("(max-width: 860px)").matches;

  function setCollapsed(on) {
    app.classList.toggle("is-collapsed", on && !isMobile());
    App.prefs.set("sidebarCollapsed", on);
    $("#sidebarToggle").title = on ? t("nav.expand") : t("nav.collapse");
  }

  function setMenuOpen(on) {
    app.classList.toggle("is-menu-open", on);
    $("#scrim").hidden = !on;
  }

  function bindChrome() {
    $("#sidebarToggle").addEventListener("click", () => setCollapsed(!app.classList.contains("is-collapsed")));
    $("#menuBtn").addEventListener("click", () => setMenuOpen(true));
    $("#scrim").addEventListener("click", () => setMenuOpen(false));
    window.addEventListener("resize", App.utils.debounce(() => {
      setCollapsed(App.prefs.get("sidebarCollapsed", false));
      if (!isMobile()) setMenuOpen(false);
    }, 120));

    $("#backupBtn").addEventListener("click", () => App.modules.settings.exportBackup());
    $("#settingsBtn").addEventListener("click", () => App.modules.settings.open());
    $("#profileBtn").addEventListener("click", () => App.modules.settings.open());

    $("#themeSwitch").addEventListener("click", (e) => {
      const b = e.target.closest("[data-theme-set]");
      if (b) App.theme.set(b.dataset.themeSet);
    });

    $("#sideChats").addEventListener("click", (e) => {
      const del = e.target.closest("[data-del-chat]");
      if (del) { e.preventDefault(); App.modules.assistant.deleteChat(del.dataset.delChat); }
    });

    $("#langSwitch").addEventListener("click", (e) => {
      const b = e.target.closest("[data-lang]");
      if (b) App.i18n.setLang(b.dataset.lang);
    });

    // "Yeni sohbet" her zaman temiz bir sohbet açar
    document.querySelectorAll('a[href="#/"]').forEach((a) => a.addEventListener("click", () => {
      App.modules.assistant.reset();
      if (location.hash === "#/" || location.hash === "") App.router.refresh();
    }));
  }

  /** Dil değişince: sabit metinler (data-i18n) i18n.js'de güncellenir; burada dinamik kısımlar yeniden çizilir */
  function onLanguageChange() {
    renderLangSwitch();
    renderThemeSwitch();
    renderSideGrades();
    renderSideExams();
    renderSideChats();
    App.applyProfile();
    setCollapsed(App.prefs.get("sidebarCollapsed", false));
    App.router.refresh();
  }

  /* ---------------- Başlat ---------------- */
  async function start() {
    // Windows uygulaması ekran kartını yapay zekaya bıraktığında arayüz efektleri hafifletilir
    if (window.desktopApp && !window.desktopApp.uiGpu) document.documentElement.classList.add("lite");
    App.i18n.apply(document);
    App.hydrateIcons(document);
    App.a11y.init();
    App.applyProfile();
    renderLangSwitch();
    renderThemeSwitch();
    setCollapsed(App.prefs.get("sidebarCollapsed", false));
    bindChrome();
    App.theme.onChange(renderThemeSwitch);

    await App.db.init();
    await App.lessons.load().catch(() => {});      // yapay zekâyla hazırlanmış konu listeleri ve anlatımlar
    App.lessons.init();
    await App.roots.load().catch(() => {});        // yapay zekâyla çıkarılmış ön koşul haritaları
    await App.goals.load().catch(() => {});
    App.goals.init();
    App.focus.init();

    renderSideGrades();
    await renderSideExams();
    await renderSideChats();
    App.db.on("exams", renderSideExams);
    // Yanlış defterinde bugün tekrar edilecek soru sayısı
    const misBadge = async () => {
      const c = await App.mistakes.counts();
      const b = document.getElementById("misBadge");
      if (b) { b.hidden = !c.due; b.textContent = c.due; }
    };
    misBadge();
    App.db.on("mistakes", App.utils.debounce(misBadge, 200));
    App.db.on("chats", App.utils.debounce(renderSideChats, 150));
    window.addEventListener("hashchange", renderSideChats);
    App.i18n.onChange(onLanguageChange);

    App.router.register("", (view) => App.modules.assistant.render(view));
    App.router.start();

    // Cihazlar arası eşitleme (kod girilmişse)
    App.sync.init();
    App.sync.onChange((st) => {
      if (st.running || st.error || !st.received) return;
      st.received = 0;
      renderSideExams(); renderSideChats();
      // Başka cihazdan veri geldiyse açık sayfayı tazele (yazı yazılırken ya da yanıt akarken değil)
      const typing = document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if (!typing && !App.modules.assistant.isBusy() && !document.querySelector(".modal-backdrop")) App.router.refresh();
    });

    // Ders hatırlatıcıları (Programım'daki bloklar) ve ilk açılış tanıtım turu
    App.reminders.init();
    App.tour.maybeStart();

    // Yapay zekayı arka planda yokla (Ollama açık mı, internet servisi ayarlı mı)
    App.modules.assistant.refreshStatus();

    // İnternetten açılan sürüm (iPhone/Android ana ekran uygulaması): çevrimdışı önbellek
    if ("serviceWorker" in navigator && location.protocol === "https:" && !App.platform.native && !App.platform.desktop) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
    // Tarayıcı yer açmak için verileri silmesin (desteklenen yerlerde)
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  }

  start();
})();
