/* 12. Sınıf Fizik — açık uçlu yazılı sınavları (örnek; 2018 programı, Maarif sınav biçimi). */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["12/fizik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Virajda güvenli dönüş", puan: 14,
        metin: r`Yarıçapı 80 m olan yatay bir virajda lastik–yol arasındaki sürtünme katsayısı 0,5'tir. ($g = 10\ \text{m/s}^2$)

**a)** Aracın kaymadan alabileceği en büyük hızı bulunuz.
**b)** Otoyollarda virajların neden dış tarafı yüksek (eğimli) yapılır? Açıklayınız.`,
        cevap: r`**a)** $\dfrac{mv^2}{r} = k m g \Rightarrow v = \sqrt{k g r} = \sqrt{0{,}5 \cdot 10 \cdot 80} = 20$ m/s (72 km/h).
**b)** Eğimli yolda yolun tepki kuvvetinin yatay bileşeni merkezcil kuvvete katkı sağlar; böylece sürtünmeye daha az ihtiyaç duyulur ve güvenli hız artar.`,
        olcut: [[14, "20 m/s ve eğim açıklaması"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Açısal momentum", puan: 14,
        metin: r`Buz patencisi kollarını açıkken yavaş, kollarını göğsüne çekince çok hızlı döner.

Bu durumu **eylemsizlik momenti** ve **açısal momentumun korunumu** ile açıklayınız. Kollarını çekince dönme kinetik enerjisinin artıp artmadığını yorumlayınız.`,
        cevap: r`Patenciye dış tork etki etmediği için açısal momentum $L = I\omega$ korunur. Kollarını çekince kütle dönme eksenine yaklaşır, eylemsizlik momenti $I$ azalır; $L$ sabit kaldığı için açısal hız $\omega$ artar.

Dönme kinetik enerjisi $\tfrac12 I\omega^2 = \tfrac{L^2}{2I}$; $I$ azaldığı için artar. Ek enerji, patencinin kollarını içeri çekerken kaslarıyla yaptığı işten gelir.`,
        olcut: [[14, "Korunum açıklaması ve enerji yorumu"], [9, "Korunum doğru, enerji eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Kütle çekimi", puan: 14,
        metin: r`Bir uydu Dünya etrafında dairesel yörüngede dönüyor.

**a)** Uyduyu yörüngede tutan kuvvet hangisidir? Uydunun neden düşmediğini açıklayınız.
**b)** Kepler'in üçüncü yasasına göre yörünge yarıçapı arttıkça periyot nasıl değişir?
**c)** Uydudaki astronotlar neden "ağırlıksız" hisseder?`,
        cevap: r`**a)** Kütle çekim kuvveti merkezcil kuvvet görevi görür. Uydu sürekli düşer ama yatay hızı o kadar büyüktür ki yeryüzü de aynı oranda "kıvrılır"; uydu Dünya'nın etrafında serbest düşmeye devam eder.
**b)** $T^2 \propto r^3$: yarıçap arttıkça periyot artar (daha yavaş dolanır).
**c)** Uydu ve astronot birlikte serbest düşmededir; astronot zemine kuvvet uygulamaz (görünür ağırlık sıfır). Kütle çekimi yine etkilidir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Basit harmonik hareket", puan: 14,
        metin: r`Yay sabiti 200 N/m olan bir yaya 2 kg kütle bağlanıp 10 cm çekilerek serbest bırakılıyor.

**a)** Periyodu bulunuz ($T = 2\pi\sqrt{m/k}$, $\pi \approx 3$).
**b)** Kütlenin en büyük hızını ve en büyük ivmesini bulunuz.
**c)** Hız ve ivmenin en büyük olduğu konumları belirtiniz.`,
        cevap: r`**a)** $T = 2 \cdot 3 \cdot \sqrt{2/200} = 6 \cdot 0{,}1 = 0{,}6$ s.
**b)** $\omega = \sqrt{k/m} = 10$ rad/s. $v_{max} = \omega A = 10 \cdot 0{,}1 = 1$ m/s. $a_{max} = \omega^2 A = 100 \cdot 0{,}1 = 10\ \text{m/s}^2$.
**c)** Hız denge noktasında, ivme uç noktalarda (genliğin en büyük olduğu yerlerde) en büyüktür.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Girişim", puan: 14,
        metin: r`Young çift yarık deneyinde yarıklar arası 0,2 mm, perde uzaklığı 2 m ve aydınlık saçak aralığı 6 mm ölçülüyor.

**a)** Kullanılan ışığın dalga boyunu bulunuz ($\Delta x = \dfrac{\lambda L}{d}$).
**b)** Bu deney ışığın hangi doğasını kanıtlar? Neden?`,
        cevap: r`**a)** $\lambda = \dfrac{\Delta x \cdot d}{L} = \dfrac{6 \times 10^{-3} \cdot 2 \times 10^{-4}}{2} = 6 \times 10^{-7}$ m = 600 nm (turuncu-kırmızı).
**b)** Dalga doğasını; girişim (aydınlık-karanlık saçaklar) yalnızca dalgalarda görülür, iki yarıktan çıkan dalgaların üst üste binmesiyle oluşur.`,
        olcut: [[14, "Dalga boyu ve dalga doğası"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Elektromanyetik dalgalar", puan: 15,
        metin: r`Radyo dalgaları, mikrodalgalar, görünür ışık ve X ışınları elektromanyetik spektrumda yer alır.

**a)** Bunları frekansı küçükten büyüğe sıralayınız.
**b)** Hepsinin boşluktaki hızı aynı mıdır? Gerekçelendiriniz.
**c)** Her birinin bir kullanım alanını yazınız.`,
        cevap: r`**a)** Radyo < mikrodalga < görünür ışık < X ışını.
**b)** Evet, boşlukta hepsi ışık hızıyla ($c = 3 \times 10^8$ m/s) yayılır; farklı olan frekans ve dalga boylarıdır ($c = \lambda f$).
**c)** Radyo: yayıncılık, haberleşme. Mikrodalga: mikrodalga fırın, radar, Wi-Fi. Görünür ışık: görme, fiber optik. X ışını: tıbbi görüntüleme, güvenlik taraması.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Kırınım", puan: 15,
        metin: r`Bir dalga leğeninde su dalgaları dar bir aralıktan geçiyor.

**a)** Aralık genişliği ile dalga boyu arasındaki ilişkinin kırınıma etkisini açıklayınız.
**b)** Ses dalgalarının köşe arkasından duyulabildiği hâlde ışığın köşe arkasından görülememesini kırınımla açıklayınız.`,
        cevap: r`**a)** Aralık genişliği dalga boyuna yakın ya da ondan küçükse kırınım belirgindir; dalgalar aralıktan geçtikten sonra yarım daireler hâlinde yayılır. Aralık dalga boyundan çok büyükse kırınım azdır.
