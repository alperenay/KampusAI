# -*- coding: utf-8 -*-
r"""11. Sınıf Biyoloji — 1.34.0 ek kazanımları (AYT insan fizyolojisi)."""
from _c import O, U

EK = {
"u2": [
O("k4", "1.7", "Endokrin sistem ve hormonlar", "The endocrine system and hormones", r"""
# Endokrin Sistemin Özellikleri
- Hormonlar **kanalsız (iç salgı) bezlerden** doğrudan **kana** salgılanır, hedef hücrelerdeki **reseptörlere** bağlanır.
- Sinir sistemine göre **yavaş** ama **uzun süreli** etki eder.
- Salgı genellikle **negatif geri bildirimle** düzenlenir.
- **Hipotalamus** sinir ve endokrin sistemi bağlar; **hipofizi** yönetir.

# Başlıca Bezler ve Hormonlar
| Bez | Hormon | Görev |
|---|---|---|
| **Hipofiz (ön)** | Büyüme hormonu (GH), TSH, ACTH, FSH, LH, prolaktin | Büyüme; diğer bezleri uyarma; süt üretimi |
| **Hipofiz (arka)** | ADH, oksitosin (hipotalamusta üretilir) | Su geri emilimi; doğumda kasılma, süt salınımı |
| **Tiroit** | Tiroksin ($T_3$, $T_4$), kalsitonin | Metabolizma hızı; kandaki $Ca^{2+}$'u düşürme |
| **Paratiroit** | Parathormon | Kandaki $Ca^{2+}$'u artırma |
| **Böbrek üstü (kabuk)** | Kortizol, aldosteron | Stres, kan şekeri; $Na^+$ geri emilimi |
| **Böbrek üstü (öz)** | Adrenalin, noradrenalin | "Savaş ya da kaç" tepkisi |
| **Pankreas (Langerhans)** | İnsülin (β), glukagon (α) | Kan şekerini düşürme / yükseltme |
| **Epifiz** | Melatonin | Biyolojik saat, uyku |
| **Eşey bezleri** | Testosteron, östrojen, progesteron | Eşeysel özellikler, üreme döngüsü |

# Hormon Bozuklukları
- **Diyabet (şeker hastalığı):** İnsülin eksikliği (Tip 1) ya da hücrelerin insüline duyarsızlığı (Tip 2).
- **Guatr:** İyot eksikliğinde tiroit bezinin büyümesi.
- **Devlik / cücelik:** Büyüme çağında GH fazlalığı / eksikliği.
""",
  [(r"Yemekten sonra kan şekeri yükselen sağlıklı bir bireyde hangi hormon salgılanır ve ne yapar?", r"Pankreasın β hücrelerinden **insülin** salgılanır; glikozun hücrelere alınmasını ve karaciğer–kasta **glikojen** olarak depolanmasını sağlar → kan şekeri düşer (negatif geri bildirim)."),
   (r"Kandaki kalsiyum düzeyini birbirine zıt yönde etkileyen iki hormon hangileridir?", r"**Kalsitonin** (tiroit) kalsiyumu kemiklere bağlayarak düşürür; **parathormon** (paratiroit) kemikten serbest bırakarak yükseltir.")],
  ["Hormonlar kanalsız bezlerden kana salgılanır; yavaş, uzun süreli etki.", "İnsülin kan şekerini düşürür, glukagon yükseltir.", "Kalsitonin ↔ parathormon; ADH su geri emilimi."]),
],
"u4": [
O("k3", "2.7", "Kalp, kan damarları ve kan grupları", "The heart, blood vessels and blood groups", r"""
# Kalbin Yapısı
- **4 odacık:** 2 kulakçık (atriyum) + 2 karıncık (ventrikül). Sağ taraf **kirli (oksijence fakir)**, sol taraf **temiz** kan taşır.
- **Kapakçıklar** kanın geri dönmesini önler: triküspit (sağ), biküspit/mitral (sol), yarım ay kapakçıkları (atardamar çıkışlarında).
- Kalp kası **istemsiz** ve **çizgilidir**; uyarı **sinoatriyal (SA) düğümde** kendiliğinden doğar (**otomatizm**) → AV düğüm → His demeti → Purkinje lifleri.
- En kalın duvar: **sol karıncık** (tüm vücuda kan pompalar).

# Dolaşım Yolları
| Dolaşım | Yol |
|---|---|
| **Küçük (akciğer)** | Sağ karıncık → akciğer atardamarı → akciğer → akciğer toplardamarı → sol kulakçık |
| **Büyük (sistemik)** | Sol karıncık → aort → doku → üst/alt ana toplardamar → sağ kulakçık |

# Damarlar
| Damar | Duvar | Özellik |
|---|---|---|
| **Atardamar** | Kalın, esnek | Kanı kalpten götürür; nabız, yüksek basınç |
| **Kılcal damar** | Tek katlı epitel | Madde alışverişi; en yavaş akış |
| **Toplardamar** | İnce, kapakçıklı | Kanı kalbe getirir; düşük basınç |

# Kan Grupları (ABO ve Rh)
| Kan grubu | Alyuvardaki antijen | Plazmadaki antikor |
|---|---|---|
| A | A | anti-B |
| B | B | anti-A |
| AB | A ve B | yok (**genel alıcı**) |
| 0 | yok (**genel verici**) | anti-A, anti-B |
- **Rh uyuşmazlığı:** Rh⁻ anne, Rh⁺ bebek (ikinci gebelikte risk) → doğumdan sonra anneye anti-Rh serumu.
""",
  [(r"Akciğer atardamarında hangi kan taşınır?", r"**Kirli (oksijence fakir) kan** — atardamar kanı kalpten **götürdüğü** için böyle adlandırılır; içeriğiyle ilgili değildir."),
   (r"0 Rh⁻ kan grubuna sahip biri hangi gruplardan kan alabilir?", r"Yalnızca **0 Rh⁻** kan alabilir; plazmasında anti-A ve anti-B bulunur, Rh antijenine karşı da duyarlıdır.")],
  ["Kalp: 4 odacık; sağ kirli, sol temiz kan; SA düğüm uyarı üretir.", "Atardamar kalpten götürür, toplardamar getirir.", "AB genel alıcı, 0 genel verici (ABO)."]),
O("k4", "2.8", "Solunum sistemi ve gazların taşınması", "The respiratory system and gas transport", r"""
# Solunum Yolları
Burun → yutak → gırtlak → soluk borusu (trakea) → bronş → bronşçuk → **alveol**.
- Soluk borusu **C şeklindeki kıkırdak halkalarla** açık tutulur; **silli epitel ve mukus** tozu tutar.
- **Alveol:** tek katlı yassı epitel, etrafı kılcallarla sarılı → gaz değişiminin yeri; yüzey alanı ~**70 m²**.

# Soluk Alıp Verme Mekaniği
| | Soluk alma (inspirasyon) | Soluk verme (ekspirasyon) |
|---|---|---|
| Diyafram | **Kasılır, düzleşir** | Gevşer, kubbeleşir |
| Kaburgalar arası kaslar | Kasılır, göğüs kafesi genişler | Gevşer |
| Göğüs boşluğu hacmi | Artar → basınç **düşer** | Azalır → basınç **artar** |
| Enerji | Aktif | Normalde pasif |

# Gazların Taşınması
- **Oksijen:** %97–98'i alyuvarlarda **hemoglobine** bağlı (oksihemoglobin), %2–3'ü plazmada çözünmüş.
- **Karbon dioksit:** ~%70 **bikarbonat** ($HCO_3^-$) olarak plazmada (karbonik anhidraz enzimi), ~%23 hemoglobine bağlı, ~%7 çözünmüş.
- Gaz değişimi **difüzyonla**, kısmi basınç farkına göre olur.
- **Karbon monoksit (CO)** hemoglobine oksijenden ~200 kat sıkı bağlanır → zehirlenme.

# Solunumun Kontrolü
**Omurilik soğanı** (ve pons) kandaki **$CO_2$ ve $H^+$** artışını algılayıp solunum hızını artırır. Solunumun asıl uyaranı $O_2$ azalması değil, **$CO_2$ artışıdır**.
""",
  [(r"Soluk alma sırasında diyafram ve göğüs boşluğundaki basınç nasıl değişir?", r"Diyafram **kasılıp düzleşir**, göğüs hacmi artar, akciğer içi basınç atmosfer basıncının **altına düşer** → hava içeri girer."),
   (r"Egzersizde solunum hızının artmasını sağlayan temel uyaran nedir?", r"Kasların artan solunumuyla kanda **$CO_2$ ve $H^+$ derişiminin artması**; omurilik soğanı bunu algılayıp solunumu hızlandırır.")],
  ["Gaz değişimi alveolde difüzyonla.", r"$O_2$ çoğunlukla hemoglobinle, $CO_2$ çoğunlukla bikarbonat olarak taşınır.", r"Solunumun ana uyaranı $CO_2$ artışı (omurilik soğanı)."]),
O("k5", "2.9", "Boşaltım sistemi: nefron ve idrar oluşumu", "The excretory system: the nephron and urine formation", r"""
# Böbreğin Yapısı
**Kabuk (korteks)**, **öz (medulla)** ve **havuzcuk**. Fonksiyonel birimi **nefron** (her böbrekte ~1 milyon).
**Nefron:** Bowman kapsülü + glomerulus (kılcal yumağı) → proksimal tüp → **Henle kulpu** → distal tüp → toplama kanalı.

# İdrar Oluşumu (3 aşama)
| Aşama | Yer | Olay |
|---|---|---|
| **1. Süzülme (filtrasyon)** | Glomerulus → Bowman kapsülü | Kan basıncıyla su, glikoz, aminoasit, tuzlar, üre süzülür. **Kan hücreleri ve büyük proteinler süzülmez.** |
| **2. Geri emilim** | Proksimal tüp (en çok), Henle, distal tüp | Glikoz ve aminoasitlerin **tamamı** (aktif), suyun ~%99'u, tuzlar geri alınır |
| **3. Salgılama (sekresyon)** | Distal tüp | $H^+$, $K^+$, ilaçlar, toksinler kandan tübüle aktarılır |

# Hormonal Kontrol
- **ADH** (hipofiz arka lob): Toplama kanalından **su geri emilimini artırır** → idrar yoğunlaşır. Su az içilince salgı artar.
- **Aldosteron** (böbrek üstü kabuk): $Na^+$ geri emilimini artırır, $K^+$ salgılanmasını artırır.

# Böbreğin Homeostazideki Rolleri
Su–tuz dengesi, **kan pH'ı** ($H^+$ salgılama, $HCO_3^-$ geri emilimi), azotlu atıkların (üre, ürik asit, kreatinin) atılması, **kan basıncı** (renin) ve alyuvar üretimi (eritropoietin).

# Bozukluklar
Böbrek taşı, böbrek yetmezliği (**diyaliz**, nakil), şeker hastalığında idrarda glikoz (geri emilim kapasitesi aşılır).
""",
  [(r"Sağlıklı bir insanın idrarında glikoz bulunmamasının nedeni nedir?", r"Glikoz glomerulusta süzülür ama **proksimal tüpte tamamı aktif taşımayla geri emilir**. Diyabette kan şekeri bu kapasiteyi aştığı için idrarda glikoz görülür."),
   (r"Çok terleyen birinde ADH salgısı ve idrar miktarı nasıl değişir?", r"Vücut su kaybettiği için **ADH salgısı artar**, toplama kanallarından daha çok su geri emilir → idrar **azalır ve yoğunlaşır**.")],
  ["Nefron: süzülme → geri emilim → salgılama.", "Glikoz ve aminoasitlerin tamamı geri emilir.", "ADH su, aldosteron Na⁺ geri emilimini artırır."]),
],
}

