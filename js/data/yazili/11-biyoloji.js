/* 11. Sınıf Biyoloji — Maarif Modeli açık uçlu yazılı sınavları (örnek). u1 Bitkilerde tepki, u2 Sinir sistemi ve duyular, u3 Destek-hareket ve bağışıklık, u4 Homeostazi */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["11/biyoloji"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Deney yorumlama", puan: 14,
        metin: r`Darwin ve oğlunun koleoptil deneyinde: ucu kesilen koleoptil ışığa yönelmiyor; ucu opak bir başlıkla örtülen koleoptil ışığa yönelmiyor; ucu açık bırakılan koleoptil ışığa doğru büküllüyor.

**a)** Bu sonuçlardan hangi çıkarım yapılır?
**b)** Daha sonra bu etkiyi yapan maddenin oksin olduğu bulundu. Oksin ışığa doğru bükülmeyi nasıl sağlar?`,
        cevap: r`**a)** Işığı algılayan bölge koleoptilin ucudur ve uçtan bükülmenin olduğu alt bölgeye bir uyarı (madde) iletilir.
**b)** Oksin gölgede kalan tarafta birikir; o taraftaki hücreler daha çok uzar; koleoptil ışığa doğru bükülür (pozitif fototropizma).`,
        olcut: [[14, "Çıkarım ve oksin mekanizması"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Hormonları ilişkilendirme", puan: 14,
        metin: r`Aşağıdaki uygulamalarda hangi bitki hormonu etkilidir? Kısaca açıklayınız:

**a)** Yeşil muzların bir odada olgun elmalarla bekletilince olgunlaşması
**b)** Çekirdeksiz üzümlerin taneleri büyük olsun diye bir hormonla püskürtülmesi
**c)** Kuraklıkta bitkinin stomalarını kapatması`,
        cevap: r`**a)** Etilen: olgun meyvelerin saldığı gaz hormon, meyve olgunlaşmasını hızlandırır.
**b)** Giberellin: hücre uzaması ve meyve büyümesini sağlar.
**c)** Absisik asit: su stresinde stomaların kapanmasını sağlar, su kaybını azaltır.`,
        olcut: [[14, "Üçü doğru ve açıklamalı"], [9, "Üçü doğru ya da ikisi açıklamalı"], [4, "Bir doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Sınıflandırma", puan: 14,
        metin: r`**Tropizma** ile **nasti** hareketlerini karşılaştırınız. Aşağıdaki örnekleri sınıflandırınız:

**a)** Küstüm otunun dokununca yapraklarını kapatması **b)** Kökün yer çekimi yönünde büyümesi **c)** Lalenin sıcaklıkla çiçek açıp kapaması **d)** Sarmaşığın bir desteğe sarılması`,
        cevap: r`Tropizma: uyarının yönüne bağlı, genellikle büyümeyle gerçekleşen yönelim hareketidir. Nasti: uyarının yönünden bağımsız, genellikle turgor değişimiyle oluşan harekettir.

**a)** Tigmonasti (dokunma ile nasti). **b)** Pozitif gravitropizma (jeotropizma). **c)** Termonasti. **d)** Tigmotropizma.`,
        olcut: [[14, "Karşılaştırma ve dört sınıflandırma"], [9, "Karşılaştırma ve üç ya da dört sınıflandırma"], [4, "İki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "İmpuls iletimi", puan: 14,
        metin: r`Bir nöronda dinlenme potansiyeli yaklaşık −70 mV'dur.

**a)** Uyarı geldiğinde zarda sırasıyla neler olur? (depolarizasyon, repolarizasyon)
**b)** Miyelin kılıfın impuls iletim hızına etkisini açıklayınız.`,
        cevap: r`**a)** Eşik değeri aşan uyarıyla Na⁺ kanalları açılır, Na⁺ hücre içine girer, zar içi pozitifleşir (depolarizasyon, ≈ +30/+40 mV). Ardından K⁺ kanalları açılır, K⁺ dışarı çıkar ve zar yeniden negatifleşir (repolarizasyon). Sodyum-potasyum pompası ATP harcayarak iyon dağılımını eski hâline getirir.
**b)** Miyelin yalıtkandır; impuls Ranvier boğumları arasında atlayarak ilerler (sıçrayarak iletim), iletim çok hızlanır.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Refleks", puan: 14,
        metin: r`Sıcak bir tencereye dokunan kişi düşünmeden elini çekiyor; acıyı ise bir an sonra hissediyor.

**a)** Bu tepkinin refleks yayını (sırasıyla yapıları) yazınız.
**b)** Acının elin çekilmesinden sonra hissedilmesinin nedenini açıklayınız.`,
        cevap: r`**a)** Deri reseptörü → duyu nöronu → omurilik (ara nöron) → motor nöron → kol kasları (efektör).
**b)** Refleks omurilikte işlenir, beyne gitmeden yanıt verilir. Uyarının beyindeki duyu merkezine ulaşıp algılanması daha uzun yol ve daha çok sinaps gerektirdiği için acı daha sonra hissedilir.`,
        olcut: [[14, "Refleks yayı ve açıklama"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Duyu organları", puan: 15,
        metin: r`Miyop bir öğrenci tahtayı bulanık görüyor; gözlüğünü takınca netleşiyor.

**a)** Miyopluğun nedenini görüntünün oluştuğu yerle açıklayınız.
**b)** Hangi tür mercekle düzeltilir?
**c)** Gözde renkleri algılayan reseptör hücreler hangileridir? Karanlıkta neden renkleri ayırt edemeyiz?`,
        cevap: r`**a)** Göz küresi uzun ya da kornea/merceğin kırıcılığı fazla olduğu için uzaktaki cisimlerin görüntüsü retinanın önünde oluşur.
