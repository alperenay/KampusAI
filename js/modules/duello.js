/* =========================================================
   duello.js — İnternetsiz Arkadaş Düellosu (v1.44)   #/duello

   İki telefon, sunucu ve internet olmadan, Sınıf Modu'nun sıkıştırılmış QR protokolüyle (KAIC1) eşleşir:
     1. Kuran oyuncu kazanımı, soru sayısını (5/10/15) ve soru süresini seçer; düello paketi ("d") QR olur.
        Paket ortak bir BAŞLAMA ANINI (st, ms) taşır: iki cihaz da aynı anda geri sayıma girer.
     2. Rakip QR'ı okutur. Her soru aynı zaman penceresinde açılır (st + i·süre); erken cevap verilse de bir
        sonraki soru herkes için aynı anda gelir (eş zamanlı oyun). Telefon saatleri ağdan ayarlandığı için
        sapma genellikle 1 saniyenin altındadır.
     3. Bitince her oyuncu sonuç QR'ını ("dr": cevaplar + cevaplama süreleri) gösterir; karşı taraf okutunca iki
        cihazda da aynı skor tablosu hesaplanır (puanlar cevaplardan yeniden hesaplanır).
   Puan: doğru cevap 100 + hız bonusu (kalan sürenin oranı × 50). Kazanana rozet (meta "duel:<id>", won).
   Yanlış ve boş bırakılan sorular yanlış defterine, sonuç kazanım testi olarak "quizzes"e yazılır: ikisi de
   birleşik tekrar listesine (#/tekrar) girer.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const L = (v) => App.L(v);
  const LETTERS = "ABCDEF";
  const SM = () => App.sinifModu;

  /* ---------------- Saf hesaplar (sınanabilir) ---------------- */
  /** Bir oyuncunun puanı: doğru 100 + hız bonusu (0–50) */
  function scoreOf(duel, answers, ms) {
    let total = 0, correct = 0;
    const per = duel.q.map((q, i) => {
      const ok = answers[i] === q.a;
      const used = Number.isFinite(ms[i]) ? ms[i] : duel.sec * 1000;
      const bonus = ok ? Math.round(50 * Math.max(0, 1 - used / (duel.sec * 1000))) : 0;
      const p = ok ? 100 + bonus : 0;
      total += p; if (ok) correct++;
      return { ok, p, bonus };
    });
    return { total, correct, per };
  }
  /** İki oyuncunun sonucu: kazanan "a" | "b" | "tie" (eşitlikte doğru sayısı, sonra toplam süre) */
  function decide(duel, A, B) {
    const sa = scoreOf(duel, A.r, A.ms), sb = scoreOf(duel, B.r, B.ms);
    let w = sa.total > sb.total ? "a" : sb.total > sa.total ? "b" : "tie";
    if (w === "tie") {
      if (sa.correct !== sb.correct) w = sa.correct > sb.correct ? "a" : "b";
      else { const ta = A.ms.reduce((s, x) => s + x, 0), tb = B.ms.reduce((s, x) => s + x, 0); w = ta < tb ? "a" : tb < ta ? "b" : "tie"; }
    }
    const bothMissed = duel.q.map((q, i) => (A.r[i] !== q.a && B.r[i] !== q.a ? i : -1)).filter((i) => i >= 0);
    return { a: sa, b: sb, winner: w, bothMissed };
  }
  /** Şu an hangi aşamadayız: { phase: "wait"|"q"|"done", i, left (ms) } */
  function phaseAt(duel, now) {
    const t = now - duel.st, len = duel.sec * 1000;
    if (t < 0) return { phase: "wait", i: -1, left: -t };
    const i = Math.floor(t / len);
    if (i >= duel.q.length) return { phase: "done", i: duel.q.length, left: 0 };
    return { phase: "q", i, left: len - (t - i * len) };
  }

  /* ---------------- Kayıt ---------------- */
  const getRec = (id) => App.db.get("meta", "duel:" + id).catch(() => null);
  const putRec = (r) => App.db.put("meta", r);
  async function saveLearning(duel, rec) {
    const key = duel.ks[0];
    if (!App.lessons.find(key)) return;
    const qs = duel.q.map((q, i) => ({ q: q.q, options: q.o, answer: q.a, difficulty: q.d || 2, explain: q.e || "", chosen: rec.mine.r[i] }));
    const correct = qs.filter((q) => q.chosen === q.answer).length, empty = qs.filter((q) => q.chosen < 0).length;
    await App.db.put("quizzes", { id: "duel-" + duel.id + "-" + (rec.role || "x"), key, label: T("Düello", "Duel") + " · " + L(App.lessons.find(key).outcome.title),
      date: new Date().toISOString(), total: qs.length, correct, wrong: qs.length - correct - empty, empty, source: "duel", model: "", questions: qs });
    if (App.mistakes) for (const q of qs) if (q.chosen !== q.answer)
      await App.mistakes.add({ source: "quiz", key, label: T("Düello", "Duel") + " · " + L(App.lessons.find(key).outcome.title), q: q.q, options: q.options, answer: q.answer, chosen: q.chosen >= 0 ? q.chosen : undefined, explain: q.explain });
  }

  /* ---------------- Sayfalar ---------------- */
  const back = () => '<a class="btn btn--sm btn--ghost" href="#/duello">' + App.icon("chevronL") + esc(T("Düello", "Duel")) + "</a>";

  async function renderHome(view) {
    App.setTitle(T("Arkadaş Düellosu", "Friend Duel"));
    const recs = (await App.db.getAll("meta").catch(() => [])).filter((r) => r.kind === "duel").sort((a, b) => String(b.at).localeCompare(String(a.at)));
    const wins = recs.filter((r) => r.won).length;
    view.innerHTML = '<div class="page page--narrow du">' +
      '<div class="page-head"><div><h1>' + esc(T("Arkadaş Düellosu", "Friend Duel")) + "</h1><p>" +
        esc(T("İnternet gerekmez: iki telefon QR ile eşleşir, aynı soruları aynı anda çözersiniz. Hızlı ve doğru olan kazanır; kaçırdığın sorular tekrar listene eklenir.", "No internet: two phones pair by QR and answer the same questions at the same time.")) + "</p></div></div>" +
      '<div class="du-acts"><a class="card du-act" href="#/duello/yeni">' + App.icon("plus") + "<b>" + esc(T("Düello kur", "Create duel")) + "</b><small>" + esc(T("Kazanımı seç, QR'ı arkadaşına göster", "Pick a topic and show the QR")) + "</small></a>" +
        '<button class="card du-act" type="button" id="duJoin">' + App.icon("scan") + "<b>" + esc(T("Düelloya katıl", "Join a duel")) + "</b><small>" + esc(T("Arkadaşının QR'ını okut", "Scan your friend's QR")) + "</small></button></div>" +
      '<section class="card du-badges"><h2>' + App.icon("star") + esc(T("Rozetlerin", "Your badges")) + "</h2><p><b>" + wins + "</b> " + esc(T("düello zaferi", "duel wins")) + " · <b>" + recs.length + "</b> " + esc(T("düello", "duels")) + "</p>" +
        '<div class="du-badge-row">' + [[1, T("İlk zafer", "First win")], [5, T("Düellocu", "Duellist")], [20, T("Şampiyon", "Champion")]].map(([n, nm]) =>
          '<span class="du-badge' + (wins >= n ? " is-on" : "") + '">' + App.icon("star") + esc(nm) + " <small>" + n + "</small></span>").join("") + "</div></section>" +
      (recs.length ? '<h2 class="sm-h">' + esc(T("Son düellolar", "Recent duels")) + '</h2><ul class="sm-list">' + recs.slice(0, 10).map((r) =>
        '<li><a class="card sm-li" href="#/duello/oyna/' + esc(r.duel.id) + '"><b>' + esc(r.duel.ti) + "</b><span>" + esc(r.final ? (r.won ? T("Kazandın", "You won") : r.final.winner === "tie" ? T("Berabere", "Draw") : T("Kaybettin", "You lost")) + " · " + r.final.me + " – " + r.final.op : T("Sonuç bekleniyor", "Waiting for result")) + "</span>" + App.icon("chevron") + "</a></li>").join("") + "</ul>" : "") +
    "</div>";
    App.hydrateIcons(view);
    view.querySelector("#duJoin").addEventListener("click", async () => {
      const res = await SM().scan(T("Düello QR'ını okut", "Scan duel QR"), "d");
      if (!res) return;
      const d = res.data, cur = await getRec(d.id);
      if (!cur) await putRec({ id: "duel:" + d.id, kind: "duel", role: "guest", at: new Date().toISOString(), duel: d, digest: res.digest, name: App.prefs.get("duelName", "") || App.prefs.get("userName", "") || T("Misafir", "Guest") });
      location.hash = "#/duello/oyna/" + encodeURIComponent(d.id);
    });
  }

  async function renderNew(view) {
    App.setTitle(T("Düello kur", "Create duel"));
    const C = App.data.curriculum;
    const st = { g: String(App.prefs.get("curGrade", "9") || "9"), s: "", key: "" };
    view.innerHTML = '<div class="page page--narrow du">' + back() +
      '<div class="page-head"><div><h1>' + esc(T("Düello kur", "Create duel")) + "</h1></div></div>" +
      '<section class="card du-form"><div class="sm-row">' +
        '<label class="field"><span class="field__label">' + esc(T("Sınıf", "Grade")) + '</span><select class="select" id="duG">' + C.grades.map((g) => '<option value="' + g.id + '"' + (g.id === st.g ? " selected" : "") + ">" + esc(C.gradeName(g.id)) + "</option>").join("") + "</select></label>" +
        '<label class="field"><span class="field__label">' + esc(T("Ders", "Subject")) + '</span><select class="select" id="duS"></select></label></div>' +
        '<label class="field"><span class="field__label">' + esc(T("Kazanım", "Outcome")) + '</span><select class="select" id="duK"></select></label>' +
        '<div class="sm-row"><label class="field"><span class="field__label">' + esc(T("Soru sayısı", "Questions")) + '</span><select class="select" id="duN"><option>5</option><option selected>10</option><option>15</option></select></label>' +
          '<label class="field"><span class="field__label">' + esc(T("Soru başına süre (sn)", "Seconds per question")) + '</span><select class="select" id="duSec"><option>15</option><option selected>20</option><option>30</option><option>45</option></select></label></div>' +
        '<label class="field"><span class="field__label">' + esc(T("Adın (rakip görecek)", "Your name")) + '</span><input class="input" id="duName" maxlength="30" value="' + esc(App.prefs.get("duelName", "") || App.prefs.get("userName", "")) + '"></label>' +
        '<div class="form-actions"><span class="hint" id="duMsg" aria-live="polite"></span><button class="btn btn--primary" type="button" id="duMake">' + App.icon("scan") + esc(T("Soruları hazırla ve QR oluştur", "Prepare questions and create QR")) + "</button></div></section></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    const subj = () => { const g = C.findGrade($("#duG").value); st.g = g.id; $("#duS").innerHTML = g.subjects.filter((s) => s.units.length).map((s) => '<option value="' + s.id + '">' + esc(L(s.name)) + "</option>").join(""); outs(); };
    const outs = () => { const s = C.findSubject(st.g, $("#duS").value); $("#duK").innerHTML = (s ? s.units : []).map((u) => '<optgroup label="' + esc(L(u.name)) + '">' + u.outcomes.map((o) => '<option value="' + esc(C.key(st.g, s.id, u.id, o.id)) + '">' + esc((o.code ? o.code + " · " : "") + L(o.title)) + "</option>").join("") + "</optgroup>").join(""); };
    $("#duG").addEventListener("change", subj); $("#duS").addEventListener("change", outs); subj();
    $("#duMake").addEventListener("click", async () => {
      const key = $("#duK").value, n = Number($("#duN").value), sec = Number($("#duSec").value), name = ($("#duName").value || T("Kurucu", "Host")).trim().slice(0, 30);
      if (!key) return;
      App.prefs.set("duelName", name);
      const btn = $("#duMake"), msg = $("#duMsg");
      btn.disabled = true; msg.textContent = T("Sorular hazırlanıyor…", "Preparing questions…");
      try {
        let pool = await SM().fromSaved(key);
        if (pool.length < n) { msg.textContent = T("Yapay zekâyla soru üretiliyor…", "Generating questions with AI…"); pool = pool.concat((await SM().fromAI(key)).filter((q) => !pool.some((p) => p.q === q.q))); }
        if (pool.length < n) throw new Error(T("Bu kazanımda yeterli soru yok (" + pool.length + "/" + n + "). Önce bu konuda test çöz ya da yapay zekâ bağlantısını aç.", "Not enough questions for this outcome."));
        const qs = SM().pickBalanced(pool, n).map((q) => ({ k: 0, q: q.q, o: q.o, a: q.a, d: q.d || 2 }));
        const f = App.lessons.find(key);
        const duel = { v: 1, t: "d", id: uid("duel").slice(0, 24), ti: L(f.outcome.title).slice(0, 100), ks: [key], q: qs, sec, hn: name, st: Date.now() + 60000 };
        SM().validate(duel);
        const frames = await SM().pack(duel);
        await putRec({ id: "duel:" + duel.id, kind: "duel", role: "host", at: new Date().toISOString(), duel, digest: SM().frame(frames[0]).digest, name });
        location.hash = "#/duello/oyna/" + duel.id;
      } catch (e) { msg.textContent = e.message || String(e); btn.disabled = false; }
    });
  }

  async function renderPlay(view, id) {
    let rec = await getRec(id);
    if (!rec) { view.innerHTML = '<div class="page">' + App.ui.empty("close", T("Düello bulunamadı", "Duel not found"), "") + "</div>"; return; }
    const d = rec.duel;
    App.setTitle(T("Düello", "Duel") + " · " + d.ti);
    let timer = 0, player = null, shownQ = -1;
    const mine = rec.mine || { r: d.q.map(() => -1), ms: d.q.map(() => d.sec * 1000) };
    const $ = (s) => view.querySelector(s);

    function shell(inner) {
      view.innerHTML = '<div class="page page--narrow du">' + back() + '<div class="page-head"><div><h1>' + esc(d.ti) + "</h1><p>" +
        esc(d.q.length + T(" soru · ", " questions · ") + d.sec + T(" sn/soru · kuran: ", " s each · host: ") + d.hn) + "</p></div></div>" + inner + "</div>";
      App.hydrateIcons(view);
    }
    async function lobby() {
      shell('<div class="sm-grid"><section class="card sm-share"><h2>' + esc(rec.role === "host" ? T("Arkadaşın bu QR'ı okutsun", "Let your friend scan this") : T("Hazır!", "Ready!")) + '</h2><div id="duQR"></div></section>' +
        '<section class="card du-count"><span class="hint">' + esc(T("Başlamasına", "Starts in")) + '</span><b id="duLeft">–</b><p class="hint">' + esc(T("Geri sayım iki telefonda da aynı anda biter.", "The countdown ends on both phones at once.")) + "</p></section></div>");
      if (rec.role === "host") player = await SM().mountPlayer($("#duQR"), await SM().pack(d));
      else $("#duQR").innerHTML = '<p class="du-ready">' + App.icon("checkCircle") + esc(T("Düelloya katıldın. Soruları birlikte başlayacaksınız.", "You joined. You'll start together.")) + "</p>";
      App.hydrateIcons(view);
    }
    function question(i) {
      const q = d.q[i];
      shell('<section class="card du-q"><div class="du-q__top"><span>' + (i + 1) + " / " + d.q.length + '</span><span class="du-timer" id="duT"></span></div>' +
        '<div class="du-bar"><i id="duBar"></i></div><div class="md du-q__text">' + App.markdown.render(q.q) + '</div><div class="sm-opts" role="radiogroup">' +
        q.o.map((o, j) => '<button class="sm-opt du-opt" type="button" data-o="' + j + '"' + (mine.r[i] >= 0 ? " disabled" : "") + '><span class="sm-opt__l">' + LETTERS[j] + '</span><span class="md">' + App.markdown.render(o).replace(/^<p>|<\/p>$/g, "") + "</span></button>").join("") +
        '</div><p class="hint du-wait" id="duWait"' + (mine.r[i] >= 0 ? "" : " hidden") + ">" + esc(T("Cevabın kaydedildi; sonraki soru herkes için aynı anda gelecek.", "Saved; the next question starts for everyone at once.")) + "</p></section>");
      view.querySelectorAll("[data-o]").forEach((b) => b.addEventListener("click", async () => {
        const ph = phaseAt(d, Date.now()); if (ph.phase !== "q" || ph.i !== i || mine.r[i] >= 0) return;
        mine.r[i] = Number(b.dataset.o); mine.ms[i] = Math.round(d.sec * 1000 - ph.left);
        rec.mine = mine; await putRec(rec);
        view.querySelectorAll("[data-o]").forEach((x) => { x.disabled = true; x.classList.toggle("is-picked", x === b); });
        $("#duWait").hidden = false;
      }));
    }
    async function finish() {
      clearInterval(timer);
      if (!rec.done) { rec.done = true; rec.mine = mine; await putRec(rec); await saveLearning(d, rec); }
      const myRes = { v: 1, t: "dr", a: d.id, s: (rec.name || T("Oyuncu", "Player")).slice(0, 40), r: mine.r, ms: mine.ms };
      const s = scoreOf(d, mine.r, mine.ms);
      const fin = rec.final;
      shell((fin ? boardHtml() : "") +
        '<div class="sm-grid"><section class="card sm-share"><h2>' + esc(T("Sonuç QR'ın", "Your result QR")) + '</h2><div id="duQR"></div><p class="hint">' + esc(T("Arkadaşın bunu okutsun; sen de onunkini okut. Skor tablosu iki telefonda da oluşur.", "Scan each other's result QR to see the scoreboard.")) + "</p></section>" +
        '<section class="card"><h2>' + esc(T("Puanın", "Your score")) + ' <span class="sm-big">' + s.total + "</span></h2><p>" + esc(s.correct + " / " + d.q.length + T(" doğru", " correct")) + "</p>" +
          '<button class="btn btn--primary" type="button" id="duScanR">' + App.icon("scan") + esc(T("Rakibin sonucunu okut", "Scan opponent's result")) + "</button>" +
          '<p class="hint">' + esc(T("Yanlış ve boş bıraktığın sorular tekrar listene eklendi.", "Missed questions were added to your review list.")) + '</p><a class="btn btn--sm" href="#/tekrar">' + App.icon("refresh") + esc(T("Bugünkü tekrarlar", "Today's reviews")) + "</a></section></div>" +
        '<h2 class="sm-h">' + esc(T("Cevap anahtarı", "Answer key")) + '</h2><ol class="sm-solve">' + d.q.map((q, i) => '<li class="card sm-sq ' + (mine.r[i] === q.a ? "is-right" : "is-wrong") + '"><div class="sm-sq__q md">' + App.markdown.render(q.q) + "</div><p><b>" + esc(T("Doğru: ", "Correct: ")) + LETTERS[q.a] + ")</b> " + App.markdown.render(q.o[q.a]).replace(/^<p>|<\/p>$/g, "") +
          (mine.r[i] !== q.a ? ' · <span class="sm-yours">' + esc(T("Senin: ", "Yours: ")) + (mine.r[i] < 0 ? T("boş", "blank") : LETTERS[mine.r[i]]) + "</span>" : "") + (fin && fin.bothMissed.includes(i) ? ' <span class="du-both">' + esc(T("ikiniz de kaçırdınız", "you both missed")) + "</span>" : "") + "</p></li>").join("") + "</ol>");
      player = await SM().mountPlayer($("#duQR"), await SM().pack(myRes));
      $("#duScanR").addEventListener("click", async () => {
        const res = await SM().scan(T("Rakibin sonuç QR'ını okut", "Scan opponent's result"), "dr");
        if (!res) return;
        const op = res.data;
        if (op.a !== d.id || op.r.length !== d.q.length) { App.ui.toast(T("Bu sonuç başka bir düelloya ait.", "This result belongs to another duel."), "error"); return; }
        const dec = decide(d, mine, op);
        const meIsA = true, w = dec.winner === "tie" ? "tie" : dec.winner === "a" ? "me" : "op";
        rec.final = { me: dec.a.total, op: dec.b.total, opName: op.s, winner: w, bothMissed: dec.bothMissed };
        rec.won = meIsA && w === "me";
        await putRec(rec);
        if (rec.won) App.ui.toast(T("Tebrikler, düelloyu kazandın! 🏆", "You won the duel! 🏆"));
        if (App.badges) App.badges.check();
        finish();
      });
    }
    function boardHtml() {
      const f = rec.final;
      return '<section class="card du-board ' + (f.winner === "me" ? "is-win" : f.winner === "tie" ? "is-tie" : "is-lose") + '"><h2>' + App.icon(f.winner === "me" ? "star" : "flag") +
        esc(f.winner === "me" ? T("Kazandın!", "You won!") : f.winner === "tie" ? T("Berabere!", "Draw!") : T("Bu sefer rakibin kazandı", "Your opponent won")) + "</h2>" +
        '<div class="du-score"><div><span>' + esc(rec.name || T("Sen", "You")) + "</span><b>" + f.me + '</b></div><div class="du-vs">–</div><div><span>' + esc(f.opName) + "</span><b>" + f.op + "</b></div></div>" +
        (f.bothMissed.length ? '<p class="hint">' + esc(T("İkinizin de kaçırdığı sorular: ", "Questions you both missed: ") + f.bothMissed.map((i) => i + 1).join(", ")) + "</p>" : "") + "</section>";
    }
    const tick = async () => {
      const ph = phaseAt(d, Date.now());
      if (ph.phase === "wait") {
        if (!$("#duLeft")) await lobby();
        const el = $("#duLeft"); if (el) el.textContent = Math.ceil(ph.left / 1000) + T(" sn", " s");
      } else if (ph.phase === "q") {
        if (player) { player.stop(); player = null; }
        if (shownQ !== ph.i) { shownQ = ph.i; question(ph.i); }
        const el = $("#duT"), bar = $("#duBar");
        if (el) el.textContent = Math.ceil(ph.left / 1000);
        if (bar) bar.style.width = Math.round((ph.left / (d.sec * 1000)) * 100) + "%";
      } else { clearInterval(timer); finish(); }
    };
    if (phaseAt(d, Date.now()).phase === "done") finish();
    else { await tick(); timer = setInterval(tick, 200); }
    return () => { clearInterval(timer); if (player) player.stop(); };
  }

  function render(view, p) {
    if (p[0] === "yeni") return renderNew(view);
    if (p[0] === "oyna" && p[1]) return renderPlay(view, p[1]);
    return renderHome(view);
  }
  App.router.register("duello", render);
  App.duel = { scoreOf, decide, phaseAt };
})();
