# -*- coding: utf-8 -*-
r"""10. Sınıf Matematik — 1.36.0: Maarif programına (MAT.10.1–MAT.10.7) göre tamamlama.
Eksik öğrenme çıktıları: MAT.10.2.2, MAT.10.4.1, MAT.10.4.6 ve 5–7. temalar (sayma ve algoritma, analitik inceleme,
koşullu olasılık ve Bayes). Kaynak: tymm.meb.gov.tr Matematik Dersi 10. Sınıf tema sayfaları."""
from common import O, U

KOD = {
    "t1/k1": "MAT.10.1.1", "t1/k2": "MAT.10.1.2", "t1/k3": "MAT.10.1.3", "t1/k4": "MAT.10.1.4",
    "t1/k5": "MAT.10.1.Ek",
    "t2/k1": "MAT.10.2.1", "t2/k2": "MAT.10.2.1", "t2/k3": "MAT.10.2.1",
    "t3/k1": "MAT.10.3.1–2", "t3/k2": "MAT.10.3.3", "t3/k3": "MAT.10.3.Ek", "t3/k4": "MAT.10.3.3",
    "t4/k1": "MAT.10.4.2", "t4/k2": "MAT.10.4.3–4", "t4/k3": "MAT.10.4.6", "t4/k4": "MAT.10.4.6", "t4/k5": "MAT.10.4.5",
}

ANLATIM = {
"t1/k3": r"""
# Bir Kenar ve Yükseklik Değişince Alan Nasıl Değişir?
Alan formülü $A = \dfrac{a\cdot h_a}{2}$ olduğundan alan, taban ve yükseklikle **doğru orantılıdır**:

| Değişim | Yeni alan |
|---|---|
| Taban $k$ katına çıkar, yükseklik aynı | $k \cdot A$ |
| Yükseklik $k$ katına çıkar, taban aynı | $k \cdot A$ |
| Taban ve yükseklik birlikte $k$ katına çıkar | $k^2 \cdot A$ |
| Taban $k$ katına çıkar, yükseklik $\frac1k$ katına iner | $A$ (değişmez) |

- **Benzer üçgenlerde** benzerlik oranı $k$ ise alanlar oranı $k^2$'dir.
- Tepe noktası tabana **paralel bir doğru üzerinde** hareket eden üçgenlerin yüksekliği değişmediği için alanları **eşittir**.
""",
}

ORNEK = {
"t1/k3": [(r"Tabanı 10 cm, yüksekliği 6 cm olan bir üçgenin tabanı %20 artırılıp yüksekliği %20 azaltılırsa alan nasıl değişir?",
           r"Yeni alan $= \dfrac{(1{,}2\cdot 10)(0{,}8\cdot 6)}{2} = \dfrac{12\cdot 4{,}8}{2} = 28{,}8$ cm². İlk alan $30$ cm² idi; alan $1{,}2\cdot 0{,}8 = 0{,}96$ katına iner, yani **%4 azalır**.")],
}

OZET = {
"t1/k3": ["Taban ve yükseklik birlikte k katına çıkarsa alan k² katına çıkar."],
}

