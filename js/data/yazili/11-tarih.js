/* 11. Sınıf Tarih — Maarif Modeli açık uçlu yazılı sınavları (örnek). u1 Değişen Dünyada Osmanlı, u2 Dönüşüm Sürecinde Osmanlı, u3 Savaşlar Sarmalında Osmanlı */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/tarih"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Neden-sonuç", puan: 14,
        metin: r`1683 II. Viyana Kuşatması'nın başarısızlığından sonra Osmanlı 1699'da **Karlofça Antlaşması**'nı imzalamıştır.

**a)** Karlofça Antlaşması'nın Osmanlı için önemini iki maddeyle açıklayınız.
**b)** Bu dönemde Osmanlı'nın dış politikasında hangi değişim başlamıştır?`,
        cevap: r`**a)** Osmanlı ilk kez büyük çapta toprak kaybetti (Macaristan, Erdel, Mora, Podolya); Avrupa'daki ilerleyişi durdu ve Duraklama'dan Gerileme'ye geçiş başladı; Osmanlı'nın Avrupa karşısındaki üstünlüğü sona erdi.
**b)** Fetih politikası yerini kaybedilen toprakları geri alma ve savunmaya; diplomasi ve antlaşmalarla denge kurmaya bıraktı.`,
        olcut: [[14, "İki önem ve politika değişimi"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Antlaşma çözümleme", puan: 14,
        metin: r`1774 **Küçük Kaynarca Antlaşması** ile Kırım bağımsız oldu, Rusya Osmanlı'daki Ortodoksları koruma hakkı benzeri haklar elde etti, Osmanlı ilk kez savaş tazminatı ödedi.

Bu maddelerden her birinin Osmanlı'ya etkisini açıklayınız.`,
        cevap: r`- **Kırım'ın bağımsızlığı:** Nüfusunun çoğu Türk ve Müslüman olan bir toprak ilk kez kaybedildi (1783'te Rusya ilhak etti); Karadeniz bir Türk gölü olmaktan çıktı.
- **Ortodoksları koruma iddiası:** Rusya'ya Osmanlı iç işlerine karışma bahanesi verdi; Balkanlardaki milliyetçi isyanlara zemin hazırladı.
- **Savaş tazminatı:** Hazinenin zayıfladığını gösterir; mali sıkıntıları artırdı.
(Ayrıca halifeliğin siyasi bir araç olarak kullanılması, Rusya'nın Karadeniz'de ticaret serbestliği.)`,
        olcut: [[14, "Üç madde etkisiyle"], [9, "İki madde"], [4, "Bir madde"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Değişim ve süreklilik", puan: 14,
        metin: r`Lale Devri'nde (1718–1730) ilk Türk matbaası kurulmuş, Avrupa'ya geçici elçiler gönderilmiştir.

**a)** Lale Devri'ni önceki ıslahatlardan ayıran iki özelliği yazınız.
**b)** İbrahim Müteferrika matbaasının önemini açıklayınız.`,
        cevap: r`**a)** İlk kez Avrupa'nın üstünlüğü kabul edilerek Batı örnek alındı; ıslahatlar baskıyla değil kültür, sanat ve diplomasi alanlarında yapıldı; Avrupa'ya geçici elçiler gönderildi; barışçı bir politika izlendi.
**b)** Bilginin hızla, ucuza ve çok sayıda çoğaltılmasını sağladı; Türkçe kitaplar (sözlük, tarih, coğrafya) basıldı; Osmanlı'da yeni düşüncelerin yayılmasına katkı sağladı.`,
        olcut: [[14, "İki özellik ve matbaanın önemi"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Afet ve toplum", puan: 14,
        metin: r`1755 Lizbon depremi Avrupa'da düşünce hayatını sarsmış, 1766 İstanbul depremi de büyük yıkıma yol açmıştır.

Bu depremlerin toplumlar üzerindeki etkilerini karşılaştırınız. Afetlerin bilimsel düşünceye etkisine bir örnek veriniz.`,
        cevap: r`Lizbon depremi (ardından tsunami ve yangın) Avrupa'da kaderci anlayışları sorgulatmış, Voltaire gibi Aydınlanma düşünürlerinin eserlerine konu olmuş; deprem incelemeleri ve yeniden yapılanmada planlı şehircilik (Pombal binaları) önem kazanmıştır. 1766 İstanbul depremi cami, sur ve çeşmeleri yıkmış; devlet büyük onarım ve yeniden yapım faaliyetleri başlatmıştır.

Bilimsel etki: Lizbon depreminden sonra tanıklıklardan veri toplanması sismolojinin doğuşuna katkı sağlamıştır; depreme dayanıklı yapı teknikleri gelişmiştir.`,
        olcut: [[14, "Karşılaştırma ve bilimsel etki örneği"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Küresel süreçler", puan: 14,
        metin: r`Sanayi Devrimi 18. yüzyılda İngiltere'de başlamıştır.

**a)** Sanayi Devrimi'nin İngiltere'de başlamasının iki nedenini yazınız.
**b)** Osmanlı ekonomisine iki etkisini açıklayınız.`,
        cevap: r`**a)** Sömürgelerden elde edilen sermaye ve ham madde; zengin kömür ve demir yatakları; buhar makinesinin icadı; siyasi istikrar ve girişimci burjuvazi; deniz ticareti ve pazar olanakları.
**b)** Avrupa'nın ucuz fabrika ürünleri Osmanlı pazarını doldurdu, yerli el tezgâhları (loncalar) rekabet edemeyip geriledi; Osmanlı ham madde satan ve mamul ürün alan bir pazara dönüştü; dış ticaret açığı arttı.`,
        olcut: [[14, "İki neden ve iki etki"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Fikir akımlarının etkisi", puan: 15,
        metin: r`1789 Fransız İhtilali'nin yaydığı fikirler 19. yüzyılda çok uluslu imparatorlukları derinden etkilemiştir.

**a)** İhtilalin yaydığı üç fikri yazınız.
**b)** Milliyetçilik akımının Osmanlı Devleti'ne etkisini bir örnekle açıklayınız.`,
        cevap: r`**a)** Milliyetçilik, eşitlik, özgürlük, adalet, insan hakları, demokrasi, laiklik.
**b)** Osmanlı farklı milletlerden oluştuğu için milliyetçilik ayrılıkçı isyanlara yol açtı. Örnek: Sırp İsyanı (1804) ile Sırbistan'ın özerklik kazanması; Yunan İsyanı sonucu Yunanistan'ın bağımsızlığı (1830). Bu isyanlar Osmanlı'yı toprak kaybına ve Osmanlıcılık gibi birlik politikalarına yöneltti.`,
        olcut: [[15, "Üç fikir ve örnekli etki"], [10, "Üç fikir ve örneksiz etki ya da iki fikir ve örnek"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Askerî ıslahatlar", puan: 15,
        metin: r`III. Selim **Nizam-ı Cedit** ordusunu kurmuş, II. Mahmut **Yeniçeri Ocağı'nı kaldırmıştır** (1826).

**a)** Nizam-ı Cedit'in kaldırılmasının nedenini yazınız.
**b)** Yeniçeri Ocağı'nın kaldırılmasının, sonraki ıslahatlar için neden önemli olduğunu açıklayınız.`,
        cevap: r`**a)** Yeni ordu ve ıslahatlar yeniçerilerin ve çıkarları zarar gören çevrelerin tepkisini çekti; Kabakçı Mustafa İsyanı (1807) ile Nizam-ı Cedit kaldırıldı ve III. Selim tahttan indirildi.
**b)** Yeniçeriler uzun süredir ıslahatlara karşı en güçlü direnç odağıydı. Ocağın kaldırılmasıyla (Vaka-i Hayriye) ıslahatların önündeki büyük engel ortadan kalktı; Asakir-i Mansure-i Muhammediye kuruldu ve eğitim, yönetim, hukuk alanlarında köklü ıslahatlar yapılabildi.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Belge yorumlama", puan: 14,
        metin: r`1839 Tanzimat Fermanı'nda: "Ehl-i İslam ve milel-i saireden olan tebaamıza bu müsaadat-ı şahanemiz bilaistisna şamil olacaktır." (Müslüman ve gayrimüslim bütün halkımız bu haklardan istisnasız yararlanacaktır.)

**a)** Bu ifade hangi ilkeyi vurgular?
**b)** Tanzimat Fermanı'nın Türk hukuk tarihindeki önemini iki maddeyle açıklayınız.`,
        cevap: r`**a)** Kanun önünde eşitlik (din ayrımı gözetmeksizin bütün halkın aynı haklardan yararlanması).
**b)** Padişah kendi yetkilerini ilk kez kanunla sınırlamayı kabul etti (hukukun üstünlüğü); can, mal ve namus güvenliği güvence altına alındı; yargılamasız ceza verilmeyeceği belirtildi; Türk demokrasi tarihinin ilk adımlarından sayılır; vergilerin gelire göre alınması.`,
        olcut: [[14, "İlke ve iki önem"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Anayasal gelişmeler", puan: 14,
        metin: r`1876'da Kanun-i Esasi ilan edilerek I. Meşrutiyet başlamış; ancak 1877–78 Osmanlı-Rus Savaşı (93 Harbi) gerekçe gösterilerek meclis kapatılmıştır.

**a)** I. Meşrutiyet'in önemini yazınız.
**b)** 93 Harbi'nin Osmanlı'ya iki sonucunu açıklayınız.`,
        cevap: r`**a)** İlk anayasa (Kanun-i Esasi) ve ilk parlamento (Meclis-i Mebusan ve Meclis-i Ayan) ile halk ilk kez yönetime temsilcileriyle katıldı; meşruti monarşiye geçildi.
**b)** Ayastefanos ve Berlin antlaşmalarıyla Balkanlarda büyük toprak kayıpları (Sırbistan, Karadağ, Romanya'nın bağımsızlığı; Bulgaristan'ın özerkliği); Kars, Ardahan, Batum'un Rusya'ya bırakılması; Kıbrıs'ın İngiltere'ye geçici olarak verilmesi; büyük göç dalgası ve mali çöküntü; Meclis'in kapatılması.`,
        olcut: [[14, "Önem ve iki sonuç"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Ekonomik bağımsızlık", puan: 14,
        metin: r`1881'de Muharrem Kararnamesi ile **Düyûn-ı Umûmiyye** (Genel Borçlar) idaresi kurulmuştur.

Bu kurumun kuruluş nedenini ve Osmanlı'nın ekonomik bağımsızlığına etkisini açıklayınız.`,
        cevap: r`Neden: Kırım Savaşı'ndan (1854) itibaren alınan dış borçlar ödenemedi; 1875'te borçların ödenemeyeceği ilan edildi (moratoryum); alacaklı devletler borçlarını tahsil etmek için bu idareyi kurdurdu.

Etki: Tuz, tütün, ipek, damga pulu gibi önemli gelir kaynaklarının yönetimi yabancıların denetimine geçti; Osmanlı maliyesi dış denetime girdi ve ekonomik bağımsızlık zedelendi (kapitülasyonlarla birlikte).`,
        olcut: [[14, "Neden ve etki"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Kronolojik akıl yürütme", puan: 14,
        metin: r`Aşağıdaki olayları kronolojik sıraya diziniz ve aralarındaki bağlantıyı bir paragrafla açıklayınız:

II. Meşrutiyet'in ilanı · Balkan Savaşları · Trablusgarp Savaşı · 31 Mart Olayı`,
        cevap: r`Sıra: II. Meşrutiyet (1908) → 31 Mart Olayı (1909) → Trablusgarp Savaşı (1911–1912) → Balkan Savaşları (1912–1913).

Bağlantı: Meşrutiyet'in ilanından sonra iç karışıklıklar başladı ve 31 Mart Olayı'nda meşrutiyete karşı ayaklanma bastırıldı. İç siyasi çekişmeler ve zayıflayan devleti fırsat bilen İtalya Trablusgarp'a saldırdı; Osmanlı'nın bu savaşla meşgul olması ve zayıf görülmesi Balkan devletlerini birleşerek Balkan Savaşları'nı başlatmaya cesaretlendirdi.`,
        olcut: [[14, "Doğru sıra ve gerekçeli bağlantı"], [9, "Sıra doğru, bağlantı zayıf"], [4, "Sırada tek hata"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Cephe analizi", puan: 14,
        metin: r`I. Dünya Savaşı'nda Osmanlı birçok cephede savaşmıştır.

**a)** Çanakkale Cephesi'nin açılma amaçlarından ikisini yazınız.
**b)** Çanakkale Zaferi'nin savaşın gidişine ve Türk tarihine iki etkisini açıklayınız.`,
        cevap: r`**a)** İstanbul'u alarak Osmanlı'yı savaş dışı bırakmak; Rusya'ya yardım ulaştırmak (Boğazlar yoluyla); Almanya ile Osmanlı arasındaki bağlantıyı kesmek; tarafsız Balkan devletlerini İtilaf'a çekmek.
**b)** Rusya'ya yardım ulaştırılamadı, bu da Rusya'da 1917 devrimine zemin hazırladı; savaş uzadı; Mustafa Kemal'in ün kazanması ve Millî Mücadele'ye öncülük edecek bir lider olarak öne çıkması; Türk milletinin kendine güveninin artması; sömürge altındaki milletlere örnek olması.`,
        olcut: [[14, "İki amaç ve iki etki"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Antlaşma değerlendirme", puan: 15,
        metin: r`30 Ekim 1918'de imzalanan **Mondros Ateşkes Antlaşması**'nın 7. maddesi: "İtilaf Devletleri, güvenliklerini tehdit edecek bir durum ortaya çıkarsa herhangi bir stratejik noktayı işgal edebilecektir."

**a)** Bu maddenin neden tehlikeli olduğunu açıklayınız.
**b)** Mondros sonrası işgallere karşı halkın tepkisi nasıl olmuştur? İki örnek veriniz.`,
        cevap: r`**a)** Madde açık ve belirsiz bir ifade taşır; "güvenliği tehdit eden durum"un ne olduğuna İtilaf Devletleri karar verecekti. Bu, Anadolu'nun herhangi bir yerinin keyfî olarak işgal edilmesine yasal bahane oldu (Musul, İzmir, Antep vb.).
**b)** Müdafaa-i Hukuk ve Redd-i İlhak cemiyetleri kuruldu; Kuvâ-yı Milliye birlikleri oluştu; mitingler (Sultanahmet mitingi) düzenlendi; Mustafa Kemal'in Samsun'a çıkışıyla Millî Mücadele başladı.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Medeniyet mirası", puan: 15,
        metin: r`Osmanlı Devleti yaklaşık 600 yıl boyunca üç kıtada farklı inanç ve kültürden toplulukları yönetmiştir.

Osmanlı'nın insanlık tarihine katkılarından **üç** tanesini farklı alanlardan (hukuk, mimari, bilim, toplumsal yaşam vb.) örnekleyerek açıklayınız.`,
        cevap: r`- **Hoşgörü ve millet sistemi:** Farklı din ve mezheplerin kendi inanç, eğitim ve hukuk kurumlarını sürdürmesine izin verildi; 1492'de İspanya'dan kovulan Yahudiler kabul edildi.
- **Mimari:** Mimar Sinan'ın Süleymaniye ve Selimiye camileri, köprüler (Mostar, Drina), külliyeler.
- **Vakıf medeniyeti:** İmaret, darüşşifa (hastane), çeşme, kervansaray gibi sosyal hizmetlerin vakıflarla yürütülmesi.
- **Bilim ve kültür:** Piri Reis'in dünya haritası ve *Kitab-ı Bahriye*'si, Takiyüddin'in rasathanesi, Evliya Çelebi'nin *Seyahatname*'si, hat ve çini sanatı.`,
        olcut: [[15, "Üç farklı alanda açıklamalı örnek"], [10, "İki alan"], [5, "Bir alan"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
