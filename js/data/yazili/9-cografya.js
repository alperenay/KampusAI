/* 9. Sınıf Coğrafya — Maarif Modeli açık uçlu yazılı sınavları (örnek). Üniteler u1–u7 */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/cografya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Coğrafi sorgulama", puan: 14,
        metin: r`Bir şehirde yeni bir havaalanı yapılacak.

**a)** Bu kararda fiziki coğrafya ile beşerî coğrafyanın ele alacağı birer konuyu yazınız.
**b)** Coğrafyanın "insan–doğa etkileşimi"ni inceleyen bir bilim olduğunu bu örnek üzerinden açıklayınız.`,
        cevap: r`**a)** Fiziki: yer şekilleri (düz alan), hâkim rüzgâr yönü, sis ve iklim koşulları, zemin ve deprem riski. Beşerî: nüfusun dağılışı ve ulaşım bağlantısı, ekonomik faaliyetler, yerleşmeye uzaklık ve gürültü.
**b)** Doğal koşullar havaalanının yerini sınırlar (doğadan insana etki); havaalanı da arazi kullanımını, ekosistemi ve kentin büyüme yönünü değiştirir (insandan doğaya etki).`,
        olcut: [[14, "İki konu ve karşılıklı etkileşim"], [9, "İki konu doğru, etkileşim tek yönlü"], [4, "Bir konu"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Harita okuma: ölçek", puan: 14,
        metin: r`1:500 000 ölçekli bir haritada iki şehir arası 6 cm ölçülüyor.

**a)** Gerçek uzaklık kaç km'dir?
**b)** Aynı alan 1:50 000 ölçekli haritada gösterilseydi bu iki şehir arası kaç cm olurdu?
**c)** Hangi harita daha ayrıntılıdır? Neden?`,
        cevap: r`**a)** $6 \cdot 500\,000 = 3\,000\,000$ cm $= 30$ km.
**b)** $3\,000\,000 / 50\,000 = 60$ cm.
**c)** 1:50 000; ölçeği büyüktür (paydası küçük), küçültme oranı azdır, daha çok ayrıntı gösterir.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Matematik konum ve yerel saat", puan: 14,
        metin: r`Türkiye'nin doğusundaki Iğdır (yaklaşık 44° D) ile batısındaki Gökçeada (yaklaşık 26° D) arasında güneş saatine göre fark vardır.

**a)** İki yer arasındaki yerel saat farkını hesaplayınız.
**b)** Türkiye'de neden tek bir ortak saat (UTC+3) kullanılır? Bir yararını ve bir sakıncasını yazınız.`,
        cevap: r`**a)** Boylam farkı $44 - 26 = 18°$; her 1° için 4 dk: $18 \cdot 4 = 72$ dk = 1 saat 12 dakika. Güneş Iğdır'da daha erken doğar.
**b)** Ortak saat ulaşım, iletişim, ekonomi ve resmî işlerde birlik sağlar. Sakınca: doğu ile batı arasında gün ışığından yararlanma farkı; batıda kışın sabahları uzun süre karanlık olması.`,
        olcut: [[14, "72 dk ve yarar-sakınca"], [9, "Hesap doğru, b eksik"], [4, "Boylam farkı doğru, dakika hatalı"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Konum değerlendirme", puan: 14,
        metin: r`Türkiye'nin **özel (göreceli) konumu**nun ülkeye sağladığı üç avantajı yazınız. Bunlardan birini ekonomik açıdan açıklayınız.`,
        cevap: r`Avantajlar: Asya, Avrupa ve Afrika arasında köprü olması; üç tarafının denizlerle çevrili olması; Boğazlar; enerji kaynaklarına (Orta Doğu, Hazar) yakınlık ve boru hattı güzergâhında bulunması; zengin tarihî-kültürel miras.

Örnek açıklama: Boğazlar Karadeniz ile Akdeniz arasındaki tek deniz yolu olduğu için Türkiye'ye deniz ticareti, liman hizmetleri ve jeopolitik önem kazandırır.`,
        olcut: [[14, "Üç avantaj ve ekonomik açıklama"], [9, "Üç avantaj, açıklama yok ya da iki avantaj ve açıklama"], [4, "Bir avantaj"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Mekânsal bilgi teknolojileri", puan: 14,
        metin: r`Bir belediye, sel riski taşıyan mahalleleri belirlemek için **Coğrafi Bilgi Sistemleri (CBS)** kullanmak istiyor.

**a)** CBS'nin üç bileşenini yazınız.
**b)** Bu çalışmada hangi veri katmanlarının üst üste çakıştırılması gerekir? Üç örnek veriniz.`,
        cevap: r`**a)** Donanım, yazılım, veri, insan (kullanıcı), yöntem.
**b)** Akarsu ağı ve dere yatakları, yükselti/eğim haritası, yağış verileri, yerleşim ve bina katmanı, zemin geçirgenliği, geçmiş sel kayıtları.`,
        olcut: [[14, "Üç bileşen ve üç katman"], [9, "İkisinden biri tam"], [4, "Bir-iki doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Veri yorumlama: iklim grafiği", puan: 15,
        metin: r`Bir istasyonun verileri: en sıcak ay ortalaması 25 °C (Temmuz), en soğuk ay 9 °C (Ocak). Yağışın çoğu kışın düşüyor, yazlar kurak.

**a)** Bu iklim tipini adlandırınız ve Türkiye'de nerede görüldüğünü yazınız.
**b)** Bu iklimin doğal bitki örtüsünü ve tarımına bir örnek veriniz.`,
        cevap: r`**a)** Akdeniz iklimi; Akdeniz ve Ege kıyıları (ayrıca Marmara'nın güneyi kısmen).
**b)** Bitki örtüsü: maki (kızılçam ormanları da). Tarım: zeytin, turunçgil, pamuk, üzüm.`,
        olcut: [[15, "İklim, yer, bitki örtüsü ve tarım"], [10, "Üçü doğru"], [5, "Biri-ikisi doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Neden-sonuç: iklim değişikliği", puan: 15,
        metin: r`Son 50 yılda dünya ortalama sıcaklığı yükselmiş, buzullar erimeye başlamıştır.

**a)** Küresel iklim değişikliğinin insan kaynaklı iki nedenini yazınız.
**b)** Türkiye'ye olası iki etkisini açıklayınız.
**c)** Bireysel olarak alınabilecek bir önlem yazınız.`,
        cevap: r`**a)** Fosil yakıt kullanımı (CO₂ salımı), ormansızlaşma, sanayi ve ulaşım kaynaklı sera gazları, hayvancılıkta metan.
**b)** Kuraklık ve su kaynaklarının azalması; orman yangınlarının artması; tarımsal üretimin düşmesi; sel gibi aşırı hava olaylarının sıklaşması; deniz seviyesinin yükselmesiyle kıyı riskleri.
**c)** Toplu taşıma/bisiklet kullanmak, enerji ve su tasarrufu, geri dönüşüm, ağaçlandırma.`,
        olcut: [[15, "İki neden, iki etki, bir önlem"], [10, "Dört unsur"], [5, "İki unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u4", beceri: "Nüfus piramidi yorumlama", puan: 14,
        metin: r`İki ülkenin nüfus piramitleri: A ülkesinin piramidi tabanı geniş, tepesi dar; B ülkesinin piramidi tabanı dar, orta ve üst yaş grupları geniş.

**a)** Hangi ülkede doğum oranı daha yüksektir?
**b)** B ülkesinin gelecekte karşılaşabileceği iki sorunu yazınız.
**c)** Hangi ülke gelişmiş ülke özelliği gösterir?`,
        cevap: r`**a)** A ülkesi (genç nüfus fazla).
**b)** Yaşlı nüfusun artması; çalışan nüfusun azalması ve iş gücü açığı; sağlık ve emeklilik harcamalarının artması; nüfusun azalması.
**c)** B ülkesi (doğum ve ölüm oranı düşük, ortalama yaşam süresi uzun).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Göç ve dağılış", puan: 14,
        metin: r`Türkiye'de 1950'lerden sonra kırsaldan kentlere yoğun göç yaşanmıştır.

**a)** Bu göçün iki itici, iki çekici nedenini yazınız.
**b)** Göç alan büyük şehirlerde ortaya çıkan iki sorunu belirtiniz.`,
        cevap: r`**a)** İtici: tarımda makineleşme ve iş gücü fazlası, toprakların miras yoluyla bölünmesi, eğitim ve sağlık hizmetlerinin yetersizliği, düşük gelir. Çekici: sanayi ve hizmet sektöründe iş olanakları, eğitim-sağlık hizmetleri, sosyal ve kültürel olanaklar.
**b)** Çarpık kentleşme ve gecekondulaşma; işsizlik; altyapı, ulaşım ve konut yetersizliği; çevre kirliliği.`,
        olcut: [[14, "Dört neden ve iki sorun"], [9, "Dört-beş unsur"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Ekonomik faaliyet ve doğal faktörler", puan: 14,
        metin: r`Rize'de çay, Antalya'da muz ve seracılık, Konya'da tahıl tarımı yaygındır.

Her örneği, onu mümkün kılan **doğal faktör**lerle (iklim, yer şekilleri, toprak) açıklayınız.`,
        cevap: r`- **Rize – çay:** Her mevsim yağışlı, ılıman Karadeniz iklimi; asitli topraklar; eğimli yamaçlar çay için uygundur.
- **Antalya – muz ve seracılık:** Kışların ılık geçmesi (don olayı az), yüksek güneşlenme süresi.
- **Konya – tahıl:** Geniş düz ovalar, makineli tarıma uygun; az yağışlı karasal iklimde yetişebilen buğday ve arpa.`,
        olcut: [[14, "Üç örnek doğal faktörle"], [9, "İki örnek tam"], [4, "Bir örnek tam"], [0, "Yanlış ya da boş"]] },
      { tema: "u5", beceri: "Beşerî faktörler", puan: 14,
        metin: r`Doğal koşulları birbirine benzeyen iki ilden birinde sanayi çok gelişmişken diğerinde gelişmemiştir.

Bu farkı açıklayabilecek **üç beşerî faktör** yazınız ve birini açıklayınız.`,
        cevap: r`Beşerî faktörler: sermaye birikimi, nitelikli iş gücü, ulaşım ağı (liman, otoyol, demiryolu), pazara yakınlık, devlet teşvikleri ve yatırım politikaları, teknoloji ve altyapı (enerji, su).

Örnek açıklama: Limana ve otoyola yakın bir şehir hammaddeyi ucuza alır, ürünü kolayca pazara ulaştırır; bu da fabrikaların orayı seçmesini sağlar.`,
        olcut: [[14, "Üç faktör ve açıklama"], [9, "Üç faktör, açıklama yok ya da iki faktör ve açıklama"], [4, "Bir faktör"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Kavramları ayırt etme", puan: 14,
        metin: r`Deprem bölgesinde bulunan bir şehirde binalar depreme dayanıklı yapılmış, halk tatbikatlarla eğitilmiştir. Benzer büyüklükte bir depremde can kaybı çok az olmuştur.

**a)** Tehlike, risk ve afet kavramlarını bu örnek üzerinden açıklayınız.
**b)** Bu şehrin uyguladığı yaklaşım bütüncül afet yönetiminin hangi aşamasıdır?`,
        cevap: r`**a)** Tehlike: depremin olma olasılığı (doğal olay). Risk: tehlikenin can ve mal kaybına yol açma olasılığı; binaların dayanıklılığı ve hazırlıkla azalır. Afet: olayın toplumun baş edemeyeceği kayıplara yol açması; burada hazırlık sayesinde deprem afete dönüşmemiştir.
**b)** Zarar azaltma ve hazırlık (risk yönetimi) aşamaları (afet öncesi).`,
        olcut: [[14, "Üç kavram ve aşama doğru"], [9, "İki kavram ve aşama"], [4, "Bir-iki doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u6", beceri: "Afet bilinci", puan: 15,
        metin: r`Bir ailenin deprem çantasında bulunması gereken beş malzemeyi yazınız. Deprem anında "çök–kapan–tutun" hareketinin neden önerildiğini açıklayınız.`,
        cevap: r`Malzemeler: su, uzun ömürlü yiyecek, el feneri ve yedek pil, düdük, ilk yardım malzemesi, kimlik ve önemli belgelerin kopyaları, kişisel ilaçlar, battaniye, radyo, powerbank.

Çök–kapan–tutun: Sarsıntıda düşmeyi önler, baş ve boynu düşen eşyalardan korur; sağlam bir mobilyaya tutunmak korunaklı alanda kalmayı sağlar. Kaçmaya çalışmak merdiven ve camlar nedeniyle daha tehlikelidir.`,
        olcut: [[15, "Beş malzeme ve hareketin gerekçesi"], [10, "Üç-dört malzeme ve gerekçe ya da beş malzeme gerekçesiz"], [5, "Birkaç doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u7", beceri: "Bölge belirleme", puan: 15,
        metin: r`"Güneydoğu Anadolu Projesi (GAP) bölgesi", "Karadeniz iklim bölgesi" ve "İstanbul metropoliten alanı" birer bölge örneğidir.

**a)** Bu bölgelerin her biri hangi kritere göre belirlenmiştir?
**b)** Bölge sınırlarının neden zamanla değişebileceğini bir örnekle açıklayınız.`,
        cevap: r`**a)** GAP: idari/planlama ve ekonomik kalkınma kriteri (fonksiyonel–plan bölgesi). Karadeniz iklim bölgesi: doğal kriter (iklim, homojen/şekli bölge). İstanbul metropoliten alanı: fonksiyonel kriter (merkezin etki alanı, günlük ulaşım ve iş ilişkileri).
**b)** İnsan faaliyetleri ve doğal koşullar değişir. Örnek: kent büyüdükçe metropoliten alanın sınırı genişler; iklim değişikliğiyle iklim bölgelerinin sınırları kayabilir; yeni bir otoyol bir şehrin etki alanını büyütür.`,
        olcut: [[15, "Üç kriter ve değişim örneği"], [10, "Üçünden ikisi ve örnek"], [5, "Bir-iki doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
