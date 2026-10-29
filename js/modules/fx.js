/* =========================================================
   fx.js — dokunuş geri bildirimi (v1.56)

   Düğmeye basınca parmağın/imlecin altından kısa bir neon ışıma yayılır; telefonda
   (dokunmatik) hafif bir titreşim (10 ms) verilir. Tek, sabit konumlu bir öğe yeniden
   kullanılır ve yalnızca transform/opacity canlandırılır: düğmelerin kendi stiline,
   taşmasına ya da ::after'ına dokunulmaz. Hareket azaltmada ışıma çizilmez;
   titreşim Erişilebilirlik ayarlarındaki "dokunuş titreşimi" (fxHaptic) ile kapatılabilir.
   ========================================================= */
(function () {
  const TARGET = ".btn, .icon-btn, .chip, .seg [role=radio], .voice-dock__btn, .tabbar a, .tabbar button, .nav__item, .hub-tile, .listen-btn";
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.hasAttribute("data-a11y-motion");
  let glow = null;

  function ripple(x, y, size, strong) {
    if (!glow || !glow.isConnected) {
      glow = document.createElement("span");
      glow.className = "fx-glow";
      glow.setAttribute("aria-hidden", "true");
      document.body.appendChild(glow);
    }
    glow.style.left = x + "px";
    glow.style.top = y + "px";
    glow.style.width = glow.style.height = size + "px";
    glow.classList.toggle("is-strong", !!strong);
    if (glow.animate) {
      glow.getAnimations().forEach((a) => a.cancel());
      glow.animate(
        [{ transform: "translate(-50%,-50%) scale(.25)", opacity: strong ? 0.75 : 0.55 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 0 }],
        { duration: 460, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    }
  }

  document.addEventListener("pointerdown", (e) => {
    if (e.button > 0) return;
    const el = e.target instanceof Element ? e.target.closest(TARGET) : null;
    if (!el || el.matches(":disabled") || el.getAttribute("aria-disabled") === "true") return;
    if (!reduced()) {
      const r = el.getBoundingClientRect();
      ripple(e.clientX, e.clientY, Math.max(60, Math.min(220, Math.max(r.width, r.height) * 1.6)), el.matches(".btn--primary, .tabbar__fab, .voice-dock__btn--main"));
    }
    if (e.pointerType === "touch" && navigator.vibrate && App.prefs.get("fxHaptic", true)) {
      try { navigator.vibrate(10); } catch (err) { /* desteklenmiyor */ }
    }
  }, { passive: true, capture: true });

  App.fx = { ripple };
})();
