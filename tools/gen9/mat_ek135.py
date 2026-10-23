# -*- coding: utf-8 -*-
r"""9. Sınıf Matematik — 1.35.0 tamamlama: eksik kodlar, anlatım ekleri, çözümlü örnekler, özet maddeleri."""

KOD = {"t4/k2": "MAT.9.4.2", "t4/k3": "MAT.9.4.3", "t4/k4": "MAT.9.4.4", "t4/k5": "MAT.9.4.5"}

ANLATIM = {
"t2/k2": r"""
# Mutlak Değer Fonksiyonunun Grafiğini Çizme
1. **Tepe noktasını** bul: $ax + b = 0 \Rightarrow x = -\dfrac{b}{a}$, $y = c$.
2. Tepenin **sağında ve solunda** birer nokta seç, değerlerini hesapla.
3. Noktaları iki ışınla birleştir; ışınların eğimleri $a$ ve $-a$'dır.

| $f(x) = \lvert x - 1 \rvert - 2$ | $x = -1$ | $x = 0$ | $x = 1$ | $x = 2$ | $x = 3$ |
|---|---|---|---|---|---|
| $f(x)$ | $0$ | $-1$ | $-2$ (tepe) | $-1$ | $0$ |

- Grafik $x$ eksenini $f(x) = 0$ olan noktalarda keser: $|x - 1| = 2 \Rightarrow x = -1$ veya $x = 3$.
- $|x|$ grafiği **$y$ eksenine göre simetriktir**; $|x - r|$ grafiği $x = r$ doğrusuna göre simetriktir.
""",
"t4/k3": r"""
# Benzer Üçgen Oluşturma Yolları
1. **Paralel çizme:** Üçgenin bir kenarına paralel bir doğru çizilir; kesilen küçük üçgen büyük üçgene **benzerdir** (açılar yöndeş açılar olarak eşit kalır).
2. **Homoteti (merkezli büyütme):** Bir $O$ noktası seçilir; her köşe $O$'dan geçen ışın üzerinde $|OA'| = k \cdot |OA|$ olacak biçimde taşınır. $k > 1$ büyütme, $0 < k < 1$ küçültme yapar.
3. **Kare kâğıt ve ölçek:** Harita, maket ve mimari çizimler benzerliğe dayanır (1 : 100 ölçekli çizimde her uzunluk 100 kat küçüktür).

> **Yansıtma:** Benzerlikte **şekil** (açılar) korunur, **büyüklük** değişir; eşlikte ikisi de korunur. Eşlik, $k = 1$ olan özel bir benzerliktir.
""",
"t4/k5": r"""
# Sık Karşılaşılan Problem Türleri
| Durum | Kullanılacak araç |
|---|---|
| Üçgende kenara paralel doğru | **Tales**: $\dfrac{AD}{AB} = \dfrac{AE}{AC} = \dfrac{DE}{BC}$ |
| Dik üçgende hipotenüse yükseklik | **Öklid**: $h^2 = p \cdot q$, $a^2 = p \cdot c$ |
| Dik üçgende bilinmeyen kenar | **Pisagor**: $a^2 + b^2 = c^2$ |
| Gölge, ağaç, bina yüksekliği | Güneş ışınları paralel → **AA benzerliği** |
| Ortak açılı iki üçgen | **AA** ile benzerlik, sonra orantı |

**Sık kullanılan Pisagor üçlüleri:** (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25) ve katları (6, 8, 10)…

> ⚠ Orantı yazarken **karşılıklı** kenarları eşleştir: eşit açıların karşısındaki kenarlar karşılıklıdır.
""",
"t5/k1": r"""
# Algoritmada Temel Yapılar
- **Sıralı yapı:** Adımlar yazıldığı sırayla bir kez çalışır.
- **Karar (seçim) yapısı:** “Eğer … ise … değilse …” — koşula göre farklı yol izlenir.
- **Döngü (tekrar) yapısı:** Bir koşul sağlandığı sürece adımlar tekrarlanır.

**Örnek – 1'den $n$'ye kadar sayıların toplamı:**
1. Başla. $n$'yi oku. $T \leftarrow 0$, $i \leftarrow 1$.
2. $i \le n$ olduğu sürece: $T \leftarrow T + i$, $i \leftarrow i + 1$.
3. $T$'yi yaz. Bitir.

> İyi bir algoritma **sonlu** olmalı (sonsuz döngüye girmemeli), her adımı **açık** olmalı ve aynı girdiye her zaman **aynı çıktıyı** vermelidir.
""",
"t5/k3": r"""
# Niceleyicilerin Değillenmesi
Bir algoritmanın “her eleman için kontrol” adımı başarısızsa, bunun anlamı “**en az bir eleman koşulu sağlamıyor**” demektir:

$$\neg(\forall x,\ P(x)) \equiv \exists x,\ \neg P(x) \qquad \neg(\exists x,\ P(x)) \equiv \forall x,\ \neg P(x)$$

| Görev | Algoritmadaki karşılığı |
|---|---|
| “Listedeki **tüm** sayılar pozitif mi?” | Döngü; negatif bir sayı **bulununca dur** ve “hayır” yaz ($\forall$'ın değili $\exists$) |
| “Listede **en az bir** çift sayı var mı?” | Döngü; ilk çift sayıda **dur** ve “evet” yaz |
| Şifre: “en az 8 karakter **ve** en az bir rakam” | Koşul: $(\text{uzunluk} \ge 8) \land (\exists\ \text{rakam})$ |

- **De Morgan kuralları:** $\neg(p \land q) \equiv \neg p \lor \neg q$ ve $\neg(p \lor q) \equiv \neg p \land \neg q$. Bir koşulun “değilse” kolunu yazarken kullanılır.
""",
"t6/k2": r"""
# Yanıltıcı Grafikler ve Hatalı Sonuçlar
- **Kesilmiş eksen:** Dikey eksen 0'dan değil 90'dan başlatılırsa 92 ile 96 arasındaki küçük fark çok büyük görünür.
- **Seçilmiş örneklem:** Yalnızca bir okulun 30 öğrencisiyle yapılan ankete bakıp “Türkiye'deki gençler…” diye genelleme yapılamaz.
- **Aykırı değer etkisi:** Bir sınıfın not ortalaması bir iki çok yüksek ya da düşük notla değişebilir; böyle durumlarda **medyan** daha iyi bir özettir.
- **Korelasyon ≠ neden:** Dondurma satışı ile boğulma vakaları birlikte artar; ikisinin ortak nedeni **sıcak havadır**.

> Bir istatistiksel iddiayı değerlendirirken sor: **Kim**, **kaç kişiyle**, **nasıl** ölçtü? Veri ve grafik bu sonucu gerçekten destekliyor mu?
""",
"t7/k1": r"""
# Deney Sayısı Neden Önemli?
| Atış sayısı | Yazı sayısı | Deneysel olasılık |
|---|---|---|
| 10 | 7 | 0,70 |
| 100 | 56 | 0,56 |
| 1000 | 509 | 0,509 |

Deneme sayısı arttıkça deneysel olasılık **0,5'e** (teorik değere) yaklaşır. Az sayıda denemeyle yapılan tahmin yanıltıcı olabilir.
- **Simülasyon:** Zar, para ya da bilgisayarın rastgele sayı üreticisiyle bir olay çok kez yapay olarak tekrarlanır ve deneysel olasılık bulunur.
- Teorik olasılığı hesaplanamayan olaylarda (yarın yağmur yağması, raptiyenin sivri ucu yukarı düşmesi) **gözleme dayalı** tahmin kullanılır.
""",
"t7/k2": r"""
# Örnek Uzayı Listeleme (İki Olaylı Deneyler)
İki zar atılınca örnek uzay $6 \cdot 6 = 36$ elemanlıdır. Tablo ile listelemek kolaydır:

| + | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **1** | 2 | 3 | 4 | 5 | 6 | 7 |
| **2** | 3 | 4 | 5 | 6 | 7 | 8 |
| **3** | 4 | 5 | 6 | 7 | 8 | 9 |
| **4** | 5 | 6 | 7 | 8 | 9 | 10 |
| **5** | 6 | 7 | 8 | 9 | 10 | 11 |
| **6** | 7 | 8 | 9 | 10 | 11 | 12 |

- Toplamın 7 olması **6** çıktıda görülür → $P = \dfrac{6}{36} = \dfrac16$ (en olası toplam).
- **Ağaç şeması:** Bir parayı iki kez atınca YY, YT, TY, TT → 4 çıktı.
- Tümevarımsal akıl yürütme: Birkaç örnekten “$n$ para atılınca örnek uzay $2^n$ elemanlıdır” genellemesine ulaşılır.
"""
}

