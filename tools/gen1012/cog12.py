# -*- coding: utf-8 -*-
"""12. Sınıf Coğrafya notları (genişletilmiş) → js/data/content/cog-12.js"""
from _c import O, U, write
from cog12_ek import EK

units = [
U("u1", "1. Ünite: Doğal Sistemler — Ekstrem Doğa Olayları", "Unit 1: Natural Systems — Extreme Natural Events", [
O("k1", "1.1", "Ekstrem doğa olaylarının sınıflandırılması ve etkileri", "Classification and effects of extreme natural events", r"""
# Ekstrem Doğa Olayı ve Afet
- **Ekstrem doğa olayı:** Ortalama koşullardan çok sapan, nadir ve şiddetli doğal olay.
- **Afet:** Doğa olayının **insan hayatını ve faaliyetlerini** etkileyerek toplumun baş etme kapasitesini aşan kayıplara yol açması. **Her doğa olayı afet değildir**; ıssız bir alandaki deprem afet sayılmaz.

# Sınıflandırma
| Köken | Olaylar |
|---|---|
| **Jeolojik–jeomorfolojik** | **Deprem**, volkanizma, **tsunami**, **heyelan**, kaya düşmesi, çığ, obruk |
| **Meteorolojik–hidrometeorolojik** | **Sel ve taşkın**, **kuraklık**, tropikal siklon (**kasırga/tayfun**), **hortum**, sıcak ve soğuk hava dalgaları, dolu, fırtına, orman yangınları |
| **Biyolojik** | Salgın hastalıklar, istilacı türler, çekirge istilası |

# Birincil ve İkincil Etkiler
| Olay | Birincil etki | İkincil etki |
|---|---|---|
| Deprem | Binaların yıkılması, can kaybı | Yangın, tsunami, heyelan, salgın, ekonomik kayıp, göç |
| Volkanizma | Lav, kül, gaz | İklim soğuması, hava ulaşımının durması, tarım kaybı |
| Sel | Su baskını | Salgın, içme suyu kirliliği, tarım kaybı |
| Kuraklık | Su azlığı | Kıtlık, göç, orman yangını |

# Türkiye'de Ekstrem Olaylar
- **Deprem:** Kuzey Anadolu, Doğu Anadolu ve Batı Anadolu fay hatları — 1999 Marmara, **2023 Kahramanmaraş** depremleri.
- **Heyelan:** Özellikle **Karadeniz** (eğim + bol yağış + killi yapı).
- **Sel:** Karadeniz ve Akdeniz kıyıları, ani sağanaklar (2021 Batı Karadeniz selleri).
- **Kuraklık ve orman yangınları:** Akdeniz ve Ege (2021 yangınları).
- **Çığ:** Doğu Anadolu.

# İklim Değişikliğinin Etkisi
Küresel ısınma atmosferdeki enerjiyi ve nem miktarını artırır → **aşırı sıcaklar, şiddetli sağanaklar, kuraklıklar, orman yangınları ve güçlü siklonların** sıklığı ve şiddeti artmaktadır.
""",
  [("Aynı büyüklükteki iki depremden birinin afete dönüşüp diğerinin dönüşmemesi nasıl açıklanır?", "Afete dönüşüp dönüşmemesi **zarar görebilirliğe** bağlıdır: nüfus yoğunluğu, yapı kalitesi, zemin, hazırlık ve müdahale kapasitesi. Seyrek nüfuslu ya da dayanıklı yapılı bölgede deprem afete dönüşmeyebilir.")],
  ["Afet: toplumun baş etme kapasitesini aşan olay.", "Jeolojik (deprem, heyelan) ve meteorolojik (sel, kuraklık) olaylar.", "İklim değişikliği ekstrem olayların sıklığını artırır."]),
O("k2", "1.2", "Risk, zarar görebilirlik ve afet yönetimi", "Risk, vulnerability and disaster management", r"""
# Temel Kavramlar
- **Tehlike:** Zarar verme potansiyeli olan olay (fay hattı).
- **Zarar görebilirlik (kırılganlık):** Toplumun olaydan etkilenme derecesi (çürük yapı, yoksulluk, bilinçsizlik).
- **Risk:** $$\text{Risk} = \text{Tehlike} \times \text{Zarar görebilirlik}$$
- **Dayanıklılık (direnç):** Toplumun etkiye karşı koyma ve toparlanma kapasitesi.

# Bütünleşik Afet Yönetimi Döngüsü
| Aşama | Zaman | Çalışmalar |
|---|---|---|
| **Zarar azaltma** | Afet öncesi | Risk haritaları, **mikrobölgeleme**, depreme dayanıklı yapı, yapı denetimi, taşkın setleri, ağaçlandırma |
| **Hazırlık** | Afet öncesi | Tatbikat, afet çantası, toplanma alanları, **erken uyarı sistemleri**, eğitim |
| **Müdahale** | Afet anı | Arama-kurtarma, ilk yardım, barınma, beslenme |
| **İyileştirme** | Afet sonrası | Geçici ve kalıcı konut, altyapının onarımı, psikososyal destek |

**Türkiye'de:** **AFAD** (2009) afet yönetiminin koordinatörü; **TAMP** (Türkiye Afet Müdahale Planı); zorunlu deprem sigortası (**DASK**); **AFAD Acil** mobil uygulaması.

**Mekânsal teknolojilerin rolü:** CBS ve uzaktan algılama ile risk haritaları, hasar tespiti, tahliye planlaması.
""",
  [("Yapı denetimi ve mikrobölgeleme hangi afet yönetimi aşamasına aittir? Neden en önemli aşama kabul edilir?", "**Zarar azaltma** aşamasına aittir. Afet olmadan önce kayıpların kaynağını (zayıf yapı, riskli zemin) ortadan kaldırdığı için **en etkili ve en ucuz** aşamadır.")],
  ["Risk = tehlike × zarar görebilirlik.", "Döngü: zarar azaltma, hazırlık, müdahale, iyileştirme.", "Türkiye: AFAD, DASK, TAMP."]),
]),
U("u2", "2. Ünite: Beşerî Sistemler", "Unit 2: Human Systems", [
O("k1", "2.1", "Ekonomi, şehirleşme ve göç ilişkisi", "Economy, urbanization and migration", r"""
# Şehirleşme
Kırsal nüfusun şehirlere göç etmesi ve şehirlerin büyümesi. Türkiye'de nüfusun **yaklaşık %93'ü** il ve ilçe merkezlerinde yaşamaktadır (TÜİK).

**Şehirleşmenin nedenleri:**
| İtici (kırsal) | Çekici (kent) |
|---|---|
| Tarımda makineleşme, toprakların miras yoluyla bölünmesi, iş olanaklarının azlığı | Sanayi ve hizmet sektöründe iş, **eğitim ve sağlık** olanakları, sosyal yaşam |

**Sorunlar:** Plansız yapılaşma (**gecekondu**), altyapı yetersizliği, trafik, hava ve su kirliliği, tarım alanlarının yapılaşması, işsizlik, kentsel dönüşüm ihtiyacı.

# Göç
- **İç göç:** Kırdan kente, doğudan batıya; **mevsimlik tarım işçiliği** göçü.
- **Dış göç:** **1961**'den itibaren Almanya başta olmak üzere Avrupa'ya **iş gücü göçü**; günümüzde **beyin göçü**; Türkiye'ye yönelen **sığınmacı** göçleri (Suriye).
- **Etkiler:** Göç veren yerde nüfus yaşlanması, tarımsal üretimin azalması; göç alan yerde konut, istihdam ve hizmet baskısı, **kültürel çeşitlilik**; döviz girdisi (dış göç).

# Ekonomi–Şehirleşme–Göç Döngüsü
Sanayi ve hizmet yatırımları → istihdam → göç → şehirleşme → pazar büyümesi → yeni yatırımlar. Bölgesel eşitsizlik göçü artırır.
""",
  [("Doğu Anadolu'dan batıdaki büyük kentlere yönelen göçün iki bölge üzerindeki etkileri nelerdir?", "**Göç veren bölgede:** genç nüfus azalır, nüfus yaşlanır, tarım ve hayvancılık zayıflar. **Göç alan kentlerde:** konut ve altyapı yetersizliği, gecekondulaşma, işsizlik ve trafik sorunları artar; aynı zamanda iş gücü ve tüketim artar.")],
  ["Türkiye'de nüfusun büyük çoğunluğu kentlerde.", "İtici–çekici faktörler; plansız kentleşme sorunları.", "İç göç, dış göç (1961 Almanya), beyin göçü, sığınmacılar."]),
O("k2", "2.2", "Türkiye'nin işlevsel bölgeleri ve kalkınma projeleri", "Türkiye's functional regions and development projects", r"""
# İşlevsel Bölge
Bir merkezin (şehir, liman) çevresiyle kurduğu **ekonomik ve sosyal ilişkilerle** belirlenen bölge (hinterland). Ör. İstanbul'un ticaret etki alanı, bir limanın art bölgesi.

# Bölgesel Kalkınma Projeleri
| Proje | Kapsam | Hedefler |
|---|---|---|
| **GAP** (Güneydoğu Anadolu Projesi) | Fırat ve Dicle havzası, 9 il | **Sulama** (Harran Ovası), **enerji** (Atatürk, Karakaya, Ilısu barajları), tarım-sanayi, sosyal kalkınma |
| **DAP** (Doğu Anadolu Projesi) | Doğu Anadolu illeri | Hayvancılık, tarım, turizm, sınır ticareti |
| **KOP** (Konya Ovası Projesi) | Konya, Karaman, Aksaray, Niğde | Kuraklıkla mücadele, **Mavi Tünel** ile su aktarımı, sulama |
| **DOKAP** (Doğu Karadeniz Projesi) | Doğu Karadeniz illeri | Turizm (yayla), ulaşım, tarım (çay, fındık), göçün önlenmesi |
| **ZBK** (Zonguldak–Bartın–Karabük) | Batı Karadeniz | Taş kömürü ve demir-çelik sanayisine bağlı ekonominin çeşitlendirilmesi |

**Kalkınma ajansları** (26 bölge) yerel projeleri destekler.
""",
  [("GAP'ın bölgede sulu tarıma geçişle ortaya çıkardığı ekonomik ve çevresel etkiler nelerdir?", "**Ekonomik:** Pamuk, mısır gibi ürünlerde verim ve gelir artışı, tarıma dayalı sanayi, istihdam. **Çevresel:** Yanlış sulama ile **tuzlanma**, yer altı suyu düşüşü, baraj göllerinin iklimi nemlendirmesi ve tarihî alanların sular altında kalması (Hasankeyf).")],
  ["İşlevsel bölge: merkez ve etki alanı.", "GAP sulama ve enerji; KOP kuraklık (Mavi Tünel); DOKAP; DAP; ZBK.", "Amaç: bölgesel eşitsizliği azaltmak."]),
O("k3", "2.3", "Hizmet sektörü, ulaşım, ticaret ve turizm", "Services, transport, trade and tourism", r"""
# Hizmet Sektörü
Eğitim, sağlık, ticaret, ulaşım, bankacılık, turizm gibi **üretim dışı** faaliyetler. Gelişmiş ülkelerde istihdamın büyük bölümü hizmet sektöründedir. Türkiye'de de istihdamın yarıdan fazlası hizmetlerdedir.

# Ulaşım
| Tür | Avantaj | Dezavantaj |
|---|---|---|
| **Kara yolu** | Kapıdan kapıya, esnek | Pahalı yakıt, kaza, kirlilik |
| **Demir yolu** | Ucuz, yüksek kapasite, çevre dostu | Yatırım maliyeti, güzergâh sınırlı |
| **Deniz yolu** | **En ucuz**, en yüksek kapasite | Yavaş |
| **Hava yolu** | **En hızlı** | En pahalı, düşük kapasite |
| **Boru hattı** | Kesintisiz akışkan taşıma | Yalnızca sıvı/gaz |

Türkiye'de yük ve yolcu taşımacılığında **kara yolu** baskındır. Önemli projeler: **Marmaray**, **Avrasya Tüneli**, **Osmangazi** ve **1915 Çanakkale** köprüleri, **hızlı tren** hatları, **İstanbul Havalimanı**, **Orta Koridor** (Bakü–Tiflis–Kars demir yolu).

# Küresel Ticaret ve Türkiye
- **Dünya Ticaret Örgütü (DTÖ)**, gümrük birlikleri, serbest ticaret anlaşmaları.
- Türkiye'nin dış ticaretinde en büyük pazar **Avrupa Birliği** (1996 **Gümrük Birliği**).
- **İhracat:** Motorlu taşıtlar, makine, demir-çelik, tekstil-hazır giyim, elektrikli cihazlar, tarım ürünleri (fındık).
- **İthalat:** Enerji (**petrol, doğal gaz**), ara mallar, makine, kimyasallar.
- **Serbest bölgeler** ve lojistik merkezler.

# Türkiye'de Turizm
- **Doğal potansiyel:** Uzun kıyılar (deniz-kum-güneş), termal kaynaklar, yaylalar, kış sporları (Palandöken, Uludağ, Erciyes), mağaralar.
- **Kültürel potansiyel:** **UNESCO Dünya Mirası** alanları (Göbeklitepe, Efes, Kapadokya, Truva, Safranbolu, İstanbul Tarihî Alanları…), inanç turizmi.
- **Ekonomik katkı:** Döviz girdisi, istihdam, hizmet sektörünün canlanması.
- **Sorunlar:** Mevsimsellik (yaz yoğunluğu), kıyıların yapılaşması, çevre kirliliği. **Alternatif turizm** (kültür, sağlık, gastronomi, eko-turizm) mevsimselliği azaltır.
""",
  [("Türkiye'de turizm gelirlerinin yaz aylarında yoğunlaşmasının nedeni ve çözüm önerisi nedir?", "Turizmin büyük ölçüde **deniz-kum-güneş** türüne dayanması. Çözüm: **kış, termal, kültür, inanç, sağlık ve gastronomi turizmi** gibi alternatif türleri geliştirerek turizmi **dört mevsime** yaymak.")],
  ["Hizmet sektörü istihdamda en büyük pay.", "Deniz yolu en ucuz, hava yolu en hızlı; Türkiye'de kara yolu baskın.", "Türkiye: AB en büyük pazar; enerji ithalatı; turizmde mevsimsellik."]),
]),
U("u3", "3. Ünite: Küresel Ortam — Bölgeler ve Ülkeler", "Unit 3: Global Environment — Regions and Countries", [
O("k1", "3.1", "Türkiye'nin jeopolitik konumu ve güç dengeleri", "Türkiye's geopolitical position and power balances", r"""
# Jeopolitik Konum
**Jeopolitik:** Coğrafi koşulların devletlerin siyasetine ve güç ilişkilerine etkisi.

**Türkiye'nin jeopolitik önemi:**
- **Asya–Avrupa–Afrika** arasında **köprü** konumu.
- **Türk Boğazları** (İstanbul ve Çanakkale): Karadeniz'in dünya denizlerine tek çıkışı; **Montrö Boğazlar Sözleşmesi (1936)** ile geçiş düzenlenir.
- **Enerji koridoru:** Hazar ve Orta Doğu kaynaklarını Avrupa'ya ulaştıran boru hatları (BTC, TANAP, Türk Akım).
- **Su kaynakları:** Fırat ve Dicle'nin kaynak ülkesi.
- **Kültür havzası:** Balkanlar, Kafkasya, Orta Asya, Orta Doğu ile tarihî ve kültürel bağlar.
- Üç tarafı denizlerle çevrili → **Mavi Vatan** ve deniz yetki alanları.
- **NATO** üyesi; Türk Devletleri Teşkilatı, G20 üyeliği.

# Küresel ve Bölgesel Güç Dengeleri
- Küresel güçler (ABD, Çin, Rusya, AB) ekonomik, askerî ve teknolojik rekabet içindedir.
- **Uluslararası örgütler:** BM, NATO, AB, G20, İİT, ŞİÖ, OPEC.
- Bölgesel güçler stratejik geçitler, kaynaklar ve pazarlar üzerinde etki arar.
""",
  [("Montrö Boğazlar Sözleşmesi'nin Türkiye'ye sağladığı hak nedir?", "Boğazlar üzerindeki **egemenlik** hakkını tanır; Türkiye Boğazları **askerî olarak kontrol** edebilir, savaş zamanında savaş gemilerinin geçişini düzenleyebilir. Barış zamanında ticaret gemileri serbestçe geçer.")],
  ["Türkiye: kıtalar arası köprü, Boğazlar, enerji koridoru.", "Montrö 1936: Boğazlarda Türk egemenliği.", "Küresel güçler ve uluslararası örgütler."]),
O("k2", "3.2", "Gelişmişlik göstergeleri, enerji güzergâhları ve çatışma bölgeleri", "Development indicators, energy routes and conflict zones", r"""
# Gelişmişlik Göstergeleri
| Gösterge | Gelişmiş ülke | Gelişmekte olan ülke |
|---|---|---|
| Kişi başına milli gelir | Yüksek | Düşük |
| **İnsani Gelişme Endeksi (İGE)** | Yüksek (gelir + eğitim + yaşam süresi) | Düşük |
| Ekonomide baskın sektör | **Hizmet** ve sanayi | Tarım |
| Doğum oranı / nüfus artışı | Düşük | Yüksek |
| Ortalama yaşam süresi | Uzun | Kısa |
| Bebek ölüm oranı | Düşük | Yüksek |
| Okuryazarlık | Yüksek | Düşük |
| Şehirleşme | Planlı, yüksek | Hızlı, plansız |
| Enerji tüketimi (kişi başı) | Yüksek | Düşük |
| Dış ticaret | Mamul ve teknoloji ihracatı | Ham madde ihracatı |

# Enerji Güzergâhları ve Jeopolitik
- **Stratejik geçitler (darboğazlar):** **Hürmüz Boğazı** (Basra Körfezi petrolünün çıkışı), **Süveyş Kanalı**, **Babülmendep**, **Malakka Boğazı**, **Türk Boğazları**, Panama Kanalı.
- Enerji güzergâhlarının kesilmesi küresel fiyatları ve ekonomiyi etkiler (ör. 2022 sonrası Avrupa'nın doğal gaz arayışı).
- Boru hatları ülkeler arasında **karşılıklı bağımlılık** ve siyasi etki yaratır.

# Çatışma Bölgelerinin Coğrafi Analizi
Çatışmaların coğrafi nedenleri:
- **Kaynak rekabeti:** Petrol, doğal gaz, **su** (sınıraşan nehirler), maden.
- **Stratejik konum:** Geçitler, boğazlar, limanlar.
- **Sınır anlaşmazlıkları**, etnik ve dinî çeşitlilik, sömürgecilikten kalan yapay sınırlar.
- Örnek bölgeler: **Orta Doğu**, Kafkasya, Sahra Altı Afrika, Keşmir, Doğu Avrupa (Ukrayna).
- Sonuçları: **göç ve mülteci** akımları, ekonomik çöküş, çevresel tahribat, küresel enerji ve gıda fiyatlarında artış.
""",
  [("Hürmüz Boğazı'nın kapanması dünya ekonomisini neden etkiler?", "Basra Körfezi ülkelerinin petrol ve LNG ihracatının büyük bölümü buradan geçer; geçişin kesilmesi **enerji arzını azaltır**, petrol fiyatlarını yükseltir ve buna bağlı olarak ulaşım ve üretim maliyetlerini artırır.")],
  ["Gelişmişlik: İGE, sektörler, nüfus göstergeleri.", "Stratejik geçitler: Hürmüz, Süveyş, Malakka, Türk Boğazları.", "Çatışma nedenleri: kaynak, konum, sınır, etnik yapı."]),
]),
U("u4", "4. Ünite: Çevre ve Toplum", "Unit 4: Environment and Society", [
O("k1", "4.1", "Sürdürülebilir kalkınma ve uluslararası çevre anlaşmaları", "Sustainable development and international environmental agreements", r"""
# Doğal Çevrenin Sınırlılığı
Kaynaklar sınırlıdır; doğanın yenilenme kapasitesi aşıldığında **ekolojik açık** oluşur (limit aşım günü). **Ekolojik ayak izi:** Bir kişinin ya da toplumun tüketimini karşılamak için gereken biyolojik verimli alan.

# Sürdürülebilir Kalkınma
**Brundtland Raporu (1987):** "Bugünün ihtiyaçlarını, gelecek kuşakların kendi ihtiyaçlarını karşılama imkânından ödün vermeden karşılamak."
- Üç boyut: **çevresel, ekonomik, sosyal**.
- **BM Sürdürülebilir Kalkınma Amaçları (2015, 17 amaç, 2030 hedefi):** yoksulluğa son, açlığa son, temiz su, erişilebilir ve temiz enerji, iklim eylemi, sudaki ve karadaki yaşam…

# Uluslararası Anlaşmalar ve Konferanslar
| Anlaşma | Yıl | Konu |
|---|---|---|
| **Ramsar Sözleşmesi** | 1971 | Sulak alanların korunması |
| **Stockholm Konferansı** | 1972 | İlk BM çevre konferansı; **UNEP** kuruldu |
| **Dünya Mirası Sözleşmesi (UNESCO)** | 1972 | Doğal ve kültürel mirasın korunması |
| **CITES** | 1973 | Nesli tehlikedeki türlerin ticareti |
| **Bern Sözleşmesi** | 1979 | Avrupa'nın yaban hayatı ve habitatları |
| **Barselona Sözleşmesi** | 1976 | Akdeniz'in kirliliğe karşı korunması |
| **Montreal Protokolü** | 1987 | **Ozon** tabakasını incelten maddeler (CFC) |
| **Rio Zirvesi** | 1992 | İklim Değişikliği Çerçeve Sözleşmesi, **Biyolojik Çeşitlilik Sözleşmesi**, Gündem 21 |
| **Kyoto Protokolü** | 1997 | Sera gazı azaltımında bağlayıcı hedefler |
| **Paris Anlaşması** | 2015 | Isınmayı 2 °C'nin altında, mümkünse 1,5 °C'de tutmak |

Türkiye Paris Anlaşması'nı **2021**'de onaylamış, **2053 net sıfır emisyon** hedefini açıklamıştır. **Sıfır Atık** projesi (2017) atıkların kaynağında ayrıştırılmasını hedefler.
""",
  [("Montreal Protokolü neden en başarılı çevre anlaşmalarından biri sayılır?", "Ozon tabakasını incelten CFC gibi maddelerin üretimi neredeyse tüm ülkelerce **aşamalı olarak durdurulmuş** ve ozon tabakasının **iyileşmeye** başladığı ölçümlerle gösterilmiştir.")],
  ["Sürdürülebilir kalkınma: Brundtland 1987; çevre-ekonomi-toplum.", "Montreal (ozon), Rio (iklim, biyoçeşitlilik), Kyoto, Paris.", "Türkiye: 2053 net sıfır, Sıfır Atık."]),
O("k2", "4.2", "Ortak doğal ve kültürel mirasın korunması; STK'lar ve bireysel sorumluluk", "Protecting shared heritage; NGOs and individual responsibility", r"""
# Ortak Miras
**UNESCO Dünya Mirası Listesi:** İnsanlık için olağanüstü evrensel değere sahip doğal ve kültürel alanlar.
- **Türkiye'den örnekler:** İstanbul Tarihî Alanları, **Göreme Millî Parkı ve Kapadokya**, **Hierapolis–Pamukkale**, Divriği Ulu Camii ve Darüşşifası, Hattuşa, Nemrut Dağı, Safranbolu, Truva, Selimiye Camii, Çatalhöyük, Bergama, Bursa ve Cumalıkızık, Efes, Ani, Afrodisias, Diyarbakır Kalesi ve Hevsel Bahçeleri, **Göbeklitepe**, Arslantepe, Gordion.
- Ayrıca **Somut Olmayan Kültürel Miras** listesi: Karagöz, âşıklık, Nevruz, kahve kültürü, ebru, Mevlevi sema töreni.

# Tehditler
- Plansız kentleşme ve turizm baskısı
- **İklim değişikliği** (deniz seviyesi yükselmesi, aşırı sıcaklar)
- Doğal afetler (deprem), savaşlar ve **yağma**
- Hava kirliliği ve asit yağmurlarının tarihî yapıları aşındırması
- Barajların tarihî alanları su altında bırakması

# Koruma Çabaları
- Ulusal mevzuat: **Millî parklar**, tabiat parkları, **sit alanları**, Kültür ve Turizm Bakanlığı ile Tarım ve Orman Bakanlığı.
- **Sivil toplum kuruluşları (STK):** TEMA Vakfı (erozyon, ağaçlandırma), WWF-Türkiye, Doğa Derneği, TÜRÇEV, Greenpeace — farkındalık, kampanya, gönüllü çalışma, politika önerisi.
- **Bireysel sorumluluk:** Su ve enerji tasarrufu, geri dönüşüm, toplu taşıma, tek kullanımlık plastiklerden kaçınma, doğaya ve tarihî alanlara saygı, bilinçli tüketim, gönüllülük.
""",
  [("Bir lise öğrencisinin çevre sorunlarının çözümüne bireysel olarak katkı sağlayabileceği üç davranış yazınız.", "Örnek: **Atıkları kaynağında ayrıştırmak** (Sıfır Atık), **su ve elektriği tasarruflu kullanmak**, mümkün olduğunca **toplu taşıma ve bisiklet** kullanmak; ayrıca bir STK'nın ağaçlandırma veya temizlik etkinliğine gönüllü katılmak.")],
  ["UNESCO Dünya Mirası: Türkiye'den Göbeklitepe, Kapadokya, Efes…", "Tehditler: kentleşme, iklim, savaş, kirlilik.", "Koruma: mevzuat, STK'lar (TEMA, WWF), bireysel sorumluluk."]),
]),
]


