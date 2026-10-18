/* =========================================================
   tercih.js — Tercih Robotu   (#/tercih, #/tercih/<tum|liste>)

   • Netler Deneme Takibi'nden (son N deneme) → App.score ile tahmini
     yerleştirme puanı (OBP dahil) → 2025 taban puan–başarı sırası
     eğrisinden tahmini sıralama.
   • "Bana uygun": tahmini sıralamaya göre Güvenli / Uygun / Hayal bölümler;
     şehir, üniversite türü, bölüm adı, lisans–ön lisans süzgeçleri.
   • "Tüm bölümler": 21 binden fazla programın 2025 taban puanı, başarı
     sırası, kontenjanı, 2024'e göre değişimi ve yaklaşık net karşılığı.
   • "Listem": en çok 24 tercih; sıralanır, şans durumu gösterilir
     (IndexedDB "meta" deposu, id "tercihList"; yedeğe ve eşitlemeye dahil).
   Veri yalnızca sayfa açılınca yüklenir: js/data/tercih-2025.js
   (cngil/turkiye-university-programs, CC BY 4.0 — YÖK Atlas, ÖSYM).
   Tahminler yaklaşıktır; sayfada açıkça yazılır.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const D = () => App.data.tercih;
  const TYPES = ["TYT", "SAY", "EA", "SÖZ", "DİL"];
  const SKEY = { 0: "TYT", 1: "SAY", 2: "EA", 3: "SOZ" };
  const UT = () => [T("Devlet", "State"), T("Vakıf", "Foundation"), T("KKTC / yurt dışı", "TRNC / abroad")];
  const PAGE = 40, MAX_LIST = 24;
  const nf = (n, d) => Number(n).toLocaleString(App.i18n.lang === "en" ? "en-US" : "tr-TR", { maximumFractionDigits: d == null ? 0 : d, minimumFractionDigits: d || 0 });
  const norm = (s) => (App.nav && App.nav.norm ? App.nav.norm(s) : String(s).toLowerCase());

  /* ---------------- Veri ---------------- */
  let loading = null;
  function loadData() {
    if (D()) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise((res, rej) => { const s = document.createElement("script"); s.src = "js/data/tercih-2025.js"; s.onload = res; s.onerror = () => { loading = null; rej(new Error("tercih")); }; document.head.appendChild(s); });
    return loading;
  }
  let rowsCache = null;
  /** Satırları nesneye çevir (bir kez) */
  function rows() {
    if (rowsCache) return rowsCache;
    const d = D();
    rowsCache = d.R.map((r) => {
      const u = d.U[r[1]];
      return { code: r[0], uni: u[0], ut: u[1], city: d.C[u[2]] || T("Yurt dışı", "Abroad"), fac: d.F[r[2]], name: d.N[r[3]], t: r[4], dur: r[5], quota: r[6], placed: r[7],
        score: r[8] ? r[8] / 100 : null, rank: r[9] || null, score24: r[10] ? r[10] / 100 : null, rank24: r[11] || null,
        q: norm(d.N[r[3]] + " " + u[0] + " " + (d.C[u[2]] || "") + " " + d.F[r[2]]) };
    });
    return rowsCache;
  }

  /** Puan → tahmini başarı sırası (2025 eğrisi, doğrusal ara değer) */
  function rankFor(t, score) {
    const k = D().K[t];
    if (!k || score == null) return null;
    if (score >= k[0][0]) return { rank: k[0][1], cap: "top" };
    for (let i = 1; i < k.length; i++) {
      if (score >= k[i][0]) {
        const [s0, r0] = k[i - 1], [s1, r1] = k[i];
        return { rank: Math.round(r1 + ((score - s1) / (s0 - s1)) * (r0 - r1)) };
      }
    }
    return { rank: k[k.length - 1][1], cap: "bottom" };
  }

  /** Taban puan için yaklaşık net karşılığı (dengeli dağılım varsayımı) */
  function netsFor(t, score, st) {
    const key = SKEY[t];
    if (!key || !score || !App.score) return null;
    const K = App.score.TYPES[key], CFG = App.data.exams;
    const q = (ex, id) => (CFG.types[ex].subjects.find((s) => s.id === id) || {}).questions || 0;
    const obp = obpPoints(st);
    const need = score - obp - K.base;
    let maxPts = 0, qT = 0, qA = 0;
    Object.entries(K.tyt).forEach(([id, c]) => { maxPts += c * q("TYT", id); qT += q("TYT", id); });
    Object.entries(K.ayt).forEach(([id, c]) => { maxPts += c * q("AYT", id); qA += q("AYT", id); });
    const f = need / maxPts;
    return { f, tyt: Math.max(0, Math.round(f * qT)), ayt: qA ? Math.max(0, Math.round(f * qA)) : null, over: f > 1 };
  }
  const obpPoints = (st) => { const dip = Number(st.obp) || 80; return Math.max(250, Math.min(500, dip * 5)) * (st.prevPlaced ? 0.06 : 0.12); };
  const netTxt = (n) => !n ? "–" : n.over ? T("tam nete yakın", "near full marks") : n.f <= 0 ? T("çok az net", "very few") : "≈ " + n.tyt + " TYT" + (n.ayt != null ? " + " + n.ayt + " AYT" : "") + T(" net", " nets");

  /* ---------------- Öğrencinin tahmini ---------------- */
  async function myState() {
    const sc = await App.db.get("meta", "scoreTarget").catch(() => null) || {};
    const pref = await App.db.get("meta", "tercihPrefs").catch(() => null) || {};
    return { obp: pref.obp != null ? pref.obp : sc.obp || "", prevPlaced: pref.prevPlaced != null ? pref.prevPlaced : !!sc.prevPlaced, last: pref.last || 3, manual: pref.manual || {} };
  }
  const savePrefs = (st) => App.db.put("meta", { id: "tercihPrefs", obp: st.obp, prevPlaced: st.prevPlaced, last: st.last, manual: st.manual, updatedAt: new Date().toISOString() });

  async function estimates(st) {
    const avg = App.score ? await App.score.averages(st.last) : { TYT: {}, AYT: {}, count: { TYT: 0, AYT: 0 } };
    const nets = { TYT: avg.TYT, AYT: avg.AYT };
    const stx = { obp: Number(st.obp) || 80, prevPlaced: st.prevPlaced };
    const out = {};
    [0, 1, 2, 3].forEach((t) => {
      const man = st.manual[t];
      let score = null, from = "exam";
      if (man && Number(man) > 0) { score = Number(man); from = "manual"; }
      else if (avg.count.TYT && (t === 0 || avg.count.AYT)) score = App.score.placement(SKEY[t], nets, stx);
      const r = score != null ? rankFor(t, score) : null;
      out[t] = { score, rank: r && r.rank, cap: r && r.cap, from };
    });
    return { est: out, count: avg.count, nets };
  }

  /** Şans: öğrencinin sırası / programın taban sırası */
  function chance(myRank, progRank) {
    if (!myRank || !progRank) return null;
    const x = myRank / progRank;
    if (x <= 0.85) return "safe";
    if (x <= 1.1) return "fit";
    if (x <= 1.4) return "reach";
    return "far";
  }
  const CH = () => ({ safe: [T("Güvenli", "Safe"), "good"], fit: [T("Uygun", "Fit"), "accent"], reach: [T("Hayal", "Reach"), "warn"], far: [T("Uzak", "Far"), "muted"] });

  /* ---------------- Tercih listem ---------------- */
  async function getList() { const r = await App.db.get("meta", "tercihList").catch(() => null); return (r && r.codes) || []; }
  const saveList = (codes) => App.db.put("meta", { id: "tercihList", codes: codes.slice(0, MAX_LIST), updatedAt: new Date().toISOString() });

  /* ---------------- Sayfa ---------------- */
  function render(view, params) {
    App.setTitle(T("Tercih Robotu", "Programme Finder"));
    if (!D()) {
      view.innerHTML = '<div class="page"><div class="card quiz-loading"><div class="stage"><span class="spinner"></span>' + App.icon("grad") + "<span>" + esc(T("2025 taban puanları yükleniyor…", "Loading 2025 cut-off scores…")) + "</span></div></div></div>";
      App.hydrateIcons(view);
      const h = location.hash;
      loadData().then(() => { if (location.hash === h) render(view, params); })
        .catch(() => { if (location.hash === h) view.innerHTML = '<div class="page">' + App.ui.empty("grad", T("Veri yüklenemedi", "Could not load data"), T("Sayfayı yenileyip tekrar dene.", "Reload and try again.")) + "</div>"; });
      return;
    }
    draw(view, params[0] === "tum" ? "all" : params[0] === "liste" ? "list" : "fit");
  }

  async function draw(view, tab) {
    const st = await myState();
    const E = await estimates(st);
    let list = await getList();
    const hasAyt = E.count.AYT > 0;
    // varsayılan puan türü: AYT varsa en iyi sıralamalı alan, yoksa TYT
    let type = App.prefs.get("tercihType", null);
    if (type == null || !E.est[type] || E.est[type].score == null) {
      const cands = [1, 2, 3].filter((t) => E.est[t].rank);
      type = cands.length ? cands.sort((a, b) => E.est[a].rank - E.est[b].rank)[0] : 0;
    }
    const F = Object.assign({ city: "", ut: "", q: "", level: "", band: "", sort: "rank" }, App.prefs.get("tercihFilter", {}) || {});
    let shown = PAGE;

    const tabs = '<div class="tc-tabs" role="tablist">' +
      [["fit", "#/tercih", T("Bana uygun", "For me")], ["all", "#/tercih/tum", T("Tüm bölümler", "All programmes")], ["list", "#/tercih/liste", T("Tercih listem", "My list") + " (" + list.length + ")"]]
        .map(([k, h, l]) => '<a class="tc-tab' + (k === tab ? " is-on" : "") + '" href="' + h + '" role="tab" aria-selected="' + (k === tab) + '">' + esc(l) + "</a>").join("") + "</div>";

    const estCard = '<section class="card tc-me"><div class="tc-me__head"><h2>' + App.icon("target") + esc(T("Senin tahmini durumun", "Your estimate")) + "</h2>" +
      '<span class="hint">' + esc(E.count.TYT ? T("Son " + st.last + " denemenin ortalamasına göre", "Based on your last " + st.last + " exams") : T("Henüz deneme yok: puanını elle girebilirsin", "No exams yet: enter your score manually")) + "</span></div>" +
      '<div class="tc-types">' + [0, 1, 2, 3].map((t) => {
        const e = E.est[t];
        return '<button type="button" class="tc-type' + (t === type ? " is-on" : "") + '" data-type="' + t + '" aria-pressed="' + (t === type) + '"><span>' + TYPES[t] + "</span><b>" + (e.score != null ? nf(e.score, 1) : "–") + "</b><small>" +
          (e.rank ? (e.cap === "top" ? "≤ " : "≈ ") + nf(e.rank) + T(". sıra", " rank") : (t > 0 && !hasAyt && !st.manual[t] ? T("AYT denemesi yok", "no AYT exam") : "")) + (e.from === "manual" ? " · " + T("elle", "manual") : "") + "</small></button>";
      }).join("") + "</div>" +
      '<details class="tc-set"><summary>' + App.icon("settings") + esc(T("Hesap ayarları ve elle puan girişi", "Settings and manual score")) + "</summary><div class=\"tc-set__body\">" +
        '<label class="field"><span class="field__label">' + esc(T("Diploma notu (OBP için)", "Diploma grade (for OBP)")) + '</span><input class="input" type="number" min="50" max="100" step="0.01" id="tcObp" value="' + esc(st.obp) + '" placeholder="80"></label>' +
        '<label class="field"><span class="field__label">' + esc(T("Kaç deneme", "How many exams")) + '</span><select class="select" id="tcLast">' + [1, 3, 5, 10].map((n) => '<option value="' + n + '"' + (n === st.last ? " selected" : "") + ">" + T("Son " + n, "Last " + n) + "</option>").join("") + "</select></label>" +
        '<label class="check-row"><input type="checkbox" id="tcPrev"' + (st.prevPlaced ? " checked" : "") + "> <span>" + esc(T("Geçen yıl bir programa yerleştim (OBP yarıya iner)", "I was placed last year (OBP halved)")) + "</span></label>" +
        '<div class="tc-manual">' + [0, 1, 2, 3].map((t) => '<label class="field"><span class="field__label">' + TYPES[t] + " " + esc(T("puanı (elle)", "score (manual)")) + '</span><input class="input" type="number" min="100" max="560" step="0.01" data-man="' + t + '" value="' + esc(st.manual[t] || "") + '" placeholder="' + esc(E.est[t].from === "exam" && E.est[t].score ? nf(E.est[t].score, 1) : "") + '"></label>').join("") + "</div>" +
        '<p class="hint">' + esc(T("Elle girilen puan denemelerden hesaplananın yerine geçer. Boş bırakırsan denemelerin kullanılır.", "A manual score overrides the exam estimate. Leave empty to use your exams.")) + "</p>" +
      "</div></details>" +
      '<p class="hint tc-warn">' + App.icon("info") + esc(T("Tahmindir: puan katsayıları yaklaşık, sıralama 2025 yerleştirme sonuçlarına göre hesaplanır. Her yıl taban puanlar ve sıralamalar değişir; kesin karar için ÖSYM kılavuzunu ve YÖK Atlas'ı kontrol et.", "Estimate only: coefficients are approximate and ranks come from 2025 results. Check the official ÖSYM guide and YÖK Atlas.")) + "</p></section>";

    const cities = Array.from(new Set(rows().map((r) => r.city))).sort((a, b) => a.localeCompare(b, "tr"));
    const filters = '<div class="tc-filters">' +
      '<label class="tc-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="tcQ" value="' + esc(F.q) + '" placeholder="' + esc(T("Bölüm, üniversite ya da şehir ara: tıp, hukuk, ODTÜ…", "Search programme, university or city…")) + '" aria-label="' + esc(T("Ara", "Search")) + '"></label>' +
      '<select class="select" id="tcCity" aria-label="' + esc(T("Şehir", "City")) + '"><option value="">' + esc(T("Tüm şehirler", "All cities")) + "</option>" + cities.map((c) => '<option' + (c === F.city ? " selected" : "") + ">" + esc(c) + "</option>").join("") + "</select>" +
      '<select class="select" id="tcUt" aria-label="' + esc(T("Üniversite türü", "University type")) + '"><option value="">' + esc(T("Devlet + vakıf", "All types")) + "</option>" + UT().map((u, i) => '<option value="' + i + '"' + (String(i) === String(F.ut) ? " selected" : "") + ">" + esc(u) + "</option>").join("") + "</select>" +
      (tab === "all" ? '<select class="select" id="tcType" aria-label="' + esc(T("Puan türü", "Score type")) + '"><option value="">' + esc(T("Tüm puan türleri", "All score types")) + "</option>" + TYPES.map((x, i) => '<option value="' + i + '"' + (String(i) === String(F.type) ? " selected" : "") + ">" + x + "</option>").join("") + "</select>" : "") +
      '<select class="select" id="tcSort" aria-label="' + esc(T("Sırala", "Sort")) + '">' + [["rank", T("Sıralamaya göre", "By rank")], ["quota", T("Kontenjana göre", "By quota")], ["city", T("Şehre göre", "By city")], ["trend", T("Yükselenler (2024→2025)", "Rising (2024→2025)")]].map(([v, l]) => '<option value="' + v + '"' + (v === F.sort ? " selected" : "") + ">" + esc(l) + "</option>").join("") + "</select>" +
      "</div>";

    view.innerHTML = '<div class="page tc">' +
      '<div class="page-head"><div><h1>' + esc(T("Tercih Robotu", "Programme Finder")) + "</h1><p>" +
        esc(T("Denemelerine göre hangi şehirde, hangi üniversitede, hangi bölüme yerleşebileceğini gör. 2025 YÖK Atlas taban puanları ve başarı sıralamalarıyla.", "See which programme in which city and university you could get into, using 2025 YÖK Atlas cut-offs.")) + "</p></div></div>" +
      tabs + (tab !== "list" ? estCard + filters : "") +
      '<div id="tcBody"></div>' +
      '<p class="hint tc-src">' + esc(T("Veri: YÖK Atlas ve ÖSYM 2025 yerleştirme sonuçları; derleme cngil/turkiye-university-programs (CC BY 4.0). Net karşılıkları, bütün derslerde dengeli başarı varsayılarak yaklaşık hesaplanır.", "Data: YÖK Atlas / ÖSYM 2025; compiled by cngil/turkiye-university-programs (CC BY 4.0). Net equivalents assume balanced performance.")) + "</p>" +
      "</div>";
    App.hydrateIcons(view);
    const body = view.querySelector("#tcBody");
    const myRank = () => E.est[type] && E.est[type].rank;

    /* --- Süz ve listele --- */
    function filtered() {
      const words = norm(F.q).split(" ").filter(Boolean);
      let r = rows().filter((x) => (!F.city || x.city === F.city) && (F.ut === "" || F.ut == null || String(x.ut) === String(F.ut)) && words.every((w) => x.q.indexOf(w) >= 0));
      if (tab === "fit") {
        r = r.filter((x) => x.t === type && x.rank);
        const m = myRank();
        r.forEach((x) => { x.ch = chance(m, x.rank); });
        r = r.filter((x) => x.ch && x.ch !== "far" && (!F.band || x.ch === F.band));
      } else {
        if (F.type !== "" && F.type != null) r = r.filter((x) => String(x.t) === String(F.type));
        r.forEach((x) => { const e = E.est[x.t]; x.ch = e && e.rank ? chance(e.rank, x.rank) : null; });
      }
      const sorters = {
        rank: (a, b) => (a.rank || 9e9) - (b.rank || 9e9),
        quota: (a, b) => b.quota - a.quota,
        city: (a, b) => a.city.localeCompare(b.city, "tr") || (a.rank || 9e9) - (b.rank || 9e9),
        trend: (a, b) => trend(b) - trend(a)
      };
      return r.sort(sorters[F.sort] || sorters.rank);
    }
    const trend = (x) => (x.rank && x.rank24 ? (x.rank24 - x.rank) / x.rank24 : -9);

    function card(x, inList) {
      const ch = x.ch && CH()[x.ch];
      const n = netsFor(x.t, x.score, st);
      const tr = x.rank && x.rank24 ? x.rank24 - x.rank : null;
      return '<li class="tc-row"><div class="tc-row__main"><div class="tc-row__top">' + (ch ? '<span class="tc-ch tc-ch--' + ch[1] + '">' + esc(ch[0]) + "</span>" : "") +
          '<span class="tc-pt">' + TYPES[x.t] + "</span>" + (x.dur === 2 ? '<span class="tc-pt">' + esc(T("Ön lisans", "Associate")) + "</span>" : "") + "</div>" +
        "<b>" + esc(x.name) + "</b>" +
        '<span class="tc-row__uni">' + esc(x.uni) + " · " + esc(x.city) + " · " + esc(UT()[x.ut]) + "</span>" +
        (x.fac ? '<small class="hint">' + esc(x.fac) + "</small>" : "") + "</div>" +
        '<dl class="tc-stats">' +
          "<div><dt>" + esc(T("Taban puan", "Cut-off")) + "</dt><dd>" + (x.score ? nf(x.score, 2) : '<span class="hint">' + esc(T("dolmadı", "unfilled")) + "</span>") + "</dd></div>" +
          "<div><dt>" + esc(T("Başarı sırası", "Rank")) + "</dt><dd>" + (x.rank ? nf(x.rank) : "–") +
            (tr != null ? ' <span class="tc-tr ' + (tr > 0 ? "up" : tr < 0 ? "down" : "") + '" title="' + esc(T("2024: ", "2024: ") + nf(x.rank24)) + '">' + (tr > 0 ? "▲" : tr < 0 ? "▼" : "=") + "</span>" : "") + "</dd></div>" +
          "<div><dt>" + esc(T("Kontenjan", "Quota")) + "</dt><dd>" + nf(x.quota) + "</dd></div>" +
          "<div><dt>" + esc(T("Yaklaşık net", "Approx. nets")) + "</dt><dd>" + esc(x.t === 4 ? T("YDT", "YDT") : netTxt(n)) + "</dd></div>" +
        "</dl>" +
        '<button type="button" class="tc-add' + (inList ? " is-on" : "") + '" data-add="' + x.code + '" aria-pressed="' + inList + '" aria-label="' + esc((inList ? T("Listemden çıkar: ", "Remove: ") : T("Listeme ekle: ", "Add: ")) + x.name + ", " + x.uni) + '">' + App.icon(inList ? "check" : "plus") + "<span>" + esc(inList ? T("Listemde", "In list") : T("Listeme ekle", "Add")) + "</span></button></li>";
    }

    function paintFit() {
      const all = filtered();
      const m = myRank();
      if (!m) {
        body.innerHTML = '<div class="card">' + App.ui.empty("chart", T("Önce puanın gerekiyor", "We need your score first"),
          T("Deneme Takibi'ne TYT (ve alanın için AYT) denemesi ekle ya da yukarıdaki ayarlardan puanını elle gir.", "Add TYT (and AYT) exams or enter your score manually above."),
          '<a class="btn btn--primary" href="#/denemeler/yeni">' + App.icon("plus") + esc(T("Deneme ekle", "Add exam")) + "</a>") + "</div>";
        App.hydrateIcons(body); return;
      }
      const counts = { safe: 0, fit: 0, reach: 0 };
      const base = rows().filter((x) => x.t === type && x.rank && (!F.city || x.city === F.city) && (F.ut === "" || F.ut == null || String(x.ut) === String(F.ut)));
      const words = norm(F.q).split(" ").filter(Boolean);
      base.filter((x) => words.every((w) => x.q.indexOf(w) >= 0)).forEach((x) => { const c = chance(m, x.rank); if (counts[c] != null) counts[c]++; });
      const band = (k) => '<button type="button" class="tc-band tc-band--' + k + (F.band === k ? " is-on" : "") + '" data-band="' + k + '" aria-pressed="' + (F.band === k) + '"><b>' + nf(counts[k]) + "</b><span>" + esc(CH()[k][0]) + "</span></button>";
      const cityCount = {};
      all.forEach((x) => { cityCount[x.city] = (cityCount[x.city] || 0) + 1; });
      const topCities = Object.entries(cityCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
      body.innerHTML = '<div class="tc-bands">' + band("safe") + band("fit") + band("reach") + "</div>" +
        '<p class="hint tc-bandhint">' + esc(T("Güvenli: sıralaman tabandan belirgin iyi · Uygun: tabana yakın · Hayal: biraz daha net gerekiyor. ", "Safe: clearly better than the cut-off · Fit: close · Reach: needs a bit more. ")) +
          (F.band ? '<button type="button" class="linkish" data-band="">' + esc(T("Hepsini göster", "Show all")) + "</button>" : "") + "</p>" +
        (topCities.length && !F.city ? '<div class="tc-cities"><span class="hint">' + esc(T("En çok seçenek: ", "Most options: ")) + "</span>" + topCities.map(([c, n]) => '<button type="button" class="tc-city" data-city="' + esc(c) + '">' + esc(c) + " <small>" + n + "</small></button>").join("") + "</div>" : "") +
        listHtml(all);
      bindList(all);
    }
    function listHtml(all) {
      if (!all.length) return '<div class="card">' + App.ui.empty("search", T("Sonuç yok", "No results"), T("Süzgeçleri genişletmeyi dene.", "Try widening the filters.")) + "</div>";
      return '<p class="hint tc-count" aria-live="polite">' + esc(T(nf(all.length) + " program", nf(all.length) + " programmes")) + '</p><ol class="tc-list">' + all.slice(0, shown).map((x) => card(x, list.indexOf(x.code) >= 0)).join("") + "</ol>" +
        (all.length > shown ? '<button type="button" class="btn tc-more" id="tcMore">' + esc(T("Daha fazla göster (" + nf(all.length - shown) + ")", "Show more (" + nf(all.length - shown) + ")")) + "</button>" : "");
    }
    function bindList(all) {
      App.hydrateIcons(body);
      body.querySelectorAll("[data-band]").forEach((b) => b.addEventListener("click", () => { F.band = F.band === b.dataset.band ? "" : b.dataset.band; saveF(); shown = PAGE; paint(); }));
      body.querySelectorAll("[data-city]").forEach((b) => b.addEventListener("click", () => { F.city = b.dataset.city; const s = view.querySelector("#tcCity"); if (s) s.value = F.city; saveF(); shown = PAGE; paint(); }));
      const more = body.querySelector("#tcMore");
      if (more) more.addEventListener("click", () => { shown += PAGE * 2; paint(); });
      body.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", async () => {
        const code = +b.dataset.add;
        if (list.indexOf(code) >= 0) list = list.filter((c) => c !== code);
        else { if (list.length >= MAX_LIST) { App.ui.toast(T("Tercih listesi en çok 24 program alır", "Up to 24 programmes"), "error"); return; } list.push(code); }
        await saveList(list);
        const on = list.indexOf(code) >= 0;
        b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on);
        b.innerHTML = App.icon(on ? "check" : "plus") + "<span>" + esc(on ? T("Listemde", "In list") : T("Listeme ekle", "Add")) + "</span>";
        const tl = view.querySelector('.tc-tab[href="#/tercih/liste"]'); if (tl) tl.textContent = T("Tercih listem", "My list") + " (" + list.length + ")";
        App.ui.toast(on ? T("Listene eklendi (" + list.length + "/24)", "Added (" + list.length + "/24)") : T("Listenden çıkarıldı", "Removed"));
      }));
    }
    function paintAll() { const all = filtered(); body.innerHTML = listHtml(all); bindList(all); }
    function paintList() {
      const byCode = {}; rows().forEach((x) => { byCode[x.code] = x; });
      const items = list.map((c) => byCode[c]).filter(Boolean);
      items.forEach((x) => { const e = E.est[x.t]; x.ch = e && e.rank ? chance(e.rank, x.rank) : null; });
      if (!items.length) {
        body.innerHTML = '<div class="card">' + App.ui.empty("list", T("Tercih listen boş", "Your list is empty"), T("\"Bana uygun\" ya da \"Tüm bölümler\"de bir programın \"Listeme ekle\" düğmesine bas. En çok 24 tercih ekleyebilirsin.", "Use \"Add\" on any programme. Up to 24."),
          '<a class="btn btn--primary" href="#/tercih">' + esc(T("Bana uygun bölümler", "Programmes for me")) + "</a>") + "</div>";
        App.hydrateIcons(body); return;
      }
      const c = { safe: 0, fit: 0, reach: 0, far: 0 }; items.forEach((x) => { if (x.ch) c[x.ch]++; });
      const advice = c.safe < 3 ? T("Listende en az 3–4 güvenli tercih olması önerilir; yoksa hiçbir yere yerleşememe riski artar.", "Keep at least 3–4 safe choices.")
        : !c.reach ? T("Biraz daha iddialı birkaç \"hayal\" tercihi en üste ekleyebilirsin.", "You could add a few reach choices at the top.") : T("Dengeli bir liste: hayaller üstte, güvenliler altta olacak şekilde sırala.", "Balanced: reach on top, safe at the bottom.");
      body.innerHTML = '<div class="card tc-listsum"><div class="tc-bands">' + ["reach", "fit", "safe"].map((k) => '<div class="tc-band tc-band--' + k + '"><b>' + c[k] + "</b><span>" + esc(CH()[k][0]) + "</span></div>").join("") + "</div>" +
        '<p class="hint">' + esc(advice + " " + T("Gerçek tercihte sıra önemlidir: en çok istediğin bölümü en üste yaz.", "Order matters: put your favourite first.")) + "</p></div>" +
        '<ol class="tc-list tc-mylist">' + items.map((x, i) => '<li class="tc-row tc-row--mine"><span class="tc-no">' + (i + 1) + "</span>" + card(x, true).replace(/^<li class="tc-row">/, "").replace(/<\/li>$/, "") +
          '<div class="tc-move"><button type="button" class="icon-btn" data-up="' + i + '" aria-label="' + esc(T("Yukarı taşı", "Move up")) + '"' + (i === 0 ? " disabled" : "") + ">" + App.icon("arrowUp") + '</button><button type="button" class="icon-btn" data-down="' + i + '" aria-label="' + esc(T("Aşağı taşı", "Move down")) + '"' + (i === items.length - 1 ? " disabled" : "") + ">" + App.icon("arrowDown") + "</button></div></li>").join("") + "</ol>" +
        '<div class="tc-listact"><button type="button" class="btn" id="tcCopy">' + App.icon("copy") + esc(T("Listeyi kopyala", "Copy list")) + "</button></div>";
      App.hydrateIcons(body);
      const move = async (i, d) => { const j = i + d; if (j < 0 || j >= list.length) return; [list[i], list[j]] = [list[j], list[i]]; await saveList(list); paintList(); };
      body.querySelectorAll("[data-up]").forEach((b) => b.addEventListener("click", () => move(+b.dataset.up, -1)));
      body.querySelectorAll("[data-down]").forEach((b) => b.addEventListener("click", () => move(+b.dataset.down, 1)));
      body.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", async () => { list = list.filter((c2) => c2 !== +b.dataset.add); await saveList(list); const tl = view.querySelector('.tc-tab[href="#/tercih/liste"]'); if (tl) tl.textContent = T("Tercih listem", "My list") + " (" + list.length + ")"; paintList(); }));
      body.querySelector("#tcCopy").addEventListener("click", () => {
        const txt = items.map((x, i) => (i + 1) + ". " + x.uni + " — " + x.name + " (" + x.city + ", " + TYPES[x.t] + ", " + T("taban ", "cut-off ") + (x.score ? nf(x.score, 2) : "–") + ", " + T("sıra ", "rank ") + (x.rank ? nf(x.rank) : "–") + ")").join("\n");
        (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => App.ui.toast(T("Liste kopyalandı", "Copied"))).catch(() => App.ui.toast(T("Kopyalanamadı", "Could not copy"), "error"));
      });
    }
    const paint = () => (tab === "fit" ? paintFit() : tab === "all" ? paintAll() : paintList());
    const saveF = () => App.prefs.set("tercihFilter", { city: F.city, ut: F.ut, q: F.q, band: F.band, sort: F.sort, type: F.type });

    /* --- Olaylar --- */
    if (tab !== "list") {
      const deb = App.utils.debounce(() => { F.q = view.querySelector("#tcQ").value; saveF(); shown = PAGE; paint(); }, 200);
      view.querySelector("#tcQ").addEventListener("input", deb);
      view.querySelector("#tcCity").addEventListener("change", (e) => { F.city = e.target.value; saveF(); shown = PAGE; paint(); });
      view.querySelector("#tcUt").addEventListener("change", (e) => { F.ut = e.target.value; saveF(); shown = PAGE; paint(); });
      view.querySelector("#tcSort").addEventListener("change", (e) => { F.sort = e.target.value; saveF(); shown = PAGE; paint(); });
      const ty = view.querySelector("#tcType"); if (ty) ty.addEventListener("change", (e) => { F.type = e.target.value; saveF(); shown = PAGE; paint(); });
      view.querySelectorAll("[data-type]").forEach((b) => b.addEventListener("click", () => { App.prefs.set("tercihType", +b.dataset.type); draw(view, tab); }));
      const re = App.utils.debounce(async () => {
        st.obp = view.querySelector("#tcObp").value; st.last = +view.querySelector("#tcLast").value; st.prevPlaced = view.querySelector("#tcPrev").checked;
        view.querySelectorAll("[data-man]").forEach((i) => { st.manual[i.dataset.man] = i.value ? Number(i.value) : ""; });
        await savePrefs(st); draw(view, tab).then(() => { const d = view.querySelector(".tc-set"); if (d) d.open = true; });
      }, 700);
      view.querySelectorAll("#tcObp, #tcLast, #tcPrev, [data-man]").forEach((i) => i.addEventListener("change", re));
    }
    paint();
    App.tercih._last = { E, type, F, filtered, list: () => list };
  }

  App.router.register("tercih", render);
  App.tercih = { loadData, rankFor, netsFor, chance, rows, myState, estimates, CH, TYPES, UT };
})();
