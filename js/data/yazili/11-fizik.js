/* 11. Sınıf Fizik — Maarif Modeli açık uçlu yazılı sınavları (örnek). u1 Kuvvet ve Hareket, u2 Enerji ve Momentum, u3 Elektrik ve Manyetizma, u4 Dalgalar ve Optik, u5 Modern Fizik */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/fizik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Serbest düşme", puan: 14,
        metin: r`Bir taş 45 m yükseklikteki bir köprüden serbest bırakılıyor. ($g = 10\ \text{m/s}^2$, hava direnci yok)

**a)** Taş kaç saniyede suya ulaşır?
**b)** Suya çarpma hızını bulunuz.
**c)** Aynı anda bırakılan bir tüy ile taş, havasız bir ortamda aynı anda mı düşer? Açıklayınız.`,
        cevap: r`**a)** $h = \tfrac12 g t^2 \Rightarrow 45 = 5t^2 \Rightarrow t = 3$ s.
**b)** $v = g t = 30$ m/s.
**c)** Evet; havasız ortamda tüm cisimler kütlelerinden bağımsız olarak aynı ivmeyle ($g$) düşer. Havada tüyün yavaş düşmesinin nedeni hava direncidir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Atış hareketleri", puan: 14,
        metin: r`Bir top 20 m yükseklikten yatay olarak 15 m/s hızla atılıyor. ($g = 10\ \text{m/s}^2$)

**a)** Topun havada kalma süresini bulunuz.
**b)** Topun yatayda aldığı yolu (menzil) bulunuz.
**c)** Hız 30 m/s olsaydı havada kalma süresi değişir miydi? Gerekçelendiriniz.`,
        cevap: r`**a)** Düşey: $20 = 5t^2 \Rightarrow t = 2$ s.
