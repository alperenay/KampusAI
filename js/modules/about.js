/* =========================================================
   about.js — Hakkında sayfası (#/hakkinda) ve kaynakça (#/hakkinda/kaynakca)

   Bölümler: proje, özellikler, yapay zekâ nasıl çalışır, gizlilik, sürüm geçmişi,
   kaynakça (konu başlıklarına göre) ve açık kaynak lisansları.
   Ayarlar → Hakkında düğmesi de bu sayfayı açar (App.modules.about.open).
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const t = App.t;
  const T = (tr, en) => (App.i18n.lang === "en" ? en : tr);

  /* [ad, ne işe yarar (çeviri anahtarı), lisans, adres] */
  const LISANSLAR = [
    ["Gemma 4 E4B / E2B (Google DeepMind)", "abt.lic.gemma", "Apache 2.0", "https://huggingface.co/google/gemma-4-E4B-it"],
    ["bge-m3 (BAAI)", "abt.lic.bge", "MIT", "https://huggingface.co/BAAI/bge-m3"],
    ["llama.cpp (ggml-org)", "abt.lic.llama", "MIT", "https://github.com/ggml-org/llama.cpp"],
    ["Google Gemini API", "abt.lic.gemini", "abt.lic.terms", "https://ai.google.dev/gemini-api/terms"],
    ["KaTeX", "abt.lic.katex", "MIT", "https://katex.org"],
    ["qrcode-generator", "abt.lic.qr", "MIT", "https://github.com/kazuhikoarase/qrcode-generator"],
    ["jsQR", "abt.lic.jsqr", "Apache 2.0", "https://github.com/cozmo/jsQR"],
    ["OpenDyslexic", "abt.lic.font", "SIL OFL 1.1", "https://opendyslexic.org"],
    ["Electron", "abt.lic.electron", "MIT", "https://www.electronjs.org"],
    ["Capacitor", "abt.lic.capacitor", "MIT", "https://capacitorjs.com"]
  ];

  /* Kaynakça (APA biçimine yakın), konu başlıklarına göre gruplu: [grup, [[metin, adres], …]] */
  const KAYNAKCA = () => [
    [T("Müfredat ve sınav", "Curriculum and exam"), [
      ["Millî Eğitim Bakanlığı. (2018). Ortaöğretim dersleri öğretim programları (9–12. sınıf). Talim ve Terbiye Kurulu Başkanlığı.", "https://mufredat.meb.gov.tr"],
      ["Millî Eğitim Bakanlığı. (2018). Ortaöğretim İngilizce dersi (9–12. sınıflar) öğretim programı.", "https://mufredat.meb.gov.tr"],
      ["Ölçme, Seçme ve Yerleştirme Merkezi (ÖSYM). Yükseköğretim Kurumları Sınavı (YKS) kılavuzu ve puan hesaplama esasları.", "https://www.osym.gov.tr"],
      ["Yükseköğretim Kurulu. YÖK Atlas: yükseköğretim programlarının taban puanları ve başarı sıraları.", "https://yokatlas.yok.gov.tr"]
    ]],
    [T("Konu anlatımlarında kullanılan veriler", "Data used in the lessons"), [
      ["Proje ekibinin derlediği 9–12. sınıf ders notları ve 12. sınıf ek not paketi (İngilizce tema kazanımları, Coğrafya konu özetleri, Biyoloji ders notu). Metinler kopyalanmadı; konu başlıkları temel alınarak yeniden yazıldı.", ""],
      ["Türkiye İstatistik Kurumu (TÜİK). (2024). Doğum istatistikleri, 2023 ve Adrese Dayalı Nüfus Kayıt Sistemi sonuçları.", "https://data.tuik.gov.tr"],
      ["Meteoroloji Genel Müdürlüğü (MGM). Türkiye'de ölçülen ekstrem değerler.", "https://www.mgm.gov.tr"],
      ["World Meteorological Organization (WMO). Weather and climate extremes archive.", "https://wmo.asu.edu"],
      ["IPCC. (2023). Climate Change 2023: Synthesis Report (AR6). Intergovernmental Panel on Climate Change.", "https://www.ipcc.ch/report/ar6/syr/"],
      ["United Nations, DESA Population Division. (2024). World Population Prospects 2024.", "https://population.un.org/wpp/"],
      ["5977 sayılı Biyogüvenlik Kanunu. (2010). Resmî Gazete, 27533.", "https://www.mevzuat.gov.tr"],
      ["UNESCO Dünya Mirası Merkezi. Türkiye'deki Dünya Mirası alanları.", "https://whc.unesco.org/en/statesparties/tr"]
    ]],
    [T("Öğrenme yöntemleri", "Learning methods"), [
      ["Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380. (Yanlış defterindeki aralıklı tekrar)", "https://doi.org/10.1037/0033-2909.132.3.354"],
      ["Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255. (Konu sonu testleri)", "https://doi.org/10.1111/j.1467-9280.2006.01693.x"],
      ["Chi, M. T. H., De Leeuw, N., Chiu, M.-H., & LaVancher, C. (1994). Eliciting self-explanations improves understanding. Cognitive Science, 18(3), 439–477. (Feynman modu)", "https://doi.org/10.1207/s15516709cog1803_3"],
      ["Ebbinghaus, H. (1885/1913). Memory: A contribution to experimental psychology. Teachers College, Columbia University. (Unutma eğrisi)", "https://psychclassics.yorku.ca/Ebbinghaus/index.htm"],
      ["Murre, J. M. J., & Dros, J. (2015). Replication and analysis of Ebbinghaus' forgetting curve. PLoS ONE, 10(7), e0120644. (Unutma eğrisi)", "https://doi.org/10.1371/journal.pone.0120644"],
      ["Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? A literature review of empirical studies on gamification. HICSS 2014. (Seri ve rozetler)", "https://doi.org/10.1109/HICSS.2014.377"],
      ["Cirillo, F. (2018). The Pomodoro Technique. Currency. (Odak sayacı)", "https://www.pomodorotechnique.com"]
    ]],
    [T("Yapay zekâ", "Artificial intelligence"), [
      ["Google DeepMind. (2026). Gemma 4 model ailesi ve model kartı.", "https://ai.google.dev/gemma"],
      ["Lewis, P. vd. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. NeurIPS 2020. (RAG: asistanın notlardan cevap vermesi)", "https://arxiv.org/abs/2005.11401"],
      ["Chen, J. vd. (2024). BGE M3-Embedding: Multi-lingual, multi-functionality, multi-granularity text embeddings.", "https://arxiv.org/abs/2402.03216"],
      ["Hu, E. J. vd. (2021). LoRA: Low-rank adaptation of large language models.", "https://arxiv.org/abs/2106.09685"],
      ["Dettmers, T. vd. (2023). QLoRA: Efficient finetuning of quantized LLMs. NeurIPS 2023.", "https://arxiv.org/abs/2305.14314"],
      ["Zelikman, E. vd. (2022). STaR: Bootstrapping reasoning with reasoning. NeurIPS 2022.", "https://arxiv.org/abs/2203.14465"],
      ["ggml-org. llama.cpp: yapay zekâ modellerini cihazda çalıştırma.", "https://github.com/ggml-org/llama.cpp"],
      ["Unsloth AI. Unsloth: hızlı ve az bellekli ince ayar.", "https://github.com/unslothai/unsloth"],
      ["W3C Community Group. Web Speech API (ses tanıma ve sesli okuma; Sesli öğretmen).", "https://webaudio.github.io/web-speech-api/"]
    ]]
  ];

  /* Son sürümler (yeniden eskiye) */
  const SURUMLER = () => [
    ["1.19.0", T("Deney Laboratuvarı 67 deneye çıktı: 9–12. sınıf fizik, kimya ve biyoloji (sıvı basıncı, kaldırma kuvveti, devreler, çarpışma, fotoelektrik, gaz yasaları, pH ve titrasyon, kimyasal denge, piller, enzimler, osmoz, fotosentez, DNA ve mutasyonlar…); derse, sınıfa ve üniteye göre sınıflandırma, arama, favoriler, her deneyde görevler. Yeni Oyunlar sekmesi: Doğru mu Yanlış mı, Kavram Eşleştirme, 60 Saniye İşlem, Grafik Tahmini, Hedef Atış, Denklem Denkleştirme, Periyodik Tablo, Tarih Şeridi, Kelime Kaydırma.", "Lab grows to 67 experiments across physics, chemistry and biology with filters, search, favourites and tasks. New Games tab with nine subject games.")],
    ["1.18.0", T("Ders renkleri ve simgeleri; Konu Anlatımı tek sayfada (sınıf sekmeleri + dersler, sıradaki kazanım); ders sayfasında \"Kaldığın yerden devam et\" ve konuların Zayıf/Orta/Güçlü etiketleri; konu sayfasında \"Bu sayfada\" şeridi, geniş ekranda sağda yapışkan içindekiler ve kısayollar.", "Subject colours and icons; one-page topic browser with grade tabs and next outcome; continue button and mastery tags on subject pages; on-page contents and sticky side panel on lesson pages.")],
    ["1.17.0", T("Daha düzenli menü ve üst çubuk: menü Çalış, Takip ve Araçlar gruplarına ayrıldı (açılıp kapanır, kapalı grupta bekleyen iş noktayla görünür); tema, dil ve yedek tek bir panelde; Ctrl+K ya da \"/\" ile her şeyi arama (konular, sayfalar, eylemler, sohbetler); telefonda üst çubuk artık taşmıyor, sayfa adı görünüyor; asistan açılışında Bugün özeti.", "Tidier menu and top bar: grouped menu, one panel for theme/language/backup, Ctrl+K search for everything, no top bar overflow on phones, Today summary on the assistant home.")],
    ["1.16.0", T("Hap Kartları: konu anlatımlarındaki hap bilgiler ve örnekler aralıklı tekrarla sorulan kartlara dönüşür, sonuçlar unutma eğrisine ve Bugün planına katılır. Deney Laboratuvarı: atış, sarkaç, yay, dalga, girişim, mercek, fonksiyon grafikleri ve birim çember için kaydırıcılı deneyler; ilgili konu sayfalarında da var.", "Flashcards from lesson key facts with spaced repetition; interactive lab with sliders for projectiles, pendulum, spring, waves, interference, lenses, function graphs and the unit circle.")],
    ["1.15.0", T("Telefonda tek elle kullanım: alt sekme çubuğu (Asistan, Bugün, Konular, Denemeler, Menü); Sesli öğretmende Bitir, Gönder/Sustur ve Duraklat düğmeleri alta taşındı, geri tuşu kapatır; pencereler alttan açılır ve aşağı çekince kapanır; konu sayfasında alt kısayol çubuğu; deneme simülasyonunda önceki/sonraki hep altta; bildirimler üstte.", "One-handed phone use: bottom tab bar, voice teacher controls at the bottom, bottom-sheet dialogs, lesson shortcut bar, sticky exam navigation.")],
    ["1.14.1", T("Gizlilik ve KVKK bölümü genişletildi; eşitleme verisini sunucudan silme düğmesi.", "Expanded privacy and KVKK section; button to delete sync data from the server.")],
    ["1.14.0", T("Unutma eğrisi (unutulmaya başlayan konular haritada solar, günlük göreve eklenir), zamanlı deneme simülasyonu, haftalık gelişim raporu, öğretmen için anonim sınıf görünümü.", "Forgetting curve, timed exam simulation, weekly report, anonymous class view for teachers.")],
    ["1.13.3", T("İlk sohbette \"Hafıza güncelleniyor\" beklemesi kaldırıldı: hafıza arka planda hazırlanır, cevap hemen başlar.", "No more waiting for memory indexing on the first chat; it is built in the background.")],
    ["1.13.2", T("Kalıcı imza anahtarıyla Android sürümü; sadeleştirilmiş yapay zekâ ayarları (üç seçenek ve durum satırı, ayrıntılar \"Gelişmiş ayarlar\"da).", "Permanently signed Android build; simpler AI settings.")],
    ["1.13.0", T("Kaynak gösterme ve kontrolü (cevaptaki [K1] etiketleri, \"Notlara dayanıyor\" rozeti); örnek öğrenci verisiyle demo modu.", "Citations and source check ([R1] tags, \"Based on your notes\" badge); demo mode with a sample student.")],
    ["1.12.0", T("12. sınıf İngilizce tema üniteleri; Coğrafya ve Biyoloji genişletmesi (573 kazanım); Hakkında sayfası ve kaynakça.", "Grade 12 English theme units; Geography and Biology extended (573 outcomes); About page and references.")],
    ["1.11.0", T("Öğrenme haritası ve günlük görev, sesli öğretmen, seri ve rozetler.", "Learning map and daily plan, voice teacher, streaks and badges.")],
    ["1.10.0", T("Puan ve hedef bölüm, hesap makinesi, sunucu kota koruması, hafif (E2B) model.", "Score & target, calculator, server quota protection, light (E2B) model.")],
    ["1.9.0", T("Yapay zekâyı Windows ve Android'de tek düğmeyle indirme.", "One-tap AI download on Windows and Android.")],
    ["1.8.0", T("10, 11 ve 12. sınıf konu anlatımları hazır içerik olarak eklendi.", "Grade 10–12 lessons added as built-in content.")]
  ];

  const OZELLIKLER = () => [
    ["book", "konular", T("Konu anlatımları", "Lessons"), T("9–12. sınıf, 11 ders, 573 kazanım; internetsiz", "Grades 9–12, 11 subjects, 573 outcomes; offline")],
    ["map", "harita", T("Öğrenme haritası", "Learning map"), T("Kazanımların renkli durumu ve günlük görev", "Mastery of every outcome and a daily plan")],
    ["chart", "denemeler", T("Deneme takibi", "Exam tracking"), T("TYT–AYT netleri ve hedefler", "TYT–AYT nets and targets")],
    ["target", "puan", T("Puan ve hedef", "Score & target"), T("Tahmini puan ve bölüm önerileri", "Estimated score and suggestions")],
    ["bookmark", "yanlislar", T("Yanlış defteri", "Mistake notebook"), T("Aralıklı tekrar ve hata analizi", "Spaced review and error analysis")],
    ["mic", "", T("Sesli öğretmen", "Voice teacher"), T("Konuşarak sor, sesli cevap al", "Ask by voice, hear the answer")],
    ["sparkle", "", T("Yapay zekâ asistanı", "AI assistant"), T("Fotoğraftan soru çözer, notlarına bakar", "Solves photos, uses your notes")],
    ["timer", "odak", T("Odak sayacı", "Focus timer"), T("Pomodoro ve süre istatistiği", "Pomodoro and time stats")],
    ["quiz", "simulasyon", T("Deneme simülasyonu", "Exam simulation"), T("Zayıf konulardan süreli mini deneme", "Timed mini exam from weak topics")],
    ["note", "rapor", T("Haftalık rapor", "Weekly report"), T("Gelişim özeti, yazdır ya da paylaş", "Progress summary to print or share")],
    ["grad", "sinif", T("Sınıf (öğretmen)", "Class (teacher)"), T("Sınıfın zorlandığı konular, anonim", "Where the class struggles, anonymous")]
  ];

  const link = (url, text) => '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(text) + "</a>";
  const card = (id, icon, title, body) =>
    '<section class="card about-sec" id="' + id + '"><div class="card__title">' + App.icon(icon) + esc(title) + "</div>" + body + "</section>";

  function html() {
    const priv = ["device", "ollama", "cloud", "server", "data", "sync", "class", "rights", "osym", "ai"].map((k) =>
      "<li><b>" + esc(t("abt.priv." + k + "Title")) + "</b> " + esc(t("abt.priv." + k)) + "</li>").join("");
    const lic = LISANSLAR.map(([ad, ne, lisans, url]) =>
      "<li><b>" + link(url, ad) + "</b> — " + esc(t(ne)) + ' <span class="badge">' + esc(lisans.startsWith("abt.") ? t(lisans) : lisans) + "</span></li>").join("");
    let n = 0;
    const ref = KAYNAKCA().map(([grup, list]) =>
      '<h3 class="about-h">' + esc(grup) + '</h3><ol class="about-list" start="' + (n + 1) + '">' +
      list.map(([metin, url]) => { n++; return "<li>" + esc(metin) + (url ? " " + link(url, url.replace(/^https?:\/\//, "")) : "") + "</li>"; }).join("") + "</ol>").join("");
    const feats = OZELLIKLER().map(([ic, route, ad, ne]) =>
      (route ? '<a class="about-feat" href="#/' + route + '">' : '<div class="about-feat">') + App.icon(ic) +
      "<span><b>" + esc(ad) + "</b><small>" + esc(ne) + "</small></span>" + (route ? "</a>" : "</div>")).join("");

    return '<div class="page about-page">' +
      '<div class="page-head"><div><h1>' + esc(t("abt.title")) + "</h1><p>" + esc(t("abt.intro")) + "</p></div>" +
        '<div class="page-head__actions"><a class="btn" href="#/hakkinda/kaynakca">' + App.icon("book") + esc(t("abt.refTitle")) + "</a>" +
        '<button class="btn btn--ghost" type="button" id="abtDemo">' + App.icon("sparkle") + esc(App.prefs.get("demoMode", false) ? T("Demo verisini sil", "Remove demo data") : T("Demo verisi yükle", "Load demo data")) + "</button></div></div>" +

      card("abt-proje", "info", T("Proje", "Project"),
        '<div class="about-hero"><img src="assets/brand/logo.png" alt="KampüsAI" width="72" height="72"><div>' +
        "<p>" + esc(T("KampüsAI, TÜBİTAK proje çalışması olarak lise öğrencileri tarafından geliştirilen ücretsiz ve açık kaynaklı bir YKS çalışma uygulamasıdır. Amacı; müfredatı bilen, öğrenciyi tanıyan ve internetsiz de çalışabilen bir yapay zekâ öğretmenini her öğrenciye ulaştırmaktır.",
          "KampüsAI is a free, open-source YKS study app built by high-school students as a TÜBİTAK project. Its goal is to give every student an AI teacher that knows the curriculum, knows the student and can work offline.")) + "</p>" +
        '<ul class="about-meta">' +
          "<li><b>" + esc(t("set.version")) + "</b> " + esc(App.version || "dev") + "</li>" +
          "<li><b>" + esc(T("Platformlar", "Platforms")) + "</b> Windows · Android · iPhone · " + esc(T("web", "web")) + "</li>" +
          "<li><b>" + esc(T("Kaynak kod", "Source code")) + "</b> " + link("https://github.com/alperenay/ders-asistani", "github.com/alperenay/ders-asistani") + "</li>" +
          "<li><b>" + esc(T("Geri bildirim", "Feedback")) + "</b> " + link("https://github.com/alperenay/ders-asistani/issues", T("GitHub üzerinden bildir", "Report on GitHub")) + "</li>" +
        "</ul></div></div>") +

      card("abt-ozellik", "sparkle", T("Neler yapabilirsin?", "What can you do?"), '<div class="about-feats">' + feats + "</div>") +

      card("abt-yz", "lightbulb", T("Yapay zekâ nasıl çalışır?", "How does the AI work?"),
        '<ul class="about-list">' +
        "<li><b>" + esc(T("İki çalışma yolu:", "Two ways to run:")) + "</b> " + esc(T("Cihaza indirilen Gemma 4 modeli internetsiz çalışır; internet modunda Google Gemini kullanılır. İlk açılışta \"Gizlilik önce\" ya da \"Doğruluk önce\" seçilir, Ayarlar'dan değiştirilebilir.",
          "The downloaded Gemma 4 model works offline; online mode uses Google Gemini. You choose \"Privacy first\" or \"Accuracy first\" on first run and can change it in Settings.")) + "</li>" +
        "<li><b>" + esc(T("Notlardan cevap (RAG):", "Answers from notes (RAG):")) + "</b> " + esc(T("Asistan önce ilgili konu notunu, denemelerini ve yanlışlarını bulur, sonra bunları okuyarak cevap verir; kullandığı notlar cevabın altında görünür.",
          "The assistant first finds the related lesson notes, exams and mistakes, then answers from them; the notes it used are shown under the answer.")) + "</li>" +
        "<li><b>" + esc(T("Kaynak gösterme:", "Citations:")) + "</b> " + esc(T("Cevapta notlardan gelen her bilginin yanında [K1] gibi bir etiket bulunur; etikete dokununca o konu açılır. Cevabın altındaki rozet, cevabın ne kadarının bulunan notlarla örtüştüğünü gösterir; notlarla az örtüşen cevaplarda \"kontrol et\" uyarısı çıkar.",
          "Facts taken from the notes carry a tag like [R1] that opens that lesson. A badge under the answer shows how much of it matches the retrieved notes and warns when it barely does.")) + "</li>" +
        "<li><b>" + esc(T("Ölçerek seçtik:", "Chosen by measuring:")) + "</b> " + esc(T("Kendi eğittiğimiz KampüsAI modellerini, eğitimde hiç görmediği 215 soruyla ve gerçek YKS sorularıyla ölçtük; temel Gemma 4 daha iyi sonuç verdiği için uygulamada o kullanılıyor.",
          "We tested our own fine-tuned models on 215 unseen questions and real YKS questions; base Gemma 4 scored better, so the app uses it.")) + "</li>" +
        "</ul>" + '<p class="hint">' + esc(t("abt.ai")) + "</p>") +

      card("abt-gizlilik", "lock", t("abt.privTitle"), '<ul class="about-list">' + priv + "</ul>") +

      card("abt-surum", "clock", T("Sürüm geçmişi", "Release history"),
        '<ul class="about-list">' + SURUMLER().map(([v, ne]) => "<li><b>" + esc(v) + "</b> — " + esc(ne) + "</li>").join("") + "</ul>") +

      card("kaynakca", "book", t("abt.refTitle"), '<p class="card__sub">' + esc(t("abt.refIntro")) + "</p>" + ref) +

      card("abt-lisans", "layers", t("abt.licTitle"), '<p class="card__sub">' + esc(t("abt.licIntro")) + '</p><ul class="about-list">' + lic + "</ul>") +
      "</div>";
  }

  function render(view, params) {
    view.innerHTML = html();
    App.hydrateIcons(view);
    const db = view.querySelector("#abtDemo");
    if (db && App.demo) db.addEventListener("click", () => App.demo.toggle());
    const target = params && params[0] === "kaynakca" ? view.querySelector("#kaynakca") : null;
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  App.router.register("hakkinda", render);

  /* Ayarlar → Hakkında: artık tam sayfayı açar */
  function open() { App.router.go("hakkinda"); }

  App.modules.about = { open, KAYNAKCA, LISANSLAR };
})();
