/* 10. Sınıf Biyoloji — Maarif Modeli açık uçlu yazılı sınavları (örnek). Temalar: u1 Enerji, u2 Ekoloji */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["10/biyoloji"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Kavramsal anlama", puan: 14,
        metin: r`ATP'ye "hücrenin enerji parası" denir.

**a)** ATP'nin yapısını (üç bileşen) yazınız.
**b)** Bu benzetmenin anlamını, ATP'nin oluşumu ve yıkımı ile açıklayınız.`,
        cevap: r`**a)** Adenin (azotlu baz), riboz (şeker) ve üç fosfat grubu.
**b)** Besinlerdeki enerji, ATP üretiminde fosfat bağlarına depolanır (para kazanmak gibi). Hücre enerjiye ihtiyaç duyduğunda ATP, ADP ve fosfata parçalanır ve enerji açığa çıkar (para harcamak gibi). Enerji ATP aracılığıyla hücrenin her yerinde kullanılabilir; ATP depolanmaz, sürekli üretilip harcanır.`,
        olcut: [[14, "Yapı ve benzetmenin açıklaması"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Deney yorumlama", puan: 14,
        metin: r`Bir su bitkisi (elodea) farklı uzaklıklardaki lambayla aydınlatılıyor ve dakikada çıkan kabarcık sayısı sayılıyor:

| Lamba uzaklığı (cm) | 10 | 20 | 30 | 40 |
|---|---|---|---|---|
| Kabarcık/dk | 42 | 25 | 14 | 8 |

**a)** Çıkan kabarcıklar hangi gazdır?
**b)** Verilerden hangi sonuca varılır?
**c)** Deneyde sabit tutulması gereken iki değişkeni yazınız.`,
        cevap: r`**a)** Oksijen (fotosentezin ürünü).
**b)** Lamba yaklaştıkça (ışık şiddeti arttıkça) fotosentez hızı artar.
**c)** Sıcaklık, CO₂ miktarı (su içindeki bikarbonat), bitki türü ve büyüklüğü, ölçüm süresi.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Süreç açıklama", puan: 14,
        metin: r`Fotosentezin **ışığa bağımlı tepkimeleri** ve **Calvin döngüsü**nü; gerçekleştiği yer, kullanılan ve üretilen maddeler bakımından karşılaştırınız.`,
        cevap: r`| | Işığa bağımlı | Calvin döngüsü |
|---|---|---|
| Yer | Kloroplastta tilakoit zar | Kloroplastta stroma |
| Kullanılan | Su, ışık, ADP, NADP⁺ | CO₂, ATP, NADPH |
| Üretilen | O₂, ATP, NADPH | Glikoz (besin), ADP, NADP⁺ |

Işığa bağımlı tepkimelerde üretilen ATP ve NADPH, Calvin döngüsünde kullanılır.`,
        olcut: [[14, "Üç ölçüte göre doğru karşılaştırma"], [9, "İki ölçüt doğru"], [4, "Bir ölçüt doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Karşılaştırma", puan: 14,
        metin: r`Derin okyanus tabanındaki sıcak su bacalarında, güneş ışığının hiç ulaşmadığı yerlerde zengin bir canlı topluluğu yaşar.

Bu ekosistemdeki üreticiler besinlerini nasıl üretir? Bu süreci fotosentezle karşılaştırınız (enerji kaynağı ve canlılar).`,
        cevap: r`Üreticiler kemosentez yapan bakterilerdir. Enerjiyi inorganik maddelerin (ör. hidrojen sülfür, amonyak) oksitlenmesinden elde ederek CO₂'den organik madde üretirler.

Fark: Fotosentezde enerji kaynağı ışıktır; bitkiler, algler ve siyanobakteriler yapar. Kemosentezde enerji kaynağı kimyasal tepkimelerdir; yalnızca bazı bakteri ve arkeler yapar. İkisinde de CO₂ organik maddeye dönüştürülür.`,
        olcut: [[14, "Kemosentez açıklaması ve iki farklı ölçüt"], [9, "Kemosentez doğru, karşılaştırma eksik"], [4, "Kemosentez adı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Yapı-işlev", puan: 14,
        metin: r`İnce bağırsağın iç yüzeyi villus ve mikrovilluslarla kaplıdır.

**a)** Bu yapıların emilim için önemi nedir?
**b)** Yağların emilim ve taşınma yolunun karbohidratlardan farkı nedir?`,
        cevap: r`**a)** Emilim yüzeyini çok artırırlar; besinlerin kana ve lenfe geçişi hızlanır.