**b)** Sesin dalga boyu (cm–m) kapı ve köşe boyutlarına yakındır, belirgin kırınıma uğrar. Görünür ışığın dalga boyu (yüzlerce nanometre) bu engellere göre çok küçük olduğu için kırınım fark edilmez.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u4", beceri: "Radyoaktivite", puan: 14,
        metin: r`Yarı ömrü 8 gün olan iyot-131 tiroit tedavisinde kullanılır.

**a)** 160 mg iyot-131'den 24 gün sonra ne kadar kalır?
**b)** Alfa, beta ve gama ışımalarını giricilik ve yük bakımından karşılaştırınız.`,
        cevap: r`**a)** 24 gün = 3 yarı ömür: $160 \to 80 \to 40 \to 20$ mg.
**b)** Alfa: +2 yüklü (helyum çekirdeği), giriciliği en az (kâğıt durdurur). Beta: −1 yüklü elektron (ya da +1 pozitron), orta giricilik (alüminyum levha durdurur). Gama: yüksüz elektromanyetik dalga, giriciliği en fazla (kalın kurşun/beton gerekir).`,
        olcut: [[14, "20 mg ve üç karşılaştırma"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Fisyon ve füzyon", puan: 14,
        metin: r`Nükleer santraller **fisyon**, Güneş ise **füzyon** ile enerji üretir.

İki tepkimeyi karşılaştırınız (nasıl oluşur, nerede görülür, atık sorunu). Füzyon enerjisinin dünyada henüz yaygın kullanılamamasının nedenini yazınız.`,
        cevap: r`Fisyon: büyük ve kararsız çekirdeğin (uranyum-235) nötronla bölünerek daha küçük çekirdeklere ayrılması; nükleer santrallerde; uzun ömürlü radyoaktif atık oluşturur.
Füzyon: hafif çekirdeklerin (hidrojen izotopları) birleşerek daha ağır çekirdek (helyum) oluşturması; Güneş ve yıldızlarda; radyoaktif atığı çok daha azdır, birim kütle başına daha çok enerji verir.

Neden: Füzyon için milyonlarca derecelik sıcaklık ve yüksek basınç gerekir; plazmayı kontrol altında ve uzun süre tutmak teknolojik olarak çok zordur.`,
        olcut: [[14, "Karşılaştırma ve neden"], [9, "Karşılaştırma eksik ya da neden yok"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Atom altı parçacıklar", puan: 14,
        metin: r`Standart modele göre proton ve nötron, kuarklardan oluşur.

**a)** Proton ve nötronun kuark yapısını yazınız (u: +2/3, d: −1/3).
**b)** Leptonlara iki örnek veriniz.
**c)** Büyük Patlama teorisini destekleyen bir gözlemsel kanıt yazınız.`,
        cevap: r`**a)** Proton: uud ($\tfrac23 + \tfrac23 - \tfrac13 = +1$). Nötron: udd ($\tfrac23 - \tfrac13 - \tfrac13 = 0$).
**b)** Elektron, müon, tau, nötrinolar.
**c)** Kozmik mikrodalga arka plan ışıması; galaksilerin uzaklaşması (kırmızıya kayma, Hubble yasası); evrendeki hafif element (H, He) oranları.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Özel görelilik", puan: 14,
        metin: r`Kozmik ışınların atmosferin üst katmanlarında oluşturduğu müonların ömrü çok kısadır; yine de çoğu yeryüzüne ulaşır.

Bu durumu özel göreliliğin **zaman genişlemesi** ile açıklayınız. Özel göreliliğin iki temel postulatını yazınız.`,
        cevap: r`Müonlar ışık hızına yakın hızla hareket eder. Yeryüzündeki gözlemciye göre hareketli müonun zamanı yavaş akar (zaman genişlemesi, $\Delta t = \gamma \Delta t_0$); bu yüzden müonun ömrü uzamış gibi ölçülür ve yeryüzüne kadar ulaşabilir. (Müonun kendi çerçevesinde ise atmosfer kısalmış görünür — uzunluk kısalması.)

Postulatlar: Fizik yasaları tüm eylemsiz gözlem çerçevelerinde aynıdır. Işığın boşluktaki hızı tüm eylemsiz gözlemciler için aynıdır ve kaynağın hızından bağımsızdır.`,
        olcut: [[14, "Açıklama ve iki postulat"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Madde dalgaları", puan: 14,
        metin: r`De Broglie'ye göre hareket eden her parçacığın bir dalga boyu vardır: $\lambda = \dfrac{h}{mv}$.

Elektronlar ile bir futbol topunun dalga boylarını kalitatif olarak karşılaştırınız. Neden elektronların dalga özelliği (kırınım) gözlenebilir de futbol topununki gözlenemez? Bu özelliğin kullanıldığı bir teknolojiyi yazınız.`,
        cevap: r`Futbol topunun kütlesi elektrona göre çok büyük olduğu için ($mv$ çok büyük) dalga boyu ölçülemeyecek kadar küçüktür. Elektronun kütlesi çok küçük olduğundan dalga boyu atomlar arası uzaklıklar mertebesinde olabilir; kristallerden geçerken kırınım ve girişim gözlenir.

Teknoloji: Elektron mikroskobu (ışıktan çok daha kısa dalga boyu sayesinde çok yüksek çözünürlük).`,
        olcut: [[14, "Karşılaştırma, gerekçe ve teknoloji"], [9, "İki unsur"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Teknoloji uygulamaları", puan: 15,
        metin: r`Aşağıdaki teknolojilerin dayandığı fizik ilkesini birer cümleyle açıklayınız:

**a)** MR (manyetik rezonans) görüntüleme **b)** Güneş paneli (yarı iletken) **c)** Lazer **d)** Süper iletken mıknatıslı hızlı tren`,
        cevap: r`**a)** Güçlü manyetik alanda vücuttaki hidrojen çekirdeklerinin radyo dalgalarıyla uyarılması ve geri verdikleri sinyallerin ölçülmesi.