**b)** $x = 15 \cdot 2 = 30$ m.
**c)** Değişmezdi; havada kalma süresi yalnızca düşey harekete (yükseklik ve $g$) bağlıdır. Yatay ve düşey hareketler birbirinden bağımsızdır. Menzil ise 60 m olurdu.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Newton yasaları", puan: 14,
        metin: r`Kütlesi 4 kg olan bir kutu yatay zeminde 30 N'luk yatay kuvvetle çekiliyor. Kinetik sürtünme katsayısı $k = 0{,}25$. ($g = 10\ \text{m/s}^2$)

**a)** Kutuya etki eden kuvvetleri adlarıyla yazınız.
**b)** Sürtünme kuvvetini ve kutunun ivmesini bulunuz.`,
        cevap: r`**a)** Ağırlık (40 N, aşağı), zeminin tepki kuvveti (40 N, yukarı), çekme kuvveti (30 N), sürtünme kuvveti (harekete zıt).
**b)** $F_s = k \cdot N = 0{,}25 \cdot 40 = 10$ N. $F_{net} = 30 - 10 = 20$ N ⇒ $a = 20/4 = 5\ \text{m/s}^2$.`,
        olcut: [[14, "Kuvvetler, sürtünme ve ivme"], [9, "İki doğru unsur"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Limit hız", puan: 14,
        metin: r`Bir paraşütçü uçaktan atlıyor; bir süre sonra hızı sabitleniyor, paraşüt açılınca hızı azalıp yeni ve daha küçük bir sabit hıza ulaşıyor.

Bu durumu, hava direncinin hıza ve kesit alanına bağlı olmasıyla ve Newton'ın ikinci yasasıyla açıklayınız.`,
        cevap: r`Düşüş başında hava direnci küçüktür; net kuvvet aşağıdır ve paraşütçü hızlanır. Hız arttıkça hava direnci artar; direnç ağırlığa eşit olunca net kuvvet sıfır olur, ivme sıfırlanır ve hız sabitlenir (limit hız). Paraşüt açılınca kesit alanı çok büyür, hava direnci ağırlıktan büyük olur, net kuvvet yukarı olur ve paraşütçü yavaşlar. Hız azaldıkça direnç azalır ve yeniden ağırlığa eşit olduğunda daha küçük yeni bir limit hıza ulaşılır.`,
        olcut: [[14, "Üç aşama Newton yasasıyla"], [9, "İki aşama"], [4, "Bir aşama"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Çembersel hareket", puan: 14,
        metin: r`Bir otomobil yarıçapı 50 m olan düz bir virajı 20 m/s sabit süratle dönüyor. Otomobilin kütlesi 1000 kg.

**a)** Merkezcil ivmeyi ve gerekli merkezcil kuvveti bulunuz.
**b)** Bu kuvveti hangi kuvvet sağlar? Islak yolda neden kayma riski artar?`,
        cevap: r`**a)** $a_m = v^2/r = 400/50 = 8\ \text{m/s}^2$; $F_m = m a_m = 8000$ N.
**b)** Lastiklerle yol arasındaki (statik) sürtünme kuvveti. Islak yolda sürtünme katsayısı azalır; gereken merkezcil kuvveti sağlayamazsa araç virajın dışına doğru kayar. Bu yüzden ıslak yolda viraj daha düşük hızla alınmalıdır.`,
        olcut: [[14, "İvme, kuvvet ve sürtünme açıklaması"], [9, "Hesaplar doğru, açıklama eksik"], [4, "Bir hesap"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Momentum korunumu", puan: 15,
        metin: r`Buz üstünde duran 60 kg'lık bir patenci, 2 kg'lık bir topu 6 m/s hızla ileri fırlatıyor.

**a)** Patencinin geri tepme hızını bulunuz.
**b)** Bu olayı momentum korunumu ile açıklayınız. Roketlerin uzayda nasıl hızlandığına bir benzerlik kurunuz.`,
        cevap: r`**a)** Başlangıç momentumu 0: $0 = 2 \cdot 6 + 60 \cdot v \Rightarrow v = -0{,}2$ m/s (topun tersi yönde 0,2 m/s).
**b)** Dış kuvvet (sürtünme) ihmal edilebildiği için sistemin toplam momentumu korunur; top ileri momentum kazanınca patenci eşit büyüklükte geri momentum kazanır. Roketler de yanma gazlarını büyük hızla geriye iterek eşit ve zıt momentumla ileri hareket eder; uzayda "itilecek hava" gerekmez.`,
        olcut: [[15, "Hız ve korunum + roket benzetmesi"], [10, "Hız doğru, açıklama eksik"], [5, "Kurulum doğru, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "İtme", puan: 15,
        metin: r`Hava yastığı, çarpışmada yolcunun durma süresini uzatır.

**a)** İtme–momentum değişimi bağıntısını ($F \cdot \Delta t = \Delta p$) kullanarak hava yastığının yolcuyu nasıl koruduğunu açıklayınız.
**b)** 20 m/s hızla giden 70 kg'lık yolcu 0,05 s'de durursa ve 0,5 s'de durursa ortalama kuvvetleri karşılaştırınız.`,
        cevap: r`**a)** Yolcunun momentum değişimi ($\Delta p$) iki durumda aynıdır; durma süresi uzarsa ortalama kuvvet küçülür ve vücuda verilen zarar azalır.
**b)** $\Delta p = 70 \cdot 20 = 1400$ kg·m/s. 0,05 s: $F = 28\,000$ N. 0,5 s: $F = 2800$ N. Süre 10 kat uzayınca kuvvet 10 kat azalır.`,
        olcut: [[15, "Açıklama ve iki kuvvet"], [10, "Kuvvetler doğru, açıklama eksik"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Elektriksel kuvvet ve alan", puan: 14,
        metin: r`Aralarında 3 cm uzaklık bulunan $+2\ \mu\text{C}$ ve $-3\ \mu\text{C}$ iki yük veriliyor. ($k = 9 \times 10^9\ \text{N·m}^2/\text{C}^2$)

**a)** Yükler arasındaki kuvvetin büyüklüğünü ve türünü (itme/çekme) bulunuz.
**b)** Uzaklık iki katına çıkarsa kuvvet nasıl değişir?`,
        cevap: r`**a)** $F = k \dfrac{q_1 q_2}{d^2} = 9 \times 10^9 \cdot \dfrac{2 \times 10^{-6} \cdot 3 \times 10^{-6}}{(3 \times 10^{-2})^2} = \dfrac{54 \times 10^{-3}}{9 \times 10^{-4}} = 60$ N. Zıt işaretli olduğu için çekme.
**b)** Kuvvet uzaklığın karesiyle ters orantılı: 4'te birine (15 N) iner.`,
        olcut: [[14, "60 N, çekme ve değişim"], [9, "İki unsur"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Sığaç", puan: 14,
        metin: r`Fotoğraf makinesinin flaşı, pilden yavaşça yüklenen ve bir anda boşalan bir sığaç (kondansatör) kullanır.

**a)** Sığacın işlevini açıklayınız.
**b)** $C = 100\ \mu\text{F}$'lık sığaç 300 V'a yüklenirse depolanan yükü ve enerjiyi bulunuz.`,
        cevap: r`**a)** Sığaç elektrik yükünü ve enerjiyi elektrik alanında depolar; kısa sürede büyük akım vererek boşalabilir (flaşın parlak ışığı).
**b)** $q = C V = 100 \times 10^{-6} \cdot 300 = 0{,}03$ C. $E = \tfrac12 C V^2 = \tfrac12 \cdot 10^{-4} \cdot 9 \times 10^4 = 4{,}5$ J.`,
        olcut: [[14, "İşlev, yük ve enerji"], [9, "İki unsur"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Elektromanyetik indüksiyon", puan: 14,
        metin: r`Bisiklet dinamosunda tekerlek döndükçe bir mıknatıs bobinin içinde döner ve lamba yanar.

**a)** Lambanın yanmasını elektromanyetik indüksiyonla açıklayınız.
**b)** Bisiklet hızlanınca lambanın parlaklığı neden artar?
**c)** İndüksiyonun kullanıldığı iki teknoloji örneği yazınız.`,
        cevap: r`**a)** Mıknatıs döndükçe bobinden geçen manyetik akı değişir; değişen akı bobinde indüksiyon emk'si ve akım oluşturur (Faraday yasası).
**b)** Akı daha hızlı değişir; indüklenen emk ve akım büyür.
**c)** Elektrik santrallerindeki jeneratörler, transformatörler, kablosuz şarj, indüksiyonlu ocak, metal dedektörü.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Mercekler", puan: 14,
        metin: r`Odak uzaklığı 10 cm olan ince kenarlı bir merceğe 30 cm uzaklıkta bir mum konuyor.

**a)** Görüntünün mercekten uzaklığını bulunuz ($\tfrac1f = \tfrac1{d_c} + \tfrac1{d_g}$).
**b)** Görüntünün özelliklerini (gerçek/sanal, düz/ters, büyük/küçük) yazınız.
**c)** Bu merceğin kullanıldığı bir göz kusurunu yazınız.`,
        cevap: r`**a)** $\dfrac1{10} = \dfrac1{30} + \dfrac1{d_g} \Rightarrow \dfrac1{d_g} = \dfrac{2}{30} \Rightarrow d_g = 15$ cm.
**b)** Gerçek, ters ve küçük (büyütme $15/30 = 0{,}5$).
**c)** Hipermetropi (yakını görememe) ince kenarlı (yakınsak) mercekle düzeltilir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Doppler olayı", puan: 14,
        metin: r`Yaklaşan bir ambulansın siren sesi daha tiz, uzaklaşırken daha pes duyulur.

**a)** Bu olayın adını yazıp nedenini dalga cepheleriyle açıklayınız.
**b)** Bu olayın bilimde ya da teknolojide bir uygulamasını yazınız.`,
        cevap: r`**a)** Doppler olayı. Kaynak yaklaşırken dalga cepheleri gözlemcinin önünde sıkışır, dalga boyu kısalır ve algılanan frekans artar (tiz). Uzaklaşırken dalga boyu uzar, frekans azalır (pes). Kaynağın kendi frekansı değişmez.
**b)** Polis radarları (hız ölçümü), Doppler ultrason (kan akışı), meteoroloji radarları, gökbilimde kırmızıya kayma ile evrenin genişlemesinin anlaşılması.`,
        olcut: [[14, "Ad, açıklama ve uygulama"], [9, "İki unsur"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Fotoelektrik olay", puan: 15,
        metin: r`Bir metal yüzeye kırmızı ışık düşürüldüğünde ışık ne kadar şiddetli olursa olsun elektron sökülmüyor; mor ışık düşürüldüğünde zayıf olsa bile elektron sökülüyor.

**a)** Bu gözlemin ışığın dalga modeliyle neden açıklanamadığını yazınız.
**b)** Einstein'ın foton modeliyle açıklayınız ($E = h f$).`,
        cevap: r`**a)** Dalga modeline göre enerji ışığın şiddetiyle artar; yeterince şiddetli kırmızı ışığın da zamanla elektron sökmesi gerekirdi, ama sökemiyor.
**b)** Işık foton denen enerji paketlerinden oluşur ve bir fotonun enerjisi frekansıyla orantılıdır ($E = hf$). Bir elektron tek bir fotonun enerjisini alır. Kırmızı ışığın fotonlarının enerjisi metalin bağlanma enerjisinden (eşik enerjisi) küçük olduğu için şiddet artsa da elektron sökülemez. Mor ışığın fotonları yeterli enerjiye sahiptir; şiddet yalnızca sökülen elektron sayısını belirler.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Foton açıklaması tam, a eksik"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Atom ve spektrum", puan: 15,
        metin: r`Hidrojen gazından geçen elektrik akımı, prizmadan bakıldığında yalnızca belirli renklerde çizgiler (çizgi spektrumu) gösteriyor.

**a)** Bohr atom modeline göre bu çizgilerin oluşumunu açıklayınız.
**b)** Gökbilimciler uzak yıldızların hangi elementleri içerdiğini nasıl anlar?`,
        cevap: r`**a)** Elektronlar yalnızca belirli enerji düzeylerinde bulunabilir. Uyarılan elektron yüksek düzeye çıkar; daha düşük düzeye inerken iki düzey arasındaki enerji farkına eşit enerjide bir foton yayar ($\Delta E = hf$). Enerji farkları belirli olduğu için yalnızca belirli frekanslarda (renklerde) çizgiler görülür.
**b)** Her elementin kendine özgü çizgi spektrumu (parmak izi) vardır. Yıldız ışığının spektrumundaki soğurma çizgileri bilinen elementlerin çizgileriyle karşılaştırılarak içerik belirlenir (helyum ilk kez Güneş'in spektrumunda bulunmuştur).`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
