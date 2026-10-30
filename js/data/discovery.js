(function () {
  App.data.discovery = {
    modules: [
      [
        "bana-ogret",
        "Bana Öğret",
        "Kavramı kafası karışmış bir arkadaşına anlat; kazanım listesini ve geri bildirimi incele.",
        "grad",
      ],
      [
        "telefon-fizik",
        "Telefon Fizik Atölyesi",
        "Ses uçuş süresi, yankı, Doppler, sarkaç ve asansör verilerini ölç veya açıkça etiketlenmiş örneklerle incele.",
        "mic",
      ],
      [
        "dokunsal-grafik",
        "Titreşimli Grafik",
        "Eğriyi dokunarak veya klavyeyle izle; kök, eksen ve tepe noktalarını ses ve titreşimle keşfet.",
        "chart",
      ],
      [
        "deney-raporu",
        "Bilimsel Deney Raporu",
        "Ham veriyi, doğru türde uyum eğrisini, hata hesabını ve kendi sonucunu PDF yazdırma raporunda birleştir.",
        "note",
      ],
      [
        "sismograf",
        "Sismograf Atölyesi",
        "Üç eksenli titreşim kaydı, frekans kontrolü, eğitim amaçlı istasyon oyunu ve afet çantası.",
        "layers",
      ],
      [
        "gokyuzu",
        "Gökyüzü Modu",
        "Konum ve UTC zamanına göre çevrimdışı gezegen, yıldız ve Ay evresi görünümü.",
        "star",
      ],
      [
        "ciz-calissin",
        "Çiz, Çalışsın",
        "Çizim/fotoğraftan önerilen devreyi onayla; devre, kuvvet, optik ve rampa modellerini çalıştır.",
        "pen",
      ],
      [
        "tarih-haritasi",
        "Yaşayan Tarih Haritası",
        "1071–1923 dönemlerini, şematik sınırları, ticaret ve sefer rotalarını kaynaklarıyla incele.",
        "map",
      ],
    ],
    sources: {
      astronomy: "https://ssd.jpl.nasa.gov/planets/approx_pos.html",
      doppler: "https://www.animations.physics.unsw.edu.au/jw/doppler.htm",
      earthquake: "https://earthquake.usgs.gov/",
      kit: "https://www.afad.gov.tr/afet-ve-acil-durum-cantasi-nasil-hazirlanmali",
      curriculum: "https://tymm.meb.gov.tr/ogretim-programlari",
    },
    stars: [
      ["Sirius", 101.287, -16.716],
      ["Vega", 279.235, 38.784],
      ["Kutup Yıldızı", 37.955, 89.264],
      ["Betelgeuse", 88.793, 7.407],
      ["Rigel", 78.634, -8.202],
      ["Altair", 297.696, 8.868],
      ["Deneb", 310.358, 45.28],
      ["Antares", 247.352, -26.432],
    ],
    // Original schematic teaching drawings, deliberately not authoritative boundary geometry.
    faults: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Kuzey Anadolu zonu (şematik)",
            source:
              "https://www.mta.gov.tr/v3.0/hizmetler/yenilenmis-diri-fay-haritalari",
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [26.5, 40.6],
              [29, 40.7],
              [31.3, 40.7],
              [33.5, 40.9],
              [36, 40.6],
              [38.5, 40],
              [40.8, 39.5],
            ],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "Doğu Anadolu zonu (şematik)",
            source:
              "https://www.mta.gov.tr/v3.0/hizmetler/yenilenmis-diri-fay-haritalari",
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [36, 36],
              [37, 37.2],
              [38.5, 38.3],
              [39.6, 38.7],
              [40.8, 39.5],
            ],
          },
        },
      ],
    },
    history: [
      {
        year: 1071,
        title: "Malazgirt ve Anadolu",
        text: "Malazgirt sonrasında Anadolu’nun siyasal yapısı zaman içinde değişti; savaş günü tüm bölgenin sınırları bir anda değişmedi.",
        polygon: [
          [27, 40],
          [34, 42],
          [43, 39],
          [39, 36],
          [30, 36],
        ],
        source: "https://islamansiklopedisi.org.tr/malazgirt-muharebesi",
      },
      {
        year: 1299,
        title: "Osmanlı Beyliği: kuruluş dönemi",
        text: "1299 geleneksel kuruluş tarihidir. Söğüt–Bilecik çevresindeki alan yaklaşık bir odak bölgesi olarak gösterilir.",
        polygon: [
          [29, 40.6],
          [31, 40.4],
          [31, 39.5],
          [29, 39.5],
        ],
        source: "https://islamansiklopedisi.org.tr/osmanlilar",
      },
      {
        year: 1453,
        title: "İstanbul’un Fethi",
        text: "İstanbul’un fethi siyasi ve ticari ağları etkiledi. Şekil tüm egemenlik alanlarını temsil etmez.",
        polygon: [
          [21, 43],
          [29, 42],
          [35, 41],
          [36, 37],
          [28, 36],
          [23, 39],
        ],
        source: "https://islamansiklopedisi.org.tr/istanbulun-fethi",
      },
      {
        year: 1683,
        title: "Genişleme ve dönüşüm",
        text: "II. Viyana Kuşatması, ardından savaşlar ve 1699 Karlofça Antlaşması sınırların değişiminde dönüm noktalarıdır.",
        polygon: [
          [17, 47],
          [28, 47],
          [42, 42],
          [45, 32],
          [35, 29],
          [22, 32],
          [19, 40],
        ],
        source: "https://islamansiklopedisi.org.tr/viyana",
      },
      {
        year: 1839, title: "Tanzimat ve idari dönüşüm",
        text: "3 Kasım 1839’da ilan edilen Gülhane Hatt-ı Hümâyunu, Tanzimat reformlarının temel dönüm noktalarındandır. Gösterilen şekil İstanbul merkezli bağlam alanıdır; imparatorluk sınırı değildir.",
        polygon: [[27,42],[31,42],[31,39],[27,39]],
        source: "https://islamansiklopedisi.org.tr/tanzimat"
      },
      {
        year: 1923,
        title: "Cumhuriyet ve Lozan",
        text: "1923: Lozan Antlaşması ve Cumhuriyet’in ilanı. Hatay 1939’da katıldı; bu 1923 şeması günümüzün kesin sınır haritası değildir.",
        polygon: [
          [26, 41],
          [28, 42],
          [42, 41],
          [44, 38],
          [40, 37],
          [36.5, 36.5],
          [30, 36],
        ],
        source: "https://islamansiklopedisi.org.tr/lozan-antlasmasi",
      },
    ],
    routes: [
      {
        name: "İpek yolları (çok sayıda kolun temsili)",
        type: "trade",
        points: [
          [12, 42],
          [29, 41],
          [44, 38],
          [60, 40],
          [75, 40],
          [108, 34],
        ],
        source: "https://en.unesco.org/silkroad/about-silk-roads",
      },
      {
        name: "Baharat deniz yolları (şematik)",
        type: "trade",
        points: [
          [29, 31],
          [43, 13],
          [57, 18],
          [73, 10],
          [80, 7],
        ],
        source: "https://en.unesco.org/silkroad/about-silk-roads",
      },
      {
        name: "Malazgirt yönelimi (1071, şematik)",
        type: "campaign",
        year: 1071,
        points: [
          [44, 38],
          [43, 39],
          [42.5, 39.1],
        ],
        source: "https://islamansiklopedisi.org.tr/malazgirt-muharebesi",
      },
      {
        name: "Viyana yönelimi (1683, şematik)",
        type: "campaign",
        year: 1683,
        points: [
          [29, 41],
          [23, 43],
          [19, 47],
          [16.4, 48.2],
        ],
        source: "https://islamansiklopedisi.org.tr/viyana",
      },
    ],
  };
})();
