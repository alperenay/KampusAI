# -*- coding: utf-8 -*-
r"""11. Sınıf Psikoloji (AYT Felsefe grubu) → js/data/content/psi-11.js
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Psikoloji Bilimini Tanıyalım", "Unit 1: Introducing Psychology", [
O("k1", "PSİ.E1", "Psikolojinin tanımı, amaçları, alt alanları ve araştırma yöntemleri", "Definition, aims, fields and research methods of psychology", r"""
# Psikoloji Nedir?
Psikoloji, **davranışları ve zihinsel süreçleri** bilimsel yöntemle inceleyen bilimdir. *Davranış* gözlenebilen eylemlerdir (konuşmak, koşmak); *zihinsel süreçler* doğrudan gözlenemeyen iç yaşantılardır (düşünme, hatırlama, duygu).

# Amaçları
1. **Betimleme:** Davranışın ne olduğunu tanımlamak.
2. **Açıklama:** Neden ortaya çıktığını göstermek.
3. **Yordama:** Hangi koşulda ortaya çıkacağını önceden kestirmek.
4. **Kontrol (yönlendirme):** İstenen davranışı artırmak, istenmeyeni azaltmak.

# Başlıca Alanlar
| Temel (kuramsal) alanlar | Uygulamalı alanlar |
|---|---|
| Gelişim, sosyal, deneysel, fizyolojik, kişilik psikolojisi | Klinik, eğitim, endüstri–örgüt, adli, spor, sağlık psikolojisi |
- **Psikolog** ilaç yazmaz; ruhsal bozuklukları ilaçla tedavi eden **psikiyatrist** tıp doktorudur.

# Araştırma Yöntemleri
- **Deneysel yöntem:** Neden–sonuç ilişkisini kurabilen tek yöntemdir. **Bağımsız değişken** araştırmacının değiştirdiği, **bağımlı değişken** ölçülen sonuçtur. Deney grubu ile kontrol grubu karşılaştırılır.
- **Betimsel yöntemler:** Doğal gözlem, vaka (örnek olay) incelemesi, anket ve görüşme.
- **Korelasyonel (ilişkisel) yöntem:** İki değişkenin birlikte değişip değişmediğini gösterir; **neden–sonuç kanıtlamaz**.
- **Etik:** Gönüllülük, bilgilendirilmiş onam, gizlilik, zarar vermeme ve araştırma sonrası bilgilendirme.
""",
 [(r"Bir araştırmacı, uyku süresinin sınav başarısına etkisini anlamak için öğrencileri rastgele iki gruba ayırıyor; birine 8, diğerine 5 saat uyku uygulatıp sınav yapıyor. Bağımsız ve bağımlı değişken nedir?",
   r"**Bağımsız değişken:** uyku süresi (araştırmacı değiştiriyor). **Bağımlı değişken:** sınav başarısı (ölçülen sonuç). Rastgele atama yapıldığı için yöntem **deneyseldir**."),
  (r"“Ekran süresi uzun olan öğrencilerin notları daha düşük” bulgusu ekran süresinin notları düşürdüğünü kanıtlar mı?",
   r"Hayır. Bu bir **korelasyondur**; iki değişken birlikte değişir ama neden–sonuç gösterilmez (üçüncü bir etken, ör. uyku düzeni, ikisini de etkileyebilir).")],
 [r"Psikoloji davranışı ve zihinsel süreçleri bilimsel yöntemle inceler.", r"Amaçlar: betimleme, açıklama, yordama, kontrol.",
  r"Yalnızca deneysel yöntem neden–sonuç kurar; korelasyon kurmaz.", r"Psikiyatrist tıp doktorudur, psikolog ilaç yazmaz."]),
O("k2", "PSİ.E2", "Psikolojide temel yaklaşımlar ve öncüler", "Major approaches and pioneers in psychology", r"""
# Bilim Olarak Doğuşu
Psikoloji felsefeden ayrılarak **1879**'da **Wilhelm Wundt**'un Leipzig'de kurduğu ilk deneysel psikoloji laboratuvarıyla bağımsız bir bilim olarak kabul edilir.

