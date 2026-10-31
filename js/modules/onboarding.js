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
