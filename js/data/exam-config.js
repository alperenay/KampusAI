/* =========================================================
   exam-config.js — TYT / AYT test yapısı
   Soru sayıları değişirse sadece bu dosyayı güncellemek yeterli.
   Ad alanları iki dillidir: { tr, en }  →  App.L(...) ile okunur.
   "group" alanı AYT formunda başlık satırı olarak gösterilir.
   ========================================================= */
App.data.exams = {
  /** Kaç yanlış bir doğruyu götürür */
  wrongPenalty: 4,

  types: {
    TYT: {
      name: "TYT",
      long: { tr: "Temel Yeterlilik Testi", en: "Basic Proficiency Test" },
      subjects: [
        { id: "turkce",    questions: 40, name: { tr: "Türkçe",          en: "Turkish" },          short: { tr: "Türkçe",    en: "Turkish" } },
        { id: "sosyal",    questions: 20, name: { tr: "Sosyal Bilimler", en: "Social Sciences" },  short: { tr: "Sosyal",    en: "Social" } },
        { id: "matematik", questions: 40, name: { tr: "Temel Matematik", en: "Basic Mathematics" },short: { tr: "Matematik", en: "Math" } },
        { id: "fen",       questions: 20, name: { tr: "Fen Bilimleri",   en: "Science" },          short: { tr: "Fen",       en: "Science" } }
      ]
    },
    AYT: {
      name: "AYT",
      long: { tr: "Alan Yeterlilik Testleri", en: "Field Proficiency Tests" },
      subjects: (function () {
        const MAT = { tr: "Matematik", en: "Mathematics" };
        const FEN = { tr: "Fen Bilimleri", en: "Science" };
        const ES1 = { tr: "Edebiyat – Sosyal Bilimler-1", en: "Literature – Social Sciences-1" };
        const SB2 = { tr: "Sosyal Bilimler-2", en: "Social Sciences-2" };
        return [
          { id: "matematik", questions: 40, group: MAT, name: { tr: "Matematik", en: "Mathematics" }, short: { tr: "Matematik", en: "Math" } },
          { id: "fizik",     questions: 14, group: FEN, name: { tr: "Fizik", en: "Physics" } },
          { id: "kimya",     questions: 13, group: FEN, name: { tr: "Kimya", en: "Chemistry" } },
          { id: "biyoloji",  questions: 13, group: FEN, name: { tr: "Biyoloji", en: "Biology" } },
          { id: "edebiyat",  questions: 24, group: ES1, name: { tr: "Türk Dili ve Edebiyatı", en: "Turkish Language & Literature" }, short: { tr: "Edebiyat", en: "Literature" } },
          { id: "tarih1",    questions: 10, group: ES1, name: { tr: "Tarih-1", en: "History-1" } },
          { id: "cografya1", questions: 6,  group: ES1, name: { tr: "Coğrafya-1", en: "Geography-1" } },
          { id: "tarih2",    questions: 11, group: SB2, name: { tr: "Tarih-2", en: "History-2" } },
          { id: "cografya2", questions: 11, group: SB2, name: { tr: "Coğrafya-2", en: "Geography-2" } },
          { id: "felsefe",   questions: 12, group: SB2, name: { tr: "Felsefe Grubu", en: "Philosophy Group" }, short: { tr: "Felsefe", en: "Philosophy" } },
          { id: "din",       questions: 6,  group: SB2, name: { tr: "Din Kültürü", en: "Religious Culture" }, short: { tr: "Din", en: "Religion" } }
        ];
      })()
    }
  }
};

/** Net = Doğru − Yanlış / 4 */
App.data.exams.calcNet = function (correct, wrong) {
  const d = Math.max(0, Number(correct) || 0);
  const y = Math.max(0, Number(wrong) || 0);
  return App.utils.round(d - y / App.data.exams.wrongPenalty, 2);
};
