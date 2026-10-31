/* =========================================================
   lazy.js — ekran modüllerini açılışta değil ilk kullanımda yükler (v1.64)

   1.63'te index.html 167 betiği (~3,6 MB) baştan yüklüyordu; düşük donanımlı telefonda açılışın
   büyük kısmı hiç açılmayacak ekranların kodunu çözümlemekle geçiyordu. Burada listelenen modüller
   yalnız kendi ekranları (ya da onları kullanan bir ekran) açılınca yüklenir:
     GROUPS  grup → sırayla yüklenecek betikler (bir öncekine dayanabilir)
     ROUTES  ekran → önce yüklenecek gruplar; işlev ise adrese göre karar verir
   Yönlendirici, sayfayı çizmeden önce bu yüklemeyi bekler (App.router.need). Bir grup yalnız bir kez
   yüklenir; yükleme başarısız olursa ana sayfa açılır ve sonraki denemede yeniden istenir.
   tools/lazy-check.mjs: her dosya var mı, hiçbiri index.html'de iki kez yüklenmiyor mu, gruptaki
   modüllerin kaydettiği her ekran burada listelenmiş mi.

   App.lazy.load("labs" | ["tercih", "kariyer"]) → Promise · App.lazy.loaded("labs") → boolean
   ========================================================= */
(function () {
  const M = (n) => "js/modules/" + n + ".js", D = (n) => "js/data/" + n + ".js";
  const GROUPS = {
    labs: [M("sonify"), M("labs"), M("labs-fizik"), M("labs-kimya"), M("labs-biyoloji"), M("labs-ek"), M("labs3d-temel"), M("labs3d-fizik")],
    about: [M("about")],
    games: [D("game-data"), M("games"), M("games-2"), M("games-3")],
    sinif: [M("sinif-modu")],
    duello: [M("duello")],
    vatandas: [M("vatandas")],
    paragraf: [D("paragraflar"), M("paragraf")],
    ph: [M("ph-model"), M("ph-metre")],
    ekosistem: [M("ekosistem")],
    karne: [M("karne")],
    sim: [M("sim")],
    yolculuk: [M("yolculuk")],
    evren: [M("evren")],
    atlas: [D("harita-bilgi"), M("harita")],
    zaman: [D("tarih-olaylar"), D("tarih-ek"), M("zaman")],
    kure: [D("tarih-olaylar"), D("tarih-ek"), M("kure")],
    video: [M("video")],
    calculator: [M("calculator")],
    tercih: [M("tercih")],
    kariyer: [D("kariyer"), M("kariyer")],
    meslek: [D("kariyer"), D("meslek-harita"), M("meslek")],
    podcast: [M("podcast")],
    practice: [D("practice-bank"), D("practice-bank-ext"), M("practice"), M("practice-ui")],
    discovery: [M("discovery-model"), M("discovery-core"), M("onboarding"), M("discovery-vision"), M("reverse-tutor"), M("phone-physics"),
      M("haptic-graph"), M("science-report"), M("seismograph"), M("planetarium")],
    study: [M("study-workspace-model"), M("document-import"), M("study-workspace")]
  };
  const ROUTES = {
    hakkinda: ["labs", "about"],                 // deney sayısı Hakkında'da da gösterilir
    oyunlar: ["labs", "games"],                  // grafik oyunu deney çizim araçlarını kullanır
    "bilim-lab": (r) => ["labs","discovery"].concat(r.params[0]==="vatandas"?["sinif","vatandas"]:r.params[0]==="deneyler"&&r.params[1]==="ph"?["ph"]:r.params[0]==="deneyler"&&r.params[1]==="ekosistem"?["ekosistem"]:[]),          // deneyler, telefon fiziği, sismograf
    // Kazanım sayfası: deney kartları, podcast ve "Hangi meslekte?" bağlantısı
    konular: (r) => (r.params.length >= 4 ? ["labs", "podcast", "meslek"] : null),
    "sinif-modu": ["sinif"],
    duello: ["sinif", "duello"],
    vatandas: ["sinif", "vatandas"],
    paragraf: ["paragraf"],
    ph: ["ph"],
    ekosistem: ["ekosistem"],
    karne: ["karne"],
    simulasyon: ["sim"],
    yolculuk: ["yolculuk"],
    evren: ["evren"],
    atlas: ["atlas"],
    zaman: ["atlas", "zaman"],
    kure: ["kure"],
    video: ["video"],
    hesap: ["calculator"],
    tercih: ["tercih"],
    kariyer: ["tercih", "kariyer"],
    meslek: ["tercih", "kariyer", "meslek"],
    podcast: ["podcast"],
    aktarim: ["practice"],
    "hata-avcisi": ["practice"],
    kesif: ["discovery"],
    "bana-ogret": ["discovery"],
    "dokunsal-grafik": ["discovery"],
    gokyuzu: ["discovery"],


    odevler: ["study"],
    "sozlu-prova": ["study"],
    canli: ["study"],                            // eski adresler: çalışma alanı Araçlar'a yönlendirir
    cevre: ["study"],
    dokumanlar: ["study", "discovery"]           // paket/not çalışma alanı ve deney raporu
  };

  const done = Object.create(null), pending = Object.create(null);
  function one(name) {
    if (done[name]) return Promise.resolve();
    if (!GROUPS[name]) return Promise.reject(new Error("Bilinmeyen modül grubu: " + name));
    if (!pending[name]) {
      pending[name] = GROUPS[name].reduce((p, src) => p.then(() => App.utils.loadScript(src)), Promise.resolve())
        .then(() => { done[name] = true; delete pending[name]; }, (e) => { delete pending[name]; throw e; });
    }
    return pending[name];
  }
  /** Grupları verilen sırayla yükler (sonraki grup öncekine dayanabilir) */
  function load(names) {
    return [].concat(names || []).reduce((p, n) => p.then(() => one(n)), Promise.resolve());
  }
  function groupsFor(r) {
    const spec = ROUTES[r.name];
    const names = typeof spec === "function" ? spec(r) : spec;
    return names && names.some((n) => !done[n]) ? names : null;
  }

  App.router.need((r) => {
    const names = groupsFor(r);
    if (!names) return null;
    return load(names).catch(() => {
      const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
      if (App.ui && App.ui.toast) App.ui.toast(T("Bu bölüm yüklenemedi. Bağlantını kontrol edip yeniden dene.", "This section could not be loaded. Check your connection and try again."), "error");
    });
  });

  App.lazy = { load, loaded: (name) => !!done[name], groupsFor, GROUPS, ROUTES };
})();
