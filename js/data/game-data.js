/* =========================================================
   game-data.js — oyunların hazır verileri
   Tarih Şeridi olayları, YDT kelimeleri, denkleştirilecek tepkimeler
   ========================================================= */
(function () {
  App.data = App.data || {};
  // [yıl, olay, dönem]  dönem: ilk (İlk ve Orta Çağ Türk-İslam), osm (Osmanlı), kur (Kurtuluş Savaşı ve İnkılaplar), dun (Dünya)
  App.data.historyEvents = [
    [375, "Kavimler Göçü'nün başlaması", "dun"], [552, "I. Göktürk Devleti'nin kuruluşu", "ilk"], [622, "Hicret", "ilk"], [751, "Talas Savaşı", "ilk"],
    [1040, "Dandanakan Savaşı", "ilk"], [1071, "Malazgirt Savaşı", "ilk"], [1176, "Miryokefalon Savaşı", "ilk"], [1215, "Magna Carta'nın imzalanması", "dun"],
    [1243, "Kösedağ Savaşı", "ilk"], [1299, "Osmanlı Devleti'nin kuruluşu", "osm"], [1402, "Ankara Savaşı", "osm"], [1453, "İstanbul'un fethi", "osm"],
    [1492, "Amerika kıtasına ulaşılması (Kolomb)", "dun"], [1514, "Çaldıran Savaşı", "osm"], [1516, "Mercidabık Savaşı", "osm"], [1526, "Mohaç Meydan Muharebesi", "osm"],
    [1538, "Preveze Deniz Savaşı", "osm"], [1571, "İnebahtı Deniz Savaşı", "osm"], [1606, "Zitvatorok Antlaşması", "osm"], [1639, "Kasr-ı Şirin Antlaşması", "osm"],
    [1683, "II. Viyana Kuşatması", "osm"], [1699, "Karlofça Antlaşması", "osm"], [1718, "Pasarofça Antlaşması", "osm"], [1727, "İbrahim Müteferrika matbaası", "osm"],
    [1774, "Küçük Kaynarca Antlaşması", "osm"], [1789, "Fransız İhtilali", "dun"], [1793, "Nizam-ı Cedit ordusunun kurulması", "osm"], [1808, "Sened-i İttifak", "osm"],
    [1826, "Yeniçeri Ocağı'nın kaldırılması", "osm"], [1839, "Tanzimat Fermanı", "osm"], [1856, "Islahat Fermanı", "osm"], [1876, "I. Meşrutiyet'in ilanı", "osm"],
    [1877, "93 Harbi (Osmanlı–Rus Savaşı)", "osm"], [1908, "II. Meşrutiyet'in ilanı", "osm"], [1911, "Trablusgarp Savaşı", "osm"], [1912, "I. Balkan Savaşı", "osm"],
    [1914, "I. Dünya Savaşı'nın başlaması", "dun"], [1915, "Çanakkale Deniz Zaferi (18 Mart)", "osm"], [1918, "Mondros Ateşkes Antlaşması", "kur"], [1919, "Mustafa Kemal'in Samsun'a çıkışı", "kur"],
    [1920, "TBMM'nin açılışı", "kur"], [1921, "Sakarya Meydan Muharebesi", "kur"], [1922, "Saltanatın kaldırılması", "kur"], [1923, "Cumhuriyet'in ilanı", "kur"],
    [1924, "Halifeliğin kaldırılması", "kur"], [1925, "Şapka Kanunu", "kur"], [1926, "Türk Medeni Kanunu", "kur"], [1928, "Harf İnkılabı", "kur"],
    [1934, "Soyadı Kanunu", "kur"], [1939, "Hatay'ın anavatana katılması", "kur"], [1945, "Birleşmiş Milletler'in kuruluşu", "dun"], [1946, "Çok partili ilk genel seçim", "kur"],
    [1952, "Türkiye'nin NATO'ya katılması", "dun"], [1974, "Kıbrıs Barış Harekâtı", "kur"]
  ];

  // YDT için sık kelimeler: [kelime, anlam]
  App.data.vocab = [
    ["abandon", "terk etmek"], ["abundant", "bol"], ["accurate", "doğru, kesin"], ["acquire", "edinmek"], ["adequate", "yeterli"], ["adjust", "ayarlamak, uyum sağlamak"],
    ["advocate", "savunmak"], ["affect", "etkilemek"], ["allocate", "tahsis etmek"], ["alter", "değiştirmek"], ["ambiguous", "belirsiz, muğlak"], ["anticipate", "öngörmek"],
    ["apparent", "açık, görünür"], ["approximately", "yaklaşık olarak"], ["arise", "ortaya çıkmak"], ["assess", "değerlendirmek"], ["assume", "varsaymak"], ["attain", "ulaşmak, erişmek"],
    ["attribute", "atfetmek"], ["avoid", "kaçınmak"], ["beneficial", "faydalı"], ["bias", "önyargı"], ["boost", "artırmak"], ["capable", "yetenekli, muktedir"],
    ["cease", "durmak, sona ermek"], ["clarify", "açıklığa kavuşturmak"], ["coherent", "tutarlı"], ["collapse", "çökmek"], ["compensate", "telafi etmek"], ["comprehensive", "kapsamlı"],
    ["conceal", "gizlemek"], ["consequence", "sonuç"], ["considerable", "hatırı sayılır"], ["consistent", "tutarlı"], ["constrain", "kısıtlamak"], ["contemporary", "çağdaş"],
    ["contradict", "çelişmek"], ["crucial", "çok önemli"], ["decline", "azalmak; reddetmek"], ["deliberately", "kasıtlı olarak"], ["demonstrate", "göstermek, kanıtlamak"], ["deny", "inkâr etmek"],
    ["deprive", "mahrum bırakmak"], ["derive", "türetmek, elde etmek"], ["deteriorate", "kötüleşmek"], ["diminish", "azalmak"], ["distinguish", "ayırt etmek"], ["diverse", "çeşitli"],
    ["dominant", "baskın"], ["eliminate", "ortadan kaldırmak"], ["emerge", "ortaya çıkmak"], ["emphasize", "vurgulamak"], ["enhance", "geliştirmek, artırmak"], ["enormous", "devasa"],
    ["ensure", "sağlamak, garanti etmek"], ["essential", "temel, gerekli"], ["evaluate", "değerlendirmek"], ["eventually", "sonunda"], ["evident", "açık, belli"], ["exceed", "aşmak"],
    ["exclude", "hariç tutmak"], ["expand", "genişlemek"], ["exploit", "sömürmek, yararlanmak"], ["facilitate", "kolaylaştırmak"], ["feasible", "uygulanabilir"], ["fluctuate", "dalgalanmak"],
    ["fundamental", "temel"], ["hazardous", "tehlikeli"], ["hence", "bu nedenle"], ["hinder", "engellemek"], ["identical", "özdeş, aynı"], ["impose", "dayatmak"],
    ["inevitable", "kaçınılmaz"], ["inhabit", "yaşamak, ikamet etmek"], ["initially", "başlangıçta"], ["insufficient", "yetersiz"], ["integrate", "bütünleştirmek"], ["interfere", "müdahale etmek"],
    ["interpret", "yorumlamak"], ["irrelevant", "ilgisiz"], ["maintain", "sürdürmek, korumak"], ["merely", "sadece"], ["modify", "değiştirmek"], ["moreover", "üstelik"],
    ["neglect", "ihmal etmek"], ["nevertheless", "yine de"], ["notion", "kavram, fikir"], ["obtain", "elde etmek"], ["obvious", "apaçık"], ["occur", "meydana gelmek"],
    ["overcome", "üstesinden gelmek"], ["perceive", "algılamak"], ["persist", "sürmek, ısrar etmek"], ["precise", "kesin, tam"], ["predict", "tahmin etmek"], ["prevail", "yaygın olmak, galip gelmek"],
    ["prevent", "önlemek"], ["previous", "önceki"], ["prohibit", "yasaklamak"], ["prominent", "önde gelen"], ["pursue", "peşinden gitmek"], ["rapidly", "hızla"],
    ["reluctant", "isteksiz"], ["remarkable", "dikkat çekici"], ["require", "gerektirmek"], ["resemble", "benzemek"], ["restrict", "kısıtlamak"], ["reveal", "ortaya çıkarmak"],
    ["scarce", "kıt, az bulunan"], ["significant", "önemli"], ["sophisticated", "gelişmiş, karmaşık"], ["subsequent", "sonraki"], ["substantial", "önemli, büyük"], ["sufficient", "yeterli"],
    ["suspend", "askıya almak"], ["sustain", "sürdürmek"], ["tend to", "eğiliminde olmak"], ["thus", "böylece"], ["undergo", "geçirmek, maruz kalmak"], ["undertake", "üstlenmek"],
    ["vary", "değişmek, farklılık göstermek"], ["vulnerable", "savunmasız"], ["whereas", "oysa"], ["widespread", "yaygın"], ["yield", "sağlamak; verim"], ["abolish", "kaldırmak (yasa vb.)"],
    ["accelerate", "hızlandırmak"], ["accumulate", "biriktirmek"], ["adapt", "uyum sağlamak"], ["adverse", "olumsuz"], ["alleviate", "hafifletmek"], ["comprise", "içermek, oluşmak"],
    ["confine", "sınırlamak"], ["controversial", "tartışmalı"], ["deficiency", "eksiklik"], ["dispute", "anlaşmazlık"], ["enable", "olanak sağlamak"], ["exhibit", "sergilemek, göstermek"]
  ];

  // Denkleştirilecek tepkimeler: [girenler, ürünler], seviye
  App.data.reactions = [
    [["H2", "O2"], ["H2O"], 1], [["N2", "H2"], ["NH3"], 1], [["Na", "Cl2"], ["NaCl"], 1], [["Mg", "O2"], ["MgO"], 1], [["H2", "Cl2"], ["HCl"], 1],
    [["Fe", "O2"], ["Fe2O3"], 2], [["Al", "O2"], ["Al2O3"], 2], [["CH4", "O2"], ["CO2", "H2O"], 2], [["KClO3"], ["KCl", "O2"], 2], [["H2O2"], ["H2O", "O2"], 1],
    [["Zn", "HCl"], ["ZnCl2", "H2"], 1], [["Na", "H2O"], ["NaOH", "H2"], 2], [["C3H8", "O2"], ["CO2", "H2O"], 2], [["C2H6", "O2"], ["CO2", "H2O"], 3],
    [["Fe2O3", "CO"], ["Fe", "CO2"], 3], [["Al", "HCl"], ["AlCl3", "H2"], 3], [["NaOH", "H2SO4"], ["Na2SO4", "H2O"], 2], [["Ca(OH)2", "HCl"], ["CaCl2", "H2O"], 2], [["C6H12O6", "O2"], ["CO2", "H2O"], 3],
    [["C2H5OH", "O2"], ["CO2", "H2O"], 3], [["NH3", "O2"], ["NO", "H2O"], 3], [["Cu", "AgNO3"], ["Cu(NO3)2", "Ag"], 2], [["Al", "CuSO4"], ["Al2(SO4)3", "Cu"], 3], [["FeS2", "O2"], ["Fe2O3", "SO2"], 3]
  ];
})();
