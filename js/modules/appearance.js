/* Personal visual atmosphere and distraction-free lesson reading. */
(function () {
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr),
    esc = App.utils.esc;
  const palettes = [
    ["violet", "Kampüs moru", "Campus violet"],
    ["ocean", "Okyanus", "Ocean"],
    ["forest", "Kutup ışığı", "Aurora"],
    ["off", "Sade", "Plain"],
  ];
  let atmosphere,
    restore,
    reading = false,
    returnFocus;
  function palette() {
    const v = App.prefs.get("appearanceAtmosphere", "violet");
    return palettes.some((p) => p[0] === v) ? v : "violet";
  }
  function apply() {
    const name = App.router.current()?.name || "",
      active = ["", "bugun", "araclar"].includes(name),
      root = document.documentElement;
    root.dataset.atmosphere = palette();
    atmosphere.hidden =
      !active || palette() === "off" || root.hasAttribute("data-a11y-contrast");
    root.toggleAttribute(
      "data-ambient-running",
      !atmosphere.hidden &&
        !document.hidden &&
        !App.motion.reduced() &&
        App.prefs.get("appearanceAmbientMotion", true) !== false,
    );
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
    } else if (returnFocus?.isConnected) returnFocus.focus();
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
  function open() {
    const m = App.ui.modal({
      title: T("Görünümü özelleştir", "Personalise appearance"),
      body:
        "<p>" +
        esc(
          T(
            "Okuma alanının arkasındaki ışık atmosferini seç. Ders ve deney ekranlarında içerik önceliklidir.",
            "Choose the light atmosphere behind your workspace. Lessons and experiments keep content in focus.",
          ),
        ) +
        '</p><div class="atmosphere-options">' +
        palettes
          .map(
            (p) =>
              '<button class="btn atmosphere-option" type="button" data-atmosphere-choice="' +
              p[0] +
              '" aria-pressed="' +
              (palette() === p[0]) +
              '"><span class="atmosphere-swatch is-' +
              p[0] +
              '" aria-hidden="true"></span>' +
              esc(T(p[1], p[2])) +
              "</button>",
          )
          .join("") +
        '</div><label class="atmosphere-motion"><input type="checkbox" id="ambientMotion" ' +
        (App.prefs.get("appearanceAmbientMotion", true) !== false
          ? "checked"
          : "") +
        ">" +
        esc(
          T("Arka plan ışıkları hareket etsin", "Animate background lights"),
        ) +
        '</label><p class="hint">' +
        esc(
          T(
            "Tercih bu cihazda saklanır. Erişilebilirlikte veya sistemde hareket azaltma açıksa animasyon durur.",
            "Saved on this device. Reduced motion in the app or operating system pauses animation.",
          ),
        ) +
        "</p>",
    });
    m.el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-atmosphere-choice]");
      if (!b) return;
      App.prefs.set("appearanceAtmosphere", b.dataset.atmosphereChoice);
      apply();
      m.el
        .querySelectorAll("[data-atmosphere-choice]")
        .forEach((x) => x.setAttribute("aria-pressed", x === b));
    });
    m.el.querySelector("#ambientMotion").addEventListener("change", (e) => {
      App.prefs.set("appearanceAmbientMotion", e.target.checked);
      apply();
    });
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
    const topSettings = document.createElement("button");
    topSettings.type = "button";
    topSettings.className = "btn sidebar-settings";
    topSettings.id = "sidebarSettingsTop";
    topSettings.innerHTML =
      App.icon("settings") +
      "<span>" +
      esc(T("Ayarlar", "Settings")) +
      "</span>";
    document.querySelector(".sidebar__head").after(topSettings);
    topSettings.addEventListener("click", () => {
      document.querySelector("#app").classList.remove("is-menu-open");
      document.getElementById("scrim").hidden = true;
      App.modules.settings.open();
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
      attributeFilter: ["data-a11y-motion", "data-a11y-contrast"],
    });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.addEventListener) media.addEventListener("change", apply);
    else media.addListener(apply);
    App.i18n.onChange(() => {
      topSettings.querySelector("span:last-child").textContent = T(
        "Ayarlar",
        "Settings",
      );
      b.querySelector(".qs__text").textContent = T(
        "Görünümü özelleştir",
        "Personalise appearance",
      );
      restore.innerHTML =
        App.icon("menu") + esc(T("Menüleri göster", "Show menus"));
      close.setAttribute("aria-label", T("Menüyü kapat", "Close menu"));
    });
    apply();
  }
  App.appearance = { open, setReading, palette };
  init();
})();
