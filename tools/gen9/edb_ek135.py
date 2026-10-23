# -*- coding: utf-8 -*-
r"""9. Sınıf Türk Dili ve Edebiyatı — 1.35.0 tamamlama: Maarif programının temalarındaki dinleme/izleme metinleri
(mülakat, şiir, belgesel), dil bilgisi ve yazım konuları (ses olayları, yazım–noktalama), edebiyat atölyesi
(betimleyici paragraf, düşünceyi geliştirme), ara metin tiyatro ve söz varlığı kazanımları."""
from common import O

EK = {
"u1": [
O("k4", "1.4", "Mülakat ve çok modlu metinler (dinleme/izleme)", "Interviews and multimodal texts (listening/viewing)", r"""
# Mülakat
**Mülakat**, bir konuda bilgi ve görüşüne başvurulan **sanatçı, bilim insanı ya da uzman** kişiyle yapılan, **soru–cevap** düzenindeki konuşmanın yazıya ya da kayda geçirilmiş hâlidir. Temada sanatçılarla yapılmış çok modlu mülakatlar (ör. **Selim İleri'yle mülakat**) dinlenir/izlenir.

| | **Mülakat** | **Röportaj** |
|---|---|---|
| Odak | Kişinin **görüşleri** (sanat, edebiyat, bilim) | Bir **olay, yer ya da kişi**; yazarın gözlemleri de vardır |
| Biçim | Soru–cevap | Soru–cevap + betimleme ve izlenimler |
| Kişi | Alanında uzman / tanınmış kişi | Herkes olabilir |

# Çok Modlu Metin
Anlamın **söz, görüntü, ses, müzik, yazı ve grafik** gibi birden fazla anlatım aracıyla birlikte oluşturulduğu metindir (video mülakat, belgesel, infografik, sunum).
- İzlerken yalnızca söze değil; konuşanın **jest ve mimiklerine**, ses tonuna, görüntülere ve altyazılara da dikkat edilir.

# Dinlerken / İzlerken Stratejiler
1. **Hazırlık:** Konuşanı ve konuyu tanı; başlık ve görsellerden metnin amacını **tahmin et**.
2. **Not alma:** Ana fikri, yardımcı fikirleri ve dikkat çeken ifadeleri kısa notlarla yaz.
3. **Çıkarım:** Açıkça söylenenle **ima edileni** ayır; neden–sonuç ilişkilerini belirle.
4. **Değerlendirme:** Tahminini içerikle karşılaştır; konuşanın görüşüne katılıp katılmadığını gerekçelendir.
""",
  [(r"Bir yazarla edebiyat anlayışı üzerine yapılan soru–cevap biçimindeki konuşma ile bir gazetecinin depremzede bir kasabada insanlarla konuşup izlenimlerini de kattığı yazı arasındaki tür farkı nedir?",
    r"İlki **mülakattır**: odak, tanınmış bir kişinin bir konudaki **görüşleridir**. İkincisi **röportajdır**: bir olay ve yer ele alınır, yazarın **gözlem ve izlenimleri** de metne katılır."),
   (r"Video olarak izlenen bir mülakatı, aynı mülakatın yazılı hâlinden farklı kılan unsurlar nelerdir?",
    r"Videoda anlam yalnızca sözle değil; **ses tonu, vurgu, jest–mimik, görüntü ve müzik** gibi farklı modlarla da oluşur. Bu yüzden video **çok modlu** bir metindir; dinleyici konuşanın duygusunu ve vurguladığı noktaları daha kolay fark eder.")],
  ["Mülakat: uzman/sanatçının görüşlerine dayalı soru–cevap; röportajda yazarın gözlemleri de vardır.", "Çok modlu metin: söz, görüntü, ses, yazı birlikte anlam oluşturur.", "Dinleme stratejileri: tahmin et, not al, çıkarım yap, değerlendir."]),
O("k5", "1.5", "Ses bilgisi: Türkçede ses olayları", "Phonology: sound changes in Turkish", r"""
# Türkçede Ses Olayları
Sözcükler ek aldığında ya da yan yana geldiğinde bazı sesler değişir, düşer ya da birleşir.

| Ses olayı | Açıklama | Örnek |
|---|---|---|
| **Ünsüz benzeşmesi (sertleşme)** | Sert ünsüzle (f, s, t, k, ç, ş, h, p) biten sözcüğe c, d, g ile başlayan ek gelince ek **sertleşir**: c→ç, d→t, g→k | kitap**ç**ı, ağaç**t**an, dolap**t**a (*dolap-da*), iş**ç**i (*iş-ci*) |
| **Ünsüz yumuşaması** | p, ç, t, k ile biten sözcüğe ünlüyle başlayan ek gelince sözcük sonu **yumuşar**: p→b, ç→c, t→d, k→ğ/g | kita**b**ı, ağa**c**ı, yur**d**u, aya**ğ**ı, ren**g**i |
| **Ünlü daralması** | -a, -e ile biten fiillere **-yor** eki gelince a/e **ı, i, u, ü**'ye daralır | başla-yor → başl**ı**yor, izle-yor → izl**i**yor, ye-yor → **y**iyor |
| **Ünlü düşmesi** | İki heceli bazı sözcüklere ünlüyle başlayan ek gelince ikinci hecedeki dar ünlü **düşer** | ağız → **ağzı**, burun → **burnu**, oğul → **oğlu**, alın → **alnı** |
| **Ulama** | Ünsüzle biten sözcüğün son ünsüzü, ünlüyle başlayan sonraki sözcüğün ilk ünlüsüyle **birlikte okunur** (yazıda gösterilmez) | “Bir_elma” → bi-rel-ma; “Akşam_oldu” |

Diğer ses olayları: **ünsüz düşmesi** (küçük → küçültmek), **ünsüz türemesi** (hak → hakkı), **kaynaştırma ünsüzleri** (y, n, s, ş: araba**y**ı, iki**ş**er).

> **İpucu:** Tek heceli sözcüklerin çoğu yumuşamaz (top → topu, saç → saçı); özel adlarda yumuşama yazıya geçirilmez (Zonguldak'a, Sinop'a — okunuşta yumuşar).
""",
  [(r"“Ağzından çıkanı kulağın duysun, kitabını ve defterini ayrı çantaya koy.” cümlesindeki ses olaylarını bulunuz.",
    r"**ağız → ağzından:** ünlü düşmesi · **kulak → kulağın:** ünsüz yumuşaması (k → ğ) · **kitap → kitabını:** ünsüz yumuşaması (p → b) · **ayrı çantaya:** kaynaştırma ünsüzü (-y-)."),
   (r"“Sepette elmalar, kitapçıda dergiler var.” cümlesinde ünsüz benzeşmesi örneklerini gösteriniz.",
    r"**sepet-de → sepette** (t'den sonra d → t), **kitap-cı → kitapçı** (p'den sonra c → ç). Sert ünsüzden sonra gelen ekin ilk ünsüzü sertleşmiştir.")],
  ["Ünsüz benzeşmesi: sert ünsüzden sonra c, d, g → ç, t, k (kitapçı, sepette).", "Yumuşama: p, ç, t, k → b, c, d, ğ (kitabı, ağacı); daralma: başlıyor; düşme: ağzı, burnu.", "Ulama okunuşta olur, yazıda gösterilmez."]),
O("k6", "1.6", "Yazım ve noktalama: virgül, üç nokta ve güncel yazım", "Spelling and punctuation: comma, ellipsis and current spelling", r"""
# Güncel Yazım
Doğru yazım için **Türk Dil Kurumu (TDK) Güncel Türkçe Sözlük** ve **Yazım Kılavuzu** esas alınır. Edebî metinlerde eski yazımlar (ör. **İslâm**, **hattâ**, **kâğıt**) görülebilir; şapka (düzeltme işareti) bugün yalnızca anlam ayrımı ve ince okunuş gereken yerlerde kullanılır: **hala** (babanın kız kardeşi) – **hâlâ** (henüz), **kar** – **kâr**, **dergâh**.

# Virgül (,)
| Kullanım | Örnek |
|---|---|
| Eş görevli sözcük ve söz öbeklerini ayırmak | Kalem, defter, kitap aldım. |
| Uzun cümlelerde yüklemden uzak düşmüş ögeyi belirtmek | Okulumuzun yeni öğretmeni, geçen hafta Ankara'dan geldi. |
| Hitaplardan sonra | Sevgili arkadaşım, mektubunu aldım. |
| Sıralı cümleleri ayırmak | Eve geldi, yemeğini yedi, ödevine başladı. |
| Ara sözleri ayırmak (iki virgül arasında) | Dedem, annemin babası, çok iyi saz çalar. |

# Üç Nokta (…)
| Kullanım | Örnek |
|---|---|
| Tamamlanmamış cümlenin sonunda | Bir gün o da gelecekti ama… |
| Söylenmek istenmeyen ya da sayılabilecek başka şeylerin yerine | Elma, armut, ayva… meyve kasası doluydu. |
| Alıntılarda atlanan bölümü göstermek (yay ayraç içinde) | “(…) Gün doğmadan neler doğar.” |
| Kaba sözler ya da duygu yoğunluğu, sessizlik | Evet… haklısın… |
""",
  [(r"“Annem, babam ve ben akşam yürüyüşe çıktık.” ile “Annem, babam ve ben akşam yürüyüşe çıktık mı diye sordu.” cümleleri arasındaki virgül kullanımını yorumlayınız.",
    r"İlk cümlede virgül **eş görevli ögeleri** (annem, babam) ayırmıştır. İkinci cümlede ise virgül “Annem” sözünü **hitap/özne** olarak ayırmış olabilir; virgülün yeri anlamı değiştirebilir. Yazarken anlam belirsizliğini virgülle önlemek gerekir."),
   (r"Aşağıdaki cümlede yazım yanlışını bulunuz: “Hala gelmedi, hâlam endişelendi.”",
    r"**“Hala”** sözcüğü “henüz” anlamında kullanıldığı için **“hâlâ”** yazılmalıdır. “Hâlam” ise babanın kız kardeşi anlamındadır ve **“halam”** yazılır. Doğrusu: “**Hâlâ** gelmedi, **halam** endişelendi.”")],
  ["Doğru yazım için TDK Güncel Türkçe Sözlük ve Yazım Kılavuzu esas alınır (hala – hâlâ, kar – kâr).", "Virgül: eş görevli ögeler, hitap, sıralı cümleler, ara sözler.", "Üç nokta: tamamlanmamış cümle, sayılabilecek benzerler, alıntıda atlanan bölüm (…)."]),
O("k7", "1.7", "Edebiyat atölyesi: betimleyici paragraf ve düşünceyi geliştirme yolları", "Literary workshop: descriptive paragraphs and ways of developing ideas", r"""
# Paragraf Yazma
Paragraf **giriş (konu cümlesi), gelişme ve sonuç** cümlelerinden oluşur; tek bir ana düşünceyi işler.

## Betimleyici Paragraf
Bir varlığı, yeri ya da duyguyu okurun **zihninde canlandıracak** şekilde anlatır.
- **Duyulardan yararlan:** görme (renk, ışık), işitme (ses), koku, tat, dokunma.
- **Ayrıntı seç:** Her şeyi değil, varlığı **ayırt eden** özellikleri yaz.
- **Düzenli ilerle:** Uzaktan yakına, genelden özele, soldan sağa…
- **Söz sanatlarıyla** anlatımı güçlendir (benzetme, kişileştirme).

> Şiirden yola çıkarak yazılan paragrafta şiirin uyandırdığı **duygu ve imgeler** kendi cümlelerinle betimlenir (“Duygularımı Betimliyorum”).

## Düşünceyi Geliştirme Yolları
| Yol | Açıklama | İpucu |
|---|---|---|
| **Tanımlama** | Bir kavramın ne olduğunu açıklama | “… -dır, denir” |
| **Örneklendirme** | Düşünceyi somut örnekle destekleme | “Örneğin, mesela” |
| **Karşılaştırma** | İki varlığın benzer ve farklı yönlerini ortaya koyma | “… -den daha, oysa” |
| **Tanık gösterme** | Tanınmış birinin sözüne başvurma | “… der ki” |
| **Benzetme** | Bir düşünceyi başka bir şeye benzeterek açıklama | “gibi, sanki” |
| **Sayısal verilerden yararlanma** | İstatistikle destekleme | %, sayılar |

## Konuşma (Sunum)
Görüşünü sunarken düşünceyi geliştirme yollarını kullan; **göz teması**, uygun ses tonu, vurgu ve beden dili ile dinleyiciyi ikna et; sonunda düşünceni **özetle**.
""",
  [(r"“Kitap okumak zihni besler. Bir araştırmaya göre düzenli kitap okuyan öğrencilerin kelime dağarcığı, okumayanlardan %30 daha geniştir.” paragrafında hangi düşünceyi geliştirme yolu kullanılmıştır?",
    r"**Sayısal verilerden yararlanma** (istatistik): Düşünce bir araştırma sonucu ve yüzde ile desteklenmiştir."),
   (r"Okulunuzun bahçesini betimleyen 3–4 cümlelik bir paragraf yazınız.",
    r"Örnek: “Sabah zili çalmadan önce bahçe, çınar ağacının geniş gölgesinde uyuyan bir kedi gibi sessizdi. Islak toprağın kokusu, kantinden yayılan simit kokusuna karışıyordu. Uzakta, basketbol potasının paslı çemberi güneşte turuncu bir ışıkla parlıyordu. Birden kapılar açıldı ve bahçe kahkahalarla uyandı.” — **Görme, koku, işitme** duyuları ve **benzetme–kişileştirme** kullanılmıştır.")],
  ["Paragraf: konu cümlesi, gelişme, sonuç; tek ana düşünce.", "Betimleme: duyular, ayırt edici ayrıntı, düzenli ilerleme, söz sanatları.", "Düşünceyi geliştirme: tanımlama, örneklendirme, karşılaştırma, tanık gösterme, benzetme, sayısal veri."]),
],
"u2": [
O("k4", "2.4", "Şiir dinleme ve şiir yazma: halk şiiri geleneği", "Listening to and writing poetry: the folk poetry tradition", r"""
# Dinleme/İzleme: Bir Aşk Şiiri (“Mihriban”)
Temada dinlenen **“Mihriban”**, Abdurrahim Karakoç'un **halk şiiri** söyleyişine yakın, sade dille yazılmış ve **türkü** olarak bestelenip yaygınlaşmış bir şiiridir. Şiir bir **ayrılık ve özlem** temasını işler.

## Halk Şiirinin Özellikleri
| Özellik | Açıklama |
|---|---|
| **Ölçü** | **Hece ölçüsü** (7'li, 8'li, 11'li yaygın) |
| **Birim** | Dörtlük (koşma, mani, türkü) |
| **Kafiye** | Genellikle **yarım ve tam kafiye**; **redif** sık kullanılır |
| **Dil** | Sade, halkın konuştuğu dil; somut imgeler |
| **Tema** | Aşk, ayrılık, gurbet, doğa, ölüm |
| **Sunuluş** | Çoğu zaman **saz eşliğinde** söylenir; son dörtlükte şairin adı geçer (**tapşırma**) |

- **Âşık Veysel** (1894–1973), saz şairi geleneğinin 20. yüzyıldaki en önemli temsilcilerindendir (4. temada otobiyografisi ele alınır).

# Edebiyat Atölyesi: Şiir Yazma (“Genç Şairlerden Mısralar”)
1. Temaya uygun bir **duygu** seç (özlem, umut, arkadaşlık).
2. Duyguyu taşıyacak **somut imgeler** bul (yağmur, eski bir fotoğraf, tren garı).
3. Bir **ölçü** belirle (ör. 8'li hece: 4 + 4 durak) ya da serbest şiir yaz.
4. **Kafiye ve redif** ile ahenk oluştur; tekrarlarla vurgu yap.
5. Şiirini sesli oku, ahengi kontrol et ve arkadaşlarından geri bildirim al.
""",
  [(r"“Bahar geldi dağlarıma” dizesi kaç hecelidir ve duraklar nasıldır?",
    r"Ba-har-gel-di / dağ-la-rı-ma → **8 hece**, **4 + 4** duraklı. Hece ölçüsünde önce heceler ayrılır, sonra okunuşta doğal olarak durulan yerler (duraklar) belirlenir; 8'li hece mani ve türkülerde sık kullanılır."),
   (r"Halk şiirinde “tapşırma” nedir? Neden yapılır?",
    r"Şairin şiirin **son dörtlüğünde kendi adını** ya da mahlasını söylemesidir. Sözlü gelenekte şiirin **kime ait olduğunu** bildirmek amacıyla yapılır.")],
  ["Halk şiiri: hece ölçüsü, dörtlük, sade dil, yarım kafiye ve redif, saz eşliği.", "Tapşırma: şairin son dörtlükte adını söylemesi.", "Şiir yazarken duygu → somut imge → ölçü → kafiye/redif → sesli okuma."]),
],
"u3": [
O("k4", "3.4", "Belgesel ve bilgi görseli (infografik): Nevruz", "Documentaries and infographics: Nevruz", r"""
# Belgesel
**Belgesel**, gerçek olay, kişi, yer ya da konuları **belgelere dayanarak**, gerçeğe sadık kalarak anlatan film ya da yayındır. Temada **Nevruz** konulu bir belgesel izlenir.

| Özellik | Açıklama |
|---|---|
| Amaç | Bilgi vermek, farkındalık oluşturmak |
| Kaynak | Uzman görüşleri, arşiv görüntüleri, tanıklıklar, yerinde çekimler |
| Anlatım | **Dış ses** (anlatıcı), röportaj, müzik, harita ve grafiklerle desteklenir |
| Dil | Öğretici; nesnel olmaya çalışır |

# Nevruz
**Nevruz** (“yeni gün”), baharın gelişini ve doğanın uyanışını kutlayan, **21 Mart** civarında Türk dünyası başta olmak üzere geniş bir coğrafyada kutlanan bayramdır. Türk kültüründe **Ergenekon'dan çıkış** anlatısıyla da ilişkilendirilir. Ateş üzerinden atlama, yumurta boyama, temizlik, bahar yemekleri gibi gelenekleri vardır. **UNESCO İnsanlığın Somut Olmayan Kültürel Mirası** listesinde yer alır (Türkiye'nin de aralarında bulunduğu ülkelerin ortak başvurusu).

# Edebiyat Atölyesi: Bilgi Görseli (İnfografik)
**İnfografik**, bilgiyi **metin, ikon, grafik, harita ve renkleri** birleştirerek kısa ve anlaşılır biçimde sunan görsel metindir.
1. Belgeselden **ana bilgileri** not al (tarih, yer, gelenekler, anlamı).
2. Bilgileri **gruplandır** (Ne? Nerede? Nasıl kutlanır?).
3. Her grup için **kısa başlık + simge** belirle; uzun cümle yerine anahtar sözcük kullan.
4. Okuma yönünü (yukarıdan aşağı, soldan sağa) ve **renk uyumunu** planla.
5. **Kaynakları** infografiğin altına yaz.
""",
  [(r"Belgeseli kurmaca bir filmden ayıran temel özellik nedir?",
    r"Belgesel **gerçek** olay, kişi ve yerleri **belgelere** (arşiv görüntüsü, tanıklık, uzman görüşü) dayanarak anlatır ve bilgi vermeyi amaçlar. Kurmaca film ise **hayal ürünü** bir olay örgüsünü sanatsal amaçla anlatır."),
   (r"Nevruz belgeselinden yola çıkarak hazırlanacak bir infografikte hangi bölümler yer alabilir?",
    r"“Nevruz nedir?” (tanım, tarih: 21 Mart), “Nerede kutlanır?” (harita), “Gelenekler” (ateşten atlama, yumurta boyama — simgelerle), “Kültürel önemi” (UNESCO listesi) ve **kaynakça**. Bilgiler kısa ifadeler, ikonlar ve renklerle düzenlenir.")],
  ["Belgesel: gerçek konuları belgelere dayanarak anlatan öğretici film/yayın.", "Nevruz: 21 Mart, baharın gelişi; Ergenekon anlatısı; UNESCO somut olmayan kültürel miras.", "İnfografik: metin + ikon + grafik; bilgiyi grupla, kısa başlık ve simge kullan, kaynak yaz."]),
],
"u4": [
O("k6", "4.6", "Ara metin: tiyatro ve temel unsurları", "Intermediate text: drama and its basic elements", r"""
# Tiyatro
**Tiyatro**, bir olayın **sahnede**, oyuncular aracılığıyla **diyalog ve hareketle** canlandırılmak üzere yazılmış edebî türdür. Okunmak kadar **izlenmek** için yazılır.

| Unsur | Açıklama |
|---|---|
| **Olay örgüsü** | Sahnelenen olaylar zinciri; giriş – gelişme (çatışma) – sonuç |
| **Kişiler** | Oyuncuların canlandırdığı karakterler; **kişi kadrosu** metnin başında verilir |
| **Diyalog / monolog** | Kişilerin karşılıklı konuşması / kişinin tek başına konuşması |
| **Sahne ve dekor** | Olayın geçtiği yerin sahnede canlandırılması |
| **Yan metin (sahne yönergesi)** | Ayraç içinde verilen, kişilerin hareketlerini, ses tonunu, ışık ve dekoru anlatan açıklamalar |
| **Perde ve sahne** | Oyunun bölümleri |

## Türleri
- **Trajedi:** Soylu kişilerin acıklı yazgısı; ağır dil.
- **Komedi:** Toplumun ve insanın gülünç yönleri; eğlendirirken düşündürür.
- **Dram:** Trajedi ile komedinin karışımı; günlük hayattan kişiler.

## Geleneksel Türk Tiyatrosu
**Karagöz** (gölge oyunu), **orta oyunu**, **meddah** ve **köy seyirlik oyunları**; doğaçlamaya dayanır, sahne yönergesi ve yazılı metni yoktur.

> Romanda olaylar **anlatıcı** aracılığıyla aktarılır; tiyatroda anlatıcı yoktur, olay **diyalog ve hareketle** gösterilir.
""",
  [(r"Bir tiyatro metninde “(Kapıya doğru yürür, durur, sesini alçaltarak.)” ifadesi hangi unsura örnektir? İşlevi nedir?",
    r"**Yan metin (sahne yönergesi).** Oyuncuya ve yönetmene karakterin **hareketini ve ses tonunu** gösterir; okuyucunun sahneyi zihninde canlandırmasını sağlar."),
   (r"Karagöz oyununu modern tiyatrodan ayıran özellikler nelerdir?",
    r"Karagöz bir **gölge oyunudur**; yazılı bir metne değil **doğaçlamaya** dayanır, sahne yönergesi yoktur, tek bir hayalî (oynatıcı) tüm karakterleri seslendirir ve kalıplaşmış bölümleri (mukaddime, muhavere, fasıl, bitiş) vardır.")],
  ["Tiyatro: sahnelenmek için yazılır; diyalog ve hareket esastır, anlatıcı yoktur.", "Unsurlar: olay örgüsü, kişiler, diyalog/monolog, dekor, yan metin, perde.", "Türler: trajedi, komedi, dram; geleneksel: Karagöz, orta oyunu, meddah."]),
O("k7", "4.7", "Dilimizin zenginlikleri: söz varlığı ve sosyal medya dili", "The richness of our language: vocabulary and social media language", r"""
# Söz Varlığı
Bir dilin **sözcükleri, deyimleri, atasözleri, kalıp sözleri ve terimlerinin** tamamıdır. Söz varlığı ne kadar zenginse duygu ve düşünceler o kadar **ince ayrımlarla** ifade edilir.

| Unsur | Tanım | Örnek |
|---|---|---|
| **Deyim** | Genellikle mecaz anlamlı, kalıplaşmış söz öbeği | **Kulak asmamak**, **gözden düşmek** |
| **Atasözü** | Uzun deneyimlere dayanan, öğüt veren, kalıplaşmış özlü söz | **Damlaya damlaya göl olur.** |
| **İkileme** | Anlatımı güçlendirmek için sözcüklerin tekrarı ya da eş/zıt anlamlıların birlikte kullanımı | **yavaş yavaş, er geç, eşe dosta** |
| **Kalıp söz** | Belirli durumlarda kullanılan sözler | **Geçmiş olsun, kolay gelsin, eline sağlık** |
| **Terim** | Bir bilim, sanat ya da meslek alanına özgü sözcük | **fotosentez, kafiye, ivme** |

# Edebî Dil ile Sosyal Medya Dili
| Edebî dil | Sosyal medya dili |
|---|---|
| Zengin söz varlığı, imge ve söz sanatları | Kısa, hızlı, çoğu zaman kısaltmalı (slm, tşk) |
| Yazım ve noktalama kurallarına uyulur | Kurallar çoğu zaman göz ardı edilir |
| Kalıcıdır, estetik hazza yöneliktir | Anlık iletişime yöneliktir; emoji ve görselle desteklenir |
| Türkçe karşılıklar tercih edilir | Yabancı sözcükler sık kullanılır (story, like) |

**Konuşma etkinliği (“Dilimizin Zenginlikleri”):** Sosyal medya dilini edebî dilin özellikleri açısından eleştirirken **örnek** ver, **karşılaştır** ve yabancı sözcüklerin **Türkçe karşılıklarını** öner (beğeni, paylaşım, hikâye, çevrim içi).
""",
  [(r"“Sınava bir gün kala ders çalışmaya başlayınca iş işten geçmişti.” cümlesindeki deyimi bulup anlamını yazınız.",
    r"**İş işten geçmek**: Bir şeyi yapmak ya da düzeltmek için uygun zamanın kaçmış olması."),
   (r"“Bugünkü toplantı postponed oldu, linki story'de paylaştım.” cümlesini söz varlığı açısından değerlendirip Türkçe karşılıklarla yeniden yazınız.",
    r"Cümlede gereksiz **yabancı sözcükler** (postponed, link, story) kullanılmıştır. Doğrusu: “Bugünkü toplantı **ertelendi**, **bağlantıyı hikâyede** paylaştım.” Türkçede karşılığı olan sözcüklerin kullanılması dilin zenginliğini korur.")],
  ["Söz varlığı: sözcük, deyim, atasözü, ikileme, kalıp söz, terim.", "Deyim mecazlı söz öbeği; atasözü öğüt veren özlü söz.", "Sosyal medya dili kısaltmalı ve kuralsız olabilir; Türkçe karşılıklar tercih edilmelidir."]),
],
}
