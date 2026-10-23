# -*- coding: utf-8 -*-
r"""9. Sınıf Coğrafya — 1.35.0 tamamlama: resmî Maarif kodları (COĞ.9.x.y), anlatım ekleri, çözümlü örnekler, özet maddeleri."""

KOD = {
    "u1/k1": "COĞ.9.1.1", "u1/k2": "COĞ.9.1.2", "u1/k3": "COĞ.9.1.3",
    "u2/k1": "COĞ.9.2.1", "u2/k2": "COĞ.9.2.1", "u2/k3": "COĞ.9.2.1", "u2/k4": "COĞ.9.2.2", "u2/k5": "COĞ.9.2.3",
    "u3/k1": "COĞ.9.3.1", "u3/k2": "COĞ.9.3.2", "u3/k3": "COĞ.9.3.3", "u3/k4": "COĞ.9.3.4",
    "u4/k1": "COĞ.9.4.1", "u4/k2": "COĞ.9.4.2", "u4/k3": "COĞ.9.4.3", "u4/k4": "COĞ.9.4.4",
    "u5/k1": "COĞ.9.5.1", "u5/k2": "COĞ.9.5.1",
    "u6/k1": "COĞ.9.6.1", "u6/k2": "COĞ.9.6.2", "u6/k3": "COĞ.9.6.3",
    "u7/k1": "COĞ.9.7.1", "u7/k2": "COĞ.9.7.1", "u7/k3": "COĞ.9.7.1",
}

