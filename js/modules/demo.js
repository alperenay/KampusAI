/* =========================================================
   demo.js — Örnek öğrenci verisiyle demo modu

   Sunumda / jüri karşısında uygulamanın boş görünmemesi için tek tuşla
   kurgusal bir öğrencinin ~10 haftalık verisini yükler:
     • 6 TYT + 4 AYT (SAY) denemesi (netler giderek artar)
     • ~70 kazanımda konu sonu testi (güçlü / orta / zayıf karışık) → Öğrenme haritası dolu
     • yanlış defteri (hata türleriyle, bir kısmı tekrar zamanı gelmiş, bir kısmı öğrenilmiş)
     • 10 günlük odak oturumu (seri + rozetler), Feynman anlatımları, "çalıştım" işaretleri
     • hedef bölüm (Puan ve Hedef) ve kaynak gösterilmiş örnek bir asistan sohbeti
   Bütün kayıtların kimliği "demo_" ile başlar ya da demo: true taşır; "Demo verisini sil"
   yalnızca bunları siler, öğrencinin kendi verisine dokunmaz.
   Kısayol: #/demo adresi veriyi yükleyip Bugün ekranını açar (QR ile jüriye gösterim).
   ========================================================= */
(function () {
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const P = "demo_";
  const STORES = ["schedules", "exams", "quizzes", "mistakes", "sessions", "explains", "progress", "chats", "meta"];
  const DAY = 86400000;

  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const iso = (daysAgo, hour) => { const d = new Date(Date.now() - daysAgo * DAY); d.setHours(hour == null ? 18 : hour, Math.floor(rnd() * 50), 0, 0); return d.toISOString(); };
  const dayStr = (daysAgo) => App.learnmap.dayKey(new Date(Date.now() - daysAgo * DAY));

  /* ---------- Denemeler ---------- */
  function exams() {
    const out = [];
    const tyt = [ // [türkçe d,y] [sosyal] [matematik] [fen]
      [[26, 8], [11, 5], [17, 9], [7, 6]], [[28, 7], [12, 4], [19, 8], [8, 5]], [[29, 6], [12, 5], [21, 7], [9, 5]],
      [[31, 5], [13, 4], [23, 7], [10, 4]], [[32, 5], [14, 3], [25, 6], [11, 4]], [[33, 4], [14, 3], [27, 5], [12, 3]]
    ];
    tyt.forEach((r, i) => {
      const d = iso(70 - i * 13, 14);
      out.push({ id: P + "tyt" + i, type: "TYT", name: T("Örnek TYT Denemesi ", "Sample TYT ") + (i + 1), date: d.slice(0, 10),
        results: { turkce: { d: r[0][0], y: r[0][1] }, sosyal: { d: r[1][0], y: r[1][1] }, matematik: { d: r[2][0], y: r[2][1] }, fen: { d: r[3][0], y: r[3][1] } },
        createdAt: d, updatedAt: d, demo: true });
    });
    const ayt = [ // matematik, fizik, kimya, biyoloji
      [[16, 9], [4, 4], [6, 3], [7, 3]], [[19, 8], [5, 4], [7, 3], [8, 2]], [[22, 7], [6, 3], [8, 2], [9, 2]], [[25, 6], [7, 3], [9, 2], [10, 1]]
    ];
    ayt.forEach((r, i) => {
      const d = iso(60 - i * 18, 15);
      out.push({ id: P + "ayt" + i, type: "AYT", name: T("Örnek AYT Denemesi ", "Sample AYT ") + (i + 1), date: d.slice(0, 10),
        results: { matematik: { d: r[0][0], y: r[0][1] }, fizik: { d: r[1][0], y: r[1][1] }, kimya: { d: r[2][0], y: r[2][1] }, biyoloji: { d: r[3][0], y: r[3][1] } },
        createdAt: d, updatedAt: d, demo: true });
    });
    return out;
  }

  /* ---------- Konu testleri, yanlışlar, işaretler ---------- */
  // Derse göre başarı eğilimi: öğrencinin "hikâyesi" (fizik zayıf, biyoloji güçlü …)
  const LEVEL = { matematik: 0.72, fizik: 0.42, kimya: 0.58, biyoloji: 0.84, edebiyat: 0.62, tarih: 0.5, cografya: 0.66 };
  const ERRS = ["kavram", "bilgi", "islem", "dikkat", "sure"];

  function studyData() {
    const all = App.learnmap.allOutcomes().filter((it) => LEVEL[it.subject.id] != null && it.outcome.content);
    const bySubj = {};
    all.forEach((it) => (bySubj[it.subject.id] = bySubj[it.subject.id] || []).push(it));
    const quizzes = [], mistakes = [], progress = [];
    let qi = 0, mi = 0;
    Object.entries(bySubj).forEach(([sid, list]) => {
      // Her dersten müfredat sırasına göre yayılmış ~10 kazanım
      const step = Math.max(1, Math.floor(list.length / 10));
      list.filter((_, i) => i % step === 0).slice(0, 10).forEach((it, j) => {
        const label = App.data.curriculum.gradeName(it.grade) + " · " + App.L(it.subject.name) + " · " + App.L(it.outcome.title);
        if (j === 9) { progress.push({ id: it.key, done: true, at: iso(3 + j), demo: true }); return; }   // çalışıldı, test yok
        const p = Math.max(0.15, Math.min(0.98, LEVEL[sid] + (rnd() - 0.5) * 0.45));
        const correct = Math.max(1, Math.min(10, Math.round(p * 10)));
        const wrong = Math.min(10 - correct, Math.round((10 - correct) * 0.7));
        const date = iso(2 + Math.floor(rnd() * 40));
        quizzes.push({ id: P + "quiz" + (qi++), key: it.key, label, date, total: 10, correct, wrong, empty: 10 - correct - wrong, model: "demo", questions: [], demo: true });
        if (correct <= 6 && mi < 16) {
          const due = mi % 3 === 0;
          const mastered = mi % 5 === 4;
          mistakes.push({ id: P + "mis" + (mi++), createdAt: date, source: "quiz", key: it.key, label,
            q: T("Örnek soru — ", "Sample question — ") + App.L(it.outcome.title) + T(" konusundaki bir soru (demo).", " (demo)."),
            options: ["A", "B", "C", "D", "E"].map((x) => T("Seçenek ", "Option ") + x), answer: 2, chosen: 1,
            explain: T("Demo kaydı: doğru seçenek C. Konu anlatımına dönüp tekrar et.", "Demo record: the correct option is C."),
            reviews: mastered ? 4 : 1, nextAt: due ? iso(1) : new Date(Date.now() + 3 * DAY).toISOString(), mastered,
            lastReviewAt: iso(1 + (mi % 6)), errType: ERRS[mi % ERRS.length], errBy: "ai", demo: true });
        }
      });
    });
    return { quizzes, mistakes, progress };
  }

  /* ---------- Odak, Feynman, günlük görev, hedef ---------- */
  function sessions() {
    const out = [];
    for (let d = 0; d < 10; d++) {
      const n = d === 0 ? 1 : 2 + (d % 2);
      for (let k = 0; k < n; k++) {
        const end = iso(d, 16 + k * 2);
        out.push({ id: P + "ses" + d + "_" + k, start: new Date(Date.parse(end) - 25 * 60000).toISOString(), end, minutes: 25,
          subject: ["matematik", "fizik", "biyoloji", "kimya"][(d + k) % 4], demo: true });
      }
    }
    // Uzun soluklu: toplamı 10 saati geçsin (Odak rozeti)
    for (let d = 12; d < 30; d += 3) out.push({ id: P + "ses_old" + d, start: iso(d, 15), end: iso(d, 16), minutes: 50, subject: "matematik", demo: true });
    return out;
  }

  function explains() {
    const pick = (key, score, ago) => {
      const f = App.lessons.find(key);
      if (!f) return null;
      return { id: P + "fey_" + key.replace(/\//g, "_"), key, label: App.data.curriculum.gradeName(f.grade) + " · " + App.L(f.subject.name) + " · " + App.L(f.outcome.title),
        date: iso(ago), text: T("Demo anlatımı.", "Demo explanation."), score, model: "demo",
        summary: T("Demo kaydı: ana fikirler doğru, birkaç kavram eksik.", "Demo record."), demo: true };
    };
    return [pick("12/biyoloji/u2/k1", 86, 4), pick("9/fizik/u1/k1", 58, 9)].filter(Boolean);
  }

  function metas() {
    const out = [];
    [2, 3, 5, 6, 8, 9].forEach((d) => out.push({ id: "daily:" + dayStr(d), date: dayStr(d), topics: [], marked: [], completed: true, demo: true }));
    return out;
  }

  /* ---------- Haftalık program ---------- */
  function schedule() {
    const B = [];
    const add = (day, start, end, kind, tr, en) => B.push({ id: P + "blk" + B.length, day, start, end, kind, subject: { tr, en }, note: "" });
    const plan = [["Matematik", "Math", "Fizik", "Physics"], ["Kimya", "Chemistry", "Matematik", "Math"], ["Biyoloji", "Biology", "Fizik", "Physics"],
      ["Matematik", "Math", "Edebiyat", "Literature"], ["Fizik", "Physics", "Kimya", "Chemistry"]];
    plan.forEach((p, d) => {
      add(d, "17:30", "18:20", "ders", p[0], p[1]);
      add(d, "18:30", "19:20", "soru", p[2] + " soru çözümü", p[3] + " practice");
      add(d, "19:20", "19:40", "mola", "Mola", "Break");
      add(d, "19:40", "20:20", "tekrar", "Yanlış defteri tekrarı", "Mistake review");
    });
    add(5, "10:00", "12:45", "deneme", "TYT denemesi", "TYT practice exam");
    add(5, "14:00", "15:00", "tekrar", "Deneme analizi", "Exam review");
    add(6, "10:00", "13:00", "deneme", "AYT denemesi", "AYT practice exam");
    return { id: "user", blocks: B, updatedAt: new Date().toISOString(), demo: true };
  }

  /* ---------- Kaynak gösterilmiş örnek sohbet ---------- */
  function sampleChat() {
    const keys = ["12/biyoloji/u2/k1", "12/biyoloji/u2/k4"];
    const hits = keys.map((k) => {
      const f = App.lessons.find(k);
      if (!f || !f.outcome.content) return null;
      return { label: App.data.curriculum.gradeName(f.grade) + " · " + App.L(f.subject.name) + " · " + App.L(f.outcome.title),
        link: "#/konular/" + k, kind: "lesson", text: f.outcome.content.anlatim || "" };
    }).filter(Boolean);
    if (!hits.length) return null;
    const answer = T(
      "Fotosentezde açığa çıkan oksijenin kaynağı **sudur**, karbondioksit değildir [K1].\n\n" +
      "1. Işığa bağımlı tepkimeler kloroplastın **tilakoit zarında** gerçekleşir; burada **suyun fotolizi** olur ve O₂ açığa çıkar [K1].\n" +
      "2. Suyun fotolizinden gelen elektronlar FS II'ye, hidrojenler NADP⁺'ye aktarılır [K2].\n" +
      "3. Karbondioksit ise stromadaki Calvin döngüsünde tutulur ve glikozun yapısına katılır [K1].\n\n" +
      "Bu, izotop deneyleriyle gösterilmiştir: işaretli oksijen içeren su verildiğinde açığa çıkan O₂ de işaretli çıkar.",
      "The oxygen released in photosynthesis comes from **water**, not carbon dioxide [R1].");
    const sources = { hits: hits.map((h, i) => ({ label: h.label, link: h.link, kind: h.kind, score: [0.86, 0.71][i] || 0.6, snippet: App.cite ? App.cite.snippet(h.text) : "" })), overview: true, method: "demo" };
    if (App.cite) sources.check = App.cite.analyze(answer, hits);
    const at = iso(1, 20);
    return { id: P + "chat1", title: T("Fotosentezde oksijen nereden gelir?", "Where does oxygen in photosynthesis come from?"), createdAt: at, updatedAt: at, demo: true,
      messages: [
        { id: P + "m1", role: "user", text: T("Fotosentezde açığa çıkan oksijen nereden gelir?", "Where does the oxygen in photosynthesis come from?"), at },
        { id: P + "m2", role: "assistant", text: answer, at, sources, models: [{ role: "memory", model: "bge-m3" }, { role: "answer", model: "gemma4:e4b" }], engine: "device" }
      ] };
  }

  /* ---------- Yükle / sil ---------- */
  async function isLoaded() {
    try { return !!(await App.db.get("exams", P + "tyt0")); } catch (e) { return false; }
  }

  let load = async function () {
    seed = 7;
    const sd = studyData();
    const batches = { exams: exams(), quizzes: sd.quizzes, mistakes: sd.mistakes, progress: sd.progress, sessions: sessions(), explains: explains(), meta: metas() };
    const chat = sampleChat();
    if (chat) batches.chats = [chat];
    const own = await App.db.get("schedules", "user").catch(() => null);
    if (!own || !(own.blocks || []).length || own.demo) batches.schedules = [schedule()];
    // Hedef bölüm: öğrencinin kendi hedefi varsa ona dokunma
    const st = await App.db.get("meta", "scoreTarget").catch(() => null);
    if (!st || !st.base || st.demo) batches.meta.push({ id: "scoreTarget", name: T("Bilgisayar Mühendisliği (örnek)", "Computer Engineering (sample)"), type: "SAY", base: "455", obp: "86", prevPlaced: false, last: 3, demo: true, updatedAt: new Date().toISOString() });
    // Kendi ilerlemesi işaretli kazanımların üzerine yazma
    const ownProgress = new Set((await App.db.getAll("progress").catch(() => [])).filter((p) => !p.demo).map((p) => p.id));
    batches.progress = batches.progress.filter((p) => !ownProgress.has(p.id));
    for (const [store, rows] of Object.entries(batches)) for (const r of rows) await App.db.put(store, r);
    App.prefs.set("demoMode", true);
    App.ui.toast(T("Demo verisi yüklendi: örnek bir öğrencinin 10 haftalık çalışması.", "Demo data loaded: 10 weeks of a sample student."));
    if (App.badges) setTimeout(() => App.badges.check(), 1500);
  }

  let clear = async function () {
    for (const store of STORES) {
      const rows = await App.db.getAll(store).catch(() => []);
      const ids = rows.filter((r) => String(r.id).indexOf(P) === 0 || r.demo === true).map((r) => r.id);
      if (ids.length) await App.db.removeMany(store, ids);
    }
    App.prefs.remove("demoMode");
    App.ui.toast(T("Demo verisi silindi. Kendi kayıtların duruyor.", "Demo data removed. Your own records are kept."));
  }

  async function toggle() {
    if (await isLoaded()) {
      const ok = await App.ui.confirm(T("Örnek öğrencinin bütün kayıtları silinecek. Senin kendi kayıtlarına dokunulmaz.", "All sample-student records will be removed. Your own records are kept."), T("Sil", "Remove"), true);
      if (!ok) return;
      await clear();
    } else await load();
    App.router.refresh();
  }

  // #/demo: yükle ve Bugün ekranına geç (jüri için QR kısayolu)
  App.router.register("demo", async (view) => {
    view.innerHTML = '<div class="page"><p class="hint">' + T("Demo verisi hazırlanıyor…", "Preparing demo data…") + "</p></div>";
    if (!(await isLoaded())) await load();
    App.router.go("bugun");
  });

  /* Demo açıkken ekranın üstünde küçük bir etiket (kayıtların örnek olduğu belli olsun) */
  function mark() {
    let el = document.getElementById("demoPill");
    const on = !!App.prefs.get("demoMode", false);
    if (!on) { if (el) el.remove(); return; }
    if (el) return;
    el = document.createElement("button");
    el.id = "demoPill"; el.type = "button"; el.className = "demo-pill";
    el.title = T("Örnek öğrenci verisi gösteriliyor. Silmek için tıkla.", "Showing sample student data. Click to remove.");
    el.textContent = T("DEMO · örnek öğrenci", "DEMO · sample student");
    el.addEventListener("click", () => toggle());
    const bar = document.querySelector(".topbar__actions");
    if (bar) bar.insertBefore(el, bar.firstChild); else document.body.appendChild(el);
  }
  const _load = load, _clear = clear;
  load = async function () { await _load(); mark(); };
  clear = async function () { await _clear(); mark(); };
  setTimeout(mark, 500);

  App.demo = { load: () => load(), clear: () => clear(), toggle, isLoaded };
})();
