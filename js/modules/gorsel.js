/* =========================================================
   gorsel.js — Konu anlatımlarına görsel özet

   Her konu sayfasına "Görsel Anlatım" bölümü ekler:
     1. Konuya özel diyagram (elle çizilmiş inline SVG; başlığa göre seçilir: hücre, fotosentez,
        kuvvet, devre, dalga, atom, pH, parabol, birim çember … ~35 konu ailesi)
     2. Zaman çizelgesi (metinde 3+ farklı yıl geçen konular: tarih, inkılap, edebiyat …)
     3. Kavram haritası (HER konu: ortada konu, çevresinde metindeki kalın yazılmış anahtar kavramlar;
        kavrama dokununca metinde geçtiği yer vurgulanır)
   Görseller tamamen yerel (inline SVG + CSS): internetsiz çalışır, kırık bağlantı riski yok.
   Renkler tema değişkenlerinden gelir (açık/koyu tema ve ders rengi --subj otomatik uyar).
   ========================================================= */
(function () {
  const esc = App.utils.esc;
  const T = (tr, en) => (App.i18n && App.i18n.lang === "en" ? en : tr);
  const L = (v) => (v && typeof v === "object" ? v.tr || v.en || "" : v || "");

  /* ---------------- SVG yardımcıları ---------------- */
  const DEFS = '<defs><marker id="gv-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>';
  const svg = (w, h, body, label) =>
    '<svg class="gv-svg" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(label) + '" xmlns="http://www.w3.org/2000/svg">' + DEFS + body + "</svg>";
  /** metin: c = sınıf (gv-t ana, gv-m soluk, gv-s ders rengi, gv-a vurgu, gv-b kalın), a = hizalama */
  const tx = (x, y, s, c, a, size) => '<text x="' + x + '" y="' + y + '" class="' + (c || "gv-t") + '"' + (a ? ' text-anchor="' + a + '"' : "") +
    (size ? ' font-size="' + size + '"' : "") + ">" + esc(s) + "</text>";
  const ln = (x1, y1, x2, y2, c, ok) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + (c || "gv-l") + '"' + (ok ? ' marker-end="url(#gv-ok)"' : "") + "/>";
  const pth = (d, c, ok) => '<path d="' + d + '" class="' + (c || "gv-l") + '"' + (ok ? ' marker-end="url(#gv-ok)"' : "") + "/>";
  const rc = (x, y, w, h, c, r) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 8 : r) + '" class="' + (c || "gv-box") + '"/>';
  const ci = (x, y, r, c) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="' + (c || "gv-box") + '"/>';
  const el = (x, y, rx, ry, c) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" class="' + (c || "gv-box") + '"/>';
  /** kutu + ortalı (gerekirse iki satır) yazı */
  const kutu = (x, y, w, h, s, c, tc) => rc(x, y, w, h, c) + satir(x + w / 2, y + h / 2, s, tc || "gv-t", Math.max(8, Math.floor(w / 7.2)));
  /** kelimeleri bölerek en çok 2 satır yazar (ortalı) */
  function satir(cx, cy, s, c, max) {
    const words = String(s).split(/\s+/);
    const lines = [""];
    words.forEach((w) => {
      const cur = lines[lines.length - 1];
      if (!cur || (cur + " " + w).length <= max) lines[lines.length - 1] = cur ? cur + " " + w : w;
      else lines.push(w);
    });
    if (lines.length > 2) { lines.length = 2; lines[1] = lines[1].slice(0, max - 1) + "…"; }
    const dy = lines.length === 2 ? -7 : 0;
    return lines.map((l, i) => '<text x="' + cx + '" y="' + (cy + dy + i * 15 + 4.5) + '" class="' + c + '" text-anchor="middle">' + esc(l) + "</text>").join("");
  }
  /** koordinat ekseni (orijin ox,oy; genişlik w, yükseklik h) */
  const eksen = (ox, oy, w, h, xl, yl) => ln(ox, oy, ox + w, oy, "gv-l", true) + ln(ox, oy, ox, oy - h, "gv-l", true) +
    tx(ox + w - 2, oy + 15, xl || "x", "gv-m", "end") + tx(ox - 6, oy - h + 4, yl || "y", "gv-m", "end");

  /* ---------------- Konuya özel diyagramlar ----------------
     re: başlık (# satırı + kazanım adı) üzerinde aranır; ders: yalnızca bu derslerde (boşsa hepsi) */
  const D = [];
  const ekle = (re, ders, baslik, aciklama, ipucu, ciz) => D.push({ re, ders, baslik, aciklama, ipucu, ciz });

  /* ===== BİYOLOJİ ===== */
  ekle(/hücre ve alt birim|hücrenin yapı|organel/i, ["biyoloji"], "Hayvan hücresi", "Zar, sitoplazma ve çekirdekten oluşur; organeller sitoplazmada iş bölümü yapar.",
    "Bitki hücresinde ek olarak hücre çeperi, kloroplast ve büyük merkezî koful bulunur; sentrozom yoktur.", () => svg(430, 230,
      el(170, 115, 150, 95, "gv-subj") + ci(150, 110, 34, "gv-box2") + ci(150, 110, 12, "gv-dot") +
      el(255, 70, 26, 13, "gv-box2") + pth("M243 70 q6-8 12 0 t12 0", "gv-l") + el(240, 160, 24, 12, "gv-box2") +
      pth("M75 140 q15-12 30 0 t30 0 t30 0", "gv-l") + pth("M80 155 q15-12 30 0 t30 0", "gv-l") +
      [[90, 80], [105, 95], [210, 125], [220, 105], [120, 175], [200, 185]].map(([x, y]) => ci(x, y, 3, "gv-dot")).join("") +
      pth("M205 155 a10 6 0 0 1 22 0 M203 163 a12 7 0 0 1 26 0", "gv-l") +
      ln(150, 110, 335, 40) + tx(338, 44, "Çekirdek", "gv-t") + ln(255, 70, 335, 75) + tx(338, 79, "Mitokondri", "gv-t") +
      ln(215, 160, 335, 110) + tx(338, 114, "Golgi", "gv-t") + ln(150, 150, 335, 145) + tx(338, 149, "Endoplazmik r.", "gv-t") +
      ln(200, 185, 335, 180) + tx(338, 184, "Ribozom", "gv-t") + ln(260, 190, 335, 212) + tx(338, 216, "Hücre zarı", "gv-t"),
      "Hayvan hücresi ve organelleri"));

  ekle(/madde geçiş|difüzyon|osmoz/i, ["biyoloji"], "Zardan madde geçişi", "Pasif taşımada madde çok yoğundan az yoğuna ATP harcamadan geçer; aktif taşımada az yoğundan çok yoğuna ATP ile taşınır.",
    "Osmozda hareket eden SU'dur: su, suyun çok olduğu (çözeltinin seyreltik olduğu) taraftan az olduğu tarafa geçer.", () => svg(380, 220,
      rc(170, 20, 40, 180, "gv-subj", 6) + tx(190, 214, "Hücre zarı", "gv-m", "middle") +
      [[40, 50], [70, 40], [100, 60], [55, 85], [90, 95], [130, 80], [45, 130], [110, 140], [75, 170], [140, 165], [30, 175]].map(([x, y]) => ci(x, y, 5, "gv-dot")).join("") +
      [[260, 60], [320, 150], [290, 110]].map(([x, y]) => ci(x, y, 5, "gv-dot")).join("") +
      tx(85, 15, "Çok yoğun", "gv-s", "middle") + tx(300, 15, "Az yoğun", "gv-s", "middle") +
      ln(120, 60, 250, 60, "gv-l2", true) + tx(260, 48, "Difüzyon (ATP yok)", "gv-t") +
      ln(120, 115, 250, 115, "gv-l2", true) + tx(260, 103, "Kolaylaştırılmış d.", "gv-t") +
      ln(250, 170, 120, 170, "gv-l3", true) + tx(258, 174, "Aktif taşıma", "gv-t") + rc(258, 180, 40, 18, "gv-acc", 9) + tx(278, 193, "ATP", "gv-on", "middle"),
      "Difüzyon, kolaylaştırılmış difüzyon ve aktif taşıma"));

  ekle(/fotosentez/i, ["biyoloji"], "Fotosentez", "Klorofil ışık enerjisini yakalar; CO₂ ve sudan glikoz üretilir, O₂ açığa çıkar.",
    "Açığa çıkan O₂ sudan gelir (CO₂'den değil). Işıklı evre tilakoitte, Calvin döngüsü stromada gerçekleşir.", () => svg(400, 220,
      rc(120, 40, 160, 140, "gv-subj", 22) + tx(200, 62, "Kloroplast", "gv-s", "middle") +
      kutu(135, 75, 130, 36, "Işıklı evre (tilakoit)", "gv-box2") + kutu(135, 130, 130, 36, "Calvin döngüsü (stroma)", "gv-box2") +
      ln(200, 112, 200, 128, "gv-l", true) + tx(206, 124, "ATP, NADPH", "gv-m") +
      tx(20, 70, "☀ Işık", "gv-a") + ln(70, 66, 132, 86, "gv-l2", true) +
      tx(20, 105, "H₂O", "gv-t") + ln(55, 101, 132, 96, "gv-l2", true) +
      tx(20, 150, "CO₂", "gv-t") + ln(55, 146, 132, 148, "gv-l2", true) +
      ln(268, 90, 330, 80, "gv-l3", true) + tx(336, 84, "O₂", "gv-t") +
      ln(268, 150, 330, 155, "gv-l3", true) + tx(336, 152, "Glikoz", "gv-t") + tx(336, 168, "C₆H₁₂O₆", "gv-m") +
      tx(200, 205, "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "gv-b", "middle"), "Fotosentezin girdileri, evreleri ve ürünleri"));

  ekle(/hücresel solunum|oksijenli solunum|solunuma katıl|fermantasyon|\bATP\b|metabolizma/i, ["biyoloji"], "Hücresel solunum", "Glikoz önce sitoplazmada pirüvata parçalanır (glikoliz); oksijen varsa mitokondride tamamen yıkılır.",
    "Oksijenli solunum ~36–38 ATP, fermantasyon yalnızca 2 ATP kazandırır. Fermantasyonda son ürün etil alkol + CO₂ ya da laktik asittir.", () => svg(400, 230,
      kutu(150, 10, 100, 32, "Glikoz", "gv-subj") + ln(200, 42, 200, 64, "gv-l", true) + tx(206, 58, "Glikoliz · 2 ATP", "gv-m") +
      kutu(150, 66, 100, 32, "2 Pirüvat", "gv-box2") +
      ln(190, 98, 110, 140, "gv-l2", true) + ln(210, 98, 290, 140, "gv-l3", true) +
      tx(95, 125, "O₂ yok", "gv-m", "middle") + tx(305, 125, "O₂ var", "gv-m", "middle") +
      kutu(30, 142, 150, 40, "Fermantasyon (sitoplazma)", "gv-box2") + kutu(220, 142, 150, 40, "Krebs + ETS (mitokondri)", "gv-box2") +
      tx(105, 205, "Etil alkol/laktik asit", "gv-t", "middle") + tx(105, 222, "toplam 2 ATP", "gv-s", "middle") +
      tx(295, 205, "CO₂ + H₂O", "gv-t", "middle") + tx(295, 222, "toplam ~36–38 ATP", "gv-s", "middle"), "Glikozun oksijenli ve oksijensiz yıkımı"));

  ekle(/su döngüsü|suyun dağılış/i, ["biyoloji", "cografya"], "Su döngüsü", "Güneş enerjisiyle buharlaşan su yoğunlaşıp bulut olur, yağışla yeryüzüne döner ve akarsu, yer altı suyu yoluyla denize ulaşır.",
    "Bitkilerin terlemesi de atmosfere su verir. Döngüyü çalıştıran enerji Güneş'tir.", () => svg(400, 220,
      ci(45, 35, 18, "gv-acc") + tx(45, 70, "Güneş", "gv-m", "middle") +
      pth("M250 50 a18 18 0 0 1 30 -10 a20 20 0 0 1 36 6 a15 15 0 0 1 4 28 h-74 a14 14 0 0 1 4 -24z", "gv-box2") +
      pth("M0 190 L140 190 L140 220 L0 220z", "gv-subj") + tx(60, 210, "Deniz", "gv-t", "middle") +
      pth("M200 190 L290 110 L380 190z", "gv-box2") + pth("M140 205 L400 205", "gv-l") +
      ln(90, 175, 230, 75, "gv-l2", true) + tx(110, 125, "Buharlaşma", "gv-t") +
      ln(310, 82, 330, 150, "gv-l3", true) + tx(338, 120, "Yağış", "gv-t") +
      ln(160, 60, 245, 60, "gv-l", true) + tx(178, 52, "Yoğunlaşma", "gv-m") +
      ln(280, 175, 150, 198, "gv-l2", true) + tx(195, 178, "Yüzey akışı", "gv-m") +
      ln(330, 195, 330, 215, "gv-l", true) + tx(337, 216, "Sızma", "gv-m"), "Su döngüsünün aşamaları"));

  ekle(/enerji tek yönlü|ekosistem|ekolojinin düzey|besin zincir|organizasyon düzey|ekoloji ve/i, ["biyoloji"], "Enerji piramidi", "Enerji üreticiden tüketicilere aktarılır; her basamakta enerjinin yaklaşık %90'ı ısı olarak kaybolur.",
    "Enerji akışı tek yönlüdür, madde ise ayrıştırıcılar sayesinde döngüseldir. Piramidin üstüne çıktıkça birey sayısı ve toplam enerji azalır.", () => svg(395, 220,
      pth("M190 15 L240 65 L140 65z", "gv-acc") + pth("M140 65 L240 65 L285 110 L95 110z", "gv-box2") +
      pth("M95 110 L285 110 L330 155 L50 155z", "gv-subj") + pth("M50 155 L330 155 L370 200 L10 200z", "gv-box2") +
      tx(190, 56, "3. tüketici", "gv-on", "middle") + tx(190, 95, "2. tüketici · 10 kJ", "gv-t", "middle") +
      tx(190, 138, "1. tüketici · 100 kJ", "gv-t", "middle") + tx(190, 184, "Üreticiler · 1000 kJ", "gv-t", "middle") +
      tx(300, 40, "≈%10 aktarılır", "gv-s"), "Ekosistemde enerji piramidi"));

  ekle(/merkez[iî] dogma|nükleik asit|nükleotitten kromozom|protein sentez|\bDNA\b/i, ["biyoloji"], "Merkezî dogma", "DNA'daki bilgi önce mRNA'ya yazılır (transkripsiyon), sonra ribozomda proteine çevrilir (translasyon).",
    "DNA'da timin (T), RNA'da urasil (U) bulunur. Eşleşmeler: A–T (RNA'da A–U) ve G–C.", () => svg(400, 200,
      pth("M20 40 C40 10 60 70 80 40 S120 10 140 40", "gv-l2") + pth("M20 40 C40 70 60 10 80 40 S120 70 140 40", "gv-l3") +
      [30, 50, 70, 90, 110, 130].map((x) => ln(x, 30, x, 50, "gv-l")).join("") + tx(80, 85, "DNA", "gv-b", "middle") +
      ln(150, 40, 205, 40, "gv-l", true) + tx(178, 30, "Transkripsiyon", "gv-m", "middle") +
      pth("M215 40 q10-14 20 0 t20 0 t20 0", "gv-l2") + tx(245, 85, "mRNA", "gv-b", "middle") +
      ln(280, 40, 325, 40, "gv-l", true) + tx(303, 30, "Translasyon", "gv-m", "middle") +
      [335, 355, 375].map((x, i) => ci(x, 40 + (i % 2) * 8, 9, "gv-subj")).join("") + tx(355, 85, "Protein", "gv-b", "middle") +
      tx(200, 140, "Çekirdek: DNA → mRNA   ·   Ribozom: mRNA → protein", "gv-t", "middle") +
      tx(200, 168, "A–T · G–C   (RNA'da A–U)", "gv-s", "middle"), "DNA, mRNA ve protein ilişkisi"));

  ekle(/enzim/i, ["biyoloji"], "Enzim aktivitesi", "Her enzimin en hızlı çalıştığı bir optimum sıcaklık ve pH değeri vardır; bunun dışında aktivite düşer.",
    "Yüksek sıcaklık enzimin yapısını bozar (denatürasyon, geri dönmez); düşük sıcaklık yalnızca yavaşlatır.", () => svg(380, 210,
      eksen(40, 180, 320, 160, "Sıcaklık (°C)", "Hız") + pth("M45 175 C120 170 150 40 185 35 C210 32 225 100 250 175", "gv-l2") +
      ln(185, 35, 185, 180, "gv-l4") + tx(185, 196, "optimum (~37 °C)", "gv-s", "middle") +
      tx(270, 120, "Denatürasyon", "gv-m"), "Sıcaklığa bağlı enzim aktivitesi grafiği"));

  /* ===== FİZİK ===== */
  ekle(/vektör/i, ["fizik"], "Vektör toplama", "Uç uca ekleme ya da paralelkenar yöntemiyle iki vektörün bileşkesi bulunur.",
    "Bileşkenin büyüklüğü |A−B| ile A+B arasındadır. Dik vektörlerde R² = A² + B².", () => svg(360, 210,
      ln(60, 170, 200, 170, "gv-l2", true) + tx(130, 190, "A", "gv-b", "middle") +
      ln(60, 170, 120, 60, "gv-l3", true) + tx(78, 110, "B", "gv-b") +
      ln(200, 170, 260, 60, "gv-l4") + ln(120, 60, 260, 60, "gv-l4") +
      ln(60, 170, 258, 62, "gv-l", true) + tx(180, 105, "R = A + B", "gv-s"), "Paralelkenar yöntemiyle vektör toplama"));

  ekle(/üç yasa|newton'?ın hareket|sürtünme|dinamik|net kuvvet|doğadaki temel kuvvet/i, ["fizik"], "Serbest cisim diyagramı", "Cisme etki eden tüm kuvvetler oklarla gösterilir; net kuvvet ivmeyi belirler: Fnet = m · a.",
    "Sürtünme kuvveti harekete (ya da hareket eğilimine) zıt yöndedir. Yatay düzlemde N = G = m·g.", () => svg(360, 220,
      rc(20, 150, 320, 10, "gv-box2", 2) + rc(130, 95, 90, 55, "gv-subj", 6) + tx(175, 127, "m", "gv-b", "middle") +
      ln(220, 122, 310, 122, "gv-l2", true) + tx(300, 112, "F", "gv-b") +
      ln(130, 140, 60, 140, "gv-l3", true) + tx(55, 132, "fs", "gv-b") +
      ln(175, 150, 175, 205, "gv-l", true) + tx(182, 205, "G = m·g", "gv-t") +
      ln(175, 95, 175, 35, "gv-l", true) + tx(182, 42, "N", "gv-t") +
      tx(255, 75, "Fnet = F − fs = m·a", "gv-s", "middle"), "Yatay düzlemde cisme etki eden kuvvetler"));

  ekle(/hareket türleri|hareketin temel|ivme|kinematik|serbest düşme|bağıl hareket|düzgün doğrusal/i, ["fizik"], "Hareket grafikleri", "Hız–zaman grafiğinin eğimi ivmeyi, grafiğin altındaki alan yer değiştirmeyi verir.",
    "Konum–zaman grafiğinde eğim hızdır. Sabit hızda konum doğrusal artar; düzgün hızlanmada v–t grafiği eğik doğrudur.", () => svg(380, 200,
      eksen(30, 160, 140, 130, "t", "x") + ln(30, 160, 160, 50, "gv-l2") + tx(100, 190, "Sabit hız: x–t", "gv-m", "middle") +
      eksen(215, 160, 140, 130, "t", "v") + pth("M215 140 L345 60 L345 160 L215 160z", "gv-subj") + ln(215, 140, 345, 60, "gv-l3") +
      tx(280, 135, "Alan = Δx", "gv-t", "middle") + tx(222, 70, "eğim = a", "gv-s") + tx(285, 190, "Hızlanan: v–t", "gv-m", "middle"),
      "Konum-zaman ve hız-zaman grafikleri"));

  ekle(/elektrik devre|elektrik akım|ohm|eşdeğer direnç|üreteç|direnç/i, ["fizik"], "Basit elektrik devresi", "Üreteç devreye potansiyel farkı uygular; akım dirençlerden geçer. Ohm yasası: V = I · R.",
    "Ampermetre devreye SERİ, voltmetre ölçtüğü elemana PARALEL bağlanır. Seri bağlı dirençlerden aynı akım geçer.", () => svg(380, 220,
      pth("M60 50 H320 V180 H60 V140 M60 100 V50", "gv-l") +
      ln(48, 100, 72, 100, "gv-l2") + ln(54, 112, 66, 112, "gv-l2") + ln(60, 112, 60, 140, "gv-l") + tx(25, 112, "+  −", "gv-m") + tx(20, 132, "Üreteç", "gv-m") +
      pth("M150 50 l6 -10 l12 20 l12 -20 l12 20 l12 -20 l6 10", "gv-l2") + tx(180, 30, "R (direnç)", "gv-t", "middle") +
      ci(320, 115, 14, "gv-box2") + tx(320, 120, "A", "gv-b", "middle") + tx(340, 120, "seri", "gv-m") +
      pth("M150 50 V90 H210 V50", "gv-l4") + ci(180, 90, 12, "gv-box2") + tx(180, 95, "V", "gv-b", "middle") + tx(180, 120, "paralel", "gv-m", "middle") +
      ln(250, 180, 150, 180, "gv-l3", true) + tx(200, 202, "Akım (I)", "gv-s", "middle"), "Üreteç, direnç, ampermetre ve voltmetreden oluşan devre"));

  ekle(/dalga|periyodik hareket|rezonans|kırınım|doppler|ses dalga/i, ["fizik"], "Dalganın büyüklükleri", "Dalga boyu (λ) art arda iki tepe arasındaki uzaklık, genlik denge konumundan en büyük uzaklıktır.",
    "Dalganın hızı v = λ · f; ortama bağlıdır. Frekansı kaynak belirler, dalga başka ortama geçince frekans değişmez.", () => svg(380, 200,
      ln(20, 100, 360, 100, "gv-l4") + pth("M20 100 C45 40 70 40 95 100 S145 160 170 100 S220 40 245 100 S295 160 320 100", "gv-l2") +
      ln(57, 55, 207, 55, "gv-l3", true) + ln(207, 55, 57, 55, "gv-l3", true) + tx(132, 45, "λ (dalga boyu)", "gv-s", "middle") +
      ln(285, 100, 285, 147, "gv-l", true) + tx(292, 130, "Genlik", "gv-t") +
      tx(57, 32, "tepe", "gv-m", "middle") + tx(132, 180, "çukur", "gv-m", "middle") + tx(330, 118, "denge", "gv-m"), "Dalga boyu, genlik, tepe ve çukur"));

  ekle(/düz ayna|yansıma kanun|\bayna/i, ["fizik"], "Yansıma kanunu", "Gelen ışın, normal ve yansıyan ışın aynı düzlemdedir; gelme açısı yansıma açısına eşittir.",
    "Düz aynada görüntü sanal, düz ve cisimle aynı boydadır; aynaya uzaklığı cismin uzaklığına eşittir.", () => svg(360, 210,
      rc(40, 170, 280, 8, "gv-subj", 2) + tx(330, 178, "Ayna", "gv-m") + ln(180, 170, 180, 30, "gv-l4") + tx(186, 40, "Normal", "gv-m") +
      ln(70, 60, 178, 168, "gv-l2", true) + ln(180, 170, 290, 60, "gv-l3", true) +
      pth("M162 152 A25 25 0 0 1 180 145", "gv-l") + pth("M180 145 A25 25 0 0 1 198 152", "gv-l") +
      tx(150, 138, "i", "gv-b") + tx(203, 138, "r", "gv-b") + tx(180, 200, "i = r", "gv-s", "middle") +
      tx(60, 52, "Gelen ışın", "gv-t") + tx(240, 52, "Yansıyan ışın", "gv-t"), "Düz aynada gelme ve yansıma açısı"));

  ekle(/basınç|kaldırma kuvveti|bernoulli|açık hava/i, ["fizik"], "Sıvı basıncı ve kaldırma kuvveti", "Sıvı basıncı derinlikle artar: P = h · d · g. Sıvıya batan cisme yukarı doğru kaldırma kuvveti etki eder.",
    "Kaldırma kuvveti Fk = Vbatan · dsıvı · g; cismin batan hacmi kadar sıvının ağırlığına eşittir (Arşimet).", () => svg(380, 220,
      pth("M30 30 V200 H190 V30", "gv-l") + rc(31, 60, 158, 139, "gv-subj", 0) +
      ln(70, 80, 100, 80, "gv-l2", true) + ln(70, 120, 115, 120, "gv-l2", true) + ln(70, 165, 135, 165, "gv-l2", true) +
      tx(40, 84, "h₁", "gv-t") + tx(40, 124, "h₂", "gv-t") + tx(40, 169, "h₃", "gv-t") + tx(110, 215, "P = h·d·g (derinlik ↑ → P ↑)", "gv-s", "middle") +
      pth("M220 30 V200 H360 V30", "gv-l") + rc(221, 80, 138, 119, "gv-subj", 0) + rc(265, 100, 50, 40, "gv-box2", 4) +
      ln(290, 100, 290, 50, "gv-l3", true) + tx(298, 60, "Fk", "gv-b") + ln(290, 140, 290, 185, "gv-l", true) + tx(298, 182, "G", "gv-b"),
      "Derinlikle artan sıvı basıncı ve kaldırma kuvveti"));

  ekle(/hâl değişimi|hal değişimi|ısıl denge|öz ısı|ısı sığa|iç enerji, ısı ve sıcaklık/i, ["fizik", "kimya"], "Isıtma eğrisi (buz → buhar)", "Hâl değişimi sırasında verilen ısı sıcaklığı artırmaz; tanecikler arasındaki bağları zayıflatır.",
    "Isı Q = m · c · ΔT (sıcaklık değişirken), Q = m · L (hâl değişirken). Düz bölümler erime ve kaynama noktalarıdır.", () => svg(380, 210,
      eksen(40, 180, 320, 165, "Zaman (ısı)", "T (°C)") +
      pth("M45 170 L90 130 L160 130 L215 70 L300 70 L345 30", "gv-l2") +
      tx(125, 122, "Erime (0 °C)", "gv-s", "middle") + tx(258, 62, "Kaynama (100 °C)", "gv-s", "middle") +
      tx(70, 160, "Katı", "gv-m") + tx(185, 115, "Sıvı", "gv-m") + tx(330, 55, "Gaz", "gv-m"), "Suyun ısıtma eğrisi"));

  ekle(/ısı aktarım|ısı iletim|iletim, konveksiyon/i, ["fizik"], "Isı aktarım yolları", "Isı; iletimle (temas), konveksiyonla (akışkan hareketi) ve ışımayla (boşlukta da) aktarılır.",
    "Metaller iyi iletkendir. Güneş'in ısısı Dünya'ya boşluktan ışımayla gelir.", () => svg(390, 180,
      rc(10, 20, 115, 120, "gv-box2") + rc(25, 75, 85, 10, "gv-subj", 3) + ci(25, 80, 10, "gv-acc") + ln(40, 65, 100, 65, "gv-l2", true) +
      tx(67, 160, "İletim", "gv-b", "middle") +
      rc(137, 20, 115, 120, "gv-box2") + pth("M170 120 C160 80 175 45 195 45 S230 80 220 120", "gv-l3", true) + rc(160, 125, 70, 8, "gv-acc", 3) +
      tx(195, 160, "Konveksiyon", "gv-b", "middle") +
      rc(264, 20, 115, 120, "gv-box2") + ci(290, 80, 14, "gv-acc") + [0, 1, 2].map((i) => pth("M310 " + (62 + i * 18) + " q8-6 16 0 t16 0 t16 0", "gv-l2")).join("") +
      tx(321, 160, "Işıma", "gv-b", "middle"), "İletim, konveksiyon ve ışıma"));

  ekle(/atom model|atom teori|atomun yapı|orbital|elektron dizilim/i, ["fizik", "kimya"], "Bohr atom modeli", "Çekirdekte proton (+) ve nötron bulunur; elektronlar (−) belirli enerji katmanlarında dolanır.",
    "Elektron üst katmana çıkarken enerji soğurur, alt katmana inerken ışık (foton) yayar. Katman kapasiteleri: 2, 8, 18 …", () => svg(375, 220,
      ci(150, 110, 90, "gv-ring") + ci(150, 110, 60, "gv-ring") + ci(150, 110, 30, "gv-ring") +
      ci(144, 106, 7, "gv-acc") + ci(156, 106, 7, "gv-box2") + ci(150, 116, 7, "gv-acc") +
      [[150, 80], [150, 140], [210, 110], [90, 110], [107, 67], [193, 153], [60, 110], [240, 110]].map(([x, y]) => ci(x, y, 5, "gv-dot")).join("") +
      ln(158, 110, 290, 40) + tx(295, 44, "Çekirdek", "gv-t") + tx(295, 60, "p⁺ + n", "gv-m") +
      ln(210, 110, 290, 110) + tx(295, 114, "Elektron (e⁻)", "gv-t") + ln(240, 110, 290, 170) + tx(295, 174, "Katman", "gv-t"),
      "Çekirdek ve elektron katmanları"));

  ekle(/periyodik (tablo|özellik)|periyodik sistem/i, ["kimya"], "Periyodik özellikler", "Periyotta soldan sağa atom yarıçapı küçülür, iyonlaşma enerjisi ve elektronegatiflik artar; grupta yukarıdan aşağı tersi olur.",
    "Aynı gruptaki elementlerin değerlik elektron sayıları aynıdır; bu yüzden kimyasal özellikleri benzerdir.", () => {
      let g = "";
      const cols = [0, 1, 12, 13, 14, 15, 16, 17], w = 30;
      for (let r = 0; r < 5; r++) cols.forEach((c, i) => { if (r === 0 && i > 0 && i < 7) return; g += rc(40 + i * (w + 4), 30 + r * 30, w, 26, i < 2 ? "gv-subj" : "gv-box2", 4); });
      return svg(380, 230, g + ln(40, 195, 310, 195, "gv-l2", true) + tx(175, 214, "İyonlaşma enerjisi ↑ · Yarıçap ↓", "gv-s", "middle") +
        ln(330, 30, 330, 180, "gv-l3", true) + tx(338, 100, "Yarıçap", "gv-t") + tx(338, 116, "artar", "gv-m") +
        tx(57, 22, "1A", "gv-m", "middle") + tx(91, 22, "2A", "gv-m", "middle") + tx(278, 22, "8A", "gv-m", "middle"), "Periyodik tabloda özelliklerin değişimi");
    });

  ekle(/iyonik bağ|kovalent bağ|metalik bağ|lewis|kimyasal bağ/i, ["kimya"], "Kimyasal bağ türleri", "İyonik bağda elektron alışverişi, kovalent bağda elektron ortaklaşması, metalik bağda elektron denizi vardır.",
    "Metal + ametal → çoğunlukla iyonik; ametal + ametal → kovalent; metal + metal → metalik bağ.", () => svg(390, 180,
      ci(45, 70, 22, "gv-box2") + tx(45, 75, "Na⁺", "gv-b", "middle") + ci(100, 70, 26, "gv-subj") + tx(100, 75, "Cl⁻", "gv-b", "middle") +
      tx(72, 130, "İyonik", "gv-b", "middle") + tx(72, 148, "e⁻ alışverişi", "gv-m", "middle") +
      ci(175, 70, 24, "gv-box2") + ci(210, 70, 24, "gv-box2") + ci(192, 64, 4, "gv-dot") + ci(192, 76, 4, "gv-dot") +
      tx(192, 130, "Kovalent", "gv-b", "middle") + tx(192, 148, "e⁻ ortaklaşması", "gv-m", "middle") +
      rc(262, 35, 115, 75, "gv-subj", 10) + [[285, 55], [315, 55], [345, 55], [285, 90], [315, 90], [345, 90]].map(([x, y]) => ci(x, y, 9, "gv-box2")).join("") +
      [[300, 72], [330, 72], [272, 72], [358, 72]].map(([x, y]) => ci(x, y, 3, "gv-dot")).join("") +
      tx(320, 130, "Metalik", "gv-b", "middle") + tx(320, 148, "elektron denizi", "gv-m", "middle"), "İyonik, kovalent ve metalik bağ"));

  ekle(/asit[–-]baz|asitler ve bazlar|otoiyonizasyon|\bph\b|nötralleşme/i, ["kimya"], "pH cetveli", "pH < 7 asidik, pH = 7 nötr, pH > 7 baziktir (25 °C'de).",
    "pH 1 birim azalınca [H⁺] 10 kat artar. Kuvvetli asit/baz suda tamamen iyonlaşır.", () => {
      let g = "";
      for (let i = 0; i <= 14; i++) g += '<rect x="' + (20 + i * 23) + '" y="60" width="23" height="34" class="gv-ph" style="--h:' + Math.round(i * 17) + '"/>' + tx(31.5 + i * 23, 110, String(i), "gv-m", "middle");
      return svg(380, 200, g + tx(60, 50, "Asidik", "gv-b", "middle") + tx(192, 50, "Nötr", "gv-b", "middle") + tx(320, 50, "Bazik", "gv-b", "middle") +
        ln(66, 130, 66, 100) + tx(66, 145, "Limon (2)", "gv-t", "middle") + ln(181, 130, 181, 100) + tx(181, 145, "Saf su (7)", "gv-t", "middle") +
        ln(250, 130, 250, 100) + tx(250, 145, "Sabun (10)", "gv-t", "middle") + ln(112, 160, 112, 100) + tx(112, 175, "Kola (3)", "gv-t", "middle") +
        ln(319, 160, 319, 100) + tx(319, 175, "Çamaşır suyu (13)", "gv-t", "middle"), "0'dan 14'e pH cetveli ve örnekler");
    });

  ekle(/\bmol\b|stokiyometri|kütlenin korunumu|kimyasal hesaplama/i, ["kimya"], "Mol köprüsü", "Mol; kütle, tanecik sayısı ve gaz hacmi arasında köprüdür. Önce mole çevir, sonra istenen birime geç.",
    "1 mol = 6,02·10²³ tanecik = mol kütlesi kadar gram = 22,4 L gaz (normal koşullarda, 0 °C ve 1 atm).", () => svg(380, 220,
      ci(190, 110, 42, "gv-acc") + tx(190, 106, "MOL", "gv-on", "middle") + tx(190, 124, "n", "gv-on", "middle") +
      kutu(10, 20, 120, 44, "Kütle (g)", "gv-box2") + kutu(250, 20, 120, 44, "Tanecik sayısı", "gv-box2") + kutu(130, 168, 120, 44, "Gaz hacmi (L)", "gv-box2") +
      ln(130, 52, 152, 88, "gv-l2", true) + tx(80, 90, "÷ MA", "gv-s") +
      ln(250, 52, 228, 88, "gv-l2", true) + tx(262, 90, "÷ 6,02·10²³", "gv-s") +
      ln(190, 166, 190, 154, "gv-l2", true) + tx(200, 162, "÷ 22,4", "gv-s"), "Kütle, tanecik sayısı ve hacim ile mol arasındaki dönüşümler"));

  ekle(/ideal gaz|gaz değişken|gazların özellik|gaz yasa/i, ["kimya"], "Gaz yasaları", "İdeal gaz denklemi P · V = n · R · T. Sıcaklık sabitken basınç artarsa hacim azalır (Boyle).",
    "Hesaplarda sıcaklık daima Kelvin cinsinden olmalı: T(K) = t(°C) + 273.", () => svg(380, 200,
      eksen(30, 160, 140, 130, "V", "P") + pth("M45 40 C60 110 100 140 165 150", "gv-l2") + tx(100, 190, "Boyle: P·V = sabit", "gv-m", "middle") +
      eksen(215, 160, 140, 130, "T (K)", "V") + ln(215, 160, 345, 50, "gv-l3") + tx(285, 190, "Charles: V/T = sabit", "gv-m", "middle") +
      tx(190, 20, "P·V = n·R·T", "gv-s", "middle"), "Boyle ve Charles yasası grafikleri"));

  ekle(/galvanik|volta|pil|elektrokimya/i, ["kimya"], "Galvanik hücre", "Anotta yükseltgenme, katotta indirgenme olur; elektronlar dış devrede anottan katoda akar.",
    "Tuz köprüsü çözeltilerin elektriksel olarak nötr kalmasını sağlar. Anot (−) aşınır, katot (+) kütlesi artar.", () => svg(380, 210,
      pth("M30 90 V190 H150 V90", "gv-l") + rc(31, 120, 118, 69, "gv-subj", 0) + pth("M230 90 V190 H350 V90", "gv-l") + rc(231, 120, 118, 69, "gv-box2", 0) +
      rc(80, 60, 20, 100, "gv-box2", 3) + tx(90, 52, "Zn (anot)", "gv-t", "middle") + rc(280, 60, 20, 100, "gv-acc", 3) + tx(290, 52, "Cu (katot)", "gv-t", "middle") +
      pth("M120 135 V100 H260 V135", "gv-l4") + tx(190, 92, "Tuz köprüsü", "gv-m", "middle") +
      pth("M90 60 V20 H290 V60", "gv-l") + ln(150, 20, 230, 20, "gv-l2", true) + tx(190, 14, "e⁻", "gv-s", "middle"), "Çinko-bakır galvanik hücresi"));

  /* ===== MATEMATİK ===== */
  ekle(/trigonometri|dik üçgende|sinüs teorem|kosinüs|toplam–fark formül|toplam-fark/i, ["matematik"], "Dik üçgende trigonometrik oranlar", "Bir dar açının sinüsü karşı/hipotenüs, kosinüsü komşu/hipotenüs, tanjantı karşı/komşudur.",
    "Ezber kısayolu: \"SOH-CAH-TOA\" yerine Türkçede \"Karşı-Hipo, Komşu-Hipo, Karşı-Komşu\". sin²α + cos²α = 1 her zaman doğrudur.", () => svg(450, 200,
      pth("M40 170 L240 170 L240 40z", "gv-subj") + rc(226, 156, 14, 14, "gv-l", 0) + pth("M80 170 A40 40 0 0 0 74 148", "gv-l") +
      tx(90, 160, "α", "gv-b") + tx(140, 190, "komşu", "gv-t", "middle") + tx(250, 110, "karşı", "gv-t") + tx(125, 95, "hipotenüs", "gv-t", "middle") +
      tx(300, 75, "sin α = karşı / hip.", "gv-s") + tx(300, 105, "cos α = komşu / hip.", "gv-s") + tx(300, 135, "tan α = karşı / komşu", "gv-s"),
      "Dik üçgende kenarlar ve trigonometrik oranlar"));

  ekle(/ikinci derece|karesel|parabol/i, ["matematik"], "Parabol: y = ax² + bx + c", "Grafik bir paraboldür; a > 0 ise kollar yukarı, a < 0 ise aşağı bakar. Tepe noktası T(r, k), r = −b / 2a.",
    "Diskriminant Δ = b² − 4ac: Δ > 0 iki kök (x eksenini iki noktada keser), Δ = 0 tek kök (teğet), Δ < 0 gerçek kök yok.", () => svg(360, 220,
      eksen(20, 160, 320, 150) + pth("M70 30 Q170 330 270 30", "gv-l2") + ln(170, 25, 170, 205, "gv-l4") +
      ci(133.5, 160, 4, "gv-dot") + ci(206.5, 160, 4, "gv-dot") + ci(170, 180, 4, "gv-acc") +
      tx(126, 152, "x₁", "gv-t", "end") + tx(214, 152, "x₂", "gv-t") + tx(178, 196, "T(r, k)", "gv-s") +
      tx(176, 36, "x = r (simetri ekseni)", "gv-m") + tx(272, 60, "a > 0", "gv-s"), "Parabol, kökler ve simetri ekseni"));

  ekle(/sayı kümeleri/i, ["matematik"], "Sayı kümeleri", "Doğal sayılar tam sayıların, tam sayılar rasyonel sayıların, rasyonel sayılar gerçek sayıların alt kümesidir.",
    "İrrasyonel sayılar (√2, π) kesir olarak yazılamaz; rasyonellerle birlikte gerçek sayıları oluşturur: ℝ = ℚ ∪ 𝕀.", () => svg(380, 210,
      rc(10, 10, 360, 190, "gv-box2", 18) + tx(30, 32, "ℝ Gerçek sayılar", "gv-b") +
      el(150, 115, 125, 75, "gv-subj") + tx(60, 75, "ℚ Rasyonel", "gv-t") +
      el(165, 125, 85, 50, "gv-box2") + tx(115, 110, "ℤ Tam", "gv-t") + el(185, 135, 45, 28, "gv-acc") + tx(185, 140, "ℕ", "gv-on", "middle") +
      tx(320, 110, "𝕀", "gv-b", "middle") + tx(320, 130, "√2, π", "gv-m", "middle"), "İç içe sayı kümeleri"));

  ekle(/mutlak değer/i, ["matematik"], "Mutlak değer", "|x|, bir sayının sayı doğrusunda sıfıra uzaklığıdır; bu yüzden hiçbir zaman negatif olmaz.",
    "|x − a|, x ile a arasındaki uzaklıktır. |x| = 3 ⇒ x = 3 ya da x = −3.", () => svg(360, 212,
      eksen(30, 170, 300, 150) + pth("M60 40 L180 170 L300 40", "gv-l2") + tx(250, 60, "y = |x|", "gv-s") +
      ln(60, 190, 300, 190, "gv-l") + tx(180, 205, "0", "gv-m", "middle") + ci(110, 190, 3, "gv-dot") + ci(250, 190, 3, "gv-dot") +
      tx(110, 185, "−3", "gv-m", "middle") + tx(250, 185, "3", "gv-m", "middle"), "Mutlak değer fonksiyonunun grafiği"));

  ekle(/türev|artanlık|azalanlık|teğet/i, ["matematik"], "Türevin geometrik anlamı", "f′(a), eğrinin x = a noktasındaki teğetinin eğimidir.",
    "f′(x) > 0 olan aralıkta fonksiyon artan, f′(x) < 0 olan aralıkta azalandır; f′(x) = 0 olan yerde yerel ekstremum olabilir.", () => svg(360, 210,
      eksen(30, 180, 310, 165) + pth("M40 160 C100 150 140 40 220 50 S300 120 330 100", "gv-l2") +
      ln(90, 150, 230, 30, "gv-l3") + ci(150, 100, 4, "gv-acc") + tx(158, 120, "A(a, f(a))", "gv-t") + tx(232, 30, "teğet", "gv-s") +
      tx(240, 190, "eğim = f′(a)", "gv-s"), "Eğriye teğet doğru ve türev"));

  ekle(/integral|riemann|alan hesab/i, ["matematik"], "Belirli integral = alan", "Eğri ile x ekseni arasındaki alan, ince dikdörtgenlerin alanları toplanarak yaklaşık bulunur; dikdörtgenler inceldikçe toplam integrale yaklaşır.",
    "x ekseninin altında kalan bölgelerin integrali negatiftir; alan sorarken mutlak değer alınır.", () => {
      let g = "";
      // dikdörtgen yüksekliği = eğrinin dikdörtgen ortasındaki değeri (eğri: uçlarda y=140, tepede y≈57,5)
      for (let i = 0; i < 8; i++) { const x = 70 + i * 28, y = 140 - 82.5 * Math.sin(Math.PI * (x + 14 - 60) / 250); g += rc(x, y, 28, 170 - y, "gv-subj", 0); }
      return svg(360, 210, eksen(30, 170, 310, 160) + g + pth("M60 140 C120 30 220 30 310 140", "gv-l2") +
        tx(70, 188, "a", "gv-m", "middle") + tx(294, 188, "b", "gv-m", "middle") + tx(180, 25, "∫ₐᵇ f(x) dx ≈ Σ f(xᵢ)·Δx", "gv-s", "middle"), "Riemann dikdörtgenleriyle eğri altındaki alan");
    });

  ekle(/olasılık/i, ["matematik"], "Olasılık", "Bir olayın olasılığı = istenen durum sayısı / tüm durumların sayısı. Değeri 0 ile 1 arasındadır.",
    "P(A) + P(A′) = 1. Bağımsız olaylarda P(A ve B) = P(A) · P(B).", () => {
      let g = "";
      for (let i = 1; i <= 6; i++) g += rc(30 + (i - 1) * 50, 60, 40, 40, i % 2 === 0 ? "gv-subj" : "gv-box2", 8) + tx(50 + (i - 1) * 50, 86, String(i), "gv-b", "middle");
      return svg(360, 190, tx(180, 40, "Zar atılıyor: E = {1, 2, 3, 4, 5, 6}", "gv-t", "middle") + g +
        tx(180, 135, "A = çift gelmesi = {2, 4, 6}", "gv-t", "middle") + tx(180, 165, "P(A) = 3 / 6 = 1/2", "gv-s", "middle"), "Zar örneğiyle olasılık");
    });

  ekle(/benzerlik|tales|benzer üçgen/i, ["matematik"], "Benzer üçgenler", "Açıları eşit olan üçgenler benzerdir; karşılık gelen kenarlar orantılıdır (benzerlik oranı k).",
    "Alanlar oranı k², hacimler oranı k³'tür. Paralel doğruların kestiği kenarlarda Tales: |AD|/|DB| = |AE|/|EC|.", () => svg(360, 200,
      pth("M30 170 L130 170 L60 90z", "gv-box2") + tx(80, 190, "a", "gv-t", "middle") +
      pth("M170 170 L330 170 L218 40z", "gv-subj") + tx(250, 190, "k·a", "gv-t", "middle") +
      tx(180, 25, "k = benzerlik oranı", "gv-s", "middle"), "İki benzer üçgen ve benzerlik oranı"));

  /* ===== COĞRAFYA ===== */
  ekle(/yer'?in iç yapı|iç yapı|levha|deprem|tektonik/i, ["cografya"], "Yer'in iç yapısı", "Yer; yer kabuğu, manto, dış çekirdek ve iç çekirdekten oluşur. Derine inildikçe sıcaklık, basınç ve yoğunluk artar.",
    "Dış çekirdek sıvı, iç çekirdek yüksek basınç nedeniyle katıdır. Levha hareketlerini mantodaki konveksiyon akımları sağlar.", () => svg(380, 210,
      pth("M20 200 A170 170 0 0 1 360 200z", "gv-box2") + pth("M45 200 A145 145 0 0 1 335 200z", "gv-subj") +
      pth("M110 200 A80 80 0 0 1 270 200z", "gv-acc") + pth("M150 200 A40 40 0 0 1 230 200z", "gv-box2") +
      tx(190, 22, "Yer kabuğu", "gv-t", "middle") + tx(190, 85, "Manto", "gv-t", "middle") +
      tx(190, 150, "Dış çekirdek (sıvı)", "gv-on", "middle") + tx(190, 192, "İç ç.", "gv-t", "middle"), "Yer kabuğu, manto ve çekirdek"));

  ekle(/coğrafi koordinat|enlem|boylam|matematik konum/i, ["cografya"], "Paraleller ve meridyenler", "Enlem Ekvator'a, boylam başlangıç (Greenwich) meridyenine olan açısal uzaklıktır.",
    "İki meridyen arası 4 dakikalık zaman farkı vardır. Enlem arttıkça sıcaklık genel olarak azalır.", () => svg(360, 220,
      ci(150, 110, 95, "gv-subj") + el(150, 110, 95, 18, "gv-ring") + el(150, 70, 80, 14, "gv-ring") + el(150, 150, 80, 14, "gv-ring") +
      el(150, 110, 40, 95, "gv-ring") + ln(150, 15, 150, 205, "gv-l4") + ln(55, 110, 245, 110, "gv-l2") +
      tx(255, 114, "Ekvator (0°)", "gv-t") + tx(255, 74, "Paralel (enlem)", "gv-m") + tx(160, 26, "Meridyen (boylam)", "gv-m") + tx(150, 218, "Greenwich 0°", "gv-s", "middle"),
      "Küre üzerinde paralel ve meridyenler"));

  ekle(/nüfus|demografik/i, ["cografya"], "Nüfus piramidi", "Piramidin tabanı genç, tepesi yaşlı nüfusu gösterir. Geniş taban yüksek doğum oranına işaret eder.",
    "Gelişmiş ülkelerde piramit tabanı daralır (doğum oranı düşük, yaşlı nüfus fazla); demografik dönüşüm budur.", () => {
      let g = "";
      [90, 82, 74, 65, 55, 44, 32, 20, 10].forEach((w, i) => { const y = 180 - i * 18; g += rc(180 - w, y, w, 15, "gv-subj", 2) + rc(184, y, w * 0.95, 15, "gv-box2", 2); });
      return svg(380, 220, g + tx(120, 205, "Erkek", "gv-m", "middle") + tx(250, 205, "Kadın", "gv-m", "middle") +
        tx(290, 40, "Yaşlı", "gv-t") + tx(290, 175, "Genç", "gv-t") + ln(330, 165, 330, 40, "gv-l", true), "Genç nüfuslu bir ülkenin nüfus piramidi");
    });

  ekle(/iklim sistemi|iklim türleri|hava olayları|basınç merkez|basınç kuşa|rüzgâr|rüzgar/i, ["cografya"], "Sıcaklık ve basınç kuşakları", "Ekvator'da sıcak hava yükselir (alçak basınç, bol yağış); 30° enlemlerinde çöker (yüksek basınç, kuraklık).",
    "Rüzgâr yüksek basınçtan alçak basınca eser. Dünya'nın dönüşü nedeniyle Kuzey Yarım Küre'de sağa sapar.", () => svg(380, 220,
      ci(130, 110, 95, "gv-subj") + ln(35, 110, 225, 110, "gv-l2") + ln(48, 62, 212, 62, "gv-l4") + ln(48, 158, 212, 158, "gv-l4") +
      tx(240, 114, "0° Alçak basınç (yağışlı)", "gv-t") + tx(240, 66, "30° K Yüksek basınç", "gv-t") + tx(240, 162, "30° G Yüksek basınç", "gv-t") +
      ln(110, 70, 110, 100, "gv-l3", true) + ln(150, 150, 150, 120, "gv-l3", true) + tx(240, 200, "Rüzgâr: YB → AB", "gv-s"), "Dünya üzerinde basınç kuşakları"));

  /* ---------------- Kavram haritası (her konu) ---------------- */
  function kavramlar(md) {
    const s = String(md || "").replace(/\$[^$]*\$/g, "");
    const out = [], seen = new Set();
    let m;
    // Satır içinde eşleştir (uzun bir kalın ifade ** çiftlerini kaydırmasın); uzunları aşağıda ele
    const re = /\*\*([^*\n]+?)\*\*/g;
    while ((m = re.exec(s))) {
      let k = m[1].replace(/[:：.,;]+$/, "").trim();
      if (k.length < 3 || k.length > 30 || /^\d+$/.test(k)) continue;
      const key = k.toLocaleLowerCase("tr");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(k);
      if (out.length >= 6) break;
    }
    // Kalın kavram azsa: madde satırlarının başındaki terimler ("- Tanım: …" → "Tanım") ve alt başlıklar
    if (out.length < 3) {
      // ... ilk başlık hariç diğer başlıklar ve tabloların ilk sütunu (başlık satırı hariç)
      const satirlar = s.split(/\n/);
      const ayirici = (x) => /^\s*\|\s*:?-{2,}/.test(x || "");
      let ilkBaslik = true;
      satirlar.forEach((line, i) => {
        if (out.length >= 6) return;
        let m2 = line.match(/^\s*(?:[-*+]|\d+[.)])\s+([^:：.\n]{3,30})[:：]/);
        if (!m2 && /^#{1,3}\s/.test(line)) {
          if (ilkBaslik) { ilkBaslik = false; return; }
          m2 = line.match(/^#{1,3}\s+(.{3,30})$/);
        }
        if (!m2 && /^\s*\|/.test(line) && !ayirici(line) && !ayirici(satirlar[i + 1])) m2 = line.match(/^\s*\|\s*([^|$]{2,30}?)\s*\|/);
        // iki noktasız kısa madde ("- Örneklem büyüklüğü yeterli mi?") → ilk 30 karaktere kadar, kelime sınırında
        if (!m2) { const m3 = line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.{3,})$/); if (m3) m2 = [0, m3[1].length <= 30 ? m3[1] : m3[1].slice(0, 30).replace(/\s\S*$/, "") + "…"]; }
        if (!m2) return;
        const k = m2[1].replace(/\*\*/g, "").trim();
        const key = k.toLocaleLowerCase("tr");
        if (k.length >= 3 && !seen.has(key)) { seen.add(key); out.push(k); }
      });
    }
    return out;
  }

  function kavramHaritasi(baslik, terimler) {
    const n = terimler.length, W = 400, H = 280, cx = 200, cy = 140;
    let g = "";
    const pos = terimler.map((_, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + 140 * Math.cos(a), cy + 100 * Math.sin(a)];
    });
    pos.forEach(([x, y]) => { g += ln(cx, cy, x, y, "gv-l4"); });
    g += rc(cx - 78, cy - 24, 156, 48, "gv-acc", 24) + satir(cx, cy, baslik, "gv-on", 20);
    terimler.forEach((t, i) => {
      const [x, y] = pos[i];
      g += '<g class="gv-node" tabindex="0" role="button" data-gv-term="' + esc(t) + '" aria-label="' + esc(T("Metinde göster: ", "Show in text: ") + t) + '">' +
        rc(x - 58, y - 20, 116, 40, "gv-subj", 12) + satir(x, y, t, "gv-t", 15) + "</g>";
    });
    return svg(W, H, g, T("Kavram haritası: ", "Concept map: ") + baslik + " — " + terimler.join(", "));
  }

  /* ---------------- Zaman çizelgesi (yıl içeren konular) ---------------- */
  function zamanCizelgesi(md) {
    const items = [], seen = new Set();
    String(md || "").split(/\n/).forEach((line) => {
      const clean = line.replace(/^[\s>#*-]+|\d+\.\s/g, "").replace(/\*\*/g, "").replace(/\$[^$]*\$/g, "").trim();
      const re = /\b(1[0-9]{3}|20[0-2][0-9])\b/g;
      let m;
      while ((m = re.exec(clean))) {
        const yil = +m[1];
        if (seen.has(yil) || /^\|/.test(line)) continue;
        // yılın geçtiği cümleden kısa bir etiket
        const cumle = clean.split(/(?<=[.;])\s+/).find((c) => c.includes(m[1])) || clean;
        // Aynı cümlede birden çok yıl varsa ("Sırplar (1804) ve Rumlar (1821)") yılın geçtiği parçayı al
        // yılı Türkçe ekiyle birlikte at ("1187'de", "1925'ten"), boş kalan noktalamayı topla
        const temiz = (x) => x.replace(/\(?\b(1[0-9]{3}|20[0-2][0-9])(?:['’][a-zçğıöşüâîû]+)?\)?[–-]?/gi, "")
          .replace(/\(\s*\)/g, "").replace(/\s+([,.;:])/g, "$1").replace(/([,;])\s*[,;]+/g, "$1").replace(/\s+/g, " ")
          .replace(/^[:–,.\s]+|[:–,\s(]+$/g, "").trim();
        const parca = cumle.split(/,|;|\s+ve\s+|\s+ile\s+|:\s/).find((p) => p.includes(m[1]));
        let etiket = parca && temiz(parca).length >= 6 ? temiz(parca) : temiz(cumle);
        if (items.some((x) => x.etiket === etiket)) etiket = temiz(cumle.slice(Math.max(0, cumle.indexOf(m[1]) - 40), cumle.indexOf(m[1]) + 4));
        if ((etiket.match(/\(/g) || []).length > (etiket.match(/\)/g) || []).length) etiket = etiket.slice(0, etiket.lastIndexOf("(")).trim();  // kapanmamış parantez
        if (etiket.length > 70) etiket = etiket.slice(0, 68).replace(/\s\S*$/, "") + "…";
        if (etiket.length < 4) continue;
        seen.add(yil);
        items.push({ yil, etiket });
      }
    });
    if (items.length < 3) return "";
    items.sort((a, b) => a.yil - b.yil);
    const sec = items.slice(0, 8);
    return '<ol class="gv-tl">' + sec.map((x) => '<li><span class="gv-tl__y">' + x.yil + '</span><span class="gv-tl__t">' + esc(x.etiket) + "</span></li>").join("") + "</ol>";
  }

  /** Diyagram seçimi: önce konunun kendi başlığı (# satırı) — uzun kazanım cümleleri pek çok kavramdan söz ettiği
      için yanıltır (ör. "Fermantasyon" kazanımı fotosentezden de bahseder). Başlık yoksa kazanım cümlesi.
      Küçük harfe Türkçe kurallarıyla çevrilir: JS'nin /i bayrağı "İdeal" ile "ideal"i eşlemez. */
  function diyagramBul(h1, ad, ders) {
    const uygun = (x) => !x.ders || x.ders.includes(ders);
    const hedef = String(h1 || ad).toLocaleLowerCase("tr");
    return D.find((x) => uygun(x) && x.re.test(hedef)) || null;
  }

  /* ---------------- Bölüm HTML'i ---------------- */
  const sekil = (icerik, baslik, aciklama, ipucu, cls) =>
    '<figure class="gv-fig' + (cls ? " " + cls : "") + '">' + icerik +
    '<figcaption><b>' + esc(baslik) + "</b> " + esc(aciklama) + "</figcaption>" +
    (ipucu ? '<p class="gv-tip"><span aria-hidden="true">💡</span> ' + esc(ipucu) + "</p>" : "") + "</figure>";

  /** Kazanım için görsel bölümün iç HTML'i (görsel yoksa ""). subjectId: "fizik" gibi. */
  function htmlFor(outcome, subjectId) {
    const ct = outcome && outcome.content;
    const md = ct ? L(ct.anlatim) : "";
    if (!md) return "";
    const h1 = (md.match(/^#\s+(.+)$/m) || [])[1] || "";
    const ad = L(outcome.title);
    const parcalar = [];
    const d = diyagramBul(h1, ad, subjectId);
    if (d) {
      try { parcalar.push(sekil(d.ciz(), d.baslik, d.aciklama, d.ipucu, "gv-fig--ana")); } catch (e) { /* çizim hatası görseli düşürür, sayfayı değil */ }
    }
    const tl = zamanCizelgesi(md);
    if (tl) parcalar.push(sekil(tl, T("Zaman çizelgesi:", "Timeline:"), T("Konuda geçen önemli tarihler sırasıyla.", "Key dates in this topic, in order."),
      T("Olayları sıraya koyarak hatırlamak, neden–sonuç ilişkilerini görmeyi kolaylaştırır.", "Ordering events makes cause and effect easier to remember."), "gv-fig--tl"));
    const terimler = kavramlar(md);
    if (terimler.length >= 2) {
      const kisa = (h1 || ad).replace(/\$[^$]*\$/g, "").replace(/\s*\(.*?\)\s*/g, " ").trim();
      parcalar.push(sekil(kavramHaritasi(kisa.length > 40 ? kisa.slice(0, 38) + "…" : kisa, terimler), T("Kavram haritası:", "Concept map:"),
        T("Konunun anahtar kavramları. Bir kavrama dokun, metinde geçtiği yeri göstereyim.", "Key concepts of the topic. Tap one to see it in the text."),
        T("Kendini dene: Her kavramı tek cümleyle açıklayabiliyor musun? Açıklayamadığın kavrama dokunup tekrar oku.", "Self-check: can you explain each concept in one sentence?"), "gv-fig--harita"));
    }
    return parcalar.join("");
  }

  /** Kavram düğümüne tıklayınca metindeki ilk geçişi kaydırıp vurgula */
  function bind(view) {
    const git = (node) => {
      const terim = node.getAttribute("data-gv-term");
      const govde = view.querySelector(".lesson__section .lesson__body");
      if (!govde || !terim) return;
      const hedef = Array.from(govde.querySelectorAll("strong, b")).find((s) => s.textContent.replace(/[:：.,;]+$/, "").trim().toLocaleLowerCase("tr") === terim.toLocaleLowerCase("tr"))
        || Array.from(govde.querySelectorAll("strong, b")).find((s) => s.textContent.toLocaleLowerCase("tr").includes(terim.toLocaleLowerCase("tr")));
      if (!hedef) return;
      hedef.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      hedef.classList.remove("gv-flash");
      void hedef.offsetWidth;
      hedef.classList.add("gv-flash");
    };
    view.querySelectorAll(".gv-node").forEach((n) => {
      n.addEventListener("click", () => git(n));
      n.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); git(n); } });
    });
  }

  /** Kapsama raporu (geliştirici aracı): App.gorsel.kapsam() */
  function kapsam() {
    const out = { toplam: 0, diyagram: 0, zaman: 0, harita: 0, hicbiri: [] };
    (App.data.curriculum.grades || []).forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => u.outcomes.forEach((o) => {
      if (!o.content || !L(o.content.anlatim)) return;
      out.toplam++;
      const md = L(o.content.anlatim), h1 = (md.match(/^#\s+(.+)$/m) || [])[1] || "";
      const dv = !!diyagramBul(h1, L(o.title), s.id);
      const zv = !!zamanCizelgesi(md), hv = kavramlar(md).length >= 2;
      out.diyagram += dv; out.zaman += zv; out.harita += hv;
      if (!dv && !zv && !hv) out.hicbiri.push(g.id + "/" + s.id + "/" + u.id + "/" + o.id);
    }))));
    return out;
  }

  /** Geliştirici aracı: bütün diyagramları tek sayfada gösterir — App.gorsel.galeri(element) */
  function galeri(hedef) {
    hedef.innerHTML = '<div class="page lesson-page subj-fizik"><div class="gv-grid" style="grid-template-columns:repeat(auto-fill,minmax(340px,1fr))">' +
      D.map((d, i) => sekil(d.ciz(), (i + 1) + ". " + d.baslik, "", "")).join("") + "</div></div>";
  }

  /** Geliştirici aracı: hangi diyagram hangi konulara düşüyor — App.gorsel.eslesmeler() */
  function eslesmeler() {
    const out = {};
    (App.data.curriculum.grades || []).forEach((g) => g.subjects.forEach((s) => s.units.forEach((u) => u.outcomes.forEach((o) => {
      if (!o.content || !L(o.content.anlatim)) return;
      const md = L(o.content.anlatim), h1 = (md.match(/^#\s+(.+)$/m) || [])[1] || "";
      const d = diyagramBul(h1, L(o.title), s.id);
      if (d) (out[d.baslik] = out[d.baslik] || []).push(g.id + "/" + s.id + ": " + (h1 || L(o.title)).slice(0, 45));
    }))));
    return out;
  }

  App.gorsel = { htmlFor, bind, kapsam, galeri, eslesmeler, diyagramSayisi: () => D.length };
})();
