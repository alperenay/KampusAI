/* Bounded UI motion: decorative only; never delays routing or changes study state. */
(function () {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const running = new Set();
  const colors = ["#3b82f6", "#10b981", "#7c5cff", "#f59e0b", "#a855f7"];
  let frame = 0,
    indicator,
    core,
    bar,
    feedback,
    lastTarget = null;
  const reduced = () =>
    media.matches || document.documentElement.hasAttribute("data-a11y-motion");
  function cancel() {
    running.forEach((a) => a.cancel());
    running.clear();
    document.querySelectorAll(".motion-touch").forEach((el) => el.remove());
  }
  function play(el, frames, options) {
    if (reduced() || document.hidden || !el?.animate) return;
    const a = el.animate(frames, options);
    running.add(a);
    a.finished.then(
      () => running.delete(a),
      () => running.delete(a),
    );
    return a;
  }
  function align() {
    frame = 0;
    if (!bar || !indicator) return;
    const bounds = bar.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const links = [...bar.querySelectorAll(".tabbar__item")];
    const selected =
      links.find((a) => a.classList.contains("is-active")) ||
      links[links.length - 1];
    if (!selected) return;
    const r = selected.getBoundingClientRect(),
      fab = selected.classList.contains("tabbar__fab");
    const width = fab ? 54 : Math.min(68, r.width - 12),
      x = r.left - bounds.left + (r.width - width) / 2;
    const index = links.indexOf(selected),
      color = colors[index] || colors[4];
    indicator.style.width = width + "px";
    indicator.style.height = (fab ? 54 : 38) + "px";
    indicator.style.transform =
      "translate3d(" + x + "px," + (fab ? -20 : 6) + "px,0)";
    bar.style.setProperty("--motion-tab-color", color);
    indicator.hidden = false;
    if (lastTarget && selected !== lastTarget)
      play(
        core,
        [
          { transform: "scale(1)" },
          { transform: "scale(1.18,.85)", offset: 0.45 },
          { transform: "scale(1)" },
        ],
        { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    lastTarget = selected;
    // Set only after the first position: no sweep across the bar on initial load.
    requestAnimationFrame(() => {
      if (indicator) indicator.classList.add("is-ready");
    });
  }
  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(align);
  }
  function entrance() {
    cancel();
    schedule();
    if (reduced() || document.hidden) return;
    const view = document.getElementById("view");
    if (!view) return;
    const nodes = Array.from(
      view.querySelectorAll(
        ".page-head, .home__title, .tday-stat, .hub-tile, .subj-card, .discovery-tile, .ai-fav, .study-card, .tday-now, .page > .card",
      ),
    );
    const rect = view.getBoundingClientRect();
    let count = 0;
    for (const el of nodes) {
      const r = el.getBoundingClientRect();
      if (
        r.bottom < rect.top ||
        r.top > rect.bottom ||
        !r.width ||
        !r.height ||
        nodes.some((p) => p !== el && p.contains(el))
      )
        continue;
      play(
        el,
        [
          { opacity: 0.25, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 360,
          delay: Math.min(count * 35, 210),
          fill: "backwards",
          easing: "cubic-bezier(.16,1,.3,1)",
        },
      );
      if (++count >= 18) break;
    }
  }
  function touch(e) {
    if (reduced() || document.hidden || running.size > 24 || e.button > 0)
      return;
    const button = e.target.closest?.(
      ".btn, .icon-btn, .hub-pin, .nav-group__head, .tabbar__item",
    );
    if (
      !button ||
      button.disabled ||
      button.getAttribute("aria-disabled") === "true"
    )
      return;
    const r = button.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const size = Math.min(48, r.height),
      el = document.createElement("span");
    el.className = "motion-touch";
    el.setAttribute("aria-hidden", "true");
    const x = e.detail === 0 ? r.left + r.width / 2 : e.clientX,
      y = e.detail === 0 ? r.top + r.height / 2 : e.clientY;
    el.style.cssText =
      "left:" +
      (x - size / 2) +
      "px;top:" +
      (y - size / 2) +
      "px;width:" +
      size +
      "px;height:" +
      size +
      "px";
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "motion-feedback-layer";
      feedback.setAttribute("aria-hidden", "true");
      document.body.appendChild(feedback);
    }
    feedback.appendChild(el);
    const a = play(
      el,
      [
        { opacity: 0.32, transform: "scale(.4)" },
        { opacity: 0, transform: "scale(1.7)" },
      ],
      { duration: 350, easing: "ease-out" },
    );
    if (a)
      a.finished.then(
        () => el.remove(),
        () => el.remove(),
      );
    else el.remove();
  }
  function init() {
    bar = document.querySelector(".tabbar");
    if (bar) {
      indicator = document.createElement("span");
      indicator.className = "motion-liquid";
      indicator.hidden = true;
      indicator.setAttribute("aria-hidden", "true");
      core = document.createElement("span");
      core.className = "motion-liquid__core";
      indicator.appendChild(core);
      const rail = document.createElement("span");
      rail.className = "motion-rail";
      rail.setAttribute("aria-hidden", "true");
      rail.appendChild(indicator);
      bar.prepend(rail);
      if (window.ResizeObserver) new ResizeObserver(schedule).observe(bar);
    }
    document.documentElement.setAttribute("data-ui-motion", "");
    window.addEventListener("da:route", entrance);
    window.addEventListener("hashchange", schedule);
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("click", touch, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancel();
      else schedule();
    });
    const change = () => {
      if (reduced()) cancel();
      schedule();
    };
    if (media.addEventListener) media.addEventListener("change", change);
    else media.addListener(change);
    new MutationObserver(change).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-a11y-motion", "data-theme"],
    });
    schedule();
  }
  App.motion = { reduced, refresh: entrance };
  init();
})();
