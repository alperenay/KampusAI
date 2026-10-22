/* =========================================================
   cevre.js — Çevrendeki Fiziği Bul (Modül 2, v1.33)   (#/cevre)

   Öğrenci günlük hayattan bir sahnenin (salıncak, kaydırak, basket atışı, merdivenden düşen top,
   çaydanlık …) fotoğrafını çeker ya da yükler. Yapay zekâ:
     1. sahnedeki nesneleri ve ölçüleri tahmin eder (gerekçesiyle; öğrenci bildiği ölçüyü yazabilir),
     2. MEB müfredatına uygun çoktan seçmeli bir soru, çözüm adımları ve simülasyon değişkenleri
        içeren katı bir JSON üretir (şema: cevre-model.js).
   JSON onarılır ve denetlenir; istenen nicelik formülle hesaplanır, doğru şık tutmuyorsa düzeltilir.
   Sonra aynı değerlerle ilgili deney (labs.js: eğik atış, sarkaç, eğik düzlem, enerji, ısınma)
   açılır: kaydırıcılarla değiştirilebilir, 3B / AR / hologram görünümleri de kullanılabilir.
   Fotoğraf yoksa örnek sahne tarifleriyle de çalışır.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const CF = () => window.CevreFizik;
  const GEN_MS = 120000;
  const md = (s) => App.markdown.render(s || "").replace(/^<p>([\s\S]*)<\/p>$/, "$1");
  const EXAMPLES = [
    ["Salıncak", "Swing", "Parkta zincirleri yaklaşık 2 m olan bir salıncakta sallanan bir çocuk; en yüksek noktada zincir düşeyle yaklaşık 30° açı yapıyor."],
    ["Kaydırak", "Slide", "Okul bahçesinde yaklaşık 2,5 m yüksekliğinde, 35° eğimli, 4 m uzunluğunda metal bir kaydırak; bir çocuk tepeden kayıyor."],
    ["Basket atışı", "Basketball shot", "Bir öğrenci topu yerden 2 m yükseklikten 45° açıyla potaya atıyor; pota 3,05 m yükseklikte ve yaklaşık 5 m uzakta."],
    ["Merdivenden düşen top", "Ball falling down a stairwell", "Apartman merdiven boşluğunda 3. kattan (yaklaşık 8 m) elden kayan bir top aşağı düşüyor."],
    ["Çaydanlık", "Kettle", "Mutfakta 2000 W'lık elektrikli çaydanlıkta 1,5 L oda sıcaklığındaki (20 °C) su kaynatılıyor."]
  ];
  function errText(e) {
    const code = e && e.code;
    if (code === "timeout") return T("Yapay zekâ zamanında cevap vermedi. Tekrar dene.", "The AI did not answer in time. Try again.");
    if (code === "net" || code === "offline") return App.t("ai.err.netTitle") + " " + T("İnternet ya da yapay zekâ bağlantısını kontrol et.", "Check your internet or AI connection.");
    if (code === "quota") return T("Yapay zekâ kotası doldu. Biraz sonra tekrar dene ya da Ayarlar'dan başka bir motor seç.", "The AI quota is used up. Try later or pick another engine.");
    if (code === "busy") return T("Yapay zekâ şu an yoğun. Birkaç saniye sonra tekrar dene.", "The AI is busy. Try again in a few seconds.");
    if (code === "no-key" || code === "auth") return App.t("ai.err.nokeyBody");
    if (e && (e.message === "json" || e instanceof SyntaxError || code === "schema")) return T("Yapay zekânın cevabı beklenen biçimde gelmedi. Tekrar dene; olmazsa başka bir fotoğraf dene.", "The AI's answer was not in the expected format. Try again or use another photo.");
    return T("Soru hazırlanamadı.", "Could not prepare a question.") + (e && e.message && e.message.length < 120 ? " (" + e.message + ")" : "");
  }

  function render(view) {
    App.setTitle(T("Çevrendeki Fizik", "Physics Around You"));
    const S = { image: null, desc: "", ctrl: null, timer: 0, lab: null, res: null, tries: 0 };
    view.innerHTML = '<div class="page cv-page"><div class="page-head"><div><h1>' + esc(T("Çevrendeki Fizik", "Physics Around You")) + "</h1><p>" +
      esc(T("Etrafındaki bir sahnenin fotoğrafını çek: içindeki fiziği bulup müfredata uygun bir soru ve aynı değerlerle bir deney hazırlarım.", "Snap a scene around you: I find the physics in it and prepare a curriculum question and a matching experiment.")) + "</p></div></div>" +
      '<section class="card cv-in">' +
        '<div class="cv-drop" id="cvDrop"><div class="cv-drop__img" id="cvPrev">' + App.icon("camera") + "</div><div>" +
          "<p>" + esc(T("Salıncak, kaydırak, top atan biri, çaydanlık … fotoğrafını buraya bırak ya da", "Swing, slide, someone throwing a ball, a kettle … drop a photo here or")) + "</p>" +
          '<label class="btn btn--primary">' + App.icon("camera") + esc(T("Fotoğraf çek / seç", "Take / choose photo")) + '<input type="file" accept="image/*" capture="environment" id="cvFile" hidden></label></div></div>' +
        '<div class="cv-ex lab-chips"><span class="hint">' + esc(T("Fotoğrafın yok mu? Örnek sahne:", "No photo? Try a sample scene:")) + "</span>" +
          EXAMPLES.map((x, i) => '<button type="button" class="chip" data-ex="' + i + '">' + esc(T(x[0], x[1])) + "</button>").join("") + "</div>" +
        '<label class="field"><span class="field__label">' + esc(T("Bildiğin ölçüler (isteğe bağlı)", "Measurements you know (optional)")) + '</span><input class="input" id="cvKnown" maxlength="200" placeholder="' + esc(T("ör. salıncağın zinciri 2,2 m", "e.g. the swing chain is 2.2 m")) + '"></label>' +
        '<div class="cv-go"><button type="button" class="btn btn--primary" id="cvGo" disabled>' + App.icon("sparkle") + esc(T("Soru hazırla", "Make a question")) + "</button>" +
          '<span class="cv-status" id="cvStatus" aria-live="polite"></span><button type="button" class="btn btn--ghost btn--sm" id="cvStop" hidden>' + esc(T("Vazgeç", "Cancel")) + "</button></div>" +
      "</section>" +
      '<div id="cvOut"></div></div>';
    App.hydrateIcons && App.hydrateIcons(view);
    const $ = (s) => view.querySelector(s), out = $("#cvOut"), go = $("#cvGo"), status = $("#cvStatus"), stop = $("#cvStop");
    const setStatus = (tx, busy) => { status.textContent = tx || ""; status.classList.toggle("is-busy", !!busy); stop.hidden = !busy; go.disabled = !!busy || !(S.image || S.desc); };

    async function pick(file) {
      if (!file) return;
      try {
        S.image = await App.vision.prepare(file); S.desc = ""; S.tries = 0;
        $("#cvPrev").innerHTML = '<img alt="" src="' + S.image.dataUrl + '">';
        view.querySelectorAll("[data-ex]").forEach((b) => b.classList.remove("is-on"));
        setStatus(""); run();
      } catch (e) { setStatus(e && e.message === "not-image" ? T("Bu bir fotoğraf dosyası değil.", "This is not an image file.") : T("Fotoğraf açılamadı.", "Could not open the photo.")); }
    }
    $("#cvFile").addEventListener("change", (e) => { pick(e.target.files && e.target.files[0]); e.target.value = ""; });
    const drop = $("#cvDrop");
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("is-over"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("is-over"));
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("is-over"); pick(e.dataTransfer.files && e.dataTransfer.files[0]); });
    view.querySelector(".cv-ex").addEventListener("click", (e) => {
      const b = e.target.closest("[data-ex]"); if (!b) return;
      const x = EXAMPLES[+b.dataset.ex];
      S.image = null; S.desc = x[2]; S.tries = 0;
      $("#cvPrev").innerHTML = App.icon("image") || App.icon("camera");
      view.querySelectorAll("[data-ex]").forEach((c) => c.classList.toggle("is-on", c === b));
      run();
    });
    go.addEventListener("click", () => run());
    stop.addEventListener("click", () => { abort(); setStatus(T("Vazgeçildi.", "Cancelled.")); });

    function abort() { if (S.ctrl) S.ctrl.abort(); S.ctrl = null; clearTimeout(S.timer); }
    async function ask(signal) {
      const known = $("#cvKnown").value.trim();
      const prompt = (S.desc ? T("Fotoğraf yerine sahne tarifi: ", "Scene description instead of a photo: ") + S.desc : T("Fotoğraftaki sahneyi incele.", "Study the scene in the photo.")) +
        (known ? "\n" + T("Öğrencinin bildiği ölçüler (tahmin yerine bunları kullan): ", "Measurements from the student (use these instead of estimates): ") + known : "") +
        (S.tries ? "\n" + T("Öncekinden farklı bir nicelik sor.", "Ask about a different quantity than before.") : "");
      return App.ai.generate({
        system: CF().prompt(App.i18n.lang), prompt, image: S.image || undefined, temperature: S.tries ? 0.8 : 0.5, signal,
        visionPrompt: T("Bu bir günlük hayat sahnesi. Gördüğün nesneleri, konumlarını, yaklaşık boyutlarını (kapı, insan, basamak gibi bilinen nesnelere oranla), eğimleri ve hareket ipuçlarını ayrıntılı yaz. Yorum yapma.", "This is an everyday scene. Describe objects, positions, approximate sizes (relative to doors, people, steps), slopes and motion cues. No interpretation."),
        onStage: (eng, model, kind) => setStatus(kind === "vision" ? T("Fotoğraf inceleniyor…", "Studying the photo…") : T("Soru hazırlanıyor…", "Preparing the question…"), true)
      });
    }
    async function run() {
      if (!(S.image || S.desc)) return;
      abort();
      const ctrl = new AbortController(); S.ctrl = ctrl; let timedOut = false;
      S.timer = setTimeout(() => { timedOut = true; ctrl.abort(); }, GEN_MS);
      setStatus(S.image ? T("Fotoğraf inceleniyor…", "Studying the photo…") : T("Soru hazırlanıyor…", "Preparing the question…"), true);
      try {
        let v = null;
        for (let i = 0; i < 2 && !(v && v.ok); i++) {                // şemaya uymayan cevapta bir kez daha sor
          const r = await ask(ctrl.signal);
          if (S.ctrl !== ctrl) return;
          v = CF().validate(r.data); v.model = r.model;
          if (!v.ok && v.reason === "none") break;
        }
        if (!v.ok) {
          if (v.reason === "none") { show(null, v); setStatus(""); return; }
          throw Object.assign(new Error("schema"), { code: "schema" });
        }
        v.check = CF().verify(v.data);
        S.tries++; show(v.data, v); setStatus("");
      } catch (e) {
        if (S.ctrl !== ctrl) return;
        if (e && e.name === "AbortError" && !timedOut) { setStatus(T("Vazgeçildi.", "Cancelled.")); return; }
        setStatus(""); showError(timedOut ? { code: "timeout" } : e);
      } finally { if (S.ctrl === ctrl) { clearTimeout(S.timer); S.ctrl = null; setStatus(status.textContent, false); } }
    }
    function destroyLab() { if (S.lab) { try { S.lab.destroy(); } catch (e) { /* yok */ } S.lab = null; } }
    function showError(e) {
      destroyLab();
      out.innerHTML = '<section class="card cv-err" role="alert"><p>' + esc(errText(e)) + '</p><button type="button" class="btn btn--primary btn--sm" data-cv="retry">' + esc(T("Tekrar dene", "Try again")) + "</button></section>";
    }

    /* ---------------- Sonuç ---------------- */
    function show(d, v) {
      destroyLab();
      if (!d) {                                                     // sahnede fizik modeli bulunamadı
        out.innerHTML = '<section class="card cv-err"><h2>' + esc(T("Bu sahnede uygun bir hareket bulamadım", "No suitable motion in this scene")) + "</h2>" +
          (v.scene ? "<p>" + esc(v.scene) + "</p>" : "") + (v.why ? '<p class="hint">' + esc(v.why) + "</p>" : "") +
          "<p>" + esc(T("Şunları dene: salıncak, kaydırak, rampa, atılan ya da düşen bir top, ısıtılan su.", "Try: a swing, a slide, a ramp, a thrown or falling ball, heating water.")) + "</p></section>";
        return;
      }
      const M = CF().MODELS[d.model], name = T(M.name[0], M.name[1]), ck = v.check || { status: "skip" };
      const vtxt = { ok: T("Cevap formülle doğrulandı", "Answer verified by formula"), fixed: T("Doğru şık formülle düzeltildi", "Correct option fixed by formula"), rewritten: T("Doğru şık formülle yeniden hesaplandı", "Correct option recomputed"), skip: T("Cevap formülle denetlenemedi", "Answer could not be checked") }[ck.status];
      const P = CF().preset(d), fieldsNote = (v.clamped || []).map(([f, was, now]) => f + ": " + CF().fmtNum(was) + " → " + CF().fmtNum(now)).join(", ");
      out.innerHTML =
        '<section class="card cv-scene">' + (S.image ? '<img class="cv-scene__img" alt="' + esc(T("Çektiğin fotoğraf", "Your photo")) + '" src="' + S.image.dataUrl + '">' : "") +
          "<div><h2>" + esc(S.image ? T("Fotoğrafta gördüklerim", "What I see in the photo") : T("Sahne", "Scene")) + "</h2>" + (d.sahne ? "<p>" + esc(d.sahne) + "</p>" : "") +
          (d.nesneler.length ? '<ul class="cv-obj">' + d.nesneler.map((n) => "<li><b>" + esc(n.ad) + "</b>" + (n.tahmin ? " · " + esc(n.tahmin) : "") + (n.dayanak ? '<span class="hint"> (' + esc(n.dayanak) + ")</span>" : "") + "</li>").join("") + "</ul>" : "") +
          '<p class="hint">' + esc(T("Ölçüler tahmindir. Bildiğin bir ölçü varsa yukarıya yazıp yeniden hazırlat.", "Sizes are estimates. If you know one, enter it above and regenerate.")) + "</p></div></section>" +
        '<section class="card cv-q"><div class="cv-q__meta lab-chips"><span class="chip is-on">' + esc(d.konu.sinif + T(". sınıf", "th grade")) + "</span>" + (d.konu.unite ? '<span class="chip">' + esc(d.konu.unite) + "</span>" : "") +
          '<span class="chip">' + esc(name) + '</span><span class="cv-verify is-' + ck.status + '">' + esc(vtxt) + "</span></div>" +
          '<div class="cv-q__text">' + md(d.soru) + "</div>" +
          '<div class="cv-opts" role="group" aria-label="' + esc(T("Seçenekler", "Options")) + '">' + d.secenekler.map((o, i) => '<button type="button" class="cv-opt" data-o="' + i + '"><b>' + CF().LET[i] + ")</b> " + md(o) + "</button>").join("") + "</div>" +
          '<p class="cv-fb" aria-live="polite"></p>' +
          '<details class="cv-sol"><summary>' + esc(T("Çözümü göster", "Show solution")) + "</summary>" + (d.cozum.length ? "<ol>" + d.cozum.map((s) => "<li>" + md(s) + "</li>").join("") + "</ol>" : "") +
            '<p class="cv-ans"><b>' + esc(T("Cevap", "Answer")) + ":</b> " + CF().LET[d.dogru] + ") " + md(d.secenekler[d.dogru]) + "</p>" +
            (ck.status === "fixed" || ck.status === "rewritten" ? '<p class="hint">' + esc(T("Yapay zekânın işaretlediği cevap hesapla tutmadı; formülle bulunan değer: ", "The AI's marked answer did not match the formula; computed value: ") + CF().fmtNum(ck.value) + " " + ck.unit) + "</p>" : "") +
            (d.konu.kazanim ? '<p class="hint">' + esc(T("Kazanım: ", "Outcome: ") + d.konu.kazanim) + "</p>" : "") + "</details></section>" +
        '<section class="card cv-sim"><h2>' + esc(T("Deneyde dene", "Try it in the lab")) + '</h2><p class="hint">' + esc(T("Deney sorudaki değerlerle açıldı. Kaydırıcılarla değiştir, oynat; 3B, AR ve hologram da var.", "The lab starts with the question's values. Change them with the sliders and play; 3D, AR and hologram are available too.")) +
          (fieldsNote ? " " + esc(T("Deneyin aralığına sığdırılan değerler: ", "Values fitted to the lab's range: ") + fieldsNote) : "") + '</p><div class="cv-lab"></div></section>' +
        '<div class="cv-acts"><button type="button" class="btn btn--sm" data-cv="again">' + App.icon("refresh") + esc(T("Aynı sahneden yeni soru", "New question, same scene")) + "</button>" +
          '<button type="button" class="btn btn--sm btn--ghost" data-cv="other">' + App.icon("camera") + esc(T("Başka fotoğraf", "Another photo")) + "</button>" +
          '<button type="button" class="btn btn--sm btn--ghost" data-cv="ask">' + App.icon("sparkle") + esc(T("Asistana sor", "Ask the assistant")) + "</button></div>";
      App.hydrateIcons && App.hydrateIcons(out);
      S.res = { d, tries: 0 };
      if (P && App.labs && App.labs.LABS[P.lab]) S.lab = App.labs.mount(out.querySelector(".cv-lab"), P.lab, { preset: P.preset });
      out.querySelector(".cv-q").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    out.addEventListener("click", (e) => {
      const o = e.target.closest("[data-o]");
      if (o && S.res) {
        const d = S.res.d, i = +o.dataset.o, fb = out.querySelector(".cv-fb");
        if (out.querySelector(".cv-opt.is-good")) return;
        S.res.tries++;
        if (i === d.dogru) {
          o.classList.add("is-good"); fb.textContent = T("Doğru! Şimdi deneyde değerleri değiştirip sonucun nasıl değiştiğine bak.", "Correct! Now change the values in the lab and see how the result changes.");
          out.querySelector(".cv-sol").open = true;
        } else {
          o.classList.add("is-bad"); o.disabled = true;
          if (S.res.tries >= 2) { out.querySelector('[data-o="' + d.dogru + '"]').classList.add("is-good"); out.querySelector(".cv-sol").open = true; fb.textContent = T("Olmadı. Doğru cevap ve çözüm aşağıda.", "Not quite. The answer and solution are below."); }
          else fb.textContent = T("Olmadı. İpucu: önce hangi niceliğin korunduğunu ya da sabit kaldığını düşün, bir kez daha dene.", "Not quite. Hint: think about what is conserved or constant, then try again.");
        }
        return;
      }
      const b = e.target.closest("[data-cv]"); if (!b) return;
      if (b.dataset.cv === "again" || b.dataset.cv === "retry") run();
      else if (b.dataset.cv === "other") { $("#cvFile").click(); }
      else if (b.dataset.cv === "ask" && S.res) {
        const d = S.res.d, url = S.image && S.image.dataUrl;
        location.hash = "#/";
        setTimeout(() => App.modules.assistant.startWith(T("Bu soruyu adım adım anlatır mısın?", "Can you explain this question step by step?") + "\n" + d.soru + "\n" + d.secenekler.map((x, k) => CF().LET[k] + ") " + x).join("\n"), url), 60);
      }
    });
    return () => { abort(); destroyLab(); };
  }

  App.router.register("cevre", render);
})();
