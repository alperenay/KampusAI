/* =========================================================
   feedback.js — Yapay zekâ cevaplarına geri bildirim (v1.32)   #/geribildirim
   Sohbet cevaplarının altında 👍 / 👎, konu sonu testlerinde "Soru hatalı" düğmesi.
   👎 ya da "hatalı" seçilince kısa bir form: hata türü + (isteğe bağlı) doğrusu ne olmalı.
   Kayıtlar yalnızca cihazda tutulur (meta deposu, kind: "ai-fb"); kişisel bilgi içermez.
   #/geribildirim sayfasından görülür, silinir ve eğitim kitine (egitim/) uygun JSONL olarak
   dışa aktarılır: kullanıcı → hata verisi → model testi / ince ayar → daha iyi model.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const REASONS_CHAT = [
    ["bilgi", ["Yanlış bilgi ya da çözüm", "Wrong fact or solution"]],
    ["hesap", ["Hesap hatası", "Calculation error"]],
    ["anlamadi", ["Soruyu yanlış anladı", "Misunderstood the question"]],
    ["eksik", ["Eksik ya da yetersiz", "Incomplete"]],
    ["mufredat", ["Müfredata uygun değil", "Off-curriculum"]],
    ["diger", ["Diğer", "Other"]],
  ];
  const REASONS_Q = [
    ["cevap", ["Doğru cevap yanlış işaretlenmiş", "Answer key is wrong"]],
    ["iki-dogru", ["Birden fazla doğru şık var", "More than one correct option"]],
    ["dogru-yok", ["Doğru şık yok", "No correct option"]],
    ["anlasilmiyor", ["Soru eksik ya da anlaşılmıyor", "Question is unclear"]],
    ["konu-disi", ["Konu dışı", "Off-topic"]],
    ["diger", ["Diğer", "Other"]],
  ];
  const strip = (s) => (App.cite ? App.cite.strip(String(s || "")) : String(s || ""));

  async function all() {
    try { return (await App.db.getAll("meta")).filter((r) => r.kind === "ai-fb").sort((a, b) => String(b.at).localeCompare(String(a.at))); }
    catch (e) { return []; }
  }
  async function save(rec) {
    const r = Object.assign({ kind: "ai-fb", at: new Date().toISOString(), app: App.version || "" }, rec);
    r.id = "ai-fb:" + r.ref;
    await App.db.put("meta", r);
    window.dispatchEvent(new CustomEvent("da:ai-fb", { detail: r }));
    return r;
  }
  async function remove(ref) { try { await App.db.remove("meta", "ai-fb:" + ref); } catch (e) {} }

  /** Hata türü + doğrusu formu. Gönderilirse {reason, fix} döner, kapatılırsa null. */
  function ask(kind) {
    const reasons = kind === "question" ? REASONS_Q : REASONS_CHAT;
    return new Promise((resolve) => {
      let done = false;
      App.ui.modal({
        title: kind === "question" ? T("Bu soruda ne yanlış?", "What is wrong with this question?") : T("Bu cevapta ne yanlış?", "What is wrong with this answer?"),
        body: '<form class="fb-form" id="fbForm"><div class="fb-reasons" role="radiogroup">' +
          reasons.map(([k, n], i) => '<label class="fb-reason"><input type="radio" name="fbr" value="' + k + '"' + (i === 0 ? " checked" : "") + "> " + esc(T(n[0], n[1])) + "</label>").join("") +
          '</div><label class="fb-fix"><span>' + esc(T("Doğrusu ne olmalı? (isteğe bağlı)", "What should it be? (optional)")) + '</span><textarea class="textarea" id="fbFix" rows="3" maxlength="1500" placeholder="' +
          esc(T("Örn. Doğru cevap C, çünkü…", "e.g. The right answer is C because…")) + '"></textarea></label>' +
          '<p class="hint">' + App.icon("lock") + esc(T("Yalnızca bu cihazda saklanır. Soru ve cevap metni dışında bir bilgi kaydedilmez.", "Stored only on this device. Nothing but the question and answer text is saved.")) + "</p></form>",
        actions: '<button class="btn" type="button" data-close>' + esc(T("Vazgeç", "Cancel")) + '</button><button class="btn btn--primary" type="submit" form="fbForm">' + esc(T("Gönder", "Send")) + "</button>",
        onMount: (api) => {
          api.el.querySelector("#fbForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const reason = (api.el.querySelector('input[name="fbr"]:checked') || {}).value || "diger";
            const fix = api.el.querySelector("#fbFix").value.trim().slice(0, 1500);
            done = true; api.close(); resolve({ reason, fix });
          });
        },
        onClose: () => { if (!done) resolve(null); },
      });
    });
  }

  /* ---------- sohbet cevabı ---------- */
  function chatButtonsHtml(msg) {
    const v = msg.feedback || "";
    return '<span class="fb-btns" role="group" aria-label="' + esc(T("Cevabı değerlendir", "Rate this answer")) + '">' +
      '<button class="icon-btn icon-btn--sm fb-up' + (v === "up" ? " is-on" : "") + '" type="button" data-act="fb-up" data-mid="' + esc(msg.id) + '" aria-pressed="' + (v === "up") + '" title="' + esc(T("İyi cevap", "Good answer")) + '">' + App.icon("thumbUp") + "</button>" +
      '<button class="icon-btn icon-btn--sm fb-down' + (v === "down" ? " is-on" : "") + '" type="button" data-act="fb-down" data-mid="' + esc(msg.id) + '" aria-pressed="' + (v === "down") + '" title="' + esc(T("Hatalı / kötü cevap", "Wrong or poor answer")) + '">' + App.icon("thumbDown") + "</button></span>";
  }
  /** Sohbetteki 👍/👎 tıklaması. chat: sohbet kaydı, msg: asistan mesajı. Mesajdaki durum değişirse true. */
  async function onChat(act, chat, msg) {
    const idx = chat.messages.indexOf(msg);
    const u = chat.messages.slice(0, idx).reverse().find((m) => m.role === "user");
    const ref = "chat:" + chat.id + ":" + msg.id;
    const want = act === "fb-up" ? "up" : "down";
    if (msg.feedback === want) {                         // aynı düğmeye ikinci kez: geri al
      msg.feedback = null; await remove(ref); return true;
    }
    let extra = {};
    if (want === "down") { const r = await ask("chat"); if (!r) return false; extra = r; }
    msg.feedback = want;
    await save(Object.assign({
      ref, source: "chat", rating: want,
      q: [u && u.text, u && u.transcription].filter(Boolean).join("\n\n").slice(0, 4000), hasImage: !!(u && u.image),
      a: strip(msg.text).slice(0, 8000), model: (msg.models || []).map((m) => m.model).filter(Boolean).pop() || msg.model || "", engine: msg.engine || "",
      socratic: !!msg.socratic,
    }, extra));
    App.ui.toast(want === "up" ? T("Teşekkürler!", "Thanks!") : T("Kaydedildi. Bu örnek modelin test verisine eklenebilir.", "Saved. It can be added to the model's test data."));
    return true;
  }

  /* ---------- konu sonu testi sorusu ---------- */
  function questionButtonHtml(i) {
    return '<button class="btn btn--sm btn--ghost fb-q" type="button" data-fb-q="' + i + '">' + App.icon("flag") + esc(T("Soru hatalı", "Report question")) + "</button>";
  }
  async function onQuestion(btn, q, ctx) {
    const r = await ask("question"); if (!r) return;
    const ref = "quiz:" + (ctx.key || "") + ":" + String(q.q || "").slice(0, 80).replace(/\s+/g, " ");
    await save(Object.assign({ ref, source: "quiz", rating: "wrong", key: ctx.key || "", label: ctx.label || "", model: ctx.model || "",
      q: String(q.q || ""), options: q.options || [], answer: q.answer, chosen: ctx.chosen, explain: String(q.explain || "") }, r));
    btn.disabled = true; btn.classList.add("is-on");
    btn.innerHTML = App.icon("check") + esc(T("Bildirildi", "Reported"));
    App.ui.toast(T("Teşekkürler, soru hatalı olarak işaretlendi.", "Thanks, the question was reported."));
  }

  /* ---------- dışa aktarma: eğitim kitine uygun JSONL ---------- */
  function toJsonl(list) {
    return list.map((r) => JSON.stringify({
      kaynak: "kampusai-uygulama", tur: r.source, tarih: r.at, surum: r.app, puan: r.rating, hata: r.reason || null, dogrusu: r.fix || null,
      soru: r.q, secenekler: r.options && r.options.length ? r.options : undefined, cevap_anahtari: r.answer, ogrenci_secimi: r.chosen,
      model_cevabi: r.a || r.explain || null, model: r.model || null, kazanim: r.key || null, fotografli: r.hasImage || undefined,
    })).join("\n") + "\n";
  }

  /* ---------- #/geribildirim ---------- */
  async function page(view) {
    App.setTitle(T("Yapay Zekâ Geri Bildirimlerim", "My AI Feedback"));
    const list = await all();
    const n = (f) => list.filter(f).length;
    const reasonName = (r) => { const x = REASONS_CHAT.concat(REASONS_Q).find((y) => y[0] === r.reason); return x ? T(x[1][0], x[1][1]) : ""; };
    view.innerHTML = '<div class="page page--narrow fbp"><div class="page-head"><div><h1>' + esc(T("Yapay Zekâ Geri Bildirimlerim", "My AI Feedback")) + '</h1><p class="hint">' +
      esc(T("Asistanın cevaplarına ve testlerdeki sorulara verdiğin 👍 / 👎 ve hata bildirimleri. Yalnızca bu cihazda durur; dışa aktarıp modeli test etmek ya da geliştirmek için kullanabilirsin.", "Your ratings and error reports. They stay on this device; export them to test or improve the model.")) + "</p></div></div>" +
      '<div class="fbp-stats">' +
        '<div class="card fbp-stat"><b>' + n((r) => r.rating === "up") + "</b><span>" + App.icon("thumbUp") + esc(T("İyi cevap", "Good")) + "</span></div>" +
        '<div class="card fbp-stat"><b>' + n((r) => r.rating === "down") + "</b><span>" + App.icon("thumbDown") + esc(T("Hatalı cevap", "Wrong answer")) + "</span></div>" +
        '<div class="card fbp-stat"><b>' + n((r) => r.source === "quiz") + "</b><span>" + App.icon("flag") + esc(T("Hatalı soru", "Wrong question")) + "</span></div>" +
      "</div>" +
      '<div class="fbp-acts"><button class="btn btn--primary" type="button" id="fbExport"' + (list.length ? "" : " disabled") + ">" + App.icon("download") + esc(T("Dışa aktar (JSONL)", "Export (JSONL)")) + "</button>" +
        '<button class="btn btn--ghost" type="button" id="fbClear"' + (list.length ? "" : " disabled") + ">" + App.icon("trash") + esc(T("Tümünü sil", "Delete all")) + "</button></div>" +
      '<p class="hint">' + esc(T("Dışa aktarılan dosya, eğitim kitindeki geri_bildirim.py ile modelin test setine eklenir: hatalı bulunan cevaplar bir sonraki model karşılaştırmasında yeniden sorulur.", "The exported file can be added to the model test set with geri_bildirim.py in the training kit.")) + "</p>" +
      (list.length ? '<div class="fbp-list">' + list.slice(0, 200).map((r) =>
        '<article class="card fbp-item"><div class="fbp-item__head">' + App.icon(r.rating === "up" ? "thumbUp" : r.source === "quiz" ? "flag" : "thumbDown") +
          "<b>" + esc(r.source === "quiz" ? T("Test sorusu", "Quiz question") : T("Sohbet", "Chat")) + "</b>" + (reasonName(r) ? '<span class="chip">' + esc(reasonName(r)) + "</span>" : "") +
          '<span class="fbp-item__date">' + esc(App.utils.fmtDateTime ? App.utils.fmtDateTime(r.at) : r.at) + '</span><button class="icon-btn icon-btn--sm" type="button" data-del="' + esc(r.ref) + '" title="' + esc(T("Sil", "Delete")) + '">' + App.icon("trash") + "</button></div>" +
          '<p class="fbp-item__q">' + esc(String(r.q || "").slice(0, 220)) + (String(r.q || "").length > 220 ? "…" : "") + "</p>" +
          (r.fix ? '<p class="fbp-item__fix"><b>' + esc(T("Doğrusu: ", "Should be: ")) + "</b>" + esc(r.fix) + "</p>" : "") +
        "</article>").join("") + "</div>"
        : App.ui.empty("thumbUp", T("Henüz geri bildirim yok", "No feedback yet"), T("Asistanın cevaplarının altındaki 👍 / 👎 düğmeleriyle başlayabilirsin.", "Use the 👍 / 👎 buttons under the assistant's answers."))) +
      "</div>";
    App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s);
    const ex = $("#fbExport");
    if (ex) ex.addEventListener("click", () => App.utils.downloadText("kampusai-geri-bildirim-" + new Date().toISOString().slice(0, 10) + ".jsonl", toJsonl(list), "application/x-ndjson"));
    const cl = $("#fbClear");
    if (cl) cl.addEventListener("click", async () => {
      if (!(await App.ui.confirm(T("Tüm geri bildirimler silinsin mi?", "Delete all feedback?"), T("Sil", "Delete")))) return;
      for (const r of list) await remove(r.ref);
      App.router.refresh();
    });
    view.addEventListener("click", async (e) => {
      const d = e.target.closest("[data-del]"); if (!d) return;
      await remove(d.dataset.del); App.router.refresh();
    });
  }

  App.feedback = { all, save, remove, ask, chatButtonsHtml, onChat, questionButtonHtml, onQuestion, toJsonl };
  App.router.register("geribildirim", page);
})();
