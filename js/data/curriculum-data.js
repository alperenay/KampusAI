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
    edebiyat:  { name: { tr: "Türk Dili ve Edebiyatı", en: "Turkish Language and Literature" }, color: "#ff8a80", icon: "sLit" },
    matematik: { name: { tr: "Matematik", en: "Mathematics" }, color: "#7aa2ff", icon: "sMath" },
    fizik:     { name: { tr: "Fizik", en: "Physics" }, color: "#5bc0de", icon: "sPhys" },
    kimya:     { name: { tr: "Kimya", en: "Chemistry" }, color: "#5bc0a8", icon: "sChem" },
    biyoloji:  { name: { tr: "Biyoloji", en: "Biology" }, color: "#8fd16a", icon: "sBio" },
    tarih:     { name: { tr: "Tarih", en: "History" }, color: "#e0a458", icon: "sHist" },
    inkilap:   { name: { tr: "T.C. İnkılap Tarihi ve Atatürkçülük", en: "History of the Turkish Revolution and Kemalism" }, color: "#e0a458", icon: "flag" },
    cografya:  { name: { tr: "Coğrafya", en: "Geography" }, color: "#d4b45a", icon: "sGeo" },
    felsefe:   { name: { tr: "Felsefe", en: "Philosophy" }, color: "#c08cff", icon: "sPhil" },
    din:       { name: { tr: "Din Kültürü ve Ahlak Bilgisi", en: "Religious Culture and Ethics" }, color: "#9fa8da", icon: "sRel" },
    ingilizce: { name: { tr: "İngilizce", en: "English" }, color: "#f48fb1", icon: "sLang" },
    // 1.43: AYT Felsefe grubu ve Tarih-2 kapsamındaki dersler
    psikoloji: { name: { tr: "Psikoloji", en: "Psychology" }, color: "#b39ddb", icon: "lightbulb" },
    sosyoloji: { name: { tr: "Sosyoloji", en: "Sociology" }, color: "#80cbc4", icon: "chat" },
    cagdas:    { name: { tr: "Çağdaş Türk ve Dünya Tarihi", en: "Contemporary Turkish and World History" }, color: "#d7a86e", icon: "globe" },
    saglik:    { name: { tr: "Sağlık Bilgisi ve Trafik Kültürü", en: "Health and Traffic Safety" }, color: "#ef9a9a", icon: "checkCircle" }
  };

  // Her sınıfta hangi dersler var
  const GRADES = {
    "9":  ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "din", "ingilizce", "saglik"],
    "10": ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "felsefe", "din", "ingilizce"],
    "11": ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "tarih", "cografya", "felsefe", "psikoloji", "sosyoloji", "din", "ingilizce"],
    "12": ["edebiyat", "matematik", "fizik", "kimya", "biyoloji", "inkilap", "cagdas", "cografya", "felsefe", "din", "ingilizce"]
  };

  // İçerikler js/data/content/*.js dosyalarından gelir: App.data.content["9/matematik"] = [ ...üniteler ].
  // v1.42: açılışta bu dosyaların hepsi (~1,9 MB) yüklenmez. Yalnızca ünite/kazanım iskeleti
  // (js/data/content-index.js, node tools/build-content-index.mjs ile üretilir) yüklenir; anlatım metinleri ilgili
  // sınıf/ders açılınca App.content.ensure() ile (formuller.js'deki load() kalıbıyla) betik olarak eklenir.
  // İçerik dosyası önceden yüklenmişse (testler, eski kurulum) doğrudan o kullanılır.
  const PRE = App.data.content || {};
  const INDEX = App.data.contentIndex || {};
  const CONTENT = {};
  const lazy = {};   // "9/matematik" → dosya adı (henüz yüklenmemiş)
  Object.keys(PRE).forEach((key) => {
    const [g, sid] = key.split("/");
    (CONTENT[g] = CONTENT[g] || {})[sid] = PRE[key];
  });
  Object.keys(INDEX).forEach((key) => {
    if (PRE[key]) return;
    const [g, sid] = key.split("/");
    // İskelet: anlatımı olan kazanım curatedContent ile işaretlenir (yapay zekâ üzerine yazmaz, "içerik var" sayılır)
    (CONTENT[g] = CONTENT[g] || {})[sid] = INDEX[key].u.map((u) => ({
      id: u.id, name: u.name,
      outcomes: u.outcomes.map((o) => {
        const r = { id: o.id, code: o.code || "", title: o.title };
        if (o.c) r.curatedContent = true;
        return r;
      })
    }));
    lazy[key] = INDEX[key].f;
  });

  const grades = Object.keys(GRADES).map((g) => ({
    id: g,
    subjects: GRADES[g].map((sid) => ({
      id: sid,
      name: SUBJECTS[sid].name,
      color: SUBJECTS[sid].color,
      icon: SUBJECTS[sid].icon || "book",
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

  /* ---------------- İsteğe bağlı içerik yükleyici (App.content) ---------------- */
  const pending = {};
  function inject(file) {
    return new Promise((res, rej) => {
      const sc = document.createElement("script");
      sc.src = "js/data/content/" + file + ".js"; sc.async = true;
      sc.onload = res;
      sc.onerror = () => { sc.remove(); rej(new Error("İçerik yüklenemedi: " + file)); };
      document.head.appendChild(sc);
    });
  }
  // Yüklenen anlatımları mevcut kazanım nesnelerine işle: başka modüllerin tuttuğu başvurular (lessons.find,
  // learnmap) geçerli kalır; yapay zekâyla hazırlanmış eski içerik hazır içerikle değiştirilir.
  function merge(g, sid, units) {
    const s = App.data.curriculum.findSubject(g, sid);
    if (!s) return;
    units.forEach((src) => {
      const u = s.units.find((x) => x.id === src.id);
      if (!u) { s.units.push(src); return; }
      src.outcomes.forEach((so) => {
        const o = u.outcomes.find((x) => x.id === so.id);
        if (!o) { u.outcomes.push(so); return; }
        if (so.content) { o.content = so.content; o.curatedContent = true; delete o.ai; }
      });
    });
  }
  /** Bir dersin anlatımlarını yükler (yüklüyse hemen döner). Hata olursa sayfa iskeletle açılır. */
  function ensure(g, sid) {
    const key = g + "/" + sid;
    if (!lazy[key]) return Promise.resolve(true);
    if (!pending[key]) pending[key] = inject(lazy[key]).then(() => {
      const units = App.data.content && App.data.content[key];
      if (units) merge(g, sid, units);
      delete lazy[key];
      return true;
    }).catch((e) => { delete pending[key]; console.warn(e); return false; });
    return pending[key];
  }
  const ensureGrade = (g) => Promise.all(Object.keys(lazy).filter((k) => k.split("/")[0] === String(g)).map((k) => ensure(...k.split("/"))));
  const ensureAll = () => Promise.all(Object.keys(lazy).map((k) => ensure(...k.split("/"))));
  /** "9/matematik/u1/k1" gibi anahtarların derslerini yükler */
  const ensureKeys = (keys) => Promise.all([...new Set([].concat(keys || []).map((k) => String(k).split("/").slice(0, 2).join("/")))]
    .filter((k) => lazy[k]).map((k) => ensure(...k.split("/"))));
  App.content = { ensure, ensureGrade, ensureAll, ensureKeys, isLoaded: (g, sid) => !lazy[g + "/" + sid], pending: () => Object.keys(lazy) };

  // Hangi sayfa hangi içeriği ister: anahtarlı sayfalar (konular/9/matematik/…, test/…, anlat/…, podcast/…) yalnızca
  // o dersi; tüm kazanımları tarayan sayfalar (kartlar, oyunlar, harita…) hepsini — ve yalnızca açıldıklarında.
  const ALL = ["kartlar", "oyunlar", "harita", "kok", "simulasyon", "rapor", "yolculuk", "demo", "denemeler", "kontrol",
    "arastirma", "sinif", "formuller", "podcast", "modeller", "lab", "video"];
  const KEYED = ["konular", "test", "anlat", "podcast"];
  if (App.router && App.router.need) App.router.need((r) => {
    if (!Object.keys(lazy).length) return null;
    const [g, sid] = r.params;
    if (KEYED.includes(r.name) && g && sid && /^\d+$/.test(g)) return ensure(g, sid);
    if (ALL.includes(r.name)) return ensureAll();
    return null;
  });
})();
