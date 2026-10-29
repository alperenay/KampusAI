/* =========================================================
   yazili.js — Yazılı Sınavlar · Türkiye Yüzyılı Maarif Modeli (v1.29)   #/yazili

   Lise 9–12 için açık uçlu yazılı sınavlar: her sınıf ve ders için dönem sınavları,
   her soruda bağlam, puan, beklenen cevap ve puanlama ölçütü (dereceli puanlama).
   Sınavlar Maarif Modeli'nin ortak yazılı sınav biçimine göre hazırlanmıştır:
   7 soru, açık uçlu / kısa cevaplı, bağlam temelli, toplam 100 puan.
     • Sınav modu: süre, cevap kutuları (taslak saklanır), bitirince cevap anahtarı
       ve ölçütle kendi puanını işaretleme; istersen yapay zekâ ölçüte göre puanlar.
     • Cevap anahtarı, yazdırma (öğretmen için anahtarlı / anahtarsız).
     • Yapay zekâyla seçilen temalardan yeni bir yazılı hazırlama (cihazda saklanır).
   Veri: js/data/yazili/<sınıf>-<ders>.js (yalnızca o ders açılınca yüklenir),
         js/data/yazili-index.js (sınav listesi; tools/build-yazili.mjs üretir).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const C = () => App.data.curriculum;
  let pendingGeneration = null;
  const writtenPending = new Map();
  const L = (x) => App.L(x);
  const md = (s) => App.markdown.render(String(s || ""));
  const mdi = (s) => md(s).trim().replace(/^<p>([\s\S]*)<\/p>$/, "$1");
  const GRADES = ["9", "10", "11", "12"];
  const SUBJ = ["matematik", "fizik", "kimya", "biyoloji", "edebiyat", "tarih", "cografya"];
  const SUBJ12 = { tarih: "inkilap" };           // 12. sınıfta tarih yerine T.C. İnkılap Tarihi
  const subjFor = (g, s) => (g === "12" && SUBJ12[s]) || s;
  App.data.yazili = App.data.yazili || {};

  /* ---------- veri yükleme ---------- */
  const loading = {};
  function loadScript(src) {
    return new Promise((res, rej) => { const sc = document.createElement("script"); sc.src = src; sc.onload = () => res(); sc.onerror = () => rej(new Error(src)); document.head.appendChild(sc); });
  }
  function loadIndex() {
    if (App.data.yaziliIndex) return Promise.resolve(App.data.yaziliIndex);
    return (loading._i = loading._i || loadScript("js/data/yazili-index.js").then(() => App.data.yaziliIndex || {}));
  }
  function loadSet(key) {
    if (App.data.yazili[key]) return Promise.resolve(App.data.yazili[key]);
    return (loading[key] = loading[key] || loadScript("js/data/yazili/" + key.replace("/", "-") + ".js").then(() => App.data.yazili[key] || { exams: [] }).catch(() => { delete loading[key]; return { exams: [] }; }));
  }
  async function aiExams(key) {
    try { const all = await App.db.getAll("meta"); return all.filter((r) => r.kind === "yazili-ai" && r.key === key).sort((a, b) => String(b.at).localeCompare(String(a.at))); } catch (e) { return []; }
  }
  async function results() {
    try { const all = await App.db.getAll("meta"); const out = {}; all.filter((r) => r.kind === "yazili-res").forEach((r) => { out[r.ref] = r; }); return out; } catch (e) { return {}; }
  }
  const subjName = (g, s) => { const gr = C().grades.find((x) => x.id === g); const sb = gr && gr.subjects.find((x) => x.id === s); return sb ? L(sb.name) : s; };
  const unitName = (g, s, u) => { const gr = C().grades.find((x) => x.id === g); const sb = gr && gr.subjects.find((x) => x.id === s); const un = sb && sb.units.find((x) => x.id === u); return un ? L(un.name).replace(/^\d+\.\s*(Tema|Ünite)\s*(\([A-Z]\))?:\s*/, "") : u; };
  const total = (ex) => ex.sorular.reduce((a, q) => a + (Number(q.puan) || 0), 0);
  const termName = (t) => T(t + ". Dönem", "Term " + t);

  /* ---------- 1) Ana sayfa: sınıf → ders ---------- */
  async function home(view) {
    App.setTitle(T("Yazılı Sınavlar", "Written Exams"));
    const idx = await loadIndex(), res = await results();
    let g = App.prefs.get("yzG", "9"); if (GRADES.indexOf(g) < 0) g = "9";
    const paint = () => {
      App.prefs.set("yzG", g);
      const cards = SUBJ.map((s0) => {
        const s = subjFor(g, s0), key = g + "/" + s, list = idx[key] || [];
        const done = list.filter((e) => res[key + "/" + e.id]);
        const best = done.length ? Math.round(done.reduce((a, e) => a + res[key + "/" + e.id].pct, 0) / done.length) : null;
        return '<a class="card yz-subj" href="#/yazili/' + g + "/" + s + '"><span class="yz-subj__ico">' + App.icon(ICON[s0] || "book") + '</span><span class="yz-subj__t"><b>' + esc(subjName(g, s)) + "</b><small>" +
          esc(T(list.length + " yazılı · " + list.reduce((a, e) => a + e.n, 0) + " soru", list.length + " exams")) + "</small></span>" +
          (best != null ? '<span class="yz-score" title="' + esc(T("Ortalama puanın", "Your average")) + '">' + best + "</span>" : '<span class="yz-go">' + App.icon("chevron") + "</span>") + "</a>";
      }).join("");
      view.querySelector("#yzGrid").innerHTML = cards;
      view.querySelectorAll("[data-g]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.g === g)));
      App.hydrateIcons(view.querySelector("#yzGrid"));
    };
    view.innerHTML = '<div class="page yz">' +
      '<div class="page-head"><div><h1>' + esc(T("Yazılı Sınavlar", "Written Exams")) + '</h1><p>' + esc(T("Türkiye Yüzyılı Maarif Modeli'ne uygun açık uçlu yazılılar: cevabını yaz, cevap anahtarı ve puanlama ölçütüyle kendini değerlendir.", "Open-ended written exams for the Türkiye Century Maarif Model: write your answers, then score them with the key and rubric.")) + "</p></div></div>" +
      '<div class="yz-seg yz-grades" role="radiogroup" aria-label="' + esc(T("Sınıf", "Grade")) + '">' + GRADES.map((x) => '<button type="button" role="radio" data-g="' + x + '">' + x + ". " + esc(T("Sınıf", "Grade")) + "</button>").join("") + "</div>" +
      '<div class="yz-grid" id="yzGrid"></div>' +
      '<details class="card yz-about"><summary>' + App.icon("info") + esc(T("Maarif Modeli'nde yazılı sınavlar nasıl?", "How do written exams work in the Maarif Model?")) + "</summary><div class=\"md\">" + md(T(ABOUT_TR, ABOUT_EN)) + "</div></details>" +
      "</div>";
    App.hydrateIcons(view);
    view.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => { g = b.dataset.g; paint(); }));
    paint();
  }
  const ICON = { matematik: "sMath", fizik: "sPhys", kimya: "sChem", biyoloji: "sBio", edebiyat: "sLit", tarih: "sHist", cografya: "sGeo" };
  const ABOUT_TR = "- **Açık uçlu:** Cevabı seçmezsin, yazarsın. Bir ortak yazılıda genellikle **7 soru** olur; açık uçlu ya da kısa cevaplı.\n" +
    "- **Bağlam temelli:** Sorular gerçek yaşamdan bir durumla başlar; ezber yerine yorumlama, gerekçelendirme ve problem çözme ölçülür.\n" +
    "- **Puanlama ölçütü:** Her sorunun tam, kısmi ve sıfır puan ölçütleri vardır (dereceli puanlama). Gerekçe yazmadan verilen doğru sonuç tam puan almayabilir.\n" +
    "- **Beceriler:** Her soru bir alan becerisine (ör. matematiksel muhakeme, bilimsel sorgulama, tarihsel empati, mekânsal düşünme) dayanır.\n" +
    "- Buradaki sınavlar Maarif Modeli öğretim programlarının temalarına ve öğrenme çıktılarına göre **örnek** olarak hazırlanmıştır; okulunuzdaki sınavın kapsamını öğretmeninizin duyurduğu sınav senaryosundan kontrol edin. 12. sınıf, 2026–2027'de hâlâ 2018 programıyla okutulduğu için onun soruları o programa göredir.";
  const ABOUT_EN = "- **Open-ended:** you write the answer. A common exam usually has **7 questions**, open-ended or short-answer.\n- **Context-based:** questions start from a real situation and measure reasoning, not memorization.\n- **Rubric:** each question has full, partial and zero-credit criteria.\n- These are **sample** exams aligned with the Maarif Model themes and learning outcomes.";

  /* ---------- 2) Ders sayfası: sınav listesi ---------- */
  async function subjectPage(view, g, s) {
    const key = g + "/" + s;
    App.setTitle(subjName(g, s) + " · " + T("Yazılı", "Written"));
    view.innerHTML = '<div class="page yz"><p class="hint">' + esc(T("Yükleniyor…", "Loading…")) + "</p></div>";
    const [set, ai, res] = await Promise.all([loadSet(key), aiExams(key), results()]);
    if (!view.isConnected) return;
    const card = (e, isAi) => {
      const r = res[key + "/" + e.id];
      const units = Array.from(new Set(e.sorular.map((q) => q.tema))).map((u) => unitName(g, s, u));
      return '<article class="card yz-exam">' +
        '<div class="yz-exam__head"><span class="yz-badge">' + esc(isAi ? T("Yapay zekâ", "AI") : termName(e.term)) + "</span><b>" + esc(e.title) + "</b>" + (r ? '<span class="yz-score">' + r.pct + "</span>" : "") + "</div>" +
        '<p class="hint">' + esc(e.sorular.length + " " + T("soru", "questions") + " · " + total(e) + " " + T("puan", "points") + " · " + (e.sure || 40) + " " + T("dk", "min")) + "</p>" +
        '<p class="yz-exam__units">' + units.map((u) => '<span class="chip">' + esc(u) + "</span>").join("") + "</p>" +
        '<div class="yz-exam__acts"><a class="btn btn--primary btn--sm" href="#/yazili/' + key + "/" + e.id + '">' + App.icon("pen") + esc(T("Sınava başla", "Start")) + "</a>" +
        '<a class="btn btn--sm" href="#/yazili/' + key + "/" + e.id + '/anahtar">' + App.icon("eye") + esc(T("Cevap anahtarı", "Answer key")) + "</a>" +
        (isAi ? '<button type="button" class="btn btn--sm btn--ghost" data-del="' + esc(e.id) + '" aria-label="' + esc(T("Sil", "Delete")) + '">' + App.icon("trash") + "</button>" : "") + "</div></article>";
    };
    const gr = C().grades.find((x) => x.id === g), sb = gr && gr.subjects.find((x) => x.id === s);
    view.innerHTML = '<div class="page yz"><nav class="crumbs"><a href="#/yazili">' + App.icon("chevronL") + esc(T("Yazılı Sınavlar", "Written Exams")) + "</a></nav>" +
      '<div class="page-head"><div><h1>' + esc(C().gradeName(gr) + " · " + subjName(g, s)) + '</h1><p>' + esc(T("Dönem sınavlarını çöz, cevaplarını puanlama ölçütüyle değerlendir.", "Solve the term exams and score yourself with the rubric.")) + "</p></div></div>" +
      ['1', '2'].map((t) => { const list = set.exams.filter((e) => String(e.term) === t); return list.length ? '<h2 class="section-title">' + esc(termName(t)) + '</h2><div class="yz-exams">' + list.map((e) => card(e)).join("") + "</div>" : ""; }).join("") +
      (ai.length ? '<h2 class="section-title">' + esc(T("Senin için hazırlananlar", "Made for you")) + '</h2><div class="yz-exams">' + ai.map((e) => card(e.exam, true)).join("") + "</div>" : "") +
      '<section class="card yz-gen"><div class="card__title">' + App.icon("sparkle") + esc(T("Yapay zekâyla yeni yazılı hazırla", "Generate a new exam with AI")) + '</div><p class="hint">' + esc(T("Temaları seç; Maarif Modeli biçiminde 7 soruluk, cevap anahtarlı ve puanlama ölçütlü bir yazılı hazırlanır.", "Pick themes; a 7-question exam with key and rubric is generated.")) + "</p>" +
        '<div class="yz-gen__units">' + ((sb && sb.units) || []).map((u) => '<label class="check-row"><input type="checkbox" value="' + esc(u.id) + '"> ' + esc(L(u.name)) + "</label>").join("") + "</div>" +
        '<button type="button" class="btn btn--primary btn--sm" id="yzGen">' + App.icon("sparkle") + esc(T("Hazırla", "Generate")) + '</button><p class="hint" id="yzGenSt" aria-live="polite"></p></section></div>';
    App.hydrateIcons(view);
    view.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", async () => {
      if (!(await App.ui.confirm(T("Bu yazılı silinsin mi?", "Delete this exam?"), T("Sil", "Delete")))) return;
      await App.db.remove("meta", "yazili-ai:" + key + "/" + b.dataset.del).catch(() => {}); subjectPage(view, g, s);
    }));
    const pageHash = location.hash;
    view.querySelector("#yzGen").addEventListener("click", async () => {
      const units = Array.from(view.querySelectorAll(".yz-gen__units input:checked")).map((x) => x.value);
      const stEl = view.querySelector("#yzGenSt"), btn = view.querySelector("#yzGen");
      if (!units.length) { stEl.textContent = T("En az bir tema seç.", "Pick at least one theme."); return; }
      if (pendingGeneration) pendingGeneration.abort();
      const ctrl = new AbortController(); pendingGeneration = ctrl;
      const stop = App.generation.guard(ctrl), gen = App.generation.mount(stEl, 7, () => ctrl.abort());
      btn.disabled = true;
      try {
        const ex = await generate(g, s, units, set, { signal: ctrl.signal, onDelta: () => gen.stream(), onProgress: (info) => gen.update(info) });
        if (ctrl.signal.aborted || pageHash !== location.hash) return;
        await App.db.put("meta", { id: "yazili-ai:" + key + "/" + ex.id, kind: "yazili-ai", key, exam: ex, at: new Date().toISOString() });
        if (pageHash === location.hash) App.router.go("yazili/" + key + "/" + ex.id);
      } catch (e) { if (pageHash === location.hash) stEl.textContent = T("Hazırlanamadı: ", "Failed: ") + e.message; }
      finally { stop(); btn.disabled = false; if (pendingGeneration === ctrl) pendingGeneration = null; }
    });
  }

  /* ---------- yapay zekâyla yazılı üretme ---------- */
  async function generate(g, s, units, set, options) {
    options = options || {};
    const gr = C().grades.find((x) => x.id === g), sb = gr && gr.subjects.find((x) => x.id === s);
    const chosen = sb && sb.units.filter((u) => units.includes(u.id));
    if (!chosen || !chosen.length) throw new Error(T("Tema seçilmeli", "Select a theme"));
    const cacheKey = JSON.stringify([g, s, units.slice().sort(), App.i18n.lang]);
    const cached = writtenPending.get(cacheKey), qs = cached && Date.now() - cached.at < 600000 ? cached.questions.slice() : [];
    const models = new Set(cached && qs.length ? cached.models : []), points = [15, 15, 15, 15, 15, 15, 10];
    if (qs.length && options.onProgress) options.onProgress({ ready: qs.length, total: 7, questions: qs.slice() });
    for (let stage = qs.length === 5 ? 2 : qs.length === 3 ? 1 : 0; stage < 3; stage++) {
      const count = [3, 2, 2][stage];
      let batch = [];
      const allocated = Array.from({ length: count }, (_, i) => chosen[(qs.length + i) % chosen.length]);
      for (let attempt = 0; attempt < 2; attempt++) {
        if (options.signal && options.signal.aborted) throw new Error("aborted");
        const prompt = g + " · " + L(sb.name) + "\n" + [...new Map(allocated.map(u=>[u.id,u])).values()].map((u) => u.id + ": " + L(u.name) + " · " + u.outcomes.map((o) => L(o.title)).join("; ").slice(0, 600)).join("\n") +
          "\n" + T("TAM ", "Exactly ") + count + T(" benzersiz açık uçlu, bağlam temelli soru. Kısa cevap anahtarı ve tam/kısmi/sıfır ölçütü. LaTeX JSON kaçışlarını koru. ", " unique open-ended contextual questions. Concise answer keys and full/partial/zero rubrics. Escape LaTeX for JSON. ") +
          '{"sorular":[{"tema":"' + allocated[0].id + '","beceri":"...","puan":15,"metin":"...","cevap":"...","olcut":[[15,"..."],[8,"..."],[0,"..."]]}]}' +
          (qs.length ? "\n" + T("Tekrarlama: ", "Do not repeat: ") + qs.map((q) => q.metin.slice(0, 100)).join(" | ") : "");
        const select = items => {
          const seen = new Set(qs.map(q=>q.metin.trim().toLocaleLowerCase()));
          return (Array.isArray(items)?items:[]).filter(q=>q && typeof q.metin==='string' && q.metin.trim() && q.metin.length<=3000 && typeof q.cevap==='string' && q.cevap.trim() && q.cevap.length<=3000 && Array.isArray(q.olcut) && q.olcut.length===3 && q.olcut.every(x=>Array.isArray(x)&&typeof x[0]==='number'&&Number.isFinite(x[0])&&typeof x[1]==='string'&&x[1].trim())).filter(q=>{
            const key=q.metin.trim().toLocaleLowerCase();if(seen.has(key))return false;seen.add(key);return true;
          }).slice(0,count);
        };
        const r = await App.ai.generate({
          system: T("Lise öğretmeni. Yalnız geçerli JSON.", "High-school teacher. Valid JSON only."), prompt,
          temperature: 0.45, maxTokens: count*1200, signal: options.signal, onDelta: options.onDelta, arrayKey:'sorular',
          onPreview: items=>{
            if(options.signal?.aborted || !options.onProgress)return;
            const preview=qs.concat(select(items));options.onProgress({ready:preview.length,total:7,questions:preview,provisional:true});
          }
        });
        models.add(r.model);
        batch = select(r.data && r.data.sorular);
        if (batch.length === count) break;
      }
      if (batch.length !== count) throw new Error(T("Eksik soru üretildi; yeniden dene.", "Incomplete questions; retry."));
      batch.forEach((q, i) => {
        const puan = points[qs.length], levels = Array.isArray(q.olcut) ? q.olcut : [];
        const descriptions = levels.filter((x) => Array.isArray(x) && typeof x[1] === "string").map((x) => x[1]);
        qs.push({ tema: allocated[i].id, beceri: String(q.beceri || ""), puan, metin: q.metin.trim(), cevap: q.cevap.trim(),
          olcut: [[puan, descriptions[0] || T("Beklenen cevabın tamamı", "Full answer")], [Math.round(puan / 2), descriptions[1] || T("Kısmen doğru", "Partly correct")], [0, descriptions[2] || T("Yanlış veya boş", "Wrong or blank")]] });
      });
      if (writtenPending.size >= 8) writtenPending.delete(writtenPending.keys().next().value);
      writtenPending.set(cacheKey, { at: Date.now(), questions: qs.slice(), models: Array.from(models) });
      if (options.onProgress) options.onProgress({ ready: qs.length, total: 7, questions: qs.slice() });
    }
    writtenPending.delete(cacheKey);
    return { id: "ai" + Date.now().toString(36), term: 0, title: T("Yapay zekâ yazılısı · ", "AI exam · ") + chosen.map((u) => unitName(g, s, u.id)).join(", "), sure: 40, sorular: qs, model: Array.from(models).join(" + ") };
  }

  /* ---------- 3) Sınav ---------- */
  async function examPage(view, g, s, id, keyMode) {
    const key = g + "/" + s;
    const set = await loadSet(key);
    let ex = set.exams.find((e) => e.id === id);
    if (!ex) { const ai = await aiExams(key); const r = ai.find((x) => x.exam.id === id); ex = r && r.exam; }
    if (!view.isConnected) return;
    if (!ex) { view.innerHTML = '<div class="page">' + App.ui.empty("info", T("Sınav bulunamadı.", "Exam not found."), "") + "</div>"; return; }
    const ref = key + "/" + ex.id, draftKey = "yzDraft:" + ref;
    let draft = {}; try { draft = JSON.parse(localStorage.getItem("da:" + draftKey) || "{}") || {}; } catch (e) { draft = {}; }
    const saveDraft = () => { try { localStorage.setItem("da:" + draftKey, JSON.stringify(draft)); } catch (e) { /* yok */ } };
    const st = { phase: keyMode ? "key" : "write", scores: {}, ai: {} };
    const prev = (await results())[ref];
    App.setTitle(ex.title);
    const head = '<nav class="crumbs no-print"><a href="#/yazili/' + key + '">' + App.icon("chevronL") + esc(subjName(g, s)) + "</a></nav>" +
      '<div class="yz-paper__head"><div><h1>' + esc(ex.title) + '</h1><p class="hint">' + esc(C().gradeName(C().grades.find((x) => x.id === g)) + " · " + subjName(g, s) + " · " + ex.sorular.length + " " + T("soru", "questions") + " · " + total(ex) + " " + T("puan", "points") + " · " + (ex.sure || 40) + " " + T("dakika", "minutes")) + "</p></div>" +
      '<div class="yz-paper__acts no-print"><span class="yz-timer" id="yzTimer" hidden></span>' +
      '<button type="button" class="btn btn--sm" id="yzPrint">' + App.icon("download") + esc(T("Yazdır / PDF", "Print / PDF")) + "</button></div></div>";
    const qHtml = (q, i) => {
      const sc = st.scores[i], showKey = st.phase !== "write";
      return '<section class="card yz-q" data-i="' + i + '"><div class="yz-q__head"><span class="yz-q__n">' + (i + 1) + '</span><span class="chip">' + esc(unitName(g, s, q.tema)) + "</span>" + (q.beceri ? '<span class="chip chip--soft">' + esc(q.beceri) + "</span>" : "") + '<span class="yz-q__p">' + q.puan + " " + T("puan", "pts") + "</span></div>" +
        '<div class="md yz-q__body">' + md(q.metin) + "</div>" +
        (st.phase === "key" ? "" : '<label class="yz-ans"><span class="sr-only">' + esc(T("Cevabın", "Your answer")) + '</span><textarea class="input" rows="4" data-a="' + i + '" placeholder="' + esc(T("Cevabını buraya yaz… (kâğıtta çözdüysen boş bırakabilirsin)", "Write your answer… (leave blank if you solved on paper)")) + '"' + (st.phase === "score" ? " readonly" : "") + ">" + esc(draft[i] || "") + "</textarea></label>") +
        (showKey ? '<div class="yz-key"><div class="yz-key__t">' + App.icon("checkCircle") + esc(T("Beklenen cevap", "Expected answer")) + '</div><div class="md">' + md(q.cevap) + "</div>" +
          '<div class="yz-rub"><div class="yz-key__t">' + App.icon("list") + esc(T("Puanlama ölçütü", "Rubric")) + "</div>" +
          q.olcut.map(([p, d], k) => st.phase === "score"
            ? '<label class="yz-rub__row"><input type="radio" name="r' + i + '" value="' + p + '"' + (sc === p ? " checked" : "") + '><b>' + p + "</b><span>" + mdi(d) + "</span></label>"
            : '<div class="yz-rub__row"><b>' + p + "</b><span>" + mdi(d) + "</span></div>").join("") + "</div>" +
          (st.ai[i] ? '<p class="yz-aifb">' + App.icon("sparkle") + esc(st.ai[i]) + "</p>" : "") + "</div>" : "") + "</section>";
    };
    const sumScore = () => Object.keys(st.scores).reduce((a, k) => a + (Number(st.scores[k]) || 0), 0);
    const paint = () => {
      const foot = st.phase === "write"
        ? '<div class="yz-foot no-print"><button type="button" class="btn btn--primary" id="yzDone">' + App.icon("check") + esc(T("Sınavı bitir, cevap anahtarını göster", "Finish and show the key")) + "</button>" + (prev ? '<span class="hint">' + esc(T("Önceki puanın: ", "Previous score: ") + prev.pct) + "</span>" : "") + "</div>"
        : st.phase === "score"
          ? '<div class="yz-foot yz-foot--sticky no-print"><b id="yzSum">' + sumScore() + " / " + total(ex) + '</b><button type="button" class="btn btn--sm" id="yzAI">' + App.icon("sparkle") + esc(T("Yapay zekâ puanlasın", "AI scoring")) + '</button><button type="button" class="btn btn--primary btn--sm" id="yzSave">' + App.icon("check") + esc(T("Puanı kaydet", "Save score")) + '</button><span class="hint" id="yzSt" aria-live="polite"></span></div>'
          : '<div class="yz-foot no-print"><a class="btn btn--primary" href="#/yazili/' + ref + '">' + App.icon("pen") + esc(T("Bu sınavı çöz", "Take this exam")) + "</a></div>";
      view.innerHTML = '<div class="page yz yz-paper' + (st.phase === "key" ? " is-key" : "") + '">' + head +
        (st.phase === "score" ? '<p class="card yz-tip">' + esc(T("Her sorunun cevabını ölçütle karşılaştır ve hak ettiğin puanı işaretle. Emin değilsen bir alt düzeyi seç.", "Compare each answer with the rubric and mark your score.")) + "</p>" : "") +
        ex.sorular.map(qHtml).join("") + foot + "</div>";
      App.hydrateIcons(view); bind();
    };
    let timer = null;
    const startTimer = () => {
      const el = view.querySelector("#yzTimer"); if (!el || st.phase !== "write") return;
      const t0 = Number(sessionStorage.getItem("da:" + draftKey + ":t0")) || Date.now(); try { sessionStorage.setItem("da:" + draftKey + ":t0", String(t0)); } catch (e) { /* yok */ }
      const lim = (ex.sure || 40) * 60;
      const tick = () => { if (!el.isConnected) { clearInterval(timer); return; } const left = lim - Math.floor((Date.now() - t0) / 1000); el.hidden = false; el.classList.toggle("is-late", left < 0);
        const a = Math.abs(left); el.textContent = (left < 0 ? "+" : "") + Math.floor(a / 60) + ":" + String(a % 60).padStart(2, "0"); };
      tick(); clearInterval(timer); timer = setInterval(tick, 1000);
    };
    function bind() {
      view.querySelector("#yzPrint").addEventListener("click", () => window.print());
      view.querySelectorAll("textarea[data-a]").forEach((ta) => ta.addEventListener("input", () => { draft[ta.dataset.a] = ta.value; saveDraft(); }));
      const done = view.querySelector("#yzDone");
      if (done) done.addEventListener("click", () => { st.phase = "score"; clearInterval(timer); try { sessionStorage.removeItem("da:" + draftKey + ":t0"); } catch (e) { /* yok */ } paint(); window.scrollTo(0, 0); const v = document.querySelector("#view"); if (v) v.scrollTop = 0; });
      view.querySelectorAll(".yz-rub__row input").forEach((r) => r.addEventListener("change", () => { st.scores[r.name.slice(1)] = Number(r.value); const el = view.querySelector("#yzSum"); if (el) el.textContent = sumScore() + " / " + total(ex); }));
      const sv = view.querySelector("#yzSave");
      if (sv) sv.addEventListener("click", async () => {
        const n = Object.keys(st.scores).length;
        if (n < ex.sorular.length && !(await App.ui.confirm(T("Puanlamadığın " + (ex.sorular.length - n) + " soru 0 sayılacak. Kaydedilsin mi?", "Unscored questions count as 0. Save?"), T("Kaydet", "Save")))) return;
        const pct = Math.round((sumScore() * 100) / total(ex));
        await App.db.put("meta", { id: "yazili-res:" + ref, kind: "yazili-res", ref, score: sumScore(), max: total(ex), pct, scores: st.scores, at: new Date().toISOString() });
        App.ui.toast(T("Kaydedildi: ", "Saved: ") + pct + " / 100");
        try { localStorage.removeItem("da:" + draftKey); } catch (e) { /* yok */ }
        App.router.go("yazili/" + key);
      });
      const aiB = view.querySelector("#yzAI");
      if (aiB) aiB.addEventListener("click", async () => {
        const stEl = view.querySelector("#yzSt");
        const items = ex.sorular.map((q, i) => ({ i, q })).filter((x) => (draft[x.i] || "").trim());
        if (!items.length) { stEl.textContent = T("Puanlanacak yazılı cevap yok (cevap kutuları boş).", "No written answers to score."); return; }
        aiB.disabled = true; stEl.textContent = T("Puanlanıyor…", "Scoring…");
        try {
          const prompt = "Bir lise öğrencisinin yazılı sınav cevaplarını, verilen puanlama ölçütüne göre puanla. Ölçütteki puan düzeylerinden birini seç; cömert ya da sert olma, ölçüte sadık kal. Her soru için 1-2 cümlelik, öğrenciye hitap eden yapıcı geri bildirim yaz.\n\n" +
            items.map(({ i, q }) => "SORU " + (i + 1) + " (" + q.puan + " puan):\n" + q.metin + "\nBEKLENEN CEVAP:\n" + q.cevap + "\nÖLÇÜT:\n" + q.olcut.map(([p, d]) => p + " puan: " + d).join("\n") + "\nÖĞRENCİNİN CEVABI:\n" + String(draft[i]).slice(0, 2500)).join("\n\n---\n\n") +
            '\n\nBiçim: {"puanlar":[{"soru":1,"puan":10,"geri":"…"}]}';
          const r = await App.ai.generate({ system: "Sen adil ve dikkatli bir lise öğretmenisin. Yalnızca geçerli JSON döndür.", prompt, temperature: 0.2 });
          (r.data && r.data.puanlar || []).forEach((x) => {
            const i = Number(x.soru) - 1, q = ex.sorular[i]; if (!q) return;
            const p = Number(x.puan) || 0, lv = q.olcut.map((o) => o[0]).reduce((b, v) => (Math.abs(v - p) < Math.abs(b - p) ? v : b), q.olcut[0][0]);
            st.scores[i] = lv; st.ai[i] = String(x.geri || "");
          });
          paint(); const s2 = view.querySelector("#yzSt"); if (s2) s2.textContent = T("Yapay zekâ önerisi işaretlendi; istersen değiştir.", "AI suggestion marked; you can change it.");
        } catch (e) { stEl.textContent = T("Puanlanamadı: ", "Failed: ") + ((e && e.message) || e); aiB.disabled = false; }
      });
      startTimer();
    }
    paint();
    return () => clearInterval(timer);
  }

  function render(view, params) {
    const p = (params || []).filter(Boolean);
    if (p.length >= 3) return examPage(view, p[0], p[1], p[2], p[3] === "anahtar");
    if (p.length === 2) return subjectPage(view, p[0], p[1]);
    return home(view);
  }
  App.router.register("yazili", render);
  App.yazili = { loadIndex, loadSet, generate, GRADES, SUBJ, subjFor };
})();