**b)** Glikoz ve amino asitler villuslardaki kılcal kan damarlarına geçer ve kapı toplardamarı ile karaciğere gider. Yağ asitleri ve gliserol hücrede yeniden yağa dönüştürülüp lenf kılcallarına (lakteal) geçer, lenf yoluyla taşınır.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Bilimsel açıklama", puan: 15,
        metin: r`Hızlı ve uzun süre koşan bir sporcunun bacak kaslarında yorgunluk ve yanma hissi oluşuyor.

**a)** Bu durumda kas hücrelerinde hangi tür enerji üretim yolu devreye girer? Neden?
**b)** Oksijenli solunumla bu yolu ATP verimi ve ürünler bakımından karşılaştırınız.`,
        cevap: r`**a)** Laktik asit fermantasyonu; kaslara yeterli oksijen ulaşmadığında hücre, glikolizin devam edebilmesi için NAD⁺'yi fermantasyonla yeniler.
**b)** Oksijenli solunum: glikoz başına yaklaşık 32–38 ATP, ürünler CO₂ ve su (mitokondride tamamlanır). Laktik asit fermantasyonu: glikoz başına net 2 ATP, ürün laktik asit (sitoplazmada).`,
        olcut: [[15, "Doğru yol, neden ve iki karşılaştırma"], [10, "Yol ve neden doğru, karşılaştırma eksik"], [5, "Yalnız yol doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Günlük hayatla ilişkilendirme", puan: 15,
        metin: r`Yoğurt ve ekmek yapımında farklı fermantasyon türleri kullanılır.

Her ikisinde hangi canlının hangi fermantasyonu yaptığını ve ürünün oluşumunu nasıl etkilediğini açıklayınız.`,
        cevap: r`**Yoğurt:** Laktik asit bakterileri süt şekerini (laktoz) laktik aside dönüştürür (laktik asit fermantasyonu); asitlik süt proteinlerini pıhtılaştırır ve yoğurdun kıvamını ve ekşi tadını oluşturur.
**Ekmek:** Maya mantarı (*Saccharomyces*) şekeri etil alkol ve CO₂'ye dönüştürür (etil alkol fermantasyonu); CO₂ hamuru kabartır, alkol fırında uçar.`,
        olcut: [[15, "İki örnek canlı, tür ve ürün etkisiyle"], [10, "Biri tam, diğeri eksik"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Ekosistem bileşenleri", puan: 14,
        metin: r`Bir göl ekosisteminde su sıcaklığı, ışık, alg, zooplankton, balık ve ayrıştırıcı bakteriler bulunuyor.

**a)** Bunları canlı (biyotik) ve cansız (abiyotik) bileşenler olarak ayırınız.
**b)** Ayrıştırıcılar ortadan kalksaydı ekosistemde ne olurdu?`,
        cevap: r`**a)** Biyotik: alg, zooplankton, balık, bakteriler. Abiyotik: su sıcaklığı, ışık.
**b)** Ölü organizmalar ve atıklar parçalanmaz, birikir; mineraller (azot, fosfor) toprağa ve suya geri dönmez, madde döngüsü durur ve üreticiler besin elementi bulamaz.`,
        olcut: [[14, "Sınıflandırma ve döngü etkisi"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Etkileşimleri sınıflandırma", puan: 14,
        metin: r`Aşağıdaki ilişkilerin türünü (mutualizm, kommensalizm, parazitlik, av-avcı, rekabet) yazınız:

**a)** Likende mantar ile algin birlikte yaşaması **b)** Köpeğin üzerindeki pire **c)** Köpekbalığına tutunan vantuzlu balık **d)** Aynı ormanda tilki ile kurdun tavşan için yarışması`,
        cevap: r`**a)** Mutualizm (iki taraf yararlanır). **b)** Parazitlik (pire yararlanır, köpek zarar görür). **c)** Kommensalizm (vantuzlu balık yararlanır, köpekbalığı etkilenmez). **d)** Rekabet (aynı kaynak için).`,
        olcut: [[14, "Dördü doğru"], [9, "Üçü doğru"], [4, "İkisi doğru"], [0, "Bir ya da hiç"]] },
      { tema: "u2", beceri: "Enerji akışı", puan: 14,
        metin: r`Bir besin zincirinde ot → çekirge → kurbağa → yılan vardır. Otun ürettiği enerji 100 000 kJ'dir.

**a)** %10 kuralına göre yılana ulaşan enerjiyi hesaplayınız.
**b)** Enerjinin her basamakta azalmasının iki nedenini yazınız.
**c)** Neden besin zincirleri genellikle 4–5 basamaktan uzun olmaz?`,
        cevap: r`**a)** $100\,000 \to 10\,000 \to 1\,000 \to 100$ kJ (yılan).
**b)** Enerjinin büyük kısmı solunumla ısıya dönüşür; sindirilemeyen kısımlar atılır; canlının her parçası yenmez.
**c)** Üst basamaklara çok az enerji kalır; daha fazla basamağı destekleyecek enerji yoktur.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Madde döngüsü", puan: 14,
        metin: r`Baklagiller (fasulye, nohut) ekilen tarlaya bir sonraki yıl daha az gübre gerekir.

Bu durumu azot döngüsüyle açıklayınız. Döngüde görev alan iki bakteri grubunu yazınız.`,
        cevap: r`Baklagillerin köklerindeki yumrularda yaşayan **azot bağlayıcı bakteriler** (*Rhizobium*) havadaki N₂'yi bitkilerin kullanabileceği azotlu bileşiklere (amonyak/amonyum) dönüştürür; toprak azotça zenginleşir, bir sonraki ürün için daha az gübre gerekir.

Diğer gruplar: nitrifikasyon bakterileri (amonyağı nitrit ve nitrata dönüştürür), denitrifikasyon bakterileri (nitratı N₂'ye çevirip havaya verir), çürükçül bakteriler (amonifikasyon).`,
        olcut: [[14, "Açıklama ve iki bakteri grubu"], [9, "Açıklama doğru, bir grup"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Popülasyon dinamikleri", puan: 14,
        metin: r`Bir adaya getirilen tavşan popülasyonu önce hızla artıyor, sonra artış yavaşlayıp belirli bir düzeyde dalgalanıyor.

**a)** Popülasyon büyümesini sınırlayan iki faktörü yazınız.
**b)** "Taşıma kapasitesi" kavramını bu örnekle açıklayınız.`,
        cevap: r`**a)** Besin miktarı, su, yaşam alanı, avcılar, hastalıklar, tür içi rekabet.
**b)** Taşıma kapasitesi, bir ortamın kaynakları ile uzun süre destekleyebileceği en büyük birey sayısıdır. Tavşanlar bu sayıya ulaştığında doğum ve ölüm oranları dengelenir; popülasyon bu düzey çevresinde dalgalanır.`,
        olcut: [[14, "İki faktör ve kavram açıklaması"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Sürdürülebilirlik", puan: 15,
        metin: r`Bir öğrencinin haftalık alışkanlıkları: her gün araba ile okula gitmek, paketli ürünler tüketmek, uzun duş almak.

**a)** Ekolojik ayak izi kavramını açıklayınız.
**b)** Bu öğrencinin ayak izini küçültmek için her alışkanlık için bir öneri yazınız.`,
        cevap: r`**a)** Bir kişinin ya da topluluğun tükettiği kaynakları üretmek ve oluşturduğu atıkları yok etmek için gereken biyolojik verimli alan miktarıdır.
**b)** Araba yerine toplu taşıma, bisiklet ya da yürüme; ambalajı az ürünler, yerel ve mevsimlik gıdalar, bez çanta, geri dönüşüm; kısa duş, su tasarruflu duş başlığı.`,
        olcut: [[15, "Tanım ve üç öneri"], [10, "Tanım ve iki öneri ya da üç öneri"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Problem çözme", puan: 15,
        metin: r`Bir kıyı kasabasında plastik atıklar denize karışıyor; balıkçılar ağlarında plastik buluyor.

Bu sorunun ekosisteme iki etkisini yazınız. Atık yönetiminin "önleme – azaltma – yeniden kullanma – geri dönüştürme" sırasına göre kasaba için birer öneri geliştiriniz.`,
        cevap: r`Etkiler: deniz canlılarının plastiği yutması ya da plastiğe dolanması; mikroplastiklerin besin zinciri yoluyla insana ulaşması; kıyı turizmi ve balıkçılığın zarar görmesi.

Öneriler: Önleme — tek kullanımlık plastik poşet ve pipetlerin yasaklanması. Azaltma — dolum istasyonları, bez çanta. Yeniden kullanma — depozitolu cam şişe sistemi, balık kasalarının tekrar kullanımı. Geri dönüştürme — ayrıştırma kutuları, kıyıda toplama ve geri dönüşüm tesisine gönderme.`,
        olcut: [[15, "İki etki ve dört aşamaya uygun öneri"], [10, "İki etki ve iki-üç öneri"], [5, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
