/* 9. Sınıf Tarih — Maarif Modeli açık uçlu yazılı sınavları (örnek). Üniteler: u1 Geçmişin İnşa Sürecinde Tarih, u2 Eski Çağ, u3 Orta Çağ */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/tarih"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Tarihsel kavramları kullanma", puan: 14,
        metin: r`Bir tarih öğretmeni öğrencilerine şunu söylüyor: "Tarih, geçmişte olan her şey değildir; kanıta dayanarak yeniden kurduğumuz geçmiştir."

**a)** Bu sözü "olgu" ve "yorum" kavramlarını kullanarak açıklayınız.
**b)** Tarihî bir olayın unsurlarından üçünü yazınız.`,
        cevap: r`**a)** Geçmişte yaşanan olgular kendiliğinden bilinmez; tarihçi kaynaklardaki kanıtlardan yola çıkarak olguları belirler ve onları yorumlar. Bu yüzden tarih, kanıt ile yorumun birleşimidir; yeni kanıtlar yorumları değiştirebilir.
**b)** Zaman, mekân, insan (toplum), olayın nedenleri ve sonuçları.`,
        olcut: [[14, "Olgu-yorum ilişkisi ve üç unsur"], [9, "Açıklama doğru, unsurlar eksik ya da tersi"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Kanıt değerlendirme", puan: 14,
        metin: r`Bir öğrenci 1453 İstanbul'un fethini araştırırken şu kaynaklara ulaşıyor:

1. Kuşatmaya tanıklık eden Venedikli Nicolo Barbaro'nun günlüğü
2. 2020'de yazılmış bir tarih ders kitabı
3. Fetih sonrası basılan Osmanlı sikkesi

**a)** Bu kaynakları birinci el ve ikinci el olarak sınıflandırınız.
**b)** Barbaro'nun günlüğünü kullanırken nelere dikkat etmek gerekir? İki madde yazınız.`,
        cevap: r`**a)** Birinci el: Barbaro'nun günlüğü ve sikke (döneme ait). İkinci el: 2020 ders kitabı.
**b)** Yazarın kuşatılan tarafta olması nedeniyle taraflı olabileceği; başka kaynaklarla (Osmanlı kaynakları vb.) karşılaştırılması; yazarın her olayı bizzat görüp görmediği; abartı ve duygusal ifadelerin ayıklanması.`,
        olcut: [[14, "Doğru sınıflandırma ve iki dikkat noktası"], [9, "Sınıflandırma doğru, bir dikkat noktası"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Disiplinler arası ilişki", puan: 14,
        metin: r`Bir kazıda üzerinde yazı bulunan bir kil tablet, birkaç sikke ve bir insan iskeleti bulunuyor. Tarihçinin bu buluntuları yorumlarken yararlanacağı **üç yardımcı bilim** dalını yazınız ve her birinin neyi aydınlatacağını belirtiniz.`,
        cevap: r`- **Paleografya / epigrafi:** Tabletteki eski yazıyı okur (kitabe/tablet yazısı).
- **Nümismatik:** Sikkeleri inceler; dönemi, hükümdarı, ekonomiyi aydınlatır.
- **Antropoloji / arkeoloji:** İskeletten yaş, beslenme, hastalık bilgisi; buluntuların çıktığı katmana göre dönem.
- **Kronoloji / karbon-14 (fizik-kimya):** Buluntuların yaşını belirler.`,
        olcut: [[14, "Üç uygun bilim ve katkıları"], [9, "Üç bilim, katkılar eksik ya da iki bilim tam"], [4, "Bir bilim doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Dijital okuryazarlık", puan: 14,
        metin: r`Sosyal medyada "Fatih Sultan Mehmet'in son mektubu" başlığıyla bir görsel paylaşılıyor; kaynak belirtilmemiş.

Bir tarih öğrencisi olarak bu bilginin doğruluğunu nasıl sınarsınız? Üç adım yazınız.`,
        cevap: r`1. Kaynağı araştırmak: Görselin ilk nereden çıktığını (tersine görsel arama) ve hangi arşiv/belgeye dayandığını bulmak.
2. Güvenilir kaynaklarla karşılaştırmak: Devlet arşivleri, akademik yayınlar, müze kayıtları.
3. İç tutarlılığı denetlemek: Dil, yazı türü, tarih ve olayların dönemle uyuşup uyuşmadığı; uzman görüşü almak.`,
        olcut: [[14, "Üç uygun ve somut adım"], [9, "İki adım"], [4, "Bir adım"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Neden-sonuç ilişkisi", puan: 14,
        metin: r`Göbeklitepe'de tarımdan önce yapılmış anıtsal tapınaklar bulunmuştur.

**a)** Tarım Devrimi'nin insan yaşamına üç etkisini yazınız.
**b)** Göbeklitepe'nin bulunması, "önce tarım, sonra yerleşik hayat ve inanç merkezleri" görüşünü nasıl sorgulatmıştır?`,
        cevap: r`**a)** Yerleşik hayata geçiş; nüfus artışı; mülkiyet ve iş bölümünün ortaya çıkması; köy ve kentlerin kurulması; hayvanların evcilleştirilmesi.
**b)** Avcı-toplayıcı toplulukların tarımdan önce büyük inanç yapıları inşa ettiği görülmüştür. Bu, inanç ve toplu çalışmanın yerleşik hayata geçişi tetikleyen nedenlerden biri olabileceğini düşündürür; bilimsel bilgi yeni kanıtla değişmiştir.`,
        olcut: [[14, "Üç etki ve görüşün sorgulanması"], [9, "İkisi tam ya da a tam b eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Karşılaştırma", puan: 15,
        metin: r`Hammurabi Kanunları'nda "göze göz, dişe diş" ilkesi vardır ve cezalar toplumsal sınıfa göre değişir.

**a)** Bu kanunların yazılı olmasının önemi nedir?
**b)** Günümüz hukukunun bu kanunlardan farklı olan iki ilkesini yazınız.`,
        cevap: r`**a)** Yazılı kanunlar keyfî yönetimi sınırlar; herkes kuralları bilebilir; hukukun süreklilik kazanmasını sağlar.
**b)** Kanun önünde eşitlik (sınıfa göre ceza yok); suç ve cezaların orantılı olması, kısasın yerine hapis/para cezası; savunma hakkı ve masumiyet karinesi; insan haklarına dayalı yargı.`,
        olcut: [[15, "Önem ve iki fark"], [10, "Önem ve bir fark ya da iki fark"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Kültürel mirası değerlendirme", puan: 15,
        metin: r`Eski Çağ'da Mezopotamya'da çivi yazısı, Mısır'da hiyeroglif, Fenikelilerde alfabe kullanılmıştır.

**a)** Fenike alfabesinin önceki yazı sistemlerine göre üstünlüğü nedir?
**b)** Yazının bulunmasının insanlık tarihine iki etkisini yazınız.`,
        cevap: r`**a)** Az sayıda (yaklaşık 22) harften oluştuğu için öğrenilmesi kolaydır; sesleri gösterir, yalnızca rahip ve kâtiplerin değil daha geniş kesimlerin okuryazar olmasını kolaylaştırmıştır; Yunan ve Latin alfabelerinin temelidir.
**b)** Tarih çağlarının başlaması (yazılı belgeler); bilginin kuşaktan kuşağa aktarılması; yazılı hukuk, ticaret kayıtları ve devlet yönetiminin gelişmesi.`,
        olcut: [[15, "Üstünlük ve iki etki"], [10, "Üç unsurdan ikisi"], [5, "Bir unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Yönetim anlayışlarını karşılaştırma", puan: 14,
        metin: r`Eski Çağ'da Mısır'da firavunlar kendilerini tanrı-kral olarak görürken Hititlerde "Pankuş" adlı bir meclis vardı.

**a)** Bu iki yönetim anlayışını karşılaştırınız.
**b)** Pankuş'un varlığı Hitit yönetimi hakkında ne söyler?`,
        cevap: r`**a)** Mısır'da teokratik ve mutlak monarşi: yetki tek kişide ve kutsal kaynaklıdır. Hititlerde kral güçlü olsa da yetkisi bir meclisle sınırlanmıştır.
**b)** Hititlerde krallar bazı kararlarda soylulardan oluşan meclise danışmak zorundaydı; yönetimde danışma ve kısmen yetki paylaşımı vardı (veraset ve yargı konularında).`,
        olcut: [[14, "Karşılaştırma ve Pankuş yorumu"], [9, "Biri tam, diğeri eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Neden-sonuç ilişkisi", puan: 14,
        metin: r`375 yılında Hunların batıya ilerlemesiyle başlayan Kavimler Göçü Avrupa'nın siyasi haritasını değiştirmiştir.

**a)** Kavimler Göçü'nün iki nedenini yazınız.
**b)** Avrupa'ya iki sonucunu açıklayınız.`,
        cevap: r`**a)** Orta Asya'daki iklim değişikliği ve kuraklık; nüfus artışı ve otlak yetersizliği; Hunların batıya ilerleyip diğer kavimleri sıkıştırması; siyasi baskılar.
**b)** Batı Roma İmparatorluğu yıkıldı (476) ve İlk Çağ sona erip Orta Çağ başladı; Avrupa'nın etnik yapısı değişti, bugünkü Avrupa devletlerinin temeli atıldı; feodalite ortaya çıktı.`,
        olcut: [[14, "İki neden ve iki sonuç"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Kronolojik düşünme", puan: 14,
        metin: r`Aşağıdaki olayları kronolojik sıraya diziniz ve aralarından ikisi arasındaki neden-sonuç ilişkisini açıklayınız:

- Talas Savaşı (751)
- Malazgirt Savaşı (1071)
- Kavimler Göçü (375)
- Batı Roma'nın yıkılışı (476)`,
        cevap: r`Sıra: Kavimler Göçü (375) → Batı Roma'nın yıkılışı (476) → Talas Savaşı (751) → Malazgirt Savaşı (1071).

Örnek ilişki: Kavimler Göçü ile Batı Roma'ya akın eden kavimler imparatorluğu zayıflatmış ve 476'da yıkılmasına yol açmıştır. (Talas sonrası Türklerin İslamiyet'e geçişini hızlandırması da kabul edilir.)`,
        olcut: [[14, "Doğru sıra ve doğru neden-sonuç"], [9, "Sıra doğru, ilişki eksik"], [4, "Sırada tek hata"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Harita okuma", puan: 14,
        metin: r`İpek Yolu Çin'den başlayıp Orta Asya, İran ve Anadolu üzerinden Akdeniz limanlarına ulaşıyordu.

**a)** İpek Yolu'nun sağladığı iki kültürel etkileşimi yazınız.
**b)** Bu yolu kontrol etmek isteyen devletler arasında neden mücadeleler yaşanmıştır?`,
        cevap: r`**a)** Kâğıt, pusula, barut gibi buluşların batıya yayılması; dinlerin (Budizm, İslamiyet vb.) ve sanat anlayışlarının yayılması; dillerin ve bilgi birikiminin etkileşimi.
**b)** Ticaret yolları büyük gelir (vergi, gümrük) ve ekonomik güç sağlıyordu; yolun kontrolü siyasi üstünlük ve zenginlik demekti (Göktürk–Sasani–Bizans mücadeleleri gibi).`,
        olcut: [[14, "İki etkileşim ve mücadelenin ekonomik nedeni"], [9, "İkisinden biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Bilim ve kültür", puan: 14,
        metin: r`9. yüzyılda Bağdat'ta kurulan Beytülhikme'de Yunanca, Farsça ve Hintçe eserler Arapçaya çevrilmiştir. Harezmî cebirin, Farabi felsefenin, İbn Sina tıbbın gelişimine katkı sağlamıştır.

**a)** Çeviri faaliyetlerinin bilimin gelişimine katkısını açıklayınız.
**b)** Bu dönemdeki bilim insanlarından birinin bugüne etkisini bir örnekle yazınız.`,
        cevap: r`**a)** Antik dönemin bilgi birikimi korunmuş, farklı kültürlerin bilgisi bir araya getirilmiş, üzerine yeni bilgiler eklenmiştir; bu birikim daha sonra Avrupa'ya aktarılarak Rönesans'ı etkilemiştir.
**b)** Harezmî: "algoritma" kelimesi adından gelir, cebir ve onluk sayı sisteminin yayılmasına katkı. İbn Sina: *El-Kanun fi't-Tıb* yüzyıllarca Avrupa'da tıp kitabı olarak okutulmuştur.`,
        olcut: [[14, "Katkı ve bugüne etkili örnek"], [9, "Biri tam, diğeri eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Tarihsel empati", puan: 15,
        metin: r`Orta Çağ Avrupa'sında feodal düzende yaşayan bir köylü (serf) olduğunuzu düşününüz.

Toprakla, senyörle ve kiliseyle ilişkinizi anlatan **4–5 cümlelik** bir günlük sayfası yazınız. Metninizde en az üç tarihsel bilgi doğru kullanılsın.`,
        cevap: r`Öğrencinin özgün metni. Kullanılabilecek doğru bilgiler: serfin toprağa bağlı olması ve izinsiz ayrılamaması; ürünün bir kısmını senyöre vermesi; angarya (senyörün topraklarında karşılıksız çalışma); kiliseye ondalık vergisi (öşür); senyörün koruması karşılığında bağlılık; eğitimden yoksunluk; şato ve köy yaşamı.`,
        olcut: [[15, "Empatik anlatım ve en az üç doğru bilgi"], [10, "İki doğru bilgi"], [5, "Bir doğru bilgi"], [0, "Bilgi yok ya da yanlış"]] },
      { tema: "u3", beceri: "Değişim ve süreklilik", puan: 15,
        metin: r`Orta Çağ'da Avrupa'da kilise eğitim ve bilimi büyük ölçüde denetlerken İslam dünyasında medreseler, rasathaneler ve kütüphaneler gelişti.

İki bölge arasındaki bu farkın bilim ve kültürün gelişmesine etkisini değerlendiriniz. Bu dönemde Türk-İslam devletlerinde kurulan bir bilim kurumuna örnek veriniz.`,
        cevap: r`Avrupa'da kilisenin dogmatik yaklaşımı ve skolastik düşünce, deneye ve sorgulamaya dayalı bilimin gelişmesini sınırladı. İslam dünyasında devlet desteğiyle kurulan medrese, rasathane ve kütüphaneler; matematik, astronomi, tıp ve felsefede önemli gelişmelere yol açtı.

Örnek: Selçuklularda Nizamiye Medreseleri; Karahanlı/Gazneli dönemi kütüphaneleri; Merağa ve Semerkant (Uluğ Bey) rasathaneleri.`,
        olcut: [[15, "Gerekçeli değerlendirme ve doğru kurum örneği"], [10, "Değerlendirme yüzeysel, örnek doğru"], [5, "Yalnız örnek ya da yalnız değerlendirme"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
