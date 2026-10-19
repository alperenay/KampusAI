/* 12. Sınıf Matematik — açık uçlu yazılı sınavları (örnek; 12. sınıf 2026–2027'de 2018 programıyla okutulur, sınav biçimi Maarif modeline uyarlanmıştır). */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["12/matematik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Üstel modelleme", puan: 14,
        metin: r`Bir bakteri kolonisi her 3 saatte bir ikiye katlanıyor; başlangıçta 500 bakteri var.

**a)** $t$ saat sonraki bakteri sayısını veren fonksiyonu yazınız.
**b)** 12 saat sonra kaç bakteri olur?
**c)** Bakteri sayısının 64 000'e ulaşması kaç saat sürer?`,
        cevap: r`**a)** $N(t) = 500 \cdot 2^{t/3}$.
**b)** $N(12) = 500 \cdot 2^4 = 8000$.
**c)** $500 \cdot 2^{t/3} = 64\,000 \Rightarrow 2^{t/3} = 128 = 2^7 \Rightarrow t = 21$ saat.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Logaritma", puan: 14,
        metin: r`Depremlerin büyüklüğü logaritmik ölçekle verilir: büyüklük 1 arttığında yer hareketinin genliği 10 kat artar.

**a)** 7,0 büyüklüğündeki bir depremin genliği 5,0 büyüklüğündekinin kaç katıdır?
**b)** $\log_2 32 + \log_3 \tfrac{1}{9} - \log 1000$ ifadesinin değerini bulunuz.
**c)** $\log_a (x \cdot y) = \log_a x + \log_a y$ özelliğinin üslü sayılarla nasıl ilişkili olduğunu açıklayınız.`,
        cevap: r`**a)** $10^{7-5} = 100$ kat.
