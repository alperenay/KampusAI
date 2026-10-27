/* =========================================================
   review-queue.js — "Bugün Tekrar Etmen Gerekenler" (v1.42)

   Hap kartları, yanlış defteri, uyarlanır testler ve "hatalı" diye işaretlenen yapay zekâ cevapları ayrı
   ayrı tekrar takvimi tutuyordu. Bu modül dördünü tek bir günlük listede toplar. Kayıt biçimlerine
   dokunmaz: her kaynak için bir bağdaştırıcı (adapter) kaydı ortak öğeye çevirir.

   Ortak öğe:
     { id, type, key?, title, detail, due (ms), box, overdue (gün), weak (0..1), priority, href, inline? }

   Ortak kurallar
     • "Bugün" = vadesi gün sonuna kadar dolan her öğe (sabah çalışan öğrenci akşamkini de görür).
     • Öncelik = tür ağırlığı + gecikme (gün başına 4, en çok 40) + zayıflık × 40
         tür ağırlığı: yanlış 40 · test konusu 30 · hatalı YZ cevabı 25 · kart 20
       (kendi yaptığın hata en önce, sonra ölçülmüş zayıf konu, sonra düzeltilmiş bilgi, sonra kartlar)
     • Kendi takvimi olmayan kaynaklar ortak merdiveni kullanır: LADDER = 1, 3, 7, 16, 35 gün.
       Bildim → bir üst basamak, Bilemedim → ilk basamak (yarın).

   Kaynaklar ve durumları
     kart      → "cards" deposu; kural cards.js'de (kutu 0–7). Konu başına tek satır: "N kart".
     yanlış    → "mistakes" deposu; kural App.mistakes.review (1, 3, 7, 16 gün → öğrenildi).
     test      → kayıt tutulmaz; son testlerden türetilir. Yetenek (App.adaptive.initial, 1–3) düştükçe
                 aralık kısalır: <1,7 → 1 gün · <2,2 → 3 · <2,6 → 7 · <2,85 → 16 · üstü 35 gün.
     geri bild.→ meta "rq:fb:<ref>" { box, due }; ilk tekrar işaretlemeden 1 gün sonra.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const L = (v) => App.L(v);
  const DAY = 24 * 3600 * 1000;
  const LADDER = [1, 3, 7, 16, 35];
  const WEIGHT = { mistake: 40, quiz: 30, feedback: 25, card: 20 };
  const ICON = { mistake: "bookmark", quiz: "target", feedback: "flag", card: "layers" };
  const FB = "rq:fb:";

  const endOfToday = (now) => { const d = new Date(now); d.setHours(23, 59, 59, 999); return d.getTime(); };
  const plain = (html) => String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const short = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
  const label = (key) => { const f = key && App.lessons && App.lessons.find(key); return f ? L(f.outcome.title) : ""; };
  const where = (key) => {
    const f = key && App.lessons && App.lessons.find(key);
    return f ? f.grade.id + ". " + T("sınıf", "grade") + " · " + L(f.subject.name) : "";
  };

  function priority(type, overdue, weak) {
    return WEIGHT[type] + Math.min(40, Math.max(0, overdue) * 4) + Math.round(Math.max(0, Math.min(1, weak)) * 40);
  }
  function item(o, now) {
    const overdue = Math.max(0, Math.floor((now - o.due) / DAY));
    return Object.assign(o, { overdue, priority: priority(o.type, overdue, o.weak || 0) });
  }
  /** Ortak merdiven: Bildim → üst basamak, Bilemedim → ilk basamak */
  function ladderNext(box, ok, now) {
    const b = ok ? Math.min(LADDER.length - 1, (box || 0) + 1) : 0;
    return { box: b, due: new Date((now || Date.now()) + LADDER[ok ? b : 0] * DAY).toISOString() };
  }
  /** Test konusunun tekrar aralığı (gün) — yetenek 1..3 */
  function quizInterval(ability) {
    return ability < 1.7 ? 1 : ability < 2.2 ? 3 : ability < 2.6 ? 7 : ability < 2.85 ? 16 : 35;
  }

  /* ---------------- Bağdaştırıcılar ---------------- */
  const adapters = {
    async card(now, horizon) {
      if (!App.cards) return [];
      const st = await App.cards.stats();
      const due = st.all.filter((r) => r.box > 0 && Date.parse(r.due) <= horizon);
      const fresh = st.all.filter((r) => r.box === 0).sort((a, b) => String(a.added).localeCompare(String(b.added))).slice(0, st.newLeft);
      const by = new Map();
      due.concat(fresh).forEach((r) => {
        const g = by.get(r.key) || { due: 0, fresh: 0, oldest: Infinity, lapses: 0 };
        if (r.box > 0) { g.due++; g.oldest = Math.min(g.oldest, Date.parse(r.due)); g.lapses += r.lapses || 0; } else g.fresh++;
        by.set(r.key, g);
      });
      return Array.from(by.entries()).filter(([key]) => App.lessons.find(key)).map(([key, g]) => item({
        id: "card:" + key, type: "card", key, title: label(key), where: where(key),
        detail: T((g.due ? g.due + " kart tekrar" : "") + (g.due && g.fresh ? " · " : "") + (g.fresh ? g.fresh + " yeni kart" : ""),
          (g.due ? g.due + " to review" : "") + (g.due && g.fresh ? " · " : "") + (g.fresh ? g.fresh + " new" : "")),
        n: g.due + g.fresh, due: g.oldest === Infinity ? now : g.oldest, weak: Math.min(1, g.lapses / Math.max(1, g.due) / 3),
        href: "#/kartlar/konu/" + key
      }, now));
    },

    async mistake(now, horizon) {
      const rows = await App.db.getAll("mistakes").catch(() => []);
      return rows.filter((m) => !m.mastered && Date.parse(m.nextAt || 0) <= horizon).map((m) => item({
        id: "mistake:" + m.id, type: "mistake", ref: m.id, key: m.key || "", title: m.label || T("Yanlış defteri", "Mistake notebook"),
        where: m.key ? where(m.key) : "", detail: short(plain(m.q), 140), due: Date.parse(m.nextAt || 0) || now,
        box: m.reviews || 0, weak: (m.reviews ? 0.2 : 0.5) + (m.errType === "kavram" ? 0.3 : 0),
        href: "#/yanlislar", inline: true
      }, now));
    },

    async quiz(now, horizon) {
      const rows = (await App.db.getAll("quizzes").catch(() => [])).filter((q) => q.key && q.total > 0 && !q.demo && !q.research);
      const last = new Map();
      rows.forEach((q) => { const p = last.get(q.key); if (!p || String(q.date) > String(p.date)) last.set(q.key, q); });
      const out = [];
      last.forEach((q, key) => {
        if (!App.lessons.find(key)) return;
        const ability = App.adaptive ? App.adaptive.initial(rows, key) : 1 + 2 * (q.correct / q.total);
        const days = quizInterval(ability);
        const due = Date.parse(q.date) + days * DAY;
        if (!(due <= horizon)) return;
        const pct = Math.round((q.correct / q.total) * 100);
        out.push(item({
          id: "quiz:" + key, type: "quiz", key, title: label(key), where: where(key),
          detail: T("Son test %" + pct + " · " + days + " günlük aralık doldu", "Last quiz " + pct + "% · " + days + "-day interval reached"),
          due, ability, weak: (3 - ability) / 2, href: "#/test/" + key
        }, now));
      });
      return out;
    },

    async feedback(now, horizon) {
      if (!App.feedback) return [];
      const [list, meta] = await Promise.all([App.feedback.all(), App.db.getAll("meta").catch(() => [])]);
      const st = new Map(meta.filter((r) => r.id && r.id.indexOf(FB) === 0).map((r) => [r.id.slice(FB.length), r]));
      return list.filter((r) => (r.rating === "down" || r.rating === "wrong") && (r.q || r.a)).map((r) => {
        const s = st.get(r.ref);
        if (s && s.done) return null;
        const due = s ? Date.parse(s.due) : Date.parse(r.at) + DAY;
        if (!(due <= horizon)) return null;
        return item({
          id: "feedback:" + r.ref, type: "feedback", ref: r.ref, key: r.key || "", rec: r,
          title: r.source === "quiz" ? (r.label || label(r.key) || T("Hatalı test sorusu", "Reported quiz question")) : T("Hatalı bulunan cevap", "Answer marked wrong"),
          where: r.key ? where(r.key) : "", detail: short(plain(r.q || r.a), 140),
          due, box: s ? s.box : 0, weak: r.fix ? 0.4 : 0.2, inline: true, href: "#/geribildirim"
        }, now);
      }).filter(Boolean);
    }
  };

  /** Bugünkü birleşik liste (önceliğe göre). types ile kaynak süzülebilir. */
  async function list(opts) {
    const now = (opts && opts.now) || Date.now(), horizon = endOfToday(now);
    const types = (opts && opts.types) || Object.keys(adapters);
    const parts = await Promise.all(types.map((k) => adapters[k](now, horizon).catch((e) => { console.warn("tekrar:", k, e); return []; })));
    return [].concat(...parts).sort((a, b) => b.priority - a.priority || a.due - b.due);
  }
  async function summary() {
    const items = await list();
    const by = { card: 0, mistake: 0, quiz: 0, feedback: 0 };
    items.forEach((x) => { by[x.type] += x.type === "card" ? x.n : 1; });
    return { total: items.length, by, top: items[0] || null };
  }

  /** Satır içi tekrar sonucu (yanlış ve geri bildirim öğeleri) */
  async function grade(it, ok) {
    if (it.type === "mistake") {
      const m = await App.db.get("mistakes", it.ref);
      if (m) await App.mistakes.review(m, ok);
      return;
    }
    if (it.type === "feedback") {
      const id = FB + it.ref, cur = await App.db.get("meta", id).catch(() => null);
      const nx = ladderNext(cur ? cur.box : 0, ok);
      // Son basamağı da bilince listeden çıkar (yanlış defterindeki "öğrenildi" gibi)
      const done = ok && cur && cur.box === LADDER.length - 1;
      await App.db.put("meta", { id, kind: "rq-fb", ref: it.ref, box: nx.box, due: nx.due, done, at: new Date().toISOString() });
    }
  }

  /* ---------------- Sayfa ---------------- */
  const TYPE_NAME = {
    mistake: ["Yanlış", "Mistake"], quiz: ["Test konusu", "Quiz topic"], feedback: ["Düzeltilen bilgi", "Corrected answer"], card: ["Hap kart", "Flashcards"]
  };
  const typeName = (k) => T(TYPE_NAME[k][0], TYPE_NAME[k][1]);

  function rowHtml(it) {
    const late = it.overdue > 0 ? '<span class="rq-late">' + esc(T(it.overdue + " gün gecikti", it.overdue + " d overdue")) + "</span>" : "";
    const act = it.inline
      ? '<button class="btn btn--sm" type="button" data-rq-open>' + App.icon("eye") + esc(T("Tekrar et", "Review")) + "</button>"
      : '<a class="btn btn--sm btn--primary" href="' + esc(it.href) + '">' + App.icon("play") + esc(it.type === "quiz" ? T("Test çöz", "Take quiz") : T("Çalış", "Study")) + "</a>";
    return '<li class="rq-item rq-item--' + it.type + '" data-rq="' + esc(it.id) + '">' +
      '<span class="rq-item__ico" aria-hidden="true">' + App.icon(ICON[it.type]) + "</span>" +
      '<div class="rq-item__body"><div class="rq-item__meta"><span class="rq-type">' + esc(typeName(it.type)) + "</span>" +
        (it.where ? '<span class="rq-where">' + esc(it.where) + "</span>" : "") + late + "</div>" +
        '<div class="rq-item__title">' + esc(it.title || "") + "</div>" +
        (it.detail ? '<div class="rq-item__detail md">' + (App.markdown ? App.markdown.render(it.detail).replace(/^<p>|<\/p>$/g, "") : esc(it.detail)) + "</div>" : "") +
        '<div class="rq-item__panel" hidden></div></div>' +
      '<div class="rq-item__act">' + act + "</div></li>";
  }

  function panelHtml(it, m) {
    const md = (s) => (App.markdown ? App.markdown.render(String(s || "")) : esc(s));
    const conf = App.confidence ? App.confidence.chipsHtml("rqc-" + it.id) : "";
    const btns = conf + '<div class="rq-grade"><button class="btn btn--sm btn--primary" type="button" data-rq-ok>' + App.icon("check") + esc(T("Bildim", "Got it")) + "</button>" +
      '<button class="btn btn--sm" type="button" data-rq-again>' + App.icon("refresh") + esc(T("Bilemedim, yarın tekrar", "Missed — again tomorrow")) + "</button></div>";
    if (it.type === "mistake" && m) {
      const opts = Array.isArray(m.options) && m.options.length ? '<ol class="rq-opts" type="A">' + m.options.map((o, i) =>
        "<li" + (i === m.answer ? ' class="is-right"' : i === m.chosen ? ' class="is-wrong"' : "") + ">" + md(o) + "</li>").join("") + "</ol>" : "";
      return '<div class="rq-q md">' + (m.image ? '<img class="rq-img" alt="" src="' + esc(m.image) + '">' : "") + md(m.q) + "</div>" +
        '<details class="rq-reveal"><summary>' + esc(T("Cevabı ve açıklamayı göster", "Show answer and explanation")) + "</summary>" + opts +
        (m.explain ? '<div class="rq-explain md">' + md(m.explain) + "</div>" : "") + "</details>" + btns;
    }
    if (it.type === "feedback") {
      const r = it.rec;
      const opts = Array.isArray(r.options) && r.options.length ? '<ol class="rq-opts" type="A">' + r.options.map((o) => "<li>" + md(o) + "</li>").join("") + "</ol>" : "";
      return '<div class="rq-q md">' + md(r.q || "") + "</div>" + opts +
        '<details class="rq-reveal"><summary>' + esc(T("Doğrusunu göster", "Show the correction")) + "</summary>" +
          (r.fix ? '<div class="rq-fix"><b>' + esc(T("Senin düzeltmen: ", "Your correction: ")) + "</b>" + md(r.fix) + "</div>" : "") +
          (r.reason ? '<p class="hint">' + esc(T("İşaretleme nedeni: ", "Reason: ") + r.reason) + "</p>" : "") +
          (r.a ? '<details class="rq-wrong"><summary>' + esc(T("Yapay zekânın hatalı cevabı", "The AI's wrong answer")) + '</summary><div class="md">' + md(short(r.a, 1500)) + "</div></details>" : "") +
          (!r.fix ? '<p class="hint">' + esc(T("Düzeltme yazılmamış: doğrusunu konu anlatımından ya da öğretmeninden kontrol et.", "No correction was written: check the lesson or ask your teacher.")) + "</p>" : "") +
        "</details>" + btns;
    }
    return "";
  }

  async function render(view) {
    App.setTitle(T("Bugün Tekrar Etmen Gerekenler", "What to review today"));
    let filter = App.prefs.get("rqFilter", "all");
    let items = await list();
    const open = new Set();      // yeniden çizimde açık kalan tekrar panelleri

    async function openPanel(row, it) {
      const panel = row.querySelector(".rq-item__panel");
      const m = it.type === "mistake" ? await App.db.get("mistakes", it.ref) : null;
      panel.innerHTML = panelHtml(it, m); panel.hidden = false; row.classList.add("is-open");
      open.add(it.id);
      App.hydrateIcons(panel);
    }

    function paint() {
      const shown = filter === "all" ? items : items.filter((x) => x.type === filter);
      const count = (k) => items.filter((x) => k === "all" || x.type === k).length;
      const chip = (k, name) => '<button class="rq-chip' + (filter === k ? " is-active" : "") + '" type="button" data-rq-filter="' + k + '" aria-pressed="' + (filter === k) + '">' +
        esc(name) + ' <span class="rq-chip__n">' + count(k) + "</span></button>";
      const cardsDue = items.filter((x) => x.type === "card").reduce((s, x) => s + x.n, 0);
      view.innerHTML =
        '<div class="page page--narrow rq">' +
          '<div class="page-head"><div><h1>' + esc(T("Bugün Tekrar Etmen Gerekenler", "What to review today")) + "</h1>" +
            "<p>" + esc(T("Kartların, yanlışların, testlerin ve düzelttiğin yapay zekâ cevapları tek listede; en acil olan en üstte.",
              "Your flashcards, mistakes, quizzes and corrected AI answers in one list, most urgent first.")) + "</p></div>" +
            (cardsDue ? '<div class="page-head__actions"><a class="btn" href="#/kartlar/calis">' + App.icon("layers") + esc(T("Tüm kartları çalış (" + cardsDue + ")", "Study all cards (" + cardsDue + ")")) + "</a></div>" : "") + "</div>" +
          '<div class="rq-filters" role="group" aria-label="' + esc(T("Tür", "Type")) + '">' + chip("all", T("Hepsi", "All")) +
            ["mistake", "quiz", "feedback", "card"].map((k) => chip(k, typeName(k))).join("") + "</div>" +
          (shown.length ? '<ol class="rq-list">' + shown.map(rowHtml).join("") + "</ol>"
            : App.ui.empty("checkCircle", T("Bugünlük tekrar kalmadı", "Nothing left to review today"),
              T("Yeni konu çalışabilir ya da test çözebilirsin; zamanı gelenler burada yeniden belirir.", "Study something new or take a quiz; due items will show up here again."))) +
          '<p class="hint rq-rule">' + esc(T("Sıralama: kendi yanlışların → zayıf test konuları → düzelttiğin bilgiler → kartlar; geciken öğeler öne geçer. Bildim → aralık uzar (1, 3, 7, 16, 35 gün), Bilemedim → yarın yeniden.",
            "Order: your mistakes → weak quiz topics → corrected answers → flashcards; overdue items move up. Got it → longer interval (1, 3, 7, 16, 35 days), Missed → tomorrow.")) + "</p>" +
        "</div>";
      App.hydrateIcons(view);
      open.forEach((id) => {
        const row = view.querySelector('[data-rq="' + CSS.escape(id) + '"]'), it = items.find((x) => x.id === id);
        if (row && it) openPanel(row, it); else open.delete(id);
      });
    }
    paint();

    const onClick = async (e) => {
      const f = e.target.closest("[data-rq-filter]");
      if (f) { filter = f.dataset.rqFilter; App.prefs.set("rqFilter", filter); paint(); return; }
      const row = e.target.closest("[data-rq]"); if (!row) return;
      const it = items.find((x) => x.id === row.dataset.rq); if (!it) return;
      if (e.target.closest("[data-rq-open]")) {
        const panel = row.querySelector(".rq-item__panel");
        if (!panel.hidden) { panel.hidden = true; row.classList.remove("is-open"); open.delete(it.id); return; }
        await openPanel(row, it);
        return;
      }
      const ok = !!e.target.closest("[data-rq-ok]"), again = !!e.target.closest("[data-rq-again]");
      if (!ok && !again) return;
      await grade(it, ok);
      const c = App.confidence ? App.confidence.read(row, "rqc-" + it.id) : null;
      if (c) App.confidence.record(it.type, it.key, c, ok).catch(() => {});
      items = items.filter((x) => x !== it); open.delete(it.id);
      row.classList.add("is-done");
      App.ui.toast(ok ? T("Güzel! Sonraki tekrar daha ileri bir tarihte.", "Nice! The next review is further out.") : T("Yarın yeniden sorulacak.", "It will come back tomorrow."));
      setTimeout(paint, 260);
      window.dispatchEvent(new CustomEvent("da:review-queue"));
    };
    view.addEventListener("click", onClick);
    return () => view.removeEventListener("click", onClick);
  }

  App.router.register("tekrar", render);
  App.reviewQueue = { list, summary, grade, adapters, priority, ladderNext, quizInterval, LADDER, WEIGHT };
})();
