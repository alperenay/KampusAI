# -*- coding: utf-8 -*-
"""12. Sınıf Felsefe (Mantık) konu anlatım notları → js/data/content/fel-12.js
12. sınıfta felsefe grubu dersi olarak Mantık okutulur; AYT Felsefe Grubu testinde de mantık soruları
çıkar. MEB Mantık öğretim programının 4 ünitesi temel alındı (1.34.0)."""
from _c import O, U, write

units = [
U("u1", "1. Ünite: Mantığa Giriş", "Unit 1: Introduction to Logic", [
O("k1", "1.1", "Mantığın tanımı, konusu ve önemi", "Definition, subject and importance of logic", r"""
# Mantık Nedir?
**Mantık**, doğru düşünmenin **kurallarını** ve **ilkelerini** inceleyen disiplindir. Sorusu şudur: *Bir sonuç, öncüllerden **geçerli** biçimde çıkıyor mu?*

- Mantık düşüncenin **içeriğiyle** değil **biçimiyle (formuyla)** ilgilenir.
- Kelime kökü: Yunanca **logos** (söz, akıl); Arapça **nutk** (konuşma).
- **Aristoteles** mantığı bilimlerin **aracı (organon)** sayar; mantığı sistemleştiren ilk düşünürdür.
- İslam dünyasında **Fârâbî** "ikinci öğretmen" (*Muallim-i Sânî*) olarak anılır; **İbn Sînâ** mantığı geliştirir.

# Doğruluk × Geçerlilik
| Kavram | Neye aittir? | Örnek |
|---|---|---|
| **Doğruluk** | **Önermeye** (bilgiyle olgunun uyuşması) | "Su 100 °C'de kaynar." |
| **Geçerlilik** | **Akıl yürütmeye** (sonucun öncüllerden zorunlu çıkması) | Tüm A'lar B'dir; C bir A'dır → C bir B'dir. |

- Öncülleri **yanlış** olan bir akıl yürütme **geçerli** olabilir: *Bütün kuşlar memelidir; penguen kuştur → penguen memelidir.* (biçim geçerli, sonuç yanlış)
- **Tutarlılık:** Önermelerin **birbiriyle çelişmemesi**.

# Mantığın Önemi
Eleştirel düşünme, bilimsel yöntem, hukukta delil değerlendirme, bilgisayar bilimi (**Boole cebiri**, devre tasarımı, yapay zekâ) mantığa dayanır.
""",
  [("\"Bütün balıklar uçar. Hamsi bir balıktır. O hâlde hamsi uçar.\" akıl yürütmesini doğruluk ve geçerlilik açısından değerlendiriniz.", "Biçim **geçerlidir** (sonuç öncüllerden zorunlu çıkıyor). Ancak birinci öncül **yanlış** olduğu için sonuç da yanlıştır. Akıl yürütme geçerli fakat **sağlam (doğru öncüllü) değildir**.")],
  ["Mantık: doğru düşünmenin biçimsel kuralları.", "Doğruluk önermeye, geçerlilik akıl yürütmeye aittir.", "Aristoteles: mantık bilimlerin aracı (organon)."]),
O("k2", "1.2", "Düşünme ilkeleri (akıl ilkeleri)", "Laws of thought", r"""
# Dört Temel Düşünme İlkesi
| İlke | Formül | Açıklama |
|---|---|---|
| **Özdeşlik** | $A = A$ | Bir şey kendisiyle aynıdır; düşünme süresince anlamı değişmez. |
| **Çelişmezlik** | $A$ hem $B$ hem $\neg B$ olamaz | Bir şey aynı anda ve aynı bakımdan hem kendisi hem değilini taşıyamaz. |
| **Üçüncü hâlin olanaksızlığı** | Ya $A$ ya $\neg A$ | Bir önerme ya doğru ya yanlıştır; üçüncü bir durum yoktur. |
| **Yeter-sebep** | Her şeyin bir nedeni vardır | Varlığın/bilginin yeterli bir gerekçesi bulunur (**Leibniz**). |

# Örneklerle
- *"Bu kalem hem kırmızı hem kırmızı değil"* → **çelişmezlik** ilkesine aykırı.
- *"Ali ya öğrencidir ya öğrenci değildir"* → **üçüncü hâlin olanaksızlığı**.
- Kelimeyi tartışmanın ortasında **farklı anlamda** kullanmak (*"yüz"*: surat / sayı) → **özdeşlik** ilkesinin ihlali.

> Çok değerli mantıklar (bulanık mantık — **Zadeh**) "üçüncü hâlin olanaksızlığı" ilkesini sorgular; klasik mantık iki değerlidir (doğru/yanlış).
""",
  [("\"Sınavı geçtim de geçmedim de\" diyen biri hangi düşünme ilkesini ihlal eder?", "**Çelişmezlik ilkesi** — aynı anda aynı bakımdan hem geçmiş hem geçmemiş olunamaz."),
   ("Bulanık mantığın \"suyun sıcaklığı 0,7 derecesinde sıcaktır\" gibi ifadeleri hangi klasik ilkeyle çatışır?", "**Üçüncü hâlin olanaksızlığı** — klasik mantıkta önerme ya doğru (1) ya yanlış (0) iken bulanık mantık ara değerlere izin verir.")],
  ["Özdeşlik A=A; çelişmezlik; üçüncü hâlin olanaksızlığı; yeter-sebep.", "Yeter-sebep ilkesi Leibniz'e aittir.", "Bulanık mantık iki değerliliği sorgular."]),
]),
U("u2", "2. Ünite: Klasik Mantık", "Unit 2: Classical Logic", [
O("k1", "2.1", "Kavram, terim ve kavramlar arası ilişkiler", "Concepts, terms and relations between concepts", r"""
# Kavram ve Terim
- **Kavram:** Bir nesnenin zihindeki **genel tasarımı** (düşünce).
- **Terim:** Kavramın **dildeki** ifadesi (kelime).
- **İçlem:** Kavramın **özellikleri** toplamı. **Kaplam:** Kavramın **kapsadığı varlıklar** toplamı.
- İçlem artarsa kaplam **azalır** (ters orantı): *canlı → hayvan → memeli → kedi*.

# Kavram Türleri
| Tür | Örnek |
|---|---|
| **Tümel / tikel / tekil** | insan / bazı insanlar / Atatürk |
| **Somut / soyut** | masa / adalet |
| **Olumlu / olumsuz** | düzenli / düzensiz |
| **Topluluk** | ordu, orkestra (parçalara tek tek yüklenemez) |

# Kavramlar Arası İlişkiler
| İlişki | Açıklama | Örnek |
|---|---|---|
| **Eşitlik** | Kaplamları aynı | üçgen – üç kenarlı kapalı şekil |
| **Altlık-üstlük** | Biri diğerini kapsar | kuş – serçe |
| **Kesişme (ayrımlılık)** | Kısmen ortak | öğrenci – sporcu |
| **Karşıtlık** | Bir üçüncüsü olabilir | sıcak – soğuk (ılık) |
| **Çelişiklik** | Bir üçüncüsü olamaz | canlı – cansız |
""",
  [("\"Hayvan\" ve \"memeli\" kavramlarını içlem–kaplam bakımından karşılaştırınız.", "\"Memeli\"nin **içlemi** daha geniştir (hayvanın tüm özellikleri + süt bezleri vb.), **kaplamı** daha dardır (yalnızca memeli hayvanlar)."),
   ("\"Siyah – beyaz\" karşıt mı, çelişik mi?", "**Karşıt** — aralarında üçüncü bir renk (gri, kırmızı) olabilir. \"Siyah – siyah olmayan\" ise çelişiktir.")],
  ["Kavram zihinde, terim dilde.", "İçlem artınca kaplam azalır.", "Karşıtlarda üçüncü olur, çelişiklerde olmaz."]),
O("k2", "2.2", "Tanım ve tanım kuralları; beş tümel", "Definition and its rules; the five predicables", r"""
# Beş Tümel (Porphyrios)
| Tümel | Açıklama | "İnsan" için örnek |
|---|---|---|
| **Cins** | Türleri kapsayan üst kavram | canlı/hayvan |
| **Tür** | Cinsin altındaki sınıf | insan |
| **Ayrım (fasıl)** | Türü cinsten ayıran özsel nitelik | akıl sahibi olmak |
| **Hassa** | Türe özgü ama özsel olmayan nitelik | gülme yeteneği |
| **İlinek (araz)** | Bulunup bulunmaması özü değiştirmeyen | uzun boylu olmak |

# Tanım Türleri
- **Gerçek (özsel) tanım:** **yakın cins + ayrım** → *İnsan, akıl sahibi bir hayvandır.*
- **Eksik tanım:** cins + hassa → *İnsan gülen bir hayvandır.*
- **Betimleme / sözcüksel / işlemsel** tanımlar bilimde ve günlük dilde kullanılır.

# Tanımın Kuralları
1. **Kapsayıcı ve dışlayıcı** olmalı (ne geniş ne dar): ~~*İnsan iki ayaklı canlıdır*~~ (kuşlar da girer).
2. **Kısır döngü** olmamalı: ~~*Güneş, güneş ışığı veren yıldızdır*~~.
3. **Olumsuz** olmamalı (gerekmedikçe): ~~*Kare daire olmayan şekildir*~~.
4. **Mecaz ve belirsiz** ifade içermemeli: ~~*Kitap insanın en yakın dostudur*~~.
5. **Özsel** nitelikleri vermeli.
""",
  [("\"Üçgen, üç kenarlı kapalı bir şekildir\" tanımında cins ve ayrım nedir?", "**Cins:** kapalı şekil (çokgen) · **Ayrım:** üç kenarlı olmak. Yakın cins + ayrım içerdiği için gerçek (özsel) tanımdır."),
   ("\"Kuş, uçabilen canlıdır\" tanımındaki hata nedir?", "Tanım hem **geniş** (yarasa, böcek de uçar) hem **dar** (penguen, devekuşu uçamaz) — kapsayıcı ve dışlayıcı değildir.")],
  ["Beş tümel: cins, tür, ayrım, hassa, ilinek.", "Gerçek tanım = yakın cins + ayrım.", "Tanım ne geniş ne dar; döngüsüz, olumsuz ve mecazsız olmalı."]),
O("k3", "2.3", "Önerme türleri ve karşı olma ilişkileri (mantık karesi)", "Categorical propositions and the square of opposition", r"""
# Klasik (Kategorik) Önerme Türleri
| Sembol | Tür | Kalıp | Örnek |
|---|---|---|---|
| **A** | Tümel olumlu | Bütün S'ler P'dir | Bütün metaller iletkendir. |
| **E** | Tümel olumsuz | Hiçbir S P değildir | Hiçbir kuş memeli değildir. |
| **I** | Tikel olumlu | Bazı S'ler P'dir | Bazı öğrenciler sporcudur. |
| **O** | Tikel olumsuz | Bazı S'ler P değildir | Bazı bitkiler çiçekli değildir. |

**Terimlerin kaplamı (dağıtılmış olma):** A'da yalnız **özne**, E'de **ikisi**, I'de **hiçbiri**, O'da yalnız **yüklem** dağıtılmıştır.

# Mantık Karesi
| İlişki | Önermeler | Kural |
|---|---|---|
| **Çelişiklik** | A–O, E–I | Biri doğruysa öteki **yanlış**, biri yanlışsa öteki **doğru** |
| **Karşıtlık** | A–E | İkisi birden **doğru olamaz** (ikisi yanlış olabilir) |
| **Alt karşıtlık** | I–O | İkisi birden **yanlış olamaz** (ikisi doğru olabilir) |
| **Altık (alt-üst)** | A–I, E–O | Tümel doğruysa tikel **doğru**; tikel yanlışsa tümel **yanlış** |
""",
  [("\"Bütün öğrenciler çalışkandır\" (A) önermesi yanlışsa \"Bazı öğrenciler çalışkan değildir\" (O) önermesi nedir?", "A ile O **çelişiktir** → A yanlışsa O kesinlikle **doğrudur**."),
   ("\"Bazı kediler siyahtır\" (I) doğruysa \"Hiçbir kedi siyah değildir\" (E) için ne söylenir?", "I ile E **çelişiktir** → E **yanlıştır**.")],
  ["A tümel olumlu, E tümel olumsuz, I tikel olumlu, O tikel olumsuz.", "Çelişikler (A–O, E–I) daima zıt değer alır.", "Karşıtlar birlikte doğru olamaz; alt karşıtlar birlikte yanlış olamaz."]),
O("k4", "2.4", "Çıkarım türleri: tümdengelim, tümevarım, analoji", "Types of inference: deduction, induction, analogy", r"""
# Akıl Yürütme Türleri
| Tür | Yön | Sonucun kesinliği | Örnek |
|---|---|---|---|
| **Tümdengelim (dedüksiyon)** | Genelden özele | **Zorunlu** (öncüller doğruysa) | Bütün insanlar ölümlüdür; Sokrates insandır → Sokrates ölümlüdür. |
| **Tümevarım (endüksiyon)** | Özelden genele | **Olası** | Gözlenen bütün kuğular beyaz → bütün kuğular beyazdır (siyah kuğu bulununca çürüdü). |
| **Analoji (benzetme)** | Özelden özele | **Olası** | Mars Dünya'ya benzer; Dünya'da yaşam var → Mars'ta yaşam olabilir. |

# Tümevarım Türleri
- **Tam tümevarım:** Bütün örnekler tek tek incelenir → kesin sonuç (*sınıftaki 30 öğrencinin hepsi 17 yaşında*).
- **Eksik tümevarım:** Bazı örneklerden genelleme → olası sonuç; bilimin çoğu buna dayanır.
- **Hume**'un tümevarım problemi: Geçmiş deneyim geleceğin aynı olacağını garanti etmez.

# Dolaysız Çıkarımlar
Tek öncülden sonuç: **döndürme** (Hiçbir S P değildir → Hiçbir P S değildir), **karşı olma** (mantık karesi).
""",
  [("\"Şimdiye kadar incelenen tüm metaller ısıtılınca genleşti; o hâlde bütün metaller ısıtılınca genleşir.\" Bu hangi akıl yürütmedir?", "**Eksik tümevarım** — sınırlı sayıda gözlemden genel bir sonuca varılıyor; sonuç **olasıdır**."),
   ("Tümdengelimde sonucun zorunlu olmasının nedeni nedir?", "Sonuç, öncüllerin **içinde zaten bulunan** bilgiyi açığa çıkarır; öncüller doğru ve biçim geçerliyse sonuç **yanlış olamaz**.")],
  ["Tümdengelim genelden özele, zorunlu.", "Tümevarım özelden genele, olası (Hume problemi).", "Analoji özelden özele, olası."]),
O("k5", "2.5", "Kıyas (tasım): yapısı, şekilleri ve geçerlilik kuralları", "The syllogism: structure, figures and rules of validity", r"""
# Kıyasın Yapısı
İki öncülden bir sonuç çıkaran tümdengelimdir; **üç terim** içerir:
- **Büyük terim (P):** Sonucun **yüklemi**; büyük öncülde geçer.
- **Küçük terim (S):** Sonucun **öznesi**; küçük öncülde geçer.
- **Orta terim (M):** **İki öncülde** geçer, **sonuçta geçmez**.

*Bütün memeliler omurgalıdır. (M–P) · Bütün kediler memelidir. (S–M) · ∴ Bütün kediler omurgalıdır. (S–P)*

# Geçerlilik Kuralları
1. **Üç terim** olmalı (dört terim yanılgısı: aynı kelime iki anlamda).
2. **Orta terim** en az bir öncülde **dağıtılmış (tümel)** olmalı.
3. Öncülde dağıtılmayan terim sonuçta dağıtılamaz.
4. **İki olumsuz** öncülden sonuç çıkmaz.
5. **İki tikel** öncülden sonuç çıkmaz.
6. Öncüllerden biri olumsuzsa sonuç **olumsuz**, tikelse sonuç **tikel** olur.

# Şekiller (orta terimin yerine göre)
| Şekil | Büyük öncül | Küçük öncül |
|---|---|---|
| 1. | M – P | S – M |
| 2. | P – M | S – M |
| 3. | M – P | M – S |
| 4. | P – M | M – S |
""",
  [("\"Bazı öğrenciler sporcudur. Bazı sporcular yüzücüdür. O hâlde bazı öğrenciler yüzücüdür.\" kıyası geçerli midir?", "**Geçersizdir** — iki öncül de **tikel** (kural 5); ayrıca orta terim \"sporcu\" hiçbir öncülde dağıtılmamıştır (kural 2)."),
   ("\"Hiçbir sürüngen tüylü değildir. Bütün yılanlar sürüngendir.\" Sonuç nedir?", "*Hiçbir yılan tüylü değildir.* (1. şekil, öncüllerden biri olumsuz → sonuç olumsuz; E–A–E, **Celarent**)")],
  ["Orta terim iki öncülde var, sonuçta yok.", "İki olumsuz ya da iki tikel öncülden sonuç çıkmaz.", "Orta terim en az bir kez dağıtılmış olmalı."]),
]),
U("u3", "3. Ünite: Mantık ve Dil", "Unit 3: Logic and Language", [
O("k1", "3.1", "Dilin işlevleri ve tanım türleri", "Functions of language and kinds of definition", r"""
# Dilin Temel İşlevleri
| İşlev | Amaç | Örnek | Doğru/yanlış olur mu? |
|---|---|---|---|
| **Bilgi verme (betimleyici)** | Olguyu aktarmak | *Ankara Türkiye'nin başkentidir.* | **Evet** |
| **Duygu anlatma (ifade edici)** | Duygu dile getirmek | *Ne güzel bir gün!* | Hayır |
| **Yönlendirme (emredici)** | Davranış yaptırmak | *Kapıyı kapat.* | Hayır |
| **Törensel** | Toplumsal kalıp | *Geçmiş olsun.* | Hayır |
| **Edimsel (performatif)** | Söyleyerek yapmak | *Sizi karı koca ilan ediyorum.* | Hayır |

Mantık yalnızca **bilgi veren** cümlelerle (önermelerle) ilgilenir; çünkü yalnızca onlar **doğru ya da yanlış** olabilir.

# Anlam ve Göndergenin Ayrımı
- **Frege:** *Sabah yıldızı* ve *akşam yıldızı* aynı nesneyi (Venüs) **gösterir** ama **anlamları** farklıdır.
- **Eş anlamlılık, çok anlamlılık, mecaz** mantıksal belirsizliğe yol açabilir.

# Tanım Türleri (dilsel)
- **Sözlük tanımı:** Kelimenin yaygın kullanımı.
- **Şart koşulan (önerilen) tanım:** Yeni terim için anlam belirleme (*"Bu çalışmada 'genç' 15–24 yaş demektir"*).
- **Kesinleştirici tanım:** Belirsizliği gidermek (hukukta "yetişkin" = 18 yaş).
- **İkna edici tanım:** Duygusal etki amaçlı; mantıkça kusurlu.
""",
  [("\"Lütfen sessiz olun!\" cümlesi neden mantığın konusu olan bir önerme değildir?", "Bu bir **yönlendirme (emir)** cümlesidir; **doğru ya da yanlış** olarak değerlendirilemez. Önerme yalnızca bilgi veren cümledir."),
   ("Frege'nin sabah yıldızı–akşam yıldızı örneği neyi gösterir?", "**Anlam (Sinn)** ile **gönderge (Bedeutung)** arasındaki farkı: iki ifade aynı nesneyi gösterir ama farklı anlamlar taşır.")],
  ["Mantık yalnızca bilgi veren (doğruluk değeri alan) cümlelerle ilgilenir.", "Dilin işlevleri: bilgi, duygu, yönlendirme, törensel, edimsel.", "Frege: anlam ≠ gönderge."]),
O("k2", "3.2", "Safsatalar (mantık yanılgıları)", "Fallacies", r"""
# Safsata Nedir?
Görünüşte doğru ama **mantıkça hatalı** akıl yürütme. Bilerek yapılırsa **safsata**, bilmeden yapılırsa **paralojizm** denir.

| Safsata | Hata | Örnek |
|---|---|---|
| **Kişiye saldırı (ad hominem)** | Görüş yerine kişiyi eleştirmek | *Onun ekonomi görüşü yanlış, çünkü kendisi borçlu.* |
| **Otoriteye başvurma** | Konusunda uzman olmayan ünlüye dayanmak | *Ünlü futbolcu bu vitamini öneriyor, demek ki iyi.* |
| **Çoğunluğa başvurma** | Çok kişinin inanmasını kanıt saymak | *Herkes böyle düşünüyor, o hâlde doğru.* |
| **Korkutma (sopaya başvurma)** | Tehditle kabul ettirmek | *Bunu kabul etmezsen sınıfta kalırsın.* |
| **Acındırma** | Merhamet duygusunu kullanmak | *Notumu yükseltin, ailem çok üzülür.* |
| **Bilgisizliğe başvurma** | Yanlışlanmadığı için doğru saymak | *Uzaylıların olmadığı kanıtlanmadı, demek ki varlar.* |
| **Aceleci genelleme** | Az örnekten genel sonuç | *İki İzmirliyi tanıdım, hepsi kibar.* |
| **Kısır döngü** | Kanıtlanacak şeyi öncülde kabul etmek | *Doğru söylüyor çünkü yalan söylemez.* |
| **Yanlış ikilem** | Yalnızca iki seçenek varmış gibi sunmak | *Ya benimlesin ya bana karşı.* |
| **Korkuluk (saman adam)** | Karşı görüşü çarpıtıp çürütmek | *Ödev azalsın diyorlar; demek okul olmasın istiyorlar.* |
| **Kaygan zemin** | Zincirleme felaket öngörmek | *Telefon alırsan derslerin düşer, üniversiteyi kazanamazsın, işsiz kalırsın.* |
| **Ondan sonra, öyleyse ondan dolayı** | Zaman sırasını nedensellik sanmak | *Kırmızı kazakla sınava girdim, yüksek aldım; kazak şans getiriyor.* |
""",
  [("\"Bu ilacın zararlı olduğu hiçbir araştırmada gösterilmedi; o hâlde tamamen güvenlidir.\" Hangi safsata vardır?", "**Bilgisizliğe başvurma** — zararın kanıtlanmamış olması güvenli olduğunu kanıtlamaz."),
   ("\"Ya bütün gün ders çalışırsın ya da hiç başarılı olamazsın.\" Hangi safsatadır?", "**Yanlış ikilem** — düzenli ve dengeli çalışma gibi başka seçenekler göz ardı edilmiştir.")],
  ["Safsata: görünüşte doğru, mantıkça hatalı akıl yürütme.", "Ad hominem, çoğunluğa/otoriteye başvurma, aceleci genelleme.", "Yanlış ikilem, korkuluk, kaygan zemin, kısır döngü."]),
]),
U("u4", "4. Ünite: Sembolik Mantık", "Unit 4: Symbolic Logic", [
O("k1", "4.1", "Sembolik mantığın doğuşu ve önermeler mantığının sembolleri", "Rise of symbolic logic and propositional connectives", r"""
# Klasik Mantıktan Sembolik Mantığa
- **Leibniz:** Evrensel sembolik dil (*characteristica universalis*) ve hesap gibi düşünme fikri.
- **Boole** (1847): Mantığı **cebirsel** işlemlerle ifade etti → bilgisayarların temeli.
- **Frege** ve **Russell–Whitehead** (*Principia Mathematica*): Modern sembolik mantık.
- Neden gerekli? Doğal dilin **belirsizliğini** gidermek, uzun akıl yürütmeleri **hesaplanabilir** kılmak.

# Önerme Değişkenleri ve Bağlaçlar
Basit önermeler $p, q, r$ ile gösterilir. **Doğru = 1 (D)**, **yanlış = 0 (Y)**.

| Bağlaç | Sembol | Okunuşu | Doğru olduğu durum |
|---|---|---|---|
| **Değil (olumsuzlama)** | $\neg p$ (ya da $p'$) | p değil | $p$ yanlışken |
| **Ve (birleşme)** | $p \land q$ | p ve q | **İkisi de doğruyken** |
| **Veya (ayrılma)** | $p \lor q$ | p veya q | **En az biri doğruyken** |
| **Ya da (dışlayan)** | $p \veebar q$ | ya p ya q | **Yalnızca biri doğruyken** |
| **İse (koşul)** | $p \rightarrow q$ | p ise q | $p$ **doğru**, $q$ **yanlış** olmadıkça hep doğru |
| **Ancak ve ancak** | $p \leftrightarrow q$ | p ancak ve ancak q | **Değerler aynıyken** |

**Çeviri örneği:** *"Yağmur yağarsa maç ertelenir"* → $p \rightarrow q$; *"Ali ve Ayşe geldi"* → $p \land q$.
""",
  [(r"$p$: “Hava güneşli” (D), $q$: “Pikniğe gidiyoruz” (Y) ise $p \rightarrow q$ ve $p \lor q$ önermelerinin doğruluk değeri nedir?", r"$p \rightarrow q$: **Yanlış** (D → Y tek yanlış durum). $p \lor q$: **Doğru** (en az biri doğru)."),
   ("\"Ödevini bitirmezsen dışarı çıkamazsın\" cümlesini sembolleştiriniz.", r"$p$: ödevini bitirmek, $q$: dışarı çıkmak → $\neg p \rightarrow \neg q$.")],
  ["Boole, Frege, Russell: sembolik mantığın kurucuları.", "∧ ikisi doğruysa, ∨ biri doğruysa doğru.", "→ yalnızca D → Y durumunda yanlış; ↔ değerler aynıysa doğru."]),
O("k2", "4.2", "Doğruluk tabloları; totoloji, çelişme ve tutarlılık", "Truth tables; tautology, contradiction and consistency", r"""
# Doğruluk Tablosu
$n$ değişken için $2^n$ satır yazılır.

| $p$ | $q$ | $\neg p$ | $p \land q$ | $p \lor q$ | $p \rightarrow q$ | $p \leftrightarrow q$ |
|---|---|---|---|---|---|---|
| D | D | Y | D | D | D | D |
| D | Y | Y | Y | D | **Y** | Y |
| Y | D | D | Y | D | D | Y |
| Y | Y | D | Y | Y | D | D |

# Bileşik Önermelerin Türleri
| Tür | Tanım | Örnek |
|---|---|---|
| **Totoloji** | Her satırda **doğru** | $p \lor \neg p$ |
| **Çelişme** | Her satırda **yanlış** | $p \land \neg p$ |
| **Olumsal (belirsiz)** | Bazen doğru bazen yanlış | $p \rightarrow q$ |

# Önemli Eşdeğerlikler
- **De Morgan:** $\neg(p \land q) \equiv \neg p \lor \neg q$ · $\neg(p \lor q) \equiv \neg p \land \neg q$
- **Koşulun karşıt tersi:** $p \rightarrow q \equiv \neg q \rightarrow \neg p$
- **Koşulun açılımı:** $p \rightarrow q \equiv \neg p \lor q$
- **Çifte olumsuzlama:** $\neg\neg p \equiv p$
""",
  [(r"$(p \rightarrow q) \land p \rightarrow q$ önermesinin totoloji olup olmadığını gösteriniz.", r"Dört satırı inceleyelim: $(p\to q)\land p$ yalnızca $p=D, q=D$ satırında doğrudur ve o satırda $q$ de doğrudur; diğer satırlarda öncül yanlış olduğundan koşul doğrudur → her satır **D**, **totolojidir** (*modus ponens*)."),
   (r"$\neg(p \lor q)$ ifadesini De Morgan ile yazınız.", r"$\neg p \land \neg q$ — “p de değil q de değil”.")],
  ["n değişken → 2ⁿ satır.", "Totoloji hep D, çelişme hep Y, olumsal karışık.", "De Morgan ve p→q ≡ ¬q→¬p."]),
O("k3", "4.3", "Çıkarım kuralları ve niceleme mantığına giriş", "Rules of inference and introduction to predicate logic", r"""
# Temel Çıkarım Kuralları
| Kural | Biçim | Örnek |
|---|---|---|
| **Modus ponens** | $p \rightarrow q,\; p \;\therefore\; q$ | Yağmur yağarsa yer ıslanır; yağıyor → yer ıslak. |
| **Modus tollens** | $p \rightarrow q,\; \neg q \;\therefore\; \neg p$ | Yer ıslak değil → yağmur yağmıyor. |
| **Koşullu kıyas (zincir)** | $p\to q,\; q \to r \;\therefore\; p \to r$ | Çalışırsam geçerim; geçersem sevinirim → çalışırsam sevinirim. |
| **Ayırıcı kıyas** | $p \lor q,\; \neg p \;\therefore\; q$ | Ya kütüphanede ya evde; kütüphanede değil → evde. |

# Geçersiz Biçimler (yaygın hatalar)
- **Sonucu doğrulama:** $p \rightarrow q,\; q \;\therefore\; p$ ✘ (*Yer ıslak → yağmur yağmış olmalı* — hortum da olabilir.)
- **Öncülü reddetme:** $p \rightarrow q,\; \neg p \;\therefore\; \neg q$ ✘

# Niceleme (Yüklemler) Mantığı
- **Tümel niceleyici:** $\forall x$ — "her $x$ için"
- **Tikel (varlık) niceleyici:** $\exists x$ — "en az bir $x$ vardır ki"
- *Bütün insanlar ölümlüdür:* $\forall x\,(İx \rightarrow Öx)$ · *Bazı öğrenciler sporcudur:* $\exists x\,(Öx \land Sx)$
- **Olumsuzlama:** $\neg \forall x\,P(x) \equiv \exists x\,\neg P(x)$ ("hepsi değil" = "bazısı değil")
""",
  [("\"Sınava çalışırsam geçerim. Sınavı geçemedim.\" Hangi sonuç geçerli biçimde çıkar?", r"**Modus tollens:** $p \rightarrow q,\; \neg q \;\therefore\; \neg p$ → *Sınava çalışmadım.*"),
   ("\"Bütün kuşlar uçar\" önermesinin olumsuzunu niceleyicilerle yazınız.", r"$\neg \forall x\,(Kx \rightarrow Ux) \equiv \exists x\,(Kx \land \neg Ux)$ → *Uçmayan en az bir kuş vardır.*")],
  ["Modus ponens ve modus tollens geçerli; sonucu doğrulama ve öncülü reddetme geçersiz.", "∀ tümel, ∃ tikel niceleyici.", "¬∀ ≡ ∃¬."]),
]),
]

write("fel-12.js", "12/felsefe", "12. Sınıf Felsefe (Mantık) — konu anlatım notları",
      "MEB Mantık öğretim programı (4 ünite): mantığa giriş, klasik mantık, mantık ve dil, sembolik mantık.",
      units, "1.34.0'da eklendi: 12. sınıf felsefe grubu dersi olarak Mantık; AYT Felsefe Grubu mantık sorularına hazırlık.")