**b)** Kalın kenarlı (ıraksak) mercekle.
**c)** Koni hücreleri renkleri algılar. Koniler ışığa daha az duyarlıdır; loş ışıkta yalnızca çubuk hücreleri çalışır ve çubuklar renk ayırt etmez.`,
        olcut: [[15, "Üç bölüm doğru"], [10, "İki bölüm doğru"], [5, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Sinir sistemi", puan: 15,
        metin: r`Bir öğrenci sınavdan önce kalbinin hızlandığını, ağzının kuruduğunu fark ediyor; sınav bitip rahatlayınca bu belirtiler geçiyor.

Bu durumu otonom sinir sisteminin **sempatik** ve **parasempatik** bölümleriyle açıklayınız. Her bölümün iki etkisini yazınız.`,
        cevap: r`Sınav öncesi stres sempatik sistemi etkinleştirir ("savaş ya da kaç"); rahatlayınca parasempatik sistem baskın hâle gelir ("dinlen ve sindir").

Sempatik: kalp atışını hızlandırır, göz bebeklerini büyütür, bronşları genişletir, tükürük salgısını ve sindirimi azaltır, kan şekerini artırır.
Parasempatik: kalp atışını yavaşlatır, sindirimi ve tükürük salgısını artırır, göz bebeğini küçültür.`,
        olcut: [[15, "Açıklama ve ikişer etki"], [10, "Açıklama ve iki-üç etki"], [5, "Bir-iki doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Yapı-işlev", puan: 14,
        metin: r`Çocuklarda kemik kırıkları yetişkinlere göre daha çabuk iyileşir; ileri yaşta kemik erimesi (osteoporoz) riski artar.

**a)** Kemik dokuda yapım ve yıkımı sağlayan hücreleri yazınız.
**b)** Osteoporoz riskini azaltmak için iki öneri yazıp gerekçelendiriniz.`,
        cevap: r`**a)** Osteoblastlar kemik yapar, osteoklastlar kemik yıkar; osteositler olgun kemik hücreleridir.
**b)** Kalsiyum ve D vitamini içeren beslenme (kemiğin mineral yapısı ve kalsiyum emilimi); düzenli egzersiz ve yük bindiren hareketler (osteoblastları uyarır); sigaradan uzak durmak; güneş ışığından yeterince yararlanmak.`,
        olcut: [[14, "Hücreler ve iki gerekçeli öneri"], [9, "Üç unsur"], [4, "Bir-iki unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Kasılma mekanizması", puan: 14,
        metin: r`İskelet kasının kasılmasını kayan iplikler modeliyle açıklayınız. Kasılmada ATP ve kalsiyum iyonlarının görevini yazınız.`,
        cevap: r`Sinir uyarısıyla sarkoplazmik retikulumdan Ca²⁺ salınır. Ca²⁺, aktin üzerindeki bağlanma bölgelerini açar. Miyozin başları aktine bağlanır ve ATP enerjisiyle aktin ipliklerini sarkomerin ortasına doğru çeker; iplikler birbirinin üzerinden kayar, sarkomer kısalır, kas kasılır. İplikler kendileri kısalmaz.

