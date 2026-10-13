/* =========================================================
   viewport.js — telefonda ekran klavyesi açılınca yazı kutusu görünür kalsın

   • Android uygulaması: pencere klavyeye göre küçülür (MainActivity), burada
     yalnızca sohbetin en altı görünür tutulur.
   • iPhone (Safari / ana ekran uygulaması) ve bazı tarayıcılar: klavye sayfanın
     üstüne biner, sayfa küçülmez. Görünen alan (visualViewport) küçüldüğünde
     uygulama o yüksekliğe sığdırılır (--app-h), sayfa yukarı kaydırılmışsa geri alınır.
   ========================================================= */
(function () {
  const root = document.documentElement;
  const vv = window.visualViewport;
  const view = document.getElementById("view");
  const isField = (el) => !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
  let raf = 0, atBottom = true;

  function fit() {
    raf = 0;
    if (!vv) return;
    const covered = window.innerHeight - vv.height;
    if (covered > 100 && isField(document.activeElement)) {
      root.style.setProperty("--app-h", Math.round(vv.height) + "px");
      root.classList.add("kb-open");
      if (window.scrollY || vv.offsetTop) window.scrollTo(0, 0);
    } else if (root.classList.contains("kb-open")) {
      root.style.removeProperty("--app-h");
      root.classList.remove("kb-open");
    }
    keepBottom();
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(fit); };

  /* Sohbetin sonundayken alan küçülürse (klavye açıldı) yine sonda kal */
  function keepBottom() {
    if (view && atBottom && document.getElementById("chatLog")) view.scrollTop = view.scrollHeight;
  }
  if (view) view.addEventListener("scroll", () => { atBottom = view.scrollHeight - view.scrollTop - view.clientHeight < 80; }, { passive: true });

  if (vv) { vv.addEventListener("resize", schedule); vv.addEventListener("scroll", schedule); }
  window.addEventListener("resize", schedule);
  document.addEventListener("focusout", () => setTimeout(schedule, 60));

  // Yazı alanına dokununca (klavye açılırken) alanı görünür yap
  document.addEventListener("focusin", (e) => {
    if (!isField(e.target) || !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;
    setTimeout(() => {
      schedule();
      if (e.target.closest(".chat__bottom")) { keepBottom(); return; }
      const box = e.target.closest(".composer") || e.target;
      try { box.scrollIntoView({ block: box === e.target ? "nearest" : "center" }); } catch (err) { /* yok */ }
    }, 320);
  });
})();
