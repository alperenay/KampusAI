/* =========================================================
   lessons.js — yapay zekâyla hazırlanan konu içeriği

   Hazır içeriği olmayan dersler için:
     1) Konu listesi: dersin üniteleri ve kazanımları   (kayıt: "syl:<sınıf>/<ders>")
     2) Konu anlatımı: anlatım, çözümlü örnekler, hap bilgiler (kayıt: "les:<sınıf>/<ders>/<ünite>/<kazanım>")
   Kayıtlar IndexedDB "lessons" deposunda tutulur, cihazlar arasında eşitlenir ve
   açılışta müfredat ağacına (App.data.curriculum) eklenir. Böylece konu sonu testi,
   Feynman modu ve asistanın hafızası bu içerikleri de kullanır.
   Hazır (elle yazılmış) içerik hiçbir zaman değiştirilmez.
   ========================================================= */
(function () {
  const t = App.t, L = App.L;
  const C = () => App.data.curriculum;
  const SYL = "syl:", LES = "les:";
  const inflight = new Map();

  // Hazır içerikleri işaretle (yapay zekâ bunların üzerine yazmaz)
  C().grades.forEach((g) => g.subjects.forEach((s) => {
    if (s.units.length) s.curated = true;
    s.units.forEach((u) => u.outcomes.forEach((o) => { if (o.content) o.curatedContent = true; }));
  }));

  const plain = (s) => String(s == null ? "" : s).trim();

  /* ---------------- Müfredata uygula ---------------- */
  function reset() {
    C().grades.forEach((g) => g.subjects.forEach((s) => {
      if (!s.curated) { s.units = []; delete s.ai; }
      s.units.forEach((u) => u.outcomes.forEach((o) => { if (!o.curatedContent) { delete o.content; delete o.ai; } }));
    }));
  }

  function apply(rows) {
    rows.filter((r) => r.id.indexOf(SYL) === 0).forEach((r) => {
      const [g, sid] = r.id.slice(SYL.length).split("/");
      const s = C().findSubject(g, sid);
      if (!s || s.curated || !Array.isArray(r.units)) return;
      s.units = r.units.map((u) => ({ id: u.id, name: u.name, outcomes: (u.outcomes || []).map((o) => ({ id: o.id, title: o.title, code: o.code || "" })) }));
      s.ai = { model: r.model, date: r.date, lang: r.lang };
    });
    rows.filter((r) => r.id.indexOf(LES) === 0).forEach((r) => {
      const f = find(r.id.slice(LES.length));
      if (!f || f.outcome.curatedContent || !r.content) return;
      f.outcome.content = r.content;
      f.outcome.ai = { model: r.model, date: r.date, lang: r.lang };
    });
  }

  function find(key) {
    const [g, sid, uid, kid] = String(key).split("/");
    const grade = C().findGrade(g), subject = C().findSubject(g, sid);
    const unit = subject && subject.units.find((u) => u.id === uid);
    const outcome = unit && unit.outcomes.find((o) => o.id === kid);
    return outcome ? { grade, subject, unit, outcome } : null;
  }

  async function load() {
    let rows = [];
    try { rows = await App.db.getAll("lessons"); } catch (e) { /* depo yok */ }
    reset();
    apply(rows);
  }

  /* ---------------- Konu listesi ---------------- */
  function syllabusPrompt(grade, subject) {
    const tr = App.i18n.lang === "tr";
    const name = L(subject.name), gname = C().gradeName(grade);
    const system = tr
      ? "Sen Türkiye'deki lise öğretim programlarını ve YKS konularını çok iyi bilen deneyimli bir öğretmensin. Yalnızca geçerli JSON döndür."
      : "You are an experienced teacher who knows Turkey's high-school curricula and YKS topics very well. Return only valid JSON.";
    const rules = tr ? [
      gname + " " + name + " dersi için Millî Eğitim Bakanlığı ortaöğretim öğretim programına uygun ünite ve kazanım listesini çıkar.",
      "- 4–10 ünite olsun; her ünitede 3–10 kazanım.",
      "- Kazanım başlıkları kısa ve net olsun; her biri bir ders saatinde çalışılabilecek büyüklükte (ör. \"Mol kavramını açıklar ve mol hesaplamaları yapar\").",
      "- Üniteler dersin işleniş sırasına göre dizilsin. YKS'de (TYT/AYT) çıkan konuları atlama.",
      "- Bu sınıf düzeyinde olmayan konuyu ekleme; emin olmadığın konu uydurma.",
      "- Kazanım kodunu biliyorsan \"code\" alanına yaz (ör. \"KİM.9.1.1\"), bilmiyorsan boş bırak.",
      "Biçim: {\"units\":[{\"name\":\"Ünite adı\",\"outcomes\":[{\"title\":\"Kazanım\",\"code\":\"\"}]}]}"
    ] : [
      "List the units and learning outcomes of the Turkish Ministry of Education high-school curriculum for " + name + ", " + gname + ". Write the titles in English.",
      "- 4–10 units, 3–10 outcomes each.",
      "- Short, clear outcome titles, each the size of one lesson.",
      "- Order units as they are taught. Don't skip topics that appear in YKS (TYT/AYT).",
      "- Don't add topics from other grade levels; don't invent topics you're unsure about.",
      "- Put the outcome code in \"code\" if you know it, otherwise leave it empty.",
      "Format: {\"units\":[{\"name\":\"Unit\",\"outcomes\":[{\"title\":\"Outcome\",\"code\":\"\"}]}]}"
    ];
    return { system, prompt: rules.join("\n") };
  }

  function normalizeSyllabus(d) {
    const units = (d && (d.units || d.uniteler)) || [];
    const out = [];
    (Array.isArray(units) ? units : []).slice(0, 14).forEach((u) => {
      const name = plain(u && (u.name || u.ad || u.title)).slice(0, 140);
      const outs = ((u && (u.outcomes || u.kazanimlar)) || []).map((o) => (typeof o === "string" ? { title: o } : o || {}))
        .map((o) => ({ title: plain(o.title || o.kazanim || o.ad).slice(0, 220), code: plain(o.code || o.kod).slice(0, 30) }))
        .filter((o) => o.title).slice(0, 14);
      if (name && outs.length) out.push({ id: "u" + (out.length + 1), name, outcomes: outs.map((o, j) => ({ id: "k" + (j + 1), title: o.title, code: o.code })) });
    });
    if (out.length < 2) throw new Error("json");
    return out;
  }

  async function generateSyllabus(gradeId, subjectId, opts) {
    opts = opts || {};
    const key = SYL + gradeId + "/" + subjectId;
    if (inflight.has(key)) return inflight.get(key);
    const job = (async () => {
      const grade = C().findGrade(gradeId), subject = C().findSubject(gradeId, subjectId);
      if (!subject || subject.curated) throw new Error("curated");
      const pr = syllabusPrompt(grade, subject);
      let res, units;
      try { res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.3, signal: opts.signal, onStage: opts.onStage })); units = normalizeSyllabus(res.data); }
      catch (e) {
        if (opts.signal && opts.signal.aborted) throw e;
        if (!(e instanceof SyntaxError || (e && e.message === "json"))) throw e;
        res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.2, signal: opts.signal })); units = normalizeSyllabus(res.data);
      }
      const rec = { id: key, units, lang: App.i18n.lang, model: res.model, date: new Date().toISOString() };
      await App.db.put("lessons", rec);
      await load();
      return rec;
    })();
    inflight.set(key, job);
    try { return await job; } finally { inflight.delete(key); }
  }

  /* ---------------- Konu anlatımı ---------------- */
  function lessonPrompt(f) {
    const tr = App.i18n.lang === "tr";
    const siblings = f.unit.outcomes.filter((o) => o !== f.outcome).map((o) => "- " + L(o.title)).join("\n");
    const system = tr
      ? "Sen YKS'ye hazırlanan lise öğrencilerine konu anlatan, bilgisi doğru ve anlatımı sade deneyimli bir öğretmensin. Yalnızca geçerli JSON döndür."
      : "You are an experienced teacher who explains topics clearly and accurately to high-school students preparing for YKS. Return only valid JSON.";
    const head = (tr ? "Sınıf: " : "Grade: ") + f.grade.id + "\n" + (tr ? "Ders: " : "Subject: ") + L(f.subject.name) + "\n" +
      (tr ? "Ünite: " : "Unit: ") + L(f.unit.name) + "\n" + (tr ? "Kazanım: " : "Learning outcome: ") + L(f.outcome.title) + (f.outcome.code ? " (" + f.outcome.code + ")" : "") +
      (siblings ? "\n" + (tr ? "Aynı ünitedeki diğer kazanımlar (bunları ayrıntılı anlatma):\n" : "Other outcomes in this unit (don't cover them in detail):\n") + siblings : "");
    const rules = tr ? [
      "Bu kazanım için ders kitabı kalitesinde bir konu anlatımı hazırla. Türkçe yaz, öğrenciye \"sen\" diye hitap etme, açık ve öğretici ol.",
      "- anlatim: Markdown. 350–700 kelime. \"### \" ile alt başlıklar, madde listeleri, gerekirse tablo. Tanımlar, temel kurallar ve formüller, sık yapılan hatalar ve konunun YKS'de nasıl sorulduğu.",
      "- Matematik ve fen ifadelerini LaTeX ile yaz: satır içinde $...$, ayrı satırda $$...$$. Kimyasal formüllerde \\ce kullanma, $H_2SO_4$ gibi yaz.",
      "- ornekler: kolaydan zora TAM 3 çözümlü örnek. \"soru\" alanında soru (çoktan seçmeliyse şıklar soru metninde A) … E) biçiminde), \"cozum\" alanında adım adım çözüm ve doğru cevap.",
      "- ozet: 5–8 maddelik, sınav öncesi göz atılacak kısa hap bilgiler.",
      "- Bilgiler doğru ve ders kitaplarıyla uyumlu olsun; emin olmadığın bilgiyi, tarihi ya da sayıyı yazma.",
      "- JSON içinde ters bölüleri çift yaz (\\\\frac gibi), satır sonları için \\n kullan.",
      "Biçim: {\"anlatim\":\"…\",\"ornekler\":[{\"soru\":\"…\",\"cozum\":\"…\"}],\"ozet\":[\"…\"]}"
    ] : [
      "Write a textbook-quality lesson for this learning outcome, in English. Be clear and instructive.",
      "- anlatim: Markdown, 350–700 words, \"### \" subheadings, lists, tables if useful. Definitions, key rules and formulas, common mistakes, and how the topic appears in YKS.",
      "- Write math and science in LaTeX ($...$, $$...$$). Don't use \\ce for chemistry; write $H_2SO_4$.",
      "- ornekler: EXACTLY 3 worked examples from easy to hard: \"soru\" (options A) … E) inside the text if multiple choice) and \"cozum\" (step-by-step solution and answer).",
      "- ozet: 5–8 short key points for quick review.",
      "- Be accurate; don't write facts, dates or numbers you're unsure of.",
      "- Escape backslashes in JSON (\\\\frac), use \\n for newlines.",
      "Format: {\"anlatim\":\"…\",\"ornekler\":[{\"soru\":\"…\",\"cozum\":\"…\"}],\"ozet\":[\"…\"]}"
    ];
    return { system, prompt: head + "\n\n" + rules.join("\n") };
  }

  function normalizeLesson(d) {
    if (!d || typeof d !== "object") throw new Error("json");
    const anlatim = plain(d.anlatim || d.lesson || d.content);
    if (anlatim.length < 150) throw new Error("json");
    const ornekler = (Array.isArray(d.ornekler || d.examples) ? (d.ornekler || d.examples) : [])
      .map((o) => ({ soru: plain(o && (o.soru || o.question)), cozum: plain(o && (o.cozum || o.solution || o.answer)) }))
      .filter((o) => o.soru && o.cozum).slice(0, 4);
    const ozet = (Array.isArray(d.ozet || d.summary) ? (d.ozet || d.summary) : []).map(plain).filter(Boolean).slice(0, 10);
    return { anlatim, ornekler, ozet };
  }

  async function generateLesson(key, opts) {
    opts = opts || {};
    const id = LES + key;
    if (inflight.has(id)) return inflight.get(id);
    const job = (async () => {
      const f = find(key);
      if (!f) throw new Error("not-found");
      if (f.outcome.curatedContent) throw new Error("curated");
      const pr = lessonPrompt(f);
      let res, content;
      try { res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.4, signal: opts.signal, onStage: opts.onStage })); content = normalizeLesson(res.data); }
      catch (e) {
        if (opts.signal && opts.signal.aborted) throw e;
        if (!(e instanceof SyntaxError || (e && e.message === "json"))) throw e;
        res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.3, signal: opts.signal })); content = normalizeLesson(res.data);
      }
      const rec = { id, key, content, lang: App.i18n.lang, model: res.model, date: new Date().toISOString() };
      await App.db.put("lessons", rec);
      await load();
      return rec;
    })();
    inflight.set(id, job);
    try { return await job; } finally { inflight.delete(id); }
  }

  /** Konu listesini sil (ilerleme kayıtları korunur; aynı kimliklerle yeniden oluşur) */
  async function removeSyllabus(gradeId, subjectId) {
    const pre = LES + gradeId + "/" + subjectId + "/";
    const rows = (await App.db.getAll("lessons")).filter((r) => r.id.indexOf(pre) === 0);
    for (const r of rows) await App.db.remove("lessons", r.id);       // eski konu anlatımları yeni listeye uymaz
    await App.db.remove("lessons", SYL + gradeId + "/" + subjectId);
    await load();
  }

  /** Yapay zekâyla hazırlanmış bir konu anlatımını sil (yeniden oluşturmak için) */
  async function removeLesson(key) {
    await App.db.remove("lessons", LES + key);
    await load();
  }

  function init() {
    // Başka cihazdan gelen içerik: müfredata ekle, konu sayfası açıksa yeniden çiz
    App.db.on("lessons", App.utils.debounce(async (opts) => {
      await load();
      if (opts && opts.fromSync && /^#\/konular/.test(location.hash) && !document.getElementById("aiGen")) App.router.refresh();
    }, 150));
  }

  App.lessons = { syllabusPrompt, lessonPrompt, apply, load, init, generateSyllabus, generateLesson, removeSyllabus, removeLesson, find, normalizeSyllabus, normalizeLesson, busy: (k) => inflight.has(k) };
})();