YENI = [
U("u5", "3. Tema: Üreme Sistemi ve Embriyonik Gelişim", "Theme 3: Reproductive System and Embryonic Development", [
O("k1", "3.1", "İnsanda üreme sistemi, menstrual döngü ve embriyonik gelişim", "Human reproductive system, menstrual cycle and embryonic development", r"""
# Üreme Sistemleri
| Erkek | Dişi |
|---|---|
| **Testis:** sperm (seminifer tüpçükler) ve testosteron (Leydig hücreleri) | **Ovaryum:** yumurta ve östrojen–progesteron |
| Epididimis (spermlerin olgunlaşması), sperm kanalı, yardımcı bezler (semen) | **Fallop tüpü:** döllenmenin olduğu yer · **Uterus:** embriyonun geliştiği yer |
| Sperm üretimi ergenlikten itibaren **sürekli** | Oogenez doğumdan önce başlar, ergenlikte **döngüsel** devam eder |

# Menstrual Döngü (~28 gün)
| Evre | Olaylar | Hormonlar |
|---|---|---|
| **Folikül evresi** (1–13. gün) | Folikül olgunlaşır, endometrium kalınlaşmaya başlar | **FSH** ↑, **östrojen** ↑ |
| **Ovulasyon** (~14. gün) | Folikül çatlar, yumurta serbest kalır | **LH** ani yükselir |
| **Korpus luteum evresi** (15–28. gün) | Sarı cisim progesteron salgılar, endometrium bakımı | **Progesteron** ↑ |
| **Menstruasyon** | Döllenme olmazsa korpus luteum körelir, endometrium dökülür | Progesteron ↓ |

# Döllenme ve Gelişim
- **Döllenme:** Fallop tüpünde ($2n = 46$ kromozomlu zigot).
- **Bölünme (segmentasyon)** → morula → **blastula (blastosist)** → uterusa **tutunma (implantasyon)**, ~7. gün.
- **Gastrula:** Üç germ tabakası:
  - **Ektoderm:** deri, sinir sistemi, duyu organları
  - **Mezoderm:** kas, iskelet, dolaşım, boşaltım, üreme
  - **Endoderm:** sindirim ve solunum kanalı epiteli, karaciğer, pankreas
- **Plasenta:** Anne ile embriyo arasında madde alışverişi; **kanlar karışmaz**. hCG hormonu (gebelik testi) salgılanır.
- **Embriyo** (ilk 8 hafta, organlar oluşur) → **fetüs** (büyüme, olgunlaşma).
""",
  [(r"Ovulasyonu tetikleyen hormon ve gebelik testinde aranan hormon hangileridir?", r"Ovulasyonu **LH**'nin ani yükselişi tetikler. Gebelik testinde plasentadan salgılanan **hCG** aranır."),
   (r"Sinir sistemi ve kalp kası sırasıyla hangi germ tabakasından gelişir?", r"Sinir sistemi **ektoderm**, kalp kası **mezoderm** kökenlidir.")],
  ["Döllenme Fallop tüpünde, gelişim uterusta.", "FSH folikül, LH ovulasyon, progesteron endometrium bakımı.", "Ektoderm sinir–deri, mezoderm kas–iskelet–dolaşım, endoderm sindirim–solunum epiteli."]),
]),
]