# Yaklaşımlar
| Yaklaşım | Temsilci | Odak |
|---|---|---|
| **Yapısalcılık** | Wundt, Titchener | Bilincin öğelerini **iç gözlemle** (introspeksiyon) çözümlemek |
| **İşlevselcilik** | William James | Zihnin çevreye **uyum** sağlamadaki işlevi |
| **Davranışçılık** | Watson, Skinner | Yalnızca **gözlenebilir davranış**; öğrenme ve pekiştirme |
| **Psikanaliz** | Freud | **Bilinçdışı**, çocukluk yaşantıları, savunma mekanizmaları |
| **Geştalt** | Wertheimer, Köhler | Bütün, parçaların toplamından fazladır; algıda örgütlenme |
| **Hümanistik** | Maslow, Rogers | Özgür irade, **kendini gerçekleştirme** |
| **Bilişsel** | Piaget, Neisser | Algılama, bellek, düşünme gibi **zihinsel süreçler** |
| **Biyolojik / sinirbilim** | — | Beyin, hormonlar ve genetik |

> Günümüz psikolojisi çoğunlukla **bütüncül (eklektik)** bir bakış kullanır: bir davranış biyolojik, psikolojik ve sosyal etkenlerle birlikte açıklanır.
""",
 [(r"“Bireyin ihtiyaçları basamak basamak karşılandıkça en üstte kendini gerçekleştirme ihtiyacı ortaya çıkar” görüşü hangi yaklaşıma aittir?",
   r"**Hümanistik yaklaşım** (Maslow'un ihtiyaçlar hiyerarşisi)."),
  (r"“Zihin bir kara kutudur; yalnızca uyarıcı ve tepki incelenmelidir” diyen yaklaşım hangisidir?",
   r"**Davranışçılık** (Watson).")],
 [r"Bilimsel psikoloji 1879, Wundt'un laboratuvarıyla başladı.", r"Davranışçılık gözlenebilir davranışa, psikanaliz bilinçdışına, bilişsel yaklaşım zihinsel süreçlere odaklanır.",
  r"Geştalt: bütün, parçaların toplamından fazladır.", r"Hümanistik yaklaşım: kendini gerçekleştirme ve özgür irade."]),
]),
U("u2", "2. Ünite: Psikolojinin Temel Süreçleri", "Unit 2: Basic Processes", [
O("k1", "PSİ.E3", "Sinir sistemi, duyum ve algı", "Nervous system, sensation and perception", r"""
# Davranışın Biyolojik Temeli
- **Merkezî sinir sistemi:** Beyin ve omurilik. Beynin **ön lobu** planlama ve karar verme, **şakak lobu** işitme ve dil, **art kafa lobu** görme, **çeşit lobu** dokunma ve beden duyumlarıyla ilişkilidir. **Beyincik** denge ve hareket uyumunu sağlar.
- **Çevresel sinir sistemi:** İstemli hareketleri yöneten somatik sistem ile iç organları yöneten **otonom sistem** (sempatik: alarm/"savaş ya da kaç"; parasempatik: dinlenme).
- **Endokrin sistem:** Hormonlarla yavaş ama uzun süreli düzenleme (ör. adrenalin, tiroksin).

# Duyum ve Algı
- **Duyum:** Duyu organlarının uyarıcıyı alıp sinir sinyaline çevirmesi.
- **Algı:** Duyumların beyinde **örgütlenip yorumlanması**; geçmiş yaşantı, beklenti, ilgi ve kültürden etkilenir.
- **Mutlak eşik:** Bir uyarıcının fark edilebilmesi için gereken en küçük şiddet. **Farklılık eşiği:** İki uyarıcı arasındaki fark edilebilir en küçük fark.
- **Duyusal uyum:** Sürekli uyarıcıya duyarlılığın azalması (odadaki kokuyu bir süre sonra almamak).

# Algıda Örgütleme (Geştalt İlkeleri)
**Şekil–zemin**, **yakınlık**, **benzerlik**, **tamamlama**, **süreklilik**. Ayrıca **algıda değişmezlik**: uzaklaşan bir arabayı küçülmüş değil, aynı boyda algılarız.

