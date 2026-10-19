/* 11. Sınıf Türk Dili ve Edebiyatı — Maarif Modeli açık uçlu yazılı sınavları (örnek).
   Temalar: u1 Bir Diyeceğim Var!, u2 Kültür Yolculuğu, u3 Yaşamın İzinde, u4 Hayatın Aynası. */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/edebiyat"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Geleneksel tiyatro", puan: 14,
        metin: r`Karagöz oyununda Hacivat süslü, Arapça-Farsça kelimelerle konuşur; Karagöz ise bu sözleri yanlış anlayarak güldürür.

**a)** Karagöz oyununun bölümlerini sırasıyla yazınız.
**b)** Hacivat ile Karagöz'ün temsil ettiği toplumsal tipleri ve mizahın kaynağını açıklayınız.`,
        cevap: r`**a)** Mukaddime (giriş, perde gazeli), muhavere (Karagöz ile Hacivat'ın söyleşmesi), fasıl (asıl oyun), bitiş.
**b)** Hacivat medrese görmüş, kurallara uyan, biraz kendini beğenmiş okumuş kesimi; Karagöz ise saf, açık sözlü, eğitimsiz ama zeki halk adamını temsil eder. Mizah, iki farklı dil ve dünya görüşünün çatışmasından, söz oyunlarından ve yanlış anlamalardan doğar.`,
        olcut: [[14, "Bölümler ve tipler/mizah"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "İletişim: mektup ve e-posta", puan: 14,
        metin: r`Bir öğrenci öğretmenine şu e-postayı gönderiyor:

> "hocam ödevi yapamadım yarın getiririm ok? :)"

**a)** Bu iletinin resmî iletişim kurallarına uymayan üç yönünü yazınız.
**b)** İletiyi uygun bir e-posta olarak (konu satırı, hitap, gövde, kapanış) yeniden yazınız.`,
        cevap: r`**a)** Konu satırı yok; uygun hitap ve selamlama yok; büyük harf ve noktalama kurallarına uyulmamış; "ok", ":)" gibi resmî olmayan ifadeler; gerekçe ve özür yok; imza (ad-soyad, sınıf) yok.
**b)** Örnek:
Konu: Türkçe ödevi teslimi hakkında
"Sayın Ayşe Hanım, Bugün teslim etmem gereken ödevi rahatsızlığım nedeniyle tamamlayamadım. Uygun görürseniz yarın teslim etmek istiyorum. Anlayışınız için teşekkür ederim. Saygılarımla, Ali Yılmaz, 11-B, 245"`,
        olcut: [[14, "Üç sorun ve kurallara uygun e-posta"], [9, "İkisi doğru ve e-posta kısmen uygun"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Yazma: dilekçe", puan: 14,
        metin: r`Okulunuzda kütüphanenin öğle arasında da açık olması için **okul müdürlüğüne** bir dilekçe yazınız. Dilekçede başlık, gerekçe, talep, tarih ve imza bölümleri bulunsun.`,
        cevap: r`Örnek yapı:
- Sağ üstte tarih (gün/ay/yıl).
- Ortada başlık: "…… LİSESİ MÜDÜRLÜĞÜNE" (büyük harfle).
- Gövde: Kendini tanıtma (ad, sınıf, numara), gerekçe (öğrencilerin öğle arasında ders çalışma ve kitap okuma ihtiyacı), talep ("…açık tutulması hususunda gereğini arz ederim").
- Sağ altta ad-soyad ve imza; altında adres/iletişim.

Değerlendirme: biçim, resmî ve saygılı dil, gerekçeli talep, yazım-noktalama.`,
        olcut: [[14, "Tüm bölümler ve uygun dil, en fazla 2 yazım hatası"], [9, "Bir bölüm eksik ya da 3-5 yazım hatası"], [4, "Dilekçe biçimi zayıf"], [0, "Yazılmamış"]] },
      { tema: "u2", beceri: "Tarihî metin yorumlama", puan: 14,
        metin: r`Orhun Abideleri'nden (Kül Tigin Yazıtı, günümüz Türkçesiyle):

> "Ey Türk milleti! Üstte gök çökmedikçe, altta yer delinmedikçe senin ilini ve töreni kim bozabilir?"

**a)** Bu sözler kime seslenmektedir ve hangi duyguyu taşır?
**b)** Orhun Abideleri'nin Türk dili ve tarihi için önemini iki maddeyle açıklayınız.`,
        cevap: r`**a)** Türk milletine seslenir; millî birlik, bağımsızlık ve töreye bağlılık duygusunu, milleti uyarma ve öğüt verme amacını taşır.
**b)** Türklerin kendi adıyla ve kendi alfabesiyle (Göktürk alfabesi) yazdığı bilinen ilk yazılı belgelerdendir; Türk dilinin 8. yüzyıldaki işlenmiş hâlini gösterir; dönemin devlet anlayışı, tarih ve toplum yapısı hakkında birinci elden bilgi verir; söylev (hitabet) türünün ilk örneklerindendir.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Ozanlık geleneği", puan: 14,
        metin: r`Âşık edebiyatında **atışma** önemli bir gelenektir.

**a)** Atışmayı tanımlayıp bir özelliğini yazınız.
**b)** Ozan-baksı geleneğinden âşık geleneğine geçişte neyin değiştiğini, neyin sürdüğünü açıklayınız.`,
        cevap: r`**a)** İki ya da daha fazla âşığın aynı ayakla, sazla, karşılıklı ve doğaçlama (irticalen) şiir söyleyerek yarışmasıdır; birbirlerini iğneleyici, şakalı ya da bilgi yarıştıran sorular sorarlar.
**b)** Süren: şiirin sazla ve sözlü olarak söylenmesi, toplumsal törenlerde yer alması, hece ölçüsü ve halk söyleyişi. Değişen: İslamiyet sonrası dinî-büyüsel işlevler (baksı/kam) azaldı; âşık daha çok aşk, gurbet, toplumsal konular işleyen bir sanatçıya dönüştü; mahlas kullanımı yaygınlaştı.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Konuşma ve yansıtıcı yazı", puan: 15,
        metin: r`"Dedemin anlattığı bir hikâye" konulu, **en az 6 cümlelik yansıtıcı bir yazı** yazınız. Yazınızda hikâyeyi kısaca özetleyin, sizde uyandırdığı düşünceyi açıklayın ve bu hikâyenin kuşaklar arası aktarımdaki değerini değerlendirin.`,
        cevap: r`Öğrencinin özgün metni. Değerlendirme: yansıtıcı yazının özellikleri (kişisel deneyim + düşünme + değerlendirme), özet–düşünce–değer bölümlerinin varlığı, paragraf bütünlüğü, yazım ve noktalama.`,
        olcut: [[15, "Üç bölüm ve doğru yazım (en fazla 2 hata)"], [10, "Bir bölüm eksik ya da 3-5 hata"], [5, "Metin var, birden çok ölçüt eksik"], [0, "Yazılmamış ya da konu dışı"]] },
      { tema: "u2", beceri: "Sözlük ve dil", puan: 15,
        metin: r`Kaşgarlı Mahmud *Dîvânu Lugâti't-Türk*'ü 11. yüzyılda yazmıştır.

**a)** Eserin yazılış amacını yazınız.
**b)** Eserin sadece bir sözlük olmadığını gösteren iki içerik özelliğini belirtiniz.`,
        cevap: r`**a)** Araplara Türkçeyi öğretmek ve Türkçenin Arapçadan geri kalmayan zengin bir dil olduğunu göstermek.
**b)** Türk boylarının yerleşim yerlerini gösteren bir harita içerir; sav (atasözü), koşuk ve sagu gibi sözlü edebiyat örneklerini barındırır; Türk boylarının gelenekleri, inançları ve dil özellikleri hakkında bilgi verir; dil bilgisi açıklamaları vardır.`,
        olcut: [[15, "Amaç ve iki özellik"], [10, "Üç unsurdan ikisi"], [5, "Bir unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Roman çözümleme", puan: 14,
        metin: r`Ahmet Hamdi Tanpınar'ın *Huzur* romanı İstanbul'da, II. Dünya Savaşı öncesinde geçer; Mümtaz, Nuran ve Suad arasında bir aşk ve fikir çatışması anlatılır.

**a)** Romanın temel temalarından ikisini yazınız.
**b)** Tanpınar'ın romanında zaman ve geçmiş algısının (değişme içinde devam) önemini açıklayınız.`,
        cevap: r`**a)** Aşk ve huzur arayışı; Doğu-Batı, gelenek-modernlik arasında kalmışlık; sanat ve musiki; ölüm ve ruhsal bunalım; savaş kaygısı.
**b)** Tanpınar'a göre geçmiş (eski İstanbul, musiki, mimari) bugün ile kopmadan, dönüşerek yaşamalıdır; "değişme içinde devam" anlayışıyla kimlik krizinin çözümünü geçmişle sağlıklı bir bağ kurmakta görür. Zaman, karakterlerin bilinç ve hatıralarında iç içe geçer.`,
        olcut: [[14, "İki tema ve zaman algısı"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Biyografi ve tezkire", puan: 14,
        metin: r`Mehmet Âkif Ersoy'un hayatını anlatan bir biyografi ile Divan edebiyatındaki **şuara tezkireleri**ni karşılaştırınız. İkisinin ortak yönünü ve bir farkını yazınız.`,
        cevap: r`Ortak: İkisi de gerçek kişilerin (sanatçıların) hayatlarını ve eserlerini anlatan öğretici metinlerdir.
Fark: Tezkireler pek çok şairin hayatını kısa bilgilerle, genellikle süslü bir dille ve şiirlerinden örneklerle verir; değerlendirme öznel olabilir. Biyografi ise tek bir kişinin hayatını kronolojik, belgelere dayalı ve ayrıntılı biçimde, sade bir dille anlatır.`,
        olcut: [[14, "Ortak ve farklı yön"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Radyo tiyatrosu", puan: 14,
        metin: r`Aşağıdaki anlatı parçasını, iki kişilik kısa bir **radyo tiyatrosu** sahnesine dönüştürünüz. Ses efektlerini parantez içinde belirtiniz.

> Yağmur yağıyordu. Elif istasyona koşarak geldi. Tren kalkmak üzereydi. Kondüktör ona biletini sordu; Elif nefes nefese biletini uzattı ve son anda trene bindi.`,
        cevap: r`Örnek:
(Yağmur sesi, uzaktan tren düdüğü)
(Koşan ayak sesleri)
KONDÜKTÖR: Hanımefendi, acele edin! Tren kalkıyor. Biletiniz?
ELİF: (Nefes nefese) Buyurun… Az kalsın kaçırıyordum!
KONDÜKTÖR: Tamam, binin lütfen.
(Kapı kapanma sesi, tren hareket eder)

Değerlendirme: yalnızca sesle anlaşılır olması, diyalog biçimi, ses efektleri, olayın korunması.`,
        olcut: [[14, "Diyalog, efektler ve olayın korunması"], [9, "Bir ölçüt eksik"], [4, "İki ölçüt eksik"], [0, "Yazılmamış"]] },
      { tema: "u4", beceri: "Modern tiyatro", puan: 14,
        metin: r`Modern tiyatroyu geleneksel Türk tiyatrosuyla (Karagöz, orta oyunu) karşılaştırınız: **metin**, **sahne** ve **oyuncu** bakımından.`,
        cevap: r`- **Metin:** Modern tiyatroda yazılı bir metin (oyun yazarı) vardır; geleneksel tiyatroda yazılı metin yoktur, doğaçlamaya dayanır.
- **Sahne:** Modern tiyatroda dekorlu, perdeli, seyirciden ayrılmış sahne; orta oyununda seyircinin ortasında meydan, dekor çok basit (yeni dünya, dükkân), Karagöz'de perde ve tasvirler.
- **Oyuncu:** Modern tiyatroda rolü ezberleyen profesyonel oyuncular ve yönetmen; geleneksel tiyatroda kalıplaşmış tipler (Kavuklu, Pişekâr, Karagöz, Hacivat) ve doğaçlama yapan oyuncular; kadın rolleri de erkeklerce oynanırdı.`,
        olcut: [[14, "Üç ölçütte karşılaştırma"], [9, "İki ölçüt"], [4, "Bir ölçüt"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Küçürek hikâye", puan: 14,
        metin: r`Aşağıdaki küçürek (kısa kısa) hikâyeyi okuyunuz:

> Yaşlı kadın her sabah merdivenin on ikinci basamağında durup soluklanırdı. Bir gün on üçüncüye vardığında durmadı. Torunu, babaannesinin o basamağa yıllardır bir çiçek saksısı koyduğunu ancak o sabah fark etti.

**a)** Küçürek hikâyenin iki özelliğini bu metinden kanıtla yazınız.
**b)** Hikâyenin sonunun okurda uyandırabileceği anlamı yorumlayınız.`,
        cevap: r`**a)** Çok kısadır ve az kelimeyle yoğun anlam yaratır; ayrıntılar seçilerek verilir (basamak sayısı, saksı); son okura yorum bırakır, açık uçludur; az sayıda kişi ve tek olay vardır.
**b)** Açık uçlu yorum kabul edilir; örneğin: kadının durmaması onun öldüğünü ya da artık bu dünyadan ayrıldığını sezdirebilir; torunun saksıyı geç fark etmesi, yakınlarımızın küçük alışkanlıklarını onları kaybedince fark ettiğimizi düşündürür.`,
        olcut: [[14, "İki kanıtlı özellik ve gerekçeli yorum"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Belgesel ve afiş", puan: 15,
        metin: r`Okulunuzda "Mimar Sinan ve klasik Osmanlı mimarisi" konulu bir belgesel gösterimi yapılacak.

**a)** Belgeselin öğretici metin türlerinden farkını ve iki özelliğini yazınız.
**b)** Gösterim için hazırlanacak bir afişte bulunması gereken dört unsuru yazınız ve afişin dilinin nasıl olması gerektiğini açıklayınız.`,
        cevap: r`**a)** Belgesel, gerçek olayları, kişileri ve mekânları görüntü, ses, anlatıcı ve tanıklıklarla aktaran görsel-işitsel bir türdür; yazılı öğretici metinlerden farklı olarak görsel kanıt kullanır. Özellikler: gerçeğe ve belgeye dayanır, araştırmaya dayalıdır, anlatıcı sesi kullanılır, bilgilendirme amaçlıdır.
**b)** Etkinliğin adı, tarih-saat, yer, düzenleyen, kısa tanıtım cümlesi, dikkat çekici görsel. Dil: kısa, çarpıcı, açık ve anlaşılır; okur ilk bakışta bilgiyi almalı.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Hayalî mülakat", puan: 15,
        metin: r`Mehmet Âkif Ersoy ile **hayalî bir mülakat** (röportaj) için üç soru ve her birinin altına Âkif'in hayatı ve eserleriyle uyumlu kısa bir cevap yazınız.`,
        cevap: r`Örnek:
- *İstiklal Marşı'nı yazarken ne hissettiniz?* — "Milletin acısını ve umudunu birlikte duydum; bu marşı bir ödül için değil, milletim için yazdım." (Ödülü kabul etmemesi.)
- *Safahat'ta neden günlük konuşma diline yakın bir dil kullandınız?* — "Şiirin halkın derdini anlatması gerekir; halk anlamazsa söylediklerim boşa gider." (Manzum hikâye, sosyal konular.)
- *Hayvan haklarına ve mazlumlara karşı duyarlılığınız nereden geliyor?* — "Merhametsiz bir toplum çöker; haksızlığa susmak da bir haksızlıktır." (Ahlak, karakter vurgusu.)

Değerlendirme: soruların anlamlı olması, cevapların Âkif'in gerçek hayatı ve eserleriyle (İstiklal Marşı, Safahat, veteriner hekimlik, millî mücadele) uyumu, röportaj biçimi.`,
        olcut: [[15, "Üç soru ve bilgiye dayalı uyumlu cevaplar"], [10, "İki soru-cevap tam"], [5, "Bir soru-cevap"], [0, "Yazılmamış ya da yanlış"]] }
    ] }
  ] };
})();
