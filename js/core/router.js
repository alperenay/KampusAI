/* =========================================================
   router.js — hash tabanlı sayfa geçişi
   #/                      → asistan (ana sayfa)
   #/program               → ders programı
   #/konular/9/matematik   → segmentler handler'a dizi olarak gelir
   Sunucu gerektirmez; file:// ile açıldığında da çalışır.
   ========================================================= */
(function () {
  const routes = Object.create(null);
  const aliases = Object.create(null);
  const needs = [];    // sayfa çizilmeden önce beklenecek yüklemeler (v1.42: isteğe bağlı ders içeriği)
  let current = null, seq = 0;

  function parse() {
    const hash = (location.hash || "#/").replace(/^#\/?/, "");
    const segs = hash.split("/").filter(Boolean).map((s) => { try { return decodeURIComponent(s); } catch (e) { return s; } });
    const raw = segs.join("/"), path = resolve(raw), parts = path.split("/").filter(Boolean);
    return { name: parts[0] || "", params: parts.slice(1), path, aliased: path !== raw };
  }
  function resolve(path) {
    let parts = String(path || "").replace(/^#?\/?/, "").split("/").filter(Boolean);
    for (let i = 0; i < 8 && aliases[parts[0]]; i++) parts = aliases[parts[0]].split("/").concat(parts.slice(1));
    return parts.join("/");
  }

  async function render() {
    const r = parse();
    if (r.aliased) history.replaceState(null, "", location.pathname + location.search + "#/" + r.path.split("/").map(encodeURIComponent).join("/"));
    const view = document.getElementById("view");
    const main = document.getElementById("main");

    if (current && current.cleanup) { try { current.cleanup(); } catch (e) { /* yok say */ } }
    current = { name: r.name, cleanup: null };
    const entry = current;

    main.classList.toggle("is-home", r.name === "");
    view.scrollTop = 0;
    setActiveNav(r);
    App.setTitle("");

    const my = ++seq;
    try {
      const waits = needs.map((fn) => { try { return fn(r); } catch (e) { return null; } }).filter((p) => p && p.then);
      if (waits.length) {
        // Yükleme kısa sürmezse boş sayfa yerine yükleniyor göstergesi
        const tm = setTimeout(() => { if (my === seq) view.innerHTML = '<div class="page"><div class="generation-skeleton" aria-busy="true"><i></i><i></i><i></i></div></div>'; }, 120);
        await Promise.all(waits).catch(() => {});
        clearTimeout(tm);
        if (my !== seq) return;           // bu arada başka sayfaya geçildi
      }
      // Sayfa modülü de isteğe bağlı yüklenmiş olabilir (ör. #/modeller): işleyici beklemeden sonra seçilir
      const handler = routes[r.name] || routes[""];
      const cleanup = await handler(view, r.params, r);
      if (my !== seq) { if (typeof cleanup === "function") { try { cleanup(); } catch (e) { /* old route only */ } } return; }
      if (typeof cleanup === "function") entry.cleanup = cleanup;
    } catch (e) {
      if (my !== seq) return;
      console.error(e);
      view.innerHTML = '<div class="page">' + App.ui.empty("close", App.t("errorTitle"), String(e && e.message || e)) + "</div>";
    }
    App.hydrateIcons(view);
    try { window.dispatchEvent(new CustomEvent("da:route", { detail: r })); } catch (e) { /* eski tarayıcı */ }
    document.getElementById("app").classList.remove("is-menu-open");
    document.getElementById("scrim").hidden = true;
  }

  function setActiveNav(r) {
    document.querySelectorAll("[data-route]").forEach((a) => {
      const route = a.dataset.route;
      let active;
      if (route === "") active = r.name === "";
      else if (route.indexOf("/") > -1) active = r.path === route;          // tam eşleşme (ör. denemeler/yeni)
      else active = r.name === route && !(r.name === "denemeler" && r.params[0] === "yeni");
      if (!active && a.dataset.routeAlso) active = a.dataset.routeAlso.split(",").includes(r.name);
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-path]").forEach((a) => {
      a.classList.toggle("is-active", r.path === a.dataset.path || r.path.indexOf(a.dataset.path + "/") === 0);
    });
  }

  App.router = {
    register(name, handler) { routes[name] = handler; },
    alias(name, target) { aliases[name] = target; },
    resolve,
    /** fn(route) bir Promise döndürürse sayfa ondan sonra çizilir (ör. ders içeriğini isteğe bağlı yükleme) */
    need(fn) { needs.push(fn); },
    start() {
      window.addEventListener("hashchange", render);
      render();
    },
    go(path) {
      const target = "#/" + path.replace(/^#?\/?/, "");
      if (location.hash === target) render(); else location.hash = target;
    },
    refresh: render,
    /** Adres history.replaceState ile değiştiğinde menüdeki etkin öğeyi günceller */
    syncNav: () => setActiveNav(parse()),
    current: () => parse()
  };
})();
