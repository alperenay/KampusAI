/* =========================================================
   paragraf.js — Paragraf Hız Antrenmanı (TYT Türkçe)   (#/paragraf)

   İki mod:
     • Okuma hızı testi: paragraf okunur → "Bitirdim" → metin gizlenir,
       anlama sorusu sorulur. Kelime/dakika (k/dk) ve anlama kaydedilir.
     • Süreli antrenman: 5 / 10 / 20 soruluk set; her soru için süre
       tutulur, hedef süreye (varsayılan 60 sn) göre renklenir.
   İstatistik: k/dk eğilimi, soru başına ortalama süre, soru türüne
   göre doğruluk ve süre, kişisel öneriler.
   İsteğe bağlı: yapay zekâyla yeni paragraf seti.
   Kayıtlar cihazda tercih olarak tutulur ("paraLog"; yedeğe dahildir).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const P = () => App.data.paragraphs || [];
  const LETTERS = "ABCDE";
  const MAX_LOG = 400;

  const TYPES = {
    ana:      { tr: "Ana düşünce",           en: "Main idea",
                tipTr: "Önce paragrafın son cümlesine bak; yazar çoğu zaman görüşünü sonda toplar. Paragrafın tamamını kapsamayan, tek bir ayrıntıya odaklanan şıkları ele.",
                tipEn: "Check the last sentence first; authors often sum up there. Eliminate options that cover only one detail." },
    yardimci: { tr: "Yardımcı düşünce",      en: "Supporting idea",
                tipTr: "Şıkları tek tek paragrafta ara ve bulduğunu işaretle; bu soru türü hızdan çok sistemli taramayla çözülür.",
                tipEn: "Search each option in the passage and tick it off; method beats speed here." },
    baslik:   { tr: "Başlık",                en: "Title",
                tipTr: "Başlık ana düşünceyi kapsamalı ama ondan geniş olmamalı. Çok genel ya da tek ayrıntıya ait başlıkları ele.",
                tipEn: "A title must cover the main idea without being broader than it." },
    cikarim:  { tr: "Çıkarım",               en: "Inference",
                tipTr: "Paragrafta yazmayanı değil, yazanın kesin sonucunu ara. \"Bütün, her zaman, hiç\" gibi kesin ifadeli şıklar genellikle tuzaktır.",
                tipEn: "Look for what must follow from the text. Options with \"all / always / never\" are usually traps." },
    bosluk:   { tr: "Boşluk doldurma",       en: "Fill the gap",
                tipTr: "Boşluktan önceki ve sonraki cümleyi oku; bağlaç (ancak, kısacası, bu yüzden) ipucudur. Boşluk sondaysa sonuç/özet cümlesi ara.",
                tipEn: "Read the sentences right before and after the gap; connectors are the clue." },
    akis:     { tr: "Akışı bozan cümle",     en: "Out-of-place sentence",
                tipTr: "Paragrafın konusunu ilk iki cümleden belirle; konuya yakın görünüp başka bir konuya (başka bir canlıya, başka bir döneme) kayan cümleyi bul.",
                tipEn: "Fix the topic from the first two sentences, then find the one that drifts to another subject." },
    yontem:   { tr: "Düşünceyi geliştirme",  en: "Development method",
                tipTr: "Sayı → sayısal veri, alıntı/ünlü kişi → tanık gösterme, \"gibi\" → benzetme, \"örneğin\" → örneklendirme. İşaret sözcüklerini ara.",
                tipEn: "Numbers → statistics, quote → testimony, \"like\" → analogy. Look for signal words." },
    anlatim:  { tr: "Anlatım biçimi",        en: "Narrative mode",
                tipTr: "Olay ve zaman akışı varsa öyküleme, görüntü/renk/ses varsa betimleme, bilgi aktarılıyorsa açıklama düşün.",
                tipEn: "Events in time → narration; sights and sounds → description; information → exposition." }
  };
  const typeName = (k) => (TYPES[k] ? T(TYPES[k].tr, TYPES[k].en) : k);

  /* ---------------- Kayıt ---------------- */
  const log = () => { const l = App.prefs.get("paraLog", null); return l && Array.isArray(l.qs) ? l : { reads: [], qs: [] }; };
  function saveLog(l) {
    if (l.reads.length > MAX_LOG) l.reads = l.reads.slice(-MAX_LOG);
    if (l.qs.length > MAX_LOG) l.qs = l.qs.slice(-MAX_LOG);
    App.prefs.set("paraLog", l);
  }
  const target = () => Math.max(20, Math.min(180, +App.prefs.get("paraTarget", 60) || 60));
  const words = (s) => String(s).replace(/\(\s*[IVX]+\s*\)/g, " ").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  const fmtSec = (s) => { s = Math.round(s); return s < 60 ? s + T(" sn", " s") : Math.floor(s / 60) + T(" dk ", " min ") + (s % 60) + T(" sn", " s"); };
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /** En az / en eski görülenlerden başlayarak n paragraf seç */
  function pickSet(n, type) {
    const seen = {}; log().qs.forEach((q, i) => { seen[q.id] = i + 1; });
    let pool = P().filter((p) => !type || p.t === type);
    pool = shuffle(pool).sort((a, b) => (seen[a.id] || 0) - (seen[b.id] || 0));
    return pool.slice(0, n);
  }

  function stats() {
    const l = log();
    const reads = l.reads.slice(-10);
    const qs = l.qs;
    const byType = {};
    qs.forEach((q) => { const b = byType[q.t] || (byType[q.t] = { n: 0, ok: 0, sec: 0 }); b.n++; if (q.ok) b.ok++; b.sec += q.sec; });
    return {
      wpm: reads.length ? Math.round(avg(reads.map((r) => r.wpm))) : 0,
      comp: reads.length ? Math.round(100 * reads.filter((r) => r.ok).length / reads.length) : 0,
      secQ: qs.length ? avg(qs.slice(-30).map((q) => q.sec)) : 0,
      acc: qs.length ? Math.round(100 * qs.filter((q) => q.ok).length / qs.length) : 0,
      n: qs.length, nr: l.reads.length, byType, reads: l.reads, qs
    };
  }

  function wpmBand(w) {
    if (w < 130) return { c: "low", s: T("Yavaş — günde 1–2 hız testiyle düzenli pratik yap.", "Slow — practise one or two speed tests a day.") };
    if (w < 200) return { c: "mid", s: T("Orta — anlamayı koruyarak hızı biraz artırmayı dene.", "Average — try pushing speed while keeping comprehension.") };
    return { c: "high", s: T("İyi — anlama oranını yüksek tutmaya odaklan.", "Good — focus on keeping comprehension high.") };
  }

  /* ---------------- Ana sayfa ---------------- */
  function render(view, params) {
    if (params && params[0] === "hiz") return speedTest(view);
    if (params && params[0] === "set") return practice(view, null, +params[1] || 10, params[2] || "");
    if (params && params[0] === "yz") return aiSet(view);
    home(view);
  }

  function spark(reads) {
    const pts = reads.slice(-20);
    if (pts.length < 2) return '<p class="hint">' + esc(T("Eğilim grafiği için en az 2 hız testi gerekli.", "At least 2 speed tests are needed for the trend.")) + "</p>";
    const W = 320, H = 90, max = Math.max(250, ...pts.map((r) => r.wpm)) * 1.1;
    const x = (i) => 8 + (i * (W - 16)) / (pts.length - 1), y = (v) => H - 10 - (v / max) * (H - 20);
    const line = pts.map((r, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(r.wpm).toFixed(1)).join(" ");
    const dots = pts.map((r, i) => '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(r.wpm).toFixed(1) + '" r="3.2" class="' + (r.ok ? "ok" : "bad") + '"><title>' + r.wpm + T(" k/dk", " wpm") + "</title></circle>").join("");
    return '<svg class="para-spark" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(T("Okuma hızı eğilimi", "Reading speed trend")) + '">' +
      '<line x1="0" x2="' + W + '" y1="' + y(200).toFixed(1) + '" y2="' + y(200).toFixed(1) + '" class="ref"/><text x="' + (W - 4) + '" y="' + (y(200) - 4).toFixed(1) + '" text-anchor="end">200</text>' +
      '<path d="' + line + '"/>' + dots + "</svg>" +
      '<p class="hint">' + esc(T("Yeşil nokta: soruyu doğru yanıtladığın testler. Kesikli çizgi: 200 k/dk.", "Green: tests answered correctly. Dashed line: 200 wpm.")) + "</p>";
  }

  function home(view) {
    App.setTitle(T("Paragraf Antrenmanı", "Paragraph Training"));
    const s = stats();
    const tg = target();
    const band = s.wpm ? wpmBand(s.wpm) : null;
    const typeRows = Object.keys(TYPES).map((k) => {
      const b = s.byType[k];
      const pc = b ? Math.round(100 * b.ok / b.n) : null;
      return '<div class="para-type"><div class="para-type__head"><span>' + esc(typeName(k)) + '</span><span class="para-type__val">' +
        (b ? pc + "% · " + fmtSec(b.sec / b.n) : "—") + '</span></div><div class="para-bar"><i style="width:' + (pc || 0) + '%" class="' + (pc == null ? "" : pc >= 75 ? "ok" : pc >= 50 ? "mid" : "bad") + '"></i></div>' +
        '<a class="para-type__go" href="#/paragraf/set/5/' + k + '">' + esc(T("Bu türden 5 soru", "5 of this type")) + "</a></div>";
    }).join("");

    // en zayıf tür(ler) için öneri
    const weak = Object.keys(s.byType).filter((k) => TYPES[k] && s.byType[k].n >= 2)
      .map((k) => ({ k, sc: s.byType[k].ok / s.byType[k].n - Math.max(0, s.byType[k].sec / s.byType[k].n - tg) / 120 }))
      .sort((a, b) => a.sc - b.sc).slice(0, 2);
    const tips = [];
    if (!s.n && !s.nr) tips.push(T("Önce bir okuma hızı testi yap; sonra 10 soruluk süreli setle soru başına süreni ölç.", "Start with a speed test, then time yourself on a 10-question set."));
    if (s.secQ && s.secQ > tg) tips.push(T("Soru başına ortalaman hedefin (" + tg + " sn) üstünde. Önce soru kökünü oku, sonra paragrafa geç; ne aradığını bilerek okumak zaman kazandırır.", "Your average per question is above the target (" + tg + " s). Read the question stem first, then the passage."));
    if (s.nr >= 3 && s.comp < 60) tips.push(T("Anlama oranın düşük: hızını biraz azalt. TYT'de hızlı ama yanlış okumak, yavaş okumaktan daha pahalıdır.", "Comprehension is low: slow down a little. Fast but wrong costs more than slow."));
    weak.forEach((w) => tips.push("<b>" + esc(typeName(w.k)) + ":</b> " + esc(T(TYPES[w.k].tipTr, TYPES[w.k].tipEn))));
    tips.push(T("Gözünü satırda geri götürmemeye çalış (geri dönüş). Kalem ya da parmakla satırı takip etmek ilk haftalarda yardımcı olur.", "Avoid regressions; tracking the line with a pen helps at first."));

    view.innerHTML = '<div class="page page--narrow para">' +
      '<div class="page-head"><div><h1>' + esc(T("Paragraf Hız Antrenmanı", "Paragraph Speed Training")) + "</h1><p>" +
        esc(T("TYT Türkçe'de en çok zaman yiyen bölüm paragraf. Okuma hızını ölç, soru başına süreni takip et, zayıf soru türlerini çalış.", "Paragraph questions eat the most time in TYT Turkish. Measure reading speed, track time per question, drill weak types.")) + "</p></div></div>" +

      '<div class="para-stats">' +
        stat(s.wpm ? s.wpm : "—", T("k/dk (son 10 test)", "wpm (last 10)"), band ? band.c : "") +
        stat(s.nr ? s.comp + "%" : "—", T("anlama", "comprehension")) +
        stat(s.n ? fmtSec(s.secQ) : "—", T("soru başına (son 30)", "per question (last 30)"), s.n ? (s.secQ <= tg ? "high" : s.secQ <= tg * 1.4 ? "mid" : "low") : "") +
        stat(s.n ? s.acc + "%" : "—", T("doğruluk · ", "accuracy · ") + s.n + T(" soru", " q")) +
      "</div>" +
      (band ? '<p class="para-band para-band--' + band.c + '">' + esc(band.s) + "</p>" : "") +

      '<div class="para-modes">' +
        '<a class="card para-mode" href="#/paragraf/hiz"><span class="subj-ico">' + App.icon("timer") + "</span><div><h3>" + esc(T("Okuma hızı testi", "Reading speed test")) + "</h3><p>" +
          esc(T("Paragrafı oku, \"Bitirdim\"e bas. Metin gizlenir ve bir anlama sorusu gelir. Kelime/dakika ve anlama ölçülür.", "Read, press \"Done\"; the text hides and a question appears. Measures wpm and comprehension.")) + "</p></div></a>" +
        '<div class="card para-mode"><span class="subj-ico">' + App.icon("clock") + "</span><div><h3>" + esc(T("Süreli antrenman", "Timed practice")) + "</h3><p>" +
          esc(T("Paragraf ve soru birlikte. Her soru için süren tutulur; hedef süreyi geçince sayaç kırmızıya döner.", "Passage and question together; each question is timed against your target.")) + "</p>" +
          '<div class="para-mode__btns"><a class="btn btn--primary btn--sm" href="#/paragraf/set/5">5 ' + esc(T("soru", "q")) + '</a><a class="btn btn--sm" href="#/paragraf/set/10">10 ' + esc(T("soru", "q")) + '</a><a class="btn btn--sm" href="#/paragraf/set/20">20 ' + esc(T("soru", "q")) + "</a></div></div></div>" +
        '<a class="card para-mode" href="#/paragraf/yz"><span class="subj-ico">' + App.icon("sparkle") + "</span><div><h3>" + esc(T("Yapay zekâyla yeni set", "New set with AI")) + "</h3><p>" +
          esc(T("Hazır paragrafları bitirdiysen yapay zekâ 5 yeni TYT tarzı paragraf ve soru üretir (internet gerekir).", "When you've done the built-in set, AI writes 5 new TYT-style passages (needs internet).")) + "</p></div></a>" +
      "</div>" +

      '<div class="card para-set"><label for="paraTarget"><b>' + esc(T("Soru başına hedef süre", "Target time per question")) + '</b></label>' +
        '<select id="paraTarget">' + [45, 60, 75, 90, 120].map((v) => '<option value="' + v + '"' + (v === tg ? " selected" : "") + ">" + v + T(" sn", " s") + "</option>").join("") + "</select>" +
        '<span class="hint">' + esc(T("TYT'de 40 Türkçe sorusuna yaklaşık 40–45 dakika ayrıldığı düşünülürse paragraf için soru başına ~1 dakika iyi bir hedeftir.", "With ~40–45 min for 40 Turkish questions, ~1 min per passage is a good target.")) + "</span></div>" +

      '<div class="para-grid"><section class="card"><h2>' + esc(T("Okuma hızı eğilimi", "Reading speed trend")) + "</h2>" + spark(s.reads) + "</section>" +
        '<section class="card"><h2>' + esc(T("Öneriler", "Tips")) + '</h2><ul class="para-tips">' + tips.slice(0, 4).map((x) => "<li>" + (x.indexOf("<b>") === 0 ? x : esc(x)) + "</li>").join("") + "</ul></section></div>" +

      '<section class="card"><h2>' + esc(T("Soru türlerine göre", "By question type")) + '</h2><div class="para-types">' + typeRows + "</div></section>" +

      ((s.n || s.nr) ? '<p class="para-foot"><button class="btn btn--ghost btn--sm" type="button" id="paraReset">' + esc(T("İstatistikleri sıfırla", "Reset statistics")) + "</button></p>" : "") +
      "</div>";
    App.hydrateIcons(view);
    view.querySelector("#paraTarget").addEventListener("change", (e) => { App.prefs.set("paraTarget", +e.target.value); home(view); });
    const rs = view.querySelector("#paraReset");
    if (rs) rs.addEventListener("click", async () => {
      if (await App.ui.confirm(T("Tüm paragraf istatistikleri silinsin mi?", "Delete all paragraph statistics?"), T("Sil", "Delete"), true)) { App.prefs.set("paraLog", { reads: [], qs: [] }); home(view); }
    });
  }
  const stat = (v, l, c) => '<div class="card para-stat' + (c ? " para-stat--" + c : "") + '"><b>' + esc(String(v)) + "</b><span>" + esc(l) + "</span></div>";

  const crumbs = (label) => '<nav class="crumbs"><a href="#/paragraf">' + App.icon("chevronL") + esc(T("Paragraf Antrenmanı", "Paragraph Training")) + "</a>" + (label ? "<span aria-hidden=\"true\">›</span><span>" + esc(label) + "</span>" : "") + "</nav>";

  function optionsHtml(p) {
    return '<div class="para-opts" role="group">' + p.o.map((o, i) =>
      '<button type="button" class="para-opt" data-i="' + i + '"><span class="para-opt__l">' + LETTERS[i] + "</span><span>" + esc(o) + "</span></button>").join("") + "</div>";
  }
  function markOptions(box, p, chosen) {
    box.querySelectorAll(".para-opt").forEach((b) => {
      const i = +b.dataset.i; b.disabled = true;
      if (i === p.a) b.classList.add("is-right");
      else if (i === chosen) b.classList.add("is-wrong");
    });
  }
  const passageHtml = (p) => '<div class="para-text" id="paraText">' + esc(p.text).replace(/\((I{1,3}|IV|V)\)/g, '<b class="para-num">($1)</b>') + "</div>";

  /* ---------------- Okuma hızı testi ---------------- */
  function speedTest(view) {
    App.setTitle(T("Okuma hızı testi", "Reading speed test"));
    // akış / anlatım sorularında metin gerekli; hız testi için ana, çıkarım, başlık, yardımcı uygun
    const okT = ["ana", "cikarim", "baslik", "yardimci", "bosluk"];
    const p = pickSet(P().length, null).filter((x) => okT.indexOf(x.t) >= 0)[0] || P()[0];
    const n = words(p.text);
    let t0 = 0, sec = 0, tick = null;
    view.innerHTML = '<div class="page page--narrow para">' + crumbs(T("Okuma hızı testi", "Reading speed test")) +
      '<div class="card para-run"><div class="para-run__bar"><span class="para-chip">' + n + T(" kelime", " words") + '</span><span class="para-timer" id="pTimer">0 sn</span></div>' +
      '<div class="para-veil" id="pVeil">' + passageHtml(p) + '<div class="para-veil__cover"><p>' + esc(T("Hazır olunca başla. Normal hızında, anlayarak oku; bitirince metin gizlenecek ve bir soru sorulacak.", "Start when ready. Read at your normal pace; the text hides when you finish and a question appears.")) +
        '</p><button class="btn btn--primary" type="button" id="pStart">' + esc(T("Okumaya başla", "Start reading")) + "</button></div></div>" +
      '<div class="para-run__act"><button class="btn btn--primary" type="button" id="pDone" hidden>' + esc(T("Bitirdim", "Done")) + "</button></div>" +
      '<div id="pQ"></div></div></div>';
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    const alive = () => $("#pTimer") && $("#pTimer").isConnected;
    $("#pStart").addEventListener("click", () => {
      $("#pVeil").classList.add("is-open"); $("#pDone").hidden = false; $("#pDone").focus();
      t0 = performance.now();
      tick = setInterval(() => { if (!alive()) return clearInterval(tick); $("#pTimer").textContent = fmtSec((performance.now() - t0) / 1000); }, 250);
    });
    $("#pDone").addEventListener("click", () => {
      clearInterval(tick);
      sec = Math.max(1, (performance.now() - t0) / 1000);
      const wpm = Math.round(n / (sec / 60));
      $("#pDone").hidden = true;
      $("#pVeil").classList.remove("is-open"); $("#pVeil").classList.add("is-hidden");
      $("#pTimer").textContent = fmtSec(sec);
      const q = $("#pQ");
      q.innerHTML = '<p class="para-q">' + esc(p.q) + "</p>" + optionsHtml(p);
      q.querySelectorAll(".para-opt").forEach((b) => b.addEventListener("click", () => {
        const ch = +b.dataset.i, ok = ch === p.a;
        markOptions(q, p, ch);
        const l = log(); l.reads.push({ d: Date.now(), id: p.id, wpm, sec: Math.round(sec), ok }); saveLog(l);
        const band = wpmBand(wpm);
        q.insertAdjacentHTML("beforeend", '<div class="para-result"><div class="para-result__big para-stat--' + band.c + '"><b>' + wpm + "</b><span>" + esc(T("kelime/dakika", "words/min")) + "</span></div><div><p><b>" +
          esc(ok ? T("Doğru — anlayarak okudun.", "Correct — you understood it.") : T("Yanlış — hız, anlamanın önüne geçmiş olabilir.", "Wrong — speed may have hurt comprehension.")) + "</b></p><p>" + esc(band.s) + '</p><p class="hint">' +
          esc(T("Türkçe sondan eklemeli bir dil olduğundan sözcükler uzundur; k/dk değerleri İngilizce için verilen ortalamalardan (~240) düşük çıkabilir. Kendi eğilimini izlemek daha anlamlıdır.", "Turkish words are long (agglutinative), so wpm may be lower than English averages (~240). Track your own trend.")) + "</p>" +
          '<div class="para-mode__btns"><button class="btn btn--primary" type="button" id="pAgain">' + esc(T("Yeni test", "New test")) + '</button><button class="btn" type="button" id="pShow">' + esc(T("Metni göster", "Show text")) + '</button><a class="btn btn--ghost" href="#/paragraf">' + esc(T("Özete dön", "Back to summary")) + "</a></div></div></div>");
        $("#pAgain").addEventListener("click", () => speedTest(view));
        $("#pShow").addEventListener("click", (e) => { $("#pVeil").classList.remove("is-hidden"); $("#pVeil").classList.add("is-open"); e.target.remove(); });
      }));
    });
  }

  /* ---------------- Süreli antrenman ---------------- */
  function practice(view, items, count, type) {
    const set = items || pickSet(count, type || null);
    if (!set.length) { home(view); return; }
    App.setTitle(T("Süreli antrenman", "Timed practice"));
    const tg = target();
    const res = [];
    let idx = 0, t0 = 0, tick = null, answered = false;
    const label = type ? typeName(type) : T("Süreli antrenman", "Timed practice");

    function show() {
      const p = set[idx]; answered = false;
      view.innerHTML = '<div class="page page--narrow para">' + crumbs(label) +
        '<div class="card para-run"><div class="para-run__bar"><span class="para-chip">' + (idx + 1) + " / " + set.length + '</span><span class="para-chip para-chip--soft">' + esc(typeName(p.t)) +
          '</span><span class="para-timer" id="pTimer">0 sn</span></div>' +
        '<div class="para-clock" aria-hidden="true"><i id="pClock"></i></div>' +
        passageHtml(p) + '<p class="para-q">' + esc(p.q) + "</p>" + optionsHtml(p) +
        '<div class="para-run__act" id="pAct"></div></div></div>';
      App.hydrateIcons(view);
      const $ = (s) => view.querySelector(s);
      t0 = performance.now();
      clearInterval(tick);
      tick = setInterval(() => {
        const tm = $("#pTimer"); if (!tm || !tm.isConnected) return clearInterval(tick);
        if (answered) return;
        const s = (performance.now() - t0) / 1000;
        tm.textContent = fmtSec(s);
        tm.className = "para-timer" + (s > tg ? " is-over" : s > tg * 0.75 ? " is-warn" : "");
        const c = $("#pClock"); c.style.width = Math.min(100, (100 * s) / tg) + "%"; c.className = s > tg ? "is-over" : s > tg * 0.75 ? "is-warn" : "";
      }, 200);
      view.querySelectorAll(".para-opt").forEach((b) => b.addEventListener("click", () => {
        if (answered) return; answered = true;
        const sec = (performance.now() - t0) / 1000, ch = +b.dataset.i, ok = ch === p.a;
        markOptions(view, p, ch);
        res.push({ p, sec, ok, ch });
        if (!p.ai) { const l = log(); l.qs.push({ d: Date.now(), id: p.id, t: p.t, sec: Math.round(sec * 10) / 10, ok }); saveLog(l); }
        else { const l = log(); l.qs.push({ d: Date.now(), id: "ai", t: p.t, sec: Math.round(sec * 10) / 10, ok }); saveLog(l); }
        const tm = $("#pTimer"); tm.textContent = fmtSec(sec);
        const last = idx === set.length - 1;
        $("#pAct").innerHTML = '<p class="para-fb ' + (ok ? "ok" : "bad") + '">' + esc(ok ? T("Doğru", "Correct") : T("Yanlış — doğru yanıt ", "Wrong — answer ") + LETTERS[p.a]) + " · " + esc(fmtSec(sec)) +
          (sec > tg ? ' <span class="hint">(' + esc(T("hedefin " + Math.round(sec - tg) + " sn üstünde", Math.round(sec - tg) + " s over target")) + ")</span>" : "") + "</p>" +
          (!ok && TYPES[p.t] ? '<p class="hint para-tip">' + esc(T(TYPES[p.t].tipTr, TYPES[p.t].tipEn)) + "</p>" : "") +
          '<button class="btn btn--primary" type="button" id="pNext">' + esc(last ? T("Sonuçları gör", "See results") : T("Sonraki", "Next")) + "</button>";
        $("#pNext").focus();
        $("#pNext").addEventListener("click", () => { if (last) summary(); else { idx++; show(); window.scrollTo(0, 0); } });
      }));
    }

    function summary() {
      clearInterval(tick);
      const tot = res.reduce((a, r) => a + r.sec, 0), ok = res.filter((r) => r.ok).length, av = tot / res.length;
      const over = res.filter((r) => r.sec > tg).length;
      view.innerHTML = '<div class="page page--narrow para">' + crumbs(label) +
        '<div class="card para-sum"><h2>' + esc(T("Set tamamlandı", "Set complete")) + '</h2><div class="para-stats">' +
          stat(ok + " / " + res.length, T("doğru", "correct"), ok / res.length >= 0.75 ? "high" : ok / res.length >= 0.5 ? "mid" : "low") +
          stat(fmtSec(av), T("soru başına", "per question"), av <= tg ? "high" : av <= tg * 1.4 ? "mid" : "low") +
          stat(fmtSec(tot), T("toplam süre", "total time")) +
          stat(over, T("hedefi aşan soru", "over target")) + "</div>" +
        '<table class="para-table"><thead><tr><th>#</th><th>' + esc(T("Tür", "Type")) + "</th><th>" + esc(T("Süre", "Time")) + "</th><th>" + esc(T("Sonuç", "Result")) + "</th></tr></thead><tbody>" +
          res.map((r, i) => "<tr><td>" + (i + 1) + "</td><td>" + esc(typeName(r.p.t)) + '</td><td class="' + (r.sec > tg ? "bad" : "") + '">' + esc(fmtSec(r.sec)) + '</td><td class="' + (r.ok ? "ok" : "bad") + '">' + (r.ok ? "✓" : "✗ " + LETTERS[r.ch] + " → " + LETTERS[r.p.a]) + "</td></tr>").join("") +
        "</tbody></table>" +
        '<div class="para-mode__btns"><button class="btn btn--primary" type="button" id="pRe">' + esc(T("Yeni set", "New set")) + '</button><a class="btn btn--ghost" href="#/paragraf">' + esc(T("Özete dön", "Back to summary")) + "</a></div></div></div>";
      view.querySelector("#pRe").addEventListener("click", () => { if (items) aiSet(view); else practice(view, null, set.length, type); });
    }
    show();
  }

  /* ---------------- Yapay zekâ ile set ---------------- */
  function normalizeAI(data) {
    const arr = Array.isArray(data) ? data : data && (data.items || data.paragraphs || data.paragraflar || data.questions) || [];
    return arr.map((x, i) => {
      if (!x || typeof x.text !== "string" || !Array.isArray(x.o || x.options)) return null;
      const o = (x.o || x.options).map((s) => String(s).replace(/^\s*[A-E][).]\s*/, "")).slice(0, 5);
      let a = typeof x.a === "number" ? x.a : typeof x.answer === "number" ? x.answer : LETTERS.indexOf(String(x.a || x.answer || "").trim().toUpperCase()[0]);
      if (o.length !== 5 || !(a >= 0 && a < 5) || x.text.length < 120) return null;
      const t = TYPES[x.t || x.type] ? (x.t || x.type) : "ana";
      return { id: "ai" + i, ai: true, t, text: x.text.trim(), q: String(x.q || x.question || T("Bu parçada asıl anlatılmak istenen aşağıdakilerden hangisidir?", "What is the main idea?")), o, a };
    }).filter(Boolean);
  }

  async function aiSet(view) {
    App.setTitle(T("Yapay zekâyla yeni set", "New set with AI"));
    view.innerHTML = '<div class="page page--narrow para">' + crumbs(T("Yapay zekâ seti", "AI set")) +
      '<div class="card quiz-loading"><div class="stage"><span class="spinner"></span>' + App.icon("sparkle") + "<span>" + esc(T("Paragraflar yazılıyor…", "Writing passages…")) + '</span><span class="stage__time" id="pT"></span></div>' +
      '<p class="hint">' + esc(T("Bu işlem 10–40 saniye sürebilir.", "This can take 10–40 seconds.")) + "</p></div></div>";
    App.hydrateIcons(view);
    const myHash = location.hash, gone = () => location.hash !== myHash;
    const st = Date.now(), tk = setInterval(() => { const e = view.querySelector("#pT"); if (!e || gone()) return clearInterval(tk); e.textContent = Math.round((Date.now() - st) / 1000) + T(" sn", " s"); }, 1000);
    const types = Object.keys(TYPES).filter((k) => k !== "akis");
    const pickT = shuffle(types).slice(0, 5);
    const system = "Sen ÖSYM TYT Türkçe sınavı için özgün paragraf soruları yazan deneyimli bir Türkçe öğretmenisin. Yalnızca geçerli JSON döndür.";
    const prompt = "TYT tarzında 5 özgün paragraf sorusu yaz. Konular çeşitli olsun (bilim, sanat, doğa, toplum, edebiyat). " +
      "Her paragraf 70–120 kelime, akıcı ve dil bilgisi açısından kusursuz Türkçe olsun; gerçek kitaplardan alıntı yapma. " +
      "Soru türleri sırasıyla: " + pickT.map((k) => TYPES[k].tr).join(", ") + ". " +
      "Boşluk doldurma sorusunda paragraftaki boşluğu ---- ile göster. Her sorunun 5 şıkkı olsun, yalnızca biri kesin doğru, çeldiriciler makul olsun. " +
      'Biçim: {"items":[{"t":"' + pickT[0] + '","text":"paragraf","q":"soru kökü","o":["A","B","C","D","E"],"a":0}]} — "t" değeri şunlardan biri: ' + types.join(", ") + '; "a" doğru şıkkın 0 tabanlı sırası; şıklarda harf yazma.';
    try {
      const r = await App.ai.generate({ system, prompt, temperature: 0.85 });
      clearInterval(tk);
      if (gone()) return;
      const items = normalizeAI(r.data);
      if (!items.length) throw new Error(T("Yanıt beklenen biçimde değildi.", "The response was not in the expected format."));
      practice(view, items, items.length, "");
    } catch (e) {
      clearInterval(tk);
      if (gone()) return;
      const msg = App.quiz && App.quiz.errorText ? App.quiz.errorText(e) : String(e && e.message || e);
      view.innerHTML = '<div class="page page--narrow para">' + crumbs(T("Yapay zekâ seti", "AI set")) +
        '<div class="card"><div class="msg__error"><b>' + esc(T("Set oluşturulamadı", "Could not create the set")) + "</b><p>" + esc(msg) + "</p></div>" +
        '<div class="para-mode__btns"><button class="btn btn--primary" type="button" id="pRetry">' + esc(T("Tekrar dene", "Try again")) + '</button><a class="btn" href="#/paragraf/set/10">' + esc(T("Hazır paragraflarla çalış", "Use built-in passages")) + "</a></div></div></div>";
      view.querySelector("#pRetry").addEventListener("click", () => aiSet(view));
    }
  }

  App.router.register("paragraf", render);
  App.paragraf = { stats, words, normalizeAI, TYPES };
})();
