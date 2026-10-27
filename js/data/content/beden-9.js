/* =========================================================
   9. Sınıf Beden Eğitimi ve Spor — kuramsal konu anlatımı
   Kaynak: KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/beden"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Sağlıklı Yaşam ve Hareket",
   "en": "Unit 1: Healthy Living and Movement"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "BES.E1",
    "title": {
     "tr": "Fiziksel uygunluk bileşenleri ve antrenman ilkeleri",
     "en": "Components of fitness and training principles"
    },
    "content": {
     "anlatim": "# Fiziksel Uygunluk\n\nGünlük işleri yorulmadan yapabilme ve boş zamanı etkin değerlendirebilme kapasitesidir.\n| Sağlıkla ilgili bileşen | Anlamı | Geliştiren etkinlik |\n|---|---|---|\n| **Kalp-solunum dayanıklılığı** | Uzun süre orta şiddette çalışabilme | Yürüyüş, koşu, yüzme, bisiklet |\n| **Kas kuvveti** | Bir kasın üretebildiği en büyük kuvvet | Ağırlık çalışmaları |\n| **Kas dayanıklılığı** | Kasın uzun süre tekrar yapabilmesi | Şınav, mekik, plank |\n| **Esneklik** | Eklemlerin hareket açıklığı | Germe (streç) çalışmaları |\n| **Vücut kompozisyonu** | Yağ ve yağsız doku oranı | Düzenli hareket + dengeli beslenme |\nBeceriyle ilgili bileşenler: **sürat, çeviklik, denge, koordinasyon, reaksiyon zamanı, güç**.\n\n# Antrenman İlkeleri\n\n- **Aşamalılık:** Yük kolaydan zora, azdan çoğa artırılır.\n- **Aşırı yükleme:** Gelişme için vücuda alışık olduğundan biraz fazla yük verilir.\n- **Süreklilik:** Düzenli yapılmayan çalışmanın kazanımları kaybolur.\n- **Bireysellik:** Her bireyin yaşı, düzeyi ve hedefi farklıdır.\n- **Dinlenme:** Toparlanma olmadan gelişme olmaz; aşırı yüklenme sakatlığa yol açar.\n\n# Isınma ve Soğuma\n\nHer etkinlikten önce 10–15 dakikalık **ısınma** (hafif koşu, eklem çevirmeleri, dinamik germe) kas ve eklemleri hazırlar, sakatlık riskini azaltır. Bitişte **soğuma** (yavaş yürüyüş, statik germe) nabzın kademeli düşmesini sağlar.",
     "ornekler": [
      {
       "soru": "Koşu performansını artırmak isteyen bir öğrenci her hafta koşu süresini biraz uzatıyor. Hangi antrenman ilkelerini uygulamaktadır?",
       "cozum": "**Aşamalılık** ve **aşırı yükleme** ilkelerini; düzenli koşuyorsa **süreklilik** ilkesini de uygular."
      },
      {
       "soru": "Esnekliği geliştirmek için hangi tür çalışma yapılır?",
       "cozum": "**Germe (streç)** çalışmaları; ısınmada dinamik, soğumada statik germe tercih edilir."
      }
     ],
     "ozet": [
      "Sağlıkla ilgili bileşenler: kalp-solunum dayanıklılığı, kas kuvveti ve dayanıklılığı, esneklik, vücut kompozisyonu.",
      "Antrenman ilkeleri: aşamalılık, aşırı yükleme, süreklilik, bireysellik, dinlenme.",
      "Isınma sakatlığı önler; soğuma nabzı kademeli düşürür."
     ]
    }
   },
   {
    "id": "k2",
    "code": "BES.E2",
    "title": {
     "tr": "Spor sakatlıkları, güvenlik ve fair play",
     "en": "Sports injuries, safety and fair play"
    },
    "content": {
     "anlatim": "# Sık Görülen Sakatlıklar\n\n- **Burkulma** (bağ zorlanması, ör. ayak bileği) ve **kas zorlanması**: İlk 48 saatte **RICE** yöntemi: **R**est (dinlenme), **I**ce (buz, 15–20 dk, bez üzerinden), **C**ompression (bandajla baskı), **E**levation (yükseltme).\n- **Kas krampı:** Kası nazikçe germe ve sıvı alımı.\n- **Burun kanaması:** Baş hafif **öne** eğilir, burun kanatları 10 dakika sıkılır (baş arkaya atılmaz).\n- Baş darbesi sonrası baş dönmesi, bulantı ya da bilinç bulanıklığı varsa etkinlik bırakılır ve sağlık kuruluşuna başvurulur.\n\n# Güvenli Spor\n\nUygun ayakkabı ve kıyafet, yeterli sıvı alımı (özellikle sıcak havada), koruyucu ekipman (kask, dizlik), uygun zemin ve öğretmen gözetimi.\n\n# Fair Play (Dürüst Oyun)\n\nKurallara uymak, rakibe, hakeme ve seyirciye **saygı** göstermek, kazanırken alçakgönüllü, kaybederken olgun olmak, **doping** gibi haksız yollara başvurmamaktır. Sporun karakter eğitimi ve **takım çalışması** boyutu, sonucu kadar önemlidir.\n\n# Türklerde Spor\n\nAtlı okçuluk, cirit, güreş ve **yağlı güreş** (Kırkpınar, dünyanın en eski düzenli spor organizasyonlarından), okçuluk (Okmeydanı) geleneksel Türk sporlarıdır. Türkiye ilk kez **1912 Stockholm** Olimpiyatlarına (Osmanlı) katıldı.",
     "ornekler": [
      {
       "soru": "Basketbolda ayak bileğini burkan bir arkadaşınıza hemen ne uygularsınız?",
       "cozum": "**RICE**: oyunu bırakıp dinlendirir, bez üzerinden **buz** uygular, **bandajla** hafif baskı yapar ve ayağı **yukarı kaldırırım**; ağrı ve şişlik artarsa sağlık kuruluşuna başvurulur."
      },
      {
       "soru": "Fair play neden yalnızca kurallara uymaktan daha geniş bir kavramdır?",
       "cozum": "Kurallara uymanın yanında **rakibe, hakeme ve seyirciye saygıyı**, haksız avantajdan kaçınmayı ve kazanma–kaybetme olgunluğunu da kapsar."
      }
     ],
     "ozet": [
      "Burkulma ve zorlanmalarda ilk 48 saat RICE uygulanır.",
      "Burun kanamasında baş öne eğilir.",
      "Fair play: kurallara uyma + saygı + dürüstlük.",
      "Yağlı güreş (Kırkpınar) köklü bir Türk sporudur."
     ]
    }
   }
  ]
 }
];