EK = {
"t2": [
O("k4", "MAT.10.2.2", "Başkalarının iki kategorik değişkenli veri yorumlarını tartışma",
  "Discussing others' conclusions about two-categorical-variable data", r"""
# Başkalarının Yorumlarını Eleştirel Değerlendirme
Haberlerde, reklamlarda ve sosyal medyada **iki kategorik değişken** arasındaki ilişkiye dayanan pek çok iddia görürüz: *"Kahvaltı yapan öğrencilerin başarısı daha yüksek."* Bu iddiaları **istatistiksel gerekçeyle kabul ya da reddetmek** gerekir.

# Kontrol Listesi
1. **Veri nasıl toplandı?** Örneklem **yeterince büyük** ve **temsil edici** mi? (Sadece bir okulun öğrencileri tüm Türkiye'yi temsil etmez.)
2. **Doğru oranlar mı karşılaştırılıyor?** Ham sayılar değil, **satır ya da sütun yüzdeleri** (koşullu göreli sıklıklar) karşılaştırılmalıdır.
3. **Grafik yanıltıcı mı?** Eksenin sıfırdan başlamaması, farklı ölçekler, 3B pasta grafikler farkları büyütebilir.
4. **İlişki = neden mi?** İki değişken birlikte değişse de biri diğerinin **nedeni olmayabilir**; üçüncü bir değişken (ör. aile geliri, uyku düzeni) ikisini birden etkileyebilir.
5. **Genelleme sınırı aşılıyor mu?** Sonuç yalnızca verinin toplandığı **bağlam** için geçerlidir.

# Yaygın Hatalar ve Yanlılıklar
| Hata | Açıklama |
|---|---|
| **Ham sayı yanılgısı** | Grup büyüklükleri farklıyken sayıları karşılaştırmak |
| **Seçim yanlılığı** | Yalnızca gönüllülerden ya da belirli bir gruptan veri almak |
| **Nedensellik yanılgısı** | Birliktelikten neden–sonuç çıkarmak |
| **Simpson paradoksu** | Alt gruplarda görülen eğilimin gruplar birleştirilince **tersine dönmesi** |
| **Yanlış ölçek** | Sütun grafikte eksenin kırpılmasıyla farkın abartılması |

# Kabul mü, Ret mi?
Bir yorumu **kabul ederken** hangi oranların onu desteklediğini, **reddederken** hangi hatayı içerdiğini **verilerle** gösteririz. Gerekirse tabloyu yeniden düzenleyip doğru oranları hesaplarız.
""",
  [(r"Bir anket şirketi: “Okul kantininden alışveriş yapan 300 öğrenciden 180'i, yapmayan 100 öğrenciden 40'ı spor yapıyor. Demek ki kantin alışverişi spor yapmayı artırıyor.” diyor. Bu yorumu değerlendiriniz.",
    r"Koşullu oranlar: kantin kullananlarda $\frac{180}{300} = \%60$, kullanmayanlarda $\frac{40}{100} = \%40$. Oranlar arasında bir **ilişki** var; ancak bu **nedensellik** göstermez. Örneğin spor yapan öğrenciler okulda daha uzun kaldıkları için kantini daha çok kullanıyor olabilir. Yorum, *“artırıyor”* ifadesi nedeniyle **reddedilir**."),
   (r"Bir haberde iki ilçedeki “kitap okuyan öğrenci sayısı” karşılaştırılıyor: A ilçesinde 900, B ilçesinde 600 öğrenci kitap okuyor ve “A ilçesindeki öğrenciler daha çok kitap okuyor” deniyor. A'da 3000, B'de 1200 öğrenci varsa yorum doğru mudur?",
    r"Ham sayılar yanıltıcıdır. Oranlar: A'da $\frac{900}{3000} = \%30$, B'de $\frac{600}{1200} = \%50$. Kitap okuyan öğrenci **oranı B ilçesinde daha yüksektir**; yorum **ham sayı yanılgısı** içerdiği için reddedilir.")],
  ["Başkalarının yorumları satır/sütun yüzdeleriyle (koşullu oranlarla) kontrol edilir.", "Örneklem büyüklüğü, temsil ediciliği ve grafik ölçeği sorgulanır.", "İki değişken arasındaki ilişki, birinin diğerine neden olduğunu göstermez.", "Yorum, gerekçesi verilerle gösterilerek kabul ya da reddedilir."]),
],
"t4": [
O("k6", "MAT.10.4.1", "Fonksiyon olma koşulları ve fonksiyonların nitel özellikleri",
  "Conditions for being a function and qualitative properties of functions", r"""
# Bağıntı Ne Zaman Fonksiyondur?
$A$'dan $B$'ye bir bağıntının **fonksiyon** olması için:
1. $A$'daki (tanım kümesi) **her eleman** eşlenmelidir — **açıkta eleman kalmamalı**.
2. Her eleman **yalnız bir** elemanla eşlenmelidir.

**Düşey doğru testi:** Grafiği verilen bir bağıntıda tanım kümesindeki her $x$ için çizilen düşey doğru grafiği **yalnız bir noktada** kesiyorsa bağıntı fonksiyondur. Örneğin $x^2 + y^2 = 1$ çemberi fonksiyon **değildir**.

# Nitel Özellikler
| Özellik | Grafikte nasıl görülür? |
|---|---|
| **Tanım kümesi** | Grafiğin $x$ ekseni üzerindeki izdüşümü |
| **Görüntü kümesi** | Grafiğin $y$ ekseni üzerindeki izdüşümü |
| **Sıfırlar (kökler)** | Grafiğin $x$ eksenini kestiği noktalar |
| **İşaret** | $x$ ekseninin üstü: $f(x)>0$; altı: $f(x)<0$ |
| **Artan / azalan** | Soldan sağa yükselen / alçalan aralıklar |
| **Maksimum / minimum** | En yüksek / en alçak noktalar (yerel ve mutlak) |
| **Bire bir** | Yatay doğru testi: her yatay doğru grafiği en çok bir noktada keser |
| **Örten** | Görüntü kümesi değer kümesine eşittir |
| **Tek / çift** | Çift: $f(-x)=f(x)$, $y$ eksenine göre simetrik; tek: $f(-x)=-f(x)$, orijine göre simetrik |

# Farklı Gösterimler
Bir fonksiyon **sözel**, **tablo**, **cebirsel** (formül) ve **grafik** gösterimle ifade edilebilir. Cebirsel gösterim kesin değer hesaplamayı; grafik gösterim artan–azalan aralıkları, sıfırları ve ekstremumları **bir bakışta** görmeyi sağlar.
""",
  [(r"$f(x) = x^3 - 4x$ fonksiyonu tek mi, çift mi? Sıfırlarını bulunuz.",
    r"$f(-x) = (-x)^3 - 4(-x) = -x^3 + 4x = -f(x)$ olduğundan **tek** fonksiyondur (orijine göre simetrik). Sıfırlar: $x(x^2-4) = 0 \Rightarrow x \in \{-2, 0, 2\}$."),
   (r"$f:\mathbb{R}\to\mathbb{R}$, $f(x) = x^2$ fonksiyonu bire bir ve örten midir? Nasıl kısıtlanırsa bire bir ve örten olur?",
    r"$f(-2) = f(2) = 4$ olduğundan **bire bir değildir**; negatif sayılar görüntü olmadığından **örten değildir**. Tanım kümesi $[0, \infty)$, değer kümesi $[0, \infty)$ alınırsa $f$ **bire bir ve örten** olur (bu yüzden tersi $\sqrt{x}$ tanımlanabilir).")],
  ["Fonksiyon: tanım kümesindeki her eleman yalnız bir elemanla eşlenir (düşey doğru testi).", "Nitel özellikler: tanım–görüntü kümesi, sıfırlar, işaret, artan–azalan, ekstremum, bire bir, örten, tek–çift.", "Bire birlik yatay doğru testiyle; tek–çiftlik f(−x) ile kontrol edilir.", "Sözel, tablo, cebirsel ve grafik gösterimler birbirini tamamlar."]),
O("k7", "MAT.10.4.6", "Fonksiyonlarla ifade edilen denklem ve eşitsizlik problemleri",
  "Equation and inequality problems expressed with functions", r"""
# Denklem = İki Grafiğin Kesişimi
$f(x) = g(x)$ denkleminin çözümleri, $y=f(x)$ ve $y=g(x)$ grafiklerinin **kesişim noktalarının apsisleridir**. $f(x) > g(x)$ eşitsizliğinin çözümü ise $f$ grafiğinin $g$ grafiğinin **üstünde** kaldığı $x$ değerleridir.

# İkinci Dereceden Eşitsizlikler (İşaret Tablosu)
$ax^2 + bx + c$ ifadesinin işareti kökler dışında $a$ ile **aynı**, kökler arasında $a$ ile **ters**tir.
1. Kökleri bul ($\Delta$ ile ya da çarpanlara ayırarak).
2. Kökleri sayı doğrusuna yerleştir; en sağdan $a$'nın işaretiyle başlayıp çift katlı olmayan kökte işaret değiştir.
3. İstenen işaretli aralıkları seç.

# Karekök ve Rasyonel Denklemler
- $\sqrt{f(x)} = g(x)$: Önce **tanım koşulu** $f(x)\ge 0$ ve $g(x) \ge 0$; sonra kare alınır. Kare alma **yabancı kök** üretebilir, sonuç mutlaka **denetlenir**.
- $\dfrac{p(x)}{q(x)} = 0 \iff p(x) = 0$ ve $q(x) \ne 0$.
- $\dfrac{p(x)}{q(x)} \ge 0$ türü eşitsizliklerde payın ve paydanın kökleri birlikte işaret tablosuna yazılır; paydanın kökleri **asla** çözüme dahil edilmez.

# Problem Çözme Adımları
1. Problemdeki nicelikleri değişkenlerle **modelle** (ör. kâr = gelir − maliyet).
2. Uygun **gösterimi** seç: grafik, tablo ya da cebir.
3. Çözümü bul ve **bağlama göre yorumla** (negatif uzunluk, kesirli kişi sayısı gibi anlamsız değerler atılır).
4. Sonucu **başka bir yolla** (grafik ↔ cebir) doğrula.
""",
  [(r"$x^2 - x - 6 < 0$ eşitsizliğinin çözüm kümesini bulunuz.",
    r"$x^2 - x - 6 = (x-3)(x+2)$; kökler $-2$ ve $3$. $a = 1 > 0$ olduğundan ifade kökler **arasında negatiftir**. Çözüm kümesi: $(-2, 3)$."),
   (r"$\sqrt{x + 6} = x$ denklemini çözünüz.",
    r"Koşullar: $x + 6 \ge 0$ ve $x \ge 0$. Kare alınırsa $x + 6 = x^2 \Rightarrow x^2 - x - 6 = 0 \Rightarrow x = 3$ ya da $x = -2$. $x = -2$, $x \ge 0$ koşulunu sağlamadığı için **yabancı köktür**. Çözüm: $x = 3$ (denetim: $\sqrt9 = 3$ ✓)."),
   (r"Bir firma $x$ adet ürün sattığında kârı $K(x) = -x^2 + 40x - 300$ (bin TL) oluyor. Firma hangi satış aralığında kâr eder?",
    r"$K(x) > 0 \iff x^2 - 40x + 300 < 0 \iff (x-10)(x-30) < 0 \iff 10 < x < 30$. Firma **11 ile 29 adet** arasında satış yaptığında kâr eder; en büyük kâr tepe noktasında, $x = 20$ adette $K(20) = 100$ bin TL'dir.")],
  ["f(x) = g(x) denkleminin çözümleri grafiklerin kesişim noktalarının apsisleridir.", "İkinci dereceden ifade kökler dışında a ile aynı, kökler arasında ters işaretlidir.", "Karekök denklemlerinde kare almadan önce tanım koşulu yazılır, yabancı kökler denetlenir.", "Rasyonel eşitsizliklerde paydanın kökleri çözüme alınmaz."]),
],
}

