# -*- coding: utf-8 -*-
r"""10. Sınıf Türk Dili ve Edebiyatı — 1.36.0: Maarif programının temalarındaki eksik dil bilgisi (isim–sıfat–
tamlamalar; zamir–edat–bağlaç–ünlem; zarflar ve anlam ilişkileri), dinleme/izleme ve sözlü üretim (şiir dinletisi,
film şeridi, podcast), yazma atölyeleri (bilgilendirici metni edebî metne dönüştürme, özgün fabl) ve ara metin
(Servetifünun romanı, Fecriati şiiri) kazanımları; her kazanıma ikinci çözümlü örnek.
Kaynak: tymm.meb.gov.tr Türk Dili ve Edebiyatı 10. Sınıf tema sayfaları."""
from common import O

ANLATIM = {
"u1/k4": r"""
# Masalı Okurken Dikkat Edilecekler
- **Olağanüstülük:** Konuşan hayvanlar, devler, periler, sihirli nesneler; masal dünyasında **inandırıcılık** aranmaz.
- **Kalıp ifadeler ve sayılar:** \"Üç\", \"yedi\", \"kırk\" gibi sayılar ve tekrar eden tekerlemeler sözlü geleneğin izleridir.
- **İyi–kötü çatışması:** Masallarda iyiler ödüllendirilir, kötüler cezalandırılır; **mutlu son** yaygındır.
- **Derleyiciler:** Türk masallarını Pertev Naili Boratav ve Eflatun Cem Güney derlemiş; Batı'da Grimm Kardeşler ve Andersen öne çıkmıştır.
""",
"u2/k3": r"""
# Saf Şiirin Ses ve Biçim Özellikleri
Saf şiirde anlamdan çok **ses uyumu**, **iç ahenk**, **imge** ve **kapalı anlatım** önemlidir. Kelimeler, sözlük anlamlarının ötesinde okurda **çağrışımlar** uyandırmak için seçilir. Bu anlayış Fransız sembolistlerinden (Mallarmé, Valéry) etkilenmiş; Türk şiirinde **Ahmet Haşim**, **Yahya Kemal**, **Ahmet Hamdi Tanpınar** ve **Necip Fazıl** gibi şairlerde farklı biçimlerde görülmüştür.

**Şiir çözümlerken sorulacak sorular:** Şiirin ahengini hangi ses tekrarları sağlıyor? Hangi imgeler okurda hangi duyguyu uyandırıyor? Şiirdeki \"ben\" (şiir kişisi) nasıl bir ruh hâli içinde?
""",
"u3/k1": r"""
# Türk Destanları ve Dönemleri
| Dönem | Destanlar |
|---|---|
| **İslamiyet öncesi** | Alp Er Tunga, Şu, Oğuz Kağan, Göktürk (Bozkurt ve Ergenekon), Uygur (Türeyiş ve Göç) |
| **İslamiyet sonrası** | Satuk Buğra Han, Manas (Kırgız), Cengiz, Battal Gazi, Danişmend, Köroğlu |

Destanlarda **olağanüstü doğum**, **göğe yükselme**, **kutsal hayvan** (kurt, geyik), **ışık ve ağaç** motifleri sık görülür. Bu motifler milletin **ortak hafızasını** ve değerlerini yansıtır.
""",
"u3/k4": r"""
# Fabl Yazarken
1. **Ders (öğüt) belirle:** Örneğin *\"Acele işe şeytan karışır.\"*
2. **Kişileri seç:** Değere uygun özellikleri temsil eden hayvanlar (sabırlı kaplumbağa, kurnaz tilki).
3. **Olay örgüsü kur:** Serim–düğüm–çözüm; diyaloglarla hayvanları **konuştur** (intak).
4. **Dersi sezdir ya da açıkça yaz:** Fablın sonunda kıssadan hisse verilir.

**La Fontaine** fablları manzum, sade ve diyaloglu; **Kelile ve Dimne** ise iç içe geçen hikâyelerle (çerçeve hikâye) yazılmıştır.
""",
}

