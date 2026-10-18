/* =========================================================
   drawpad.js — El yazısı çizim tahtası (v1.21)

   App.drawpad.open({ title, hint }) → Promise<File|null>
   Tam ekran tahta: kalem (basınca duyarlı), silgi, kaydırma eli, 3 renk,
   2 kalınlık, geri al / yinele, temizle, kareli / çizgili / düz kâğıt,
   alanı aşağı uzatma. Kalemle (stylus) yazılınca parmak dokunuşları
   kaydırma sayılır (avuç içi reddi).
   "Kontrol et" denince yalnızca yazılı kısım kırpılır, beyaz zemine
   PNG olarak verilir (kâğıt deseni görüntüye girmez).
   Çözümümü Kontrol Et sayfasında "Ekrana yaz" düğmesiyle açılır.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const COLORS = ["#1b1d24", "#1d4ed8", "#c62828"];
  const SIZES = [2.4, 4.2];
  const DRAFT = "drawDraft";

  function open(opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      const back = document.createElement("div");
      back.className = "dp";
      back.setAttribute("role", "dialog");
      back.setAttribute("aria-modal", "true");
      back.innerHTML =
        '<div class="dp__bar">' +
          '<button type="button" class="icon-btn" data-act="close" aria-label="' + esc(T("Kapat", "Close")) + '">' + App.icon("close") + "</button>" +
          '<b class="dp__title">' + esc(opts.title || T("Çözümünü yaz", "Write your solution")) + "</b>" +
          '<div class="dp__tools" role="toolbar">' +
            '<button type="button" class="dp__t is-on" data-tool="pen" aria-label="' + esc(T("Kalem", "Pen")) + '">' + App.icon("pen") + "</button>" +
            '<button type="button" class="dp__t" data-tool="eraser" aria-label="' + esc(T("Silgi", "Eraser")) + '">' + App.icon("eraser") + "</button>" +
            '<button type="button" class="dp__t" data-tool="hand" aria-label="' + esc(T("Kaydır", "Scroll")) + '"><span class="dp__hand">✋</span></button>' +
            '<span class="dp__sep"></span>' +
            COLORS.map((c, i) => '<button type="button" class="dp__c' + (i === 0 ? " is-on" : "") + '" data-color="' + c + '" style="--c:' + c + '" aria-label="' + esc(T("Renk", "Colour")) + " " + (i + 1) + '"></button>').join("") +
            '<button type="button" class="dp__t dp__w" data-size="toggle" aria-label="' + esc(T("Kalınlık", "Thickness")) + '"><i></i></button>' +
            '<span class="dp__sep"></span>' +
            '<button type="button" class="dp__t" data-act="undo" aria-label="' + esc(T("Geri al", "Undo")) + '">' + App.icon("undo") + "</button>" +
            '<button type="button" class="dp__t" data-act="redo" aria-label="' + esc(T("Yinele", "Redo")) + '">' + App.icon("redo") + "</button>" +
            '<button type="button" class="dp__t" data-act="clear" aria-label="' + esc(T("Temizle", "Clear")) + '">' + App.icon("trash") + "</button>" +
            '<button type="button" class="dp__t" data-act="paper" aria-label="' + esc(T("Kâğıt", "Paper")) + '">#</button>' +
          "</div>" +
          '<button type="button" class="btn btn--primary btn--sm" data-act="done">' + App.icon("check") + esc(opts.doneText || T("Kontrol et", "Check")) + "</button>" +
        "</div>" +
        '<div class="dp__scroll"><div class="dp__paper is-grid"><canvas class="dp__cv"></canvas></div>' +
          '<button type="button" class="btn btn--sm btn--ghost dp__more" data-act="more">' + App.icon("plus") + esc(T("Alanı uzat", "More space")) + "</button></div>" +
        '<p class="dp__hint">' + esc(opts.hint || T("Her adımı alt alta yaz. Kalemle yazarken parmağınla kaydırabilirsin.", "Write each step on a new line. With a stylus, scroll with your finger.")) + "</p>";
      document.body.appendChild(back);
      App.hydrateIcons(back);
      document.documentElement.classList.add("dp-open");

      const scroll = back.querySelector(".dp__scroll");
      const paper = back.querySelector(".dp__paper");
      const cv = back.querySelector("canvas");
      const ctx = cv.getContext("2d");
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      let W = 0, H = 0;
      let strokes = [], redo = [], cur = null;
      let tool = "pen", color = COLORS[0], size = SIZES[0];
      let penSeen = false;
      const PAPERS = ["is-grid", "is-lined", "is-plain"];
      let paperIdx = 0;

      // Taslak (kapatıp açınca kaybolmasın)
      try { const d = App.prefs.get(DRAFT, null); if (d && Array.isArray(d.s) && Date.now() - d.t < 864e5) { strokes = d.s; H = d.h || 0; } } catch (e) { /* yok */ }
      const saveDraft = App.utils.debounce(() => { try { App.prefs.set(DRAFT, { t: Date.now(), s: strokes.slice(-400), h: H }); } catch (e) { /* çok büyük */ } }, 600);

      function size2() {
        const w = scroll.clientWidth - 24;
        W = Math.max(280, Math.min(1400, w));
        H = Math.max(H, scroll.clientHeight - 70, 520);
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        cv.style.width = W + "px"; cv.style.height = H + "px";
        paper.style.width = W + "px"; paper.style.height = H + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        redraw();
      }
      function drawStroke(s) {
        const p = s.p;
        if (!p.length) return;
        ctx.save();
        ctx.globalCompositeOperation = s.e ? "destination-out" : "source-over";
        ctx.strokeStyle = s.c; ctx.fillStyle = s.c;
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        if (p.length === 1) { ctx.beginPath(); ctx.arc(p[0][0], p[0][1], (s.w * (p[0][2] || 1)) / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); return; }
        for (let i = 1; i < p.length; i++) {
          const a = p[i - 1], b = p[i];
          const m0 = i > 1 ? [(p[i - 2][0] + a[0]) / 2, (p[i - 2][1] + a[1]) / 2] : a;
          const m1 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          ctx.lineWidth = s.w * ((a[2] + b[2]) / 2 || 1);
          ctx.beginPath(); ctx.moveTo(m0[0], m0[1]); ctx.quadraticCurveTo(a[0], a[1], m1[0], m1[1]); ctx.stroke();
        }
        const l = p[p.length - 1], q = p[p.length - 2];
        ctx.beginPath(); ctx.moveTo((q[0] + l[0]) / 2, (q[1] + l[1]) / 2); ctx.lineTo(l[0], l[1]); ctx.stroke();
        ctx.restore();
      }
      function redraw() { ctx.clearRect(0, 0, W, H); strokes.forEach(drawStroke); paint(); }
      function paint() {
        back.querySelector('[data-act="undo"]').disabled = !strokes.length;
        back.querySelector('[data-act="redo"]').disabled = !redo.length;
        back.querySelector('[data-act="done"]').disabled = !strokes.some((s) => !s.e);
      }

      /* --- Çizim --- */
      const pos = (e) => { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * 10) / 10, Math.round((e.clientY - r.top) * 10) / 10]; };
      const pressure = (e) => (e.pointerType === "pen" && e.pressure > 0 ? 0.45 + e.pressure * 1.1 : 1);
      let pan = null;
      cv.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "pen") penSeen = true;
        const panning = tool === "hand" || (penSeen && e.pointerType === "touch");
        if (panning) { pan = { y: e.clientY, x: e.clientX, st: scroll.scrollTop, sl: scroll.scrollLeft, id: e.pointerId }; cv.setPointerCapture(e.pointerId); return; }
        if (cur) return;
        e.preventDefault();
        cv.setPointerCapture(e.pointerId);
        const [x, y] = pos(e);
        cur = { id: e.pointerId, c: tool === "eraser" ? "#000" : color, w: tool === "eraser" ? 22 : size, e: tool === "eraser" ? 1 : 0, p: [[x, y, Math.round(pressure(e) * 100) / 100]] };
        strokes.push(cur); redo = [];
        drawStroke(cur);
      });
      cv.addEventListener("pointermove", (e) => {
        if (pan && e.pointerId === pan.id) { scroll.scrollTop = pan.st - (e.clientY - pan.y); scroll.scrollLeft = pan.sl - (e.clientX - pan.x); return; }
        if (!cur || e.pointerId !== cur.id) return;
        const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
        const before = cur.p.length;
        evs.forEach((ev) => {
          const [x, y] = pos(ev), l = cur.p[cur.p.length - 1];
          if (Math.abs(x - l[0]) + Math.abs(y - l[1]) < 1.2) return;
          cur.p.push([x, y, Math.round(pressure(ev) * 100) / 100]);
        });
        if (cur.p.length === before) return;
        // yalnızca son parçayı çiz (hızlı)
        const s = { c: cur.c, w: cur.w, e: cur.e, p: cur.p.slice(Math.max(0, before - 2)) };
        drawStroke(s);
        if (y0Grow(cur.p[cur.p.length - 1][1])) size2();
      });
      const end = (e) => {
        if (pan && e.pointerId === pan.id) { pan = null; return; }
        if (!cur || e.pointerId !== cur.id) return;
        cur = null; redraw(); saveDraft();
      };
      cv.addEventListener("pointerup", end);
      cv.addEventListener("pointercancel", end);
      // Yazı alanın sonuna yaklaşınca kendiliğinden uzat
      function y0Grow(y) { if (y > H - 60) { H += 400; return true; } return false; }

      /* --- Araçlar --- */
      back.querySelectorAll("[data-tool]").forEach((b) => b.addEventListener("click", () => {
        tool = b.dataset.tool;
        back.querySelectorAll("[data-tool]").forEach((x) => x.classList.toggle("is-on", x === b));
        cv.style.touchAction = tool === "hand" ? "pan-x pan-y" : "none";
        cv.classList.toggle("is-hand", tool === "hand");
      }));
      back.querySelectorAll("[data-color]").forEach((b) => b.addEventListener("click", () => {
        color = b.dataset.color;
        back.querySelectorAll("[data-color]").forEach((x) => x.classList.toggle("is-on", x === b));
        if (tool !== "pen") back.querySelector('[data-tool="pen"]').click();
      }));
      back.querySelector("[data-size]").addEventListener("click", (e) => {
        size = size === SIZES[0] ? SIZES[1] : SIZES[0];
        e.currentTarget.classList.toggle("is-thick", size === SIZES[1]);
      });
      function finish(file) {
        document.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
        document.documentElement.classList.remove("dp-open");
        back.remove();
        resolve(file);
      }
      async function exportFile() {
        // İçeriğin sınırları
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        strokes.forEach((s) => { if (s.e) return; s.p.forEach((p) => { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }); });
        if (!isFinite(x0)) return null;
        const pad = 24;
        x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W, x1 + pad); y1 = Math.min(H, y1 + pad);
        const k = Math.min(2, 1600 / Math.max(x1 - x0, y1 - y0));
        const out = document.createElement("canvas");
        out.width = Math.max(1, Math.round((x1 - x0) * k)); out.height = Math.max(1, Math.round((y1 - y0) * k));
        const o = out.getContext("2d");
        o.fillStyle = "#fff"; o.fillRect(0, 0, out.width, out.height);
        o.drawImage(cv, x0 * dpr, y0 * dpr, (x1 - x0) * dpr, (y1 - y0) * dpr, 0, 0, out.width, out.height);
        const blob = await new Promise((r) => out.toBlob(r, "image/png"));
        if (!blob) return null;
        try { return new File([blob], "cozum.png", { type: "image/png" }); } catch (e) { blob.name = "cozum.png"; return blob; }
      }
      back.addEventListener("click", async (e) => {
        const a = e.target.closest("[data-act]"); if (!a) return;
        const act = a.dataset.act;
        if (act === "close") finish(null);
        else if (act === "undo" && strokes.length) { redo.push(strokes.pop()); redraw(); saveDraft(); }
        else if (act === "redo" && redo.length) { strokes.push(redo.pop()); redraw(); saveDraft(); }
        else if (act === "clear" && strokes.length) { if (await App.ui.confirm(T("Tahta temizlensin mi?", "Clear the board?"), T("Temizle", "Clear"), true)) { strokes = []; redo = []; H = 0; size2(); saveDraft(); } }
        else if (act === "paper") { paper.classList.remove(PAPERS[paperIdx]); paperIdx = (paperIdx + 1) % PAPERS.length; paper.classList.add(PAPERS[paperIdx]); }
        else if (act === "more") { H += 500; size2(); scroll.scrollTo({ top: scroll.scrollHeight, behavior: "smooth" }); }
        else if (act === "done") { const f = await exportFile(); if (f) { App.prefs.set(DRAFT, null); finish(f); } }
      });
      const onKey = (e) => {
        if (e.key === "Escape") finish(null);
        else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); back.querySelector(e.shiftKey ? '[data-act="redo"]' : '[data-act="undo"]').click(); }
      };
      document.addEventListener("keydown", onKey);
      const onResize = App.utils.debounce(size2, 150);
      window.addEventListener("resize", onResize);
      requestAnimationFrame(size2);
      App.drawpad._last = { strokes: () => strokes, cv, exportFile };
    });
  }

  App.drawpad = { open };
})();