# Algıyı Etkileyen Etkenler ve Yanılsamalar
Dikkat, güdü, beklenti (**algıda seçicilik**) algıyı değiştirir. **Göz yanılsamaları**, algının duyuma birebir eşit olmadığını gösterir.
""",
 [(r"Aç bir öğrencinin yürürken yol kenarındaki fırın tabelalarını daha çok fark etmesi hangi kavramla açıklanır?",
   r"**Algıda seçicilik**: güdüler (açlık) dikkati ve algıyı ilgili uyarıcılara yönlendirir."),
  (r"Parfüm kokusunun birkaç dakika sonra fark edilmemesi neyle açıklanır?",
   r"**Duyusal uyum**: değişmeyen uyarıcıya karşı duyarlılık azalır.")],
 [r"Duyum uyarıcının alınması, algı ise yorumlanmasıdır.", r"Sempatik sistem alarm, parasempatik sistem dinlenme durumunu yönetir.",
  r"Geştalt ilkeleri: şekil–zemin, yakınlık, benzerlik, tamamlama, süreklilik.", r"Algıda seçicilik güdü ve beklentiden etkilenir."]),
O("k2", "PSİ.E4", "Bilinç, uyku ve rüya", "Consciousness, sleep and dreams", r"""
# Bilinç
Kişinin kendisinin ve çevresinin farkında olmasıdır. Düzeyleri: **bilinç** (şu an farkında olunan), **bilinç öncesi** (hemen hatırlanabilen; telefon numarası), **bilinçdışı** (Freud'a göre farkında olunmayan ama davranışı etkileyen içerikler).

# Uyku
Bilincin doğal ve düzenli olarak değiştiği durumdur; yaklaşık 24 saatlik **biyolojik saat (sirkadiyen ritim)** tarafından düzenlenir.
- **NREM uykusu:** Yavaş dalgalı, derinleşen evreler; bedenin dinlenmesi ve onarım.
- **REM uykusu:** Hızlı göz hareketleri, beyin etkinliği uyanıklığa yakın, kaslar gevşek; **rüyaların** çoğu bu evrede görülür. Öğrenilenlerin pekişmesinde önemlidir.
- Bir gecede NREM–REM döngüsü yaklaşık 90 dakikada bir tekrarlanır.

# Uyku Bozuklukları ve Uyku Hijyeni
Uykusuzluk (insomnia), uyurgezerlik, uyku apnesi, narkolepsi. Düzenli uyku saati, yatmadan önce ekran ve kafeinden uzak durmak uyku kalitesini artırır. Ergenlerde önerilen süre gecede **8–10 saattir**.
""",
 [(r"Sınavdan önceki gece uykusuz kalmak öğrenmeyi neden olumsuz etkiler?",
   r"Öğrenilen bilgilerin pekişmesi özellikle **REM** ve derin uyku sırasında olur; uykusuzluk dikkat ve belleği zayıflatır."),
  (r"Rüyaların çoğu hangi uyku evresinde görülür?", r"**REM** uykusunda.")],
 [r"Bilinç düzeyleri: bilinç, bilinç öncesi, bilinçdışı.", r"Uykuyu biyolojik saat (sirkadiyen ritim) düzenler.",
  r"REM: hızlı göz hareketi, rüya, bellek pekişmesi.", r"Ergenler için 8–10 saat uyku önerilir."]),
]),
U("u3", "3. Ünite: Öğrenme, Bellek ve Düşünme", "Unit 3: Learning, Memory and Thinking", [
O("k1", "PSİ.E5", "Öğrenme: klasik koşullanma, edimsel koşullanma ve gözlem yoluyla öğrenme", "Learning: classical and operant conditioning, observational learning", r"""
# Öğrenme
Yaşantı sonucu davranışta oluşan **görece kalıcı** değişmedir. Büyüme, yorgunluk ya da ilaç etkisiyle oluşan değişimler öğrenme değildir.

# Klasik Koşullanma (Pavlov)
Doğal tepki doğuran bir uyarıcı ile nötr bir uyarıcının **birlikte sunulmasıyla** nötr uyarıcının da tepki doğurması.
- Koşulsuz uyarıcı (yemek) → koşulsuz tepki (salya)
- Nötr uyarıcı (zil) + yemek tekrarlanınca zil → **koşullu uyarıcı**, salya → **koşullu tepki**
- **Sönme:** Zil yemeksiz sunulmaya devam ederse tepki azalır. **Genelleme:** Benzer seslere de tepki. **Ayırt etme:** Yalnızca belli sese tepki.
- Örnek: Diş hekiminin matkap sesini duyunca kaygılanmak.

# Edimsel (Operant) Koşullanma (Skinner)
Davranış **sonucuna göre** öğrenilir.
| | Bir şey eklenir | Bir şey çıkarılır |
|---|---|---|
| **Davranış artar (pekiştirme)** | Olumlu pekiştirme (ödül) | Olumsuz pekiştirme (hoşa gitmeyen durumun kaldırılması) |
| **Davranış azalır (ceza)** | Olumlu ceza (hoşa gitmeyen eklenir) | Olumsuz ceza (sevilen bir şey alınır) |
> **Olumsuz pekiştirme ceza değildir**; davranışı artırır (ör. emniyet kemeri takınca uyarı sesinin susması).

# Gözlem Yoluyla (Sosyal) Öğrenme (Bandura)
Başkalarının davranışlarını ve bunların sonuçlarını **izleyerek** öğrenme (**model alma**). Süreç: dikkat → hatırda tutma → yapabilme → güdülenme. Bobo bebek deneyi bunu göstermiştir.

# Diğer
**Kavrayış (içgörü) yoluyla öğrenme** (Köhler, şempanzeler): problemin parçaları arasındaki ilişkinin birden fark edilmesi.
""",
 [(r"Odasını toplayan çocuğun, annesi tarafından o akşam bulaşık görevinden muaf tutulması hangi kavrama örnektir?",
   r"Hoşa gitmeyen bir görev **kaldırılıyor** ve odayı toplama davranışı **artıyor** → **olumsuz pekiştirme**."),
  (r"Bir kez bozuk süt içip hastalanan kişinin sonrasında süt kokusundan bile rahatsız olması hangi öğrenme türüdür?",
   r"**Klasik koşullanma** (koku nötr uyarıcıyken bulantıyla eşleşip koşullu uyarıcı olmuştur).")],
 [r"Öğrenme: yaşantıyla oluşan görece kalıcı davranış değişmesi.", r"Klasik koşullanma: uyarıcıların eşleşmesi (Pavlov).",
  r"Edimsel koşullanma: davranışın sonucu (pekiştirme artırır, ceza azaltır).", r"Olumsuz pekiştirme davranışı artırır; ceza değildir.", r"Bandura: model alarak öğrenme."]),
O("k2", "PSİ.E6", "Bellek ve unutma; düşünme, problem çözme ve dil", "Memory and forgetting; thinking, problem solving and language", r"""
# Bellek Süreçleri
**Kodlama** (bilginin işlenmesi) → **depolama** (saklanması) → **geri getirme** (hatırlama).

# Bellek Türleri (Çok Depolu Model)
| | Duyusal bellek | Kısa süreli (çalışan) bellek | Uzun süreli bellek |
|---|---|---|---|
| Süre | 1–3 saniye | ~ 20–30 saniye (tekrarla uzar) | Kalıcı, sınırsız kabul edilir |
| Kapasite | Geniş | 7 ± 2 birim | Sınırsız |
- Uzun süreli bellekte **açık (bildirimsel)** bellek (olaylar ve bilgiler) ile **örtük (işlemsel)** bellek (bisiklet sürmek gibi beceriler) vardır.
- **Gruplama (öbekleme):** Bilgiyi anlamlı parçalar hâline getirmek kısa süreli belleğin kapasitesini artırır (telefon numarasını üçerli gruplamak).

# Unutma Nedenleri
- **Bozulma (kullanmama):** Kullanılmayan bilgi zayıflar. Ebbinghaus'a göre unutma ilk saatlerde **hızlıdır**, sonra yavaşlar → **aralıklı tekrar** önemlidir.
- **Ket vurma (bozucu etki):** Önce öğrenilen yeniyi (**ileriye ket vurma**) ya da yeni öğrenilen eskiyi (**geriye ket vurma**) bozar.
- **Güdüsel unutma (bastırma)** ve geri getirme ipucunun olmaması ("dilimin ucunda").

# Düşünme ve Problem Çözme
- **Kavram** ve **zihinsel imgeler** düşünmenin yapı taşlarıdır.
- Problem çözme stratejileri: **deneme–yanılma**, **algoritma** (kesin sonuç veren adım dizisi), **sezgisel yöntem (kestirme)**, kavrayış.
- Engeller: **zihin kalıbı**, **işlevsel saplantı** (bir nesneyi yalnızca bilinen işleviyle düşünmek), doğrulama yanlılığı.

# Dil
Sembollerle iletişim sistemidir. Çocuklar dili kendiliğinden ve hızla edinir; dil ile düşünme birbirini etkiler.
""",
 [(r"Tarih dersinden hemen sonra çalışılan coğrafya bilgileri yüzünden tarih bilgilerini hatırlamakta güçlük çekmek hangi tür ket vurmadır?",
   r"Sonradan öğrenilen (coğrafya) önceki öğrenmeyi (tarih) bozuyor → **geriye ket vurma**."),
  (r"Ebbinghaus'un unutma eğrisi çalışma planı için ne önerir?",
   r"Unutma öğrenmeden hemen sonra hızlı olduğu için ilk tekrarı **kısa süre içinde**, sonrakileri giderek **uzayan aralıklarla** yapmak (aralıklı tekrar).")],
 [r"Bellek: kodlama → depolama → geri getirme.", r"Kısa süreli bellek kapasitesi 7 ± 2; gruplama kapasiteyi artırır.",
  r"Unutma: bozulma, ileriye/geriye ket vurma, bastırma, ipucu eksikliği.", r"İşlevsel saplantı ve zihin kalıbı problem çözmeyi engeller."]),
]),
U("u4", "4. Ünite: Ruh Sağlığının Temelleri", "Unit 4: Foundations of Mental Health", [
O("k1", "PSİ.E7", "Güdüler, duygular ve kişilik", "Motives, emotions and personality", r"""
# Güdü (Motivasyon)
Davranışı başlatan, yönlendiren ve sürdüren iç etkendir.
- **Fizyolojik güdüler:** Açlık, susuzluk, uyku (homeostaziyi korur).
- **Psikolojik/sosyal güdüler:** Başarı, bağlanma, saygınlık.
- **İç (içsel) güdülenme:** İşin kendisinden zevk almak. **Dış güdülenme:** Ödül, not, övgü gibi dışsal sonuçlar.
- **Maslow'un ihtiyaçlar hiyerarşisi:** Fizyolojik → güvenlik → ait olma ve sevgi → saygınlık → **kendini gerçekleştirme**. Alt basamaklar karşılanmadan üsttekiler genellikle öne çıkmaz.
- **Güdü çatışmaları:** Yaklaşma–yaklaşma (iki çekici seçenek), kaçınma–kaçınma (iki istenmeyen seçenek), yaklaşma–kaçınma (aynı hedefin hem iyi hem kötü yanı).

# Duygular
Fizyolojik uyarılma, öznel yaşantı ve dışavurumdan oluşur. Temel duyguların (mutluluk, korku, öfke, üzüntü, şaşkınlık, tiksinme) yüz ifadeleri kültürler arasında büyük ölçüde benzerdir.

# Kişilik
Bireyi diğerlerinden ayıran, **tutarlı** düşünce, duygu ve davranış örüntüsüdür; kalıtım ve çevrenin ortak ürünüdür.
- **Mizaç** doğuştan gelen yanıdır, **karakter** toplumsal değerlerle ilgili yanıdır.
- Freud: id (haz), ego (gerçeklik), süperego (vicdan). Beş faktör (özellik) kuramı: dışadönüklük, uyumluluk, sorumluluk, duygusal denge, deneyime açıklık.
""",
 [(r"Hafta sonu hem arkadaşlarıyla sinemaya hem de çok sevdiği konsere davet edilen ama ikisine birden gidemeyen öğrencinin yaşadığı çatışma hangisidir?",
   r"İki çekici seçenek arasında seçim → **yaklaşma–yaklaşma çatışması**."),
  (r"Yalnızca not almak için ders çalışan öğrencinin güdülenmesi hangi türdür?", r"**Dış güdülenme** (davranış dışsal bir sonuç için yapılıyor).")],
 [r"Güdü davranışı başlatır, yönlendirir ve sürdürür.", r"Maslow: fizyolojik → güvenlik → ait olma → saygınlık → kendini gerçekleştirme.",
  r"Çatışmalar: yaklaşma–yaklaşma, kaçınma–kaçınma, yaklaşma–kaçınma.", r"Kişilik kalıtım ve çevrenin ürünüdür; mizaç doğuştan gelir."]),
O("k2", "PSİ.E8", "Stres, başa çıkma, savunma mekanizmaları ve ruh sağlığı", "Stress, coping, defence mechanisms and mental health", r"""
# Stres
Bireyin uyum sağlamasını zorlayan durumlara karşı verdiği bedensel ve psikolojik tepkidir. Stres kaynakları: **engellenme** (amaca ulaşamama), **çatışma**, **baskı** ve büyük yaşam olayları.
- **Genel uyum sendromu (Selye):** Alarm → direnç → tükenme. Uzun süreli stres bağışıklığı zayıflatır.
- Az ve orta düzey stres performansı artırabilir; çok yüksek stres düşürür.

# Başa Çıkma
- **Problem odaklı:** Sorunun kaynağına yönelmek (plan yapmak, bilgi toplamak).
- **Duygu odaklı:** Duyguyu düzenlemek (nefes egzersizi, konuşmak, spor).
- Sağlıklı yollar: düzenli uyku ve beslenme, fiziksel etkinlik, sosyal destek, zaman yönetimi; gerektiğinde **uzman desteği** almak.

# Savunma Mekanizmaları (Freud)
Kaygıyı azaltmak için çoğu zaman bilinçdışı kullanılan yollar:
| Mekanizma | Örnek |
|---|---|
| **Bastırma** | Acı veren anıyı hatırlamamak |
| **Yansıtma** | Kendi kusurunu başkasına yüklemek |
| **Mantığa bürüme** | Başarısızlığa kabul edilebilir bahane bulmak ("Sınav zaten haksızdı") |
| **Yer değiştirme** | Öğretmene duyulan öfkeyi kardeşten çıkarmak |
| **Yüceltme** | Saldırganlığı sporla, sanatla ifade etmek |
| **Gerileme** | Daha erken yaş davranışlarına dönmek |
| **Karşıt tepki geliştirme** | Hoşlanmadığı kişiye aşırı iyi davranmak |

# Ruh Sağlığı
Yalnızca hastalığın yokluğu değil; kişinin yeteneklerini fark ettiği, günlük stresle baş edebildiği, üretken olduğu ve topluma katkı sağladığı **iyi oluş** hâlidir. Kaygı bozuklukları ve depresyon tedavi edilebilir; damgalama yardım aramayı geciktirir.
""",
 [(r"Matematik sınavından düşük alan öğrencinin “Zaten mühendis olmak istemiyordum” demesi hangi savunma mekanizmasıdır?",
   r"**Mantığa bürüme** (başarısızlığa kabul edilebilir bir gerekçe bulma)."),
  (r"Sınav kaygısı yaşayan bir öğrencinin çalışma planı hazırlaması ve konuları bölmesi hangi başa çıkma türüdür?",
   r"**Problem odaklı** başa çıkma (stresin kaynağına yöneliyor).")],
 [r"Stres kaynakları: engellenme, çatışma, baskı, yaşam olayları.", r"Selye: alarm → direnç → tükenme.",
  r"Başa çıkma: problem odaklı ve duygu odaklı.", r"Savunma mekanizmaları kaygıyı azaltır ama sorunu çözmez; yüceltme en olumlu olanıdır.",
  r"Ruh sağlığı bir iyi oluş hâlidir; gerektiğinde uzman desteği alınmalıdır."]),
]),
]

write("psi-11.js", "11/psikoloji", "11. Sınıf Psikoloji — konu anlatım notları (AYT Felsefe grubu)",
      "KampüsAI için özgün olarak yazıldı (1.43); MEB programının konu başlıkları esas alındı, metin kopyalanmadı.", units)
