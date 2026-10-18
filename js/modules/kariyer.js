/* =========================================================
   kariyer.js — Kariyer Keşfi (v1.24)   (#/kariyer, #/kariyer/<test|sonuc|meslekler|m/<id>>)

   • İlgi envanteri: 48 etkinlik, her biri "Severim / Kararsızım / Sevmem".
     Puanlar Holland'ın altı ilgi tipine (RIASEC) göre toplanır; en yüksek üç
     tip "ilgi kodun" olur. Yarıda bırakılırsa kaldığı yerden devam eder.
   • Sonuç: altıgen grafik, tiplerin açıklaması, sana en uygun meslekler.
   • Meslek kartları: ne yapar, bir günü, beceriler, puan türü ve
     Tercih Robotu'yla bağlantılı "sıralamanla girebileceğin bölümler".
   Kayıt: tercih "kariyer" = { ans: [0|1|2|null…], done, at } (yalnızca cihazda; yedeğe dahil).
   Bu bir öz-değerlendirme aracıdır; tanı koymaz, karar vermez.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const TIP = () => App.data.kariyerTip;
  const MAD = () => App.data.kariyerMadde;
  const MES = () => App.data.meslekler;
  const ORDER = ["R", "I", "A", "S", "E", "C"];
  const norm = (s) => (App.nav && App.nav.norm ? App.nav.norm(s) : String(s).toLowerCase());
  const tipName = (k) => (App.i18n.lang === "en" ? TIP()[k].en : TIP()[k].tr);

  /* ---------------- Kayıt ---------------- */
  function state() {
    const s = App.prefs.get("kariyer", null) || {};
    const ans = Array.isArray(s.ans) && s.ans.length === MAD().length ? s.ans : MAD().map(() => null);
    return { ans, done: !!s.done && ans.every((x) => x != null), at: s.at || null };
  }
  const save = (st) => App.prefs.set("kariyer", { ans: st.ans, done: st.done, at: st.at });

  /** Tip puanları (yüzde) ve kod */
  function scores(ans) {
    const sum = {}, max = {};
    ORDER.forEach((k) => { sum[k] = 0; max[k] = 0; });
    MAD().forEach(([k], i) => { max[k] += 2; if (ans[i] != null) sum[k] += ans[i]; });
    const pct = {}; ORDER.forEach((k) => { pct[k] = max[k] ? Math.round((sum[k] / max[k]) * 100) : 0; });
    const code = ORDER.slice().sort((a, b) => pct[b] - pct[a] || ORDER.indexOf(a) - ORDER.indexOf(b)).slice(0, 3).join("");
    return { pct, code };
  }
  /** Meslek uyumu (0–100): mesleğin kodundaki tiplerin, sıraya göre ağırlıklı puanı */
  function fit(m, pct) {
    const w = [0.5, 0.3, 0.2];
    return Math.round(m[2].split("").reduce((a, k, i) => a + (pct[k] || 0) * (w[i] || 0), 0));
  }

  /* ---------------- Altıgen grafik ---------------- */
  function hexSvg(pct) {
    const R = 92, cx = 130, cy = 118;
    const pt = (i, r) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    const ring = (f) => ORDER.map((_, i) => pt(i, R * f).map((v) => v.toFixed(1)).join(",")).join(" ");
    const shape = ORDER.map((k, i) => pt(i, R * Math.max(0.04, pct[k] / 100)).map((v) => v.toFixed(1)).join(",")).join(" ");
    return '<svg class="kr-hex" viewBox="0 0 260 236" role="img" aria-label="' + esc(T("İlgi profili: ", "Interest profile: ") + ORDER.map((k) => tipName(k) + " " + pct[k]).join(", ")) + '">' +
      [1, 0.66, 0.33].map((f) => '<polygon points="' + ring(f) + '" class="kr-hex__ring"/>').join("") +
      ORDER.map((_, i) => { const [x, y] = pt(i, R); return '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" class="kr-hex__ax"/>'; }).join("") +
      '<polygon points="' + shape + '" class="kr-hex__shape"/>' +
      ORDER.map((k, i) => { const [x, y] = pt(i, R + 17); return '<text x="' + x.toFixed(1) + '" y="' + (y + 4).toFixed(1) + '" class="kr-hex__t" style="fill:' + TIP()[k].color + '">' + k + "</text>"; }).join("") + "</svg>";
  }

  /* ---------------- Sayfalar ---------------- */
  const tabs = (cur) => '<div class="mp-seg kr-tabs" role="tablist">' + [["", T("Keşfet", "Explore")], ["test", T("İlgi envanteri", "Interest inventory")], ["meslekler", T("Meslekler", "Careers")]]
    .map(([k, l]) => '<a class="mp-seg__b' + (k === cur ? " is-on" : "") + '" role="tab" aria-selected="' + (k === cur) + '" href="#/kariyer' + (k ? "/" + k : "") + '">' + esc(l) + "</a>").join("") + "</div>";
  const head = () => '<div class="page-head"><div><h1>' + esc(T("Kariyer Keşfi", "Career Explorer")) + "</h1><p>" +
    esc(T("İlgi alanlarını keşfet, meslekleri tanı, sıralamanla hangi bölümlere girebileceğini gör.", "Discover your interests, explore careers and see which programmes you could get into.")) + "</p></div></div>";
  const jobCard = (m, pct) => {
    const f = pct ? fit(m, pct) : null;
    return '<a class="kr-job" href="#/kariyer/m/' + m[0] + '"><span class="kr-job__code">' + m[2].split("").map((k) => '<i style="--c:' + TIP()[k].color + '">' + k + "</i>").join("") + "</span>" +
      "<b>" + esc(m[1]) + '</b><small>' + esc(m[4]) + '</small><span class="kr-job__meta"><span class="tc-pt">' + esc(m[3]) + "</span>" + (f != null ? '<span class="kr-fit" style="--p:' + f + '%">' + esc(T("uyum %" + f, f + "% match")) + "</span>" : "") + "</span></a>";
  };

  function home(view) {
    const st = state(), answered = st.ans.filter((x) => x != null).length;
    const sc = answered >= 12 ? scores(st.ans) : null;
    if (st.done) return result(view, st);
    view.innerHTML = '<div class="page page--narrow kr">' + head() + tabs("") +
      '<section class="card kr-intro"><h2>' + App.icon("compass") + esc(T("Nasıl çalışır?", "How it works")) + "</h2><ol>" +
        "<li>" + esc(T("48 kısa etkinliği \"severim / kararsızım / sevmem\" diye işaretle (yaklaşık 5 dakika).", "Rate 48 short activities (about 5 minutes).")) + "</li>" +
        "<li>" + esc(T("İlgilerin altı tipe göre puanlanır ve sana bir ilgi kodu çıkar (ör. IRC: Araştırmacı–Uygulamacı–Düzenli).", "Your interests are scored across six types and you get a code.")) + "</li>" +
        "<li>" + esc(T("Koduna uyan meslekleri ve sıralamanla girebileceğin bölümleri görürsün.", "See matching careers and programmes within your rank.")) + "</li></ol>" +
        '<a class="btn btn--primary" href="#/kariyer/test">' + App.icon("play") + esc(answered ? T("Kaldığın yerden devam et (" + answered + "/48)", "Continue (" + answered + "/48)") : T("Envantere başla", "Start the inventory")) + "</a>" +
        '<p class="hint">' + esc(T("Doğru ya da yanlış cevap yoktur; bu bir öz-değerlendirme aracıdır ve kararı sen verirsin.", "There are no right answers; this is a self-reflection tool.")) + "</p></section>" +
      '<h2 class="section-title">' + esc(T("Altı ilgi tipi", "The six interest types")) + '</h2><div class="kr-types">' + ORDER.map((k) => '<div class="card kr-type" style="--c:' + TIP()[k].color + '"><b><i>' + k + "</i>" + esc(tipName(k)) + "</b><p>" + esc(TIP()[k].desc) + "</p></div>").join("") + "</div>" +
      '<h2 class="section-title">' + esc(T("Göz at: popüler meslekler", "Browse careers")) + '</h2><div class="kr-jobs">' + MES().slice(0, 6).map((m) => jobCard(m, sc && sc.pct)).join("") + '</div><p><a class="btn btn--ghost" href="#/kariyer/meslekler">' + esc(T("Tüm meslekler (" + MES().length + ")", "All careers (" + MES().length + ")")) + "</a></p></div>";
    App.hydrateIcons(view);
  }

  function test(view) {
    const st = state();
    const N = MAD().length;
    let i = st.ans.findIndex((x) => x == null); if (i < 0) i = 0;
    view.innerHTML = '<div class="page page--narrow kr">' + head() + tabs("test") + '<section class="card kr-test" aria-live="polite"></section></div>';
    const box = view.querySelector(".kr-test");
    const paint = () => {
      const done = st.ans.filter((x) => x != null).length;
      const [, txt] = MAD()[i];
      box.innerHTML = '<div class="kr-prog"><span>' + (i + 1) + " / " + N + '</span><div class="kr-bar"><i style="width:' + Math.round((done / N) * 100) + '%"></i></div></div>' +
        '<p class="kr-q">' + esc(txt) + "</p>" +
        '<div class="kr-opts" role="group" aria-label="' + esc(T("Ne kadar hoşlanırsın?", "How much would you enjoy it?")) + '">' +
          [[2, T("Severim", "I'd enjoy it"), "good"], [1, T("Kararsızım", "Not sure"), "mid"], [0, T("Sevmem", "Not for me"), "bad"]]
            .map(([v, l, c]) => '<button type="button" class="kr-opt kr-opt--' + c + (st.ans[i] === v ? " is-on" : "") + '" data-v="' + v + '" aria-pressed="' + (st.ans[i] === v) + '">' + esc(l) + "</button>").join("") + "</div>" +
        '<div class="kr-nav"><button type="button" class="btn btn--ghost btn--sm" data-nav="-1"' + (i === 0 ? " disabled" : "") + ">" + App.icon("chevronL") + esc(T("Önceki", "Back")) + "</button>" +
          (done === N ? '<button type="button" class="btn btn--primary btn--sm" data-finish>' + App.icon("check") + esc(T("Sonucu gör", "See result")) + "</button>" : '<span class="hint">' + esc(T("İşaretleyince sıradakine geçer", "Moves on after you answer")) + "</span>") + "</div>";
      App.hydrateIcons(box);
      box.querySelectorAll("[data-v]").forEach((b) => b.addEventListener("click", () => {
        st.ans[i] = +b.dataset.v; save(st);
        const next = st.ans.findIndex((x, j) => j > i && x == null), any = st.ans.findIndex((x) => x == null);
        if (next >= 0) i = next; else if (any >= 0) i = any; else { st.done = true; st.at = new Date().toISOString(); save(st); location.hash = "#/kariyer/sonuc"; return; }
        paint();
      }));
      const back = box.querySelector('[data-nav="-1"]'); if (back) back.addEventListener("click", () => { if (i > 0) { i--; paint(); } });
      const fin = box.querySelector("[data-finish]"); if (fin) fin.addEventListener("click", () => { st.done = true; st.at = new Date().toISOString(); save(st); location.hash = "#/kariyer/sonuc"; });
    };
    paint();
    box.addEventListener("keydown", (e) => { const map = { 1: 2, 2: 1, 3: 0 }; if (map[e.key] != null) { const b = box.querySelector('[data-v="' + map[e.key] + '"]'); if (b) b.click(); } });
  }

  function result(view, st) {
    st = st || state();
    if (!st.done) { location.hash = "#/kariyer/test"; return; }
    const { pct, code } = scores(st.ans);
    const top = MES().map((m) => ({ m, f: fit(m, pct) })).sort((a, b) => b.f - a.f).slice(0, 9);
    view.innerHTML = '<div class="page kr">' + head() + tabs("") +
      '<div class="kr-res"><section class="card kr-res__main"><h2>' + esc(T("İlgi kodun", "Your interest code")) + '</h2><div class="kr-code">' + code.split("").map((k) => '<span style="--c:' + TIP()[k].color + '"><b>' + k + "</b>" + esc(tipName(k)) + "</span>").join("") + "</div>" +
        hexSvg(pct) +
        '<ul class="kr-bars">' + ORDER.slice().sort((a, b) => pct[b] - pct[a]).map((k) => '<li><span>' + esc(tipName(k)) + '</span><div class="kr-bar"><i style="width:' + pct[k] + "%;background:" + TIP()[k].color + '"></i></div><b>' + pct[k] + "</b></li>").join("") + "</ul>" +
        '<div class="kr-actions"><a class="btn btn--ghost btn--sm" href="#/kariyer/test">' + App.icon("edit") + esc(T("Cevapları gözden geçir", "Review answers")) + '</a><button type="button" class="btn btn--ghost btn--sm" id="krReset">' + App.icon("refresh") + esc(T("Baştan çöz", "Start over")) + "</button></div></section>" +
      '<section class="kr-res__side">' + code.split("").map((k) => '<div class="card kr-type" style="--c:' + TIP()[k].color + '"><b><i>' + k + "</i>" + esc(tipName(k)) + "</b><p>" + esc(TIP()[k].desc) + "</p></div>").join("") + "</section></div>" +
      '<h2 class="section-title">' + esc(T("Sana en uygun meslekler", "Careers that fit you")) + '</h2><div class="kr-jobs">' + top.map((x) => jobCard(x.m, pct)).join("") + "</div>" +
      '<p class="hint kr-note">' + esc(T("Bu sonuç yalnızca ilgilerini yansıtır; yetenek, değerler ve koşullar da önemlidir. Bir rehber öğretmenle konuşmak karar vermene yardım eder.", "This reflects interests only; abilities and values matter too. Talking with a school counsellor helps.")) + "</p></div>";
    App.hydrateIcons(view);
    view.querySelector("#krReset").addEventListener("click", async () => {
      if (!(await App.ui.confirm(T("Cevapların silinip envanter baştan başlasın mı?", "Clear answers and start over?"), T("Baştan başla", "Start over"), true))) return;
      App.prefs.set("kariyer", null); location.hash = "#/kariyer/test";
    });
  }

  function list(view) {
    const st = state(), pct = st.done ? scores(st.ans).pct : null;
    const F = { q: "", tip: "", pt: "" };
    view.innerHTML = '<div class="page kr">' + head() + tabs("meslekler") +
      '<div class="tc-filters"><label class="tc-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="krQ" placeholder="' + esc(T("Meslek ara: doktor, yazılım, avukat…", "Search careers…")) + '" aria-label="' + esc(T("Meslek ara", "Search careers")) + '"></label>' +
        '<select class="select" id="krTip" aria-label="' + esc(T("İlgi tipi", "Interest type")) + '"><option value="">' + esc(T("Tüm ilgi tipleri", "All types")) + "</option>" + ORDER.map((k) => '<option value="' + k + '">' + k + " · " + esc(tipName(k)) + "</option>").join("") + "</select>" +
        '<select class="select" id="krPt" aria-label="' + esc(T("Puan türü", "Score type")) + '"><option value="">' + esc(T("Tüm puan türleri", "All score types")) + "</option>" + ["SAY", "EA", "SÖZ", "DİL", "TYT"].map((x) => "<option>" + x + "</option>").join("") + "</select></div>" +
      '<div class="kr-jobs" id="krList"></div></div>';
    App.hydrateIcons(view);
    const paint = () => {
      const w = norm(F.q).split(" ").filter(Boolean);
      const items = MES().filter((m) => (!F.tip || m[2].indexOf(F.tip) >= 0) && (!F.pt || m[3] === F.pt) && w.every((x) => norm(m[1] + " " + m[4] + " " + m[7].join(" ")).indexOf(x) >= 0))
        .sort((a, b) => (pct ? fit(b, pct) - fit(a, pct) : 0) || a[1].localeCompare(b[1], "tr"));
      const el = view.querySelector("#krList");
      el.innerHTML = items.length ? items.map((m) => jobCard(m, pct)).join("") : App.ui.empty("search", T("Meslek bulunamadı", "No careers found"), T("Süzgeçleri değiştir.", "Change the filters."));
      App.hydrateIcons(el);
    };
    view.querySelector("#krQ").addEventListener("input", App.utils.debounce((e) => { F.q = e.target.value; paint(); }, 150));
    view.querySelector("#krTip").addEventListener("change", (e) => { F.tip = e.target.value; paint(); });
    view.querySelector("#krPt").addEventListener("change", (e) => { F.pt = e.target.value; paint(); });
    paint();
  }

  /** Program adı mesleğin anahtar kelimelerinden biriyle başlıyor ya da bir kelimesi onunla başlıyor mu */
  function matches(name, keys) {
    const n = " " + norm(name);
    return keys.some((k) => { const kk = norm(k); return n.indexOf(" " + kk) >= 0; });
  }

  async function job(view, id) {
    const m = MES().find((x) => x[0] === id);
    if (!m) { location.hash = "#/kariyer/meslekler"; return; }
    App.setTitle(m[1]);
    const st = state(), pct = st.done ? scores(st.ans).pct : null;
    view.innerHTML = '<div class="page page--narrow kr">' +
      '<nav class="crumbs"><a href="#/kariyer/meslekler">' + App.icon("chevronL") + esc(T("Meslekler", "Careers")) + "</a></nav>" +
      '<div class="kr-jobhead"><span class="kr-job__code kr-job__code--lg">' + m[2].split("").map((k) => '<i style="--c:' + TIP()[k].color + '" title="' + esc(tipName(k)) + '">' + k + "</i>").join("") + "</span><div><h1>" + esc(m[1]) + "</h1>" +
        '<p class="hint">' + esc(m[2].split("").map(tipName).join(" · ")) + " · " + esc(T("Puan türü: ", "Score type: ") + m[3]) + (pct ? " · " + esc(T("uyumun %" + fit(m, pct), fit(m, pct) + "% match")) : "") + "</p></div></div>" +
      '<section class="card kr-sec"><h2>' + App.icon("info") + esc(T("Ne yapar?", "What do they do?")) + "</h2><p>" + esc(m[4]) + "</p><h3>" + esc(T("Bir günü", "A typical day")) + "</h3><p>" + esc(m[5]) + "</p><h3>" + esc(T("Önemli beceriler", "Key skills")) + '</h3><div class="kr-skills">' + m[6].map((x) => "<span>" + esc(x) + "</span>").join("") + "</div></section>" +
      '<section class="card kr-sec" id="krProg"><h2>' + App.icon("grad") + esc(T("Hangi bölümler?", "Which programmes?")) + '</h2><div class="stage"><span class="spinner"></span><span>' + esc(T("2025 taban puanları yükleniyor…", "Loading 2025 cut-offs…")) + "</span></div></section>" +
      '<div class="kr-actions"><button type="button" class="btn btn--ai" id="krAsk">' + App.icon("sparkle") + esc(T("Bu mesleği asistana sor", "Ask the assistant about it")) + "</button></div></div>";
    App.hydrateIcons(view);
    view.querySelector("#krAsk").addEventListener("click", () => App.modules.assistant.startWith(T(
      "\"" + m[1] + "\" mesleğini bir lise öğrencisine anlat: hangi bölümlerden olunur, eğitim süreci nasıl, çalışma ortamı ve zorlukları neler, bu mesleğe uygun olup olmadığımı anlamak için kendime hangi soruları sormalıyım?",
      "Explain the career \"" + m[1] + "\" to a high-school student: which degrees, training, working conditions, challenges, and questions to ask myself."), null));
    const box = view.querySelector("#krProg");
    try {
      await App.tercih.loadData();
      if (!box.isConnected) return;
      const rows = App.tercih.rows().filter((r) => matches(r.name, m[7]) && r.rank);
      const est = (await App.tercih.estimates(await App.tercih.myState())).est;
      const CH = App.tercih.CH();
      rows.forEach((r) => { const e = est[r.t]; r.ch = e && e.rank ? App.tercih.chance(e.rank, r.rank) : null; });
      const hasEst = rows.some((r) => r.ch);
      const cnt = { safe: 0, fit: 0, reach: 0 }; rows.forEach((r) => { if (cnt[r.ch] != null) cnt[r.ch]++; });
      const shown = (hasEst ? rows.filter((r) => r.ch && r.ch !== "far").sort((a, b) => ["reach", "fit", "safe"].indexOf(a.ch) - ["reach", "fit", "safe"].indexOf(b.ch) || a.rank - b.rank) : rows.slice().sort((a, b) => a.rank - b.rank)).slice(0, 12);
      const kw = m[7][0];
      box.innerHTML = "<h2>" + App.icon("grad") + esc(T("Hangi bölümler?", "Which programmes?")) + "</h2>" +
        '<p class="hint">' + esc(T("İlgili lisans/ön lisans programları: ", "Related programmes: ") + m[7].join(", ") + T(" · 2025'te " + rows.length + " program", " · " + rows.length + " in 2025")) + "</p>" +
        (hasEst ? '<div class="tc-bands kr-bands">' + ["safe", "fit", "reach"].map((k) => '<div class="tc-band tc-band--' + k + '"><b>' + cnt[k] + "</b><span>" + esc(CH[k][0]) + "</span></div>").join("") + "</div>"
          : '<p class="hint">' + esc(T("Sıralama tahminin henüz yok: Deneme Takibi'ne deneme ekle ya da Tercih Robotu'nda puanını elle gir; o zaman sana uygun olanlar işaretlenir.", "No rank estimate yet: add exams or enter your score in the Programme Finder.")) + "</p>") +
        (shown.length ? '<ol class="kr-prog-list">' + shown.map((r) => "<li>" + (r.ch ? '<span class="tc-ch tc-ch--' + CH[r.ch][1] + '">' + esc(CH[r.ch][0]) + "</span>" : "") + "<b>" + esc(r.name) + "</b><small>" + esc(r.uni + " · " + r.city) + '</small><span class="kr-prog-num">' + esc(App.tercih.TYPES[r.t] + " · " + (r.score ? r.score.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) : "–") + " · " + r.rank.toLocaleString("tr-TR") + T(". sıra", " rank")) + "</span></li>").join("") + "</ol>"
          : '<p class="hint">' + esc(T("Sıralamana yakın program bulunamadı; tüm programlara Tercih Robotu'ndan bakabilirsin.", "No programmes near your rank; see all in the Programme Finder.")) + "</p>") +
        '<button type="button" class="btn btn--sm" id="krAll">' + App.icon("grad") + esc(T("Tercih Robotu'nda tümünü gör", "See all in the Programme Finder")) + "</button>";
      App.hydrateIcons(box);
      box.querySelector("#krAll").addEventListener("click", () => {
        const f = Object.assign({}, App.prefs.get("tercihFilter", {}) || {}, { q: kw, city: "", band: "", type: "" });
        App.prefs.set("tercihFilter", f); location.hash = "#/tercih/tum";
      });
    } catch (e) {
      if (box.isConnected) box.innerHTML = "<h2>" + App.icon("grad") + esc(T("Hangi bölümler?", "Which programmes?")) + '</h2><p class="hint">' + esc(T("Bölüm verisi yüklenemedi; Tercih Robotu'ndan arayabilirsin: ", "Could not load programme data; search in the Programme Finder: ") + m[7].join(", ")) + "</p>";
    }
  }

  function render(view, params) {
    App.setTitle(T("Kariyer Keşfi", "Career Explorer"));
    const p = params || [];
    if (p[0] === "test") return test(view);
    if (p[0] === "sonuc") return result(view);
    if (p[0] === "meslekler") return list(view);
    if (p[0] === "m" && p[1]) return job(view, p[1]);
    return home(view);
  }

  App.router.register("kariyer", render);
  App.kariyer = { scores, fit, matches, state, ORDER };
})();
