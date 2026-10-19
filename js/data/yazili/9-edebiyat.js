/* 9. Sınıf Türk Dili ve Edebiyatı — Maarif Modeli açık uçlu yazılı sınavları (örnek).
   Temalar: u1 Sözün İnceliği, u2 Anlam Arayışı, u3 Anlamın Yapı Taşları, u4 Dilin Zenginliği.
   Metinler bu sınavlar için yazılmıştır ya da telif süresi dolmuş eserlerden alınmıştır. */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/edebiyat"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Okuma: sanat metni ile öğretici metni ayırt etme", puan: 14,
        metin: r`Aşağıdaki iki metni okuyunuz.

> **Metin 1:** Kış güneşi, okul bahçesindeki çınarın çıplak dallarına ince bir altın sürmüştü. Rüzgâr, dalların arasında eski bir şarkıyı unutmuş gibi mırıldanıyordu.
>
> **Metin 2:** Çınar, Platanaceae familyasından, 30 metreye kadar boylanabilen, uzun ömürlü bir ağaçtır. Türkiye'de özellikle akarsu kenarlarında yaygındır.

**a)** Hangisi sanat (edebî) metni, hangisi öğretici metindir?
**b)** Kararınızı iki metindeki dil kullanımı ve amaç farkıyla gerekçelendiriniz.`,
        cevap: r`**a)** Metin 1 sanat metni, Metin 2 öğretici metindir.
**b)** Metin 1'de dil **sanatsal (şiirsel) işlevde**dir; kişileştirme ("rüzgâr mırıldanıyordu") ve benzetme vardır, amaç estetik zevk ve duygu uyandırmaktır; kelimeler yan ve mecaz anlamlarıyla kullanılır. Metin 2'de dil **göndergesel işlevde**dir; nesnel, açık bilgi verir, kelimeler gerçek anlamıyla kullanılır, amaç bilgilendirmektir.`,
        olcut: [[14, "Doğru sınıflandırma, dil işlevi ve amaç farkı"], [9, "Sınıflandırma doğru, tek bir gerekçe"], [4, "Yalnız sınıflandırma doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Söz sanatlarını belirleme", puan: 14,
        metin: r`Aşağıdaki dizelerdeki söz sanatını yazıp nasıl oluştuğunu açıklayınız:

**a)** "Ağlarım ağlatamam, hissederim söyleyemem" — Namık Kemal
**b)** "Gönül bir kuştur, uçar gider dalından"
**c)** "Dağlar başını eğdi, sel durdu, söndü rüzgâr"`,
        cevap: r`**a)** Tezat: "ağlarım–ağlatamam", "hissederim–söyleyemem" karşıt kavramlar bir arada kullanılmıştır. (Ayrıca tekrir/ahenk unsurları.)
**b)** Teşbih-i beliğ (güçlü benzetme): gönül kuşa benzetilmiş, yalnız benzeyen ve kendisine benzetilen kullanılmış. ("uçar" ifadesiyle benzetme sürdürülmüştür.)
**c)** Teşhis (kişileştirme): dağlara "başını eğme" gibi insana özgü bir davranış verilmiştir.`,
        olcut: [[14, "Üç sanat ve oluşumu doğru"], [9, "Üç sanat doğru, açıklamalar eksik ya da iki sanat tam"], [4, "Bir sanat doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Tür özelliklerini değerlendirme", puan: 14,
        metin: r`Aşağıdaki paragraf bir **deneme**den alınmıştır:

> Hızlı okuyan herkesin çok okuduğunu sanırız. Oysa bence okumak, sayfaları değil, cümlelerin arasındaki sessizliği çevirmektir. Belki de en iyi kitaplar, kapattığımızda bizi okumaya devam edenlerdir.

**a)** Bu paragraftan hareketle denemenin iki özelliğini yazınız.
**b)** Yazarın bakış açısını bir cümleyle özetleyiniz.`,
        cevap: r`**a)** Yazar kişisel görüşünü kesinlik iddiası taşımadan ("bence", "belki de") samimi bir dille anlatır; kanıtlama amacı gütmez; konuşur gibi yazılır; her konu denemenin konusu olabilir.
**b)** Okumanın değeri hızda ya da sayfa sayısında değil, metnin okurda bıraktığı derin düşünce ve etkidedir.`,
        olcut: [[14, "İki özellik metinden kanıtla, uygun bakış açısı"], [9, "İki özellik, bakış açısı eksik ya da tersi"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Hikâyenin yapı unsurları", puan: 14,
        metin: r`> Yaşlı bekçi Hasan Efendi, her gece istasyonun son lambasını yakmadan önce raylara bakar, sonra cebindeki eski saati kurardı. O akşam son tren gelmedi. Hasan Efendi lambayı yaktı, saatini kurdu ve sabaha kadar bankta oturdu. Şafak sökerken uzaktan bir düdük sesi duydu; gülümsedi ama ayağa kalkmadı.

Bu hikâye parçasında **olay, kişi, zaman, mekân** unsurlarını belirleyiniz. Hikâyenin sonu hakkında okura ne düşündürdüğünü (örtük ileti) yorumlayınız.`,
        cevap: r`Olay: son trenin gecikmesi ve bekçinin bütün gece beklemesi. Kişi: Hasan Efendi. Zaman: akşam–şafak (bir gece). Mekân: istasyon.

Örtük ileti (açık uçlu, gerekçeli yorumlar kabul edilir): Ayağa kalkmaması bekçinin çok yorgun olduğunu, hayatının sonuna yaklaştığını ya da beklemenin kendisinin onun için bir anlam/görev olduğunu düşündürebilir; son, okura bırakılmıştır.`,
        olcut: [[14, "Dört unsur ve metne dayalı gerekçeli yorum"], [9, "Dört unsur doğru, yorum gerekçesiz"], [4, "İki-üç unsur doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Tür ayrımı", puan: 14,
        metin: r`Olay hikâyesi (Maupassant tarzı) ile durum hikâyesi (Çehov tarzı) arasındaki farkı **olay örgüsü** ve **son** bakımından açıklayınız. Türk edebiyatında her iki tarzın birer temsilcisini yazınız.`,
        cevap: r`Olay hikâyesinde serim–düğüm–çözüm planı vardır; merak unsuru öne çıkar ve hikâye kesin bir sonla biter. Durum hikâyesinde belirgin bir olay örgüsü yoktur; günlük hayattan bir kesit, insanın iç dünyası ve atmosfer anlatılır; son çoğu zaman açık bırakılır.

Temsilciler: Olay hikâyesi — Ömer Seyfettin; durum hikâyesi — Sait Faik Abasıyanık (Memduh Şevket Esendal da kabul edilir).`,
        olcut: [[14, "İki ölçüte göre fark ve iki temsilci"], [9, "Fark doğru, temsilci eksik ya da tersi"], [4, "Bir unsur doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Anı türünü tanıma", puan: 15,
        metin: r`> 1919 baharında, on dört yaşındaydım. İstanbul'un sokaklarında herkes fısıltıyla konuşuyordu. Babamın o sabah gazeteyi katlarken titreyen ellerini hiç unutmadım.

**a)** Bu parçanın **anı** türüne ait olduğunu gösteren iki özelliği metinden kanıtlarla yazınız.
**b)** Anı ile otobiyografi arasındaki bir farkı belirtiniz.`,
        cevap: r`**a)** Yazar yaşadığı olayı birinci kişi ağzından anlatır ("on dört yaşındaydım", "hiç unutmadım"); olay geçmişte, belirli bir tarihte geçer (1919); kişisel izlenimler toplumsal olaylarla iç içedir (İstanbul'daki tedirginlik).
**b)** Anı, yazarın yaşamının belirli bir dönemine ve tanık olduğu olaylara odaklanır; otobiyografi yazarın doğumundan itibaren hayatının tamamını kronolojik olarak anlatır.`,
        olcut: [[15, "İki kanıtlı özellik ve doğru fark"], [10, "İki özellik, fark eksik ya da tersi"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Yazma", puan: 15,
        metin: r`"Bir eşyanın hatırası" konulu, **en az 5 cümlelik** bir anı paragrafı yazınız. Paragrafınızda birinci kişi anlatım, zaman ve mekân bildiren ifadeler ve en az bir duygu ifadesi bulunsun.`,
        cevap: r`Öğrencinin özgün metni. Örnek: "İlkokula başladığım ilk gün, dedem bana kenarları yıpranmış mavi bir kalem kutusu vermişti. Köyümüzün tozlu yolunda okula yürürken kutuyu iki elimle göğsüme bastırıyordum. ..."

Değerlendirmede: anı türüne uygunluk, birinci kişi anlatım, zaman-mekân unsurları, duygu, yazım ve noktalama.`,
        olcut: [[15, "Tüm ölçütler karşılanmış, yazım ve noktalama hatası en fazla 2"], [10, "Tür ve anlatım uygun, bir ölçüt eksik ya da 3-5 yazım hatası"], [5, "Paragraf yazılmış ama birden çok ölçüt eksik"], [0, "Yazılmamış ya da konu dışı"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Anlatıcı ve bakış açısı", puan: 14,
        metin: r`Aşağıdaki cümleleri bakış açısı bakımından sınıflandırınız (kahraman, gözlemci, ilahi/hâkim):

**a)** "Kapıyı açtım; içeride kimse yoktu, ama kalbim neden bu kadar hızlı çarpıyordu?"
**b)** "Adam masaya oturdu, çantasını açtı, iki kâğıt çıkardı ve pencereye baktı."
**c)** "Ayşe gülümsüyordu ama içinden, kardeşinin bu sırrı yıllarca sakladığını düşünüp öfkeleniyordu."

Her biri için gerekçe yazınız.`,
        cevap: r`**a)** Kahraman bakış açısı: anlatıcı olayı yaşayan kişi, 1. tekil kişi ("açtım", "kalbim").
**b)** Gözlemci bakış açısı: anlatıcı yalnızca dışarıdan görüleni aktarır, kişinin iç dünyasını bilmez.
**c)** İlahi (hâkim) bakış açısı: anlatıcı kahramanın iç dünyasını, düşüncelerini ve geçmişini bilir.`,
        olcut: [[14, "Üç sınıflandırma gerekçeli"], [9, "Üçü doğru, gerekçeler eksik"], [4, "Bir-iki doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Şiirde ahenk ve ölçü", puan: 14,
        metin: r`Yunus Emre'nin dizeleri:

> Gelin tanış olalım
> İşin kolay kılalım
> Sevelim sevilelim
> Dünya kimseye kalmaz

**a)** Dizelerin hece sayısını ve ölçüsünü yazınız.
**b)** Şiirde ahengi sağlayan iki unsuru örnekle gösteriniz.
**c)** Şiirin ana düşüncesini bir cümleyle yazınız.`,
        cevap: r`**a)** Her dize 7 hece: 7'li hece ölçüsü (4+3 duraklı).
**b)** Ölçü (eşit hece sayısı), kafiye ve redif ("-alım" sesleri: olalım/kılalım), tekrarlar ("sevelim sevilelim" — aynı kökten kelimeler, ses tekrarı).
**c)** Dünya geçicidir; insanlar birbirini sevmeli ve dostça yaşamalıdır.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Gezi yazısı", puan: 14,
        metin: r`Gezi yazısının amacı nedir? Bir gezi yazısında bulunması gereken üç unsuru yazınız ve gezi yazısının öğretici metin olmasına karşın neden öznel unsurlar da taşıdığını açıklayınız.`,
        cevap: r`Amaç: Yazarın gezip gördüğü yerleri, insanları, kültürü okura tanıtmak ve izlenimlerini aktarmak.

Unsurlar: mekân tasvirleri (doğa, yapılar), yerel halkın yaşayışı ve gelenekleri, tarihî ve coğrafi bilgiler, yazarın kişisel gözlem ve izlenimleri, tarih/zaman bilgisi.

Gezi yazısı bilgi verdiği için öğreticidir; ama yazar gördüklerini kendi duygu ve yorumuyla anlattığı için öznel unsurlar taşır ve edebî bir dil kullanabilir.`,
        olcut: [[14, "Amaç, üç unsur ve öznellik açıklaması"], [9, "Üç bölümden ikisi"], [4, "Bir bölüm"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Roman çözümleme", puan: 14,
        metin: r`Reşat Nuri Güntekin'in *Çalıkuşu* romanında Feride, İstanbul'dan Anadolu'ya öğretmen olarak gider.

**a)** Romanın temasını ve dönemin hangi toplumsal gerçekliğini yansıttığını yazınız.
**b)** Romanın büyük bölümünün Feride'nin **günlükleri** ile anlatılması okura ne kazandırır?`,
        cevap: r`**a)** Tema: idealizm, fedakârlık, aşk ve kırgınlık; Anadolu'nun eğitim ve yoksulluk sorunları. Roman, Meşrutiyet ve I. Dünya Savaşı yıllarında Anadolu'nun geri kalmışlığını ve öğretmenlerin zorluklarını yansıtır.
**b)** Günlük (birinci kişi) anlatım, kahramanın iç dünyasını, duygu değişimlerini samimi ve doğrudan aktarır; okur olaylara Feride'nin gözünden bakar, empati kurar.`,
        olcut: [[14, "Tema, toplumsal gerçeklik ve günlük tekniğinin katkısı"], [9, "İkisi doğru"], [4, "Biri doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Anlatım teknikleri", puan: 14,
        metin: r`Aşağıdaki parçalarda kullanılan anlatım tekniğini yazınız:

**a)** "Annesi pencereden bağırdı: — Yemeğe gel! — Geliyorum anne!"
**b)** "Acaba gerçekten gitmeli miydi? Ya kimse onu beklemiyorsa? Belki de en doğrusu…"
**c)** "Uzun boylu, kır saçlı, gözlüklerinin ardından herkese şüpheyle bakan bir adamdı."`,
        cevap: r`**a)** Diyalog (karşılıklı konuşma) tekniği.
**b)** İç konuşma / iç monolog: kahramanın kendi kendine düşünmesi, soru ve tereddütler.
**c)** Betimleme (tasvir): kişinin dış görünüşü ve tavrı anlatılmış.`,
        olcut: [[14, "Üçü doğru"], [9, "İkisi doğru"], [4, "Biri doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Eleştiri metni", puan: 15,
        metin: r`Eleştiri türünün amacını açıklayınız. İyi bir eleştiri yazısında bulunması gereken üç özelliği yazınız ve eleştiri ile "beğenmediğini söylemek" arasındaki farkı bir cümleyle belirtiniz.`,
        cevap: r`Amaç: Bir eseri, olumlu ve olumsuz yönleriyle inceleyip değerlendirmek; okura eser hakkında fikir vermek.

Özellikler: esere dayalı somut örnek ve kanıt kullanması; nesnel ölçütlere (dil, kurgu, tema, üslup) göre değerlendirmesi; olumlu ve olumsuz yönleri dengeli göstermesi; yazarın kişiliğini değil eseri değerlendirmesi; saygılı bir dil.

Fark: Eleştiri gerekçeli ve ölçütlere dayalı bir değerlendirmedir; "beğenmedim" demek ise gerekçesiz kişisel bir tepkidir.`,
        olcut: [[15, "Amaç, üç özellik ve fark"], [10, "Üç bölümden ikisi"], [5, "Bir bölüm"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Yazma: otobiyografik paragraf", puan: 15,
        metin: r`Âşık Veysel'in hayatından hareketle, **kendi hayatınızdan bir dönüm noktasını** anlatan, en az 6 cümlelik otobiyografik bir paragraf yazınız. Paragrafınızda kronolojik sıra, birinci kişi anlatım ve o olayın sizi nasıl değiştirdiğine dair bir değerlendirme bulunsun.`,
        cevap: r`Öğrencinin özgün metni. Değerlendirmede: otobiyografik anlatım (1. kişi, gerçek yaşam), kronolojik sıra, dönüm noktasının belirgin olması, değişim/değerlendirme cümlesi, paragraf bütünlüğü, yazım ve noktalama.`,
        olcut: [[15, "Tüm ölçütler karşılanmış, yazım-noktalama hatası en fazla 2"], [10, "Bir ölçüt eksik ya da 3-5 yazım hatası"], [5, "Paragraf var ama birden çok ölçüt eksik"], [0, "Yazılmamış ya da konu dışı"]] }
    ] }
  ] };
})();
