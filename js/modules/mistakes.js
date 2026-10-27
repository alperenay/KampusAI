/* =========================================================
   mistakes.js — Yanlış Defteri   (#/yanlislar)

   Kaynaklar: konu sonu testindeki yanlış/boş sorular, sohbetten
   "Yanlış defterine ekle", elle eklenen sorular (fotoğraflı olabilir).
   Aralıklı tekrar: "Bildim" dedikçe soru 1 → 3 → 7 → 16 gün sonra tekrar
   gelir; 4 kez bilinince "öğrenildi" sayılır. "Bilemedim" ertesi güne atar.

   Kayıt (IndexedDB "mistakes"):
     { id, createdAt, source: "quiz"|"chat"|"manual"|"similar", key?, label,
       q, options?, answer?, chosen?, explain, image?, reviews, nextAt, mastered,
       errType?, errBy?: "ai"|"user", errReason? }

   Hata türü analizi: her yanlışın türü (kavram yanılgısı, bilgi eksikliği,
   işlem hatası, dikkatsizlik, süre) öğrencinin seçtiği yanlış şıktan yapay
   zekâyla tahmin edilir ya da öğrenci kendisi seçer. Defterin başında dağılım,
   en sık hata türü için öneri ve ders bazında kırılım gösterilir.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const t = App.t;
  const DAY = 24 * 3600 * 1000;
  const STEPS = [1, 3, 7, 16];
  const LETTERS = "ABCDE";

  const md = (s) => App.markdown.render(s || "");

  /* ---------------- Hata türleri ---------------- */
  const ERR = {
    kavram: { color: "#c08cff", icon: "lightbulb" },
    bilgi:  { color: "#7aa2ff", icon: "book" },
    islem:  { color: "#f2b33d", icon: "target" },
    dikkat: { color: "#ff8a80", icon: "eye" },
    sure:   { color: "#5bc0a8", icon: "timer" }
  };
  const ERR_TYPES = Object.keys(ERR);
  const subjectOf = (m) => (m.label || "").split(" · ").slice(0, 2).join(" · ") || t("mis.src." + (m.source || "manual"));

  /** Dağılım: { typed, untyped, classifiable, counts{tür:n}, top, topShare, bySubject{tür:[[ders,n]…]} } */
  function errorStats(all) {
    const counts = {}, bySubject = {};
    ERR_TYPES.forEach((k) => { counts[k] = 0; bySubject[k] = {}; });
    let typed = 0, untyped = 0, classifiable = 0;
    all.forEach((m) => {
      if (m.errType && ERR[m.errType]) {
        typed++; counts[m.errType]++;
        const s = subjectOf(m); bySubject[m.errType][s] = (bySubject[m.errType][s] || 0) + 1;
      } else {
        untyped++;
        if (canClassify(m)) classifiable++;
      }
    });
    const top = typed ? ERR_TYPES.slice().sort((a, b) => counts[b] - counts[a])[0] : null;
    const subj = {};
    ERR_TYPES.forEach((k) => { subj[k] = Object.entries(bySubject[k]).sort((a, b) => b[1] - a[1]); });
    return { typed, untyped, classifiable, counts, top, topShare: top ? counts[top] / typed : 0, bySubject: subj };
  }

  const canClassify = (m) => !m.errType && !m.errTried && m.options && m.options.length && m.chosen != null && m.chosen >= 0 && m.answer != null;

  function errChipHtml(m) {
    const e = m.errType && ERR[m.errType];
    return '<button class="err-chip' + (e ? "" : " err-chip--empty") + '" type="button" data-mact="errpick"' + (e ? ' style="--c:' + e.color + '"' : "") +
      ' title="' + esc(m.errReason || t("mis.err.pickTitle")) + '">' + (e ? App.icon(e.icon) + esc(t("mis.err." + m.errType)) + (m.errBy === "ai" ? ' <small>' + esc(t("mis.err.byAi")) + "</small>" : "") : App.icon("plus") + esc(t("mis.err.unknown"))) + "</button>";
  }

  function errPickHtml(m, open) {
    return '<div class="err-pick"' + (open ? "" : " hidden") + '><span class="hint">' + esc(t("mis.err.why")) + "</span>" +
      ERR_TYPES.map((k) => '<button class="err-chip' + (m.errType === k ? " is-on" : "") + '" type="button" data-mact="seterr" data-type="' + k + '" style="--c:' + ERR[k].color + '">' + App.icon(ERR[k].icon) + esc(t("mis.err." + k)) + "</button>").join("") + "</div>";
  }

  /** Defterin başındaki analiz kartı */
  function analysisHtml(all) {
    if (!all.length) return "";
    const st = errorStats(all);
    const bar = st.typed ? '<div class="err-bar">' + ERR_TYPES.filter((k) => st.counts[k]).map((k) =>
      '<span style="--c:' + ERR[k].color + ";flex:" + st.counts[k] + '" title="' + esc(t("mis.err." + k) + ": " + st.counts[k]) + '"></span>').join("") + "</div>" : "";
    const rows = st.typed ? '<div class="err-rows">' + ERR_TYPES.filter((k) => st.counts[k]).sort((a, b) => st.counts[b] - st.counts[a]).map((k) => {
      const where = st.bySubject[k].slice(0, 2).map(([s, n]) => s.split(" · ").pop() + " (" + n + ")").join(", ");
      return '<div class="err-row"><i style="--c:' + ERR[k].color + '"></i><b>' + esc(t("mis.err." + k)) + '</b><span class="err-row__n">' + st.counts[k] + " · %" + Math.round(st.counts[k] / st.typed * 100) + "</span>" +
        (where ? '<span class="hint">' + esc(where) + "</span>" : "") + "</div>";
    }).join("") + "</div>" : '<p class="hint">' + esc(t("mis.err.none")) + "</p>";
    const tip = st.top ? '<div class="err-tip" style="--c:' + ERR[st.top].color + '">' + App.icon("lightbulb") + "<span><b>" +
      esc(t("mis.err.topTitle", { type: t("mis.err." + st.top), pct: Math.round(st.topShare * 100) })) + "</b> " + esc(t("mis.err.tip." + st.top)) + "</span></div>" : "";
    const actions = (st.classifiable ? '<button class="btn btn--sm btn--ai" type="button" id="errClassify">' + App.icon("sparkle") + esc(t("mis.err.classify", { n: st.classifiable })) + "</button>" : "") +
      (st.untyped - st.classifiable > 0 ? '<span class="hint">' + esc(t("mis.err.pickHint", { n: st.untyped - st.classifiable })) + "</span>" : "");
    return '<details class="card err-card"' + (App.prefs.get("errOpen", true) ? " open" : "") + '><summary><h2>' + App.icon("chart") + esc(t("mis.err.title")) + "</h2>" +
      '<span class="hint">' + esc(t("mis.err.summary", { typed: st.typed, total: all.length })) + "</span></summary>" +
      bar + rows + tip + (actions ? '<div class="err-actions">' + actions + "</div>" : "") + "</details>";
  }

  /* --- Yapay zekâyla sınıflandırma (öğrencinin seçtiği yanlış şıktan) --- */
  let classifying = null;
  function classifyPrompt(items) {
    const tr = App.i18n.lang === "tr";
    const plain = (x) => new DOMParser().parseFromString("<body>" + String(x || "") + "</body>", "text/html").body.textContent.trim();
    const system = tr
      ? "Sen öğrenci hatalarını analiz eden deneyimli bir öğretmensin. Yalnızca geçerli JSON döndür."
      : "You are an experienced teacher who analyses student mistakes. Return only valid JSON.";
    const rules = tr ? [
      "Her soruda öğrencinin işaretlediği YANLIŞ şıkka bakarak hatanın en olası türünü belirle:",
      "- kavram: kavram yanılgısı — konuyu yanlış anlamış; seçtiği şık tipik bir yanlış inanıştan geliyor.",
      "- bilgi: bilgi eksikliği — gereken kuralı, formülü ya da bilgiyi bilmiyor.",
      "- islem: işlem hatası — yöntem doğru ama hesapta hata yapmış; seçtiği şık doğru yöntemle küçük bir hesap/işaret hatasıyla bulunuyor.",
      "- dikkat: dikkatsizlik — soru kökünü yanlış okumuş, \"değildir\" gibi bir ifadeyi kaçırmış ya da istenmeyen bir değeri işaretlemiş.",
      "reason: öğrenciye hitaben tek kısa cümle (ör. \"B şıkkı, karekök alırken eksi kökü unutunca çıkıyor.\").",
      "Biçim: {\"items\":[{\"id\":\"…\",\"type\":\"islem\",\"reason\":\"…\"}]}"
    ] : [
      "For each question, look at the WRONG option the student picked and decide the most likely type of mistake:",
      "- kavram: misconception — the picked option comes from a typical wrong belief.",
      "- bilgi: knowledge gap — they don't know the needed rule, formula or fact.",
      "- islem: calculation error — right method, but a small arithmetic/sign slip leads to the picked option.",
      "- dikkat: careless reading — misread the stem, missed a \"NOT\", or picked a value that wasn't asked.",
      "reason: one short sentence addressed to the student, in English.",
      "Format: {\"items\":[{\"id\":\"…\",\"type\":\"islem\",\"reason\":\"…\"}]}"
    ];
    const qs = items.map((m, i) => "[" + (i + 1) + "] id=" + m.id + "\n" + (tr ? "Soru: " : "Question: ") + plain(m.q).slice(0, 900) + "\n" +
      (tr ? "Şıklar: " : "Options: ") + m.options.map((o, j) => LETTERS[j] + ") " + plain(o)).join("  ") + "\n" +
      (tr ? "Doğru: " : "Correct: ") + LETTERS[m.answer] + " · " + (tr ? "Öğrencinin cevabı: " : "Student's answer: ") + LETTERS[m.chosen] +
      (m.explain ? "\n" + (tr ? "Çözüm: " : "Solution: ") + plain(m.explain).slice(0, 500) : "")).join("\n\n");
    return { system, prompt: rules.join("\n") + "\n\n" + (tr ? "SORULAR:\n" : "QUESTIONS:\n") + qs };
  }

  /** Türü belli olmayan (şıklı, işaretlenmiş) yanlışları sınıflandır. Dönen: sınıflandırılan sayısı */
  function classifyPending(limit) {
    if (classifying) return classifying;
    classifying = (async () => {
      const all = await App.db.getAll("mistakes");
      const items = all.filter(canClassify).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, limit || 12);
      if (!items.length) return 0;
      let data;
      try { data = (await App.ai.generate(Object.assign(classifyPrompt(items), { temperature: 0.2 }))).data; }
      catch (e) {
        if (e && (e instanceof SyntaxError || e.message === "json")) for (const m of items) { m.errTried = true; await App.db.put("mistakes", m); }
        throw e;
      }
      const res = (data && (data.items || data.results)) || [];
      let n = 0;
      for (const m of items) {
        const r = res.find((x) => x && String(x.id) === m.id);
        const type = r && String(r.type || "").toLowerCase().replace("ı", "i").replace("ş", "s");
        if (r && ERR[type] && type !== "sure") { m.errType = type; m.errBy = "ai"; m.errReason = String(r.reason || "").trim().slice(0, 240); n++; }
        else m.errTried = true;
        await App.db.put("mistakes", m);
      }
      return n;
    })();
    const p = classifying;
    p.finally(() => { classifying = null; }).catch(() => {});
    return p;
  }

  async function add(rec) {
    const now = new Date();
    const row = Object.assign({ id: uid("mis"), createdAt: now.toISOString(), reviews: 0, nextAt: new Date(now.getTime() + DAY).toISOString(), mastered: false }, rec);
    await App.db.put("mistakes", row);
    return row;
  }

  const isDue = (m) => !m.mastered && Date.parse(m.nextAt || 0) <= Date.now();
  /** Tekrar sonucu (Bildim / Tekrar sor) — bu sayfa ve birleşik tekrar kuyruğu (#/tekrar) aynı kuralı kullanır */
  async function review(m, knew) {
    if (knew) {
      m.reviews = (m.reviews || 0) + 1;
      if (m.reviews >= STEPS.length) m.mastered = true;
      else m.nextAt = new Date(Date.now() + STEPS[m.reviews] * DAY).toISOString();
    } else {
      m.reviews = 0; m.mastered = false; m.nextAt = new Date(Date.now() + DAY).toISOString();
    }
    m.lastReviewAt = new Date().toISOString();          // çalışma serisi için
    await App.db.put("mistakes", m);
    return m;
  }

  async function counts() {
    const all = await App.db.getAll("mistakes");
    return { total: all.length, due: all.filter(isDue).length, mastered: all.filter((m) => m.mastered).length };
  }

  function optionsHtml(m, revealed) {
    if (!m.options || !m.options.length) return "";
    return '<ol class="opts">' + m.options.map((o, i) => {
      let cls = "opt";
      if (revealed && i === m.answer) cls += " is-correct";
      else if (revealed && i === m.chosen) cls += " is-wrong";
      return '<li class="' + cls + '"><span class="opt__letter">' + LETTERS[i] + '</span><span class="opt__text md">' + App.markdown.render(String(o)).replace(/^<p>|<\/p>$/g, "") + "</span></li>";
    }).join("") + "</ol>";
  }

  function cardHtml(m, revealed) {
    const src = { quiz: t("mis.src.quiz"), chat: t("mis.src.chat"), manual: t("mis.src.manual"), similar: t("mis.src.similar"), check: t("mis.src.check") }[m.source] || "";
    const next = m.mastered ? t("mis.mastered") : isDue(m) ? t("mis.dueNow") : t("mis.nextAt", { date: App.utils.fmtDate(String(m.nextAt).slice(0, 10)) });
    return '<article class="card mis" data-id="' + esc(m.id) + '">' +
      '<div class="mis__head"><span class="mis__label">' + esc(m.label || "") + "</span>" +
        '<span class="chip-model">' + esc(src) + "</span>" + errChipHtml(m) + "<span class=\"mis__next\">" + esc(next) + "</span>" +
        '<button class="icon-btn icon-btn--sm" type="button" data-mact="delete" title="' + esc(t("delete")) + '">' + App.icon("trash") + "</button></div>" +
      errPickHtml(m, revealed && !m.errType) +
      (m.image ? '<img class="mis__img" src="' + m.image + '" alt="">' : "") +
      (m.q ? '<div class="md mis__q">' + md(m.q) + "</div>" : "") +
      optionsHtml(m, revealed) +
      (revealed
        ? (m.chosen != null && m.chosen !== m.answer && m.options ? '<p class="hint">' + esc(t("mis.yourAnswer", { a: m.chosen < 0 ? t("quiz.blank") : LETTERS[m.chosen] })) + "</p>" : "") +
          (m.explain ? '<div class="mis__explain"><b>' + esc(t("mis.explain")) + '</b><div class="md">' + md(m.explain) + "</div></div>" : "") +
          (m.errReason && m.errType ? '<p class="hint err-reason" style="--c:' + ERR[m.errType].color + '">' + App.icon("sparkle") + esc(t("mis.err." + m.errType)) + ": " + esc(m.errReason) + "</p>" : "") +
          (m.mastered ? "" : '<div class="mis__actions"><button class="btn btn--sm" type="button" data-mact="again">' + App.icon("xCircle") + esc(t("mis.again")) + "</button>" +
            '<button class="btn btn--sm btn--primary" type="button" data-mact="knew">' + App.icon("checkCircle") + esc(t("mis.knew")) + "</button>" +
            '<button class="btn btn--sm btn--ghost" type="button" data-mact="ask">' + App.icon("sparkle") + esc(t("mis.ask")) + "</button>" +
            '<button class="btn btn--sm btn--ghost" type="button" data-mact="similar">' + App.icon("layers") + esc(t("sim.button")) + "</button></div>")
        : '<div class="mis__actions"><button class="btn btn--sm" type="button" data-mact="reveal">' + App.icon("eye") + esc(t("mis.reveal")) + "</button>" +
            '<button class="btn btn--sm btn--ghost" type="button" data-mact="similar">' + App.icon("layers") + esc(t("sim.button")) + "</button></div>") +
    "</article>";
  }

  async function render(view, params) {
    App.setTitle(t("mis.title"));
    const filter = params[0] === "tumu" ? "all" : params[0] === "ogrenilen" ? "mastered" : "due";
    const all = (await App.db.getAll("mistakes")).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const subjects = Array.from(new Set(all.map((m) => (m.label || "").split(" · ").slice(0, 2).join(" · ")).filter(Boolean)));
    const subj = App.prefs.get("misSubject", "");
    let list = filter === "due" ? all.filter(isDue).sort((a, b) => String(a.nextAt).localeCompare(String(b.nextAt)))
      : filter === "mastered" ? all.filter((m) => m.mastered) : all;
    if (subj) list = list.filter((m) => (m.label || "").indexOf(subj) === 0);
    const c = { total: all.length, due: all.filter(isDue).length, mastered: all.filter((m) => m.mastered).length };
    const revealed = new Set();

    const tab = (id, href, label, n) => '<a class="tab' + (filter === id ? " is-active" : "") + '" href="#/yanlislar' + href + '">' + esc(label) + ' <span style="color:var(--faint);font-weight:400">' + n + "</span></a>";

    view.innerHTML =
      '<div class="page page--narrow">' +
        '<div class="page-head"><div><h1>' + esc(t("mis.title")) + "</h1><p>" + esc(t("mis.intro")) + "</p></div>" +
          '<div class="page-head__actions"><button class="btn btn--primary" type="button" id="misAdd">' + App.icon("plus") + esc(t("mis.add")) + "</button></div></div>" +
        '<div class="mis-bar"><div class="tabs" role="tablist">' +
          tab("due", "", t("mis.tab.due"), c.due) + tab("all", "/tumu", t("mis.tab.all"), c.total) + tab("mastered", "/ogrenilen", t("mis.tab.mastered"), c.mastered) + "</div>" +
          (subjects.length > 1 ? '<select class="select" id="misSubj" style="width:auto;min-width:180px" aria-label="' + esc(t("mis.allSubjects")) + '"><option value="">' + esc(t("mis.allSubjects")) + "</option>" +
            subjects.map((s) => '<option value="' + esc(s) + '"' + (s === subj ? " selected" : "") + ">" + esc(s) + "</option>").join("") + "</select>" : "") +
        "</div>" +
        analysisHtml(all) +
        '<div id="misList" class="mis-list">' +
          (list.length ? list.map((m) => cardHtml(m, false)).join("")
            : App.ui.empty("bookmark", filter === "due" && c.total ? t("mis.emptyDueTitle") : t("mis.emptyTitle"), filter === "due" && c.total ? t("mis.emptyDueText") : t("mis.emptyText"))) +
        "</div>" +
      "</div>";

    async function repaintAnalysis() {
      const old = view.querySelector(".err-card");
      const html = analysisHtml(await App.db.getAll("mistakes"));
      if (old) old.outerHTML = html; else if (html) view.querySelector("#misList").insertAdjacentHTML("beforebegin", html);
      App.hydrateIcons(view);
      bindAnalysis();
    }
    function bindAnalysis() {
      const det = view.querySelector(".err-card");
      if (det) det.addEventListener("toggle", () => App.prefs.set("errOpen", det.open));
      const cl = view.querySelector("#errClassify");
      if (cl) cl.addEventListener("click", async () => {
        cl.disabled = true;
        cl.innerHTML = '<span class="spinner"></span>' + esc(t("mis.err.classifying"));
        try {
          const n = await classifyPending(20);
          App.ui.toast(t("mis.err.classified", { n }));
          App.router.refresh();
        } catch (e) {
          App.ui.toast(App.quiz.errorText(e), "error");
          repaintAnalysis();
        }
      });
    }
    bindAnalysis();

    const sel = view.querySelector("#misSubj");
    if (sel) sel.addEventListener("change", () => { App.prefs.set("misSubject", sel.value); App.router.refresh(); });
    view.querySelector("#misAdd").addEventListener("click", openAdd);

    const onClick = async (e) => {
      const b = e.target.closest("[data-mact]");
      if (!b) return;
      const card = b.closest(".mis");
      const m = await App.db.get("mistakes", card.dataset.id);
      if (!m) return;
      const a = b.dataset.mact;
      if (a === "reveal") { revealed.add(m.id); card.outerHTML = cardHtml(m, true); App.hydrateIcons(view); return; }
      if (a === "errpick") { const p = card.querySelector(".err-pick"); if (p) p.hidden = !p.hidden; return; }
      if (a === "seterr") {
        const type = b.dataset.type;
        if (m.errType === type && m.errBy === "user") { delete m.errType; delete m.errBy; delete m.errReason; }
        else { m.errType = type; m.errBy = "user"; if (m.errReason && m.errBy !== "ai") delete m.errReason; }
        await App.db.put("mistakes", m);
        card.outerHTML = cardHtml(m, revealed.has(m.id));
        App.hydrateIcons(view);
        repaintAnalysis();
        return;
      }
      if (a === "delete") {
        if (!(await App.ui.confirm(t("mis.deleteConfirm"), t("delete"), true))) return;
        await App.db.remove("mistakes", m.id); card.remove(); App.ui.toast(t("mis.deleted")); return;
      }
      if (a === "knew") {
        await review(m, true);
        App.ui.toast(m.mastered ? t("mis.toastMastered") : t("mis.toastNext", { n: STEPS[m.reviews] }));
        if (filter === "due") card.remove(); else { card.outerHTML = cardHtml(m, false); App.hydrateIcons(view); }
        return;
      }
      if (a === "again") {
        await review(m, false);
        App.ui.toast(t("mis.toastAgain"));
        if (filter === "due") card.remove(); else { card.outerHTML = cardHtml(m, false); App.hydrateIcons(view); }
        return;
      }
      if (a === "similar") {
        App.similar.open({ q: m.q, options: m.options, answer: m.answer, explain: m.explain, image: m.image, label: m.label, key: m.key });
        return;
      }
      if (a === "ask") {
        const opts = m.options && m.options.length ? "\n\n" + m.options.map((o, i) => LETTERS[i] + ") " + o).join("\n") : "";
        App.modules.assistant.startWith(t("mis.askPrompt") + "\n\n" + (m.q || "") + opts, m.image || null);
      }
    };
    view.addEventListener("click", onClick);
    return () => view.removeEventListener("click", onClick);
  }

  /* Elle soru ekle (fotoğraf + not) */
  function openAdd() {
    let image = null;
    const m = App.ui.modal({
      title: t("mis.addTitle"),
      body:
        '<label class="field"><span class="field__label">' + esc(t("mis.fLabel")) + '</span><input class="input" id="mfLabel" placeholder="' + esc(t("mis.fLabelPh")) + '"></label>' +
        '<label class="field"><span class="field__label">' + esc(t("mis.fQuestion")) + '</span><textarea class="textarea" id="mfQ" rows="4" placeholder="' + esc(t("mis.fQuestionPh")) + '"></textarea></label>' +
        '<div class="field"><span class="field__label">' + esc(t("mis.fPhoto")) + '</span><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' +
          '<label class="btn btn--sm" style="cursor:pointer">' + App.icon("image") + esc(t("ai.attach").split("(")[0].trim()) + '<input type="file" accept="image/*" id="mfImg" hidden></label><img id="mfPrev" class="mis__thumb" hidden alt=""></div></div>' +
        '<label class="field"><span class="field__label">' + esc(t("mis.fExplain")) + '</span><textarea class="textarea" id="mfE" rows="3" placeholder="' + esc(t("mis.fExplainPh")) + '"></textarea></label>',
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(t("cancel")) + '</button><button class="btn btn--primary" type="button" id="mfSave">' + esc(t("save")) + "</button>"
    });
    const q = (s) => m.el.querySelector(s);
    q("#mfImg").addEventListener("change", async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try { image = await App.vision.prepare(f); q("#mfPrev").src = image.dataUrl; q("#mfPrev").hidden = false; }
      catch (err) { App.ui.toast(t("ai.photoError"), "error"); }
    });
    q("#mfSave").addEventListener("click", async () => {
      const text = q("#mfQ").value.trim();
      if (!text && !image) { App.ui.toast(t("mis.needQuestion"), "error"); return; }
      await add({ source: "manual", label: q("#mfLabel").value.trim() || t("mis.src.manual"), q: text, explain: q("#mfE").value.trim(), image: image ? image.dataUrl : null, nextAt: new Date().toISOString() });
      m.close();
      App.ui.toast(t("mis.added"));
      App.router.refresh();
    });
  }

  App.router.register("yanlislar", render);
  App.mistakes = { add, counts, isDue, review, STEPS, errorStats, classifyPending, ERR, ERR_TYPES };
})();
