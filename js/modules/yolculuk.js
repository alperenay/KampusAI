/* =========================================================
   yolculuk.js — Oyunlaştırılmış YKS Yolculuğu (v1.24)   (#/yolculuk, #/yolculuk/<ders>)

   • Her ders bir "diyar"; 9'dan 12. sınıfa üniteler bölgeler, kazanımlar
     duraklar. Durağın durumu öğrenme haritasından gelir:
       ★ güçlü · ✓ çalışıldı/orta · ! zayıf · ○ henüz değil · ▶ sıradaki
   • Her ünitenin sonunda bir "canavar": ünitedeki bütün kazanımlar orta ya
     da güçlü olunca yenilir (konu testine götürür). Diyarın büyük canavarı
     deneme sınavıdır (son 14 günde deneme eklenince yenilir).
   • XP ve seviye uygulamadaki gerçek çalışmadan hesaplanır (konu, test,
     kart, odak, deneme…); ayrıca kaydedilmez, hile yapılamaz.
   • Günlük görevler (test, kart, odak) tamamlanınca bir kez +XP bonus
     (tercih "yolBonus").
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L = (o) => App.L(o);
  const C = () => App.data.curriculum;
  const dayKey = (d) => { const x = new Date(d || Date.now()); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
  const isToday = (iso) => iso && dayKey(iso) === dayKey();
  const TITLES = [[1, "Çırak", "Apprentice"], [3, "Kâşif", "Explorer"], [5, "Gezgin", "Wanderer"], [8, "Usta", "Adept"], [12, "Bilge", "Sage"], [16, "Efsane", "Legend"]];
  const AVATARS = [["compass", "#4f7cf0"], ["star", "#e0a458"], ["lightbulb", "#2fae7a"], ["globe", "#2bb3a3"], ["book", "#b45ad6"], ["target", "#e0503c"]];
  const QUESTS = [
    { id: "quiz", xp: 30, tr: "Bir konu testi çöz", en: "Take a topic quiz", href: "#/bugun", goal: 1 },
    { id: "cards", xp: 20, tr: "15 hap kartı tekrar et", en: "Review 15 flashcards", href: "#/kartlar/calis", goal: 15 },
    { id: "focus", xp: 25, tr: "25 dakika odaklan", en: "Focus for 25 minutes", href: "#/odak", goal: 25 }
  ];

  /* ---------------- Veri ---------------- */
  async function collect() {
    const get = (s) => App.db.getAll(s).catch(() => []);
    const [progress, quizzes, explains, checks, cards, mistakes, sessions, exams, meta] = await Promise.all(["progress", "quizzes", "explains", "checks", "cards", "mistakes", "sessions", "exams", "meta"].map(get));
    return { progress, quizzes, explains, checks, cards, mistakes, sessions, exams, meta };
  }
  /** Uygulamadaki gerçek çalışmadan XP */
  function xpOf(D) {
    const para = (App.prefs.get("paraLog", null) || {}).qs || [];
    const parts = {
      konu: D.progress.filter((p) => p.done).length * 20,
      test: D.quizzes.reduce((a, q) => a + 10 + 2 * (q.correct || 0), 0),
      feynman: D.explains.length * 15,
      kontrol: D.checks.length * 10,
      kart: D.cards.reduce((a, c) => a + (c.reps || 0), 0),
      yanlis: D.mistakes.filter((m) => m.mastered).length * 15,
      odak: Math.round(D.sessions.reduce((a, s) => a + (Number(s.minutes) || 0), 0)),
      deneme: D.exams.length * 60,
      video: D.meta.filter((r) => r && r.kind === "video").length * 25,
      paragraf: para.length * 2
    };
    const bonus = Object.values(App.prefs.get("yolBonus", {}) || {}).reduce((a, b) => a + (Number(b) || 0), 0);
    const total = Object.values(parts).reduce((a, b) => a + b, 0) + bonus;
    return { total, parts, bonus };
  }
  function level(xp) {
    const lv = Math.floor(Math.sqrt(xp / 40)) + 1;
    const at = 40 * (lv - 1) * (lv - 1), next = 40 * lv * lv;
    const t = TITLES.filter((x) => lv >= x[0]).pop();
    return { lv, at, next, pct: Math.round(((xp - at) / (next - at)) * 100), title: T(t[1], t[2]) };
  }
  function quests(D) {
    const today = dayKey();
    const n = {
      quiz: D.quizzes.filter((q) => isToday(q.date)).length,
      cards: D.cards.filter((c) => isToday(c.last)).length,
      focus: Math.round(D.sessions.filter((s) => isToday(s.end || s.start)).reduce((a, s) => a + (Number(s.minutes) || 0), 0))
    };
    const bonus = App.prefs.get("yolBonus", {}) || {};
    let claimed = 0;
    const list = QUESTS.map((q) => {
      const done = n[q.id] >= q.goal, key = today + ":" + q.id;
      if (done && !bonus[key]) { bonus[key] = q.xp; claimed += q.xp; }
      return Object.assign({}, q, { n: Math.min(n[q.id], q.goal), done });
    });
    if (claimed) App.prefs.set("yolBonus", bonus);       // günde en çok 3 anahtar: küçük kalır
    return { list, claimed };
  }

  /** Diyarlar: ders → üniteler (sınıf sırasıyla) → içerikli kazanımlar */
  function worlds() {
    const by = {};
    C().grades.forEach((g) => g.subjects.forEach((s) => {
      const w = by[s.id] || (by[s.id] = { id: s.id, name: s.name, color: s.color, icon: s.icon, units: [] });
      s.units.forEach((u) => {
        const stops = (u.outcomes || []).filter((o) => o.content).map((o) => ({ key: C().key(g.id, s.id, u.id, o.id), title: L(o.title), grade: g.id }));
        if (stops.length) w.units.push({ id: g.id + "/" + u.id, name: L(u.name), grade: g.id, stops });
      });
    }));
    return Object.values(by).filter((w) => w.units.length);
  }
  const ST = (m) => (!m ? "todo" : m.status === "strong" ? "star" : m.status === "mid" || m.status === "studied" || m.done ? "done" : m.status === "weak" ? "weak" : "todo");

  /* ---------------- Ana sayfa ---------------- */
  async function home(view) {
    App.setTitle(T("YKS Yolculuğu", "YKS Journey"));
    const D = await collect();
    const M = await App.roots.mastery().catch(() => new Map());
    const q = quests(D);
    const xp = xpOf(D), lv = level(xp.total);
    const av = AVATARS[Math.max(0, Math.min(AVATARS.length - 1, +App.prefs.get("yolAvatar", 0) || 0))];
    const W = worlds();
    const recentExam = D.exams.some((e) => Date.now() - Date.parse(e.date || e.createdAt) < 14 * 864e5);
    view.innerHTML = '<div class="page yl">' +
      '<div class="page-head"><div><h1>' + esc(T("YKS Yolculuğu", "YKS Journey")) + "</h1><p>" +
        esc(T("Müfredat bir macera haritası: her ders bir diyar, her kazanım bir durak, her ünitenin sonunda bir canavar. Çalıştıkça XP kazanır, seviye atlarsın.", "The curriculum as an adventure map: subjects are lands, outcomes are stops, units end with a boss.")) + "</p></div></div>" +
      '<section class="card yl-hero"><button type="button" class="yl-av" id="ylAv" style="--c:' + av[1] + '" aria-label="' + esc(T("Karakterini değiştir", "Change your avatar")) + '">' + App.icon(av[0]) + '</button><div class="yl-hero__main">' +
        '<div class="yl-hero__top"><b>' + esc(T("Seviye ", "Level ") + lv.lv + " · " + lv.title) + '</b><span class="hint">' + esc(xp.total.toLocaleString("tr-TR") + " XP") + "</span></div>" +
        '<div class="yl-xp" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + lv.pct + '" aria-label="' + esc(T("Sonraki seviyeye", "To next level")) + '"><i style="width:' + lv.pct + '%"></i></div>' +
        '<span class="hint">' + esc(T("Sonraki seviyeye " + (lv.next - xp.total) + " XP", (lv.next - xp.total) + " XP to next level")) + "</span></div></section>" +
      '<section class="card yl-quests"><h2>' + App.icon("flag") + esc(T("Günlük görevler", "Daily quests")) + "</h2><ul>" + q.list.map((x) =>
        '<li class="' + (x.done ? "is-done" : "") + '"><a href="' + x.href + '"><span class="yl-qi">' + App.icon(x.done ? "checkCircle" : "circle") + "</span><span><b>" + esc(T(x.tr, x.en)) + '</b><span class="yl-qbar"><i style="width:' + Math.round((x.n / x.goal) * 100) + '%"></i></span></span><span class="yl-qxp">+' + x.xp + " XP</span></a></li>").join("") + "</ul></section>" +
      '<h2 class="section-title">' + esc(T("Diyarlar", "Lands")) + '</h2><div class="yl-worlds">' + W.map((w) => {
        const all = [].concat(...w.units.map((u) => u.stops)), st = all.map((s) => ST(M.get(s.key)));
        const done = st.filter((x) => x === "done" || x === "star").length, stars = st.filter((x) => x === "star").length;
        const bosses = w.units.filter((u) => u.stops.every((s) => { const x = ST(M.get(s.key)); return x === "done" || x === "star"; })).length;
        const pct = Math.round((done / all.length) * 100);
        return '<a class="card yl-world" href="#/yolculuk/' + w.id + '" style="--c:' + w.color + '"><span class="yl-world__ico">' + App.icon(w.icon) + '</span><span class="yl-world__t"><b>' + esc(L(w.name)) + "</b><small>" +
          esc(T(done + "/" + all.length + " durak · " + stars + " yıldız · " + bosses + "/" + w.units.length + " canavar", done + "/" + all.length + " stops · " + stars + " stars · " + bosses + "/" + w.units.length + " bosses")) + '</small><span class="yl-xp yl-xp--sm"><i style="width:' + pct + '%"></i></span></span>' + App.icon("chevron") + "</a>";
      }).join("") + "</div>" +
      '<section class="card yl-boss' + (recentExam ? " is-down" : "") + '"><span class="yl-boss__ico">' + App.icon("target") + "</span><div><b>" + esc(T("Büyük canavar: Deneme", "Final boss: Mock exam")) + "</b><p>" +
        esc(recentExam ? T("Son 14 günde deneme çözdün, canavar yenildi! İki hafta sonra yeniden uyanır.", "You did a mock exam in the last 14 days. Boss defeated!") : T("Bir deneme çöz ve netlerini ekle; büyük canavarı yen (+60 XP).", "Take a mock exam and add your scores to defeat it (+60 XP).")) + "</p></div>" +
        (recentExam ? "" : '<a class="btn btn--primary btn--sm" href="#/denemeler/yeni">' + esc(T("Deneme ekle", "Add exam")) + "</a>") + "</section>" +
      '<details class="card yl-how"><summary>' + App.icon("info") + esc(T("XP nasıl kazanılır?", "How do I earn XP?")) + "</summary><ul>" +
        [["konu", "Konuyu tamamla", "Finish a lesson", 20], ["test", "Konu testi (+2/doğru)", "Quiz (+2 per correct)", 10], ["feynman", "Feynman anlatımı", "Feynman explanation", 15], ["kontrol", "Çözüm kontrolü", "Solution check", 10], ["kart", "Kart tekrarı", "Card review", 1],
          ["yanlis", "Yanlışı öğren", "Master a mistake", 15], ["odak", "Odak (dakika başı)", "Focus (per minute)", 1], ["deneme", "Deneme ekle", "Add a mock exam", 60], ["video", "Videodan çalış", "Study from video", 25], ["paragraf", "Paragraf sorusu", "Reading question", 2]]
          .map(([k, a, b, v]) => "<li><span>" + esc(T(a, b)) + "</span><b>+" + v + '</b><span class="hint">' + esc(T("şu ana kadar ", "so far ") + (xp.parts[k] || 0) + " XP") + "</span></li>").join("") +
        "<li><span>" + esc(T("Günlük görev bonusları", "Daily quest bonuses")) + "</span><b></b><span class=\"hint\">" + xp.bonus + " XP</span></li></ul></details>" +
      "</div>";
    App.hydrateIcons(view);
    if (q.claimed) App.ui.toast(T("Günlük görev tamam: +" + q.claimed + " XP", "Quest complete: +" + q.claimed + " XP"));
    view.querySelector("#ylAv").addEventListener("click", () => {
      const cur = +App.prefs.get("yolAvatar", 0) || 0;
      App.prefs.set("yolAvatar", (cur + 1) % AVATARS.length); home(view);
    });
  }

  /* ---------------- Diyar haritası ---------------- */
  async function world(view, id) {
    const w = worlds().find((x) => x.id === id);
    if (!w) { location.hash = "#/yolculuk"; return; }
    App.setTitle(L(w.name));
    const M = await App.roots.mastery().catch(() => new Map());
    const all = [].concat(...w.units.map((u) => u.stops));
    const nextKey = (all.find((s) => { const x = ST(M.get(s.key)); return x === "todo" || x === "weak"; }) || {}).key;
    const GL = { star: "★", done: "✓", weak: "!", todo: "" };
    let html = "", lastGrade = null, idx = 0;
    w.units.forEach((u) => {
      if (u.grade !== lastGrade) { html += '<h2 class="yl-grade">' + esc(C().gradeName(u.grade)) + "</h2>"; lastGrade = u.grade; }
      const n = u.stops.length, ROW = 78, H = n * ROW + 70;
      const pts = u.stops.map((s, i) => ({ s, x: 150 + 88 * Math.sin((idx + i) * 0.95), y: 40 + i * ROW }));
      idx += n;
      const boss = { x: 150, y: 40 + n * ROW };
      const path = [pts[0]].concat(pts.slice(1), [boss]).map((p, i, a) => i === 0 ? "M" + p.x.toFixed(1) + " " + p.y : "C" + a[i - 1].x.toFixed(1) + " " + (a[i - 1].y + ROW / 2) + " " + p.x.toFixed(1) + " " + (p.y - ROW / 2) + " " + p.x.toFixed(1) + " " + p.y).join(" ");
      const beaten = u.stops.every((s) => { const x = ST(M.get(s.key)); return x === "done" || x === "star"; });
      const target = (u.stops.find((s) => ST(M.get(s.key)) !== "star") || u.stops[0]).key;
      html += '<section class="yl-unit"><h3><span>' + esc(u.name) + '</span><small class="hint">' + u.stops.filter((s) => ["done", "star"].indexOf(ST(M.get(s.key))) >= 0).length + "/" + n + "</small></h3>" +
        '<svg class="yl-map" viewBox="0 0 300 ' + H + '" role="list" aria-label="' + esc(u.name) + '"><path d="' + path + '" class="yl-path"/>' +
        pts.map((p) => {
          const st = ST(M.get(p.s.key)), nx = p.s.key === nextKey, right = p.x < 150;
          const room = right ? 296 - (p.x + 28) : p.x - 28 - 4, max = Math.max(8, Math.floor(room / 6.3));
          const t = p.s.title.length > max ? p.s.title.slice(0, max - 1).trim() + "…" : p.s.title;
          return '<a href="#/konular/' + esc(p.s.key) + '" role="listitem" aria-label="' + esc(p.s.title + " — " + T({ star: "güçlü", done: "çalışıldı", weak: "zayıf", todo: "henüz değil" }[st], st)) + '"><title>' + esc(p.s.title) + "</title>" +
            '<g class="yl-node yl-node--' + st + (nx ? " is-next" : "") + '" transform="translate(' + p.x.toFixed(1) + " " + p.y + ')"><circle r="19"/><text class="yl-node__g" y="6">' + (nx && st !== "weak" ? "▶" : GL[st]) + "</text></g>" +
            '<text class="yl-node__t" x="' + (p.x + (right ? 28 : -28)).toFixed(1) + '" y="' + (p.y + 4) + '" text-anchor="' + (right ? "start" : "end") + '">' + esc(t) + "</text></a>";
        }).join("") +
        '<a href="#/test/' + esc(target) + '" aria-label="' + esc(T("Ünite canavarı: ", "Unit boss: ") + u.name) + '"><title>' + esc(T("Ünite canavarı — konu testine git", "Unit boss — take a quiz")) + '</title><g class="yl-bossnode' + (beaten ? " is-down" : "") + '" transform="translate(' + boss.x + " " + boss.y + ')"><rect x="-24" y="-20" width="48" height="40" rx="12"/><text y="7">' + (beaten ? "👑" : "👾") + "</text></g></a></svg></section>";
    });
    const counts = { star: 0, done: 0, weak: 0, todo: 0 }; all.forEach((s) => { counts[ST(M.get(s.key))]++; });
    view.innerHTML = '<div class="page page--narrow yl" style="--c:' + w.color + '">' +
      '<nav class="crumbs"><a href="#/yolculuk">' + App.icon("chevronL") + esc(T("YKS Yolculuğu", "YKS Journey")) + "</a></nav>" +
      '<div class="yl-whead"><span class="yl-world__ico">' + App.icon(w.icon) + "</span><div><h1>" + esc(L(w.name)) + '</h1><p class="hint">' +
        esc(T(counts.star + " yıldız · " + counts.done + " çalışıldı · " + counts.weak + " zayıf · " + counts.todo + " durak kaldı", counts.star + " stars · " + counts.done + " done · " + counts.weak + " weak · " + counts.todo + " to go")) + "</p></div>" +
        (nextKey ? '<a class="btn btn--primary btn--sm" href="#/konular/' + esc(nextKey) + '">' + App.icon("play") + esc(T("Sıradaki durak", "Next stop")) + "</a>" : "") + "</div>" +
      '<div class="yl-legend"><span><i class="yl-dot yl-node--star"></i>' + esc(T("Güçlü", "Strong")) + '</span><span><i class="yl-dot yl-node--done"></i>' + esc(T("Çalışıldı", "Studied")) + '</span><span><i class="yl-dot yl-node--weak"></i>' + esc(T("Zayıf", "Weak")) + '</span><span><i class="yl-dot yl-node--todo"></i>' + esc(T("Henüz değil", "Not yet")) + "</span><span>👾 " + esc(T("Ünite canavarı", "Unit boss")) + "</span></div>" +
      html + "</div>";
    App.hydrateIcons(view);
    const nx = view.querySelector(".is-next");
    if (nx && nx.scrollIntoView) setTimeout(() => { if (nx.isConnected) nx.scrollIntoView({ block: "center", behavior: "smooth" }); }, 120);
  }

  function render(view, params) { if (params && params[0]) return world(view, params[0]); return home(view); }
  App.router.register("yolculuk", render);
  App.yolculuk = { xpOf, level, quests, worlds, collect };
})();
