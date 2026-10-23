# -*- coding: utf-8 -*-
r"""10. Sınıf Coğrafya — 1.36.0: Maarif kodları (COĞ.10.1.1–COĞ.10.7.1), eksik COĞ.10.6.3 (mekâna göre afetlerden
korunma kararları) ve COĞ.10.6.4 (afet bilinci), eksik örnekler, kısa anlatımların genişletilmesi.
Kaynak: tymm.meb.gov.tr Coğrafya Dersi 10. Sınıf ünite sayfaları."""
from common import O

KOD = {
    "u1/k1": "COĞ.10.1.1", "u2/k1": "COĞ.10.2.1", "u2/k2": "COĞ.10.2.2",
    "u3/k1": "COĞ.10.3.1", "u3/k2": "COĞ.10.3.1", "u3/k3": "COĞ.10.3.1", "u3/k4": "COĞ.10.3.2",
    "u3/k5": "COĞ.10.3.3", "u3/k6": "COĞ.10.3.3", "u3/k7": "COĞ.10.3.4–5",
    "u4/k1": "COĞ.10.4.1", "u4/k2": "COĞ.10.4.2", "u4/k3": "COĞ.10.4.Ek", "u4/k4": "COĞ.10.4.Ek",
    "u5/k1": "COĞ.10.5.1", "u5/k2": "COĞ.10.5.2", "u5/k3": "COĞ.10.5.3",
    "u6/k1": "COĞ.10.6.1–2", "u6/k2": "COĞ.10.6.2", "u7/k1": "COĞ.10.7.1",
}

ANLATIM = {
"u3/k7": r"""
# Saha Çalışması Nasıl Yapılır?
1. **Hazırlık:** Amaç ve soru belirlenir (*\"Bu vadide yerleşmeler neden yamaçta?\"*); harita, uydu görüntüsü ve kaynaklar incelenir.
2. **Arazide gözlem:** Yer şekilleri fotoğraflanır, kroki çizilir, GPS ile konum alınır; yerel halkla görüşülür.
3. **Değerlendirme:** Veriler haritaya ve tabloya aktarılır, sonuçlar rapor ya da sunumla paylaşılır.

Gidilemeyen yerler için **sanal saha çalışması** (Google Earth, 3B arazi modelleri, sanal turlar) yapılabilir. Yer şekillerinin insan faaliyetlerine etkisine **teraslama** (eğimli arazide tarım), **taşkın ovalarında yerleşme riski** ve **karstik alanlarda baraj sızıntısı** da örnek verilebilir.
""",
"u5/k1": r"""
# Sektörlerin Birbirine Bağlılığı
Bir ürün, sektörler arasında bir **değer zinciri** oluşturur: Pamuk tarlada yetiştirilir (birincil) → iplik ve kumaş fabrikasında işlenir (ikincil) → mağazada satılır ve nakliye edilir (üçüncül) → yeni kumaş teknolojisi laboratuvarda geliştirilir (dördüncül) → şirketin ihracat stratejisine yönetim kurulu karar verir (beşincil).

Teknoloji ilerledikçe birincil sektörde çalışan sayısı **makineleşme** nedeniyle azalır; bilgi ve hizmet sektörlerinin payı artar.
""",
"u5/k2": r"""
# Gelişmişliği Ölçen Göstergeler
- **Kişi başı GSYİH:** Bir ülkede bir yılda üretilen mal ve hizmetlerin değerinin nüfusa oranı.
- **İnsani Gelişme Endeksi (İGE):** Gelirin yanı sıra **eğitim** ve **sağlık (beklenen yaşam süresi)** göstergelerini birleştirir; tek başına gelirden daha kapsamlı bir ölçüdür.
- **Sektörel dağılım:** Gelişmiş ekonomilerde hizmet sektörü istihdamın **%70'inden fazlasını** oluşturur.

Ham madde ihracatına dayanan ülkeler fiyat dalgalanmalarına karşı **kırılgandır**; katma değeri yüksek ürün üreten ülkelerin ekonomisi daha **dirençlidir**.
""",
"u5/k3": r"""
# Bölgesel Farklar ve Güncel Eğilimler
Türkiye'de sanayi ve hizmetler **Marmara** (İstanbul, Kocaeli, Bursa), **İç Anadolu** (Ankara, Konya, Kayseri) ve **Ege** (İzmir, Manisa, Denizli) çevresinde yoğunlaşır. Doğu Anadolu ve Karadeniz'in bazı bölgelerinde tarım ve hayvancılık hâlâ önemli bir istihdam alanıdır.
- **Organize sanayi bölgeleri** ve **teknoparklar**, sanayi ve dördüncül sektörü güçlendirir.
- Turizm (Antalya, Muğla) hizmet sektörünün önemli bir kaynağıdır.
- Savunma sanayii, otomotiv, beyaz eşya ve tekstil ihracatta öne çıkar.
""",
"u7/k1": r"""
# Türk Kültürünün Mekâna Yansıması
Türk kültürü gittiği coğrafyalara **mimari, yer adları, mutfak ve gelenekler** yoluyla iz bırakmıştır:
- **Mimari:** Kervansaraylar, kümbetler, camiler ve köprüler (Mostar Köprüsü, Bosna-Hersek).
- **Yer adları:** Balkanlar'dan Orta Asya'ya Türkçe kökenli şehir, dağ ve nehir adları.
- **Gelenek ve mutfak:** Nevruz kutlamaları, at kültürü, ayran–kımız, mantı ve pilav çeşitleri geniş bir alana yayılmıştır.

Bu ortak öğeler, Türk dünyası ile **kültürel, ekonomik ve siyasi bağların** güçlenmesine zemin hazırlar.
""",
}

