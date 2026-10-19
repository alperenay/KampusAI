/* 9. Sınıf Matematik — Maarif Modeli açık uçlu yazılı sınavları (örnek). Temalar: t1 Sayılar … t7 Veriden Olasılığa */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/matematik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "t1", beceri: "Matematiksel muhakeme", puan: 14,
        metin: r`Bir bilgisayarın belleği $2^{40}$ bayttır. Bir fotoğraf ortalama $2^{22}$ bayt yer kaplıyor.

**a)** Bu belleğe en fazla kaç fotoğraf sığar? Sonucu 2'nin kuvveti olarak yazınız.
**b)** Arkadaşınız "$2^{40} \div 2^{22} = 1^{18} = 1$" diyor. Hatasını açıklayınız.`,
        cevap: r`**a)** $\dfrac{2^{40}}{2^{22}} = 2^{40-22} = 2^{18}$ fotoğraf (262 144).

**b)** Tabanları aynı olan üslü sayılar bölünürken **tabanlar bölünmez**; taban aynı kalır, üsler çıkarılır. Doğrusu $2^{18}$'dir.`,
        olcut: [[14, "a'da $2^{18}$ ve üs kuralı; b'de tabanın değişmeyeceği doğru açıklanmış"], [10, "a doğru, b'deki açıklama eksik ya da b doğru, a'da işlem hatası"], [5, "Yalnız a ya da yalnız b doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t1", beceri: "Matematiksel muhakeme", puan: 14,
        metin: r`Kenar uzunluğu $\sqrt{50}$ cm olan kare biçimli bir fayansın çevresini hesaplayan iki öğrencinin çözümleri:

- Ece: $4\sqrt{50} = 4 \cdot 5\sqrt{2} = 20\sqrt{2}$ cm
- Can: $4\sqrt{50} = \sqrt{200} \approx 14{,}1$ cm

Hangi öğrencinin çözümü doğrudur? Diğer öğrencinin yaptığı hatayı gerekçesiyle açıklayınız.`,
        cevap: r`Ece doğrudur: $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$, çevre $= 4 \cdot 5\sqrt{2} = 20\sqrt{2} \approx 28{,}3$ cm.

Can, katsayı 4'ü kökün içine alırken karesini almamıştır: $4\sqrt{50} = \sqrt{16 \cdot 50} = \sqrt{800}$ olmalıydı, $\sqrt{200}$ değil.`,
        olcut: [[14, "Ece'nin doğru olduğu ve Can'ın hatası (4'ün karesi alınmadan köke girmesi) açıklanmış"], [8, "Doğru öğrenci belirlenmiş, hata açıklaması eksik"], [0, "Yanlış ya da gerekçesiz"]] },
      { tema: "t1", beceri: "Sembol ve gösterim kullanma", puan: 14,
        metin: r`Bir sağlık uygulaması güvenli vücut sıcaklığını $A = [36{,}1;\ 37{,}2]$ aralığı, ateşi ise $B = (37{,}5;\ 41)$ aralığı olarak tanımlıyor.

**a)** $A \cup B$ ve $A \cap B$ kümelerini aralık gösterimiyle yazınız.
**b)** $37{,}3\ °C$ ölçülen bir kişi hangi kümeye girer? Uygulamanın bu kişi için nasıl bir sorunu olduğunu yorumlayınız.`,
        cevap: r`**a)** $A \cup B = [36{,}1;\ 37{,}2] \cup (37{,}5;\ 41)$ (iki ayrık aralık; tek aralık olarak yazılamaz). $A \cap B = \varnothing$.

**b)** $37{,}3$ ne $A$'da ne $B$'dedir. Uygulama $(37{,}2;\ 37{,}5]$ arasındaki değerleri sınıflandıramaz; bu aralık için yeni bir kategori (ör. "hafif yüksek") tanımlanmalıdır.`,
        olcut: [[14, "Birleşim, boş kesişim ve b'deki boşluk yorumu doğru"], [9, "a doğru, b yorumu eksik"], [5, "Yalnız kesişim ya da yalnız b doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t1", beceri: "Matematiksel muhakeme", puan: 14,
        metin: r`Aşağıdaki ifadelerin her biri için **doğru** ya da **yanlış** olduğuna karar verip yanlış olanlar için birer karşı örnek yazınız.

**a)** İki irrasyonel sayının toplamı her zaman irrasyoneldir.
**b)** Her tam sayı bir rasyonel sayıdır.
**c)** İki rasyonel sayının arasında her zaman başka bir rasyonel sayı vardır.`,
        cevap: r`**a)** Yanlış. Karşı örnek: $\sqrt{2} + (-\sqrt{2}) = 0$ rasyoneldir.
**b)** Doğru. $a = \dfrac{a}{1}$ biçiminde yazılabilir.
**c)** Doğru. $a < b$ ise $\dfrac{a+b}{2}$ ikisinin arasındadır.`,
        olcut: [[14, "Üç karar doğru, a için geçerli karşı örnek"], [10, "Kararlar doğru, karşı örnek eksik/hatalı"], [5, "İki karar doğru"], [0, "Bir ya da hiç doğru yok"]] },
      { tema: "t2", beceri: "Matematiksel modelleme", puan: 14,
        metin: r`Bir taksi açılışta 40 TL alıyor, kilometre başına 25 TL ekliyor.

**a)** Ücreti yol uzunluğu $x$'e (km) bağlı bir fonksiyon olarak yazınız.
**b)** Grafiğin eğimi ve $y$ eksenini kestiği nokta bu durumda neyi anlatır?
**c)** 340 TL ödeyen bir yolcu kaç km yol gitmiştir?`,
        cevap: r`**a)** $f(x) = 25x + 40$
**b)** Eğim 25: her ek kilometrede ücret 25 TL artar. $y$ ekseni kesişimi 40: hiç yol gidilmese de ödenen açılış ücreti.
**c)** $25x + 40 = 340 \Rightarrow x = 12$ km.`,
        olcut: [[14, "Fonksiyon, eğim ve kesişim yorumu, x = 12"], [10, "Üç bölümden ikisi doğru"], [5, "Yalnız fonksiyon doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t2", beceri: "Analojik akıl yürütme", puan: 15,
        metin: r`$f(x) = |x - 3| + 1$ fonksiyonu veriliyor.

**a)** Bu fonksiyonun grafiği $y = |x|$ grafiğinden hangi ötelemelerle elde edilir?
**b)** Fonksiyonun en küçük değerini ve bu değeri aldığı $x$'i bulunuz.
**c)** $f(x) = 4$ denklemini çözünüz.`,
        cevap: r`**a)** 3 birim sağa, 1 birim yukarı öteleme.
**b)** Tepe noktası $(3, 1)$: en küçük değer 1, $x = 3$'te.
**c)** $|x - 3| = 3 \Rightarrow x - 3 = 3$ ya da $x - 3 = -3 \Rightarrow x = 6$ veya $x = 0$.`,
        olcut: [[15, "Öteleme, tepe noktası ve iki kök doğru"], [10, "İki bölüm doğru (ör. c'de tek kök bulunmuş)"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t2", beceri: "Problem çözme", puan: 15,
        metin: r`Bir okul kantininde tost 30 TL, ayran 15 TL. Ayşe en az 2 tost alacak ve toplam harcaması 150 TL'yi geçmeyecek.

**a)** Aldığı ayran sayısı $a$ için bir eşitsizlik yazınız (2 tost aldığını varsayınız).
**b)** En fazla kaç ayran alabilir?
**c)** 3 tost alırsa sonuç nasıl değişir?`,
        cevap: r`**a)** $2 \cdot 30 + 15a \le 150$
**b)** $15a \le 90 \Rightarrow a \le 6$: en fazla 6 ayran.
**c)** $90 + 15a \le 150 \Rightarrow a \le 4$: en fazla 4 ayran.`,
        olcut: [[15, "Eşitsizlik ve iki sonuç doğru"], [10, "Eşitsizlik ve b doğru"], [5, "Yalnız eşitsizlik doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "t3", beceri: "İspat ve doğrulama", puan: 14,
        metin: r`Kenar uzunlukları 4 cm, 7 cm ve $x$ cm olan bir üçgen çizilecek.

**a)** $x$'in alabileceği değerlerin aralığını üçgen eşitsizliğiyle bulunuz.
**b)** $x$ bir tam sayı ise en büyük açı 7 cm'lik kenarın karşısında olacak şekilde $x$ hangi değerleri alabilir? Gerekçelendiriniz.`,
        cevap: r`**a)** $7 - 4 < x < 7 + 4 \Rightarrow 3 < x < 11$.
**b)** Üçgende büyük kenarın karşısında büyük açı bulunur. En büyük açının yalnızca 7 cm'lik kenarın karşısında olması için 7 en uzun kenar olmalıdır: $3 < x < 7$ ($x = 7$ olursa iki açı eşit olur). Tam sayılar: **4, 5, 6**.`,
        olcut: [[14, "Aralık ve 4, 5, 6 gerekçesiyle"], [9, "Aralık doğru, b'de gerekçe eksik"], [4, "Yalnız aralık doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t4", beceri: "Çıkarım yapma", puan: 14,
        metin: r`Bir fotoğraf $1:50$ ölçekli bir maketten çekiliyor. Makette kapı 4 cm yüksekliğinde.

**a)** Gerçek kapı kaç metre yüksekliğindedir?
**b)** Maketteki bir pencerenin alanı 6 cm² ise gerçek pencerenin alanı kaç m²'dir? Neden 50 ile değil de başka bir sayıyla çarptığınızı açıklayınız.`,
        cevap: r`**a)** $4 \cdot 50 = 200$ cm $= 2$ m.
**b)** Benzer şekillerde alanlar benzerlik oranının **karesiyle** orantılıdır: $6 \cdot 50^2 = 15\,000$ cm² $= 1{,}5$ m².`,
        olcut: [[14, "2 m ve 1,5 m² ile karenin gerekçesi"], [9, "b sonucu doğru ama gerekçe yok, ya da a doğru b'de oran hatası"], [4, "Yalnız a doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t4", beceri: "Problem çözme", puan: 14,
        metin: r`Bir merdiven duvara yaslanıyor. Merdivenin ayağı duvardan 1,5 m uzakta ve merdiven 2,5 m uzunluğunda.

**a)** Merdivenin duvara değdiği nokta yerden kaç metre yüksektedir?
**b)** Kullandığınız teoremi adıyla yazıp neden bu durumda uygulanabildiğini açıklayınız.`,
        cevap: r`**a)** $h^2 + 1{,}5^2 = 2{,}5^2 \Rightarrow h^2 = 6{,}25 - 2{,}25 = 4 \Rightarrow h = 2$ m.
**b)** Pisagor teoremi; duvar ile zemin dik açı yaptığı için oluşan üçgen dik üçgendir.`,
        olcut: [[14, "h = 2 m ve dik üçgen gerekçesi"], [9, "Sonuç doğru, gerekçe eksik"], [4, "Doğru kurulum, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "t5", beceri: "Algoritmik düşünme", puan: 14,
        metin: r`Aşağıdaki algoritma bir sayı alır:

1. Sayıyı $n$ olarak al, $s = 0$ yap.
2. $n > 0$ olduğu sürece: $s = s + (n \bmod 10)$, $n = \lfloor n / 10 \rfloor$.
3. $s$'yi yaz.

**a)** $n = 2047$ için çıktı nedir? Her adımda $n$ ve $s$'yi tabloyla gösteriniz.
**b)** Bu algoritma ne iş yapar?`,
        cevap: r`**a)** | n | s |
|---|---|
| 2047 | 0 |
| 204 | 7 |
| 20 | 11 |
| 2 | 11 |
| 0 | 13 |

Çıktı: **13**.

**b)** Sayının basamaklarındaki rakamların toplamını bulur.`,
        olcut: [[14, "Tablo, 13 ve algoritmanın amacı"], [9, "Sonuç doğru, tablo ya da amaç eksik"], [4, "Amaç doğru, izleme hatalı"], [0, "Yanlış ya da boş"]] },
      { tema: "t5", beceri: "Mantıksal çözümleme", puan: 14,
        metin: r`$p$: "Hava yağmurlu", $q$: "Maç ertelenir" önermeleri veriliyor.

**a)** $p \Rightarrow q$ önermesini Türkçe cümleyle yazınız.
**b)** Hava yağmurlu değilken maç ertelenirse $p \Rightarrow q$ doğru mu yanlış mı olur? Gerekçelendiriniz.
**c)** "Her öğrenci bir kitap okudu." önermesinin değilini yazınız.`,
        cevap: r`**a)** "Hava yağmurlu ise maç ertelenir."
**b)** $p$ yanlış, $q$ doğru: $0 \Rightarrow 1$ doğrudur. Koşul gerçekleşmediğinde önerme çürütülmüş olmaz.
**c)** "En az bir öğrenci hiç kitap okumadı." (∀ → ∃ ve sonuç değillenir)`,
        olcut: [[14, "Üç bölüm doğru ve gerekçeli"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t6", beceri: "Veriye dayalı karar verme", puan: 15,
        metin: r`İki otobüs firmasının 7 gündeki gecikmeleri (dakika):

- A firması: 2, 3, 3, 4, 4, 5, 28
- B firması: 6, 7, 7, 8, 8, 9, 10

**a)** Her firma için ortalama ve medyanı bulunuz.
**b)** Sınava yetişmeniz gereken bir gün hangi firmayı seçerdiniz? Hangi ölçüyü kullandığınızı gerekçelendiriniz.`,
        cevap: r`**a)** A: ortalama $49/7 = 7$, medyan 4. B: ortalama $55/7 \approx 7{,}9$, medyan 8.
**b)** A seçilebilir: medyan 4 dk, günlerin çoğunda gecikme azdır; ortalamayı tek bir aykırı değer (28) yükseltmiştir. Aykırı değer olduğu için medyan daha uygun bir ölçüdür. (B'yi daha az değişken olduğu için seçen ve bunu açıklık/dağılımla gerekçelendiren cevap da kabul edilir.)`,
        olcut: [[15, "Ortalama ve medyanlar doğru; seçim aykırı değer ya da dağılım ile gerekçelendirilmiş"], [10, "Ölçüler doğru, gerekçe zayıf"], [5, "Ölçülerden yarısı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t7", beceri: "Tümevarımsal akıl yürütme", puan: 15,
        metin: r`Bir sınıfta bir zar 60 kez atılıyor ve 6 sayısı 16 kez geliyor.

**a)** 6 gelme olasılığının deneysel ve teorik değerini yazınız.
**b)** Bir öğrenci "Zar hileli" diyor. Bu çıkarım için 60 atış yeterli midir? Daha güvenilir sonuç için ne önerirsiniz?`,
        cevap: r`**a)** Deneysel: $16/60 = 4/15 \approx 0{,}27$. Teorik: $1/6 \approx 0{,}17$.
**b)** Yeterli değildir; az sayıda denemede sapmalar olağandır. Atış sayısı artırılmalı (ör. 600 ya da daha fazla). Deneme sayısı arttıkça deneysel olasılık teorik olasılığa yaklaşır (büyük sayılar yasası).`,
        olcut: [[15, "İki olasılık ve deneme sayısının artması gerekçesi"], [10, "Olasılıklar doğru, yorum eksik"], [5, "Yalnız biri doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
