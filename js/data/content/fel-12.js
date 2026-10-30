/* =========================================================
   12. Sınıf Felsefe (Mantık) — konu anlatım notları
   Kaynak: MEB Mantık öğretim programı (4 ünite): mantığa giriş, klasik mantık, mantık ve dil, sembolik mantık.
   1.34.0'da eklendi: 12. sınıf felsefe grubu dersi olarak Mantık; AYT Felsefe Grubu mantık sorularına hazırlık.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["12/felsefe"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Ünite: Mantığa Giriş",
   "en": "Unit 1: Introduction to Logic"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Mantığın tanımı, konusu ve önemi",
     "en": "Definition, subject and importance of logic"
    },
    "content": {
     "anlatim": "# Mantık Nedir?\n\n**Mantık**, doğru düşünmenin **kurallarını** ve **ilkelerini** inceleyen disiplindir. Sorusu şudur: *Bir sonuç, öncüllerden **geçerli** biçimde çıkıyor mu?*\n\n- Mantık düşüncenin **içeriğiyle** değil **biçimiyle (formuyla)** ilgilenir.\n- Kelime kökü: Yunanca **logos** (söz, akıl); Arapça **nutk** (konuşma).\n- **Aristoteles** mantığı bilimlerin **aracı (organon)** sayar; mantığı sistemleştiren ilk düşünürdür.\n- İslam dünyasında **Fârâbî** \"ikinci öğretmen\" (*Muallim-i Sânî*) olarak anılır; **İbn Sînâ** mantığı geliştirir.\n\n# Doğruluk × Geçerlilik\n\n| Kavram | Neye aittir? | Örnek |\n|---|---|---|\n| **Doğruluk** | **Önermeye** (bilgiyle olgunun uyuşması) | \"Su 100 °C'de kaynar.\" |\n| **Geçerlilik** | **Akıl yürütmeye** (sonucun öncüllerden zorunlu çıkması) | Tüm A'lar B'dir; C bir A'dır → C bir B'dir. |\n\n- Öncülleri **yanlış** olan bir akıl yürütme **geçerli** olabilir: *Bütün kuşlar memelidir; penguen kuştur → penguen memelidir.* (biçim geçerli, sonuç yanlış)\n- **Tutarlılık:** Önermelerin **birbiriyle çelişmemesi**.\n\n# Mantığın Önemi\n\nEleştirel düşünme, bilimsel yöntem, hukukta delil değerlendirme, bilgisayar bilimi (**Boole cebiri**, devre tasarımı, yapay zekâ) mantığa dayanır.",
     "ornekler": [
      {
       "soru": "\"Bütün balıklar uçar. Hamsi bir balıktır. O hâlde hamsi uçar.\" akıl yürütmesini doğruluk ve geçerlilik açısından değerlendiriniz.",
       "cozum": "Biçim **geçerlidir** (sonuç öncüllerden zorunlu çıkıyor). Ancak birinci öncül **yanlış** olduğu için sonuç da yanlıştır. Akıl yürütme geçerli fakat **sağlam (doğru öncüllü) değildir**."
      }
     ],
     "ozet": [
      "Mantık: doğru düşünmenin biçimsel kuralları.",
      "Doğruluk önermeye, geçerlilik akıl yürütmeye aittir.",
      "Aristoteles: mantık bilimlerin aracı (organon)."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Düşünme ilkeleri (akıl ilkeleri)",
     "en": "Laws of thought"
    },
    "content": {
     "anlatim": "# Dört Temel Düşünme İlkesi\n\n| İlke | Formül | Açıklama |\n|---|---|---|\n| **Özdeşlik** | $A = A$ | Bir şey kendisiyle aynıdır; düşünme süresince anlamı değişmez. |\n| **Çelişmezlik** | $A$ hem $B$ hem $\\neg B$ olamaz | Bir şey aynı anda ve aynı bakımdan hem kendisi hem değilini taşıyamaz. |\n| **Üçüncü hâlin olanaksızlığı** | Ya $A$ ya $\\neg A$ | Bir önerme ya doğru ya yanlıştır; üçüncü bir durum yoktur. |\n| **Yeter-sebep** | Her şeyin bir nedeni vardır | Varlığın/bilginin yeterli bir gerekçesi bulunur (**Leibniz**). |\n\n# Örneklerle\n\n- *\"Bu kalem hem kırmızı hem kırmızı değil\"* → **çelişmezlik** ilkesine aykırı.\n- *\"Ali ya öğrencidir ya öğrenci değildir\"* → **üçüncü hâlin olanaksızlığı**.\n- Kelimeyi tartışmanın ortasında **farklı anlamda** kullanmak (*\"yüz\"*: surat / sayı) → **özdeşlik** ilkesinin ihlali.\n\n> Çok değerli mantıklar (bulanık mantık — **Zadeh**) \"üçüncü hâlin olanaksızlığı\" ilkesini sorgular; klasik mantık iki değerlidir (doğru/yanlış).",
     "ornekler": [
      {
       "soru": "\"Sınavı geçtim de geçmedim de\" diyen biri hangi düşünme ilkesini ihlal eder?",
       "cozum": "**Çelişmezlik ilkesi** — aynı anda aynı bakımdan hem geçmiş hem geçmemiş olunamaz."
      },
      {
       "soru": "Bulanık mantığın \"suyun sıcaklığı 0,7 derecesinde sıcaktır\" gibi ifadeleri hangi klasik ilkeyle çatışır?",
       "cozum": "**Üçüncü hâlin olanaksızlığı** — klasik mantıkta önerme ya doğru (1) ya yanlış (0) iken bulanık mantık ara değerlere izin verir."
      }
     ],
     "ozet": [
      "Özdeşlik A=A; çelişmezlik; üçüncü hâlin olanaksızlığı; yeter-sebep.",
      "Yeter-sebep ilkesi Leibniz'e aittir.",
      "Bulanık mantık iki değerliliği sorgular."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Ünite: Klasik Mantık",
   "en": "Unit 2: Classical Logic"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Kavram, terim ve kavramlar arası ilişkiler",
     "en": "Concepts, terms and relations between concepts"
    },
    "content": {
     "anlatim": "# Kavram ve Terim\n\n- **Kavram:** Bir nesnenin zihindeki **genel tasarımı** (düşünce).\n- **Terim:** Kavramın **dildeki** ifadesi (kelime).\n- **İçlem:** Kavramın **özellikleri** toplamı. **Kaplam:** Kavramın **kapsadığı varlıklar** toplamı.\n- İçlem artarsa kaplam **azalır** (ters orantı): *canlı → hayvan → memeli → kedi*.\n\n# Kavram Türleri\n\n| Tür | Örnek |\n|---|---|\n| **Tümel / tikel / tekil** | insan / bazı insanlar / Atatürk |\n| **Somut / soyut** | masa / adalet |\n| **Olumlu / olumsuz** | düzenli / düzensiz |\n| **Topluluk** | ordu, orkestra (parçalara tek tek yüklenemez) |\n\n# Kavramlar Arası İlişkiler\n\n| İlişki | Açıklama | Örnek |\n|---|---|---|\n| **Eşitlik** | Kaplamları aynı | üçgen – üç kenarlı kapalı şekil |\n| **Altlık-üstlük** | Biri diğerini kapsar | kuş – serçe |\n| **Kesişme (ayrımlılık)** | Kısmen ortak | öğrenci – sporcu |\n| **Karşıtlık** | Bir üçüncüsü olabilir | sıcak – soğuk (ılık) |\n| **Çelişiklik** | Bir üçüncüsü olamaz | canlı – cansız |",
     "ornekler": [
      {
       "soru": "\"Hayvan\" ve \"memeli\" kavramlarını içlem–kaplam bakımından karşılaştırınız.",
       "cozum": "\"Memeli\"nin **içlemi** daha geniştir (hayvanın tüm özellikleri + süt bezleri vb.), **kaplamı** daha dardır (yalnızca memeli hayvanlar)."
      },
      {
       "soru": "\"Siyah – beyaz\" karşıt mı, çelişik mi?",
       "cozum": "**Karşıt** — aralarında üçüncü bir renk (gri, kırmızı) olabilir. \"Siyah – siyah olmayan\" ise çelişiktir."
      }
     ],
     "ozet": [
      "Kavram zihinde, terim dilde.",
      "İçlem artınca kaplam azalır.",
      "Karşıtlarda üçüncü olur, çelişiklerde olmaz."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Tanım ve tanım kuralları; beş tümel",
     "en": "Definition and its rules; the five predicables"
    },
    "content": {
     "anlatim": "# Beş Tümel (Porphyrios)\n\n| Tümel | Açıklama | \"İnsan\" için örnek |\n|---|---|---|\n| **Cins** | Türleri kapsayan üst kavram | canlı/hayvan |\n| **Tür** | Cinsin altındaki sınıf | insan |\n| **Ayrım (fasıl)** | Türü cinsten ayıran özsel nitelik | akıl sahibi olmak |\n| **Hassa** | Türe özgü ama özsel olmayan nitelik | gülme yeteneği |\n| **İlinek (araz)** | Bulunup bulunmaması özü değiştirmeyen | uzun boylu olmak |\n\n# Tanım Türleri\n\n- **Gerçek (özsel) tanım:** **yakın cins + ayrım** → *İnsan, akıl sahibi bir hayvandır.*\n- **Eksik tanım:** cins + hassa → *İnsan gülen bir hayvandır.*\n- **Betimleme / sözcüksel / işlemsel** tanımlar bilimde ve günlük dilde kullanılır.\n\n# Tanımın Kuralları\n\n1. **Kapsayıcı ve dışlayıcı** olmalı (ne geniş ne dar): ~~*İnsan iki ayaklı canlıdır*~~ (kuşlar da girer).\n2. **Kısır döngü** olmamalı: ~~*Güneş, güneş ışığı veren yıldızdır*~~.\n3. **Olumsuz** olmamalı (gerekmedikçe): ~~*Kare daire olmayan şekildir*~~.\n4. **Mecaz ve belirsiz** ifade içermemeli: ~~*Kitap insanın en yakın dostudur*~~.\n5. **Özsel** nitelikleri vermeli.",
     "ornekler": [
      {
       "soru": "\"Üçgen, üç kenarlı kapalı bir şekildir\" tanımında cins ve ayrım nedir?",
       "cozum": "**Cins:** kapalı şekil (çokgen) · **Ayrım:** üç kenarlı olmak. Yakın cins + ayrım içerdiği için gerçek (özsel) tanımdır."
      },
      {
       "soru": "\"Kuş, uçabilen canlıdır\" tanımındaki hata nedir?",
       "cozum": "Tanım hem **geniş** (yarasa, böcek de uçar) hem **dar** (penguen, devekuşu uçamaz) — kapsayıcı ve dışlayıcı değildir."
      }
     ],
     "ozet": [
      "Beş tümel: cins, tür, ayrım, hassa, ilinek.",
      "Gerçek tanım = yakın cins + ayrım.",
      "Tanım ne geniş ne dar; döngüsüz, olumsuz ve mecazsız olmalı."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Önerme türleri ve karşı olma ilişkileri (mantık karesi)",
     "en": "Categorical propositions and the square of opposition"
    },
    "content": {
     "anlatim": "# Klasik (Kategorik) Önerme Türleri\n\n| Sembol | Tür | Kalıp | Örnek |\n|---|---|---|---|\n| **A** | Tümel olumlu | Bütün S'ler P'dir | Bütün metaller iletkendir. |\n| **E** | Tümel olumsuz | Hiçbir S P değildir | Hiçbir kuş memeli değildir. |\n| **I** | Tikel olumlu | Bazı S'ler P'dir | Bazı öğrenciler sporcudur. |\n| **O** | Tikel olumsuz | Bazı S'ler P değildir | Bazı bitkiler çiçekli değildir. |\n\n**Terimlerin kaplamı (dağıtılmış olma):** A'da yalnız **özne**, E'de **ikisi**, I'de **hiçbiri**, O'da yalnız **yüklem** dağıtılmıştır.\n\n# Mantık Karesi\n\n| İlişki | Önermeler | Kural |\n|---|---|---|\n| **Çelişiklik** | A–O, E–I | Biri doğruysa öteki **yanlış**, biri yanlışsa öteki **doğru** |\n| **Karşıtlık** | A–E | İkisi birden **doğru olamaz** (ikisi yanlış olabilir) |\n| **Alt karşıtlık** | I–O | İkisi birden **yanlış olamaz** (ikisi doğru olabilir) |\n| **Altık (alt-üst)** | A–I, E–O | Tümel doğruysa tikel **doğru**; tikel yanlışsa tümel **yanlış** |",
     "ornekler": [
      {
       "soru": "\"Bütün öğrenciler çalışkandır\" (A) önermesi yanlışsa \"Bazı öğrenciler çalışkan değildir\" (O) önermesi nedir?",
       "cozum": "A ile O **çelişiktir** → A yanlışsa O kesinlikle **doğrudur**."
      },
      {
       "soru": "\"Bazı kediler siyahtır\" (I) doğruysa \"Hiçbir kedi siyah değildir\" (E) için ne söylenir?",
       "cozum": "I ile E **çelişiktir** → E **yanlıştır**."
      }
     ],
     "ozet": [
      "A tümel olumlu, E tümel olumsuz, I tikel olumlu, O tikel olumsuz.",
      "Çelişikler (A–O, E–I) daima zıt değer alır.",
      "Karşıtlar birlikte doğru olamaz; alt karşıtlar birlikte yanlış olamaz."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Çıkarım türleri: tümdengelim, tümevarım, analoji",
     "en": "Types of inference: deduction, induction, analogy"
    },
    "content": {
     "anlatim": "# Akıl Yürütme Türleri\n\n| Tür | Yön | Sonucun kesinliği | Örnek |\n|---|---|---|---|\n| **Tümdengelim (dedüksiyon)** | Genelden özele | **Zorunlu** (öncüller doğruysa) | Bütün insanlar ölümlüdür; Sokrates insandır → Sokrates ölümlüdür. |\n| **Tümevarım (endüksiyon)** | Özelden genele | **Olası** | Gözlenen bütün kuğular beyaz → bütün kuğular beyazdır (siyah kuğu bulununca çürüdü). |\n| **Analoji (benzetme)** | Özelden özele | **Olası** | Mars Dünya'ya benzer; Dünya'da yaşam var → Mars'ta yaşam olabilir. |\n\n# Tümevarım Türleri\n\n- **Tam tümevarım:** Bütün örnekler tek tek incelenir → kesin sonuç (*sınıftaki 30 öğrencinin hepsi 17 yaşında*).\n- **Eksik tümevarım:** Bazı örneklerden genelleme → olası sonuç; bilimin çoğu buna dayanır.\n- **Hume**'un tümevarım problemi: Geçmiş deneyim geleceğin aynı olacağını garanti etmez.\n\n# Dolaysız Çıkarımlar\n\nTek öncülden sonuç: **döndürme** (Hiçbir S P değildir → Hiçbir P S değildir), **karşı olma** (mantık karesi).",
     "ornekler": [
      {
       "soru": "\"Şimdiye kadar incelenen tüm metaller ısıtılınca genleşti; o hâlde bütün metaller ısıtılınca genleşir.\" Bu hangi akıl yürütmedir?",
       "cozum": "**Eksik tümevarım** — sınırlı sayıda gözlemden genel bir sonuca varılıyor; sonuç **olasıdır**."
      },
      {
       "soru": "Tümdengelimde sonucun zorunlu olmasının nedeni nedir?",
       "cozum": "Sonuç, öncüllerin **içinde zaten bulunan** bilgiyi açığa çıkarır; öncüller doğru ve biçim geçerliyse sonuç **yanlış olamaz**."
      }
     ],
     "ozet": [
      "Tümdengelim genelden özele, zorunlu.",
      "Tümevarım özelden genele, olası (Hume problemi).",
      "Analoji özelden özele, olası."
     ]
    }
   },
   {
    "id": "k5",
    "code": "2.5",
    "title": {
     "tr": "Kıyas (tasım): yapısı, şekilleri ve geçerlilik kuralları",
     "en": "The syllogism: structure, figures and rules of validity"
    },
    "content": {
     "anlatim": "# Kıyasın Yapısı\n\nİki öncülden bir sonuç çıkaran tümdengelimdir; **üç terim** içerir:\n- **Büyük terim (P):** Sonucun **yüklemi**; büyük öncülde geçer.\n- **Küçük terim (S):** Sonucun **öznesi**; küçük öncülde geçer.\n- **Orta terim (M):** **İki öncülde** geçer, **sonuçta geçmez**.\n\n*Bütün memeliler omurgalıdır. (M–P) · Bütün kediler memelidir. (S–M) · ∴ Bütün kediler omurgalıdır. (S–P)*\n\n# Geçerlilik Kuralları\n\n1. **Üç terim** olmalı (dört terim yanılgısı: aynı kelime iki anlamda).\n2. **Orta terim** en az bir öncülde **dağıtılmış (tümel)** olmalı.\n3. Öncülde dağıtılmayan terim sonuçta dağıtılamaz.\n4. **İki olumsuz** öncülden sonuç çıkmaz.\n5. **İki tikel** öncülden sonuç çıkmaz.\n6. Öncüllerden biri olumsuzsa sonuç **olumsuz**, tikelse sonuç **tikel** olur.\n\n# Şekiller (orta terimin yerine göre)\n\n| Şekil | Büyük öncül | Küçük öncül |\n|---|---|---|\n| 1. | M – P | S – M |\n| 2. | P – M | S – M |\n| 3. | M – P | M – S |\n| 4. | P – M | M – S |",
     "ornekler": [
      {
       "soru": "\"Bazı öğrenciler sporcudur. Bazı sporcular yüzücüdür. O hâlde bazı öğrenciler yüzücüdür.\" kıyası geçerli midir?",
       "cozum": "**Geçersizdir** — iki öncül de **tikel** (kural 5); ayrıca orta terim \"sporcu\" hiçbir öncülde dağıtılmamıştır (kural 2)."
      },
      {
       "soru": "\"Hiçbir sürüngen tüylü değildir. Bütün yılanlar sürüngendir.\" Sonuç nedir?",
       "cozum": "*Hiçbir yılan tüylü değildir.* (1. şekil, öncüllerden biri olumsuz → sonuç olumsuz; E–A–E, **Celarent**)"
      }
     ],
     "ozet": [
      "Orta terim iki öncülde var, sonuçta yok.",
      "İki olumsuz ya da iki tikel öncülden sonuç çıkmaz.",
      "Orta terim en az bir kez dağıtılmış olmalı."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Ünite: Mantık ve Dil",
   "en": "Unit 3: Logic and Language"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Dilin işlevleri ve tanım türleri",
     "en": "Functions of language and kinds of definition"
    },
    "content": {
     "anlatim": "# Dilin Temel İşlevleri\n\n| İşlev | Amaç | Örnek | Doğru/yanlış olur mu? |\n|---|---|---|---|\n| **Bilgi verme (betimleyici)** | Olguyu aktarmak | *Ankara Türkiye'nin başkentidir.* | **Evet** |\n| **Duygu anlatma (ifade edici)** | Duygu dile getirmek | *Ne güzel bir gün!* | Hayır |\n| **Yönlendirme (emredici)** | Davranış yaptırmak | *Kapıyı kapat.* | Hayır |\n| **Törensel** | Toplumsal kalıp | *Geçmiş olsun.* | Hayır |\n| **Edimsel (performatif)** | Söyleyerek yapmak | *Sizi karı koca ilan ediyorum.* | Hayır |\n\nMantık yalnızca **bilgi veren** cümlelerle (önermelerle) ilgilenir; çünkü yalnızca onlar **doğru ya da yanlış** olabilir.\n\n# Anlam ve Göndergenin Ayrımı\n\n- **Frege:** *Sabah yıldızı* ve *akşam yıldızı* aynı nesneyi (Venüs) **gösterir** ama **anlamları** farklıdır.\n- **Eş anlamlılık, çok anlamlılık, mecaz** mantıksal belirsizliğe yol açabilir.\n\n# Tanım Türleri (dilsel)\n\n- **Sözlük tanımı:** Kelimenin yaygın kullanımı.\n- **Şart koşulan (önerilen) tanım:** Yeni terim için anlam belirleme (*\"Bu çalışmada 'genç' 15–24 yaş demektir\"*).\n- **Kesinleştirici tanım:** Belirsizliği gidermek (hukukta \"yetişkin\" = 18 yaş).\n- **İkna edici tanım:** Duygusal etki amaçlı; mantıkça kusurlu.",
     "ornekler": [
      {
       "soru": "\"Lütfen sessiz olun!\" cümlesi neden mantığın konusu olan bir önerme değildir?",
       "cozum": "Bu bir **yönlendirme (emir)** cümlesidir; **doğru ya da yanlış** olarak değerlendirilemez. Önerme yalnızca bilgi veren cümledir."
      },
      {
       "soru": "Frege'nin sabah yıldızı–akşam yıldızı örneği neyi gösterir?",
       "cozum": "**Anlam (Sinn)** ile **gönderge (Bedeutung)** arasındaki farkı: iki ifade aynı nesneyi gösterir ama farklı anlamlar taşır."
      }
     ],
     "ozet": [
      "Mantık yalnızca bilgi veren (doğruluk değeri alan) cümlelerle ilgilenir.",
      "Dilin işlevleri: bilgi, duygu, yönlendirme, törensel, edimsel.",
      "Frege: anlam ≠ gönderge."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Safsatalar (mantık yanılgıları)",
     "en": "Fallacies"
    },
    "content": {
     "anlatim": "# Safsata Nedir?\n\nGörünüşte doğru ama **mantıkça hatalı** akıl yürütme. Bilerek yapılırsa **safsata**, bilmeden yapılırsa **paralojizm** denir.\n\n| Safsata | Hata | Örnek |\n|---|---|---|\n| **Kişiye saldırı (ad hominem)** | Görüş yerine kişiyi eleştirmek | *Onun ekonomi görüşü yanlış, çünkü kendisi borçlu.* |\n| **Otoriteye başvurma** | Konusunda uzman olmayan ünlüye dayanmak | *Ünlü futbolcu bu vitamini öneriyor, demek ki iyi.* |\n| **Çoğunluğa başvurma** | Çok kişinin inanmasını kanıt saymak | *Herkes böyle düşünüyor, o hâlde doğru.* |\n| **Korkutma (sopaya başvurma)** | Tehditle kabul ettirmek | *Bunu kabul etmezsen sınıfta kalırsın.* |\n| **Acındırma** | Merhamet duygusunu kullanmak | *Notumu yükseltin, ailem çok üzülür.* |\n| **Bilgisizliğe başvurma** | Yanlışlanmadığı için doğru saymak | *Uzaylıların olmadığı kanıtlanmadı, demek ki varlar.* |\n| **Aceleci genelleme** | Az örnekten genel sonuç | *İki İzmirliyi tanıdım, hepsi kibar.* |\n| **Kısır döngü** | Kanıtlanacak şeyi öncülde kabul etmek | *Doğru söylüyor çünkü yalan söylemez.* |\n| **Yanlış ikilem** | Yalnızca iki seçenek varmış gibi sunmak | *Ya benimlesin ya bana karşı.* |\n| **Korkuluk (saman adam)** | Karşı görüşü çarpıtıp çürütmek | *Ödev azalsın diyorlar; demek okul olmasın istiyorlar.* |\n| **Kaygan zemin** | Zincirleme felaket öngörmek | *Telefon alırsan derslerin düşer, üniversiteyi kazanamazsın, işsiz kalırsın.* |\n| **Ondan sonra, öyleyse ondan dolayı** | Zaman sırasını nedensellik sanmak | *Kırmızı kazakla sınava girdim, yüksek aldım; kazak şans getiriyor.* |",
     "ornekler": [
      {
       "soru": "\"Bu ilacın zararlı olduğu hiçbir araştırmada gösterilmedi; o hâlde tamamen güvenlidir.\" Hangi safsata vardır?",
       "cozum": "**Bilgisizliğe başvurma** — zararın kanıtlanmamış olması güvenli olduğunu kanıtlamaz."
      },
      {
       "soru": "\"Ya bütün gün ders çalışırsın ya da hiç başarılı olamazsın.\" Hangi safsatadır?",
       "cozum": "**Yanlış ikilem** — düzenli ve dengeli çalışma gibi başka seçenekler göz ardı edilmiştir."
      }
     ],
     "ozet": [
      "Safsata: görünüşte doğru, mantıkça hatalı akıl yürütme.",
      "Ad hominem, çoğunluğa/otoriteye başvurma, aceleci genelleme.",
      "Yanlış ikilem, korkuluk, kaygan zemin, kısır döngü."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Ünite: Sembolik Mantık",
   "en": "Unit 4: Symbolic Logic"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Sembolik mantığın doğuşu ve önermeler mantığının sembolleri",
     "en": "Rise of symbolic logic and propositional connectives"
    },
    "content": {
     "anlatim": "# Klasik Mantıktan Sembolik Mantığa\n\n- **Leibniz:** Evrensel sembolik dil (*characteristica universalis*) ve hesap gibi düşünme fikri.\n- **Boole** (1847): Mantığı **cebirsel** işlemlerle ifade etti → bilgisayarların temeli.\n- **Frege** ve **Russell–Whitehead** (*Principia Mathematica*): Modern sembolik mantık.\n- Neden gerekli? Doğal dilin **belirsizliğini** gidermek, uzun akıl yürütmeleri **hesaplanabilir** kılmak.\n\n# Önerme Değişkenleri ve Bağlaçlar\n\nBasit önermeler $p, q, r$ ile gösterilir. **Doğru = 1 (D)**, **yanlış = 0 (Y)**.\n\n| Bağlaç | Sembol | Okunuşu | Doğru olduğu durum |\n|---|---|---|---|\n| **Değil (olumsuzlama)** | $\\neg p$ (ya da $p'$) | p değil | $p$ yanlışken |\n| **Ve (birleşme)** | $p \\land q$ | p ve q | **İkisi de doğruyken** |\n| **Veya (ayrılma)** | $p \\lor q$ | p veya q | **En az biri doğruyken** |\n| **Ya da (dışlayan)** | $p \\veebar q$ | ya p ya q | **Yalnızca biri doğruyken** |\n| **İse (koşul)** | $p \\rightarrow q$ | p ise q | $p$ **doğru**, $q$ **yanlış** olmadıkça hep doğru |\n| **Ancak ve ancak** | $p \\leftrightarrow q$ | p ancak ve ancak q | **Değerler aynıyken** |\n\n**Çeviri örneği:** *\"Yağmur yağarsa maç ertelenir\"* → $p \\rightarrow q$; *\"Ali ve Ayşe geldi\"* → $p \\land q$.",
     "ornekler": [
      {
       "soru": "$p$: “Hava güneşli” (D), $q$: “Pikniğe gidiyoruz” (Y) ise $p \\rightarrow q$ ve $p \\lor q$ önermelerinin doğruluk değeri nedir?",
       "cozum": "$p \\rightarrow q$: **Yanlış** (D → Y tek yanlış durum). $p \\lor q$: **Doğru** (en az biri doğru)."
      },
      {
       "soru": "\"Ödevini bitirmezsen dışarı çıkamazsın\" cümlesini sembolleştiriniz.",
       "cozum": "$p$: ödevini bitirmek, $q$: dışarı çıkmak → $\\neg p \\rightarrow \\neg q$."
      }
     ],
     "ozet": [
      "Boole, Frege, Russell: sembolik mantığın kurucuları.",
      "∧ ikisi doğruysa, ∨ biri doğruysa doğru.",
      "→ yalnızca D → Y durumunda yanlış; ↔ değerler aynıysa doğru."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Doğruluk tabloları; totoloji, çelişme ve tutarlılık",
     "en": "Truth tables; tautology, contradiction and consistency"
    },
    "content": {
     "anlatim": "# Doğruluk Tablosu\n\n$n$ değişken için $2^n$ satır yazılır.\n\n| $p$ | $q$ | $\\neg p$ | $p \\land q$ | $p \\lor q$ | $p \\rightarrow q$ | $p \\leftrightarrow q$ |\n|---|---|---|---|---|---|---|\n| D | D | Y | D | D | D | D |\n| D | Y | Y | Y | D | **Y** | Y |\n| Y | D | D | Y | D | D | Y |\n| Y | Y | D | Y | Y | D | D |\n\n# Bileşik Önermelerin Türleri\n\n| Tür | Tanım | Örnek |\n|---|---|---|\n| **Totoloji** | Her satırda **doğru** | $p \\lor \\neg p$ |\n| **Çelişme** | Her satırda **yanlış** | $p \\land \\neg p$ |\n| **Olumsal (belirsiz)** | Bazen doğru bazen yanlış | $p \\rightarrow q$ |\n\n# Önemli Eşdeğerlikler\n\n- **De Morgan:** $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$ · $\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$\n- **Koşulun karşıt tersi:** $p \\rightarrow q \\equiv \\neg q \\rightarrow \\neg p$\n- **Koşulun açılımı:** $p \\rightarrow q \\equiv \\neg p \\lor q$\n- **Çifte olumsuzlama:** $\\neg\\neg p \\equiv p$",
     "ornekler": [
      {
       "soru": "$(p \\rightarrow q) \\land p \\rightarrow q$ önermesinin totoloji olup olmadığını gösteriniz.",
       "cozum": "Dört satırı inceleyelim: $(p\\to q)\\land p$ yalnızca $p=D, q=D$ satırında doğrudur ve o satırda $q$ de doğrudur; diğer satırlarda öncül yanlış olduğundan koşul doğrudur → her satır **D**, **totolojidir** (*modus ponens*)."
      },
      {
       "soru": "$\\neg(p \\lor q)$ ifadesini De Morgan ile yazınız.",
       "cozum": "$\\neg p \\land \\neg q$ — “p de değil q de değil”."
      }
     ],
     "ozet": [
      "n değişken → 2ⁿ satır.",
      "Totoloji hep D, çelişme hep Y, olumsal karışık.",
      "De Morgan ve p→q ≡ ¬q→¬p."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Çıkarım kuralları ve niceleme mantığına giriş",
     "en": "Rules of inference and introduction to predicate logic"
    },
    "content": {
     "anlatim": "# Temel Çıkarım Kuralları\n\n| Kural | Biçim | Örnek |\n|---|---|---|\n| **Modus ponens** | $p \\rightarrow q,\\; p \\;\\therefore\\; q$ | Yağmur yağarsa yer ıslanır; yağıyor → yer ıslak. |\n| **Modus tollens** | $p \\rightarrow q,\\; \\neg q \\;\\therefore\\; \\neg p$ | Yer ıslak değil → yağmur yağmıyor. |\n| **Koşullu kıyas (zincir)** | $p\\to q,\\; q \\to r \\;\\therefore\\; p \\to r$ | Çalışırsam geçerim; geçersem sevinirim → çalışırsam sevinirim. |\n| **Ayırıcı kıyas** | $p \\lor q,\\; \\neg p \\;\\therefore\\; q$ | Ya kütüphanede ya evde; kütüphanede değil → evde. |\n\n# Geçersiz Biçimler (yaygın hatalar)\n\n- **Sonucu doğrulama:** $p \\rightarrow q,\\; q \\;\\therefore\\; p$ ✘ (*Yer ıslak → yağmur yağmış olmalı* — hortum da olabilir.)\n- **Öncülü reddetme:** $p \\rightarrow q,\\; \\neg p \\;\\therefore\\; \\neg q$ ✘\n\n# Niceleme (Yüklemler) Mantığı\n\n- **Tümel niceleyici:** $\\forall x$ — \"her $x$ için\"\n- **Tikel (varlık) niceleyici:** $\\exists x$ — \"en az bir $x$ vardır ki\"\n- *Bütün insanlar ölümlüdür:* $\\forall x\\,(İx \\rightarrow Öx)$ · *Bazı öğrenciler sporcudur:* $\\exists x\\,(Öx \\land Sx)$\n- **Olumsuzlama:** $\\neg \\forall x\\,P(x) \\equiv \\exists x\\,\\neg P(x)$ (\"hepsi değil\" = \"bazısı değil\")",
     "ornekler": [
      {
       "soru": "\"Sınava çalışırsam geçerim. Sınavı geçemedim.\" Hangi sonuç geçerli biçimde çıkar?",
       "cozum": "**Modus tollens:** $p \\rightarrow q,\\; \\neg q \\;\\therefore\\; \\neg p$ → *Sınava çalışmadım.*"
      },
      {
       "soru": "\"Bütün kuşlar uçar\" önermesinin olumsuzunu niceleyicilerle yazınız.",
       "cozum": "$\\neg \\forall x\\,(Kx \\rightarrow Ux) \\equiv \\exists x\\,(Kx \\land \\neg Ux)$ → *Uçmayan en az bir kuş vardır.*"
      }
     ],
     "ozet": [
      "Modus ponens ve modus tollens geçerli; sonucu doğrulama ve öncülü reddetme geçersiz.",
      "∀ tümel, ∃ tikel niceleyici.",
      "¬∀ ≡ ∃¬."
     ]
    }
   }
  ]
 }
];

/* KAMPUSAI ENRICHMENT 1.64 — generated by tools/apply-enrichment.mjs */
(function(){ const additions=[
  {
    "key": "12/felsefe",
    "unit": "u4",
    "unitName": "10. Tema: Manners",
    "lesson": {
      "id": "ek164-045",
      "code": "EK.12.045",
      "title": {
        "tr": "Geçerli çıkarım ile doğru öncül",
        "en": "Validity versus true premises"
      },
      "provenance": {
        "authorship": "original-kampusai-supplement",
        "officialOutcome": false,
        "programmeReference": "https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=338",
        "programmeEdition": "legacy-reference",
        "review": "editorial-schema-math-checked-not-independent-teacher-validation"
      },
      "content": {
        "anlatim": "## Geçerli çıkarım ile doğru öncül\n\nGeçerlilik öncüller doğruysa sonucun yanlış olamayacağı yapısal ilişkidir. Öncüllerin gerçekte doğruluğu ayrı araştırılır. Geçerli yapı ve doğru öncüller birlikte sağlam argümandır. P ise Q; Q; öyleyse P kalıbı sonucu onaylama hatasıdır: Q’nun başka nedeni olabilir. Karşı örnek geçersizliği göstermeye yeter; çok destekleyici örnek tek başına tümdengelimsel geçerlilik kanıtı değildir.\n\n### Kontrol ederek öğren\n\nYağmur varsa zemin ıslak. Zemin ıslak. Öyleyse yağmur var: geçerli mi?\n\n**Çözüm yolu:** Hayır; sulama da zemini ıslatabilir. Sonucu onaylama safsatasıdır.\n\n### Dikkat noktaları\n\n- Geçerlilik yapı özelliği.\n- Doğru sonuç yanlış çıkarımı kurtarmaz.\n- Karşı örnekle sına.\n\n> Bu, resmî yeni kazanım kodu değil, KampüsAI tarafından yazılmış ek öğrenme hedefidir.\n\n[Konu kapsamı için MEB programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=338)",
        "ornekler": [
          {
            "soru": "Yağmur varsa zemin ıslak. Zemin ıslak. Öyleyse yağmur var: geçerli mi?",
            "cozum": "Hayır; sulama da zemini ıslatabilir. Sonucu onaylama safsatasıdır."
          }
        ],
        "ozet": [
          "Geçerlilik yapı özelliği.",
          "Doğru sonuç yanlış çıkarımı kurtarmaz.",
          "Karşı örnekle sına."
        ]
      }
    }
  }
]; additions.forEach(({key,unit,unitName,lesson})=>{const units=App.data.content[key];let u=units.find(x=>x.id===unit);if(!u){u={id:unit,name:{tr:unitName,en:unitName},outcomes:[]};const at=units.findIndex(x=>/^u/.test(x.id)||(/^t/.test(x.id)&&Number(x.id.slice(1))>Number(unit.slice(1))));if(at<0)units.push(u);else units.splice(at,0,u);}u.outcomes.push(lesson);}); })();
