/* =========================================================
   classroom.js — Öğretmen / sınıf görünümü   (#/sinif)

   Sunucu yoktur; veriler öğrencinin cihazından öğretmene QR kod ya da
   kopyalanan bir kod ile gider:
     Öğrenci: Haftalık rapor → "Öğretmenime gönder" → isteğe bağlı takma ad →
              anonim özet (zayıf ve unutulan kazanımlar, ders bazında durum,
              haftalık çalışma günü ve odak süresi) QR + kod olarak gösterilir.
     Öğretmen: #/sinif → QR okut ya da kodu yapıştır → sınıfın hangi
              kazanımlarda zorlandığı tek ekranda: en çok zorlanılan konular,
              ders bazında dağılım, öğrenci listesi.
   Kod yalnızca sayılar ve kazanım kimliklerini içerir; isim, deneme, sohbet,
   fotoğraf gibi kişisel kayıtlar gönderilmez. Sınıf verisi öğretmenin
   cihazında (meta: "classroom") saklanır.
   ========================================================= */
(function () {
  const { esc, uid } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const L = App.L;
  const PREFIX = "KAI1;";
  const META = "classroom";

  /* ---------- Kodlama ---------- */
  const b64 = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const unb64 = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));
  function encode(obj) { return PREFIX + b64(JSON.stringify(obj)); }
  function decode(text) {
    text = String(text || "").trim();
    const i = text.indexOf(PREFIX);
    if (i < 0) return null;
    try {
      const o = JSON.parse(unb64(text.slice(i + PREFIX.length).split(/\s/)[0]));
      return o && o.v === 1 && Array.isArray(o.w) ? o : null;
    } catch (e) { return null; }
  }

  /** Öğrencinin anonim özeti */
  async function summary(alias) {
    const M = await App.roots.mastery();
    const weak = [], fading = [], subj = {};
    const all = App.learnmap.allOutcomes();
    const byKey = new Map(all.map((x) => [x.key, x]));
    M.forEach((m, key) => {
      const it = byKey.get(key);
      if (!it) return;
      const sid = it.subject.id;
      const c = subj[sid] = subj[sid] || [0, 0, 0];
      if (m.status === "strong") c[0]++; else if (m.status === "mid") c[1]++; else if (m.status === "weak") c[2]++;
      if (m.status === "weak") weak.push([key, m.score || 0]);
      if (m.parts && m.parts.fading) fading.push(key);
    });
    weak.sort((a, b) => a[1] - b[1]);
    const end = new Date(); end.setHours(24, 0, 0, 0);
    const w = App.report ? App.report.weekStats(await (async () => {
      const get = (s) => App.db.getAll(s).catch(() => []);
      const [quizzes, exams, sessions, mistakes, explains] = await Promise.all(["quizzes", "exams", "sessions", "mistakes", "explains"].map(get));
      return { quizzes, exams, sessions, mistakes, explains, days: App.badges ? await App.badges.activeDays() : new Set() };
    })(), end.getTime() - 7 * 86400000, end.getTime()) : {};
    const assessed = (await App.db.getAll("quizzes")).filter((q) => q.metacognition).sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 10);
    const total = assessed.reduce((n, q) => n + q.total, 0);
    const independent = total ? Math.round(100 * assessed.reduce((n, q) => n + q.metacognition.independentAccuracy * q.total, 0) / total) : null;
    return { p: { n: total, i: independent }, v: 1, a: String(alias || "").slice(0, 24), t: new Date().toISOString().slice(0, 10),
      w: weak.slice(0, 25).map((x) => x[0]), f: fading.slice(0, 15), s: subj,
      d: w.studyDays || 0, m: Math.round(w.focus || 0), q: w.quizzes || 0 };
  }

  /* ---------- Öğrenci: gönder ---------- */
  async function sendToTeacher() {
    const m = App.ui.modal({
      title: T("Öğretmenime gönder", "Send to my teacher"),
      body:
        '<p class="hint">' + esc(T("Öğretmenin, sınıfın hangi konularda zorlandığını görebilsin diye anonim bir özet hazırlanır: zayıf ve unutulmaya başlayan konular, derslere göre durum ve bu haftaki çalışma süren. Adın, denemelerin, sohbetlerin ve fotoğrafların gönderilmez.",
          "An anonymous summary is prepared so your teacher can see which topics the class struggles with. Your name, exams, chats and photos are not included.")) + "</p>" +
        '<label class="field"><span class="field__label">' + esc(T("Takma ad (isteğe bağlı, ör. numaran)", "Nickname (optional)")) + '</span><input class="input" id="clsAlias" maxlength="24" value="' + esc(App.prefs.get("clsAlias", "")) + '"></label>' +
        '<button class="btn btn--primary" type="button" id="clsMake">' + App.icon("grad") + esc(T("Kodu oluştur", "Create code")) + "</button>" +
        '<div id="clsOut" hidden><div class="cls-qr" id="clsQr"></div>' +
          '<p class="hint">' + esc(T("Öğretmenin KampüsAI'da \"Sınıf (Öğretmen)\" sayfasından bu QR'ı okutsun ya da aşağıdaki kodu ona gönder.", "Your teacher scans this QR on the Class page, or send them the code below.")) + "</p>" +
          '<textarea class="input cls-code" id="clsCode" rows="3" readonly></textarea>' +
          '<button class="btn btn--sm" type="button" id="clsCopy">' + App.icon("copy") + esc(T("Kodu kopyala", "Copy code")) + "</button></div>",
      actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(T("Kapat", "Close")) + "</button>"
    });
    const el = m.el;
    App.hydrateIcons(el);
    el.querySelector("#clsMake").addEventListener("click", async () => {
      const alias = el.querySelector("#clsAlias").value.trim();
      App.prefs.set("clsAlias", alias);
      const code = encode(await summary(alias));
      el.querySelector("#clsOut").hidden = false;
      el.querySelector("#clsCode").value = code;
      try { await App.pairing.renderQR(el.querySelector("#clsQr"), code); } catch (e) { el.querySelector("#clsQr").textContent = ""; }
    });
    el.querySelector("#clsCopy").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(el.querySelector("#clsCode").value); App.ui.toast(T("Kod kopyalandı.", "Code copied.")); }
      catch (e) { el.querySelector("#clsCode").select(); }
    });
  }

  /* ---------- Öğretmen: sınıf ---------- */
  async function load() { return (await App.db.get("meta", META).catch(() => null)) || { id: META, students: [] }; }
  async function save(c) { c.updatedAt = new Date().toISOString(); await App.db.put("meta", c); }

  async function addCode(text) {
    const o = decode(text);
    if (!o) { App.ui.toast(T("Bu bir KampüsAI öğrenci kodu değil.", "Not a KampüsAI student code."), "error"); return false; }
    const c = await load();
    // Aynı takma adla gelen yeni kod eskisinin yerine geçer
    const i = o.a ? c.students.findIndex((s) => s.data.a === o.a) : -1;
    const row = { id: i >= 0 ? c.students[i].id : uid("stu"), at: new Date().toISOString(), data: o };
    if (i >= 0) c.students[i] = row; else c.students.push(row);
    await save(c);
    App.ui.toast(T("Öğrenci eklendi: ", "Student added: ") + (o.a || T("isimsiz", "anonymous")));
    return true;
  }

  async function render(view) {
    App.setTitle(T("Sınıf (Öğretmen)", "Class (Teacher)"));
    const c = await load();
    const S = c.students;
    const all = App.learnmap.allOutcomes();
    const byKey = new Map(all.map((x) => [x.key, x]));
    const weakCount = new Map(), fadeCount = new Map(), subj = {};
    S.forEach((s) => {
      (s.data.w || []).forEach((k) => weakCount.set(k, (weakCount.get(k) || 0) + 1));
      (s.data.f || []).forEach((k) => fadeCount.set(k, (fadeCount.get(k) || 0) + 1));
      Object.entries(s.data.s || {}).forEach(([sid, arr]) => { const x = subj[sid] = subj[sid] || [0, 0, 0]; arr.forEach((n, i) => { x[i] += n || 0; }); });
    });
    const top = Array.from(weakCount.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
    const topFade = Array.from(fadeCount.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const subjName = (sid) => { const it = all.find((x) => x.subject.id === sid); return it ? L(it.subject.name) : sid; };
    const label = (k) => { const it = byKey.get(k); return it ? L(it.outcome.title) : k; };
    const sub = (k) => { const it = byKey.get(k); return it ? App.data.curriculum.gradeName(it.grade) + " · " + L(it.subject.name) : ""; };
    const avgDays = S.length ? S.reduce((a, s) => a + (s.data.d || 0), 0) / S.length : 0;
    const avgMin = S.length ? S.reduce((a, s) => a + (s.data.m || 0), 0) / S.length : 0;

    const bar = (k, n) => '<li class="cls-row"><a href="#/konular/' + esc(k) + '">' + esc(label(k)) + "</a><small>" + esc(sub(k)) + "</small>" +
      '<span class="cls-bar"><i style="width:' + Math.round((n / Math.max(1, S.length)) * 100) + '%"></i></span><b>' + n + "/" + S.length + "</b></li>";

    view.innerHTML =
      '<div class="page">' +
        '<div class="page-head"><div><h1>' + esc(T("Sınıf (Öğretmen)", "Class (Teacher)")) + "</h1><p>" +
          esc(T("Öğrencilerin Haftalık Rapor → \"Öğretmenime gönder\" ile oluşturduğu anonim kodları ekle; sınıfın en çok zorlandığı konuları gör. Veriler yalnızca bu cihazda saklanır.",
            "Add the anonymous codes students create from Weekly Report → \"Send to my teacher\" and see where the class struggles. Data stays on this device.")) + "</p></div>" +
          '<div class="page-head__actions"><a class="btn" href="#/arastirma">' + esc(App.t("research.title")) + '</a>' +
            (App.pairing.hasCamera() || App.platform.native ? '<button class="btn btn--primary" type="button" id="clsScan">' + App.icon("scan") + esc(T("QR okut", "Scan QR")) + "</button>" : "") +
            '<button class="btn" type="button" id="clsPaste">' + App.icon("plus") + esc(T("Kod yapıştır", "Paste code")) + "</button>" +
            (S.length ? '<button class="btn btn--ghost" type="button" id="clsClear">' + App.icon("trash") + esc(T("Sınıfı temizle", "Clear class")) + "</button>" : "") +
          "</div></div>" +
        (!S.length ? '<section class="card"><p class="hint">' + esc(T("Henüz öğrenci eklenmedi. Öğrenciler kendi uygulamalarında Haftalık Rapor sayfasından kod oluşturur.", "No students yet.")) + "</p></section>" :
        '<div class="rep-tiles">' +
          '<div class="rep-tile">' + App.icon("grad") + "<b>" + S.length + "</b><span>" + esc(T("öğrenci", "students")) + "</span></div>" +
          '<div class="rep-tile">' + App.icon("calendar") + "<b>" + avgDays.toFixed(1) + "/7</b><span>" + esc(T("ort. çalışılan gün (hafta)", "avg study days")) + "</span></div>" +
          '<div class="rep-tile">' + App.icon("timer") + "<b>" + Math.round(avgMin) + T(" dk", " min") + "</b><span>" + esc(T("ort. odak süresi (hafta)", "avg focus time")) + "</span></div>" +
          '<div class="rep-tile">' + App.icon("target") + "<b>" + weakCount.size + "</b><span>" + esc(T("zayıf kazanım (farklı)", "distinct weak outcomes")) + "</span></div>" +
        "</div>" +
        '<section class="card"><div class="card__title">' + App.icon("target") + esc(T("Sınıfın en çok zorlandığı konular", "Topics the class struggles with most")) + "</div>" +
          (top.length ? '<ol class="cls-list">' + top.map(([k, n]) => bar(k, n)).join("") + "</ol>" : '<p class="hint">' + esc(T("Zayıf konu bildirilmedi.", "No weak topics reported.")) + "</p>") + "</section>" +
        (topFade.length ? '<section class="card"><div class="card__title">' + App.icon("refresh") + esc(T("Unutulmaya başlayan konular", "Fading topics")) + "</div>" +
          '<ol class="cls-list">' + topFade.map(([k, n]) => bar(k, n)).join("") + "</ol></section>" : "") +
        '<section class="card"><div class="card__title">' + App.icon("chart") + esc(T("Derslere göre durum (tüm sınıf)", "By subject (whole class)")) + "</div>" +
          '<div class="cls-subj">' + Object.entries(subj).map(([sid, [g, o, z]]) => {
            const tot = g + o + z || 1;
            return '<div class="cls-subj__row"><span>' + esc(subjName(sid)) + '</span><span class="map-bar"><i class="st-strong" style="flex:' + g + '"></i><i class="st-mid" style="flex:' + o + '"></i><i class="st-weak" style="flex:' + z + '"></i></span><small>%' + Math.round((z / tot) * 100) + T(" zayıf", " weak") + "</small></div>";
          }).join("") + "</div></section>" +
        '<section class="card"><div class="card__title">' + App.icon("list") + esc(T("Öğrenciler", "Students")) + "</div>" +
          '<ul class="cls-students">' + S.map((s) => "<li><b>" + esc(s.data.a || T("İsimsiz", "Anonymous")) + "</b><small>" +
            esc((s.data.p && Number.isFinite(s.data.p.n) && Number.isFinite(s.data.p.i) ? App.t("meta.classSummary", { n: s.data.p.n, pct: Math.max(0, Math.min(100, s.data.p.i)) }) + " · " : "") + T("Gönderim: ", "Sent: ") + s.data.t + " · " + (s.data.d || 0) + T("/7 gün · ", "/7 days · ") + (s.data.m || 0) + T(" dk odak · ", " min focus · ") + (s.data.w || []).length + T(" zayıf konu", " weak")) + "</small>" +
            '<button class="icon-btn icon-btn--sm" type="button" data-del="' + esc(s.id) + '" title="' + esc(T("Çıkar", "Remove")) + '">' + App.icon("close") + "</button></li>").join("") + "</ul></section>") +
      "</div>";
    App.hydrateIcons(view);

    const root = view.firstElementChild;
    const rerender = () => render(view);
    const scan = root.querySelector("#clsScan");
    if (scan) scan.addEventListener("click", async () => {
      const o = await App.pairing.scan((txt) => (decode(txt) ? txt : null), { title: T("Öğrenci kodunu okut", "Scan student code"), hint: T("Öğrencinin ekranındaki QR kodu çerçeveye getir.", "Point at the student's QR code.") });
      if (o && await addCode(o)) rerender();
    });
    root.querySelector("#clsPaste").addEventListener("click", () => {
      const m = App.ui.modal({
        title: T("Öğrenci kodu ekle", "Add student code"),
        body: '<p class="hint">' + esc(T("Bir ya da birden fazla kodu yapıştır (her biri KAI1; ile başlar).", "Paste one or more codes (each starts with KAI1;).")) + '</p><textarea class="input" id="clsIn" rows="5"></textarea>',
        actions: '<button class="btn btn--ghost" type="button" data-close>' + esc(T("Vazgeç", "Cancel")) + '</button><button class="btn btn--primary" type="button" id="clsAdd">' + esc(T("Ekle", "Add")) + "</button>"
      });
      m.el.querySelector("#clsAdd").addEventListener("click", async () => {
        const parts = m.el.querySelector("#clsIn").value.split(/(?=KAI1;)/).map((x) => x.trim()).filter(Boolean);
        let ok = 0;
        for (const p of parts) if (await addCode(p)) ok++;
        if (ok) { m.close(); rerender(); }
      });
    });
    const clr = root.querySelector("#clsClear");
    if (clr) clr.addEventListener("click", async () => {
      if (!(await App.ui.confirm(T("Sınıftaki bütün öğrenci kodları silinsin mi?", "Remove all student codes?"), T("Sil", "Remove"), true))) return;
      await save({ id: META, students: [] }); rerender();
    });
    root.addEventListener("click", async (e) => {
      const d = e.target.closest("[data-del]");
      if (!d) return;
      const cc = await load(); cc.students = cc.students.filter((s) => s.id !== d.dataset.del); await save(cc); rerender();
    });
  }

  App.router.register("sinif", render);
  App.classroom = { sendToTeacher, encode, decode, summary, addCode };
})();