YENI = [
U("t5", "5. Tema: Sayma, Algoritma ve Bilişim", "Theme 5: Counting, Algorithms and Informatics", [
O("k1", "MAT.10.5.1", "Sayma stratejileriyle problem çözme: toplama–çarpma yolu, permütasyon, kombinasyon",
  "Solving problems with counting strategies: sum and product rules, permutations, combinations", r"""
# Sayma Problemine Nasıl Başlanır?
1. **Neyi sayıyoruz?** (şifre, sıralama, ekip, yol…)
2. **Sıra önemli mi?** Önemliyse *sıralama (permütasyon)*, değilse *seçme (kombinasyon)*.
3. **Tekrar var mı?** Aynı eleman birden fazla kullanılabiliyor mu?
4. Gerekirse problemi **ağaç şeması, tablo ya da kutu (yuva) modeli** ile görselleştir.

# Temel İlkeler
- **Toplama yolu:** Ayrık durumlardan biri seçilecekse durum sayıları **toplanır** ($m$ yol **veya** $n$ yol → $m+n$).
- **Çarpma yolu:** Ardışık ve bağımsız adımlar yapılacaksa **çarpılır** ($m$ yol **ve** $n$ yol → $m\cdot n$).

# Faktöriyel
$$n! = n\cdot(n-1)\cdots 2\cdot 1, \qquad 0! = 1$$
$n$ farklı nesne bir sıraya $n!$ farklı biçimde dizilir.

# Sıralama (Permütasyon)
$n$ farklı nesneden $r$ tanesinin **sıralı** dizilişleri:
$$P(n,r) = \frac{n!}{(n-r)!}$$
- **Tekrarlı elemanlı** sıralama: $n$ nesnede $n_1, n_2, \dots$ tane özdeş varsa $\dfrac{n!}{n_1!\,n_2!\cdots}$
- **Dairesel** sıralama: $n$ farklı nesne bir daire etrafına $(n-1)!$ biçimde dizilir.

# Seçme (Kombinasyon)
$n$ farklı nesneden **sırasız** $r$ tanesinin seçilmesi:
$$C(n,r) = \binom{n}{r} = \frac{n!}{r!\,(n-r)!}$$
Özellikler: $\binom{n}{r} = \binom{n}{n-r}$, $\binom{n}{0} = \binom{n}{n} = 1$, $\binom{n}{1} = n$.

# Strateji Seçimi
| Durum | Strateji |
|---|---|
| "En az bir" | **Tümleme:** Tüm durumlar $-$ hiç olmayan durumlar |
| "Yan yana olsun" | Birlikte olacakları **tek blok** say, sonra blok içini sırala |
| "Yan yana olmasın" | Tüm durumlar $-$ yan yana olanlar |
| Ekip/komite | Kombinasyon; koşullu gruplar ayrı ayrı seçilip çarpılır |
""",
  [(r"5 kız ve 4 erkek öğrenci arasından 2 kız ve 2 erkekten oluşan 4 kişilik bir ekip kaç farklı şekilde seçilebilir?",
    r"Sıra önemli değil → kombinasyon. Kızlar $\binom52 = 10$, erkekler $\binom42 = 6$; çarpma yolu ile $10 \cdot 6 = 60$ farklı ekip."),
   (r"KALEM kelimesinin harfleri yer değiştirilerek anlamlı ya da anlamsız 5 harfli kaç kelime yazılabilir? Bunların kaçında A ile E yan yanadır?",
    r"5 farklı harf: $5! = 120$ kelime. A ile E'yi tek blok sayarsak 4 nesne: $4! = 24$; blok içi $2! = 2$. Yan yana olanlar $24\cdot 2 = 48$."),
   (r"Rakamları farklı, 4 basamaklı kaç tane çift doğal sayı yazılabilir?",
    r"**Durumlara ayır** (0'ın birler basamağında olup olmamasına göre). Birler basamağı 0 ise: kalan 3 basamak $9\cdot8\cdot7 = 504$. Birler basamağı 2, 4, 6 ya da 8 ise (4 yol): binler basamağı 0 olamaz ve birlerdekinden farklı → 8 yol, sonra $8 \cdot 7$: $4\cdot 8\cdot 8\cdot 7 = 1792$. Toplam: $504 + 1792 = 2296$.")],
  ["Sıra önemliyse permütasyon P(n,r) = n!/(n−r)!, önemli değilse kombinasyon C(n,r) = n!/(r!(n−r)!).", "Ayrık durumlar toplanır, ardışık adımlar çarpılır.", "“En az bir” sorularında tümleme; “yan yana” sorularında blok yöntemi kullanılır.", "Özdeş elemanlı sıralamada n! özdeşlerin faktöriyellerine bölünür; dairesel sıralama (n−1)!'dir."]),
O("k2", "MAT.10.5.2", "Cebirsel ve fonksiyonel işlemlerin algoritmik yapısı",
  "Algorithmic structure of algebraic and functional operations", r"""
# Algoritma Nedir?
**Algoritma**, bir problemi çözmek için izlenen **sonlu, sıralı ve açık** adımlar dizisidir. Her adım kesin olmalı, belirli bir **girdi** ile başlayıp belirli bir **çıktı** ile bitmelidir.

# Temel Yapılar
| Yapı | Anlamı | Örnek |
|---|---|---|
| **Sıralı (ardışık)** | Adımlar sırayla yapılır | Oku $x$ → $y = 2x+1$ hesapla → yaz $y$ |
| **Karar (koşul)** | Bir koşula göre farklı yol izlenir | **Eğer** $\Delta < 0$ **ise** "reel kök yok" yaz |
| **Döngü (tekrar)** | Bir koşul sağlanana kadar adımlar tekrarlanır | $i = 1$'den $n$'ye kadar topla |

Algoritmalar **sözde kod** (adım adım yazı) ya da **akış şeması** ile gösterilir: oval = başla/bitir, paralelkenar = girdi/çıktı, dikdörtgen = işlem, eşkenar dörtgen = karar.

# Cebirsel İşlemlerin Algoritması: İkinci Dereceden Denklem
```
1. Başla; a, b, c değerlerini oku (a ≠ 0)
2. D ← b·b − 4·a·c
3. Eğer D < 0 ise "Reel kök yok" yaz, 6'ya git
4. Eğer D = 0 ise x ← −b / (2a) yaz "çakışık kök", 6'ya git
5. x1 ← (−b − √D)/(2a); x2 ← (−b + √D)/(2a); x1, x2 yaz
6. Bitir
```

# Fonksiyonel İşlemlerin Algoritması
- **Fonksiyon değeri:** Bir fonksiyon, girdi alıp çıktı üreten bir **alt algoritma** gibidir: `f(x): döndür 3·x − 2`.
- **Bileşke:** $(f\circ g)(x)$ hesaplanırken önce `g` çalıştırılır, çıktısı `f`'ye girdi olur.
- **Faktöriyel (döngü):** `s ← 1; i = 1'den n'ye kadar: s ← s·i`.
- **Özyineleme:** $n! = n\cdot(n-1)!$; $0! = 1$ durma koşuludur.

# Bilişimle Bağlantı
Hesap makineleri, elektronik tablolar ve programlama dilleri bu yapıları kullanır. Bir algoritmayı **test etmek** için farklı girdilerle (sınır durumları dahil: $a = 0$, $\Delta = 0$) adım adım **iz sürme** yapılır.
""",
  [(r"Girilen bir $n$ doğal sayısı için $1 + 2 + \dots + n$ toplamını hesaplayan bir algoritma yazınız. $n = 5$ için iz sürünüz.",
    r"""```
1. Oku n
2. t ← 0, i ← 1
3. i ≤ n olduğu sürece: t ← t + i; i ← i + 1
4. Yaz t
```

İz: $i=1, t=1$; $i=2, t=3$; $i=3, t=6$; $i=4, t=10$; $i=5, t=15$ → çıktı **15**. Kontrol: $\frac{n(n+1)}{2} = \frac{5\cdot6}{2} = 15$ ✓"""),
   (r"Aşağıdaki algoritmanın $x = -3$ ve $x = 4$ girdileri için çıktılarını bulunuz; algoritma hangi fonksiyonu hesaplar? `1. Oku x  2. Eğer x < 0 ise y ← −x değilse y ← x  3. Yaz y`",
    r"$x = -3 \Rightarrow y = 3$; $x = 4 \Rightarrow y = 4$. Algoritma **mutlak değer fonksiyonunu** $f(x) = \lvert x \rvert$ hesaplar: karar yapısı, parçalı tanımlı fonksiyonun iki parçasına karşılık gelir.")],
  ["Algoritma: sonlu, sıralı ve açık adımlar; girdi → işlem → çıktı.", "Üç temel yapı: sıralı, karar (eğer–ise), döngü (tekrar).", "Parçalı fonksiyonlar karar yapısıyla, toplam ve faktöriyel döngüyle ifade edilir.", "Algoritma farklı ve sınır girdilerle iz sürülerek test edilir."]),
]),
U("t6", "6. Tema: Analitik İnceleme", "Theme 6: Analytical Examination", [
O("k1", "MAT.10.6.1", "İki nokta arasındaki uzaklık ve doğru parçasını belli oranda bölen nokta",
  "Distance between two points and the point dividing a segment in a given ratio", r"""
# Dik Koordinat Sisteminde Uzaklık
$A(x_1, y_1)$ ve $B(x_2, y_2)$ noktaları arasındaki uzaklık, yatay ve düşey farklarla oluşan **dik üçgende Pisagor bağıntısından** elde edilir:
$$\lvert AB \rvert = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$
- Noktalar aynı yatay doğrudaysa uzaklık $\lvert x_2 - x_1 \rvert$, aynı düşey doğrudaysa $\lvert y_2 - y_1 \rvert$ olur.
- Orijine uzaklık: $\sqrt{x^2 + y^2}$.

# Orta Nokta
$[AB]$'nin orta noktası:
$$M\left(\frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2}\right)$$

# Belli Oranda Bölen Nokta
$C$ noktası $[AB]$'yi $\dfrac{\lvert AC \rvert}{\lvert CB \rvert} = \dfrac{m}{n}$ oranında **içten** bölüyorsa:
$$C\left(\frac{n\,x_1 + m\,x_2}{m+n},\ \frac{n\,y_1 + m\,y_2}{m+n}\right)$$
**Dikkat:** Koordinatlarda $A$'ya $n$, $B$'ye $m$ ağırlığı verilir — $C$, **daha büyük ağırlıklı** uca yakındır.

# Üçgenin Ağırlık Merkezi
Köşeleri $A, B, C$ olan üçgenin ağırlık merkezi (kenarortayları $2:1$ oranında böler):
$$G\left(\frac{x_1+x_2+x_3}{3},\ \frac{y_1+y_2+y_3}{3}\right)$$

# Gerçek Hayatta
Haritada iki şehir arasındaki kuş uçuşu uzaklık, bir dronun konumu, iki istasyon arasında belli oranda kurulacak bir aktarma noktası bu bağıntılarla hesaplanır.
""",
  [(r"$A(1, 2)$ ve $B(7, 10)$ noktaları arasındaki uzaklığı ve $[AB]$'nin orta noktasını bulunuz.",
    r"$\lvert AB \rvert = \sqrt{(7-1)^2 + (10-2)^2} = \sqrt{36 + 64} = 10$ birim. Orta nokta $M\left(\frac{1+7}{2}, \frac{2+10}{2}\right) = (4, 6)$."),
   (r"$A(-2, 1)$ ve $B(8, 6)$ veriliyor. $[AB]$ üzerinde $\lvert AC \rvert : \lvert CB \rvert = 2 : 3$ olacak biçimde alınan $C$ noktasının koordinatları nedir?",
    r"$m = 2$, $n = 3$: $x_C = \dfrac{3\cdot(-2) + 2\cdot 8}{5} = \dfrac{10}{5} = 2$, $y_C = \dfrac{3\cdot 1 + 2\cdot 6}{5} = 3$. $C(2, 3)$; $C$, $A$'ya daha yakındır ($\frac25$ yol)."),
   (r"Bir haritada okul $O(0,0)$, kütüphane $K(6,8)$ noktasındadır (1 birim = 100 m). Okuldan kütüphaneye giden bir öğrenci yolun $\frac14$'ünü yürüdüğünde hangi noktadadır ve kaç metre yürümüştür?",
    r"$\lvert OK \rvert = \sqrt{36+64} = 10$ birim $= 1000$ m. Yolun $\frac14$'ü: oran $1:3$ → $P\left(\frac{3\cdot0 + 1\cdot6}{4}, \frac{3\cdot0+1\cdot8}{4}\right) = (1{,}5;\ 2)$. Yürünen yol $250$ m.")],
  ["İki nokta arası uzaklık: √((x₂−x₁)² + (y₂−y₁)²) — Pisagor bağıntısından gelir.", "Orta nokta koordinatları uç noktaların ortalamasıdır.", "m:n oranında içten bölen nokta: ((n·x₁ + m·x₂)/(m+n), (n·y₁ + m·y₂)/(m+n)).", "Ağırlık merkezi üç köşe koordinatının ortalamasıdır."]),
O("k2", "MAT.10.6.2", "Doğrunun eğim açısı, eğimi, denklemi ve iki doğrunun durumu",
  "Inclination angle, slope and equation of a line; relative positions of two lines", r"""
# Eğim Açısı ve Eğim
Bir doğrunun $x$ ekseninin **pozitif yönüyle** yaptığı açıya **eğim açısı** ($\alpha$, $0^\circ \le \alpha < 180^\circ$), bu açının tanjantına **eğim** denir:
$$m = \tan\alpha = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{düşey değişim}}{\text{yatay değişim}}$$
| Eğim açısı | Eğim | Doğru |
|---|---|---|
| $0^\circ$ | $m = 0$ | Yatay ($y = b$) |
| $0^\circ < \alpha < 90^\circ$ | $m > 0$ | Artan (sağa yatık) |
| $90^\circ$ | tanımsız | Düşey ($x = a$) |
| $90^\circ < \alpha < 180^\circ$ | $m < 0$ | Azalan (sola yatık) |

# Doğru Denklemleri
- **Eğim–kesen biçimi:** $y = mx + n$ ($n$: $y$ eksenini kestiği nokta)
- **Bir noktası ve eğimi bilinen:** $y - y_1 = m(x - x_1)$
- **İki noktası bilinen:** önce $m$ bulunur, sonra yukarıdaki biçim kullanılır.
- **Genel biçim:** $ax + by + c = 0$ → $m = -\dfrac{a}{b}$
- **Eksenleri kestiği noktalar** $(a, 0)$ ve $(0, b)$ ise: $\dfrac{x}{a} + \dfrac{y}{b} = 1$

# İki Doğrunun Birbirine Göre Durumu
$d_1: y = m_1x + n_1$ ve $d_2: y = m_2x + n_2$ için:
| Durum | Koşul |
|---|---|
| **Paralel** | $m_1 = m_2$ ve $n_1 \ne n_2$ (kesişmez) |
| **Çakışık** | $m_1 = m_2$ ve $n_1 = n_2$ (sonsuz ortak nokta) |
| **Kesişen** | $m_1 \ne m_2$ (tek ortak nokta; denklem sistemi çözülür) |
| **Dik kesişen** | $m_1 \cdot m_2 = -1$ |

# Analitik Yaklaşımın Gücü
Dik koordinat sistemi, geometrik özellikleri (paralellik, diklik, orta nokta) **cebirsel olarak** kanıtlamayı sağlar. Örneğin bir dörtgenin karşılıklı kenarlarının eğimleri eşitse dörtgen **paralelkenardır**.
""",
  [(r"$A(1, 3)$ ve $B(4, 9)$ noktalarından geçen doğrunun eğimini ve denklemini bulunuz.",
    r"$m = \dfrac{9-3}{4-1} = 2$. $y - 3 = 2(x - 1) \Rightarrow y = 2x + 1$."),
   (r"$d_1: 2x - y + 5 = 0$ ve $d_2: x + 2y - 4 = 0$ doğrularının birbirine göre durumunu belirleyiniz.",
    r"$m_1 = -\frac{2}{-1} = 2$, $m_2 = -\frac12$. $m_1 \cdot m_2 = 2\cdot\left(-\frac12\right) = -1$ olduğundan doğrular **dik kesişir**. Kesişim: $y = 2x+5$ ikinci denklemde: $x + 4x + 10 - 4 = 0 \Rightarrow x = -\frac65$, $y = \frac{13}{5}$."),
   (r"Bir rampa yatayda 12 m ilerlerken 1 m yükseliyor. Rampanın eğimi nedir? Eğim açısı yaklaşık kaç derecedir? ($\tan 4{,}8^\circ \approx 0{,}083$)",
    r"$m = \dfrac{1}{12} \approx 0{,}083$; eğim açısı $\alpha \approx 4{,}8^\circ$. Engelli rampalarında eğimin **%8,33'ü (1/12)** aşmaması bu yüzden önerilir.")],
  ["Eğim m = tan α = (y₂ − y₁)/(x₂ − x₁); yatay doğruda 0, düşey doğruda tanımsız.", "Doğru denklemi: y − y₁ = m(x − x₁) ya da y = mx + n; ax + by + c = 0 ise m = −a/b.", "Paralel: eğimler eşit; çakışık: denklemler denk; dik: m₁·m₂ = −1.", "Koordinat sistemi geometrik özelliklerin cebirsel incelenmesini sağlar."]),
]),
U("t7", "7. Tema: Veriden Olasılığa", "Theme 7: From Data to Probability", [
O("k1", "MAT.10.7.1", "Koşullu olasılık, bağımlı ve bağımsız olaylar",
  "Conditional probability, dependent and independent events", r"""
# Koşullu Olasılık
$B$ olayının gerçekleştiği **bilindiğinde** $A$ olayının olasılığına **koşullu olasılık** denir ve $P(A \mid B)$ ile gösterilir (“$B$ verilmişken $A$”):
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0$$
Eş olasılıklı örnek uzayda: $P(A \mid B) = \dfrac{s(A \cap B)}{s(B)}$ — yani **örnek uzay $B$'ye daralır**.

# Çarpma Kuralı
$$P(A \cap B) = P(B)\cdot P(A \mid B) = P(A)\cdot P(B \mid A)$$
Ardışık çekilişlerde (ör. **geri koymadan** top çekme) her adımda kalan duruma göre olasılık güncellenir; **olasılık ağacı** bu hesabı düzenler: dallar boyunca **çarp**, sonuçlar arasında **topla**.

# Bağımlı ve Bağımsız Olaylar
- $A$ ve $B$ **bağımsızdır** $\iff P(A \mid B) = P(A) \iff P(A \cap B) = P(A)\cdot P(B)$.
- Birinin gerçekleşmesi diğerinin olasılığını değiştiriyorsa olaylar **bağımlıdır**.
- **Geri koyarak** çekilişler bağımsız, **geri koymadan** çekilişler bağımlıdır.
- **Ayrık** (aynı anda olamayan) olaylar, olasılıkları sıfırdan büyükse **bağımsız değildir**.

# İki Yönlü Tablo ile Koşullu Olasılık
| | Gözlüklü | Gözlüksüz | Toplam |
|---|---|---|---|
| Kız | 12 | 18 | 30 |
| Erkek | 8 | 22 | 30 |
| Toplam | 20 | 40 | 60 |

$P(\text{Gözlüklü} \mid \text{Kız}) = \dfrac{12}{30} = 0{,}4$; $P(\text{Kız} \mid \text{Gözlüklü}) = \dfrac{12}{20} = 0{,}6$. **Dikkat:** $P(A \mid B)$ ile $P(B \mid A)$ genellikle **farklıdır**.
""",
  [(r"Bir torbada 4 kırmızı ve 6 mavi top var. Geri konmadan art arda iki top çekiliyor. İkisinin de kırmızı olma olasılığı nedir?",
    r"$P(K_1) = \frac{4}{10}$; ilk top kırmızıysa torbada 3 kırmızı, 9 top kalır: $P(K_2 \mid K_1) = \frac39$. Çarpma kuralı: $P = \frac{4}{10}\cdot\frac{3}{9} = \frac{12}{90} = \frac{2}{15}$."),
   (r"Bir zar atılıyor. Gelen sayının **çift** olduğu biliniyorsa **4'ten büyük** olma olasılığı nedir? “Çift gelme” ile “4'ten büyük gelme” olayları bağımsız mıdır?",
    r"$B = \{2,4,6\}$, $A = \{5,6\}$, $A\cap B = \{6\}$. $P(A \mid B) = \frac{1}{3}$. $P(A) = \frac26 = \frac13$. $P(A\mid B) = P(A)$ olduğundan olaylar **bağımsızdır** — çift olduğunu bilmek “4'ten büyük” olma olasılığını değiştirmez."),
   (r"Bir sınıfta öğrencilerin %60'ı İngilizce, %30'u hem İngilizce hem Almanca kursuna gidiyor. İngilizce kursuna giden bir öğrencinin Almanca kursuna da gitme olasılığı nedir?",
    r"$P(A \mid İ) = \dfrac{P(A \cap İ)}{P(İ)} = \dfrac{0{,}30}{0{,}60} = 0{,}5$.")],
  ["P(A|B) = P(A∩B)/P(B): B bilindiğinde örnek uzay B'ye daralır.", "Çarpma kuralı: P(A∩B) = P(B)·P(A|B); olasılık ağacında dallar boyunca çarpılır.", "Bağımsızlık: P(A|B) = P(A) ya da P(A∩B) = P(A)·P(B).", "Geri koymadan çekilişler bağımlıdır; P(A|B) ile P(B|A) genellikle farklıdır."]),
O("k2", "MAT.10.7.2", "Bayes teoremi ve veriye dayalı olasılık tahmini",
  "Bayes' theorem and data-based probability prediction", r"""
# Toplam Olasılık
Örnek uzay ayrık ve hepsini kapsayan $B_1, B_2, \dots, B_n$ parçalarına ayrılırsa:
$$P(A) = P(B_1)P(A\mid B_1) + P(B_2)P(A\mid B_2) + \dots + P(B_n)P(A\mid B_n)$$

# Bayes Teoremi
$A$ olayının gözlendiği bilindiğinde, bunun $B_i$ **nedeninden** kaynaklanma olasılığı:
$$P(B_i \mid A) = \frac{P(B_i)\cdot P(A \mid B_i)}{P(A)}$$
- $P(B_i)$: **önsel** (ön bilgi) olasılık
- $P(B_i \mid A)$: **sonsal** (yeni veriyle güncellenmiş) olasılık

Bayes teoremi, **yeni bir bilgi geldiğinde inancımızı güncellemenin** matematiksel yoludur.

# Neden Önemli? — Tıbbi Test Örneği
Bir hastalık toplumda **%1** oranında görülsün. Test, hastaların **%95**'inde pozitif; sağlıklı kişilerin **%10**'unda da yanlışlıkla pozitif sonuç versin.
- $P(+) = 0{,}01\cdot0{,}95 + 0{,}99\cdot0{,}10 = 0{,}0095 + 0{,}099 = 0{,}1085$
- $P(\text{Hasta} \mid +) = \dfrac{0{,}0095}{0{,}1085} \approx 0{,}088$

Pozitif sonuç alan birinin gerçekten hasta olma olasılığı yalnızca **yaklaşık %9**'dur! Hastalık nadir olduğu için **yanlış pozitifler** gerçek pozitiflerden çok daha fazladır. Bu yüzden doktorlar ikinci bir test ister.

# Uygulama Alanları
Spam e-posta filtreleri, hava durumu tahmini, kalite kontrol (hangi makinenin hatalı ürettiği), yapay zekâ ve tıbbi tanı Bayes yaklaşımını kullanır.

# Olasılık Ağacıyla Çözüm Adımları
1. İlk dallara **nedenleri** ve önsel olasılıklarını yaz.
2. İkinci dallara her nedene göre **gözlemin** koşullu olasılıklarını yaz.
3. Gözlemi içeren yolların çarpımlarını topla → $P(A)$.
4. İstenen yolun çarpımını $P(A)$'ya böl.
""",
  [(r"Bir fabrikada ürünlerin %60'ı A makinesinde, %40'ı B makinesinde üretiliyor. A'nın ürünlerinin %2'si, B'nin ürünlerinin %5'i kusurlu. Rastgele seçilen bir ürün kusurlu çıkarsa B makinesinde üretilmiş olma olasılığı nedir?",
    r"$P(K) = 0{,}6\cdot0{,}02 + 0{,}4\cdot0{,}05 = 0{,}012 + 0{,}020 = 0{,}032$. $P(B \mid K) = \dfrac{0{,}020}{0{,}032} = 0{,}625$. Ürünlerin yalnız %40'ını üretmesine rağmen kusurlu bir ürünün **%62,5** olasılıkla B'den geldiği anlaşılır."),
   (r"Bir e-posta filtresine göre gelen e-postaların %30'u spam. “Ücretsiz” kelimesi spam e-postaların %40'ında, normal e-postaların %5'inde geçiyor. İçinde “ücretsiz” geçen bir e-postanın spam olma olasılığı nedir?",
    r"$P(Ü) = 0{,}3\cdot0{,}4 + 0{,}7\cdot0{,}05 = 0{,}12 + 0{,}035 = 0{,}155$. $P(S \mid Ü) = \dfrac{0{,}12}{0{,}155} \approx 0{,}77$. Kelimeyi görmek, spam olasılığını **%30'dan yaklaşık %77'ye** günceller.")],
  ["Toplam olasılık: P(A) = Σ P(Bᵢ)·P(A|Bᵢ).", "Bayes: P(Bᵢ|A) = P(Bᵢ)·P(A|Bᵢ) / P(A) — yeni veriyle önsel olasılık güncellenir.", "Nadir durumlarda yanlış pozitifler sonucu büyük ölçüde etkiler (tıbbi test örneği).", "Olasılık ağacında gözlemi içeren yollar toplanır, istenen yol bu toplama bölünür."]),
]),
]
