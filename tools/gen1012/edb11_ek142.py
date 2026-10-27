# -*- coding: utf-8 -*-
r"""11. Sınıf Türk Dili ve Edebiyatı — 1.43 eki: AYT edebiyat tarihi temelleri.
Metinler ve örnek dizeler özgün olarak yazılmıştır (alıntı yapılan klasik dizeler telif dışıdır); resmî ders kitabı ya da
program metni kopyalanmamıştır."""
from _c import O, U

YENI = [U("u5", "5. Tema (Ek): AYT Edebiyat Tarihi Temelleri", "Theme 5 (Extra): Foundations of Turkish Literary History", [

O("k1", "TDE.11.E1", "Şiir bilgisi: ölçü, kafiye, redif, nazım birimi", "Poetics: metre, rhyme, redif and stanza", r"""
# Nazım Birimi
Şiirin en küçük anlam ve yapı bölümüdür: **beyit** (iki dize, divan şiirinde temel birim), **dörtlük** (halk şiirinde), **bent** (beşten fazla dizeli bölümler).

# Ölçü (Vezin)
- **Hece ölçüsü (parmak hesabı):** Dizelerdeki hece **sayısının** eşitliğine dayanır; Türklerin millî ölçüsüdür. Duraklar dizeyi bölümlere ayırır (ör. 11'li: 6+5 ya da 4+4+3).
- **Aruz ölçüsü:** Hecelerin **açıklık–kapalılık** (uzunluk–kısalık) değerine dayanır; Arap ve Fars şiirinden alınmıştır, divan şiirinde kullanılır. Kapalı hece (uzun) "—", açık hece (kısa) "." ile gösterilir; ölçüyü sağlamak için **imale** (kısa heceyi uzatma) ve **zihaf** (uzunu kısaltma) yapılabilir.
- **Serbest şiir:** Ölçü ve uyak zorunluluğu yoktur (Nâzım Hikmet, Garipçiler).

# Kafiye (Uyak) ve Redif
- **Redif:** Dize sonlarında tekrarlanan **aynı görevdeki** ek, sözcük ya da söz öbekleri.
- **Kafiye:** Rediften önce gelen, yazılışı ve okunuşu aynı, anlamı farklı ses benzerliği.
| Kafiye türü | Benzeşen ses |
|---|---|
| **Yarım** | Tek ses (ör. a**ğ**ı – da**ğ**ı) |
| **Tam** | İki ses |
| **Zengin** | Üç ya da daha fazla ses |
| **Cinaslı** | Yazılışı aynı, anlamı farklı sözcükler |

> Bulma yöntemi: Dize sonundan geriye doğru **aynı görevli ekleri redif** olarak ayır; kalan benzer sesler kafiyedir.

# Kafiye Örgüsü
Düz (aaaa), çapraz (abab), sarma (abba), mani tipi (aaxa). Gazel ve kasidede **aa, xa, xa…** düzeni vardır.
""",
 [(r"“Gönül **dağı**nda açan çiçek / Yolun **ağı**nda kalan yürek” dizelerinde redif ve kafiyeyi bulunuz.",
   r"Sözcük sonlarındaki **-ında** iyelik + bulunma eki aynı görevde → **redif**. Kalan **dağ / ağ** sözcüklerindeki **ağ** sesleri → iki ses benzeşmesi, **tam kafiye**."),
  (r"Hece ölçüsü ile aruz ölçüsü arasındaki temel fark nedir?",
   r"Hece ölçüsü dizelerdeki **hece sayısına**, aruz ölçüsü hecelerin **uzunluk–kısalık (açık–kapalı)** değerine dayanır.")],
 [r"Beyit divan şiirinin, dörtlük halk şiirinin nazım birimidir.", r"Hece ölçüsü sayı eşitliğine, aruz açık–kapalı hece düzenine dayanır.",
  r"Redif aynı görevli ek/sözcük tekrarı; kafiye rediften önceki ses benzerliğidir.", r"Yarım uyak tek ses, tam uyak iki ses, zengin uyak üç ve daha fazla ses."]),

O("k2", "TDE.11.E2", "İslamiyet öncesi ve geçiş dönemi Türk edebiyatı", "Pre-Islamic and transitional Turkish literature", r"""
# İslamiyet Öncesi Türk Edebiyatı
**Sözlü dönem:** Ürünler törenlerde (sığır, şölen, yuğ) ortaya çıkar, **ozan, kam, baksı** gibi kişilerce **kopuz** eşliğinde söylenir; hece ölçüsü ve dörtlük kullanılır, **anonimdir**.
- **Koşuk:** Sığır törenlerinde söylenen, doğa ve aşk konulu lirik şiir (halk edebiyatındaki koşmanın atası).
- **Sagu:** Yuğ (yas) törenlerinde ölenin ardından söylenen ağıt (halk edebiyatındaki ağıtın atası). En bilinen örneği Alp Er Tunga Sagusu'dur.
- **Sav:** Atasözü. **Destan:** Toplumu derinden etkileyen olayların olağanüstü öğelerle anlatılması (Oğuz Kağan, Ergenekon, Türeyiş).
**Yazılı dönem:** **Orhun Yazıtları** (Göktürk), Uygur metinleri.

# Geçiş Dönemi (11–13. yüzyıllar)
Türklerin İslamiyet'i kabulüyle iki kültürün ortak ürünleri verilir; hem hece hem aruz, hem dörtlük hem beyit kullanılır.
| Eser | Yazar | Özelliği |
|---|---|---|
| **Kutadgu Bilig** | Yusuf Has Hacib | İlk siyasetname örneği; mutluluk veren bilgi, aruzla yazılmış ilk eser; mesnevi biçiminde |
| **Divânu Lugâti't-Türk** | Kaşgarlı Mahmud | Türkçe–Arapça sözlük; sözlü edebiyat örneklerini (koşuk, sagu, sav) içerir |
| **Atabetü'l-Hakayık** | Edip Ahmet Yükneki | Ahlak ve öğüt kitabı (didaktik) |
| **Divân-ı Hikmet** | Hoca Ahmet Yesevi | Tasavvufi hikmetler; hece ölçüsü ve dörtlük — tekke edebiyatının temeli |
| **Dede Korkut Hikâyeleri** | Anonim | Oğuzların hayatını anlatan, destandan halk hikâyesine geçişi gösteren 12 hikâye |
""",
 [(r"Divânu Lugâti't-Türk sözlü edebiyat açısından neden önemlidir?", r"İslamiyet öncesi **koşuk, sagu ve savları** derleyerek günümüze ulaştırmıştır."),
  (r"Dede Korkut Hikâyeleri hangi iki anlatı türü arasında köprü kabul edilir?", r"**Destan** ile **halk hikâyesi** arasında.")],
 [r"Sözlü dönem: koşuk (sığır), sagu (yuğ), sav, destan; ozanlar kopuzla söyler.", r"Geçiş dönemi: Kutadgu Bilig, Divânu Lugâti't-Türk, Atabetü'l-Hakayık, Divân-ı Hikmet.",
  r"Kutadgu Bilig aruzla yazılmış ilk Türkçe eser ve ilk siyasetnamedir.", r"Dede Korkut destandan halk hikâyesine geçiş örneğidir."]),

O("k3", "TDE.11.E3", "Halk edebiyatı: anonim, âşık ve tekke-tasavvuf edebiyatı", "Folk literature: anonymous, minstrel and Sufi traditions", r"""
# Ortak Özellikler
Hece ölçüsü, dörtlük nazım birimi, çoğunlukla **yarım uyak** ve redif, sade bir dil; sözlü gelenek.

# Anonim Halk Edebiyatı
Söyleyeni bilinmeyen, halkın ortak malı olan ürünler.
- **Mani:** Genellikle 7 heceli tek dörtlük; kafiye örgüsü **aaxa**; ilk iki dize çoğu zaman doldurmadır.
- **Türkü:** Ezgiyle söylenen, bölümleri **bent** ve **bağlama (nakarat)** olan şiir.
- **Ninni, ağıt, bilmece, tekerleme, masal, efsane, halk hikâyesi** (Kerem ile Aslı, Köroğlu).

# Âşık Edebiyatı
**Saz eşliğinde** şiir söyleyen, şiirin sonunda adını söyleyen (**tapşırma / mahlas**) âşıkların edebiyatı.
| Nazım biçimi | Özelliği |
|---|---|
| **Koşma** | 11'li hece, 3–5 dörtlük; aşk ve doğa (güzelleme), ölüm (ağıt), toplum eleştirisi (taşlama), kahramanlık (koçaklama) |
| **Semai** | 8'li hece, özel ezgi |
| **Varsağı** | 8'li hece, "bre, hey" gibi ünlemler, yiğitçe söyleyiş |
| **Destan** | Bir olayı (deprem, savaş) anlatan uzun koşma |
- Temsilciler: **Karacaoğlan** (doğa ve aşk), **Köroğlu** (koçaklama), **Dadaloğlu**, **Kayıkçı Kul Mustafa**, **Âşık Ömer**, **Gevherî**.

# Tekke-Tasavvuf Edebiyatı
Tasavvufi düşünceleri (**Allah sevgisi, insan sevgisi, nefsin terbiyesi**) halka sade dille anlatır; hem hece hem aruz kullanılır.
- Nazım biçimleri: **ilahi**, **nefes** (Bektaşi), **nutuk**, **devriye** (varlık döngüsü), **şathiye** (alaycı görünümlü derin anlam).
- Temsilciler: **Yunus Emre** (sade Türkçe, insan sevgisi), **Hacı Bayram Veli**, **Pir Sultan Abdal**, **Kaygusuz Abdal**.
""",
 [(r"Âşık edebiyatında şairin son dörtlükte adını söylemesine ne ad verilir?", r"**Tapşırma** (mahlas kullanımı)."),
  (r"Koşmanın konularına göre türlerini sayınız.", r"**Güzelleme** (aşk ve doğa), **koçaklama** (yiğitlik), **taşlama** (eleştiri), **ağıt** (ölüm).")],
 [r"Halk edebiyatı: hece ölçüsü, dörtlük, yarım uyak, sade dil.", r"Anonim: mani (aaxa), türkü (bent + bağlama), masal, efsane.",
  r"Âşık: koşma (11'li), semai ve varsağı (8'li); Karacaoğlan, Dadaloğlu.", r"Tekke: ilahi, nefes, nutuk, devriye, şathiye; Yunus Emre, Pir Sultan Abdal."]),

O("k4", "TDE.11.E4", "Divan edebiyatı: özellikleri, nazım biçimleri ve şairleri", "Divan literature: features, verse forms and poets", r"""
# Genel Özellikler
13. yüzyıldan Tanzimat'a kadar süren, saray ve çevresinde gelişen, **Arap ve Fars** edebiyatlarının etkisindeki **yazılı** edebiyattır.
- **Aruz ölçüsü**, **beyit** nazım birimi; dil ağır, Arapça ve Farsça sözcük ve tamlamalar yoğundur.
- Şiirde **mazmun** (kalıplaşmış benzetmeler: sevgilinin boyu servi, dudağı gonca) ve **söz sanatları** çok kullanılır; **parça güzelliği** (her beytin kendi içinde anlamca bağımsız olması) esastır.
- Şiirler **divan** adlı kitaplarda toplanır.

# Nazım Biçimleri
| Biçim | Özellik |
|---|---|
| **Gazel** | 5–15 beyit, aşk ve şarap; aa xa xa…; ilk beyit **matla**, son beyit (şairin mahlası) **makta**, en güzel beyit **beytü'l-gazel** |
| **Kaside** | Din ve devlet büyüklerini öven uzun şiir; bölümleri: nesib (giriş), girizgâh, methiye, fahriye, dua. Allah'ı öven **tevhid**, Peygamber'i öven **naat** |
| **Mesnevi** | Her beyti kendi arasında kafiyeli, uzun konuların anlatıldığı biçim (aa bb cc); "hamse" beş mesnevi demektir |
| **Rubai** | Tek dörtlük, felsefi ve tasavvufi; aaxa, özel aruz kalıpları |
| **Tuyuğ** | Türklerin divan şiirine kattığı tek dörtlük; aaxa, *fâilâtün fâilâtün fâilün* kalıbı |
| **Şarkı** | Bestelenmek için yazılan, nakaratlı (Nedîm) |

# Önemli Şairler
- **Fuzûlî** (16. yy): Aşk ve ıstırap; Leylâ vü Mecnûn, Su Kasidesi.
- **Bâkî** (16. yy): "Sultânü'ş-şuarâ", İstanbul Türkçesi ve sanatlı söyleyiş; Kanuni Mersiyesi.
- **Nef'î** (17. yy): Kaside ustası, hiciv (Sihâm-ı Kazâ).
- **Nedîm** (18. yy, Lale Devri): **Mahallîleşme**, İstanbul hayatı, şarkı türü.
- **Şeyh Gâlib** (18. yy): Sebk-i Hindî ve tasavvuf; Hüsn ü Aşk.
- Nesirde: **Evliya Çelebi** (Seyahatname), **Katip Çelebi**, **Sinan Paşa** (Tazarruname).
""",
 [(r"Gazelin ilk ve son beyitleri nasıl adlandırılır?", r"İlk beyit **matla**, şairin mahlasının geçtiği son beyit **makta**dır."),
  (r"Türklerin divan edebiyatına kazandırdığı nazım biçimi hangisidir?", r"**Tuyuğ**.")],
 [r"Divan edebiyatı: aruz, beyit, mazmun, parça güzelliği, ağır dil.", r"Gazel (matla, makta), kaside (tevhid, naat), mesnevi (aa bb cc), rubai, tuyuğ, şarkı.",
  r"Fuzûlî aşk ve ıstırap; Bâkî sultânü'ş-şuarâ; Nedîm mahallîleşme ve şarkı; Şeyh Gâlib sebk-i Hindî.", r"Tuyuğ Türklerin divan şiirine kattığı biçimdir."]),
])]
