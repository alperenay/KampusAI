# -*- coding: utf-8 -*-
r"""10. Sınıf Tarih — 1.36.0: Maarif kodları (TAR.10.1.1–TAR.10.3.5), her kazanıma ikinci çözümlü örnek ve kısa
anlatımların genişletilmesi. Programın 14 öğrenme çıktısı mevcut 17 kazanımla eksiksiz karşılanıyor.
Kaynak: MEB Tarih Dersi Öğretim Programı (2024) 10. sınıf öğrenme çıktıları."""

KOD = {
    "u1/k1": "TAR.10.1.1", "u1/k2": "TAR.10.1.1", "u1/k3": "TAR.10.1.2", "u1/k4": "TAR.10.1.3", "u1/k5": "TAR.10.1.4",
    "u2/k1": "TAR.10.2.1", "u2/k2": "TAR.10.2.2", "u2/k3": "TAR.10.2.2", "u2/k4": "TAR.10.2.3", "u2/k5": "TAR.10.2.4",
    "u2/k6": "TAR.10.2.5",
    "u3/k1": "TAR.10.3.1", "u3/k2": "TAR.10.3.1", "u3/k3": "TAR.10.3.2", "u3/k4": "TAR.10.3.3", "u3/k5": "TAR.10.3.4",
    "u3/k6": "TAR.10.3.5",
}

ANLATIM = {
"u2/k1": r"""
# Görüşleri Değerlendirmek
Tarihçilerin görüşlerini tartışırken şu sorular sorulur: *Hangi kaynaklara dayanıyor? Döneminin hangi düşünce akımlarından etkilenmiş? Hangi olguları açıklıyor, hangilerini açıklayamıyor?*
- **Gaza tezi**, Osmanlı'nın hızlı genişlemesini açıklasa da Osmanlı'nın Hristiyan tebaayla kurduğu **iş birliğini** ve **istimalet** politikasını yeterince açıklayamaz.
- **İnalcık** ve **Köprülü**'nün görüşleri ise Osmanlı'yı Anadolu Türk tarihinin bir **devamı** olarak görür; Bizans'ın zayıflığı, Moğol baskısıyla batıya gelen Türkmen nüfusu ve **uç beyliği** olmanın getirdiği fırsatları birlikte değerlendirir.
""",
"u2/k5": r"""
# Kalıcılığın Diğer Araçları
- **Tahrir defterleri:** Fethedilen bölgelerin nüfusu, toprağı ve gelirleri kayda geçirilerek **adil bir vergi** düzeni kuruldu.
- **Vergi kolaylığı:** Halk, feodal beylere ödediği ağır vergiler yerine **cizye** ve düzenli vergilerle yükümlü tutuldu.
- **Yerel yöneticilerin korunması:** Bazı Hristiyan beylere **tımar** verilerek yönetime katılmaları sağlandı.
- **Sürgün yöntemi:** Gerektiğinde Rumeli'den Anadolu'ya ya da tersi yönde nüfus nakledilerek bölgeler dengelendi.
""",
"u2/k6": r"""
# Mekânın ve Kişilerin Etkisi
**Bursa** (ilk başkent), **Edirne** (Rumeli'ye açılan merkez) ve **İstanbul**, kurulan vakıf ve külliyelerle ilim merkezleri hâline geldi. **Ahilik** teşkilatı meslek eğitimi ile ahlak eğitimini birleştirdi. Osmanlı ilim geleneğinde **akli ve nakli ilimler** birlikte okutuldu; **Molla Fenârî** (ilk şeyhülislam) bu geleneğin önemli temsilcilerindendir. Fetihten sonra İstanbul'a Semerkant'tan gelen **Ali Kuşçu** astronomi ve matematik çalışmalarıyla medreselere katkı sağladı.
""",
"u3/k3": r"""
# Merkezî Yönetimin Güçlenmesi ve Devşirme
Fatih döneminde **devşirme kökenli** yöneticiler sadrazamlık gibi üst görevlere getirildi; böylece köklü Türk ailelerinin (Çandarlılar gibi) güç dengesi değişti ve padişahın otoritesi güçlendi. Kanuni döneminde **kanunnameler** ile yönetim kuralları sistemleştirildi. XVII. yüzyılda ise merkezde nüfuz mücadeleleri arttı; **Köprülüler** döneminde sadrazamların geniş yetkilerle düzeni yeniden kurmaya çalıştıkları görüldü.
""",
}

