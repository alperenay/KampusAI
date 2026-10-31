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
  };
})();