**b)** $5 + (-2) - 3 = 0$.
**c)** $x = a^m$, $y = a^n$ ise $xy = a^{m+n}$; logaritma üssü verdiği için $\log_a(xy) = m + n = \log_a x + \log_a y$. Yani çarpmanın toplamaya dönüşmesi, üslerin toplanması kuralından gelir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Denklem çözme", puan: 14,
        metin: r`**a)** $3^{2x-1} = 27$ denklemini çözünüz.
**b)** $\log_2 (x - 1) + \log_2 (x + 1) = 3$ denklemini çözünüz; bulduğunuz köklerin tanım kümesini sağlayıp sağlamadığını kontrol ediniz.`,
        cevap: r`**a)** $3^{2x-1} = 3^3 \Rightarrow 2x - 1 = 3 \Rightarrow x = 2$.
**b)** $\log_2[(x-1)(x+1)] = 3 \Rightarrow x^2 - 1 = 8 \Rightarrow x = \pm 3$. Tanım için $x - 1 > 0$ ve $x + 1 > 0 \Rightarrow x > 1$. $x = -3$ sağlamaz; çözüm $x = 3$.`,
        olcut: [[14, "İki çözüm ve kök kontrolü"], [9, "b'de −3 elenmemiş ya da a hatalı"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Diziler", puan: 14,
        metin: r`Bir öğrenci kumbarasına ilk hafta 20 TL atıyor ve her hafta bir önceki haftadan 5 TL fazla atıyor.

**a)** 10. hafta kaç TL atar?
**b)** 10 hafta sonunda kumbarada toplam kaç TL olur?
**c)** Her hafta bir öncekinin 1,1 katını atsaydı bu hangi tür dizi olurdu? 2. ve 3. hafta tutarlarını yazınız.`,
        cevap: r`**a)** Aritmetik dizi: $a_{10} = 20 + 9 \cdot 5 = 65$ TL.
**b)** $S_{10} = \dfrac{10(20 + 65)}{2} = 425$ TL.
**c)** Geometrik dizi (ortak çarpan 1,1): 22 TL ve 24,2 TL.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Trigonometrik özdeşlik", puan: 14,
        metin: r`**a)** $\sin 75°$ değerini toplam formülüyle bulunuz.
**b)** $\sin x = \tfrac35$ ve $x$ dar açı ise $\sin 2x$ ve $\cos 2x$'i bulunuz.`,
        cevap: r`**a)** $\sin(45° + 30°) = \sin 45° \cos 30° + \cos 45° \sin 30° = \dfrac{\sqrt2}{2}\cdot\dfrac{\sqrt3}{2} + \dfrac{\sqrt2}{2}\cdot\dfrac12 = \dfrac{\sqrt6 + \sqrt2}{4}$.
**b)** $\cos x = \tfrac45$. $\sin 2x = 2 \cdot \tfrac35 \cdot \tfrac45 = \tfrac{24}{25}$. $\cos 2x = \cos^2 x - \sin^2 x = \tfrac{16}{25} - \tfrac{9}{25} = \tfrac{7}{25}$.`,
        olcut: [[14, "Üç değer doğru"], [9, "İki değer doğru"], [4, "Bir değer doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Trigonometrik denklem", puan: 15,
        metin: r`$2\sin x - 1 = 0$ denkleminin $[0, 2\pi)$ aralığındaki çözümlerini bulunuz ve birim çemberde gösteriniz. Denklemin tüm reel sayılardaki çözüm kümesini yazınız.`,
        cevap: r`$\sin x = \tfrac12 \Rightarrow x = \dfrac{\pi}{6}$ ya da $x = \dfrac{5\pi}{6}$ (birim çemberde $y = \tfrac12$ doğrusunun çemberi kestiği iki nokta: I. ve II. bölge).

Genel çözüm: $x = \dfrac{\pi}{6} + 2k\pi$ veya $x = \dfrac{5\pi}{6} + 2k\pi$, $k \in \mathbb{Z}$.`,
        olcut: [[15, "İki çözüm, gösterim ve genel çözüm"], [10, "İki çözüm ve genel çözüm"], [5, "Bir çözüm"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Dönüşümler", puan: 15,
        metin: r`$A(2, 3)$ noktası veriliyor.

**a)** $A$'nın $x$ eksenine göre yansımasını, orijin etrafında $90°$ (saat yönünün tersine) dönmesini ve $(-4, 1)$ vektörüyle ötelemesini bulunuz.
**b)** Bu dönüşümlerden hangileri şeklin uzunluklarını korur? Açıklayınız.`,
        cevap: r`**a)** Yansıma: $(2, -3)$. Dönme: $(x, y) \to (-y, x) = (-3, 2)$. Öteleme: $(2 - 4, 3 + 1) = (-2, 4)$.
**b)** Üçü de (yansıma, dönme, öteleme) uzaklığı koruyan **izometrilerdir**; şeklin boyutu ve biçimi değişmez. Ölçekleme (genişletme) ise uzunlukları değiştirir.`,
        olcut: [[15, "Üç görüntü ve izometri açıklaması"], [10, "İki görüntü ve açıklama"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Yazılı", sure: 40, sorular: [
      { tema: "u5", beceri: "Limit ve süreklilik", puan: 14,
        metin: r`$f(x) = \begin{cases} x^2 + 1, & x < 2 \\ ax - 1, & x \ge 2 \end{cases}$

**a)** $f$'nin $x = 2$'de sürekli olması için $a$ kaç olmalıdır?
**b)** Süreklilik için hangi üç koşulun sağlanması gerektiğini yazınız.`,
        cevap: r`**a)** Soldan limit $2^2 + 1 = 5$; $f(2) = 2a - 1$. $2a - 1 = 5 \Rightarrow a = 3$.
**b)** $f(2)$ tanımlı olmalı; $\lim_{x \to 2} f(x)$ var olmalı (sağdan ve soldan limitler eşit); limit $f(2)$'ye eşit olmalı.`,
        olcut: [[14, "a = 3 ve üç koşul"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Anlık değişim", puan: 14,
        metin: r`Bir aracın konumu $s(t) = t^3 - 6t^2 + 9t$ (metre, $t$ saniye).

**a)** Hız fonksiyonunu bulunuz.
**b)** Araç hangi anlarda durur?
**c)** $t = 4$ s'deki ivmeyi bulunuz.`,
        cevap: r`**a)** $v(t) = s'(t) = 3t^2 - 12t + 9$.
**b)** $3t^2 - 12t + 9 = 0 \Rightarrow t^2 - 4t + 3 = 0 \Rightarrow t = 1$ ve $t = 3$ s.
**c)** $a(t) = v'(t) = 6t - 12 \Rightarrow a(4) = 12\ \text{m/s}^2$.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Optimizasyon", puan: 14,
        metin: r`Kenarı 12 cm olan kare biçimli bir kartonun köşelerinden kenarı $x$ cm olan eş kareler kesilip kenarlar katlanarak üstü açık bir kutu yapılıyor.

**a)** Kutunun hacmini $x$'e bağlı yazınız.
**b)** Hacmi en büyük yapan $x$ değerini türevle bulunuz ve en büyük hacmi hesaplayınız.`,
        cevap: r`**a)** $V(x) = x(12 - 2x)^2$, $0 < x < 6$.
**b)** $V'(x) = (12 - 2x)^2 - 4x(12 - 2x) = (12 - 2x)(12 - 6x) = 0 \Rightarrow x = 2$ (x = 6 kutu oluşturmaz). $V(2) = 2 \cdot 8^2 = 128$ cm³. (İşaret tablosu: 2'den önce artan, sonra azalan.)`,
        olcut: [[14, "Model, x = 2 ve 128 cm³"], [9, "Model ve türev doğru, sonuç hatalı"], [4, "Yalnız model"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Grafik yorumlama", puan: 14,
        metin: r`$f(x) = x^3 - 3x$ fonksiyonu için:

**a)** Artan ve azalan olduğu aralıkları bulunuz.
**b)** Yerel maksimum ve minimum noktalarını yazınız.
**c)** Grafiğin kabaca çizimini anlatınız (eksenleri kestiği noktalarla).`,
        cevap: r`**a)** $f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm 1$. $(-\infty, -1)$ ve $(1, \infty)$'da artan; $(-1, 1)$'de azalan.
