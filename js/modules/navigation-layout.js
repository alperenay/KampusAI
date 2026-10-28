(function () {
  const { esc } = App.utils;
  function organize() {
    const nav = document.querySelector("#sidebar nav.nav");
    if (!nav || !App.hub || !App.toolCategories) return;
    const anchors = new Map();
    nav.querySelectorAll("a[data-route]").forEach((a) => {
      if (!a.closest("#navPins")) anchors.set(a.dataset.route, a);
    });
    const toolMap = new Map(App.hub.TOOLS.map((t) => [t[0], t]));
    for (const [route, tool] of toolMap)
      if (!anchors.has(route)) {
        const a = document.createElement("a");
        a.className = "nav__item";
        a.href = "#/" + route;
        a.dataset.route = route;
        a.innerHTML =
          '<span data-icon="' +
          esc(tool[1]) +
          '"></span><span class="sidebar__label">' +
          esc(
            Array.isArray(tool[2])
              ? App.toolCategories.text(tool[2])
              : App.t(tool[2]),
          ) +
          "</span>";
        anchors.set(route, a);
      }
    nav.querySelectorAll(".nav-group:not(#navPins)").forEach((g) => g.remove());
    const top = new Set(["", "bugun", "araclar"]);
    for (const group of App.toolCategories.groups) {
      const routes = [
        ...group.routes,
        ...App.hub.TOOLS.filter(
          (t) => App.toolCategories.groupFor(t[0]).id === group.id,
        ).map((t) => t[0]),
      ];
      const list = [...new Set(routes)].filter(
        (r) => !top.has(r) && anchors.has(r),
      );
      if (!list.length) continue;
      const el = document.createElement("div");
      el.className = "nav-group nav-category";
      el.dataset.group = group.id;
      el.innerHTML =
        '<button class="nav-group__head" type="button" aria-expanded="true" aria-controls="ng-' +
        group.id +
        '"><span class="nav-category__text"><span class="sidebar__label" data-category-title="' +
        group.id +
        '">' +
        esc(App.toolCategories.text(group.title)) +
        '</span><small class="sidebar__label" data-category-description="' +
        group.id +
        '">' +
        esc(App.toolCategories.text(group.description)) +
        '</small></span><span class="nav-category__count" aria-hidden="true">' +
        list.length +
        '</span><span data-icon="chevronD"></span></button><div class="nav-group__body" id="ng-' +
        group.id +
        '"></div>';
      const body = el.querySelector(".nav-group__body");
      list.forEach((r, i) => {
        const a = anchors.get(r);
        a.removeAttribute("data-more");
        if (i >= 3) a.dataset.more = "";
        body.appendChild(a);
      });
      nav.appendChild(el);
    }
    const guide = document.createElement("p");
    guide.className = "nav-orientation sidebar__label-block";
    guide.dataset.navOrientation = "";
    nav.querySelector("#navEmpty").after(guide);
    function language() {
      for (const group of App.toolCategories.groups) {
        nav
          .querySelectorAll('[data-category-title="' + group.id + '"]')
          .forEach(
            (el) => (el.textContent = App.toolCategories.text(group.title)),
          );
        nav
          .querySelectorAll('[data-category-description="' + group.id + '"]')
          .forEach(
            (el) =>
              (el.textContent = App.toolCategories.text(group.description)),
          );
      }
      guide.textContent =
        App.i18n.lang === "en"
          ? "Choose a category or search all features."
          : "Bir kategori seç veya tüm özelliklerde ara.";
    }
    language();
    App.i18n.onChange(language);
    App.hydrateIcons(nav);
  }
  App.navigationLayout = { organize };
})();