ORNEK = {
"u1/k1": [(r"Aşağıdaki dizelerde ahengi sağlayan kafiye ve redifi bulunuz:\n\"Bahar geldi, dağlar yeşil giyindi / Dereler coşup ovaya indi\" (özgün örnek)",
           r"Dize sonlarında **giyin-di / in-di**. \"-di\" **ek hâlindeki redif**tir (aynı görevli ek). Redifin önündeki **\"-in\"** sesleri **yarım kafiye** değil, iki ses benzerliği olduğundan **tam kafiye**dir. Ayrıca \"d\" sesinin tekrarı (**aliterasyon**) ahengi güçlendirir.".replace("\\n", "\n"))],
"u1/k2": [(r"Türk dilinin tarihî dönemlerini sırasıyla yazınız. Koşuklar hangi dönemin ürünüdür?",
           r"**Altay Dönemi → En Eski Türkçe → İlk Türkçe → Eski Türkçe** (Göktürk ve Uygur) → **Orta Türkçe** (Karahanlı, Harezm, Kıpçak) → **Yeni Türkçe** (Eski Anadolu Türkçesi, Osmanlı Türkçesi, Türkiye Türkçesi). Koşuklar **İslamiyet öncesi** sözlü geleneğin ürünüdür; örnekleri **Divanü Lügati't-Türk**'te (Karahanlı Türkçesi) yazıya geçirilmiştir.")],
"u1/k3": [(r"Türkülerin \"bağlama\" ve \"kavuştak\" bölümleri nedir? Türkü ile mani arasındaki temel farkı yazınız.",
           r"Türkü **bent** (asıl söz bölümü) ve **bağlama/kavuştak** (her bentten sonra tekrarlanan nakarat) bölümlerinden oluşur. Türküler **bir ezgiyle** söylenmek için yazılır ve anonimdir; **mani** ise genellikle 7 heceli **dört dizelik** tek bir birimdir, söyleyeni çoğu zaman bilinmez ve kendi başına tamamlanmış bir duygu ya da düşünce aktarır.")],
"u1/k4": [(r"Bir masalın giriş tekerlemesinde \"Evvel zaman içinde, kalbur saman içinde...\" denmesinin işlevi nedir?",
           r"Bu bölüm **döşeme**dir: Dinleyiciyi **masal dünyasına hazırlar**, olayların gerçek bir zamanda değil, **belirsiz ve hayalî** bir zamanda geçtiğini sezdirir. Kalıplaşmış, ses oyunlarına dayalı söyleyişi dinleyicinin ilgisini çeker.")],
"u2/k2": [(r"Bir kasidenin bölümlerini sırasıyla yazınız. Su Kasîdesi'nde nesib (teşbib) bölümünün işlevi nedir?",
           r"**Nesib (teşbib) → girizgâh → methiye → fahriye → tegazzül → dua.** Su Kasîdesi bir **na't** (Hz. Peygamber'e övgü) olduğundan nesib bölümünde **su** redifi etrafında hazırlayıcı bir tablo çizilir; şair gözyaşı, özlem ve su imgeleriyle övgü bölümüne **geçişi hazırlar**.")],
"u2/k3": [(r"\"Gece, şehri karanlık bir pelerinle örttü.\" (özgün cümle) ifadesindeki imgeyi ve söz sanatını açıklayınız. Bu kullanım saf şiir anlayışına nasıl uyar?",
           r"Gece **kişileştirilmiş** (teşhis) ve **pelerin** benzetmesiyle (istiare) karanlığın şehri sarışı somut bir görüntüye dönüştürülmüştür. Saf şiir, düşünceyi açıkça söylemek yerine bu tür **imge ve çağrışımlarla** duygu uyandırmayı amaçlar.")],
"u2/k4": [(r"Söyleşi ile deneme arasındaki benzerlik ve farkları yazınız.",
           r"**Benzerlik:** İkisi de yazarın kişisel görüşlerini **kesin hükümlere varmadan** anlatır; kanıtlama amacı yoktur. **Fark:** Söyleşide yazar okurla **karşısındaymış gibi konuşur**; soru sorar, \"siz\" diye seslenir, dil **daha samimi ve konuşma diline yakındır**. Denemede ise yazar daha çok **kendi kendine düşünür**, üslup daha derli topludur.")],
"u3/k1": [(r"Destan, efsane ve masal türlerini kahraman, gerçeklik ve işlev bakımından karşılaştırınız.",
           r"**Destan:** Toplumu ilgilendiren olağanüstü kahramanlar, tarihî bir olay çekirdeği, millî bilinci güçlendirme işlevi. **Efsane:** Bir yerin, varlığın ya da olayın oluşumunu olağanüstü yolla açıklar; anlatılanların gerçek olduğuna **inanılır**. **Masal:** Tamamen **hayalî**, zaman–mekân belirsiz, eğlendirip eğitme amaçlı; gerçek olduğuna inanılmaz.")],
"u3/k2": [(r"Oğuz Kağan Destanı'nda Oğuz'un çocuklarına verdiği adlar (Gün, Ay, Yıldız, Gök, Dağ, Deniz) neyi simgeler?",
           r"Bu adlar Türklerin **doğa ve gökle ilgili** eski inançlarını yansıtır. Ayrıca destanda oğullar **Bozoklar** (Gün, Ay, Yıldız — büyükler, sağ kol) ve **Üçoklar** (Gök, Dağ, Deniz — küçükler, sol kol) olarak ikiye ayrılır; bu, **Oğuz boylarının teşkilatı** ve devlet düzeninin destana yansımasıdır.")],
"u3/k3": [(r"Mesnevi nazım biçiminin uzun hikâyeleri anlatmaya neden uygun olduğunu açıklayınız.",
           r"Mesnevide her beyit **kendi içinde kafiyelidir** (aa, bb, cc…). Şair her beyitte yeni bir kafiye kullanabildiği için **beyit sayısı sınırı yoktur**; bu da uzun olay örgülerinin, aşk hikâyelerinin ve öğretici konuların anlatılmasını kolaylaştırır. Harnâme ve Mesnevî bu biçimle yazılmıştır.")],
"u3/k4": [(r"\"Tilki ile Üzüm\" fablında üzümlere ulaşamayan tilkinin \"Zaten ekşiydi.\" demesi hangi insan davranışını eleştirir?",
           r"Ulaşamadığı şeyi **küçümseyerek** başarısızlığını örtme, kendini kandırma davranışını eleştirir (psikolojide \"ekşi üzüm\" savunması). Fabl hayvan kahraman üzerinden **evrensel bir insan zaafını** gösterir.")],
"u4/k1": [(r"Dede Korkut Hikâyelerinde \"soylama\" bölümlerinin işlevi nedir?",
           r"Soylamalar, olayın **heyecanlı ya da duygusal** anlarında söylenen, **ahenkli, ritmik ve süslü** söz bölümleridir. Kahramanın övülmesi, yakarışlar ve meydan okumalar soylamalarla anlatılır; sözlü anlatım geleneğinin **ozan üslubunu** yansıtır.")],
"u4/k2": [(r"Tanzimat şiirinin Divan şiirinden ayrıldığı yönleri konu ve dil bakımından açıklayınız.",
           r"**Konu:** Divan şiirinin soyut aşk ve tasavvuf temaları yerine **hürriyet, vatan, adalet, kanun, millet** gibi toplumsal konular işlenmiştir. **Dil:** Şinasi ve Namık Kemal'de sadeleşme çabası başlasa da dil hâlâ **ağırdır**; biçim çoğu zaman Divan nazım şekilleriyle (gazel, kaside) sürmüştür. Bu yüzden Tanzimat şiiri için **\"eski şekil, yeni muhteva\"** denir.")],
"u4/k3": [(r"Ömer Seyfettin'in hikâyeciliğinin Türk edebiyatına katkılarını yazınız.",
           r"**Sade, konuşma diline yakın** Türkçesiyle \"Yeni Lisan\" hareketinin öncüsüdür. Olay hikâyesi (Maupassant tarzı) türünün **ustası**dır; **millî duyguları** işleyen tarihî hikâyelerin yanı sıra çocukluk anıları ve mizahi hikâyeler yazmıştır. Hikâyeleri sürükleyici kurgusu ve **beklenmedik sonlarıyla** geniş okur kitlesine ulaşmıştır.")],
"u4/k4": [(r"\"Yazıp sildi, sonra pencereden dışarı baktı.\" cümlesindeki fiilleri yapı bakımından inceleyiniz.",
           r"**yaz-ıp sil-di:** \"sil-\" **basit** fiil (kök + çekim eki). \"yazıp\" zarf-fiildir. **bak-tı:** basit fiil. Cümlede **türemiş** (yapım eki almış) ya da **birleşik** fiil yoktur. Karşılaştırma için: \"temiz-le-di\" türemiş, \"yardım et-ti\" birleşik fiildir.")],
}

