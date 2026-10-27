# -*- coding: utf-8 -*-
r"""9. Sınıf Coğrafya — 1.42 eki: Dünya'nın şekli, hareketleri ve coğrafi konum (TYT/AYT kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from common import O, U

YENI = [U("u8", "8. Ünite (Ek): Dünya'nın Şekli, Hareketleri ve Coğrafi Konum", "Unit 8 (Extra): Earth's Shape, Motions and Location", [

O("k1", "COĞ.9.E1", "Dünya'nın şekli ve hareketleri; mevsimlerin oluşumu", "Earth's shape and motions; why we have seasons", r"""
# Dünya'nın Şekli: Geoit
Dünya tam bir küre değildir; kutuplardan hafifçe basık, Ekvator'dan şişkindir. Bu kendine özgü şekle **geoit** denir.
**Kanıtları:** Ay tutulmasında Dünya'nın gölgesinin hep yuvarlak olması, ufuktan yaklaşan geminin önce direğinin görünmesi, uzaydan çekilen fotoğraflar, aynı anda farklı enlemlerde Güneş'in farklı yükseklikte görülmesi.

**Sonuçları:**
- Güneş ışınlarının geliş açısı Ekvator'dan kutuplara doğru **küçülür** → sıcaklık genel olarak kutuplara doğru azalır.
- Ekvator çevresi kutuplar çevresinden biraz uzundur; yer çekimi kutuplarda biraz **daha fazladır**.
- Paralellerin boyu kutuplara doğru kısalır; iki meridyen arası uzaklık kutuplara doğru azalır.

# Günlük Hareket (Kendi Ekseni Çevresinde Dönüş)
Dünya **batıdan doğuya** doğru, yaklaşık **24 saatte** bir tur atar.
- **Gece ile gündüz** birbirini izler.
- Güneş **doğudan doğar**, batıdan batar; doğudaki yerlerde Güneş daha erken doğar.
- Her meridyen arasında **4 dakika** zaman farkı oluşur (yerel saat).
- Çizgisel dönüş hızı Ekvator'da en fazladır, kutuplara doğru azalır; rüzgâr ve akıntılar Kuzey Yarım Küre'de sağa, Güney'de sola sapar (**Coriolis etkisi**).

# Yıllık Hareket (Güneş Çevresinde Dolanma)
Dünya, Güneş çevresindeki elips biçimli yörüngesini **365 gün 6 saatte** tamamlar. Eksen, yörünge düzlemine göre **23°27′** eğiktir ve bu eğiklik yıl boyunca **aynı yönü** korur.
**Sonuçları:** Mevsimler, gece ile gündüz sürelerinin yıl içinde değişmesi, Güneş ışınlarının dik geldiği yerin dönenceler arasında yer değiştirmesi, matematik iklim kuşakları.

| Tarih | Işınların dik geldiği yer | Kuzey Yarım Küre'de |
|---|---|---|
| 21 Mart | Ekvator | İlkbahar başlangıcı; gece = gündüz (ekinoks) |
| 21 Haziran | Yengeç Dönencesi (23°27′ K) | En uzun gündüz; yaz başlangıcı |
| 23 Eylül | Ekvator | Sonbahar başlangıcı; gece = gündüz |
| 21 Aralık | Oğlak Dönencesi (23°27′ G) | En kısa gündüz; kış başlangıcı |

