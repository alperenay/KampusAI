/* One short brand entrance per document (v1.56 neural core boot); never awaits or gates app initialisation. */
(function () {
  let el = null,
    timer,
    preferences;
  function dismiss() {
    clearTimeout(timer);
    preferences?.disconnect();
    if (el) {
      el.remove();
      el = null;
    }
    window.removeEventListener("keydown", key);
    window.removeEventListener("pagehide", dismiss);
    reduced.removeEventListener?.("change", change);
    document.removeEventListener("visibilitychange", visibility);
  }
  function key(e) {
    if (["Escape", "Tab", "Enter", " "].includes(e.key)) {
      if (e.key !== "Tab") {
        e.preventDefault();
        e.stopPropagation();
      }
      dismiss();
    }
  }
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const DURATION_MS = 1750;
  App.startup = {
    dismiss,
    get active() {
      return !!el;
    },
  };
  if (reduced.matches || App.prefs.get("a11yMotion", false) || document.hidden)
    return;
  el = document.createElement("div");
  el.className = "startup-brand";
  el.setAttribute("aria-hidden", "true");
  const en = App.prefs.get("lang", App.i18n.lang) === "en";
  // Parçacıklar: her biri kendi açısıyla dışarı fırlar (yalnız transform/opacity)
  const burst = Array.from({ length: 18 }, (_, i) =>
    '<i class="startup-p" style="--i:' + i + ";--a:" + Math.round((i / 18) * 360 + ((i * 37) % 13)) + "deg;--d:" + (110 + ((i * 53) % 70)) + 'px"></i>').join("");
  el.innerHTML =
    '<div class="startup-grid"></div><div class="startup-scanline"></div>' +
    '<div class="startup-scene"><span class="startup-wave"></span><span class="startup-wave startup-wave--b"></span>' + burst +
    '<span class="startup-ring startup-ring--c"></span><span class="startup-ring startup-ring--b"></span><span class="startup-ring"></span>' +
    '<span class="startup-orb"></span><span class="startup-logo">' + App.icon("logo") + "</span></div>" +
    '<div class="startup-word">Kampüs<span>AI</span></div><div class="startup-caption">' +
    (en ? "A NEW PERSPECTIVE ON LEARNING" : "ÖĞRENMEYE YENİ BİR BAKIŞ") +
    '</div><div class="startup-status"><i></i>' + (en ? "NEURAL CORE ONLINE" : "NÖRAL ÇEKİRDEK HAZIR") + "</div>" +
    '<div class="startup-skip">' + (en ? "Tap or press Escape to skip" : "Dokunarak veya Escape ile geç") + "</div>";

  el.style.setProperty("--startup-duration", DURATION_MS + "ms");
  el.addEventListener("animationend", (e) => {
    if (e.target === el && e.animationName === "hud-release") dismiss();
  });
  document.body.appendChild(el);
  // Switching accessibility preferences during launch must also release the overlay.
  preferences = new MutationObserver(() => {
    if (document.documentElement.hasAttribute("data-a11y-motion")) dismiss();
  });
  preferences.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-a11y-motion"],
  });
  el.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dismiss();
  });
  window.addEventListener("keydown", key);
  window.addEventListener("pagehide", dismiss);
  function change() {
    if (reduced.matches) dismiss();
  }
  if (reduced.addEventListener)
    reduced.addEventListener("change", change, { once: true });
  // Backgrounding, keyboard navigation or a tap ends it immediately. CSS also has a fail-safe release.
  function visibility() {
    if (document.hidden) dismiss();
  }
  document.addEventListener("visibilitychange", visibility);
  timer = setTimeout(dismiss, DURATION_MS);
})();
