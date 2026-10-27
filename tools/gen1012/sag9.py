# -*- coding: utf-8 -*-
r"""9. Sınıf Sağlık Bilgisi ve Trafik Kültürü → js/data/content/sag-9.js
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır.
Sağlıkla ilgili bilgiler genel eğitim amaçlıdır; tıbbi tavsiye yerine geçmez."""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Sağlıklı Yaşam", "Unit 1: Healthy Living", [
O("k1", "SBT.E1", "Sağlık kavramı, dengeli beslenme ve fiziksel etkinlik", "Health, balanced diet and physical activity", r"""
# Sağlık Nedir?
Dünya Sağlık Örgütü'ne göre sağlık yalnızca hastalık ya da sakatlığın olmaması değil; **bedensel, ruhsal ve sosyal** yönden tam bir **iyi olma** hâlidir. Sağlığı kalıtım, çevre, yaşam biçimi ve sağlık hizmetlerine erişim birlikte belirler; bunlar içinde kişinin en çok etkileyebildiği **yaşam biçimidir**.

# Dengeli Beslenme
Vücudun ihtiyaç duyduğu besin öğelerini (karbonhidrat, protein, yağ, vitamin, mineral ve su) **yeterli ve dengeli** almaktır.
- Her öğünde farklı besin gruplarından yiyecekler bulunmalı: tahıllar; sebze ve meyveler; süt ve süt ürünleri; et, yumurta ve baklagiller.
- **Kahvaltı** atlanmamalı; günde yaklaşık 2–2,5 litre su içilmeli.
- Şekerli içecekler, aşırı tuz ve işlenmiş gıdalar sınırlanmalı; **gıda etiketleri** (enerji, şeker, tuz, katkı maddeleri, son kullanma tarihi) okunmalıdır.
- **Beden kütle indeksi:** $BKİ = \dfrac{\text{kütle (kg)}}{\text{boy}^2\ (\text{m}^2)}$. Ergenlerde yaşa ve cinsiyete göre büyüme eğrileriyle değerlendirilir.

# Fiziksel Etkinlik ve Uyku
- Gençler için her gün toplam en az **60 dakika** orta–yüksek şiddette hareket önerilir; uzun süreli oturma aralıklarla bölünmelidir.
- Ergenlikte gecede **8–10 saat** düzenli uyku büyümeyi, öğrenmeyi ve ruh sağlığını destekler; yatmadan önce ekran kullanımı uykuyu bozar.

# Kişisel Hijyen
El yıkama (en az 20 saniye sabunla), ağız ve diş sağlığı (günde iki kez fırçalama), düzenli banyo; kişisel eşyaların (havlu, tıraş bıçağı) ortak kullanılmaması.
""",
 [(r"Boyu 1,70 m, kütlesi 65 kg olan bir gencin beden kütle indeksi yaklaşık kaçtır?", r"$BKİ = \dfrac{65}{1{,}70^2} = \dfrac{65}{2{,}89} \approx $ **22,5**."),
  (r"Sağlığı belirleyen etkenlerden kişinin en çok değiştirebildiği hangisidir?", r"**Yaşam biçimi** (beslenme, hareket, uyku, zararlı alışkanlıklardan uzak durma).")],
 [r"Sağlık bedensel, ruhsal ve sosyal iyi olma hâlidir.", r"Dengeli beslenme tüm besin gruplarını içerir; etiket okunmalıdır.",
  r"Gençlere günde en az 60 dakika hareket ve 8–10 saat uyku önerilir.", r"El hijyeni en az 20 saniye sabunla yapılır."]),
