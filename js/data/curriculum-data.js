/* =========================================================
   curriculum-data.js — Sınıf → Ders → Ünite → Kazanım ağacı

   İÇERİK EKLEME REHBERİ
   ---------------------
   Bir dersin ünite listesine (aşağıdaki CONTENT) ünite ekleyin.
   Metin alanları düz metin ("…") ya da iki dilli ({ tr: "…", en: "…" })
   olabilir. İngilizcesi verilmezse İngilizce arayüzde Türkçesi gösterilir.

   {
     id: "u1",                         // ders içinde benzersiz, URL'de görünür
     name: { tr: "Sayılar", en: "Numbers" },
     outcomes: [
       {
         id: "k1",                     // ünite içinde benzersiz
         code: "MAT.9.1.1",            // kazanım kodu (isteğe bağlı)
         title: { tr: "Kazanım başlığı", en: "Outcome title" },
         content: {                    // yoksa sayfa "içerik yakında" şablonunu gösterir
           anlatim: { tr: "Markdown + LaTeX: **kalın**, - liste, $x^2$, $$\\frac{a}{b}$$", en: "…" },
           ornekler: [ { soru: "…", cozum: "…" } ],
           ozet: [ "Hap bilgi 1", "Hap bilgi 2" ]
         }
       }
     ]
   }

   Ders listesi şimdilik genel lise programına göre hazırlanmıştır;
   ders eklemek/çıkarmak için SUBJECTS ve GRADES bölümlerini düzenleyin.
   ========================================================= */
(function () {
  // Ders kimlikleri, görünen adları ve kart renkleri
  const SUBJECTS = {
    edebiyat:  { name: { tr: "Türk Dili ve Edebiyatı", en: "Turkish Language and Literature" }, color: "#ff8a80" },
    matematik: { name: { tr: "Matematik", en: "Mathematics" }, color: "#7aa2ff" },
    fizik:     { name: { tr: "Fizik", en: "Physics" }, color: "#5bc0de" },
    kimya:     { name: { tr: "Kimya", en: "Chemistry" }, color: "#5bc0a8" },
    biyoloji:  { name: { tr: "Biyoloji", en: "Biology" }, color: "#8fd16a" },
    tarih:     { name: { tr: "Tarih", en: "History" }, color: "#e0a458" },
    inkilap:   { name: { tr: "T.C. İnkılap Tarihi ve Atatürkçülük", en: "History of the Turkish Revolution and Kemalism" }, color: "#e0a458" },
    cografya:  { name: { tr: "Coğrafya", en: "Geography" }, color: "#d4b45a" },
    felsefe:   { name: { tr: "Felsefe", en: "Philosophy" }, color: "#c08cff" },
    din:       { name: { tr: "Din Kültürü ve Ahlak Bilgisi", en: "Religious Culture and Ethics" }, color: "#9fa8da" },
    ingilizce: { name: { tr: "İngilizce", en: "English" }, color: "#f48fb1" }
  };

  // Her sınıfta hangi dersler var
  const GRADES = {
    "9":  ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "din", "ingilizce"],
    "10": ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "felsefe", "din", "ingilizce"],
    "11": ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "felsefe", "din", "ingilizce"],
    "12": ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "inkilap", "cografya", "felsefe", "din", "ingilizce"]
  };

  // İçerikler js/data/content/*.js dosyalarından gelir:
  //   App.data.content["9/matematik"] = [ ...üniteler ]
  // Yeni içerik için o klasöre dosya ekleyip index.html'de bu dosyadan ÖNCE yükleyin.
  const CONTENT_SRC = App.data.content || {};
  const CONTENT = {};
  Object.keys(CONTENT_SRC).forEach((key) => {
    const [g, sid] = key.split("/");
    (CONTENT[g] = CONTENT[g] || {})[sid] = CONTENT_SRC[key];
  });

  const grades = Object.keys(GRADES).map((g) => ({
    id: g,
    subjects: GRADES[g].map((sid) => ({
      id: sid,
      name: SUBJECTS[sid].name,
      color: SUBJECTS[sid].color,
      units: (CONTENT[g] && CONTENT[g][sid]) || []
    }))
  }));

  App.data.curriculum = {
    grades,
    /** Görünen sınıf adı: "9. Sınıf" / "Grade 9" */
    gradeName: (g) => App.t("grade.name", { n: typeof g === "object" ? g.id : g }),
    findGrade: (g) => grades.find((x) => x.id === g),
    findSubject: (g, s) => {
      const grade = grades.find((x) => x.id === g);
      return grade && grade.subjects.find((x) => x.id === s);
    },
    /** İlerleme kaydı için benzersiz anahtar: "9/matematik/u1/k1" */
    key: (g, s, u, k) => [g, s, u, k].join("/")
  };
})();
