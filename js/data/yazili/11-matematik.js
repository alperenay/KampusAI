/* 11. Sınıf Matematik — Maarif Modeli açık uçlu yazılı sınavları (örnek). u1 Nicelikler ve Değişimler, u2 Dörtgenler, u3 Üçgenler ve Benzerlik, u4 Veri, Sayma ve Olasılık, u5 Fonksiyonlar */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/matematik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Orantısal akıl yürütme", puan: 14,
        metin: r`Bir boya işini 6 usta 10 günde bitiriyor.

**a)** Usta sayısı ile süre arasında nasıl bir orantı vardır? Fonksiyon olarak yazınız.
**b)** İş 4 günde bitirilmek istenirse kaç usta gerekir?
**c)** Bu fonksiyonun grafiği hangi eğridir? Usta sayısı çok arttığında süreye ne olur?`,
        cevap: r`**a)** Ters orantı: usta × gün = 60 sabit ⇒ $g(u) = \dfrac{60}{u}$.
**b)** $60/4 = 15$ usta.
**c)** Hiperbolün bir kolu (birinci bölgede). Usta sayısı arttıkça süre azalır ve 0'a yaklaşır ama hiç 0 olmaz (gerçekte de iş bölünebilirliğinin bir sınırı vardır).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Modelleme", puan: 14,
        metin: r`Bir telefon tarifesi aylık 150 TL sabit ücret ve her GB internet için 12 TL ek ücret alıyor; diğer tarife sabit ücret almadan GB başına 30 TL alıyor.

**a)** İki tarifenin ücretini kullanılan GB miktarı $x$'e bağlı yazınız.
**b)** Hangi kullanım miktarından sonra birinci tarife daha ucuzdur? Eşitsizlik kurarak çözünüz.`,
        cevap: r`**a)** $T_1(x) = 150 + 12x$, $T_2(x) = 30x$.