O("k2", "SBT.E2", "Bağımlılıklar ve ruh sağlığını koruma", "Addictions and protecting mental health", r"""
# Bağımlılık
Bir madde ya da davranışa karşı, zarar verdiği bilinmesine rağmen **kontrol edilemeyen istek** ve bırakıldığında yoksunluk belirtileri görülmesidir.
- **Madde bağımlılıkları:** Tütün ve elektronik sigara, alkol, uyuşturucu ve uyarıcı maddeler. Tütün dumanında binlerce zararlı kimyasal vardır; **pasif içicilik** de zararlıdır.
- **Davranışsal bağımlılıklar:** Dijital oyun, internet ve sosyal medya, kumar.
- **Risk etkenleri:** Merak, arkadaş baskısı, stresle başa çıkamama, kolay erişim. **Koruyucu etkenler:** aile desteği, hobi ve spor, sağlıklı arkadaş çevresi, **"hayır" diyebilme** becerisi.

# Ruh Sağlığını Koruma
- Duyguları tanımak ve ifade etmek, güvenilir biriyle konuşmak, düzenli uyku ve hareket, ekran süresini sınırlamak.
- **Akran zorbalığı** ve **siber zorbalık** karşısında susmamak: kanıtları saklamak, engellemek ve öğretmen, aile ya da okul rehberlik servisine bildirmek.
- Uzun süren mutsuzluk, umutsuzluk ya da kendine zarar verme düşüncelerinde **uzman desteği** almak önemlidir; ülkemizde acil durumlar için **112** aranabilir.
""",
 [(r"Arkadaşları tarafından sigara içmeye zorlanan bir gencin kullanabileceği bir beceri nedir?", r"**Hayır diyebilme (reddetme) becerisi**: kararlı ve açık bir dille reddetmek, ortamdan uzaklaşmak, destekleyici arkadaşlara yönelmek."),
  (r"Sosyal medyada zorbalığa uğrayan bir öğrenci ne yapmalıdır?", r"Kanıtları (ekran görüntüsü) saklamalı, kişiyi **engellemeli**, karşılık vermemeli ve durumu **aile, öğretmen ya da rehber öğretmene** bildirmelidir.")],
 [r"Bağımlılık: zarar bilinse de kontrol edilemeyen istek ve yoksunluk.", r"Koruyucu etkenler: aile desteği, spor, sağlıklı arkadaşlık, hayır diyebilme.",
  r"Zorbalıkta susulmaz; kanıt saklanır ve yetişkine bildirilir.", r"Uzun süren ruhsal sıkıntılarda uzman desteği alınmalıdır."]),
]),
U("u2", "2. Ünite: Hastalıklardan Korunma ve İlk Yardım", "Unit 2: Disease Prevention and First Aid", [
O("k1", "SBT.E3", "Bulaşıcı hastalıklar, aşılar ve korunma", "Infectious diseases, vaccines and prevention", r"""
# Bulaşma Yolları
- **Damlacık ve hava yoluyla:** Grip, kızamık, verem, COVID-19 (öksürme, hapşırma).
- **Temas yoluyla:** Bazı deri ve göz enfeksiyonları; kirli ellerin ağız, burun ve göze götürülmesi.
- **Su ve gıda yoluyla:** İshalli hastalıklar, hepatit A.
- **Kan ve vücut sıvılarıyla:** Hepatit B ve C, HIV.
- **Vektörlerle (canlı taşıyıcılar):** Sıtma (sivrisinek), Kırım-Kongo kanamalı ateşi (**kene**).

# Korunma
- **Aşılar** bağışıklık sistemini önceden tanıştırarak hastalığa karşı koruma sağlar; toplumun büyük bölümü aşılanınca hastalığın yayılması durur (**toplumsal bağışıklık**). Ulusal aşı takvimine uyulmalıdır.
- El hijyeni, öksürürken ağzı mendil ya da dirsek içiyle kapatmak, gıdaları iyi pişirmek ve temiz su kullanmak.
- **Antibiyotikler virüslere etki etmez**; gereksiz ve doktor önerisi dışında kullanım **antibiyotik direncine** yol açar.
- Kene tutunduğunda çıplak elle koparılmamalı, en kısa sürede sağlık kuruluşuna başvurulmalıdır.
""",
 [(r"Grip olan birine antibiyotik verilmesi neden doğru değildir?", r"Grip bir **virüs** hastalığıdır; antibiyotikler **bakterilere** etki eder. Gereksiz kullanım antibiyotik direncini artırır."),
  (r"Toplumsal bağışıklık nedir?", r"Toplumun büyük bölümü aşılandığında hastalığın yayılamaması; aşı olamayan bebek ve hastaların da dolaylı olarak korunmasıdır.")],
 [r"Bulaşma yolları: damlacık, temas, su–gıda, kan, vektörler.", r"Aşılar bireyi ve toplumu korur.",
  r"Antibiyotikler virüslere etki etmez.", r"Kene çıplak elle koparılmaz; sağlık kuruluşuna gidilir."]),
O("k2", "SBT.E4", "Temel ilk yardım", "Basic first aid", r"""
# İlk Yardımın Temel Uygulamaları (KBK)
1. **Koruma:** Olay yerinde kendinin ve hastanın güvenliğini sağla (trafikte uyarı işareti, elektrik akımını kes).
2. **Bildirme:** **112**'yi ara; olay yerini, ne olduğunu, yaralı sayısını ve durumunu açık ve sakin biçimde bildir; görevli kapatmadan telefonu kapatma.
3. **Kurtarma:** Bilinç ve solunumu değerlendir; bildiğin ve güvenli olan müdahaleyi yap.

# Sık Karşılaşılan Durumlar
- **Bilinç kaybı, solunum var:** Hastayı **koma pozisyonuna** (yan yatış) getir, solunumu izle.
- **Solunum yok:** 112'yi ara ve eğitimliysen göğüs basısına başla (göğüs kemiğinin alt yarısına, dakikada 100–120 bası).
- **Kanama:** Temiz bir bezle yaraya **doğrudan baskı** uygula; yaralı bölgeyi mümkünse yukarı kaldır.
- **Yanık:** Yanan bölgeyi **en az 10–20 dakika** temiz, ılık–serin akan su altında tut; buz, diş macunu, yoğurt sürme; su toplamış kabarcıkları patlatma.
- **Yabancı cisimle hava yolu tıkanması:** Kişi öksürebiliyorsa öksürmeye teşvik et; konuşamıyor ve nefes alamıyorsa sırtına 5 kez vur, ardından karına bası (**Heimlich**) uygula.
- **Kırık şüphesi:** Bölgeyi hareket ettirmeden sabitle.

> İlk yardım bir **eğitim** konusudur; okulda ve yetkili kurumlarda uygulamalı ilk yardım kursu alınması önerilir.
""",
 [(r"Elini kaynar suyla yakan bir arkadaşınıza ilk olarak ne yaparsınız?", r"Yanan bölgeyi **10–20 dakika ılık–serin akan su** altında tutarım; buz, diş macunu ya da yoğurt sürmem, kabarcıkları patlatmam. Yanık büyükse **112**'yi ararım."),
  (r"112 aranırken hangi bilgiler verilmelidir?", r"**Olay yeri adresi**, ne olduğu, **yaralı sayısı** ve durumu, arayanın adı ve telefonu; görevli kapatmadan telefon kapatılmaz.")],
 [r"İlk yardımın temeli Koruma–Bildirme–Kurtarma'dır.", r"Bilinci kapalı ama soluyan hasta koma pozisyonuna alınır.",
  r"Kanamada doğrudan baskı; yanıkta 10–20 dakika akan su.", r"Hava yolu tıkanmasında sırta vurma ve Heimlich uygulanır."]),
]),
U("u3", "3. Ünite: Trafik Kültürü ve Güvenliği", "Unit 3: Traffic Culture and Safety", [
O("k1", "SBT.E5", "Trafik kuralları, yaya ve yolcu güvenliği", "Traffic rules, pedestrian and passenger safety", r"""
# Trafik ve Trafik Kültürü
Trafik; yayaların, yolcuların, sürücülerin ve araçların karayolları üzerindeki hâl ve hareketleridir. **Trafik kültürü**, kurallara yalnızca ceza korkusuyla değil **saygı ve sorumluluk** bilinciyle uyulmasıdır. Kazaların büyük çoğunluğu **insan hatası** kaynaklıdır (hız, dikkatsizlik, kurallara uymama).

# Yaya Güvenliği
- **Yaya geçidi**, alt ve üst geçitler kullanılmalı; ışıklı geçitte yayaya yeşil yanmadan karşıya geçilmemeli.
- Geçmeden önce **sola, sağa, tekrar sola** bakılmalı; park etmiş araçların arasından çıkılmamalı.
- Kaldırımı olmayan yolda **taşıtların geliş yönüne karşı** (sol kenardan) yürünmeli; gece açık renkli ya da **yansıtıcı** giysiler giyilmeli.
- Yürürken telefon ve kulaklık dikkati dağıtır.

# Yolcu Güvenliği
- Araçta **ön ve arka koltukta emniyet kemeri** takılmalı; 135 cm altındaki çocuklar uygun **çocuk koltuğunda** taşınmalı.
- Okul servisinde ayakta durulmamalı, araç tam durmadan inilmemeli, araçtan **kaldırım tarafından** inilmelidir.

# Bisiklet ve Scooter
**Kask**, gece ışık ve yansıtıcı kullanılmalı; yolun sağından, araç trafiği yönünde gidilmeli; aynı anda iki kişi binilmemeli.

# Trafik İşaretleri
| Biçim | Anlam |
|---|---|
| Üçgen (kırmızı kenarlı) | **Tehlike uyarı** işaretleri |
| Daire (kırmızı kenarlı) | **Yasaklama ve kısıtlama** |
| Daire (mavi zemin) | **Mecburiyet** |
| Dikdörtgen/kare (mavi) | **Bilgi** işaretleri |
| Sekizgen "DUR" | Durup yol vermek zorunlu |
""",
 [(r"Kaldırımı olmayan bir köy yolunda yaya hangi taraftan yürümelidir? Neden?", r"**Taşıtların geliş yönüne karşı** (sol kenardan) yürümelidir; böylece karşıdan gelen araçları görür ve tehlikeye zamanında tepki verir."),
  (r"Kırmızı kenarlı üçgen biçimli trafik işaretleri ne anlama gelir?", r"**Tehlike uyarı** işaretleridir (keskin viraj, okul geçidi, kaygan yol gibi).")],
 [r"Trafik kazalarının çoğu insan hatası kaynaklıdır.", r"Yaya geçidi kullanılır; geçmeden önce sol–sağ–sol bakılır.",
  r"Tüm koltuklarda emniyet kemeri; çocuklar uygun koltukta.", r"Üçgen: tehlike; kırmızı daire: yasak; mavi daire: mecburiyet; mavi dikdörtgen: bilgi."]),
]),
]

write("sag-9.js", "9/saglik", "9. Sınıf Sağlık Bilgisi ve Trafik Kültürü — konu anlatım notları",
      "KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı. Sağlık bilgileri genel eğitim amaçlıdır.", units)
