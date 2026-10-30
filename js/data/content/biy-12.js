/* =========================================================
   12. Sınıf Biyoloji — detaylı konu anlatım notları
   Kaynak: kullanıcının verdiği "Biyoloji 12 Detaylı Konu Anlatım Notları" (4 ünite) ve ek not paketindeki "12. Sınıf Biyoloji Ders Notu" (1. ve 2. ünite ayrıntıları).
   Kaynak notlar yalnızca kazanım başlıklarını ve kısa özetleri içerdiği için her ünite ders kitabı düzeyinde genişletildi (keşif tarihçesi, replikasyon ve translasyon basamakları, solunum tablosu, çift döllenme, madde döngüleri, çözümlü sorular). Ek paketten gelen kazanımlar biy12_ek.py dosyasındadır: DNA hesapları, genetik mühendisliği uygulamaları, GDO–biyoetik, ATP ve fosforilasyon, fotosentez faktörleri, kemosentez, ATP hesabı, fermantasyon ve fotosentez–solunum ilişkisi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/biyoloji"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Genden Proteine",
   "en": "Unit 1: From Gene to Protein"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Nükleik asitlerin keşfi, yapısı ve DNA eşlenmesi",
     "en": "Discovery and structure of nucleic acids; DNA replication"
    },
    "content": {
     "anlatim": "# Keşif Süreci\n\n| Bilim insanı | Katkı |\n|---|---|\n| **Friedrich Miescher** (1869) | Çekirdekten \"nüklein\"i (nükleik asit) izole etti |\n| **Griffith** (1928) | Bakterilerde **transformasyon**: kalıtım maddesi aktarılabilir |\n| **Avery, MacLeod, McCarty** (1944) | Transformasyon maddesinin **DNA** olduğunu gösterdi |\n| **Chargaff** | DNA'da **A = T**, **G = C** |\n| **Rosalind Franklin, Wilkins** | X-ışını kırınımı: sarmal yapı |\n| **Watson ve Crick** (1953) | **Çift sarmal** DNA modeli |\n| **Meselson–Stahl** (1958) | **Yarı korunumlu** eşlenme |\n\n# DNA ve RNA\n\n**Nükleotit** = azotlu baz + **5 karbonlu şeker** + **fosfat**.\n\n| | DNA | RNA |\n|---|---|---|\n| Şeker | **Deoksiriboz** | **Riboz** |\n| Bazlar | A, **T**, G, C | A, **U**, G, C |\n| Yapı | **Çift** zincir (sarmal) | **Tek** zincir |\n| Görev | Kalıtım bilgisini depolar | Protein sentezinde görev |\n| Bulunduğu yer | Çekirdek, mitokondri, kloroplast | Çekirdek, sitoplazma, ribozom |\n\n- İki zincir **zıt yönlü (antiparalel)**: 5'→3' ve 3'→5'.\n- **A–T arasında 2**, **G–C arasında 3** hidrojen bağı.\n- Pürinler (A, G) çift halkalı; pirimidinler (C, T, U) tek halkalı.\n\n# DNA Eşlenmesi (Replikasyon)\n\nHücre bölünmesinden önce (**S evresi**) gerçekleşir. **Yarı korunumlu:** Her yeni DNA'da bir eski, bir yeni zincir.\n1. **Helikaz** hidrojen bağlarını koparır, zincirleri açar.\n2. **Primaz** kısa RNA öncülü (primer) yapar.\n3. **DNA polimeraz** yeni nükleotitleri **5'→3' yönünde** ekler; **öncü zincir** kesintisiz, **geri kalan zincir** parçalar (**Okazaki**) hâlinde sentezlenir.\n4. **DNA ligaz** parçaları birleştirir.\n5. DNA polimeraz hataları **onarır** (düzeltme okuması).",
     "ornekler": [
      {
       "soru": "Bir DNA molekülünde %30 adenin varsa sitozin oranı nedir?",
       "cozum": "A = T = %30 → A + T = %60. G + C = %40 → **C = %20**."
      },
      {
       "soru": "Meselson–Stahl deneyi neyi kanıtlamıştır?",
       "cozum": "DNA eşlenmesinin **yarı korunumlu** olduğunu: ağır azot (¹⁵N) içeren DNA hafif ortamda bir kez eşlendiğinde tüm DNA'ların **ara yoğunlukta** (yarı ağır, yarı hafif) çıktığı görülmüştür."
      }
     ],
     "ozet": [
      "Nükleotit: baz + şeker + fosfat; A=T (2 bağ), G≡C (3 bağ).",
      "DNA çift zincir deoksiriboz; RNA tek zincir riboz, U.",
      "Replikasyon yarı korunumlu: helikaz, polimeraz, ligaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Protein sentezi ve genetik kod",
     "en": "Protein synthesis and the genetic code"
    },
    "content": {
     "anlatim": "# Merkezî Dogma\n\n$$\\text{DNA} \\xrightarrow{\\text{replikasyon}} \\text{DNA} \\qquad \\text{DNA} \\xrightarrow{\\text{transkripsiyon}} \\text{RNA} \\xrightarrow{\\text{translasyon}} \\text{Protein}$$\n(Retrovirüslerde **ters transkripsiyon**: RNA → DNA.)\n\n# RNA Çeşitleri\n\n| RNA | Görev |\n|---|---|\n| **mRNA** (haberci) | DNA'daki şifreyi ribozoma taşır; **kodon** içerir |\n| **tRNA** (taşıyıcı) | Aminoasitleri ribozoma getirir; **antikodon** içerir |\n| **rRNA** (ribozomal) | Proteinlerle birlikte **ribozomu** oluşturur; peptit bağı oluşumunu katalizler |\n\n# Transkripsiyon (Yazılma)\n\n- Ökaryotlarda **çekirdekte**; **RNA polimeraz**, DNA'nın **kalıp** zincirini okuyarak mRNA üretir.\n- **Promotor** bölgede başlar, **sonlandırıcı** bölgede biter.\n- Ökaryotlarda öncül mRNA işlenir: **intronlar** çıkarılır, **ekzonlar** birleştirilir (**kırpma**); 5' başlık ve poli-A kuyruğu eklenir.\n\n# Translasyon (Çevrilme)\n\nSitoplazmada **ribozomda**.\n1. **Başlama:** mRNA'daki **AUG** (başlama kodonu, **metiyonin**) bulunur.\n2. **Uzama:** tRNA antikodonları kodonlarla eşleşir; aminoasitler arasında **peptit bağı** kurulur (su açığa çıkar).\n3. **Bitiş:** **UAA, UAG, UGA** (durdurma kodonları) → polipeptit serbest kalır.\n\n# Genetik Kod\n\n- **Üçlü** kod: 3 nükleotit = 1 **kodon** → $4^3 = 64$ kodon (61 anlamlı, 3 durdurma).\n- **Evrenseldir** (neredeyse tüm canlılarda aynı), **dejeneredir** (bir aminoasidi birden çok kodon belirleyebilir), **örtüşmez**.\n\n# Gen İfadesinin Düzenlenmesi\n\nHer hücre aynı DNA'ya sahiptir ama **farklı genleri** ifade eder → hücre farklılaşması.\n- Prokaryotlarda **operon** modeli (lac operonu: laktoz varsa genler açılır).\n- Ökaryotlarda kromatin yapısı, **transkripsiyon faktörleri**, RNA işlenmesi, **epigenetik** (DNA metilasyonu) düzeyinde kontrol.",
     "ornekler": [
      {
       "soru": "DNA kalıp zinciri 3'–TAC GGA TTC ATT–5' ise mRNA ve oluşacak aminoasit sayısı nedir?",
       "cozum": "mRNA: 5'–**AUG CCU AAG UAA**–3'. AUG başlama, UAA durdurma → **3 aminoasit** (Met–Pro–Lys)."
      },
      {
       "soru": "Genetik kodun 'dejenere' olması mutasyonların etkisini nasıl azaltır?",
       "cozum": "Bir aminoasit birden fazla kodonla şifrelendiği için kodonun özellikle **üçüncü bazındaki** bir değişiklik çoğu zaman **aynı aminoasidi** belirler; protein değişmez (**sessiz mutasyon**)."
      }
     ],
     "ozet": [
      "DNA → mRNA (transkripsiyon, çekirdek) → protein (translasyon, ribozom).",
      "AUG başlama; UAA, UAG, UGA durdurma; 64 kodon.",
      "Kod evrensel, dejenere; gen ifadesi düzenlenir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Mutasyonlar, biyoteknoloji ve genetik mühendisliği",
     "en": "Mutations, biotechnology and genetic engineering"
    },
    "content": {
     "anlatim": "# Mutasyonlar\n\nDNA dizisinde kalıcı değişiklik. **Mutajenler:** UV, X ışını, radyasyon, bazı kimyasallar (sigara katranı), bazı virüsler.\n\n| Tür | Açıklama | Sonuç |\n|---|---|---|\n| **Nokta (yer değiştirme)** | Tek baz değişir | Sessiz, yanlış anlamlı (**orak hücre anemisi**: GAG→GTG, Glu→Val) ya da anlamsız (erken durdurma) |\n| **Ekleme / silinme** | Baz eklenir ya da çıkar | **Çerçeve kayması** → sonraki tüm kodonlar değişir |\n| **Kromozom mutasyonu** | Parça kaybı, tekrar, ters dönme, yer değiştirme | Kedi miyavlaması sendromu vb. |\n| **Kromozom sayısı** | Ayrılmama sonucu | **Down sendromu** (21. kromozom trizomisi), Turner (X0), Klinefelter (XXY) |\n\n- **Üreme hücrelerindeki** mutasyonlar kalıtsaldır; **vücut hücrelerindekiler** kalıtılmaz (kanser gibi).\n- Mutasyonlar **çeşitliliğin** ve **evrimin** ham maddesidir.\n\n# Biyoteknoloji ve Genetik Mühendisliği\n\n| Teknik | Açıklama |\n|---|---|\n| **Rekombinant DNA** | **Restriksiyon enzimiyle** kesilen gen, **ligazla** vektöre (**plazmit**) eklenir |\n| **Gen klonlama** | Rekombinant plazmit bakteriye aktarılır, bakteri çoğaldıkça gen de çoğalır (insan **insülini** üretimi) |\n| **PCR** | DNA'nın test tüpünde **milyonlarca kez** kopyalanması (ısıya dayanıklı Taq polimeraz) — tanı, adli tıp |\n| **Jel elektroforezi** | DNA parçalarını boyutlarına göre ayırma → **DNA parmak izi** |\n| **Gen tedavisi** | Hatalı genin yerine sağlamının aktarılması |\n| **CRISPR-Cas9** | Genomda belirli bir bölgeyi **kesip düzenleme** (\"gen makası\") |\n| **GDO** | Gen aktarılmış organizmalar (zararlıya dayanıklı mısır, altın pirinç) |\n| **Klonlama** | Genetik olarak aynı birey (Dolly koyunu, 1996) |\n| **Kök hücre** | Farklılaşmamış hücrelerden doku/organ elde etme |\n\n# Biyoetik\n\nGenetik bilgilerin gizliliği, **tasarım bebek** tartışmaları, GDO'ların ekosistem ve sağlık etkileri, klonlamanın etik sınırları. Türkiye'de GDO'lu ürünlerin üretimi **yasaktır**; ithalat ve kullanım izne bağlıdır.",
     "ornekler": [
      {
       "soru": "Bir gende tek bir nükleotit eklenmesi neden tek baz değişiminden genellikle daha zararlıdır?",
       "cozum": "Kodonlar üçer üçer okunduğundan ekleme **okuma çerçevesini kaydırır**; eklenen noktadan sonraki **tüm kodonlar** ve dolayısıyla aminoasitler değişir. Tek baz değişimi ise yalnızca bir kodonu etkiler."
      }
     ],
     "ozet": [
      "Nokta mutasyon, çerçeve kayması, kromozom mutasyonları.",
      "Rekombinant DNA: restriksiyon enzimi + ligaz + plazmit.",
      "PCR, elektroforez, CRISPR, GDO; biyoetik."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "DNA hesaplamaları, replikasyonun ayrıntıları ve santral dogma",
     "en": "DNA calculations, replication details and the central dogma"
    },
    "content": {
     "anlatim": "# Nükleotitten Kromozoma\n\n**Azotlu baz < nükleozit (baz + şeker, glikozit bağı) < nükleotit (+ fosfat, fosfoester bağı) < gen < DNA < kromozom**\n- Bir zincirdeki nükleotitler **fosfodiester** bağlarıyla bağlanır (şeker–fosfat omurgası).\n- Uçlar: **5′ uçta fosfat**, **3′ uçta hidroksil (–OH)** grubu.\n- Nükleik asitlerde **peptit bağı ve aminoasit bulunmaz**.\n\n# Çift Zincirli DNA'da Hesaplama Kuralları\n\n| Kural | Açıklama |\n|---|---|\n| $A = T$, $G = C$ | Tamamlayıcı baz eşleşmesi |\n| $A + G = T + C$ | **Pürin = pirimidin** |\n| $\\dfrac{A+G}{T+C} = 1$ | Her DNA'da sabit |\n| $\\dfrac{A+T}{G+C}$ | **Türe özgüdür** (türler arası farklılık gösterir) |\n| **Toplam nükleotit** | $= 2 \\times$ (bir zincirdeki nükleotit) = fosfat = şeker = baz sayısı |\n| **H bağı sayısı** | $= 2A + 3G$ = toplam nükleotit sayısı + G (ya da C) sayısı |\n| **Fosfodiester bağı** | $=$ toplam nükleotit $- 2$ (doğrusal çift zincir) |\n\n**Örnek:** 200 nükleotitli çift zincirli bir DNA'da 30 adenin varsa → $T = 30$, $G = C = \\dfrac{200-60}{2} = 70$; H bağı $= 2(30) + 3(70) = 270$.\n\n# Replikasyonun Ayrıntıları\n\n| | Prokaryot | Ökaryot |\n|---|---|---|\n| DNA | **Halkasal**, sitoplazmada | **Doğrusal**, çok uzun; çekirdek (+ mitokondri, kloroplast) |\n| Başlama noktası (orijin) | **Tek** | **Çok sayıda** — uzun DNA'nın kısa sürede eşlenmesi için |\n| Yön | İki yönlü | Her orijinden iki yönlü (replikasyon kabarcıkları) |\n\n- **Helikaz** zincirleri açar → **DNA polimeraz** yalnızca **3′ ucuna** nükleotit ekler; bu yüzden sentez **5′ → 3′** yönünde, kalıp ise **3′ → 5′** yönünde okunur.\n- **Öncü zincir** kesintisiz; **geri kalan (gecikmeli) zincir** kısa **Okazaki parçaları** hâlinde sentezlenir, parçaları **DNA ligaz** birleştirir.\n- **Meselson–Stahl deneyi:** ¹⁵N ortamında üretilen DNA (ağır) ¹⁴N ortamına alınınca 1. kuşakta tümü **melez** (¹⁵N/¹⁴N), 2. kuşakta yarısı melez yarısı **hafif** → **yarı korunumlu** eşlenme. Santrifüjde ağır dipte, melez ortada, hafif üstte bant yapar.\n- Sitoplazmasında DNA eşlenmesi görülen hücre **prokaryottur** (ökaryotun sitoplazmasında serbest DNA bulunmaz).\n\n# Santral Dogma ve Polizom\n\n- **Francis Crick (1958):** Bilgi akışı **DNA → RNA → protein** yönündedir; tersine (proteinden RNA'ya) akış olmaz. İstisna: retrovirüslerde ters transkripsiyon.\n| Olay | Kullanılan monomer | Nerede (ökaryot) | Hangi hücrede |\n|---|---|---|---|\n| **Replikasyon** | A, T, G, C nükleotitleri | Çekirdek, mitokondri, kloroplast | Yalnızca **bölünecek** hücrede (sinir hücresinde görülmez) |\n| **Transkripsiyon** | A, U, G, C nükleotitleri | Çekirdek, mitokondri, kloroplast | Protein sentezleyen tüm hücrelerde |\n| **Translasyon** | **Aminoasitler** | **Ribozom** | Protein sentezleyen tüm hücrelerde |\n- Replikasyon hatası **kalıtsal** olabilir; transkripsiyon–translasyon hataları kalıtılmaz, yalnızca hatalı protein üretir.\n- **Polizom (poliribozom):** Bir mRNA'ya **birden çok ribozomun** tutunmasıyla aynı proteinin kısa sürede çok sayıda kopyası üretilir.\n- **tRNA:** En az 20 çeşit; yapısında **zayıf H bağı** içeren tek RNA çeşidi. **rRNA:** hücrede en bol bulunan RNA.\n- **Bir gen–bir polipeptit hipotezi:** Her polipeptit zinciri bir gen tarafından şifrelenir. Bir **protein** bir ya da birden çok polipeptitten oluşur ve kendine özgü 3 boyutlu yapısı vardır (polipeptit ip yumağı ise protein ondan örülmüş hırkadır).",
     "ornekler": [
      {
       "soru": "Çift zincirli bir DNA'da 400 nükleotit ve 120 sitozin bulunmaktadır. Adenin sayısı ve H bağı sayısı kaçtır?",
       "cozum": "$G = C = 120$ → $A + T = 400 - 240 = 160$ → $A = 80$. H bağı $= 2(80) + 3(120) = 160 + 360 =$ **520** (ya da 400 + 120 = 520)."
      },
      {
       "soru": "¹⁵N içeren bir DNA ¹⁴N ortamında 2 kez eşlenirse oluşan DNA'ların kaçı melez olur?",
       "cozum": "2 eşlemede 4 DNA oluşur. Yarı korunumlu eşlenmede eski iki zincir iki farklı DNA'da kalır → **2 melez (¹⁵N/¹⁴N), 2 hafif (¹⁴N/¹⁴N)**."
      }
     ],
     "ozet": [
      "A=T, G=C; pürin = pirimidin; (A+T)/(G+C) türe özgü.",
      "H bağı = 2A + 3G; DNA polimeraz 5′→3′ sentezler, Okazaki parçaları + ligaz.",
      "Santral dogma: DNA→RNA→protein; polizom aynı proteinden çok kopya üretir."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "Genetik mühendisliği uygulamaları: gen tedavisi, DNA parmak izi, transgenik canlılar, klonlama",
     "en": "Applications of genetic engineering"
    },
    "content": {
     "anlatim": "# Kavramlar\n\n- **Genetik mühendisliği:** Genlerin izolasyonu, çoğaltılması, dizilenmesi, farklı canlıların genlerinin birleştirilmesi ve **gen aktarımı** ile uğraşan dal.\n- **Biyoteknoloji:** DNA teknolojisi ve mühendislik yöntemleriyle **yeni ürün ya da organizma** elde etme veya canlının genetik yapısını istenen yönde değiştirme.\n- **Gen klonlama:** Bir genin çok sayıda kopyasının oluşturulması; tek hücreden çoğaltılan, genetik yapısı aynı hücrelere **klon** denir.\n\n# Gen Tedavisi (Gen Terapisi)\n\nBozuk genin işlevini **sağlam bir genle** yerine koyma. Örnek basamaklar:\n1. Normal gen klonlanır ve **zararsız hâle getirilmiş bir virüse (vektör)** yerleştirilir.\n2. Hastanın **kemik iliği** hücreleri bu virüsle enfekte edilir.\n3. Virüs normal geni hücrenin DNA'sına katar.\n4. Değiştirilmiş hücreler hastaya geri verilir.\n→ Bazı bağışıklık yetmezlikleri, hemofili, kalıtsal körlük türleri ve kanser tedavilerinde kullanılmaktadır (CRISPR temelli tedaviler de onaylanmaya başlamıştır).\n\n# DNA Parmak İzi\n\nHer bireyin DNA'sındaki **tekrarlanan, protein kodlamayan dizilerin** uzunlukları kişiye özgüdür (tek yumurta ikizleri hariç).\n| Basamak | İşlem |\n|---|---|\n| 1 | DNA örneği (kan, kıl, tükürük, deri) alınır, **restriksiyon enzimleriyle** kesilir |\n| 2 | Tekrarlanan bölgeler **PCR** ile çoğaltılır (ısıya dayanıklı DNA polimeraz) |\n| 3 | Parçalar **jel elektroforezinde** büyüklüklerine göre ayrılır (küçük parçalar daha uzağa gider) |\n| 4 | Boyanan bantlar UV ışıkta görüntülenir → **bant profili = DNA parmak izi** |\n**Kullanım alanları:** adli olaylar (suçlunun bulunması), **babalık testleri**, kimlik tespiti (afetler), hastalık tanısı, nesli tükenen türlerin korunması, tarım ürünlerinin orijin tespiti.\n\n# Tarımda Gen Aktarımı\n\n- Bitkilere böceklere, kuraklığa, tuza, soğuğa, virüslere ve yabani ot ilaçlarına **direnç** kazandırılabilir; ürün kalitesi ve verim artırılabilir.\n- **Agrobacterium tumefaciens** bakterisinin **Ti plazmidi** gen aktarımında **vektör** olarak kullanılır: istenen gen + seçici (antibiyotik direnç) geni plazmide eklenir → bakteri yaralı yaprak dokusuna bulaştırılır → gen bitki hücresine geçer → hücreler **doku kültüründe** antibiyotik ve hormonlu ortamda tam bitkiye dönüştürülür.\n- **Altın pirinç:** Nergis ve bakteri genleri aktarılarak **beta-karoten (A vitamini öncüsü)** üreten pirinç; A vitamini eksikliğiyle mücadele.\n- **Bt mısır/pamuk:** Bacillus thuringiensis toksin geniyle böceklere dayanıklı bitkiler.\n\n# Hayvanlarda Gen Aktarımı ve Klonlama\n\n- Büyüme hormonu geni aktarılan **iri fareler**; kas gelişimini artıran gen aktarılmış sığır ve koyunlar (**transgenik** hayvanlar); ilaç (insan proteini) üreten keçiler.\n- **Dolly (1996, ilk klonlanan memeli):**\n  1. Ergin bir koyunun **meme (vücut) hücresi** alınır, besince fakir ortamda **G₀** evresine sokulur.\n  2. İkinci bir koyunun **yumurta hücresinin çekirdeği çıkarılır**.\n  3. Meme hücresinin çekirdeği çekirdeksiz yumurtaya aktarılır, **elektrik akımıyla** kaynaştırılır ve bölünme uyarılır.\n  4. Erken embriyo **üçüncü (taşıyıcı) koyunun** rahmine yerleştirilir.\n  5. Doğan kuzu, **çekirdeğin alındığı koyunla genetik olarak özdeştir** (mitokondri DNA'sı yumurtayı veren koyundandır).",
     "ornekler": [
      {
       "soru": "Bir babalık testinde çocuğun DNA bantlarının nasıl bir dağılım göstermesi beklenir?",
       "cozum": "Çocuğun **her bandı ya anneden ya da babadan** gelmelidir. Annede bulunmayan bantların tamamı **olası babada** bulunuyorsa babalık doğrulanır."
      },
      {
       "soru": "Dolly'nin genetik olarak hangi koyuna benzediğini gerekçesiyle açıklayınız.",
       "cozum": "**Meme hücresinin çekirdeğinin alındığı** koyuna benzer; çünkü kalıtım bilgisinin neredeyse tamamı **çekirdek DNA'sındadır**. Yumurtayı veren koyundan yalnızca **sitoplazmik (mitokondriyal) DNA** gelir, taşıyıcı annenin genetik katkısı yoktur."
      }
     ],
     "ozet": [
      "Gen tedavisi: virüs vektörüyle sağlam gen aktarımı.",
      "DNA parmak izi: restriksiyon → PCR → elektroforez → bant profili.",
      "Agrobacterium Ti plazmidi; altın pirinç; Dolly: çekirdek aktarımıyla klonlama."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.6",
    "title": {
     "tr": "GDO, biyogüvenlik ve biyoetik",
     "en": "GMOs, biosafety and bioethics"
    },
    "content": {
     "anlatim": "# Genetiği Değiştirilmiş Organizmalar (GDO)\n\nGen dizilimi değiştirilen ya da kendi türünde bulunmayan bir özellik **gen aktarımıyla** kazandırılan canlılardır (transgenik organizmalar).\n\n# Olası Yararlar\n\n- **Verim artışı**; zararlılara, hastalıklara, kuraklığa, tuzluluğa ve dona dayanıklılık → **açlıkla mücadele**.\n- **Besin değerinin zenginleştirilmesi** (altın pirinç), raf ömrünün uzatılması, olgunlaşmanın düzenlenmesi.\n- Daha az böcek ilacı kullanımı (Bt bitkileri).\n- **Tıp ve sanayi:** bakterilere ürettirilen **insülin**, büyüme hormonu, aşılar, pıhtılaşma faktörleri; biyoyakıt, atık temizleyen mikroorganizmalar.\n\n# Olası Riskler ve Tartışmalar\n\n| Alan | Endişe |\n|---|---|\n| **Çevre** | Aktarılan genin yabani akrabalara geçmesi (**gen kaçışı**), hedef dışı böceklerin zarar görmesi, **biyoçeşitlilik kaybı**, dirençli zararlı ve yabani otların ortaya çıkması |\n| **Sağlık** | Olası **alerjen** etkiler, antibiyotik direnç işaretçi genleri; uzun vadeli etkilerin izlenmesi gerekliliği |\n| **Ekonomi ve toplum** | Tohumların **patentli** olması, çiftçinin her yıl tohum satın almak zorunda kalması, gıda üretiminin **birkaç büyük şirketin** denetimine girmesi |\n| **Güvenlik** | Teknolojinin **biyolojik silah** amaçlı kötüye kullanılma riski |\n\n> Bilimsel kuruluşlar (DSÖ, Ulusal Bilim Akademileri), onay almış GDO'lu gıdaların geleneksel karşılıklarından **daha riskli olduğuna dair kanıt bulunmadığını** belirtir; ancak her ürünün **ayrı ayrı değerlendirilmesi** ve izlenmesi gerekir. İnternette yayılan bazı iddialar (ör. GDO'lu besinlerin birkaç kuşakta kısırlık yaptığı) **bilimsel olarak doğrulanmamıştır**.\n\n# Türkiye'de Durum\n\n**5977 sayılı Biyogüvenlik Kanunu (2010):** GDO'lu bitkilerin **üretimi yasaktır**; ithalat ve kullanım (ör. yem) **Biyogüvenlik Kurulu** iznine bağlıdır ve etiketleme zorunludur.\n\n# Biyogüvenlik ve Biyoetik\n\n- **Biyogüvenlik:** İnsan, hayvan, bitki sağlığını, çevreyi ve biyolojik çeşitliliği korumak için **GDO ve ürünleriyle ilgili faaliyetlerin güvenli yürütülmesi**.\n- **Biyoetik:** Biyoteknoloji ve tıptaki gelişmelerin **insan onuru, özgürlüğü ve canlı yaşamı** açısından doğurduğu etik sorunları inceleyen disiplin.\n  - Sorular: İnsan klonlaması kabul edilebilir mi? Embriyo üzerinde gen düzenlemesi yapılmalı mı? Genetik bilgiler sigorta ve işverenlerle paylaşılabilir mi? Hayvan deneylerinin sınırı ne olmalı?\n  - Genel ilkeler: **zarar vermeme, yarar sağlama, özerklik (bilgilendirilmiş onam), adalet**; kişisel genetik verilerin gizliliği.",
     "ornekler": [
      {
       "soru": "GDO'lu bitkilerin olası ekolojik risklerinden ikisini açıklayınız.",
       "cozum": "1) **Gen kaçışı:** aktarılan direnç geninin polen yoluyla **yabani akrabalara** geçip dirençli yabani otlar oluşturması. 2) Bt toksininin **hedef dışı** (yararlı) böceklere zarar vererek **biyoçeşitliliği** azaltması."
      },
      {
       "soru": "Biyogüvenlik ile biyoetik arasındaki fark nedir?",
       "cozum": "**Biyogüvenlik** GDO faaliyetlerinin sağlık ve çevre açısından **güvenli yürütülmesine yönelik önlem ve kurallardır**. **Biyoetik** ise bu teknolojilerin **ahlaki açıdan** neye, ne ölçüde izin verilmesi gerektiğini tartışır."
      }
     ],
     "ozet": [
      "GDO: gen aktarımıyla yeni özellik kazanmış canlı.",
      "Yarar: verim, dayanıklılık, besin değeri, ilaç üretimi; risk: gen kaçışı, biyoçeşitlilik, şirket bağımlılığı.",
      "Türkiye: GDO'lu bitki üretimi yasak (5977 sayılı kanun); biyoetik ilkeleri."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Canlılarda Enerji Dönüşümleri",
   "en": "Unit 2: Energy Transformations in Living Things"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Fotosentez ve kemosentez",
     "en": "Photosynthesis and chemosynthesis"
    },
    "content": {
     "anlatim": "# ATP\n\n**Adenin + riboz + 3 fosfat**. Fosfatlar arasındaki bağların kopmasıyla enerji açığa çıkar: $ATP \\to ADP + P_i + \\text{enerji}$.\nATP üretim yolları: **substrat düzeyinde fosforilasyon**, **oksidatif fosforilasyon** (solunum ETS), **fotofosforilasyon** (fotosentez).\n\n# Fotosentez\n\n$$6CO_2 + 12H_2O \\xrightarrow[\\text{klorofil}]{\\text{ışık}} C_6H_{12}O_6 + 6O_2 + 6H_2O$$\n(Sadeleştirilmiş: $6CO_2 + 6H_2O \\to C_6H_{12}O_6 + 6O_2$)\n\n**Kloroplast:** dış ve iç zar, **tilakoit** (granalar) ve **stroma**.\n\n| | Işığa bağımlı tepkimeler | Işıktan bağımsız tepkimeler (Calvin döngüsü) |\n|---|---|---|\n| Yer | **Tilakoit zar** | **Stroma** |\n| Girdi | Işık, su, ADP, NADP⁺ | CO₂, ATP, NADPH |\n| Olaylar | **Suyun fotolizi** → O₂ açığa çıkar; elektron taşıma; **fotofosforilasyon** | **CO₂ tutulması** (RuBisCO enzimi, RuBP), indirgenme, RuBP'nin yenilenmesi |\n| Ürün | **ATP, NADPH, O₂** | **Glikoz** (PGAL üzerinden), ADP, NADP⁺ |\n\n> Açığa çıkan **O₂ sudan** gelir (izotop deneyleri).\n\n**Fotosentez hızını etkileyen faktörler:** ışık şiddeti ve dalga boyu (en etkili **mor-mavi ve kırmızı**, en az yeşil), CO₂ derişimi, sıcaklık (enzim), su, klorofil miktarı, mineral (Mg, N). **Sınırlayıcı faktör ilkesi:** Hızı en az bulunan faktör belirler.\n\n# Kemosentez\n\nIşık yerine **inorganik maddelerin oksidasyonundan** elde edilen enerjiyle organik madde üretimi. Yalnızca bazı **bakteri ve arkelerde**.\n- **Nitrifikasyon bakterileri:** $NH_3 \\to NO_2^- \\to NO_3^-$ (azot döngüsü).\n- Kükürt, demir bakterileri; okyanus tabanındaki **hidrotermal bacalarda** ekosistemlerin üreticileri.",
     "ornekler": [
      {
       "soru": "Fotosentezde açığa çıkan oksijenin kaynağı nedir? Nasıl kanıtlanmıştır?",
       "cozum": "Kaynak **su**dur. Ağır oksijen izotopu (¹⁸O) içeren su verilen bitkilerde açığa çıkan O₂'nin ¹⁸O içerdiği, işaretli CO₂ verildiğinde ise O₂'nin işaretsiz olduğu gösterilmiştir."
      }
     ],
     "ozet": [
      "Işık tepkimeleri tilakoitte: fotoliz, ATP, NADPH, O₂.",
      "Calvin döngüsü stromada: CO₂ tutulur, glikoz üretilir.",
      "Kemosentez: inorganik madde oksidasyonu (nitrifikasyon)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Hücresel solunum ve fermantasyon",
     "en": "Cellular respiration and fermentation"
    },
    "content": {
     "anlatim": "# Oksijenli Solunum\n\n$$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{enerji (ATP + ısı)}$$\n\n| Evre | Yer | Olay | Net kazanç (1 glikoz) |\n|---|---|---|---|\n| **Glikoliz** | **Sitoplazma** | Glikoz → 2 **pirüvat**; O₂ gerekmez | 2 ATP, 2 NADH |\n| **Pirüvat oksidasyonu** | Mitokondri matriksi | Pirüvat → **asetil-CoA** + CO₂ | 2 NADH |\n| **Krebs döngüsü** | **Matriks** | Asetil-CoA tamamen yıkılır, **CO₂** çıkar | 2 ATP, 6 NADH, 2 FADH₂ |\n| **ETS ve oksidatif fosforilasyon** | **Mitokondri iç zarı (kristalar)** | NADH ve FADH₂'nin elektronları zincirden geçer; son elektron alıcısı **O₂** → **H₂O**; ATP sentaz | ~26–28 ATP |\n| **Toplam** | | | **~30–32 ATP** |\n\n**Kemiozmoz:** ETS'de matriksten zarlar arası boşluğa pompalanan H⁺ iyonları **ATP sentaz** üzerinden geri akarken ATP üretilir.\n\n# Oksijensiz Solunum ve Fermantasyon\n\nO₂ yoksa yalnızca **glikoliz** çalışır; NAD⁺'nin yenilenmesi için fermantasyon yapılır. **Net 2 ATP**.\n\n| Fermantasyon | Ürün | Örnek |\n|---|---|---|\n| **Etil alkol** | Etanol + **CO₂** | Maya: ekmeğin kabarması, sirke ve alkol üretimi |\n| **Laktik asit** | **Laktik asit** (CO₂ yok) | Yoğurt bakterileri; yorgun **çizgili kas** hücreleri |\n\n# Karşılaştırma\n\n| | Oksijenli solunum | Fermantasyon |\n|---|---|---|\n| O₂ | Gerekli | Gerekmez |\n| Son ürün | CO₂ + H₂O (inorganik) | Etanol/laktik asit (organik — hâlâ enerji içerir) |\n| ATP | ~30–32 | 2 |\n| Yer | Sitoplazma + mitokondri | Sitoplazma |\n\n> **Fotosentez ↔ solunum:** Birinin ürünleri diğerinin girdileridir; enerji **ışık → kimyasal → ATP → ısı** olarak akar, madde (C, O, H) döngüdedir.",
     "ornekler": [
      {
       "soru": "Ağır egzersizden sonra kaslarda yorgunluk ve kramp hissedilmesinin nedeni nedir?",
       "cozum": "Kaslara yeterli **O₂** ulaşamayınca hücreler **laktik asit fermantasyonu** yapar; biriken laktik asit ve iyon dengesindeki değişiklikler yorgunluk hissine katkıda bulunur. Dinlenince laktat karaciğerde geri dönüştürülür."
      }
     ],
     "ozet": [
      "Glikoliz sitoplazma; Krebs matriks; ETS iç zar.",
      "Son elektron alıcısı O₂; ~30–32 ATP.",
      "Fermantasyon net 2 ATP: etil alkol ve laktik asit."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Metabolizma, ATP ve fosforilasyon çeşitleri",
     "en": "Metabolism, ATP and types of phosphorylation"
    },
    "content": {
     "anlatim": "# Metabolizma\n\nHücredeki **yapım, yıkım ve dönüşüm** tepkimelerinin tümü.\n| Özümleme (**anabolizma**, asimilasyon) | Yadımlama (**katabolizma**, disimilasyon) |\n|---|---|\n| Küçük moleküllerden büyük moleküller yapılır; **enerji harcanır** (endergonik) | Büyük moleküller parçalanır; **enerji açığa çıkar** (ekzergonik) |\n| Fotosentez, kemosentez, protein–nükleik asit–yağ–polisakkarit sentezi | Hücresel solunum, fermantasyon, sindirim (hidroliz) |\n\n# ATP (Adenozin trifosfat)\n\n**Adenin + riboz + 3 fosfat.** Son iki fosfat arasındaki bağlar **yüksek enerjili** bağlardır.\n$$ATP + H_2O \\rightleftharpoons ADP + P_i + \\text{enerji}$$\n- ATP sentezine **fosforilasyon**, ATP'nin yıkılmasına **defosforilasyon** denir.\n- **Tüm canlılar** ATP üretir; ATP **depolanamaz**, sürekli üretilip tüketilir (bir insan günde kendi ağırlığına yakın ATP döngüsü yapar).\n- ATP genellikle **üretildiği hücrede** kullanılır; hücre dışına çıkmaz (bitkilerde arkadaş hücreden kalburlu boru hücresine geçiş gibi özel durumlar dışında).\n- Üretim yerleri: **sitoplazma, mitokondri, kloroplast** (prokaryotlarda sitoplazma ve hücre zarı).\n\n# Fosforilasyon Çeşitleri\n\n| Çeşit | Enerji kaynağı | Nerede | Canlılar |\n|---|---|---|---|\n| **Substrat düzeyinde fosforilasyon** | Yüksek enerjili bir substrattan ADP'ye **doğrudan fosfat aktarımı**; ETS yok | Glikoliz (sitoplazma), Krebs döngüsü | **Tüm canlılar** |\n| **Oksidatif fosforilasyon** | Besinlerden koparılan elektronların **ETS**'de taşınması (kemiozmoz) | Mitokondri iç zarı (kristalar); prokaryotta hücre zarı | Oksijenli ve oksijensiz solunum yapanlar |\n| **Fotofosforilasyon** | **Işık enerjisi** (klorofil + ETS) | Kloroplast **tilakoit zarı** | Fotosentez yapanlar |\n| **Kemofosforilasyon** (kemosentetik) | **İnorganik maddelerin oksidasyonu** | Hücre zarı | Bazı bakteri ve arkeler |\n\n# Kemiozmotik Hipotez (Peter Mitchell, 1961)\n\n\"**Zarın iki yüzü arasındaki proton (H⁺) derişim farkı ATP sentezini sağlar.**\" Elektronların ETS'de akarken bıraktığı enerjiyle H⁺ iyonları bir bölmeye pompalanır; H⁺ iyonları **ATP sentaz** kanalından geri akarken enzim bir türbin gibi döner ve **ADP + Pᵢ → ATP** oluşur.\n| | Mitokondri | Kloroplast |\n|---|---|---|\n| H⁺ pompalandığı yer | **Zarlar arası boşluk** | **Tilakoit boşluğu** |\n| ATP'nin oluştuğu yer | **Matriks** | **Stroma** |",
     "ornekler": [
      {
       "soru": "Fotofosforilasyon ile substrat düzeyinde fosforilasyonu iki yönden karşılaştırınız.",
       "cozum": "**Enerji kaynağı:** fotofosforilasyonda **ışık**, substrat düzeyinde **yüksek enerjili bir organik molekül**. **ETS:** fotofosforilasyonda **görev yapar**, substrat düzeyinde **görev yapmaz**. Ayrıca substrat düzeyinde fosforilasyon tüm canlılarda görülür."
      },
      {
       "soru": "Mitokondride ATP sentaz enzimi H⁺ iyonlarını hangi yönde geçirir?",
       "cozum": "**Zarlar arası boşluktan matrikse** doğru (yüksek derişimden düşük derişime); bu akış ATP sentezini sağlar."
      }
     ],
     "ozet": [
      "Anabolizma: yapım, enerji harcar; katabolizma: yıkım, enerji verir.",
      "ATP: adenin + riboz + 3 fosfat; depolanmaz.",
      "4 fosforilasyon: substrat düzeyi, oksidatif, foto-, kemo-; kemiozmoz + ATP sentaz."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Fotosentezin ayrıntıları ve fotosentez hızını etkileyen faktörler",
     "en": "Photosynthesis in detail and limiting factors"
    },
    "content": {
     "anlatim": "# Fotosentez Yapan Canlılar ve Yapılar\n\nBitkiler, algler, öglena, **siyanobakteriler**, mor ve yeşil kükürt bakterileri. Fotosentezin büyük kısmı **okyanuslardaki fitoplanktonlar** tarafından yapılır.\n- **Klorofil:** C, H, O, N ve **Mg** içerir; Fe yapısında yoktur ama **sentezi için gereklidir** (enzim kofaktörü). Ökaryotlarda kloroplastta, prokaryotlarda sitoplazmadaki zar sistemlerinde bulunur.\n- **Kloroplast:** çift zar, **tilakoitler (granum)** ve **stroma**; stromada **kendi DNA'sı, RNA'sı ve ribozomları** vardır → kendini eşleyebilir, bazı proteinlerini üretebilir. Fotosentezde üretilen ATP **yalnızca kloroplast içinde** (Calvin döngüsünde) harcanır.\n- **Yaprak:** Epidermis hücrelerinde kloroplast yoktur (stoma **bekçi hücreleri** hariç); en çok fotosentez **palizat parankimasında**, sonra sünger parankimasında olur.\n\n# Işığa Bağımlı Tepkimeler (tilakoit zar)\n\nSıra: **FS II ve FS I'deki klorofil-a ışığı soğurur, elektron kaybeder → suyun fotolizi → ETS ve fotofosforilasyon (ATP) → NADP⁺'nin indirgenmesi (NADPH)**.\n- Elektron akışı: $H_2O \\to FS\\,II \\to ETS \\to FS\\,I \\to NADP^+$\n- **Suyun 3 işlevi:** FS II için **elektron**, NADP⁺ için **hidrojen**, atmosfer için **O₂** kaynağı.\n- Sıcaklıktan çok **ışık şiddeti** etkilidir.\n\n# Işıktan Bağımsız Tepkimeler (Calvin döngüsü, stroma)\n\n- **CO₂**, RuBP'ye tutulur (**RuBisCO** enzimi), ATP ve NADPH ile indirgenerek **PGAL**'e dönüşür; RuBP yeniden oluşturulur.\n- 1 glikoz için **6 CO₂, 18 ATP, 12 NADPH** harcanır.\n- PGAL'den **glikoz, aminoasit, yağ asidi, gliserol, vitamin** vb. sentezlenir.\n- Enzimatik olduğu için **sıcaklık** ve pH değişimlerine duyarlıdır; ışık doğrudan gerekmez ama ışıklı evrenin ürünlerine bağımlı olduğu için doğada **gündüz** gerçekleşir.\n\n# Farklı Fotosentez Tipleri (karbon kaynağı hep CO₂, hidrojen kaynağı farklı)\n\n| Canlı | Hidrojen kaynağı | Yan ürün |\n|---|---|---|\n| Bitki, alg, siyanobakteri | $H_2O$ | **O₂** |\n| Kükürt bakterileri | $H_2S$ | **S** (kükürt) |\n| Hidrojen bakterileri | $H_2$ | — |\n\n# Engelmann Deneyi (1883)\n\nİpliksi bir alge prizmayla farklı dalga boylarında ışık düşürülmüş; **oksijen seven (aerobik) bakteriler** en çok **mor–mavi ve kırmızı** ışık alan bölgelerde toplanmıştır → fotosentez bu dalga boylarında en hızlıdır. Hız sırası: **mor > mavi > kırmızı > turuncu > sarı > yeşil** (yeşil yansıtılır).\n\n# Fotosentez Hızını Etkileyen Faktörler\n\n| Çevresel | Etkisi |\n|---|---|\n| **Işık şiddeti** | Belli bir noktaya kadar hız artar, sonra sabit kalır (doygunluk) |\n| **CO₂ derişimi** | Belli bir noktaya kadar artar, sonra sabit; çok düşükse fotosentez durur. KOH, NaOH, Ca(OH)₂ gibi CO₂ tutan maddeler hızı **düşürür** |\n| **Sıcaklık** | Enzimler nedeniyle optimum **25–35 °C**; yüksek sıcaklıkta enzimler bozulur, hız düşer |\n| **Işığın dalga boyu** | Mor–mavi ve kırmızıda en yüksek, yeşilde en düşük |\n| **Su** | Fotoliz, stomaların açılması ve enzimler için gerekli |\n| **Mineraller** | **Mg** (klorofil), **Fe** (ferredoksin, klorofil sentezi), Mn, K, Ca (kofaktör) |\n| **pH** | Enzim aktivitesini etkiler |\n| **Genetik** | Etkisi |\n| Kloroplast–klorofil miktarı, yaprak sayısı ve yüzeyi, **stoma sayısı ve konumu**, kutikula kalınlığı, enzim miktarı | Kalın kutikula ve az stoma (kurak ortam bitkileri) hızı azaltır |\n\n> **Minimum (sınırlayıcı faktör) yasası:** Fotosentez hızını, **en yetersiz olan** faktör belirler.",
     "ornekler": [
      {
       "soru": "Bir bitkinin bulunduğu ortama KOH eklendiğinde fotosentez hızı nasıl değişir? Neden?",
       "cozum": "**Azalır.** KOH ortamdaki **CO₂'yi tutar**; Calvin döngüsü için gerekli CO₂ azalınca ışıktan bağımsız tepkimeler yavaşlar."
      },
      {
       "soru": "Fotosentezde açığa çıkan O₂'nin kaynağı nedir ve hangi evrede oluşur?",
       "cozum": "**Su**dur; **ışığa bağımlı tepkimelerde suyun fotolizi** sırasında tilakoit zarda açığa çıkar (CO₂'den gelmez)."
      }
     ],
     "ozet": [
      "Işığa bağımlı evre: tilakoit, fotoliz, ATP + NADPH + O₂.",
      "Calvin döngüsü: stroma, CO₂ tutulması, 1 glikoz = 6 CO₂ + 18 ATP + 12 NADPH.",
      "Hız: ışık, CO₂, sıcaklık, dalga boyu, su, mineral; en yetersiz faktör belirler."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.5",
    "title": {
     "tr": "Kemosentezin önemi ve fotosentez–kemosentez karşılaştırması",
     "en": "Importance of chemosynthesis; photosynthesis vs chemosynthesis"
    },
    "content": {
     "anlatim": "# Kemosentez\n\nBazı **bakteri ve arkelerin**, ortamdaki **inorganik maddeleri oksitleyerek** elde ettikleri kimyasal enerjiyle CO₂ ve sudan organik madde üretmesidir.\n$$\\text{İnorganik madde} + O_2 \\to \\text{oksitlenmiş madde} + \\text{enerji}$$\n$$6CO_2 + 6H_2O + \\text{enerji} \\to C_6H_{12}O_6 + 6O_2$$\n- Oksitlenen maddeler: **NH₃** (nitrit bakterileri), **NO₂⁻** (nitrat bakterileri), **H₂S, S** (kükürt bakterileri), **Fe²⁺** (demir bakterileri), H₂.\n- Ürettikleri O₂'yi oksidasyonda kullandıkları için ekosisteme **net oksijen katkıları yoktur**.\n- Okyanus tabanındaki **hidrotermal bacalar** çevresinde güneş ışığından bağımsız ekosistemlerin temelini oluştururlar.\n\n# Kemosentezin Önemi\n\n1. NH₃, H₂S gibi **zehirli ve kirletici** maddeleri zararsız hâle getirir.\n2. Azotlu bileşikleri bitkilerin alabileceği **nitrat tuzlarına** dönüştürür (**nitrifikasyon**) → **azot döngüsü**.\n3. Azotun toprakta tutulmasını ve **toprak verimliliğini** sağlar.\n4. Madde döngüleri ve biyolojik dengenin korunmasında rol oynar.\n\n# Endüstride Kullanımı\n\n- **Biyomadencilik:** Bakır, altın, uranyum gibi metallerin cevherden bakterilerle ayrıştırılması.\n- **Atık su arıtımı:** Arıtma çamurunun bakteri ve arkelerle parçalanması, gübreye dönüştürülmesi.\n- **Petrol kirliliği temizliği:** Kirlenen kıyılara gübre püskürtülerek bakterilerin çoğalması ve petrolün parçalanması hızlandırılır.\n\n# Ortak Özellikler\n\nİnorganik maddelerden organik madde üretilir · **CO₂ özümlenir** · ATP üretilir ve harcanır · enzimatik tepkimelerdir · **ETS** görev yapar · NADP⁺ indirgenir · hidrojen kaynağı kullanılır · ototrof beslenmedir.\n\n# Farklar\n\n| | Fotosentez | Kemosentez |\n|---|---|---|\n| Yapan canlılar | Prokaryot ve ökaryot (bitki, alg, siyanobakteri…) | Yalnızca bazı **prokaryotlar** (bakteri, arke) |\n| Enerji kaynağı | **Işık** | **İnorganik maddelerin oksidasyonu** (kimyasal enerji) |\n| Klorofil | Gerekli | **Gerekmez** |\n| ATP üretimi | **Fotofosforilasyon** | **Kemofosforilasyon** (oksidatif) |\n| Zaman | Doğal ortamda **gündüz** | **Gece ve gündüz** |\n| O₂ | Bitkilerde **üretilir** (atmosfere verilir) | Net katkı yok; çoğunlukla **O₂ tüketir** |",
     "ornekler": [
      {
       "soru": "Kemosentetik bakterilerin toprak verimliliğine katkısı nedir?",
       "cozum": "**Nitrifikasyon** bakterileri amonyağı (NH₃) önce nitrite, sonra **nitrata** dönüştürür; bitkiler azotu **nitrat** olarak alabildiğinden toprak verimliliği artar."
      },
      {
       "soru": "Hem fotosentezde hem kemosentezde gerçekleşen ancak oksijensiz solunumda gerçekleşmeyen bir olay nedir?",
       "cozum": "**CO₂ özümlemesi (inorganik maddelerden organik madde sentezi).** Solunumda organik madde yıkılır; fotosentez ve kemosentezde ise CO₂'den organik madde yapılır."
      }
     ],
     "ozet": [
      "Kemosentez: inorganik madde oksidasyonuyla organik madde üretimi, yalnızca bazı prokaryotlar.",
      "Önemi: nitrifikasyon, zehirli maddelerin zararsızlaştırılması, biyomadencilik.",
      "Fotosentez ışık + klorofil; kemosentez kimyasal enerji, gece-gündüz."
     ]
    }
   },
   {
    "id": "k6",
    "code": "2.6",
    "title": {
     "tr": "Solunumda ATP hesabı, farklı besinlerin solunuma katılımı ve oksijensiz solunum",
     "en": "ATP yield, other nutrients in respiration, anaerobic respiration"
    },
    "content": {
     "anlatim": "# Oksijenli Solunumun Ayrıntıları\n\n- **Glikoliz** (sitoplazma): 2 ATP harcanır, **4 ATP** üretilir (substrat düzeyinde) → **net 2 ATP**, 2 NADH; ürün 2 **pirüvat**.\n- **Krebs'e hazırlık** (mitokondri matriksi): Her pirüvattan **1 CO₂** ayrılır, 1 NADH oluşur, kalan 2C'lu asetil grubu **koenzim A**'ya bağlanır → **asetil-CoA**. (Glikozun yıkımında ilk CO₂ burada çıkar.)\n- **Krebs döngüsü** (matriks): İlk ürün **sitrik asit**; 1 glikoz (2 asetil-CoA = 2 tur) için **4 CO₂, 6 NADH, 2 FADH₂, 2 ATP**; 6 H₂O harcanır.\n- **ETS** (mitokondri iç zarı – kristalar; prokaryotta hücre zarı): Son elektron alıcısı **O₂** → H₂O.\n\n# ATP Hesabı (1 glikoz)\n\n| Kaynak | Hesap | ATP |\n|---|---|---|\n| Substrat düzeyinde (glikoliz + Krebs) | 4 + 2 (toplam 6, glikolizde 2 harcanır) | **net 4** |\n| Oksidatif: NADH | 10 NADH × 2,5 | 25 |\n| Oksidatif: FADH₂ | 2 FADH₂ × 1,5 | 3 |\n| **Toplam** | | **net ≈ 32 ATP** (bazı dokularda 30) |\n- Farkın nedeni: sitoplazmadaki NADH'ların mitokondriye **farklı mekiklerle** taşınması (iskelet kası–beyin ≈ 30; karaciğer, böbrek, kalp ≈ 32).\n- **CO₂:** 2 (hazırlık) + 4 (Krebs) = **6 CO₂**. **Su:** 12 H₂O oluşur, 6'sı Krebs'te harcanır → **net 6 H₂O**.\n- Enerji verimi ≈ %40; fermantasyona göre ≈ 15 kat fazla ATP.\n\n**Mitokondri etkinliği artan hücrede:** O₂ tüketimi, CO₂ üretimi, ATP, ısı ve su artar; glikoz azalır, **pH düşer**.\n\n# Farklı Besinlerin Solunuma Katılması\n\nPolimerler önce **hidrolizle** monomerlerine ayrılır. Enerji için kullanım sırası genellikle **karbonhidrat > yağ > protein**.\n| Monomer | Solunuma giriş noktası |\n|---|---|\n| **Glikoz** | Glikoliz |\n| **Gliserol** | **PGAL**'e dönüşerek glikolizin ara basamağı |\n| **Yağ asitleri** | Mitokondride **beta oksidasyonu** ile **asetil-CoA** |\n| **Aminoasitler** | Önce **deaminasyon** (amino grubu **NH₃** olarak ayrılır); sonra karbon sayısına göre asetil-CoA, pirüvat ya da Krebs ara ürünü |\n> Solunum sonucunda **NH₃** oluşuyorsa kullanılan besin **protein (aminoasit)**tir. Aynı kütlede **yağlar** en çok enerjiyi verir.\n\n# Oksijensiz (Anaerobik) Solunum\n\n- Yalnızca **bazı bakterilerde**; glikoliz, Krebs ve **ETS** vardır ama son elektron alıcısı **O₂ dışında bir inorganik maddedir**: **SO₄²⁻, S, NO₃⁻, CO₂, Fe³⁺**.\n- Bu alıcıların elektron çekme gücü O₂'den zayıf olduğu için **ATP verimi oksijenli solunumdan az, fermantasyondan fazladır**.\n- **Denitrifikasyon:** Nitratı son elektron alıcısı olarak kullanan bakteriler NO₃⁻'ü **N₂**'ye dönüştürür → azot döngüsü.",
     "ornekler": [
      {
       "soru": "Yağ asitlerinin oksijenli solunuma katılım yolu nedir?",
       "cozum": "Yağ asitleri mitokondride **beta oksidasyonu** ile 2 karbonlu **asetil-CoA** birimlerine parçalanır ve **Krebs döngüsüne** katılır. Gliserol ise PGAL'e dönüşerek glikolize girer."
      },
      {
       "soru": "Oksijensiz solunumu fermantasyondan ayıran iki özellik yazınız.",
       "cozum": "Oksijensiz solunumda **ETS görev yapar** ve son elektron alıcısı **inorganik** bir maddedir (SO₄²⁻, NO₃⁻ vb.); fermantasyonda ETS yoktur ve son elektron alıcısı **organiktir** (pirüvat ya da asetaldehit). Ayrıca oksijensiz solunumda Krebs döngüsü de vardır ve daha çok ATP üretilir."
      }
     ],
     "ozet": [
      "1 glikoz → net ≈ 32 ATP (4 SDF + 28 oksidatif), 6 CO₂, net 6 H₂O.",
      "Gliserol → PGAL; yağ asidi → beta oksidasyon → asetil-CoA; aminoasit → deaminasyon (NH₃).",
      "Oksijensiz solunum: ETS var, son alıcı inorganik (SO₄²⁻, NO₃⁻); denitrifikasyon."
     ]
    }
   },
   {
    "id": "k7",
    "code": "2.7",
    "title": {
     "tr": "Fermantasyon çeşitleri ve fotosentez–solunum ilişkisi",
     "en": "Types of fermentation and the photosynthesis–respiration relationship"
    },
    "content": {
     "anlatim": "# Fermantasyon\n\nOksijen kullanılmadan, **yalnızca glikolizle** ATP üretilen süreç. Glikolizden sonraki evrenin amacı ATP üretmek değil, **NADH'ı yükseltgeyip NAD⁺'yi geri kazanmak** ve böylece glikolizin sürmesini sağlamaktır.\n- Net **2 ATP** (toplam 4); yalnızca **substrat düzeyinde fosforilasyon**; ETS yok; tamamen **sitoplazmada**.\n- Glikoz tam yıkılamadığından enerjinin büyük kısmı **organik son üründe** kalır (verim ≈ %2).\n- Son ürünün farklı olmasının nedeni, glikolizden sonraki basamaklarda görev yapan **enzimlerin farklı** olmasıdır.\n\n| | Etil alkol fermantasyonu | Laktik asit fermantasyonu |\n|---|---|---|\n| Canlılar | **Maya mantarları**, bazı bakteriler, **oksijensiz kalan bitki hücreleri ve tohumlar** | **Yoğurt bakterileri**, bazı mantarlar, O₂ yetersizliğinde **çizgili kas**, insanda **olgun alyuvar** |\n| Ara ürün | **Asetaldehit** (pirüvattan CO₂ ayrılır) | — |\n| Son elektron (H) alıcısı | **Asetaldehit** | **Pirüvat** |\n| Son ürün | **2 etil alkol (2C) + 2 CO₂** | **2 laktik asit (3C)**, CO₂ yok |\n| Kapalı ortamda gaz basıncı | **Artar** | Değişmez |\n| Kullanım | Ekmek hamurunun kabarması, boza, alkol, biyoetanol | **Yoğurt, kefir, peynir, turşu, salamura zeytin**, sucuk olgunlaştırma |\n- İnsan ve hayvan hücrelerinde **etil alkol fermantasyonu**, bitkilerde **laktik asit fermantasyonu** görülmez.\n- Kaslarda biriken laktat, oksijen yeterli hâle gelince **karaciğerde** pirüvata / glikoza dönüştürülür (kas yorgunluğu yalnızca laktata bağlanmaz).\n- **Bira mayası** O₂ varken oksijenli solunum, yokken fermantasyon yapar (**fakültatif**).\n\n# Enerji Elde Etme Yollarının Karşılaştırması\n\n| | Oksijenli solunum | Oksijensiz solunum | Fermantasyon |\n|---|---|---|---|\n| O₂ | Kullanılır | Kullanılmaz | Kullanılmaz |\n| ETS | Var | Var | **Yok** |\n| Son elektron alıcısı | **O₂** (inorganik) | SO₄²⁻, NO₃⁻… (inorganik) | Pirüvat / asetaldehit (**organik**) |\n| Fosforilasyon | SDF + oksidatif | SDF + oksidatif | **Yalnızca SDF** |\n| Net ATP | ≈ 30–32 | Oksijenliden az, fermantasyondan çok | **2** |\n**Ortak özellikler:** glikoliz, enzimler, ısı çıkışı (ekzergonik), NAD⁺'nin indirgenip yükseltgenmesi, organik maddeden H koparılması, **pH'nin düşmesi**, biyokütlenin azalması.\n\n# Fotosentez–Solunum İlişkisi\n\nSolunumun ürünleri (**CO₂, H₂O**) fotosentezin, fotosentezin ürünleri (**glikoz, O₂**) solunumun ham maddesidir; enerji kaynağı en sonunda **Güneş**'tir.\n| Durum | Gaz alışverişi | Kuru ağırlık |\n|---|---|---|\n| **Fotosentez > solunum** (gündüz, yeterli ışık) | Atmosferden **CO₂ alır**, atmosfere **O₂ verir** | **Artar** |\n| **Fotosentez = solunum** (**kompanzasyon noktası**; sabah–akşam, düşük ışık) | Dışarıyla net gaz alışverişi **yok** | Değişmez |\n| **Fotosentez < solunum** (çok düşük ışık) / **gece** (yalnızca solunum) | **O₂ alır, CO₂ verir** | **Azalır** |\n- **Kökler** fotosentez yapmaz; ürettikleri CO₂ gece–gündüz toprağa verilir (kök → toprak → atmosfer → yaprak).\n- **Kuru tohum** canlıdır; kabuk O₂ geçişini sınırladığı için düşük düzeyde **etil alkol fermantasyonu** yapabilir. **Çimlenen tohum** oksijenli solunum yapar ve fotosentez başlayana kadar **kuru ağırlığı azalır**; fotosentez başlayınca artar.\n- Gece bitkiler yalnızca solunum yaptığından kapalı ve küçük yatak odalarında çok sayıda bitki bulundurmak önerilmez.",
     "ornekler": [
      {
       "soru": "Kapalı bir kapta maya hücreleri ve glikoz bulunmaktadır; O₂ bittikten sonra kaptaki basınç nasıl değişir?",
       "cozum": "**Artar.** O₂ bitince maya **etil alkol fermantasyonu** yapar ve **CO₂** üretir; gaz miktarı arttığı için basınç yükselir. (Laktik asit fermantasyonunda CO₂ çıkmadığından basınç değişmezdi.)"
      },
      {
       "soru": "Bir bitkinin kompanzasyon noktasında olduğu nasıl anlaşılır?",
       "cozum": "Bitki ile atmosfer arasında **net CO₂ ve O₂ alışverişi olmaz**; fotosentezde üretilen O₂ ve glikoz solunumda, solunumda üretilen CO₂ fotosentezde tamamen kullanılır. Kuru ağırlık değişmez."
      }
     ],
     "ozet": [
      "Fermantasyon: yalnızca glikoliz, net 2 ATP, NAD⁺ yenilenir.",
      "Etil alkol: asetaldehit, CO₂ çıkar; laktik asit: pirüvat alıcı, CO₂ yok.",
      "Fotosentez > solunum: ağırlık artar; eşit: kompanzasyon noktası."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Bitki Biyolojisi",
   "en": "Unit 3: Plant Biology"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Bitkinin yapısı: dokular ve organlar",
     "en": "Plant structure: tissues and organs"
    },
    "content": {
     "anlatim": "# Bitki Dokuları\n\n| Doku | Özellik ve görev |\n|---|---|\n| **Meristem (bölünür doku)** | Sürekli bölünür. **Uç (apikal) meristem** → boyca büyüme; **yanal meristem (kambiyum)** → enine büyüme (odunsu bitkiler, yıllık halkalar) |\n| **Örtü doku** | **Epidermis** (kütikula, stoma, tüyler); yaşlı gövdede **mantar (periderm)** |\n| **Temel doku – parankima** | Fotosentez (**palizat ve sünger parankiması**), depolama, havalandırma |\n| **Destek – kollenkima** | Canlı, köşeleri kalınlaşmış hücreler; genç gövde ve yaprak sapı |\n| **Destek – sklerenkima** | Ölü, **lignin**li hücreler; sert kabuk ve lifler (keten, ceviz kabuğu) |\n| **İletim – ksilem (odun borusu)** | **Su ve mineralleri** kökten yukarı taşır; trake ve trakeitler **ölü** hücreler |\n| **İletim – floem (soymuk borusu)** | **Organik besinleri** (sakaroz) her yöne taşır; kalburlu borular ve arkadaş hücreleri **canlı** |\n\n# Organlar\n\n- **Kök:** Tutunma, **su-mineral emilimi** (emici tüyler), depolama (havuç). **Kazık kök** (dikotiller) ve **saçak kök** (monokotiller).\n- **Gövde:** Destek, iletim, depolama (patates yumrusu). Monokotillerde iletim demetleri **dağınık**, dikotillerde **halka** şeklinde.\n- **Yaprak:** Fotosentez, gaz alışverişi, **terleme**. Ayası, sapı; damarlanma monokotillerde **paralel**, dikotillerde **ağsı**.\n\n| | Monokotil | Dikotil |\n|---|---|---|\n| Çenek | 1 | 2 |\n| Kök | Saçak | Kazık |\n| Yaprak damarı | Paralel | Ağsı |\n| Gövdede iletim demetleri | Dağınık | Halkasal |\n| Kambiyum | Genellikle yok | Var |\n| Örnek | Buğday, mısır, lale | Fasulye, gül, meşe |",
     "ornekler": [
      {
       "soru": "Ağaçlarda yıllık halkaların oluşmasını sağlayan doku hangisidir?",
       "cozum": "**Kambiyum (yanal meristem)**; ilkbaharda geniş, yaz sonunda dar hücreler üreterek her yıl bir **halka** oluşturur. Halka sayısı ağacın yaşını verir."
      }
     ],
     "ozet": [
      "Meristem büyür; parankima fotosentez/depo; kollenkima ve sklerenkima destek.",
      "Ksilem su-mineral (ölü); floem organik besin (canlı).",
      "Monokotil–dikotil farkları."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Bitkilerde taşıma, beslenme, hormon ve hareket",
     "en": "Transport, nutrition, hormones and movement in plants"
    },
    "content": {
     "anlatim": "# Su ve Mineral Taşınması (Ksilem)\n\n1. **Emilim:** Emici tüyler suyu **osmozla**, mineralleri **aktif taşıma** ve difüzyonla alır.\n2. **Kök basıncı:** Mineral birikimiyle kökte oluşan basınç suyu yukarı iter (gece **gutasyon**).\n3. **Kohezyon–gerilim (terleme–çekim) teorisi:** Yapraklardaki **terleme** su moleküllerini yukarı çeker; su molekülleri arasındaki **kohezyon** ve damar çeperine **adezyon** su sütununu koparmadan taşır. **Uzun ağaçlarda temel mekanizma**.\n\n**Stomaların açılıp kapanması:** Bekçi hücrelerine K⁺ girişi → su girer → turgor ↑ → stoma **açılır**. Kuraklıkta **absisik asit** stomaları kapatır.\n\n# Organik Madde Taşınması (Floem)\n\n**Basınç–akış (kütle akışı) hipotezi:** Şeker **kaynakta** (yaprak) floeme yüklenir → su girer, basınç artar → şekerli su basıncın düşük olduğu **havuza** (kök, meyve) akar. Taşıma **her iki yönde** olabilir.\n\n# Bitkilerde Beslenme\n\n**Makro elementler:** N, P, K, Ca, Mg, S. **Mikro elementler:** Fe, Mn, Zn, Cu, B, Mo, Cl.\n- **N** eksikliği → yaşlı yapraklarda sararma; **Mg** klorofilin yapısında.\n- **Azot bağlayıcı bakteriler** (baklagil köklerindeki *Rhizobium*), **mikoriza** mantarları.\n- Böcekçil bitkiler (Venüs sinekkapan) azot eksikliğini böceklerden karşılar.\n\n# Hormonlar ve Hareketler (Özet)\n\n| Hormon | Etki |\n|---|---|\n| Oksin | Hücre uzaması, fototropizma, tepe baskınlığı |\n| Giberellin | Çimlenme, gövde uzaması |\n| Sitokinin | Hücre bölünmesi, yaşlanmayı geciktirme |\n| Absisik asit | Stoma kapanması, dormansi |\n| Etilen | Meyve olgunlaşması, yaprak dökümü |\n\n**Tropizma** (yöne bağlı, büyümeyle): foto-, gravi-, hidro-, tigmotropizma. **Nasti** (yönden bağımsız, turgorla): sismonasti (küstüm otu), fotonasti, termonasti.",
     "ornekler": [
      {
       "soru": "Çok sıcak ve kuru bir günde bitkide su taşınması nasıl etkilenir?",
       "cozum": "Terleme artar, su kaybı hızlanır; su yetersizse **absisik asit** stomaları **kapatır**. Bu su kaybını azaltır ama **CO₂ alımını** ve dolayısıyla **fotosentezi** de düşürür."
      }
     ],
     "ozet": [
      "Ksilemde taşıma: kök basıncı + kohezyon–gerilim (terleme).",
      "Floemde basınç–akış: kaynaktan havuza.",
      "Makro (N, P, K…) ve mikro elementler; hormonlar ve hareketler."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Bitkilerde eşeysiz ve eşeyli üreme",
     "en": "Asexual and sexual reproduction in plants"
    },
    "content": {
     "anlatim": "# Eşeysiz Üreme\n\n- **Sporla üreme:** Eğrelti, kara yosunları.\n- **Vejetatif üreme:** Gövde, kök ya da yapraktan yeni birey.\n  - **Yumru** (patates), **soğan** (lale), **rizom** (zencefil, ayrık otu), **stolon** (çilek), **çelik** (söğüt, gül), **daldırma**, **aşılama** (meyve ağaçları).\n- Yeni bireyler **genetik olarak aynıdır** → istenen özellikler korunur; ama çevre değişimine karşı çeşitlilik azdır.\n\n# Çiçekli Bitkilerde Eşeyli Üreme\n\n**Çiçeğin kısımları:** çanak yaprak, taç yaprak, **erkek organ (stamen: başçık + sapçık)**, **dişi organ (pistil: tepecik, dişicik borusu, yumurtalık)**.\n\n1. **Başçıkta** mayozla **polen** oluşur (içinde **generatif** ve **vejetatif (tüp)** çekirdekler).\n2. **Tozlaşma:** Polen tepeciğe taşınır (rüzgâr, böcek, su).\n3. **Polen tüpü** dişicik borusundan yumurtalığa ilerler; generatif çekirdek mitozla **iki sperm** çekirdeği oluşturur.\n4. **Çift döllenme** (kapalı tohumlulara özgü):\n   - 1 sperm + **yumurta** → **zigot (2n)** → **embriyo**\n   - 1 sperm + **iki kutup çekirdeği** → **endosperm (3n)** → besin dokusu\n5. **Tohum** tohum taslağından, **meyve** yumurtalık duvarından gelişir.\n\n# Tohum ve Çimlenme\n\n- Tohum: **embriyo**, **endosperm/çenekler** (besin), **tohum kabuğu**.\n- Çimlenme için: **su** (şişme), **uygun sıcaklık**, **O₂**; bazı tohumlarda ışık. **Giberellin** çimlenmeyi başlatır, **ABA** dormansiyi sürdürür.\n- **Partenokarpi:** Döllenme olmadan meyve oluşumu (çekirdeksiz muz, oksin/giberellin uygulamaları).",
     "ornekler": [
      {
       "soru": "Kapalı tohumlularda 'çift döllenme' neden adını almıştır?",
       "cozum": "İki sperm çekirdeği **iki ayrı döllenme** yapar: biri yumurtayla birleşip **zigotu (2n)**, diğeri iki kutup çekirdeğiyle birleşip **endospermi (3n)** oluşturur."
      }
     ],
     "ozet": [
      "Vejetatif üreme: yumru, soğan, stolon, çelik, aşı.",
      "Çift döllenme: zigot 2n, endosperm 3n.",
      "Tohum taslaktan, meyve yumurtalıktan; çimlenmede su, sıcaklık, O₂."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Canlılar ve Çevre",
   "en": "Unit 4: Living Things and the Environment"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Popülasyon ve komünite ekolojisi",
     "en": "Population and community ecology"
    },
    "content": {
     "anlatim": "# Ekolojinin Düzeyleri\n\nbirey → **popülasyon** (aynı türün belirli alandaki bireyleri) → **komünite** (farklı popülasyonlar) → **ekosistem** (komünite + cansız çevre) → biyom → **biyosfer**.\n\n# Popülasyon\n\n- **Popülasyon yoğunluğu** = birey sayısı / alan.\n- **Büyüme:** (doğum + göçle gelen) − (ölüm + göçle giden).\n- **Üstel (J) büyüme:** Sınırsız kaynakta hızlı artış.\n- **Lojistik (S) büyüme:** Kaynaklar sınırlıdır; popülasyon **taşıma kapasitesine (K)** yaklaşınca büyüme yavaşlar.\n- **Sınırlayıcı faktörler:** Yoğunluğa bağlı (besin, rekabet, hastalık, avcı) ve yoğunluktan bağımsız (sel, yangın, iklim).\n- **Yaş piramitleri:** Geniş tabanlı → hızlı büyüyen; dikdörtgen → durağan; dar tabanlı → küçülen popülasyon.\n\n# Komünitede Türler Arası İlişkiler\n\n| İlişki | Tür 1 | Tür 2 | Örnek |\n|---|---|---|---|\n| **Rekabet** | − | − | Aynı besine yönelen türler (**rekabetle dışlama**) |\n| **Av–avcı (predatörlük)** | + | − | Vaşak–tavşan (döngüsel popülasyonlar) |\n| **Mutualizm** | + | + | Liken (mantar + alg), mikoriza, baklagil–*Rhizobium* |\n| **Kommensalizm** | + | 0 | Köpek balığı–vantuz balığı |\n| **Parazitlik** | + | − | Tenya, bit, küsüt bitkisi |\n\n**Ekolojik niş:** Bir türün komünitedeki \"mesleği\" (beslenme, yaşam alanı, etkinlik zamanı). **Habitat:** \"adresi\".\n**Süksesyon:** Komünitenin zamanla değişimi — **birincil** (çıplak kaya, öncü tür liken) ve **ikincil** (yangın sonrası).",
     "ornekler": [
      {
       "soru": "Bir adaya getirilen tavşan popülasyonunun önce hızlı artıp sonra sabitlenmesi nasıl açıklanır?",
       "cozum": "Başta kaynaklar bol olduğu için **üstel** artış olur; birey sayısı arttıkça besin ve alan **sınırlanır**, rekabet ve hastalık artar; popülasyon **taşıma kapasitesine** ulaşınca büyüme durur (**S eğrisi**)."
      }
     ],
     "ozet": [
      "Popülasyon → komünite → ekosistem.",
      "J (üstel) ve S (lojistik) büyüme; taşıma kapasitesi.",
      "Rekabet, av–avcı, mutualizm, kommensalizm, parazitlik."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Ekosistemde enerji akışı ve madde döngüleri",
     "en": "Energy flow and nutrient cycles in ecosystems"
    },
    "content": {
     "anlatim": "# Ekosistemin Bileşenleri\n\n- **Üreticiler (ototroflar):** Fotosentetik bitkiler, algler, kemosentetik bakteriler.\n- **Tüketiciler (heterotroflar):** Otçul (birincil), etçil (ikincil, üçüncül), hepçil.\n- **Ayrıştırıcılar:** Bakteri ve mantarlar; ölü organik maddeyi inorganiğe çevirir → **madde döngüsünü** tamamlar.\n\n# Enerji Akışı\n\n- Enerji **tek yönlü** akar: Güneş → üretici → tüketiciler → ısı olarak kaybolur.\n- **%10 kuralı:** Bir trofik düzeyden sonrakine enerjinin yaklaşık **%10'u** aktarılır; geri kalanı solunum ve ısıyla kaybolur. Bu yüzden besin zincirleri genellikle 4–5 halkayı geçmez.\n- **Besin zinciri:** Ot → çekirge → kurbağa → yılan → kartal. **Besin ağı:** Birbirine bağlı zincirler.\n- **Ekolojik piramitler:** Enerji piramidi her zaman düzdür; sayı ve biyokütle piramitleri ters olabilir.\n- **Biyolojik birikim:** DDT, cıva gibi parçalanmayan maddeler üst trofik düzeylerde **birikerek** artar.\n\n# Madde Döngüleri\n\n| Döngü | Ana süreçler |\n|---|---|\n| **Su** | Buharlaşma, terleme, yoğuşma, yağış, sızma, yüzey akışı |\n| **Karbon** | Fotosentez (CO₂ tutulur) ↔ solunum, ayrışma, **fosil yakıt yakma** (CO₂ salınır); okyanuslar ve kireçtaşı depo |\n| **Azot** | **Azot bağlama** (N₂ → NH₃: *Rhizobium*, siyanobakteri, yıldırım) → **nitrifikasyon** (NH₃ → NO₂⁻ → NO₃⁻) → bitkilerce alım → **amonifikasyon** (ölü maddeden NH₃) → **denitrifikasyon** (NO₃⁻ → N₂) |\n| **Fosfor** | Atmosfer evresi yok; kayaçların aşınması → toprak/su → canlılar → çökelme |\n\n> Madde **döngüsel**, enerji **tek yönlü**dür.",
     "ornekler": [
      {
       "soru": "Bir besin zincirinde üreticilerde 10 000 kJ enerji varsa üçüncül tüketiciye ne kadar ulaşır?",
       "cozum": "Her basamakta ~%10: birincil tüketici 1000, ikincil 100, **üçüncül tüketici ~10 kJ**."
      },
      {
       "soru": "Azot döngüsünde ayrıştırıcıların rolü nedir?",
       "cozum": "Ölü organizma ve atıklardaki organik azotu **amonyağa** dönüştürürler (**amonifikasyon**); böylece azot yeniden **nitrifikasyonla** bitkilerin kullanabileceği nitrata dönüşebilir."
      }
     ],
     "ozet": [
      "Enerji tek yönlü, %10 kuralı; madde döngüsel.",
      "Biyolojik birikim üst düzeylerde artar.",
      "Azot: bağlama, nitrifikasyon, amonifikasyon, denitrifikasyon."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Çevre sorunları ve koruma",
     "en": "Environmental problems and conservation"
    },
    "content": {
     "anlatim": "# Başlıca Çevre Sorunları\n\n| Sorun | Neden | Sonuç |\n|---|---|---|\n| **Küresel ısınma** | Sera gazları (CO₂, CH₄, N₂O) | İklim değişikliği, buzul erimesi, kuraklık |\n| **Hava kirliliği** | Fosil yakıt, sanayi, trafik | Solunum hastalıkları, **asit yağmuru** (SO₂, NOₓ) |\n| **Ozon incelmesi** | **CFC**'ler | UV artışı, cilt kanseri — Montreal Protokolü (1987) ile iyileşme |\n| **Su kirliliği** | Atık su, gübre | **Ötrofikasyon**: aşırı alg çoğalması → O₂ azalır → canlı ölümleri |\n| **Toprak kirliliği ve erozyon** | Pestisit, ağır metal, yanlış tarım | Verim kaybı, çölleşme |\n| **Habitat kaybı** | Ormansızlaşma, kentleşme | **Biyoçeşitlilik kaybı**, tür yok oluşu |\n| **İstilacı türler** | İnsanla taşınan yabancı türler | Yerli türlerin baskılanması (aslan balığı) |\n| **Plastik ve mikroplastik** | Tek kullanımlık plastikler | Besin zincirinde birikim |\n\n# Biyoçeşitlilik ve Koruma\n\n- **Biyoçeşitlilik:** Genetik, tür ve ekosistem çeşitliliği. Türkiye, Avrupa ve Orta Doğu'da **endemik** tür bakımından en zengin ülkelerdendir (yaklaşık 3000'den fazla endemik bitki türü).\n- **Koruma stratejileri:** **Millî parklar**, tabiat parkları, **Ramsar** alanları, **gen bankaları** (Türkiye Tohum Gen Bankası), yerinde (in situ) ve yer dışında (ex situ) koruma, **CITES** (nesli tehlikedeki türlerin ticareti).\n- **Sürdürülebilirlik:** Yenilenebilir enerji, geri dönüşüm, ekolojik ayak izini azaltma, organik tarım, bilinçli tüketim.",
     "ornekler": [
      {
       "soru": "Tarlalarda aşırı gübre kullanımı göllerde canlı ölümlerine nasıl yol açar?",
       "cozum": "Yıkanan azot ve fosfor göle ulaşır, **alg patlaması** olur (**ötrofikasyon**). Algler ölünce ayrıştırıcılar onları parçalarken **oksijeni tüketir**; O₂ azalınca balık ve diğer canlılar ölür."
      }
     ],
     "ozet": [
      "Küresel ısınma, asit yağmuru, ozon incelmesi, ötrofikasyon.",
      "Biyoçeşitlilik: genetik, tür, ekosistem; Türkiye endemik türce zengin.",
      "Koruma: millî park, gen bankası, CITES, sürdürülebilirlik."
     ]
    }
   }
  ]
 }
];

/* KAMPUSAI ENRICHMENT 1.64 — generated by tools/apply-enrichment.mjs */
(function(){ const additions=[
  {
    "key": "12/biyoloji",
    "unit": "u1",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-031",
      "code": "EK.12.031",
      "title": {
        "tr": "Çift zincirli DNA’da bağ hesabı",
        "en": "Count bonds in double-stranded DNA"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Çift zincirli DNA’da bağ hesabı\n\nÇift zincirli DNA toplamında A=T ve G=C; tek zincirde bu eşitlik zorunlu değildir. Baz çifti sayısı toplam nükleotidin yarısıdır. A–T çifti iki, G–C çifti üç hidrojen bağı kurar. Fosfodiester bağları aynı zincirde komşu nükleotidleri bağlar; hidrojen bağıyla karıştırma. Doğrusal ve halkasal DNA’nın omurga bağ hesabı farklıdır; uçların varlığını belirt.\n\n### Kontrol ederek öğren\n\n100 baz çiftinde 40 G–C çifti varsa hidrojen bağı?\n\n**Çözüm yolu:** 40×3+60×2=240; toplam 200 nükleotit vardır.\n\n### Dikkat noktaları\n\n- Toplamda A=T, G=C.\n- Baz çifti toplam nükleotidin yarısı.\n- Doğrusal/halkasal farkına dikkat.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361)",
        "ornekler": [
          {
            "soru": "100 baz çiftinde 40 G–C çifti varsa hidrojen bağı?",
            "cozum": "40×3+60×2=240; toplam 200 nükleotit vardır."
          }
        ],
        "ozet": [
          "Toplamda A=T, G=C.",
          "Baz çifti toplam nükleotidin yarısı.",
          "Doğrusal/halkasal farkına dikkat."
        ]
      }
    }
  },
  {
    "key": "12/biyoloji",
    "unit": "u1",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-032",
      "code": "EK.12.032",
      "title": {
        "tr": "PCR’da kontrol ve kontaminasyon",
        "en": "PCR controls and contamination"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## PCR’da kontrol ve kontaminasyon\n\nPCR belirli DNA bölgesini primerler ve ısıya dayanıklı polimerazla çoğaltır. Zincirler ayrılır, primer bağlanır, yeni zincir uzatılır. İdeal ikiye katlanma tam verim varsayımıdır; gerçek verim farklıdır. Negatif kontrol kirlenmeyi, pozitif kontrol işlemin çalışmasını sınar. PCR sinyali tek başına canlının canlı olduğunu veya hastalık şiddetini göstermez; uzman laboratuvar yorumu gerekir.\n\n### Kontrol ederek öğren\n\n2 başlangıç molekülü ideal 3 döngü sonra kaç olur?\n\n**Çözüm yolu:** 2×2³=16; tam verim varsayımıyla.\n\n### Dikkat noktaları\n\n- Primer hedefi sınırlar.\n- Negatif kontrol kirlenmeyi sınar.\n- İdeal artış gerçek verim değildir.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361)",
        "ornekler": [
          {
            "soru": "2 başlangıç molekülü ideal 3 döngü sonra kaç olur?",
            "cozum": "2×2³=16; tam verim varsayımıyla."
          }
        ],
        "ozet": [
          "Primer hedefi sınırlar.",
          "Negatif kontrol kirlenmeyi sınar.",
          "İdeal artış gerçek verim değildir."
        ]
      }
    }
  },
  {
    "key": "12/biyoloji",
    "unit": "u2",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-033",
      "code": "EK.12.033",
      "title": {
        "tr": "Fotosentezde sınırlayıcı etmen",
        "en": "Limiting factors in photosynthesis"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Fotosentezde sınırlayıcı etmen\n\nFotosentezi ışık, CO₂, sıcaklık ve su birlikte etkiler. Birini artırmak başka etmen sınırlayıcı olunca hızı artırmayabilir. Doygunlukta yataylaşma durma değildir. Sıcaklık sürekli arttıkça hız sürekli artmaz; enzimler etkilenir. Kabarcık sayısı gaz hacminin yaklaşık göstergesidir; büyüklük ve solunum etkiler. Diğer koşulları sabitle, tekrarlı ölçüm yap, belirsizliği belirt.\n\n### Kontrol ederek öğren\n\nIşık artarken hız sabitleniyorsa ne çıkarılabilir?\n\n**Çözüm yolu:** Işık tek sınırlayıcı olmaktan çıkmış olabilir; diğer etmenler araştırılır.\n\n### Dikkat noktaları\n\n- Doygunluk durma değil.\n- Etmenler birlikte işler.\n- Yaklaşık ölçümün sınırını belirt.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361)",
        "ornekler": [
          {
            "soru": "Işık artarken hız sabitleniyorsa ne çıkarılabilir?",
            "cozum": "Işık tek sınırlayıcı olmaktan çıkmış olabilir; diğer etmenler araştırılır."
          }
        ],
        "ozet": [
          "Doygunluk durma değil.",
          "Etmenler birlikte işler.",
          "Yaklaşık ölçümün sınırını belirt."
        ]
      }
    }
  },
  {
    "key": "12/biyoloji",
    "unit": "u3",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-034",
      "code": "EK.12.034",
      "title": {
        "tr": "Ksilem, floem ve kaynak–havuz",
        "en": "Xylem, phloem and source-sink transport"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Ksilem, floem ve kaynak–havuz\n\nKsilem su-mineral, floem organik madde taşır. Floemde kaynak üreten/sağlayan, havuz tüketen/depolayan dokudur; organın rolü gelişime göre değişebilir. Ayrı iletim elemanlarında farklı yönler olabilir. Stoma kapanması su kaybını azaltırken CO₂ girişini de sınırlayabilir. Taşınmayı yalnız tek yönlü sabit bir şema gibi ezberleme; koşulu, doku türünü ve taşınan maddeyi birlikte değerlendir.\n\n### Kontrol ederek öğren\n\nÇimlenen tohumda depo doku kaynak mı havuz mu?\n\n**Çözüm yolu:** Besini büyüyen dokuya verdiği dönemde kaynak; büyüyen doku havuzdur.\n\n### Dikkat noktaları\n\n- Kaynak/havuz işlevsel tanım.\n- Ksilem ve floemin yükü farklı.\n- Stoma su–CO₂ dengesini etkiler.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361)",
        "ornekler": [
          {
            "soru": "Çimlenen tohumda depo doku kaynak mı havuz mu?",
            "cozum": "Besini büyüyen dokuya verdiği dönemde kaynak; büyüyen doku havuzdur."
          }
        ],
        "ozet": [
          "Kaynak/havuz işlevsel tanım.",
          "Ksilem ve floemin yükü farklı.",
          "Stoma su–CO₂ dengesini etkiler."
        ]
      }
    }
  },
  {
    "key": "12/biyoloji",
    "unit": "u4",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-035",
      "code": "EK.12.035",
      "title": {
        "tr": "Taşıma kapasitesi ve popülasyon grafiği",
        "en": "Carrying capacity and graphs"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Taşıma kapasitesi ve popülasyon grafiği\n\nTaşıma kapasitesi belirli çevrede sürdürülebilen büyüklüktür; evrensel sabit değildir. Kaynak, habitat ve etkileşimler değişince kapasite değişebilir. Lojistik büyüme ideal modeldir; gerçek sistemde göç, gecikme ve mevsim etkileri vardır. Denge bütün bireylerin aynı yaşta olduğunu göstermez. Mutlak ve birey başına artışı ayır; popülasyonları yalnız eğim büyüklüğüyle karşılaştırma.\n\n### Kontrol ederek öğren\n\nKaynaklar kalıcı azalınca kapasite nasıl etkilenebilir?\n\n**Çözüm yolu:** Diğer koşullar sabitse düşebilir; dengeye geçiş gecikmeli olabilir.\n\n### Dikkat noktaları\n\n- Kapasite çevreye bağlı.\n- Lojistik model idealleştirme.\n- Mutlak/birey başı artışı ayır.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=361)",
        "ornekler": [
          {
            "soru": "Kaynaklar kalıcı azalınca kapasite nasıl etkilenebilir?",
            "cozum": "Diğer koşullar sabitse düşebilir; dengeye geçiş gecikmeli olabilir."
          }
        ],
        "ozet": [
          "Kapasite çevreye bağlı.",
          "Lojistik model idealleştirme.",
          "Mutlak/birey başı artışı ayır."
        ]
      }
    }
  }
]; additions.forEach(({key,unit,unitName,lesson})=>{const units=App.data.content[key];let u=units.find(x=>x.id===unit);if(!u){u={id:unit,name:{tr:unitName,en:unitName},outcomes:[]};const at=units.findIndex(x=>/^u/.test(x.id)||(/^t/.test(x.id)&&Number(x.id.slice(1))>Number(unit.slice(1))));if(at<0)units.push(u);else units.splice(at,0,u);}u.outcomes.push(lesson);}); })();
