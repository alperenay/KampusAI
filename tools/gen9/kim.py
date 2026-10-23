# -*- coding: utf-8 -*-
"""9. Sınıf Kimya Detaylı Konu Anlatım Notları (PDF) → js/data/content/kim-9.js
Kaynaktaki Türkçe karakterler ve alt indisler PDF'te bozuk olduğundan metin bağlama göre düzeltildi."""
from common import O, U, write

units = []

# ---------------------------------------------------------------- 1. TEMA
units.append(U("u1", "1. Tema: Etkileşim", "Theme 1: Interaction", [
O("k1", "KİM.9.1.1",
  "Kimya biliminin günlük hayata katkısına ilişkin çıkarım yapabilme",
  "Makes inferences about the contribution of chemistry to daily life",
  r"""
# Kimya ve Günlük Hayat

Kimya, insan hayatının her anında yer alan temel bir bilim dalıdır. Sabah yüz yıkamadan akşam uykuya kadar geçen tüm süreçlerde kimyanın doğrudan ya da dolaylı katkısı vardır:

- **Temizlik:** su ve sabun · **Sağlık:** ilaçlar · **Teknoloji:** bilgisayar çipleri (silisyum)
- **Çevre:** plastik atık yönetimi · **Mutfak:** yemek pişirme süreçleri (Maillard tepkimesi, pH etkisi)

Kimya; temizlik, ilaç, gıda, enerji, tarım ve elektronik gibi sektörleri etkiler. Maddelerin nasıl etkileşime ve tepkimeye girdiğini, bu süreçlerin günlük hayata nasıl uygulandığını anlamamıza yardımcı olur. Endüstriyel süreçlerden tarım uygulamalarına kadar **çözüm odaklı** yaklaşımlar geliştirilmesini sağlar.

### Önemli Örnekler ve Çıkarımlar
- **Alüminyum folyoyla pişirme** → ısı yansıtma/iletim özellikleri sayesinde enerji tasarrufu.
- **Limon tuzu (sitrik asit) ile kireç (CaCO₃) çözme** → asit-baz tepkimesiyle temizlik.
- **Gazlı içeceklerin pas temizlemesi** → asidik yapılarının metal oksitlerle tepkimesi.
- **Diş macununun bazik karakteri** → ağız ortamını nötralleştirerek diş sağlığını korur.

> **Önemli not:** Kimya bilgisi, günlük hayat kalitesini artıran bilinçli tüketim ve güvenli kullanım alışkanlıkları kazandırır.

### Kimyanın Alt Disiplinleri
| Alt disiplin | İnceleme alanı | Örnek |
|---|---|---|
| **Analitik kimya** | Maddenin hangi bileşenlerden oluştuğu (**nitel/kalitatif** analiz) ve miktarları (**nicel/kantitatif** analiz) | Su sertliği, kan analizi, şeker miktarı tayini |
| **Biyokimya** | Canlılardaki kimyasal bileşikler (protein, karbonhidrat, lipit, nükleik asit, vitamin, hormon) ve tepkimeleri | Tıp, gıda, tarım |
| **Organik kimya** | Karbon bileşiklerinin yapısı, özellikleri ve tepkimeleri | Petrol ürünleri, ilaç, plastik, boya, deterjan |
| **Anorganik kimya** | Organik olmayan bileşikler (asit, baz, tuz, metal, ametal, mineral) | Tıp, malzeme bilimi, nanoteknoloji, çevre bilimi |
| **Fizikokimya** | Enerji dönüşümleri; sıcaklık-basınç-hacim-derişim etkileri | Gaz davranışları, erime, çözünme, yanma |
| **Polimer kimyası** | Makromoleküllerin sentezi, yapısı, özellikleri | Plastik, kauçuk, fiber, yapıştırıcı, biyopolimer |

### Kimya Alanında Kariyer
- **Ön lisans:** Kimya teknikerliği (laboratuvar teknikeri, kalite kontrol).
- **Lisans:** Kimya, Kimya Mühendisliği, Polimer Malzeme Mühendisliği, Kimya Öğretmenliği.
- **Çalışma alanları:** kimya endüstrisi (boya, plastik, gübre, petrokimya), sağlık ve biyoteknoloji, çevre ve sürdürülebilirlik, enerji, gıda, eğitim, malzeme ve nanoteknoloji, tarım.
- **Örnek bilim insanları:** **Aziz Sancar** (DNA onarımı, 2015 Nobel Kimya Ödülü), **Oktay Sinanoğlu** (çoklu elektron kuramı, "Türk Aynştaynı").
""",
  [("Mutfakta kireçlenmiş bir su ısıtıcısını temizlemek için limon tuzu mu yoksa karbonat mı kullanılmalıdır? Neden?",
    "**Limon tuzu.** Kireç (CaCO₃) baziktir; limon tuzu (sitrik asit) asit-baz tepkimesiyle kireci çözer. Karbonat bazik olduğu için aynı etkiyi göstermez.")],
  ["Kimya; temizlik, sağlık, gıda, enerji, tarım ve elektronikte **çözüm odaklı** katkı sağlar.",
   "Analitik kimya: **nitel** (ne var?) ve **nicel** (ne kadar?) analiz.",
   "Organik kimya = **karbon** bileşikleri; anorganik = asit, baz, tuz, metal, mineral.",
   "Aziz Sancar → DNA onarımı, **2015 Nobel Kimya**."]),

O("k2", "KİM.9.1.2",
  "Farklı ortamlarda kimyasal maddelerin kullanımından kaynaklanan problemleri çözebilme",
  "Solves problems arising from the use of chemicals in different settings",
  r"""
# Kimyasal Maddelerin Bilinçli Kullanımı

Günlük hayatta kullanılan kimyasal maddelerin (limon tuzu, sirke, karbonat, sıvı sabun, diş macunu, antiasit, gazlı içecek) **pH değerleri** ve özellikleri bilinerek problemler çözülür. Laboratuvar deneyleriyle pH ölçülür, saf su eklemenin etkisi incelenir.

### pH Ölçeği
| pH | Karakter | Örnekler |
|---|---|---|
| **pH < 7** | Asidik | Limon tuzu, sirke, gazlı içecek |
| **pH = 7** | Nötr | Saf su |
| **pH > 7** | Bazik | Karbonat, sabun, diş macunu, antiasit |

- **Saf su eklemek** → seyrelme → asidik/bazik özellik zayıflar, pH **7'ye yaklaşır**.

### Laboratuvarda Güvenlik
- **Eldiven, gözlük, maske ve koruyucu önlük** giymek zorunludur.
- Sıcak cisimlere, elektriğe, kırılabilir camlara ve kesici aletlere dikkat edilmelidir.

**Temel uyarı işaretleri:** Yanıcı/Parlayıcı · Oksitleyici · Patlayıcı · Zehirli · Korozif (aşındırıcı) · Tahriş edici · Çevreye zararlı · Sağlığa zararlı (kanser riski)
""",
  [("Diş hekimleri neden \"Diş fırçanızı ıslatmayın!\" uyarısını yapar?",
    "Diş macunu **baziktir**. Fırçayı ıslatmak macunu seyreltir ve bazikliğini azaltır; macunun ağızdaki asidi nötralleştirme etkisi zayıflar."),
   ("Antiasit tabletler neden çiğnenerek kullanılır?",
    "Antiasitler mide asidini **nötralleştirmek** için baziktir. Çiğneme tableti olarak kullanılır; su ile içildiğinde seyreldiği için etkisi azalabilir."),
   ("Mermer tezgâhtaki lekeyi temizlerken limon tuzu kullanmak neden sakıncalıdır?",
    "Mermer de kalsiyum karbonattan (CaCO₃) oluşur. Limon tuzu (asit) kalsiyum karbonatı çözdüğü için **mermere zarar verir**."),
   ("Alüminyum folyoda pişirme yaparken nelere dikkat edilmelidir?",
    "Asidik marinasyon ve yüksek sıcaklık folyodan yiyeceğe **metal bulaşmasını artırır**. Düşük asitli sos ve orta sıcaklık tercih edilmelidir (Alzheimer riski nedeniyle).")],
  ["pH < 7 **asidik**, pH = 7 **nötr**, pH > 7 **bazik**.",
   "Su eklemek seyreltir → pH 7'ye yaklaşır.",
   "Diş macunu, sabun, karbonat, antiasit **bazik**; limon tuzu, sirke, gazlı içecek **asidik**.",
   "Laboratuvarda eldiven, gözlük, maske, önlük zorunlu; uyarı işaretlerini ezbere bil."]),

O("k3", "KİM.9.1.3",
  "Atom teorilerindeki varsayımları kullanarak bilimsel bilginin değişebilirliğine ilişkin çıkarım yapabilme",
  "Uses the assumptions of atomic theories to infer that scientific knowledge can change",
  r"""
# Atom Teorilerinin Tarihsel Gelişimi

| Dönem / Bilim insanı | Varsayım ve katkı | Eksik kalan |
|---|---|---|
| **Demokritos** (Antik Yunan) | Her şey bölünemez **atomlardan** oluşur. | Felsefi yaklaşım; bilimsel deney yok. |
| **Dalton** (1803) | Atomlar bölünemez, **katı küreler** gibidir. Aynı elementin atomları özdeştir. Bileşikler **sabit oranlarda** birleşir. | Elektron, proton, nötron bilinmiyordu. |
| **Thomson** (1897) | **Katot ışınları** deneyiyle **elektron** keşfedildi. "Üzümlü kek modeli": pozitif hamur içinde negatif elektronlar. | Çekirdek yok. |
| **Rutherford** (1911) | **Alfa saçılma** deneyi: atomun çoğu **boşluktur**, merkezde pozitif yüklü çok küçük **çekirdek** vardır; elektronlar çevresinde döner. | Elektronların neden çekirdeğe düşmediğini açıklayamadı. |
| **Bohr** (1913) | Elektronlar belirli **enerji düzeylerinde** bulunur. Enerji soğurarak (**absorbsiyon**) üst düzeye çıkar, yayarak (**emisyon**) alt düzeye iner. **Temel hâl / uyarılmış hâl**. | Belirli yörünge fikri tek elektronlu sistemler dışında yetersiz. |
| **Modern atom teorisi** | **Orbital:** elektronun bulunma olasılığının yüksek olduğu bölge. **Heisenberg belirsizlik ilkesi:** elektronun konumu ve hızı aynı anda kesin bilinemez. | Bohr'un belirli yörünge varsayımı geçersiz. |

### Bilimsel Bilginin Değişebilirliği
Her yeni deney ve gözlem, önceki teorilerin yetersiz kaldığı noktaları ortaya çıkarır. Bilim, **sürekli gelişen ve kendini düzelten** bir süreçtir.
- **Teori:** genel açıklama çerçevesi · **Model:** teoriyi temsil eden görsel/matematiksel araç.

### Atom Altı Parçacıklar
| Tanecik | Bağıl yük | Bağıl kütle | Konum |
|---|---|---|---|
| Elektron (e⁻) | −1 | ≈ 1/1836 | Çekirdek dışı |
| Proton (p⁺) | +1 | ≈ 1 | Çekirdek |
| Nötron (n⁰) | 0 | ≈ 1 | Çekirdek |

- Nötr atomda: **proton sayısı = elektron sayısı = atom numarası (Z)**.
- **Kütle numarası (A) = p⁺ + n⁰**.
""",
  [("Kütle numarası 23, atom numarası 11 olan nötr sodyum atomunda kaç proton, nötron ve elektron vardır?",
    "Proton = Z = **11**, elektron = **11** (nötr atom), nötron = A − Z = 23 − 11 = **12**."),
   ("Rutherford'un alfa saçılma deneyinde parçacıkların çoğunun sapmadan geçmesi neyi gösterir?",
    "Atomun büyük kısmının **boşluk** olduğunu; az sayıda parçacığın geri sekmesi ise merkezde küçük, yoğun ve **pozitif yüklü bir çekirdek** bulunduğunu gösterir.")],
  ["Sıra: Demokritos → Dalton → Thomson (elektron) → Rutherford (çekirdek) → Bohr (enerji düzeyi) → Modern (orbital).",
   "Thomson = **üzümlü kek**; Rutherford = **alfa saçılma**; Bohr = **absorbsiyon/emisyon**.",
   "Nötr atomda p⁺ = e⁻ = Z; **A = p⁺ + n⁰**.",
   "Bilimsel bilgi yeni kanıtlarla **değişebilir**."]),

O("k4", "KİM.9.1.4",
  "Atom orbitallerinin bağıl enerjilerine ilişkin veriye dayalı tahminde bulunabilme",
  "Makes data-based predictions about the relative energies of atomic orbitals",
  r"""
# Orbitaller ve Enerji Sırası

**Orbital:** Elektronun bulunma olasılığının yüksek olduğu **üç boyutlu** bölgedir.

| Orbital | Şekil |
|---|---|
| **s** | Küresel |
| **p** | Halter (dambıl) biçimli; üç eksende: $p_x$, $p_y$, $p_z$ |
| **d, f** | Daha karmaşık şekilli |

### Enerji Sırası (Aufbau diyagramı, yaklaşık)
**1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d …**

> ⚠ Dikkat: **4s orbitali 3d'den önce** dolar (enerjisi daha düşüktür).
""",
  [],
  ["Orbital = elektronun bulunma **olasılığının yüksek** olduğu bölge.",
   "s küresel, p halter biçimli ($p_x$, $p_y$, $p_z$).",
   "Enerji: 1s < 2s < 2p < 3s < 3p < **4s < 3d** < 4p."]),

O("k5", "KİM.9.1.5",
  "Elektronların atom orbitallerine yerleşimine ilişkin tümevarımsal akıl yürütebilme",
  "Reasons inductively about how electrons fill atomic orbitals",
  r"""
# Elektron Dizilimi Kuralları

1. **Aufbau (Yapılandırma) ilkesi:** Elektronlar önce **düşük enerjili** orbitallere yerleşir.
2. **Pauli dışlama ilkesi:** Bir orbitalde **en fazla 2 elektron** bulunur ve spinleri **zıttır**.
3. **Hund kuralı:** Eşit enerjili orbitallere elektronlar önce **tek tek (paralel spinle)** yerleşir, sonra eşleşir.

### Örnek Dizilimler
| Element | Dizilim |
|---|---|
| H (Z = 1) | 1s¹ |
| C (Z = 6) | 1s² 2s² 2p² |
| Na (Z = 11) | 1s² 2s² 2p⁶ 3s¹ |
| Cl (Z = 17) | 1s² 2s² 2p⁶ 3s² 3p⁵ |

**Valans elektron:** En dış enerji düzeyindeki (son kabuktaki) elektronlardır; kimyasal bağı ve özellikleri belirler.
""",
  [("Oksijen (Z = 8) atomunun elektron dizilimini yazınız ve valans elektron sayısını bulunuz.",
    "1s² 2s² 2p⁴. En dış katman 2. katmandır: 2s² 2p⁴ → **6 valans elektron**."),
   ("Azot (Z = 7) atomunun 2p orbitallerine elektronlar nasıl yerleşir?",
    "Dizilim 1s² 2s² 2p³. **Hund kuralına** göre üç 2p elektronu $p_x$, $p_y$, $p_z$ orbitallerine **birer birer, paralel spinle** yerleşir.")],
  ["Aufbau: önce düşük enerji · Pauli: orbitalde en fazla **2 e⁻, zıt spin** · Hund: önce **tek tek**.",
   "Na: 1s² 2s² 2p⁶ **3s¹** · Cl: 1s² 2s² 2p⁶ **3s² 3p⁵**.",
   "Valans elektronlar kimyasal özellikleri belirler."]),

O("k6", "KİM.9.1.6",
  "Elementlerin periyodik tablodaki yerlerine ilişkin tümevarımsal akıl yürütebilme",
  "Reasons inductively about the positions of elements in the periodic table",
  r"""
# Periyodik Tablo

Periyodik tablo, elementlerin **artan atom numarasına** göre düzenlendiği sistemdir.

- **Periyot:** Yatay sıra → elektron bulunan **enerji düzeyi sayısı**.
- **Grup:** Dikey sütun → **valans elektron sayısı** benzer, kimyasal özellikler benzer.

| Grup | Ad | Özellik |
|---|---|---|
| **1A** | Alkali metaller | 1 valans elektron |
| **2A** | Toprak alkali metaller | 2 valans elektron |
| **7A** | Halojenler | 7 valans elektron |
| **8A** | Soy gazlar | Oktet (kararlı) |

- **Metaller sol** tarafta, **ametaller sağ** tarafta yer alır; arada **yarı metaller** bulunur.
""",
  [("Elektron dizilimi 1s² 2s² 2p⁶ 3s¹ olan elementin periyodik tablodaki yeri nedir?",
    "En yüksek enerji düzeyi 3 → **3. periyot**; valans elektron sayısı 1 → **1A grubu** (sodyum, alkali metal).")],
  ["Periyot = **enerji düzeyi** sayısı; grup = **valans elektron** sayısı.",
   "1A alkali, 2A toprak alkali, 7A **halojen**, 8A **soy gaz**.",
   "Metaller solda, ametaller sağda."]),

O("k7", "KİM.9.1.7",
  "İyon oluşumuna ilişkin tümevarımsal akıl yürütebilme",
  "Reasons inductively about the formation of ions",
  r"""
# İyon Oluşumu

Atomlar **oktet** (veya hidrojen ve helyum için **dublet**) kuralına ulaşmak için elektron verir ya da alır.

- **Metal → elektron verir → katyon** (pozitif iyon).
- **Ametal → elektron alır → anyon** (negatif iyon).

### Örnekler
- **Na → Na⁺ + e⁻** (1A, 1 valans elektronunu verir).
- **Cl + e⁻ → Cl⁻** (7A, 1 elektron alır).
- **İzoelektronik:** Elektron sayısı aynı olan tanecikler. Na⁺ ve Ne'nin ikisi de 10 elektronludur.
""",
  [("Magnezyum (Z = 12) hangi iyonu oluşturur? Bu iyonla izoelektronik bir soy gaz örneği veriniz.",
    "1s² 2s² 2p⁶ 3s² → 2 valans elektronunu verir: **Mg²⁺** (10 elektron). 10 elektronlu **Ne** ile izoelektroniktir.")],
  ["Metal e⁻ verir → **katyon**; ametal e⁻ alır → **anyon**.",
   "Amaç: **oktet** (H, He için dublet).",
   "İzoelektronik = **elektron sayısı aynı** (Na⁺ ve Ne)."]),

O("k8", "KİM.9.1.8",
  "Elementlerin periyodik özelliklerinin periyodik tablodaki değişimini çözümleyebilme",
  "Analyses how periodic properties change across the periodic table",
  r"""
# Periyodik Özellikler

| Özellik | Tanım | Periyotta (soldan sağa) | Grupta (yukarıdan aşağı) |
|---|---|---|---|
| **Atom yarıçapı** | Atomun büyüklüğü | **Azalır** (çekirdek çekimi artar) | **Artar** (enerji düzeyi artar) |
| **İyonlaşma enerjisi** | Gaz hâldeki atomdan 1 elektron koparmak için gereken enerji | **Artar** | **Azalır** |
| **Elektronegatiflik** | Bağ elektronlarını çekme eğilimi | **Artar** | **Azalır** |

- En yüksek elektronegatiflik: **flor (F)**.
""",
  [("Aynı periyottaki Na ve Cl atomlarından hangisinin atom yarıçapı büyük, hangisinin iyonlaşma enerjisi yüksektir?",
    "Periyotta soldan sağa atom yarıçapı azalır, iyonlaşma enerjisi artar. **Na'nın yarıçapı büyük**, **Cl'nin iyonlaşma enerjisi yüksektir**.")],
  ["Yarıçap: periyotta **azalır**, grupta **artar**.",
   "İyonlaşma enerjisi ve elektronegatiflik: periyotta **artar**, grupta **azalır**.",
   "En elektronegatif element: **flor**."]),
]))

