/* 10. Sınıf Türk Dili ve Edebiyatı — Maarif Modeli açık uçlu yazılı sınavları (örnek).
   Temalar: u1 Sözün Ezgisi, u2 Kelimelerin Ritmi, u3 Dünden Bugüne, u4 Nesillerin Mirası.
   Alıntılar telif süresi dolmuş eserlerdendir ya da bu sınav için yazılmıştır. */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["10/edebiyat"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Ahenk unsurlarını çözümleme", puan: 14,
        metin: r`Halk şiiri geleneğinde yazılmış aşağıdaki dörtlüğü okuyunuz:

> Yayla yolu dumanlıdır bu sabah
> Koyun kuzu meleşir de geçilmez
> Gönül derdi pınar gibi taşarsa
> Bir yudum su bile tatlı içilmez

Dörtlükte ahengi sağlayan **dört** unsuru örnekleriyle gösteriniz.`,
        cevap: r`- **Ölçü:** 11'li hece ölçüsü (6+5 duraklı): "Yay-la yo-lu du-man / -lı-dır bu sa-bah".
- **Kafiye ve redif:** "geç-ilmez / iç-ilmez" — "-ilmez" redif, "geç / iç" sözcüklerindeki "-ç" yarım kafiye.
- **Ses tekrarları:** "koyun kuzu", "pınar … taşarsa" dizelerindeki ünsüz ve ünlü tekrarları (aliterasyon, asonans).
- **Dize sonu durakları ve paralel yapı:** 2. ve 4. dizelerin aynı kalıpla bitmesi ritim oluşturur.
- Ayrıca halk söyleyişine özgü yalın, akıcı dil.`,
        olcut: [[14, "Dört unsur örnekli"], [9, "Üç unsur örnekli"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Tür bilgisi", puan: 14,
        metin: r`İslamiyet öncesi Türk edebiyatında **koşuk**, halk edebiyatında **türkü** önemli şiir türleridir.

**a)** Koşuğun hangi törenlerde söylendiğini ve nazım birimini yazınız.
**b)** Türkülerde "varyant" (değişke) oluşmasının nedenini açıklayınız.`,
        cevap: r`**a)** Koşuklar sığır (av) törenlerinde ve şölenlerde söylenen; doğa, aşk, yiğitlik konulu lirik şiirlerdir. Nazım birimi dörtlüktür, hece ölçüsüyle ve genellikle yarım kafiyeyle yazılır.
**b)** Türküler anonimdir ve sözlü gelenekle aktarılır; bölgeden bölgeye ve kuşaktan kuşağa aktarılırken söz ve ezgide değişiklikler olur, aynı türkünün farklı biçimleri (varyantları) ortaya çıkar.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam, diğeri eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Masal ve öğretici metin", puan: 14,
        metin: r`Masalların ortak özelliklerinden **dördünü** yazınız. Masal ile hikâyeyi gerçeklik bakımından karşılaştırınız.`,
        cevap: r`Masal özellikleri: olağanüstü kişi, olay ve mekânlar (dev, peri, konuşan hayvan); zaman ve mekân belirsizdir ("evvel zaman içinde"); tekerleme ile başlar, kalıplaşmış sözlerle biter; iyiler ödüllendirilir, kötüler cezalandırılır; anonimdir, sözlü gelenekle aktarılır; ders verir.

Karşılaştırma: Masalda olaylar gerçek dışıdır, inandırıcılık kaygısı yoktur. Hikâyede olaylar gerçek ya da gerçeğe uygundur (kurmaca ama gerçekçi).`,
        olcut: [[14, "Dört özellik ve karşılaştırma"], [9, "Üç özellik ve karşılaştırma ya da dört özellik"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Aruz ve gazel", puan: 14,
        metin: r`Gazel ve kaside Divan edebiyatının iki önemli nazım biçimidir.

**a)** Gazelin konusu ve beyit sayısı hakkında bilgi veriniz.
**b)** Gazelde "matla", "makta" ve "beytü'l-gazel" ne demektir?
**c)** Aruz ölçüsünün hece ölçüsünden temel farkını yazınız.`,
        cevap: r`**a)** Aşk, sevgili, şarap, güzellik gibi lirik konular işlenir; genellikle 5–15 beyitten oluşur.