**b)** Yerel maksimum $(-1, 2)$; yerel minimum $(1, -2)$.
**c)** $x^3 - 3x = 0 \Rightarrow x = 0, \pm\sqrt3$. Grafik soldan aşağıdan gelir, $(-\sqrt3, 0)$'dan geçip $(-1, 2)$'de tepe yapar, orijinden geçip $(1, -2)$'de dibe iner, $(\sqrt3, 0)$'dan geçip yukarı gider (orijine göre simetrik).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Belirsiz integral", puan: 14,
        metin: r`**a)** $\int (3x^2 - 4x + 5)\,dx$ integralini hesaplayınız.
**b)** Bir arabanın hızı $v(t) = 2t + 3$ m/s ve $t = 0$'da konumu 10 m'dir. Konum fonksiyonunu bulunuz.
**c)** Belirsiz integralde neden "+C" yazılır? Açıklayınız.`,
        cevap: r`**a)** $x^3 - 2x^2 + 5x + C$.
**b)** $s(t) = \int (2t + 3)\,dt = t^2 + 3t + C$; $s(0) = 10 \Rightarrow C = 10 \Rightarrow s(t) = t^2 + 3t + 10$.
**c)** Sabitin türevi sıfır olduğundan türevi aynı olan sonsuz fonksiyon vardır; bu fonksiyonlar birbirinden bir sabit kadar farklıdır. C, başlangıç koşuluyla belirlenir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Alan hesabı", puan: 15,
        metin: r`$y = x^2$ eğrisi ile $y = 4$ doğrusu arasında kalan bölge veriliyor.

**a)** Bölgeyi tarif ediniz (kesişim noktaları).
**b)** Bölgenin alanını belirli integralle hesaplayınız.`,
        cevap: r`**a)** $x^2 = 4 \Rightarrow x = \pm 2$; bölge $x \in [-2, 2]$ arasında, üstte $y = 4$ doğrusu, altta parabol ile sınırlıdır.
**b)** $A = \int_{-2}^{2} (4 - x^2)\,dx = \left[4x - \dfrac{x^3}{3}\right]_{-2}^{2} = \left(8 - \dfrac83\right) - \left(-8 + \dfrac83\right) = 16 - \dfrac{16}{3} = \dfrac{32}{3}$ birimkare.`,
        olcut: [[15, "Kesişimler ve 32/3"], [10, "Kurulum doğru, işlem hatası"], [5, "Yalnız kesişimler"], [0, "Yanlış ya da boş"]] },
      { tema: "u7", beceri: "Analitik geometri", puan: 15,
        metin: r`$x^2 + y^2 - 6x + 4y - 12 = 0$ çemberi veriliyor.

**a)** Merkezini ve yarıçapını bulunuz.
**b)** $P(6, 2)$ noktasının çembere göre konumunu (iç, üzeri, dış) belirleyiniz.`,
        cevap: r`**a)** $(x - 3)^2 + (y + 2)^2 = 12 + 9 + 4 = 25$ ⇒ merkez $(3, -2)$, $r = 5$.
**b)** $|PM| = \sqrt{(6-3)^2 + (2+2)^2} = \sqrt{9 + 16} = 5 = r$ ⇒ $P$ çemberin üzerindedir.`,
        olcut: [[15, "Merkez, yarıçap ve konum"], [10, "Merkez-yarıçap doğru, konum hatalı"], [5, "Bir unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
