/* =========================================================
   9. Sınıf Görsel Sanatlar — kuramsal konu anlatımı
   Kaynak: KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/gorsel"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Sanatın Dili",
   "en": "Unit 1: The Language of Art"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "GSA.E1",
    "title": {
     "tr": "Sanatın elemanları ve tasarım ilkeleri",
     "en": "Elements of art and principles of design"
    },
    "content": {
     "anlatim": "# Sanatın Elemanları\n\nBir sanat eserini oluşturan temel yapı taşlarıdır.\n- **Nokta ve çizgi:** Çizgi yön, hareket ve duygu taşır (dikey: denge, yükseklik; yatay: durgunluk; eğik: hareket).\n- **Biçim (şekil) ve form:** Biçim iki boyutlu, form üç boyutludur.\n- **Renk:** Ana renkler (kırmızı, sarı, mavi), ara renkler (turuncu, yeşil, mor); **sıcak** (kırmızı, sarı, turuncu) ve **soğuk** renkler (mavi, yeşil, mor); **tamamlayıcı (zıt)** renkler renk çemberinde karşılıklıdır (kırmızı–yeşil, mavi–turuncu, sarı–mor).\n- **Değer (ton):** Açıklık–koyuluk; ışık–gölge ile hacim etkisi verilir.\n- **Doku:** Yüzeyin gerçek ya da görsel pürüzlülüğü.\n- **Mekân (boşluk):** Perspektif ile derinlik yanılsaması oluşturulur.\n\n# Tasarım İlkeleri\n\n**Denge** (simetrik ya da asimetrik), **vurgu** (odak noktası), **ritim ve tekrar**, **oran–orantı**, **birlik (bütünlük)**, **zıtlık (kontrast)**, **çeşitlilik**. İyi bir kompozisyon, elemanların bu ilkelere göre düzenlenmesiyle oluşur.\n\n# Perspektif\n\n- **Tek kaçış noktalı:** Uzaklaşan paralel çizgiler ufuk çizgisindeki tek noktada birleşir (uzayan yol, koridor).\n- **İki kaçış noktalı:** Köşeden görülen binalar.\n- **Renk (hava) perspektifi:** Uzaktaki nesneler daha soluk ve mavimsi görünür.",
     "ornekler": [
      {
       "soru": "Kırmızının tamamlayıcı rengi nedir? Bu iki renk yan yana kullanıldığında nasıl bir etki oluşur?",
       "cozum": "**Yeşil**. Yan yana kullanıldıklarında birbirini **daha canlı** gösterir ve güçlü bir **zıtlık (kontrast)** oluşturur."
      },
      {
       "soru": "Bir resimde uzaktaki dağların soluk mavimsi çizilmesi hangi tekniktir?",
       "cozum": "**Renk (hava) perspektifi**."
      }
     ],
     "ozet": [
      "Sanatın elemanları: nokta, çizgi, biçim, form, renk, değer, doku, mekân.",
      "Tamamlayıcı renkler renk çemberinde karşılıklıdır.",
      "Tasarım ilkeleri: denge, vurgu, ritim, oran, birlik, zıtlık.",
      "Perspektif derinlik yanılsaması oluşturur."
     ]
    }
   },
   {
    "id": "k2",
    "code": "GSA.E2",
    "title": {
     "tr": "Sanat akımları ve Türk sanatından örnekler",
     "en": "Art movements and examples from Turkish art"
    },
    "content": {
     "anlatim": "# Başlıca Sanat Akımları\n\n| Akım | Dönem | Özellik | Temsilci |\n|---|---|---|---|\n| **Rönesans** | 15–16. yy | İnsan merkezli, perspektif, anatomi | Leonardo da Vinci, Michelangelo |\n| **Barok** | 17. yy | Hareket, ışık–gölge zıtlığı, dram | Rembrandt, Caravaggio |\n| **Romantizm** | 19. yy başı | Duygu, doğa, hayal gücü | Delacroix |\n| **Realizm** | 19. yy ortası | Günlük yaşam ve emekçiler, olduğu gibi | Courbet |\n| **Empresyonizm** | 19. yy sonu | Işığın anlık etkisi, açık havada resim, kısa fırça darbeleri | Monet, Renoir |\n| **Kübizm** | 20. yy başı | Nesneyi geometrik parçalara ayırma, çok bakış açısı | Picasso, Braque |\n| **Sürrealizm** | 20. yy | Bilinçaltı, rüya | Dalí, Magritte |\n| **Soyut sanat** | 20. yy | Gerçek nesneyi betimlemeden biçim ve renk | Kandinsky |\n\n# Türk Sanatı\n\n- **Geleneksel sanatlar:** **Hat** (güzel yazı), **tezhip** (altınla süsleme), **ebru** (su üzerinde boya ile desen; UNESCO listesinde), **minyatür** (perspektifsiz, iki boyutlu, anlatımcı resim — Matrakçı Nasuh, Levnî), **çini**, halı-kilim.\n- **Türk resmi:** **Osman Hamdi Bey** (Kaplumbağa Terbiyecisi; ilk arkeoloji müzesi), **Şeker Ahmet Paşa**, **İbrahim Çallı** (Çallı Kuşağı, Türk empresyonistleri), **Fikret Mualla**, **Bedri Rahmi Eyüboğlu** (halk motifleri), **Nejad Devrim** (soyut).",
     "ornekler": [
      {
       "soru": "Işığın gün içindeki değişimini aynı motifi farklı saatlerde resmederek yakalamaya çalışan akım hangisidir?",
       "cozum": "**Empresyonizm (izlenimcilik)**; örneğin Monet'nin aynı katedrali farklı saatlerde resmettiği dizi."
      },
      {
       "soru": "Perspektif kullanılmayan, iki boyutlu ve anlatımcı geleneksel resim sanatımız hangisidir?",
       "cozum": "**Minyatür** (temsilcileri Matrakçı Nasuh, Levnî)."
      }
     ],
     "ozet": [
      "Rönesans insan merkezli ve perspektifli; empresyonizm ışığın anlık etkisi; kübizm geometrik parçalama; sürrealizm bilinçaltı.",
      "Geleneksel Türk sanatları: hat, tezhip, ebru, minyatür, çini.",
      "Osman Hamdi Bey, İbrahim Çallı, Bedri Rahmi Eyüboğlu Türk resminin önemli adlarıdır."
     ]
    }
   }
  ]
 }
];
