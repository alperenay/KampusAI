/* =========================================================
   zaman.js — Etkileşimli Tarih Zaman Çizelgesi   (#/zaman)

   • Çizelge: yatay kaydırılır; zaman ölçeği parçalı doğrusaldır (olayların
     yoğun olduğu dönemler daha geniş), dönem bantları altta.
   • Süzgeç: olay türleri (siyasi, savaş, antlaşma, kültür, ıslahat, dünya),
     dönem atlama, arama. Liste görünümü (ekran okuyucu ve telefon için).
   • Olay kartı: tarih, dönem, açıklama, küçük konum haritası, önceki/sonraki,
     "Asistana sor".
   • Sınav: "Hangisi önce oldu?" 10 soru; rekor tercih "timelineBest".
   Veri: js/data/tarih-olaylar.js
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const EV = () => App.data.tarihOlay || [];
  const ERA = () => App.data.tarihDonem || [];
  const TUR = () => App.data.tarihTur || {};
  const BP = [-3500, -1500, -500, 0, 500, 800, 1000, 1200, 1300, 1400, 1453, 1520, 1600, 1700, 1770, 1830, 1870, 1900, 1914, 1918, 1920, 1922, 1923, 1930, 1938, 1950, 1970, 2001];
  const yearTxt = (y) => (y < 0 ? T("MÖ ", "") + Math.abs(Math.floor(y)) + (App.i18n.lang === "en" ? " BC" : "") : String(Math.floor(y)));
  const eraOf = (k) => ERA().find((e) => e[0] === k) || ["", k, 0, 0, "#888"];
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------------- Zaman ölçeği ---------------- */
  function scale(zoom) {
    const cnt = BP.slice(0, -1).map((a, i) => EV().filter((e) => e[0] >= a && e[0] < BP[i + 1]).length);
    const widths = cnt.map((c) => Math.max(70, c * 96) * zoom);
    const starts = [40]; widths.forEach((w, i) => starts.push(starts[i] + w));
    const x = (y) => {
      let i = BP.length - 2;
      for (let k = 0; k < BP.length - 1; k++) if (y < BP[k + 1]) { i = k; break; }
      const a = BP[i], b = BP[i + 1];
      return starts[i] + ((Math.max(a, Math.min(b, y)) - a) / (b - a)) * widths[i];
    };
    return { x, width: starts[starts.length - 1] + 60 };
  }

  /* ---------------- Sayfa ---------------- */
  function render(view, params) {
    App.setTitle(T("Tarih Zaman Çizelgesi", "History Timeline"));
    const st = { zoom: +App.prefs.get("tlZoom", 1) || 1, types: new Set(Object.keys(TUR())), q: "", sel: null, mode: params[0] === "liste" ? "list" : params[0] === "sinav" ? "quiz" : "line" };
    const list = () => EV().map((e, i) => ({ i, y: e[0], t: e[1], era: e[2], ty: e[3], d: e[4], loc: e[5] })).sort((a, b) => a.y - b.y);
    const all = list();
    const visible = () => { const w = (App.nav && App.nav.norm ? App.nav.norm(st.q) : st.q.toLowerCase()).split(" ").filter(Boolean); return all.filter((e) => st.types.has(e.ty) && (!w.length || w.every((x) => normEv(e).indexOf(x) >= 0))); };
    const normEv = (e) => e._n || (e._n = (App.nav && App.nav.norm ? App.nav.norm : (s) => s.toLowerCase())(e.t + " " + e.d + " " + yearTxt(e.y) + " " + eraOf(e.era)[1]));

    view.innerHTML = '<div class="page zc">' +
      '<div class="page-head"><div><h1>' + esc(T("Tarih Zaman Çizelgesi", "History Timeline")) + "</h1><p>" +
        esc(T("İlk Çağ'dan günümüze Türk ve dünya tarihinin dönüm noktaları. Çizelgeyi kaydır, bir olaya dokun; konumunu ve önemini gör, sonra kendini sına.", "Turning points of Turkish and world history. Scroll, tap an event, then test yourself.")) + "</p></div></div>" +
      '<div class="zc-top"><div class="mp-seg" role="tablist">' +
        [["line", "#/zaman", T("Çizelge", "Timeline")], ["list", "#/zaman/liste", T("Liste", "List")], ["quiz", "#/zaman/sinav", T("Hangisi önce?", "Which came first?")]]
          .map(([k, h, l]) => '<a class="mp-seg__b' + (st.mode === k ? " is-on" : "") + '" href="' + h + '" role="tab" aria-selected="' + (st.mode === k) + '">' + esc(l) + "</a>").join("") + "</div>" +
        (st.mode !== "quiz" ? '<label class="tc-search zc-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="tlQ" placeholder="' + esc(T("Olay ara: Lozan, Malazgirt, 1839…", "Search events…")) + '" aria-label="' + esc(T("Olay ara", "Search events")) + '"></label>' : "") +
      "</div>" +
      (st.mode !== "quiz" ? '<div class="zc-types" role="group" aria-label="' + esc(T("Olay türleri", "Event types")) + '">' + Object.entries(TUR()).map(([k, v]) =>
        '<button type="button" class="zc-type is-on" data-ty="' + k + '" aria-pressed="true" style="--c:' + v[1] + '"><i></i>' + esc(T(v[0], ({ s: "Political", w: "War", a: "Treaty", k: "Culture & science", i: "Reform", d: "World" })[k])) + "</button>").join("") + "</div>" +
        '<div class="zc-eras">' + ERA().map((e) => '<button type="button" class="zc-era" data-era="' + e[0] + '" style="--c:' + e[4] + '">' + esc(e[1]) + "</button>").join("") + "</div>" : "") +
      '<div id="tlBody"></div><div id="tlCard" class="zc-cardwrap" aria-live="polite"></div>' +
      '<p class="hint zc-src">' + esc(T(all.length + " olay. Açıklamalar ders kitabı düzeyinde özetlenmiştir; tarihler yıl düzeyindedir (bazı olaylarda gün ve ay açıklamada yazılıdır).", all.length + " events. Summaries are at textbook level.")) + "</p>" +
      "</div>";
    App.hydrateIcons(view);
    const body = view.querySelector("#tlBody"), cardEl = view.querySelector("#tlCard");

    /* --- Çizelge --- */
    function drawLine() {
      const vis = visible(), sc = scale(st.zoom);
      const lanes = [], LANE = 30, MAXL = 8;
      const placed = vis.map((e) => {
        const x = sc.x(e.y), w = Math.min(200, e.t.length * 6.6 + 54);
        let lane = lanes.findIndex((end) => end < x - 4);
        if (lane < 0) lane = lanes.length < MAXL ? lanes.length : lanes.indexOf(Math.min(...lanes));
        lanes[lane] = x + w;
        return { e, x, lane, w };
      });
      const nl = Math.max(1, Math.min(MAXL, lanes.length));
      const axisY = nl * LANE + 18;
      const ticks = BP.slice(0, -1).map((y) => '<span class="zc-tick" style="left:' + sc.x(y).toFixed(0) + 'px">' + esc(yearTxt(y)) + "</span>").join("");
      // dönem bantları: çakışanlar iki satıra
      const rowsEnd = [];
      const bands = ERA().map((e) => {
        const x0 = sc.x(Math.max(BP[0], e[2])), x1 = sc.x(Math.min(2000, e[3]));
        let r = rowsEnd.findIndex((end) => end <= x0 + 1); if (r < 0) { r = rowsEnd.length; } rowsEnd[r] = x1;
        return '<button type="button" class="zc-band" data-era="' + e[0] + '" style="left:' + x0.toFixed(0) + "px;width:" + Math.max(24, x1 - x0).toFixed(0) + "px;top:" + (axisY + 26 + r * 26) + "px;--c:" + e[4] + '" title="' + esc(e[1] + " (" + yearTxt(e[2]) + "–" + yearTxt(e[3]) + ")") + '"><span>' + esc(e[1]) + "</span></button>";
      }).join("");
      const h = axisY + 26 + Math.max(1, rowsEnd.length) * 26 + 12;
      body.innerHTML = '<div class="zc-zoom"><button type="button" class="icon-btn" data-z="-1" aria-label="' + esc(T("Uzaklaştır", "Zoom out")) + '"><span class="mp-minus">−</span></button><button type="button" class="icon-btn" data-z="1" aria-label="' + esc(T("Yakınlaştır", "Zoom in")) + '">' + App.icon("plus") + "</button>" +
        '<span class="hint">' + esc(T(vis.length + " olay · kaydırmak için sürükle ya da yatay kaydır", vis.length + " events · drag or scroll sideways")) + "</span></div>" +
        '<div class="zc-scroll" id="tlScroll" tabindex="0" aria-label="' + esc(T("Zaman çizelgesi", "Timeline")) + '"><div class="zc-track" style="width:' + sc.width.toFixed(0) + "px;height:" + h + 'px">' +
          '<div class="zc-axis" style="top:' + axisY + 'px"></div>' + ticks.replace(/class="zc-tick"/g, 'class="zc-tick" data-top="' + axisY + '"') +
          placed.map((p) => {
            const c = (TUR()[p.e.ty] || ["", "#888"])[1], top = axisY - 18 - p.lane * LANE;
            return '<span class="zc-stem" style="left:' + p.x.toFixed(0) + "px;top:" + (top + 22) + "px;height:" + (axisY - top - 22) + "px;--c:" + c + '"></span>' +
              '<button type="button" class="zc-ev' + (st.sel === p.e.i ? " is-sel" : "") + '" data-ev="' + p.e.i + '" style="left:' + (p.x - 6).toFixed(0) + "px;top:" + top + "px;max-width:" + p.w + "px;--c:" + c + '"><i></i><b>' + esc(yearTxt(p.e.y)) + "</b> " + esc(p.e.t) + "</button>";
          }).join("") + bands +
        "</div></div>";
      body.querySelectorAll(".zc-tick").forEach((t) => { t.style.top = (axisY + 4) + "px"; });
      App.hydrateIcons(body);
      body.querySelectorAll("[data-ev]").forEach((b) => b.addEventListener("click", () => select(+b.dataset.ev)));
      body.querySelectorAll(".zc-band").forEach((b) => b.addEventListener("click", () => jumpEra(b.dataset.era)));
      body.querySelectorAll("[data-z]").forEach((b) => b.addEventListener("click", () => {
        const sEl = body.querySelector("#tlScroll"), mid = (sEl.scrollLeft + sEl.clientWidth / 2) / sEl.scrollWidth;
        st.zoom = Math.max(0.6, Math.min(3, st.zoom * (b.dataset.z === "1" ? 1.4 : 1 / 1.4))); App.prefs.set("tlZoom", st.zoom);
        drawLine(); const s2 = body.querySelector("#tlScroll"); s2.scrollLeft = mid * s2.scrollWidth - s2.clientWidth / 2;
      }));
      // fareyle sürükleyerek kaydır
      const sEl = body.querySelector("#tlScroll");
      let dragX = null, startL = 0, moved = false;
      sEl.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || e.button !== 0) return; dragX = e.clientX; startL = sEl.scrollLeft; moved = false; });
      sEl.addEventListener("pointermove", (e) => { if (dragX == null) return; const d = e.clientX - dragX; if (Math.abs(d) > 4) { moved = true; if (!sEl.hasPointerCapture(e.pointerId)) sEl.setPointerCapture(e.pointerId); } if (moved) sEl.scrollLeft = startL - d; });
      sEl.addEventListener("pointerup", () => { dragX = null; });
      sEl.addEventListener("pointercancel", () => { dragX = null; });
      sEl.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
      sEl.addEventListener("wheel", (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { sEl.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
      st.sc = sc;
    }
    function jumpEra(k) {
      const e = eraOf(k);
      if (st.mode === "list") { const h = body.querySelector('[data-era-h="' + k + '"]'); if (h) h.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      const sEl = body.querySelector("#tlScroll"); if (!sEl || !st.sc) return;
      sEl.scrollTo({ left: Math.max(0, st.sc.x(Math.max(BP[0], e[2])) - 30), behavior: "smooth" });
    }

    /* --- Liste --- */
    function drawList() {
      const vis = visible();
      let html = "", last = null;
      vis.forEach((e) => {
        if (e.era !== last) { if (last) html += "</ol>"; const er = eraOf(e.era); html += '<h2 class="zc-lh" data-era-h="' + e.era + '" style="--c:' + er[4] + '">' + esc(er[1]) + "</h2><ol class=\"zc-list\">"; last = e.era; }
        const c = (TUR()[e.ty] || ["", "#888"])[1];
        html += '<li><button type="button" class="zc-li' + (st.sel === e.i ? " is-sel" : "") + '" data-ev="' + e.i + '" style="--c:' + c + '"><span class="zc-li__y">' + esc(yearTxt(e.y)) + "</span><span class=\"zc-li__t\"><b>" + esc(e.t) + "</b><small>" + esc(e.d) + "</small></span></button></li>";
      });
      body.innerHTML = vis.length ? html + "</ol>" : App.ui.empty("search", T("Olay bulunamadı", "No events"), T("Aramayı ya da tür süzgecini değiştir.", "Change the search or filters."));
      App.hydrateIcons(body);
      body.querySelectorAll("[data-ev]").forEach((b) => b.addEventListener("click", () => select(+b.dataset.ev)));
    }

    /* --- Olay kartı --- */
    async function select(i, noScroll) {
      st.sel = i;
      body.querySelectorAll(".is-sel").forEach((x) => x.classList.remove("is-sel"));
      body.querySelectorAll('[data-ev="' + i + '"]').forEach((x) => x.classList.add("is-sel"));
      const e = all.find((x) => x.i === i); if (!e) return;
      const vis = visible(), k = vis.findIndex((x) => x.i === i);
      const er = eraOf(e.era), ty = TUR()[e.ty] || ["", "#888"];
      cardEl.innerHTML = '<article class="card zc-card"><div class="zc-card__main">' +
        '<div class="zc-card__meta"><span class="zc-year">' + esc(yearTxt(e.y)) + '</span><span class="zc-tag" style="--c:' + ty[1] + '">' + esc(ty[0]) + '</span><span class="zc-tag" style="--c:' + er[4] + '">' + esc(er[1]) + "</span></div>" +
        "<h2>" + esc(e.t) + "</h2><p>" + esc(e.d) + "</p>" +
        '<div class="zc-card__act"><button type="button" class="btn btn--sm" data-nav="-1"' + (k <= 0 ? " disabled" : "") + ">" + App.icon("chevronL") + esc(T("Önceki", "Previous")) + '</button><button type="button" class="btn btn--sm" data-nav="1"' + (k < 0 || k >= vis.length - 1 ? " disabled" : "") + ">" + esc(T("Sonraki", "Next")) + App.icon("chevron") + "</button>" +
          '<button type="button" class="btn btn--sm btn--ai" data-ask>' + App.icon("sparkle") + esc(T("Asistana sor", "Ask the assistant")) + "</button></div></div>" +
        (e.loc ? '<div class="zc-map" id="tlMap" aria-label="' + esc(T("Konum", "Location")) + '"></div>' : "") + "</article>";
      App.hydrateIcons(cardEl);
      cardEl.querySelectorAll("[data-nav]").forEach((b) => b.addEventListener("click", () => {
        const n = vis[k + +b.dataset.nav]; if (!n) return; select(n.i);
        if (st.mode === "line") { const el = body.querySelector('[data-ev="' + n.i + '"]'), sEl = body.querySelector("#tlScroll"); if (el && sEl) sEl.scrollTo({ left: el.offsetLeft - sEl.clientWidth / 2, behavior: "smooth" }); }
      }));
      cardEl.querySelector("[data-ask]").addEventListener("click", () => App.modules.assistant.startWith(T(
        "\"" + e.t + "\" (" + yearTxt(e.y) + ") konusunu YKS tarih düzeyinde anlat: nedenleri, gelişimi, sonuçları ve sınavda dikkat edilmesi gereken noktalar. Sonunda 2 kısa soru sor.",
        "Explain \"" + e.t + "\" (" + yearTxt(e.y) + ") for the YKS history exam: causes, course, results and key exam points. End with 2 short questions."), null));
      if (!noScroll && window.matchMedia("(max-width: 900px)").matches) cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (e.loc) miniMap(e.loc);
    }
    async function miniMap(loc) {
      const host = cardEl.querySelector("#tlMap"); if (!host) return;
      try { await App.harita.loadData(); } catch (err) { host.remove(); return; }
      if (!host.isConnected) return;
      const W = App.data.mapWorld, p = App.harita.pworld(loc[0], loc[1]);
      const near = Math.abs(loc[0] - 32) < 16 && Math.abs(loc[1] - 39) < 8;
      const span = near ? 70 : 150;
      const vb = [p[0] - span / 2, p[1] - span * 0.32, span, span * 0.64];
      host.innerHTML = '<svg viewBox="' + vb.map((v) => v.toFixed(1)).join(" ") + '" class="zc-mapsvg" role="img" aria-label="' + esc(T("Olayın yeri", "Event location")) + '"><rect x="' + vb[0] + '" y="' + vb[1] + '" width="' + vb[2] + '" height="' + vb[3] + '" class="mp-sea"/>' +
        W.countries.map((c) => '<path d="' + c.d + '" class="mp-p' + (c.id === "TUR" ? " is-home" : "") + '"/>').join("") +
        '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (span / 40).toFixed(2) + '" class="zc-pin"/><circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (span / 18).toFixed(2) + '" class="zc-pin2"/></svg>';
      host.querySelector("svg").style.setProperty("--z", 680 / span);
    }

    /* --- Sınav: hangisi önce? --- */
    function drawQuiz() {
      const N = 10, best = App.prefs.get("timelineBest", 0) || 0;
      const pool = all.filter((e) => e.y > -4000);
      const qs = [];
      while (qs.length < N) {
        const [a, b] = shuffle(pool).slice(0, 2);
        if (Math.floor(a.y) !== Math.floor(b.y) && Math.abs(a.y - b.y) < 400) qs.push([a, b]);
      }
      let i = 0, score = 0;
      const ask = () => {
        if (i >= N) {
          const nb = score > best; if (nb) App.prefs.set("timelineBest", score);
          body.innerHTML = '<div class="card zc-quiz"><h2>' + esc(T("Sonuç: ", "Result: ")) + score + " / " + N + "</h2><p>" + esc(nb ? T("Yeni rekor!", "New record!") : T("Rekorun: ", "Best: ") + Math.max(best, score)) + '</p><button type="button" class="btn btn--primary" id="tlAgain">' + esc(T("Yeniden", "Again")) + "</button></div>";
          body.querySelector("#tlAgain").addEventListener("click", drawQuiz); return;
        }
        const [a, b] = qs[i];
        body.innerHTML = '<div class="card zc-quiz"><div class="zc-quiz__head"><span>' + (i + 1) + " / " + N + '</span><span class="mp-q__s">' + App.icon("star") + score + "</span></div><h2>" + esc(T("Hangisi daha önce oldu?", "Which came first?")) + '</h2><div class="zc-quiz__opts">' +
          [a, b].map((e) => '<button type="button" class="zc-opt" data-o="' + e.i + '"><b>' + esc(e.t) + '</b><span class="zc-opt__y" hidden>' + esc(yearTxt(e.y)) + "</span></button>").join("") + "</div></div>";
        App.hydrateIcons(body);
        body.querySelectorAll("[data-o]").forEach((btn) => btn.addEventListener("click", () => {
          const first = a.y < b.y ? a : b, ok = +btn.dataset.o === first.i;
          if (ok) score++;
          body.querySelectorAll("[data-o]").forEach((x) => { x.disabled = true; x.querySelector(".zc-opt__y").hidden = false; x.classList.add(+x.dataset.o === first.i ? "is-right" : "is-wrong"); });
          select(first.i, true);
          setTimeout(() => { i++; ask(); }, ok ? 1300 : 2400);
        }));
      };
      ask();
    }

    /* --- Olaylar --- */
    const paint = () => (st.mode === "line" ? drawLine() : st.mode === "list" ? drawList() : drawQuiz());
    view.querySelectorAll("[data-ty]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.ty; if (st.types.has(k) && st.types.size > 1) st.types.delete(k); else st.types.add(k);
      b.classList.toggle("is-on", st.types.has(k)); b.setAttribute("aria-pressed", st.types.has(k)); paint();
    }));
    view.querySelectorAll(".zc-eras [data-era]").forEach((b) => b.addEventListener("click", () => jumpEra(b.dataset.era)));
    const q = view.querySelector("#tlQ");
    if (q) {
      q.addEventListener("input", App.utils.debounce(() => { st.q = q.value; paint(); const v = visible(); if (st.q && v.length) { select(v[0].i, true); if (st.mode === "line") { const el = body.querySelector('[data-ev="' + v[0].i + '"]'), sEl = body.querySelector("#tlScroll"); if (el && sEl) sEl.scrollTo({ left: el.offsetLeft - 40, behavior: "smooth" }); } } }, 250));
    }
    paint();
    if (st.mode !== "quiz") {
      // açılışta Millî Mücadele'ye yakın bir yerden başla ve bir olay seç
      const start = all.find((e) => e.t.indexOf("Samsun") >= 0) || all[0];
      select(start.i, true);
      if (st.mode === "line") { const el = body.querySelector('[data-ev="' + start.i + '"]'), sEl = body.querySelector("#tlScroll"); if (el && sEl) sEl.scrollLeft = el.offsetLeft - sEl.clientWidth / 2; }
    }
    App.zaman._last = { st, visible, select };
  }

  App.router.register("zaman", render);
  App.zaman = { scale, yearTxt };
})();
