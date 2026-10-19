/* 9. Sınıf Fizik — Maarif Modeli açık uçlu yazılı sınavları (örnek). Üniteler: u1 Fizik Bilimi, u2 Kuvvet ve Hareket, u3 Akışkanlar, u4 Enerji */
(function () {
  const r = String.raw; App.data.yazili = App.data.yazili || {};
  App.data.yazili["9/fizik"] = { exams: [
    { id: "d1", term: 1, title: "1. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u1", beceri: "Bilimsel sorgulama", puan: 14,
        metin: r`Bir mühendis, depremde binaların nasıl salındığını incelerken hem **mekanik** hem de **dalgalar** konularından yararlanıyor; malzemenin dayanımı için de kimyacılarla çalışıyor.

**a)** Bu çalışmada fiziğin hangi alt dalları kullanılmaktadır? İki tanesini yazınız.
**b)** Bu örnek fiziğin diğer bilimlerle ilişkisi hakkında neyi gösterir? Bir cümleyle açıklayınız.`,
        cevap: r`**a)** Mekanik (kuvvet, hareket, salınım) ve dalgalar (titreşim, deprem dalgaları). (Katıhal fiziği de kabul edilir.)
**b)** Gerçek problemler disiplinler arasıdır; fizik mühendislik ve kimya ile birlikte kullanılarak çözüme ulaşılır.`,
        olcut: [[14, "İki alt dal ve disiplinler arası ilişki açıklaması"], [9, "İki alt dal doğru, açıklama eksik"], [5, "Bir alt dal doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Sınıflandırma", puan: 14,
        metin: r`Aşağıdaki nicelikleri **temel / türetilmiş** ve **skaler / vektörel** olarak sınıflandırınız:

kütle, hız, sıcaklık, kuvvet, zaman, yer değiştirme

Ayrıca "sürat" ile "hız" arasındaki farkı bir örnekle açıklayınız.`,
        cevap: r`| Nicelik | Temel/Türetilmiş | Skaler/Vektörel |
|---|---|---|
| Kütle | Temel | Skaler |
| Hız | Türetilmiş | Vektörel |
| Sıcaklık | Temel | Skaler |
| Kuvvet | Türetilmiş | Vektörel |
| Zaman | Temel | Skaler |
| Yer değiştirme | Türetilmiş (uzunluktan) | Vektörel |

Sürat skalerdir (alınan yol / süre), hız vektöreldir (yer değiştirme / süre). Örnek: 400 m'lik pisti 80 sn'de tam tur koşan atletin sürati 5 m/s, ortalama hızı 0'dır (başladığı yere döndüğü için).`,
        olcut: [[14, "Tablo en fazla 1 hatayla doğru ve sürat-hız farkı örnekli"], [9, "Tablo en fazla 2 hata, fark açıklanmış"], [5, "Tablo yarı doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Çıkarım yapma", puan: 14,
        metin: r`Bir sandal nehirde akıntıya dik yönde, suya göre $4\ \text{m/s}$ hızla kürek çekiyor. Akıntı hızı $3\ \text{m/s}$'dir.

**a)** Sandalın kıyıdan bakan birine göre hızının büyüklüğünü bulunuz.
**b)** Nehrin genişliği 60 m ise sandal karşı kıyıya kaç saniyede ulaşır? Akıntının bu süreyi değiştirip değiştirmediğini açıklayınız.`,
        cevap: r`**a)** Hızlar dik: $v = \sqrt{4^2 + 3^2} = 5\ \text{m/s}$.
**b)** Karşıya geçiş yalnızca akıntıya dik bileşene bağlıdır: $t = 60 / 4 = 15$ s. Akıntı süreyi değiştirmez; yalnızca sandalı akıntı yönünde $3 \cdot 15 = 45$ m sürükler.`,
        olcut: [[14, "5 m/s, 15 s ve akıntının süreyi etkilemediği gerekçesi"], [9, "İki sonuç doğru, gerekçe eksik"], [4, "Bir sonuç doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Karşılaştırma", puan: 14,
        metin: r`Doğadaki dört temel kuvvet: kütle çekim, elektromanyetik, güçlü nükleer ve zayıf nükleer kuvvet.

**a)** Hangisi en kısa, hangisi en uzun menzillidir?
**b)** Masada duran bir kitaba masanın uyguladığı tepki kuvveti hangi temel kuvvetten kaynaklanır? Gerekçelendiriniz.`,
        cevap: r`**a)** En kısa menzil: zayıf nükleer (güçlü nükleer de çok kısa, çekirdek boyutunda). En uzun menzil: kütle çekim ve elektromanyetik (sonsuz menzil).
**b)** Elektromanyetik kuvvet: kitabın ve masanın yüzeyindeki atomların elektronları birbirini iter; temas kuvvetleri elektromanyetik kökenlidir.`,
        olcut: [[14, "Menziller ve tepki kuvvetinin elektromanyetik kökeni gerekçeli"], [9, "a doğru, b gerekçesiz"], [5, "Yalnız a ya da yalnız b doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u2", beceri: "Grafik yorumlama", puan: 14,
        metin: r`Bir bisikletlinin konum–zaman bilgileri:

| t (s) | 0 | 10 | 20 | 30 |
|---|---|---|---|---|
| x (m) | 0 | 50 | 50 | 20 |

**a)** Her aralıktaki hareketi (ileri, durgun, geri) açıklayınız.
**b)** 0–30 s arasında alınan yolu ve yer değiştirmeyi bulunuz.
**c)** 0–30 s ortalama süratini hesaplayınız.`,
        cevap: r`**a)** 0–10 s: +5 m/s ile ileri; 10–20 s: duruyor; 20–30 s: −3 m/s ile geri.
**b)** Alınan yol $50 + 0 + 30 = 80$ m; yer değiştirme $20 - 0 = 20$ m.
**c)** Ortalama sürat $= 80 / 30 \approx 2{,}7$ m/s.`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Çıkarım yapma", puan: 15,
        metin: r`Ağırlığı 600 N olan bir öğrenci karda yürürken batıyor, kayak takınca batmıyor. Ayakkabısının tabanı toplam $0{,}03\ \text{m}^2$, kayakların tabanı toplam $0{,}3\ \text{m}^2$.

**a)** İki durumda kara uygulanan basıncı hesaplayınız.
**b)** Sonucu basınç–yüzey alanı ilişkisiyle açıklayıp günlük hayattan bir benzer örnek veriniz.`,
        cevap: r`**a)** Ayakkabı: $P = 600 / 0{,}03 = 20\,000$ Pa. Kayak: $P = 600 / 0{,}3 = 2\,000$ Pa.
**b)** Kuvvet aynıyken yüzey alanı 10 kat artınca basınç 10 kat azalır; kar daha az basınç görür ve öğrenci batmaz. Örnek: tankların paletli olması, kamyonların çok tekerlekli olması, raptiyenin sivri ucu (tersi).`,
        olcut: [[15, "İki basınç doğru, ters orantı açıklaması ve örnek"], [10, "Hesaplar doğru, açıklama ya da örnek eksik"], [5, "Bir hesap doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Bilimsel açıklama", puan: 15,
        metin: r`Bir baraj duvarı tabanda üst kısma göre çok daha kalın yapılır.

**a)** Bunun nedenini sıvı basıncı formülüyle ($P = h \cdot d \cdot g$) açıklayınız.
**b)** Barajın gölü genişletilirse (derinlik aynı kalırsa) duvarın tabanındaki basınç değişir mi? Gerekçelendiriniz.`,
        cevap: r`**a)** Sıvı basıncı derinlikle ($h$) doğru orantılı artar; en büyük basınç tabandadır. Bu yüzden duvar tabanda daha kalın yapılır.
**b)** Değişmez. Durgun sıvı basıncı yalnızca derinliğe, sıvının özkütlesine ve $g$'ye bağlıdır; gölün genişliğine ya da su miktarına bağlı değildir.`,
        olcut: [[15, "a ve b gerekçeli doğru"], [10, "a doğru, b'de karar doğru ama gerekçe eksik"], [5, "Yalnız a doğru"], [0, "Yanlış ya da boş"]] }
    ] },
    { id: "d2", term: 2, title: "2. Dönem Ortak Yazılı", sure: 40, sorular: [
      { tema: "u3", beceri: "Deney tasarlama", puan: 14,
        metin: r`Bir öğrenci kaldırma kuvvetinin **cismin hacmine** bağlı olup olmadığını araştıracak.

**a)** Bağımlı, bağımsız ve kontrol değişkenlerini yazınız.
**b)** Bu deney için bir yöntem öneriniz (araçlar ve ölçümler).`,
        cevap: r`**a)** Bağımsız: batan hacim. Bağımlı: kaldırma kuvveti. Kontrol: sıvının cinsi (özkütlesi), $g$, cismin tamamen batması.
**b)** Farklı hacimde ama aynı maddeden silindirler dinamometreye asılır; havada ve suda tamamen batırılmış ağırlıkları ölçülür. Kaldırma kuvveti = havadaki ağırlık − sudaki ağırlık. Hacim büyüdükçe kaldırma kuvvetinin arttığı gözlenir ($F_k = V_b \cdot d_s \cdot g$).`,
        olcut: [[14, "Üç değişken doğru ve ölçüme dayalı uygun yöntem"], [9, "Değişkenler doğru, yöntem eksik"], [4, "Değişkenlerden ikisi doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u3", beceri: "Günlük hayatla ilişkilendirme", puan: 14,
        metin: r`Hızlı tren perona girerken peron kenarındaki yolcuların sarı çizginin gerisinde durması istenir.

**a)** Bu kuralın fiziksel nedenini akışkanın hızı ile basıncı arasındaki ilişkiyle açıklayınız.
**b)** Aynı ilkeyle açıklanabilen bir başka olay yazınız.`,
        cevap: r`**a)** Tren geçerken tren ile yolcu arasındaki havanın hızı artar, bu bölgede basınç düşer. Yolcunun arkasındaki durgun havanın basıncı daha büyük olduğu için yolcu trene doğru itilebilir.
**b)** Uçak kanadının taşıma kuvveti, rüzgârlı havada çatının uçması, iki kâğıt arasına üflenince kâğıtların birbirine yaklaşması, perdenin açık pencereden dışarı çekilmesi.`,
        olcut: [[14, "Hız-basınç ilişkisi doğru yönde ve uygun örnek"], [9, "Açıklama doğru, örnek yok ya da hatalı"], [4, "İlişki yanlış yönde ama örnek doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Kavramları ayırt etme", puan: 14,
        metin: r`Bir bardak kaynar su ile dolu bir küvetteki ılık sudan hangisinin **sıcaklığı**, hangisinin **iç enerjisi** daha büyüktür? Isı, sıcaklık ve iç enerji kavramlarını kullanarak açıklayınız.`,
        cevap: r`Sıcaklığı bardaktaki kaynar su daha büyüktür (taneciklerin ortalama kinetik enerjisi fazla). İç enerjisi küvetteki su daha büyüktür; çünkü iç enerji tanecik sayısına da bağlıdır ve küvette çok daha fazla su vardır. Isı ise sıcaklık farkından dolayı aktarılan enerjidir; maddede "bulunan" bir şey değildir.`,
        olcut: [[14, "İki karşılaştırma ve üç kavram doğru"], [9, "Karşılaştırmalar doğru, ısı kavramı eksik"], [4, "Bir karşılaştırma doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Matematiksel modelleme", puan: 14,
        metin: r`Kütlesi 2 kg olan suyun sıcaklığı 20 °C'den 70 °C'ye çıkarılıyor. ($c_{su} = 4200\ \text{J/kg·°C}$)

**a)** Suya verilmesi gereken ısıyı bulunuz.
**b)** Aynı ısı aynı kütlede zeytinyağına ($c = 2000\ \text{J/kg·°C}$) verilseydi sıcaklık değişimi ne olurdu? Sonucu öz ısı ile yorumlayınız.`,
        cevap: r`**a)** $Q = m \cdot c \cdot \Delta T = 2 \cdot 4200 \cdot 50 = 420\,000$ J.
**b)** $\Delta T = Q / (m c) = 420\,000 / (2 \cdot 2000) = 105$ °C. Öz ısısı küçük olan madde aynı ısıyla daha çok ısınır.`,
        olcut: [[14, "420 000 J, 105 °C ve öz ısı yorumu"], [9, "İki hesap doğru, yorum yok"], [4, "Bir hesap doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Veri yorumlama", puan: 14,
        metin: r`Buz ısıtılırken sıcaklığı −10 °C'den 0 °C'ye çıkıyor, bir süre 0 °C'de kalıyor, sonra yükseliyor.

**a)** 0 °C'de sıcaklığın sabit kalmasının nedenini açıklayınız.
**b)** Bu sırada verilen ısı ne işe yarar?
**c)** Saf olmayan (tuzlu) buzda bu sabit sıcaklık nasıl değişir?`,
        cevap: r`**a)** Hâl değişimi sırasında (erime) verilen ısı sıcaklığı artırmaz.
**b)** Isı, tanecikler arasındaki çekimi yenmek için kullanılır (erime ısısı); potansiyel enerji artar.
**c)** Tuzlu buz 0 °C'nin altında erimeye başlar ve erime sıcaklığı sabit kalmaz; yavaşça değişir (saf olmayan maddelerin belirli bir erime noktası yoktur).`,
        olcut: [[14, "Üç bölüm doğru"], [9, "İki bölüm doğru"], [4, "Bir bölüm doğru"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Bilimsel gözlem", puan: 15,
        metin: r`80 °C'de 1 kg su ile 20 °C'de 2 kg su yalıtılmış bir kapta karıştırılıyor.

**a)** Isıl denge sıcaklığını bulunuz.
**b)** Gerçek bir deneyde ölçülen son sıcaklık hesaptan biraz düşük çıkıyor. Bunun nedeni ne olabilir? Deneyi nasıl iyileştirirsiniz?`,
        cevap: r`**a)** Alınan ısı = verilen ısı: $1 \cdot c \cdot (80 - T) = 2 \cdot c \cdot (T - 20) \Rightarrow 80 - T = 2T - 40 \Rightarrow T = 40$ °C.
**b)** Kaba ve çevreye ısı kaybı (yalıtım tam değil, kap da ısı alır). İyileştirme: kalorimetre ya da köpük bardak kullanmak, kapağı kapatmak, hızlı karıştırıp hemen ölçmek, kabın ısı sığasını hesaba katmak.`,
        olcut: [[15, "40 °C ve ısı kaybı ile uygun iyileştirme"], [10, "Hesap doğru, b eksik"], [5, "Kurulum doğru, işlem hatası"], [0, "Yanlış ya da boş"]] },
      { tema: "u4", beceri: "Sınıflandırma", puan: 15,
        metin: r`Aşağıdaki durumlarda ısının hangi yolla (iletim, konveksiyon, ışıma) aktarıldığını yazınız ve birini ayrıntılı açıklayınız:

**a)** Güneşin Dünya'yı ısıtması **b)** Kalorifer peteğinin odayı ısıtması **c)** Metal kaşığın sıcak çayda ısınması

Ayrıca neden tencere sapları genellikle plastik ya da tahtadan yapılır?`,
        cevap: r`**a)** Işıma (boşlukta madde gerekmez). **b)** Konveksiyon (ısınan hava yükselir, soğuk hava iner; akım oluşur). **c)** İletim (taneciklerin titreşimi komşu taneciklere aktarılır).

Plastik ve tahta ısıyı iyi iletmeyen **yalıtkan** maddelerdir; sap ısınmaz ve elimiz yanmaz.`,
        olcut: [[15, "Üç yol, bir açıklama ve sap gerekçesi"], [10, "Üç yol doğru, açıklama ya da sap eksik"], [5, "İki yol doğru"], [0, "Yanlış ya da boş"]] }
    ] }
  ] };
})();
