# -*- coding: utf-8 -*-
r"""10. Sınıf Coğrafya — 1.34.0 ek kazanımları (TYT coğrafya: nüfus, göç, afetler)."""
from _c import O

EK = {
"u4": [
O("k3", "4.3", "Nüfusun dağılışı, nüfus piramitleri ve Türkiye'nin nüfus özellikleri", "Population distribution, population pyramids and Türkiye's population", r"""
# Nüfusun Dağılışını Etkileyen Faktörler
| Doğal | Beşerî |
|---|---|
| İklim (ılıman bölgeler kalabalık), yer şekilleri (ovalar), su kaynakları, toprak verimliliği | Sanayi, ticaret, ulaşım, tarih, turizm, siyasi kararlar |
Dünyanın en kalabalık bölgeleri: **Güney ve Doğu Asya**, **Batı Avrupa**, **ABD'nin kuzeydoğusu**. En seyrek: kutuplar, çöller, yüksek dağlar, Amazon ve Kongo ormanları.

# Nüfus Yoğunlukları
- **Aritmetik yoğunluk** $= \dfrac{\text{nüfus}}{\text{toplam alan}}$
- **Fizyolojik yoğunluk** $= \dfrac{\text{nüfus}}{\text{tarım alanı}}$ (tarım alanı azsa çok yüksek: Mısır)
- **Tarımsal yoğunluk** $= \dfrac{\text{tarımla uğraşan nüfus}}{\text{tarım alanı}}$

# Nüfus Piramitleri
| Piramit | Görünüm | Ülke tipi |
|---|---|---|
| **Genişleyen (geniş tabanlı)** | Taban geniş, tepe dar | Doğum oranı yüksek, ortalama ömür kısa (Nijer) |
| **Durağan** | Kenarlar dik, düzgün | Doğum ve ölüm oranları dengeli |
| **Daralan (tabanı dar)** | Taban dar, orta ve üst geniş | Gelişmiş, yaşlanan nüfus (Japonya, Almanya) |

# Türkiye'nin Nüfusu
- **İlk nüfus sayımı 1927** (13,6 milyon); 2007'den beri **adrese dayalı** kayıt sistemi. Nüfus 85 milyonu aştı.
- Nüfus artış hızı **azalmaktadır**; toplam doğurganlık hızı yenilenme düzeyinin (2,1) **altına** düştü → nüfus **yaşlanıyor**.
- En kalabalık iller: İstanbul, Ankara, İzmir; en yoğun kıyı ve sanayi bölgeleri (Marmara); en seyrek: Doğu Anadolu'nun yüksek kesimleri, Tuz Gölü çevresi, Menteşe yöresi.
""",
  [(r"Bir ülkenin nüfus piramidinin tabanı daralıp orta kısmı genişliyorsa bu ülke hakkında ne söylenebilir?", r"**Doğum oranı azalmış**, nüfus **yaşlanmaya** başlamıştır; ileride çalışan nüfus azalabilir, emeklilik ve sağlık giderleri artabilir."),
   (r"Mısır'ın aritmetik yoğunluğu orta düzeyde iken fizyolojik yoğunluğunun çok yüksek olmasının nedeni nedir?", r"Ülkenin büyük kısmı **çöldür**; tarım alanı yalnızca **Nil vadisi ve deltası** ile sınırlıdır, bu küçük alana çok fazla nüfus düşer.")],
  ["Aritmetik yoğunluk nüfus/alan; fizyolojik nüfus/tarım alanı.", "Geniş tabanlı piramit genç nüfus; dar tabanlı yaşlanan nüfus.", "Türkiye: ilk sayım 1927; doğurganlık 2,1'in altında, nüfus yaşlanıyor."]),
O("k4", "4.4", "Göç: nedenleri, türleri ve sonuçları", "Migration: causes, types and consequences", r"""
# Göçün Nedenleri (itici ve çekici faktörler)
| İtici (çıkılan yer) | Çekici (gidilen yer) |
|---|---|
| İşsizlik, yoksulluk, toprağın miras yoluyla bölünmesi, makineleşme | İş imkânı, yüksek ücret |
| Eğitim ve sağlık hizmetlerinin yetersizliği | Eğitim, sağlık, kültürel imkânlar |
| Savaş, terör, siyasi baskı | Güvenlik, özgürlük |
| Doğal afetler, kuraklık, iklim değişikliği | Elverişli iklim, turizm |

# Göç Türleri
- **İç göç:** Ülke içinde (köyden kente — Türkiye'de 1950 sonrası hızlandı), **mevsimlik göç** (fındık, pamuk hasadı; turizm).
- **Dış göç:** Ülkeler arası. Türkiye'den **Almanya'ya işçi göçü** (1961 anlaşması), **beyin göçü** (nitelikli insan gücü).
- **Zorunlu göç:** Savaş, mübadele (**1923 Türk–Yunan nüfus mübadelesi**), afet. **Mülteci** ve **sığınmacı** kavramları.
- **Gönüllü göç:** Ekonomik ve kişisel tercihlerle.

# Sonuçları
| Göç veren yer | Göç alan yer |
|---|---|
| Nüfus azalır ve **yaşlanır**, tarımsal üretim düşebilir, boşalan köyler | **Gecekondulaşma**, altyapı ve konut sorunu, trafik, işsizlik, çevre kirliliği |
| Gönderilen dövizle ekonomik katkı | Kültürel çeşitlilik, iş gücü artışı |

# Türkiye ve Göç
Türkiye hem **göç veren**, hem **göç alan** (Suriye iç savaşı sonrası dünyada en çok mülteci barındıran ülkelerden), hem de **transit** (Avrupa'ya geçiş) ülkesidir.
""",
  [(r"Doğu Karadeniz'de dağınık yerleşme ve tarım alanlarının küçüklüğü göçü nasıl etkiler?", r"Miras yoluyla bölünen **küçük tarım arazileri** aileyi geçindiremez; bu durum **itici** bir faktördür ve büyük şehirlere ve mevsimlik işlere göçü artırır."),
   (r"Hızlı göç alan büyük şehirlerde ortaya çıkan iki sorunu yazınız.", r"**Gecekondulaşma ve çarpık kentleşme**; altyapı (su, kanalizasyon, ulaşım) **yetersizliği**, işsizlik ve trafik sorunu.")],
  ["Göç itici (işsizlik, savaş) ve çekici (iş, eğitim) faktörlerle olur.", "İç göç, dış göç, mevsimlik göç, beyin göçü, zorunlu göç (mübadele).", "Göç alan yerde gecekondu ve altyapı sorunu; göç veren yerde yaşlanma."]),
],
"u6": [
O("k2", "6.2", "Afet türleri: deprem, sel, heyelan, çığ ve erozyon", "Types of disasters: earthquake, flood, landslide, avalanche and erosion", r"""
# Afet ve Tehlike
**Tehlike** doğal olayın kendisidir (deprem); **afet**, bu olayın can ve mal kaybına yol açarak toplumun normal hayatını durdurmasıdır. Afetin etkisi **hazırlıkla** azaltılabilir.

# Başlıca Afetler ve Türkiye'de Görüldüğü Yerler
| Afet | Neden | Türkiye'de yaygın olduğu yer | Önlem |
|---|---|---|---|
| **Deprem** | Fay hatlarında enerji boşalması (tektonik) | **Kuzey Anadolu, Doğu Anadolu ve Batı Anadolu fay hatları** | Depreme dayanıklı yapı, zemin etüdü, deprem çantası, tatbikat |
| **Sel / taşkın** | Şiddetli yağış, kar erimesi, dere yatağına yapılaşma | **Karadeniz**, Akdeniz ve Ege kıyıları | Dere yataklarına yapı yapmamak, ağaçlandırma, bent |
| **Heyelan** | Eğimli arazi + kil + aşırı yağış, yol yarmaları | **Doğu Karadeniz** (en fazla) | Yamaç teraslama, drenaj, bitki örtüsü |
| **Çığ** | Eğimli yamaçta kalın kar örtüsü | **Doğu Anadolu**, Doğu Karadeniz dağları | Çığ bariyerleri, ağaçlandırma |
| **Erozyon** | Bitki örtüsünün tahribi, yanlış tarım, eğim | **İç Anadolu, Güneydoğu** (kurak alanlar) | Ağaçlandırma, teraslama, nadas yerine münavebe |
| **Orman yangını** | Kuraklık, sıcak, insan kaynaklı | **Akdeniz ve Ege** kıyıları | Yangın şeritleri, erken uyarı |
| **Kuraklık** | Yağış azlığı, iklim değişikliği | İç Anadolu, Güneydoğu | Su tasarrufu, damla sulama |

# Kurumlar ve Bilinç
**AFAD** (Afet ve Acil Durum Yönetimi Başkanlığı), **DASK** (zorunlu deprem sigortası), **112 Acil Çağrı**. "Çök–kapan–tutun" hareketi; aile afet planı ve toplanma alanları.
""",
  [(r"Doğu Karadeniz'de heyelanın sık görülmesinin iki nedeni nedir?", r"**Eğimin fazla olması** ve **yıl boyu bol yağış**; ayrıca killi zemin ve yamaçlarda yapılan yol–bina yapılaşması."),
   (r"Tehlike ile afet arasındaki fark nedir? Bir örnekle açıklayınız.", r"Issız bir bölgede olan deprem bir **tehlikedir**; aynı deprem yerleşim yerinde can ve mal kaybına yol açarsa **afete** dönüşür. Hazırlık ve dayanıklı yapılar afet riskini azaltır.")],
  ["Tehlike doğal olay; afet toplumu etkileyen kayıplı olay.", "Heyelan Doğu Karadeniz, erozyon İç Anadolu, çığ Doğu Anadolu, yangın Akdeniz–Ege.", "AFAD, DASK; çök–kapan–tutun."]),
],
}