# ---------------------------------------------------------------- 2. TEMA
units.append(U("u2", "2. Tema: Çeşitlilik", "Theme 2: Diversity", [
O("k1", "KİM.9.2.1",
  "Metalik bağın oluşumuna yönelik tümevarımsal akıl yürütebilme",
  "Reasons inductively about the formation of metallic bonds",
  r"""
# Metalik Bağ

Metaller, **pozitif yüklü metal iyonları** ile bu iyonlar arasında serbestçe hareket eden (delokalize) **elektron denizinden** oluşur (**elektron denizi modeli**).

**Metalik bağ:** pozitif iyonlar ile negatif elektron denizi arasındaki **elektrostatik çekim** kuvvetidir.

### Metalik Bağın Sonuçları
- **Elektrik ve ısı iletkenliği yüksektir** (serbest elektronlar sayesinde).
- **Dövülebilir ve tel hâline getirilebilir** (iyonlar kayabilir, bağ kopmaz).
- **Parlak yüzeylidir** (elektronlar ışığı yansıtır).
- Genellikle **yüksek erime/kaynama noktası**.

**Örnekler:** Cu (kablo), Fe (inşaat), Al (uçak, kutu), Au–Ag (mücevher).
""",
  [],
  ["Metalik bağ = **katyonlar + elektron denizi** arasındaki çekim.",
   "Serbest elektronlar → **iletkenlik ve parlaklık**; kayabilen iyonlar → **dövülebilirlik**."]),

O("k2", "KİM.9.2.2",
  "İyonik bağın oluşumunu gözleme dayalı tahmin edebilme",
  "Predicts the formation of ionic bonds based on observation",
  r"""
# İyonik Bağ

Metal atomu elektron vererek **katyon**, ametal atomu elektron alarak **anyon** oluşturur. Zıt yüklü iyonlar arasındaki **elektrostatik çekim** iyonik bağı oluşturur.

- **Coulomb yasası:** Çekim kuvveti yüklerin büyüklüğüyle **artar**, iyonlar arası mesafe arttıkça **azalır**.

### İyonik Bileşiklerin Özellikleri
- Yüksek erime/kaynama noktası.
- **Katı hâlde elektriği iletmez**; **eriyik veya sulu çözeltide iletir**.
- Sert ve kırılgandır; genellikle suda çözünür.

**Örnekler:** NaCl, MgO, CaF₂.
""",
  [("NaCl katı hâlde elektriği iletmezken suda çözündüğünde neden iletir?",
    "Katı hâlde iyonlar kristal örgüde **sabittir**. Suda çözününce Na⁺ ve Cl⁻ iyonları **serbestçe hareket eder** ve elektrik akımını taşır.")],
  ["İyonik bağ = **metal + ametal**, zıt yüklü iyonlar arası çekim.",
   "Katıda iletmez, **eriyik ve çözeltide iletir**.",
   "Yük arttıkça çekim artar, mesafe arttıkça azalır (Coulomb)."]),

O("k3", "KİM.9.2.3",
  "Kovalent bağ oluşumunu bilimsel gözleme dayalı tahmin edebilme",
  "Predicts covalent bond formation based on scientific observation",
  r"""
# Kovalent Bağ

**Ametal atomları** arasında elektronların **ortaklaşa kullanılmasıyla** oluşur. Ortaklaşa kullanılan elektron çifti her iki atomun da oktetine katkı sağlar.

| Tür | Açıklama | Örnek |
|---|---|---|
| **Apolar kovalent** | Aynı atomlar arasında ya da elektronegatiflik farkı çok küçük | H₂, Cl₂, CH₄ |
| **Polar kovalent** | Elektronegatiflik farkı anlamlı; elektronlar daha elektronegatif atoma kayar | HCl, H₂O |
""",
  [],
  ["Kovalent bağ = **ametal + ametal**, elektron **ortaklaşması**.",
   "Aynı atomlar → **apolar** (H₂, Cl₂); farklı elektronegatiflik → **polar** (HCl, H₂O)."]),

O("k4", "KİM.9.2.4",
  "Moleküllerin Lewis nokta yapısına ilişkin çıkarımda bulunabilme",
  "Makes inferences about the Lewis dot structures of molecules",
  r"""
# Lewis Nokta Yapısı

Lewis nokta yapısı, **valans elektronların nokta (•)** ile gösterildiği modeldir.

- **Tekli bağ** = 1 ortak elektron çifti · **İkili bağ** = 2 çift · **Üçlü bağ** = 3 çift.
- Hedef **oktet** kuralıdır (hidrojen için **dublet**).
- H₂O, CO₂, NH₃, CH₄ gibi moleküllerin Lewis yapıları çizilebilir.
""",
  [("CO₂ molekülünde karbon ile oksijenler arasında kaçar bağ bulunur?",
    "Karbonun 4, her oksijenin 6 valans elektronu vardır. Karbon her oksijenle **ikili bağ** kurar (O=C=O); böylece üç atom da okteti tamamlar.")],
  ["Lewis yapısında yalnızca **valans elektronlar** gösterilir.",
   "Tekli, ikili, üçlü bağ = 1, 2, 3 ortak elektron çifti."]),

O("k5", "KİM.9.2.5",
  "Molekülleri polar ya da apolar olarak sınıflandırabilme",
  "Classifies molecules as polar or nonpolar",
  r"""
# Polar ve Apolar Moleküller

Molekülün polarlığı, **bağ polarlığına** ve **molekül geometrisine** bağlıdır.

- Dipol moment vektörlerinin toplamı **sıfır değilse** → **polar molekül** (H₂O, NH₃, HCl).
- Toplam **sıfırsa** → **apolar molekül** (CO₂, CH₄, BF₃, Cl₂).

> ⚠ Polar bağ içeren bir molekül, simetrik geometride dipoller birbirini götürdüğü için **apolar** olabilir (CO₂, CH₄).
""",
  [],
  ["Polarlık = bağ polarlığı + **geometri**.",
   "H₂O, NH₃, HCl **polar**; CO₂, CH₄, BF₃, Cl₂ **apolar**.",
   "Simetrik molekülde dipoller birbirini götürür."]),

O("k6", "KİM.9.2.6",
  "Bileşikleri adlandırma kurallarına ilişkin tümdengelimsel akıl yürütebilme",
  "Reasons deductively about the rules for naming compounds",
  r"""
# Bileşiklerin Adlandırılması

### İyonik Bileşikler
- **Metal adı + ametal kökü + "-ür"**: sodyum klorür (NaCl), magnezyum oksit (MgO).
- Değişken değerlikli metallerde değerlik **Roma rakamıyla** belirtilir: demir(III) klorür (FeCl₃).

### Moleküler (Kovalent) Bileşikler
- Atom sayıları **öneklerle** belirtilir: mono-, di-, tri-, tetra-, penta- …
- Örnekler: **karbon dioksit** (CO₂), **difosfor pentoksit** (P₂O₅).
- İlk elementte "mono" genellikle yazılmaz.
""",
  [("CO ve N₂O₄ bileşiklerini adlandırınız.",
    "CO → **karbon monoksit** (ilk elementte mono yazılmaz). N₂O₄ → **diazot tetroksit**.")],
  ["İyonik: metal + ametal kökü + **-ür** (sodyum klorür).",
   "Değişken değerlikli metal → **Roma rakamı** (demir(III) klorür).",
   "Moleküler: **önekler** (karbon dioksit, difosfor pentoksit)."]),

O("k7", "KİM.9.2.7",
  "Moleküller arası etkileşimleri sınıflandırabilme",
  "Classifies intermolecular interactions",
  r"""
# Moleküller Arası Etkileşimler

Moleküller arası etkileşimler (genel adıyla **van der Waals kuvvetleri**) maddelerin **erime, kaynama, buhar basıncı ve viskozite** gibi fiziksel özelliklerini belirler. **Bağlardan çok daha zayıftır.**

| Etkileşim | Nerede görülür? | Not |
|---|---|---|
| **London (dağılma) kuvveti** | **Tüm** moleküllerde | Geçici dipollerden kaynaklanır; molekül büyüdükçe artar |
| **Dipol–dipol** | Polar moleküller arasında | Kalıcı dipollerin etkileşimi |
| **İyon–dipol** | İyon ile polar molekül arasında | Tuzun suda çözünmesi |
| **Hidrojen bağı** | H atomunun **N, O veya F**'ye bağlı olduğu moleküller arasında | **En güçlü** moleküller arası etkileşim (su, amonyak, HF) |
""",
  [("Su (H₂O) ile metan (CH₄) molekülleri arasında hangi etkileşimler baskındır?",
    "Su polardır ve H atomu O'ya bağlıdır → **hidrojen bağı** (ve London kuvvetleri). Metan apolardır → yalnızca **London kuvvetleri**. Bu yüzden suyun kaynama noktası çok daha yüksektir.")],
  ["London kuvveti **tüm** moleküllerde vardır, molekül büyüdükçe artar.",
   "Hidrojen bağı: H atomu **N, O, F**'ye bağlıysa; en güçlü moleküller arası etkileşim.",
   "Moleküller arası etkileşimler **bağlardan zayıftır**."]),

O("k8", "KİM.9.2.8",
  "Etkileşimlerin katıların özellikleri üzerindeki etkilerine ilişkin bilimsel çıkarım yapabilme",
  "Makes scientific inferences about how interactions affect the properties of solids",
  r"""
# Kristal ve Amorf Katılar

### Kristal Katılar
Tanecikler **düzenli geometrik** dizilim gösterir; **belirli erime noktası** vardır.

| Tür | Örnek |
|---|---|
| İyonik | NaCl |
| Metalik | Cu |
| Moleküler | Buz, iyot |
| Kovalent ağ | Elmas, kuvars |

### Amorf Katılar
**Düzensiz** yapıdadır; **belirli erime noktası yoktur** (cam, lastik, plastik).

- Tanecikler arası etkileşim kuvveti **arttıkça erime noktası ve sertlik artar**.
""",
  [],
  ["Kristal katı: **düzenli**, belirli erime noktası (NaCl, Cu, buz, elmas).",
   "Amorf katı: **düzensiz**, belirli erime noktası yok (cam, plastik).",
   "Etkileşim arttıkça erime noktası ve sertlik artar."]),

O("k9", "KİM.9.2.8",
  "Sıvıların özelliklerini (buhar basıncı, kaynama, viskozite, yüzey gerilimi, adezyon-kohezyon) açıklayabilme",
  "Explains the properties of liquids (vapour pressure, boiling, viscosity, surface tension, adhesion-cohesion)",
  r"""
# Sıvıların Özellikleri

- **Buharlaşma ve denge buhar basıncı:** Sıvı yüzeyinden moleküllerin gaz hâline geçmesidir. Kapalı kapta denge kurulduğunda oluşan basınca **denge buhar basıncı** denir.
  - Sıcaklık arttıkça buhar basıncı **artar**.
  - Moleküller arası kuvvet arttıkça buhar basıncı **azalır**.
- **Kaynama sıcaklığı:** Buhar basıncının **dış basınca eşit** olduğu sıcaklıktır. Dış basınç azalırsa (yüksek rakım) kaynama noktası **düşer**.
- **Viskozite (akışkanlığın karşıtı):** Sıvının akmaya karşı gösterdiği dirençtir. Moleküller arası kuvvet ve molekül şekli etkiler. Sıcaklık artınca viskozite **azalır** (bal, yağ).
- **Yüzey gerilimi:** Sıvı yüzeyinin gerilmesidir; **kohezyon** kuvvetlerinden kaynaklanır. Su böceklerinin su üzerinde durabilmesi buna örnektir. **Sabun yüzey gerilimini düşürür.**
- **Adezyon ve kohezyon:** Kohezyon = **aynı cins** tanecikler arası çekim; adezyon = **farklı cins** tanecikler arası çekim.
  - **Kılcallık** (kapiler etki), **adezyon > kohezyon** olduğunda görülür (cam tüpte suyun yükselmesi).
""",
  [("Yüksek bir dağın tepesinde yemek pişirmek neden daha uzun sürer?",
    "Yükseklik arttıkça **dış basınç azalır**, suyun kaynama noktası düşer (100 °C'nin altında kaynar). Yemek daha düşük sıcaklıkta pişeceği için süre uzar.")],
  ["Sıcaklık ↑ → buhar basıncı ↑, viskozite ↓.",
   "Moleküller arası kuvvet ↑ → buhar basıncı ↓, viskozite ve yüzey gerilimi ↑.",
   "Kaynama: buhar basıncı = **dış basınç**; rakım artınca kaynama noktası düşer.",
   "Kılcallık: **adezyon > kohezyon**."]),
]))

