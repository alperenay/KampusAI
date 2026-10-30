/* Branded first paint for Android/Web: take over the early HTML boot layer.
   The app never waits for this animation to finish. */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DURATION_MS = document.documentElement.dataset.uiMotionLevel === "gentle" ? 400 : 1750;
  let el = document.getElementById("startupPreload");
  let timer = 0, safety = 0, observer = null, started = false;
  let appReady = false, minElapsed = false, leaving = false;

  function dismiss() {
    clearTimeout(timer);
    clearTimeout(safety);
    clearTimeout(window.__startupFallback);
    observer?.disconnect();
    if (el) { el.remove(); el = null; }
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("pagehide", dismiss);
    document.removeEventListener("visibilitychange", onVisibility);
    reduced.removeEventListener?.("change", onReduced);
  }
  function onKey(e) {
    if (["Escape", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      dismiss();
    } else if (e.key === "Tab") dismiss();
  }
  function onReduced() { if (reduced.matches) dismiss(); }
  function onVisibility() {
    // On Android document.hidden can be true while the WebView is first attached.
    // Keep the static brand visible and animate only after the first resume.
    if (!document.hidden && !started) run();
    else if (document.hidden && started) dismiss();
  }
  function maybeLeave() {
    if (!el || !started || leaving || !minElapsed || !appReady) return;
    leaving = true;
    el.classList.add("is-leaving");
    safety = setTimeout(dismiss, 500);
  }
  App.startup = {
    dismiss,
    ready() { appReady = true; maybeLeave(); },
    get active() { return !!el; }
  };
  if (reduced.matches || App.prefs.get("a11yMotion", false) || window.__startupSkip ||
      document.documentElement.dataset.uiMotionLevel === "off" || document.documentElement.dataset.uiIntro === "off") {
    dismiss();
    return;
  }

  function run() {
    if (started || !el || !el.isConnected || window.__startupSkip) return;
    started = true;
    clearTimeout(window.__startupFallback);
    const en = App.prefs.get("lang", App.i18n.lang) === "en";
    const mobile = window.matchMedia("(max-width: 860px), (pointer: coarse)").matches;
    const count = mobile ? 8 : 18;
    const burst = Array.from({ length: count }, (_, i) =>
      '<i class="startup-p" style="--i:' + i +
      ";--a:" + Math.round((i / count) * 360 + ((i * 37) % 13)) +
      "deg;--d:" + (mobile ? 80 : 110) + 'px"></i>').join("");
    el.className = "startup-brand";
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
      if (e.target === el && e.animationName === "hud-leave") dismiss();
    });
    // Stay visible until routing is ready: do not reveal an empty application view.
    timer = setTimeout(() => { minElapsed = true; maybeLeave(); }, DURATION_MS);
    // Still release if initialization fails (never block the app forever).
    safety = setTimeout(() => { appReady = true; minElapsed = true; maybeLeave(); }, 8000);
  }

  // Do not disable the entrance permanently because Android initially reports hidden.
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("keydown", onKey);
  window.addEventListener("pagehide", dismiss);
  reduced.addEventListener?.("change", onReduced);
  el.addEventListener("click", dismiss, { once: true });
  observer = new MutationObserver(() => {
    if (document.documentElement.hasAttribute("data-a11y-motion") || document.documentElement.dataset.uiMotionLevel === "off" || document.documentElement.dataset.uiIntro === "off") dismiss();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-a11y-motion", "data-ui-motion-level", "data-ui-intro"] });
  if (!document.hidden) run();
})();