ANLATIM = {
"u2/k4": r"""
# Mutlak ve Göreceli Konum
- **Mutlak (matematik) konum:** Coğrafi koordinatlarla belirlenen, değişmeyen konum (36°–42° K, 26°–45° D).
- **Göreceli (özel) konum:** Bir yerin çevresindeki kara, deniz, boğaz, ticaret yolları ve komşu ülkelere göre konumu; zamanla önemi değişebilir.

## Mutlak Konumun Sonuçları
| Özellik | Sonuç |
|---|---|
| Kuzey yarım kürede, orta kuşakta | Dört mevsim belirgin; Güneş ışınları hiçbir yerde dik gelmez |
| Doğu–batı arası 19 boylam | Doğu ile batı uçları arasında **76 dakika** yerel saat farkı (19 × 4 dk) |
| Kuzey–güney arası 6 enlem | Güney kıyılarında sıcaklık daha yüksek; gölge boyu kuzeye gidildikçe uzar |
| Kuzeyde 42° enlemi | Kış ve yaz arasındaki gün uzunluğu farkı kuzeyde daha fazla |

## Göreceli Konumun Sonuçları
- **Boğazlar** (İstanbul, Çanakkale) Karadeniz ile Akdeniz arasındaki tek deniz yoludur.
- Asya, Avrupa ve Afrika'ya yakınlık → kara, hava ve boru hattı taşımacılığında **köprü ülke** (enerji koridoru).
- Farklı iklimlerin etkisine açık olması tarım ürünü çeşitliliğini artırır.
""",
"u2/k5": r"""
# Bileşenler Nasıl Birlikte Çalışır?
| Bileşen | Görevi | Örnek |
|---|---|---|
| **Donanım** | Bilgisayar, sunucu, GPS alıcısı, uydu | Akıllı telefon, drone |
| **Yazılım** | Verileri işleyen ve haritalayan programlar | CBS programları |
| **Veri** | Konumlu bilgi: **vektör** (nokta, çizgi, alan) ve **raster** (piksel, uydu görüntüsü) | Yol ağı, nüfus, uydu fotoğrafı |
| **İnsan** | Verileri toplayan, analiz eden ve karar veren uzman | Şehir plancısı, coğrafyacı |
| **Yöntem** | Verinin nasıl toplanıp analiz edileceğine dair kurallar | Katman çakıştırma, tampon analizi |

- **Katman (çakıştırma) analizi:** Farklı veri katmanları (fay hattı + nüfus + okul yerleri) üst üste konarak yeni bilgi elde edilir — örneğin depremde risk altındaki okullar.
- **Kullanım alanları:** navigasyon, afet yönetimi, tarım (uydu ile ürün takibi), orman yangını izleme, şehir planlama, kayıp aramaları.
""",
"u3/k2": r"""
# Değişkenlerin İklime Etkisi
| Değişken | Etkisi | Örnek |
|---|---|---|
| **Enlem** | Ekvator'dan kutuplara sıcaklık azalır (Güneş ışınlarının geliş açısı küçülür) | Ekvator sıcak, kutuplar soğuk |
| **Yükselti** | Her 100 m yükselişte sıcaklık yaklaşık **0,5–0,6 °C** düşer | Erzurum, Antalya'dan soğuktur |
| **Karasallık–denizellik** | Denize uzak yerlerde sıcaklık farkı büyük, yağış azdır | İç Anadolu ile Karadeniz kıyıları |
| **Bakı** | Kuzey yarım kürede güneye bakan yamaçlar daha çok güneş alır | Yerleşmeler güney yamaçlarda |
| **Dağların uzanışı** | Kıyıya paralel dağlar nemli havanın içeri girmesini engeller | Karadeniz kıyısı yağışlı, iç kesimler kurak |
| **Okyanus akıntıları** | Sıcak akıntılar kıyıyı ılıtır, soğuk akıntılar kuraklaştırır | Gulf Stream → Batı Avrupa ılıman |
| **Bitki örtüsü ve kentleşme** | Orman nem ve serinlik sağlar; beton ısıyı tutar | Kentsel ısı adası |

> İklim sistemi bir bütündür: bir bileşendeki değişim (ör. buzulların erimesi) diğerlerini de etkiler.
""",
"u3/k3": r"""
# Başlıca İklim Tipleri ve Özellikleri
| İklim | Sıcaklık | Yağış | Bitki örtüsü | Türkiye'de / dünyada |
|---|---|---|---|---|
| **Ekvatoral** | Her ay sıcak (~25–27 °C) | Her mevsim bol (konveksiyonel) | Yağmur ormanları | Amazon, Kongo |
| **Savan** | Sıcak | Yazın yağışlı, kışın kurak | Uzun boylu otlar (savan) | Orta Afrika |
| **Muson** | Sıcak | Yazın çok yağışlı (muson rüzgârları) | Muson ormanları | Hindistan, Güneydoğu Asya |
| **Çöl** | Gece–gündüz farkı çok büyük | Çok az | Kserofit bitkiler, seyrek | Sahra |
| **Akdeniz** | Yazlar sıcak, kışlar ılık | Kışın yağışlı, yaz kurak | **Maki** | Akdeniz ve Ege kıyıları |
| **Karadeniz (Okyanusal)** | Yazlar serin, kışlar ılık | Her mevsim yağışlı | Gür ormanlar | Doğu Karadeniz, Batı Avrupa |
| **Karasal** | Yazlar sıcak, kışlar soğuk | Az; ilkbahar yağışlı | **Bozkır** (step) | İç Anadolu, Doğu Anadolu |
| **Tundra / Kutup** | Çok soğuk | Az (kar) | Yosun, liken / bitki yok | Kuzey Kanada, Antarktika |

- **Yağış rejimi:** Yağışın aylara dağılışı. Akdeniz ikliminde yaz kuraklığı, Karadeniz ikliminde düzenli yağış görülür.
- İklim tipini belirlemek için **sıcaklık–yağış grafiği (klimogram)** kullanılır.
""",
"u3/k4": r"""
# Kanıtlar ve Öngörüler
- **Kanıtlar:** Sanayi Devrimi'nden bu yana küresel ortalama sıcaklık yaklaşık **1,1–1,2 °C** arttı (IPCC); atmosferdeki CO₂ derişimi 280 ppm'den **420 ppm'in üzerine** çıktı; buzullar ve deniz buzları geriliyor.
- **Türkiye'ye olası etkileri:** kuraklık ve su kıtlığı, orman yangınlarının artması, sel–taşkın sıklığı, tarımda verim kaybı, kıyılarda deniz seviyesi yükselmesi.
- **Doğal iklim değişimleri:** Jeolojik geçmişte buzul ve buzul arası dönemler yaşanmıştır (Dünya'nın yörüngesindeki değişimler, volkanik etkinlik). Bugünkü değişimi farklı kılan, **hızının** ve **insan kaynaklı** olmasıdır.

**Azaltma (önleme):** yenilenebilir enerji, enerji verimliliği, toplu taşıma, ağaçlandırma. **Uyum:** damla sulama, kuraklığa dayanıklı tohum, taşkın planlaması.
- **Paris Anlaşması (2015):** Isınmayı 2 °C'nin, mümkünse **1,5 °C'nin** altında tutma hedefi.
""",
"u4/k2": r"""
# Dünya ve Türkiye'de Nüfusun Dağılışı
- **Yoğun alanlar:** Doğu ve Güney Asya (Çin, Hindistan), Batı Avrupa, ABD'nin doğusu → ılıman iklim, verimli ovalar, sanayi.
- **Seyrek alanlar:** Çöller (Sahra), kutuplar, ekvatoral ormanlar (Amazon), yüksek dağlar → olumsuz doğal koşullar.
- **Türkiye'de:** Marmara (sanayi, ticaret, ulaşım), Ege ve Akdeniz kıyıları, Karadeniz kıyıları yoğun; Doğu Anadolu'nun yüksek kesimleri, Tuz Gölü çevresi, Toroslar'ın yüksek kesimleri seyrek nüfusludur.

## Göç Türleri
| Ölçüt | Türler |
|---|---|
| Sınırlar | **İç göç** (ülke içi) · **dış göç** (ülkeler arası) |
| İstek | **Gönüllü** (iş, eğitim) · **zorunlu** (savaş, afet, mübadele) |
| Süre | **Sürekli** · **geçici** (mevsimlik tarım işçileri) |

- **Beyin göçü:** Nitelikli iş gücünün gelişmiş ülkelere göç etmesi.
- Türkiye'de 1950'lerden sonra kırdan kente göç hızlanmış, kentleşme oranı arttı.
""",
"u4/k3": r"""
# Piramit Okuma Rehberi
| Piramit tipi | Görünüm | Ne anlatır? | Örnek ülke tipi |
|---|---|---|---|
| **Genişleyen (üçgen)** | Taban geniş, tepe sivri | Doğum ve ölüm yüksek, genç nüfus fazla, ortalama ömür kısa | Az gelişmiş ülkeler (Nijer) |
| **Durağan (çan)** | Taban ve orta benzer | Doğum ve ölüm düşük, artış yavaş | Gelişmekte olan ülkeler |
| **Daralan (ters üçgene yakın)** | Taban dar, orta ve üst geniş | Doğum çok düşük, yaşlı oranı yüksek, nüfus azalabilir | Japonya, Almanya, İtalya |

- **Türkiye'nin piramidi** genişleyenden durağana geçmektedir: taban daralıyor, ortanca yaş yükseliyor (ortanca yaş 34'ü aştı).
- **Bağımlılık oranı** = $\dfrac{(0\text{–}14) + (65+)}{(15\text{–}64)} \cdot 100$ → çalışan nüfusun bakmakla yükümlü olduğu nüfus.
""",
"u4/k4": r"""
# Ülke Örnekleri
| Ülke | Sorun | Politika |
|---|---|---|
| **Çin** | Hızlı nüfus artışı (1980'ler) | Tek çocuk politikası (antinatalist); sonra yaşlanma nedeniyle **2016'da iki, 2021'de üç çocuğa** izin |
| **Fransa, İsveç** | Düşük doğurganlık | Aile yardımları, ücretli doğum izni, kreş desteği (pronatalist) |
| **Japonya** | Hızla yaşlanan nüfus | Yaşlı bakım hizmetleri, emeklilik yaşının yükseltilmesi, robot teknolojisi |
| **Kanada, Avustralya** | Nitelikli iş gücü ihtiyacı | Puan sistemine dayalı seçici göç politikası |

## Türkiye'de Nüfus Politikalarının Seyri
- **1923–1965:** Nüfus artışı teşvik edildi (savaşlarda kaybedilen nüfus, az nüfuslu ülke).
- **1965–2000'ler:** Hızlı artış nedeniyle aile planlaması ile artış sınırlandırıldı.
- **Günümüz:** Doğurganlık hızının **yenilenme düzeyinin (2,1) altına** inmesiyle aileyi ve doğumu destekleyen, nitelikli nüfusu ve aktif yaşlanmayı önemseyen politikalar.
""",
"u6/k2": r"""
# Kökenine Göre Doğal Afetler
| Köken | Afetler |
|---|---|
| **Jeolojik (yer içi kaynaklı)** | Deprem, volkanizma, tsunami |
| **Meteorolojik / klimatolojik** | Kuraklık, fırtına, hortum, dolu, aşırı sıcak ve soğuk, orman yangını |
| **Hidrolojik** | Sel, taşkın, çığ |
| **Jeomorfolojik (kütle hareketi)** | Heyelan, kaya düşmesi, toprak kayması |
| **Biyolojik** | Salgın hastalık, böcek istilası |

- **Ani gelişen** (deprem, sel) ve **yavaş gelişen** (kuraklık, çölleşme) afetler ayrılır.
- **Türkiye'de** can kaybı ve hasar bakımından en etkili afet **depremdir** (ülkenin büyük bölümü deprem bölgesi); onu sel, heyelan ve çığ izler. Karadeniz'de heyelan ve sel, Doğu Anadolu'da çığ riski yüksektir.
""",
"u6/k3": r"""
# Afet Yönetim Döngüsü
| Evre | Zaman | Örnek çalışmalar |
|---|---|---|
| **Zarar azaltma** | Afetten önce | Depreme dayanıklı yapı, fay hattı ve dere yataklarına yapılaşma yasağı, ağaçlandırma |
| **Hazırlık** | Afetten önce | Tatbikat, acil durum çantası, toplanma alanları, erken uyarı |
| **Müdahale** | Afet sırasında / hemen sonra | Arama-kurtarma, ilk yardım, barınma, beslenme |
| **İyileştirme** | Afetten sonra | Yeniden yapılanma, psikolojik destek, ekonomik toparlanma |

- **Risk yönetimi** (zarar azaltma + hazırlık) afetten önce, **kriz yönetimi** (müdahale) afet sırasında yapılır. Bütüncül yaklaşımda ağırlık **afet öncesine** verilir.
- **Türkiye'de** afet yönetiminden sorumlu kurum **AFAD**'dır (2009). Gönüllüler (AKUT gibi) ve yerel yönetimler de sürece katılır.
- **Bireysel hazırlık:** “Çök–kapan–tutun”, acil durum çantası (su, yiyecek, düdük, el feneri, ilaç, belgeler), aile afet planı.
""",
"u7/k2": r"""
# Sınırı Belirlemede Ölçütün Rolü
Aynı alan farklı ölçütlerle farklı bölgelere ayrılabilir:
| Ölçüt | Sonuç |
|---|---|
| İklim | Akdeniz iklim bölgesi kıyıdan iç kesime doğru **geçişli** sınırla sona erer |
| Siyasi sınır | Türkiye–Yunanistan sınırı **net** bir çizgidir |
| Tarım ürünü | Fındık bölgesi ürünün yetiştiği alanla sınırlanır; ekim alanı değiştikçe sınır da değişir |
| İdari birim | İl sınırları kesin ve resmîdir |

- **Türkiye'nin coğrafi bölgeleri** 1941'deki **I. Coğrafya Kongresi**'nde iklim, bitki örtüsü, yer şekilleri, tarım ve yerleşme gibi ölçütlerin birlikte değerlendirilmesiyle **7 bölge** olarak belirlenmiştir. Bu sınırlar il sınırlarını kesebilir.
""",
"u7/k3": r"""
# Değişimi Gösteren Örnekler
- **İklim değişikliği:** Bazı ürünlerin ekim alanı kuzeye ve yükseğe kayıyor (tropikal meyveler Türkiye'nin güney kıyılarında yetiştirilmeye başlandı).
- **Teknoloji:** Seracılık, kışın bile sebze üretilebilen alanları genişletti (Antalya seraları).
- **Ekonomik dönüşüm:** Eski sanayi bölgeleri (ABD'de “Pas Kuşağı”) gerileyip yeni teknoloji bölgeleri (Silikon Vadisi) yükseldi.
- **Siyasi kararlar:** 1991'de Sovyetler Birliği'nin dağılması siyasi sınırları değiştirdi.
- **Kentleşme:** İstanbul'un metropoliten alanı genişledikçe işlevsel bölgesi Kocaeli ve Tekirdağ'a uzandı.
""",
}

