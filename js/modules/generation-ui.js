/* Yalnız doğrulanmış partileri ilerleme sayar; token akışı yalnız canlılık bildirir. */
(function () {
  function guard(controller) {
    const hash = location.hash;
    const onRoute = () => { if (location.hash !== hash) { controller.abort(); stop(); } };
    const stop = () => window.removeEventListener("hashchange", onRoute);
    window.addEventListener("hashchange", onRoute);
    return stop;
  }
  function mount(el, total, cancel) {
    const t = App.t, esc = App.utils.esc;
    el.innerHTML = '<section class="generation-card"><p class="generation-status" role="status" aria-live="polite">' + esc(t("gen.scanning")) + '</p><progress max="' + total + '" value="0" aria-label="' + esc(t("gen.progress")) + '"></progress><p class="generation-count">0/' + total + '</p><div class="generation-skeleton" aria-hidden="true"><i></i><i></i><i></i></div><ol class="generation-preview"></ol><button class="btn btn--ghost" type="button">' + esc(t("cancel")) + '</button></section>';
    const b = el.querySelector("button"); b.onclick = () => { b.disabled = true; cancel(); };
    let last = 0;
    return {
      stream() { if (Date.now() - last < 400 || !el.isConnected) return; last = Date.now(); el.querySelector(".generation-status").textContent = t("gen.receiving"); },
      update(info) {
        if (!el.isConnected) return;
        el.querySelector("progress").max = info.total;
        el.querySelector("progress").value = info.ready;
        el.querySelector(".generation-count").textContent = info.ready + "/" + info.total;
        el.querySelector(".generation-status").textContent = t("gen.preparing");
        const list = el.querySelector("ol"); list.textContent = "";
        (info.questions || []).slice(0, 3).forEach((q) => { const li = document.createElement("li"); li.textContent = q.q || q.metin; list.appendChild(li); });
      }
    };
  }
  App.generation = { guard, mount };
})();
