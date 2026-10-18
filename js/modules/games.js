/* =========================================================
   games.js — Oyunlar   (#/oyunlar, #/oyunlar/<oyun>)

   Derslere göre sınıflanmış kısa, internetsiz oyunlar:
     Her ders: Doğru mu Yanlış mı? Fırtınası · Kavram Eşleştirme
     Matematik: 60 Saniye İşlem · Grafik Tahmini
     Fizik: Hedef Atış · Kimya: Denklem Denkleştirme, Periyodik Tablo
     Tarih: Tarih Şeridi · İngilizce: Kelime Kaydırma   (games-2.js)
   En iyi skorlar cihazda saklanır (tercih "gameBest").
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L = (o) => App.L(o);
  const C = () => App.data.curriculum;

  /* ---------------- Yardımcılar ---------------- */
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const inline = (s) => App.markdown.render(String(s)).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1");
  const bestAll = () => App.prefs.get("gameBest", {});
  const best = (id) => bestAll()[id] || 0;
  function saveBest(id, score) { const b = bestAll(); const nw = score > (b[id] || 0); if (nw) { b[id] = score; App.prefs.set("gameBest", b); } return nw; }
  const alive = (el) => el && el.isConnected;

  const GAMES = {};
  const ORDER = [];
  function add(id, def) { GAMES[id] = def; ORDER.push(id); }

  /** Oyun sayfasının iskeleti; oyun alanını döndürür */
  function shell(view, id) {
    const g = GAMES[id];
    App.setTitle(g.title());
    view.innerHTML = '<div class="page page--narrow game-page subj-' + g.subj + '">' +
      '<nav class="crumbs"><a href="#/oyunlar">' + esc(T("Oyunlar", "Games")) + '</a><span aria-hidden="true">›</span><span>' + esc(catName(g.subj)) + "</span></nav>" +
      '<div class="game-head"><span class="subj-ico subj-ico--lg">' + App.icon(g.icon) + '</span><div class="game-head__main"><h1>' + esc(g.title()) + "</h1><p>" + esc(g.desc()) + "</p></div>" +
        '<div class="game-best" title="' + esc(T("En iyi skorun", "Your best")) + '">' + App.icon("star") + '<b id="gBest">' + best(id) + "</b></div></div>" +
      '<div class="game-area" id="gArea"></div></div>';
    App.hydrateIcons(view);
    return view.querySelector("#gArea");
  }
  /** Bitiş ekranı */
  function endScreen(area, id, score, lines, again) {
    const nw = saveBest(id, score);
    const b = area.closest(".game-page") && area.closest(".game-page").querySelector("#gBest"); if (b) b.textContent = best(id);
    area.innerHTML = '<div class="game-end">' + App.icon(nw ? "star" : "checkCircle") + "<h2>" + esc(nw ? T("Yeni rekor!", "New record!") : T("Oyun bitti", "Game over")) + '</h2><div class="game-end__score">' + score + "</div>" +
      (lines || "") + '<div class="game-end__acts"><button class="btn btn--primary" type="button" data-again>' + App.icon("refresh") + esc(T("Yeniden oyna", "Play again")) + "</button>" +
      '<a class="btn" href="#/oyunlar">' + esc(T("Oyunlara dön", "All games")) + "</a></div></div>";
    App.hydrateIcons(area);
    area.querySelector("[data-again]").addEventListener("click", again);
  }
  /** Geri sayım çubuğu: { stop(), left() } */
  function countdown(area, secs, onTick, onEnd) {
    const bar = document.createElement("div"); bar.className = "game-timer"; bar.innerHTML = "<i></i><span></span>";
    area.prepend(bar);
    const t0 = performance.now(); let done = false;
    const iv = setInterval(() => {
      if (!alive(bar)) { clearInterval(iv); return; }
      const left = Math.max(0, secs - (performance.now() - t0) / 1000);
      bar.querySelector("i").style.width = (left / secs) * 100 + "%"; bar.querySelector("span").textContent = Math.ceil(left) + " sn";
      bar.classList.toggle("is-low", left < 10);
      if (onTick) onTick(left);
      if (left <= 0 && !done) { done = true; clearInterval(iv); onEnd(); }
    }, 100);
    return { stop() { done = true; clearInterval(iv); }, left: () => Math.max(0, secs - (performance.now() - t0) / 1000) };
  }
  /** Kapsam seçici (sınıf + ders) — içerik tabanlı oyunlar için */
  function scopeHtml(subjects) {
    const st = Object.assign({ grade: "all", subj: "all", mine: false }, App.prefs.get("gameScope", {}));
    const subs = new Map();
    C().grades.forEach((g) => g.subjects.forEach((s) => { if (s.units.some((u) => u.outcomes.some((o) => o.content))) subs.set(s.id, L(s.name)); }));
    return '<div class="game-scope">' +
      '<label class="field"><span class="field__label">' + esc(T("Sınıf", "Grade")) + '</span><select class="select" data-sc="grade"><option value="all">' + esc(T("Hepsi", "All")) + "</option>" +
        C().grades.map((g) => '<option value="' + g.id + '"' + (st.grade === g.id ? " selected" : "") + ">" + esc(C().gradeName(g)) + "</option>").join("") + "</select></label>" +
      '<label class="field"><span class="field__label">' + esc(T("Ders", "Subject")) + '</span><select class="select" data-sc="subj"><option value="all">' + esc(T("Hepsi", "All")) + "</option>" +
        Array.from(subs).filter(([k]) => !subjects || subjects.includes(k)).map(([k, v]) => '<option value="' + k + '"' + (st.subj === k ? " selected" : "") + ">" + esc(v) + "</option>").join("") + "</select></label>" +
      '<label class="check-row"><input type="checkbox" data-sc="mine"' + (st.mine ? " checked" : "") + "> " + esc(T("Yalnızca tamamladığım konular", "Only topics I've completed")) + "</label></div>";
  }
  function readScope(area) {
    const st = { grade: area.querySelector('[data-sc="grade"]').value, subj: area.querySelector('[data-sc="subj"]').value, mine: area.querySelector('[data-sc="mine"]').checked };
    App.prefs.set("gameScope", st);
    return st;
  }
  async function outcomesIn(st) {
    const done = st.mine ? new Set((await App.db.getAll("progress").catch(() => [])).filter((r) => r.done).map((r) => r.id)) : null;
    const out = [];
    C().grades.forEach((g) => { if (st.grade !== "all" && g.id !== st.grade) return;
      g.subjects.forEach((s) => { if (st.subj !== "all" && s.id !== st.subj) return;
        s.units.forEach((u) => u.outcomes.forEach((o) => { const key = [g.id, s.id, u.id, o.id].join("/"); if (o.content && (!done || done.has(key))) out.push({ key, g, s, u, o }); })); }); });
    return out;
  }
  /** Başlangıç ekranı: kapsam + başla düğmesi */
  function startScreen(area, html, onStart) {
    area.innerHTML = '<div class="game-start">' + html + '<button class="btn btn--primary game-go" type="button" data-go>' + App.icon("play") + esc(T("Başla", "Start")) + "</button></div>";
    App.hydrateIcons(area);
    area.querySelector("[data-go]").addEventListener("click", () => onStart());
  }

  /* ======================= 1. Doğru mu Yanlış mı? ======================= */
  const SWAPS = [["artar", "azalır"], ["artırır", "azaltır"], ["büyüktür", "küçüktür"], ["büyük", "küçük"], ["yüksek", "düşük"], ["doğru orantılı", "ters orantılı"], ["pozitif", "negatif"],
    ["çeker", "iter"], ["alır", "verir"], ["ekzotermik", "endotermik"], ["fazla", "az"], ["hızlı", "yavaş"], ["önce", "sonra"], ["en çok", "en az"], ["bağlıdır", "bağlı değildir"],
    ["asidik", "bazik"], ["artış", "azalış"], ["uzun", "kısa"], ["ilk", "son"], ["içine", "dışına"], ["kazanır", "kaybeder"], ["oksijenli", "oksijensiz"], ["gerçek", "sanal"], ["çukur", "tümsek"]];
  const LET = "A-Za-zÇĞİÖŞÜçğıöşüâîû";
  function falsify(txt, others) {
    const opts = [];
    // 1) zıt kelime
    SWAPS.forEach(([a, b]) => [[a, b], [b, a]].forEach(([x, y]) => {
      const re = new RegExp("(^|[^" + LET + "])" + x + "(?=[^" + LET + "]|$)");
      if (re.test(txt)) opts.push(() => txt.replace(re, (m0, pre) => pre + y));
    }));
    // 2) sayıyı değiştir (yıllar, formüldeki katsayılar…)
    const nums = Array.from(txt.matchAll(/(^|[^\d,.$\\^_{])(\d{1,4})(?![\d,.])/g));
    if (nums.length) opts.push(() => { const m = pick(nums), n = Number(m[2]); let v = n < 10 ? n + pick([1, 2, -1].filter((d) => n + d >= 0 && n + d !== n)) : n + pick([-1, 1]) * (n > 1000 ? rnd(2, 40) : Math.max(1, Math.round(n * 0.2))); const i = m.index + m[1].length; return txt.slice(0, i) + v + txt.slice(i + m[2].length); });
    // 3) kalın terimi başka bir cümlenin kalın terimiyle değiştir
    const bold = /\*\*([^*]{2,40})\*\*/.exec(txt);
    const pool = others.map((o) => (/\*\*([^*]{2,40})\*\*/.exec(o) || [])[1]).filter((x) => x && bold && x !== bold[1]);
    if (bold && pool.length) opts.push(() => txt.replace(bold[0], "**" + pick(pool) + "**"));
    if (!opts.length) return null;
    const r = pick(opts)();
    return r !== txt ? r : null;
  }
  add("dy", {
    subj: "genel", icon: "checkCircle",
    title: () => T("Doğru mu Yanlış mı? Fırtınası", "True or False Storm"),
    desc: () => T("Hap bilgilerden üretilen cümleler 60 saniye boyunca akar. Doğruysa sağa, yanlışsa sola. Seri yaptıkça puan katlanır.", "Statements from key facts for 60 s. Right = true, left = false. Streaks multiply your score."),
    play(area) {
      startScreen(area, scopeHtml(), async () => {
        const st = readScope(area), outs = await outcomesIn(st);
        const facts = []; outs.forEach((x) => (x.o.content.ozet || []).forEach((f) => { const s0 = L(f); if (s0 && s0.length > 12 && s0.length < 220) facts.push({ s: s0, x }); }));
        if (facts.length < 8) { App.ui.toast(T("Bu seçimde yeterli hap bilgi yok. Kapsamı genişlet.", "Not enough facts here; widen the scope.")); return; }
        const qs = shuffle(facts).slice(0, 120).map((f) => { const sameSubj = facts.filter((y) => y.x.s.id === f.x.s.id).map((y) => y.s); if (Math.random() < 0.5) { const fs = falsify(f.s, sameSubj); if (fs) return { text: fs, truth: false, orig: f.s, x: f.x }; } return { text: f.s, truth: true, orig: f.s, x: f.x }; });
        let i = 0, score = 0, streak = 0, okN = 0, wrong = [], lock = false;
        area.innerHTML = '<div class="dy"><div class="dy__hud"><span>' + esc(T("Puan", "Score")) + ' <b id="dyS">0</b></span><span id="dyStreak" class="dy__streak"></span></div>' +
          '<div class="dy__card" id="dyCard" tabindex="0"></div>' +
          '<div class="game-dock"><button class="btn dy__btn dy__btn--no" type="button" data-a="0">' + App.icon("close") + esc(T("Yanlış", "False")) + '</button><button class="btn dy__btn dy__btn--yes" type="button" data-a="1">' + App.icon("check") + esc(T("Doğru", "True")) + "</button></div>" +
          '<p class="hint game-keys">' + esc(T("Klavye: ← yanlış · → doğru. Telefonda kartı kaydırabilirsin.", "Keys: ← false · → true. Swipe on phones.")) + "</p></div>";
        App.hydrateIcons(area);
        const card = area.querySelector("#dyCard");
        const show = () => { const q = qs[i % qs.length]; card.className = "dy__card"; card.style.transform = ""; card.innerHTML = '<span class="dy__meta">' + esc(C().gradeName(q.x.g) + " · " + L(q.x.s.name)) + '</span><span class="dy__text md">' + inline(q.text) + "</span>"; };
        const answer = (a) => {
          if (lock) return; lock = true;
          const q = qs[i % qs.length], ok = (a === 1) === q.truth;
          if (ok) { streak++; okN++; score += 10 * Math.min(5, 1 + Math.floor(streak / 3)); } else { streak = 0; wrong.push(q); }
          card.classList.add(ok ? "is-ok" : "is-bad"); if (navigator.vibrate && !ok) navigator.vibrate(60);
          area.querySelector("#dyS").textContent = score;
          area.querySelector("#dyStreak").textContent = streak >= 3 ? "×" + Math.min(5, 1 + Math.floor(streak / 3)) + " " + T("seri", "streak") : "";
          setTimeout(() => { i++; lock = false; if (alive(card)) show(); }, ok ? 260 : 700);
        };
        area.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.a))));
        const onKey = (e) => { if (!alive(card)) return document.removeEventListener("keydown", onKey); if (e.key === "ArrowLeft") answer(0); if (e.key === "ArrowRight") answer(1); };
        document.addEventListener("keydown", onKey);
        let x0 = null;
        card.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
        card.addEventListener("touchmove", (e) => { if (x0 == null) return; const dx = e.touches[0].clientX - x0; card.style.transform = "translateX(" + dx + "px) rotate(" + dx / 25 + "deg)"; }, { passive: true });
        card.addEventListener("touchend", (e) => { if (x0 == null) return; const dx = (e.changedTouches[0] || {}).clientX - x0; x0 = null; if (Math.abs(dx) > 80) answer(dx > 0 ? 1 : 0); else card.style.transform = ""; });
        show();
        countdown(area.querySelector(".dy"), 60, null, () => {
          document.removeEventListener("keydown", onKey);
          const lines = '<p class="hint">' + esc(T(okN + " doğru · " + wrong.length + " hata", okN + " correct · " + wrong.length + " wrong")) + "</p>" +
            (wrong.length ? '<div class="game-review"><h3>' + esc(T("Yanlışların ve doğru bilgiler", "Your mistakes")) + "</h3>" + wrong.slice(0, 8).map((q) =>
              '<div class="game-review__i"><span class="md">' + inline(q.orig) + '</span><a href="#/konular/' + esc(q.x.key) + '">' + esc(T("Konuya git", "Open topic")) + "</a></div>").join("") + "</div>" : "");
          endScreen(area, "dy", score, lines, () => GAMES.dy.play(area));
        });
      });
    }
  });

  /* ======================= 2. Kavram Eşleştirme ======================= */
  function pairsFrom(text) {
    const s = String(text);
    // matematik içindeki iki noktayı yok say
    let depth = false, idx = -1;
    for (let k = 0; k < s.length; k++) { if (s[k] === "$") depth = !depth; if (!depth && (s[k] === ":" || (s[k] === "→" && k > 2))) { idx = k; break; } }
    if (idx < 2) return null;
    const left = s.slice(0, idx).replace(/\*\*/g, "").trim(), right = s.slice(idx + 1).trim();
    if (left.length < 2 || left.length > 48 || right.length < 6 || right.length > 140) return null;
    return [left, right];
  }
  add("eslestir", {
    subj: "genel", icon: "layers",
    title: () => T("Kavram Eşleştirme", "Concept Match"),
    desc: () => T("Soldaki kavramı sağdaki açıklamasıyla eşleştir. Üç tur, ne kadar hızlı ve az hatayla bitirirsen o kadar puan.", "Match each concept with its meaning. Three rounds; be fast and accurate."),
    play(area) {
      startScreen(area, scopeHtml(), async () => {
        const st = readScope(area), outs = await outcomesIn(st);
        const all = []; outs.forEach((x) => (x.o.content.ozet || []).forEach((f) => { const p = pairsFrom(L(f)); if (p) all.push({ a: p[0], b: p[1], x }); }));
        const uniq = []; const seen = new Set(); shuffle(all).forEach((p) => { const k = p.a.toLowerCase(); if (!seen.has(k)) { seen.add(k); uniq.push(p); } });
        if (uniq.length < 5) { App.ui.toast(T("Bu seçimde eşleştirilecek yeterli kavram yok. Kapsamı genişlet.", "Not enough concepts; widen the scope.")); return; }
        const rounds = Math.min(3, Math.floor(uniq.length / 5)); let r = 0, miss = 0, t0 = performance.now(), matched = 0;
        const round = () => {
          const set = uniq.slice(r * 5, r * 5 + 5), L1 = shuffle(set), R1 = shuffle(set);
          area.innerHTML = '<div class="match"><div class="match__hud"><span>' + esc(T("Tur", "Round")) + " " + (r + 1) + "/" + rounds + "</span><span>" + esc(T("Hata", "Misses")) + ' <b id="mMiss">' + miss + "</b></span></div>" +
            '<div class="match__cols"><div class="match__col">' + L1.map((p) => '<button class="match__a" type="button" data-k="' + esc(p.a) + '"><span class="md">' + inline(p.a) + "</span></button>").join("") + "</div>" +
            '<div class="match__col">' + R1.map((p) => '<button class="match__b" type="button" data-k="' + esc(p.a) + '"><span class="md">' + inline(p.b) + "</span></button>").join("") + "</div></div></div>";
          let sel = null;
          area.querySelectorAll(".match__a, .match__b").forEach((btn) => btn.addEventListener("click", () => {
            if (btn.classList.contains("is-done")) return;
            if (!sel || sel.classList.contains(btn.classList[0])) { if (sel) sel.classList.remove("is-sel"); sel = btn; btn.classList.add("is-sel"); return; }
            if (sel.dataset.k === btn.dataset.k) { [sel, btn].forEach((b) => { b.classList.remove("is-sel"); b.classList.add("is-done"); }); matched++; sel = null;
              if (area.querySelectorAll(".match__a:not(.is-done)").length === 0) { r++; setTimeout(() => (r < rounds ? round() : finish()), 400); } }
            else { miss++; area.querySelector("#mMiss").textContent = miss; [sel, btn].forEach((b) => { b.classList.add("is-bad"); setTimeout(() => b.classList.remove("is-bad", "is-sel"), 450); }); sel = null; if (navigator.vibrate) navigator.vibrate(50); }
          }));
        };
        const finish = () => { const secs = Math.round((performance.now() - t0) / 1000), score = Math.max(0, matched * 100 - miss * 30 + Math.max(0, 300 - secs * 2));
          endScreen(area, "eslestir", score, '<p class="hint">' + esc(T(matched + " eşleşme · " + miss + " hata · " + secs + " sn", matched + " pairs · " + miss + " misses · " + secs + " s")) + "</p>", () => GAMES.eslestir.play(area)); };
        round();
      });
    }
  });

  /* ======================= 9. 60 Saniye İşlem ======================= */
  const supN = (n) => String(n).replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
  function mathQ() {
    const kind = rnd(0, 7);
    if (kind === 0) { const a = rnd(3, 19), b = rnd(3, 12); return [a + " × " + b, a * b]; }
    if (kind === 1) { const b = pick([2, 3, 5]), x = rnd(2, 6), y = rnd(2, 6); return [b + supN(x) + " · " + b + supN(y) + " = " + b + "ⁿ, n = ?", x + y]; }
    if (kind === 2) { const b = pick([2, 3]), x = rnd(2, 4), y = rnd(2, 3); return ["(" + b + supN(x) + ")" + supN(y) + " = " + b + "ⁿ, n = ?", x * y]; }
    if (kind === 3) { const n = rnd(4, 25); return ["√" + n * n, n]; }
    if (kind === 4) { const p = pick([10, 20, 25, 40, 50, 75]), y = rnd(2, 16) * 20; return [T(y + " sayısının %" + p + "'i", p + "% of " + y), (y * p) / 100]; }
    if (kind === 5) { const a = rnd(-9, 9), b = rnd(-9, 9), c = rnd(-9, 9); return ["(" + a + ") · (" + b + ") + (" + c + ")", a * b + c]; }
    if (kind === 6) { const k = pick([2, 3, 5, 6, 7]), m = pick([2, 3]); return ["√" + k * m * m + " = a√" + k + ", a = ?", m]; }
    const a = rnd(2, 9), x = rnd(-6, 9), c = rnd(-9, 9); return [a + "x" + (c < 0 ? " − " + -c : " + " + c) + " = " + (a * x + c) + T(" ise x", ", x"), x];
  }
  add("islem", {
    subj: "matematik", icon: "calc",
    title: () => T("60 Saniye İşlem", "60-Second Maths"),
    desc: () => T("YKS tarzı hızlı işlem: çarpım, üslü, köklü, yüzde ve işaret soruları. 60 saniyede kaç doğru yapabilirsin?", "Quick YKS-style arithmetic: powers, roots, percentages. How many in 60 s?"),
    play(area) {
      startScreen(area, '<p class="hint">' + esc(T("Doğru cevap +10, seri yaptıkça bonus; yanlış −5.", "Correct +10, streak bonus; wrong −5.")) + "</p>", () => {
        let score = 0, ok = 0, bad = 0, streak = 0;
        area.innerHTML = '<div class="qz"><div class="dy__hud"><span>' + esc(T("Puan", "Score")) + ' <b id="qS">0</b></span><span id="qStreak" class="dy__streak"></span></div><div class="qz__q" id="qQ"></div><div class="qz__opts" id="qO"></div></div>';
        const next = () => {
          const [q, a] = mathQ(), opts = new Set([a]);
          while (opts.size < 4) { const d = pick([1, -1, 2, -2, 10, -10, a > 20 ? Math.round(a * 0.1) || 3 : 3]); if (a + d !== a) opts.add(a + d); }
          area.querySelector("#qQ").textContent = q + " = ?";
          area.querySelector("#qO").innerHTML = shuffle(Array.from(opts)).map((o) => '<button class="qz__opt" type="button" data-v="' + o + '">' + String(o).replace(".", ",") + "</button>").join("");
          area.querySelectorAll(".qz__opt").forEach((b) => b.addEventListener("click", () => {
            const good = Number(b.dataset.v) === a;
            if (good) { ok++; streak++; score += 10 + Math.min(10, Math.floor(streak / 3) * 2); } else { bad++; streak = 0; score = Math.max(0, score - 5); area.querySelector('[data-v="' + a + '"]').classList.add("is-ok"); }
            b.classList.add(good ? "is-ok" : "is-bad"); area.querySelector("#qS").textContent = score; area.querySelector("#qStreak").textContent = streak >= 3 ? T("seri ", "streak ") + streak : "";
            area.querySelectorAll(".qz__opt").forEach((x) => (x.disabled = true));
            setTimeout(() => alive(b) && next(), good ? 220 : 650);
          }));
        };
        next();
        countdown(area.querySelector(".qz"), 60, null, () => endScreen(area, "islem", score, '<p class="hint">' + esc(T(ok + " doğru · " + bad + " yanlış", ok + " correct · " + bad + " wrong")) + "</p>", () => GAMES.islem.play(area)));
      });
    }
  });

  /* ======================= 8. Grafik Tahmini ======================= */
  const sgn = (n) => (n < 0 ? " − " + Math.abs(n) : " + " + n);
  const FAM = [
    () => { const a = pick([-3, -2, -1, 1, 2, 3, 0.5]), b = rnd(-4, 4); return { f: (x) => a * x + b, tex: "y = " + (a === 1 ? "" : a === -1 ? "-" : String(a).replace(".", ",")) + "x" + (b ? sgn(b) : ""), fam: "lin", a, b }; },
    () => { const a = pick([-2, -1, 1, 2]), h = rnd(-3, 3), k = rnd(-4, 4); return { f: (x) => a * (x - h) ** 2 + k, tex: "y = " + (a === 1 ? "" : a === -1 ? "-" : a) + (h ? "(x" + sgn(-h) + ")^2" : "x^2") + (k ? sgn(k) : ""), fam: "par", a, h, k }; },
    () => { const h = rnd(-3, 3), k = rnd(-3, 3), a = pick([-1, 1]); return { f: (x) => a * Math.abs(x - h) + k, tex: "y = " + (a < 0 ? "-" : "") + "|x" + (h ? sgn(-h) : "") + "|" + (k ? sgn(k) : ""), fam: "abs", a, h, k }; },
    () => { const h = rnd(-3, 3), k = rnd(-3, 3); return { f: (x) => (x - h >= 0 ? Math.sqrt(x - h) + k : NaN), tex: "y = \\sqrt{x" + (h ? sgn(-h) : "") + "}" + (k ? sgn(k) : ""), fam: "sqrt", h, k }; },
    () => { const b = pick([2, 3]), k = rnd(-3, 2), s = pick([1, -1]); return { f: (x) => Math.pow(b, s * x) + k, tex: "y = " + b + "^{" + (s < 0 ? "-x" : "x") + "}" + (k ? sgn(k) : ""), fam: "exp", b, k, s }; },
    () => { const k = pick([-4, -2, -1, 1, 2, 4]), h = rnd(-2, 2); return { f: (x) => (Math.abs(x - h) < 1e-6 ? NaN : k / (x - h)), tex: "y = \\dfrac{" + k + "}{x" + (h ? sgn(-h) : "") + "}", fam: "inv", k, h } }
  ];
  function similar(base) {
    // aynı aileden farklı bir fonksiyon
    for (let k = 0; k < 40; k++) { const g = FAM[[ "lin", "par", "abs", "sqrt", "exp", "inv"].indexOf(base.fam)](); if (g.tex !== base.tex) return g; }
    return pick(FAM)();
  }
  add("grafik", {
    subj: "matematik", icon: "chart",
    title: () => T("Grafik Tahmini", "Guess the Graph"),
    desc: () => T("Ekrandaki grafik hangi fonksiyona ait? 10 soruda dört seçenekten doğrusunu bul; seçenekler birbirine çok benzer.", "Which function is plotted? Ten rounds, four look-alike choices."),
    play(area) {
      startScreen(area, '<p class="hint">' + esc(T("Kesişim noktalarına, tepe noktasına ve asimptotlara dikkat et. Hızlı cevap ek puan getirir.", "Watch intercepts, vertices and asymptotes. Faster answers score more.")) + "</p>", () => {
        let r = 0, score = 0, ok = 0;
        const next = () => {
          if (r >= 10) return endScreen(area, "grafik", score, '<p class="hint">' + esc(T(ok + " / 10 doğru", ok + " / 10 correct")) + "</p>", () => GAMES.grafik.play(area));
          const ans = pick(FAM)(), opts = [ans]; let guard = 0;
          while (opts.length < 4 && guard++ < 80) { const g = Math.random() < 0.75 ? similar(ans) : pick(FAM)(); if (!opts.some((o) => o.tex === g.tex)) opts.push(g); }
          const t0 = performance.now();
          area.innerHTML = '<div class="gr"><div class="dy__hud"><span>' + esc(T("Soru", "Question")) + " " + (r + 1) + '/10</span><span>' + esc(T("Puan", "Score")) + " <b>" + score + '</b></span></div><canvas class="gr__cv"></canvas><div class="qz__opts gr__opts">' +
            shuffle(opts).map((o) => '<button class="qz__opt md" type="button" data-t="' + esc(o.tex) + '">' + inline("$" + o.tex + "$") + "</button>").join("") + "</div></div>";
          const cv = area.querySelector("canvas"), W = cv.parentElement.clientWidth, H = Math.round(Math.min(W * 0.7, 320)), dpr = Math.min(2, window.devicePixelRatio || 1);
          cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px"; const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          const U = App.labs.util, c = U.colors(), F = U.frame(10, 10, W - 20, H - 20, -8, 8, -8 * (H - 20) / (W - 20), 8 * (H - 20) / (W - 20));
          U.axes(ctx, F, c, { step: 1, stepY: 1, labels: W > 420 }); U.plot(ctx, F, ans.f, c.accent, 2.8);
          area.querySelectorAll(".qz__opt").forEach((b) => b.addEventListener("click", () => {
            const good = b.dataset.t === ans.tex; r++;
            if (good) { ok++; score += 50 + Math.max(0, 50 - Math.round((performance.now() - t0) / 200)); }
            b.classList.add(good ? "is-ok" : "is-bad"); area.querySelectorAll(".qz__opt").forEach((x) => { x.disabled = true; if (x.dataset.t === ans.tex) x.classList.add("is-ok"); });
            setTimeout(() => alive(b) && next(), good ? 450 : 1300);
          }));
        };
        next();
      });
    }
  });

  /* ======================= Oyunlar sayfası ======================= */
  const CATS = () => [["genel", T("Her ders", "Every subject"), "sparkle"], ["matematik", null], ["fizik", null], ["kimya", null], ["tarih", null], ["ingilizce", null]];
  function catName(id) { if (id === "genel") return T("Her ders", "Every subject"); const g = C().grades.find((x) => x.subjects.some((s) => s.id === id)); const s = g && g.subjects.find((x) => x.id === id); return s ? L(s.name) : id; }
  function catIcon(id) { if (id === "genel") return "sparkle"; const g = C().grades.find((x) => x.subjects.some((s) => s.id === id)); const s = g && g.subjects.find((x) => x.id === id); return (s && s.icon) || "game"; }

  function renderHub(view) {
    App.setTitle(T("Oyunlar", "Games"));
    const f = App.prefs.get("gameCat", "all");
    const cats = CATS().map((x) => x[0]).filter((k) => ORDER.some((id) => GAMES[id].subj === k));
    view.innerHTML = '<div class="page games-hub">' +
      '<div class="page-head"><div><h1>' + esc(T("Oyunlar", "Games")) + "</h1><p>" + esc(T("Derslerle ilgili kısa oyunlar: birkaç dakikada tekrar et, rekorunu geç. Hepsi internetsiz çalışır.", "Short subject games: review in a few minutes and beat your record. All offline.")) + "</p></div></div>" +
      '<div class="lab-chips games-cats">' + ["all"].concat(cats).map((k) => '<button type="button" class="chip' + (k !== "all" && k !== "genel" ? " subj-" + k : "") + (f === k ? " is-on" : "") + '" data-cat="' + k + '">' +
        (k === "all" ? esc(T("Tümü", "All")) : App.icon(catIcon(k)) + esc(catName(k))) + "</button>").join("") + "</div>" +
      '<div id="gList"></div></div>';
    App.hydrateIcons(view);
    const paint = (cat) => {
      App.prefs.set("gameCat", cat);
      view.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("is-on", b.dataset.cat === cat));
      const groups = cats.filter((k) => cat === "all" || k === cat);
      view.querySelector("#gList").innerHTML = groups.map((k) => '<section class="lab-group"><h2 class="lab-subj' + (k !== "genel" ? " subj-" + k : "") + '"><span class="subj-ico subj-ico--sm">' + App.icon(catIcon(k)) + "</span>" + esc(catName(k)) + '</h2><div class="game-grid">' +
        ORDER.filter((id) => GAMES[id].subj === k).map((id) => { const g = GAMES[id], b = best(id);
          return '<a class="game-card subj-' + g.subj + '" href="#/oyunlar/' + id + '"><span class="subj-ico">' + App.icon(g.icon) + '</span><span class="game-card__body"><b>' + esc(g.title()) + "</b><span>" + esc(g.desc()) + "</span></span>" +
            '<span class="game-card__foot">' + (b ? App.icon("star") + esc(T("Rekor ", "Best ")) + b : esc(T("Henüz oynanmadı", "Not played yet"))) + '<span class="game-card__go">' + App.icon("play") + esc(T("Oyna", "Play")) + "</span></span></a>"; }).join("") + "</div></section>").join("");
      App.hydrateIcons(view.querySelector("#gList"));
    };
    view.querySelector(".games-cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) paint(b.dataset.cat); });
    paint(cats.includes(f) || f === "all" ? f : "all");
  }

  function render(view, p) {
    if (p[0] && GAMES[p[0]]) { const area = shell(view, p[0]); GAMES[p[0]].play(area); return; }
    renderHub(view);
  }
  // "genel" kategorisi için renk sınıfı yok: vurgu rengini kullan
  App.router.register("oyunlar", render);
  App.games = { add, GAMES, ORDER, util: { rnd, shuffle, pick, inline, shell, endScreen, countdown, startScreen, best, saveBest, alive, T } };
})();