ORNEK = {
"u1/k1": [
 (r"Bir araştırmacı Doğu Karadeniz'deki heyelanların eğim, yağış ve yerleşme yerleriyle ilişkisini inceliyor. Bu çalışma coğrafyanın hangi bölümleriyle ilgilidir?",
  r"Eğim ve heyelan → **jeomorfoloji** (fiziki); yağış → **klimatoloji** (fiziki); yerleşme yerleri → **yerleşme coğrafyası** (beşerî). Coğrafya doğal ve beşerî unsurları **etkileşimiyle** birlikte inceler."),
 (r"Kutup bölgelerindeki buz kütleleri doğal ortamın hangi küresinde yer alır? Bu küredeki değişim diğer küreleri nasıl etkiler?",
  r"**Kriyosfer** (buz küre). Buzulların erimesi **hidrosferde** deniz seviyesini yükseltir, **atmosferde** sıcaklık dengesini değiştirir, **biyosferde** kutup ayısı gibi canlıların yaşam alanını daraltır."),
],
"u1/k2": [
 (r"Bir belediye yeni bir okul için yer seçerken coğrafi bakış açısıyla hangi soruları sormalıdır?",
  r"**Nerede?** (öğrenci nüfusunun yoğun olduğu yer) · **Neden orada?** (ulaşım kolaylığı, güvenli yollar) · **Ne gibi riskler var?** (fay hattı, dere yatağı, heyelan) · **Çevreyle ilişkisi** (gürültü, sanayi tesislerine uzaklık)."),
 (r"“Ekolojik borç günü” (insanlığın o yılın doğal kaynak bütçesini tükettiği gün) her yıl daha erkene geliyor. Bu durum coğrafya öğrenmenin önemini nasıl gösterir?",
  r"Doğal kaynakların yenilenme hızından **daha hızlı** tüketildiğini gösterir. Coğrafya, kaynakların mekândaki dağılışını ve sınırlılığını anlayıp **sürdürülebilir** kullanım kararları vermeyi sağlar."),
],
"u1/k3": [
 (r"Eratosthenes'in Dünya'nın çevresini hesaplaması coğrafyanın hangi döneminin özelliğini yansıtır?",
  r"**Eski Çağ**: Dünya'nın şekli ve boyutlarının matematiksel yöntemlerle ele alındığı dönem. Eratosthenes, Siyene ve İskenderiye'deki gölge farkından Dünya'nın çevresini şaşırtıcı bir yakınlıkla hesaplamıştır."),
 (r"Piri Reis'in Kitab-ı Bahriye'si ve dünya haritası hangi ihtiyaçla hazırlanmıştır?",
  r"Yeni Çağ'da **deniz ticareti ve keşifler** ön plandaydı. Kitab-ı Bahriye Akdeniz kıyılarını, limanlarını ve denizcilik bilgilerini; dünya haritası ise Atlas Okyanusu ve Amerika kıyılarını gösterir. Denizcilere **yön bulma ve güvenli seyir** bilgisi vermek amaçlanmıştır."),
],
"u2/k1": [
 (r"Okulunuzun yerini arkadaşınıza gösteren el çizimi bir kroki neden harita sayılmaz?",
  r"Kroki **ölçeksizdir**; uzaklıklar ve alanlar belirli bir oranda küçültülmemiştir. Haritada kuş bakışı görünüm, düzlem ve **ölçek** birlikte bulunmalıdır."),
 (r"Türkiye'nin yıllık yağış dağılışını göstermek için hangi tür harita kullanılır? Bu haritada hangi harita elemanı mutlaka bulunmalıdır?",
  r"**Tematik harita** (iklim/yağış haritası). Renklerin hangi yağış miktarını gösterdiğini açıklayan **lejant** mutlaka bulunmalıdır; başlık ve ölçek de gereklidir."),
],
"u2/k2": [
 (r"Edirne (26° D) ile Iğdır (44° D) arasında yerel saat farkı kaç dakikadır? Hangisinde Güneş önce doğar?",
  r"Boylam farkı $44 - 26 = 18°$; her boylam 4 dakika → $18 \cdot 4 = 72$ dakika. Dünya batıdan doğuya döndüğü için Güneş **doğudaki Iğdır'da** önce doğar."),
],
"u2/k3": [
 (r"1/500.000 ölçekli bir haritada 4 cm olan uzaklık gerçekte kaç km'dir? Aynı uzaklık 1/200.000 ölçekli haritada kaç cm gösterilir?",
  r"Gerçek uzaklık $= 4 \cdot 500.000 = 2.000.000$ cm $= 20$ km. 1/200.000 ölçekte: $2.000.000 \div 200.000 = 10$ cm. Ölçek büyüdükçe aynı uzaklık haritada daha uzun gösterilir."),
],
"u2/k4": [
 (r"Türkiye'nin doğusu ile batısı arasında 76 dakikalık yerel saat farkı bulunmasının sonuçları nelerdir?",
  r"Güneş doğuda daha erken doğar ve batar; resmî işler ortak saatle yürütüldüğü için doğu illerinde iş günü Güneş'e göre **daha geç**, batı illerinde **daha erken** başlar. Namaz vakitleri ve gün ışığı süreleri iller arasında farklılaşır."),
 (r"Türkiye'nin göreceli konumunun ekonomik önemine iki örnek veriniz.",
  r"1) Boğazlar Karadeniz ülkelerinin dünya denizlerine açılan **tek deniz yolu** üzerindedir. 2) Hazar ve Orta Doğu enerji kaynaklarını Avrupa'ya taşıyan **boru hatlarının** geçiş güzergâhındadır (enerji koridoru)."),
],
"u2/k5": [
 (r"Bir orman yangınının yayılma yönünü tahmin etmek için CBS'de hangi veri katmanları birlikte kullanılabilir?",
  r"Rüzgâr yönü ve hızı, eğim ve bakı (yükselti verisi), bitki örtüsü türü ve kuruluğu, yerleşme ve yol ağı. Katmanlar çakıştırılarak riskli alanlar ve **tahliye yolları** belirlenir."),
 (r"Bir uydu görüntüsü ile bir ilçenin yol ağı verisi hangi veri türlerine örnektir?",
  r"Uydu görüntüsü **raster** veridir (piksellerden oluşur). Yol ağı **vektör** veridir (çizgilerle gösterilir)."),
],
"u3/k1": [
 (r"Bir öğrenci barometrede basıncın birkaç saatte hızla düştüğünü gözlüyor. Bu gözlemden hava durumuyla ilgili nasıl bir tahmin yapılabilir?",
  r"Basıncın düşmesi **alçak basınç** alanının yaklaştığını gösterir. Alçak basınçta hava yükselir, soğur ve yoğuşur; **bulutlanma, rüzgâr ve yağış** olasılığı artar."),
 (r"“Bugün İzmir'de hava 30 °C ve güneşli.” ile “İzmir'de yazlar sıcak ve kurak geçer.” ifadelerini hava durumu ve iklim açısından ayırt ediniz.",
  r"İlk ifade belirli bir gündeki **hava durumudur** (kısa süreli). İkinci ifade uzun yılların ortalamasına dayanan **iklim** özelliğidir."),
],
"u3/k2": [
 (r"Aynı enlemde bulunan Trabzon ve Erzurum'un iklimleri neden farklıdır?",
  r"Trabzon **kıyıda ve alçaktır**, denizin ılıtıcı etkisi ve nemli hava nedeniyle kışlar ılık, yağış boldur. Erzurum **iç kesimde ve yüksektir** (~1850 m); yükselti ve karasallık nedeniyle kışlar çok soğuk, yağış azdır. Kıyıya paralel dağlar da nemli havanın içeri girmesini engeller."),
 (r"Kuzey yarım kürede bir dağın güney ve kuzey yamaçlarında orman üst sınırı ve kar örtüsü nasıl farklılaşır?",
  r"**Güneye bakan** yamaçlar daha çok güneş alır (bakı etkisi); kar daha erken erir, orman ve tarım üst sınırı **daha yüksektir**. Kuzey yamaçlarda kar daha uzun kalır."),
],
"u3/k3": [
 (r"Bir istasyonda yazlar sıcak ve kurak, kışlar ılık ve yağışlı; doğal bitki örtüsü maki. Hangi iklim tipidir? Türkiye'de nerede görülür?",
  r"**Akdeniz iklimi**. Türkiye'de Akdeniz ve Ege kıyıları ile Marmara'nın güneyinde görülür."),
 (r"Konya ile Rize'nin yıllık yağış ve sıcaklık özelliklerini karşılaştırarak iklim tiplerini belirleyiniz.",
  r"**Rize:** her mevsim yağışlı (yıllık 2000 mm'nin üzerinde), yazlar serin → **Karadeniz (okyanusal) iklimi**, gür ormanlar. **Konya:** yıllık yağış ~300 mm, yazlar sıcak, kışlar soğuk → **karasal iklim**, bozkır."),
],
"u3/k4": [
 (r"Kentlerin çevresindeki kırsal alanlardan daha sıcak olmasının nedenleri nelerdir?",
  r"Beton ve asfalt güneş enerjisini emip depolar; yeşil alan azdır, buharlaşma ile serinleme zayıftır; araç, sanayi ve klimalar ısı yayar; yüksek binalar rüzgârı keser. Bu etkiye **kentsel ısı adası** denir."),
 (r"Kuraklığın arttığı bir bölgede çiftçilere iklim değişikliğine uyum için hangi öneriler sunulabilir?",
  r"**Damla ve yağmurlama sulama** ile su tasarrufu, kuraklığa dayanıklı ürün ve tohum çeşitleri, ekim zamanının değiştirilmesi, toprak nemini koruyan yöntemler (malçlama) ve yağmur suyu hasadı."),
],
"u4/k1": [
 (r"Neolitik dönemde nüfusun hızla artmasının nedeni nedir?",
  r"**Tarım ve hayvanların evcilleştirilmesi** ile besin üretimi düzenli ve fazla hâle geldi; yerleşik hayata geçildi. Daha fazla insan beslenebildiği için nüfus artışı hızlandı."),
 (r"Sanayi Devrimi'nden sonra dünya nüfusunun hızla artması hangi etkenlerle açıklanır?",
  r"Tıptaki gelişmeler (aşılar, antibiyotikler), temiz su ve kanalizasyon, beslenme ve tarımda verim artışı **ölüm oranlarını düşürdü**, ortalama ömür uzadı. Doğum oranları bir süre yüksek kalınca nüfus hızla arttı."),
],
"u4/k2": [
 (r"Kırsal alandan büyük kentlere göçün kentlerde yol açtığı sorunlara üç örnek veriniz.",
  r"Plansız yapılaşma ve **gecekondulaşma**, altyapı (su, ulaşım, okul) yetersizliği, işsizlik ve trafik–hava kirliliği."),
],
"u4/k3": [
 (r"Bir ülkenin piramidinde 0–14 yaş grubu çok geniş, 65+ grubu çok dardır. Bu ülkenin nüfus özellikleri ve öncelikli ihtiyaçları nelerdir?",
  r"Doğum oranı yüksek, ortalama ömür kısa, **genç ve hızlı artan** nüfus. Öncelikli ihtiyaçlar: okul, öğretmen, çocuk sağlığı hizmetleri ve gelecekte gençler için **iş imkânı**."),
 (r"Bir ülkede 0–14 yaş nüfus 10 milyon, 15–64 yaş 50 milyon, 65+ yaş 15 milyondur. Bağımlılık oranını hesaplayınız.",
  r"Bağımlılık oranı $= \dfrac{10 + 15}{50} \cdot 100 = \%50$. Her 100 çalışma çağındaki kişiye 50 bağımlı kişi düşer."),
],
"u4/k4": [
 (r"Doğurganlık hızı 1,3'e düşen bir Avrupa ülkesi hangi nüfus politikalarını uygulayabilir?",
  r"Yenilenme düzeyi (2,1) altında olduğu için **pronatalist** politikalar: çocuk yardımları, uzun ücretli doğum izni, ücretsiz kreş, vergi indirimi, esnek çalışma. Ayrıca iş gücü açığı için **seçici göç** politikaları."),
 (r"Çin'in tek çocuk politikasını gevşetmesinin nedeni nedir?",
  r"Uzun süre düşük doğum oranı nedeniyle nüfus **hızla yaşlandı**, çalışma çağındaki nüfus azalmaya başladı ve cinsiyet dengesi bozuldu. Bu yüzden önce iki, sonra üç çocuğa izin verildi."),
],
"u5/k1": [
 (r"Rize'de çay, Şanlıurfa'da pamuk yetiştirilmesini doğal faktörlerle açıklayınız.",
  r"**Çay:** her mevsim yağışlı, nemli ve ılıman iklim ile asitli topraklar ister → Rize. **Pamuk:** sıcak ve uzun yaz, bol güneş ve **sulama** ister → Harran Ovası (GAP ile sulama)."),
 (r"Antalya'da turizmin gelişmesinde hangi doğal faktörler etkilidir?",
  r"**Akdeniz iklimi** (uzun, güneşli ve sıcak yaz), deniz ve kumsallar, Toroslar'ın doğal güzellikleri ve kıyıya yakın tarihî alanlar."),
],
"u5/k2": [
 (r"Bir otomobil fabrikasının yer seçiminde etkili olan beşerî faktörler nelerdir?",
  r"Nitelikli ve uygun maliyetli **iş gücü**, yan sanayiye yakınlık, gelişmiş **ulaşım** (liman, otoyol, demir yolu), **pazara** yakınlık, sermaye ve devlet **teşvikleri**. Bu nedenle Türkiye'de otomotiv sanayisi Marmara'da (Bursa, Kocaeli) yoğunlaşmıştır."),
 (r"Dijital teknolojilerin (4. sanayi devrimi) ekonomik faaliyetlere iki etkisini yazınız.",
  r"1) Üretimde **otomasyon ve robotlar** verimi artırır, maliyeti düşürür. 2) **E-ticaret** ile ürünler dünyanın her yerine ulaşır; fiziksel mağaza ve aracı ihtiyacı azalır."),
],
"u6/k1": [
 (r"Dere yatağına yapılmış bir mahallede şiddetli yağış sonrası sel meydana geliyor ve evler zarar görüyor. Tehlike, maruziyet ve güvenlik açığını belirleyiniz.",
  r"**Tehlike:** şiddetli yağış ve sel. **Maruziyet:** evlerin dere yatağında olması. **Güvenlik açığı:** taşkın önleme yapısı, erken uyarı ve tahliye planının olmaması. Üçü bir araya gelince olay **afete** dönüşmüştür."),
],
"u6/k2": [
 (r"Deprem, kuraklık, heyelan ve çığ afetlerini kökenlerine göre sınıflandırınız.",
  r"Deprem → **jeolojik**; kuraklık → **meteorolojik/klimatolojik**; heyelan → **jeomorfolojik (kütle hareketi)**; çığ → **hidrolojik** (kar örtüsünün hareketi)."),
 (r"Kuraklık neden “yavaş gelişen” afet olarak adlandırılır? Etkileri nelerdir?",
  r"Yağış eksikliği aylar, hatta yıllar içinde birikerek etkisini gösterir; başlangıcı ve bitişi belirgin değildir. Tarımsal üretim düşer, su kaynakları azalır, göç ve orman yangını riski artar."),
],
"u6/k3": [
 (r"Bir okulda yapılan deprem tatbikatı ve okul binasının güçlendirilmesi afet yönetiminin hangi evrelerine örnektir?",
  r"Tatbikat → **hazırlık**; binanın güçlendirilmesi → **zarar azaltma**. İkisi de afet öncesi yapılan **risk yönetimi** çalışmalarıdır."),
 (r"Bir aile afet planında hangi bilgiler yer almalıdır?",
  r"Toplanma alanı ve buluşma noktası, şehir dışındaki irtibat kişisi, acil telefon numaraları (112), acil durum çantasının yeri, evde gaz–elektrik–su vanalarının kapatılması, ev içindeki güvenli noktalar ve ihtiyaç sahibi aile bireyleri için özel önlemler."),
],
"u7/k1": [
 (r"Ankara'nın çevresindeki ilçelerden günlük olarak işe ve okula gidip gelinen alan hangi bölge türüne örnektir? Neden?",
  r"**İşlevsel bölge.** Ankara bir **merkezdir**; çevredeki ilçelerle iş, eğitim ve ticaret bağı vardır. Etkileşim merkeze yakın ilçelerde güçlü, uzaklaştıkça zayıftır."),
 (r"Karstik şekillerin yaygın olduğu Toroslar ile çay tarımı yapılan Doğu Karadeniz kıyıları hangi tür bölgelerdir?",
  r"İkisi de **şekilsel bölgedir** (belirli bir merkezi yoktur). Toroslar karstik yer şekilleri bakımından **doğal**, çay bölgesi tarım ürünü bakımından **beşerî** şekilsel bölgedir."),
],
"u7/k2": [
 (r"Akdeniz iklim bölgesinin sınırı ile Türkiye'nin siyasi sınırını netlik açısından karşılaştırınız.",
  r"Siyasi sınır antlaşmalarla belirlenmiş **net bir çizgidir**. Akdeniz iklim bölgesi ise kıyıdan iç kesime doğru sıcaklık ve yağış değiştikçe karasal iklime **geçiş alanıyla** sona erer; kesin bir çizgi yoktur."),
 (r"Türkiye'nin coğrafi bölgeleri neden il sınırlarıyla tam olarak örtüşmez?",
  r"Coğrafi bölgeler iklim, yer şekilleri, bitki örtüsü ve ekonomik faaliyetler gibi **doğal ve beşerî ölçütlere** göre belirlenmiştir. İl sınırları ise **idari** amaçlıdır. Bu yüzden bir ilin toprakları iki farklı bölgede kalabilir (ör. Bolu, Sivas)."),
],
"u7/k3": [
 (r"Antalya'da seracılığın yaygınlaşması tarım bölgelerinin sınırlarını nasıl değiştirmiştir?",
  r"Seracılık **teknolojisi** sayesinde kışın da sebze yetiştirilebilir hâle geldi; erken sebze üretim bölgesi genişledi ve yeni üretim alanları oluştu. Teknoloji bir **beşerî bölgenin sınırını** değiştirmiştir."),
 (r"Büyük bir havalimanının bir kentin çevresine yapılması o kentin işlevsel bölgesini nasıl etkiler?",
  r"Havalimanı çevresinde lojistik, otel ve iş merkezleri gelişir; ulaşım ağı genişler. Kentle **etkileşimli alan büyür**, işlevsel bölgenin sınırları dışa doğru genişler."),
],
}

OZET = {
"u2/k4": ["Mutlak konum: koordinatlar (değişmez); göreceli konum: çevreye göre konum (önemi değişebilir).", "Doğu–batı arası 19 boylam → 76 dakika yerel saat farkı."],
"u2/k5": ["Veri türleri: vektör (nokta, çizgi, alan) ve raster (piksel); katman çakıştırma ile risk analizi yapılır."],
"u3/k3": ["Akdeniz: yaz kurak–maki · Karadeniz: her mevsim yağışlı–orman · Karasal: kış soğuk–bozkır."],
"u4/k4": ["Türkiye: 1923–1965 artış teşviki, 1965 sonrası sınırlama, günümüzde doğurganlık 2,1'in altında → destekleyici politikalar."],
"u6/k2": ["Kökenine göre: jeolojik, meteorolojik, hidrolojik, jeomorfolojik, biyolojik; Türkiye'de en etkili afet deprem."],
"u7/k2": ["Türkiye'nin 7 coğrafi bölgesi 1941 I. Coğrafya Kongresi'nde birden çok ölçütle belirlendi."],
"u7/k3": ["Örnekler: seracılık (teknoloji), metropol genişlemesi (kentleşme), SSCB'nin dağılması (siyasi)."],
}
