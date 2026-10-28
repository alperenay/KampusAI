/* Authored practice material. CEFR labels guide practice; no certified placement claim. */
(function () {
  const vocab = {
    A1: [
      ["der Name", "isim"],
      ["die Schule", "okul"],
      ["das Buch", "kitap"],
      ["die Familie", "aile"],
      ["das Wasser", "su"],
      ["der Apfel", "elma"],
      ["heute", "bugün"],
      ["morgen", "yarın"],
      ["lernen", "öğrenmek"],
      ["wohnen", "ikamet etmek"],
      ["klein", "küçük"],
      ["freundlich", "arkadaş canlısı"],
    ],
    A2: [
      ["der Bahnhof", "tren istasyonu"],
      ["die Fahrkarte", "bilet"],
      ["die Wohnung", "daire"],
      ["der Termin", "randevu"],
      ["die Gesundheit", "sağlık"],
      ["die Erfahrung", "deneyim"],
      ["einkaufen", "alışveriş yapmak"],
      ["vergleichen", "karşılaştırmak"],
      ["pünktlich", "dakik"],
      ["gestern", "dün"],
      ["deshalb", "bu nedenle"],
      ["unterwegs", "yolda"],
    ],
    B1: [
      ["die Ausbildung", "mesleki eğitim"],
      ["die Bewerbung", "iş başvurusu"],
      ["die Umwelt", "çevre"],
      ["die Entscheidung", "karar"],
      ["die Möglichkeit", "olanak"],
      ["die Verantwortung", "sorumluluk"],
      ["begründen", "gerekçelendirmek"],
      ["vermeiden", "kaçınmak"],
      ["zuverlässig", "güvenilir"],
      ["obwohl", "-mesine rağmen"],
      ["während", "sırasında"],
      ["außerdem", "ayrıca"],
    ],
    B2: [
      ["die Voraussetzung", "ön koşul"],
      ["die Nachhaltigkeit", "sürdürülebilirlik"],
      ["die Auswirkung", "etki"],
      ["der Zusammenhang", "bağlantı"],
      ["die Schlussfolgerung", "çıkarım"],
      ["der Widerspruch", "çelişki"],
      ["berücksichtigen", "dikkate almak"],
      ["gewährleisten", "güvence altına almak"],
      ["nachvollziehbar", "anlaşılabilir"],
      ["allerdings", "ancak"],
      ["infolgedessen", "bunun sonucunda"],
      ["dennoch", "yine de"],
    ],
  };
  const grammar = {
    A1: [
      [
        "Sein · özneye göre çekim",
        "Ich bin, du bist, er/sie/es ist.",
        "Ich ___ Schülerin.",
        ["bin", "bist", "ist"],
        0,
      ],
      [
        "Düzenli fiiller",
        "Ich lerne; du lernst; wir lernen.",
        "Wir ___ Deutsch.",
        ["lernt", "lernen", "lernst"],
        1,
      ],
      [
        "Belirli artikel",
        "Sözcüğü artikeliyle öğren: der, die, das.",
        "___ Buch ist neu.",
        ["Der", "Die", "Das"],
        2,
      ],
    ],
    A2: [
      [
        "Perfekt",
        "Haben/sein + Partizip II; ortaç sonda.",
        "Ich habe gestern Deutsch ___.",
        ["gelernt", "lerne", "lernen"],
        0,
      ],
      [
        "Akkusativ",
        "Eril belirsiz artikel ein → einen.",
        "Ich kaufe ___ Apfel.",
        ["ein", "einen", "einem"],
        1,
      ],
      [
        "Weil yan cümlesi",
        "Weil ile çekimli fiil sona gider.",
        "Ich lerne, weil ich Zeit ___.",
        ["haben", "habe", "hast"],
        1,
      ],
    ],
    B1: [
      [
        "Konjunktiv II · rica",
        "Könnte ve würde nazik rica kurar.",
        "___ Sie mir bitte helfen?",
        ["Konnten", "Könnenst", "Könnten"],
        2,
      ],
      [
        "Obwohl · karşıtlık",
        "Yan cümlede çekimli fiil sonda.",
        "Obwohl es regnet, ___ wir spazieren.",
        ["gehen", "wir gehen", "gegangen"],
        0,
      ],
      [
        "İlgi cümlesi",
        "İlgi zamiri adın cinsiyet ve cümledeki görevine bağlıdır.",
        "Das ist die Frau, ___ hier arbeitet.",
        ["der", "die", "das"],
        1,
      ],
    ],
    B2: [
      [
        "Passiv · süreç",
        "Werden + Partizip II.",
        "Die Daten ___ ausgewertet.",
        ["haben", "sind worden", "werden"],
        2,
      ],
      [
        "Dolaylı anlatım",
        "Konjunktiv I: er sei, er habe.",
        "Er sagt, er ___ bereit.",
        ["sei", "sein", "seien"],
        0,
      ],
      [
        "Je … desto",
        "Karşılaştırmalı yapı: je mehr … desto besser.",
        "Je mehr ich übe, ___ besser spreche ich.",
        ["weil", "desto", "obwohl"],
        1,
      ],
    ],
  };
  const dialogs = {
    A1: [
      [
        "Hallo! Wie heißt du?",
        ["Ich heiße Deniz.", "Es regnet.", "Das kostet fünf Euro."],
        0,
        "Adını söylemek için Ich heiße … kullanılır.",
      ],
      [
        "Wo wohnst du?",
        ["Ich bin sechzehn.", "Ich wohne in Ankara.", "Danke, gut."],
        1,
        "Yer belirtmek için Ich wohne in … denir.",
      ],
      [
        "Was lernst du?",
        ["Guten Abend.", "Bis morgen.", "Ich lerne Deutsch."],
        2,
        "Lernen fiilinin birinci tekil çekimi lerne olur.",
      ],
    ],
    A2: [
      [
        "Guten Tag! Wohin möchten Sie fahren?",
        ["Nach Berlin, bitte.", "Ich habe Hunger.", "Mein Buch ist neu."],
        0,
        "Nach, artikelsiz şehir ve ülke adlarıyla yön belirtir.",
      ],
      [
        "Möchten Sie eine einfache Fahrt oder hin und zurück?",
        ["Es ist sonnig.", "Hin und zurück, bitte.", "Ich bin zu Hause."],
        1,
        "Hin und zurück gidiş dönüş anlamına gelir.",
      ],
      [
        "Wann möchten Sie zurückfahren?",
        ["Das ist mein Bruder.", "Ich spiele gern.", "Morgen Nachmittag."],
        2,
        "Zaman sorusuna zaman ifadesiyle yanıt verilir.",
      ],
    ],
    B1: [
      [
        "Warum möchten Sie hier eine Ausbildung machen?",
        [
          "Weil ich mich für Technik interessiere.",
          "Der Zug ist blau.",
          "Ich hätte einen Kaffee.",
        ],
        0,
        "Gerekçeyi weil yan cümlesiyle açıkla.",
      ],
      [
        "Welche Erfahrungen haben Sie?",
        [
          "Der Laden ist dort.",
          "Ich habe ein Praktikum in einer Werkstatt gemacht.",
          "Es ist acht Uhr.",
        ],
        1,
        "Geçmiş deneyim Perfekt ile anlatılabilir.",
      ],
      [
        "Wie gehen Sie mit Schwierigkeiten um?",
        [
          "Die Fahrkarte, bitte.",
          "Ich wohne nebenan.",
          "Ich suche zuerst nach der Ursache und frage dann nach Hilfe.",
        ],
        2,
        "Süreç anlatımında zuerst ve dann sıralama sağlar.",
      ],
    ],
    B2: [
      [
        "Welche Vorteile hat die Nutzung öffentlicher Verkehrsmittel?",
        [
          "Sie kann den Verkehr und die Emissionen verringern.",
          "Ich bin gestern angekommen.",
          "Das ist mein Ausweis.",
        ],
        0,
        "Bir görüşü somut etkileriyle gerekçelendir.",
      ],
      [
        "Gibt es auch Nachteile?",
        [
          "Das Buch liegt auf dem Tisch.",
          "Allerdings sind die Verbindungen auf dem Land oft begrenzt.",
          "Ich heiße Deniz.",
        ],
        1,
        "Allerdings ile karşı görüş veya sınırlılık eklenebilir.",
      ],
      [
        "Welche Schlussfolgerung ziehen Sie daraus?",
        [
          "Ich kaufe zwei Äpfel.",
          "Guten Morgen!",
          "Deshalb sollte das Angebot gezielt ausgebaut werden.",
        ],
        2,
        "Deshalb ile gerekçeli bir sonuç öner.",
      ],
    ],
  };
  App.data.languages = {
    levels: ["A1", "A2", "B1", "B2"],
    profiles: {
      en: { name: "English", locale: "en-US", route: "konusma", scenarios: App.konusma && App.konusma.scenarios },
      de: {
        name: "Deutsch",
        locale: "de-DE",
        route: "konusma/de",
        vocab,
        grammar,
        dialogs,
      },
    },
  };
})();