**b)** $150 + 12x < 30x \Rightarrow 150 < 18x \Rightarrow x > 8{,}\overline{3}$. 9 GB ve üzeri kullanımda birinci tarife daha ucuzdur (8,33 GB'ta eşit).`,
        olcut: [[14, "İki fonksiyon ve doğru eşitsizlik çözümü"], [9, "Fonksiyonlar doğru, eşitsizlikte hata"], [4, "Bir fonksiyon"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Rasyonel denklem", puan: 14,
        metin: r`Bir musluk havuzu 6 saatte, diğeri 3 saatte dolduruyor.

**a)** İkisi birlikte havuzu kaç saatte doldurur? Denklemle çözünüz.
**b)** Havuzun dibinde havuzu 12 saatte boşaltan bir delik varsa süre ne olur?`,
        cevap: r`**a)** $\dfrac{1}{6} + \dfrac{1}{3} = \dfrac{1}{t} \Rightarrow \dfrac{3}{6} = \dfrac{1}{t} \Rightarrow t = 2$ saat.
**b)** $\dfrac16 + \dfrac13 - \dfrac1{12} = \dfrac{2 + 4 - 1}{12} = \dfrac{5}{12} \Rightarrow t = \dfrac{12}{5} = 2{,}4$ saat (2 saat 24 dk).`,
        olcut: [[14, "İki sonuç denklemle"], [9, "Biri doğru"], [4, "Denklem doğru kurulmuş"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Özelliklerle muhakeme", puan: 14,
        metin: r`Aşağıdaki ifadelerin doğru ya da yanlış olduğunu gerekçesiyle belirtiniz:

**a)** Her kare bir eşkenar dörtgendir.
**b)** Köşegenleri birbirini ortalayan her dörtgen dikdörtgendir.
**c)** Bir paralelkenarın karşılıklı açıları eşittir.`,
        cevap: r`**a)** Doğru: karenin dört kenarı eşittir; eşkenar dörtgenin tanımını sağlar.
**b)** Yanlış: köşegenleri birbirini ortalayan dörtgen paralelkenardır; dikdörtgen için köşegenlerin ayrıca eşit olması gerekir (karşı örnek: eşkenar dörtgen).
**c)** Doğru: paralel doğrular ve kesenle oluşan açı özelliklerinden karşılıklı açılar eşittir, komşu açılar bütünlerdir.`,
        olcut: [[14, "Üç karar gerekçeli"], [9, "Üç karar, gerekçeler eksik"], [4, "İki karar"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Problem çözme", puan: 14,
        metin: r`Bir yamuk biçimli bahçenin paralel kenarları 18 m ve 10 m, yüksekliği 8 m'dir.

**a)** Bahçenin alanını bulunuz.
**b)** Bahçenin orta tabanının uzunluğunu bulunuz ve alan formülüyle ilişkisini açıklayınız.`,
        cevap: r`**a)** $A = \dfrac{(18 + 10)}{2} \cdot 8 = 14 \cdot 8 = 112$ m².
**b)** Orta taban $= \dfrac{18 + 10}{2} = 14$ m. Yamuğun alanı orta taban ile yüksekliğin çarpımına eşittir; yamuk, aynı yükseklikte ve orta taban uzunluğunda bir dikdörtgenle eş alanlıdır.`,
        olcut: [[14, "Alan, orta taban ve ilişki"], [9, "İki doğru unsur"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Benzerlikle ölçme", puan: 15,
        metin: r`Güneşli bir günde 1,6 m boyundaki bir öğrencinin gölgesi 2 m, okulun bayrak direğinin gölgesi 15 m ölçülüyor.

**a)** Bayrak direğinin yüksekliğini bulunuz.
**b)** Kullandığınız benzerlik kuralını (hangi açılar eşit) açıklayınız.`,
        cevap: r`**a)** $\dfrac{h}{15} = \dfrac{1{,}6}{2} \Rightarrow h = 12$ m.
**b)** Öğrenci ve direk yere dik (90°), güneş ışınları paralel geldiği için yerle yaptıkları açı aynıdır; iki açısı eşit olan üçgenler benzerdir (A-A benzerliği). Benzer üçgenlerde karşılık gelen kenarlar orantılıdır.`,
        olcut: [[15, "12 m ve A-A benzerlik gerekçesi"], [10, "Sonuç doğru, gerekçe eksik"], [5, "Orantı doğru, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Pisagor ve açı-kenar", puan: 15,
        metin: r`Bir üçgenin kenarları 9, 12 ve 15 birimdir.

**a)** Bu üçgenin dik üçgen olduğunu gösteriniz.
**b)** En büyük açısı hangi kenarın karşısındadır?
**c)** Kenarları 9, 12 ve 16 olan bir üçgende en büyük açı dar mı geniş mi olur? Gerekçelendiriniz.`,
        cevap: r`**a)** $9^2 + 12^2 = 81 + 144 = 225 = 15^2$; Pisagor bağıntısının tersi gereği dik üçgendir.
**b)** En uzun kenar 15'in karşısında (dik açı).
**c)** $16^2 = 256 > 225 = 9^2 + 12^2$ olduğundan 16'nın karşısındaki açı **geniş açıdır**.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u4", beceri: "Sayma", puan: 14,
        metin: r`Bir okulun öğrenci meclisinde 8 aday var.

**a)** Başkan, başkan yardımcısı ve sekreter kaç farklı şekilde seçilebilir?
**b)** 3 kişilik bir komisyon kaç farklı şekilde oluşturulabilir?
**c)** İki sonucun neden farklı olduğunu açıklayınız.`,
        cevap: r`**a)** Sıra önemli (permütasyon): $P(8,3) = 8 \cdot 7 \cdot 6 = 336$.
**b)** Sıra önemsiz (kombinasyon): $C(8,3) = \dfrac{336}{3!} = 56$.
**c)** Görevlerde aynı üç kişinin farklı görev dağılımları farklı seçimdir ($3! = 6$ sıralama); komisyonda ise aynı üç kişi tek bir komisyondur.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Olasılık", puan: 14,
        metin: r`Bir torbada 5 kırmızı, 3 mavi top var. Geri koymadan art arda iki top çekiliyor.

**a)** İkisinin de kırmızı olma olasılığını bulunuz.
**b)** Farklı renkte olma olasılığını bulunuz.
**c)** Top geri konularak çekilseydi (a)'daki olasılık artar mı azalır mı? Gerekçelendiriniz.`,
        cevap: r`**a)** $\dfrac58 \cdot \dfrac47 = \dfrac{20}{56} = \dfrac{5}{14}$.
**b)** $\dfrac58 \cdot \dfrac37 + \dfrac38 \cdot \dfrac57 = \dfrac{30}{56} = \dfrac{15}{28}$.
**c)** Geri koyunca $\left(\dfrac58\right)^2 = \dfrac{25}{64} \approx 0{,}39$; geri koymadan $\approx 0{,}36$. **Artar**; çünkü ilk kırmızı geri konduğu için ikinci çekilişte kırmızı oranı azalmaz.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Veri analizi", puan: 14,
        metin: r`Bir sınıfın matematik notları: 45, 60, 60, 70, 75, 80, 85, 90, 95, 100.

**a)** Ortalama, medyan, mod ve açıklığı bulunuz.
**b)** Öğretmen herkese 5 puan eklerse bu ölçülerden hangileri değişir, hangileri değişmez?`,
        cevap: r`**a)** Ortalama $760/10 = 76$; medyan $(75 + 80)/2 = 77{,}5$; mod 60; açıklık $100 - 45 = 55$.
**b)** Ortalama, medyan ve mod 5 artar (81, 82,5, 65); açıklık değişmez (55), çünkü tüm veriler aynı miktarda kayar.`,
        olcut: [[14, "Dört ölçü ve doğru değişim yorumu"], [9, "Ölçüler doğru, yorum eksik ya da tersi"], [4, "İki ölçü"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Grafik yorumlama", puan: 14,
        metin: r`$f(x) = x^2 - 4x + 3$ fonksiyonu veriliyor.

**a)** Tepe noktasını, $x$ ve $y$ eksenlerini kestiği noktaları bulunuz.
**b)** Fonksiyonun azalan ve artan olduğu aralıkları yazınız.
**c)** $f(x) = k$ denkleminin iki farklı kökü olması için $k$ ne olmalıdır?`,
        cevap: r`**a)** Tepe: $x = 2$, $f(2) = -1$ ⇒ $(2, -1)$. $x$ ekseni: $x^2 - 4x + 3 = 0 \Rightarrow x = 1, 3$. $y$ ekseni: $(0, 3)$.
