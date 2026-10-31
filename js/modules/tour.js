/* =========================================================
   tour.js — bölümlere ayrılmış canlı ilk kullanım rehberi

   Uygulamayı ilk kez açan kişiye gerçek sayfalar üzerinde gezinerek her
   özelliği gösterir: ilgili sayfaya geçer, öğeyi ışıkla vurgular, yanında
   kısa bir açıklama kartı çıkar. İleri/Geri/Geç, klavyede ← → ve Esc.

   Yalnızca ilk kurulumda kendiliğinden açılır (App.firstRun: daha önce hiç
   ayar yazılmamış ve veritabanı boş). Güncelleme yapan eski kullanıcılara
   gösterilmez. Ayarlar'dan istenirse yeniden izlenebilir.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const C = () => App.data.curriculum;
  const DATA_STORES = ["exams", "chats", "schedules", "notes", "progress", "mistakes", "quizzes", "sessions", "explains"];

  /** Konu anlatımı içeriği olan ilk kazanım (9. sınıf matematik) */
  function sampleOutcome() {
    for (const g of C().grades) for (const s of g.subjects) for (const u of s.units || []) for (const k of u.outcomes || []) {
      if ((k.content && k.content.anlatim) || k.curatedContent) return C().key(g.id, s.id, u.id, k.id);
    }
    const g = C().grades[0], s = g.subjects[0], u = s.units[0], k = u.outcomes[0];
    return C().key(g.id, s.id, u.id, k.id);
  }

  function closeModals() {
    document.querySelectorAll(".modal-backdrop [data-close]").forEach((b) => { if (!b.closest(".tour")) b.click(); });
    document.querySelectorAll(".modal-backdrop").forEach((m) => m.remove());
  }

  /* ---------------- Adımlar ---------------- */
  const STEPS = [
    { id: "welcome", center: true, route: "#/", name: true },
    { id: "assistant", route: "#/", target: "#composer" },
    { id: "photo", route: "#/", target: '#composer [data-act="attach"]' },
    { id: "data", route: "#/", target: '#composer [data-act="data"]' },
    { id: "socratic", route: "#/", target: '#composer [data-act="socratic"]' },
    { id: "stableAI", route: "#/", target: "#composer", title: ["Aynı modelle kesintisiz sor", "Keep asking on the same model"], text: ["Çalışan AI modeli sonraki soruda korunur; her mesajda yeniden seçmen gerekmez. Ayarlar'dan sağlayıcı veya modeli değiştirebilirsin. Yanıt akarken durdurabilir, kaynakları kontrol edebilirsin; hız ve doğruluk garanti edilmez.", "The working AI model stays selected for the next question. Change provider or model in Settings, stop a streaming reply and check its sources. Speed and accuracy are not guaranteed."] },
    { id: "today", route: "#/bugun", target: ".tday-now" },
    { id: "recommend", route: "#/bugun", target: ".study-card, .page", title: ["Bugün ne çalışmalıyım?", "What should I study today?"], text: ["Önerilen görevi açarak başla. Öneriler geçmiş çalışmana dayanır; programını kendi zamanına göre değiştirebilirsin.", "Start with the recommended task. Suggestions use your history; adjust the plan to your time."] },
    { id: "aiPlan", route: "#/program/benim", target: "#aiPlan" },
    { id: "roots", route: "#/kok", target: ".root-how, .root-map" },
    { id: "remind", route: "#/program/benim", target: "#remindBtn", action: "remind" },
    { id: "topics", route: "#/konular", target: ".subj-grid" },
    { id: "lesson", route: () => "#/konular/" + sampleOutcome(), target: ".lesson .lesson__section" },
    { id: "quiz", route: () => "#/konular/" + sampleOutcome(), target: ".quiz-card:not(.fey-card):not(.chk-card)" },
    { id: "feynman", route: () => "#/konular/" + sampleOutcome(), target: ".fey-card" },
    { id: "transfer", route: "#/aktarim", target: ".pr-intro", title: ["Bilgiyi başka yerde kullan", "Apply it elsewhere"], text: ["Altı kavramdan birini seç. Aynı bilgiyi denklem, grafik/tablo ve günlük yaşam problemiyle kullan. Üç görevdeki ilk yanıtlarını bağlama göre gör.", "Choose one of six concepts. Apply it to an equation, visual data and an everyday problem. Review first responses by context."] },
    { id: "errorHunt", route: "#/hata-avcisi", target: ".pr-intro", title: ["Çözümdeki hatayı bul", "Find the solution error"], text: ["Kasıtlı hata içeren örnekte ilk yanlış adımı ve nedenini seç. Açıklama, doğru çözümü ve sonraki adımların neden etkilendiğini gösterir.", "Select the first wrong step and its reason in an intentionally flawed example. The explanation shows the correction."] },
    { id: "cards", route: "#/kartlar", target: ".cards-start, .page", title: ["Hap kartlarla düzenli tekrar", "Review with flashcards"], text: ["Deste boşsa bir konudan kart ekle. Çalışmaya başla ile hatırla, kartı çevir ve kendini değerlendir. Zamanı gelen kartlar yeniden karşına çıkar.", "Add a topic if the deck is empty. Start studying, recall, flip and rate yourself. Due cards return for review."] },
    { id: "reviewQueue", route: "#/tekrar", target: ".page", title: ["Bütün tekrarların tek listede", "One review queue"], text: ["Geciken yanlışlar, kartlar, test konuları ve düzeltilen AI bilgileri burada toplanır. Bir satırdaki eylemi açıp kaldığın yerden devam et.", "Due mistakes, cards, quiz topics and corrected AI information appear here. Open a row to continue."] },
    { id: "mistakes", route: "#/yanlislar", target: ".mis-bar" },
    { id: "solutionCheck", route: "#/kontrol", target: ".page", title: ["Kendi çözümünü kontrol et", "Check your own solution"], text: ["Çözümünü yaz, çiz veya fotoğraf ekle. AI geri bildirimini kaynakla karşılaştır; bu araç kesin doğruluk garantisi vermez.", "Type, draw or photograph your solution. Check AI feedback against a source; accuracy is not guaranteed."] },
    { id: "labs", route: "#/bilim-lab", target: ".page", title: ["Deney yaparak keşfet", "Explore through experiments"], text: ["Sanal deneylerden birini aç. Rehberli deneyde tahminini yaz, değişkeni değiştir, sonucu gözle ve açıkla; notlarını indir. İstersen Serbest kullanım seç. Diğer sekmelerde deney kataloğu, sensörler, fizik ve titreşim bölümleri var. Gerçek cihaz ve simülasyon ayrıdır; kaydını indir veya Dokümanlara aktar.", "Open a virtual experiment. In guided mode predict, change a variable, observe and explain; download your notes. Choose Free exploration whenever you want. Other tabs contain the catalogue, sensors, physics and vibration. Device and simulation sources are separate; export readings or send them to Documents."] },
    { id: "virtualPH", route: "#/bilim-lab/deneyler/ph", target: ".ph-sim-controls", title: ["17 çözeltiyle sanal pH", "Virtual pH with 17 solutions"], text: ["Asit, baz veya nötr çözeltini seç, miktarı belirleyip ekle. Su ekleyerek seyrelt, karıştır ve kaydı indir. Kamera gerekmez; sonuç ideal 25 °C simülasyonudur, gerçek ölçüm değildir.", "Choose an acid, base or neutral solution, then pour a selected amount. Dilute, mix and export the trial. No camera is needed; this is an ideal 25 °C simulation, not a real measurement."] },
    { id: "ecosystem", route: "#/bilim-lab/deneyler/ekosistem", target: ".page", title: ["Ekosistem dengesini keşfet", "Explore ecosystem balance"], text: ["Sanal kavanozu başlat, canlıları veya mevsimleri değiştir ve nüfus eğrilerini izle. Sonuçlar eğitim modeline aittir; gerçek bir ekosistemin tahmini değildir.", "Start the virtual jar, change populations or seasons and watch the curves. Results belong to an educational model, not a real ecosystem forecast."] },
    { id: "models", route: "#/modeller", target: ".page", title: ["3B modeller", "3D models"], text: ["Hücre, atom veya güneş sistemi gibi modelleri döndür, etiketleri incele. AR ve el takibi cihaz desteğine bağlıdır.", "Rotate models such as cells, atoms and the solar system. AR and hand tracking depend on device support."] },
    { id: "atlas", route: "#/atlas", target: ".page", title: ["Haritayla öğren", "Learn with maps"], text: ["Türkiye ve dünya haritasında keşif yap. Sonra kısa sınamayla konumları ve bilgileri hatırlayıp hatırlamadığını kontrol et.", "Explore Turkey and world maps, then test your recall of places and facts."] },
    { id: "globe", route: "#/kure", target: ".page", title: ["Dünyayı katmanlarla incele", "Explore the globe in layers"], text: ["Küreyi döndür; iklim, levha ve saat dilimi gibi katmanları incele. Yakınlaştırma kontrolleri dokunmatik ekranda da kullanılabilir.", "Rotate the globe and inspect layers such as climate, plates and time zones. Zoom controls also work on touchscreens."] },
    { id: "timeline", route: "#/zaman", target: ".page", title: ["Tarih zaman çizelgesi", "History timeline"], text: ["Bir dönemi ve olayı seç; zamanı, yeri ve bağlantıları birlikte incele. Sorularla kendini sına.", "Choose a period and event; explore dates, places and connections, then test yourself."] },
    { id: "calculationTools", route: "#/hesaplar", target: ".workspace-overview", title: ["Hesaplar ve Araçlar", "Calculations & Tools"], text: ["Birim dönüştür, fonksiyon çiz, mol ve çözelti hesabı yap veya ölçümleri incele. İlgili konu anlatımlarında Bu konuda hesapla paneli de bulunur. Araçlar cihazda çalışır; varsayımları ve birimleri kontrol et.", "Convert units, plot functions, calculate moles and solutions or analyse readings. Relevant lessons also offer an inline calculation panel. Tools run locally; check assumptions and units."] },
    { id: "formulas", route: "#/formuller", target: ".page", title: ["Formül defteri", "Formula notebook"], text: ["Formülü ara; yalnız eşitliğini değil, ne zaman kullanılacağını da oku. İlgili konuya tek dokunuşla geç.", "Find a formula and read when to use it. Open its lesson with one tap."] },
    { id: "video", route: "#/video", target: ".page", title: ["Videodan çalışma", "Study from a video"], text: ["Video veya transkriptle not, kart ve soru hazırla. AI ile üretilen notları kaynak içerikle karşılaştır.", "Use a video or transcript to make notes, cards and questions. Verify generated notes against the source."] },
    { id: "podcast", route: "#/podcast", target: ".page", title: ["Dinleyerek tekrar", "Audio revision"], text: ["Bir konuyu sesli çalışma içeriğine dönüştür. Dinlerken duraklatıp not al; ses üretimi için uygun sağlayıcı gerekir.", "Turn a topic into audio study. Pause to take notes; audio generation requires a suitable provider."] },
    { id: "speaking", route: "#/konusma", target: ".page", title: ["İngilizce konuşma pratiği", "English speaking practice"], text: ["Konu seçip konuş veya metinle katıl. Mikrofon ve ses hizmeti gereksinimlerini kontrol et, geri bildirimle yeniden dene.", "Choose a topic and speak or type. Check microphone and speech-service requirements, then retry with feedback."] },
    { id: "concepts", route: "#/kavram", target: ".page", title: ["Kavramla konuş", "Talk to a concept"], text: ["Kavramı seç ve merak ettiğin soruyu sor. Canlandırma öğrenmeyi destekleyen bir anlatım aracıdır; yanıtları doğrulamayı sürdür.", "Choose a concept and ask a question. The character is an explanation aid; keep checking its answers."] },
    { id: "documentPack", route: "#/dokumanlar/paket", target: ".sw-page", title: ["Belgeni çalışma paketine dönüştür", "Turn documents into study packs"], text: ["Belgeyi cihazda oku, metni kontrol et ve kaynaklı özet, kavramlar, kart ve test oluştur. AI çıktısını kaynakla karşılaştır.", "Read a document locally, review text and generate source-linked study material. Check AI output against its source."] },
    { id: "homework", route: "#/odevler", target: ".sw-page", title: ["Ödev ve teslim takibi", "Assignments and deadlines"], text: ["Elle gir veya fotoğraftan taslak çıkar. Tarihi kontrol ederek kaydet, adımlarını işaretle.", "Enter manually or read a photo. Check dates before saving and track your steps."] },
    { id: "notebook", route: "#/dokumanlar/notlar", target: ".sw-page", title: ["Dokümanlar: yaz ve defterden aktar", "Documents: write and import notes"], text: ["Fotoğrafı okut, metni düzelt. Genel notlara veya mevcut konu notunun sonuna ekle.", "Transcribe a photo, correct the text, and save to general or topic notes."] },
    { id: "oralPractice", route: "#/sozlu-prova", target: ".sw-page", title: ["Sözlü sınav provası", "Oral exam practice"], text: ["Kendi kaynağından sorular hazırla. Sesli/yazılı yanıtı kontrol edip ölçütlerle değerlendir. Prova puanı resmî not değildir.", "Prepare source-based questions and review voice/text answers against criteria. Practice scores are not official grades."] },
    { id: "journey", route: "#/yolculuk", target: ".page", title: ["Görevler ve oyunlar", "Quests and games"], text: ["Oyunlar artık dört beceri grubunda; Oran Mutfağı, Bilimsel Gösterim, pH Tahmini ve Kanıt Dedektifi de var. XP ve rozet ayrıntısını Gelişimim’deki motivasyon bölümünde açabilirsin.", "Stay engaged with curriculum quests and subject games. Check learning with questions alongside points."] },
    { id: "exams", route: "#/denemeler", target: 'a[href^="#/denemeler/yeni"]' },
    { id: "goals", route: "#/denemeler", target: ".goal-card" },
    { id: "focus", route: "#/odak", target: ".focus__ring" },
    { id: "report", route: "#/rapor", target: ".page", title: ["Gelişimini takip et", "Track your progress"], text: ["Haftalık süre, test ve konu özetini incele. Eksik verilerin bir sonucu değiştirebileceğini göz önünde bulundur.", "Review weekly time, quizzes and topics. Missing records can affect summaries."] },
    { id: "reportCard", route: "#/karne", target: ".page", title: ["Haftalık üstbiliş karnesi", "Weekly metacognition report"], text: ["Haftanı seçip tek sayfalık karne al. Eminlik ve başarı göstergeleri pedagojik işaretlerdir; öğrenciye ilişkin bir teşhis değildir.", "Choose a week and get a one-page report. Confidence and accuracy indicators are educational signals, not diagnoses."] },
    { id: "classroom", route: "#/sinif-modu", target: ".page", title: ["İnternetsiz QR ödev aktarımı", "Offline QR assignments"], text: ["Öğretmen ödev QR'si paylaşır; öğrenci çözer ve sonuç QR'sini geri verir. Kamera kullanılamıyorsa kod yapıştırma alanını aç.", "Teachers share assignment QR codes; students solve and return results. Paste codes if the camera is unavailable."] },
    { id: "teacher", route: "#/degerlendirme", target: ".page", title: ["Öğretmen gerekçe değerlendirmesi", "Teacher reasoning review"], text: ["Öğrencinin gerekçesini üç ölçütle değerlendir. Geri bildirimi QR veya kodla geri gönder; araştırma kayıtları ayrı korunur.", "Review reasoning with three rubric criteria. Return feedback by QR or code; research records remain separate."] },
    { id: "research", route: "#/arastirma", target: ".page", title: ["Araştırma modu", "Research mode"], text: ["Öğretmen incelemesinden geçmiş bir bankayla ipucu veya adaptif akışı karşılaştır. Grupları ve sınırlılıkları kaydet; sonuçları genellemeden önce araştırma tasarımını değerlendir.", "Compare hints or adaptive flow with a reviewed bank. Record groups and limitations and evaluate the study design before generalising."] },
    { id: "discover", route: "#/araclar", target: "#hubQ", title: ["Aradığın özelliği hemen bul", "Find any feature"], text: ["Sekiz kategoriden birini seç veya ada/amaca göre ara. Yıldız sayfayı yan menüye sabitler. AI ana ekranında Favorileri düzenle ile kendi başlangıç şablonlarını oluştur; her ekranın kullanım ipucunu açabilirsin.", "Choose one of eight categories or search by name or purpose. Stars pin pages to the sidebar. On the AI home page, Edit favourites creates personal starting prompts. Open each tool’s usage tip."] },
    { id: "sync", route: "#/", target: "#setSync, #setAi", enter: () => App.modules.settings.open(), leave: closeModals },
    { id: "a11y", route: "#/", target: "#a11yBtn" },
    { id: "backup", route: "#/rehber", target: ".page", title: ["Verilerini koru ve geri dön", "Protect your data and return"], text: ["Ayarlar'dan yedek al; eşitleme isteğe bağlıdır. Kullanım Rehberi üzerinden bu turun istediğin bölümünü yeniden açabilirsin.", "Back up from Settings; sync is optional. Reopen any tour section from the User Guide."] },
    { id: "done", center: true, route: "#/" }
  ];
  const SECTIONS = [
    ["welcome", "Başlangıç ve asistan", "Getting started", "Soru sorma, fotoğraf ve kaynak kullanımı.", "Questions, photos and sources."],
    ["today", "Çalışmanı planla", "Plan your study", "Bugün, kişisel program ve temel eksikler.", "Today, personal plans and prerequisites."],
    ["topics", "Konuyu öğren", "Learn a topic", "Konu anlatımı, test, gerekçe ve açıklama.", "Lessons, quizzes, reasoning and self-explanation."],
    ["transfer", "Bilgiyi uygula", "Apply your knowledge", "Yeni pratikler, kartlar, yanlışlar ve tekrar.", "New practice, cards, mistakes and review."],
    ["labs", "Keşfet ve deney yap", "Explore and experiment", "Laboratuvar, modeller, haritalar, ses ve video.", "Labs, models, maps, audio and video."],
    ["exams", "Gelişimini izle", "Track progress", "Denemeler, hedefler, odak ve karne.", "Exams, goals, focus and reports."],
    ["classroom", "Öğretmen ve araştırma", "Teachers and research", "QR aktarımı, gerekçe değerlendirme ve deneyler.", "QR transfer, reasoning review and experiments."],
    ["discover", "Kısayollar ve güvenli kullanım", "Shortcuts and safe use", "Arama, eşitleme, erişilebilirlik ve yedekleme.", "Search, sync, accessibility and backups."]
  ].map((g) => ({ step: STEPS.findIndex((s) => s.id === g[0]), tr: g[1], en: g[2], descTr: g[3], descEn: g[4] }));
  const T = (pair) => pair[App.i18n.lang === "en" ? 1 : 0];

  let el = null, idx = 0, raf = 0, active = false, token = 0, curTarget = null, lastRect = "";

  const visible = (n) => !!(n && n.getClientRects().length && getComputedStyle(n).visibility !== "hidden");

  function find(sel) {
    const list = sel.split(",").map((s) => s.trim());
    for (const s of list) {
      const n = Array.from(document.querySelectorAll(s)).find((x) => visible(x) && !x.closest(".tour"));
      if (n) return n;
    }
    return null;
  }

  function waitFor(sel, ms) {
    return new Promise((resolve) => {
      const start = Date.now();
      (function poll() {
        const n = find(sel);
        if (n || Date.now() - start > ms) return resolve(n);
        setTimeout(poll, 80);
      })();
    });
  }

  /** Hedefi kendi kaydırma alanında ortala (sayfanın tamamını kaydırmadan) */
  function reveal(target) {
    const sc = target.closest("#view, .modal, .modal__body");
    if (!sc || sc.scrollHeight <= sc.clientHeight) return;
    const r = target.getBoundingClientRect(), b = sc.getBoundingClientRect();
    const want = sc.scrollTop + (r.top - b.top) - Math.max(16, (b.height - r.height) / 2);
    sc.scrollTo({ top: Math.max(0, want), behavior: "smooth" });
  }

  /** Kaydırma bitene kadar bekle (hedefin konumu ~150 ms değişmeyince; en çok 1,5 sn) */
  function settle(target) {
    return new Promise((resolve) => {
      const start = Date.now();
      let last = "", since = Date.now(), frame = null, finished = false;
      const done = () => { if (finished) return; finished = true; clearTimeout(deadline); if (frame !== null) cancelAnimationFrame(frame); resolve(); };
      // rAF can pause in a hidden WebView/tab. The deadline must run independently.
      const deadline = setTimeout(done, 1500);
      (function poll() {
        if (finished) return;
        const r = target.getBoundingClientRect();
        const k = Math.round(r.top) + "," + Math.round(r.left);
        if (k !== last) { last = k; since = Date.now(); }
        if (Date.now() - since > 150 || Date.now() - start > 1500) return done();
        frame = requestAnimationFrame(poll);
      })();
    });
  }

  function build() {
    el = document.createElement("div");
    el.className = "tour";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML =
      '<div class="tour__shade"></div>' +
      '<div class="tour__spot" hidden></div>' +
      '<div class="tour__card" role="document">' +
        '<div class="tour__top"><span class="tour__count"></span><button class="tour__skip" type="button" data-tour="skip"></button></div>' +
        '<div class="tour__progress"><span></span></div>' +
        '<div class="tour__jump"><label for="tourSection">' + T(["İstediğin bölüme geç", "Jump to a section"]) + '</label><select class="select" id="tourSection">' + SECTIONS.map((s) => '<option value="' + s.step + '">' + esc(T([s.tr, s.en])) + '</option>').join("") + '</select></div>' +
        '<div class="tour__body"></div>' +
        '<div class="tour__nav"><button class="btn btn--ghost btn--sm" type="button" data-tour="back"></button>' +
          '<button class="btn btn--primary btn--sm" type="button" data-tour="next"></button></div>' +
      "</div>";
    document.body.appendChild(el);
    el.setAttribute("aria-label", T(["KampüsAI tanıtım turu", "KampüsAI guided tour"]));
    el.querySelector('#tourSection').addEventListener('change', (e) => go(Number(e.target.value)));
    el.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey, true);
  }

  function onKey(e) {
    if (!active) return;
    if (e.key === "Tab") {
      const focusable = Array.from(el.querySelectorAll('button:not(:disabled),input,select,a[href]')).filter(visible);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      return;
    }
    const typing = e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && e.target.closest(".tour");
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); finish(true); }
    else if (e.key === "ArrowRight" && !typing) { e.preventDefault(); go(idx + 1); }
    else if (e.key === "ArrowLeft" && !typing) { e.preventDefault(); go(idx - 1); }
    else if (e.key === "Enter" && typing && e.target.tagName !== "SELECT") { e.preventDefault(); go(idx + 1); }
  }

  async function onClick(e) {
    const b = e.target.closest("[data-tour]");
    if (!b) return;
    const a = b.dataset.tour;
    if (a === "next") go(idx + 1);
    else if (a === "back") go(idx - 1);
    else if (a === "skip") finish(true);
    else if (a === "remind") {
      b.disabled = true;
      const r = await App.reminders.enable();
      b.textContent = r.ok ? t("tour.remindOn") : r.permission === "unsupported" ? t("rem.unsupported") : t("tour.remindDenied");
      b.classList.toggle("is-done", r.ok);
      if (!r.ok) b.disabled = false;
    }
  }

  function saveName() {
    const inp = el && el.querySelector("#tourName");
    if (!inp) return;
    const v = inp.value.trim();
    if (v !== App.prefs.get("userName", "")) { App.prefs.set("userName", v); App.applyProfile(); }
  }

  async function go(n) {
    if (!active) return;
    if (n >= STEPS.length) return finish(false);
    if (n < 0) return;
    const prev = STEPS[idx];
    if (prev && prev.name) saveName();
    if (prev && prev.leave && n !== idx) prev.leave();
    idx = n;
    const my = ++token;
    const s = STEPS[idx];
    App.prefs.set("tourStep", idx);

    // Telefonda açık menüyü kapat
    const app = document.getElementById("app");
    if (app) app.classList.remove("is-menu-open");
    const scrim = document.getElementById("scrim");
    if (scrim) scrim.hidden = true;

    paintCard(s, true);
    const route = typeof s.route === "function" ? s.route() : s.route;
    if (route && location.hash !== route && !(route === "#/" && (location.hash === "" || location.hash === "#"))) {
      closeModals();
      location.hash = route;
    }
    if (s.enter) { await new Promise((r) => setTimeout(r, 250)); if (my !== token) return; s.enter(); }

    let target = null;
    if (s.target) {
      target = await waitFor(s.target, 3500);
      if (my !== token) return;
      if (target) {
        reveal(target);
        await settle(target);
        if (my !== token) return;
      }
    }
    curTarget = target;
    lastRect = "";
    paintCard(s, false);
  }

  function paintCard(s, loading) {
    const card = el.querySelector(".tour__card");
    const n = STEPS.length;
    el.querySelector(".tour__count").textContent = t("tour.count", { n: idx + 1, total: n });
    const section = SECTIONS.slice().reverse().find((g) => idx >= g.step);
    el.querySelector('#tourSection').value = String(section ? section.step : 0);
    el.querySelector(".tour__progress span").style.width = ((idx + 1) / n * 100).toFixed(1) + "%";
    const skip = el.querySelector('[data-tour="skip"]');
    skip.textContent = t("tour.skip");
    skip.hidden = idx === n - 1;
    const back = el.querySelector('[data-tour="back"]');
    back.textContent = t("tour.back");
    back.hidden = idx === 0;
    el.querySelector('[data-tour="next"]').textContent = idx === 0 ? t("tour.start") : idx === n - 1 ? t("tour.finish") : t("tour.next");
    if (loading && !s.center) { card.classList.add("is-moving"); return; }
    card.classList.remove("is-moving");
    const body = el.querySelector(".tour__body");
    let extra = "";
    if (s.name) {
      extra = '<label class="field tour__field"><span class="field__label">' + esc(t("tour.nameLabel")) + '</span><input class="input" id="tourName" maxlength="40" autocomplete="given-name" placeholder="' + esc(t("set.namePh")) + '" value="' + esc(App.prefs.get("userName", "")) + '"></label>';
    }
    if (s.action === "remind") {
      const on = App.reminders && App.reminders.config().on;
      extra = '<button class="btn btn--sm tour__action' + (on ? " is-done" : "") + '" type="button" data-tour="remind"' + (on ? " disabled" : "") + ">" + App.icon("bell") + esc(on ? t("tour.remindOn") : t("tour.remindBtn")) + "</button>";
    }
    const name = (App.prefs.get("userName", "") || "").split(" ")[0];
    body.innerHTML =
      (s.center ? '<div class="tour__logo" aria-hidden="true">' + App.icon("logo") + "</div>" : "") +
      "<h2>" + esc(s.title ? T(s.title) : t("tour." + s.id + ".title", { name: name ? ", " + name : "" })) + "</h2>" +
      "<p>" + esc(s.text ? T(s.text) : t("tour." + s.id + ".text")) + "</p>" + extra + (s.id === 'welcome' ? '<span class="tour__tip">' + esc(T(["Tur bölümlere ayrılır. İstediğin bölüme geçebilir, Esc veya Geç ile çıkıp Kullanım Rehberi'nden yeniden açabilirsin.", "Jump between sections, or exit with Esc / Skip and reopen the tour from the User Guide."])) + '</span>' : '');
    App.hydrateIcons(body);
    el.classList.toggle("is-center", !!s.center || !curTarget);
    if (s.name) setTimeout(() => { const i = el.querySelector("#tourName"); if (i && !App.platform.mobile) i.focus(); }, 60);
    else el.querySelector('[data-tour="next"]').focus({ preventScroll: true });
    layout(true);
  }

  /* Vurgu ve kartı hedefin yanına yerleştir (her karede yeniden ölçülür: kaydırma, animasyon, boyut) */
  function layout(force) {
    if (!el) return;
    const spot = el.querySelector(".tour__spot");
    const card = el.querySelector(".tour__card");
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = STEPS[idx];
    // Keep the card inside the usable viewport, including native safe-area insets.
    const appCs = getComputedStyle(document.getElementById("app") || document.body);
    const minT = 12 + (parseFloat(appCs.paddingTop) || 0);
    const maxB = vh - 12 - (parseFloat(appCs.paddingBottom) || 0);
    const available = Math.max(160, maxB - minT);
    el.style.setProperty("--tour-max-height", available + "px");
    const target = curTarget && document.contains(curTarget) && visible(curTarget) ? curTarget : null;
    if (!target || s.center) {
      if (!spot.hidden || force) { spot.hidden = true; el.classList.add("is-center"); card.style.cssText = ""; }
      return;
    }
    const r = target.getBoundingClientRect();
    const pad = 8;
    // Görünen kısımla sınırla (uzun öğelerde vurgu ekrandan taşmasın)
    const top = Math.max(r.top - pad, 6), left = Math.max(r.left - pad, 6);
    const bottom = Math.min(r.bottom + pad, vh - 6), right = Math.min(r.right + pad, vw - 6);
    const key = [top, left, bottom, right, vw, vh, card.offsetHeight].map(Math.round).join(",");
    if (key === lastRect && !force) return;
    lastRect = key;
    el.classList.remove("is-center");
    spot.hidden = false;
    spot.style.cssText = "top:" + top + "px;left:" + left + "px;width:" + Math.max(0, right - left) + "px;height:" + Math.max(0, bottom - top) + "px";

    const cw = Math.min(380, vw - 24);
    const ch = Math.min(card.offsetHeight || 220, available);
    const gap = 14;
    let ct, cl;
    if (vw < 640) {
      // Telefonda kart alt ya da üst kenara yaslanır; vurgunun karşı tarafında durur
      const mid = (top + bottom) / 2;
      cl = 12;
      ct = mid < vh / 2 ? maxB - ch : minT;
      if (mid < vh / 2 && bottom + gap > ct) ct = Math.min(maxB - ch, bottom + gap);
      if (mid >= vh / 2 && top - gap < ct + ch) ct = Math.max(minT, top - gap - ch);
      ct = Math.max(minT, Math.min(maxB - ch, ct));
      card.style.cssText = "top:" + Math.round(ct) + "px;left:" + cl + "px;right:12px;width:auto";
      return;
    }
    if (bottom + gap + ch <= maxB) ct = bottom + gap;
    else if (top - gap - ch >= minT) ct = top - gap - ch;
    else ct = Math.max(minT, Math.min(maxB - ch, (top + bottom) / 2 - ch / 2));
    ct = Math.max(minT, Math.min(maxB - ch, ct));
    cl = (left + right) / 2 - cw / 2;
    if (ct > top - gap - ch && ct < bottom + gap) {      // yukarı/aşağı sığmadı: yana koy
      cl = right + gap + cw <= vw - 12 ? right + gap : left - gap - cw >= 12 ? left - gap - cw : cl;
    }
    cl = Math.max(12, Math.min(vw - cw - 12, cl));
    card.style.cssText = "top:" + Math.round(ct) + "px;left:" + Math.round(cl) + "px;width:" + cw + "px";
  }

  function loop() {
    if (!active) return;
    layout(false);
    raf = requestAnimationFrame(loop);
  }

  function start(fromStep) {
    if (active) return;
    document.querySelectorAll('.tour.is-leaving').forEach((node) => node.remove());
    active = true;
    App.prefs.set("tourDone", false);
    build();
    document.documentElement.classList.add("touring");
    idx = 0;
    raf = requestAnimationFrame(loop);
    go(Math.max(0, Math.min(STEPS.length - 1, Number(fromStep) || 0)));
  }

  function finish(skipped) {
    if (!active) return;
    const s = STEPS[idx];
    if (s && s.name) saveName();
    if (s && s.leave) s.leave();
    active = false;
    token++;
    cancelAnimationFrame(raf);
    document.removeEventListener("keydown", onKey, true);
    document.documentElement.classList.remove("touring");
    if (el) { el.classList.add("is-leaving"); const e = el; setTimeout(() => e.remove(), 220); }
    el = null; curTarget = null;
    App.prefs.set("tourDone", true);
    App.prefs.remove("tourStep");
    closeModals();
    if (location.hash !== "#/") location.hash = "#/";
    else App.router.refresh();
    if (skipped) App.ui.toast(t("tour.skipped"));
    // Tanıtım bitti: yapay zeka önceliğini sor (Windows/Android, bir kez)
    setTimeout(() => { if (App.modules.aiSettings) App.modules.aiSettings.askPriority(); }, 900);
  }

  /** İlk kurulum mu? Eski kullanıcıları (güncelleme yapanları) işaretleyip atlar */
  async function shouldShow() {
    const done = App.prefs.get("tourDone", null);
    if (done === true || done === "existing" || done === "demo") return false;
    if (done === false) return true;                       // tur yarıda kaldı (uygulama kapandı): kaldığı yerden
    if (!App.firstRun) { App.prefs.set("tourDone", "existing"); return false; }
    for (const s of DATA_STORES) {
      try { if ((await App.db.getAll(s)).length) { App.prefs.set("tourDone", "existing"); return false; } } catch (e) { /* yok say */ }
    }
    return true;
  }

  async function maybeStart() {
    if (!(await shouldShow())) return;
    // #/demo kısayoluyla açıldıysa (sunum/jüri) tur kendiliğinden başlamaz; Ayarlar'dan açılabilir
    setTimeout(() => { if (App.prefs.get("tourDone", null) === "demo") return; start(App.prefs.get("tourStep", 0)); }, 500);
  }

  App.tour = { start, finish, maybeStart, shouldShow, steps: STEPS, sections: SECTIONS, isActive: () => active, current: () => idx };
})();
