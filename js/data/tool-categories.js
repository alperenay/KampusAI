/* One taxonomy shared by the sidebar, tool catalogue and page breadcrumbs. */
(function () {
  const groups = [
    {
      id: "ai",
      icon: "sparkle",
      title: ["AI ile öğren", "Learn with AI"],
      description: [
        "Sor, anlat, çözümünü kontrol et",
        "Ask, explain and check your work",
      ],
      routes: [
        "",
        "sesli",
        "bana-ogret",
        "kavram",
        "canli",
        "kontrol",
        "cevre",
      ],
    },
    {
      id: "study",
      icon: "book",
      title: ["Dersler ve kaynaklar", "Lessons & resources"],
      description: [
        "Konu, formül, yazılı ve dil çalış",
        "Topics, formulas, exams and languages",
      ],
      routes: ["konular", "formuller", "yazili", "konusma", "video", "podcast"],
    },
    {
      id: "practice",
      icon: "refresh",
      title: ["Tekrar ve pratik", "Review & practice"],
      description: [
        "Pekiştir, hatanı bul, kendini sına",
        "Practise, find errors and test yourself",
      ],
      routes: [
        "tekrar",
        "kartlar",
        "yanlislar",
        "aktarim",
        "hata-avcisi",
        "paragraf",
        "simulasyon",
        "duello",
        "oyunlar",
        "yolculuk",
      ],
    },
    {
      id: "science",
      icon: "lightbulb",
      title: ["Deney ve ölçüm", "Experiments & measurements"],
      description: [
        "Laboratuvar, sensör ve bilimsel rapor",
        "Labs, sensors and scientific reports",
      ],
      routes: [
        "lab",
        "sensor",
        "telefon-fizik",
        "ph",
        "ekosistem",
        "vatandas",
        "dokunsal-grafik",
        "deney-raporu",
        "sismograf",
        "ciz-calissin",
        "canlanan-kitap",
      ],
    },
    {
      id: "explore",
      icon: "globe",
      title: ["Haritalar ve 3B", "Maps & 3D"],
      description: [
        "Dünyayı, tarihi ve modelleri keşfet",
        "Explore the world, history and models",
      ],
      routes: [
        "kure",
        "atlas",
        "modeller",
        "gokyuzu",
        "zaman",
        "tarih-haritasi",
        "evren",
        "kesif",
      ],
    },
    {
      id: "track",
      icon: "chart",
      title: ["Plan ve gelişim", "Planning & progress"],
      description: [
        "Gününü planla, hedefini ve ilerlemeni izle",
        "Plan your day and follow your goals",
      ],
      routes: [
        "bugun",
        "program",
        "denemeler",
        "harita",
        "odak",
        "kok",
        "rapor",
        "karne",
        "puan",
        "kariyer",
        "meslek",
        "tercih",
      ],
    },
    {
      id: "classroom",
      icon: "grad",
      title: ["Öğretmen ve sınıf", "Teachers & classrooms"],
      description: [
        "Ödev, QR, değerlendirme ve araştırma",
        "Assignments, QR, reviews and research",
      ],
      routes: ["sinif-modu", "degerlendirme", "arastirma", "sinif"],
    },
    {
      id: "tools",
      icon: "compass",
      title: ["Yardım ve araçlar", "Help & utilities"],
      description: [
        "Rehber, hesap makinesi ve kaynakça",
        "Guide, calculator and references",
      ],
      routes: ["rehber", "hesap", "hakkinda"],
    },
  ];
  function groupFor(route) {
    return (
      groups.find((g) => g.routes.includes(String(route).split("/")[0])) ||
      groups[groups.length - 1]
    );
  }
  const text = (pair) => pair[App.i18n?.lang === "en" ? 1 : 0];
  App.toolCategories = { groups, groupFor, text };
})();