**b)** $(-\infty, 2)$ aralığında azalan, $(2, \infty)$ aralığında artan.
**c)** Yatay doğru $y = k$ parabolü iki noktada kesmeli: $k > -1$.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Fonksiyon kavramı", puan: 14,
        metin: r`Aşağıdaki ilişkilerden hangilerinin fonksiyon olduğunu gerekçesiyle belirtiniz:

**a)** Her öğrenciye okul numarasını eşleyen ilişki
**b)** Her şehre o şehirde yaşayan kişileri eşleyen ilişki
**c)** $\{(1, 2), (2, 2), (3, 5)\}$
**d)** $x^2 + y^2 = 25$ denklemiyle verilen $x \to y$ ilişkisi`,
        cevap: r`**a)** Fonksiyon: her öğrencinin tek bir numarası vardır.
**b)** Fonksiyon değil: bir şehre birden çok kişi karşılık gelir.
**c)** Fonksiyon: her ilk bileşen bir kez kullanılmış (farklı elemanların aynı görüntüye gitmesi sorun değildir).
**d)** Fonksiyon değil: örneğin $x = 3$ için $y = 4$ ve $y = -4$ olmak üzere iki görüntü vardır (düşey doğru testi).`,
        olcut: [[14, "Dört karar gerekçeli"], [9, "Dört karar ya da üçü gerekçeli"], [4, "İki karar"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Modelleme ve yorum", puan: 15,
        metin: r`Bir şirketin ürettiği $x$ adet ürün için kârı $K(x) = -2x^2 + 120x - 1000$ TL'dir.

**a)** Kârı en büyük yapan üretim miktarını ve en büyük kârı bulunuz.
**b)** Şirket kaç adet arasında üretim yaparsa zarar etmez?`,
        cevap: r`**a)** $x = -\dfrac{120}{2 \cdot (-2)} = 30$ adet; $K(30) = -1800 + 3600 - 1000 = 800$ TL.
**b)** $-2x^2 + 120x - 1000 \ge 0 \Rightarrow x^2 - 60x + 500 \le 0 \Rightarrow (x - 10)(x - 50) \le 0 \Rightarrow 10 \le x \le 50$.`,
        olcut: [[15, "En büyük kâr ve aralık doğru"], [10, "Biri doğru"], [5, "Kurulum doğru, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Olasılıksal karar", puan: 15,
        metin: r`Bir şans oyununda iki zar atılıyor; toplam 7 gelirse 50 TL kazanılıyor, oynamak 10 TL.

**a)** Toplamın 7 gelme olasılığını bulunuz.
**b)** Bu oyunu uzun süre oynayan biri ortalama olarak kazanır mı kaybeder mi? Beklenen değerle açıklayınız.`,
        cevap: r`**a)** 7 toplamı: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) ⇒ $6/36 = 1/6$.
**b)** Bir oyunda beklenen kazanç $= \dfrac16 \cdot 50 - 10 = 8{,}33 - 10 \approx -1{,}67$ TL. Uzun vadede oyun başına ortalama 1,67 TL kaybeder.`,
        olcut: [[15, "Olasılık ve beklenen değer yorumu"], [10, "Olasılık doğru, yorum sezgisel"], [5, "Yalnız olasılık"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
