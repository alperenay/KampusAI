/* Shared, contextual orientation for every registered tool. No AI or data writes. */
(function () {
  const { esc } = App.utils, T = (tr, en) => App.i18n.lang === 'en' ? en : tr;
  const GUIDE = {
    bugun: ["Önce önerilen görevi aç. Sonra bekleyen tekrarları tamamla; programını bu ekrandan izle.", "Open the suggested task, complete due reviews, then check your plan.", "tekrar", "program"],
    program: ["Hazır programı incele veya kendi haftanı oluştur. Ders bloklarını günlük zamanına göre düzenle.", "Explore a preset or build your week. Adjust blocks to your available time.", "bugun", "odak"],
    konular: ["Sınıfını ve dersini seç. Konuyu oku, ardından test, kart veya kendi sözlerinle anlatma etkinliğine geç.", "Choose a grade and subject. Read a lesson, then try a quiz, flashcards or self-explanation.", "aktarim", "kartlar"],
    test: ["Cevabını, gerekçeni ve eminlik düzeyini belirt. İpucu kullandığında bu bilgi puanlamada ayrı izlenir.", "Enter an answer, a reason and your confidence. Hint use is recorded separately.", "yanlislar", "aktarim"],
    aktarim: ["Bir kavram seç. Aynı bilgiyi denklem, grafik/tablo ve günlük yaşam bağlamında kullan. Sonuçlar bu üç göreve özeldir.", "Choose a concept and apply it to equations, visual data and everyday contexts. Results describe these three tasks.", "hata-avcisi", "konular"],
    "hata-avcisi": ["İlk yanlış adımı ve nedenini seç. Sonraki adımlar aynı hatayı sürdürüyor olabilir; düzeltmeyi yanıtından sonra gör.", "Choose the first incorrect step and its reason. Later steps may inherit that mistake. See the correction after answering.", "aktarim", "kontrol"],
    kartlar: ["Deste boşsa bir konu anlatımındaki Desteye ekle düğmesini kullan. Çalışmaya başla ile kartı aç, hatırla, çevir ve kendini değerlendir.", "If the deck is empty, add a topic from its lesson. Start studying, recall, flip and rate your answer.", "konular", "tekrar"],
    tekrar: ["Geciken yanlışları, kartları ve düzeltmeleri tek listede çalış. Her satırdaki çalış veya tekrar et eylemini kullan.", "Review overdue mistakes, cards and corrections. Use the study or review action on each row.", "yanlislar", "kartlar"],
    yanlislar: ["Bir yanlışın açıklamasını aç, hatanın türünü incele ve yeniden çöz. Filtrelerle yalnız bekleyenleri görebilirsin.", "Open a mistake, review its cause and try again. Filters show only due items.", "tekrar", "hata-avcisi"],
    arastirma: ["Öğretmen incelemesinden geçmiş soru bankasıyla oturum oluştur. QR ile katıl ve sonuçları karşılaştır; araştırma kayıtları ayrı tutulur.", "Create a session using a teacher-reviewed bank. Join via QR and compare results; research records stay separate.", "sinif-modu", "degerlendirme"],
    "sinif-modu": ["Öğretmen ödev hazırlar ve QR paylaşır. Öğrenci çözer, sonuç QR'sini geri verir. Kamera yoksa aktarım kodunu yapıştır.", "Teachers share assignments by QR. Students solve and return result QR codes. Paste transfer codes if a camera is unavailable.", "sinif", "degerlendirme"],
    sinif: ["Öğrenci aktarım kodlarını içeri al ve sınıfın konu bazındaki özetini incele. Kimlik ve paylaşım izinlerini önceden netleştir.", "Import student transfer codes and inspect topic summaries. Clarify identification and sharing permissions first.", "sinif-modu", "degerlendirme"],
    degerlendirme: ["Gerekçe isteğini al, üç ölçütle değerlendir ve geri bildirim kodunu öğrenciye ilet.", "Import a reasoning request, apply the three rubric criteria and return feedback to the student.", "sinif-modu", "arastirma"],
    denemeler: ["Yeni deneme ekle; doğru, yanlış ve boşları kontrol et. Net grafiğini birden fazla denemeyle izle.", "Add an exam and check correct, wrong and blank counts. Follow trends across multiple exams.", "puan", "karne"],
    karne: ["Haftanı seç, süre ve konu özetini incele. Yazdır / PDF ile tek sayfalık kopya al; paylaşmadan önce içeriği kontrol et.", "Choose a week and inspect time and topic summaries. Print a one-page report and review it before sharing.", "rapor", "harita"],
    odak: ["Çalışma süresini seçip sayacı başlat. Ara ver ve biten oturumları gelişim ekranında izle.", "Choose a duration, start the timer, take breaks and review completed sessions.", "program", "rapor"],
    lab: ["Bir deney seç, parametreleri değiştir ve sonucu gözlemle. Kamera veya el takibi isteğe bağlıdır; ekran kontrolleriyle de çalışabilirsin.", "Choose a lab, change parameters and observe. Camera and hand tracking are optional; screen controls are also available.", "formuller", "aktarim"],
    kontrol: ["Kendi çözümünü yaz veya görsel ekle. Gelen adım değerlendirmesini kontrol et; yapay zekâ sonucu kesin doğruluk garantisi değildir.", "Enter your solution or attach an image. Review step feedback; AI output is not guaranteed correct.", "hata-avcisi", "konular"],
    formuller: ["Ders veya anahtar sözcükle ara. Formülün hangi koşullarda kullanılacağını oku ve ilgili konuya geç.", "Search by subject or keyword. Read when a formula applies, then open its lesson.", "aktarim", "konular"],
    harita: ["Kazanım durumlarını incele. Çalışılmamış konuyla düşük test başarısını birbirinden ayır; ilgili konu veya testi aç.", "Inspect outcome states. Distinguish unstudied topics from low scores, then open a lesson or quiz.", "kok", "konular"],
    kok: ["Zorlandığın konuyu seç ve ön koşul önerilerini incele. Bunlar çalışma önerisidir; kesin bir teşhis değildir.", "Select a weak topic and inspect prerequisite suggestions. These are study recommendations, not diagnoses.", "konular", "aktarim"],
    yazili: ["Sınıf, ders ve kapsamı seçip sınav hazırla. Soruları, cevap anahtarını ve puanlama ölçütlerini kullanmadan önce incele.", "Choose grade, subject and scope. Review questions, answer keys and rubrics before use.", "konular", "degerlendirme"],
    video: ["Video veya transkript ekle. Üretilen notların kaynak videoyla uyuştuğunu kontrol et, sonra kart ve testleri kullan.", "Add a video or transcript. Verify generated notes against the source, then use cards and quizzes.", "kartlar", "konular"],
    podcast: ["Konu seçip sesli çalışma içeriği hazırla. Dinlerken duraklat, not al ve sorularla kendini kontrol et.", "Choose a topic for audio study. Pause, take notes and check your understanding.", "konular", "kartlar"],
    canli: ["Kamera izni ver, soruyu net ve kişisel bilgi görünmeyecek biçimde kadraja al. AI yanıtını kaynakla karşılaştır.", "Allow the camera and frame the question clearly without personal information. Check AI output against a source.", "kontrol", "konular"],
    cevre: ["Bir fizik sahnesi ekle. Modelin çıkardığı varsayımları ve birimleri kontrol ederek deneyle karşılaştır.", "Add a physics scene. Check assumptions and units before comparing it with a lab.", "lab", "aktarim"],
    kavram: ["Bir kavram seç ve soru sor. Canlandırma bir anlatım aracıdır; yanıtların bilimsel kaynaklarla tutarlı olduğunu kontrol et.", "Choose a concept and ask a question. The character is an explanation aid; check scientific accuracy.", "konular", "modeller"],
    konusma: ["Bir konuşma konusu seç. Mikrofon izniyle pratik yap veya metin alanını kullan; geri bildirimle yeniden dene.", "Choose a speaking topic. Use the microphone or text fallback, then retry after feedback.", "konular", "sesli"],
    sesli: ["Yapay zekâ sağlayıcını ayarla ve mikrofon iznini kontrol et. Ses kullanılamıyorsa yazılı asistana geç.", "Configure your AI provider and microphone. Use text chat when voice is unavailable.", "", "konular"],
    modeller: ["Bir model seç, döndür ve etiketlerini incele. 3B/AR için cihaz desteği gerekir; mevcut ekran kontrollerini kullanabilirsin.", "Choose a model, rotate it and inspect labels. AR requires device support; screen controls are available.", "lab", "konular"],
    kure: ["Küreyi çevir, bir katman seç ve açıklamaları incele. Yakınlaştırma için ekrandaki kontrolleri kullan.", "Rotate the globe, choose a layer and inspect its information. Use on-screen zoom controls.", "atlas", "konular"],
    atlas: ["Türkiye veya dünya haritasını seç. Yerleri keşfet, ardından sınama etkinliğiyle hatırladıklarını kontrol et.", "Choose Turkey or the world. Explore locations, then test your recall.", "kure", "konular"],
    zaman: ["Bir dönem veya olay seç; zaman, yer ve bağlantıları incele. Ardından kısa sınamayla kendini kontrol et.", "Choose a period or event. Explore dates, places and connections, then test yourself.", "atlas", "konular"],
    paragraf: ["Bir metin seç ve süreli çalışmayı başlat. Hızla birlikte doğru yanıt oranını da izle.", "Choose a text and start timed practice. Track accuracy alongside reading speed.", "denemeler", "odak"],
    oyunlar: ["Dersine uygun kısa bir oyun seç. Oyundaki sonucu ilgili konu anlatımı ve sorularla pekiştir.", "Choose a short subject game. Reinforce it with lessons and questions.", "konular", "aktarim"],
    yolculuk: ["Müfredat haritasından bir görev seç. Puanlar katılımı gösterir; öğrenmeyi ayrıca sorularla kontrol et.", "Choose a curriculum quest. Points reflect participation; check learning separately with questions.", "harita", "aktarim"],
    simulasyon: ["Kapsam ve süreyi seçip mini denemeyi başlat. Bitince yanlışlarını incele ve tekrar planına dön.", "Choose scope and time, take a mini exam, then review mistakes and plan practice.", "yanlislar", "denemeler"],
    puan: ["Deneme sonuçlarını ve hedefini kontrol et. Gösterilen puan ve sıralamalar tahmindir, yerleştirme garantisi değildir.", "Check exam results and goals. Scores and ranks are estimates, not admissions guarantees.", "tercih", "denemeler"],
    tercih: ["Filtrelerle bölümleri daralt. Verinin yılını kontrol et; kesin tercih kararından önce güncel resmî kılavuza bak.", "Filter programmes, check the data year and consult current official guidance before a final choice.", "kariyer", "puan"],
    kariyer: ["İlgi sorularını yanıtla ve meslekleri keşfet. Önerileri bir başlangıç olarak gör; rehber öğretmeninle değerlendir.", "Answer interest questions and explore careers. Treat suggestions as a starting point and discuss with a counsellor.", "tercih", "puan"],
    rapor: ["Haftalık çalışmanı, süreyi ve konu durumunu incele. Eksik kayıt varsa önce ilgili test veya oturumunu ekle.", "Inspect weekly study, time and topics. Add missing exams or sessions in their original tools.", "karne", "bugun"],
    hesap: ["İfadeni yaz ve parantezleri kontrol et. Sonucu çözümün bağlamı ve birimleriyle birlikte değerlendir.", "Enter an expression and check parentheses. Interpret the result with context and units.", "formuller", "konular"],
    anlat: ["Konuyu kendi sözlerinle açıkla; sonra geri bildirimi inceleyip eksik bölümü yeniden anlat.", "Explain the topic in your own words, review feedback and retry missing parts.", "konular", "aktarim"],
    hakkinda: ["Gizlilik, lisanslar ve kaynakları buradan incele. Uygulama sürümünü sorun bildirirken ekle.", "Review privacy, licences and sources. Include the app version in bug reports.", "araclar", "rehber"],
    geribildirim: ["Bildirilen yanıtları ve düzeltmelerini incele. Bir bildirimin olması, içeriğin otomatik doğrulandığı anlamına gelmez.", "Review reported answers and corrections. Reporting does not automatically validate content.", "tekrar", "hakkinda"]
  };
  function paint() {
    const r = App.router.current(), view = document.querySelector('#view'), page = view && view.querySelector('.page');
    if (!page || !r.name || r.name === 'rehber' || page.querySelector('.page-guide')) return;
    const tool = App.hub && App.hub.TOOLS.find((x) => x[0] === r.name), info = GUIDE[r.name];
    if (!tool && !info) return;
    const title = tool ? Array.isArray(tool[2]) ? T.apply(null, tool[2]) : App.t(tool[2]) : document.title.split(' — ')[0];
    const text = info ? T(info[0], info[1]) : tool ? T.apply(null, tool[3]) : '';
    const box = document.createElement('div'); box.className = 'page-guide';
    const related = info ? info.slice(2) : ['araclar'];
    box.innerHTML = '<nav aria-label="' + esc(T('Sayfa yolu', 'Breadcrumb')) + '"><a href="#/araclar">' + esc(T('Tüm özellikler', 'All features')) + '</a><span aria-hidden="true"> / </span><span>' + esc(title) + '</span></nav><details><summary>' + esc(T('Bu ekranı nasıl kullanırım?', 'How do I use this page?')) + '</summary><p>' + esc(text) + '</p><div class="guide-links">' + related.map((id) => { const x = App.hub.TOOLS.find((x) => x[0] === id), label = x ? Array.isArray(x[2]) ? T.apply(null, x[2]) : App.t(x[2]) : T('Kullanım rehberi', 'User guide'); return '<a href="#/' + esc(id) + '">' + esc(label) + ' →</a>'; }).join('') + '</div></details>';
    // The desktop lesson page is a two-column grid: main content + sticky outline.
    // A third direct child would take the main column and squeeze the lesson into the outline.
    const host = Array.from(page.children).find(el => el.classList.contains('lesson-main')) || page;
    host.insertBefore(box, host.firstChild);
  }
  function render(view) {
    App.setTitle(T('Kullanım Rehberi', 'User Guide'));
    view.innerHTML = '<div class="page guide-page"><div class="page-head"><div><h1>' + esc(T('KampüsAI Kullanım Rehberi', 'KampüsAI User Guide')) + '</h1><p>' + esc(T('Nereden başlayacağını seç. Tur seni gerçek ekranlara götürür; istediğin an çıkabilirsin.', 'Choose a starting point. The tour uses real screens and can be closed at any time.')) + '</p></div></div><section class="card guide-start"><h2>' + esc(T('İlk gün için dört adım', 'Four steps for your first day')) + '</h2><ol><li>' + esc(T('Bugün ekranından ilk görevini seç.', 'Choose your first task on Today.')) + '</li><li>' + esc(T('Bir konu anlatımını oku, ardından kendini sına.', 'Read a lesson, then test yourself.')) + '</li><li>' + esc(T('Kart ve yanlışlarını tekrar listesine al.', 'Review your cards and mistakes.')) + '</li><li>' + esc(T('İlerlemeyi izle, verilerini yedekle.', 'Track progress and back up your data.')) + '</li></ol><a class="btn btn--primary" href="#/bugun">' + esc(T('İlk görevime git', 'Go to my first task')) + '</a></section><div class="guide-chapters">' + App.tour.sections.map((g) => '<section class="card"><h2>' + esc(T(g.tr, g.en)) + '</h2><p>' + esc(T(g.descTr, g.descEn)) + '</p><button class="btn btn--ghost" type="button" data-guide-step="' + g.step + '">' + esc(T('Bu bölümü gez', 'Tour this section')) + '</button></section>').join('') + '</div><section class="card"><h2>' + esc(T('İnternet ve cihaz gereksinimleri', 'Internet and device requirements')) + '</h2><p>' + esc(T('Yeni pratikler, kayıtlı konular, kartlar ve yerel kayıtlar çevrimdışı kullanılabilir. AI üretimi için ayarlanmış bir sağlayıcı veya desteklenen yerel model gerekir. Kamera, mikrofon ve AR cihaz izni/desteğine bağlıdır.', 'New practice activities, saved lessons, cards and local records work offline. AI generation requires a configured provider or supported local model. Camera, microphone and AR depend on device permissions and support.')) + '</p><button class="btn btn--primary" type="button" id="guideFullTour">' + esc(T('Tüm tanıtımı başlat', 'Start the full tour')) + '</button></section></div>';
    view.querySelectorAll('[data-guide-step]').forEach((b) => b.addEventListener('click', () => App.tour.start(Number(b.dataset.guideStep))));
    view.querySelector('#guideFullTour').onclick = () => App.tour.start(0);
  }
  window.addEventListener('da:route', paint);
  // Some existing tools replace their root after lazy data loads or filter changes.
  // Observe only root replacement, not the frequent SVG/canvas/control updates within a page.
  const root = document.querySelector('#view');
  if (root) new MutationObserver(paint).observe(root, { childList: true });
  App.router.register("rehber", render);
  App.pageGuide = { paint, entries: GUIDE };
})();
