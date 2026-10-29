/* One short brand entrance per document; never awaits or gates app initialisation. */
(function () {
  let el = null,
    timer;
  function dismiss() {
    clearTimeout(timer);
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
  el.innerHTML =
    '<div class="startup-scene"><div class="startup-floor"><i></i><i></i><i></i></div><svg class="startup-frame" viewBox="0 0 240 240" focusable="false"><path class="startup-scan" d="M 120 12 L 214 66 V 174 L 120 228 L 26 174 V 66 Z"/><path class="startup-grid" d="M 120 22 V 218 M 35 72 L 205 168 M 35 168 L 205 72"/><path class="startup-corners" d="M 92 28 L 120 12 L 148 28 M 214 82 V 66 L 190 52 M 214 158 V 174 L 190 188 M 148 212 L 120 228 L 92 212 M 50 188 L 26 174 V 158 M 26 82 V 66 L 50 52"/></svg><div class="startup-core"><span class="startup-beam"></span><span class="startup-logo">' + App.icon("logo") + '</span></div><span class="startup-node startup-node--a"></span><span class="startup-node startup-node--b"></span><span class="startup-node startup-node--c"></span></div><div class="startup-word">Kampüs<span>AI</span></div><div class="startup-caption">' +
    (en ? "A NEW PERSPECTIVE ON LEARNING" : "ÖĞRENMEYE YENİ BİR BAKIŞ") +
    '</div><div class="startup-skip">' +
    (en ? "Tap or press Escape to skip" : "Dokunarak veya Escape ile geç") +
    "</div>";

  document.body.appendChild(el);
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
  timer = setTimeout(dismiss, 1450);
})();