ORNEK = {
"t1/k3": [
 (r"$\sqrt{9}$, $\sqrt{7}$, $-\tfrac{3}{4}$, $0{,}\overline{3}$, $\pi$, $-5$ sayılarını en dar sayı kümesine yerleştiriniz.",
  r"$\sqrt{9} = 3 \in \mathbb{N}$; $-5 \in \mathbb{Z}$; $-\tfrac34$ ve $0{,}\overline{3} = \tfrac13 \in \mathbb{Q}$ (devirli ondalık sayılar rasyoneldir); $\sqrt{7}$ ve $\pi$ **irrasyoneldir** ($\mathbb{Q}'$)."),
 (r"“İki irrasyonel sayının toplamı her zaman irrasyoneldir.” önermesi doğru mudur? Örnekle gösteriniz.",
  r"**Yanlıştır.** $\sqrt2$ ve $-\sqrt2$ irrasyoneldir ama toplamları $0$ rasyoneldir. Yani irrasyonel sayılar kümesi toplamaya göre **kapalı değildir**; tek bir karşı örnek önermeyi çürütmeye yeter."),
],
"t1/k4": [
 (r"$101^2 - 99^2$ işleminin sonucunu özdeşlik kullanarak bulunuz.",
  r"İki kare farkı: $a^2 - b^2 = (a - b)(a + b) = (101 - 99)(101 + 99) = 2 \cdot 200 = 400$."),
 (r"$x + y = 7$ ve $xy = 10$ ise $x^2 + y^2$ kaçtır?",
  r"$(x + y)^2 = x^2 + 2xy + y^2 \Rightarrow 49 = x^2 + y^2 + 20 \Rightarrow x^2 + y^2 = 29$."),
],
"t2/k1": [
 (r"$f(x) = x$ referans fonksiyonundan $g(x) = -2(x - 1) + 3$ fonksiyonu nasıl elde edilir? $g$ artan mıdır?",
  r"$f$ önce **1 birim sağa** ötelenir ($x - 1$), sonra **2 katı dikey genişletilip $x$ eksenine göre yansıtılır** ($-2$), en son **3 birim yukarı** ötelenir. $g(x) = -2x + 5$; eğim $-2 < 0$ olduğu için **azalandır**."),
],
"t2/k3": [
 (r"Bir taksi açılışta 40 TL, her km için 25 TL alıyor. 340 TL ödeyen bir yolcu kaç km yol gitmiştir? Bütçesi en fazla 290 TL olan biri en fazla kaç km gidebilir?",
  r"Ücret $f(x) = 25x + 40$. $25x + 40 = 340 \Rightarrow x = 12$ km. $25x + 40 \le 290 \Rightarrow 25x \le 250 \Rightarrow x \le 10$ km."),
 (r"$|2x - 3| \le 5$ eşitsizliğinin çözüm kümesini bulunuz.",
  r"$-5 \le 2x - 3 \le 5 \Rightarrow -2 \le 2x \le 8 \Rightarrow -1 \le x \le 4$. Çözüm kümesi $[-1, 4]$."),
],
"t3/k1": [
 (r"Bir üçgenin iki kenarı 5 cm ve 9 cm'dir. Üçüncü kenar tam sayı olduğuna göre kaç farklı değer alabilir?",
  r"$9 - 5 < c < 9 + 5 \Rightarrow 4 < c < 14$. Tam sayı değerler $5, 6, \ldots, 13$ → **9 farklı** değer."),
 (r"Bir üçgende $m(\widehat{A}) = 50^\circ$, $m(\widehat{B}) = 70^\circ$'dir. $C$ köşesindeki dış açıyı ve en uzun kenarı bulunuz.",
  r"$m(\widehat{C}) = 180 - 50 - 70 = 60^\circ$. $C$'deki dış açı $= 50 + 70 = 120^\circ$. En büyük açı $70^\circ$ ($\widehat{B}$) olduğundan en uzun kenar **$B$'nin karşısındaki $[AC]$**'dir."),
],
"t4/k1": [
 (r"$A(2, 3)$ noktasının $x$ eksenine göre yansıması, $(4, -1)$ vektörü kadar ötelenmesi ve orijin etrafında $90^\circ$ (saat yönünün tersine) döndürülmesiyle elde edilen noktaları bulunuz.",
  r"$x$ eksenine göre yansıma: $(2, -3)$. Öteleme: $(2 + 4,\ 3 - 1) = (6, 2)$. Orijin etrafında $90^\circ$ dönme $(x, y) \to (-y, x)$: $(-3, 2)$."),
 (r"Bir üçgen önce bir doğruya göre yansıtılıp sonra ötelenirse elde edilen üçgen ilk üçgene eş midir? Neden?",
  r"**Evet.** Yansıma ve öteleme uzunlukları ve açıları koruyan (izometri) dönüşümlerdir; art arda uygulanmaları da izometridir. Görüntü üçgen ilk üçgene **eştir**."),
],
"t4/k2": [
 (r"$ABC$ ve $DEF$ üçgenlerinde $|AB| = |DE|$, $|AC| = |DF|$ ve $m(\widehat{A}) = m(\widehat{D})$'dir. Üçgenler eş midir?",
  r"**Evet, KAK** eşlik koşuluna göre: iki kenar ve **bu kenarların arasındaki** açı eşittir. Bu yüzden $|BC| = |EF|$ ve diğer açılar da eşittir."),
 (r"Kenarları 4, 6, 8 cm olan üçgen ile kenarları 6, 9, 12 cm olan üçgen benzer midir? Alanlar oranı kaçtır?",
  r"$\dfrac{4}{6} = \dfrac{6}{9} = \dfrac{8}{12} = \dfrac23$ → **KKK benzerliği**, $k = \dfrac23$. Alanlar oranı $k^2 = \dfrac49$."),
],
"t4/k3": [
 (r"Kenarları 3, 4, 5 cm olan bir üçgene benzer, çevresi 36 cm olan üçgenin kenarlarını bulunuz.",
  r"İlk üçgenin çevresi 12 cm; $k = \dfrac{36}{12} = 3$. Kenarlar $9$, $12$, $15$ cm."),
],
"t4/k4": [
 (r"$ABC$ üçgeninde $DE \parallel BC$, $|AD| = 4$, $|DB| = 6$, $|AE| = 6$ ise $|EC|$ kaçtır?",
  r"Tales: $\dfrac{|AD|}{|DB|} = \dfrac{|AE|}{|EC|} \Rightarrow \dfrac46 = \dfrac{6}{|EC|} \Rightarrow |EC| = 9$."),
 (r"Dik üçgende hipotenüse ait yükseklik, hipotenüsü 4 cm ve 9 cm'lik parçalara ayırıyor. Yüksekliği ve dik kenarları bulunuz.",
  r"Öklid: $h^2 = p \cdot q = 4 \cdot 9 = 36 \Rightarrow h = 6$. Hipotenüs $c = 13$: $a^2 = 4 \cdot 13 = 52 \Rightarrow a = 2\sqrt{13}$; $b^2 = 9 \cdot 13 = 117 \Rightarrow b = 3\sqrt{13}$. Kontrol (Pisagor): $52 + 117 = 169 = 13^2$ ✓."),
],
"t4/k5": [
 (r"Boyu 1,6 m olan bir öğrencinin gölgesi 2 m, aynı anda bir ağacın gölgesi 15 m'dir. Ağacın boyu kaç metredir?",
  r"Güneş ışınları paralel → öğrenci–gölge ve ağaç–gölge üçgenleri **AA ile benzer**: $\dfrac{1{,}6}{2} = \dfrac{h}{15} \Rightarrow h = 12$ m."),
 (r"Bir merdiven duvara yaslanmıştır. Merdivenin boyu 5 m, alt ucunun duvara uzaklığı 3 m ise üst ucu yerden kaç m yüksektedir?",
  r"Duvar, yer ve merdiven dik üçgen oluşturur: $3^2 + h^2 = 5^2 \Rightarrow h^2 = 16 \Rightarrow h = 4$ m (3-4-5 üçlüsü)."),
],
"t5/k1": [
 (r"Girilen bir tam sayının tek mi çift mi olduğunu bulan algoritmayı yazınız.",
  r"1. Başla. 2. $n$'yi oku. 3. $n$'nin 2'ye bölümünden kalanı $k$ olarak hesapla. 4. Eğer $k = 0$ ise “çift”, değilse “tek” yaz. 5. Bitir. Karar yapısı akış şemasında **elmas** ile gösterilir."),
],
"t5/k3": [
 (r"“Sınıftaki **her** öğrenci sınavdan geçti.” önermesinin değilini yazınız.",
  r"$\neg(\forall x,\ P(x)) \equiv \exists x,\ \neg P(x)$: “Sınıfta sınavdan **geçemeyen en az bir** öğrenci vardır.” (“Hiçbir öğrenci geçemedi” yanlış bir değillemedir.)"),
 (r"Bir uygulama şifreyi “en az 8 karakterli **ve** en az bir rakam içeren” koşuluyla kabul ediyor. Şifrenin reddedilmesi için hangi durum yeterlidir?",
  r"De Morgan: $\neg(p \land q) \equiv \neg p \lor \neg q$. Şifre **8 karakterden kısaysa veya hiç rakam içermiyorsa** reddedilir; iki koşuldan birinin bozulması yeterlidir."),
],
"t6/k1": [
 (r"5 öğrencinin notları: 60, 70, 70, 80, 95. Ortalama, medyan, mod ve açıklığı bulunuz.",
  r"Ortalama $= \dfrac{60 + 70 + 70 + 80 + 95}{5} = \dfrac{375}{5} = 75$. Medyan (ortadaki) $= 70$. Mod $= 70$. Açıklık $= 95 - 60 = 35$."),
 (r"2, 4, 4, 4, 6 verilerinin standart sapmasını hesaplayınız (örneklem standart sapması).",
  r"Ortalama $\bar{x} = 20/5 = 4$. Sapmaların kareleri: $4, 0, 0, 0, 4$ → toplam $8$. $s = \sqrt{\dfrac{8}{5 - 1}} = \sqrt{2} \approx 1{,}41$. Değerler ortalamaya yakın olduğundan yayılım küçüktür."),
],
"t6/k2": [
 (r"Bir reklamda “Kullanıcılarımızın %90'ı memnun!” yazıyor ve küçük harflerle “20 kişiyle yapılan ankete göre” notu var. Bu sonuca nasıl yaklaşmalısınız?",
  r"**Örneklem çok küçüktür** (20 kişi) ve kimlerin seçildiği belli değildir; şirket kendi memnun müşterilerini seçmiş olabilir. Sonuç **genellenemez**; daha büyük ve rastgele bir örneklem gerekir."),
 (r"İki öğrencinin deneme netleri: Ali 30, 31, 29, 30, 30; Ece 20, 40, 25, 35, 30. Ortalamaları eşittir (30). Kimin performansı daha istikrarlıdır?",
  r"**Ali'nin.** Açıklıklar: Ali $31 - 29 = 2$, Ece $40 - 20 = 20$. Ortalamalar aynı olsa da Ece'nin verileri çok **dağınıktır**; yalnızca ortalamaya bakarak karar vermek eksik olur."),
],
"t7/k1": [
 (r"Bir raptiye 200 kez atılıyor ve 130 kez “sivri ucu yukarı” düşüyor. Raptiyenin sivri ucu yukarı düşme olasılığını tahmin ediniz. Bu olasılık teorik olarak hesaplanabilir mi?",
  r"$P \approx \dfrac{130}{200} = 0{,}65$. Raptiyenin iki yüzü **eş olasılıklı değildir** (şekli simetrik değil), bu yüzden teorik olasılık hesaplanamaz; ancak **gözleme dayalı** tahmin yapılır."),
],
"t7/k2": [
 (r"İki zar birlikte atılıyor. Üst yüzlerdeki sayıların toplamının 10 olma olasılığı kaçtır?",
  r"Toplamı 10 olan çıktılar: (4, 6), (5, 5), (6, 4) → 3 tane. $n(S) = 36$. $P = \dfrac{3}{36} = \dfrac{1}{12}$."),
],
}

OZET = {
"t4/k3": ["Homoteti: merkezden geçen ışınlarda $k$ katı büyütme/küçültme; eşlik $k = 1$ olan benzerliktir."],
"t4/k5": ["Pisagor üçlüleri: (3, 4, 5), (5, 12, 13), (8, 15, 17) ve katları; gölge problemlerinde AA benzerliği."],
"t5/k1": ["Temel yapılar: sıralı, karar (eğer–değilse), döngü (koşul sağlandıkça tekrar)."],
"t5/k3": ["$\\neg(\\forall x,\\ P(x)) \\equiv \\exists x,\\ \\neg P(x)$; De Morgan: $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$."],
"t6/k2": ["Kesilmiş eksen ve küçük örneklem yanıltır; ilişki (korelasyon) neden–sonuç anlamına gelmez."],
"t7/k1": ["Simülasyon ve gözlem: teorik olasılığı bilinmeyen olaylarda deneysel olasılık kullanılır."],
}
