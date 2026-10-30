/* =========================================================
   voice-board.js — sesli öğretmenin senkron tahtası (v1.64)

   Öğretmen konuşurken cevap tahtaya adım adım yazılır ve o an okunan adım vurgulanır.
   Konuşma akışı (App.speech.stream) her okuma parçasının cevap metnindeki yerini (src) bildirir;
   parça çalmaya başlayınca voice.js reach(src[0]) çağırır, tahta o yere düşen adımı yazar.
     • Adım: numaralı ya da madde işaretli satır; tek paragraflık uzun cevapta cümle.
       Açık $$ … $$, ** ya da ` bloğunun içinde bölünmez; formüller KaTeX ile çizilir.
     • Ses yoksa ya da okuma durdurulursa finish() bütün adımları gösterir: tahta yine okunur kalır.
     • Yazma efekti yalnız transform/opacity/clip-path; hareket azaltmada adım doğrudan görünür.

   App.voiceBoard.steps(md) → [{ text, n, start, end }]   (saf; tools/voice-board-check.mjs)
   App.voiceBoard.create(host) → { update(md), reach(pos), finish(), reset(), state() }
   ========================================================= */
(function () {
  const reduced = () => {
    try { return matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.hasAttribute("data-a11y-motion"); }
    catch (e) { return false; }
  };
  const count = (s, re) => (s.match(re) || []).length;
  /** Açık matematik, kalın yazı ya da kod bloğu kalmadıysa true (konuşma akışıyla aynı kural) */
  const balanced = (s) => { const d = s.replace(/\\\$/g, ""); return s.split("**").length % 2 === 1 && count(d, /\$\$/g) % 2 === 0 && count(d.replace(/\$\$/g, ""), /\$/g) % 2 === 0 && count(s, /`/g) % 2 === 0; };
  const MARK = /^(\s*)(?:(\d{1,2})[.)]|[-*•])\s+/;

  /** [a, b) aralığını baştaki/sondaki boşluklar atılmış olarak döndürür; boşsa null */
  function trimRange(md, a, b) {
    while (a < b && /\s/.test(md[a])) a++;
    while (b > a && /\s/.test(md[b - 1])) b--;
    return a < b ? [a, b] : null;
  }
  /** Satır aralıkları: açık bir bloğun içindeki satır sonunda bölünmez */
  function lines(md) {
    const out = [];
    let from = 0, pos = 0;
    for (;;) {
      const nl = md.indexOf("\n", pos), end = nl < 0 ? md.length : nl;
      if (nl < 0 || balanced(md.slice(from, end))) {
        const r = trimRange(md, from, end);
        if (r) out.push(r);
        from = end + 1;
      }
      if (nl < 0) break;
      pos = nl + 1;
    }
    return out;
  }
  /** Cümle aralıkları ("3." gibi sayıdan sonraki noktada ve açık blok içinde bölünmez) */
  function sentences(md, a, b) {
    const out = [], re = /[.!?…](?=\s)/g;
    let from = a, m;
    re.lastIndex = a;
    while ((m = re.exec(md)) && m.index < b) {
      if (m[0] === "." && /\d/.test(md.charAt(m.index - 1))) continue;
      const end = m.index + 1;
      if (!balanced(md.slice(from, end))) continue;
      const r = trimRange(md, from, end);
      if (r) out.push(r);
      from = end;
    }
    const r = trimRange(md, from, b);
    if (r) out.push(r);
    return out;
  }

  function steps(md) {
    md = String(md || "");
    let ranges = lines(md);
    // Tek paragraflık uzun cevap: cümle cümle yazılır
    if (ranges.length === 1 && ranges[0][1] - ranges[0][0] > 140) ranges = sentences(md, ranges[0][0], ranges[0][1]);
    return ranges.map(([start, end]) => {
      const raw = md.slice(start, end), m = raw.match(MARK);
      return { text: m ? raw.slice(m[0].length) : raw, n: m && m[2] ? Number(m[2]) : null, start, end };
    });
  }

  function render(text) {
    const md = App.cite ? App.cite.strip(text) : text;
    return App.markdown.render(md).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1");
  }

  function create(host) {
    const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
    host.innerHTML = '<ol class="vboard" aria-label="' + T("Tahta", "Board") + '"></ol>';
    const list = host.firstChild;
    let items = [], reached = -1, all = false, now = -1;

    function write(el, text) {
      el.hidden = false;
      if (reduced() || !el.animate) return;
      // Tebeşir yazısı: metin soldan sağa açılır, numara belirir (yalnız birleştirici özellikleri)
      const dur = Math.max(380, Math.min(1500, text.length * 26));
      el.querySelector(".vboard__t").animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: dur, easing: "cubic-bezier(.3,.7,.2,1)" });
      el.querySelector(".vboard__n").animate([{ transform: "scale(.4)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], { duration: 260, easing: "cubic-bezier(.2,.9,.3,1.3)" });
    }
    function paint() {
      let active = -1;
      items.forEach((it, i) => {
        const show = all || it.start <= reached;
        if (show && it.el.hidden) write(it.el, it.text);
        if (show && it.start <= reached) active = i;
      });
      if (all) active = -1;
      if (active !== now) {
        items.forEach((it, i) => { it.el.classList.toggle("is-now", i === active); it.el.classList.toggle("is-done", active >= 0 && i < active); });
        if (active >= 0) {
          // okunan adım görünür kalsın: yalnız ekranın altında kaldıysa kaydırılır
          const box = host.closest(".voice-body") || host, r = items[active].el.getBoundingClientRect(), v = box.getBoundingClientRect();
          if (r.bottom > v.bottom) box.scrollTop += r.bottom - v.bottom + 24;
        }
        now = active;
      }
      list.classList.toggle("is-live", active >= 0);
      list.classList.toggle("is-empty", !items.some((it) => !it.el.hidden));
    }
    const api = {
      /** Cevap metni değişti: yeni adımlar gizli eklenir, değişen adımın içeriği güncellenir */
      update(md) {
        const next = steps(md);
        // Yapı değiştiyse (ör. tek paragraf satırlara bölündü) tahta yeniden kurulur; yazılmış adımlar görünür kalır
        if (next.length < items.length || next.some((s, i) => items[i] && items[i].start !== s.start)) { list.innerHTML = ""; items = []; now = -1; }
        next.forEach((s, i) => {
          let it = items[i];
          if (!it) {
            const el = document.createElement("li");
            el.className = "vboard__step";
            el.hidden = true;
            el.innerHTML = '<span class="vboard__n" aria-hidden="true">' + (s.n != null ? s.n : i + 1) + '</span><div class="vboard__t md"></div>';
            list.appendChild(el);
            it = items[i] = { el, text: "", start: s.start };
          }
          if (it.text !== s.text) {
            it.text = s.text;
            it.el.querySelector(".vboard__t").innerHTML = render(s.text);
          }
          it.end = s.end;
        });
        paint();
      },
      /** Okuma, cevap metninin pos konumuna geldi */
      reach(pos) { if (Number(pos) > reached) { reached = Number(pos); paint(); } },
      /** Her şeyi göster, vurguyu kaldır (okuma bitti, durduruldu ya da ses yok) */
      finish() { all = true; paint(); },
      reset() { list.innerHTML = ""; items = []; reached = -1; all = false; now = -1; paint(); },
      state: () => ({ steps: items.length, shown: items.filter((it) => !it.el.hidden).length, now, all })
    };
    return api;
  }

  App.voiceBoard = { steps, create };
})();
