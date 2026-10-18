/* =========================================================
   icons.js — satır içi SVG ikonlar (dış kaynak yok)
   Kullanım: App.icon("calendar")  veya HTML'de data-icon="calendar"
   ========================================================= */
(function () {
  const P = {
    // Ders simgeleri
    sMath:    '<path d="M17.5 5h-11l6 7-6 7h11"/>',
    sPhys:    '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
    sChem:    '<path d="M9.5 3.5h5M10.5 3.5v6.2L5 19.2A1.5 1.5 0 0 0 6.3 21.5h11.4a1.5 1.5 0 0 0 1.3-2.3l-5.5-9.5V3.5"/><path d="M7.4 15.5h9.2"/>',
    sBio:     '<path d="M5 19.5c0-8.5 5.5-14.5 15-15.5-.8 10-6.8 15.5-15 15.5z"/><path d="M5 19.5l8.5-8.5"/>',
    sHist:    '<path d="M3.5 9L12 4l8.5 5z"/><path d="M5.5 10v8M9.5 10v8M14.5 10v8M18.5 10v8M3.5 20.5h17"/>',
    sGeo:     '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z"/>',
    sLit:     '<path d="M19.5 4.5C12 4.5 7.5 9 6.5 17.5L4.5 20.5"/><path d="M6.9 15h5.6c3.5 0 6-3.5 7-10.5"/>',
    sPhil:    '<path d="M4.5 12a7.5 7.5 0 1 1 3.4 6.3L4 19.5l1.1-3.6A7.4 7.4 0 0 1 4.5 12z"/><path d="M10 9.7a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.4M12 15.4h.01"/>',
    sRel:     '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/><path d="M12 13.2s-2.8-1.6-2.8-3.4a1.5 1.5 0 0 1 2.8-.8 1.5 1.5 0 0 1 2.8.8c0 1.8-2.8 3.4-2.8 3.4z"/>',
    sLang:    '<path d="M3.5 18.5L8 6l4.5 12.5M5.2 14h5.6"/><path d="M20 11v7.5M20 15a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z"/>',
    panel:    '<rect x="3.5" y="4" width="17" height="16" rx="3"/><path d="M9 4v16"/>',
    menu:     '<path d="M4 7h16M4 12h16M4 17h16"/>',
    timer:    '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 2.5h5M19 6l1.5-1.5"/>',
    play:     '<path d="M8 5.5v13l10.5-6.5z"/>',
    pause:    '<path d="M8.5 5.5v13M15.5 5.5v13"/>',
    flag:     '<path d="M5.5 21V4M5.5 4.5h11l-2 3.75 2 3.75h-11"/>',
    bookmark: '<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>',
    xCircle:  '<circle cx="12" cy="12" r="8.5"/><path d="M9 9l6 6M15 9l-6 6"/>',
    quiz:     '<rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="M8 8.5h8M8 12h8M8 15.5h5"/>',
    sparkle:  '<path d="M12 3.5l1.9 4.6 4.6 1.9-4.6 1.9L12 16.5l-1.9-4.6L5.5 10l4.6-1.9z"/><path d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    book:     '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
    chart:    '<path d="M4 4v16h16"/><path d="M8 15l3.5-4 3 2.5L19 8"/>',
    plus:     '<path d="M12 5v14M5 12h14"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    upload:   '<path d="M12 20V9M7 13.5l5-5 5 5M5 4h14"/>',
    edit:     '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    trash:    '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/>',
    close:    '<path d="M6 6l12 12M18 6L6 18"/>',
    bell:     '<path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    compass:  '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    chevron:  '<path d="M9 6l6 6-6 6"/>',
    chevronL: '<path d="M15 6l-6 6 6 6"/>',
    chevronD: '<path d="M6 9l6 6 6-6"/>',
    mic:      '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    send:     '<path d="M5 12h13M13 6l6 6-6 6"/>',
    check:    '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    circle:   '<circle cx="12" cy="12" r="8"/>',
    checkCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.5 2.5 4.6-5"/>',
    copy:     '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/>',
    map:      '<path d="M3.5 6.5l5.5-2.5 6 2.5 5.5-2.5v13.5l-5.5 2.5-6-2.5-5.5 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    target:   '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    lightbulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    note:     '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/>',
    list:     '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    layers:   '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    arrowUp:  '<path d="M12 19V5M6 11l6-6 6 6"/>',
    arrowDown:'<path d="M12 5v14M6 13l6 6 6-6"/>',
    grad:     '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5M21.5 9.5v5"/>',
    info:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>',
    lock:     '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    calc:     '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01"/>',
    clock:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    attach:   '<path d="M12 5v14M5 12h14"/>',
    sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>',
    moon:     '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    image:    '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5-8.5 8.5"/>',
    database: '<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6"/>',
    eye:      '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    search:   '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    stop:     '<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>',
    refresh:  '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4"/>',
    volume:   '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    textSize: '<path d="M3.5 19L8 6l4.5 13M5 15h6"/><path d="M14 19l3.25-8.5L20.5 19M15.2 16h4.1"/>',
    a11y:     '<circle cx="12" cy="4.8" r="1.8"/><path d="M5 8.5c2.4.7 4.7 1 7 1s4.6-.3 7-1M12 9.5v4.5M12 14l-3 6.5M12 14l3 6.5"/>',
    roots:    '<circle cx="12" cy="4.5" r="2"/><circle cx="5.5" cy="12" r="2"/><circle cx="18.5" cy="12" r="2"/><circle cx="9" cy="19.5" r="2"/><path d="M10.7 6l-3.8 4.4M13.3 6l3.8 4.4M6.3 13.8l1.9 3.9"/>',
    scan:     '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
    chat:     '<path d="M4.5 5.5h15v10h-9l-4.5 4v-4h-1.5z"/>'
  };

  // Uygulamanın kendi logosu: açık kitap + ışık noktası (gradyan)
  const LOGO =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<defs><linearGradient id="lg-logo" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#5b8cff"/><stop offset=".55" stop-color="#9b72ff"/><stop offset="1" stop-color="#ff7a9a"/></linearGradient></defs>' +
    '<path fill="url(#lg-logo)" d="M12 6.2C9.9 4.6 7 4 3.5 4.3c-.5 0-.9.5-.9 1v11.6c0 .6.5 1 1 1 3.1-.2 5.8.4 7.6 1.9.5.4 1.2.4 1.6 0 1.8-1.5 4.5-2.1 7.6-1.9.6 0 1-.4 1-1V5.3c0-.5-.4-1-.9-1C17 4 14.1 4.6 12 6.2zM12 8v9.3" />' +
    '<path d="M12 7.6v9.6" stroke="#131314" stroke-width="1.3" stroke-linecap="round"/>' +
    '</svg>';

  App.icon = function (name, cls) {
    if (name === "logo") return '<span class="logo-mark" aria-hidden="true"></span>';     // KampüsAI logosu (assets/brand/mark.png)
    const body = P[name];
    if (!body) return "";
    return '<svg class="ico' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  };

  /** data-icon="x" olan boş öğelere ikonu yerleştirir */
  App.hydrateIcons = function (root) {
    (root || document).querySelectorAll("[data-icon]").forEach((el) => {
      if (el.dataset.iconDone) return;
      el.insertAdjacentHTML("afterbegin", App.icon(el.dataset.icon));
      el.dataset.iconDone = "1";
    });
  };
})();
