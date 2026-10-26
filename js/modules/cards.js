/* =========================================================
   cards.js — Hap Bilgi Kartları   (#/kartlar)

   Konu anlatımlarındaki "hap bilgiler" ve çözümlü örnekler kendiliğinden
   çalışma kartına dönüşür; internet ve yapay zekâ gerekmez.
     • Hap bilgi → boşluk doldurma kartı: kalın yazılan kısım, formül, iki noktadan
       sonrası ya da cümlenin sonu gizlenir; öğrenci hatırlar, kartı çevirir.
     • Çözümlü örnek → soru / çözüm kartı.

   Deste: tamamlanan, testi çözülen ya da konu sayfasından "Desteye ekle" denen
   kazanımların kartları. Her gün en çok N yeni kart (Ayarlar: 10 / 15 / 25).

   Aralıklı tekrar (Leitner kutuları): Bilmedim → 1. kutu, 10 dk sonra yeniden;
   Zor → aynı kutu, aralığın yarısı; Bildim → bir üst kutu.
     kutu aralıkları (gün): 1 · 3 · 7 · 16 · 35 · 75 · 150
   Kart sonuçları Kök Eksik Analizi'nin hâkimiyet puanına ve unutma eğrisine katılır.

   Kayıt (IndexedDB "cards", eşitlenir):
     { id: "<kazanım>#o<i>" | "<kazanım>#e<i>", key, h (metin özeti), box (0 = yeni),
       due, reps, lapses, last, lastOk, added, firstAt }
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const L = App.L;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const C = () => App.data.curriculum;
  const MIN = 60 * 1000, DAY = 24 * 3600 * 1000;
  const STEPS = [0, 1, 3, 7, 16, 35, 75, 150];     // kutu → gün
  const MAX_BOX = STEPS.length - 1;
  const SESSION_MAX = 40;
  const dayKey = (d) => { const x = new Date(d || Date.now()); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };

  function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }

  /* ---------------- Kart üretimi ---------------- */
  const BLANK = "\u0000";
  /** Hap bilgiyi boşluk doldurma kartına çevirir: { front, back } (markdown) */
  function cloze(text) {
    const s = String(text || "").trim();
    const mark = (a, b, hidden) => ({ front: s.slice(0, a) + BLANK + s.slice(b), back: s.slice(0, a) + "==" + hidden + "==" + s.slice(b) });
    // 1) Kalın yazılan ilk ifade
    let m = /\*\*([^*]+?)\*\*/.exec(s);
    if (m && m[1].length < s.length * 0.7) return mark(m.index, m.index + m[0].length, "**" + m[1] + "**");
    // 2) Son formül
    const maths = []; const re = /\$[^$]+\$/g; let x;
    while ((x = re.exec(s))) maths.push(x);
    if (maths.length) { const f = maths[maths.length - 1]; if (f[0].length < s.length * 0.85 || maths.length > 1) return mark(f.index, f.index + f[0].length, f[0]); }
    // 3) İki noktadan / oktan sonrası
    for (const sep of [":", "→", "⇒", " = "]) {
      const i = s.indexOf(sep);
      if (i > 3 && i < s.length - 4) { const st = i + sep.length; const lead = s.slice(st).match(/^\s*/)[0].length; return mark(st + lead, s.length, s.slice(st + lead)); }
    }
    // 4) Noktalı virgül ya da virgülle ayrılmış ikinci parça
    for (const sep of [";", ","]) {
      const i = s.indexOf(sep);
      if (i > 6 && i < s.length - 6) { const st = i + 1; const lead = s.slice(st).match(/^\s*/)[0].length; return mark(st + lead, s.length, s.slice(st + lead)); }
    }
    // 5) Cümlenin son ~%45'i
    const words = s.split(/\s+/);
    if (words.length >= 4) {
      const keep = Math.max(2, Math.ceil(words.length * 0.55));
      const head = words.slice(0, keep).join(" ");
      return mark(head.length + 1, s.length, s.slice(head.length + 1));
    }
    return { front: BLANK, back: "==" + s + "==" };
  }

  /** Bir kazanımın kartları (içerikten hesaplanır, kaydedilmez) */
  function buildFor(key) {
    const f = App.lessons.find(key);
    if (!f || !f.outcome.content) return [];
    const ct = f.outcome.content, out = [];
    (ct.ozet || []).forEach((txt, i) => {
      const raw = L(txt); if (!raw || raw.length < 6) return;
      const c = cloze(raw);
      out.push({ id: key + "#o" + i, key, kind: "fact", front: c.front, back: c.back, h: hash(raw) });
    });
    (ct.ornekler || []).forEach((ex, i) => {
      const q = L(ex.soru), a = L(ex.cozum);
      if (!q || !a) return;
      out.push({ id: key + "#e" + i, key, kind: "example", front: q, back: a, h: hash(q + "|" + a) });
    });
    return out;
  }

  /** Markdown → HTML; boşluk ve vurgu işaretleri korunarak */
  function renderSide(mdText) {
    const ph = "CLOZEBLANKX", hl = [];
    let s = String(mdText).replace(BLANK, ph).replace(/==([\s\S]+?)==/g, (m0, inner) => { hl.push(inner); return "CLOZEHL" + (hl.length - 1) + "X"; });
    let html = App.markdown.render(s);
    html = html.replace(ph, '<span class="cloze" aria-label="' + esc(T("boşluk", "blank")) + '">?</span>');
    html = html.replace(/CLOZEHL(\d+)X/g, (m0, i) => '<mark class="cloze-ans">' + App.markdown.render(hl[Number(i)]).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1") + "</mark>");
    return html;
  }

  /* ---------------- Deste ---------------- */
  async function rows() { return App.db.getAll("cards").catch(() => []); }

  /** Desteye kazanım ekle: kartlarını "yeni" olarak kaydet (var olanlara dokunmaz) */
  async function addKey(key) {
    const cards = buildFor(key);
    const have = new Map((await rows()).filter((r) => r.key === key).map((r) => [r.id, r]));
    const now = new Date().toISOString();
    let n = 0;
    for (const c of cards) {
      const r = have.get(c.id);
      if (r && r.h === c.h) continue;
      // İçerik değiştiyse kart sıfırlanır
      await App.db.put("cards", { id: c.id, key, h: c.h, box: 0, due: now, reps: 0, lapses: 0, last: null, lastOk: null, added: now });
      n++;
    }
    return n;
  }
  async function removeKey(key) {
    const ids = (await rows()).filter((r) => r.key === key).map((r) => r.id);
    if (ids.length) await App.db.removeMany("cards", ids);
  }

  /** Tamamlanan / testi çözülen kazanımları desteye kendiliğinden ekle */
  async function autoAdd() {
    if (App.prefs.get("cardsAuto", true) === false) return 0;
    const [prog, quizzes, have] = await Promise.all([App.db.getAll("progress").catch(() => []), App.db.getAll("quizzes").catch(() => []), rows()]);
    const inDeck = new Set(have.map((r) => r.key));
    const removed = new Set(App.prefs.get("cardsRemoved", []));
    const keys = new Set();
    // Demo öğrencinin kayıtlarından kart üretilmez: demo silinince öğrencinin destesinde kalıyordu
    prog.forEach((p) => { if (p.done && !p.demo) keys.add(p.id); });
    quizzes.forEach((q) => { if (q.key && !q.demo) keys.add(q.key); });
    let n = 0;
    for (const k of keys) if (!inDeck.has(k) && !removed.has(k) && App.lessons.find(k)) n += await addKey(k);
    return n;
  }

  const newPerDay = () => Number(App.prefs.get("cardsNewPerDay", 15)) || 15;

  /** Durum: { total, due, fresh, newToday, newLeft, byKey } */
  async function stats() {
    const all = await rows();
    const now = Date.now(), today = dayKey();
    const newToday = all.filter((r) => r.firstAt && dayKey(r.firstAt) === today).length;
    const newLeft = Math.max(0, newPerDay() - newToday);
    const due = all.filter((r) => r.box > 0 && Date.parse(r.due) <= now);
    const fresh = all.filter((r) => r.box === 0);
    return { all, total: all.length, due: due.length, fresh: fresh.length, newToday, newLeft, todo: due.length + Math.min(fresh.length, newLeft) };
  }

  /** Çalışma sırası: tekrar zamanı gelenler (en eski önce) + günlük sınır kadar yeni kart */
  async function queue(onlyKey) {
    const st = await stats();
    const now = Date.now();
    let pool = st.all.filter((r) => !onlyKey || r.key === onlyKey);
    const due = pool.filter((r) => r.box > 0 && Date.parse(r.due) <= now).sort((a, b) => String(a.due).localeCompare(String(b.due)));
    const fresh = pool.filter((r) => r.box === 0).sort((a, b) => String(a.added).localeCompare(String(b.added)) || a.id.localeCompare(b.id));
    // Tek konu çalışılırken o konunun tüm yeni kartları gelir; genel tekrarda günlük sınır uygulanır
    const nNew = onlyKey ? fresh.length : st.newLeft;
    const list = due.concat(fresh.slice(0, nNew)).slice(0, onlyKey ? 999 : SESSION_MAX);
    // Kart içeriğini ekle; içeriği kaybolmuş kartlar atlanır
    const built = new Map();
    const out = [];
    for (const r of list) {
      if (!built.has(r.key)) built.set(r.key, new Map(buildFor(r.key).map((c) => [c.id, c])));
      const c = built.get(r.key).get(r.id);
      if (c) out.push(Object.assign({}, c, { row: r }));
    }
    return out;
  }

  /** Sonraki aralık metni (düğmelerin altında gösterilir) */
  function nextDue(row, grade) {
    if (grade === 0) return 10 * MIN;
    const box = row.box || 0;
    if (grade === 1) return Math.max(1, (STEPS[Math.max(1, box)] || 1) / 2) * DAY;
    return STEPS[Math.min(MAX_BOX, box + (box ? 1 : 2))] * DAY;      // ilk görüşte bilinen kart 3 gün sonra
  }
  function spanText(ms) {
    if (ms < DAY) return T(Math.round(ms / MIN) + " dk", Math.round(ms / MIN) + " min");
    const d = Math.round(ms / DAY);
    if (d < 30) return T(d + " gün", d + (d === 1 ? " day" : " days"));
    return T(Math.round(d / 30) + " ay", Math.round(d / 30) + " mo");
  }

  /** Değerlendirme: 0 = Bilmedim, 1 = Zor, 2 = Bildim */
  async function grade(row, g) {
    const now = new Date();
    const r = Object.assign({}, row);
    if (!r.firstAt) r.firstAt = now.toISOString();
    if (g === 0) { r.box = 1; r.lapses = (r.lapses || 0) + 1; }
    else if (g === 1) { r.box = Math.max(1, r.box || 0); }
    else r.box = Math.min(MAX_BOX, (r.box || 0) + (r.box ? 1 : 2));
    r.due = new Date(now.getTime() + nextDue(row, g)).toISOString();
    r.reps = (r.reps || 0) + 1;
    r.last = now.toISOString();
    r.lastOk = g > 0;
    await App.db.put("cards", r);
    return r;
  }

  /** Kazanım bazında özet (hâkimiyet puanı için): Map key → { pct, n, last, goodReps } */
  async function byKey() {
    const out = new Map();
    (await rows()).forEach((r) => {
      if (!r.last) return;
      const s = out.get(r.key) || { ok: 0, n: 0, last: "", goodReps: 0 };
      s.n++; if (r.lastOk) s.ok++;
      if (String(r.last) > s.last) s.last = String(r.last);
      if (r.box >= 3) s.goodReps++;
      out.set(r.key, s);
    });
    out.forEach((s) => { s.pct = Math.round((s.ok / s.n) * 100); });
    return out;
  }

  /* ---------------- Konu sayfasındaki kart ---------------- */
  async function cardHtml(key) {
    const cards = buildFor(key);
    if (!cards.length) return "";
    const mine = (await rows()).filter((r) => r.key === key);
    const inDeck = mine.length > 0;
    const learned = mine.filter((r) => r.box >= 3).length;
    return '<section class="card cards-card" data-cards-key="' + esc(key) + '"><div class="cards-card__head"><h2>' + App.icon("layers") + esc(T("Hap bilgi kartları", "Flashcards")) + "</h2>" +
      '<span class="badge">' + esc(T(cards.length + " kart", cards.length + " cards")) + "</span></div>" +
      '<p class="hint">' + esc(inDeck ? T("Destende. " + learned + "/" + cards.length + " kart kalıcı hafızada (3. kutu ve üstü). Tekrar zamanı gelince Bugün ekranında hatırlatılır.",
        "In your deck. " + learned + "/" + cards.length + " cards in long-term memory.") :
        T("Bu konunun hap bilgileri ve örnekleri tekrar kartına dönüşür; unutmaya başlamadan önce sana sorulur.", "This topic's key facts and examples become review cards, asked again before you forget them.")) + "</p>" +
      '<div class="cards-card__acts"><a class="btn btn--primary" href="#/kartlar/konu/' + esc(key) + '">' + App.icon("layers") + esc(T("Kartları çalış", "Study cards")) + "</a>" +
      '<button class="btn btn--ghost" type="button" data-cards-toggle>' + App.icon(inDeck ? "trash" : "plus") + esc(inDeck ? T("Desteden çıkar", "Remove from deck") : T("Desteye ekle", "Add to deck")) + "</button></div></section>";
  }
  function bindCard(view) {
    const box = view.querySelector(".cards-card");
    if (!box) return;
    const key = box.dataset.cardsKey;
    const btn = box.querySelector("[data-cards-toggle]");
    btn.addEventListener("click", async () => {
      const inDeck = (await rows()).some((r) => r.key === key);
      const removed = new Set(App.prefs.get("cardsRemoved", []));
      if (inDeck) { await removeKey(key); removed.add(key); App.ui.toast(T("Desteden çıkarıldı.", "Removed from deck.")); }
      else { await addKey(key); removed.delete(key); App.ui.toast(T("Desteye eklendi.", "Added to deck.")); }
      App.prefs.set("cardsRemoved", Array.from(removed));
      box.outerHTML = await cardHtml(key);
      App.hydrateIcons(view);
      bindCard(view);
    });
  }

  /* ---------------- Ana sayfa ---------------- */
  async function renderHome(view) {
    App.setTitle(T("Hap Kartları", "Flashcards"));
    await autoAdd();
    const st = await stats();
    const groups = {};
    st.all.forEach((r) => {
      const f = App.lessons.find(r.key); if (!f) return;
      const gk = f.grade.id + "/" + f.subject.id;
      const g = groups[gk] = groups[gk] || { name: C().gradeName(f.grade) + " · " + L(f.subject.name), n: 0, due: 0, learned: 0, keys: new Set() };
      g.n++; g.keys.add(r.key);
      if (r.box > 0 && Date.parse(r.due) <= Date.now()) g.due++;
      if (r.box >= 3) g.learned++;
    });
    const learned = st.all.filter((r) => r.box >= 3).length;
    const list = Object.values(groups).sort((a, b) => b.due - a.due || a.name.localeCompare(b.name));
    view.innerHTML = '<div class="page page--narrow cards-home">' +
      '<div class="page-head"><div><h1>' + esc(T("Hap Kartları", "Flashcards")) + "</h1>" +
        "<p>" + esc(T("Konu anlatımlarındaki hap bilgiler ve örnekler, unutmaya başlamadan hemen önce yeniden sorulur (aralıklı tekrar).", "Key facts and examples come back just before you'd forget them (spaced repetition).")) + "</p></div></div>" +
      '<section class="card cards-hero">' +
        '<div class="cards-hero__nums">' +
          '<div><b>' + st.todo + "</b><span>" + esc(T("bugün çalışılacak", "to study today")) + "</span></div>" +
          '<div><b>' + st.due + "</b><span>" + esc(T("tekrar zamanı gelen", "due for review")) + "</span></div>" +
          '<div><b>' + Math.min(st.fresh, st.newLeft) + "</b><span>" + esc(T("yeni kart", "new cards")) + "</span></div>" +
          '<div><b>' + learned + "/" + st.total + "</b><span>" + esc(T("kalıcı hafızada", "long-term")) + "</span></div>" +
        "</div>" +
        (!st.total ? '<button class="btn btn--primary cards-start" type="button" id="cardsChoose">' + App.icon("plus") + esc(T("Konu seç ve kart ekle", "Choose a topic and add cards")) + "</button>" : "") +
        (st.total && !st.todo ? '<a class="btn btn--primary cards-start" href="#/kartlar/incele">' + esc(T("Kartları incele", "Browse cards")) + "</a>" : "") +
        (st.todo ? '<a class="btn btn--primary cards-start" href="#/kartlar/calis">' + App.icon("play") + esc(T("Çalışmaya başla", "Start studying")) + "</a>"
          : '<p class="hint">' + esc(st.total ? T("Bugünlük kart kalmadı. Yarın tekrar zamanı gelenler burada olacak.", "Nothing left for today. Come back tomorrow.")
            : T("Destende henüz kart yok. Bir konuyu tamamlandı olarak işaretle, konu testini çöz ya da konu sayfasındaki \"Desteye ekle\" düğmesini kullan.", "Your deck is empty. Complete a topic, take its quiz, or use \"Add to deck\" on a lesson page.")) + "</p>") +
      "</section>" +
      (list.length ? '<section class="card"><div class="card__title">' + App.icon("layers") + esc(T("Destelerin", "Your decks")) + '</div><ul class="cards-decks">' +
        list.map((g) => '<li><div><b>' + esc(g.name) + '</b><span class="hint">' + esc(T(g.keys.size + " konu · " + g.n + " kart · " + g.learned + " kalıcı", g.keys.size + " topics · " + g.n + " cards · " + g.learned + " long-term")) + "</span></div>" +
          (g.due ? '<span class="badge badge--due">' + esc(T(g.due + " tekrar", g.due + " due")) + "</span>" : '<span class="badge badge--good">' + esc(T("güncel", "up to date")) + "</span>") + "</li>").join("") + "</ul></section>" : "") +
      '<section class="card"><div class="card__title">' + App.icon("settings") + esc(T("Ayarlar", "Settings")) + "</div>" +
        '<label class="field"><span class="field__label">' + esc(T("Günde en çok yeni kart", "Max new cards per day")) + '</span><select class="select" id="cNew">' +
          [10, 15, 25, 40].map((n) => '<option value="' + n + '"' + (n === newPerDay() ? " selected" : "") + ">" + n + "</option>").join("") + "</select></label>" +
        '<label class="check-row"><input type="checkbox" id="cAuto"' + (App.prefs.get("cardsAuto", true) !== false ? " checked" : "") + "> " +
          esc(T("Tamamladığım ve testini çözdüğüm konuları desteye kendiliğinden ekle", "Automatically add topics I complete or take a quiz on")) + "</label>" +
        '<p class="hint">' + esc(T("Aralıklar: 1 → 3 → 7 → 16 → 35 → 75 → 150 gün. \"Bilmedim\" dersen kart 10 dakika sonra yeniden gelir ve başa döner.", "Intervals: 1 → 3 → 7 → 16 → 35 → 75 → 150 days. \"Forgot\" brings the card back in 10 minutes.")) + "</p>" +
      "</section></div>";
    const choose = view.querySelector("#cardsChoose");
    if (choose) choose.onclick = () => {
      const items = App.learnmap.allOutcomes().filter((it) => buildFor(it.key).length);
      const m = App.ui.modal({ title: T("Konu seç", "Choose a topic"), body: '<label class="field"><span>' + esc(T("Kazanım", "Learning outcome")) + '</span><select class="select" id="cardsTopic">' + items.map((it) => '<option value="' + esc(it.key) + '">' + esc(it.grade.id + " · " + L(it.subject.name) + " · " + L(it.outcome.title)) + '</option>').join('') + '</select></label>', actions: '<button class="btn" data-close>' + esc(T("Vazgeç", "Cancel")) + '</button><button class="btn btn--primary" id="cardsAddStart">' + esc(T("Ekle ve çalışmaya başla", "Add and start studying")) + '</button>' });
      m.el.querySelector("#cardsAddStart").onclick = async () => { const b = m.el.querySelector("#cardsAddStart"); b.disabled = true; try { const key = m.el.querySelector("#cardsTopic").value; await addKey(key); m.close(); App.router.go("kartlar/konu/" + key); } catch (e) { App.ui.toast(e.message, "error"); } finally { b.disabled = false; } };
    };
    view.querySelector("#cNew").addEventListener("change", (e) => { App.prefs.set("cardsNewPerDay", Number(e.target.value)); App.router.refresh(); });
    view.querySelector("#cAuto").addEventListener("change", (e) => App.prefs.set("cardsAuto", e.target.checked));
  }

  /* ---------------- Çalışma oturumu ---------------- */
  let S = null;
  async function renderStudy(view, onlyKey) {
    App.setTitle(T("Hap Kartları", "Flashcards"));
    if (onlyKey) await addKey(onlyKey); else await autoAdd();
    const q = await queue(onlyKey);
    S = { view, q, i: 0, flipped: false, done: 0, ok: 0, again: 0, onlyKey, seen: new Set() };
    if (!q.length) {
      view.innerHTML = '<div class="page page--narrow">' + App.ui.empty("checkCircle", T("Şimdilik kart yok", "No cards right now"),
        onlyKey ? T("Bu konunun kartlarının hepsi tekrar zamanını bekliyor.", "All cards of this topic are waiting for their review time.") : T("Bugünlük tekrarlar bitti. Yarın tekrar zamanı gelenler burada olacak.", "You're done for today."),
        '<a class="btn" href="#/kartlar">' + esc(T("Kartlara dön", "Back to cards")) + "</a>") + "</div>";
      return;
    }
    paint();
  }

  function paint() {
    if (!S) return;
    const { view, q } = S;
    if (S.i >= q.length) return summary();
    const c = q[S.i];
    const f = App.lessons.find(c.key);
    const ctx = f ? C().gradeName(f.grade) + " · " + L(f.subject.name) + " · " + L(f.outcome.title) : "";
    const isNew = !c.row.box;
    const btns = [0, 1, 2].map((g) => {
      const lab = [T("Bilmedim", "Forgot"), T("Zor", "Hard"), T("Bildim", "Knew it")][g];
      return '<button class="cards-grade cards-grade--' + g + '" type="button" data-grade="' + g + '"><b>' + esc(lab) + "</b><small>" + esc(spanText(nextDue(c.row, g))) + "</small></button>";
    }).join("");
    view.innerHTML = '<div class="page page--narrow cards-study">' +
      '<div class="cards-top"><a class="icon-btn" href="' + (S.onlyKey ? "#/konular/" + esc(S.onlyKey) : "#/kartlar") + '" title="' + esc(T("Bitir", "Finish")) + '">' + App.icon("close") + "</a>" +
        '<div class="cards-progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + q.length + '" aria-valuenow="' + S.i + '"><span style="width:' + Math.round((S.i / q.length) * 100) + '%"></span></div>' +
        '<span class="cards-count">' + (S.i + 1) + "/" + q.length + "</span></div>" +
      '<button class="flashcard' + (S.flipped ? " is-flipped" : "") + '" type="button" id="fc" aria-live="polite">' +
        '<span class="flashcard__meta">' + (isNew ? '<span class="badge">' + esc(T("yeni", "new")) + "</span> " : "") +
          '<span class="badge">' + esc(c.kind === "example" ? T("Örnek soru", "Example") : T("Hap bilgi", "Key fact")) + "</span> " + esc(ctx) + "</span>" +
        '<span class="flashcard__q md">' + renderSide(c.front) + "</span>" +
        (S.flipped ? '<span class="flashcard__a md">' + renderSide(c.back) + "</span>" : '<span class="flashcard__tap">' + esc(T("Hatırla, sonra çevirmek için dokun", "Recall it, then tap to flip")) + "</span>") +
      "</button>" +
      '<div class="cards-dock">' + (S.flipped ? btns
        : '<button class="btn btn--primary cards-show" type="button" id="fcShow">' + App.icon("eye") + esc(T("Cevabı göster", "Show answer")) + "</button>") + "</div>" +
      '<p class="hint cards-keys">' + esc(T("Klavye: Boşluk = çevir · 1 Bilmedim · 2 Zor · 3 Bildim. Telefonda çevirdikten sonra sola kaydır = Bilmedim, sağa = Bildim.",
        "Keys: Space = flip · 1 Forgot · 2 Hard · 3 Knew it. On phones, after flipping swipe left = Forgot, right = Knew it.")) + "</p>" +
    "</div>";
    App.hydrateIcons(view);
    const fc = view.querySelector("#fc");
    fc.addEventListener("click", flip);
    const show = view.querySelector("#fcShow"); if (show) show.addEventListener("click", flip);
    view.querySelectorAll("[data-grade]").forEach((b) => b.addEventListener("click", () => rate(Number(b.dataset.grade))));
    // Kaydırma: çevrildikten sonra sola = Bilmedim, sağa = Bildim
    let x0 = null;
    fc.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    fc.addEventListener("touchmove", (e) => { if (x0 == null || !S.flipped) return; const dx = e.touches[0].clientX - x0; fc.style.transform = "translateX(" + dx + "px) rotate(" + dx / 30 + "deg)"; }, { passive: true });
    fc.addEventListener("touchend", (e) => {
      if (x0 == null) return;
      const dx = (e.changedTouches[0] || {}).clientX - x0; x0 = null;
      if (S.flipped && Math.abs(dx) > 90) { S.swiped = true; rate(dx > 0 ? 2 : 0); }
      else fc.style.transform = "";
    });
  }

  function flip(e) {
    if (!S) return;
    if (S.swiped) { S.swiped = false; return; }
    if (S.flipped) return;
    S.flipped = true; paint();
  }

  async function rate(g) {
    if (!S || !S.flipped) return;
    const c = S.q[S.i];
    const row = await grade(c.row, g);
    S.done++; if (g > 0) S.ok++; else S.again++;
    if (g === 0 && !S.seen.has(c.id)) S.q.push(Object.assign({}, c, { row }));   // bilinmeyen kart oturum sonunda bir kez daha
    S.seen.add(c.id);
    S.i++; S.flipped = false;
    paint();
    if (App.badges) App.badges.check();
  }

  function summary() {
    const { view } = S;
    const pct = S.done ? Math.round((S.ok / S.done) * 100) : 0;
    view.innerHTML = '<div class="page page--narrow">' + '<section class="card cards-done">' + App.icon("checkCircle") +
      "<h2>" + esc(T("Tekrar tamam!", "Session complete!")) + "</h2>" +
      "<p>" + esc(T(S.done + " kart · %" + pct + " bildin · " + S.again + " kart yeniden sorulacak", S.done + " cards · " + pct + "% known · " + S.again + " to review again")) + "</p>" +
      '<div class="cards-card__acts"><a class="btn btn--primary" href="' + (S.onlyKey ? "#/konular/" + esc(S.onlyKey) : "#/bugun") + '">' + esc(S.onlyKey ? T("Konuya dön", "Back to topic") : T("Bugün ekranına dön", "Back to Today")) + "</a>" +
      '<a class="btn" href="#/kartlar">' + esc(T("Kartlar", "Cards")) + "</a></div></section></div>";
    App.hydrateIcons(view);
    S = null;
  }

  function onKey(e) {
    if (!S || !document.querySelector(".cards-study")) return;
    if (/input|textarea|select/i.test((e.target && e.target.tagName) || "")) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
    else if (S.flipped && ["1", "2", "3"].includes(e.key)) { e.preventDefault(); rate(Number(e.key) - 1); }
  }
  document.addEventListener("keydown", onKey);

  async function renderBrowse(view) {
    App.setTitle(T("Kartları incele", "Browse cards"));
    const keys = Array.from(new Set((await rows()).map((r) => r.key))).filter((key) => buildFor(key).length);
    const paintBrowse = (key) => {
      view.innerHTML = '<div class="page page--narrow cards-browse"><h1>' + esc(T("Kartları incele", "Browse cards")) + '</h1><p class="hint">' + esc(T("İnceleme tekrar takvimini ve puanlarını değiştirmez.", "Browsing does not change your review schedule or scores.")) + '</p><select class="select" id="cardsBrowseTopic" aria-label="' + esc(T("Konu", "Topic")) + '">' + keys.map((k) => '<option value="' + esc(k) + '"' + (key === k ? ' selected' : '') + '>' + esc(L(App.lessons.find(k).outcome.title)) + '</option>').join('') + '</select>' + buildFor(key).map((card, i) => '<details class="card research-session"><summary>' + esc(T("Kart ", "Card ") + (i + 1)) + '</summary><div class="md">' + renderSide(card.front) + '</div><hr><div class="md">' + renderSide(card.back) + '</div></details>').join('') + '<a class="btn" href="#/kartlar">' + esc(T("Kartlara dön", "Back to cards")) + '</a></div>';
      view.querySelector("#cardsBrowseTopic").onchange = (e) => paintBrowse(e.target.value);
    };
    if (!keys.length) return renderHome(view);
    paintBrowse(keys[0]);
  }

  async function render(view, p) {
    if (p[0] === "incele") return renderBrowse(view);
    if (p[0] === "calis") return renderStudy(view, null);
    if (p[0] === "konu" && p.length >= 5) return renderStudy(view, p.slice(1, 5).join("/"));
    return renderHome(view);
  }

  App.router.register("kartlar", render);
  App.cards = { buildFor, cloze, addKey, removeKey, autoAdd, stats, queue, grade, byKey, cardHtml, bindCard, renderSide };
})();
