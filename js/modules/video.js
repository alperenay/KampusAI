/* =========================================================
   video.js — Ders videosunu çalışma materyaline çevir (v1.24)   (#/video, #/video/<id>)

   İki yol:
     • YouTube bağlantısı: herkese açık videoyu Gemini kendisi izler (KampüsAI
       sunucusu ya da kendi Gemini anahtarın gerekir; düşük çözünürlükte, uzun
       videolar da sığar).
     • Metin: videonun transkriptini (YouTube › "Transkripti göster") ya da ders
       notunu yapıştır; her yapay zekâ ile çalışır (cihazdaki dahil).
   Çıktı: özet, zaman damgalı bölümler (videoda o dakikaya gider), kavram
   kartları, 8–10 soruluk test, müfredattaki ilgili kazanımlar.
   Kayıt: "meta" deposu, id "video:<kimlik>" (yedeğe ve eşitlemeye dahil).
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const MAX_TEXT = 60000;
  const SUBJ = {
    matematik: ["Matematik", "sMath"], geometri: ["Geometri", "sMath"], fizik: ["Fizik", "sPhys"], kimya: ["Kimya", "sChem"], biyoloji: ["Biyoloji", "sBio"],
    turkce: ["Türkçe", "sLit"], edebiyat: ["Edebiyat", "sLit"], tarih: ["Tarih", "sHist"], cografya: ["Coğrafya", "sGeo"], felsefe: ["Felsefe", "sPhil"],
    din: ["Din Kültürü", "sRel"], ingilizce: ["İngilizce", "sLang"], diger: ["Diğer", "book"]
  };

  /* ---------------- Yardımcılar ---------------- */
  /** YouTube bağlantısından 11 karakterlik video kimliği (yoksa null) */
  function ytId(s) {
    s = String(s || "").trim();
    let m = s.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/|v\/)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([\w-]{11})(?![\w-])/i);
    if (m) return m[1];
    m = s.match(/^([\w-]{11})$/);
    return m ? m[1] : null;
  }
  /** "1:02:03" / "12:05" / "75" → saniye */
  function secs(t) {
    if (typeof t === "number" && isFinite(t)) return Math.max(0, Math.round(t));
    const p = String(t || "").trim().split(":").map((x) => parseInt(x, 10));
    if (!p.length || p.some((x) => isNaN(x))) return null;
    return p.reduce((a, b) => a * 60 + b, 0);
  }
  const clock = (s) => { s = Math.max(0, s | 0); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); };
  const ytUrl = (id, s) => "https://www.youtube.com/watch?v=" + id + (s ? "&t=" + s + "s" : "");
  const inline = (s) => App.markdown.render(String(s)).replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1");

  /** Video okuyabilen (Gemini tabanlı) internet motoru */
  function videoEngine() {
    const cands = [App.engine.cloud(), App.cloud.server, App.cloud.gemini];
    return cands.find((e) => e && typeof e.toContents === "function" && e.configured()) || null;
  }

  /* ---------------- Yapay zekâ istemi ---------------- */
  function prompts(kind, extra) {
    const tr = App.i18n.lang !== "en";
    const system = tr
      ? "Sen YKS'ye hazırlanan lise öğrencileri için ders videolarından ve notlardan çalışma materyali hazırlayan deneyimli bir öğretmensin. Yalnızca videoda ya da metinde gerçekten anlatılanlara dayan; anlatılmayan bilgi ekleme, uydurma. Matematiksel ifadeleri LaTeX ile ($...$) yaz. Yalnızca geçerli JSON döndür."
      : "You are an experienced teacher turning lesson videos and notes into study material for high-school exam students. Use only what is actually taught; do not invent. Write math in LaTeX ($...$). Return only valid JSON.";
    const subj = Object.keys(SUBJ).join(", ");
    const shape = '{"title":"kısa başlık","subject":"' + subj.split(", ")[0] + '","summary":["madde 1","madde 2"],' +
      (kind === "video" ? '"chapters":[{"t":"MM:SS","title":"bölüm başlığı","note":"o bölümde anlatılan tek cümle"}],' : "") +
      '"cards":[{"q":"kavram ya da soru","a":"kısa cevap"}],"quiz":[{"q":"soru","o":["A","B","C","D"],"a":0,"why":"kısa açıklama"}],"topics":["müfredattaki konu adı"]}';
    const rules = tr ? [
      kind === "video" ? "Bu ders videosunu baştan sona izle." : "Aşağıdaki ders metnini (video transkripti ya da ders notu) oku.",
      "Özet: 6–10 madde; her madde tek, net bir bilgi ya da kural.",
      kind === "video" ? "Bölümler: videonun akışına göre 5–12 bölüm; \"t\" o bölümün videoda başladığı an (MM:SS ya da S:MM:SS), gerçek zamanlara dikkat et." : "",
      "Kartlar: 8–12 kavram kartı; ön yüz kısa soru ya da kavram, arka yüz 1–2 cümle.",
      "Test: 8–10 çoktan seçmeli soru, 4 şık, yalnızca biri doğru; \"a\" doğru şıkkın 0 tabanlı sırası; \"why\" neden doğru olduğu.",
      "Konular: videoda işlenen 1–4 müfredat konusunun Türkçe adı (ör. \"Türev\", \"Hücre zarından madde geçişi\").",
      "\"subject\" şunlardan biri: " + subj + ".",
      "Video ders içeriği değilse ya da açılamıyorsa yalnızca {\"error\":\"neden\"} döndür.",
      "Biçim: " + shape
    ] : [
      kind === "video" ? "Watch this lesson video from start to finish." : "Read the lesson text below (a transcript or notes).",
      "Summary: 6–10 bullet points, one clear fact or rule each.",
      kind === "video" ? "Chapters: 5–12 by the video's flow; \"t\" is when it starts (MM:SS or H:MM:SS)." : "",
      "Cards: 8–12 flashcards (short front, 1–2 sentence back).",
      "Quiz: 8–10 multiple-choice questions, 4 options, one correct; \"a\" is the 0-based index; \"why\" explains it.",
      "Topics: 1–4 curriculum topics covered.",
      "\"subject\" is one of: " + subj + ".",
      "If it is not a lesson or cannot be opened, return only {\"error\":\"reason\"}.",
      "Format: " + shape
    ];
    return { system, prompt: rules.filter(Boolean).join("\n") + (extra ? "\n\n" + (tr ? "METİN:\n" : "TEXT:\n") + extra : "") };
  }

  /* ---------------- Yanıtı doğrula ---------------- */
  function normalize(d, kind) {
    if (!d || typeof d !== "object") throw new Error("json");
    if (d.error && !d.summary) { const e = new Error(String(d.error).slice(0, 300)); e.code = "not-lesson"; throw e; }
    const str = (x, n) => String(x == null ? "" : x).trim().slice(0, n || 600);
    const summary = (Array.isArray(d.summary) ? d.summary : String(d.summary || "").split(/\n+/)).map((x) => str(x).replace(/^[-•*\d.)\s]+/, "")).filter(Boolean).slice(0, 14);
    const chapters = kind === "video" ? (Array.isArray(d.chapters) ? d.chapters : []).map((c) => ({ s: secs(c && (c.t != null ? c.t : c.time)), title: str(c && c.title, 120), note: str(c && c.note, 240) }))
      .filter((c) => c.s != null && c.title).sort((a, b) => a.s - b.s).filter((c, i, a) => !i || c.s !== a[i - 1].s).slice(0, 20) : [];
    const cards = (Array.isArray(d.cards) ? d.cards : []).map((c) => ({ q: str(c && (c.q || c.front), 240), a: str(c && (c.a || c.back), 400) })).filter((c) => c.q && c.a).slice(0, 16);
    const quiz = (Array.isArray(d.quiz) ? d.quiz : []).map((q) => {
      if (!q || !Array.isArray(q.o || q.options)) return null;
      const o = (q.o || q.options).map((x) => str(x, 240).replace(/^\s*[A-Da-d][).]\s+/, "")).filter(Boolean);
      let a = typeof q.a === "number" ? q.a : "ABCD".indexOf(String(q.a || q.answer || "").trim().toUpperCase()[0]);
      if (o.length < 3 || o.length > 5 || !(a >= 0 && a < o.length) || !str(q.q)) return null;
      return { q: str(q.q, 500), o, a, why: str(q.why || q.explanation, 400) };
    }).filter(Boolean).slice(0, 12);
    if (summary.length < 2 && !quiz.length) throw new Error("json");
    const subject = SUBJ[String(d.subject || "").toLowerCase()] ? String(d.subject).toLowerCase() : "diger";
    const topics = (Array.isArray(d.topics) ? d.topics : []).map((x) => str(x, 80)).filter(Boolean).slice(0, 5)
      .map((name) => ({ name, key: App.exams && App.exams.matchTopic ? App.exams.matchTopic(name) : null }));
    return { title: str(d.title, 120) || T("Ders videosu", "Lesson video"), subject, summary, chapters, cards, quiz, topics };
  }

  /* ---------------- Kayıtlar ---------------- */
  const all = async () => (await App.db.getAll("meta")).filter((r) => r && r.kind === "video" && String(r.id).indexOf("video:") === 0)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const get = (id) => App.db.get("meta", "video:" + id);

  /* ---------------- Ana sayfa ---------------- */
  async function home(view) {
    App.setTitle(T("Videodan Çalış", "Study from Video"));
    const list = await all();
    view.innerHTML = '<div class="page page--narrow vd">' +
      '<div class="page-head"><div><h1>' + esc(T("Videodan Çalış", "Study from Video")) + "</h1><p>" +
        esc(T("İzlediğin ders videosunu aktif çalışmaya çevir: özet, dakika dakika bölümler, kavram kartları ve test.", "Turn a lesson video into active study: summary, timestamped chapters, flashcards and a quiz.")) + "</p></div></div>" +
      '<section class="card vd-new"><div class="vd-tabs" role="tablist">' +
        '<button type="button" class="vd-tab is-on" data-k="link" role="tab" aria-selected="true">' + App.icon("play") + esc(T("YouTube bağlantısı", "YouTube link")) + "</button>" +
        '<button type="button" class="vd-tab" data-k="text" role="tab" aria-selected="false">' + App.icon("note") + esc(T("Transkript ya da not", "Transcript or notes")) + "</button></div>" +
        '<div class="vd-pane" data-p="link"><label class="field"><span class="field__label">' + esc(T("Video bağlantısı", "Video link")) + '</span><input class="input" id="vdUrl" inputmode="url" autocomplete="off" placeholder="https://www.youtube.com/watch?v=…"></label>' +
          '<p class="hint">' + esc(T("Herkese açık YouTube videoları için. İnternet yapay zekâsı (KampüsAI sunucusu ya da kendi Gemini anahtarın) videoyu izler; uzun videolarda 1–2 dakika sürebilir.", "For public YouTube videos. Online AI (KampüsAI server or your Gemini key) watches it; long videos may take 1–2 minutes.")) + "</p></div>" +
        '<div class="vd-pane" data-p="text" hidden><label class="field"><span class="field__label">' + esc(T("Başlık (isteğe bağlı)", "Title (optional)")) + '</span><input class="input" id="vdTitle" maxlength="120"></label>' +
          '<label class="field"><span class="field__label">' + esc(T("Transkript ya da ders notu", "Transcript or notes")) + '</span><textarea class="textarea" id="vdText" rows="7" maxlength="' + MAX_TEXT + '" placeholder="' + esc(T("YouTube'da videonun altındaki \"…daha fazla\" › \"Transkripti göster\" ile metni kopyalayıp buraya yapıştır.", "On YouTube: \"…more\" › \"Show transcript\", copy and paste here.")) + '"></textarea></label>' +
          '<label class="field"><span class="field__label">' + esc(T("Video bağlantısı (isteğe bağlı, bölümlere tıklamak için)", "Video link (optional)")) + '</span><input class="input" id="vdUrl2" inputmode="url" autocomplete="off"></label>' +
          '<p class="hint" id="vdCount"></p></div>' +
        '<p class="error-text" id="vdErr" hidden></p>' +
        '<div class="vd-go"><button type="button" class="btn btn--primary" id="vdGo">' + App.icon("sparkle") + esc(T("Çalışma materyali hazırla", "Create study material")) + "</button></div>" +
        '<div id="vdStage"></div></section>' +
      '<h2 class="section-title">' + esc(T("Kitaplığım", "My library")) + (list.length ? " <small>" + list.length + "</small>" : "") + "</h2>" +
      (list.length ? '<ul class="vd-lib">' + list.map(libItem).join("") + "</ul>" : '<p class="hint">' + esc(T("Hazırladığın videolar burada saklanır; internetsiz de açılır.", "Your videos are kept here and open offline too.")) + "</p>") +
      "</div>";
    App.hydrateIcons(view);
    let kind = "link";
    const $ = (s) => view.querySelector(s);
    view.querySelectorAll(".vd-tab").forEach((b) => b.addEventListener("click", () => {
      kind = b.dataset.k;
      view.querySelectorAll(".vd-tab").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); });
      view.querySelectorAll(".vd-pane").forEach((p) => { p.hidden = p.dataset.p !== kind; });
      $("#vdErr").hidden = true;
    }));
    const cnt = () => { const n = $("#vdText").value.length; $("#vdCount").textContent = n ? T(n.toLocaleString("tr-TR") + " karakter", n + " characters") + (n >= MAX_TEXT ? T(" (sınır)", " (limit)") : "") : ""; };
    $("#vdText").addEventListener("input", cnt);
    const err = (m) => { const e = $("#vdErr"); e.textContent = m; e.hidden = !m; };
    $("#vdUrl").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#vdGo").click(); });
    ["#vdUrl", "#vdText", "#vdUrl2"].forEach((s) => $(s).addEventListener("input", () => err("")));
    $("#vdGo").addEventListener("click", () => {
      if (kind === "link") {
        const id = ytId($("#vdUrl").value);
        if (!id) return err(T("Geçerli bir YouTube bağlantısı yapıştır (ör. https://youtu.be/…).", "Paste a valid YouTube link."));
        create(view, { kind: "video", vid: id });
      } else {
        const text = $("#vdText").value.trim();
        if (text.length < 300) return err(T("Biraz daha uzun bir metin gerekli (en az birkaç paragraf).", "Please paste a longer text."));
        const u = $("#vdUrl2").value.trim(), id = u ? ytId(u) : null;
        if (u && !id) return err(T("Bağlantı YouTube bağlantısı gibi görünmüyor; boş bırakabilirsin.", "That doesn't look like a YouTube link; you can leave it empty."));
        create(view, { kind: "text", text: text.slice(0, MAX_TEXT), title: $("#vdTitle").value.trim(), vid: id });
      }
    });
  }
  // v1.64: içerik güvenlik politikası (CSP) satır içi onerror'a izin vermez; küçük resim yedeği tek dinleyiciyle
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.vdFallback) return;
    if (img.dataset.vdFallback === "remove") img.remove();
    else img.replaceWith(Object.assign(document.createElement("span"), { className: "vd-thumb vd-thumb--x" }));
  }, true);
  const libItem = (r) => {
    const s = SUBJ[r.subject] || SUBJ.diger;
    return '<li><a class="vd-item" href="#/video/' + esc(r.id.slice(6)) + '">' +
      (r.vid ? '<img class="vd-thumb" src="https://i.ytimg.com/vi/' + esc(r.vid) + '/mqdefault.jpg" alt="" loading="lazy" data-vd-fallback="swap">' : '<span class="vd-thumb vd-thumb--x"></span>') +
      '<span class="vd-item__t"><b>' + esc(r.title) + "</b><small>" + esc(s[0]) + " · " + esc(App.utils.fmtDate(String(r.createdAt).slice(0, 10))) +
      (r.best != null ? " · " + esc(T("test: ", "quiz: ") + r.best + "/" + r.quiz.length) : "") + "</small></span>" + App.icon("chevron") + "</a></li>";
  };

  /* ---------------- Oluştur ---------------- */
  let ctrl = null;
  async function create(view, inp) {
    if (ctrl) ctrl.abort();
    const my = ctrl = new AbortController();
    const stage = view.querySelector("#vdStage"), go = view.querySelector("#vdGo");
    const started = Date.now();
    go.disabled = true;
    const paint = (msg, model) => { if (!stage.isConnected) return; stage.innerHTML = '<div class="stage"><span class="spinner"></span>' + App.icon(inp.kind === "video" ? "eye" : "sparkle") + "<span>" + esc(msg) + "</span>" + (model ? "<code>" + esc(model) + "</code>" : "") + '<span class="stage__time" id="vdT"></span><button type="button" class="btn btn--sm btn--ghost" id="vdStop">' + esc(T("Vazgeç", "Cancel")) + "</button></div>"; App.hydrateIcons(stage); stage.querySelector("#vdStop").addEventListener("click", () => my.abort()); };
    paint(inp.kind === "video" ? T("Video izleniyor ve not çıkarılıyor…", "Watching the video…") : T("Metin okunuyor…", "Reading the text…"));
    const tick = setInterval(() => { const e = view.querySelector("#vdT"); if (!e) return clearInterval(tick); e.textContent = Math.round((Date.now() - started) / 1000) + T(" sn", " s"); }, 1000);
    try {
      let data, model;
      if (inp.kind === "video") {
        const eng = videoEngine();
        if (!eng) { const e = new Error(T("Bağlantıdan video okumak için internet yapay zekâsı gerekir (KampüsAI sunucusu ya da kendi Gemini anahtarın). Ayarlar › Yapay zekâ'dan açabilir ya da \"Transkript ya da not\" sekmesini kullanabilirsin.", "Reading a video link needs online AI (KampüsAI server or your Gemini key). Or use the \"Transcript or notes\" tab.")); e.code = "no-video"; throw e; }
        if (navigator.onLine === false) { const e = new Error(T("İnternet bağlantısı yok.", "You are offline.")); e.code = "offline"; throw e; }
        await eng.prepare(my.signal);
        const pr = prompts("video");
        const res = await eng.chat({
          model: eng.config().chatModel,
          messages: [{ role: "system", content: pr.system }, { role: "user", content: pr.prompt, files: [{ uri: ytUrl(inp.vid) }] }],
          options: { temperature: 0.3, json: true, mediaResolution: "MEDIA_RESOLUTION_LOW" },
          signal: my.signal,
          onRetry: (m) => paint(T("Yoğunluk var, başka modelle deneniyor…", "Busy, trying another model…"), m)
        });
        data = App.ai.parseJSON(res.text); model = res.model;
      } else {
        const pr = prompts("text", inp.text);
        const res = await App.ai.generate(Object.assign({}, pr, { temperature: 0.3, signal: my.signal, onStage: (eng, m) => paint(T("Metin okunuyor…", "Reading the text…"), m) }));
        data = res.data; model = res.model;
      }
      const n = normalize(data, inp.kind);
      if (inp.kind === "text" && inp.title) n.title = inp.title.slice(0, 120);
      const id = (inp.vid ? inp.vid + "-" : "") + uid("v").slice(-6);
      const rec = Object.assign({ id: "video:" + id, kind: "video", vid: inp.vid || null, source: inp.kind, model, createdAt: new Date().toISOString(), best: null }, n);
      await App.db.put("meta", rec);
      clearInterval(tick);
      if (my !== ctrl) return;
      if (location.hash.indexOf("#/video") === 0) location.hash = "#/video/" + id;
    } catch (e) {
      clearInterval(tick);
      if (my !== ctrl || !stage.isConnected) return;
      go.disabled = false;
      if (e && (e.name === "AbortError" || my.signal.aborted)) { stage.innerHTML = ""; return; }
      let msg = App.quiz && App.quiz.errorText ? App.quiz.errorText(e) : String((e && e.message) || e);
      if (inp.kind === "video" && e && (e.status === 400 || /invalid|unsupported|not.*(found|accessible)|private/i.test(e.message || ""))) msg = T("Video açılamadı. Herkese açık bir YouTube videosu olduğundan emin ol ya da transkripti \"Transkript ya da not\" sekmesine yapıştır.", "Could not open the video. Make sure it is public, or paste the transcript instead.");
      if (e && e.code === "not-lesson") msg = T("Bu video bir ders anlatımı gibi görünmüyor: ", "This doesn't look like a lesson: ") + e.message;
      stage.innerHTML = '<div class="msg__error"><b>' + esc(T("Hazırlanamadı", "Could not create")) + "</b><p>" + esc(msg) + "</p></div>";
    } finally {
      if (my === ctrl && go.isConnected) go.disabled = false;
    }
  }

  /* ---------------- Ayrıntı ---------------- */
  async function detail(view, id) {
    const r = await get(id);
    if (!r) { App.ui.toast(T("Video bulunamadı", "Video not found"), "error"); location.hash = "#/video"; return; }
    App.setTitle(r.title);
    const s = SUBJ[r.subject] || SUBJ.diger;
    const quizState = r.quiz.map(() => null);
    view.innerHTML = '<div class="page page--narrow vd">' +
      '<nav class="crumbs"><a href="#/video">' + App.icon("chevronL") + esc(T("Videodan Çalış", "Study from Video")) + "</a></nav>" +
      '<div class="vd-head">' + (r.vid ? '<a class="vd-cover" href="' + esc(ytUrl(r.vid)) + '" target="_blank" rel="noopener" aria-label="' + esc(T("Videoyu YouTube'da aç", "Open on YouTube")) + '"><img src="https://i.ytimg.com/vi/' + esc(r.vid) + '/hqdefault.jpg" alt="" data-vd-fallback="remove"><span class="vd-play">' + App.icon("play") + "</span></a>" : "") +
        '<div><span class="vd-subj">' + App.icon(s[1]) + esc(s[0]) + "</span><h1>" + esc(r.title) + "</h1>" +
        '<p class="hint">' + esc(r.source === "video" ? T("YouTube videosundan hazırlandı", "Made from a YouTube video") : T("Metinden hazırlandı", "Made from text")) + " · " + esc(App.utils.fmtDate(String(r.createdAt).slice(0, 10))) + (r.model ? " · " + esc(r.model) : "") + "</p>" +
        '<div class="vd-actions">' + (r.vid ? '<a class="btn btn--sm" href="' + esc(ytUrl(r.vid)) + '" target="_blank" rel="noopener">' + App.icon("play") + esc(T("YouTube'da izle", "Watch on YouTube")) + "</a>" : "") +
          '<button type="button" class="btn btn--sm btn--ai" id="vdAsk">' + App.icon("sparkle") + esc(T("Asistana sor", "Ask the assistant")) + '</button><button type="button" class="btn btn--sm btn--ghost" id="vdDel">' + App.icon("trash") + esc(T("Sil", "Delete")) + "</button></div></div></div>" +
      '<nav class="vd-toc">' + [["vdSum", T("Özet", "Summary")], r.chapters.length ? ["vdCh", T("Bölümler", "Chapters")] : null, r.cards.length ? ["vdCards", T("Kartlar", "Cards")] : null, r.quiz.length ? ["vdQuiz", T("Test", "Quiz")] : null]
        .filter(Boolean).map(([h, l]) => '<a href="#' + h + '" data-jump="' + h + '">' + esc(l) + "</a>").join("") + "</nav>" +
      '<section class="card vd-sec" id="vdSum"><h2>' + App.icon("note") + esc(T("Özet", "Summary")) + "</h2><ul class=\"vd-sum\">" + r.summary.map((x) => "<li>" + inline(x) + "</li>").join("") + "</ul>" +
        (r.topics.length ? '<p class="vd-topics"><b>' + esc(T("İlgili konular: ", "Related topics: ")) + "</b>" + r.topics.map((t) => t.key && App.lessons.find(t.key) ? '<a class="vd-topic" href="#/konular/' + esc(t.key) + '">' + esc(t.name) + "</a>" : '<span class="vd-topic">' + esc(t.name) + "</span>").join("") + "</p>" : "") + "</section>" +
      (r.chapters.length ? '<section class="card vd-sec" id="vdCh"><h2>' + App.icon("clock") + esc(T("Bölümler", "Chapters")) + '</h2><ol class="vd-ch">' + r.chapters.map((c) =>
        "<li>" + (r.vid ? '<a class="vd-ch__t" href="' + esc(ytUrl(r.vid, c.s)) + '" target="_blank" rel="noopener">' + clock(c.s) + "</a>" : '<span class="vd-ch__t">' + clock(c.s) + "</span>") +
        "<div><b>" + inline(c.title) + "</b>" + (c.note ? "<small>" + inline(c.note) + "</small>" : "") + "</div></li>").join("") + "</ol>" +
        (r.vid ? '<p class="hint">' + esc(T("Zamana dokununca video YouTube'da o dakikadan açılır. Zamanlar yapay zekâ tahminidir, birkaç saniye kayabilir.", "Tap a time to open the video there. Times are AI estimates.")) + "</p>" : "") + "</section>" : "") +
      (r.cards.length ? '<section class="card vd-sec" id="vdCards"><h2>' + App.icon("layers") + esc(T("Kavram kartları", "Flashcards")) + ' <small class="hint">' + esc(T("dokun, çevir", "tap to flip")) + '</small></h2><div class="vd-cards">' + r.cards.map((c, i) =>
        '<button type="button" class="vd-card" data-card="' + i + '" aria-pressed="false"><span class="vd-card__f">' + inline(c.q) + '</span><span class="vd-card__b">' + inline(c.a) + "</span></button>").join("") + "</div></section>" : "") +
      (r.quiz.length ? '<section class="card vd-sec" id="vdQuiz"><h2>' + App.icon("quiz") + esc(T("Test", "Quiz")) + ' <small class="hint" id="vdScore"></small></h2><ol class="vd-quiz">' + r.quiz.map((q, i) =>
        '<li class="vd-q" data-q="' + i + '"><p>' + inline(q.q) + '</p><div class="vd-opts">' + q.o.map((o, j) => '<button type="button" class="vd-opt" data-o="' + j + '"><span class="vd-opt__k">' + "ABCDE"[j] + '</span><span class="vd-opt__t">' + inline(o) + "</span></button>").join("") + '</div><p class="vd-why" hidden></p></li>').join("") + "</ol>" +
        '<button type="button" class="btn btn--ghost btn--sm" id="vdReset" hidden>' + App.icon("refresh") + esc(T("Testi yeniden çöz", "Retake")) + "</button></section>" : "") +
      "</div>";
    App.hydrateIcons(view);
    view.querySelectorAll("[data-jump]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const t = view.querySelector("#" + a.dataset.jump); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }));
    view.querySelectorAll(".vd-card").forEach((b) => b.addEventListener("click", () => { const on = !b.classList.contains("is-flip"); b.classList.toggle("is-flip", on); b.setAttribute("aria-pressed", on); }));
    view.querySelector("#vdDel").addEventListener("click", async () => {
      if (!(await App.ui.confirm(T("Bu video kitaplıktan silinsin mi?", "Delete this video from your library?"), T("Sil", "Delete"), true))) return;
      await App.db.remove("meta", "video:" + id); App.ui.toast(T("Silindi", "Deleted")); location.hash = "#/video";
    });
    view.querySelector("#vdAsk").addEventListener("click", () => App.modules.assistant.startWith(T(
      "\"" + r.title + "\" adlı ders videosundan çalışıyorum. Özeti şu:\n- " + r.summary.join("\n- ") + "\n\nBu konuyu YKS düzeyinde biraz daha derin anlat, sık yapılan hataları söyle ve bana 2 soru sor.",
      "I'm studying the lesson video \"" + r.title + "\". Summary:\n- " + r.summary.join("\n- ") + "\n\nExplain it a bit deeper, list common mistakes and ask me 2 questions."), null));
    const score = view.querySelector("#vdScore"), reset = view.querySelector("#vdReset");
    const paintScore = async () => {
      const done = quizState.filter((x) => x != null).length, ok = quizState.filter((x) => x === true).length;
      if (score) score.textContent = done ? ok + " / " + r.quiz.length : "";
      if (done === r.quiz.length) {
        if (reset) reset.hidden = false;
        if (r.best == null || ok > r.best) { r.best = ok; await App.db.put("meta", r); }
        App.ui.toast(T("Test bitti: " + ok + " / " + r.quiz.length, "Done: " + ok + " / " + r.quiz.length));
      }
    };
    view.querySelectorAll(".vd-q").forEach((li) => {
      const i = +li.dataset.q, q = r.quiz[i];
      li.querySelectorAll(".vd-opt").forEach((b) => b.addEventListener("click", () => {
        if (quizState[i] != null) return;
        const j = +b.dataset.o, ok = j === q.a;
        quizState[i] = ok;
        li.querySelectorAll(".vd-opt").forEach((x) => { x.disabled = true; const k = +x.dataset.o; if (k === q.a) x.classList.add("is-right"); else if (k === j) x.classList.add("is-wrong"); });
        const w = li.querySelector(".vd-why"); w.innerHTML = "<b>" + esc(ok ? T("Doğru. ", "Correct. ") : T("Yanlış. ", "Wrong. ")) + "</b>" + (q.why ? inline(q.why) : ""); w.hidden = false;
        paintScore();
      }));
    });
    if (reset) reset.addEventListener("click", () => detail(view, id));
  }

  function render(view, params) { if (params && params[0]) return detail(view, params[0]); return home(view); }

  App.router.register("video", render);
  App.video = { ytId, secs, clock, normalize, prompts, videoEngine, all };
})();
