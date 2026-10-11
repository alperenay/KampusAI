/* =========================================================
   default-schedule.js — sistemdeki hazır haftalık program
   day: 0 = Pazartesi … 6 = Pazar
   kind: ders | soru | tekrar | deneme | mola  (renk ve açıklama için;
         görünen adları dil dosyalarındaki "kind.<tür>" anahtarlarından gelir)
   Metinler iki dillidir: { tr, en }
   ========================================================= */
App.data.scheduleKinds = {
  ders:   { color: "#7aa2ff" },
  soru:   { color: "#5bc0a8" },
  tekrar: { color: "#c08cff" },
  deneme: { color: "#f2b33d" },
  mola:   { color: "#8a8f96" }
};

(function () {
  // Sık kullanılan metinler
  const S = {
    mat:   { tr: "Matematik", en: "Mathematics" },
    geo:   { tr: "Geometri", en: "Geometry" },
    trk:   { tr: "Türkçe", en: "Turkish" },
    fiz:   { tr: "Fizik", en: "Physics" },
    kim:   { tr: "Kimya", en: "Chemistry" },
    biy:   { tr: "Biyoloji", en: "Biology" },
    tar:   { tr: "Tarih", en: "History" },
    cog:   { tr: "Coğrafya", en: "Geography" },
    fen:   { tr: "Fen Bilimleri", en: "Science" },
    free:  { tr: "Serbest", en: "Free time" },
    newT:  { tr: "Yeni konu", en: "New topic" },
    rest:  { tr: "Dinlenme", en: "Rest" },
    para:  { tr: "Paragraf — 25 soru", en: "Reading — 25 questions" }
  };

  App.data.defaultSchedule = {
    name: { tr: "Dengeli YKS Haftası", en: "Balanced YKS Week" },
    description: {
      tr: "Okul günlerinde akşam 3 blok, hafta sonu deneme ve analiz. Kendi programınıza kopyalayıp düzenleyebilirsiniz.",
      en: "Three evening blocks on school days, a practice exam and review at the weekend. Copy it to your own schedule to edit it."
    },
    blocks: [
      // Pazartesi
      { day: 0, start: "17:30", end: "18:20", subject: S.mat, note: S.newT, kind: "ders" },
      { day: 0, start: "18:30", end: "19:20", subject: S.mat, note: { tr: "30 soru", en: "30 questions" }, kind: "soru" },
      { day: 0, start: "20:30", end: "21:20", subject: S.trk, note: S.para, kind: "soru" },
      // Salı
      { day: 1, start: "17:30", end: "18:20", subject: S.fiz, note: S.newT, kind: "ders" },
      { day: 1, start: "18:30", end: "19:20", subject: S.fiz, note: { tr: "Konu testi", en: "Topic test" }, kind: "soru" },
      { day: 1, start: "20:30", end: "21:20", subject: S.tar, note: { tr: "Okuma + not", en: "Reading + notes" }, kind: "ders" },
      // Çarşamba
      { day: 2, start: "17:30", end: "18:20", subject: S.mat, note: S.newT, kind: "ders" },
      { day: 2, start: "18:30", end: "19:20", subject: S.kim, note: S.newT, kind: "ders" },
      { day: 2, start: "20:30", end: "21:20", subject: S.trk, note: { tr: "Dil bilgisi", en: "Grammar" }, kind: "ders" },
      // Perşembe
      { day: 3, start: "17:30", end: "18:20", subject: S.biy, note: S.newT, kind: "ders" },
      { day: 3, start: "18:30", end: "19:20", subject: S.mat, note: { tr: "Karışık 30 soru", en: "30 mixed questions" }, kind: "soru" },
      { day: 3, start: "20:30", end: "21:20", subject: S.cog, note: { tr: "Okuma + harita", en: "Reading + maps" }, kind: "ders" },
      // Cuma
      { day: 4, start: "17:30", end: "18:20", subject: S.geo, note: S.newT, kind: "ders" },
      { day: 4, start: "18:30", end: "19:20", subject: { tr: "Haftalık tekrar", en: "Weekly review" }, note: { tr: "Hatalı soruların üstünden geç", en: "Go over the questions you got wrong" }, kind: "tekrar" },
      { day: 4, start: "20:30", end: "21:30", subject: S.free, note: S.rest, kind: "mola" },
      // Cumartesi
      { day: 5, start: "10:00", end: "12:45", subject: { tr: "TYT Denemesi", en: "TYT Practice Exam" }, note: { tr: "Gerçek süre: 165 dk", en: "Real duration: 165 min" }, kind: "deneme" },
      { day: 5, start: "14:00", end: "15:00", subject: { tr: "Deneme analizi", en: "Exam review" }, note: { tr: "Yanlış ve boşları incele", en: "Study wrong and blank answers" }, kind: "tekrar" },
      { day: 5, start: "15:30", end: "16:30", subject: S.fen, note: { tr: "Eksik konu", en: "Weak topic" }, kind: "ders" },
      // Pazar
      { day: 6, start: "10:00", end: "11:00", subject: S.mat, note: { tr: "Haftanın tekrarı", en: "Review of the week" }, kind: "tekrar" },
      { day: 6, start: "11:15", end: "12:15", subject: S.trk, note: S.para, kind: "soru" },
      { day: 6, start: "14:00", end: "18:00", subject: S.free, note: S.rest, kind: "mola" }
    ]
  };

  /** Planlayıcıda ders seçimi için öneri listesi (serbest yazmak da mümkün) */
  App.data.subjectSuggestions = [
    S.mat, S.geo, S.trk, { tr: "Türk Dili ve Edebiyatı", en: "Turkish Language & Literature" }, S.fiz, S.kim, S.biy,
    S.tar, S.cog, { tr: "Felsefe", en: "Philosophy" }, { tr: "Din Kültürü", en: "Religious Culture" }, { tr: "İngilizce", en: "English" },
    { tr: "TYT Denemesi", en: "TYT Practice Exam" }, { tr: "AYT Denemesi", en: "AYT Practice Exam" },
    { tr: "Deneme analizi", en: "Exam review" }, { tr: "Haftalık tekrar", en: "Weekly review" }, S.free
  ];
})();
