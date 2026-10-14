/* =========================================================
   9. Sınıf Kimya — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "9. Sınıf Kimya Detaylı Konu Anlatım Notları" (Türkiye Yüzyılı Maarif Modeli, 3 tema).
   Kazanım kodları kaynaktaki KİM.9.x.x kodlarıdır. Örnek soruların bir kısmı kaynaktan, diğerleri kazanımı uygulamak için eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/kimya"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Etkileşim",
   "en": "Theme 1: Interaction"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "KİM.9.1.1",
    "title": {
     "tr": "Kimya biliminin günlük hayata katkısına ilişkin çıkarım yapabilme",
     "en": "Makes inferences about the contribution of chemistry to daily life"
    },
    "content": {
     "anlatim": "# Kimya ve Günlük Hayat\n\nKimya, insan hayatının her anında yer alan temel bir bilim dalıdır. Sabah yüz yıkamadan akşam uykuya kadar geçen tüm süreçlerde kimyanın doğrudan ya da dolaylı katkısı vardır:\n\n- **Temizlik:** su ve sabun · **Sağlık:** ilaçlar · **Teknoloji:** bilgisayar çipleri (silisyum)\n- **Çevre:** plastik atık yönetimi · **Mutfak:** yemek pişirme süreçleri (Maillard tepkimesi, pH etkisi)\n\nKimya; temizlik, ilaç, gıda, enerji, tarım ve elektronik gibi sektörleri etkiler. Maddelerin nasıl etkileşime ve tepkimeye girdiğini, bu süreçlerin günlük hayata nasıl uygulandığını anlamamıza yardımcı olur. Endüstriyel süreçlerden tarım uygulamalarına kadar **çözüm odaklı** yaklaşımlar geliştirilmesini sağlar.\n\n### Önemli Örnekler ve Çıkarımlar\n\n- **Alüminyum folyoyla pişirme** → ısı yansıtma/iletim özellikleri sayesinde enerji tasarrufu.\n- **Limon tuzu (sitrik asit) ile kireç (CaCO₃) çözme** → asit-baz tepkimesiyle temizlik.\n- **Gazlı içeceklerin pas temizlemesi** → asidik yapılarının metal oksitlerle tepkimesi.\n- **Diş macununun bazik karakteri** → ağız ortamını nötralleştirerek diş sağlığını korur.\n\n> **Önemli not:** Kimya bilgisi, günlük hayat kalitesini artıran bilinçli tüketim ve güvenli kullanım alışkanlıkları kazandırır.\n\n### Kimyanın Alt Disiplinleri\n\n| Alt disiplin | İnceleme alanı | Örnek |\n|---|---|---|\n| **Analitik kimya** | Maddenin hangi bileşenlerden oluştuğu (**nitel/kalitatif** analiz) ve miktarları (**nicel/kantitatif** analiz) | Su sertliği, kan analizi, şeker miktarı tayini |\n| **Biyokimya** | Canlılardaki kimyasal bileşikler (protein, karbonhidrat, lipit, nükleik asit, vitamin, hormon) ve tepkimeleri | Tıp, gıda, tarım |\n| **Organik kimya** | Karbon bileşiklerinin yapısı, özellikleri ve tepkimeleri | Petrol ürünleri, ilaç, plastik, boya, deterjan |\n| **Anorganik kimya** | Organik olmayan bileşikler (asit, baz, tuz, metal, ametal, mineral) | Tıp, malzeme bilimi, nanoteknoloji, çevre bilimi |\n| **Fizikokimya** | Enerji dönüşümleri; sıcaklık-basınç-hacim-derişim etkileri | Gaz davranışları, erime, çözünme, yanma |\n| **Polimer kimyası** | Makromoleküllerin sentezi, yapısı, özellikleri | Plastik, kauçuk, fiber, yapıştırıcı, biyopolimer |\n\n### Kimya Alanında Kariyer\n\n- **Ön lisans:** Kimya teknikerliği (laboratuvar teknikeri, kalite kontrol).\n- **Lisans:** Kimya, Kimya Mühendisliği, Polimer Malzeme Mühendisliği, Kimya Öğretmenliği.\n- **Çalışma alanları:** kimya endüstrisi (boya, plastik, gübre, petrokimya), sağlık ve biyoteknoloji, çevre ve sürdürülebilirlik, enerji, gıda, eğitim, malzeme ve nanoteknoloji, tarım.\n- **Örnek bilim insanları:** **Aziz Sancar** (DNA onarımı, 2015 Nobel Kimya Ödülü), **Oktay Sinanoğlu** (çoklu elektron kuramı, \"Türk Aynştaynı\").",
     "ornekler": [
      {
       "soru": "Mutfakta kireçlenmiş bir su ısıtıcısını temizlemek için limon tuzu mu yoksa karbonat mı kullanılmalıdır? Neden?",
       "cozum": "**Limon tuzu.** Kireç (CaCO₃) baziktir; limon tuzu (sitrik asit) asit-baz tepkimesiyle kireci çözer. Karbonat bazik olduğu için aynı etkiyi göstermez."
      }
     ],
     "ozet": [
      "Kimya; temizlik, sağlık, gıda, enerji, tarım ve elektronikte **çözüm odaklı** katkı sağlar.",
      "Analitik kimya: **nitel** (ne var?) ve **nicel** (ne kadar?) analiz.",
      "Organik kimya = **karbon** bileşikleri; anorganik = asit, baz, tuz, metal, mineral.",
      "Aziz Sancar → DNA onarımı, **2015 Nobel Kimya**."
     ]
    }
   },
   {
    "id": "k2",
    "code": "KİM.9.1.2",
    "title": {
     "tr": "Farklı ortamlarda kimyasal maddelerin kullanımından kaynaklanan problemleri çözebilme",
     "en": "Solves problems arising from the use of chemicals in different settings"
    },
    "content": {
     "anlatim": "# Kimyasal Maddelerin Bilinçli Kullanımı\n\nGünlük hayatta kullanılan kimyasal maddelerin (limon tuzu, sirke, karbonat, sıvı sabun, diş macunu, antiasit, gazlı içecek) **pH değerleri** ve özellikleri bilinerek problemler çözülür. Laboratuvar deneyleriyle pH ölçülür, saf su eklemenin etkisi incelenir.\n\n### pH Ölçeği\n\n| pH | Karakter | Örnekler |\n|---|---|---|\n| **pH < 7** | Asidik | Limon tuzu, sirke, gazlı içecek |\n| **pH = 7** | Nötr | Saf su |\n| **pH > 7** | Bazik | Karbonat, sabun, diş macunu, antiasit |\n\n- **Saf su eklemek** → seyrelme → asidik/bazik özellik zayıflar, pH **7'ye yaklaşır**.\n\n### Laboratuvarda Güvenlik\n\n- **Eldiven, gözlük, maske ve koruyucu önlük** giymek zorunludur.\n- Sıcak cisimlere, elektriğe, kırılabilir camlara ve kesici aletlere dikkat edilmelidir.\n\n**Temel uyarı işaretleri:** Yanıcı/Parlayıcı · Oksitleyici · Patlayıcı · Zehirli · Korozif (aşındırıcı) · Tahriş edici · Çevreye zararlı · Sağlığa zararlı (kanser riski)",
     "ornekler": [
      {
       "soru": "Diş hekimleri neden \"Diş fırçanızı ıslatmayın!\" uyarısını yapar?",
       "cozum": "Diş macunu **baziktir**. Fırçayı ıslatmak macunu seyreltir ve bazikliğini azaltır; macunun ağızdaki asidi nötralleştirme etkisi zayıflar."
      },
      {
       "soru": "Antiasit tabletler neden çiğnenerek kullanılır?",
       "cozum": "Antiasitler mide asidini **nötralleştirmek** için baziktir. Çiğneme tableti olarak kullanılır; su ile içildiğinde seyreldiği için etkisi azalabilir."
      },
      {
       "soru": "Mermer tezgâhtaki lekeyi temizlerken limon tuzu kullanmak neden sakıncalıdır?",
       "cozum": "Mermer de kalsiyum karbonattan (CaCO₃) oluşur. Limon tuzu (asit) kalsiyum karbonatı çözdüğü için **mermere zarar verir**."
      },
      {
       "soru": "Alüminyum folyoda pişirme yaparken nelere dikkat edilmelidir?",
       "cozum": "Asidik marinasyon ve yüksek sıcaklık folyodan yiyeceğe **metal bulaşmasını artırır**. Düşük asitli sos ve orta sıcaklık tercih edilmelidir (Alzheimer riski nedeniyle)."
      }
     ],
     "ozet": [
      "pH < 7 **asidik**, pH = 7 **nötr**, pH > 7 **bazik**.",
      "Su eklemek seyreltir → pH 7'ye yaklaşır.",
      "Diş macunu, sabun, karbonat, antiasit **bazik**; limon tuzu, sirke, gazlı içecek **asidik**.",
      "Laboratuvarda eldiven, gözlük, maske, önlük zorunlu; uyarı işaretlerini ezbere bil."
     ]
    }
   },
   {
    "id": "k3",
    "code": "KİM.9.1.3",
    "title": {
     "tr": "Atom teorilerindeki varsayımları kullanarak bilimsel bilginin değişebilirliğine ilişkin çıkarım yapabilme",
     "en": "Uses the assumptions of atomic theories to infer that scientific knowledge can change"
    },
    "content": {
     "anlatim": "# Atom Teorilerinin Tarihsel Gelişimi\n\n| Dönem / Bilim insanı | Varsayım ve katkı | Eksik kalan |\n|---|---|---|\n| **Demokritos** (Antik Yunan) | Her şey bölünemez **atomlardan** oluşur. | Felsefi yaklaşım; bilimsel deney yok. |\n| **Dalton** (1803) | Atomlar bölünemez, **katı küreler** gibidir. Aynı elementin atomları özdeştir. Bileşikler **sabit oranlarda** birleşir. | Elektron, proton, nötron bilinmiyordu. |\n| **Thomson** (1897) | **Katot ışınları** deneyiyle **elektron** keşfedildi. \"Üzümlü kek modeli\": pozitif hamur içinde negatif elektronlar. | Çekirdek yok. |\n| **Rutherford** (1911) | **Alfa saçılma** deneyi: atomun çoğu **boşluktur**, merkezde pozitif yüklü çok küçük **çekirdek** vardır; elektronlar çevresinde döner. | Elektronların neden çekirdeğe düşmediğini açıklayamadı. |\n| **Bohr** (1913) | Elektronlar belirli **enerji düzeylerinde** bulunur. Enerji soğurarak (**absorbsiyon**) üst düzeye çıkar, yayarak (**emisyon**) alt düzeye iner. **Temel hâl / uyarılmış hâl**. | Belirli yörünge fikri tek elektronlu sistemler dışında yetersiz. |\n| **Modern atom teorisi** | **Orbital:** elektronun bulunma olasılığının yüksek olduğu bölge. **Heisenberg belirsizlik ilkesi:** elektronun konumu ve hızı aynı anda kesin bilinemez. | Bohr'un belirli yörünge varsayımı geçersiz. |\n\n### Bilimsel Bilginin Değişebilirliği\n\nHer yeni deney ve gözlem, önceki teorilerin yetersiz kaldığı noktaları ortaya çıkarır. Bilim, **sürekli gelişen ve kendini düzelten** bir süreçtir.\n- **Teori:** genel açıklama çerçevesi · **Model:** teoriyi temsil eden görsel/matematiksel araç.\n\n### Atom Altı Parçacıklar\n\n| Tanecik | Bağıl yük | Bağıl kütle | Konum |\n|---|---|---|---|\n| Elektron (e⁻) | −1 | ≈ 1/1836 | Çekirdek dışı |\n| Proton (p⁺) | +1 | ≈ 1 | Çekirdek |\n| Nötron (n⁰) | 0 | ≈ 1 | Çekirdek |\n\n- Nötr atomda: **proton sayısı = elektron sayısı = atom numarası (Z)**.\n- **Kütle numarası (A) = p⁺ + n⁰**.",
     "ornekler": [
      {
       "soru": "Kütle numarası 23, atom numarası 11 olan nötr sodyum atomunda kaç proton, nötron ve elektron vardır?",
       "cozum": "Proton = Z = **11**, elektron = **11** (nötr atom), nötron = A − Z = 23 − 11 = **12**."
      },
      {
       "soru": "Rutherford'un alfa saçılma deneyinde parçacıkların çoğunun sapmadan geçmesi neyi gösterir?",
       "cozum": "Atomun büyük kısmının **boşluk** olduğunu; az sayıda parçacığın geri sekmesi ise merkezde küçük, yoğun ve **pozitif yüklü bir çekirdek** bulunduğunu gösterir."
      }
     ],
     "ozet": [
      "Sıra: Demokritos → Dalton → Thomson (elektron) → Rutherford (çekirdek) → Bohr (enerji düzeyi) → Modern (orbital).",
      "Thomson = **üzümlü kek**; Rutherford = **alfa saçılma**; Bohr = **absorbsiyon/emisyon**.",
      "Nötr atomda p⁺ = e⁻ = Z; **A = p⁺ + n⁰**.",
      "Bilimsel bilgi yeni kanıtlarla **değişebilir**."
     ]
    }
   },
   {
    "id": "k4",
    "code": "KİM.9.1.4",
    "title": {
     "tr": "Atom orbitallerinin bağıl enerjilerine ilişkin veriye dayalı tahminde bulunabilme",
     "en": "Makes data-based predictions about the relative energies of atomic orbitals"
    },
    "content": {
     "anlatim": "# Orbitaller ve Enerji Sırası\n\n**Orbital:** Elektronun bulunma olasılığının yüksek olduğu **üç boyutlu** bölgedir.\n\n| Orbital | Şekil |\n|---|---|\n| **s** | Küresel |\n| **p** | Halter (dambıl) biçimli; üç eksende: $p_x$, $p_y$, $p_z$ |\n| **d, f** | Daha karmaşık şekilli |\n\n### Enerji Sırası (Aufbau diyagramı, yaklaşık)\n\n**1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d …**\n\n> ⚠ Dikkat: **4s orbitali 3d'den önce** dolar (enerjisi daha düşüktür).",
     "ornekler": [],
     "ozet": [
      "Orbital = elektronun bulunma **olasılığının yüksek** olduğu bölge.",
      "s küresel, p halter biçimli ($p_x$, $p_y$, $p_z$).",
      "Enerji: 1s < 2s < 2p < 3s < 3p < **4s < 3d** < 4p."
     ]
    }
   },
   {
    "id": "k5",
    "code": "KİM.9.1.5",
    "title": {
     "tr": "Elektronların atom orbitallerine yerleşimine ilişkin tümevarımsal akıl yürütebilme",
     "en": "Reasons inductively about how electrons fill atomic orbitals"
    },
    "content": {
     "anlatim": "# Elektron Dizilimi Kuralları\n\n1. **Aufbau (Yapılandırma) ilkesi:** Elektronlar önce **düşük enerjili** orbitallere yerleşir.\n2. **Pauli dışlama ilkesi:** Bir orbitalde **en fazla 2 elektron** bulunur ve spinleri **zıttır**.\n3. **Hund kuralı:** Eşit enerjili orbitallere elektronlar önce **tek tek (paralel spinle)** yerleşir, sonra eşleşir.\n\n### Örnek Dizilimler\n\n| Element | Dizilim |\n|---|---|\n| H (Z = 1) | 1s¹ |\n| C (Z = 6) | 1s² 2s² 2p² |\n| Na (Z = 11) | 1s² 2s² 2p⁶ 3s¹ |\n| Cl (Z = 17) | 1s² 2s² 2p⁶ 3s² 3p⁵ |\n\n**Valans elektron:** En dış enerji düzeyindeki (son kabuktaki) elektronlardır; kimyasal bağı ve özellikleri belirler.",
     "ornekler": [
      {
       "soru": "Oksijen (Z = 8) atomunun elektron dizilimini yazınız ve valans elektron sayısını bulunuz.",
       "cozum": "1s² 2s² 2p⁴. En dış katman 2. katmandır: 2s² 2p⁴ → **6 valans elektron**."
      },
      {
       "soru": "Azot (Z = 7) atomunun 2p orbitallerine elektronlar nasıl yerleşir?",
       "cozum": "Dizilim 1s² 2s² 2p³. **Hund kuralına** göre üç 2p elektronu $p_x$, $p_y$, $p_z$ orbitallerine **birer birer, paralel spinle** yerleşir."
      }
     ],
     "ozet": [
      "Aufbau: önce düşük enerji · Pauli: orbitalde en fazla **2 e⁻, zıt spin** · Hund: önce **tek tek**.",
      "Na: 1s² 2s² 2p⁶ **3s¹** · Cl: 1s² 2s² 2p⁶ **3s² 3p⁵**.",
      "Valans elektronlar kimyasal özellikleri belirler."
     ]
    }
   },
   {
    "id": "k6",
    "code": "KİM.9.1.6",
    "title": {
     "tr": "Elementlerin periyodik tablodaki yerlerine ilişkin tümevarımsal akıl yürütebilme",
     "en": "Reasons inductively about the positions of elements in the periodic table"
    },
    "content": {
     "anlatim": "# Periyodik Tablo\n\nPeriyodik tablo, elementlerin **artan atom numarasına** göre düzenlendiği sistemdir.\n\n- **Periyot:** Yatay sıra → elektron bulunan **enerji düzeyi sayısı**.\n- **Grup:** Dikey sütun → **valans elektron sayısı** benzer, kimyasal özellikler benzer.\n\n| Grup | Ad | Özellik |\n|---|---|---|\n| **1A** | Alkali metaller | 1 valans elektron |\n| **2A** | Toprak alkali metaller | 2 valans elektron |\n| **7A** | Halojenler | 7 valans elektron |\n| **8A** | Soy gazlar | Oktet (kararlı) |\n\n- **Metaller sol** tarafta, **ametaller sağ** tarafta yer alır; arada **yarı metaller** bulunur.",
     "ornekler": [
      {
       "soru": "Elektron dizilimi 1s² 2s² 2p⁶ 3s¹ olan elementin periyodik tablodaki yeri nedir?",
       "cozum": "En yüksek enerji düzeyi 3 → **3. periyot**; valans elektron sayısı 1 → **1A grubu** (sodyum, alkali metal)."
      }
     ],
     "ozet": [
      "Periyot = **enerji düzeyi** sayısı; grup = **valans elektron** sayısı.",
      "1A alkali, 2A toprak alkali, 7A **halojen**, 8A **soy gaz**.",
      "Metaller solda, ametaller sağda."
     ]
    }
   },
   {
    "id": "k7",
    "code": "KİM.9.1.7",
    "title": {
     "tr": "İyon oluşumuna ilişkin tümevarımsal akıl yürütebilme",
     "en": "Reasons inductively about the formation of ions"
    },
    "content": {
     "anlatim": "# İyon Oluşumu\n\nAtomlar **oktet** (veya hidrojen ve helyum için **dublet**) kuralına ulaşmak için elektron verir ya da alır.\n\n- **Metal → elektron verir → katyon** (pozitif iyon).\n- **Ametal → elektron alır → anyon** (negatif iyon).\n\n### Örnekler\n\n- **Na → Na⁺ + e⁻** (1A, 1 valans elektronunu verir).\n- **Cl + e⁻ → Cl⁻** (7A, 1 elektron alır).\n- **İzoelektronik:** Elektron sayısı aynı olan tanecikler. Na⁺ ve Ne'nin ikisi de 10 elektronludur.",
     "ornekler": [
      {
       "soru": "Magnezyum (Z = 12) hangi iyonu oluşturur? Bu iyonla izoelektronik bir soy gaz örneği veriniz.",
       "cozum": "1s² 2s² 2p⁶ 3s² → 2 valans elektronunu verir: **Mg²⁺** (10 elektron). 10 elektronlu **Ne** ile izoelektroniktir."
      }
     ],
     "ozet": [
      "Metal e⁻ verir → **katyon**; ametal e⁻ alır → **anyon**.",
      "Amaç: **oktet** (H, He için dublet).",
      "İzoelektronik = **elektron sayısı aynı** (Na⁺ ve Ne)."
     ]
    }
   },
   {
    "id": "k8",
    "code": "KİM.9.1.8",
    "title": {
     "tr": "Elementlerin periyodik özelliklerinin periyodik tablodaki değişimini çözümleyebilme",
     "en": "Analyses how periodic properties change across the periodic table"
    },
    "content": {
     "anlatim": "# Periyodik Özellikler\n\n| Özellik | Tanım | Periyotta (soldan sağa) | Grupta (yukarıdan aşağı) |\n|---|---|---|---|\n| **Atom yarıçapı** | Atomun büyüklüğü | **Azalır** (çekirdek çekimi artar) | **Artar** (enerji düzeyi artar) |\n| **İyonlaşma enerjisi** | Gaz hâldeki atomdan 1 elektron koparmak için gereken enerji | **Artar** | **Azalır** |\n| **Elektronegatiflik** | Bağ elektronlarını çekme eğilimi | **Artar** | **Azalır** |\n\n- En yüksek elektronegatiflik: **flor (F)**.",
     "ornekler": [
      {
       "soru": "Aynı periyottaki Na ve Cl atomlarından hangisinin atom yarıçapı büyük, hangisinin iyonlaşma enerjisi yüksektir?",
       "cozum": "Periyotta soldan sağa atom yarıçapı azalır, iyonlaşma enerjisi artar. **Na'nın yarıçapı büyük**, **Cl'nin iyonlaşma enerjisi yüksektir**."
      }
     ],
     "ozet": [
      "Yarıçap: periyotta **azalır**, grupta **artar**.",
      "İyonlaşma enerjisi ve elektronegatiflik: periyotta **artar**, grupta **azalır**.",
      "En elektronegatif element: **flor**."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Çeşitlilik",
   "en": "Theme 2: Diversity"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "KİM.9.2.1",
    "title": {
     "tr": "Metalik bağın oluşumuna yönelik tümevarımsal akıl yürütebilme",
     "en": "Reasons inductively about the formation of metallic bonds"
    },
    "content": {
     "anlatim": "# Metalik Bağ\n\nMetaller, **pozitif yüklü metal iyonları** ile bu iyonlar arasında serbestçe hareket eden (delokalize) **elektron denizinden** oluşur (**elektron denizi modeli**).\n\n**Metalik bağ:** pozitif iyonlar ile negatif elektron denizi arasındaki **elektrostatik çekim** kuvvetidir.\n\n### Metalik Bağın Sonuçları\n\n- **Elektrik ve ısı iletkenliği yüksektir** (serbest elektronlar sayesinde).\n- **Dövülebilir ve tel hâline getirilebilir** (iyonlar kayabilir, bağ kopmaz).\n- **Parlak yüzeylidir** (elektronlar ışığı yansıtır).\n- Genellikle **yüksek erime/kaynama noktası**.\n\n**Örnekler:** Cu (kablo), Fe (inşaat), Al (uçak, kutu), Au–Ag (mücevher).",
     "ornekler": [],
     "ozet": [
      "Metalik bağ = **katyonlar + elektron denizi** arasındaki çekim.",
      "Serbest elektronlar → **iletkenlik ve parlaklık**; kayabilen iyonlar → **dövülebilirlik**."
     ]
    }
   },
   {
    "id": "k2",
    "code": "KİM.9.2.2",
    "title": {
     "tr": "İyonik bağın oluşumunu gözleme dayalı tahmin edebilme",
     "en": "Predicts the formation of ionic bonds based on observation"
    },
    "content": {
     "anlatim": "# İyonik Bağ\n\nMetal atomu elektron vererek **katyon**, ametal atomu elektron alarak **anyon** oluşturur. Zıt yüklü iyonlar arasındaki **elektrostatik çekim** iyonik bağı oluşturur.\n\n- **Coulomb yasası:** Çekim kuvveti yüklerin büyüklüğüyle **artar**, iyonlar arası mesafe arttıkça **azalır**.\n\n### İyonik Bileşiklerin Özellikleri\n\n- Yüksek erime/kaynama noktası.\n- **Katı hâlde elektriği iletmez**; **eriyik veya sulu çözeltide iletir**.\n- Sert ve kırılgandır; genellikle suda çözünür.\n\n**Örnekler:** NaCl, MgO, CaF₂.",
     "ornekler": [
      {
       "soru": "NaCl katı hâlde elektriği iletmezken suda çözündüğünde neden iletir?",
       "cozum": "Katı hâlde iyonlar kristal örgüde **sabittir**. Suda çözününce Na⁺ ve Cl⁻ iyonları **serbestçe hareket eder** ve elektrik akımını taşır."
      }
     ],
     "ozet": [
      "İyonik bağ = **metal + ametal**, zıt yüklü iyonlar arası çekim.",
      "Katıda iletmez, **eriyik ve çözeltide iletir**.",
      "Yük arttıkça çekim artar, mesafe arttıkça azalır (Coulomb)."
     ]
    }
   },
   {
    "id": "k3",
    "code": "KİM.9.2.3",
    "title": {
     "tr": "Kovalent bağ oluşumunu bilimsel gözleme dayalı tahmin edebilme",
     "en": "Predicts covalent bond formation based on scientific observation"
    },
    "content": {
     "anlatim": "# Kovalent Bağ\n\n**Ametal atomları** arasında elektronların **ortaklaşa kullanılmasıyla** oluşur. Ortaklaşa kullanılan elektron çifti her iki atomun da oktetine katkı sağlar.\n\n| Tür | Açıklama | Örnek |\n|---|---|---|\n| **Apolar kovalent** | Aynı atomlar arasında ya da elektronegatiflik farkı çok küçük | H₂, Cl₂, CH₄ |\n| **Polar kovalent** | Elektronegatiflik farkı anlamlı; elektronlar daha elektronegatif atoma kayar | HCl, H₂O |",
     "ornekler": [],
     "ozet": [
      "Kovalent bağ = **ametal + ametal**, elektron **ortaklaşması**.",
      "Aynı atomlar → **apolar** (H₂, Cl₂); farklı elektronegatiflik → **polar** (HCl, H₂O)."
     ]
    }
   },
   {
    "id": "k4",
    "code": "KİM.9.2.4",
    "title": {
     "tr": "Moleküllerin Lewis nokta yapısına ilişkin çıkarımda bulunabilme",
     "en": "Makes inferences about the Lewis dot structures of molecules"
    },
    "content": {
     "anlatim": "# Lewis Nokta Yapısı\n\nLewis nokta yapısı, **valans elektronların nokta (•)** ile gösterildiği modeldir.\n\n- **Tekli bağ** = 1 ortak elektron çifti · **İkili bağ** = 2 çift · **Üçlü bağ** = 3 çift.\n- Hedef **oktet** kuralıdır (hidrojen için **dublet**).\n- H₂O, CO₂, NH₃, CH₄ gibi moleküllerin Lewis yapıları çizilebilir.",
     "ornekler": [
      {
       "soru": "CO₂ molekülünde karbon ile oksijenler arasında kaçar bağ bulunur?",
       "cozum": "Karbonun 4, her oksijenin 6 valans elektronu vardır. Karbon her oksijenle **ikili bağ** kurar (O=C=O); böylece üç atom da okteti tamamlar."
      }
     ],
     "ozet": [
      "Lewis yapısında yalnızca **valans elektronlar** gösterilir.",
      "Tekli, ikili, üçlü bağ = 1, 2, 3 ortak elektron çifti."
     ]
    }
   },
   {
    "id": "k5",
    "code": "KİM.9.2.5",
    "title": {
     "tr": "Molekülleri polar ya da apolar olarak sınıflandırabilme",
     "en": "Classifies molecules as polar or nonpolar"
    },
    "content": {
     "anlatim": "# Polar ve Apolar Moleküller\n\nMolekülün polarlığı, **bağ polarlığına** ve **molekül geometrisine** bağlıdır.\n\n- Dipol moment vektörlerinin toplamı **sıfır değilse** → **polar molekül** (H₂O, NH₃, HCl).\n- Toplam **sıfırsa** → **apolar molekül** (CO₂, CH₄, BF₃, Cl₂).\n\n> ⚠ Polar bağ içeren bir molekül, simetrik geometride dipoller birbirini götürdüğü için **apolar** olabilir (CO₂, CH₄).",
     "ornekler": [],
     "ozet": [
      "Polarlık = bağ polarlığı + **geometri**.",
      "H₂O, NH₃, HCl **polar**; CO₂, CH₄, BF₃, Cl₂ **apolar**.",
      "Simetrik molekülde dipoller birbirini götürür."
     ]
    }
   },
   {
    "id": "k6",
    "code": "KİM.9.2.6",
    "title": {
     "tr": "Bileşikleri adlandırma kurallarına ilişkin tümdengelimsel akıl yürütebilme",
     "en": "Reasons deductively about the rules for naming compounds"
    },
    "content": {
     "anlatim": "# Bileşiklerin Adlandırılması\n\n### İyonik Bileşikler\n\n- **Metal adı + ametal kökü + \"-ür\"**: sodyum klorür (NaCl), magnezyum oksit (MgO).\n- Değişken değerlikli metallerde değerlik **Roma rakamıyla** belirtilir: demir(III) klorür (FeCl₃).\n\n### Moleküler (Kovalent) Bileşikler\n\n- Atom sayıları **öneklerle** belirtilir: mono-, di-, tri-, tetra-, penta- …\n- Örnekler: **karbon dioksit** (CO₂), **difosfor pentoksit** (P₂O₅).\n- İlk elementte \"mono\" genellikle yazılmaz.",
     "ornekler": [
      {
       "soru": "CO ve N₂O₄ bileşiklerini adlandırınız.",
       "cozum": "CO → **karbon monoksit** (ilk elementte mono yazılmaz). N₂O₄ → **diazot tetroksit**."
      }
     ],
     "ozet": [
      "İyonik: metal + ametal kökü + **-ür** (sodyum klorür).",
      "Değişken değerlikli metal → **Roma rakamı** (demir(III) klorür).",
      "Moleküler: **önekler** (karbon dioksit, difosfor pentoksit)."
     ]
    }
   },
   {
    "id": "k7",
    "code": "KİM.9.2.7",
    "title": {
     "tr": "Moleküller arası etkileşimleri sınıflandırabilme",
     "en": "Classifies intermolecular interactions"
    },
    "content": {
     "anlatim": "# Moleküller Arası Etkileşimler\n\nMoleküller arası etkileşimler (genel adıyla **van der Waals kuvvetleri**) maddelerin **erime, kaynama, buhar basıncı ve viskozite** gibi fiziksel özelliklerini belirler. **Bağlardan çok daha zayıftır.**\n\n| Etkileşim | Nerede görülür? | Not |\n|---|---|---|\n| **London (dağılma) kuvveti** | **Tüm** moleküllerde | Geçici dipollerden kaynaklanır; molekül büyüdükçe artar |\n| **Dipol–dipol** | Polar moleküller arasında | Kalıcı dipollerin etkileşimi |\n| **İyon–dipol** | İyon ile polar molekül arasında | Tuzun suda çözünmesi |\n| **Hidrojen bağı** | H atomunun **N, O veya F**'ye bağlı olduğu moleküller arasında | **En güçlü** moleküller arası etkileşim (su, amonyak, HF) |",
     "ornekler": [
      {
       "soru": "Su (H₂O) ile metan (CH₄) molekülleri arasında hangi etkileşimler baskındır?",
       "cozum": "Su polardır ve H atomu O'ya bağlıdır → **hidrojen bağı** (ve London kuvvetleri). Metan apolardır → yalnızca **London kuvvetleri**. Bu yüzden suyun kaynama noktası çok daha yüksektir."
      }
     ],
     "ozet": [
      "London kuvveti **tüm** moleküllerde vardır, molekül büyüdükçe artar.",
      "Hidrojen bağı: H atomu **N, O, F**'ye bağlıysa; en güçlü moleküller arası etkileşim.",
      "Moleküller arası etkileşimler **bağlardan zayıftır**."
     ]
    }
   },
   {
    "id": "k8",
    "code": "KİM.9.2.8",
    "title": {
     "tr": "Etkileşimlerin katıların özellikleri üzerindeki etkilerine ilişkin bilimsel çıkarım yapabilme",
     "en": "Makes scientific inferences about how interactions affect the properties of solids"
    },
    "content": {
     "anlatim": "# Kristal ve Amorf Katılar\n\n### Kristal Katılar\n\nTanecikler **düzenli geometrik** dizilim gösterir; **belirli erime noktası** vardır.\n\n| Tür | Örnek |\n|---|---|\n| İyonik | NaCl |\n| Metalik | Cu |\n| Moleküler | Buz, iyot |\n| Kovalent ağ | Elmas, kuvars |\n\n### Amorf Katılar\n\n**Düzensiz** yapıdadır; **belirli erime noktası yoktur** (cam, lastik, plastik).\n\n- Tanecikler arası etkileşim kuvveti **arttıkça erime noktası ve sertlik artar**.",
     "ornekler": [],
     "ozet": [
      "Kristal katı: **düzenli**, belirli erime noktası (NaCl, Cu, buz, elmas).",
      "Amorf katı: **düzensiz**, belirli erime noktası yok (cam, plastik).",
      "Etkileşim arttıkça erime noktası ve sertlik artar."
     ]
    }
   },
   {
    "id": "k9",
    "code": "KİM.9.2.8",
    "title": {
     "tr": "Sıvıların özelliklerini (buhar basıncı, kaynama, viskozite, yüzey gerilimi, adezyon-kohezyon) açıklayabilme",
     "en": "Explains the properties of liquids (vapour pressure, boiling, viscosity, surface tension, adhesion-cohesion)"
    },
    "content": {
     "anlatim": "# Sıvıların Özellikleri\n\n- **Buharlaşma ve denge buhar basıncı:** Sıvı yüzeyinden moleküllerin gaz hâline geçmesidir. Kapalı kapta denge kurulduğunda oluşan basınca **denge buhar basıncı** denir.\n  - Sıcaklık arttıkça buhar basıncı **artar**.\n  - Moleküller arası kuvvet arttıkça buhar basıncı **azalır**.\n- **Kaynama sıcaklığı:** Buhar basıncının **dış basınca eşit** olduğu sıcaklıktır. Dış basınç azalırsa (yüksek rakım) kaynama noktası **düşer**.\n- **Viskozite (akışkanlığın karşıtı):** Sıvının akmaya karşı gösterdiği dirençtir. Moleküller arası kuvvet ve molekül şekli etkiler. Sıcaklık artınca viskozite **azalır** (bal, yağ).\n- **Yüzey gerilimi:** Sıvı yüzeyinin gerilmesidir; **kohezyon** kuvvetlerinden kaynaklanır. Su böceklerinin su üzerinde durabilmesi buna örnektir. **Sabun yüzey gerilimini düşürür.**\n- **Adezyon ve kohezyon:** Kohezyon = **aynı cins** tanecikler arası çekim; adezyon = **farklı cins** tanecikler arası çekim.\n  - **Kılcallık** (kapiler etki), **adezyon > kohezyon** olduğunda görülür (cam tüpte suyun yükselmesi).",
     "ornekler": [
      {
       "soru": "Yüksek bir dağın tepesinde yemek pişirmek neden daha uzun sürer?",
       "cozum": "Yükseklik arttıkça **dış basınç azalır**, suyun kaynama noktası düşer (100 °C'nin altında kaynar). Yemek daha düşük sıcaklıkta pişeceği için süre uzar."
      }
     ],
     "ozet": [
      "Sıcaklık ↑ → buhar basıncı ↑, viskozite ↓.",
      "Moleküller arası kuvvet ↑ → buhar basıncı ↓, viskozite ve yüzey gerilimi ↑.",
      "Kaynama: buhar basıncı = **dış basınç**; rakım artınca kaynama noktası düşer.",
      "Kılcallık: **adezyon > kohezyon**."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Sürdürülebilirlik",
   "en": "Theme 3: Sustainability"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Nanoparçacıkların özelliklerini ve kullanım alanlarını ekolojik sürdürülebilirlik açısından değerlendirebilme",
     "en": "Evaluates nanoparticles and their uses in terms of ecological sustainability"
    },
    "content": {
     "anlatim": "# Nanoparçacıklar\n\n**Nanoparçacık:** En az bir boyutu **1–100 nm** arasında olan parçacıklardır.\n\n- Boyut küçüldükçe **yüzey/hacim oranı artar**; fiziksel ve kimyasal özellikler değişir (erime noktası, renk, reaktiflik, manyetik özellik).\n\n### Metal Nanoparçacıklar (AgNP, CuNP vb.)\n\n- Antibakteriyel özellik, katalizör, elektronik, tıp ve tekstil alanlarında kullanılır.\n- **Gümüş nanoparçacıklar:** dezenfektan ve yara bakımında.\n- **Bakır nanoparçacıklar:** iletken mürekkep ve antimikrobiyal uygulamalarda.",
     "ornekler": [],
     "ozet": [
      "Nanoparçacık: en az bir boyutu **1–100 nm**.",
      "Boyut küçülünce **yüzey/hacim oranı artar**, özellikler değişir.",
      "Gümüş NP → dezenfektan, yara bakımı; bakır NP → iletken mürekkep."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Yeşil kimyanın atık önleme ilkesini açıklayabilme",
     "en": "Explains the waste-prevention principle of green chemistry"
    },
    "content": {
     "anlatim": "# Yeşil Kimya\n\n**Yeşil kimya**, kimyasal ürün ve süreçlerin tasarımında insan sağlığına ve çevreye zararlı maddelerin kullanımını ve oluşumunu **azaltmayı/önlemeyi** amaçlar.\n\n### Atık Önleme İlkesi\n\nEn temel ilkedir: **Atık oluştuktan sonra temizlemek yerine, atığın hiç oluşmamasını sağlamak en iyisidir.**\n\n### Diğer Yeşil Kimya İlkeleri\n\n- Atom ekonomisi\n- Daha az zararlı kimyasal sentez\n- Güvenli çözücüler\n- Enerji verimliliği\n- Yenilenebilir hammaddeler\n- Katalizör kullanımı\n- Bozunabilir ürün tasarımı",
     "ornekler": [],
     "ozet": [
      "Yeşil kimyanın en temel ilkesi: **atık önleme** (oluşmadan engelle).",
      "Diğer ilkeler: atom ekonomisi, güvenli çözücü, enerji verimliliği, yenilenebilir hammadde, katalizör, bozunabilir ürün."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Metal, alaşım ve metal nanoparçacıkların çevresel etkilerini değerlendirebilme",
     "en": "Evaluates the environmental effects of metals, alloys and metal nanoparticles"
    },
    "content": {
     "anlatim": "# Metallerin ve Nanoparçacıkların Çevresel Etkileri\n\n- **Metaller ve alaşımlar** doğada uzun süre kalabilir ve **biyobirikim** yapabilir.\n- **Nanoparçacıklar** çok küçük oldukları için **hücrelere nüfuz edebilir** ve toksik etki gösterebilir.\n- Suya, toprağa ve canlılara zarar vermemeleri için **kontrollü üretim, kullanım ve bertaraf** yöntemleri geliştirilmelidir.\n- **Sürdürülebilir kimya** yaklaşımıyla hem fayda hem de çevre koruması dengelenir.\n\n### Çalışma Önerileri\n\n1. Laboratuvar güvenlik işaretlerini ezbere bilin.\n2. Atom modellerinin kronolojik sırasını ve her birinin getirdiği yeniliği yazın.\n3. Elektron dizilimi kurallarını bol örnekle uygulayın.\n4. Periyodik özelliklerin değişim yönlerini tabloya çizin.\n5. Bağ türlerini (metalik, iyonik, kovalent) özellikleriyle karşılaştırın.\n6. Moleküller arası etkileşimleri güç sırasına göre listeleyin.\n7. Sıvı özelliklerini etkileyen faktörleri yazın.\n8. Yeşil kimya ve sürdürülebilirlik kavramlarını günlük hayattan örneklerle ilişkilendirin.",
     "ornekler": [],
     "ozet": [
      "Metaller ve alaşımlar **biyobirikim** yapabilir.",
      "Nanoparçacıklar hücrelere girip **toksik** etki gösterebilir.",
      "Çözüm: kontrollü üretim, kullanım ve **bertaraf**."
     ]
    }
   }
  ]
 }
];