**b)** Matla: ilk beyit (dizeleri kendi arasında kafiyeli). Makta: şairin mahlasının geçtiği son beyit. Beytü'l-gazel: gazelin en güzel beyti.
**c)** Hece ölçüsünde hece **sayısı** eşitliği esastır; aruzda hecelerin **açıklık–kapalılık** (uzunluk–kısalık) düzeni esastır.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Metin yorumlama: kaside", puan: 14,
        metin: r`Fuzûlî'nin *Su Kasîdesi*'nin ilk beyti:

> Saçma ey göz eşkden gönlümdeki odlara su
> Kim bu denlü dutuşan odlara kılmaz çâre su

(Ey göz, gönlümdeki ateşlere gözyaşı serpme; çünkü bu kadar alevlenmiş ateşlere su çare olmaz.)

**a)** Beyitte "ateş" ve "su" neyi simgeler?
**b)** Kasidenin bölümlerinden ikisini yazınız. *Su Kasîdesi* kime yazılmıştır?`,
        cevap: r`**a)** Ateş, şairin gönlündeki aşk acısını/ayrılık özlemini; su, gözyaşını simgeler. Gözyaşı bu büyük acıyı dindirmez.
**b)** Nesib (teşbib, giriş), girizgâh, methiye, fahriye, dua. *Su Kasîdesi* Hz. Muhammed için yazılmış bir naattır.`,
        olcut: [[14, "Simgeler, iki bölüm ve kime yazıldığı"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Saf şiir anlayışı", puan: 15,
        metin: r`"Saf (öz) şiir" anlayışının temel özelliklerini yazınız. Bu anlayışın Cumhuriyet döneminde Necip Fazıl'ın şiirinde nasıl görüldüğünü (tema ve ses bakımından) açıklayınız.`,
        cevap: r`Saf şiir: şiirin anlamdan çok ses, ahenk, imge ve çağrışıma dayanması; şiirin öğretici ve toplumsal amaçlardan arındırılması; kapalı ve sembolik anlatım; ölçü ve kafiyeye özen.

Necip Fazıl'da: hece ölçüsünü ustaca kullanan ahenkli bir şiir; "Kaldırımlar" gibi şiirlerde yalnızlık, ölüm korkusu, şehir ve gece temaları; iç dünyanın sembolik imgelerle (kaldırım, gece, sokak) anlatımı; sonraki döneminde metafizik ve dinî arayış.`,
        olcut: [[15, "Saf şiir özellikleri ve Necip Fazıl örneği"], [10, "Biri tam, diğeri eksik"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Yazma: söyleşi", puan: 15,
        metin: r`**Söyleşi (sohbet)** türünün özelliklerini göz önünde bulundurarak "Telefon ekranında kaybolan zaman" konulu, en az 6 cümlelik bir söyleşi paragrafı yazınız. Paragrafınızda okurla konuşur gibi bir dil, kişisel görüş ve en az bir örnek bulunsun.`,
        cevap: r`Öğrencinin özgün metni. Değerlendirme: söyleşi türüne uygun samimi, konuşma dili ("siz de fark etmişsinizdir", "ne dersiniz?"); kişisel görüş; somut örnek; paragraf bütünlüğü; yazım ve noktalama.`,
        olcut: [[15, "Tür özellikleri, örnek ve doğru yazım (en fazla 2 hata)"], [10, "Bir ölçüt eksik ya da 3-5 yazım hatası"], [5, "Paragraf var, birden çok ölçüt eksik"], [0, "Yazılmamış ya da konu dışı"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Destan ve motif", puan: 14,
        metin: r`*Oğuz Kağan Destanı*'nda Oğuz Kağan doğduktan sonra annesinden bir kez süt emer, kırk günde büyüyüp yürür; ordusuna gök ışığı içinden çıkan **bozkurt** yol gösterir.

**a)** Bu parçadaki iki motifi yazınız ve anlamlarını açıklayınız.
**b)** Destanların ortak özelliklerinden üçünü yazınız.`,
        cevap: r`**a)** Olağanüstü doğum ve hızlı büyüme: kahramanın sıradan insanlardan üstün olduğunu gösterir. Bozkurt (kurt) motifi: Türklerde kutsal yol göstericidir, ilahi destek ve kurtuluşu simgeler. (Kırk sayısı da motif olarak kabul edilir.)
**b)** Milletin ortak hafızasının ürünüdür, anonimdir; olağanüstü kahramanlar ve olaylar vardır; milletin hayatını derinden etkileyen olaylar (savaş, göç, kuruluş) anlatılır; nazımla ve sözlü gelenekle aktarılır.`,
        olcut: [[14, "İki motif anlamıyla ve üç özellik"], [9, "Dört-beş unsur"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Mesnevi ve fabl", puan: 14,
        metin: r`Şeyhî'nin *Harnâme*'si bir eşeğin boynuz bulmaya çıkıp kulaklarını kaybetmesini anlatır.

**a)** *Harnâme*'nin nazım biçimini ve türünü (fabl özellikleri) yazınız.
**b)** Eserin verdiği mesajı ve dönemine yönelik eleştirisini açıklayınız.`,
        cevap: r`**a)** Mesnevi nazım biçimiyle yazılmıştır (her beyit kendi arasında kafiyeli). Türü fabldır: hayvanlar konuşur, insan davranışları hayvanlar üzerinden anlatılır ve sonunda ders verilir.
**b)** Mesaj: Elindekiyle yetinmeyen, açgözlü olan kişi sahip olduğunu da kaybeder ("boynuz ararken kulaklarından olmak"). Şeyhî, hizmetine karşılık beklediği ödülü alamamasını ve haksızlıkları mizahi bir dille eleştirmiştir (toplumsal ve kişisel taşlama).`,
        olcut: [[14, "Biçim, fabl özellikleri, mesaj ve eleştiri"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Karşılaştırma", puan: 14,
        metin: r`Mevlana'nın *Mesnevi*'sindeki hikâyeler ile La Fontaine'in fablları karşılaştırıldığında hangi ortak ve farklı yönler görülür? Birer ortak ve farklı yön yazınız. Fablların günümüz okuru için değerini bir cümleyle belirtiniz.`,
        cevap: r`Ortak: kısa hikâyelerle ahlaki/öğretici ders vermeleri; hayvanların ve sembolik kişilerin kullanılması.
Farklı: Mevlana'nın hikâyeleri tasavvufi (manevi) anlam katmanları taşır ve uzun bir eserin içinde birbirine bağlanır; La Fontaine'in fablları daha çok toplumsal ve ahlaki eleştiriye yöneliktir ve bağımsızdır.
Değer: Evrensel insan davranışlarını kısa ve akılda kalıcı biçimde düşündürür.`,
        olcut: [[14, "Ortak, farklı ve değer"], [9, "İkisi doğru"], [4, "Biri doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Metin çözümleme: Dede Korkut", puan: 14,
        metin: r`*Dede Korkut Hikâyeleri*'nde Dede Korkut hikâyelerin sonunda gelip "boy boylar, soy soylar" ve dua eder.

**a)** Dede Korkut'un hikâyelerdeki rolü nedir?
**b)** Hikâyelerin destan ile halk hikâyesi arasında bir "geçiş dönemi" ürünü sayılmasının iki nedenini yazınız.`,
        cevap: r`**a)** Bilge, ozan ve yol gösterici bir kişidir; sorunlara çözüm bulur, kahramanlara ad verir, hikâyeyi derleyip anlatır ve dua ile bitirir.
**b)** Destan özellikleri (olağanüstülük, Oğuz boylarının yiğitlik mücadeleleri, sözlü gelenek) ile halk hikâyesi özellikleri (nazım-nesir karışık anlatım, daha gerçekçi kişiler, İslami unsurların görülmesi) bir aradadır.`,
        olcut: [[14, "Rol ve iki neden"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Dönem özellikleri", puan: 14,
        metin: r`Namık Kemal'in *Hürriyet Kasîdesi*'nden:

> Görüp ahkâm-ı asrı münharif sıdk u selâmetten
> Çekildik izzet ü ikbal ile bâb-ı hükûmetten

(Çağın yargılarını doğruluk ve esenlikten sapmış görünce, onurumuzla hükûmet kapısından çekildik.)

Bu beyitten ve şairden hareketle Tanzimat şiirinin iki özelliğini yazınız. Divan şiiriyle bir benzerlik, bir farklılık belirtiniz.`,
        cevap: r`Tanzimat şiiri özellikleri: hürriyet, vatan, adalet, eşitlik gibi toplumsal konular işlenir; şiir topluma seslenen, fikir taşıyan bir araçtır; eski nazım biçimleri yeni içerikle kullanılır.

Benzerlik: kaside nazım biçimi, aruz ölçüsü ve Arapça-Farsça kelimeler kullanılması. Farklılık: konu bireysel aşk ya da övgü değil, toplumsal ve siyasi bir eleştiri (hürriyet) olması.`,
        olcut: [[14, "İki özellik, benzerlik ve farklılık"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Millî Edebiyat hikâyesi", puan: 15,
        metin: r`Ömer Seyfettin'in hikâyeleri Millî Edebiyat döneminin özelliklerini taşır.

**a)** Ömer Seyfettin'in "Yeni Lisan" hareketindeki rolünü açıklayınız.
**b)** Hikâyelerinin üç özelliğini yazınız; bildiğiniz bir hikâyesinin adını veriniz.`,
        cevap: r`**a)** Ali Canip ve Ziya Gökalp ile birlikte *Genç Kalemler* dergisinde "Yeni Lisan" makalesiyle sade, konuşulan İstanbul Türkçesine dayalı bir yazı dilini savundu; Arapça-Farsça kuralların ve terkiplerin kullanılmamasını istedi.
**b)** Sade ve açık dil; olay hikâyesi (Maupassant tarzı), merak unsuru ve şaşırtıcı son; tarih, millî duygu, toplumsal eleştiri ve çocukluk anıları konuları; mizah ve ironi. Örnek: "Kaşağı", "Diyet", "Forsa", "Bomba", "Pembe İncili Kaftan", "Falaka".`,
        olcut: [[15, "Rol, üç özellik ve örnek"], [10, "Üç unsurdan ikisi tam"], [5, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Dil bilgisi: fiil yapısı", puan: 15,
        metin: r`"Sabah erkenden yola **koyulan** kafile, akşamüstü köye **varmıştı**; yorgun yolcular **dinlenmek** için çeşmenin başına **oturdu**."

**a)** Koyu yazılmış kelimeleri basit, türemiş, birleşik fiil ve fiilimsi bakımından inceleyiniz.
**b)** "varmıştı" fiilinin kip ve kişisini yazınız.`,
        cevap: r`**a)** "koyulan": koy- (basit kök) + -ul (edilgen/dönüşlü yapım) → türemiş, + -an sıfat-fiil (fiilimsi). "varmıştı": basit fiil (var-), çekimli. "dinlenmek": din- + -le (yapım) + -n (dönüşlü) → türemiş; -mek ad-fiil (fiilimsi). "oturdu": basit fiil, çekimli.
**b)** Duyulan geçmiş zamanın hikâyesi (-mış + -tı, birleşik zamanlı fiil), 3. tekil kişi.`,
        olcut: [[15, "Dört kelime ve kip-kişi doğru"], [10, "Üç kelime ve kip ya da dört kelime"], [5, "İki unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
