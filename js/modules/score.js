/* =========================================================
   score.js — Puan Hesaplama ve Hedef Bölüm   (#/puan)

   • Netler Deneme Takibi'nden gelir (son N denemenin ortalaması); öğrenci isterse
     her neti değiştirip "ya şöyle olsaydı" diye deneyebilir (kaydedilmez).
   • Tahmini puanlar: TYT, SAY, EA, SÖZ (ham) ve OBP katkısıyla yerleştirme puanı.
   • Hedef bölüm: adı, puan türü ve taban puanı (YÖK Atlas'tan) → fark ve öneriler:
       "Matematik'te 5 net daha artarsa hedefe ulaşırsın", ya da birkaç derse yayılmış plan.
   Kayıt: IndexedDB "meta" deposu, id = "scoreTarget"  { name, type, base, obp, prevPlaced, last }

   Katsayılar YAKLAŞIKTIR: ÖSYM puanı standart puanla (sınava girenlerin ortalaması ve
   sapmasıyla) hesaplar; aşağıdaki ham katsayılar son yıllarda yaygın kullanılan ortalama
   değerlerdir (2024–2025). Sonuç ±10 puan sapabilir; sayfada açıkça yazılır.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const L = App.L;
  const CFG = App.data.exams;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const fmt = (x, d) => (x == null || isNaN(x) ? "–" : Number(x).toLocaleString(App.i18n.locale, { minimumFractionDigits: d || 0, maximumFractionDigits: d == null ? 2 : d }));

  /* ---------------- Katsayılar (yaklaşık) ---------------- */
  const TYT_ONLY = { base: 100, tyt: { turkce: 3.3, sosyal: 3.4, matematik: 3.3, fen: 3.4 }, ayt: {} };
  const TYT_IN = { turkce: 1.32, sosyal: 1.36, matematik: 1.32, fen: 1.36 };     // SAY/EA/SÖZ içinde TYT payı (%40)
  const TYPES = {
    TYT: TYT_ONLY,
    SAY: { base: 100, tyt: TYT_IN, ayt: { matematik: 3, fizik: 2.85, kimya: 3.07, biyoloji: 3.07 } },
    EA:  { base: 100, tyt: TYT_IN, ayt: { matematik: 3, edebiyat: 3, tarih1: 2.8, cografya1: 3.33 } },
    SOZ: { base: 100, tyt: TYT_IN, ayt: { edebiyat: 3, tarih1: 2.8, cografya1: 3.33, tarih2: 2.91, cografya2: 2.91, felsefe: 3, din: 3.33 } }
  };
  const typeName = (k) => ({ TYT: "TYT", SAY: T("Sayısal (SAY)", "Science (SAY)"), EA: T("Eşit Ağırlık (EA)", "Equal Weight (EA)"), SOZ: T("Sözel (SÖZ)", "Verbal (SÖZ)") })[k];
  const OBP_K = 0.12, OBP_K_PREV = 0.06;

  const subjects = (ex) => CFG.types[ex].subjects;
  const subj = (ex, id) => subjects(ex).find((s) => s.id === id);

  /** nets: { TYT: {id: net}, AYT: {id: net} } → ham puan */
  function raw(type, nets) {
    const k = TYPES[type];
    let p = k.base;
    for (const [id, c] of Object.entries(k.tyt)) p += c * (nets.TYT[id] || 0);
    for (const [id, c] of Object.entries(k.ayt)) p += c * (nets.AYT[id] || 0);
    return p;
  }
  const obpPoints = (diploma) => (diploma ? Math.max(250, Math.min(500, Number(diploma) * 5)) : 0);
  const placement = (type, nets, st) => raw(type, nets) + obpPoints(st.obp) * (st.prevPlaced ? OBP_K_PREV : OBP_K);

  /** Son n denemenin ders ortalamaları (deneme yoksa 0) */
  async function averages(n) {
    const all = await App.db.getAll("exams");
    const out = { TYT: {}, AYT: {}, count: { TYT: 0, AYT: 0 } };
    for (const ex of ["TYT", "AYT"]) {
      const list = App.exams.sortChrono(all.filter((e) => e.type === ex)).slice(-n);
      out.count[ex] = list.length;
      subjects(ex).forEach((s) => {
        const vals = list.map((e) => App.exams.compute(e).per[s.id]).filter(Boolean).map((r) => r.net);
        out[ex][s.id] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 4) / 4 : 0;
      });
    }
    return out;
  }

  /**
   * Hedefe ulaşmak için öneriler.
   *  single: tek derste kaç net artarsa yeter (sığıyorsa), az netten çoğa
   *  mix   : boşluğu en çok olan derslere, kalan soru oranında dağıtılmış plan
   */
  function suggest(type, nets, gap) {
    const k = TYPES[type];
    const items = [];
    for (const ex of ["TYT", "AYT"]) {
      for (const [id, c] of Object.entries(ex === "TYT" ? k.tyt : k.ayt)) {
        const s = subj(ex, id);
        const room = Math.max(0, s.questions - (nets[ex][id] || 0));
        if (room > 0.24) items.push({ ex, id, name: L(s.short || s.name), c, room, cur: nets[ex][id] || 0 });
      }
    }
    const q = (x) => Math.ceil(x * 4) / 4;            // 0,25 net adımları
    const single = items.map((it) => Object.assign({}, it, { need: q(gap / it.c) }))
      .filter((it) => it.need <= it.room).sort((a, b) => a.need - b.need).slice(0, 4);
    // Karma plan: puan getirisi (katsayı × boşluk) en büyük derslere orantılı
    const pool = items.slice().sort((a, b) => b.c * b.room - a.c * a.room).slice(0, 3);
    const cap = pool.reduce((a, it) => a + it.c * it.room, 0);
    let mix = null;
    if (pool.length && cap >= gap) {
      mix = pool.map((it) => Object.assign({}, it, { need: Math.min(it.room, q((gap * it.room) / cap)) })).filter((it) => it.need > 0);
    }
    const possible = items.reduce((a, it) => a + it.c * it.room, 0) >= gap;
    return { single, mix, possible };
  }

  /** Türkçe bulunma eki: Matematik'te, Kimya'da, Biyoloji'de, Edebiyat'ta, Tarih-1'de */
  function locSuffix(word) {
    const DIG = { 0: "sıfır", 1: "bir", 2: "iki", 3: "üç", 4: "dört", 5: "beş", 6: "altı", 7: "yedi", 8: "sekiz", 9: "dokuz" };
    let w = String(word).trim();
    if (/\d$/.test(w)) w = DIG[w.slice(-1)];
    const lw = w.toLocaleLowerCase("tr");
    const vowels = lw.match(/[aeıioöuü]/g) || ["e"];
    const back = /[aıou]/.test(vowels[vowels.length - 1]);
    const hard = /[fsthşçkp]$/.test(lw);
    return "'" + (hard ? "t" : "d") + (back ? "a" : "e");
  }

  /* ---------------- Kayıt ---------------- */
  const DEF = { id: "scoreTarget", name: "", type: "SAY", base: "", obp: "", prevPlaced: false, last: 3 };
  async function loadState() {
    const r = await App.db.get("meta", "scoreTarget").catch(() => null);
    return Object.assign({}, DEF, r || {});
  }
  const saveState = (st) => App.db.put("meta", Object.assign({}, st, { id: "scoreTarget", updatedAt: new Date().toISOString() }));

  /* ---------------- Sayfa ---------------- */
  async function render(view) {
    App.setTitle(T("Puan ve Hedef", "Score & Target"));
    const st = await loadState();
    let avg = await averages(st.last);
    let nets = { TYT: Object.assign({}, avg.TYT), AYT: Object.assign({}, avg.AYT) };
    const noExams = !avg.count.TYT && !avg.count.AYT;

    const netInputs = (ex) => '<div class="score-nets">' + subjects(ex).map((s) =>
      '<label class="score-net"><span>' + esc(L(s.short || s.name)) + ' <small>/' + s.questions + '</small></span>' +
      '<input class="input" type="number" inputmode="decimal" step="0.25" min="0" max="' + s.questions + '" data-ex="' + ex + '" data-id="' + s.id + '" value="' + nets[ex][s.id] + '"></label>').join("") + "</div>";

    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(T("Puan ve Hedef", "Score & Target")) + "</h1><p>" +
          esc(T("Deneme netlerinden tahmini YKS puanını hesaplar, hedef bölümünün taban puanıyla karşılaştırır ve hangi derste kaç net artırman gerektiğini söyler.",
                "Estimates your YKS score from your practice exam nets, compares it with your target program's base score and tells you how many more nets you need in which subject.")) + "</p></div></div>" +

        '<section class="card score-target">' +
          '<div class="card__title">' + App.icon("target") + esc(T("Hedef bölüm", "Target program")) + "</div>" +
          '<div class="form-row">' +
            '<label class="field" style="flex:2"><span class="field__label">' + esc(T("Bölüm ve üniversite", "Program and university")) + '</span><input class="input" id="sName" maxlength="80" placeholder="' + esc(T("Ör. Bilgisayar Mühendisliği – ODTÜ", "e.g. Computer Engineering – METU")) + '" value="' + esc(st.name) + '"></label>' +
            '<label class="field"><span class="field__label">' + esc(T("Puan türü", "Score type")) + '</span><select class="select" id="sType">' +
              Object.keys(TYPES).map((k) => '<option value="' + k + '"' + (k === st.type ? " selected" : "") + ">" + esc(typeName(k)) + "</option>").join("") + "</select></label>" +
            '<label class="field"><span class="field__label">' + esc(T("Taban puanı", "Base score")) + '</span><input class="input" id="sBase" type="number" inputmode="decimal" step="0.01" min="100" max="600" placeholder="ör. 480,25" value="' + esc(st.base) + '"></label>' +
          "</div>" +
          '<p class="hint">' + esc(T("Taban puanını YÖK Atlas'tan bulabilirsin:", "Find the base score on YÖK Atlas:")) + ' <a href="https://yokatlas.yok.gov.tr" target="_blank" rel="noopener">yokatlas.yok.gov.tr</a></p>' +
          '<div class="form-row">' +
            '<label class="field"><span class="field__label">' + esc(T("Diploma notu (OBP için, 50–100)", "Diploma grade (for OBP, 50–100)")) + '</span><input class="input" id="sObp" type="number" inputmode="decimal" step="0.01" min="50" max="100" value="' + esc(st.obp) + '"></label>' +
            '<label class="field"><span class="field__label">' + esc(T("Netler", "Nets")) + '</span><select class="select" id="sLast">' +
              [1, 3, 5].map((n) => '<option value="' + n + '"' + (n === st.last ? " selected" : "") + ">" + esc(T("Son " + n + " deneme ortalaması", "Average of last " + n + " exam" + (n > 1 ? "s" : ""))) + "</option>").join("") + "</select></label>" +
          "</div>" +
          '<label class="check-row"><input type="checkbox" id="sPrev"' + (st.prevPlaced ? " checked" : "") + "> <span>" + esc(T("Geçen yıl bir programa yerleştim (OBP katkısı yarıya iner)", "I was placed in a program last year (OBP contribution is halved)")) + "</span></label>" +
        "</section>" +

        '<section class="card" id="sResult" aria-live="polite"></section>' +

        '<section class="card">' +
          '<div class="card__title">' + App.icon("chart") + esc(T("Netler", "Nets")) + "</div>" +
          '<p class="hint">' + esc(noExams ? T("Henüz deneme yok: netleri buraya elle yazabilir ya da Deneme Takibi'nden deneme ekleyebilirsin.", "No exams yet: type nets here or add exams in Exam Tracker.")
            : T("Deneme Takibi'ndeki ortalamalarınla dolduruldu. Değiştirip \"ya şöyle olsaydı\" diye deneyebilirsin; denemelerin değişmez.", "Filled with your Exam Tracker averages. Change them to try \"what if\"; your exams aren't changed.")) +
            ' <button class="btn btn--sm btn--ghost" type="button" id="sReset">' + App.icon("refresh") + esc(T("Ortalamalara dön", "Reset to averages")) + "</button></p>" +
          '<h3 class="score-h">TYT</h3>' + netInputs("TYT") +
          '<h3 class="score-h">AYT</h3>' + netInputs("AYT") +
        "</section>" +

        '<p class="hint">' + esc(T("Puanlar tahminidir: ÖSYM puanı, o yıl sınava girenlerin ortalamasına göre (standart puan) hesaplar. Burada son yıllarda yaygın kullanılan ortalama katsayılar kullanıldı; gerçek puan ±10 puan farklı çıkabilir. Yabancı dil (DİL) puanı hesaplanmaz.",
          "Scores are estimates: ÖSYM uses standardized scores based on that year's candidates. Average coefficients from recent years are used here; the real score may differ by ±10 points. Language (DİL) score isn't calculated.")) + "</p>" +
      "</div>";

    const $ = (s) => view.querySelector(s);
    const page = view.firstElementChild;      // olaylar sayfaya bağlanır (#view her sayfada yeniden kullanılır)
    const readSt = () => ({
      name: $("#sName").value.trim(), type: $("#sType").value, base: $("#sBase").value,
      obp: $("#sObp").value, prevPlaced: $("#sPrev").checked, last: Number($("#sLast").value)
    });

    function paint() {
      const s = readSt();
      const scores = Object.keys(TYPES).map((k) => ({ k, raw: raw(k, nets), place: placement(k, nets, s) }));
      const base = parseFloat(String(s.base).replace(",", "."));
      const mine = scores.find((x) => x.k === s.type);
      let target = "";
      if (base > 0) {
        const gap = Math.round((base - mine.place) * 100) / 100;
        if (gap <= 0) {
          target = '<div class="score-verdict is-ok">' + App.icon("checkCircle") + "<div><b>" + esc(T("Hedefin üzerindesin!", "You're above your target!")) + "</b><p>" +
            esc(T("Tahmini " + typeName(s.type) + " puanın taban puanından " + fmt(-gap, 2) + " puan yüksek. Bu farkı korumak için düzenli deneme çözmeye devam et.",
                  "Your estimated " + typeName(s.type) + " score is " + fmt(-gap, 2) + " points above the base score. Keep taking practice exams to hold the lead.")) + "</p></div></div>";
        } else {
          const sg = suggest(s.type, nets, gap);
          const li = (it) => "<li>" + esc(T(it.ex + " " + it.name + locSuffix(it.name) + " " + fmt(it.need, 2) + " net daha artarsa hedefe ulaşırsın",
                                            "If " + it.name + " (" + it.ex + ") goes up by " + fmt(it.need, 2) + " nets, you reach your target")) +
            ' <small class="hint">(' + fmt(it.cur, 2) + " → " + fmt(it.cur + it.need, 2) + ")</small></li>";
          target = '<div class="score-verdict">' + App.icon("flag") + "<div><b>" +
            esc(T("Hedefe " + fmt(gap, 2) + " puan var", fmt(gap, 2) + " points to your target")) + "</b><p>" +
            esc(T((s.name ? s.name + " · " : "") + "taban " + fmt(base, 2) + ", senin tahmini puanın " + fmt(mine.place, 2) + ".",
                  (s.name ? s.name + " · " : "") + "base " + fmt(base, 2) + ", your estimate " + fmt(mine.place, 2) + ".")) + "</p></div></div>" +
            (sg.single.length ? '<h3 class="score-h">' + esc(T("Tek bir derste", "In a single subject")) + '</h3><ul class="score-tips">' + sg.single.map(li).join("") + "</ul>" : "") +
            (sg.mix && sg.mix.length > 1 ? '<h3 class="score-h">' + esc(T("Ya da birkaç derse yayarak", "Or spread across subjects")) + '</h3><p class="score-mix">' +
              esc(sg.mix.map((it) => it.ex + " " + it.name + " +" + fmt(it.need, 2) + " net").join(" · ")) + "</p>" : "") +
            (!sg.possible ? '<p class="hint">' + esc(T("Bu puan türünde kalan netlerin hepsi bile farkı kapatmaya yetmiyor; diploma notu (OBP) ya da farklı bir bölüm seçeneğini düşünebilirsin.",
                "Even all remaining nets in this score type can't close the gap; consider your diploma grade (OBP) or another program.")) + "</p>" : "") +
            (!s.obp ? '<p class="hint">' + esc(T("Diploma notunu yazarsan OBP katkısı (en fazla 60 puan) da hesaba katılır.", "Enter your diploma grade to include the OBP contribution (up to 60 points).")) + "</p>" : "");
        }
      } else {
        target = '<p class="hint">' + esc(T("Hedef bölümünün taban puanını yazarsan farkı ve hangi derste kaç net artırman gerektiğini burada görürsün.",
          "Enter your target program's base score to see the gap and how many nets you need per subject.")) + "</p>";
      }
      $("#sResult").innerHTML =
        '<div class="card__title">' + App.icon("sparkle") + esc(T("Tahmini puanların", "Your estimated scores")) + "</div>" +
        '<div class="score-grid">' + scores.map((x) =>
          '<div class="score-tile' + (x.k === s.type ? " is-target" : "") + '"><span class="score-tile__k">' + esc(typeName(x.k)) + "</span>" +
          '<span class="score-tile__v">' + fmt(x.place, 2) + "</span>" +
          '<span class="score-tile__s">' + esc(s.obp ? T("ham ", "raw ") + fmt(x.raw, 2) + " + OBP" : T("ham puan", "raw score")) + "</span></div>").join("") + "</div>" +
        target;
    }

    let saveTimer = null;
    const persist = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => saveState(readSt()).then(refreshSummary).catch(() => {}), 400); };

    page.addEventListener("input", (e) => {
      const inp = e.target.closest("[data-ex]");
      if (inp) {
        const s = subj(inp.dataset.ex, inp.dataset.id);
        let v = parseFloat(String(inp.value).replace(",", "."));
        if (isNaN(v)) v = 0;
        nets[inp.dataset.ex][inp.dataset.id] = Math.max(-s.questions / 4, Math.min(s.questions, v));
      } else persist();
      paint();
    });
    page.addEventListener("change", async (e) => {
      if (e.target.id === "sLast" || e.target.id === "sReset") return;
      if (e.target.id === "sPrev" || e.target.id === "sType") { persist(); paint(); }
    });
    const refill = async (n) => {
      avg = await averages(n);
      nets = { TYT: Object.assign({}, avg.TYT), AYT: Object.assign({}, avg.AYT) };
      view.querySelectorAll("[data-ex]").forEach((inp) => { inp.value = nets[inp.dataset.ex][inp.dataset.id]; });
      paint();
    };
    $("#sLast").addEventListener("change", async () => { persist(); await refill(Number($("#sLast").value)); });
    $("#sReset").addEventListener("click", () => refill(Number($("#sLast").value)));
    paint();
  }

  App.router.register("puan", render);

  /** Asistanın hafızası için kısa özet (hedef bölüm ve tahmini puan); arka planda güncellenir */
  let cachedSummary = "", summaryAt = 0;
  async function refreshSummary() {
    try {
      const st = await loadState();
      if (!st.base) { cachedSummary = ""; return; }
      const avg = await averages(st.last || 3);
      const p = placement(st.type, avg, st);
      const gap = parseFloat(String(st.base).replace(",", ".")) - p;
      cachedSummary = "Hedef bölüm: " + (st.name || "belirtilmedi") + " (" + typeName(st.type) + ", taban puanı " + st.base + "). " +
        "Son denemelere göre tahmini yerleştirme puanı: " + p.toFixed(2) + (gap > 0 ? " (hedefe " + gap.toFixed(2) + " puan var)." : " (hedefin üzerinde).");
    } catch (e) { /* yok say */ }
  }
  function summaryTR() {
    if (Date.now() - summaryAt > 60000) { summaryAt = Date.now(); refreshSummary(); }
    return cachedSummary;
  }

  App.score = { TYPES, raw, placement, averages, suggest, summaryTR };
})();