> Mevsimlerin nedeni Güneş'e uzaklık değil, **eksen eğikliğidir**. Dünya Güneş'e en yakın konumuna (günberi) Ocak başında gelir; o sırada Kuzey Yarım Küre'de kıştır.
""",
  [(r"21 Haziran'da Güneş ışınlarının Yengeç Dönencesi'ne dik geldiği bilinmektedir. Bu tarihte 40° K enleminde öğle vakti Güneş'in ufuk düzlemiyle yaptığı açı kaç derecedir?",
    r"Geliş açısı $= 90° - (\text{enlem farkı}) = 90° - (40° - 23°27′) = $ **73°27′** (yaklaşık 73,5°)."),
   (r"Eksen eğikliği olmasaydı Türkiye'de mevsimler ve gündüz süreleri nasıl olurdu?",
    r"Işınlar yıl boyu Ekvator'a dik gelirdi; **mevsimler oluşmaz**, gece ile gündüz her yerde yıl boyunca **eşit (12 saat)** olurdu.")],
  [r"Dünya'nın şekli geoittir; sıcaklık genel olarak Ekvator'dan kutuplara azalır.", r"Günlük hareket: batıdan doğuya, 24 saat → gece-gündüz, yerel saat farkları, Coriolis.",
   r"Yıllık hareket + eksen eğikliği (23°27′) → mevsimler ve gündüz süresinin değişmesi.", r"21 Haziran Yengeç, 21 Aralık Oğlak dönencesine; 21 Mart ve 23 Eylül Ekvator'a dik ışın."]),

O("k2", "COĞ.9.E2", "Coğrafi konum: enlem, boylam ve saat hesapları", "Geographic location: latitude, longitude and time", r"""
# Paraleller ve Enlem
- **Paralel:** Ekvator'a paralel çizilen hayali daireler. Ekvator **0°**, kutuplar **90°**; her yarım kürede 90, toplam **180** paralel vardır.
- **Enlem:** Bir yerin Ekvator'a olan açısal uzaklığıdır (K ya da G).
- Enlemin etkileri: güneş ışınlarının geliş açısı, sıcaklık, gece-gündüz süre farkı, iklim kuşakları, bitki örtüsü, kalıcı kar sınırı yüksekliği. Ardışık iki paralel arası yaklaşık **111 km**'dir.

# Meridyenler ve Boylam
- **Meridyen:** Kutuplar arasında uzanan yarım daireler. Başlangıç meridyeni (0°) **Greenwich**'ten geçer; doğuda ve batıda 180'er, toplam **360** meridyen vardır.
- **Boylam:** Bir yerin başlangıç meridyenine olan açısal uzaklığıdır (D ya da B).
- İki meridyen arasında **4 dakika** zaman farkı vardır; $360° \times 4 \text{ dk} = 24$ saat.

# Yerel Saat Hesabı
1. İki yer **aynı yarım küredeyse** boylamlar **çıkarılır**, farklıysa **toplanır**.
2. Boylam farkı × 4 dakika = zaman farkı.
3. **Doğudaki** yerin saati **ileridir**: doğuya gidince ekle, batıya gidince çıkar.

# Ortak (Ulusal) Saat
Ülke içinde karışıklığı önlemek için tek bir meridyenin saati kullanılır. **Türkiye**, yıl boyunca **45° D** meridyeninin yerel saatini (UTC+3) kullanır. Doğu ile batı uçları arasında yaklaşık 19 meridyen, yani **76 dakika** yerel saat farkı vardır.