ORNEK = {
"u1/k1": [(r"Bir şehirde yaz aylarında bazı mahallelerin diğerlerinden 3–4 °C daha sıcak olduğu tespit ediliyor. Coğrafi bakış açısıyla bu durumu hangi sorularla incelersiniz?",
           r"**Nerede?** Sıcak mahalleler haritada nerede yoğunlaşıyor? **Neden orada?** Bina yoğunluğu, asfalt–beton yüzeyler, yeşil alan azlığı, rüzgâr koridorlarının kapanması (**kentsel ısı adası**). **Nasıl bir etkileşim?** İnsan faaliyetleri doğal ortamı nasıl değiştirmiş? **Ne yapılmalı?** Ağaçlandırma, yeşil çatılar, açık renkli yüzeyler. Coğrafya olayı **mekân, insan–doğa etkileşimi ve çözüm** açısından ele alır.")],
"u2/k1": [(r"Bir orman yangınından sonra yanan alanın büyüklüğünü ve yeniden ağaçlandırma ihtiyacını belirlemek için uzaktan algılama ve CBS birlikte nasıl kullanılır?",
           r"**Uzaktan algılama:** Yangın öncesi ve sonrası uydu görüntüleri karşılaştırılarak yanan alan tespit edilir (bitki örtüsü indeksindeki düşüş). **CBS:** Yanan alan haritası eğim, toprak, yerleşme ve yol katmanlarıyla **çakıştırılır**; erozyon riski yüksek ve öncelikli ağaçlandırma alanları belirlenir.")],
"u2/k2": [(r"Bir ilçedeki okullar, hastaneler, ana yollar ve park alanları CBS ile haritaya aktarılacaktır. Her biri hangi vektör sembolle gösterilmelidir?",
           r"**Nokta:** Okullar ve hastaneler (konumu tek bir noktayla ifade edilebilen nesneler). **Çizgi:** Ana yollar (uzunluğu olan doğrusal nesneler). **Alan (poligon):** Park alanları (yüzölçümü olan nesneler). Okulun adı, öğrenci sayısı gibi bilgiler **öznitelik (mekânsal olmayan) veri** olarak tabloya eklenir.")],
"u3/k1": [(r"Yer kabuğunun kalınlığı karalarda ve okyanus tabanında neden farklıdır? Hangi kabuk daha yoğundur?",
           r"**Kıtasal kabuk** daha kalındır (30–70 km) ve granit benzeri (sial) daha hafif kayaçlardan oluşur. **Okyanusal kabuk** incedir (5–10 km), bazalt (sima) gibi **daha yoğun** kayaçlardan oluşur. Bu yüzden iki levha çarpıştığında yoğun okyanusal levha kıtasal levhanın altına **dalar** (dalma–batma).")],
"u3/k2": [(r"Türkiye'de yaşanan depremlerin büyük çoğunluğu hangi fay hatları boyunca görülür? Neden?",
           r"**Kuzey Anadolu Fay Hattı**, **Doğu Anadolu Fay Hattı** ve **Batı Anadolu (Ege) graben sistemi**. Anadolu levhası, Arap levhasının kuzeye itmesiyle **batıya doğru** kaçmakta, bu hareket fay hatlarında gerilme biriktirip depremlere yol açmaktadır.")],
"u3/k3": [(r"Zonguldak'taki taş kömürü yatakları ile Türkiye'nin linyit yatakları hangi jeolojik zamanlarda oluşmuştur?",
           r"Zonguldak taş kömürü **I. Zaman (Paleozoik)**, özellikle Karbonifer döneminin bataklık ormanlarından oluşmuştur. Linyitler (Afşin–Elbistan, Soma, Tunçbilek) daha genç olup **III. Zaman (Tersiyer)** göl ve bataklık ortamlarında oluşmuştur.")],
"u3/k4": [(r"Karadeniz kıyılarında toprak örtüsünün kalın, Güneydoğu Anadolu'nun kurak kesimlerinde ise ince olmasının nedenini ayrışma türleriyle açıklayınız.",
           r"Karadeniz'de **nemli ve ılık** iklim nedeniyle **kimyasal ayrışma** güçlüdür; kayaçlar derinlemesine çözülür, kalın toprak oluşur ve bitki örtüsü toprağı korur. Kurak alanlarda kimyasal ayrışma zayıf, **mekanik (fiziksel) ayrışma** baskındır; toprak oluşumu yavaştır ve ince kalır.")],
"u3/k5": [(r"Bir akarsuyun yukarı, orta ve aşağı çığırındaki baskın aşındırma–biriktirme süreçlerini ve oluşan şekilleri karşılaştırınız.",
           r"**Yukarı çığır:** Eğim fazla → **derine aşındırma**; çentik (V) vadiler, şelaleler. **Orta çığır:** Yana aşındırma artar → geniş tabanlı vadiler, **menderesler**. **Aşağı çığır:** Eğim azalır → **biriktirme**; taşkın ovası, **delta** (Çukurova, Bafra, Çarşamba). Aynı akarsuda enerji azaldıkça aşındırma yerini biriktirmeye bırakır.")],
"u3/k6": [(r"Peribacaları ile mantarkaya arasındaki fark nedir? Hangi dış kuvvetler bu şekillerin oluşumunda etkilidir?",
           r"**Peribacaları** (Kapadokya) volkanik tüflerin **sel suları ve yağış** ile aşındırılmasıyla, sert bir başlık kayacın altındaki yumuşak tüfü koruması sonucu oluşur. **Mantarkaya** ise kurak alanlarda **rüzgârın** taşıdığı kumların kayaçların alt kısmını daha çok aşındırmasıyla oluşur (Karapınar). Her ikisinde de **farklı direnç gösteren kayaçlar** belirleyicidir.")],
"u3/k7": [(r"Bir öğrenci okulunun yakınındaki dere yatağında saha çalışması yapacaktır. Hangi gözlemleri yapmalı ve hangi soruları sormalıdır?",
           r"Gözlemler: Vadinin şekli (V ya da geniş tabanlı), yataktaki çakıl–kum boyutu, eğim, kıyıdaki yerleşmeler ve tarım alanları, taşkın izleri. Sorular: *\"Dere taşkın riski taşıyor mu? Yataktaki yapılaşma doğru mu? Dere hangi aşındırma–biriktirme şekillerini oluşturmuş?\"* Sonuçlar kroki, fotoğraf ve haritayla raporlanır.")],
"u4/k1": [(r"İstanbul, Ankara ve Erzurum şehirlerinin kuruluş yerini etkileyen coğrafi faktörleri karşılaştırınız.",
           r"**İstanbul:** Boğazın iki yakasında; **ulaşım ve ticaret yollarının kesişimi**, savunmaya elverişli yarımada, liman. **Ankara:** Savunmaya uygun kale tepesi, su kaynakları, İç Anadolu'nun **merkezî konumu**; başkent olunca hızla büyüdü. **Erzurum:** Yüksek ovada, **İpek Yolu** güzergâhında, stratejik askerî konum.")],
"u4/k2": [(r"Bir şehrin birden fazla fonksiyonu olabilir mi? Antalya örneğiyle açıklayınız.",
           r"Evet. **Antalya** başta **turizm** olmak üzere **tarım** (seracılık, narenciye), **ticaret** (liman, serbest bölge) ve **yönetim** (il merkezi) fonksiyonlarına sahiptir. Şehirler genellikle **baskın bir fonksiyonla** (Antalya: turizm) öne çıkar ama birden çok fonksiyon taşır.")],
"u5/k1": [(r"Aşağıdaki meslekleri ekonomik sektörlere ayırınız: madenci, öğretmen, otomobil fabrikası işçisi, bir bankanın genel müdürü, ilaç araştırmacısı.",
           r"Madenci → **birincil**; otomobil fabrikası işçisi → **ikincil**; öğretmen → **üçüncül**; ilaç araştırmacısı (AR-GE) → **dördüncül**; bankanın genel müdürü (üst düzey karar) → **beşincil**.")],
"u5/k2": [(r"A ülkesinde istihdamın %3'ü tarımda, %22'si sanayide, %75'i hizmette; B ülkesinde %60'ı tarımda, %10'u sanayide, %30'u hizmettedir. Hangi ülke daha gelişmiştir? İki gösterge daha belirtiniz.",
           r"**A ülkesi** daha gelişmiştir: Tarımda çalışan payının düşük, hizmet payının yüksek olması **makineleşmiş tarım** ve gelişmiş hizmet ekonomisini gösterir. A ülkesinde **kişi başı gelirin**, **okuryazarlık oranının** ve **ortalama yaşam süresinin** de yüksek olması beklenir.")],
"u5/k3": [(r"Türkiye'de tarımda çalışanların oranı azalırken tarımsal üretim neden düşmemiştir?",
           r"Tarımda **makineleşme**, sulama, sertifikalı tohum, gübre ve **verimlilik** artışı sayesinde daha az kişiyle daha çok ürün elde edilmektedir. Tarımdan ayrılan iş gücü sanayi ve hizmet sektörüne (**kente göç**) geçmiştir.")],
"u6/k1": [(r"Japonya'da deprem bilincinin yüksek olmasını sağlayan iyi uygulama örneklerini sıralayınız. Türkiye'de benzer hangi çalışmalar vardır?",
           r"Japonya: Okullarda düzenli **tatbikatlar**, sıkı **yapı denetimi** ve depreme dayanıklı mühendislik, **erken uyarı sistemi**, 1 Eylül Afet Önleme Günü. Türkiye: **AFAD** eğitimleri ve **Afet Gönüllüsü** programı, **kentsel dönüşüm**, okullarda tatbikat, **e-Devlet afet ve acil durum bilgileri**, **zorunlu deprem sigortası (DASK)**.")],
"u7/k1": [(r"Türk Devletleri Teşkilatı'nın üyesi ülkeleri yazınız. Bu ülkeleri birbirine bağlayan coğrafi ve kültürel öğeler nelerdir?",
           r"Üyeler: **Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan** (gözlemciler: Macaristan, Türkmenistan, KKTC). Bağlayan öğeler: Ortak **Türkçe** ve kökeni, Orta Asya'dan gelen tarihî miras, **Nevruz** gibi ortak bayramlar, İpek Yolu ve **Orta Koridor** ulaşım bağlantıları.")],
}

