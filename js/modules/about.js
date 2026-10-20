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
    ["three.js (r149)", "abt.lic.three", "MIT", "https://github.com/mrdoob/three.js"],
    ["pico.js / pico facefinder (Nenad Markus)", "abt.lic.pico", "MIT", "https://github.com/nenadmarkus/picojs"],
    ["Handtrack.js (Victor Dibia)", "abt.lic.handtrack", "MIT", "https://github.com/victordibia/handtrack.js"],
    ["TensorFlow.js (Google)", "abt.lic.tfjs", "Apache 2.0", "https://github.com/tensorflow/tfjs"],
    ["turkiye-university-programs (cngil)", "abt.lic.tercih", "CC BY 4.0", "https://github.com/cngil/turkiye-university-programs"],
    ["Natural Earth", "abt.lic.ne", "abt.lic.pd", "https://www.naturalearthdata.com"],
    ["PB2002 (Bird, 2003) / fraxen tectonicplates", "abt.lic.pb", "ODC-BY 1.0", "https://github.com/fraxen/tectonicplates"],
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
      ["Yükseköğretim Kurulu. YÖK Atlas: yükseköğretim programlarının taban puanları ve başarı sıraları.", "https://yokatlas.yok.gov.tr"],
      ["Millî Eğitim Bakanlığı. (2024). Türkiye Yüzyılı Maarif Modeli öğretim programları (ortaöğretim 9–12) ve çerçeve yıllık planlar. (Yazılı Sınavlar: temalar ve öğrenme çıktıları)", "https://tymm.meb.gov.tr"],
      ["Millî Eğitim Bakanlığı. (2025). Türkiye Yüzyılı Maarif Modeli'ne yönelik ülke geneli ortak yazılı sınavlar: açık uçlu ve kısa cevaplı yedi soru. (Yazılı Sınavlar: sınav biçimi)", "https://www.meb.gov.tr/turkiye-yuzyili-maarif-modeline-yonelik-ulke-geneli-ilk-ortak-yazili-sinav-tamamlandi/haber/36784/tr"],
      ["Millî Eğitim Bakanlığı. (t.y.). Bağlam temelli soru yazım kılavuzu ve Maarif Modeli'nde süreç odaklı ölçme-değerlendirme. (Yazılı Sınavlar: bağlam temelli sorular)", "https://www.meb.gov.tr/turkiye-yuzyili-maarif-modeli-ile-baglam-temelli-sorular-toplantisi-gerceklesti/haber/40301/tr"],
      ["Millî Eğitim Bakanlığı. Ortaöğretim Kurumları Yönetmeliği (sınavlar ve ölçme-değerlendirme maddeleri).", "https://www.mevzuat.gov.tr"],
      ["Brookhart, S. M. (2013). How to create and use rubrics for formative assessment and grading. ASCD. (Puanlama ölçütleri)", ""],
      ["Black, P., & Wiliam, D. (1998). Assessment and classroom learning. Assessment in Education, 5(1), 7–74. (Kendini değerlendirme ve biçimlendirici değerlendirme)", "https://doi.org/10.1080/0969595980050102"]
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
    [T("Deney Laboratuvarı ve oyunlarda kullanılan veriler", "Data used in the lab and games"), [
      ["Tiesinga, E., Mohr, P. J., Newell, D. B., & Taylor, B. N. (2021). CODATA recommended values of the fundamental physical constants: 2018. Reviews of Modern Physics, 93(2), 025010. (g, h, c, e, k gibi sabitler)", "https://physics.nist.gov/cuu/Constants/"],
      ["Kramida, A., Ralchenko, Yu., Reader, J., & NIST ASD Team. NIST Atomic Spectra Database (iyonlaşma enerjileri, hidrojen spektrumu).", "https://physics.nist.gov/asd"],
      ["Cordero, B. vd. (2008). Covalent radii revisited. Dalton Transactions, (21), 2832–2838. (Periyodik özellikler deneyi ve Periyodik Tablo oyunu)", "https://doi.org/10.1039/B801115J"],
      ["Pauling, L. (1960). The nature of the chemical bond (3. bs.). Cornell University Press. (Elektronegatiflik değerleri)", ""],
      ["Rumble, J. R. (Ed.). CRC Handbook of Chemistry and Physics. CRC Press. (Çözünürlük eğrileri, Ksp, standart elektrot potansiyelleri, öz ısılar)", "https://hbcp.chemnetbase.com"],
      ["IUPAC. (2021). Standard atomic weights of the elements. Commission on Isotopic Abundances and Atomic Weights.", "https://iupac.qmul.ac.uk/AtWt/"],
      ["Natural Earth. 1:10m, 1:50m ve 1:110m kültürel ve fiziki vektör verileri (il ve ülke sınırları, başkentler, akarsular, göller, denizler, dağ ve çöl alanları, zirveler). Kamu malı. (Etkileşimli Harita)", "https://www.naturalearthdata.com"],
      ["Türkiye İstatistik Kurumu (TÜİK). (2025). Adrese Dayalı Nüfus Kayıt Sistemi Sonuçları, 2024. (İl nüfusları)", "https://data.tuik.gov.tr"],
      ["cngil. Türkiye university programs: 2025 lisans ve ön lisans programları ile 2015–2025 YKS yerleştirme istatistikleri (CC BY 4.0). (Tercih Robotu)", "https://github.com/cngil/turkiye-university-programs"],
      ["Yükseköğretim Kurulu. YÖK Atlas: 2024 ve 2025 taban puanları, başarı sıraları ve kontenjanlar (derlemenin kaynağı).", "https://yokatlas.yok.gov.tr"],
      ["ÖSYM. (2025). Yükseköğretim Programları ve Kontenjanları Kılavuzu.", "https://www.osym.gov.tr"],
      ["izcir. Turkish university admissions dataset (2019–2024), MIT lisansı (derlemede 2024 verisinin kaynağı).", "https://github.com/izcir/turkish-university-admissions-dataset"],
      ["MEB Ortaöğretim Tarih ve T.C. İnkılap Tarihi ve Atatürkçülük öğretim programları ve ders kitapları (Tarih Zaman Çizelgesi olay seçimi ve açıklamaları; metinler uygulama için yeniden yazıldı).", "https://mufredat.meb.gov.tr"],
      ["Wikipedia. Provinces of Turkey (il yüzölçümleri tablosu; il kartlarındaki değerler km² olarak yuvarlanmıştır).", "https://en.wikipedia.org/wiki/Provinces_of_Turkey"],
      ["Šavrič, B., Patterson, T., & Jenny, B. (2019). The Equal Earth map projection. International Journal of Geographical Information Science, 33(3), 454–465. (Dünya haritası izdüşümü)", "https://doi.org/10.1080/13658816.2018.1504949"],
      ["Millî Eğitim Bakanlığı. Ortaöğretim Coğrafya 9–12 ders kitapları (bölgeler, iklim tipleri, göl oluşumları, tarım ve maden dağılışı). Haritadaki dağ, ova, göl noktaları ve elle çizilen akarsu güzergâhları bu düzeyde yaklaşık konumlardır.", "https://ogmmateryal.eba.gov.tr"],
      ["Campbell, N. A., Urry, L. A. vd. (2020). Biology (12. bs.). Pearson. (Enzim, fotosentez, osmoz, kalıtım deneylerinin modelleri)", ""],
      ["Deneylerdeki modeller öğretim amaçlı sadeleştirilmiştir (ör. hava direnci, sürtünme ve ısı kaybı isteğe bağlı ya da ihmal edilmiştir); değerler ölçüm değil, ders kitabı düzeyinde yaklaşık değerlerdir.", ""]
    ]],
    [T("Öğrenme yöntemleri", "Learning methods"), [
      ["Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological Bulletin, 132(3), 354–380. (Yanlış defterindeki aralıklı tekrar)", "https://doi.org/10.1037/0033-2909.132.3.354"],
      ["Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255. (Konu sonu testleri)", "https://doi.org/10.1111/j.1467-9280.2006.01693.x"],
      ["Chi, M. T. H., De Leeuw, N., Chiu, M.-H., & LaVancher, C. (1994). Eliciting self-explanations improves understanding. Cognitive Science, 18(3), 439–477. (Feynman modu)", "https://doi.org/10.1207/s15516709cog1803_3"],
      ["Ebbinghaus, H. (1885/1913). Memory: A contribution to experimental psychology. Teachers College, Columbia University. (Unutma eğrisi)", "https://psychclassics.yorku.ca/Ebbinghaus/index.htm"],
      ["Murre, J. M. J., & Dros, J. (2015). Replication and analysis of Ebbinghaus' forgetting curve. PLoS ONE, 10(7), e0120644. (Unutma eğrisi)", "https://doi.org/10.1371/journal.pone.0120644"],
      ["Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? A literature review of empirical studies on gamification. HICSS 2014. (Seri ve rozetler)", "https://doi.org/10.1109/HICSS.2014.377"],
      ["Cirillo, F. (2018). The Pomodoro Technique. Currency. (Odak sayacı)", "https://www.pomodorotechnique.com"],
      ["Leitner, S. (1972). So lernt man lernen. Herder. (Hap Kartlarındaki kutu sistemi)", ""],
      ["Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language, 109, 104047. (Paragraf Antrenmanı: okuma hızı ölçütleri)", "https://doi.org/10.1016/j.jml.2019.104047"],
      ["Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest, 17(1), 4–34. (Hız–anlama dengesi, geri dönüşler)", "https://doi.org/10.1177/1529100615623267"],
      ["Mayer, R. E. (2009). Multimedia learning (2. bs.). Cambridge University Press. (Deneylerde 2B/3B görselleştirme)", ""],
      ["Mueller, P. A., & Oppenheimer, D. M. (2014). The pen is mightier than the keyboard: Advantages of longhand over laptop note taking. Psychological Science, 25(6), 1159–1168. (Ekrana el yazısıyla çözüm)", "https://doi.org/10.1177/0956797614524581"],
      ["Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. European Journal of Social Psychology, 40(6), 998–1009. (Akıllı bildirimler, seri ve günlük alışkanlık)", "https://doi.org/10.1002/ejsp.674"],
      ["Günün notu: uygulama için yazılmış 100 özgün motivasyon notu; alıntı değildir.", ""],
      ["Holland, J. L. (1997). Making vocational choices: A theory of vocational personalities and work environments (3. bs.). Psychological Assessment Resources. (Kariyer Keşfi: RIASEC ilgi tipleri ve altıgen model)", ""],
      ["Nauta, M. M. (2010). The development, evolution, and status of Holland's theory of vocational personalities: Reflections and future directions for counseling psychology. Journal of Counseling Psychology, 57(1), 11–22. (Kariyer Keşfi)", "https://doi.org/10.1037/a0018213"],
      ["Kariyer Keşfi'ndeki 48 ilgi maddesi ve 52 meslek kartı uygulama için özgün yazılmıştır; standart bir testin çevirisi ya da puanlaması değildir, yönlendirme amaçlıdır.", ""],
      ["Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining \"gamification\". MindTrek 2011, 9–15. (YKS Yolculuğu: XP, seviye, görev ve canavarlar)", "https://doi.org/10.1145/2181037.2181040"],
      ["Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78. (Yolculuk: XP yalnızca gerçek çalışmadan kazanılır)", "https://doi.org/10.1037/0003-066X.55.1.68"],
      ["Brame, C. J. (2016). Effective educational videos: Principles and guidelines for maximizing student learning from video content. CBE—Life Sciences Education, 15(4), es6. (Videodan Çalış: özet, bölümler ve ardından test)", "https://doi.org/10.1187/cbe.16-03-0125"],
      ["Akçayır, M., & Akçayır, G. (2017). Advantages and challenges associated with augmented reality for education: A systematic review of the literature. Educational Research Review, 20, 1–11. (Deneylerde AR görünümü)", "https://doi.org/10.1016/j.edurev.2016.11.002"]
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
      ["W3C Community Group. Web Speech API (ses tanıma ve sesli okuma; Sesli öğretmen).", "https://webaudio.github.io/web-speech-api/"],
      ["Google. Gemini API: Video understanding (YouTube bağlantısından video okuma; Videodan Çalış).", "https://ai.google.dev/gemini-api/docs/video-understanding"],
      ["W3C. Media Capture and Streams (getUserMedia) ve DeviceOrientation Event spesifikasyonları (AR görünümünde kamera ve jiroskop).", "https://www.w3.org/TR/mediacapture-streams/"],
      ["three.js. JavaScript 3D kütüphanesi, MIT lisansı (3B, AR ve hologram deney sahneleri).", "https://threejs.org"],
      ["Markus, N., Frljak, M., Pandžić, I. S., Ahlberg, J., & Forchheimer, R. (2013). Object detection with pixel intensity comparisons organized in decision trees. arXiv:1305.4537. (Hologramda cihaz içi yüz bulma: pico.js)", "https://arxiv.org/abs/1305.4537"],
      ["Kooima, R. (2009). Generalized perspective projection. Louisiana State University. (Hologramda göz konumuna göre eksen dışı perspektif)", "https://csc.lsu.edu/~kooima/articles/genperspective/"],
      ["Casiez, G., Roussel, N., & Vogel, D. (2012). 1€ filter: A simple speed-based low-pass filter for noisy input in interactive systems. CHI 2012, 2527–2530. (El ve yüz takibinde titreşimsiz imleç)", "https://doi.org/10.1145/2207676.2208639"],
      ["Gillespie, R. J. (2008). Fifty years of the VSEPR model. Coordination Chemistry Reviews, 252(12–14), 1315–1327. (Elle molekül kurma: molekül şekilleri ve bağ açıları)", "https://doi.org/10.1016/j.ccr.2007.07.007"],
      ["Wu, H.-K., & Shah, P. (2004). Exploring visuospatial thinking in chemistry learning. Science Education, 88(3), 465–492. (3B moleküler modellerle öğrenme)", "https://doi.org/10.1002/sce.10126"],
      ["Dibia, V. (2017). HandTrack: A library for prototyping real-time hand tracking interfaces using convolutional neural networks. GitHub (Handtrack.js). (Deneylerde el ile kontrol)", "https://github.com/victordibia/handtrack.js"],
      ["Johnson-Glenberg, M. C. (2018). Immersive VR and education: Embodied design principles that include gesture and hand controls. Frontiers in Robotics and AI, 5, 81. (El hareketiyle deney kontrolü)", "https://doi.org/10.3389/frobt.2018.00081"],
      ["Schroeder, N. L., Adesope, O. O., & Gilbert, R. B. (2013). How effective are pedagogical agents for learning? A meta-analytic review. Journal of Educational Computing Research, 49(1), 1–39. (Hologram öğretmen)", "https://doi.org/10.2190/EC.49.1.a"],
      ["Hew, K. F. (2009). Use of audio podcast in K-12 and higher education: A review of research topics and methodologies. Educational Technology Research and Development, 57(3), 333–357. (Konu Podcast'i)", "https://doi.org/10.1007/s11423-008-9108-3"],
      ["Rekimoto, J. (1995). A vision-based head tracker for fish tank virtual reality: VR without head gear. Proceedings of IEEE VRAIS '95, 94–100. (Kafa takipli \"balık akvaryumu\" görüntüsü)", "https://doi.org/10.1109/VRAIS.1995.512484"],
      ["Bird, P. (2003). An updated digital model of plate boundaries. Geochemistry, Geophysics, Geosystems, 4(3), 1027. (3B Dünya Küresi: levha sınırları ve levha adları)", "https://doi.org/10.1029/2001GC000252"],
      ["USGS. Earthquake Hazards Program: büyük depremler kataloğu ve Smithsonian Global Volcanism Program. (Küredeki deprem ve volkan işaretleri)", "https://earthquake.usgs.gov"],
      ["Kottek, M., Grieser, J., Beck, C., Rudolf, B., & Rubel, F. (2006). World map of the Köppen-Geiger climate classification updated. Meteorologische Zeitschrift, 15(3), 259–263. (Küredeki iklim kuşakları)", "https://doi.org/10.1127/0941-2948/2006/0130"],
      ["Meeus, J. (1998). Astronomical algorithms (2. bs.). Willmann-Bell. (Güneşin mevsime göre konumu, gündüz-gece çizgisi)", ""]
    ]]
  ];

  /* Son sürümler (yeniden eskiye) */
  const SURUMLER = () => [
    ["1.29.1", T("3B Dünya Küresi'nde sahnenin sağ üstüne dönmeyi durdurma / başlatma düğmesi eklendi; seçim hatırlanır ve yan paneldeki \"Kendi kendine dönsün\" kutusuyla eşli çalışır.", "Added a stop / start rotation button on the 3D Globe; the choice is remembered.")],
    ["1.29.0", T("Yeni Yazılı Sınavlar (Türkiye Yüzyılı Maarif Modeli): 9, 10, 11 ve 12. sınıflarda Matematik, Fizik, Kimya, Biyoloji, Türk Dili ve Edebiyatı, Tarih (12'de İnkılap Tarihi) ve Coğrafya için 56 açık uçlu yazılı, 392 soru; her soruda bağlam, puan, beklenen cevap ve dereceli puanlama ölçütü. Süreli sınav modu, cevap anahtarı, ölçütle kendini puanlama, yapay zekâyla puanlama ve yeni yazılı hazırlama, yazdırma. Performans: 3B deneyler, küre ve modellerde yeniden çizimlerin birbirini iptal etmesi giderildi (sahneler artık her karede akıcı çizilir); dinamik çözünürlük, cihaza göre kenar yumuşatma ve gölge; ekranda olmayan ya da üstü kapalı sahne çizilmez; küre yalnızca bir şey değişince çizilir, işaretler tek çizim çağrısında (250 → 7 çizim çağrısı), uzaktan bakınca daha az üçgen; animasyonlar kare hızından bağımsız. Windows uygulaması artık ekran kartını kullanıyor (3B sahneler işlemcide çizildiği için takılıyordu). Telefon ve tablette cam bulanıklığı kapalı, kaydırma daha akıcı. Eski iPhone'larda (iOS 16.3 ve öncesi) uygulamanın açılmamasına yol açabilecek düzenli ifadeler değiştirildi. Sade arayüz: menüde az kullanılan sayfalar \"Daha fazla\" altında, daha düzenli başlıklar, sade açılış ekranı.", "New Written Exams (Maarif Model): 56 open-ended exams, 392 questions with keys and rubrics; timed mode, self-scoring, AI scoring and AI-generated exams, printing. Performance: fixed 3D redraws cancelling each other, dynamic resolution, on-demand globe rendering (250 → 7 draw calls), GPU enabled in the Windows app, lighter glass effects on phones, iOS 16.3 compatibility. Simpler menus and home screen.")],
    ["1.28.0", T("Yeni 3B Dünya Küresi: parmakla ya da fareyle çevrilen, yakınlaştırılan küre. Katmanlar: ülkeler ve başkentler, enlem-boylam ağı, iklim kuşakları, saat dilimleri, levha sınırları (PB2002; yaklaşan, uzaklaşan ve yanal sınırlar ayrı renkte), büyük depremler, volkanlar ve tarih olayları. Gündüz-gece çizgisi seçilen gün ve saate göre gerçek güneş konumuyla çizilir; mevsim düğmeleriyle ekinoks ve gündönümü. Bir ülkeye dokununca adı, başkenti, nüfusu, iklim kuşağı, saat dilimi ve oradaki güneş saati çıkar; ülke arama, otomatik dönme, hologram görünümü. Coğrafya konularında küre kartı.", "New 3D Globe: rotate and zoom; layers for countries and capitals, graticule, climate belts, time zones, PB2002 plate boundaries, major earthquakes, volcanoes and history events; real day-night terminator for any date and hour; tap a country for capital, population, climate, time zone and solar time; search, auto-rotate, hologram view.")],
    ["1.27.0", T("Yeni 3B Modeller: hayvan ve bitki hücresi, insan kalbi, DNA çift sarmal, atom orbitalleri, güneş sistemi, NaCl kristali, elmas ve grafit, Yer'in iç yapısı ve nöron; döndür, parçalarına ayır (DNA'da zincirler fermuar gibi açılır), bir parçaya dokununca adı ve görevi çıksın; hologramda ve elle kontrol; konu sayfalarında ilgili model kartı. Yeni Elle molekül kurma: atomları fareyle, parmakla ya da kameraya çimdik yaparak tut, birbirine yaklaştır; değerlik ve merkez atom kurallarına uymayan bağda nedeni söylenir; molekül tamamlanınca VSEPR'e göre gerçek şekline (104,5°, 107°, 109,5°…) oturur, ortaklanmamış elektron çiftleri ve polarlık gösterilir (10 molekül). El kontrolü yenilendi: ekranda el imleci, basılı tutma halkası, işaret parmağıyla bir düğmenin üstünde bekleyince ona basma, ayar çipleri, 1€ süzgeciyle titremesiz takip, daha hızlı algılama, küçültülebilir panel; 2B'ye geçince kamera kapanır. 3B etiketlerin metni değişince eski yazının kalması düzeltildi.", "New 3D Models (cells, heart, DNA, orbitals, solar system, crystals, Earth's interior, neuron) with explode view and part info. Build molecules by hand: bonds follow valence rules and snap to VSEPR shapes. Redesigned hand control: on-screen cursor, hold rings, point-and-hover clicking, control chips, smoother and faster tracking.")],
    ["1.26.0", T("Deneylerde El ile kontrol: kameraya elini göster, açık elle sahneyi havada döndür, iki elle büyüt, çimdikle açı ya da kütle gibi ayarları değiştir, işaret parmağıyla sıradaki ayara geç, yumrukla oynat/durdur; el bulma cihazda (Handtrack.js), görüntü saklanmaz; hologramla aynı kamerayı paylaşır. Konuşan hologram öğretmen: sesli öğretmende \"Hologram\" ile ekranın derinliğinde 3B bir öğretmen belirir; konuşurken ağzı sese göre oynar, başı sana döner, dinlerken halesi sesine göre parlar; yanındaki holografik panoda cevaptaki formüller ve kavramlar çıkar, konu bir deneyle eşleşirse deney tek dokunuşla hologramda açılır. Yeni Konu Podcast'i: 573 konunun hepsi Deniz ile Arda'nın iki sesli sohbetine dönüşür; arada dinleyene soru sorulur, hız ayarı, metinde takip, kaldığın yerden devam, bitince sıradaki konu; istenirse yapay zekâyla daha doğal bir sürüm yazılır.", "Hand control for labs (rotate, zoom, pinch to change values, fist to play/pause) with on-device hand tracking. Talking hologram teacher in the voice teacher with lip movement, a holographic board of formulas and one-tap labs. New Topic Podcast: all 573 topics as a two-voice chat with quiz breaks.")],
    ["1.25.0", T("Deneylere Hologram görünümü: ek gözlük ya da düzenek gerekmeden ekran bir pencereye dönüşür. Ön kamera yüzünü cihazın içinde izler (pico.js, internetsiz; görüntü saklanmaz), başını oynattıkça perspektif senin bakış açına göre yeniden çizilir ve deney ekranın içindeki derin, ızgaralı bir kutuda ya da önünde duruyormuş gibi görünür. Kamera yoksa ya da izin verilmezse telefonda eğme, bilgisayarda fare ile çalışır. Camgöbeği holografik görünüm ya da gerçek renkler; ayarlar, oynat ve ortala hologramın içinde. AR'daki Ayarlar paneli artık alt düğmeleri örtmüyor.", "Hologram view for labs: no glasses or kit needed. The front camera tracks your face on-device (pico.js, offline) and the scene is redrawn for your viewpoint, so the lab sits deep inside the screen. Falls back to tilt or mouse. Cyan hologram look or real colours.")],
    ["1.24.0", T("Yeni Videodan Çalış: YouTube ders videosunun bağlantısını yapıştır, yapay zekâ videoyu izleyip özet, dakika dakika tıklanabilir bölümler, kavram kartları ve çoktan seçmeli test hazırlasın; müfredattaki ilgili konulara bağlansın; transkript ya da ders notu yapıştırarak da çalışır, kitaplık internetsiz açılır. Deneylerde AR: 3B deneyi kameranın görüntüsünde masanın üstünde gör, telefonu çevirerek etrafında dolaş, iki parmakla büyüt; ayarlar AR içinde. Yeni Kariyer Keşfi: 48 maddelik RIASEC ilgi envanteri, üç harfli ilgi kodu ve altıgen profil, 52 meslek kartı (ne yapar, bir günü, beceriler, puan türü), her meslek için 2025 programları ve sıralamana göre Güvenli/Uygun/Hayal; Tercih Robotu'na tek dokunuşla geçiş. Yeni YKS Yolculuğu: müfredat bir macera haritası; her ders bir diyar, her kazanım bir durak, ünite sonunda canavar (konu testi), son canavar deneme; gerçek çalışmandan XP ve seviye, günlük görevler.", "New Study from Video: paste a YouTube lesson link and get a summary, clickable timestamped chapters, flashcards and a quiz linked to curriculum topics (or paste a transcript). AR view for labs using the camera and gyroscope. New Career Explorer: 48-item RIASEC inventory, interest code, 52 career cards with 2025 programmes and your chances. New YKS Journey: the curriculum as an adventure map with XP, levels, daily quests and unit bosses.")],
    ["1.23.0", T("Yeni Tercih Robotu: denemelerinden tahmini TYT/SAY/EA/SÖZ puanın ve 2025 sıralama karşılığın; bu sıralamayla hangi şehirde, hangi üniversitede, hangi bölüme yerleşebileceğin (Güvenli / Uygun / Hayal), şehir–üniversite türü–bölüm süzgeçleri; 21 binden fazla programın 2025 taban puanı, başarı sırası, kontenjanı, 2024'e göre değişimi ve yaklaşık net karşılığı; 24 tercihlik liste. Yeni Tarih Zaman Çizelgesi: İlk Çağ'dan günümüze 160 olay, dönem bantları, tür süzgeçleri, arama, konum haritası, \"Asistana sor\" ve \"Hangisi önce?\" sınavı.", "New Programme Finder with 2025 cut-offs and ranks for 21k+ programmes, your estimated rank and a 24-choice list. New interactive History Timeline with 160 events, map, search and a quiz.")],
    ["1.22.0", T("Dünya haritası ayrıntılandı: daha hassas sınırlar ve küçük ülkeler, ülke kartında başkent, nüfus, bölge ve kara komşuları; yeni katmanlar: Başkentler, Okyanus ve denizler, Akarsu ve göller, Dağlar ve çöller. Türkiye haritasında 81 ilin her biri için bilgi kartı: 2024 nüfusu ve sırası, yüzölçümü, yoğunluk, il merkezi, kıyıları, iklim, ürün ve madenler, komşu iller (dokununca o ile geçer) ve öne çıkanlar. Arayüz: yeni \"Tüm araçlar\" sayfası (arama, gruplar, son kullanılanlar), yıldızla sabitleme (sabitlenenler menünün üstünde ve asistan açılışında), menüye Pratik grubu, erişilebilirlik iyileştirmeleri. Harita verisi yalnızca harita açılınca yüklenir.", "More detailed world map with capitals, population, neighbours and new layers (capitals, seas, rivers & lakes, mountains & deserts). Info cards for all 81 provinces (2024 population, area, density, coast, neighbours, highlights). New All tools page with search, pinning and recent tools; Practice group in the menu; accessibility improvements.")],
    ["1.21.0", T("Etkileşimli Harita: Türkiye (iller, bölgeler, iklim, akarsular, göller, dağlar ve ovalar, tarım ürünleri, madenler) ve dünya (ülkeler, kıtalar, boğaz ve kanallar); keşif kipi ile \"Haritada bul\" ve \"Adını seç\" sınavları. Deneme sonucunu fotoğraftan doldurma: sonuç belgesi ya da optik form + cevap anahtarı okunur, netler ve konu konu yanlışlar doldurulur; konu yanlışları önerilere katılır. Android ana ekran widget'ı (YKS'ye kalan gün, bugünün görevleri, günün notu) ve akıllı bildirimler (tekrar zamanı, seri koruma, sınav geri sayımı, günün notu). Çözümümü Kontrol Et'te ekrana el yazısıyla yazma tahtası. Ana ekranda her gün değişen motivasyon notu.", "Interactive map of Turkey and the world with explore and two quiz modes. Fill mock exam results from a photo (result sheet or answer sheet + key), including topic-level mistakes. Android home screen widget and smart notifications. Handwriting board in Check My Solution. A daily motivational note on the home screen.")],
    ["1.20.0", T("Deneylere 3B görünüm: 67 deneyin hepsi 3B sahnede açılabiliyor (döndür, yakınlaştır, çift dokunuşla sıfırla); 2B görünüm de duruyor, her deneyde 2B/3B düğmesiyle seçim öğrencide; varsayılan görünüm ve 3B kalitesi Deney Laboratuvarı'ndan ayarlanır (zayıf cihazlarda 2B ile başlar). Yeni Paragraf Antrenmanı (TYT Türkçe): okuma hızı testi (kelime/dakika ve anlama), soru başına süre tutan süreli setler, soru türlerine göre doğruluk ve süre, öneriler, yapay zekâyla yeni paragraf seti. Kaynakça ve lisanslar güncellendi.", "3D view for all 67 labs (rotate, zoom, double-tap reset) with 2D kept and a 2D/3D switch in each lab; default view and 3D quality in Lab settings. New Paragraph Training for TYT Turkish: reading speed test (wpm and comprehension), timed sets with time per question, stats by question type, tips and AI-generated sets. References and licences updated.")],
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
    ["chart", "denemeler", T("Deneme takibi", "Exam tracking"), T("TYT–AYT netleri; sonuç belgesini fotoğraftan oku", "TYT–AYT nets; read result sheets from a photo")],
    ["target", "puan", T("Puan ve hedef", "Score & target"), T("Tahmini puan ve bölüm önerileri", "Estimated score and suggestions")],
    ["bookmark", "yanlislar", T("Yanlış defteri", "Mistake notebook"), T("Aralıklı tekrar ve hata analizi", "Spaced review and error analysis")],
    ["mic", "", T("Sesli öğretmen", "Voice teacher"), T("Konuşarak sor, sesli cevap al; istersen hologram öğretmenle", "Ask by voice, hear the answer; optional hologram teacher")],
    ["volume", "podcast", T("Konu podcast'i", "Topic podcast"), T("573 konu iki sesli sohbet; arada sorular", "573 topics as two-voice chats with quizzes")],
    ["sparkle", "", T("Yapay zekâ asistanı", "AI assistant"), T("Fotoğraftan soru çözer, notlarına bakar", "Solves photos, uses your notes")],
    ["timer", "odak", T("Odak sayacı", "Focus timer"), T("Pomodoro ve süre istatistiği", "Pomodoro and time stats")],
    ["quiz", "simulasyon", T("Deneme simülasyonu", "Exam simulation"), T("Zayıf konulardan süreli mini deneme", "Timed mini exam from weak topics")],
    ["note", "rapor", T("Haftalık rapor", "Weekly report"), T("Gelişim özeti, yazdır ya da paylaş", "Progress summary to print or share")],
    ["lightbulb", "lab", T("Deney laboratuvarı", "Interactive lab"), T("67 deney; 2B, 3B, AR, hologram ve el ile kontrol", "67 labs; 2D, 3D, AR, hologram and hand control")],
    ["pen", "yazili", T("Yazılı Sınavlar", "Written Exams"), T("Maarif Modeli açık uçlu yazılılar: 9–12, 7 ders, 56 sınav, cevap anahtarı ve puanlama ölçütü", "Open-ended written exams with keys and rubrics")],
    ["globe", "kure", T("3B Dünya Küresi", "3D Globe"), T("Ülkeler, levhalar, depremler, iklim, saat dilimleri, gündüz-gece", "Countries, plates, quakes, climate, time zones, day-night")],
    ["cube", "modeller", T("3B modeller", "3D models"), T("10 model ve elle molekül kurma; parçalarına ayır", "10 models and molecule building")],
    ["play", "video", T("Videodan çalış", "Study from video"), T("YouTube dersinden özet, bölümler, kart ve test", "Summary, chapters, cards and quiz from a YouTube lesson")],
    ["compass", "kariyer", T("Kariyer keşfi", "Career explorer"), T("RIASEC ilgi envanteri, 52 meslek ve bölümleri", "RIASEC inventory, 52 careers and programmes")],
    ["star", "yolculuk", T("YKS yolculuğu", "YKS journey"), T("Macera haritası, XP, seviye ve günlük görevler", "Adventure map, XP, levels and daily quests")],
    ["timer", "paragraf", T("Paragraf antrenmanı", "Paragraph training"), T("Okuma hızı ve soru başına süre takibi", "Reading speed and time per question")],
    ["game", "oyunlar", T("Oyunlar", "Games"), T("Derslere göre 9 kısa oyun", "Nine short subject games")],
    ["globe", "atlas", T("Etkileşimli harita", "Interactive map"), T("81 il kartı, dünya ülkeleri ve başkentler; keşfet ve sına", "81 province cards, countries and capitals; explore and quiz")],
    ["grad", "tercih", T("Tercih robotu", "Programme finder"), T("Yerleşebileceğin bölümler, 2025 taban puan ve sıralamalar", "Programmes you could get into, 2025 cut-offs")],
    ["clock", "zaman", T("Tarih zaman çizelgesi", "History timeline"), T("160 olay, harita ve \"Hangisi önce?\" sınavı", "160 events, map and a quiz")],
    ["widget", "araclar", T("Tüm araçlar", "All tools"), T("Ara, sabitle, son kullanılanlar", "Search, pin, recently used")],
    ["layers", "kartlar", T("Hap kartları", "Flashcards"), T("Kutu sistemiyle tekrar", "Spaced review with boxes")],
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