**b)** Işık (foton) yarı iletkendeki p-n ekleminde elektron-boşluk çiftleri oluşturur; elektrik akımı doğar (fotovoltaik etki).
**c)** Uyarılmış emisyon: uyarılmış atomlar gelen fotonla aynı faz, frekans ve yönde foton yayar; tek renkli, yönlü, yoğun ışık.
**d)** Süper iletkenler kritik sıcaklığın altında sıfır dirençle çok güçlü akım taşır, güçlü mıknatıslar oluşturur; manyetik itme ile tren raydan yükselir (manyetik kaldırma), sürtünme azalır.`,
        olcut: [[15, "Dördü doğru"], [10, "Üçü doğru"], [5, "İkisi doğru"], [0, "Bir ya da hiç"]] },
      { tema: "u6", beceri: "Bilim ve toplum", puan: 15,
        metin: r`Tıbbi görüntüleme cihazları (röntgen, BT) iyonlaştırıcı radyasyon kullanır.

**a)** İyonlaştırıcı radyasyonun canlılara olası etkisini açıklayınız.
**b)** Hastanelerde radyasyondan korunmak için uygulanan üç ilkeyi yazınız.`,
        cevap: r`**a)** Hücrelerdeki atomları iyonlaştırarak DNA'ya zarar verebilir; yüksek dozda hücre ölümüne, uzun vadede mutasyon ve kanser riskine yol açabilir.
**b)** Süre (maruz kalma süresini kısaltmak), uzaklık (kaynaktan uzak durmak), zırhlama (kurşun önlük, kurşunlu duvar); gereksiz çekimden kaçınmak (gerekçelendirme) ve en düşük dozu kullanmak (ALARA).`,
        olcut: [[15, "Etki ve üç ilke"], [10, "Etki ve iki ilke"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