# Matematik ve Özel Konum
- **Matematik konum:** Enlem ve boylamla belirtilen kesin yer. Türkiye: **36°–42° K** enlemleri, **26°–45° D** boylamları arası.
- **Özel konum:** Bir yerin yer şekilleri, denizlere ve komşulara göre durumu (ör. Türkiye'nin Asya ile Avrupa arasında köprü olması, üç tarafının denizlerle çevrili olması).
""",
  [(r"30° D boylamındaki İstanbul'da yerel saat 12.00 iken 45° D boylamındaki Kars'ta yerel saat kaçtır?",
    r"Boylam farkı $45 - 30 = 15$; zaman farkı $15 \times 4 = 60$ dk. Kars doğuda olduğundan saat **13.00**."),
   (r"Bir yerin enlemi 40° K'dir. Bu yerin Ekvator'a olan kuzey-güney uzaklığı yaklaşık kaç km'dir?",
    r"$40 \times 111 \approx $ **4 440 km**.")],
  [r"Enlem Ekvator'a, boylam başlangıç meridyenine olan açısal uzaklıktır.", r"İki meridyen arası 4 dakika; doğudaki yerin saati ileridir.",
   r"Aynı yarım kürede boylamlar çıkarılır, farklı yarım kürede toplanır.", r"Türkiye ortak saat olarak 45° D (UTC+3) kullanır; 36–42° K, 26–45° D arasındadır."]),

O("k3", "COĞ.9.E3", "Toprak oluşumu, toprak türleri ve bitki örtüsü", "Soil formation, soil types and natural vegetation", r"""
# Toprak Nasıl Oluşur?
Kayaçların **ayrışması** (fiziksel ve kimyasal parçalanma) ve bu malzemeye organik maddelerin (**humus**) karışmasıyla oluşur. Oluşumu çok yavaştır: birkaç santimetre toprak yüzlerce yılda meydana gelir.
**Etkileyen faktörler:** ana kaya, iklim (en önemlisi), yer şekilleri (eğim), canlılar ve zaman.
- Sıcak ve nemli iklimde **kimyasal**, kurak ve soğuk iklimde **fiziksel** ayrışma etkilidir.
- Eğimli yamaçlarda toprak taşındığı için incedir; düzlüklerde kalındır.

# Toprak Türleri
- **Yerinde (sabit) topraklar:** Oluştuğu yerde kalan topraklar. **Zonal** (iklime bağlı): laterit (ekvatoral, kırmızı), terra rossa (Akdeniz, kırmızı), çernozyom (bozkır, kara toprak, çok verimli), podzol (tayga, asitli), tundra toprağı. **İntrazonal** (ana kayaya bağlı): rendzina (kalkerli kayaçlar üzerinde), halomorfik (tuzlu) topraklar.
- **Taşınmış topraklar:** Akarsu (**alüvyal**, çok verimli; delta ve ovalar), rüzgâr (**lös**), buzul (**moren**) ve yer çekimiyle (**kolüvyal**) taşınan topraklar.
- **Erozyon** (toprak aşınması) eğim, bitki örtüsünün yok olması, yanlış tarım (eğime paralel sürme) ve aşırı otlatmayla artar; Türkiye'de ciddi bir sorundur. Önlemler: ağaçlandırma, setleme (taraslama), eğime dik sürme, mera düzenlemesi.

# Bitki Örtüsü
İklim, özellikle **sıcaklık ve yağış**, bitki örtüsünü belirler.
| Bitki örtüsü | İklim | Örnek bölge |
|---|---|---|
| Yağmur ormanları | Ekvatoral (sıcak, her mevsim yağışlı) | Amazon, Kongo |
| Savan | Yazı yağışlı tropikal | Doğu Afrika |
| **Maki** | Akdeniz (yazı kurak) | Türkiye'nin Akdeniz ve Ege kıyıları |
| **Bozkır (step)** | Yarı kurak karasal | İç Anadolu |
| Karışık ve geniş yapraklı orman | Ilıman, her mevsim yağışlı | Karadeniz kıyıları |
| Tayga (iğne yapraklı orman) | Soğuk | Sibirya, Kanada |
| Tundra | Kutup çevresi | Kuzey Kanada, Sibirya kuzeyi |
""",
  [(r"İç Anadolu'da bozkırın, Karadeniz kıyılarında ise ormanların yaygın olmasının temel nedeni nedir?", r"**Yağış farkı**: İç Anadolu yarı kurak karasal iklimdedir; Karadeniz kıyıları ise her mevsim yağışlıdır."),
   (r"Delta ovalarının tarım açısından verimli olmasının nedeni nedir?", r"Akarsuların taşıyıp biriktirdiği **alüvyal topraklar** mineral bakımından zengin ve verimlidir.")],
  [r"Toprak ayrışma + humusla, çok yavaş oluşur; iklim en etkili faktördür.", r"Yerinde topraklar zonal (laterit, terra rossa, çernozyom, podzol) ve intrazonal (rendzina); taşınmış topraklar alüvyal, lös, moren.",
   r"Erozyonu bitki örtüsü azaltır; ağaçlandırma ve setleme önlemdir.", r"Bitki örtüsü sıcaklık ve yağışa bağlıdır: maki Akdeniz, bozkır İç Anadolu, orman Karadeniz."]),
])]
