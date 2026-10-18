/* =========================================================
   harita-bilgi.js — Etkileşimli Harita katmanlarının bilgileri
   Koordinatlar [boylam, enlem]; ders kitabı düzeyinde yaklaşık konumlardır.
   İl sınırları, büyük akarsular ve göl çokgenleri Natural Earth'ten
   (harita-tr.js); aşağıdaki çizgi/nokta katmanları elle hazırlanmıştır.
   ========================================================= */
(function () {
  App.data = App.data || {};

  /* Coğrafi bölgeler: plaka kodları */
  const REG = {
    marmara:  { name: "Marmara",              color: "#5b8def", il: [10, 11, 16, 17, 22, 34, 39, 41, 54, 59, 77] },
    ege:      { name: "Ege",                  color: "#2bb3a3", il: [3, 9, 20, 35, 43, 45, 48, 64] },
    akdeniz:  { name: "Akdeniz",              color: "#f08a3c", il: [1, 7, 15, 31, 32, 33, 46, 80] },
    ic:       { name: "İç Anadolu",           color: "#d9b44a", il: [6, 18, 26, 38, 40, 42, 50, 51, 58, 66, 68, 70, 71] },
    karadeniz:{ name: "Karadeniz",            color: "#3fa45b", il: [5, 8, 14, 19, 28, 29, 37, 52, 53, 55, 57, 60, 61, 67, 69, 74, 78, 81] },
    dogu:     { name: "Doğu Anadolu",         color: "#9a6fd6", il: [4, 12, 13, 23, 24, 25, 30, 36, 44, 49, 62, 65, 75, 76] },
    gdogu:    { name: "Güneydoğu Anadolu",    color: "#d9605a", il: [2, 21, 27, 47, 56, 63, 72, 73, 79] }
  };
  const REG_INFO = {
    marmara: "Nüfusun ve sanayinin en yoğun olduğu bölge. Geçiş (Marmara) iklimi; Ergene havzası, Bursa ovası. Boğazlar Karadeniz'i Akdeniz'e bağlar.",
    ege: "Dağlar kıyıya dik uzandığından deniz etkisi içerilere kadar sokulur. Gediz, Büyük ve Küçük Menderes grabenleri; zeytin, üzüm, incir, pamuk.",
    akdeniz: "Toroslar kıyıya paralel uzanır; kıyı ile iç kesim arasında iklim farkı büyüktür. Çukurova'da pamuk ve turunçgil, seralarda erkenci sebze, turizm.",
    ic: "Yağışın en az olduğu bölgelerden; karasal (bozkır) iklim. Tahıl ve şeker pancarı tarımı, küçükbaş hayvancılık. Tuz Gölü, volkanik dağlar (Erciyes, Hasan).",
    karadeniz: "Her mevsim yağışlı; dağlar kıyıya paralel. Fındık, çay; dağınık yerleşme. Çarşamba ve Bafra delta ovaları.",
    dogu: "Ortalama yükseltisi en fazla bölge; kışlar uzun ve sert. Büyükbaş hayvancılık; Ağrı, Süphan, Nemrut volkanları, Van Gölü.",
    gdogu: "Yaz sıcaklıkları çok yüksek; GAP ile sulama yaygınlaştı. Harran ovasında pamuk, Antep fıstığı, kırmızı mercimek; Batman ve Adıyaman'da petrol."
  };

  /* İklim (il düzeyinde sadeleştirilmiş) */
  const CLIM = {
    akdeniz:  { name: "Akdeniz iklimi",          color: "#f08a3c", info: "Yazlar sıcak ve kurak, kışlar ılık ve yağışlı. Bitki örtüsü maki.",
                il: [1, 7, 9, 31, 33, 35, 45, 48, 80] },
    karadeniz:{ name: "Karadeniz iklimi",        color: "#3fa45b", info: "Her mevsim yağışlı; yazlar serin, kışlar ılık. Bitki örtüsü orman.",
                il: [8, 28, 37, 52, 53, 55, 57, 61, 67, 74, 81] },
    marmara:  { name: "Marmara (geçiş) iklimi",  color: "#5b8def", info: "Karadeniz, Akdeniz ve karasal iklim arasında geçiş özelliği; kışlar Akdeniz'e göre serin. Bitki örtüsü maki, orman ve bozkır karışık.",
                il: [10, 16, 17, 22, 34, 39, 41, 54, 59, 77] },
    karasal:  { name: "Karasal iklim",           color: "#d9b44a", info: "Yazlar sıcak ve kurak, kışlar soğuk ve kar yağışlı; sıcaklık farkı büyük. Bitki örtüsü bozkır. Doğu Anadolu'da kışlar çok sert geçer.",
                il: null }        // geri kalan iller
  };

  /* Elle çizilen akarsular (Natural Earth'te bulunmayanlar) — yaklaşık güzergâh */
  const RIVERS_X = [
    { name: "Yeşilırmak", pts: [[38.15, 40.05], [37.3, 40.2], [36.55, 40.32], [35.83, 40.65], [36.25, 40.95], [36.6, 41.05], [36.75, 41.25], [36.85, 41.38]] },
    { name: "Seyhan",     pts: [[36.3, 38.65], [36.0, 38.1], [35.75, 37.6], [35.5, 37.25], [35.32, 37.0], [35.1, 36.85], [34.88, 36.72]] },
    { name: "Gediz",      pts: [[29.25, 38.95], [28.75, 38.75], [28.3, 38.6], [27.9, 38.55], [27.45, 38.62], [27.1, 38.62], [26.85, 38.58]] },
    { name: "Küçük Menderes", pts: [[28.25, 38.2], [27.85, 38.18], [27.5, 38.08], [27.3, 37.98], [27.25, 37.95]] },
    { name: "Göksu",      pts: [[32.5, 37.1], [32.9, 36.95], [33.3, 36.7], [33.65, 36.5], [33.93, 36.38], [34.05, 36.28]] },
    { name: "Çoruh",      pts: [[40.05, 40.22], [40.5, 40.3], [41.0, 40.5], [41.5, 40.78], [41.82, 41.18], [41.85, 41.45], [41.62, 41.6]] },
    { name: "Ergene",     pts: [[27.95, 41.3], [27.5, 41.25], [27.0, 41.25], [26.68, 41.27], [26.4, 41.05]] },
    { name: "Asi",        pts: [[36.45, 35.95], [36.42, 36.2], [36.2, 36.22], [36.0, 36.12], [35.93, 36.05]] },
    { name: "Bakırçay",   pts: [[28.2, 39.2], [27.7, 39.1], [27.2, 39.05], [26.95, 38.95]] },
    { name: "Filyos",     pts: [[32.6, 40.75], [32.3, 40.95], [32.1, 41.2], [32.03, 41.57]] }
  ];
  const RIVER_INFO = {
    "Kızılırmak": "Türkiye'nin en uzun akarsuyu (~1355 km). Sivas'tan doğar, yay çizerek Bafra'dan Karadeniz'e dökülür; Bafra delta ovasını oluşturur.",
    "Yeşilırmak": "Tokat ve Amasya'dan geçer, Kelkit'i alır; Çarşamba delta ovasını oluşturarak Karadeniz'e dökülür.",
    "Sakarya": "Eskişehir–Sakarya üzerinden Karadeniz'e dökülür. Sarıyar ve Gökçekaya barajları üzerindedir.",
    "Fırat": "Erzurum çevresinden (Karasu) doğar, Murat ile birleşir; Keban, Karakaya, Atatürk barajları üzerindedir. Suriye ve Irak'tan geçip Basra Körfezi'ne ulaşır (Şattülarap).",
    "Dicle": "Elazığ'daki Hazar Gölü çevresinden doğar; Diyarbakır'dan geçer, Ilısu Barajı üzerindedir. Irak'ta Fırat ile birleşir.",
    "Murat": "Fırat'ın en büyük kolu; Ağrı'dan doğar, Muş ovasını sular.",
    "Büyük Menderes": "Menderesli (kıvrımlı) akışın tipik örneği; Söke ovası deltasını oluşturur, Ege Denizi'ne dökülür.",
    "Küçük Menderes": "Ödemiş–Tire çevresini sular, Selçuk yakınında Ege'ye dökülür; ağzında alüvyal dolgu antik Efes limanını karadan ayırmıştır.",
    "Gediz": "Kula–Salihli–Manisa'dan geçer, İzmir Körfezi kuzeyinde Ege'ye dökülür; graben ovasında akar.",
    "Ceyhan": "Kahramanmaraş'tan geçer, Çukurova'yı sular; Aslantaş Barajı üzerindedir.",
    "Seyhan": "Adana'dan geçer, Çukurova delta ovasını Ceyhan ile birlikte oluşturur; Seyhan Barajı üzerindedir.",
    "Göksu": "Toroslar'dan doğar, Silifke yakınında Göksu deltasını oluşturur.",
    "Çoruh": "Bayburt'tan doğar, Yusufeli ve Artvin'den geçip Gürcistan'da (Batum) Karadeniz'e dökülür; Türkiye'nin en hızlı akan akarsularındandır, Deriner Barajı üzerindedir.",
    "Aras": "Erzurum'dan (Palandöken) doğar, Iğdır ovasını sular; Hazar Denizi havzasına (Kura ile birleşerek) akar.",
    "Kura": "Ardahan çevresinden doğar, Gürcistan ve Azerbaycan'dan geçip Hazar Denizi'ne dökülür.",
    "Meriç": "Bulgaristan'dan gelir, Yunanistan ile sınırımızı oluşturur; Ergene'yi alıp Saros Körfezi'ne dökülür.",
    "Ergene": "Trakya'nın en önemli akarsuyu; Meriç'in kolu. Sanayi kaynaklı kirlilikle bilinir.",
    "Kelkit": "Yeşilırmak'ın en büyük kolu; Kuzey Anadolu Fay Hattı boyunca akar.",
    "Simav": "Susurluk Çayı'nın kolu; Manyas ve Uluabat gölleri çevresinden Marmara'ya ulaşır.",
    "Asi": "Lübnan'dan doğar, güneyden kuzeye akan nadir akarsulardandır; Amik ovasından geçip Samandağ'da Akdeniz'e dökülür.",
    "Bakırçay": "Bergama ovasını sular, Çandarlı Körfezi'ne dökülür.",
    "Filyos": "Batı Karadeniz'in büyük akarsularından; Zonguldak'ta Karadeniz'e dökülür."
  };

  /* Göller: [ad, boylam, enlem, oluşum] — çokgeni olanlar harita-tr.js'te */
  const LAKES = [
    ["Van Gölü", 42.9, 38.65, "volkanik set", "Türkiye'nin en büyük gölü; Nemrut volkanının lavlarıyla önü tıkanmıştır. Sodalı (alkali) sudur, inci kefali yaşar."],
    ["Tuz Gölü", 33.4, 38.8, "tektonik", "Türkiye'nin ikinci büyük gölü; çok sığ ve tuzludur. Tuz üretimi yapılır, yazın büyük kısmı kurur."],
    ["Eğirdir Gölü", 30.85, 38.0, "karstik-tektonik", "Göller Yöresi'nin tatlı su gölü; sulama ve içme suyu kaynağı."],
    ["Beyşehir Gölü", 31.5, 37.75, "karstik-tektonik", "Türkiye'nin en büyük tatlı su gölü."],
    ["Burdur Gölü", 30.18, 37.73, "tektonik", "Göller Yöresi'nde, acı sulu (tuzlu) göl."],
    ["Acıgöl", 29.87, 37.83, "tektonik", "Tuzlu göl; sodyum sülfat üretimi yapılır."],
    ["Salda Gölü", 29.68, 37.55, "karstik", "Berrak suyu ve beyaz kumsalıyla bilinir; karstik göl."],
    ["Hazar Gölü", 39.38, 38.48, "tektonik", "Elazığ'da; Dicle'nin kaynak bölgesindedir."],
    ["Çıldır Gölü", 43.25, 41.07, "volkanik set", "Ardahan–Kars'ta; kışın donar, buz üzerinde balık tutulur."],
    ["Nemrut Krater Gölü", 42.23, 38.62, "volkanik (krater)", "Nemrut Dağı'nın kraterinde oluşmuştur."],
    ["Meke Gölü", 33.64, 37.68, "volkanik (maar)", "Konya Karapınar'da; volkanik patlama çukurunda oluşmuştur."],
    ["Sapanca Gölü", 30.25, 40.72, "tektonik", "Kuzey Anadolu Fay Hattı üzerindedir; tatlı su gölü."],
    ["İznik Gölü", 29.53, 40.43, "tektonik", "Marmara Bölgesi'nin en büyük gölü."],
    ["Manyas (Kuş) Gölü", 27.97, 40.2, "tektonik", "Kuş Cenneti Millî Parkı bu gölün kıyısındadır."],
    ["Uluabat Gölü", 28.6, 40.17, "tektonik", "Bursa'da; sığ ve sulak alan."],
    ["Akşehir Gölü", 31.45, 38.53, "tektonik", "Konya'da; son yıllarda büyük ölçüde kurumuştur."],
    ["Bafa Gölü", 27.5, 37.5, "alüvyal set", "Büyük Menderes'in taşıdığı alüvyonlar körfezin önünü kapatınca oluşmuştur."],
    ["Mogan ve Eymir gölleri", 32.79, 39.77, "alüvyal set", "Ankara Gölbaşı'nda; yan derelerin alüvyonlarıyla önü kapanmıştır."],
    ["Büyükçekmece Gölü", 28.57, 41.05, "kıyı set (lagün)", "Kıyı kordonuyla denizden ayrılmış lagün göl."],
    ["Küçükçekmece Gölü", 28.75, 41.0, "kıyı set (lagün)", "Kıyı kordonuyla denizden ayrılmıştır."],
    ["Terkos Gölü", 28.55, 41.33, "kıyı set (lagün)", "İstanbul'un içme suyu kaynaklarından."],
    ["Tortum Gölü", 41.65, 40.67, "heyelan set", "Heyelanla vadinin önü tıkanınca oluşmuştur; Tortum Şelalesi buradadır."],
    ["Sera Gölü", 39.63, 40.97, "heyelan set", "Trabzon'da; heyelan set gölü."],
    ["Keban Baraj Gölü", 38.8, 38.85, "baraj", "Fırat üzerinde; Türkiye'nin büyük baraj göllerinden."],
    ["Atatürk Baraj Gölü", 38.6, 37.55, "baraj", "Fırat üzerinde; GAP'ın en büyük barajı, Türkiye'nin en büyük baraj gölü."]
  ];

  /* Dağlar: [ad, boylam, enlem, yükselti (m), tür, not] */
  const MOUNTAINS = [
    ["Ağrı Dağı", 44.3, 39.7, 5137, "volkanik", "Türkiye'nin en yüksek dağı."],
    ["Süphan Dağı", 42.83, 38.93, 4058, "volkanik", "Van Gölü'nün kuzeyinde."],
    ["Erciyes Dağı", 35.45, 38.53, 3917, "volkanik", "İç Anadolu'nun en yüksek dağı; kayak merkezi."],
    ["Hasan Dağı", 34.17, 38.13, 3268, "volkanik", "Kapadokya'nın peri bacalarını oluşturan tüflerin kaynağı volkanlardan."],
    ["Nemrut Dağı", 42.23, 38.62, 2948, "volkanik", "Krater gölü vardır; lavları Van Gölü'nün önünü kapatmıştır."],
    ["Karacadağ", 39.83, 37.67, 1957, "volkanik", "Şanlıurfa–Diyarbakır arasında, kalkan volkan."],
    ["Uludoruk (Cilo)", 43.98, 37.47, 4135, "kıvrım", "Güneydoğu Toroslar'ın en yüksek zirvesi; buzulları vardır."],
    ["Kaçkar Dağı", 41.16, 40.84, 3932, "kıvrım", "Doğu Karadeniz Dağları'nın en yüksek zirvesi; buzul gölleri vardır."],
    ["Demirkazık (Aladağlar)", 35.15, 37.82, 3756, "kıvrım", "Orta Toroslar'da."],
    ["Munzur Dağları", 39.85, 39.42, 3463, "kıvrım", "Tunceli–Erzincan arasında."],
    ["Palandöken", 41.27, 39.83, 3176, "kıvrım", "Erzurum'da; kayak merkezi, Aras'ın kaynağı."],
    ["Kızlar Sivrisi (Bey Dağları)", 30.21, 36.6, 3070, "kıvrım", "Batı Toroslar'da."],
    ["Ilgaz Dağları", 33.73, 41.06, 2587, "kıvrım", "Batı Karadeniz'de."],
    ["Uludağ", 29.22, 40.07, 2543, "kırık (horst)", "Marmara Bölgesi'nin en yüksek dağı; kırılmayla yükselmiş horst."],
    ["Kaz Dağları", 26.86, 39.71, 1774, "kırık (horst)", "Edremit Körfezi'nin kuzeyinde; oksijen bakımından zengin ormanlarıyla bilinir."],
    ["Bozdağlar", 28.1, 38.35, 2159, "kırık (horst)", "Gediz ve Küçük Menderes grabenleri arasında horst."],
    ["Aydın Dağları", 27.9, 38.05, 1800, "kırık (horst)", "Küçük ve Büyük Menderes grabenleri arasında."]
  ];
  const RANGES = [
    ["Kuzey Anadolu Dağları", [[30.4, 40.95], [32.0, 41.15], [33.7, 41.1], [35.5, 40.95], [37.3, 40.75], [39.0, 40.7], [40.6, 40.75], [41.6, 41.0], [42.4, 41.3]], "Karadeniz kıyısına paralel kıvrım dağları; Karadeniz'in nemli havasını engelleyerek iç kesimlerin kurak kalmasına yol açar."],
    ["Toros Dağları", [[29.3, 36.9], [30.5, 37.4], [31.6, 37.3], [32.7, 36.95], [34.0, 37.15], [35.2, 37.55], [36.4, 37.85], [37.8, 38.0], [39.2, 38.3], [40.8, 38.45], [42.2, 38.1], [43.6, 37.6], [44.3, 37.35]], "Akdeniz kıyısına paralel uzanan kıvrım dağları; Batı, Orta ve Güneydoğu Toroslar olarak ayrılır. Karstik şekiller yaygındır."],
    ["Yıldız (Istranca) Dağları", [[26.9, 41.9], [27.5, 41.85], [28.0, 41.6]], "Trakya'nın kuzeyinde; Türkiye'nin en eski kara parçalarından (masif)."],
    ["Menteşe Dağları", [[27.6, 37.35], [28.2, 37.15], [28.8, 36.95], [29.3, 36.8]], "Muğla çevresinde; kıyıya dik uzandığı için ria tipi kıyılar oluşmuştur."]
  ];
  /* Ovalar ve platolar: [ad, boylam, enlem, tür, not] */
  const PLAINS = [
    ["Çukurova", 35.4, 36.9, "delta ovası", "Seyhan ve Ceyhan'ın oluşturduğu Türkiye'nin en büyük delta ovası; pamuk, turunçgil, mısır."],
    ["Bafra Ovası", 35.9, 41.6, "delta ovası", "Kızılırmak deltası."],
    ["Çarşamba Ovası", 36.72, 41.25, "delta ovası", "Yeşilırmak deltası."],
    ["Söke Ovası", 27.35, 37.6, "delta ovası", "Büyük Menderes deltası."],
    ["Silifke Ovası", 33.95, 36.33, "delta ovası", "Göksu deltası."],
    ["Konya Ovası", 32.8, 37.8, "tektonik ova", "Türkiye'nin en geniş ovası; tahıl ve şeker pancarı. Obruklar görülür."],
    ["Harran Ovası", 39.0, 36.95, "ova", "GAP ile sulanan, pamuk üretiminin yoğun olduğu ova."],
    ["Amik Ovası", 36.35, 36.3, "tektonik ova", "Hatay'da; kurutulan Amik Gölü'nün yerinde."],
    ["Muş Ovası", 41.6, 38.8, "tektonik ova", "Murat Irmağı'nın suladığı ova."],
    ["Iğdır Ovası", 44.0, 39.95, "ova", "Aras'ın suladığı, düşük yükseltisi nedeniyle bölgenin ılık ovası; pamuk yetişir."],
    ["Malatya Ovası", 38.3, 38.35, "ova", "Kayısı üretimiyle bilinir."],
    ["Bursa Ovası", 29.05, 40.2, "tektonik ova", "Sebze-meyve ve şeftali."],
    ["Erzurum–Kars Platosu", 42.6, 40.4, "lav platosu", "Lav akıntılarıyla oluşmuş yüksek düzlük; çayırlar ve büyükbaş hayvancılık."],
    ["Taşeli Platosu", 33.2, 36.65, "karstik plato", "Orta Toroslar'da kireçtaşından plato."],
    ["Teke Platosu", 29.9, 36.85, "karstik plato", "Batı Toroslar'da."],
    ["Cihanbeyli Platosu", 32.9, 38.7, "aşınım platosu", "Tuz Gölü'nün batısında."],
    ["Haymana Platosu", 32.55, 39.4, "aşınım platosu", "Ankara'nın güneyinde."],
    ["Obruk Platosu", 33.8, 38.25, "karstik plato", "Konya–Aksaray arasında; obruklarıyla bilinir."],
    ["Ürgüp Platosu", 34.9, 38.6, "volkanik (tüf) plato", "Kapadokya; peri bacaları."]
  ];

  /* Tarım ürünleri ve madenler: ad → öne çıkan iller (plaka) */
  const CROPS = [
    ["Çay", "#2e8b57", [53, 61, 8], "Nemli ve asitli toprak ister; Doğu Karadeniz kıyısında yetişir."],
    ["Fındık", "#a0522d", [52, 28, 55, 54, 81, 61], "Dünya üretiminin büyük bölümü Türkiye'de; Karadeniz kıyısı."],
    ["Pamuk", "#e8e8e8", [63, 9, 1, 31, 21], "Sıcak ve güneşli, sulanabilir ovalar; Harran, Çukurova, Büyük Menderes."],
    ["Zeytin", "#7a8b2c", [9, 35, 48, 10, 45, 16, 31], "Akdeniz ikliminin simgesi; Ege kıyıları başta."],
    ["Antep fıstığı", "#93c47d", [27, 63, 56, 2], "Güneydoğu Anadolu'da."],
    ["Kayısı", "#f6b26b", [44], "Malatya, dünya kuru kayısı üretiminde ilk sırada."],
    ["Turunçgil", "#ff9900", [33, 1, 7, 31], "Kış donu olmayan Akdeniz kıyısı."],
    ["Muz", "#ffd966", [33, 7], "Anamur (Mersin) ve Alanya (Antalya) çevresi."],
    ["Şeker pancarı", "#cc4125", [42, 26, 3, 38, 68], "İç Anadolu'da; şeker fabrikalarıyla birlikte."],
    ["Ayçiçeği", "#f1c232", [59, 22, 39, 1], "Trakya başta; yağ sanayisi."],
    ["Haşhaş", "#c27ba0", [3, 64, 15, 20, 32, 43], "Devlet denetiminde, izinli illerde ekilir."],
    ["Yağ gülü", "#e06666", [32, 15], "Isparta çevresi; gül yağı üretimi."],
    ["Çeltik (pirinç)", "#b6d7a8", [22, 55, 19, 10, 57], "Bol su ister; Meriç ve Kızılırmak havzaları."],
    ["Tütün", "#8e7cc3", [2, 72, 49, 45], "Güneydoğu ve Ege'de."]
  ];
  const MINES = [
    ["Taş kömürü", "#333333", [67], "Zonguldak havzası; Türkiye'deki tek önemli taş kömürü yatağı. Ereğli ve Karabük demir-çelik fabrikalarını besler."],
    ["Linyit", "#6b4f3a", [46, 45, 43, 48, 1], "Afşin–Elbistan (Kahramanmaraş), Soma (Manisa), Tunçbilek (Kütahya), Yatağan (Muğla); termik santrallerde kullanılır."],
    ["Bor", "#7bb3ff", [10, 26, 43], "Dünya rezervinin büyük bölümü Türkiye'de; Bigadiç, Kırka, Emet."],
    ["Krom", "#9fc5e8", [23, 48, 26, 7], "Guleman (Elazığ), Fethiye (Muğla); paslanmaz çelik yapımında."],
    ["Demir", "#a61c00", [58, 44, 38], "Divriği (Sivas), Hekimhan (Malatya); Karabük, Ereğli, İskenderun fabrikalarına gider."],
    ["Bakır", "#e69138", [8, 37, 23], "Murgul (Artvin), Küre (Kastamonu), Maden (Elazığ)."],
    ["Petrol", "#000000", [72, 2, 73], "Batman, Adıyaman ve Şırnak; Batman rafinerisi."],
    ["Boksit (alüminyum)", "#d5a6bd", [42], "Seydişehir (Konya) alüminyum tesisleri."],
    ["Mermer", "#f3f3f3", [3, 10, 20, 48], "Afyon, Marmara Adası (Balıkesir), Denizli, Muğla."],
    ["Jeotermal enerji", "#ff6d6d", [20, 9, 45, 35], "Kırık hatları boyunca; Denizli Sarayköy, Aydın Germencik."]
  ];

  /* Türkiye'nin komşuları (kara sınırı) */
  const NEIGHBORS = ["Yunanistan", "Bulgaristan", "Gürcistan", "Ermenistan", "Azerbaycan", "İran", "Irak", "Suriye"];

  /* Dünya: boğaz ve kanallar [ad, boylam, enlem, not] */
  const STRAITS = [
    ["İstanbul Boğazı", 29.05, 41.1, "Karadeniz'i Marmara'ya bağlar; Avrupa ile Asya'yı ayırır."],
    ["Çanakkale Boğazı", 26.4, 40.2, "Marmara'yı Ege Denizi'ne bağlar."],
    ["Süveyş Kanalı", 32.35, 30.5, "Akdeniz'i Kızıldeniz'e bağlar; Avrupa–Asya deniz yolunu kısaltır (Mısır)."],
    ["Panama Kanalı", -79.7, 9.1, "Atlas Okyanusu'nu Büyük Okyanus'a bağlar."],
    ["Cebelitarık Boğazı", -5.6, 35.95, "Akdeniz'i Atlas Okyanusu'na bağlar; Avrupa ile Afrika'yı ayırır."],
    ["Hürmüz Boğazı", 56.4, 26.5, "Basra Körfezi'nin çıkışı; dünya petrol taşımacılığının kilit noktası."],
    ["Babülmendep Boğazı", 43.4, 12.6, "Kızıldeniz'i Aden Körfezi'ne (Hint Okyanusu) bağlar."],
    ["Malakka Boğazı", 100.3, 3.5, "Hint Okyanusu'nu Büyük Okyanus'a bağlar; dünyanın en işlek deniz yollarından."],
    ["Manş Denizi", -1.5, 50.2, "İngiltere ile Fransa arasında; altından tünel geçer."],
    ["Bering Boğazı", -169.0, 65.8, "Asya ile Kuzey Amerika'yı ayırır."],
    ["Macellan Boğazı", -71.0, -53.5, "Güney Amerika'nın güney ucunda; Atlas ve Büyük okyanusları birleştirir."],
    ["Kerç Boğazı", 36.5, 45.3, "Karadeniz'i Azak Denizi'ne bağlar."]
  ];

  App.data.mapInfo = { REG, REG_INFO, CLIM, RIVERS_X, RIVER_INFO, LAKES, MOUNTAINS, RANGES, PLAINS, CROPS, MINES, NEIGHBORS, STRAITS };
})();