OZET = {}

EK = {
"u1": [
O("k5", "1.5", "İsim, sıfat ve tamlamalar (isim ve sıfat tamlaması)", "Nouns, adjectives and noun/adjective phrases", r"""
# İsim (Ad)
Varlıkları, kavramları karşılayan kelimelerdir.
| Ölçüt | Türler | Örnek |
|---|---|---|
| Varlıklara verilişi | **Özel / cins** | Ankara, Kızılırmak / şehir, ırmak |
| Varlıkların niteliği | **Somut / soyut** | kalem, rüzgâr / sevgi, özlem |
| Sayısı | **Tekil / çoğul / topluluk** | ağaç / ağaçlar / orman, ordu |
| Yapısı | **Basit / türemiş / birleşik** | göz / gözlük / Kuşadası |

# Sıfat (Ön Ad)
İsimlerden önce gelerek onları **niteleyen** ya da **belirten** kelimelerdir.
- **Niteleme sıfatı:** *kırmızı* elma, *yorgun* yolcu (\"nasıl?\" sorusuna cevap)
- **Belirtme sıfatları:** **İşaret** (*bu* ev), **sayı** (*üç* kitap, *ikinci* sıra, *yarım* ekmek, *üçer* elma), **belgisiz** (*bazı* insanlar, *her* gün), **soru** (*hangi* yol?)
- Sıfat, isimden sonra gelirse **sıfat olmaktan çıkar**: \"Elma *kırmızı*.\" (yüklem)
- Sıfatlar **isim yerine** kullanılırsa **adlaşmış sıfat** olur: \"*Gençler* geldi.\"

# İsim Tamlaması
İki ya da daha çok ismin anlam ilgisi kurarak oluşturduğu kelime grubu (**tamlayan + tamlanan**):
| Tür | Yapı | Örnek |
|---|---|---|
| **Belirtili** | -ın + -ı | *kapının* kolu |
| **Belirtisiz** | Ø + -ı | *kapı* kolu |
| **Takısız** | Ø + Ø | *demir* kapı (malzeme) |
| **Zincirleme** | En az üç isim | *evin bahçe kapısı* |

# Sıfat Tamlaması
Sıfat + isim: *uzun* yol, *bu* şehir, *beş* kardeş. Sıfat tamlaması, isim tamlamasının unsuru olabilir: \"*eski evin* kapısı\".

# Edebî Metinde İşlevi
Niteleme sıfatları ve tamlamalar şiirde **imge** ve **betimleme** kurmanın temel araçlarıdır: \"*mavi* deniz\" yerine \"*denizin* hüzünlü *maviliği*\" ifadesi anlatımı derinleştirir.
""",
  [(r"\"Köyün eski çeşmesinden akan buz gibi su, yorgun yolculara can verdi.\" cümlesindeki tamlamaları ve türlerini bulunuz.",
    r"**\"köyün çeşmesi\"** → belirtili isim tamlaması (araya sıfat girmiş: köyün **eski** çeşmesi). **\"eski çeşme\"** → sıfat tamlaması. **\"buz gibi su\"** → sıfat tamlaması (buz gibi: niteleme sıfatı görevli söz öbeği). **\"yorgun yolcular\"** → sıfat tamlaması."),
   (r"\"Bazı öğrenciler ikinci sınavda üçer soru çözdü.\" cümlesindeki sıfatları türleriyle belirtiniz.",
    r"**bazı** → belgisiz sıfat; **ikinci** → sıra sayı sıfatı; **üçer** → üleştirme sayı sıfatı. Cümlede niteleme sıfatı yoktur; tümü **belirtme sıfatıdır**.")],
  ["İsimler özel–cins, somut–soyut, tekil–çoğul–topluluk ve yapıca basit–türemiş–birleşik olarak ayrılır.", "Sıfatlar niteleme ve belirtme (işaret, sayı, belgisiz, soru) sıfatlarıdır.", "İsim tamlaması: belirtili, belirtisiz, takısız, zincirleme; sıfat tamlaması: sıfat + isim.", "Sıfat ve tamlamalar edebî metinlerde betimleme ve imge oluşturur."]),
O("k6", "1.6", "Dinleme/izleme ve sözlü sunum: şiir dinletisi ve film şeridi", "Listening/viewing and oral presentation: poetry recital and filmstrip", r"""
# Şiir Dinletisi
Şiirin **sesli ve etkili okunarak** dinleyiciye ulaştırıldığı etkinliktir. Şiir, ahenk unsurlarıyla yazıldığı için ancak **sesli okununca** tam etkisini gösterir.

**Hazırlık ve sunum:**
1. Şiiri birkaç kez oku; **anlamını ve duygusunu** kavra.
2. **Vurgu, tonlama ve duraklama** yerlerini işaretle (dize sonu her zaman durak değildir!).
3. Sesin **hızını ve şiddetini** şiirin duygusuna göre ayarla: coşkulu bir şiir yüksek ve hızlı, hüzünlü bir şiir yavaş ve alçak tonda okunur.
4. **Beden dili:** Dik duruş, göz teması, doğal jest ve mimikler.
5. Gerekirse şiirin ruhuna uygun **fon müziği** kullan; müzik sesi bastırmamalıdır.

# Film Şeridi (Kısa Film/Video) İzleme
Film şeridi, görüntü, ses, müzik ve yazının birlikte kullanıldığı **çok modlu** bir metindir. İzlerken:
- **Konu ve ana fikri** belirle; görüntülerin hangi duyguyu uyandırdığını düşün.
- **Kamera açıları** (yakın plan duyguyu, geniş plan mekânı öne çıkarır), **renk ve ışık**, **müzik** anlamı nasıl destekliyor?
- Not al; izledikten sonra **özet** çıkar ve görüşünü gerekçeleriyle paylaş.

# Kendi Film Şeridini Hazırla
Bir şiir ya da türkünün anlattığı duyguyu **görsellerle** anlatan 1–2 dakikalık bir video tasarla: **senaryo (sahne listesi) → görsel ve ses seçimi → kurgu → altyazı → paylaşım**. Kullanılan görsel ve müziklerin **telif ve kaynak** bilgisine dikkat et; mümkünse kendi çektiğin görüntüleri kullan.
""",
  [(r"Bir arkadaşınız şiiri her dize sonunda durarak ve tek düze bir sesle okuyor. Ona hangi önerilerde bulunursunuz?",
    r"1) Anlam dize sonunda bitmiyorsa **durmadan bir sonraki dizeye geçmesini** (anlam bütünlüğüne göre duraklama), 2) önemli kelimeleri **vurgulamasını**, 3) şiirin duygusuna göre sesini **yükseltip alçaltmasını** ve hızını değiştirmesini (tonlama), 4) göz teması ve doğal jestlerle **dinleyiciyle bağ kurmasını** öneririm."),
   (r"Bir kısa filmde kahramanın yüzü yakın planda, gri ve soluk renklerle gösteriliyor; arka planda yavaş bir piyano ezgisi çalıyor. Bu tercihler izleyicide nasıl bir etki bırakır?",
    r"**Yakın plan** izleyicinin kahramanın **duygusuna odaklanmasını** sağlar; **gri–soluk renkler** ve **yavaş ezgi** hüzün, yalnızlık ya da kayıp duygusu uyandırır. Çok modlu metinde görüntü, renk ve müzik **aynı anlamı birlikte** kurar.")],
  ["Şiir dinletisinde vurgu, tonlama, duraklama, ses hızı ve beden dili şiirin duygusuna göre ayarlanır.", "Dize sonu her zaman durak değildir; anlam bütünlüğüne göre durulur.", "Film şeridi çok modlu bir metindir: görüntü, kamera açısı, renk, müzik ve yazı anlamı birlikte kurar.", "Kendi videonu hazırlarken senaryo–görsel–kurgu–altyazı adımlarını izle, telif ve kaynağa dikkat et."]),
],
"u2": [
O("k5", "2.5", "Zamir, edat, bağlaç ve ünlem", "Pronouns, postpositions, conjunctions and interjections", r"""
# Zamir (Adıl)
İsimlerin **yerini tutan** kelimelerdir.
| Tür | Örnek |
|---|---|
| **Kişi zamiri** | ben, sen, o, biz, siz, onlar; **dönüşlülük:** kendi |
| **İşaret zamiri** | bu, şu, o, bunlar, öteki, beriki |
| **Belgisiz zamir** | biri, kimi, hepsi, birkaçı, herkes, bazısı |
| **Soru zamiri** | kim, ne, hangisi, kaçı, nere(si) |
| **İlgi zamiri** | -ki: \"Benim kalemim kırık, *seninki* sağlam.\" |
| **İyelik zamiri** | -ım, -ın, -ı… ekleri: kitab*ım* |

**Dikkat:** \"*Bu* kitap\" → işaret **sıfatı** (isimden önce gelir); \"*Bu* benim.\" → işaret **zamiri** (ismin yerini tutar).

# Edat (İlgeç)
Tek başına anlamı olmayan, kelimeler arasında **anlam ilgisi** kuran kelimelerdir: *gibi, kadar, için, ile, göre, karşı, doğru, sonra, önce, beri, dolayı, rağmen, üzere, yalnız, ancak*.
- \"Kar *gibi* beyaz\" (benzetme), \"Sabaha *kadar* çalıştı\" (sınır), \"Senin *için* geldim\" (amaç).

# Bağlaç
Kelimeleri, kelime gruplarını ve cümleleri **anlamca birbirine bağlayan** kelimelerdir: *ve, veya, ile, ama, fakat, çünkü, ki, de/da, ya da, hem…hem, ne…ne, ya…ya, ise, oysa, yoksa, ancak, yalnız, madem*.
- **\"de/da\" bağlacı ayrı yazılır**: \"Sen *de* gel.\" (Ek olan \"-de/-da\" bitişik yazılır: \"Okul*da*.\")
- **\"ki\" bağlacı ayrı yazılır**: \"Öyle yorgunum *ki*...\"

**ile:** Yerine \"ve\" getirilebiliyorsa **bağlaç**, \"birlikte/aracılığıyla\" anlamındaysa **edat**tır: \"Ali *ile* Ayşe geldi.\" (bağlaç) / \"Trenle geldi.\" (edat).

# Ünlem
Sevinç, korku, şaşkınlık, acı gibi **duyguları** ya da seslenmeleri ifade eden kelimelerdir: *Ah! Eyvah! Hey! Aman! Of! Vay! Yaşasın! Ey!*
- Ünlemden sonra genellikle **ünlem işareti (!)** konur.

# Metindeki İşlevleri
Zamirler **tekrarı önler**, bağlaçlar ve edatlar cümleler arasında **neden–sonuç, karşıtlık, amaç** gibi anlam ilişkileri kurarak metnin **bağdaşıklığını** sağlar; ünlemler anlatıma **duygu ve canlılık** katar.
""",
  [(r"\"Ah, ben de seninle gelmek isterdim ama annem izin vermedi.\" cümlesindeki zamir, edat, bağlaç ve ünlemleri bulunuz.",
    r"**Ünlem:** Ah. **Zamir:** ben, (sen-in-le: \"sen\" kişi zamiri). **Bağlaç:** de (ayrı yazılmış), ama. **Edat:** ile (\"seninle\" — \"birlikte\" anlamında). \"annem\" isim, \"izin\" isimdir."),
   (r"\"Kitabını bana ver, benimki evde kaldı.\" ve \"Bu kitabı okudun mu?\" cümlelerindeki altı çizili sözcükler (benimki, bu) hangi türdendir?",
    r"**benimki** → ilgi zamiri \"-ki\" ile oluşmuş zamir (\"benim kitabım\" yerine). **bu** → işaret **sıfatı**; çünkü \"kitap\" isminden önce gelerek onu belirtmektedir. \"Bunu okudun mu?\" deseydik **işaret zamiri** olurdu.")],
  ["Zamirler ismin yerini tutar: kişi, işaret, belgisiz, soru, ilgi (-ki), iyelik.", "Edatlar tek başına anlamsızdır; kelimeler arasında ilgi kurar (gibi, kadar, için, ile…).", "Bağlaçlar kelime ve cümleleri bağlar; \"de/da\" ve \"ki\" bağlaçları ayrı yazılır.", "Ünlemler duygu ve seslenme bildirir; metne canlılık katar."]),
O("k6", "2.6", "Sesli yayın (podcast) hazırlama ve bilgilendirici metni edebî metne dönüştürme", "Preparing a podcast and turning an informative text into a literary one", r"""
# Podcast (Sesli Yayın)
İnternet üzerinden dinlenen, belirli bir konuda hazırlanan **ses kaydıdır**. Söyleşi, haber, hikâye anlatımı ya da kitap tanıtımı biçiminde olabilir. Dinleyici yalnızca sese odaklandığı için **açık, akıcı ve ilgi çekici** bir dil gerekir.

**Hazırlık basamakları:**
1. **Konu ve hedef kitle:** Ör. \"Divan şiirinde su imgesi\" — lise öğrencilerine yönelik 5 dakikalık bölüm.
2. **Metin/akış planı:** Giriş (kendini ve konuyu tanıt) → gelişme (bilgiler, örnekler, varsa konukla söyleşi) → sonuç (özet ve dinleyiciye soru).
3. **Kayıt:** Sessiz bir ortam, telefon ya da mikrofon; doğal ve canlı bir ses tonu.
4. **Düzenleme:** Gereksiz duraklamaları kes, giriş–çıkış müziği ekle (telifsiz).
5. **Yayın ve geri bildirim.**

# Bilgilendirici Metinden Edebî Metne
Aynı konu farklı amaçlarla farklı metin türlerinde yazılabilir:
| | Bilgilendirici metin | Edebî metin |
|---|---|---|
| Amaç | Bilgi vermek | Estetik zevk, duygu uyandırmak |
| Dil | **Göndergesel**, açık, tek anlamlı | **Şiirsel/sanatsal**, imgeli, çok anlamlı |
| Gerçeklik | Gerçek bilgiler | Kurmaca dünya |
| Anlatım | Tanımlama, örnekleme, sayısal veriler | Betimleme, öyküleme, söz sanatları |

**Dönüştürme adımları:** Bilgilendirici metnin **temel bilgisini** koru → bir **bakış açısı ve anlatıcı** seç (ör. suyun ağzından) → bilgileri **duyulara hitap eden betimlemelere** dönüştür → **kişileştirme, benzetme** gibi söz sanatları ekle → bir **duygu ya da düşünceyle** bitir.
""",
  [(r"\"Su, 100 °C'de kaynar ve buhar olarak atmosfere yükselir; burada yoğunlaşarak bulutları oluşturur.\" bilgilendirici cümlesini edebî bir anlatıma dönüştürünüz.",
    r"Örnek dönüşüm: *\"Kazanın dibinde sabırsızca kaynayan su, bir gün gökyüzüne kavuşmak için hafifledi; incecik bir buhar olup göğe süzüldü, orada başka damlalarla el ele verip yağmuru bekleyen bembeyaz bir bulut oldu.\"* Bilgi korunmuş; **kişileştirme**, **betimleme** ve duygu katılarak anlatım edebîleştirilmiştir."),
   (r"Okulunuzun podcast kanalı için \"Dede Korkut'tan Bugüne Değerler\" konulu 5 dakikalık bir bölümün akış planını yazınız.",
    r"**0:00–0:30** Giriş müziği, kendini ve konuyu tanıtma. **0:30–1:30** Dede Korkut Hikâyeleri'nin kısa tanıtımı. **1:30–3:30** Bir boydan (ör. Salur Kazan) özetlenmiş sahne ve öne çıkan değerler (cesaret, misafirperverlik, aile). **3:30–4:30** Bu değerlerin bugünkü karşılıkları; bir arkadaşla kısa söyleşi. **4:30–5:00** Özet, dinleyiciye soru ve kapanış müziği.")],
  ["Podcast: konu ve hedef kitle → akış planı → kayıt → düzenleme → yayın.", "Sesli yayında dil açık, akıcı ve canlı olmalıdır.", "Bilgilendirici metin göndergesel dille bilgi verir; edebî metin imgeli dille duygu uyandırır.", "Dönüştürmede bilgi korunur; anlatıcı, betimleme ve söz sanatları eklenir."]),
],
"u3": [
O("k5", "3.5", "Zarflar ve cümlede neden–sonuç, amaç–sonuç, koşul ilişkileri", "Adverbs and cause–effect, purpose and condition relations in sentences", r"""
# Zarf (Belirteç)
Fiilleri, fiilimsileri, sıfatları ya da başka zarfları **zaman, durum, miktar, yer–yön ve soru** bakımından niteleyen kelimelerdir.
| Tür | Soru | Örnek |
|---|---|---|
| **Zaman** | Ne zaman? | *Yarın* gelecek. *Akşam* döndü. |
| **Durum (hâl)** | Nasıl? | *Hızlı* koştu. *Usulca* kapıyı açtı. |
| **Miktar (azlık–çokluk)** | Ne kadar? | *Çok* çalıştı. *En* güzel çiçek. |
| **Yer–yön** | Nereye? | *Aşağı* indi. *İçeri* girdi. (Yalnızca ek almamış yön kelimeleri) |
| **Soru** | — | *Niçin* gelmedin? *Nasıl* yaptın? |

**Dikkat:** \"*Güzel* kız\" → sıfat (ismi niteler); \"*Güzel* konuştu\" → zarf (fiili niteler).

# Cümlede Anlam İlişkileri
| İlişki | Tanım | Örnek |
|---|---|---|
| **Neden–sonuç** | Yargının **gerçekleşme nedeni** belirtilir | \"Yağmur yağdığı *için* maç ertelendi.\" |
| **Amaç–sonuç** | Yargının **hangi amaçla** yapıldığı belirtilir | \"Sınavı kazanmak *için* çok çalıştı.\" |
| **Koşul–sonuç** | Yargı bir **şarta** bağlanır | \"Erken kalk*arsan* otobüsü yakalarsın.\" |

**Neden mi, amaç mı?** \"…için\" ifadesinin önüne **\"-mek amacıyla\"** konabiliyorsa amaç–sonuç, **\"-dığı için / yüzünden\"** anlamı varsa neden–sonuç vardır. Neden–sonuçta eylem **gerçekleşmiştir**; amaç–sonuçta amaç henüz **hedeftir**.

**Neden–sonuç bildiren yapılar:** -dığı için, -dan dolayı, -dan, -ınca, çünkü, bu yüzden, -mesi sonucunda.
**Koşul bildiren yapılar:** -se/-sa, -dıkça, -madıkça, -mesi hâlinde, yeter ki, mademki, şayet.

# Metinde İşlevi
Bu ilişkiler, özellikle **tartışmacı ve açıklayıcı** metinlerde düşüncelerin **gerekçelendirilmesini** ve paragrafların mantıklı biçimde birbirine bağlanmasını sağlar.
""",
  [(r"\"Hava çok soğuk olduğundan çocuklar dışarı çıkmadı; yarın hava ısınırsa parka gidecekler.\" cümlesindeki zarfları ve anlam ilişkilerini bulunuz.",
    r"**Zarflar:** *çok* (miktar zarfı, \"soğuk\" sıfatını niteler), *dışarı* (yer–yön zarfı), *yarın* (zaman zarfı). **Anlam ilişkileri:** \"soğuk olduğundan\" → **neden–sonuç**; \"ısınırsa\" → **koşul–sonuç**."),
   (r"\"Ödevini bitirmek için erken kalktı.\" ve \"Ödevini bitirdiği için rahatladı.\" cümlelerini anlam ilişkisi bakımından karşılaştırınız.",
    r"İlk cümlede ödevi bitirmek **hedeftir**, henüz gerçekleşmemiştir → **amaç–sonuç** (\"bitirmek amacıyla\"). İkinci cümlede ödev **bitmiştir** ve rahatlamanın **nedenidir** → **neden–sonuç** (\"bitirdiği için / bitirdiğinden\").")],
  ["Zarflar fiil, sıfat ve zarfları zaman, durum, miktar, yer–yön ve soru bakımından niteler.", "Aynı kelime ismi niteliyorsa sıfat, fiili niteliyorsa zarftır.", "Neden–sonuçta eylem gerçekleşmiştir; amaç–sonuçta amaç hedeftir; koşul–sonuçta yargı şarta bağlıdır.", "Bu ilişkiler tartışmacı metinlerde düşünceyi gerekçelendirir."]),
O("k6", "3.6", "Yazma atölyesi: özgün fabl yazma ve Türk destanları üzerine sunum", "Writing workshop: an original fable and a presentation on Turkish epics", r"""
# Özgün Fabl Yazma
**1. Planlama:** Vermek istediğin **dersi** (öğüt) bir cümleyle yaz. Bu dersi temsil edecek **hayvan karakterleri** ve onların baskın özelliklerini seç.
**2. Taslak:**
- **Serim:** Kişileri ve ortamı kısaca tanıt.
- **Düğüm:** Karakterlerin özelliklerinden doğan bir **çatışma** kur (açgözlülük, kibir, tembellik…).
- **Çözüm:** Olayı, karakterin davranışının **doğal sonucu** olarak bitir.
- **Ders:** Kıssadan hisse; açıkça yaz ya da okura sezdir.
**3. Dil ve anlatım:** Diyaloglar (**intak**), kişileştirmeler (**teşhis**); kısa ve sade cümleler.
**4. Gözden geçirme:** Ders olay örgüsünden **kendiliğinden** çıkıyor mu? Yazım ve noktalama doğru mu?

# Türk Destanları Üzerine Sunum
1. **Konu seç:** Bir destan (Ergenekon, Manas, Göç) ya da bir motif (kurt, ağaç, ışık).
2. **Araştır:** Güvenilir kaynaklardan (ders kitabı, akademik makaleler, Kültür Bakanlığı yayınları) bilgi topla; **kaynakları not et**.
3. **Sunuyu tasarla:** Giriş (merak uyandıran bir soru) → destanın özeti → motifler ve değerler → günümüze yansımaları (film, çizgi roman, oyun) → sonuç. Slaytlarda **az yazı, çok görsel**.
4. **Sun:** Dinleyiciyle göz teması, akıcı ve anlaşılır dil, süre yönetimi; sonunda soru–cevap.
""",
  [(r"\"Birlikten kuvvet doğar.\" dersini veren kısa bir fablın serim–düğüm–çözüm planını yazınız.",
    r"**Serim:** Ormanda karıncalar ve kibirli bir ayı yaşar. **Düğüm:** Sağanak yağmurda dere taşar; ayı tek başına yuvasını kurtarmaya çalışır ama başaramaz. Karıncalar ise sıra olup yuvalarının girişini kum ve yapraklarla kapatır. **Çözüm:** Ayı, minicik karıncaların yuvasının kurtulduğunu görür ve yardım ister; birlikte bir set yaparlar. **Ders:** *\"Birlikten kuvvet doğar.\"*"),
   (r"\"Ergenekon Destanı\" konulu bir sunumda hangi bölümlere yer verirsiniz? Günümüzle nasıl bağ kurarsınız?",
    r"**Giriş:** \"Bir millet dağları eritip nasıl yeniden doğar?\" sorusu. **Özet:** Türklerin yenilgiden sonra Ergenekon'a sığınması, çoğalmaları, demir dağı eriterek **bozkurt** rehberliğinde çıkış. **Motifler:** demir, bozkurt, kutlu çıkış. **Değerler:** dayanışma, umut, bağımsızlık. **Günümüz:** **Nevruz–Ergenekon** kutlamaları, demirin dövülmesi geleneği.")],
  ["Fabl planı: ders → hayvan karakterler → serim, düğüm, çözüm → kıssadan hisse.", "Fablda intak ve teşhis kullanılır; ders olay örgüsünden doğmalıdır.", "Destan sunumu: güvenilir kaynak, motifler ve değerler, günümüze yansımalar.", "Sunumda az yazı–çok görsel, göz teması ve süre yönetimi önemlidir."]),
],
"u4": [
O("k5", "4.5", "Ara metinler: Servetifünun romanı ve Fecriati şiiri", "Intermediate texts: the Servet-i Fünun novel and Fecr-i Âti poetry", r"""
# Servetifünun (Edebiyat-ı Cedide) Dönemi (1896–1901)
**Servetifünun dergisi** etrafında toplanan sanatçıların oluşturduğu topluluk; **Recaizade Mahmut Ekrem**'in \"sanat için sanat\" anlayışını benimsemiştir. 1901'de dergi kapatılınca dağıldılar.

**Özellikleri:**
- **Sanat için sanat**; toplumsal konular yerine **bireysel** duygular (karamsarlık, **hayal–gerçek çatışması**, kaçış isteği).
- **Ağır ve süslü dil:** Arapça–Farsça kelime ve tamlamalar çoktur.
- Şiirde **serbest müstezat**, sone, terza-rima gibi Batılı biçimler; **anlam bir dizede bitmeyebilir** (anjambman).
- Roman ve hikâyede **realizm ve natüralizm** etkisi; olaylar çoğunlukla **İstanbul** ve aydın kesim çevresinde geçer.

# Halit Ziya Uşaklıgil ve Servetifünun Romanı
Türk romanını **Batılı anlamda** teknik olarak olgunlaştıran yazardır.
- **Mai ve Siyah (1897):** Şair olmak isteyen **Ahmet Cemil**'in hayalleri (mavi) ile acı gerçeklerin (siyah) çatışması; dönemin **hayal kırıklığını** yansıtır.
- **Aşk-ı Memnu (1900):** Bir konakta geçen aile içi çatışmalar; **psikolojik tahliller** ve ayrıntılı betimlemelerle Türk edebiyatının en önemli romanlarından biri.
- Özellikleri: Ayrıntılı **mekân ve kişi betimlemeleri**, **iç çözümleme**, gözlem; yazar olaylara karışmaz (Tanzimat'tan farklı olarak).

# Fecriati (1909–1912)
**\"Geleceğin şafağı\"** anlamına gelen topluluk, II. Meşrutiyet'ten sonra kuruldu; beyannamesinde **\"Sanat şahsi ve muhteremdir.\"** ilkesini savundu.
- Servetifünun'un **devamı** niteliğindedir; sanat için sanat, ağır dil ve bireysel konular sürdü.
- **Sembolizm** etkisi: Şiirde **müzikalite**, **telkin (sezdirme)**, belirsizlik ve izlenimler.
- **Ahmet Haşim** topluluğun en önemli şairidir: Şiirlerinde **akşam, gurup, havuz, yalnızlık** temaları; renk ve ışık oyunlarıyla izlenimci tablolar çizer. **\"Şiir Hakkında Bazı Mülahazalar\"** yazısında şiirin **anlaşılmak için değil, hissedilmek için** yazıldığını savunur (saf şiir anlayışının kaynaklarından).

# Dönemleri Karşılaştırma
| | Tanzimat | Servetifünun | Fecriati | Millî Edebiyat |
|---|---|---|---|---|
| Sanat anlayışı | Toplum için sanat | Sanat için sanat | Sanat şahsi ve muhteremdir | Toplum için sanat |
| Dil | Sadeleşme çabası | Ağır, süslü | Ağır | **Sade**, konuşma dili |
| Konu | Hürriyet, vatan, eski–yeni | Bireysel bunalım, kaçış | Bireysel, doğa | Millî değerler, Anadolu |
""",
  [(r"Mai ve Siyah romanının adındaki \"mavi\" ve \"siyah\" renkleri neyi simgeler? Bu tema Servetifünun sanatçılarının ruh hâliyle nasıl ilişkilidir?",
    r"**Mavi**, Ahmet Cemil'in büyük bir şair olma ve mutlu bir hayat kurma **hayallerini**; **siyah** ise yoksulluk, aile felaketleri ve başarısızlıkla gelen **acı gerçeği** simgeler. II. Abdülhamit döneminin baskı ortamında toplumsal konulara yönelemeyen Servetifünun sanatçıları **hayal–gerçek çatışmasını, karamsarlığı ve kaçış isteğini** eserlerine yansıtmıştır."),
   (r"Fecriati'nin \"Sanat şahsi ve muhteremdir.\" ilkesini açıklayınız. Bu ilke Millî Edebiyat anlayışından nasıl ayrılır?",
    r"İlke, sanatın sanatçının **kişisel duygu ve zevkinin** ürünü olduğunu ve **saygı duyulması** gerektiğini; sanatın bir amaca (toplumu eğitmek vb.) hizmet etmek zorunda olmadığını anlatır. **Millî Edebiyat** ise **toplum için sanat** anlayışıyla millî değerleri, Anadolu'yu ve halkı konu edinmiş, **sade dili** benimsemiştir.")],
  ["Servetifünun: sanat için sanat, bireysel konular, ağır dil, Batılı biçimler, realist–natüralist roman.", "Halit Ziya: Mai ve Siyah (hayal–gerçek çatışması), Aşk-ı Memnu; ayrıntılı betimleme, iç çözümleme.", "Fecriati: \"Sanat şahsi ve muhteremdir\"; sembolizm, müzikalite, telkin; Ahmet Haşim.", "Millî Edebiyat sade dil ve toplum için sanatla bu iki topluluktan ayrılır."]),
O("k6", "4.6", "Metin dönüştürme ve canlandırma: hikâyeden şiire, dramatizasyon", "Text transformation and performance: from story to poem, dramatization", r"""
# Hikâyeden Şiire Dönüştürme
Bir hikâyenin **olay örgüsü, kişileri ve duygusu** şiirin yoğun ve ahenkli diline aktarılabilir. Örneğin Millî Edebiyat döneminden bir hikâyedeki fedakârlık duygusu birkaç kıtalık bir şiire dönüştürülebilir.

**Adımlar:**
1. Hikâyenin **ana duygusunu ve temasını** belirle (vatan sevgisi, fedakârlık, özlem…).
2. Şiirde öne çıkacak **anahtar sahneleri** seç (her şeyi anlatmaya çalışma, **yoğunlaştır**).
3. Bir **nazım biçimi ve ölçü** seç: hece ölçüsüyle dörtlükler ya da serbest şiir.
4. **İmge, benzetme, kişileştirme** ile sahneleri görselleştir; **kafiye, redif, ses tekrarları** ile ahenk kur.
5. Hikâyenin sonunu şiirin **son dizelerinde** etkili bir vurguyla ver.

# Dramatizasyon (Canlandırma)
Bir metindeki olayın **sahne üzerinde, diyalog ve hareketle** canlandırılmasıdır.
1. **Metni seç ve sahnelere ayır** (giriş, çatışma, doruk, çözüm).
2. **Kişileri belirle**; her kişinin ruh hâlini ve konuşma üslubunu tartış.
3. **Diyalogları yaz**: Anlatıcının aktardığı bilgileri konuşmalara ve **sahne yönergelerine** (parantez içinde hareket ve duygu notları) dönüştür.
4. **Prova**: Ses tonu, vurgu, jest–mimik, sahnede konumlanma; basit dekor, kostüm ve ışık.
5. **Sergileme ve değerlendirme**: İzleyicilerden geri bildirim al; metnin canlandırmada nasıl **yeniden yorumlandığını** tartış.

**Neden önemli?** Metin dönüştürme ve canlandırma, metni **derinlemesine anlamayı**, türlerin farklı anlatım imkânlarını görmeyi ve **iş birliği ile yaratıcılığı** geliştirir.
""",
  [(r"Bir hikâyedeki şu bölümü sahne yönergeleriyle birlikte kısa bir diyaloğa dönüştürünüz: \"Yaşlı adam torununa, dedesinden kalan saati uzattı. Çocuk saati alırken gözleri doldu.\"",
    r"*(Akşam. Eski bir evin salonu. Dede, cebinden bir köstekli saat çıkarır.)*\n**DEDE** *(titrek bir sesle)*: Bu saat babamdan bana kaldı. Şimdi senin.\n**TORUN** *(saati iki eliyle alır, gözleri dolar)*: Dede… Hep saklayacağım, söz.\n**DEDE** *(gülümseyerek)*: Saat değil önemli olan evlat, zamanı iyi kullanmak.\n*(Işık yavaşça kararır.)*".replace("\\n", "\n")),
   (r"Bir hikâyeyi şiire dönüştürürken neden \"her şeyi anlatmaya çalışmamak\" gerekir?",
    r"Şiir **yoğun ve özlü** bir türdür; hikâyedeki tüm ayrıntılar aktarılırsa şiir **anlatımsal ve düz** bir metne dönüşür. Şiirde en etkili sahneler seçilir, duygu **imge ve çağrışımlarla** sezdirilir; okurun boşlukları kendi hayal gücüyle doldurması sağlanır.")],
  ["Hikâyeden şiire: tema ve duygu → anahtar sahneler → nazım biçimi ve ölçü → imge ve ahenk → etkili son.", "Şiir yoğunlaştırır; hikâyenin tüm ayrıntılarını aktarmaz.", "Dramatizasyon: sahnelere ayırma, kişiler, diyalog ve sahne yönergeleri, prova, sergileme.", "Metin dönüştürme ve canlandırma metni derinlemesine anlamayı ve iş birliğini geliştirir."]),
],
}
