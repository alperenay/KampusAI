/* =========================================================
   rag.js — "Hafıza": öğrencinin kayıtlarında arama (RAG)
   Vektör modeli: yerelde bge-m3, Gemini'de gemini-embedding-001.
   Vektör modeli olmayan servislerde kelime araması (BM25) kullanılır.

   1. Sitedeki veriler küçük metin parçalarına bölünür:
        • her deneme (ders ders doğru/yanlış/net)
        • ders programının her günü
        • kazanım notları ("Notlarım")
        • tamamlanan kazanımlar
        • konu anlatımı içerikleri (eklendikçe)
   2. Her parça vektör modeliyle vektöre çevrilir ve IndexedDB'de ("vectors")
      saklanır. Parça değişmedikçe yeniden hesaplanmaz.
   3. Soru da vektöre çevrilir; en benzer parçalar + her zaman eklenen
      kısa bir "genel özet" ana modele bağlam olarak verilir.

   Parça metinleri her zaman Türkçe üretilir (arayüz dili değişince
   hafızanın yeniden hesaplanmaması için); görünen etiketler arayüz
   dilindedir.
   ========================================================= */
(function () {
  const TOP_K = 6;
  /* Gerçek bge-m3 ölçümü: alakalı sorularda en iyi eşleşme 0,49–0,64; alakasız
     sorularda çoğunlukla 0,28–0,41. Eşik bu ikisinin arasına konur. */
  const MIN_SCORE = 0.47;          // bundan düşük benzerlikler alakasız sayılır
  const SCORE_WINDOW = 0.15;       // en iyi sonuçtan bu kadar düşük olanlar elenir
  const MAX_CONTEXT_CHARS = 6000;  // ana modele giden kayıt metninin üst sınırı
  const BATCH = 16;

  const C = () => App.data.curriculum;
  const TR_MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const TR_DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const KIND_TR = { ders: "konu çalışma", soru: "soru çözümü", tekrar: "tekrar", deneme: "deneme", mola: "serbest/mola" };

  /** İki dilli veriden Türkçesini al */
  const TR = (v) => (v == null ? "" : typeof v === "object" ? (v.tr != null ? v.tr : v.en || "") : String(v));
  const num = (n, d) => (Math.round((Number(n) || 0) * Math.pow(10, d == null ? 2 : d)) / Math.pow(10, d == null ? 2 : d)).toLocaleString("tr-TR");
  const dateTR = (iso) => { const [y, m, d] = String(iso).split("-").map(Number); return y ? d + " " + TR_MONTHS[m - 1] + " " + y : iso; };
  const mins = (a, b) => App.utils.toMinutes(b) - App.utils.toMinutes(a);
  const dur = (m) => (Math.floor(m / 60) ? Math.floor(m / 60) + " sa " : "") + (m % 60 ? (m % 60) + " dk" : "");

  function htmlToText(html) {
    const doc = new DOMParser().parseFromString("<body>" + String(html || "") + "</body>", "text/html");
    doc.querySelectorAll("li").forEach((li) => li.prepend("• "));
    doc.querySelectorAll("p,li,h1,h2,h3,h4,br,div").forEach((el) => el.append("\n"));
    return doc.body.textContent.replace(/\n{3,}/g, "\n\n").trim();
  }

  /** Uzun metni üst üste binen pencerelere böler */
  function split(text, size, overlap) {
    size = size || 900; overlap = overlap || 150;
    if (text.length <= size) return [text];
    const out = [];
    for (let i = 0; i < text.length; i += size - overlap) {
      out.push(text.slice(i, i + size));
      if (i + size >= text.length) break;
    }
    return out;
  }

  /** FNV-1a: parça metninin kısa özeti (vektör önbelleği anahtarı) */
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36) + str.length.toString(36);
  }

  /** "9/matematik/u1/k1" → kazanım bilgisi */
  function outcomeInfo(key) {
    const [g, s, u, k] = String(key).split("/");
    const grade = C().findGrade(g), subject = C().findSubject(g, s);
    const unit = subject && subject.units.find((x) => x.id === u);
    const outcome = unit && unit.outcomes.find((x) => x.id === k);
    if (!outcome) return null;
    return {
      grade, subject, unit, outcome,
      pathTR: g + ". Sınıf › " + TR(subject.name) + " › " + TR(unit.name) + " › " + TR(outcome.title),
      label: App.data.curriculum.gradeName(grade) + " · " + App.L(subject.name) + " · " + App.L(outcome.title),
      link: "#/konular/" + key
    };
  }

  /* ---------------- Parçaları üret ---------------- */
  async function loadData() {
    const [exams, plan, notes, progress, quizzes, mistakes, sessions, explains] = await Promise.all([
      App.db.getAll("exams"), App.db.get("schedules", "user"), App.db.getAll("notes"), App.db.getAll("progress"),
      App.db.getAll("quizzes"), App.db.getAll("mistakes"), App.db.getAll("sessions"), App.db.getAll("explains")
    ]);
    return { exams: App.exams.sortChrono(exams), plan, notes, progress: progress.filter((p) => p.done), quizzes, mistakes, sessions, explains };
  }

  function scheduleSource(plan) {
    const mine = plan && plan.blocks && plan.blocks.length;
    return {
      mine: !!mine,
      blocks: mine ? plan.blocks : App.data.defaultSchedule.blocks,
      nameTR: mine ? "Öğrencinin kendi programı" : "Hazır program (" + TR(App.data.defaultSchedule.name) + ")"
    };
  }

  function examText(e) {
    const cfg = App.data.exams.types[e.type];
    const c = App.exams.compute(e);
    const lines = cfg.subjects.filter((s) => c.per[s.id]).map((s) => {
      const p = c.per[s.id];
      return "- " + TR(s.name) + ": " + p.d + " doğru, " + p.y + " yanlış, " + p.b + " boş → " + num(p.net) + " net (" + p.q + " soruda)";
    });
    return "Deneme: " + e.name + " (" + e.type + ", " + dateTR(e.date) + ")\n" + lines.join("\n") + "\nToplam net: " + num(c.total);
  }

  async function buildChunks(data) {
    data = data || await loadData();
    const chunks = [];
    const add = (id, kind, label, link, text) => split(text).forEach((part, i, arr) =>
      chunks.push({ id: arr.length > 1 ? id + "#" + i : id, kind, label, link, text: part }));

    // Denemeler
    data.exams.forEach((e) => add("exam:" + e.id, "exam", e.name + " · " + App.utils.fmtDate(e.date, true),
      "#/denemeler/duzenle/" + encodeURIComponent(e.id), examText(e)));

    // Ders programı (gün gün)
    const sch = scheduleSource(data.plan);
    TR_DAYS.forEach((dayName, i) => {
      const blocks = sch.blocks.filter((b) => Number(b.day) === i).sort((a, b) => App.utils.toMinutes(a.start) - App.utils.toMinutes(b.start));
      if (!blocks.length) return;
      const text = sch.nameTR + " — " + dayName + ":\n" + blocks.map((b) =>
        "- " + b.start + "–" + b.end + " " + TR(b.subject) + " (" + (KIND_TR[b.kind] || b.kind) + ")" + (TR(b.note) ? ": " + TR(b.note) : "")).join("\n");
      add("plan:" + (sch.mine ? "user" : "default") + ":" + i, "schedule", App.t("days").split(",")[i] + " · " + App.t(sch.mine ? "sch.tabMine" : "sch.tabDefault"),
        sch.mine ? "#/program/benim" : "#/program", text);
    });

    // Notlar
    data.notes.forEach((n) => {
      const info = outcomeInfo(n.id);
      if (!n.text || !n.text.trim()) return;
      add("note:" + n.id, "note", (info ? info.label : n.title || n.id), info ? info.link : "#/dokumanlar/notlar",
        "Öğrencinin notu — " + (info ? info.pathTR : n.title || n.id) + ":\n" + n.text.trim());
    });

    // Tamamlanan kazanımlar (ders ders tek parça)
    const bySubject = {};
    data.progress.forEach((p) => {
      const info = outcomeInfo(p.id);
      if (!info) return;
      const k = info.grade.id + "/" + info.subject.id;
      (bySubject[k] = bySubject[k] || { info, items: [] }).items.push(TR(info.outcome.title));
    });
    Object.entries(bySubject).forEach(([k, v]) => add("progress:" + k, "progress",
      App.data.curriculum.gradeName(v.info.grade) + " · " + App.L(v.info.subject.name),
      "#/konular/" + k,
      "Tamamlanan kazanımlar — " + v.info.grade.id + ". Sınıf " + TR(v.info.subject.name) + ":\n" + v.items.map((x) => "- " + x).join("\n")));

    // Konu sonu testleri (kazanım başına son sonuçlar)
    const byKey = {};
    (data.quizzes || []).forEach((q) => { (byKey[q.key] = byKey[q.key] || []).push(q); });
    Object.entries(byKey).forEach(([key, list]) => {
      list.sort((a, b) => String(a.date).localeCompare(String(b.date)));
      const info = outcomeInfo(key);
      add("quiz:" + key, "quiz", (info ? info.label : key), "#/konular/" + key,
        "Konu sonu testi sonuçları — " + (info ? info.pathTR : key) + ":\n" +
        list.slice(-5).map((q) => "- " + dateTR(String(q.date).slice(0, 10)) + ": " + q.correct + "/" + q.total + " doğru, " + q.wrong + " yanlış, " + q.empty + " boş").join("\n"));
    });

    // Feynman ("Bana anlat") değerlendirmeleri (kazanım başına son deneme)
    const byKeyF = {};
    (data.explains || []).forEach((x) => { (byKeyF[x.key] = byKeyF[x.key] || []).push(x); });
    Object.entries(byKeyF).forEach(([key, list]) => {
      list.sort((a, b) => String(a.date).localeCompare(String(b.date)));
      const x = list[list.length - 1];
      const info = outcomeInfo(key);
      add("feynman:" + key, "feynman", (info ? info.label : key), "#/anlat/" + key,
        "Feynman (konuyu kendi cümleleriyle anlatma) — " + (info ? info.pathTR : key) + ": " + list.length + " deneme, puanlar " + list.map((y) => y.score).join(" → ") + " / 100." +
        (x.missing && x.missing.length ? "\nSon anlatımdaki eksikler: " + x.missing.join("; ") : "") +
        (x.misconceptions && x.misconceptions.length ? "\nKavram yanılgıları: " + x.misconceptions.map((m) => m.claim + (m.fix ? " (doğrusu: " + m.fix + ")" : "")).join("; ") : ""));
    });

    // Yanlış defteri (son 60 soru)
    (data.mistakes || []).slice().sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 60).forEach((m) => {
      const opts = m.options && m.options.length ? "\nŞıklar: " + m.options.map((o, i) => "ABCDE"[i] + ") " + o).join(" ") + (m.answer != null ? " · Doğru: " + "ABCDE"[m.answer] : "") : "";
      add("mistake:" + m.id, "mistake", m.label || "Yanlış defteri", "#/yanlislar/tumu",
        "Yanlış defterindeki soru (" + (m.label || "") + ")" + (m.mastered ? " [öğrenildi]" : "") + ":\n" + htmlToText(m.q || "").slice(0, 600) + opts +
        (m.explain ? "\nAçıklama: " + htmlToText(m.explain).slice(0, 500) : ""));
    });

    // Konu anlatımı içerikleri — yalnızca öğrencinin uğraştığı kazanımlar (tamamlanan, test çözülen,
    // Feynman'la anlatılan, not alınan, yanlışı olan) ve yapay zekâyla hazırlatılanlar. 9–12. sınıfın
    // tüm hazır notları (~500 kazanım) her öğrenci için gömülürse ortak sunucunun gömme kotası
    // ilk aramada tükenir ve genel ders metinleri öğrencinin kendi kayıtlarını bağlamdan iter.
    const engaged = new Set();
    [data.progress, data.quizzes, data.explains, data.notes].forEach((list) => (list || []).forEach((r) => engaged.add(r.key || r.id)));
    (data.mistakes || []).forEach((m) => { if (m.key) engaged.add(m.key); });
    // v1.42: yalnızca ilgilenilen derslerin anlatımlarını yükle (hepsi değil)
    if (App.content) await App.content.ensureKeys([...engaged]).catch(() => {});
    C().grades.forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => u.outcomes.forEach((o) => {
      if (!o.content) return;
      const key = [g.id, s.id, u.id, o.id].join("/");
      if (!o.ai && !engaged.has(key)) return;
      const info = outcomeInfo(key);
      const ct = o.content;
      const parts = [];
      if (ct.anlatim) parts.push(htmlToText(TR(ct.anlatim)));
      (ct.ornekler || []).forEach((ex, i) => parts.push("Örnek " + (i + 1) + ": " + htmlToText(TR(ex.soru)) + "\nÇözüm: " + htmlToText(TR(ex.cozum))));
      if (ct.ozet && ct.ozet.length) parts.push("Hap bilgi:\n" + ct.ozet.map((x) => "- " + htmlToText(TR(x))).join("\n"));
      add("lesson:" + key, "lesson", info.label, info.link, "Konu anlatımı — " + info.pathTR + (o.code ? " (" + o.code + ")" : "") + ":\n" + parts.join("\n\n"));
    }))));

    return chunks;
  }

  /** Her soruda eklenen kısa genel özet (sayısal sorular için) */
  function overviewText(data) {
    const now = new Date();
    const today = App.utils.weekdayIndex(now);
    const lines = ["Bugün: " + now.getDate() + " " + TR_MONTHS[now.getMonth()] + " " + now.getFullYear() + ", " + TR_DAYS[today] + "."];

    Object.keys(App.data.exams.types).forEach((type) => {
      const list = data.exams.filter((e) => e.type === type);
      if (!list.length) { lines.push(type + ": henüz deneme girilmemiş."); return; }
      const comp = list.map((e) => ({ e, c: App.exams.compute(e) }));
      const totals = comp.map((x) => x.c.total);
      const last = comp[comp.length - 1], prev = comp[comp.length - 2];
      const best = comp.reduce((m, x) => (x.c.total > m.c.total ? x : m), comp[0]);
      lines.push(type + " denemeleri: " + list.length + " adet (" + dateTR(list[0].date) + " – " + dateTR(last.e.date) + "). " +
        "Ortalama " + num(totals.reduce((a, b) => a + b, 0) / totals.length, 1) + " net, en yüksek " + num(best.c.total) + " (" + best.e.name + "). " +
        "Son deneme: " + last.e.name + " — " + num(last.c.total) + " net" + (prev ? " (öncekine göre " + (last.c.total - prev.c.total >= 0 ? "+" : "") + num(last.c.total - prev.c.total) + ")" : "") + ".");
      lines.push("Son " + Math.min(5, comp.length) + " deneme sırasıyla: " + comp.slice(-5).map((x) => dateTR(x.e.date) + " " + num(x.c.total)).join("; ") + ".");
      const subj = App.data.exams.types[type].subjects.map((s) => {
        const vals = comp.map((x) => x.c.per[s.id]).filter(Boolean);
        if (!vals.length) return null;
        const mean = vals.reduce((a, v) => a + v.net, 0) / vals.length;
        return { name: TR(s.name), mean, q: s.questions, pct: mean / s.questions };
      }).filter(Boolean);
      if (subj.length) {
        lines.push("Ders ortalamaları: " + subj.map((x) => x.name + " " + num(x.mean, 1) + "/" + x.q + " (%" + Math.round(x.pct * 100) + ")").join(", ") + ".");
        const weak = subj.slice().sort((a, b) => a.pct - b.pct)[0];
        lines.push("Oransal olarak en zayıf ders: " + weak.name + " (%" + Math.round(weak.pct * 100) + ").");
      }
    });

    const sch = scheduleSource(data.plan);
    const todays = sch.blocks.filter((b) => Number(b.day) === today).sort((a, b) => App.utils.toMinutes(a.start) - App.utils.toMinutes(b.start));
    const weekly = sch.blocks.filter((b) => b.kind !== "mola").reduce((m, b) => m + Math.max(0, mins(b.start, b.end)), 0);
    lines.push(sch.nameTR + " — bugün: " + (todays.length ? todays.map((b) => b.start + "–" + b.end + " " + TR(b.subject) + (TR(b.note) ? " (" + TR(b.note) + ")" : "")).join("; ") : "plan yok") + ".");
    lines.push("Haftalık planlanan çalışma: " + (weekly ? dur(weekly).trim() : "yok") + ".");

    // Hedefler, odak çalışması, yanlış defteri
    if (App.goals) { const gs = App.goals.summaryTR(); if (gs) lines.push(gs); }
    if (App.score) { const ss = App.score.summaryTR(); if (ss) lines.push(ss); }
    const sessions = data.sessions || [];
    if (sessions.length) {
      const monday = new Date(); monday.setHours(0, 0, 0, 0); monday.setDate(monday.getDate() - App.utils.weekdayIndex(monday));
      const week = sessions.filter((s) => Date.parse(s.end || s.start) >= monday.getTime());
      const wm = week.reduce((a, s) => a + (Number(s.minutes) || 0), 0);
      const subj = {};
      week.forEach((s) => { if (s.subject) subj[s.subject] = (subj[s.subject] || 0) + (Number(s.minutes) || 0); });
      lines.push("Bu hafta odak sayacıyla gerçekten çalışılan süre: " + (wm ? dur(wm).trim() : "yok") +
        (Object.keys(subj).length ? " (" + Object.entries(subj).map(([k, v]) => k + " " + v + " dk").join(", ") + ")" : "") + ".");
    }
    const mis = data.mistakes || [];
    if (mis.length) {
      const due = mis.filter((m) => !m.mastered && Date.parse(m.nextAt || 0) <= Date.now()).length;
      lines.push("Yanlış defterinde " + mis.length + " soru var; bugün tekrar edilecek: " + due + ", öğrenilen: " + mis.filter((m) => m.mastered).length + ".");
      if (App.mistakes && App.mistakes.errorStats) {
        const es = App.mistakes.errorStats(mis);
        const names = { kavram: "kavram yanılgısı", bilgi: "bilgi eksikliği", islem: "işlem hatası", dikkat: "dikkatsizlik", sure: "süre yetmemesi" };
        if (es.typed) lines.push("Hata türleri (" + es.typed + " soru): " + Object.keys(names).filter((k) => es.counts[k]).sort((a, b) => es.counts[b] - es.counts[a])
          .map((k) => names[k] + " %" + Math.round(es.counts[k] / es.typed * 100) + (es.bySubject[k][0] ? " (en çok " + es.bySubject[k][0][0] + ")" : "")).join(", ") + ".");
      }
    }

    let total = 0;
    C().grades.forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => { total += u.outcomes.length; })));
    lines.push("Tamamlandı işaretlenen kazanım: " + data.progress.length + (total ? " / " + total : "") + ". Kayıtlı not sayısı: " + data.notes.filter((n) => n.text && n.text.trim()).length + ".");
    return lines.join("\n");
  }

  /* ---------------- Vektör önbelleği ---------------- */
  let syncing = null;              // { model, promise }

  /** Bu motorun vektör modeli (yoksa kelime araması yapılır) */
  const embedModelOf = (engine) => (engine || App.engine.local).config().embedModel || "";

  /** Parçaları üretir, eksik vektörleri hesaplar, artık kullanılmayanları siler */
  function sync(opts) {
    opts = opts || {};
    const engine = opts.engine || App.engine.local;
    const embedModel = embedModelOf(engine);
    if (syncing && syncing.model === embedModel) return syncing.promise;
    const before = syncing ? syncing.promise.catch(() => {}) : Promise.resolve();

    const promise = before.then(async () => {
      const data = opts.data || await loadData();
      const chunks = await buildChunks(data);
      if (!embedModel) return { chunks, data, embedded: 0, method: "lexical" };

      const vid = (c) => embedModel + ":" + hash(c.text);
      const stored = await App.db.getAll("vectors");
      const byId = new Map(stored.map((r) => [r.id, r]));
      const missing = chunks.filter((c) => !byId.has(vid(c)));
      const uniqueMissing = Array.from(new Map(missing.map((c) => [vid(c), c])).values());

      for (let i = 0; i < uniqueMissing.length; i += BATCH) {
        const batch = uniqueMissing.slice(i, i + BATCH);
        if (opts.onProgress) opts.onProgress(i, uniqueMissing.length);
        const vecs = await engine.embed(embedModel, batch.map((c) => c.text), opts.signal, "doc");
        const rows = batch.map((c, j) => ({ id: vid(c), model: embedModel, vec: Array.from(vecs[j]), at: Date.now() }));
        await App.db.putMany("vectors", rows);
        rows.forEach((r) => byId.set(r.id, r));
      }
      if (opts.onProgress && uniqueMissing.length) opts.onProgress(uniqueMissing.length, uniqueMissing.length);

      // Artık var olmayan parçaların vektörlerini sil (diğer modellerinkiler korunur:
      // yerel ↔ internet arasında geçişte yeniden hesaplanmasın)
      const wanted = new Set(chunks.map((c) => hash(c.text)));
      const stale = stored.filter((r) => !wanted.has(String(r.id).slice(String(r.model || "").length + 1))).map((r) => r.id);
      await App.db.removeMany("vectors", stale);

      chunks.forEach((c) => { c.vec = byId.get(vid(c)).vec; });
      return { chunks, data, embedded: uniqueMissing.length, method: "vector" };
    });
    const entry = { model: embedModel, promise };
    syncing = entry;
    promise.finally(() => { if (syncing === entry) syncing = null; }).catch(() => {});
    return promise;
  }

  function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    return na && nb ? dot / Math.sqrt(na * nb) : 0;
  }

  /* Benzerlik eşiği modele göre değişir. bge-m3 gerçek ölçümle ayarlandı; diğer
     modellerde (Gemini vb.) puan dağılımı farklı olduğu için ayrıca "öne çıkma"
     koşulu aranır: ortalamanın en az 1 standart sapma üstü. */
  function limits(model) {
    if (/bge-m3/i.test(model)) return { min: MIN_SCORE, adaptive: false };
    if (/gemini-embedding/i.test(model)) return { min: 0.5, adaptive: true };
    return { min: 0.35, adaptive: true };
  }

  function pickHits(scored, lim) {
    scored.sort((a, b) => b.score - a.score);
    const best = scored.length ? scored[0].score : 0;
    let floor = lim.min;
    if (lim.adaptive && scored.length > 4) {
      const mean = scored.reduce((m, s) => m + s.score, 0) / scored.length;
      const sd = Math.sqrt(scored.reduce((m, s) => m + (s.score - mean) * (s.score - mean), 0) / scored.length);
      floor = Math.max(floor, mean + sd);
    }
    const hits = [];
    let used = 0;
    for (const s of scored) {
      if (hits.length >= TOP_K || s.score < floor || s.score < best - (lim.window || SCORE_WINDOW)) break;
      if (used + s.c.text.length > MAX_CONTEXT_CHARS) break;
      used += s.c.text.length;
      hits.push({ label: s.c.label, link: s.c.link, kind: s.c.kind, text: s.c.text, score: Math.round(Math.min(1, s.score) * 1000) / 1000 });
    }
    return hits;
  }

  /* ---------------- Kelime araması (vektör modeli yoksa) ----------------
     BM25 puanlaması; Türkçe ekler için kelimelerin ilk 5 harfi karşılaştırılır
     ("denemelerim" ≈ "deneme"). İnternetsiz ve modelsiz çalışır. */
  const STOP = new Set("ve ile bir bu su o ne mi mu mü mı da de ki icin gibi daha en cok az ama veya ya hem her hangi nasil neden kac var yok olan olarak sonra once benim bana beni ben sen biz siz onlar bunu sunu icin mi? nedir midir the a an of to in is are what how my me i".split(" "));
  function tokens(s) {
    return String(s || "").toLocaleLowerCase("tr-TR")
      .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .split(/[^a-z0-9]+/).filter((w) => w && (w.length > 1 || /\d/.test(w)) && !STOP.has(w))
      .map((w) => (/^\d/.test(w) ? w : w.slice(0, 5)));
  }

  function lexical(query, chunks) {
    const q = Array.from(new Set(tokens(query)));
    if (!q.length) return [];
    const docs = chunks.map((c) => { const tk = tokens(c.label + " " + c.text); const tf = new Map(); tk.forEach((w) => tf.set(w, (tf.get(w) || 0) + 1)); return { c, tf, len: tk.length }; });
    const N = docs.length, avg = docs.reduce((m, d) => m + d.len, 0) / Math.max(1, N);
    const idf = new Map(q.map((w) => { const df = docs.filter((d) => d.tf.has(w)).length; return [w, Math.log(1 + (N - df + 0.5) / (df + 0.5))]; }));
    const maxIdf = q.reduce((m, w) => m + idf.get(w), 0) || 1;
    const k1 = 1.2, b = 0.75;
    const scored = docs.map((d) => {
      let sc = 0;
      q.forEach((w) => { const f = d.tf.get(w) || 0; if (f) sc += idf.get(w) * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / avg)); });
      return { c: d.c, score: sc / (maxIdf * (k1 + 1)) * 1.6 };      // ~0–1 arası, gösterim için
    }).filter((s) => s.score > 0);
    return pickHits(scored, { min: 0.12, adaptive: false, window: 0.35 });
  }

  /**
   * Soruyla ilgili kayıtları bulur.
   * opts: { engine, signal, onProgress, lexical }  (lexical: true → vektör kullanma)
   * Dönen: { overview, hits: [{ label, link, kind, text, score }], embedded, method }
   */
  /* Hafıza henüz hazır değilken (ilk sohbet, çok sayıda yeni kayıt) cevabı bekletmemek için:
     eksik vektör sayısı QUICK'ten fazlaysa bu soruda kelime araması (BM25) kullanılır ve hafıza
     arka planda hazırlanır. Sonraki sorular anlamca arama ile cevaplanır. */
  const QUICK = BATCH;            // en fazla bir toplu istek beklenir (birkaç saniye)

  async function pending(engine) {
    const model = embedModelOf(engine);
    const data = await loadData();
    const chunks = await buildChunks(data);
    if (!model) return { model, data, chunks, missing: 0 };
    const have = new Set((await App.db.getAll("vectors").catch(() => [])).map((r) => r.id));
    const missing = new Set(chunks.map((c) => model + ":" + hash(c.text)).filter((id) => !have.has(id))).size;
    return { model, data, chunks, missing };
  }

  /** Hafızayı arka planda hazırla (cevap beklemez). Aynı model için tek seferde bir iş çalışır. */
  function warmup(engine) {
    engine = engine || App.engine.local;
    if (!embedModelOf(engine)) return Promise.resolve(null);
    return sync({ engine }).catch(() => null);
  }

  /**
   * Soruyla ilgili kayıtları bulur.
   * opts: { engine, signal, onProgress, lexical }  (lexical: true → vektör kullanma)
   * Dönen: { overview, hits: [{ label, link, kind, text, score }], embedded, method, indexing? }
   */
  async function retrieve(query, opts) {
    opts = opts || {};
    if (opts.lexical) {
      const data = await loadData();
      const chunks = await buildChunks(data);
      return { overview: overviewText(data), hits: query.trim() ? lexical(query, chunks) : [], embedded: 0, method: "lexical" };
    }
    const engine = opts.engine || App.engine.local;
    const pre = await pending(engine);
    const busy = syncing && syncing.model === pre.model;
    if (pre.model && (pre.missing > QUICK || busy)) {
      // Cevabı bekletme: bu soruda kelime araması, hafıza arka planda (bulut: hemen; cihaz: cevaptan sonra)
      // Do not start indexing while the answer is streaming. pipeline.js warms after completion.
      return { overview: overviewText(pre.data), hits: query.trim() ? lexical(query, pre.chunks) : [], embedded: 0, method: "lexical",
        indexing: { missing: pre.missing, total: pre.chunks.length } };
    }
    const { chunks, data, embedded, method } = await sync(opts);
    const overview = overviewText(data);
    if (!chunks.length || !query.trim()) return { overview, hits: [], embedded, method };
    if (method === "lexical") return { overview, hits: lexical(query, chunks), embedded, method };

    const model = embedModelOf(engine);
    const [qv] = await engine.embed(model, [query], opts.signal, "query");
    const scored = chunks.map((c) => ({ c, score: cosine(qv, c.vec) }));
    return { overview, hits: pickHits(scored, limits(model)), embedded, method };
  }

  /** Hafızayı sıfırdan oluştur (Ayarlar'daki düğme) */
  async function rebuild(onProgress, signal, engine) {
    await App.db.clear("vectors");
    return sync({ onProgress, signal, engine });
  }

  App.rag = { buildChunks, retrieve, sync, rebuild, warmup, pending, overviewText, loadData, lexical, tokens };
})();