OZET = {}

EK = {
"u6": [
O("k3", "COĞ.10.6.3", "Mekânın özelliklerine göre afetlerden korunma uygulamaları",
  "Choosing disaster protection practices according to the characteristics of a place", r"""
# Her Yer Aynı Afete Hazırlanmaz
Afetlerden korunma kararları **mekânın özelliklerine** (yer şekilleri, zemin, iklim, akarsu ağı, nüfus yoğunluğu, yapı stoku) göre verilir. Önce bölgenin **tehlike haritası** çıkarılır, sonra seçenekler oluşturulup karşılaştırılır.

| Mekânın özelliği | Başlıca tehlike | Korunma uygulamaları |
|---|---|---|
| **Fay hattı üzerinde, alüvyal zemin** (Marmara, Ege grabenleri) | Deprem, zemin sıvılaşması | Zemin etüdü, sağlam zemine yerleşme, depreme dayanıklı yapı, kentsel dönüşüm, toplanma alanları |
| **Dik yamaç, killi zemin, bol yağış** (Doğu Karadeniz) | Heyelan, sel | Yamaçlarda yapılaşmayı sınırlamak, **ağaçlandırma**, istinat duvarı, drenaj, dere yataklarını boşaltmak |
| **Dar vadi, ani sağanak** | Taşkın, sel | Dere yatağına yapı yapmamak, **taşkın kanalları ve set**, erken uyarı |
| **Yüksek dağlık, kar birikimi** (Doğu Anadolu) | Çığ | Çığ önleme çitleri, ağaçlandırma, riskli yamaçlarda yol kapatma ve uyarı |
| **Kurak, seyrek bitki örtüsü** (İç Anadolu) | Erozyon, kuraklık, toz fırtınası | Rüzgâr perdeleri, nadas yerine **ekim nöbeti**, damla sulama |
| **Kıyı, alçak delta** | Fırtına, kıyı taşkını, deniz seviyesi yükselmesi | Kıyı yapılaşma sınırı, dalgakıran, sulak alanları korumak |

# Karar Verme Adımları
1. **Amaç:** *\"Bu yerleşmeyi hangi afete karşı nasıl korumalıyız?\"*
2. **Bilgi toplama:** Afet geçmişi, AFAD risk haritaları, jeolojik etüt, iklim verileri, yerel halkla görüşme.
3. **Seçenek oluşturma:** Yapısal (set, istinat duvarı, güçlendirme) ve yapısal olmayan (planlama, eğitim, sigorta, erken uyarı) önlemler.
4. **Karşılaştırma:** Maliyet, uygulanabilirlik, çevreye etkisi, kaç kişiyi koruduğu.
5. **Seçim ve uygulama:** En uygun önlem seçilir.
6. **Değerlendirme:** Önlemin işe yarayıp yaramadığı izlenir, gerekirse plan güncellenir.

# Yeşil Vatan
Ağaçlandırma, erozyon ve heyelanı azaltan, sel suyunu yavaşlatan, karbon tutan **doğa temelli bir çözümdür**. Bitki örtüsü, birçok afetin etkisini azaltan en ucuz ve kalıcı \"yapı\" olarak düşünülebilir.
""",
  [(r"Doğu Karadeniz'de dik yamaçlı bir vadide kurulu bir köyde sık sık heyelan ve sel yaşanıyor. Mekânın özelliklerine göre iki yapısal ve iki yapısal olmayan korunma önlemi öneriniz.",
    r"**Yapısal:** Yamaçlarda **istinat duvarı** ve **yüzey–yeraltı drenajı** (killi zemindeki suyu uzaklaştırmak); dere yatağında **taşkın duvarı ve ıslah**. **Yapısal olmayan:** Riskli yamaç ve dere yataklarında **yapılaşma yasağı** (imar planı), ağaçlandırma, yağış eşiğine bağlı **erken uyarı** ve tahliye planı."),
   (r"Bir belediye, alüvyal zemin üzerinde ve aktif bir faya yakın kurulmuş bir ilçede yeni bir hastane yapmak istiyor. Hangi alternatifleri değerlendirmeli, hangisini seçmelidir?",
    r"Alternatifler: (1) Aynı yere sıradan yapı, (2) aynı yere **zemin iyileştirme + sismik izolatörlü** yapı, (3) ilçede **sağlam (kaya) zeminli** başka bir arsa. Hastaneler afet sonrası **kesintisiz çalışması** gereken kritik yapılardır; en uygun seçim sağlam zemindeki bir alana sismik izolatörlü inşa etmektir (2 ve 3'ün birleşimi). 1. seçenek risk nedeniyle reddedilir.")],
  ["Korunma kararı mekânın özelliklerine (zemin, eğim, iklim, akarsu, nüfus) göre verilir.", "Deprem: zemin etüdü ve dayanıklı yapı; heyelan: drenaj, istinat duvarı, ağaçlandırma; sel: dere yatağını boşaltma, set, erken uyarı.", "Önlemler yapısal ve yapısal olmayan olarak ikiye ayrılır.", "Karar: amaç → bilgi → seçenekler → karşılaştırma → seçim → değerlendirme."]),
O("k4", "COĞ.10.6.4", "Afet bilinci oluşturmanın faydaları",
  "Benefits of building disaster awareness", r"""
# Afet Bilinci Nedir?
**Afet bilinci**; bireyin yaşadığı yerin **tehlikelerini bilmesi**, afet öncesinde **hazırlık yapması**, afet anında **doğru davranması** ve afet sonrasında **topluma destek olmasıdır**. Afete dirençli bir toplum, ancak bilinçli bireylerle mümkündür.

# Afet Döngüsünde Bilinçli Birey
| Aşama | Ne yapar? |
|---|---|
| **Önce (zarar azaltma ve hazırlık)** | Evinin depreme dayanıklılığını yaptırır, eşyaları sabitler, **afet ve acil durum çantası** hazırlar, aile **afet planı** yapar, toplanma alanını öğrenir, DASK yaptırır |
| **Sırasında (müdahale)** | **Çök–Kapan–Tutun**; asansör ve merdiven kullanmaz; selde yüksek yere çıkar, araçla suya girmez |
| **Sonra (iyileştirme)** | Gaz–elektriği kontrol eder, resmî kaynakları takip eder, gönüllü destek verir, yeniden yapılanmaya katılır |

# Bilincin Faydaları
- **Can kayıpları azalır:** Tatbikat yapan okullarda tahliye süresi kısalır, panik azalır.
- **Ekonomik kayıplar azalır:** Zarar azaltmaya harcanan her lira, afet sonrası çok daha büyük harcamaları önler.
- **Toplumsal dayanışma artar:** Mahalle afet gönüllüleri ilk müdahalede kritik rol oynar; ilk 72 saat çoğu zaman yerel halkın kendi kaynaklarıyla geçer.
- **Psikolojik dayanıklılık:** Ne yapacağını bilen kişi travmayı daha kolay atlatır.
- **Doğru karar verme:** Bilinçli vatandaş, riskli yerde ev almaz, kaçak yapıya karşı çıkar.

# Kendi Deneyimini Yansıt
Okulunuzda yapılan bir deprem ya da yangın tatbikatını düşünün: *Ne öğrendim? Neyi iyi yaptık, neyi geliştirmeliyiz? Ailemle afet planımız var mı?* Bu soruların cevapları, afet bilincinin **bireyden topluma** nasıl yayıldığını gösterir.

**Kurumlar:** AFAD, Kızılay, AKUT ve yerel yönetimler eğitim, tatbikat ve gönüllülük programları düzenler. **112** tek acil çağrı numarasıdır.
""",
  [(r"Bir ailenin deprem için hazırladığı afet ve acil durum çantasında neler bulunmalıdır? Çanta nerede durmalıdır?",
    r"Su (kişi başı en az 3 günlük), bozulmayan yiyecekler, ilk yardım malzemeleri ve düzenli kullanılan ilaçlar, el feneri, pilli radyo ve yedek pil, düdük, battaniye, yedek kıyafet, kimlik ve önemli belgelerin kopyaları, bir miktar nakit, powerbank. Çanta **kolay ulaşılabilir**, çıkışa yakın bir yerde durmalı ve içeriği yılda bir kontrol edilmelidir."),
   (r"İki okuldan biri yılda iki kez deprem tatbikatı yapıyor, diğeri hiç yapmıyor. Gerçek bir depremde iki okul arasında ne gibi farklar beklenir?",
    r"Tatbikat yapan okulda öğrenciler **Çök–Kapan–Tutun** hareketini refleks olarak yapar, **tahliye yolları ve toplanma alanı** bilinir, görevli öğretmenler sayım ve ilk yardımı organize eder; **panik ve izdiham** riski azalır. Tatbikat yapmayan okulda merdivenlerde yığılma, yanlış davranışlar ve kayıp kişilerin geç fark edilmesi gibi sorunlar beklenir. Bu, afet bilincinin **can kaybını azaltan** faydasını gösterir.")],
  ["Afet bilinci: tehlikeyi bilmek, hazırlanmak, doğru davranmak ve sonrasında destek olmak.", "Hazırlık: sabitleme, afet çantası, aile afet planı, toplanma alanı, DASK.", "Faydaları: can ve mal kaybının azalması, dayanışma, psikolojik dayanıklılık, doğru kararlar.", "AFAD, Kızılay, AKUT eğitim ve gönüllülük programları düzenler; acil çağrı 112."]),
],
}
