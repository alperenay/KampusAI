/* =========================================================
   hub.js — "Tüm araçlar" sayfası, sabitlenenler ve son kullanılanlar (v1.22)   (#/araclar)

   • Bütün özellikler tek sayfada, kısa açıklamalarıyla ve gruplu; üstte arama
     kutusu (yazdıkça süzer, Enter ilk sonucu açar).
   • Her aracın yıldızı ile sabitleme: sabitlenenler sol menünün üstünde
     "Sabitlenenler" grubunda ve asistan açılışında kısayol olarak görünür.
   • Son kullanılan araçlar otomatik tutulur (tercih "recentTools").
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);
  const MAX_PINS = 8, MAX_RECENT = 6;

  /* [rota, simge, ad (i18n anahtarı ya da [tr,en]), açıklama [tr,en], grup, arama kelimeleri] */
  const TOOLS = [
    ["aktarim", "layers", "nav.transfer", ["Aynı kavramı denklem, grafik/tablo ve günlük yaşamda uygula", "Apply one concept to equations, visual data and everyday problems"], "practice", "aktarım transfer bağlam grafik tablo kavram offline çevrimdışı"],
    ["hata-avcisi", "scan", "nav.errorHunt", ["Kasıtlı hatalı çözümde ilk yanlış adımı ve nedenini bul", "Find the first wrong step and its reason in an intentionally flawed solution"], "practice", "hata avcısı yanlış çözüm eleştirel düşünme gerekçe offline çevrimdışı"],
    ["rehber", "compass", "nav.guide", ["Bölümlere ayrılmış ekran turu, ilk adımlar ve kullanım ipuçları", "Sectioned guided tour, first steps and usage tips"], "start", "yardım nasıl kullanılır tanıtım tur rehber help onboarding"],
    ["degerlendirme", "grad", "review.title", ["Gerekçeleri ölçütle değerlendir; QR ile geri bildirim ver", "Review reasoning with a rubric and return feedback via QR"], "track", "öğretmen gerekçe eminlik değerlendirme puan rubrik"],
    ["arastirma", "chart", "nav.research", ["Gerekçe, eminlik ve ipucu etkisini çevrimdışı karşılaştır", "Compare reasoning, confidence and hints offline"], "track", "araştırma deney ab qr eminlik gerekçe ipucu"],
    ["bugun", "sun", "nav.today", ["Bugünkü program, görevler ve öneriler", "Today's plan, tasks and suggestions"], "start", "gün plan görev"],
    ["", "sparkle", "nav.newChat", ["Yapay zekâ asistanına soru sor, fotoğraftan çöz", "Ask the AI assistant, solve from a photo"], "start", "asistan sohbet soru yapay zeka"],
    ["sesli", "mic", "nav.voiceTeacher", ["Konuşarak sor, sesli cevap al; hologram öğretmen ekranda anlatır", "Ask by voice and hear the answer; the hologram teacher explains on screen"], "start", "sesli öğretmen hologram konuş ses mikrofon voice"],
    ["konular", "book", "nav.topics", ["9–12. sınıf konu anlatımları ve testler", "Grade 9–12 lessons and quizzes"], "study", "ders konu anlatım müfredat"],
    ["formuller", "sMath", "nav.formulas", ["Matematik, fizik ve kimya formülleri: ne zaman kullanılır, hızlı tekrar", "Maths, physics and chemistry formulas with quick review"], "study", "formül formul defteri matematik fizik kimya türev integral ivme mol"],
    ["yazili", "pen", "nav.written", ["Maarif Modeli açık uçlu yazılılar: cevap anahtarı ve puanlama ölçütü", "Open-ended written exams with answer keys and rubrics"], "study", "yazılı sınav açık uçlu maarif dönem ortak sınav cevap anahtarı"],
    ["konusma", "sLang", "nav.speaking", ["İngilizce konuşma ve Almanca A1–B2 kelime, gramer, diyalog pratiği", "English conversation and German A1–B2 vocabulary, grammar and dialogues"], "study", "almanca german deutsch ingilizce english konuşma speaking telaffuz pronunciation dilbilgisi grammar hologram sesli"],
    ["tekrar", "refresh", "nav.review", ["Kart, yanlış, test ve düzeltilen bilgiler tek tekrar listesinde", "Cards, mistakes, quizzes and corrections in one review list"], "study", "tekrar aralıklı bugün srs review due"],
    ["kartlar", "layers", "nav.cards", ["Kutu sistemiyle hap bilgi tekrarı", "Spaced-repetition flashcards"], "study", "kart flashcard tekrar"],
    ["yanlislar", "bookmark", "nav.mistakes", ["Yanlışların aralıklı tekrarla geri gelir", "Your mistakes come back for review"], "study", "yanlış hata tekrar"],
    ["video", "play", "nav.video", ["YouTube ders videosundan özet, bölümler, kartlar ve test", "Summary, chapters, cards and a quiz from a lesson video"], "study", "video youtube özet transkript ders izle"],
    ["podcast", "volume", "nav.podcast", ["Her konu iki sesli sohbet podcast'i; arada sorular", "Every topic as a two-voice podcast with quiz breaks"], "study", "podcast dinle sesli sohbet kulaklık konu"],
    ["canli", "camera", "nav.live", ["Kamerayı soruya tut: çözüm adımları kâğıdın üstünde (AR)", "Point the camera at a question: steps appear on the paper (AR)"], "study", "canlı kamera ar artırılmış gerçeklik soru çöz fotoğraf"],
    ["cevre", "lightbulb", "nav.around", ["Bir sahnenin fotoğrafından fizik sorusu ve aynı değerlerle deney", "A physics question and matching lab from a photo of a scene"], "practice", "çevre fizik fotoğraf salıncak kaydırak atış çaydanlık soru üret deney simülasyon"],
    ["kavram", "sparkle", "nav.concepts", ["Kavramın kendisiyle sesli konuş: mitokondri, Mars, DNA; hologram ve piramit", "Talk aloud with the concept itself: mitochondrion, Mars, DNA; hologram and pyramid"], "practice", "kavram konuş sesli hologram piramit mitokondri mars dna atom foton karakter"],
    ["kontrol", "scan", "nav.check", ["Çözümünün fotoğrafını çek ya da ekrana yaz; adım adım kontrol", "Photo or handwrite your solution for a step check"], "study", "çözüm kontrol el yazısı"],
    ["program", "calendar", "nav.schedule", ["Haftalık ders programı ve hatırlatıcılar", "Weekly study plan and reminders"], "study", "program takvim hatırlatma"],
    ["yolculuk", "star", "nav.journey", ["Müfredat bir macera haritası: XP, seviye, canavarlar, günlük görevler", "The curriculum as an adventure: XP, levels, bosses, quests"], "practice", "yolculuk oyun xp seviye görev macera"],
    ["paragraf", "timer", "nav.para", ["Okuma hızı ve soru başına süre (TYT Türkçe)", "Reading speed and time per question"], "practice", "paragraf okuma hız türkçe"],
    ["atlas", "globe", "nav.geomap", ["Türkiye ve dünya haritası; keşfet ve sına", "Turkey and world map; explore and quiz"], "practice", "harita coğrafya il ülke başkent"],
    ["zaman", "clock", "nav.timeline", ["İlk Çağ'dan günümüze olaylar; konum, önem ve sınav", "Events from antiquity to today with map and quiz"], "practice", "tarih zaman çizelgesi olay savaş antlaşma inkılap"],
    ["lab", "lightbulb", "nav.lab", ["82 deney; 2B, 3B, AR, hologram, el ile ve sesli grafik", "82 labs: 2D, 3D, AR, hologram, hand control, audio graphs"], "practice", "deney fizik kimya biyoloji matematik coğrafya simülasyon 3b hologram el sesli grafik"],
    ["sensor", "mic", ["Sensör Laboratuvarı", "Sensor Lab"], ["Telefonun ivmeölçeri, mikrofonu ve kamerasıyla gerçek ölçüm", "Real measurements with your phone's sensors"], "practice", "sensör ivmeölçer sarkaç yer çekimi asansör ses frekans doppler ışık ters kare ölçüm"],
    ["duello", "star", ["Arkadaş Düellosu", "Friend Duel"], ["İnternetsiz QR ile eşleş, aynı soruları aynı anda çöz", "Pair by QR offline and race on the same questions"], "practice", "düello yarışma arkadaş oyun qr internetsiz rozet"],
    ["evren", "globe", ["Bilgi Evreni", "Knowledge Cosmos"], ["Kazanımların 3B takımyıldız haritası; AR ve hologram", "3D constellation of outcomes; AR and hologram"], "track", "bilgi evreni 3b harita kazanım ön koşul hologram ar yıldız"],
    ["kure", "globe", "nav.globe", ["Elle çevrilen küre: ülkeler, levhalar, depremler, iklim kuşakları, saat dilimleri, gündüz–gece", "Globe: countries, plates, quakes, climate belts, time zones, day–night"], "practice", "küre dünya 3b levha deprem volkan saat dilimi iklim kuşağı ekvator dönence güneş mevsim"],
    ["modeller", "cube", "nav.models", ["Hücre, kalp, DNA, atom, güneş sistemi; elle molekül kurma", "Cell, heart, DNA, atoms, solar system; build molecules by hand"], "practice", "3b model hologram hücre kalp dna atom orbital molekül vsepr güneş sistemi"],
    ["oyunlar", "game", "nav.games", ["Derslere göre kısa oyunlar", "Short subject games"], "practice", "oyun eğlence"],
    ["denemeler", "chart", "nav.exams", ["TYT–AYT netleri; sonuç belgesini fotoğraftan oku", "TYT–AYT scores; read result sheets from a photo"], "track", "deneme net tyt ayt"],
    ["simulasyon", "quiz", "nav.sim", ["Zayıf konulardan süreli mini deneme", "Timed mini exam from weak topics"], "track", "simülasyon deneme sınav"],
    ["harita", "map", "nav.map", ["Kazanımların durumu ve günlük görev", "Mastery of every outcome"], "track", "öğrenme haritası kazanım"],
    ["kok", "roots", "nav.roots", ["Zorlandığın konunun temeldeki eksiği", "Find the root gap behind a weak topic"], "track", "kök eksik analiz"],
    ["puan", "target", "nav.score", ["Tahmini puan ve bölüm hedefi", "Estimated score and target"], "track", "puan hedef sıralama bölüm"],
    ["tercih", "grad", "nav.tercih", ["Denemelerine göre yerleşebileceğin bölümler; 2025 taban puan ve sıralamalar", "Programmes you could get into; 2025 cut-offs"], "track", "tercih üniversite bölüm taban puan sıralama yök atlas"],
    ["kariyer", "compass", "nav.career", ["İlgi envanteri, 52 meslek kartı ve girebileceğin bölümler", "Interest inventory, 52 careers and programmes you could enter"], "track", "kariyer meslek ilgi envanteri riasec bölüm seçimi"],
    ["rapor", "note", "nav.report", ["Haftalık gelişim özeti", "Weekly progress summary"], "track", "rapor haftalık"],
    ["karne", "chart", ["Üstbiliş Karnesi", "Metacognition Report"], ["Veli/öğrenci için tek sayfa A4 haftalık karne", "One-page weekly A4 report for parents"], "track", "karne veli haftalık rapor üstbiliş eminlik pdf yazdır"],
    ["odak", "timer", "nav.focus", ["Pomodoro sayacı ve çalışma süresi", "Pomodoro timer and study time"], "tools", "odak pomodoro sayaç"],
    ["hesap", "calc", "nav.calc", ["Bilimsel hesap makinesi", "Scientific calculator"], "tools", "hesap makinesi"],
    ["sinif-modu", "scan", ["Sınıf Modu", "Class Mode"], ["İnternetsiz QR ödev dağıt, sonuçları QR ile topla", "Offline QR assignments and result collection"], "tools", "sınıf modu qr ödev offline çevrimdışı öğretmen sonuç"],
    ["sinif", "grad", "nav.class", ["Öğretmen için anonim sınıf özeti", "Anonymous class overview for teachers"], "tools", "sınıf öğretmen"],
    ["hakkinda", "info", "nav.about", ["Proje, gizlilik, kaynakça ve lisanslar", "Project, privacy, references, licences"], "tools", "hakkında kaynakça lisans"]
  ];
  const GROUPS = { start: ["Başla", "Start"], study: ["Çalış", "Study"], practice: ["Pratik", "Practice"], track: ["Takip", "Track"], tools: ["Araçlar", "Tools"] };
  const title = (x) => (Array.isArray(x[2]) ? T(x[2][0], x[2][1]) : App.t(x[2]));
  const desc = (x) => T(x[3][0], x[3][1]);
  const byRoute = (r) => TOOLS.find((x) => x[0] === r);
  const norm = (s) => (App.nav && App.nav.norm ? App.nav.norm(s) : String(s).toLowerCase());

  const pins = () => (App.prefs.get("pinnedTools", []) || []).filter((r) => byRoute(r));
  const recents = () => (App.prefs.get("recentTools", []) || []).filter((r) => byRoute(r));
  function togglePin(r) {
    let p = pins();
    if (p.indexOf(r) >= 0) p = p.filter((x) => x !== r);
    else { p.push(r); if (p.length > MAX_PINS) p = p.slice(-MAX_PINS); }
    App.prefs.set("pinnedTools", p);
    paintSidebar();
    return p.indexOf(r) >= 0;
  }

  /* ---------------- Sol menüdeki "Sabitlenenler" ---------------- */
  function paintSidebar() {
    const box = document.getElementById("navPins"), body = document.getElementById("ng-pins");
    if (!box || !body) return;
    const p = pins();
    box.hidden = !p.length;
    body.innerHTML = p.map((r) => { const x = byRoute(r); return '<a class="nav__item" href="#/' + x[0] + '" data-route="' + x[0] + '"><span data-icon="' + x[1] + '"></span><span class="sidebar__label">' + esc(title(x)) + "</span></a>"; }).join("");
    App.hydrateIcons(body);
    body.querySelectorAll(".nav__item").forEach((a) => { a.title = a.textContent.trim(); });
    if (App.router.syncNav) App.router.syncNav();
  }

  /** Asistan açılışı için kısayol şeridi (sabitlenenler, yoksa son kullanılanlar) */
  function homeStripHtml() {
    // Sabitlenenler, yoksa son kullanılanlar; ikisi de yoksa temel kısayollar (sade açılış)
    let list = pins().length ? pins() : recents().filter((r) => r !== "" && r !== "bugun").slice(0, 4);
    if (!list.length) list = ["konular", "yazili", "lab", "kure"];
    list = list.filter((r) => byRoute(r)).slice(0, 5);
    return '<nav class="home-pins" aria-label="' + esc(pins().length ? T("Sabitlenenler", "Pinned") : T("Son kullanılanlar", "Recent")) + '">' +
      list.map((r) => { const x = byRoute(r); return '<a href="#/' + x[0] + '">' + App.icon(x[1]) + "<span>" + esc(title(x)) + "</span></a>"; }).join("") +
      '<a href="#/araclar" class="home-pins__all">' + App.icon("widget") + "<span>" + esc(T("Tümü", "All")) + "</span></a></nav>";
  }

  /* ---------------- Son kullanılanlar ---------------- */
  window.addEventListener("da:route", (e) => {
    const r = e.detail && e.detail.name;
    if (r == null || r === "araclar" || !byRoute(r) || r === "") return;
    const list = [r].concat(recents().filter((x) => x !== r)).slice(0, MAX_RECENT);
    App.prefs.set("recentTools", list);
  });

  /* ---------------- Sayfa ---------------- */
  function tile(x, pinned) {
    return '<div class="hub-tile" data-r="' + esc(x[0]) + '" data-q="' + esc(norm(title(x) + " " + desc(x) + " " + x[5])) + '">' +
      '<a class="hub-tile__link" href="#/' + x[0] + '"><span class="hub-tile__ico">' + App.icon(x[1]) + '</span><span class="hub-tile__txt"><b>' + esc(title(x)) + "</b><small>" + esc(desc(x)) + "</small></span></a>" +
      '<button type="button" class="hub-pin' + (pinned ? " is-on" : "") + '" data-pin="' + esc(x[0]) + '" aria-pressed="' + pinned + '" aria-label="' + esc((pinned ? T("Sabitlemeyi kaldır: ", "Unpin: ") : T("Sabitle: ", "Pin: ")) + title(x)) + '">' + App.icon("star") + "</button></div>";
  }
  function render(view) {
    App.setTitle(T("Tüm araçlar", "All tools"));
    const p = pins(), rc = recents();
    view.innerHTML = '<div class="page hub">' +
      '<div class="page-head"><div><h1>' + esc(T("Tüm araçlar", "All tools")) + "</h1><p>" +
        esc(T("Aradığını yaz ya da gruptan seç. Yıldızla sabitlediklerin yan menünün üstünde görünür.", "Search or pick from a group. Starred tools appear at the top of the sidebar.")) + "</p></div></div>" +
      '<div class="hub-search"><span aria-hidden="true">' + App.icon("search") + '</span><input type="search" id="hubQ" autocomplete="off" placeholder="' + esc(T("Araç ara: harita, deney, paragraf…", "Search: map, lab, reading…")) + '" aria-label="' + esc(T("Araç ara", "Search tools")) + '" aria-describedby="hubCount"><span class="hint" id="hubCount" aria-live="polite"></span></div>' +
      (rc.length ? '<section class="hub-sec" data-sec="recent"><h2>' + esc(T("Son kullanılanlar", "Recently used")) + '</h2><div class="hub-recent">' +
        rc.map((r) => { const x = byRoute(r); return '<a href="#/' + x[0] + '">' + App.icon(x[1]) + "<span>" + esc(title(x)) + "</span></a>"; }).join("") + "</div></section>" : "") +
      Object.keys(GROUPS).map((g) => '<section class="hub-sec" data-sec="' + g + '"><h2>' + esc(T(GROUPS[g][0], GROUPS[g][1])) + '</h2><div class="hub-grid">' +
        TOOLS.filter((x) => x[4] === g).map((x) => tile(x, p.indexOf(x[0]) >= 0)).join("") + "</div></section>").join("") +
      '<p class="hub-none" id="hubNone" hidden>' + esc(T("Eşleşen araç yok. Ctrl+K ile konu ve sohbetlerde de arayabilirsin.", "No matching tool. Use Ctrl+K to search lessons and chats too.")) + "</p>" +
      '<section class="card hub-tips"><h2>' + App.icon("info") + esc(T("Kısayollar ve erişilebilirlik", "Shortcuts & accessibility")) + "</h2><ul>" +
        "<li><kbd>Ctrl</kbd> + <kbd>K</kbd> " + esc(T("ya da", "or")) + " <kbd>/</kbd> — " + esc(T("her şeyi ara (konular, sayfalar, sohbetler)", "search everything")) + "</li>" +
        "<li><kbd>Tab</kbd> — " + esc(T("sayfadaki öğeler arasında gezin; ilk Tab \"İçeriğe geç\" bağlantısını gösterir", "move between items; the first Tab shows \"Skip to content\"")) + "</li>" +
        "<li>" + esc(T("Üst çubuktaki erişilebilirlik düğmesinden yazı boyutu, yüksek karşıtlık, disleksi yazı tipi ve sesli okuma ayarlanır.", "The accessibility button in the top bar sets text size, high contrast, dyslexia font and read-aloud.")) + "</li>" +
      "</ul></section>" +
      "</div>";
    App.hydrateIcons(view);
    const q = view.querySelector("#hubQ"), count = view.querySelector("#hubCount");
    const filter = () => {
      const v = norm(q.value), words = v.split(" ").filter(Boolean);
      let n = 0;
      view.querySelectorAll(".hub-tile").forEach((tEl) => { const ok = !words.length || words.every((w) => tEl.dataset.q.indexOf(w) >= 0); tEl.hidden = !ok; if (ok) n++; });
      view.querySelectorAll(".hub-sec").forEach((sec) => { sec.hidden = sec.dataset.sec === "recent" ? !!words.length : !sec.querySelector(".hub-tile:not([hidden])"); });
      view.querySelector("#hubNone").hidden = n > 0;
      count.textContent = words.length ? T(n + " araç", n + " tools") : "";
    };
    q.addEventListener("input", filter);
    q.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const f = view.querySelector(".hub-tile:not([hidden]) .hub-tile__link"); if (f) { e.preventDefault(); location.hash = f.getAttribute("href"); } }
      else if (e.key === "Escape") { q.value = ""; filter(); }
    });
    view.querySelectorAll("[data-pin]").forEach((b) => b.addEventListener("click", () => {
      const r = b.dataset.pin, on = togglePin(r), x = byRoute(r);
      b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", (on ? T("Sabitlemeyi kaldır: ", "Unpin: ") : T("Sabitle: ", "Pin: ")) + title(x));
      App.ui.toast(on ? T(title(x) + " menüye sabitlendi", title(x) + " pinned") : T("Sabitleme kaldırıldı", "Unpinned"));
    }));
    if (window.matchMedia && window.matchMedia("(min-width: 900px)").matches) q.focus();
  }

  App.router.register("araclar", render);
  App.hub = { TOOLS, pins, recents, togglePin, paintSidebar, homeStripHtml };
  // Menü hazır olunca sabitlenenleri çiz; dil değişince yeniden
  setTimeout(paintSidebar, 0);
  if (App.i18n && App.i18n.onChange) App.i18n.onChange(paintSidebar);
})();
