/* =========================================================
   podcast.js — Konu Podcast'i (v1.26)

   Her kazanımın konu anlatımı, iki sesli bir sohbete dönüşür:
     Deniz (meraklı öğrenci, soru sorar)  ·  Arda (öğretmen, anlatır)
   • İnternetsiz ve anında: metin, konu anlatımının başlıklarından, maddelerinden,
     tablolarından, örnek sorularından ve hap bilgilerinden kurallı olarak kurulur.
     İçeriği olan her konu için hazırdır.
   • Arada dinleyene soru sorulur (örnek sorular): düşünme süresi, "Cevabı duy".
   • İsteğe bağlı: yapay zekâyla daha doğal bir sohbet yazdırılabilir (saklanır).
   • Ses: App.speech (Android TTS / tarayıcı sesleri); iki konuşmacı farklı ses tonu
     ve varsa farklı sesle okunur. Hız ayarı, metinde takip, kaldığı yerden devam,
     bitince sıradaki konuya geçme.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const C = () => App.data.curriculum;
  const L = (x) => App.L(x);
  const SP = { A: { name: "Deniz", pitch: 1.18, voice: 0, cls: "a" }, B: { name: "Arda", pitch: 0.86, voice: 1, cls: "b" } };

  /* ---------------- Metin yardımcıları ---------------- */
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const pick = (arr, seed) => arr[seed % arr.length];
  const clean = (s) => String(s || "").replace(/^#+\s*/, "").replace(/^\d+(\.\d+)*[.)]?\s+/, "").replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
  const speakEl = document.createElement("div");
  function speakable(md) {
    speakEl.innerHTML = App.markdown.render(String(md || ""));
    const txt = App.a11y && App.a11y.speakable ? App.a11y.speakable(speakEl) : speakEl.textContent;
    return String(txt).replace(/\s+/g, " ").trim();
  }
  /** Markdown tablo satırlarını cümleye çevir */
  function tableToLines(rows) {
    const cells = rows.map((r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
    const body = cells.filter((c) => !c.every((x) => /^:?-{2,}:?$/.test(x) || !x));
    if (body.length < 2) return body.map((c) => c.join(", "));
    const head = body[0];
    return body.slice(1).map((r) => r.map((c, i) => (head[i] && i ? head[i] + ": " : "") + c).filter((x) => x.replace(/[: ]/g, "")).join("; ") + ".");
  }
  /** Konu anlatımını bölümlere ayır: [{ h, items: [{ md, term?, def? }] }] */
  function sections(md) {
    const out = []; let cur = { h: "", items: [] }; out.push(cur);
    const lines = String(md || "").split("\n"); let para = [], table = [];
    const flushP = () => { if (para.length) { cur.items.push({ md: para.join(" ") }); para = []; } };
    const flushT = () => { if (table.length) { tableToLines(table).forEach((x) => cur.items.push({ md: x })); table = []; } };
    lines.forEach((ln) => {
      const t = ln.trim();
      if (/^#{1,4}\s+/.test(t)) { flushP(); flushT(); cur = { h: clean(t), items: [] }; out.push(cur); return; }
      if (/^\|.*\|$/.test(t)) { flushP(); table.push(t); return; }
      flushT();
      if (!t) { flushP(); return; }
      const m = t.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
      if (m) {
        flushP();
        const body = m[1], tm = body.match(/^\*\*([^*]{2,60})\*\*\s*[:–-]\s*(.+)$/);
        cur.items.push(tm ? { md: body, term: clean(tm[1]), def: tm[2] } : { md: body });
        return;
      }
      if (/^\$\$/.test(t) || /^>/.test(t)) { flushP(); cur.items.push({ md: t.replace(/^>\s*/, "") }); return; }
      para.push(t);
    });
    flushP(); flushT();
    return out.filter((s) => s.items.length);
  }

  /* ---------------- Sohbet metni ---------------- */
  const Q_SEC = [
    "Peki {h} konusunu nasıl anlatırsın?", "{h} kısmına geçelim. Burada neyi bilmemiz gerekiyor?", "Sıradaki başlık: {h}. Bunu bir lise öğrencisine nasıl açıklarsın?",
    "Şimdi {h}. Sınavda bu kısım neden önemli?", "Biraz da {h} hakkında konuşalım mı?", "{h} dediğimizde aklımıza ne gelmeli?"
  ];
  const Q_TERM = ["Peki {t} ne demek?", "{t} nedir, kısaca söyler misin?", "Bir de {t} var. O ne?", "{t} kavramını nasıl tanımlarız?"];
  const BACK = ["Anladım.", "Bu önemli bir nokta.", "Hmm, devam et.", "Güzel, peki sonra?", "Bunu not alıyorum.", "Tamam, mantıklı.", "İlginç!"];
  const INTRO_A = [
    "Merhaba, KampüsAI Podcast'e hoş geldin! Bugün {s}, {g}: {t}.",
    "Selam! KampüsAI Podcast'te bugünkü konumuz {s} dersinden: {t}. {g}.",
    "Hoş geldin! Kulaklıklar takılı mı? Bugün {g} {s} konusu: {t}."
  ];
  const INTRO_B = [
    "Merhaba! Konuyu sohbet ederek, adım adım toparlayacağız. Arada sana da soru soracağız, hazır ol.",
    "Selam! Bu konu YKS'de sık karşımıza çıkıyor. Birlikte, sade bir dille anlatalım; arada da seni küçük sorularla yoklayalım.",
    "Merhaba! Ben anlatacağım, Deniz de aklına takılanları soracak. Sen de dinlerken arada gelen sorulara cevap vermeye çalış."
  ];
  const NUM = ["Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz", "On"];

  function build(key) {
    const f = App.lessons.find(key);
    if (!f || !f.outcome.content || !f.outcome.content.anlatim) return null;
    const ct = f.outcome.content, seed = hash(key);
    const title = clean(L(f.outcome.title)), subj = L(f.subject.name), gname = C().gradeName(f.grade);
    const lines = [];
    const add = (who, md, kind, extra) => { const say = speakable(md); if (!say) return; lines.push(Object.assign({ who, md, say, kind: kind || "talk" }, extra || {})); };
    add("A", pick(INTRO_A, seed).replace("{s}", subj).replace("{g}", gname).replace("{t}", title));
    add("B", pick(INTRO_B, seed >> 3));
    const secs = sections(ct.anlatim), ex = (ct.ornekler || []).slice();
    let qn = 0, bi = seed % BACK.length;
    secs.forEach((sec, si) => {
      const h = sec.h && sec.h.length < 90 ? sec.h : "";
      if (si === 0 && (!h || clean(h).toLocaleLowerCase("tr") === title.toLocaleLowerCase("tr").slice(0, h.length))) add("A", pick(["Önce temelden başlayalım: bu konu ne anlatıyor?", "İlk olarak konunun ana fikrini söyler misin?", "Başlangıç için büyük resmi çizer misin?"], seed >> 5));
      else if (h) add("A", pick(Q_SEC, seed + si).replace("{h}", h));
      let since = 0;
      sec.items.forEach((it, ii) => {
        // tanım maddeleri: öğrenci kavramı sorar, öğretmen tanımlar (her ikisinden birinde)
        if (it.term && (ii + si) % 2 === 1 && ii > 0) { add("A", pick(Q_TERM, seed + si * 7 + ii).replace("{t}", it.term)); add("B", it.term + ": " + it.def); since = 0; return; }
        add("B", it.md); since++;
        if (since >= 3 && ii < sec.items.length - 1) { add("A", BACK[bi++ % BACK.length]); since = 0; }
      });
      // her iki bölümden sonra dinleyene soru
      if (ex.length && (si % 2 === 1 || si === secs.length - 1)) {
        const e = ex.shift(); qn++;
        add("A", pick(["Hadi dinleyene bir soru soralım!", "Şimdi sıra sende: küçük bir soru.", "Bir dakika, dinleyen arkadaşımıza bir soru soralım."], seed + qn));
        add("B", "Soru " + qn + ". " + e.soru, "quiz", { wait: 12, q: qn });
        add("B", "Çözüm: " + e.cozum, "answer", { q: qn });
      }
    });
    while (ex.length) { const e = ex.shift(); qn++; add("A", "Son bir soru daha!"); add("B", "Soru " + qn + ". " + e.soru, "quiz", { wait: 12, q: qn }); add("B", "Çözüm: " + e.cozum, "answer", { q: qn }); }
    if ((ct.ozet || []).length) {
      add("A", pick(["Toparlayalım mı? Bu konudan aklında kalması gerekenler:", "Kapanıştan önce hızlı bir tekrar yapalım.", "Son olarak, sınavdan önce bakılacak hap bilgiler:"], seed >> 7), "recap");
      ct.ozet.slice(0, 8).forEach((x, i) => add(i % 2 ? "A" : "B", NUM[i] + ": " + x, "recap"));
    }
    add("B", pick(["Bugünlük bu kadar. Pekiştirmek için konu testini çözmeyi unutma!", "Harika gidiyorsun. Şimdi konu testiyle kendini dene.", "Bu konuyu bitirdin sayılır; bir de konu testine bak, eksik kalmasın."], seed >> 9));
    add("A", pick(["Görüşmek üzere, iyi çalışmalar!", "Bir sonraki bölümde görüşürüz!", "Hoşça kal, başarılar!"], seed >> 11));
    return { key, title, subj, gname, subject: f.subject, unit: L(f.unit.name), lines, quizzes: qn, lang: f.subject.id === "ingilizce" ? "en" : "tr" };
  }

  /** Yapay zekâ ile daha doğal sohbet (isteğe bağlı) */
  async function buildAI(key, signal) {
    const base = build(key); if (!base) throw new Error("no-content");
    const ct = App.lessons.find(key).outcome.content;
    const system = "Sen YKS'ye hazırlanan lise öğrencileri için eğitim podcast'i yazan bir senaristsin. İki konuşmacı var: Deniz (meraklı öğrenci, kısa sorular sorar, bazen yanlış anlar ve düzeltilir) ve Arda (sabırlı öğretmen, sade anlatır, günlük hayattan örnek verir). Yalnızca verilen ders metnindeki bilgileri kullan, uydurma. Formülleri sözle de söylenebilecek biçimde, gerekirse LaTeX ile ($...$) yaz. Yalnızca geçerli JSON döndür.";
    const prompt = "Konu: " + base.title + " (" + base.subj + ", " + base.gname + ")\n\nDERS METNİ:\n" + ct.anlatim + "\n\nÖRNEKLER:\n" + (ct.ornekler || []).map((e, i) => (i + 1) + ") " + e.soru + "\nÇözüm: " + e.cozum).join("\n") +
      "\n\nHAP BİLGİLER:\n- " + (ct.ozet || []).join("\n- ") +
      "\n\nKurallar:\n- 30–50 replik; her replik 1–3 cümle.\n- Arada 2–3 kez dinleyene soru sor: Arda soruyu söyler (\"kind\":\"quiz\"), sonraki replikte cevabı ve kısa nedenini açıklar (\"kind\":\"answer\").\n- Sonda 4–6 maddelik hızlı tekrar (\"kind\":\"recap\").\n" +
      "Biçim: {\"lines\":[{\"who\":\"A\",\"text\":\"...\"},{\"who\":\"B\",\"text\":\"...\",\"kind\":\"quiz\"}]}  (A = Deniz, B = Arda)";
    const res = await App.ai.generate({ system, prompt, temperature: 0.6, signal });
    const arr = (res.data && Array.isArray(res.data.lines) ? res.data.lines : []).map((x) => ({ who: x && x.who === "A" ? "A" : "B", md: String((x && (x.text || x.t)) || "").trim().slice(0, 900), kind: ["quiz", "answer", "recap"].indexOf(x && x.kind) >= 0 ? x.kind : "talk" })).filter((x) => x.md);
    if (arr.length < 10) throw new Error("json");
    let q = 0;
    const lines = arr.map((x) => { const y = Object.assign({}, x, { say: speakable(x.md) }); if (x.kind === "quiz") { q++; y.wait = 12; y.q = q; } else if (x.kind === "answer") y.q = q; return y; }).filter((x) => x.say);
    const rec = { id: "podcast:" + key, kind: "podcast", key, lines, model: res.model, at: new Date().toISOString() };
    await App.db.put("meta", rec);
    return rec;
  }

  /* ---------------- Liste sayfası ---------------- */
  function allTopics() {
    const out = [];
    C().grades.forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => u.outcomes.forEach((o) => {
      if (o.content && o.content.anlatim) out.push({ key: C().key(g.id, s.id, u.id, o.id), g, s, u, o });
    }))));
    return out;
  }
  function listPage(view) {
    App.setTitle(T("Konu Podcast'i", "Topic Podcast"));
    const all = allTopics(), pos = App.prefs.get("podPos", {}) || {}, lastKey = App.prefs.get("podLast", null);
    const last = lastKey && all.find((x) => x.key === lastKey);
    const F = Object.assign({ g: "", s: "", q: "" }, App.prefs.get("podFilter", {}) || {});
    const subjects = []; all.forEach((x) => { if (!subjects.find((y) => y.id === x.s.id)) subjects.push({ id: x.s.id, name: L(x.s.name) }); });
    view.innerHTML = '<div class="page pod">' +
      '<div class="page-head"><div><h1>' + esc(T("Konu Podcast'i", "Topic Podcast")) + "</h1><p>" +
        esc(T("Her konu, Deniz ile Arda'nın sohbetine dönüşür: kulaklığını tak, yürürken ya da yolda dinle; arada gelen sorularla kendini yokla.", "Every topic becomes a chat between Deniz and Arda, with quiz breaks.")) + "</p></div></div>" +
      (last ? '<a class="card pod-cont" href="#/podcast/' + esc(last.key) + '"><span class="pod-cont__ico">🎧</span><span><b>' + esc(T("Kaldığın yerden devam et", "Continue listening")) + "</b><small>" + esc(L(last.s.name) + " · " + clean(L(last.o.title))) + "</small></span>" + App.icon("chevron") + "</a>" : "") +
      '<div class="tc-filters"><label class="tc-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="pdQ" value="' + esc(F.q) + '" placeholder="' + esc(T("Konu ara: türev, hücre, Osmanlı…", "Search topics…")) + '" aria-label="' + esc(T("Konu ara", "Search topics")) + '"></label>' +
        '<select class="select" id="pdG" aria-label="' + esc(T("Sınıf", "Grade")) + '"><option value="">' + esc(T("Tüm sınıflar", "All grades")) + "</option>" + C().grades.map((g) => '<option value="' + g.id + '"' + (F.g === g.id ? " selected" : "") + ">" + esc(C().gradeName(g)) + "</option>").join("") + "</select>" +
        '<select class="select" id="pdS" aria-label="' + esc(T("Ders", "Subject")) + '"><option value="">' + esc(T("Tüm dersler", "All subjects")) + "</option>" + subjects.map((s) => '<option value="' + s.id + '"' + (F.s === s.id ? " selected" : "") + ">" + esc(s.name) + "</option>").join("") + "</select></div>" +
      '<p class="hint" id="pdCount"></p><div id="pdList"></div></div>';
    App.hydrateIcons(view);
    const nq = (x) => String(x || "").toLocaleLowerCase("tr");
    const paint = () => {
      App.prefs.set("podFilter", F);
      const w = nq(F.q).split(/\s+/).filter(Boolean);
      const rows = all.filter((x) => (!F.g || x.g.id === F.g) && (!F.s || x.s.id === F.s) && w.every((y) => nq(L(x.o.title) + " " + L(x.u.name) + " " + L(x.s.name)).indexOf(y) >= 0));
      view.querySelector("#pdCount").textContent = T(rows.length + " konu podcast'i", rows.length + " topic podcasts");
      const groups = []; rows.slice(0, 400).forEach((x) => { const k = x.g.id + "/" + x.s.id + "/" + x.u.id; let gr = groups.find((y) => y.k === k); if (!gr) { gr = { k, x, items: [] }; groups.push(gr); } gr.items.push(x); });
      const el = view.querySelector("#pdList");
      el.innerHTML = rows.length ? groups.map((gr) => '<section class="pod-unit"><h2 class="section-title">' + esc(C().gradeName(gr.x.g) + " · " + L(gr.x.s.name) + " · " + L(gr.x.u.name)) + '</h2><ul class="pod-list">' +
        gr.items.map((x) => { const p = pos[x.key]; return '<li><a class="pod-item" href="#/podcast/' + esc(x.key) + '"><span class="pod-item__play" aria-hidden="true">▶</span><span class="pod-item__t">' + esc(clean(L(x.o.title))) + (p && p.done ? ' <small class="pod-done">✓ ' + esc(T("dinlendi", "played")) + "</small>" : p && p.i ? ' <small class="pod-half">' + esc(T("yarıda", "in progress")) + "</small>" : "") + "</span></a></li>"; }).join("") + "</ul></section>").join("") +
        (rows.length > 400 ? '<p class="hint">' + esc(T("İlk 400 konu gösteriliyor; aramayı daralt.", "Showing the first 400; narrow your search.")) + "</p>" : "")
        : App.ui.empty("search", T("Konu bulunamadı", "No topics found"), T("Süzgeçleri değiştir.", "Change the filters."));
      App.hydrateIcons(el);
    };
    view.querySelector("#pdQ").addEventListener("input", App.utils.debounce((e) => { F.q = e.target.value; paint(); }, 150));
    view.querySelector("#pdG").addEventListener("change", (e) => { F.g = e.target.value; paint(); });
    view.querySelector("#pdS").addEventListener("change", (e) => { F.s = e.target.value; paint(); });
    paint();
  }

  /* ---------------- Oynatıcı ---------------- */
  let P = null;          // etkin oynatıcı
  function stopAll() {
    if (!P) return;
    P.token++; P.playing = false; clearTimeout(P.timer); clearInterval(P.tick);
    App.speech.stopSaying();
    if (P.wake) { try { P.wake.release(); } catch (e) { /* yok */ } P.wake = null; }
    window.removeEventListener("da:route", P.onRoute);
    document.removeEventListener("keydown", P.onKey);
    P = null;
  }
  function nextKeyOf(key) {
    const f = App.lessons.find(key); if (!f) return null;
    const list = []; f.subject.units.forEach((u) => u.outcomes.forEach((o) => { if (o.content && o.content.anlatim) list.push(C().key(f.grade.id, f.subject.id, u.id, o.id)); }));
    const i = list.indexOf(key); return i >= 0 && i < list.length - 1 ? list[i + 1] : null;
  }

  async function player(view, key) {
    stopAll();
    const f = App.lessons.find(key);
    if (!f) { location.hash = "#/podcast"; return; }
    if (!f.outcome.content) { // içerik yoksa: konu sayfası üretir
      view.innerHTML = '<div class="page page--narrow">' + App.ui.empty("note", T("Bu konunun anlatımı henüz yok", "This topic has no lesson yet"), T("Önce konu sayfasını aç; anlatım hazırlanınca podcast'i de dinleyebilirsin.", "Open the lesson first.")) +
        '<p style="text-align:center"><a class="btn btn--primary" href="#/konular/' + esc(key) + '">' + esc(T("Konuya git", "Open lesson")) + "</a></p></div>";
      App.hydrateIcons(view); return;
    }
    const aiRec = await App.db.get("meta", "podcast:" + key).catch(() => null);
    const base = build(key);
    const useAI = !!(aiRec && App.prefs.get("podAI", true));
    const ep = useAI ? Object.assign({}, base, { lines: aiRec.lines, ai: aiRec }) : base;
    App.setTitle(T("Podcast: ", "Podcast: ") + base.title);
    App.prefs.set("podLast", key);
    const pos = App.prefs.get("podPos", {}) || {};
    const start = pos[key] && !pos[key].done && pos[key].i < ep.lines.length ? pos[key].i : 0;
    const nxt = nextKeyOf(key);
    const mins = Math.max(1, Math.round(ep.lines.reduce((a, x) => a + x.say.length, 0) / 14 / 60));
    view.innerHTML = '<div class="page page--narrow pod pod-player subj-' + esc(f.subject.id) + '">' +
      '<nav class="crumbs"><a href="#/podcast">' + App.icon("chevronL") + esc(T("Konu Podcast'i", "Topic Podcast")) + "</a></nav>" +
      '<section class="card pod-hero"><div class="pod-cast">' +
        '<div class="pod-sp pod-sp--a" data-sp="A"><span class="pod-av">D</span><b>Deniz</b><small>' + esc(T("soruyor", "asks")) + "</small></div>" +
        '<div class="pod-mid"><span class="pod-subj">' + esc(base.subj + " · " + base.gname) + "</span><h1>" + esc(base.title) + "</h1>" +
          '<p class="hint">' + esc(T("≈ " + mins + " dk · " + ep.lines.length + " replik · " + (ep.lines.filter((x) => x.kind === "quiz").length) + " soru", "≈ " + mins + " min · " + ep.lines.length + " lines")) + (useAI ? " · " + esc(T("yapay zekâ sürümü", "AI version")) : "") + "</p></div>" +
        '<div class="pod-sp pod-sp--b" data-sp="B"><span class="pod-av">A</span><b>Arda</b><small>' + esc(T("anlatıyor", "explains")) + "</small></div></div>" +
        '<div class="pod-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="' + esc(T("İlerleme", "Progress")) + '"><i></i></div>' +
        '<div class="pod-ctl"><button type="button" class="icon-btn" id="pdPrev" aria-label="' + esc(T("Önceki replik", "Previous line")) + '">⏮</button>' +
          '<button type="button" class="pod-play" id="pdPlay" aria-label="' + esc(T("Oynat", "Play")) + '">▶</button>' +
          '<button type="button" class="icon-btn" id="pdNext" aria-label="' + esc(T("Sonraki replik", "Next line")) + '">⏭</button></div>' +
        '<div class="pod-opts"><label>' + esc(T("Hız", "Speed")) + ' <select class="select select--sm" id="pdRate">' + [0.8, 0.9, 1, 1.15, 1.3, 1.5].map((r) => '<option value="' + r + '"' + (Number(App.prefs.get("podRate", 1)) === r ? " selected" : "") + ">" + r + "×</option>").join("") + "</select></label>" +
          '<label class="check-row"><input type="checkbox" id="pdWait"' + (App.prefs.get("podWait", false) ? " checked" : "") + "> " + esc(T("Sorularda beni bekle", "Wait for me at questions")) + "</label>" +
          '<label class="check-row"><input type="checkbox" id="pdAuto"' + (App.prefs.get("podAuto", true) ? " checked" : "") + "> " + esc(T("Bitince sıradaki konu", "Autoplay next topic")) + "</label></div>" +
        '<div class="pod-quiz" id="pdQuiz" hidden></div>' +
        (App.speech.ttsAvailable() ? "" : '<p class="error-text">' + esc(T("Bu cihazda sesli okuma yok; metni okuyarak takip edebilirsin.", "No text-to-speech here; you can read along.")) + "</p>") +
      "</section>" +
      '<div class="pod-actions"><a class="btn btn--sm" href="#/konular/' + esc(key) + '">' + App.icon("book") + esc(T("Konu anlatımı", "Lesson")) + '</a><a class="btn btn--sm" href="#/test/' + esc(key) + '">' + App.icon("quiz") + esc(T("Konu testi", "Quiz")) + "</a>" +
        (useAI ? '<button type="button" class="btn btn--sm btn--ghost" id="pdStd">' + esc(T("Standart sürüme dön", "Use standard version")) + "</button>" : '<button type="button" class="btn btn--sm btn--ai" id="pdAI">' + App.icon("sparkle") + esc(T("Yapay zekâyla daha doğal yap", "Make it more natural with AI")) + "</button>") +
        (nxt ? '<a class="btn btn--sm btn--ghost" href="#/podcast/' + esc(nxt) + '">' + esc(T("Sıradaki konu", "Next topic")) + App.icon("chevron") + "</a>" : "") + "</div>" +
      '<section class="card pod-tr"><h2>' + App.icon("note") + esc(T("Metin", "Transcript")) + '</h2><ol class="pod-lines" id="pdLines">' +
        ep.lines.map((x, i) => '<li class="pod-ln pod-ln--' + SP[x.who].cls + (x.kind !== "talk" ? " pod-ln--" + x.kind : "") + '" data-i="' + i + '" tabindex="0"><b>' + SP[x.who].name + '</b><div class="md">' + App.markdown.render(x.md) + "</div></li>").join("") + "</ol></section></div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    const st = P = { key, ep, i: start, playing: false, token: 0, timer: 0, tick: 0, wake: null };
    st.onRoute = () => { if (P === st && location.hash.indexOf("#/podcast/" + key) !== 0) stopAll(); };
    window.addEventListener("da:route", st.onRoute);
    st.onKey = (e) => { if (P !== st || /input|select|textarea/i.test((e.target && e.target.tagName) || "")) return; if (e.key === " ") { e.preventDefault(); toggle(); } else if (e.key === "ArrowRight") go(st.i + 1); else if (e.key === "ArrowLeft") go(st.i - 1); };
    document.addEventListener("keydown", st.onKey);

    const savePos = (done) => { const all = App.prefs.get("podPos", {}) || {}; all[key] = { i: st.i, done: !!done, at: Date.now() }; const ks = Object.keys(all); if (ks.length > 300) ks.sort((a, b) => all[a].at - all[b].at).slice(0, ks.length - 300).forEach((k) => delete all[k]); App.prefs.set("podPos", all); };
    function mark() {
      view.querySelectorAll(".pod-ln.is-cur").forEach((x) => x.classList.remove("is-cur"));
      const li = view.querySelector('.pod-ln[data-i="' + st.i + '"]');
      if (li) { li.classList.add("is-cur"); if (st.playing) { const r = li.getBoundingClientRect(); if (r.top < 80 || r.bottom > window.innerHeight - 90) li.scrollIntoView({ block: "center", behavior: "smooth" }); } }
      const line = ep.lines[st.i];
      view.querySelectorAll(".pod-sp").forEach((x) => x.classList.toggle("is-talk", !!(line && st.playing && x.dataset.sp === line.who)));
      $(".pod-bar i").style.width = Math.round((st.i / Math.max(1, ep.lines.length)) * 100) + "%";
      $(".pod-bar").setAttribute("aria-valuenow", String(Math.round((st.i / Math.max(1, ep.lines.length)) * 100)));
      const pb = $("#pdPlay"); pb.textContent = st.playing ? "⏸" : "▶"; pb.setAttribute("aria-label", st.playing ? T("Duraklat", "Pause") : T("Oynat", "Play")); pb.classList.toggle("is-on", st.playing);
    }
    function quizCard(line, onGo) {
      const box = $("#pdQuiz"), wait = $("#pdWait").checked;
      let left = line.wait || 12;
      box.hidden = false;
      box.innerHTML = '<b>🤔 ' + esc(T("Sıra sende: ", "Your turn: ")) + esc(T("Soru ", "Question ") + (line.q || "")) + '</b><p>' + esc(T(wait ? "Düşün, hazır olunca cevabı dinle." : "Düşünmen için süre: ", wait ? "Think, then hear the answer." : "Time to think: ")) + (wait ? "" : '<span id="pdLeft">' + left + "</span> " + esc(T("sn", "s"))) + '</p><button type="button" class="btn btn--primary btn--sm" id="pdReveal">' + esc(T("Cevabı duy", "Hear the answer")) + "</button>";
      const goOn = () => { clearInterval(st.tick); box.hidden = true; onGo(); };
      box.querySelector("#pdReveal").addEventListener("click", goOn);
      if (!wait) st.tick = setInterval(() => { left--; const e = box.querySelector("#pdLeft"); if (e) e.textContent = left; if (left <= 0) goOn(); }, 1000);
    }
    function speakLine(tk) {
      if (tk !== st.token || P !== st) return;
      if (st.i >= ep.lines.length) { st.playing = false; savePos(true); mark(); finish(); return; }
      mark(); savePos(false);
      const line = ep.lines[st.i], who = SP[line.who];
      const next = () => {
        if (tk !== st.token || P !== st || !st.playing) return;
        if (line.kind === "quiz") { quizCard(line, () => { if (tk !== st.token || !st.playing) return; st.i++; speakLine(tk); }); return; }
        st.i++; st.timer = setTimeout(() => speakLine(tk), 260);
      };
      if (!App.speech.ttsAvailable()) { st.timer = setTimeout(next, Math.min(9000, 1200 + line.say.length * 55)); return; }
      App.speech.say(line.say, { lang: ep.lang, rate: Number($("#pdRate").value) || 1, pitch: who.pitch, voice: who.voice, onEnd: (why) => { if (why === "stop") return; next(); }, onError: () => { st.timer = setTimeout(next, 400); } });
    }
    async function play() {
      if (st.playing) return;
      st.playing = true; st.token++; $("#pdQuiz").hidden = true; clearInterval(st.tick);
      if (st.i >= ep.lines.length) st.i = 0;
      try { if (navigator.wakeLock && !st.wake) st.wake = await navigator.wakeLock.request("screen"); } catch (e) { /* ekran kilidi desteklenmiyor */ }
      speakLine(st.token);
    }
    function pause() {
      st.playing = false; st.token++; clearTimeout(st.timer); clearInterval(st.tick); App.speech.stopSaying(); $("#pdQuiz").hidden = true; mark(); savePos(false);
      if (st.wake) { try { st.wake.release(); } catch (e) { /* yok */ } st.wake = null; }
    }
    function toggle() { if (st.playing) pause(); else play(); }
    function go(i) { const was = st.playing; pause(); st.i = Math.max(0, Math.min(ep.lines.length - 1, i)); mark(); if (was) play(); }
    function finish() {
      if (st.wake) { try { st.wake.release(); } catch (e) { /* yok */ } st.wake = null; }
      App.ui.toast(T("Bölüm bitti 🎧", "Episode finished 🎧"));
      if (nxt && $("#pdAuto") && $("#pdAuto").checked) st.timer = setTimeout(() => { if (P === st && location.hash === "#/podcast/" + key) { location.hash = "#/podcast/" + nxt; App.prefs.set("podAutoStart", nxt); } }, 1800);
    }
    $("#pdPlay").addEventListener("click", toggle);
    $("#pdPrev").addEventListener("click", () => go(st.i - 1));
    $("#pdNext").addEventListener("click", () => go(st.i + 1));
    $("#pdRate").addEventListener("change", (e) => { App.prefs.set("podRate", Number(e.target.value)); if (st.playing) { pause(); play(); } });
    $("#pdWait").addEventListener("change", (e) => App.prefs.set("podWait", e.target.checked));
    $("#pdAuto").addEventListener("change", (e) => App.prefs.set("podAuto", e.target.checked));
    $("#pdLines").addEventListener("click", (e) => { const li = e.target.closest(".pod-ln"); if (li) go(Number(li.dataset.i)); });
    $("#pdLines").addEventListener("keydown", (e) => { if (e.key === "Enter") { const li = e.target.closest(".pod-ln"); if (li) go(Number(li.dataset.i)); } });
    const std = $("#pdStd"); if (std) std.addEventListener("click", () => { App.prefs.set("podAI", false); App.router.refresh ? App.router.refresh() : player(view, key); });
    const ai = $("#pdAI"); if (ai) ai.addEventListener("click", async () => {
      ai.disabled = true; const old = ai.innerHTML; ai.innerHTML = '<span class="spinner"></span>' + esc(T("Yazılıyor…", "Writing…"));
      try { pause(); await buildAI(key); App.prefs.set("podAI", true); if (P === st) player(view, key); }
      catch (e) { ai.disabled = false; ai.innerHTML = old; App.ui.toast(App.quiz && App.quiz.errorText ? App.quiz.errorText(e) : T("Yapay zekâ sürümü hazırlanamadı.", "Could not create the AI version."), "error"); }
    });
    mark();
    if (App.prefs.get("podAutoStart", null) === key) { App.prefs.set("podAutoStart", null); play(); }
  }

  function render(view, params) {
    const p = (params || []).filter(Boolean);
    if (p.length >= 4) return player(view, p.slice(0, 4).join("/"));
    stopAll();
    return listPage(view);
  }
  App.router.register("podcast", render);
  App.podcast = { build, sections, buildAI, allTopics, stop: stopAll, state: () => P && { i: P.i, playing: P.playing, n: P.ep.lines.length, key: P.key } };
})();
