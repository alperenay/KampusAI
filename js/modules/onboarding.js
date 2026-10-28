/* =========================================================
   onboarding.js — Modül tanıtım rehberleri (v1.51)

   Bir modülün amacını ve kullanım adımlarını adım adım gösteren pencere:
     • İlk açılışta bir kez kendiliğinden açılır ("bir daha gösterme" tercihi: onboard:<id>), otomatik
       tarayıcı testlerinde (navigator.webdriver) kendiliğinden açılmaz.
     • Sayfa başlığının yanındaki "Nasıl kullanılır?" düğmesiyle her zaman yeniden açılır.
     • Adım göstergesi, Geri/İleri, klavye (← →, Esc) ve ekran okuyucu duyurusu.
   Keşif Atölyeleri (discovery-core.js page) için kendiliğinden bağlanır; diğer modüller App.onboarding.attach çağırır.
   ========================================================= */
(function () {
  const { esc } = App.utils;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);

  /** Adım: [simge, [başlık tr, en], [metin tr, en], [madde listesi tr[], en[]] (isteğe bağlı)] */
  const GUIDES = {
    "telefon-fizik": {
      title: ["Telefon Fizik Atölyesi nasıl kullanılır?", "How to use the Phone Physics Workshop"],
      steps: [
        ["sPhys", ["Atölyenin amacı", "What it is for"], ["Telefonunun mikrofonu ve hareket sensörleriyle gerçek ölçüm yaparsın: sesin hızı, yankı, şimşek uzaklığı, Doppler kayması, sarkaç periyodu ve asansörde ivme. Her sonuç belirsizliğiyle birlikte hesaplanır.", "Use your phone's microphone and motion sensors to measure the speed of sound, echoes, lightning distance, Doppler shift, a pendulum's period and lift acceleration, each with its uncertainty."]],
        ["list", ["1. Deneyi seç", "1. Choose an experiment"], ["Üstteki Deney listesinden ölçmek istediğini seç. Seçime göre gereken alanlar ve kurulum talimatı değişir.", "Pick an experiment from the list; the inputs and setup instructions change with it."],
          [["Ses / yankı / şimşek: uzaklık d ve zaman aralığı", "Doppler: kaynak tonu f₀ ve ölçülen frekans", "Sarkaç: ip uzunluğu L", "Asansör: durgun kalibrasyon"], ["Sound / echo / lightning: distance d and time interval", "Doppler: source tone f₀ and measured frequency", "Pendulum: string length L", "Lift: calibrate at rest"]]],
        ["target", ["2. Düzeneği kur", "2. Set it up"], ["Uzaklığı şerit metreyle ölç ve metre olarak yaz. Sarkaçta telefonu sağlam bir torbaya koyup kısa genlikle salındır; telefonu asla savurma ya da düşürme.", "Measure distances with a tape and enter them in metres. For the pendulum, hold the phone in a secure pouch and swing gently; never throw or drop it."]],
        ["mic", ["3. Ölç", "3. Measure"], ["Ses deneylerinde \"Mikrofonu başlat\", hareket deneylerinde \"Hareket ölçümünü başlat\" düğmesine bas. Sessiz bir ortamda tek ve keskin bir alkış en net darbeyi verir. Sensör yoksa \"Etiketli örnek veri yükle\" ile alıştırma yapabilirsin.", "Press \"Start microphone\" or \"Start motion measurement\". One sharp clap in a quiet room gives the clearest pulse. Without sensors, load the labelled sample data."]],
        ["chart", ["4. Hesapla ve yorumla", "4. Compute and interpret"], ["\"Hesapla\" ile sonucu, belirsizliğini ve grafiği gör. Kuramsal değerle (ör. ses için yaklaşık 343 m/s) karşılaştır; fark büyükse zaman belirsizliğini ve uzaklığı yeniden kontrol et. Veriyi indirip Bilimsel Deney Raporu'na aktarabilirsin.", "Press \"Compute\" for the result, uncertainty and graph; compare with theory (about 343 m/s for sound). Export the data to the Science Report."]],
        ["scan", ["İki cihazla ölçüm", "Two-device measurement"], ["İki telefonla ses uçuş süresi ölçerken her cihaz aynı darbeyi algılar; zaman paketini QR ile aktarırsın. QR saatleri eşitlemez: saat farkını bağımsız bir kalibrasyonla girmen gerekir.", "With two phones, each detects the same pulse and you exchange the timing by QR. QR does not sync clocks: enter an independently measured clock offset."]]
      ]
    },
    "ciz-calissin": {
      title: ["Çiz, Çalışsın nasıl kullanılır?", "How to use Draw & Run"],
      steps: [
        ["pen", ["Amaç", "What it is for"], ["Kâğıda ya da ekrana çizdiğin bir fizik düzeneğini çalışan bir simülasyona çevirir: elektrik devresi, serbest cisim diyagramı, ışık ışınları, rampa ve çarpışma.", "Turn a physics sketch into a running simulation: a circuit, a free-body diagram, light rays, a ramp or a collision."]],
        ["list", ["1. Model türünü seç", "1. Choose the model type"], ["DC devre, Serbest cisim, Işın optiği ya da Rampa ve çarpışma. Tür, çizimin nasıl yorumlanacağını belirler.", "DC circuit, Free body, Ray optics or Ramp & collision; it decides how the drawing is interpreted."]],
        ["camera", ["2. Çiz ya da fotoğrafla", "2. Draw or photograph"], ["Tuvale parmağınla çiz ya da kâğıttaki çizimin fotoğrafını çek/yükle. Rampa modunda yolu soldan sağa, yüksekten başlayarak tek çizgiyle çiz.", "Draw on the canvas or photograph/upload a paper sketch. For a ramp, draw one path from left to right, starting high."]],
        ["sparkle", ["3. Modeli öner", "3. Get a model suggestion"], ["\"Yerel kenar / kontur analizi\" internetsiz çalışır. \"Görseli AI ile yorumla\" sembolleri tanır ve değerleri önerir. İstersen \"Örnek model yükle\" ile hazır bir modelden başla.", "\"Local edge / contour analysis\" works offline; \"Interpret with AI\" recognises symbols and suggests values. Or start from a sample model."]],
        ["edit", ["4. İncele ve düzelt", "4. Review and correct"], ["Önerilen model düzenlenebilir bir metin (JSON) olarak görünür. Bağlantıları ve değerleri kontrol et: görsel tanıma hata yapabilir. Bu adım öğrenmenin parçasıdır.", "The suggested model appears as editable JSON. Check connections and values, since recognition can be wrong; this check is part of learning."]],
        ["play", ["5. Onayla ve çalıştır", "5. Confirm and run"], ["\"Modeli onayla ve çalıştır\" ile akımı, kuvvetleri, ışın yollarını ya da hareketi canlı izle. Değerleri değiştirip yeniden çalıştırarak \"ne olur?\" sorularını dene; onaylı modeli indirebilirsin.", "Press \"Confirm and run\" to watch currents, forces, rays or motion. Change values and rerun to test what-if questions; download the confirmed model."]]
      ]
    },
    "canlanan-kitap": {
      title: ["Canlanan Ders Kitabı nasıl kullanılır?", "How to use the Living Textbook"],
      steps: [
        ["book", ["Amaç", "What it is for"], ["Ders kitabındaki bir denklemi kameraya gösterirsin; uygulama grafiğini kâğıdın üstünde çizer. Katsayıları değiştirdikçe grafik canlı değişir.", "Show an equation from your textbook to the camera and its graph is drawn over the page; it changes live as you edit the coefficients."]],
        ["camera", ["1. Kamerayı aç", "1. Start the camera"], ["\"Kamerayı aç\" ile kitap sayfasına tut ya da bir görsel yükle. Işığın iyi, sayfanın düz olmasına dikkat et.", "Start the camera and aim at the page, or upload an image. Use good light and keep the page flat."]],
        ["scan", ["2. Denklemi oku", "2. Read the equation"], ["\"Kamera karesini al\" ve \"Görselden denklemi oku\" düğmeleriyle denklemi önerir. Önerilen denklemi kutuda doğrula ve düzelt; istersen denklemi elle de yazabilirsin (internetsiz).", "Capture a frame and read the equation; verify and correct the suggestion in the box, or type it yourself (offline)."]],
        ["chart", ["3. Grafiği keşfet", "3. Explore the graph"], ["Denklem türünü seç (y = f(x), elips, hiperbol). Katsayı kaydırıcılarını oynat: parabolün açılması, elipsin basıklığı nasıl değişiyor?", "Choose the equation type (y = f(x), ellipse, hyperbola) and move the coefficient sliders. How does the shape change?"]],
        ["target", ["4. Takip (isteğe bağlı)", "4. Tracking (optional)"], ["\"Canlı çerçeveyi takip et\" küçük yatay/düşey kaymaları izler. Sayfa döner, yaklaşır ya da görüntü kaybolursa grafik güvenlik için gizlenir; bu bir metrik AR sabitlemesi değildir.", "\"Track live frame\" follows small shifts. If the page rotates, zooms or is lost, the graph hides; this is not metric AR anchoring."]]
      ]
    }
  };

  const seenKey = (id) => "onboard:" + id;
  function open(id) {
    const g = GUIDES[id];
    if (!g || !App.ui || !App.ui.modal) return null;
    let i = 0;
    const m = App.ui.modal({
      title: T(g.title[0], g.title[1]),
      body: '<div class="ob" data-ob="' + esc(id) + '"><ol class="ob-dots" aria-hidden="true">' + g.steps.map(() => "<li></li>").join("") + '</ol><div class="ob-step" aria-live="polite"></div>' +
        '<label class="check-row ob-skip"><input type="checkbox" id="obSeen"' + (App.prefs.get(seenKey(id), false) ? " checked" : "") + "> " + esc(T("Bir daha kendiliğinden gösterme", "Don't show automatically again")) + "</label></div>",
      actions: '<button class="btn btn--ghost" type="button" id="obBack">' + esc(T("Geri", "Back")) + '</button><button class="btn btn--primary" type="button" id="obNext"></button>'
    });
    const el = m.el, step = el.querySelector(".ob-step"), back = el.querySelector("#obBack"), next = el.querySelector("#obNext");
    const paint = () => {
      const [icon, title, text, list] = g.steps[i];
      step.innerHTML = '<span class="ob-ico">' + App.icon(icon) + '</span><p class="ob-n">' + esc(T("Adım ", "Step ") + (i + 1) + " / " + g.steps.length) + "</p><h3>" + esc(T(title[0], title[1])) + "</h3><p>" + esc(T(text[0], text[1])) + "</p>" +
        (list ? "<ul>" + (App.i18n.lang === "en" ? list[1] : list[0]).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "");
      App.hydrateIcons(step);
      el.querySelectorAll(".ob-dots li").forEach((d, k) => d.classList.toggle("is-on", k <= i));
      back.disabled = i === 0;
      next.textContent = i === g.steps.length - 1 ? T("Başlayalım", "Let's start") : T("İleri", "Next");
    };
    back.onclick = () => { if (i > 0) { i--; paint(); } };
    next.onclick = () => { if (i < g.steps.length - 1) { i++; paint(); } else { App.prefs.set(seenKey(id), true); m.close(); } };
    el.querySelector("#obSeen").onchange = (e) => App.prefs.set(seenKey(id), e.target.checked);
    el.addEventListener("keydown", (e) => {
      if (e.target && e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight") next.click(); else if (e.key === "ArrowLeft") back.click();
    });
    paint();
    next.focus();
    return m;
  }
  /** Sayfaya "Nasıl kullanılır?" düğmesi ekler; ilk ziyarette rehberi bir kez açar */
  function attach(root, id) {
    if (!root || !GUIDES[id] || root.querySelector(".ob-open")) return;
    const b = document.createElement("button");
    b.type = "button"; b.className = "btn btn--sm ob-open";
    b.innerHTML = App.icon("info") + esc(T("Nasıl kullanılır?", "How to use"));
    b.addEventListener("click", () => open(id));
    const h = root.querySelector("h1");
    if (h) h.insertAdjacentElement("afterend", b); else root.prepend(b);
    App.hydrateIcons(b);
    // Rehber bitirilene ya da "bir daha gösterme" işaretlenene kadar her ilk girişte açılır
    if (!App.prefs.get(seenKey(id), false) && !(navigator && navigator.webdriver))
      setTimeout(() => { if (root.isConnected && !document.querySelector(".ob")) open(id); }, 350);
  }
  App.onboarding = { GUIDES, open, attach };
})();
