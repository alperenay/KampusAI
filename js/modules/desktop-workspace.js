/* Desktop navigation is a view of the router, never a separate application state. */
(function () {
  const nav = /** @type {HTMLElement} */ (document.querySelector('#desktopNav'));
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a[data-desktop-route]')).map(el=>/** @type {HTMLAnchorElement} */(el));
  const pill = /** @type {HTMLElement} */ (nav.querySelector('.desktop-nav__indicator'));
  const desktop = matchMedia('(min-width: 1100px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, animation = null, preview = null;
  const text = [
    ['Konu Anlatımları', 'Lessons'], ['Deney Laboratuvarı', 'Science Lab'],
    ['Yapay Zekâ', 'AI Assistant'], ['3B Dünya Küresi', '3D Globe'], ['Ders Programı', 'Study Schedule'],
  ];
  function active() {
    const r = App.router.current().name;
    return links.find(a => a.dataset.desktopRoute === r || (a.dataset.desktopAlso || '').split(',').filter(Boolean).includes(r));
  }
  function reduced() { return reduce.matches || document.documentElement.hasAttribute('data-a11y-motion') || document.documentElement.dataset.uiMotionLevel !== 'full'; }
  function align() {
    frame = 0;
    const current = active(), target = preview || current;
    links.forEach(a => {
      const on = a === current;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (!desktop.matches || !target || document.hidden) { pill.hidden = true; animation?.cancel(); return; }
    const rect = target.getBoundingClientRect(), box = nav.getBoundingClientRect();
    const x = rect.left - box.left - nav.clientLeft, y = rect.top - box.top - nav.clientTop;
    const old = pill.hidden ? null : getComputedStyle(pill).transform;
    animation?.cancel();
    pill.hidden = false;
    pill.style.width = rect.width + 'px'; pill.style.height = rect.height + 'px';
    pill.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    if (old && old !== 'none' && !reduced() && typeof pill.animate === 'function') {
      animation = pill.animate([{transform:old}, {transform:pill.style.transform}], {duration:240,easing:'cubic-bezier(.2,.75,.3,1)'});
      animation.finished.catch(() => {});
    }
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(align); }
  function reset() { preview = null; schedule(); }
  links.forEach(a => {
    a.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') { preview = a; schedule(); } });
    a.addEventListener('focus', () => { preview = a; schedule(); });
    a.addEventListener('click', reset);
  });
  nav.addEventListener('pointerleave', reset);
  nav.addEventListener('focusout', e => { if (!(e.relatedTarget instanceof Node && nav.contains(e.relatedTarget))) reset(); });
  nav.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    const index = links.findIndex(a=>a===document.activeElement); if (index < 0) return;
    e.preventDefault();
    links[e.key === 'Home' ? 0 : e.key === 'End' ? links.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + links.length) % links.length].focus();
  });
  function language() {
    const en = App.i18n.lang === 'en';
    links.forEach((a,i) => { a.querySelector('.desktop-nav__label').textContent = text[i][en ? 1 : 0]; a.title = text[i][en ? 1 : 0]; });
    nav.setAttribute('aria-label', en ? 'Main workspaces' : 'Ana çalışma alanları');
    const customize = document.getElementById('desktopAppearance');
    customize.title = en ? 'Personalise colours and motion' : 'Renkleri ve animasyonları özelleştir';
    customize.setAttribute('aria-label', customize.title); schedule();
  }
  document.getElementById('desktopAppearance').addEventListener('click', () => App.appearance.open('colours'));
  window.addEventListener('da:route', reset);
  window.addEventListener('hashchange', reset);
  window.addEventListener('da:appearance', schedule);
  document.addEventListener('visibilitychange', () => { animation?.cancel(); reset(); });
  desktop.addEventListener('change', reset); reduce.addEventListener('change', reset);
  const preferences = new MutationObserver(() => { animation?.cancel(); schedule(); });
  preferences.observe(document.documentElement, {attributes:true,attributeFilter:['data-a11y-motion','data-ui-motion-level']});
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); animation?.cancel(); });
  window.addEventListener('pageshow', schedule);
  const observer = new ResizeObserver(schedule); observer.observe(nav);
  // Sidebar collapse changes the available width without a window resize.
  App.i18n.onChange(language); language();
  App.desktopWorkspace = { refresh:schedule };
})();
