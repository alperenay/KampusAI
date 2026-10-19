/* 10. Sınıf Coğrafya — Maarif Modeli açık uçlu yazılı sınavları (örnek). Üniteler u1–u7 */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["10/cografya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Uzaktan algılama", puan: 14,
        metin: r`Bir orman yangınından önce ve sonra çekilmiş uydu görüntüleri karşılaştırılıyor.

**a)** Uzaktan algılamanın bu çalışmada sağladığı iki avantajı yazınız.
**b)** CBS ile bu görüntüler başka hangi verilerle birleştirilerek yangın riski haritası üretilebilir? Üç veri yazınız.`,
        cevap: r`**a)** Geniş ve ulaşılması zor alanları hızlı ve düşük maliyetle izleme; zaman içindeki değişimi karşılaştırabilme; yanan alanın büyüklüğünü ölçebilme; güvenlik (sahaya gitmeden).
**b)** Bitki örtüsü türü ve yoğunluğu, sıcaklık ve nem, rüzgâr yönü/hızı, eğim ve bakı, yerleşmelere ve yollara uzaklık, geçmiş yangın kayıtları.`,
        olcut: [[14, "İki avantaj ve üç veri"], [9, "Dört unsur"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Levha tektoniği", puan: 14,
        metin: r`Türkiye, Avrasya levhası üzerinde; güneyden Afrika ve Arap levhaları tarafından sıkıştırılır.

**a)** Türkiye'nin neden deprem kuşağında olduğunu levha hareketleriyle açıklayınız.
**b)** Türkiye'deki iki büyük fay hattını yazınız.
**c)** Levha sınırlarının üç türünü birer örnekle belirtiniz.`,
        cevap: r`**a)** Arap levhası kuzeye hareket ederek Anadolu levhasını sıkıştırır; Anadolu levhası batıya doğru kaçar. Bu hareketler fay hatları boyunca enerji birikmesine ve depremlere yol açar (Alp-Himalaya kuşağı).
**b)** Kuzey Anadolu Fay Hattı, Doğu Anadolu Fay Hattı (Batı Anadolu fay sistemi de kabul edilir).
**c)** Uzaklaşan: Orta Atlantik Sırtı. Yakınlaşan: Himalayalar (Hint-Avrasya), And Dağları (dalma-batma). Yanal (transform): San Andreas Fayı, Kuzey Anadolu Fayı.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "İç kuvvetler", puan: 14,
        metin: r`Kapadokya'daki peri bacaları, Erciyes ve Hasan dağlarının volkanik faaliyetleri sonucu oluşan tüf tabakalarının aşınmasıyla oluşmuştur.

**a)** Bu oluşumda iç ve dış kuvvetlerin rolünü açıklayınız.
**b)** Türkiye'de volkanik kökenli iki dağ daha yazınız.`,
        cevap: r`**a)** İç kuvvet (volkanizma): yanardağlardan çıkan küller ve lavlar katmanlar hâlinde birikip tüfleri oluşturdu. Dış kuvvetler (akarsu, yağmur, rüzgâr, sıcaklık farkı): yumuşak tüfü aşındırdı; üstteki sert bazalt/andezit kapak altındaki tüfü koruyarak sütun biçimli peri bacalarını oluşturdu.
**b)** Ağrı, Süphan, Nemrut, Tendürek, Karacadağ, Kula volkanları.`,
        olcut: [[14, "İki kuvvetin rolü ve iki dağ"], [9, "Biri tam ya da kuvvetler doğru dağ eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Ayrışma", puan: 14,
        metin: r`Doğu Anadolu'da kayaçlar daha çok parçalanarak, Karadeniz kıyılarında ise daha çok çözünerek ve kimyasal değişime uğrayarak ayrışır.

Bu farkı iklim koşullarıyla açıklayınız. Karstik şekillerin oluşumunda hangi tür ayrışmanın etkili olduğunu yazınız.`,
        cevap: r`Doğu Anadolu'da gece-gündüz ve mevsimler arası sıcaklık farkı büyüktür, don olayı sıktır; kayaç çatlaklarındaki suyun donup genleşmesi fiziksel (mekanik) ayrışmaya yol açar. Karadeniz'de nem ve yağış fazla, sıcaklık ılımandır; bu da kimyasal ayrışmayı (çözünme, oksitlenme) hızlandırır.

Karstik şekiller: kimyasal ayrışma (karbonatlı suyun kireç taşını çözmesi) ile oluşur.`,
        olcut: [[14, "İki bölgenin iklimle açıklaması ve karst"], [9, "Bir bölge tam ve karst"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Yer şekilleri", puan: 14,
        metin: r`Aşağıdaki yer şekillerinin hangi dış kuvvetle oluştuğunu yazınız ve birinin oluşumunu açıklayınız:

**a)** Menderes **b)** Mantar kaya **c)** Sirk gölü **d)** Tombolo **e)** Obruk`,
        cevap: r`**a)** Akarsu (eğimin azaldığı yerlerde yatağın kıvrılması). **b)** Rüzgâr (kum yüklü rüzgârın kayaçların alt kısmını aşındırması). **c)** Buzul (buzulların oyduğu çanakların suyla dolması). **d)** Dalga ve akıntılar (bir adanın kıyıya kum kordonuyla bağlanması). **e)** Karstik süreç (kimyasal çözünme ile tavanın çökmesi).`,
        olcut: [[14, "Beşi doğru ve bir oluşum açıklaması"], [9, "Dört doğru ve açıklama"], [4, "İki-üç doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Saha çalışması", puan: 15,
        metin: r`Bir okul, yakınındaki akarsu vadisine saha gezisi düzenleyecek.

Bu saha çalışması için **iki gözlem sorusu**, **iki veri toplama yöntemi** ve **bir güvenlik kuralı** yazınız.`,
        cevap: r`Gözlem soruları: Vadinin şekli V mi U mu? Akarsu hangi kesimde aşındırma, hangisinde biriktirme yapıyor? Taşkın izleri var mı? Vadide yerleşme ve tarım nasıl dağılmış?

Yöntemler: fotoğraf ve kroki çizimi, GPS ile konum kaydı, akış hızı ölçümü (yüzen cisimle), toprak/çakıl örneği, yerel halkla görüşme.

Güvenlik: Akarsuya girmemek, öğretmen gözetiminde gruplar hâlinde hareket etmek, hava durumunu kontrol etmek, uygun ayakkabı.`,
        olcut: [[15, "Beş unsurun hepsi uygun"], [10, "Dört unsur"], [5, "İki-üç unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Coğrafi bakış", puan: 15,
        metin: r`Bir mahallede yeni bir alışveriş merkezi açılıyor.

"Nerede? Neden orada? Nasıl bir etkisi olacak?" coğrafi sorularını bu olaya uygulayınız; her soruya birer cevap yazınız.`,
        cevap: r`- **Nerede?** Ana ulaşım aksı ve kavşağa yakın, boş arazinin bulunduğu kent çeperinde.
- **Neden orada?** Ulaşım kolaylığı, nüfus yoğunluğu (pazar), geniş ve uygun fiyatlı arazi, otopark alanı.
- **Etkisi:** Trafik yoğunluğu artar; çevredeki küçük esnaf etkilenir; yeni iş olanakları doğar; arazi değerleri yükselir; çevresel (gürültü, geçirimsiz yüzey) etkiler.`,
        olcut: [[15, "Üç soru gerekçeli"], [10, "İki soru tam"], [5, "Bir soru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u4", beceri: "Yerleşme kuruluş faktörleri", puan: 14,
        metin: r`İstanbul, Ankara ve Zonguldak farklı nedenlerle kurulup gelişmiş şehirlerdir.

Her şehrin kuruluşunda ve gelişmesinde etkili olan birer temel faktörü açıklayınız.`,
        cevap: r`- **İstanbul:** Boğaz ve doğal liman (Haliç); ticaret yollarının kesiştiği stratejik konum, tarih boyunca başkent olması.
- **Ankara:** Başkent ilan edilmesi (yönetim fonksiyonu), İç Anadolu'nun merkezinde ulaşım kavşağı olması, savunmaya elverişli konum.
- **Zonguldak:** Taş kömürü yatakları (madencilik).`,
        olcut: [[14, "Üç şehir doğru faktörle"], [9, "İki şehir"], [4, "Bir şehir"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Yerleşme fonksiyonları", puan: 14,
        metin: r`Bodrum, Karabük ve Bursa'yı temel fonksiyonlarına göre sınıflandırınız. Bir şehrin fonksiyonunun zamanla değişebileceğini bir örnekle açıklayınız.`,
        cevap: r`Bodrum: turizm. Karabük: sanayi (demir-çelik). Bursa: sanayi (otomotiv, tekstil), ticaret, tarih ve kültür; ayrıca turizm (Uludağ).

Örnek: Zonguldak madencilik şehriydi; madenler azaldıkça hizmet ve eğitim (üniversite) fonksiyonu güçleniyor. Ya da küçük bir balıkçı kasabası olan Bodrum'un turizm merkezine dönüşmesi.`,
        olcut: [[14, "Üç sınıflandırma ve değişim örneği"], [9, "İkisi doğru ve örnek"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Ekonomik sektörler", puan: 14,
        metin: r`Bir ülkenin çalışan nüfusunun sektörlere dağılımı:

| Ülke | Tarım | Sanayi | Hizmet |
|---|---|---|---|
| A | %55 | %15 | %30 |
| B | %3 | %22 | %75 |

**a)** Hangi ülke gelişmiş ülke özelliği gösterir? Gerekçelendiriniz.
**b)** Birincil, ikincil ve üçüncül sektöre birer örnek veriniz.`,
        cevap: r`**a)** B ülkesi: tarımda çalışan oranı düşük, hizmet sektöründe çalışan oranı yüksek; makineleşme ve verimlilik yüksek, ekonomi çeşitlenmiş. A ülkesinde nüfusun yarısından fazlası tarımdadır (gelişmekte olan ülke).
**b)** Birincil: tarım, balıkçılık, madencilik, ormancılık. İkincil: sanayi (otomobil fabrikası, un fabrikası). Üçüncül: eğitim, sağlık, turizm, bankacılık, ulaştırma.`,
        olcut: [[14, "Gerekçeli seçim ve üç örnek"], [9, "Seçim doğru, örnekler eksik ya da tersi"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Türkiye ekonomisi", puan: 14,
        metin: r`Türkiye ekonomisinde son 50 yılda tarımın payı azalmış, hizmet ve sanayinin payı artmıştır.

Bu dönüşümün iki nedenini ve iki sonucunu açıklayınız.`,
        cevap: r`Nedenler: tarımda makineleşme ve iş gücü ihtiyacının azalması; kentleşme ve kırdan kente göç; sanayi yatırımları ve dış ticaretin artması; eğitim düzeyinin yükselmesi; turizmin gelişmesi.

Sonuçlar: kentsel nüfusun artması; kişi başına gelirin yükselmesi; kırsal nüfusun yaşlanması; çevre sorunlarının ve şehirleşme sorunlarının artması; ihracatta sanayi ürünlerinin payının artması.`,
        olcut: [[14, "İki neden ve iki sonuç"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Dirençli yaşam alanları", puan: 14,
        metin: r`Bir belediye, afetlere dirençli bir şehir olmak için plan hazırlıyor.

Dirençli şehir kavramını açıklayınız. Belediyenin deprem ve sel riskine karşı alabileceği ikişer önlem yazınız.`,
        cevap: r`Dirençli şehir, afetlerden önce hazırlanan, afet anında zararı en aza indiren ve sonrasında hızla toparlanabilen şehirdir.

Deprem: zemin etütleri ve deprem yönetmeliğine uygun yapılaşma, riskli binaların kentsel dönüşümü, toplanma alanları, tatbikatlar. Sel: dere yataklarına yapılaşmanın yasaklanması, yağmur suyu altyapısı ve taşkın kanalları, geçirgen yüzeyler ve yeşil alanlar, erken uyarı sistemleri.`,
        olcut: [[14, "Tanım ve dört önlem"], [9, "Tanım ve iki-üç önlem"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u7", beceri: "Kültürel coğrafya", puan: 15,
        metin: r`Türk kültürünün izleri Orta Asya'dan Balkanlara kadar geniş bir coğrafyada görülür.

**a)** Türk kültürünün mekânsal yayılışını sağlayan iki tarihsel süreci yazınız.
**b)** Bu kültürün mekâna yansıyan iki somut örneğini (mimari, yer adları vb.) veriniz.`,
        cevap: r`**a)** Göçler (Orta Asya'dan Anadolu'ya), devletlerin kuruluşu ve fetihler (Selçuklu, Osmanlı), ticaret yolları, iskân politikası.
**b)** Kervansaraylar, camiler ve köprüler (Mostar Köprüsü, Sokullu Mehmet Paşa Köprüsü); Balkanlardaki Türkçe yer adları; Türk mutfağı ve çarşı (bedesten) yapıları; Orta Asya'dan Anadolu'ya benzer halı motifleri.`,
        olcut: [[15, "İki süreç ve iki örnek"], [10, "Üç unsur"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Haritalama", puan: 15,
        metin: r`Bir öğrenci okulundaki öğrencilerin evden okula ulaşım yollarını (yürüme, servis, toplu taşıma) haritada göstermek istiyor.

Bu veriyi haritaya aktarmak için uygun bir gösterim yöntemi öneriniz (nokta, renk, sembol vb.). Haritada mutlaka bulunması gereken üç harita elemanını yazınız.`,
        cevap: r`Gösterim: Her öğrencinin ev konumu nokta ile, ulaşım türü farklı renk ya da sembolle (ör. yeşil nokta yürüme, mavi servis, kırmızı toplu taşıma) gösterilebilir; yoğunluk için ısı haritası da kullanılabilir.

Harita elemanları: başlık, lejant (açıklama), ölçek, yön (kuzey oku), kaynak ve tarih.`,
        olcut: [[15, "Uygun gösterim ve üç eleman"], [10, "Gösterim ve iki eleman ya da üç eleman"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
