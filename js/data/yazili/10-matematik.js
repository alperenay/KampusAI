/* 10. Sınıf Matematik — Maarif Modeli açık uçlu yazılı sınavları (örnek). Temalar: t1 Geometrik Şekiller, t2 İstatistik, t3 Sayılar, t4 Nicelikler ve Değişimler */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["10/matematik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "t1", beceri: "Matematiksel modelleme", puan: 14,
        metin: r`Bir rampa yerle $30°$ açı yapıyor ve rampanın uzunluğu 8 m.

**a)** Rampanın en üst noktasının yerden yüksekliğini bulunuz.
**b)** Engelli erişimi için rampanın yerle yaptığı açının en fazla yaklaşık $5°$ olması önerilir. Aynı yüksekliğe çıkmak için yeni rampa kaç metre olmalıdır? ($\sin 5° \approx 0{,}087$) Sonucu yorumlayınız.`,
        cevap: r`**a)** $h = 8 \sin 30° = 8 \cdot \tfrac12 = 4$ m.
**b)** $L = h / \sin 5° \approx 4 / 0{,}087 \approx 46$ m. Açı küçüldükçe aynı yüksekliğe çıkmak için çok daha uzun rampa gerekir; bu yüzden rampalar genellikle zikzak (sahanlıklı) yapılır.`,
        olcut: [[14, "4 m, ≈46 m ve yorum"], [9, "İki hesap doğru, yorum yok"], [4, "Bir hesap doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t1", beceri: "Muhakeme", puan: 14,
        metin: r`$\sin x = \dfrac{3}{5}$ ve $x$ dar açı olsun.

**a)** $\cos x$ ve $\tan x$ değerlerini bulunuz.
**b)** $\sin^2 x + \cos^2 x = 1$ özdeşliğinin neden her açı için doğru olduğunu birim çemberle açıklayınız.`,
        cevap: r`**a)** Karşı 3, hipotenüs 5 ⇒ komşu 4. $\cos x = \tfrac45$, $\tan x = \tfrac34$.
**b)** Birim çemberde açının bitim noktası $(\cos x, \sin x)$'tir ve bu nokta merkeze 1 birim uzaklıktadır. Pisagor'dan $\cos^2 x + \sin^2 x = 1^2 = 1$.`,
        olcut: [[14, "İki oran ve birim çember açıklaması"], [9, "Oranlar doğru, açıklama eksik"], [4, "Bir oran doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t1", beceri: "Problem çözme", puan: 14,
        metin: r`Bir üçgen biçimli bahçenin iki kenarı 10 m ve 12 m, aralarındaki açı $60°$'dir.

**a)** Bahçenin alanını bulunuz.
**b)** Üçüncü kenarın uzunluğunu kosinüs teoremiyle hesaplayınız.`,
        cevap: r`**a)** $A = \tfrac12 \cdot 10 \cdot 12 \cdot \sin 60° = 60 \cdot \tfrac{\sqrt3}{2} = 30\sqrt3 \approx 52$ m².
**b)** $c^2 = 10^2 + 12^2 - 2 \cdot 10 \cdot 12 \cos 60° = 100 + 144 - 120 = 124 \Rightarrow c = \sqrt{124} = 2\sqrt{31} \approx 11{,}1$ m.`,
        olcut: [[14, "Alan ve üçüncü kenar doğru"], [9, "Biri doğru, diğerinde işlem hatası"], [4, "Formüller doğru kurulmuş"], [0, "Yanlış ya da boş"]] },
      { tema: "t1", beceri: "Çıkarım", puan: 14,
        metin: r`Bir üçgende $a = 7$, $A = 30°$ ve $B = 45°$ veriliyor.

**a)** Sinüs teoremiyle $b$ kenarını bulunuz.
**b)** Üçgenin çevrel çemberinin yarıçapını bulunuz.`,
        cevap: r`**a)** $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} \Rightarrow \dfrac{7}{1/2} = \dfrac{b}{\sqrt2/2} \Rightarrow b = 7\sqrt2 \approx 9{,}9$.
**b)** $\dfrac{a}{\sin A} = 2R \Rightarrow 14 = 2R \Rightarrow R = 7$.`,
        olcut: [[14, "b ve R doğru"], [9, "Biri doğru"], [4, "Teorem doğru yazılmış"], [0, "Yanlış ya da boş"]] },
      { tema: "t1", beceri: "Kavramsal anlama", puan: 14,
        metin: r`Bir üçgende **kenarortay**, **açıortay** ve **yükseklik** kavramlarını açıklayınız. Hangi tür üçgende üçü aynı doğru parçası olabilir? Gerekçelendiriniz.`,
        cevap: r`Kenarortay: köşeyi karşı kenarın orta noktasına birleştiren doğru parçası. Açıortay: açıyı iki eş parçaya ayıran doğru parçası. Yükseklik: köşeden karşı kenara (ya da uzantısına) dik inen doğru parçası.

İkizkenar üçgende tepe açısından inen kenarortay, açıortay ve yükseklik çakışır (eşkenar üçgende her köşede). Simetri ekseni üzerinde oldukları için.`,
        olcut: [[14, "Üç tanım ve ikizkenar gerekçesi"], [9, "Tanımlar doğru, gerekçe eksik"], [4, "Bir-iki tanım"], [0, "Yanlış ya da boş"]] },
      { tema: "t2", beceri: "Veriye dayalı karar", puan: 15,
        metin: r`Bir okulda 200 öğrenciye "Kahvaltı yapıyor musunuz?" sorusu soruluyor ve sınav başarısıyla birlikte inceleniyor:

| | Başarılı | Başarısız | Toplam |
|---|---|---|---|
| Kahvaltı yapan | 90 | 30 | 120 |
| Yapmayan | 40 | 40 | 80 |

**a)** Kahvaltı yapanların ve yapmayanların başarı yüzdesini bulunuz.
**b)** "Kahvaltı yapmak başarıyı artırır." sonucuna kesin olarak varılabilir mi? Gerekçelendiriniz.`,
        cevap: r`**a)** Yapanlar: $90/120 = \%75$. Yapmayanlar: $40/80 = \%50$.
**b)** Kesin varılamaz. Veriler bir **ilişki** gösterir ama **neden-sonuç** kanıtlamaz; uyku düzeni, aile desteği gibi başka değişkenler de etkili olabilir. Nedensellik için kontrollü deney gerekir.`,
        olcut: [[15, "İki yüzde ve ilişki-nedensellik ayrımı"], [10, "Yüzdeler doğru, gerekçe zayıf"], [5, "Bir yüzde doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t2", beceri: "İstatistiksel iletişim", puan: 15,
        metin: r`Önceki sorudaki verileri göstermek için hangi grafik türünü seçersiniz? Neden? Grafiği kısaca tarif ediniz (eksenler, gruplar).`,
        cevap: r`Gruplandırılmış (ya da yığılmış/yüzde) sütun grafiği uygundur; iki kategorik değişkeni (kahvaltı durumu × başarı) aynı anda karşılaştırmayı sağlar. Yatay eksende "kahvaltı yapan / yapmayan", her grupta "başarılı" ve "başarısız" sütunları; dikey eksende öğrenci sayısı ya da yüzde. Grup büyüklükleri farklı olduğu için yüzde (yığılmış %100) grafiği karşılaştırmayı daha adil yapar.`,
        olcut: [[15, "Uygun grafik, gerekçe ve tarif (yüzde vurgusu artı)"], [10, "Uygun grafik ve gerekçe"], [5, "Yalnız grafik adı"], [0, "Uygunsuz ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "t3", beceri: "Problem çözme", puan: 14,
        metin: r`İki otobüs aynı duraktan sabah 07.00'de birlikte kalkıyor. Biri 12 dakikada, diğeri 18 dakikada bir sefer yapıyor.

**a)** İkisi bu duraktan en erken saat kaçta tekrar birlikte kalkar?
**b)** Hangi kavramı kullandığınızı ve neden o kavram olduğunu açıklayınız.`,
        cevap: r`**a)** $\text{EKOK}(12, 18) = 36$ dk ⇒ 07.36.
**b)** Ortak kat (EKOK): birlikte kalkış zamanları hem 12'nin hem 18'in katı olan sürelerdir; en küçüğü aranır.`,
        olcut: [[14, "07.36 ve EKOK gerekçesi"], [9, "Sonuç doğru, gerekçe eksik"], [4, "EKOK doğru, saat hatalı"], [0, "Yanlış ya da boş"]] },
      { tema: "t3", beceri: "Muhakeme", puan: 14,
        metin: r`$360$ sayısı veriliyor.

**a)** Asal çarpanlarına ayırınız.
**b)** Pozitif bölen sayısını bulunuz ve yönteminizi açıklayınız.
**c)** 360 ile 84'ün EBOB'unu bulunuz.`,
        cevap: r`**a)** $360 = 2^3 \cdot 3^2 \cdot 5$.
**b)** Her asal çarpanın üssü 1 artırılıp çarpılır: $(3+1)(2+1)(1+1) = 24$. Çünkü her bölen, her asaldan 0'dan üssüne kadar seçilerek oluşturulur.
**c)** $84 = 2^2 \cdot 3 \cdot 7$; ortak asalların en küçük üsleri: $2^2 \cdot 3 = 12$.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t3", beceri: "Kural genelleme", puan: 14,
        metin: r`$\overline{4a7b}$ dört basamaklı sayısı hem 5'e hem 9'a tam bölünüyor.

$a$ ve $b$'nin alabileceği değerleri bulunuz; kullandığınız bölünebilme kurallarını yazınız.`,
        cevap: r`5'e bölünme: son basamak 0 ya da 5 ⇒ $b \in \{0, 5\}$.
9'a bölünme: rakamlar toplamı 9'un katı ⇒ $4 + a + 7 + b = 11 + a + b$.
- $b = 0$: $11 + a$ 9'un katı ⇒ $a = 7$ (18).
- $b = 5$: $16 + a$ 9'un katı ⇒ $a = 2$ (18).

Çözümler: $(a, b) = (7, 0)$ ve $(2, 5)$ ⇒ 4770 ve 4275.`,
        olcut: [[14, "İki çözüm ve kurallar"], [9, "Bir çözüm ve kurallar"], [4, "Kurallar doğru, çözüm yok"], [0, "Yanlış ya da boş"]] },
      { tema: "t4", beceri: "Modelleme", puan: 14,
        metin: r`Bir top yerden atılıyor; yüksekliği $h(t) = -5t^2 + 20t$ (metre, $t$ saniye).

**a)** Top en çok kaç metreye çıkar? Kaçıncı saniyede?
**b)** Top kaç saniye sonra yere düşer?
**c)** Grafiğin şeklini ve neden aşağı açıldığını yorumlayınız.`,
        cevap: r`**a)** Tepe noktası $t = -\dfrac{b}{2a} = -\dfrac{20}{-10} = 2$ s; $h(2) = -20 + 40 = 20$ m.
**b)** $-5t^2 + 20t = 0 \Rightarrow t(20 - 5t) = 0 \Rightarrow t = 4$ s.
**c)** Parabol; baş katsayı negatif ($-5$) olduğu için kollar aşağı açılır; yükseklik önce artar sonra azalır (yer çekimi).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t4", beceri: "Analojik akıl yürütme", puan: 14,
        metin: r`$f(x) = (x - 2)^2 - 9$ fonksiyonu veriliyor.

**a)** Grafiği $y = x^2$'den hangi ötelemelerle elde edilir?
**b)** Tepe noktasını ve $x$ eksenini kestiği noktaları bulunuz.
**c)** $f(x) < 0$ olan $x$ değerlerini yazınız.`,
        cevap: r`**a)** 2 birim sağa, 9 birim aşağı.
**b)** Tepe $(2, -9)$. $(x - 2)^2 = 9 \Rightarrow x - 2 = \pm 3 \Rightarrow x = -1$ ve $x = 5$.
**c)** Kollar yukarı, kökler arasında negatif: $-1 < x < 5$.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "t4", beceri: "Tanım kümesi muhakemesi", puan: 15,
        metin: r`$g(x) = \sqrt{x - 3}$ ve $k(x) = \dfrac{1}{x - 3}$ fonksiyonları veriliyor.

**a)** Her birinin en geniş tanım kümesini bulunuz.
**b)** İki fonksiyonun grafiklerinin $x = 3$ civarındaki davranışlarını karşılaştırınız.`,
        cevap: r`**a)** $g$: $x - 3 \ge 0 \Rightarrow [3, \infty)$. $k$: $x \ne 3 \Rightarrow \mathbb{R} \setminus \{3\}$.
**b)** $g$ grafiği $(3, 0)$ noktasından başlar ve yavaşça artar. $k$ grafiğinde $x = 3$ düşey asimptottur: 3'e sağdan yaklaşınca $+\infty$'a, soldan yaklaşınca $-\infty$'a gider; grafik bu doğruyu hiç kesmez.`,
        olcut: [[15, "İki tanım kümesi ve davranış karşılaştırması"], [10, "Tanım kümeleri doğru, karşılaştırma eksik"], [5, "Bir tanım kümesi"], [0, "Yanlış ya da boş"]] },
      { tema: "t4", beceri: "Problem çözme", puan: 15,
        metin: r`Bir çiftçi 40 m tel ile bir duvarın önünde dikdörtgen bir alanı çevirecek; duvar tarafına tel çekilmeyecek.

**a)** Duvara dik kenar $x$ ise alanı $x$'e bağlı yazınız.
**b)** Alanı en büyük yapan $x$ değerini ve en büyük alanı bulunuz.`,
        cevap: r`**a)** Duvara paralel kenar $40 - 2x$: $A(x) = x(40 - 2x) = -2x^2 + 40x$.
**b)** Tepe $x = -\dfrac{40}{2 \cdot (-2)} = 10$ m; $A(10) = 10 \cdot 20 = 200$ m².`,
        olcut: [[15, "Model, x = 10 ve 200 m²"], [10, "Model doğru, tepe noktasında hata"], [5, "Yalnız model doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
