/* 9. Sınıf Kimya — Maarif Modeli açık uçlu yazılı sınavları (örnek). Temalar: u1 Etkileşim, u2 Çeşitlilik, u3 Sürdürülebilirlik */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/kimya"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Günlük hayatla ilişkilendirme", puan: 14,
        metin: r`Evde temizlik yapan biri çamaşır suyu (sodyum hipoklorit) ile tuz ruhunu (hidroklorik asit) aynı kovada karıştırmak istiyor.

**a)** Bu karışım neden tehlikelidir?
**b)** Temizlik maddelerinin güvenli kullanımı için iki kural yazınız.`,
        cevap: r`**a)** Tepkimeden zehirli **klor gazı** açığa çıkar; solunum yollarına zarar verir.
**b)** Temizlik maddeleri birbirine karıştırılmaz; ortam havalandırılır; eldiven kullanılır; etiketteki uyarılar ve tehlike işaretleri okunur; ürün orijinal kabında, çocukların ulaşamayacağı yerde saklanır.`,
        olcut: [[14, "Klor gazı ve iki uygun kural"], [9, "Tehlike genel olarak açıklanmış (gaz adı yok) ve iki kural"], [5, "Yalnız a ya da yalnız iki kural"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Bilimsel bilginin değişebilirliği", puan: 14,
        metin: r`Thomson atomu "üzümlü kek" gibi düşünüyordu. Rutherford altın levhaya alfa tanecikleri gönderdiğinde taneciklerin çoğunun düz geçtiğini, çok azının geri saptığını gördü.

**a)** Bu gözlemlerden atomla ilgili hangi iki sonuç çıkarılır?
**b)** Bu örnek bilimsel bilginin doğası hakkında neyi gösterir?`,
        cevap: r`**a)** Atomun büyük kısmı boşluktur (çoğu tanecik düz geçti). Pozitif yük ve kütle çok küçük bir merkezde, **çekirdekte** toplanmıştır (az sayıda tanecik geri saptı).
**b)** Bilimsel bilgi yeni kanıtlarla değişebilir; modeller deneylerle sınanır ve gerekirse yenilenir.`,
        olcut: [[14, "İki sonuç ve bilginin değişebilirliği"], [9, "İki sonuç doğru, b eksik"], [5, "Bir sonuç doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Tümevarımsal akıl yürütme", puan: 14,
        metin: r`$_{11}\text{Na}$, $_{17}\text{Cl}$ ve $_{20}\text{Ca}$ atomları veriliyor.

**a)** Her birinin elektron dizilimini (katman ya da orbital) yazınız.
**b)** Periyodik tablodaki yerlerini (periyot ve grup) belirleyiniz.`,
        cevap: r`**a)** Na: $1s^2\,2s^2\,2p^6\,3s^1$ (2-8-1). Cl: $1s^2\,2s^2\,2p^6\,3s^2\,3p^5$ (2-8-7). Ca: $1s^2\,2s^2\,2p^6\,3s^2\,3p^6\,4s^2$ (2-8-8-2).
**b)** Na: 3. periyot 1A (1. grup). Cl: 3. periyot 7A (17. grup). Ca: 4. periyot 2A (2. grup).`,
        olcut: [[14, "Üç dizilim ve üç konum doğru"], [9, "En fazla iki hata"], [4, "Yarısı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Tümevarımsal akıl yürütme", puan: 14,
        metin: r`Magnezyum ($_{12}\text{Mg}$) ve oksijen ($_{8}\text{O}$) atomları iyon oluşturuyor.

**a)** Her biri hangi iyonu oluşturur? Elektron sayılarıyla gösteriniz.
**b)** Oluşan iyonların hangi soy gazın elektron dizilimine benzediğini yazınız ve neden bu yönde iyonlaştıklarını açıklayınız.`,
        cevap: r`**a)** Mg 2 elektron verir: $\text{Mg}^{2+}$ (10 elektron). O 2 elektron alır: $\text{O}^{2-}$ (10 elektron).
**b)** İkisi de **neon** ($_{10}\text{Ne}$) dizilimine ulaşır (oktet). Atomlar en az enerjiyle kararlı soy gaz dizilimine ulaşacak yönde elektron alır ya da verir.`,
        olcut: [[14, "İki iyon, neon ve kararlılık gerekçesi"], [9, "İki iyon doğru, gerekçe eksik"], [4, "Bir iyon doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u1", beceri: "Veri çözümleme", puan: 14,
        metin: r`Aynı periyottaki üç elementin atom yarıçapları: X 186 pm, Y 160 pm, Z 99 pm.

**a)** Bu elementleri atom numarası küçükten büyüğe sıralayınız. Gerekçelendiriniz.
**b)** İyonlaşma enerjisi en büyük olan hangisidir? Neden?`,
        cevap: r`**a)** Aynı periyotta soldan sağa atom yarıçapı küçülür (çekirdek yükü artar, katman sayısı aynı). Sıra: X < Y < Z.
**b)** Z; yarıçapı en küçük olduğu için son katmandaki elektronlar çekirdeğe en sıkı bağlıdır, koparmak daha çok enerji ister.`,
        olcut: [[14, "Doğru sıra ve iki gerekçe"], [9, "Sıra ve b doğru, gerekçe eksik"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Gözleme dayalı tahmin", puan: 15,
        metin: r`Üç maddenin özellikleri:

| Madde | Erime noktası | Katıyken iletkenlik | Sulu çözelti iletkenliği |
|---|---|---|---|
| A | 801 °C | İletmez | İletir |
| B | 1085 °C | İletir | Çözünmez |
| C | 0 °C | İletmez | Çok zayıf |

Her maddenin bağ türünü (iyonik, metalik, kovalent/moleküler) gerekçesiyle tahmin ediniz.`,
        cevap: r`**A:** İyonik (yüksek erime noktası; katıda iyonlar hareketsiz, çözeltide serbest iyonlar iletir; ör. NaCl).
**B:** Metalik (katıyken iletken; serbest elektron denizi; ör. bakır).
**C:** Kovalent bağlı moleküler madde (düşük erime noktası, iyon içermez; ör. su).`,
        olcut: [[15, "Üç tahmin gerekçeli doğru"], [10, "Üç tahmin doğru, gerekçe eksik"], [5, "İki tahmin doğru"], [0, "Bir ya da hiç doğru yok"]] },
      { tema: "u2", beceri: "Model kullanma", puan: 15,
        metin: r`$\text{H}_2\text{O}$ ve $\text{CO}_2$ molekülleri veriliyor ($_{1}\text{H}$, $_{6}\text{C}$, $_{8}\text{O}$).

**a)** Her ikisinin Lewis yapısını çiziniz.
**b)** Hangisi polar, hangisi apolardır? Molekül şekliyle açıklayınız.`,
        cevap: r`**a)** H₂O: O merkezde, iki H ile tekli bağ, O üzerinde 2 ortaklanmamış elektron çifti. CO₂: C merkezde, iki O ile ikili bağ (O=C=O), her O'da 2 ortaklanmamış çift.
**b)** H₂O **polar**: açısal (kırık doğru, ~104,5°) şekil, bağ dipolleri birbirini yok etmez. CO₂ **apolar**: doğrusal (180°), iki polar bağın dipolleri zıt yönde ve eşit, birbirini sıfırlar.`,
        olcut: [[15, "İki Lewis yapısı ve şekle dayalı polarlık"], [10, "Lewis yapıları doğru, polarlık gerekçesiz"], [5, "Bir Lewis yapısı ya da yalnız polarlık doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u2", beceri: "Tümdengelimsel akıl yürütme", puan: 14,
        metin: r`Aşağıdaki bileşikleri adlandırınız ya da formüllerini yazınız:

**a)** $\text{CaCl}_2$ **b)** $\text{FeO}$ **c)** $\text{N}_2\text{O}_5$ **d)** Alüminyum oksit **e)** Sodyum hidroksit

Fe'nin adında neden yükün belirtilmesi gerektiğini açıklayınız.`,
        cevap: r`**a)** Kalsiyum klorür **b)** Demir(II) oksit **c)** Diazot pentaoksit **d)** $\text{Al}_2\text{O}_3$ **e)** NaOH

Demir birden fazla değerlik alabilir (Fe²⁺, Fe³⁺); hangi iyonun olduğu Roma rakamıyla belirtilmezse bileşik belirsiz kalır.`,
        olcut: [[14, "Beş cevap ve değerlik açıklaması"], [10, "En fazla bir hata ve açıklama"], [5, "Üç cevap doğru"], [0, "İkiden az doğru"]] },
      { tema: "u2", beceri: "Sınıflandırma", puan: 14,
        metin: r`Aşağıdaki maddelerde moleküller arasında baskın etkileşimi yazınız: **a)** $\text{H}_2\text{O}$ **b)** $\text{CH}_4$ **c)** $\text{HCl}$

Ardından suyun kaynama noktasının ($100\ °C$) metanınkinden ($-161\ °C$) çok yüksek olmasını açıklayınız.`,
        cevap: r`**a)** Hidrojen bağı (ayrıca dipol-dipol, London). **b)** London (dağılma) kuvvetleri. **c)** Dipol-dipol etkileşimi.

Su molekülleri arasında güçlü hidrojen bağları vardır; kaynama için bu bağları yenmek çok enerji ister. Metan apolardır ve yalnızca zayıf London kuvvetleriyle tutunur.`,
        olcut: [[14, "Üç etkileşim ve hidrojen bağı açıklaması"], [9, "Üç etkileşim doğru, açıklama eksik"], [4, "İki etkileşim doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Bilimsel çıkarım", puan: 14,
        metin: r`Bir su damlası cam yüzeye yayılırken, cıva damlası cam üzerinde küre gibi toplanır.

**a)** Bu farkı adezyon ve kohezyon kavramlarıyla açıklayınız.
**b)** Su, ince cam boruda yükselir (kılcallık). Cıva ne yapar?`,
        cevap: r`**a)** Suda adezyon (su–cam) kohezyondan (su–su) büyüktür; su camı ıslatır ve yayılır. Cıvada kohezyon (cıva–cıva) adezyondan büyüktür; cıva camı ıslatmaz ve toplanır.
**b)** Cıva ince boruda dış yüzeyin **altına düşer**, yüzeyi tümsek olur (kılcal alçalma).`,
        olcut: [[14, "a ve b doğru"], [9, "a doğru, b eksik"], [4, "Kavramlardan biri doğru kullanılmış"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Veri yorumlama", puan: 14,
        metin: r`Bir dağ evinde su 90 °C'de kaynıyor, deniz kenarında 100 °C'de.

**a)** Bu farkı buhar basıncı ve dış basınç kavramlarıyla açıklayınız.
**b)** Düdüklü tencerede yemeğin daha çabuk pişmesinin nedeni nedir?`,
        cevap: r`**a)** Bir sıvı, buhar basıncı dış basınca eşit olduğunda kaynar. Dağda dış (atmosfer) basıncı düşüktür; suyun buhar basıncı daha düşük sıcaklıkta dış basınca ulaşır.
**b)** Düdüklü tencerede iç basınç yüksektir; su 100 °C'nin üstünde (≈120 °C) kaynar, yemek daha yüksek sıcaklıkta pişer.`,
        olcut: [[14, "İki açıklama doğru"], [9, "Biri tam, biri eksik"], [4, "Biri doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Sürdürülebilirlik değerlendirme", puan: 14,
        metin: r`Gümüş nanoparçacıklar antibakteriyel çorap ve kumaşlarda kullanılıyor; ancak yıkamada suya karışabiliyor.

**a)** Nanoparçacıkların aynı maddenin büyük parçasından farklı özellik göstermesinin nedenini yazınız.
**b)** Bu kullanımın bir yararını ve bir çevresel riskini belirtiniz.`,
        cevap: r`**a)** Nano boyutta yüzey alanı/hacim oranı çok büyüktür; yüzeydeki atomların oranı artar, bu yüzden kimyasal etkinlik ve optik özellikler değişir.
**b)** Yarar: bakteri üremesini ve kokuyu azaltır. Risk: atık suya karışan gümüş nanoparçacıklar sudaki yararlı mikroorganizmaları ve canlıları olumsuz etkileyebilir; arıtmada tutulamayabilir.`,
        olcut: [[14, "Yüzey/hacim gerekçesi, bir yarar, bir risk"], [9, "Üç unsurdan ikisi"], [4, "Bir unsur"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Problem çözme", puan: 15,
        metin: r`Bir okul kimya laboratuvarı yıl sonunda çok miktarda kullanılmış çözelti ve ambalaj atığı biriktiriyor.

Yeşil kimyanın **atık önleme** ilkesine göre bu sorunu azaltmak için üç somut öneri yazınız ve birinin neden etkili olduğunu açıklayınız.`,
        cevap: r`Öneriler (en az üç): deneyleri mikro ölçekte (az kimyasalla) yapmak; tehlikesiz ya da daha az tehlikeli maddeler seçmek; sanal/simülasyon deneyleri kullanmak; çözeltileri yeniden kullanmak ya da geri kazanmak; ihtiyaç kadar kimyasal satın almak.

Örnek açıklama: Mikro ölçekli deney aynı gözlemi çok daha az madde ile sağladığı için atık oluşmadan önce önlenir (atığı sonradan arıtmaktan daha iyidir).`,
        olcut: [[15, "Üç uygun öneri ve gerekçeli açıklama"], [10, "Üç öneri, açıklama zayıf"], [5, "Bir-iki öneri"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Değerlendirme", puan: 15,
        metin: r`Saf demir kolay paslanır; paslanmaz çelik ise demirin krom ve nikel ile oluşturduğu bir alaşımdır.

**a)** Alaşım nedir? Saf metalden farkını bir özellik üzerinden açıklayınız.
**b)** Kullanılmış metal eşyaların geri dönüştürülmesinin çevreye iki yararını yazınız.`,
        cevap: r`**a)** Alaşım, bir metalin başka metal(ler) ya da ametallerle oluşturduğu homojen karışımdır. Paslanmaz çelik, saf demire göre korozyona daha dayanıklıdır (krom yüzeyde koruyucu oksit tabakası oluşturur); ayrıca daha sert ve dayanıklıdır.
**b)** Maden çıkarma ve ham madde kullanımı azalır; enerji tasarrufu sağlanır (eritip yeniden kullanmak cevherden üretmekten daha az enerji ister); atık ve sera gazı salımı azalır.`,
        olcut: [[15, "Tanım, farklı özellik ve iki yarar"], [10, "Üç unsurdan ikisi"], [5, "Bir unsur"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