ORNEK = {
"u1/k1": [(r"Dandanakan (1040) ve Malazgirt (1071) savaşlarının Türk tarihine etkilerini benzerlik ve farklılıklarıyla karşılaştırınız.",
           r"**Benzerlik:** İkisi de Türklerin yeni bir coğrafyada **kalıcı hâkimiyetinin** kapısını açan zaferlerdir. **Farklılık:** Dandanakan, Gaznelileri yenerek **Büyük Selçuklu Devleti'ni kurdu** ve İran–Horasan'a hâkimiyet sağladı; Malazgirt ise Bizans'ı yenerek **Anadolu'nun kapılarını** açtı ve Anadolu'nun Türkleşme sürecini başlattı.")],
"u1/k2": [(r"Kösedağ Savaşı (1243) Anadolu'daki siyasi yapıyı nasıl değiştirmiştir?",
           r"Türkiye Selçukluları Moğollara yenilerek **İlhanlı (Moğol) hâkimiyetine** girdi; devletin merkezî otoritesi zayıfladı. Bu süreç, Anadolu'da **II. Beylikler Dönemi**'nin başlamasına ve uç bölgelerde **Osmanlı Beyliği** gibi yeni güçlerin ortaya çıkmasına zemin hazırladı.")],
"u1/k3": [(r"Selçuklularda \"gulam\" sisteminin kurulmasının nedenleri ve sonuçları nelerdir?",
           r"**Nedenler:** Merkezî otoriteyi güçlendirmek, boy beylerine bağlı olmayan, doğrudan sultana sadık **daimî bir ordu** kurmak. **Sonuçlar:** Sultanın gücü arttı; ancak zamanla gulam kökenli **atabeyler** güçlenerek bölgesel iktidarlar kurdu. Bu sistem Osmanlı'daki **kapıkulu** ve **devşirme** uygulamasının öncüsüdür.")],
"u1/k4": [(r"Selçuklu döneminde Anadolu'da kervansarayların yaygınlaşması ekonomik ve sosyal hayatı nasıl etkilemiştir?",
           r"Kervansaraylar ticaret yollarında **güvenli konaklama** sağladı; devletin tüccarlara **sigorta** benzeri güvence vermesiyle Anadolu, uluslararası ticaretin önemli bir **transit merkezi** oldu. Şehirler arası bağlantılar güçlendi, şehirler büyüdü ve **yerleşik hayat** yaygınlaştı.")],
"u1/k5": [(r"Kaşgarlı Mahmud'un Divanü Lügati't-Türk'ü yazmasının amacı nedir? Eser ortak insanlık mirasına nasıl katkı sağlar?",
           r"Araplara **Türkçeyi öğretmek** ve Türkçenin Arapça kadar zengin bir dil olduğunu göstermek amacıyla yazılmıştır. Türk boylarının dilleri, gelenekleri, coğrafyası ve atasözleri hakkında bilgi veren **ilk Türkçe sözlük** olması ve içindeki **dünya haritası** nedeniyle dil bilimi, tarih ve coğrafyaya katkı sağlar.")],
"u2/k1": [(r"Fuat Köprülü'nün görüşü Gibbons'un tezine nasıl bir cevap niteliği taşır?",
           r"Gibbons, Osmanlı'yı Hristiyanlıktan dönmüş Rumların kurduğu **\"yeni bir ırk\"** olarak görmüştür. Köprülü ise Osmanlı'nın **Türk tarihinin bir devamı** olduğunu; Oğuz boyları, Selçuklu kurumları ve Anadolu Türk kültürüyle bağlantısını belgelere dayanarak göstermiştir. Bu nedenle Köprülü'nün görüşü Gibbons'un tezinin **bilimsel bir eleştirisidir**.")],
"u2/k2": [(r"I. Kosova Savaşı (1389) ile Ankara Savaşı (1402) Osmanlı'nın Balkan ve Anadolu politikasını nasıl etkilemiştir?",
           r"**I. Kosova:** Balkan devletlerinin oluşturduğu ittifak yenildi; Osmanlı'nın **Balkanlardaki kalıcılığı** pekişti. **Ankara Savaşı:** Timur'a yenilen Osmanlı **Fetret Devri**'ne girdi; Anadolu birliği bozuldu, beylikler yeniden kuruldu. Ancak Rumeli'deki güçlü yapı sayesinde devlet yıkılmadı ve **Çelebi Mehmed** döneminde birlik yeniden sağlandı.")],
"u2/k3": [(r"İstanbul'un fethinde kullanılan askerî teknoloji ve stratejilere iki örnek veriniz.",
           r"1) **Şahi topları:** Macar usta Urban'a döktürülen dev toplar surları dövdü. 2) **Gemilerin karadan yürütülmesi:** Haliç'e zincir gerildiği için gemiler Kasımpaşa sırtlarından kızaklarla Haliç'e indirildi. Ayrıca **Rumeli Hisarı** ile Karadeniz'den gelecek yardım engellendi.")],
"u2/k4": [(r"Tımar sisteminin Osmanlı'nın beylikten devlete geçişine katkılarını ordu, ekonomi ve yönetim açısından açıklayınız.",
           r"**Ordu:** Hazineye yük olmadan büyük bir **atlı asker (tımarlı sipahi)** gücü sağladı. **Ekonomi:** Toprağın boş kalması önlendi, **üretim sürekliliği** sağlandı. **Yönetim:** Taşrada **güvenlik ve düzen** tımar sahipleri eliyle korundu, merkezî otorite taşraya ulaştı. Toprak devletin (miri) olduğu için feodal bir yapı oluşmadı.")],
"u2/k5": [(r"Osmanlı'nın Rumeli'ye Türkmen aşiretlerini yerleştirmesi ile gayrimüslimlere din özgürlüğü tanıması birbirinin zıddı mıdır? Açıklayınız.",
           r"Zıt değil, **birbirini tamamlayan** politikalardır. **İskân**, bölgeyi demografik ve ekonomik olarak güçlendirip güvenliği sağladı; **istimalet** ise yerli halkın gönlünü kazanarak isyanları önledi. İkisi birlikte Osmanlı'nın fethettiği topraklarda **kalıcı** olmasını sağladı.")],
"u2/k6": [(r"Osmanlı'da vakıfların ilim ve irfan geleneğine katkısı nedir?",
           r"Medreselerin, sıbyan mekteplerinin, kütüphanelerin ve imaretlerin **masrafları** vakıf gelirleriyle karşılandı; müderris ve öğrencilere **maaş ve burs** verildi. Böylece eğitim **ücretsiz** ve sürekli hâle geldi, ilim kurumları devlet bütçesine yük olmadan yaygınlaştı.")],
"u3/k1": [(r"Yavuz Sultan Selim'in Çaldıran (1514) ve Mercidabık (1516) savaşlarının sonuçlarını karşılaştırınız.",
           r"**Çaldıran:** Safevîler yenildi; **Doğu Anadolu**'da Osmanlı hâkimiyeti güçlendi, İpek Yolu'nun önemli bir kısmı kontrol altına alındı. **Mercidabık:** Memlûklar yenildi; **Suriye** alındı ve Mısır'ın yolu açıldı. Ardından Ridaniye ile **halifelik** Osmanlı'ya geçti, Baharat Yolu kontrol edildi.")],
"u3/k2": [(r"Preveze Deniz Savaşı (1538) Osmanlı'nın Akdeniz'deki konumunu nasıl etkilemiştir?",
           r"Barbaros Hayreddin Paşa komutasındaki Osmanlı donanması, Haçlı donanmasını yenerek **Akdeniz'de üstünlüğü** ele geçirdi; Akdeniz bir \"Türk gölü\" hâline geldi. Bu üstünlük, 1571 **İnebahtı** yenilgisine kadar tartışmasız sürdü.")],
"u3/k3": [(r"Kafes usulünün uygulanması Osmanlı padişahlarının yetişmesini ve devlet yönetimini nasıl etkilemiştir?",
           r"Şehzadeler sancakta **yönetim ve askerlik tecrübesi** kazanamadan sarayda yetişti; tahta çıkan padişahlar **tecrübesiz** oldu. Bu durum yönetimde **sadrazamların, valide sultanların** ve saray çevresinin etkisini artırdı; merkezî otorite zayıfladı.")],
"u3/k4": [(r"Avrupa'nın sömürgeci politikalarının Amerika ve Afrika yerli halkları üzerindeki etkilerini değerlendiriniz.",
           r"Amerika'da **Aztek ve İnka** gibi medeniyetler yıkıldı; savaşlar, zorla çalıştırma ve Avrupa'dan gelen salgın hastalıklarla yerli nüfus büyük oranda azaldı. Afrika'dan milyonlarca insan **köle ticaretiyle** zorla Amerika'ya taşındı. Değerli madenler ve hammaddeler Avrupa'ya aktarıldı; bu süreç sömürülen bölgelerde yüzyıllar süren **yoksulluk ve eşitsizliğe** yol açtı.")],
"u3/k5": [(r"Celalî isyanlarının nedenlerini ekonomik, askerî ve sosyal açıdan sınıflandırınız.",
           r"**Ekonomik:** Coğrafi keşiflerle ticaret yollarının değişmesi, **fiyat artışları (enflasyon)**, ağır vergiler. **Askerî:** Tımar sisteminin bozulması, savaşlarda kaçan askerlerin (firariler) cezalandırılmaktan korkması. **Sosyal:** Nüfus artışı, toprağını terk eden köylüler, medrese öğrencilerinin işsizliği (suhte). Sonuçta köylüler topraklarını bırakarak **Büyük Kaçgun** yaşandı.")],
"u3/k6": [(r"Klasik dönemde Osmanlı minyatür ve hat sanatı hangi işlevleri üstlenmiştir?",
           r"**Minyatür**, savaşları, sefer güzergâhlarını ve saray törenlerini **görsel bir tarih kaydı** olarak resmetti (ör. **Matrakçı Nasuh**'un şehir resimleri, **Nakkaş Osman**'ın eserleri). **Hat sanatı** ise Kur'an'ın, ferman ve kitabelerin **güzel yazıyla** yazılmasını sağladı; **Şeyh Hamdullah** ve **Ahmed Karahisarî** önemli hattatlardır.")],
}

OZET = {}