# Ek not paketi: ilgili ünitelerin sonuna yeni kazanımlar (mevcut kimlikler değişmez).
for _u in units:
    _u["outcomes"] += EK.get(_u["id"], [])

write("cog-12.js", "12/cografya", "12. Sınıf Coğrafya — detaylı konu anlatım notları",
      "kullanıcının verdiği \"Coğrafya 12 Detaylı Konu Anlatım Notları\" (4 ünite) ve ek not paketindeki \"12. Sınıf Coğrafya Konu Özetleri – Tüm Üniteler\" (ekstrem değerler, iklim değişikliği, coğrafi bölgeler, ulaşım, ticaret, turizm, kalkınma projeleri, nüfus politikaları, ilk kültür merkezleri, ülke örnekleri, örgütler, teknoloji–çevre, sınırlı kaynaklar).",
      units, "Kaynak notlar yalnızca kazanım başlıklarını ve kısa özetleri içerdiği için her ünite ders kitabı düzeyinde genişletildi (afet yönetimi döngüsü, kalkınma projeleri tablosu, gelişmişlik göstergeleri, çevre anlaşmaları kronolojisi, örnek sorular). İstatistikler yaklaşık verilmiştir. Ek paketteki eski veriler (2000 sayımı, 2006–2007) güncel ve kalıcı bilgilerle değiştirildi; ek kazanımlar cog12_ek.py dosyasındadır.")