ATP: miyozin başının hareketini ve aktinden ayrılmasını sağlar; ayrıca Ca²⁺'nin geri pompalanmasında kullanılır. Ca²⁺: kasılmayı başlatır.`,
        olcut: [[14, "Mekanizma ve iki görev"], [9, "Mekanizma doğru, görevler eksik"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Bağışıklık", puan: 14,
        metin: r`Kızamık aşısı olan bir çocuk kızamık virüsüyle karşılaştığında hastalanmıyor. Yılan sokmasında ise acil serum uygulanıyor.

**a)** Aşı ve serumun bağışıklık türlerini (aktif/pasif) belirtip farkını açıklayınız.
**b)** Neden yılan sokmasında aşı değil serum uygulanır?`,
        cevap: r`**a)** Aşı: zayıflatılmış ya da ölü antijen verilir, vücut kendi antikorlarını ve bellek hücrelerini üretir (aktif bağışıklık, uzun süreli ama geç başlar). Serum: hazır antikor verilir (pasif bağışıklık, hemen etkili ama kısa süreli, bellek oluşmaz).
**b)** Yılan zehri hızlı etki eder; vücudun antikor üretmesini beklemeye zaman yoktur, hazır antikor gerekir.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Geri bildirim", puan: 14,
        metin: r`Yemekten sonra kan şekeri yükseliyor, birkaç saat sonra normale dönüyor.

**a)** Bu düzenlemede görev alan iki hormonu ve salgılandıkları organı yazınız.
**b)** Bu sistemin olumsuz geri bildirim olduğunu açıklayınız.
**c)** Tip 1 diyabette hangi sorun vardır?`,
        cevap: r`**a)** İnsülin (kan şekerini düşürür) ve glukagon (kan şekerini yükseltir); pankreasın Langerhans adacıkları.
**b)** Kan şekeri yükselince insülin salgılanır ve şeker düşer; düşünce insülin azalır, glukagon artar. Değişime ters yönde tepki verilerek denge korunur.
**c)** Pankreasın beta hücreleri yeterli insülin üretemez (bağışıklık sisteminin bu hücrelere saldırması); kan şekeri yüksek kalır.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Dolaşım", puan: 14,
        metin: r`Kalbin sağ ve sol karıncıkları karşılaştırıldığında sol karıncık duvarı daha kalındır.

**a)** Bunun nedenini büyük ve küçük kan dolaşımıyla açıklayınız.
**b)** Küçük kan dolaşımının yolunu sırasıyla yazınız.`,
        cevap: r`**a)** Sol karıncık kanı büyük dolaşımla tüm vücuda pompalar; daha yüksek basınç ve kuvvet gerekir. Sağ karıncık kanı yalnızca akciğerlere (küçük dolaşım, kısa ve düşük basınçlı) gönderir.
**b)** Sağ karıncık → akciğer atardamarı → akciğerler (gaz alışverişi) → akciğer toplardamarları → sol kulakçık.`,
        olcut: [[14, "İki bölüm doğru"], [9, "Biri tam"], [4, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Solunum", puan: 15,
        metin: r`Yüksek bir dağa tırmanan dağcıların soluk alıp verme hızı artıyor; birkaç hafta orada kalanların kanındaki alyuvar sayısı artıyor.

**a)** Soluk alıp verme hızının artmasını kandaki CO₂ ve O₂ düzeyleri ile açıklayınız.
**b)** Alyuvar sayısının artmasının amacı nedir? Hangi organ ve hormon etkilidir?`,
        cevap: r`**a)** Yüksekte havadaki O₂'nin kısmi basıncı düşüktür; kana daha az O₂ geçer. Soğanilikteki solunum merkezi ve kemoreseptörler O₂ düşüşünü ve CO₂/pH değişimini algılayarak soluk alıp verme hızını artırır.
**b)** Daha çok hemoglobinle kanın O₂ taşıma kapasitesini artırmak (adaptasyon). Böbreklerden salgılanan eritropoietin (EPO) hormonu kemik iliğinde alyuvar yapımını artırır.`,
        olcut: [[15, "İki bölüm doğru"], [10, "Biri tam"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Boşaltım", puan: 15,
        metin: r`Çok su içilen bir günde idrar miktarı artar ve rengi açılır; sıcak bir günde terleme fazlaysa idrar azalır ve koyulaşır.

Bu durumu böbreklerde suyun geri emilimi ve **ADH** hormonu ile açıklayınız. Böbreklerin homeostazideki iki görevini yazınız.`,
        cevap: r`Çok su içilince kanın ozmotik basıncı düşer; hipofizden ADH salgısı azalır, toplama kanallarında suyun geri emilimi azalır; bol ve açık renkli idrar oluşur. Terlemeyle su kaybedilince kanın ozmotik basıncı yükselir; ADH salgısı artar, su daha çok geri emilir; idrar az ve koyu olur.

Görevler: su ve tuz dengesini düzenlemek, kanın pH'ını düzenlemek, azotlu atıkları (üre) uzaklaştırmak, kan basıncını düzenlemek.`,
        olcut: [[15, "ADH açıklaması ve iki görev"], [10, "Açıklama ve bir görev"], [5, "Bir doğru unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