# ---------------------------------------------------------------- 3. TEMA
units.append(U("u3", "3. Tema: Sürdürülebilirlik", "Theme 3: Sustainability", [
O("k1", "3.1",
  "Nanoparçacıkların özelliklerini ve kullanım alanlarını ekolojik sürdürülebilirlik açısından değerlendirebilme",
  "Evaluates nanoparticles and their uses in terms of ecological sustainability",
  r"""
# Nanoparçacıklar

**Nanoparçacık:** En az bir boyutu **1–100 nm** arasında olan parçacıklardır.

- Boyut küçüldükçe **yüzey/hacim oranı artar**; fiziksel ve kimyasal özellikler değişir (erime noktası, renk, reaktiflik, manyetik özellik).

### Metal Nanoparçacıklar (AgNP, CuNP vb.)
- Antibakteriyel özellik, katalizör, elektronik, tıp ve tekstil alanlarında kullanılır.
- **Gümüş nanoparçacıklar:** dezenfektan ve yara bakımında.
- **Bakır nanoparçacıklar:** iletken mürekkep ve antimikrobiyal uygulamalarda.
""",
  [],
  ["Nanoparçacık: en az bir boyutu **1–100 nm**.",
   "Boyut küçülünce **yüzey/hacim oranı artar**, özellikler değişir.",
   "Gümüş NP → dezenfektan, yara bakımı; bakır NP → iletken mürekkep."]),

O("k2", "3.2",
  "Yeşil kimyanın atık önleme ilkesini açıklayabilme",
  "Explains the waste-prevention principle of green chemistry",
  r"""
# Yeşil Kimya

**Yeşil kimya**, kimyasal ürün ve süreçlerin tasarımında insan sağlığına ve çevreye zararlı maddelerin kullanımını ve oluşumunu **azaltmayı/önlemeyi** amaçlar.

### Atık Önleme İlkesi
En temel ilkedir: **Atık oluştuktan sonra temizlemek yerine, atığın hiç oluşmamasını sağlamak en iyisidir.**

### Diğer Yeşil Kimya İlkeleri
- Atom ekonomisi
- Daha az zararlı kimyasal sentez
- Güvenli çözücüler
- Enerji verimliliği
- Yenilenebilir hammaddeler
- Katalizör kullanımı
- Bozunabilir ürün tasarımı
""",
  [],
  ["Yeşil kimyanın en temel ilkesi: **atık önleme** (oluşmadan engelle).",
   "Diğer ilkeler: atom ekonomisi, güvenli çözücü, enerji verimliliği, yenilenebilir hammadde, katalizör, bozunabilir ürün."]),

O("k3", "3.3",
  "Metal, alaşım ve metal nanoparçacıkların çevresel etkilerini değerlendirebilme",
  "Evaluates the environmental effects of metals, alloys and metal nanoparticles",
  r"""
# Metallerin ve Nanoparçacıkların Çevresel Etkileri

- **Metaller ve alaşımlar** doğada uzun süre kalabilir ve **biyobirikim** yapabilir.
- **Nanoparçacıklar** çok küçük oldukları için **hücrelere nüfuz edebilir** ve toksik etki gösterebilir.
- Suya, toprağa ve canlılara zarar vermemeleri için **kontrollü üretim, kullanım ve bertaraf** yöntemleri geliştirilmelidir.
- **Sürdürülebilir kimya** yaklaşımıyla hem fayda hem de çevre koruması dengelenir.

### Çalışma Önerileri
1. Laboratuvar güvenlik işaretlerini ezbere bilin.
2. Atom modellerinin kronolojik sırasını ve her birinin getirdiği yeniliği yazın.
3. Elektron dizilimi kurallarını bol örnekle uygulayın.
4. Periyodik özelliklerin değişim yönlerini tabloya çizin.
5. Bağ türlerini (metalik, iyonik, kovalent) özellikleriyle karşılaştırın.
6. Moleküller arası etkileşimleri güç sırasına göre listeleyin.
7. Sıvı özelliklerini etkileyen faktörleri yazın.
8. Yeşil kimya ve sürdürülebilirlik kavramlarını günlük hayattan örneklerle ilişkilendirin.
""",
  [],
  ["Metaller ve alaşımlar **biyobirikim** yapabilir.",
   "Nanoparçacıklar hücrelere girip **toksik** etki gösterebilir.",
   "Çözüm: kontrollü üretim, kullanım ve **bertaraf**."]),
]))

from _ek135 import uygula135  # noqa: E402
uygula135(units, "kim")

write("kim-9.js", "9/kimya", "9. Sınıf Kimya — detaylı konu anlatım notları",
      "kullanıcının verdiği \"9. Sınıf Kimya Detaylı Konu Anlatım Notları\" (Türkiye Yüzyılı Maarif Modeli, 3 tema).",
      units, "Kazanım kodları kaynaktaki KİM.9.x.x kodlarıdır. Örnek soruların bir kısmı kaynaktan, diğerleri kazanımı uygulamak için eklendi.")
