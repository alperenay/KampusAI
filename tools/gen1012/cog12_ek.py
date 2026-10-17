# -*- coding: utf-8 -*-
"""12. Sınıf Coğrafya — ek not paketi ("12. Sınıf Coğrafya Konu Özetleri – Tüm Üniteler") ile
genişletilen kazanımlar. cog12.py bunları ilgili ünitelerin sonuna ekler (mevcut kazanım
kimlikleri değişmez). Kaynaktaki eski istatistikler (2000 sayımı, 2006–2007 verileri) yerine
kalıcı bilgiler ve sıralamalar kullanıldı; sayı verilen yerlerde yaklaşık değer ve yıl belirtildi."""
from _c import O

EK = {
"u1": [
O("k3", "1.3", "Dünyanın ve Türkiye'nin ekstrem değerleri", "Extreme values of the world and Türkiye", r"""
# Ekstrem Değer Nedir?
İklim elemanlarının (sıcaklık, yağış, basınç, rüzgâr, kar) **ölçülmüş en yüksek ve en düşük** değerleridir. Ekstrem değerler, ortalamaların gizlediği **uç koşulları** gösterir ve afet riskini değerlendirmede kullanılır.

# Dünyada Ekstremler
| Eleman | Değer | Yer | Neden |
|---|---|---|---|
| **En yüksek sıcaklık** | ≈ 56,7 °C | **Ölüm Vadisi** (ABD, 1913) | Deniz seviyesinin altında çukur, kurak, güneşlenme fazla |
| **En düşük sıcaklık** | −89,2 °C | **Vostok** (Antarktika, 1983) | Yüksek buz platosu, kutup gecesi, kuru hava |
| **En sıcak yıllık ortalama** | ≈ 34 °C | **Dallol** (Etiyopya) | Ekvatora yakın çöküntü alanı |
| **En çok yıllık yağış** | > 11 000 mm | **Cherrapunji / Mawsynram** (Hindistan) | **Muson** rüzgârlarının dağ yamacına çarpması (orografik) |
| **En kurak yer** | yıllık < 1 mm | **Atacama Çölü – Arica** (Şili) | **Soğuk Humboldt akıntısı**, dağların yağış gölgesi, dinamik yüksek basınç |

> 1922 Libya El Azizia kaydı (58 °C) ölçüm hatası gerekçesiyle **Dünya Meteoroloji Örgütü tarafından geçersiz sayılmıştır**; eski kaynaklarda hâlâ geçer.

# Türkiye'de Ekstremler (MGM kayıtları)
| Eleman | Yer | Açıklama |
|---|---|---|
| **En yüksek sıcaklık** | **Güneydoğu Anadolu** (Cizre/Silopi; 2021'de ≈ 49 °C) | Ekvatora yakınlık, Basra alçak basıncı, kuru hava |
| **En düşük sıcaklık** | **Van–Çaldıran** (−46,4 °C, 1990) | Yükselti, karasallık, kışın yüksek basınç |
| **En çok yağış** | **Rize** (Doğu Karadeniz, yıllık 2000 mm+) | Nemli rüzgârların dağlara dik çarpması |
| **En az yağış** | **Iğdır** ve Tuz Gölü çevresi (300 mm altı) | Çevresi dağlarla çevrili çanak (yağış gölgesi) |
| **En kalın kar örtüsü** | **Bitlis**, Hakkâri, Erzurum çevresi | Yükselti + Akdeniz kökenli nemli hava |
| **En düşük basınç** | Van–Başkale | Yükselti |
| **Günlük en çok yağış** | Antalya–Kemer çevresi | Akdeniz cephe yağışları + Toroslar |

# Ekstrem Olaylardaki Artış
- 20. yüzyılın ikinci yarısından itibaren **hava kaynaklı afetlerin sayısı ve ekonomik kayıpları belirgin şekilde artmıştır**: ısı dalgaları, ani sağanaklar (taşkın, kanalizasyon taşması, heyelan), kasırgalar, **orman yangınları**, buz fırtınaları.
- Nedenleri: **küresel ısınma** ile atmosferdeki enerji ve nem artışı + nüfus ve yapılaşmanın riskli alanlara yayılması (zarar görebilirlik).
""",
  [("Atacama Çölü'nün dünyanın en kurak yerlerinden biri olmasının nedenleri nelerdir?", "1) Kıyı boyunca akan **soğuk Humboldt akıntısı** havanın alt katını soğutarak yükselici hareketi engeller; 2) **dinamik yüksek basınç** (dönenceler); 3) **And Dağları**'nın doğudan gelen nemi kesmesi (yağış gölgesi)."),
   ("Türkiye'de en düşük sıcaklığın Doğu Anadolu'da ölçülmesi hangi faktörlerle açıklanır?", "**Yükseltinin fazla** olması, **denizden uzaklık (karasallık)**, kışın bölgeye yerleşen **soğuk yüksek basınç** ve açık havada **ışıma ile soğuma**.")],
  ["Dünyada en sıcak: Ölüm Vadisi; en soğuk: Vostok; en yağışlı: Hindistan (muson); en kurak: Atacama.", "Türkiye: en sıcak GD Anadolu, en soğuk Van–Çaldıran, en yağışlı Rize, en kurak Iğdır.", "Ekstrem hava olaylarının sıklığı küresel ısınmayla artıyor."]),
O("k4", "1.4", "Küresel iklim değişikliği ve gelecek senaryoları", "Global climate change and future scenarios", r"""
# Küresel Isınma
İnsan faaliyetleriyle atmosfere verilen **sera gazlarının** (CO₂, metan, azot oksitler, florlu gazlar) sera etkisini güçlendirmesi sonucu atmosferin ve okyanusların ortalama sıcaklığının artmasıdır.
- Sanayi öncesine göre Dünya ortalama sıcaklığı **≈ 1,1–1,2 °C** artmıştır (IPCC).
- **Kaynaklar:** fosil yakıtlar (enerji, ulaşım, sanayi), **ormansızlaşma**, hayvancılık ve çeltik (metan), çöp depolama.

# Olası Sonuçlar ("Yarından Sonra" senaryoları)
| Alan | Etki |
|---|---|
| **Buzullar** | Grönland, Antarktika ve dağ buzullarının erimesi; tatlı su kaynaklarının azalması |
| **Deniz seviyesi** | Yükselme → **Maldivler**, **Hollanda**, Bangladeş ve kıyı kentleri (Londra, New York, Tokyo, İstanbul'un kıyı alanları) taşkın riski |
| **Atmosfer** | Isı dalgaları, kuraklık, şiddetli sağanaklar, güçlü tropikal siklonlar |
| **Okyanus** | Isınma, **asitlenme**, mercan resiflerinin ağarması; akıntı sistemlerinde (Golf Akıntısı) zayıflama riski |
| **Biyoçeşitlilik** | Türlerin kutuplara ve yükseklere göçü, **tür kayıplarının hızlanması**; kutup ayısı, mercanlar, yabani bitki akrabaları tehlikede |
| **Tarım** | Tarım kuşaklarının kayması, verim düşüşü, zararlıların yayılması |
| **İnsan** | Su ve gıda güvenliği sorunları, **iklim göçü**, salgın hastalıkların yayılış alanının genişlemesi |

# Türkiye Açısından
Akdeniz havzası iklim değişikliğinden **en çok etkilenecek** alanlardandır: kuraklık, su stresi (Konya Ovası, obruklar), orman yangınları, kıyılarda deniz seviyesi yükselmesi, kar örtüsünün azalması.

# Mücadele
- **Azaltım (mitigasyon):** Yenilenebilir enerji, enerji verimliliği, toplu taşıma, ağaçlandırma, karbon fiyatlandırması.
- **Uyum (adaptasyon):** Kuraklığa dayanıklı tarım, damla sulama, taşkın planlaması, kıyı koruma.
- **Anlaşmalar:** BM İklim Değişikliği Çerçeve Sözleşmesi (1992), **Kyoto Protokolü** (1997), **Paris Anlaşması** (2015; ısınmayı 2 °C'nin, mümkünse 1,5 °C'nin altında tutma). Türkiye Paris Anlaşması'nı 2021'de onaylamış ve **2053 net sıfır emisyon** hedefini açıklamıştır.
""",
  [("Deniz seviyesinin yükselmesinden en çok etkilenecek ülkelere iki örnek verip nedenini açıklayınız.", "**Maldivler** (ortalama yükseltisi 1–2 m olan mercan adaları) ve **Hollanda** (topraklarının önemli kısmı deniz seviyesinin altında, **polderler**). Bangladeş'in delta alanları da büyük risk altındadır."),
   ("Mitigasyon ile adaptasyon arasındaki fark nedir?", "**Mitigasyon (azaltım)** sera gazı salımını azaltarak sorunun kaynağına müdahaledir (yenilenebilir enerji). **Adaptasyon (uyum)** değişen koşullara uyum sağlayarak zararı azaltmadır (damla sulama, set yapımı).")],
  ["Küresel ısınma: sera gazları ↑ → ortalama sıcaklık ↑.", "Sonuçlar: buzul erimesi, deniz seviyesi ↑, aşırı hava olayları, tür kaybı.", "Paris Anlaşması; Türkiye 2053 net sıfır hedefi."]),
],

"u2": [
O("k4", "2.4", "Türkiye'nin coğrafi bölgeleri I: belirlenmesi, Karadeniz, Marmara, Ege", "Geographical regions of Türkiye I: Black Sea, Marmara, Aegean", r"""
# Bölgelerin Belirlenmesi
- **1941 Birinci Coğrafya Kongresi** (Ankara) Türkiye'yi **7 bölge ve 21 bölüme** ayırmıştır.
- Ölçütler: **denize göre konum, yer şekilleri, iklim ve bitki örtüsü**; bunların etkilediği tarım, yerleşme ve ekonomi. Bölge sınırları kesin çizgiler değil, **geçiş alanlarıdır**.
- Alan sıralaması: **Doğu Anadolu > İç Anadolu > Karadeniz > Akdeniz > Ege > Marmara > Güneydoğu Anadolu**.

# Karadeniz Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Batı, Orta, Doğu Karadeniz** |
| Kıyı | Dağlar kıyıya **paralel** → **boyuna kıyı**, az girintili; **falez** yaygın; tek doğal liman **Sinop** |
| Dağlar | Küre (İsfendiyar), Bolu, Ilgaz, Köroğlu, Canik, **Doğu Karadeniz (Kaçkar 3932 m)**, Giresun dağları; Zigana ve Kop geçitleri |
| Akarsu ve ova | **Kızılırmak** (en uzun), Yeşilırmak, Çoruh, Filyos, Bartın Çayı; **Bafra ve Çarşamba delta** ovaları |
| Göller | **Sera, Tortum** (heyelan set), Abant, Yedigöller |
| İklim | Kıyıda **her mevsim yağışlı Karadeniz iklimi** (en çok yağış sonbaharda); iç kesimlerde karasala geçiş |
| Tarım | **Fındık** (Ordu, Giresun – dünyada 1.), **çay** (Rize), **mısır**, tütün, keten–kenevir, soya |
| Maden ve sanayi | **Taş kömürü** (Zonguldak – Türkiye'de tek), **bakır** (Murgul, Küre, Çayeli); **demir-çelik** (Karabük, Ereğli) |
| Nüfus | **Dağınık kırsal yerleşme**, ahşap evler, yayla göçü; **en çok göç veren** bölgelerden |
| Öne çıkanlar | Orman oranı ve yağış **en fazla**; **heyelan** en sık; nadas en az; güneşlenme süresi en az; Sümela, Safranbolu evleri, yayla turizmi |

# Marmara Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Yıldız Dağları (Istranca), Ergene, Çatalca–Kocaeli, Güney Marmara** |
| Yer şekilleri | **Ortalama yükseltisi en az** bölge; en yüksek nokta **Uludağ (2543 m)**; **boğazlar ria** tipi; Kapıdağ bir **tombolo** |
| Göller | **İznik, Manyas, Uluabat, Sapanca** (tektonik); **Terkos, Küçük ve Büyükçekmece** (kıyı set) |
| İklim | Geçiş iklimi: kuzeyde Karadeniz, Trakya içinde karasal, güneyde bozulmuş Akdeniz iklimi |
| Tarım | **Ayçiçeği** (Ergene – 1.), **çeltik** (Meriç–Ergene), şeftali, kestane, zeytin, şeker pancarı; **ipekböcekçiliği** (Bursa), besi ve kümes hayvancılığı |
| Maden | **Bor** (Balıkesir–Bigadiç, Susurluk), **volfram** (Uludağ), mermer (Marmara Adası), doğal gaz (Trakya) |
| Sanayi | **İstanbul–Kocaeli–Sakarya–Bursa** sanayi kuşağı: otomotiv, petrokimya (İzmit rafinerisi), dokuma, gıda |
| Öne çıkanlar | Nüfus ve nüfus yoğunluğu, **şehirleşme oranı, sanayi, ticaret, iç göç alma** bakımından 1.; enerji **tüketimi** en fazla, üretimi azdır |

# Ege Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Asıl Ege, İç Batı Anadolu** |
| Yer şekilleri | Dağlar kıyıya **dik** → **enine kıyı**, çok girintili (en uzun kıyı; Muğla en uzun kıyılı il); **horst–graben** yapısı: Kaz, Madra, Yunt, Bozdağlar, Aydın dağları horst; **Bakırçay, Gediz, Küçük ve Büyük Menderes** graben ovaları |
| İklim | Grabenler deniz etkisini içeri taşır → Asıl Ege'de **Akdeniz iklimi (maki)**; iç kesimde karasal (bozkır) |
| Tarım | **Zeytin, incir** (Aydın), **üzüm** (Gediz – Manisa), **tütün, pamuk**, haşhaş (Afyon, kontrollü), şeker pancarı |
| Maden ve enerji | **Linyit** (Soma, Tunçbilek, Yatağan), **bor** (Kütahya–Emet), krom, **mermer** (Afyon, Denizli), **jeotermal** (Denizli–Sarayköy, Aydın) |
| Sanayi ve ticaret | **İzmir**: liman, fuar, Aliağa rafinerisi; dokuma (Denizli, Uşak) |
| Turizm | Efes, Bergama, Pamukkale, Afrodisias, Bodrum–Marmaris kıyıları |
""",
  [("Ege kıyılarının girintili çıkıntılı, Karadeniz kıyılarının ise düz olmasının nedeni nedir?", "Ege'de dağlar kıyıya **dik** uzanır (**enine kıyı**), aralarındaki grabenler koy ve körfezleri oluşturur. Karadeniz'de dağlar kıyıya **paralel** uzandığı için kıyı az girintilidir (**boyuna kıyı**)."),
   ("Marmara Bölgesi'nde sanayinin gelişmesini sağlayan etkenler nelerdir?", "**Ulaşım kolaylığı** (kara–deniz–demir yolu, boğazlar), **geniş pazar ve nüfus**, **sermaye birikimi**, **nitelikli iş gücü**, limanlar, hinterlandın genişliği ve tarihsel ticaret merkezi olması.")],
  ["1941 Coğrafya Kongresi: 7 bölge, 21 bölüm.", "Karadeniz: boyuna kıyı, fındık–çay, taş kömürü, heyelan.", "Marmara: en alçak, sanayi ve nüfus 1.; Ege: horst–graben, zeytin–incir–üzüm."]),
O("k5", "2.5", "Türkiye'nin coğrafi bölgeleri II: Akdeniz, Güneydoğu, Doğu ve İç Anadolu", "Geographical regions of Türkiye II", r"""
# Akdeniz Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Adana, Antalya** |
| Yer şekilleri | **Batı ve Orta Toroslar** kıyıya paralel; dar kıyı ovaları; **Çukurova** (Seyhan–Ceyhan deltası), Antalya traverten platosu, Göller Yöresi (Eğirdir, Beyşehir); **karstik** şekiller (Damlataş Mağarası, obruklar, polyeler) |
| İklim | **Tipik Akdeniz iklimi**: yazlar sıcak–kurak, kışlar ılık–yağışlı; bitki örtüsü **maki** ve kızılçam |
| Tarım | **Turunçgiller, muz** (Anamur, Alanya), **pamuk, yer fıstığı, soya** (Çukurova), **seracılık** (Antalya – erkenci sebze) |
| Sanayi | Adana–Mersin: dokuma, gıda; **İskenderun demir-çelik**; Mersin limanı ve serbest bölge; **Ceyhan petrol terminali** (BTC) |
| Turizm | Kıyı turizmi en gelişmiş bölge (Antalya); Olimpos, Side, Aspendos |

# Güneydoğu Anadolu Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Orta Fırat, Dicle** |
| Yer şekilleri | Alanı **en küçük**; geniş **platolar** (Gaziantep, Şanlıurfa), **Karacadağ** volkanı, **Mardin Eşiği**, Harran Ovası |
| İklim | Yazlar **çok sıcak ve kurak**, buharlaşma fazla; batıda Akdeniz etkisi; bitki örtüsü bozkır |
| Tarım | **Antep fıstığı** (Gaziantep, Siirt), **kırmızı mercimek**, pamuk (GAP sulamasıyla Şanlıurfa 1.), buğday, arpa |
| Maden ve enerji | **Petrol** (Batman, Adıyaman – Türkiye'nin başlıca üretim alanı), fosfat (Mazıdağı); **Atatürk, Karakaya, Ilısu** barajları |
| Öne çıkanlar | Doğal nüfus artışı en yüksek; **GAP** ile sulu tarım ve sanayi gelişiyor; Göbeklitepe, Zeugma, Mardin taş mimarisi |

# Doğu Anadolu Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Yukarı Fırat, Erzurum–Kars, Yukarı Murat–Van, Hakkâri** |
| Yer şekilleri | **Alanı ve ortalama yükseltisi en fazla**; volkanik dağlar (**Ağrı 5137 m**, Süphan, Nemrut, Tendürek); yüksek ova ve platolar (Erzurum, Muş, Iğdır, Erzurum–Kars platosu) |
| Göller | **Van Gölü** (volkanik set, sodalı – en büyük gölümüz), Hazar (tektonik), Çıldır (volkanik set) |
| İklim | **Sert karasal**: kışlar uzun ve çok soğuk, kar yağışı fazla; yaz yağışları; bitki örtüsü **çayır–otlak** |
| Ekonomi | **Büyükbaş hayvancılık** (mera), Iğdır'da pamuk ve kayısı; **kayısı** (Malatya – dünyada 1.); **demir** (Divriği), krom (Guleman); **Keban, Karakaya** barajları |
| Öne çıkanlar | Nüfus yoğunluğu en az, **göç veren**; kış turizmi (Palandöken, Sarıkamış); Ahlat, İshak Paşa Sarayı, Ani |

# İç Anadolu Bölgesi
| Konu | Özellikler |
|---|---|
| Bölümler | **Konya, Yukarı Sakarya, Orta Kızılırmak, Yukarı Kızılırmak** |
| Yer şekilleri | Etrafı dağlarla çevrili **ova ve platolar**: Konya, Eskişehir, Ankara, Haymana, Cihanbeyli, Obruk platoları; **Erciyes, Hasandağı, Melendiz** volkanları; **peribacaları** (Kapadokya) |
| Göller | **Tuz Gölü** (tektonik, sığ, tuz üretimi), obruk gölleri; **Hirfanlı** baraj gölü |
| İklim | **Karasal**: yazlar sıcak–kurak, kışlar soğuk–karlı; yağış en çok ilkbaharda; **bozkır**; **kuraklık ve obruk** sorunu |
| Ekonomi | **Buğday** (Türkiye'nin tahıl ambarı), arpa, şeker pancarı, patates (Niğde, Nevşehir); **tiftik keçisi** (Ankara), merinos; **bor** (Eskişehir), **tuz** (Tuz Gölü), linyit (Ankara); Ankara ve Konya sanayisi |
| Öne çıkanlar | **Nadas** uygulaması en fazla; **KOP** ve **Mavi Tünel**; başkent Ankara; Kapadokya, Çatalhöyük, Hattuşa |
""",
  [("İç Anadolu'da nadasın yaygın olmasının nedeni nedir?", "Yağışın **az** olması nedeniyle toprağın bir yıl boş bırakılarak **nem biriktirmesi** gerekir. Sulama imkânı arttıkça nadas alanları azalır."),
   ("Doğu Anadolu'da büyükbaş hayvancılığın yaygın olmasının coğrafi nedenleri nelerdir?", "**Yükselti ve sert karasal iklim** tarımı kısıtlar; yaz yağışlarıyla gelişen geniş **çayır ve otlaklar** (yaylalar) büyükbaş hayvancılığa uygundur.")],
  ["Akdeniz: Toroslar, Çukurova, turunçgil–muz–seracılık, kıyı turizmi.", "GD Anadolu: en küçük, en sıcak yazlar, petrol, Antep fıstığı, GAP.", "Doğu Anadolu: en yüksek, hayvancılık, Van Gölü; İç Anadolu: buğday, nadas, Tuz Gölü."]),
O("k6", "2.6", "Türkiye'de ulaşım sistemleri", "Transport systems in Türkiye", r"""
# Ulaşımı Etkileyen Faktörler
| Doğal | Beşerî |
|---|---|
| **Yer şekilleri** (dağların kıyıya paralel uzanması, eğim, geçitler), **iklim** (kar, sis, buzlanma, heyelan), akarsuların düzensiz rejimi | Nüfus ve yerleşme dağılışı, ekonomik faaliyetler, teknoloji ve sermaye, siyasi ve stratejik kararlar |

- Kuzey Anadolu ve Toros dağları kıyı ile iç kesimler arasındaki ulaşımı **geçitlere** bağlar: **Gülek** (Toroslar, Çukurova–İç Anadolu), **Zigana** ve **Kop** (Doğu Karadeniz), **Belen** (Amanos), **Sertavul** (Orta Toros).
- Doğu Karadeniz'de **heyelan**, Doğu Anadolu'da **kar ve çığ** ulaşımı aksatır; bu nedenle **tüneller** (Zigana, Ovit, Ilgaz, Bolu tünelleri) yapılmıştır.

# Ulaşım Türleri
| Tür | Özellikler |
|---|---|
| **Kara yolu** | Yolcu ve yük taşımacılığında **en büyük pay** (≈ %90); esnek, kapıdan kapıya; **bölünmüş yol ve otoyol** ağı hızla genişledi; Osmangazi, Yavuz Sultan Selim, 1915 Çanakkale köprüleri |
| **Demir yolu** | Ucuz, güvenli, ağır yüke uygun; ağı yetersiz; **Yüksek Hızlı Tren** (Ankara–İstanbul, Ankara–Konya, Ankara–Sivas); **Marmaray** (Boğaz altı); **Bakü–Tiflis–Kars** demir yolu (Orta Koridor) |
| **Deniz yolu** | Dış ticarette **en büyük pay** (≈ %85+); başlıca limanlar: **Ambarlı, Mersin, İzmir (Alsancak), Kocaeli limanları, İskenderun, Samsun, Trabzon**; Türk Boğazları dünya ticaretinin kritik geçidi |
| **Hava yolu** | Hızlı, pahalı; **İstanbul Havalimanı** dünyanın en büyük aktarma merkezlerinden; turizmde önemli |
| **Boru hattı** | Petrol ve doğal gaz taşımacılığı: **Bakü–Tiflis–Ceyhan** (petrol), **TANAP**, **TürkAkım**, Mavi Akım (doğal gaz), Irak–Türkiye (Kerkük–Yumurtalık) |
| **İç su yolu** | Akarsular kısa, eğimli, rejimi düzensiz → **gelişmemiştir**; Bartın Çayı'nın kısa bir bölümü, baraj gölleri ve Van Gölü'nde sınırlı ulaşım |

# Ulaşım ve Kalkınma
Ulaşım ağı yoğun olan bölgelerde (Marmara, Ege) **sanayi, ticaret ve turizm** gelişmiştir. **Lojistik merkezler**, limanlar ve demir yolu bağlantıları Türkiye'yi Asya–Avrupa arasında bir **transit koridor** yapar.
""",
  [("Türkiye'de akarsu ulaşımının gelişmemesinin nedenleri nelerdir?", "Akarsuların **eğimi fazla, yatakları kısa ve rejimleri düzensizdir**; birçoğu **şelale ve çağlayanlarla** kesilir, yazın suları azalır ve çoğu **barajlarla** kesilmiştir."),
   ("Dış ticarette deniz yolunun, yurt içi taşımacılıkta kara yolunun payının yüksek olması nasıl açıklanır?", "Deniz yolu **büyük hacimli yükü ucuza** uzak mesafeye taşır ve Türkiye üç tarafı denizlerle çevrilidir. Kara yolu ise **esnek, kapıdan kapıya** ulaşım sağlar ve ağı en yaygın olandır.")],
  ["Yer şekilleri ulaşımı geçit ve tünellere bağlar.", "Kara yolu iç taşımada, deniz yolu dış ticarette 1.", "Boru hatları: BTC, TANAP, TürkAkım."]),
O("k7", "2.7", "Türkiye'de ticaret ve turizm", "Trade and tourism in Türkiye", r"""
# Ticaret
- **İç ticaret:** Ülke içinde mal ve hizmet alışverişi. Gelişmesini sağlayan etkenler: ulaşım ağı, nüfus, gelir düzeyi, bölgeler arası üretim farklılıkları. En gelişmiş merkezler **İstanbul, Ankara, İzmir, Bursa**.
- **Dış ticaret:** İhracat (dışsatım) ve ithalat (dışalım). **Dış ticaret açığı:** ithalat > ihracat.

| İhraç ettiği başlıca ürünler | İthal ettiği başlıca ürünler |
|---|---|
| **Otomotiv** ve yedek parça, **makine**, **demir-çelik**, **hazır giyim ve tekstil**, elektrikli cihazlar (beyaz eşya), kimyasallar, **fındık, kuru meyve**, mücevher, gemi ve savunma sanayi ürünleri | **Enerji** (ham petrol, doğal gaz), makine ve teknoloji ürünleri, **ara mallar**, kimyasallar, demir-çelik hurdası, altın |

- Başlıca ticaret ortakları: **Avrupa Birliği** (Almanya, İngiltere, İtalya, Fransa), Rusya, Çin, ABD, Irak, Birleşik Arap Emirlikleri.
- **Serbest bölgeler** (Mersin, İzmir–Ege, İstanbul, Antalya, Trabzon…), **gümrük birliği** (AB, 1996) ve **sınır ticareti** dış ticareti destekler.
- Dış ticaret açığının en önemli nedeni **enerji ithalatıdır**.

# Turizm
**Turizmi etkileyen faktörler:**
| Doğal | Beşerî |
|---|---|
| **İklim** (uzun yaz, deniz suyu sıcaklığı), **kıyılar** ve plajlar, dağlar (kayak, yayla), **termal kaynaklar**, mağaralar, göller, doğal güzellikler (Pamukkale, Kapadokya) | **Tarihî ve kültürel miras** (Anadolu'nun uygarlıklar kavşağı olması), ulaşım ve konaklama, güvenlik, tanıtım, fiyat, inanç turizmi |

| Turizm türü | Örnekler |
|---|---|
| Deniz–kum–güneş | **Antalya**, Muğla (Bodrum, Marmaris, Fethiye), İzmir, Aydın |
| Kültür ve tarih | İstanbul, **Efes**, Truva, **Göbeklitepe**, Çatalhöyük, Hattuşa, Nemrut Dağı, Ani |
| Kış | **Uludağ, Palandöken, Erciyes, Kartalkaya, Sarıkamış** |
| Termal (sağlık) | Afyonkarahisar, Denizli, Bursa, Yalova, Kızılcahamam |
| Yayla ve ekoturizm | Doğu Karadeniz yaylaları (Ayder, Uzungöl), rafting (Çoruh, Köprülü Kanyon) |
| İnanç | Meryem Ana Evi, Mevlana Türbesi, Harran, Sümela |

- **UNESCO Dünya Mirası Listesi**'nde Türkiye'den 20'yi aşkın alan bulunur (Göreme ve Kapadokya, İstanbul'un tarihî alanları, Divriği Ulu Camii, Safranbolu, Hierapolis–Pamukkale, Efes, Göbeklitepe, Gordion…).
- Turizmin katkıları: döviz geliri (dış ticaret açığını kapatma), istihdam, altyapı. Sorunları: **mevsimlik** yoğunlaşma, kıyı yapılaşması, çevre kirliliği.
""",
  [("Türkiye'nin dış ticaret açığı vermesinin başlıca nedeni nedir ve turizm bu açığı nasıl etkiler?", "Başlıca neden **enerji (petrol, doğal gaz) ithalatıdır**. Turizm, getirdiği **döviz geliriyle** cari açığın kapanmasına katkı sağlar."),
   ("Kış turizmi merkezlerimizin çoğunun Doğu Anadolu ve Marmara'da yer almasının nedenleri nelerdir?", "Kar örtüsünün **uzun süre kalması** (yükselti, karasallık), uygun eğimli dağlar ve **ulaşım–konaklama** altyapısı (Uludağ'ın büyük şehirlere yakınlığı, Palandöken'in havalimanına yakınlığı).")],
  ["İhracat: otomotiv, makine, tekstil, demir-çelik; ithalat: enerji, ara mallar.", "Dış ticaret açığının ana nedeni enerji ithalatı.", "Turizm: kıyı, kültür, kış, termal, yayla; UNESCO alanları."]),
O("k8", "2.8", "Bölgesel kalkınma projeleri ayrıntılı: GAP, DAP, DOKAP, KOP, YHGP, ZBK", "Regional development projects in detail", r"""
# Neden Bölgesel Kalkınma Projeleri?
Bölgeler arasındaki **gelişmişlik farklarını azaltmak**, kaynakları verimli kullanmak, **göçü önlemek** ve yaşam kalitesini artırmak için uygulanan çok sektörlü (tarım, sanayi, altyapı, eğitim, sağlık, turizm) planlardır. Bugün **kalkınma ajansları** ve bölge kalkınma idareleri tarafından yürütülür.

# Projeler
| Proje | Alan | Temel hedefler ve uygulamalar |
|---|---|---|
| **GAP** – Güneydoğu Anadolu Projesi | Adıyaman, Batman, Diyarbakır, Gaziantep, Kilis, Mardin, Siirt, Şanlıurfa, Şırnak (9 il) | Fırat ve Dicle üzerinde **22 baraj, 19 HES** planı; **Atatürk Barajı**, **Şanlıurfa Tünelleri** ile **Harran Ovası** sulaması; Ilısu Barajı; tarıma dayalı sanayi, organize sanayi bölgeleri, eğitim–sağlık, kadın ve gençlere yönelik **ÇATOM**'lar |
| **DAP** – Doğu Anadolu Projesi | Doğu Anadolu illeri | **Hayvancılık** ve mera ıslahı, organik tarım, sınır ticareti, kış ve kültür turizmi, altyapı |
| **DOKAP** – Doğu Karadeniz Projesi | Artvin, Bayburt, Giresun, Gümüşhane, Ordu, Rize, Trabzon (+ Samsun, Tokat, Çorum, Amasya genişlemesi) | **Yayla turizmi** (Yeşil Yol), çay ve fındık verimliliği, ulaşım (tüneller, limanlar), **göçün önlenmesi**, heyelan riskine karşı planlama |
| **KOP** – Konya Ovası Projesi | Konya, Karaman, Aksaray, Niğde (+ Kırşehir, Nevşehir, Yozgat, Kırıkkale) | **Kuraklık** ve yer altı suyu düşüşüyle mücadele; **Mavi Tünel** ile Göksu havzasından Konya Ovası'na su aktarımı; basınçlı (damla–yağmurlama) sulama; obruk riskinin azaltılması |
| **YHGP** – Yeşilırmak Havza Gelişim Projesi | Amasya, Çorum, Samsun, Tokat | Havzada **erozyon ve taşkın kontrolü**, su kalitesi, sürdürülebilir tarım, kırsal kalkınma |
| **ZBK** – Zonguldak–Bartın–Karabük Bölgesel Gelişme Projesi | Batı Karadeniz | Taş kömürü ve demir-çeliğe bağımlı ekonominin **çeşitlendirilmesi**, liman, turizm (Safranbolu, Amasra), çevre sorunlarının giderilmesi |

# Sonuçlar ve Sorunlar
- **Olumlu:** sulu tarıma geçiş (pamuk, mısır), enerji üretimi, istihdam, altyapı.
- **Sorunlar:** yanlış sulamada **toprak tuzlanması**, yer altı suyunun yükselmesi; baraj göllerinin tarihî alanları sular altında bırakması (**Hasankeyf**, Zeugma'nın bir kısmı); komşu ülkelerle **su paylaşımı** tartışmaları.
""",
  [("KOP'un öncelikli hedefi nedir ve neden?", "**Kuraklık ve su yetersizliğiyle mücadele.** Konya Ovası yağışı az, yer altı suyuna aşırı bağımlı bir tahıl alanıdır; aşırı çekim **obruk** oluşumunu artırmıştır. **Mavi Tünel** ile su aktarımı ve basınçlı sulama bu nedenle önemlidir."),
   ("DOKAP'ın göçü önlemeye yönelik uygulamalarına iki örnek veriniz.", "**Yayla turizmini** geliştirmek (Yeşil Yol projesi) ve **çay–fındık** gibi ürünlerde verimlilik ile tarıma dayalı sanayiyi desteklemek; ulaşım ve altyapıyı iyileştirmek.")],
  ["GAP: Fırat–Dicle, Atatürk Barajı, Harran sulaması.", "KOP: kuraklık, Mavi Tünel; DOKAP: yayla turizmi; YHGP: havza yönetimi; ZBK: ekonomik çeşitlendirme.", "Sorunlar: tuzlanma, tarihî alanların su altında kalması."]),
O("k9", "2.9", "Türkiye'nin nüfus politikaları", "Population policies of Türkiye", r"""
# Nüfus Politikası Nedir?
Devletin nüfusun **miktarı, artış hızı, yapısı ve dağılışı** üzerinde ekonomik ve sosyal hedeflerine göre uyguladığı politikalardır.

# Türkiye'de Dönemler
| Dönem | Politika | Nedenleri |
|---|---|---|
| **1923–1965** | **Nüfus artışını destekleyici (pronatalist)** | Savaşlar sonrası nüfus kaybı, iş gücü ve asker ihtiyacı, geniş boş araziler. Çok çocuklu ailelere ödül ve vergi indirimleri, evlenme yaşının düşürülmesi, doğum kontrolünün yasaklanması |
| **1965–1980'ler** | **Nüfus artışını sınırlayıcı (antinatalist)** | Hızlı artış (‰ 25–30) kalkınmayı yavaşlatıyordu: eğitim, sağlık, istihdam yetersizliği, kentlere aşırı göç. **1965 Nüfus Planlaması Kanunu**, aile planlaması hizmetleri |
| **1980'lerden 2000'lere** | Sınırlayıcı politika sürdü, **nitelik** vurgusu | Eğitim ve sağlık yatırımları; doğurganlık düştü |
| **2000'li yıllardan bugüne** | **Yeniden artışı destekleyici** + nitelikli nüfus | **Doğurganlığın yenilenme düzeyinin (2,1) altına inmesi** ve **nüfusun yaşlanması** riski. Doğum yardımı, çalışan annelere esnek çalışma, aile destek programları; "en az üç çocuk" söylemi |

# Günümüzde Türkiye Nüfusu
- Nüfus 85 milyonu aşmıştır; **artış hızı düşüyor**, toplam doğurganlık hızı 2023'te ≈ **1,5**'e gerilemiştir (TÜİK).
- **Ortanca yaş** yükseliyor (≈ 34); 65 yaş ve üstü nüfusun oranı artıyor → **demografik fırsat penceresi** daralıyor.
- Nüfus piramidi tabanı daralan, **gelişmekte olan ülke → gelişmiş ülke** yapısına geçiş gösteriyor.

# Nüfus Politikalarının Dayanakları
Ekonomik kalkınma hedefleri, iş gücü ihtiyacı, sosyal güvenlik sisteminin sürdürülebilirliği, eğitim–sağlık kapasitesi, savunma, kentleşme ve bölgesel dengeler.
""",
  [("Türkiye 1965'ten sonra neden nüfus artışını sınırlayan bir politikaya geçmiştir?", "Hızlı nüfus artışı **ekonomik büyümeyi aşıyor**; okul, sağlık, konut ve **istihdam** ihtiyacını karşılamak zorlaşıyor; kırdan kente göçle kentlerde **gecekondulaşma** artıyordu."),
   ("Günümüzde nüfus artışını destekleyen politikaların gerekçesi nedir?", "**Doğurganlığın yenilenme düzeyinin (2,1) altına düşmesi**, nüfusun **yaşlanması**, gelecekte çalışma çağındaki nüfusun azalması ve sosyal güvenlik sistemine yük binmesi riski.")],
  ["1923–65: artışı destekleyici; 1965 sonrası sınırlayıcı.", "2000'lerden itibaren yeniden destekleyici + nitelikli nüfus.", "Doğurganlık 2,1'in altında, nüfus yaşlanıyor."]),
],

"u3": [
O("k3", "3.3", "İlk kültür merkezleri ve insan–doğa etkileşimi", "Early cultural centres and human–nature interaction", r"""
# İlk Kültür Merkezleri ve Coğrafya
İlk uygarlıklar **verimli ırmak vadilerinde** doğdu: sulama yapılabilen alüvyal ovalar, ılıman iklim ve ulaşım kolaylığı **artı ürün** sağladı; artı ürün uzmanlaşmayı (zanaatkâr, din adamı, yönetici), yazıyı ve kentleri doğurdu.

| Kültür merkezi | Coğrafi temel | Öne çıkanlar |
|---|---|---|
| **Mezopotamya** | **Dicle–Fırat** arası ("iki nehir arası") | **Sümerler**: yazı (çivi yazısı, MÖ 3200 dolayları), ilk kent devletleri, zigguratlar, sulama kanalları; "medeniyetler beşiği" |
| **Mısır** | **Nil** vadisi ve taşkınları | Firavun (tanrı-kral) merkezli yönetim, hiyeroglif, piramitler, güneş takvimi, geometri |
| **Hint** | **İndus** ve Ganj vadileri | Mohenjo-Daro planlı kentleri; **kast sistemi** (Brahmanlar, soylular, savaşçı–tüccar–zanaatkârlar, köylü–işçiler; dışlananlar "parya"); Vedizm, Brahmanizm, Budizm |
| **Çin** | **Sarı Irmak (Huang He)** ve Yangtze | Kâğıt, pusula, barut, matbaa; ipek; Çin Seddi |
| **Maya** | Yukatan Yarımadası, Orta Amerika tropikal ormanları | Astronomi, gelişmiş takvim, sıfır kavramı, basamaklı piramitler; klasik dönem MS 250–900; Maya halkları ve dilleri **bugün yaşamaktadır** |
| **Aztek** | Meksika Platosu, **Texcoco Gölü** | Başkent **Tenochtitlan** (bugünkü Mexico City); **chinampa** (yüzen tarla) tarımı; 1521'de İspanyollarca yıkıldı |
| **Anadolu** | Bereketli Hilal'in kuzeyi | **Göbeklitepe** (MÖ 9600 – bilinen en eski anıtsal tapınak alanı), **Çatalhöyük**, Hititler, Urartular, Lidyalılar (para) |

# İnsanın Doğayı Değiştirmesi — Örnekler
| Örnek | Ne yapıldı? | Coğrafi anlamı |
|---|---|---|
| **Manş Tüneli** (1994) | İngiltere (Folkestone) ile Fransa (Calais) arasında, tebeşir tabakalarında açılan **≈ 50 km**'lik deniz altı demir yolu tüneli | Ada ile kıta arasındaki ulaşım engelinin aşılması |
| **Hollanda polderleri** | Denizden **setlerle** kazanılan, pompalarla kurutulan alçak araziler; "Delta Planı" taşkın setleri | Ülkenin önemli bölümü deniz seviyesinin altında; iklim değişikliği ve zemin çökmesiyle taşkın riski artıyor |
| **Vahalar ve çöl tarımı** | Yer altı suyunun yüzeye çıktığı noktalarda yerleşme (Mısır'da **Siwa**); BAE ve İsrail'de **damla sulama, tuzdan arındırma**, seracılık | Kurak ortamlarda teknolojiyle yaşam alanı yaratılması |
| **Alpler** | Dağ ortamına uyum: hayvancılık ve peynircilik, **hidroelektrik**, kış sporları ve dağcılık turizmi, saatçilik gibi yüksek katma değerli el sanatları | Zor yer şekillerinin turizm ve enerji kaynağına dönüşmesi |
| **Japonya köprüleri ve tünelleri** | Adalar arasında dev köprüler (Akashi Kaikyō), deniz altı tünelleri (Seikan), depreme dayanıklı mimari | Adalardan oluşan, deprem riski yüksek bir ülkede bütünleşme |

# Sanayileşme ve Şehirleşme
- Avrupa'da **10–12. yüzyıllarda** kentler ticaret ve imalat merkezi oldu; **lonca** örgütlenmesi gelişti ("Şehir havası insanı hür kılar").
- **Sanayi Devrimi** (18–19. yy) kırdan kente büyük göç başlattı: İngiltere'de kentli nüfus 1800'de ≈ %20'lerden 1900'de ≈ %75'e çıktı.
- **Ruhr Bölgesi** (Almanya): kömür ve çelik üzerine kurulu, Avrupa'nın en büyük sanayi bölgesiydi; kömürün önemini yitirmesiyle hizmet, teknoloji ve kültür ekonomisine dönüştü (**sanayisizleşme ve yeniden yapılanma**).
- Türkiye'de 1950'lerden sonra **makineleşme, nüfus artışı ve kentlerin çekiciliği** büyük iç göçe yol açtı; **gecekondulaşma**, altyapı ve istihdam sorunları ortaya çıktı (Gebze gibi sanayi kentlerinin hızlı büyümesi).
""",
  [("İlk uygarlıkların büyük ırmak vadilerinde doğmasının coğrafi nedenleri nelerdir?", "**Verimli alüvyal topraklar**, **sulama imkânı**, ılıman iklim ve ırmakların sağladığı **ulaşım** kolaylığı artı ürün üretimini mümkün kıldı; artı ürün nüfus artışını, uzmanlaşmayı ve kentleşmeyi sağladı."),
   ("Hollanda'nın deniz seviyesindeki yükselmeden diğer ülkelere göre daha çok etkilenmesinin nedeni nedir?", "Topraklarının önemli kısmı **deniz seviyesinin altında** ve **denizden kazanılmış polderlerden** oluşur; ayrıca kıyılarda **zemin çökmesi** sürmektedir.")],
  ["Uygarlıklar ırmak vadilerinde doğdu: Mezopotamya, Mısır, Hint, Çin.", "Maya–Aztek: Orta Amerika; Anadolu: Göbeklitepe, Çatalhöyük.", "İnsan doğayı değiştirir: Manş Tüneli, polderler, vahalar; Ruhr ve iç göç."]),
O("k4", "3.4", "Gelişmişlik düzeyine göre ülkeler: Almanya, Nijerya, Rusya, Güney Afrika, Çin", "Countries by level of development: case studies", r"""
# Gelişmiş ve Az Gelişmiş Ülkelerin Karşılaştırılması
| Ölçüt | Gelişmiş ülke | Az gelişmiş ülke |
|---|---|---|
| Doğum oranı ve nüfus artışı | **Düşük** | **Yüksek** |
| Ortalama yaşam süresi | Uzun | Kısa |
| Nüfus piramidi | Tabanı dar, **yaşlı nüfus** fazla | **Geniş tabanlı** üçgen, genç nüfus fazla |
| Bağımlı nüfus | Daha az (yaşlı ağırlıklı) | Fazla (çocuk ağırlıklı) |
| Çalışanların sektörü | **Hizmet ve sanayi** | **Tarım** |
| Eğitim, sağlık | Yüksek düzey | Yetersiz |
| İhracat | Sanayi ve teknoloji ürünleri | **Ham madde** ve tarım ürünleri |
| Ölçütler | **Kişi başına gelir, İnsani Gelişme Endeksi (İGE)**, bebek ölüm oranı, enerji tüketimi, okur-yazarlık | |

# Ülkeler Neden Farklı Gelişmiştir?
**Doğal etkenler:** iklim, yer şekilleri, doğal kaynaklar, denize kıyısı olup olmaması.
**Beşerî etkenler:** **sömürgecilik** geçmişi, siyasi istikrar, eğitim ve **beşerî sermaye**, teknoloji, sermaye birikimi, kurumların kalitesi, savaşlar ve çatışmalar.
> Kaynak zenginliği tek başına yetmez: **Nijerya** petrol zengini olduğu hâlde az gelişmiş; **Japonya** kaynak fakiri olduğu hâlde gelişmiştir.

# Ülke Örnekleri
| Ülke | Coğrafi özellikler | Ekonomi ve nüfus |
|---|---|---|
| **Almanya** (gelişmiş) | Orta Avrupa; kuzeyde ova, güneyde Alpler; Ren, Elbe, Tuna; ılıman okyanusal–karasal iklim | Dünyanın önde gelen sanayi ve ihracat ülkelerinden (otomotiv, makine, kimya); **Ruhr** sanayi bölgesi; nüfus yaşlı, doğurganlık düşük → **göçmen iş gücü** (Türkiye'den 1961 iş gücü anlaşması) |
| **Nijerya** (az gelişmiş) | Batı Afrika, Gine Körfezi; güneyde ekvatoral–savan, kuzeyde Sahel; **Nijer Nehri deltası** | Afrika'nın **en kalabalık** ülkesi; ekonomisi büyük ölçüde **petrol ihracatına** bağlı; hızlı nüfus artışı, genç nüfus, etnik–dinî çeşitlilik ve iç çatışmalar, gelir eşitsizliği |
| **Rusya Federasyonu** | **Yüz ölçümü en büyük** ülke; Ural Dağları Avrupa–Asya sınırı; Sibirya, tayga ve tundra; uzun kıyıları büyük ölçüde donar | **Doğal gaz, petrol, kömür**, metal ve orman kaynaklarında dünya devi; ekonomisi enerji ihracatına bağımlı; nüfus batıda yoğun, Sibirya seyrek; nüfus azalması ve yaşlanma |
| **Güney Afrika Cumhuriyeti** | Afrika'nın güney ucu; iç kısımda yüksek plato (Veld); Akdeniz tipi iklimli Cape bölgesi | **Altın, platin, elmas**, krom; Afrika'nın en sanayileşmiş ülkelerinden; **apartheid** (ırk ayrımı, 1994'te sona erdi) mirası nedeniyle gelir eşitsizliği yüksek |
| **Çin Halk Cumhuriyeti** | Doğuda verimli ovalar (Sarı Irmak, Yangtze), batıda dağlar, platolar (Tibet) ve çöller (Gobi, Taklamakan) | Nüfusu dünyanın en kalabalıklarından (2023'te Hindistan geçti); **"dünyanın fabrikası"**; 1978 sonrası **dışa açılma reformları**, özel ekonomik bölgeler; nüfus ve sanayi **doğu kıyılarında**; 1979–2015 tek çocuk politikası → hızlı yaşlanma |
""",
  [("Doğal kaynakları zengin bazı ülkelerin az gelişmiş kalmasını nasıl açıklarsınız?", "Gelişmişliği **beşerî etkenler** belirler: **sömürgecilik geçmişi**, siyasi istikrarsızlık, eğitim ve teknoloji eksikliği, kaynak gelirinin adil dağılmaması ve ekonominin **tek ürüne (ör. petrol) bağımlı** olması (Nijerya örneği)."),
   ("Almanya ile Nijerya'nın nüfus piramitleri nasıl farklılaşır?", "Almanya: **tabanı dar**, orta ve yaşlı nüfus fazla (düşük doğurganlık, uzun yaşam). Nijerya: **geniş tabanlı üçgen**, genç nüfus çok fazla (yüksek doğurganlık, daha kısa yaşam süresi).")],
  ["Gelişmişlik: kişi başı gelir, İGE, sektörel dağılım, nüfus yapısı.", "Kaynak zenginliği tek başına gelişmişlik getirmez.", "Almanya sanayi, Nijerya petrol, Rusya enerji, GAC madenler, Çin üretim merkezi."]),
O("k5", "3.5", "Küresel ve bölgesel örgütler", "Global and regional organizations", r"""
# Neden Örgütler?
Ülkeler **barış, güvenlik, ekonomik iş birliği, ticaret, kalkınma ve ortak sorunların** (iklim, salgın, göç) çözümü için uluslararası örgütler kurar.

# Küresel Örgütler
| Örgüt | Kuruluş | Amaç |
|---|---|---|
| **Birleşmiş Milletler (BM)** | 1945, New York | Uluslararası barış ve güvenlik, insan hakları, kalkınma. **Güvenlik Konseyi**: 5 daimî üye (ABD, Rusya, Çin, İngiltere, Fransa) **veto** hakkına sahip. Türkiye kurucu üye |
| BM kuruluşları | — | **UNESCO** (eğitim, bilim, kültür; Dünya Mirası), **UNICEF** (çocuklar), **WHO / DSÖ** (sağlık), **FAO** (gıda ve tarım), **UNHCR** (mülteciler), **WMO** (meteoroloji) |
| **Dünya Bankası** | 1944 (Bretton Woods) | Kalkınma projelerine uzun vadeli kredi; yoksullukla mücadele |
| **IMF** (Uluslararası Para Fonu) | 1944 | Para sisteminin istikrarı, ödemeler dengesi sıkıntısındaki ülkelere kredi |
| **DTÖ / WTO** (Dünya Ticaret Örgütü) | 1995 (GATT'ın devamı) | Serbest ticaret kuralları, ticari anlaşmazlıkların çözümü |
| **OECD** | 1961 | Gelişmiş ekonomiler arasında politika iş birliği; Türkiye kurucu üye |
| **G20** | 1999 | En büyük ekonomilerin küresel ekonomi forumu; Türkiye üye |

# Bölgesel Örgütler
| Örgüt | Üyeler / Alan | Amaç | Türkiye |
|---|---|---|---|
| **Avrupa Birliği (AB)** | 27 Avrupa ülkesi | Ekonomik ve siyasi birlik, ortak pazar, **Avro** (euro), Schengen | 1999'dan beri **aday ülke**; 1996'dan beri **Gümrük Birliği** |
| **Avrupa Konseyi** | 46 ülke, Strazburg | İnsan hakları, demokrasi, hukukun üstünlüğü; **Avrupa İnsan Hakları Mahkemesi** | 1949'dan beri üye |
| **NATO** | Kuzey Amerika + Avrupa | **Askerî ittifak**, ortak savunma | 1952'den beri üye |
| **İslam İşbirliği Teşkilatı (İİT)** | 57 ülke | İslam ülkeleri arasında dayanışma | Üye |
| **Türk Devletleri Teşkilatı (TDT)** | Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan (+ gözlemciler) | Türk dünyası arasında iş birliği | Kurucu üye |
| **KEİ** (Karadeniz Ekonomik İşbirliği) | Karadeniz çevresi ülkeleri | Bölgesel ekonomik iş birliği | Kurucu, merkez İstanbul |
| **EİT / ECO** | Türkiye, İran, Pakistan ve Orta Asya ülkeleri | Ekonomik iş birliği | Kurucu |
| **D-8** | Gelişmekte olan 8 Müslüman ülke | Kalkınma iş birliği | Kurucu |
| **OPEC** | Petrol ihraç eden ülkeler | Petrol üretimi ve fiyatlarının düzenlenmesi | Üye değil |
| **ASEAN, Afrika Birliği, NAFTA/USMCA, Mercosur** | Güneydoğu Asya, Afrika, Kuzey ve Güney Amerika | Bölgesel ekonomik ve siyasi iş birliği | — |
""",
  [("BM Güvenlik Konseyi'nin daimî üyeleri kimlerdir ve veto hakkı neden tartışılır?", "**ABD, Rusya, Çin, İngiltere ve Fransa.** Veto hakkı, tek bir ülkenin uluslararası barış için alınacak kararları **engelleyebilmesine** yol açtığı için adil ve demokratik bulunmaz (\"Dünya beşten büyüktür\" görüşü)."),
   ("Türkiye ile AB arasındaki ilişkide 1996 ve 1999 yıllarının önemi nedir?", "**1996**'da **Gümrük Birliği** yürürlüğe girdi (sanayi mallarında gümrüksüz ticaret); **1999** Helsinki Zirvesi'nde Türkiye **aday ülke** kabul edildi.")],
  ["BM: barış ve güvenlik; UNESCO, UNICEF, DSÖ, FAO.", "Ekonomik: Dünya Bankası, IMF, DTÖ, OECD, G20.", "Bölgesel: AB, NATO, Avrupa Konseyi, İİT, TDT, KEİ, ECO, D-8."]),
],

"u4": [
O("k3", "4.3", "Teknoloji, çevre ve geleceğin dünyası", "Technology, environment and the world of the future", r"""
# Teknoloji Nedir?
Dar anlamda bir mal ya da hizmetin **üretimi için gerekli bilgi ve deneyim**; geniş anlamda üretimin planlanmasından dağıtımına kadar kullanılan **teknik ve yönetsel yöntemlerin tümü**dür.

# Teknoloji ve Ekonomik Büyüme
- Gelişmiş ülkelerde büyümenin itici gücü **AR-GE ve yenilik**tir; emek ve sermayeyle açıklanamayan büyüme teknolojik ilerlemeye bağlanır.
- 1970'lerdeki krizden sonra üretim **esnek, otomasyon ağırlıklı** hâle geldi; bugün **yapay zekâ, robotik, nesnelerin interneti** ve yenilenebilir enerji yeni sanayi devrimini (**Endüstri 4.0**) oluşturur.
- Ülkelerin **rekabet gücü** yüksek katma değerli (teknoloji yoğun) ürün üretmelerine bağlıdır.

# Teknolojinin Çevreye Etkileri
| Olumsuz | Olumlu |
|---|---|
| Hava kirliliği (fabrika bacaları, egzoz), **asit yağmurları**, sera gazları | Yenilenebilir enerji (güneş, rüzgâr) teknolojileri |
| **Ozon tabakasının incelmesi** (CFC gazları – Montreal Protokolü ile büyük ölçüde azaltıldı) | Arıtma tesisleri, filtreler, geri dönüşüm |
| Su ve toprak kirliliği, **e-atık**, plastik kirliliği | Uydu ve **CBS (Coğrafi Bilgi Sistemleri)** ile afet ve çevre izleme |
| **Yağmur ormanlarının** tarım, kâğıt ve hayvancılık için yok edilmesi | Hassas tarım (GPS'li traktör, sensör), damla sulama |
| Gürültü, ışık kirliliği, radyasyon | Erken uyarı sistemleri, iklim modelleri |

> Hollanda'da çiftçilerin **CBS destekli traktörlerle** toprağı sıkıştırmadan ve gübreyi ihtiyaç kadar kullanarak üretim yapması, teknolojinin çevre dostu kullanımına örnektir.

# Geleceğin Dünyası: Nüfus ve Yerleşme
- Dünya nüfusu **8 milyarı** geçti (2022); BM projeksiyonlarına göre yüzyılın ikinci yarısında **≈ 10 milyar** civarında zirve yapması bekleniyor. Artışın büyük kısmı **Afrika ve Güney Asya**'da olacak.
- Karaların ancak yaklaşık **dörtte biri** yerleşme ve tarıma elverişlidir (çöller, yüksek dağlar, buzullar ve tundralar büyük alan kaplar); kişi başına düşen tarım arazisi azalmaktadır.
- **Kentleşme** artıyor: dünya nüfusunun yarısından fazlası kentlerde yaşıyor; **megakentler** (Tokyo, Delhi, Şanghay, İstanbul…) büyüyor.
- Gelecek için temel sorunlar: **gıda ve su güvenliği, enerji, iklim değişikliği, nüfusun yaşlanması** (gelişmiş ülkeler) ve **genç işsiz nüfus** (az gelişmiş ülkeler).
- Çözüm yaklaşımı: **sürdürülebilir kalkınma**, akıllı ve yeşil kentler, döngüsel ekonomi, eğitim; işletmelerin **sosyal sorumluluk** anlayışı ("Bu dünyayı atalarımızdan miras değil, çocuklarımızdan ödünç aldık").
""",
  [("Teknolojik gelişmenin çevre üzerinde hem olumsuz hem olumlu etkisine birer örnek veriniz.", "**Olumsuz:** fosil yakıt kullanan sanayi ve taşıtların **hava kirliliği ve asit yağmurlarına** yol açması. **Olumlu:** **güneş ve rüzgâr** teknolojilerinin temiz enerji sağlaması ya da uydu–CBS ile orman yangınlarının izlenmesi."),
   ("Gelecekte dünya nüfus artışının hangi bölgelerde yoğunlaşacağı ve bunun olası sonuçları nelerdir?", "**Afrika (özellikle Sahra altı) ve Güney Asya.** Sonuçlar: gıda ve su ihtiyacının artması, hızlı ve plansız kentleşme, genç işsiz nüfus, göç baskısı; doğru yatırımla ise **demografik fırsat**.")],
  ["Teknoloji: büyümenin itici gücü (AR-GE, Endüstri 4.0).", "Teknolojinin çevreye olumsuz (kirlilik) ve olumlu (yenilenebilir, CBS) etkileri.", "Dünya nüfusu 8 milyar+, artış Afrika ve G. Asya'da; kentleşme artıyor."]),
O("k4", "4.4", "Sınırlı kaynaklar ve doğal kaynak kullanımı", "Limited resources and the use of natural resources", r"""
# Doğal Kaynak Türleri
| Tür | Örnekler | Not |
|---|---|---|
| **Yenilenemeyen (tükenebilir)** | Petrol, doğal gaz, kömür, metalik madenler, uranyum | Oluşumları milyonlarca yıl sürer; **rezervler sınırlıdır** |
| **Yenilenebilir** | Güneş, rüzgâr, su (hidroelektrik), jeotermal, biyokütle, dalga–gelgit | Doğru yönetilmezse su, orman, toprak ve balık stokları da **tükenebilir** |

# Neden Sınırlı Kaynak?
- Nüfus artışı, **sanayileşme**, kentleşme ve **tüketim alışkanlıkları** kaynak talebini hızla artırır.
- Kaynaklar dünyada **eşit dağılmamıştır**: petrolün büyük kısmı Orta Doğu, Rusya, Kuzey Amerika ve Venezuela'da; bu durum **enerji jeopolitiği** ve çatışmalara yol açar.
- **Ekolojik ayak izi:** İnsanlığın yıllık kaynak tüketimi, Dünya'nın bir yılda yenileyebildiğinden fazladır ("Dünya Limit Aşım Günü" her yıl daha erkene geliyor).

# Kaynakların Yanlış Kullanımının Sonuçları
| Kaynak | Sorun |
|---|---|
| **Su** | Yer altı suyunun aşırı çekilmesi (**obruklar** – Konya), göllerin kuruması (**Aral Gölü**, Tuz Gölü çevresi), kirlilik |
| **Toprak** | **Erozyon**, çölleşme, tuzlanma, verimli tarım arazilerinin yapılaşmaya açılması |
| **Orman** | Ormansızlaşma → erozyon, sel, biyoçeşitlilik kaybı, karbon yutağının azalması |
| **Balıkçılık** | Aşırı avlanma, stokların çökmesi (Karadeniz hamsisi, Marmara) |
| **Enerji** | Fosil yakıtlar → hava kirliliği ve iklim değişikliği; dışa bağımlılık |

# Çözüm: Sürdürülebilir Kaynak Yönetimi
- **Azalt – yeniden kullan – geri dönüştür** (3R); **sıfır atık** uygulamaları.
- **Yenilenebilir enerjiye** geçiş ve enerji verimliliği (yalıtım, LED, verimli motorlar).
- Su yönetimi: damla sulama, gri su kullanımı, havza planlaması.
- Orman ve toprak koruma: ağaçlandırma, teraslama, nadas yerine münavebe.
- Uluslararası iş birliği ve anlaşmalar; **bireysel sorumluluk** (tasarruf, bilinçli tüketim).

# Türkiye'de Kaynak Kullanımı
- Enerjide **dışa bağımlılık** yüksektir (petrol ve doğal gazın büyük kısmı ithal). Yerli kaynaklar: **linyit**, hidroelektrik, rüzgâr ve güneşte hızlı büyüme, **jeotermal** (Avrupa'da 1.); **Karadeniz (Sakarya) doğal gaz sahası**; **Akkuyu Nükleer Santrali**.
- **Bor** rezervlerinde dünyada **1.** (≈ %70+); mermer, krom, feldispat zengin kaynaklardır.
- Su: Türkiye **su zengini değildir**, "su stresi" yaşayan bir ülkedir.
""",
  [("Konya Ovası'nda obruk oluşumunun artmasının insan kaynaklı nedeni nedir?", "Tarımsal sulama için **yer altı suyunun aşırı çekilmesi**; su seviyesi düştükçe karstik boşlukların tavanı çöker ve **obruklar** oluşur. Kuraklık bu süreci hızlandırır."),
   ("Yenilenebilir kaynakların da tükenebileceğini bir örnekle açıklayınız.", "**Balık stokları** yenilenebilir bir kaynaktır; ancak **aşırı avlanma** üreme hızını aşarsa stoklar çöker (Karadeniz'de hamsi). Aynı durum yer altı suyu ve ormanlar için de geçerlidir.")],
  ["Yenilenemeyen: fosil yakıtlar, madenler; yenilenebilir: güneş, rüzgâr, su.", "Aşırı tüketim: obruk, erozyon, ormansızlaşma, aşırı avlanma.", "Çözüm: sürdürülebilir yönetim, 3R, yenilenebilir enerji; Türkiye bor'da 1."]),
],
}
