/* =========================================================
   router.js — hash tabanlı sayfa geçişi
   #/                      → asistan (ana sayfa)
   #/program               → ders programı
   #/konular/9/matematik   → segmentler handler'a dizi olarak gelir
   Sunucu gerektirmez; file:// ile açıldığında da çalışır.
   ========================================================= */
(function () {
  const routes = {};
  let current = null;

  function parse() {
    const hash = (location.hash || "#/").replace(/^#\/?/, "");
    const segs = hash.split("/").filter(Boolean).map(decodeURIComponent);
    return { name: segs[0] || "", params: segs.slice(1), path: segs.join("/") };
  }

  async function render() {
    const r = parse();
    const handler = routes[r.name] || routes[""];
    const view = document.getElementById("view");
    const main = document.getElementById("main");

    if (current && current.cleanup) { try { current.cleanup(); } catch (e) { /* yok say */ } }
    current = { name: r.name, cleanup: null };

    main.classList.toggle("is-home", r.name === "");
    view.scrollTop = 0;
    setActiveNav(r);
    App.setTitle("");

    try {
      const cleanup = await handler(view, r.params, r);
      if (typeof cleanup === "function") current.cleanup = cleanup;
    } catch (e) {
      console.error(e);
      view.innerHTML = '<div class="page">' + App.ui.empty("close", App.t("errorTitle"), String(e && e.message || e)) + "</div>";
    }
    App.hydrateIcons(view);
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
      a.classList.toggle("is-active", active);
    });
    document.querySelectorAll("[data-path]").forEach((a) => {
      a.classList.toggle("is-active", r.path === a.dataset.path || r.path.indexOf(a.dataset.path + "/") === 0);
    });
  }

  App.router = {
    register(name, handler) { routes[name] = handler; },
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
