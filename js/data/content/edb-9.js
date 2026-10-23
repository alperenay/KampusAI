/* =========================================================
   9. Sınıf Türk Dili ve Edebiyatı — konu anlatım ve kazanım rehberi
   Kaynak: kullanıcının verdiği "9. Sınıf Türk Dili ve Edebiyatı Kapsamlı Konu Anlatım ve Kazanım Analiz Rehberi" (4 tema).
   Kazanım kodları tema.sıra biçimindedir. Örnek soruların bir kısmı ve bazı karşılaştırma tabloları kazanımı uygulamak için eklendi.
   Üretici: tools/gen9/ (bu dosyayı elle değil, üreticiden düzenleyin).

   Biçim (curriculum-data.js ile aynı):
     ünite   { id, name, outcomes: [...] }
     kazanım { id, code, title, content: { anlatim, ornekler, ozet } }
   ========================================================= */
App.data.content = App.data.content || {};
App.data.content["9/edebiyat"] = [
 {
  "id": "u1",
  "name": {
   "tr": "1. Tema: Sözün İnceliği",
   "en": "Theme 1: The Subtlety of Words"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "1.1",
    "title": {
     "tr": "Edebiyat ve güzel sanatlar — \"San'at\" (Faruk Nafiz Çamlıbel)",
     "en": "Literature and the fine arts — \"San'at\" (Faruk Nafiz Çamlıbel)"
    },
    "content": {
     "anlatim": "# Temaya Giriş\n\nBu tema; **estetik değer, yaratıcılık, hayal gücü ve imge** gibi temel kavramlar üzerinden edebiyatın dünyasına giriş yapar. Edebî eserlerde her sözün özenle seçildiğini ve seçilen sözlerin anlamı doğrudan etkilediğini fark etmek amaçlanır.\n\n**Temel kavramlar:** açık ve örtük ileti · günlük dil · söz varlığı · hayal gücü · imge · sembol · çağrışım · edebî söyleyiş\n\n# Okuma: \"San'at\" — Faruk Nafiz Çamlıbel\n\n- **Beş Hececiler** anlayışıyla yazılmış, **memleket edebiyatının manifestosu** sayılan bir şiirdir.\n- Şiirde iki sanat anlayışı karşılaştırılır:\n\n| \"Sen\" (Batı hayranı sanat anlayışı) | \"Biz\" (yerli ve millî sanat anlayışı) |\n|---|---|\n| Mabetlerdeki ince mozaikler | Sülüs yazılar, yeşil çiniler |\n| Batı müziği, bale | Zeybek oyunu, halkın acıklı nefesleri |\n| Yabancı şehirlerdeki heykeller | Anadolu, köylünün kıvrılmayan beli |\n\n- Şair yerli olanı üstün tutar; şiir **millî estetiğin ve yerli sanat anlayışının savunusudur**.\n- İncelenecekler: tür özellikleri, **ahenk**, **imge** ve anlam katmanları.\n\n# Güzel Sanatların Sınıflandırılması\n\nGüzel sanatlar kullanılan **malzemeye** ve hitap ettiği **duyu organına** göre üçe ayrılır:\n\n| Grup | Dallar | Özellik |\n|---|---|---|\n| **Plastik (görsel)** | Resim, mimari, heykel, hat, tezhip, ebru, fotoğrafçılık | Maddeye biçim verir, **göze** hitap eder |\n| **Fonetik (işitsel)** | **Edebiyat**, müzik | Malzemesi kelime ve sestir; **kulağa ve zihne** hitap eder |\n| **Ritmik (dramatik)** | Tiyatro, bale, dans, opera, sinema | **Hareket ve ritme** dayanır |\n\n> Edebiyat hiçbir maddi alete bağlı değildir; malzemesi **dil**dir ve bütünüyle zihinseldir.\n\n# Edebiyatın Diğer Disiplinlerle İlişkisi\n\nEdebiyat en çok **tarih, sosyoloji ve psikoloji** ile ilişkilidir:\n- **Tarih:** Tarihî olaylar romanda kurgulanırken tarihten yararlanılır.\n- **Psikoloji:** Kahramanların ruhsal tahlillerinde.\n- **Sosyoloji:** Toplumsal değişimlerin işlenmesinde.",
     "ornekler": [
      {
       "soru": "Edebiyat güzel sanatların hangi grubunda yer alır? Neden?",
       "cozum": "**Fonetik (işitsel) sanatlar.** Malzemesi kelime ve sestir; kulağa ve zihne hitap eder. Maddeye biçim vermediği için plastik, harekete dayanmadığı için ritmik sanatlar grubunda değildir."
      },
      {
       "soru": "Bir romancı, Kurtuluş Savaşı yıllarını anlatırken kahramanının iç çatışmalarını ayrıntılı biçimde çözümlüyor. Yazar hangi disiplinlerden yararlanmıştır?",
       "cozum": "Olayların arka planı için **tarih**ten, kahramanın iç dünyasını çözümlemek için **psikoloji**den yararlanmıştır. Savaşın toplumu nasıl değiştirdiği de işleniyorsa **sosyoloji** de devreye girer."
      }
     ],
     "ozet": [
      "Güzel sanatlar: **plastik** (göz), **fonetik** (kulak/zihin), **ritmik** (hareket).",
      "Edebiyatın malzemesi **dil**dir; fonetik sanatlardandır.",
      "\"San'at\": Beş Hececiler, memleket edebiyatı; \"Sen\" (Batı) ↔ \"Biz\" (yerli/millî).",
      "En yakın disiplinler: tarih, sosyoloji, psikoloji."
     ]
    }
   },
   {
    "id": "k2",
    "code": "1.2",
    "title": {
     "tr": "Söz sanatları, gerçeklik ve kurmaca",
     "en": "Figures of speech, reality and fiction"
    },
    "content": {
     "anlatim": "# Şiirde Söz Sanatları\n\nŞairler anlatımı zenginleştirmek, estetik haz uyandırmak ve **örtük iletileri** aktarmak için söz sanatlarından yararlanır.\n\n| Sanat | Tanım | Örnek / ipucu |\n|---|---|---|\n| **Teşbih (benzetme)** | Aralarında ilgi bulunan iki unsurdan zayıf olanın güçlü olana benzetilmesi | \"**Dağ gibi** bir zeybek\" |\n| **İstiare (eğretileme)** | Benzetmenin temel ögelerinden **yalnızca biriyle** yapılan sanat | Yalnız benzeyen → **kapalı**; yalnız benzetilen → **açık** istiare |\n| **Teşhis (kişileştirme)** | İnsan dışı varlıklara insan özellikleri verme | \"Ağaçlar **ağladı**\" |\n| **İntak (konuşturma)** | İnsan dışı varlıkları konuşturma | İntak varsa teşhis de vardır |\n| **Mübalağa (abartma)** | Bir durumu olduğundan çok/az gösterme | \"Bir ton ödev verdi\" |\n| **Tezat (zıtlık)** | Zıt kavramları bir arada kullanma | \"Gülerken ağlamak\" |\n| **Mecazımürsel (ad aktarması)** | Benzetme amacı gütmeden bir sözü başka bir söz yerine kullanma | \"**Bayrağım**\" diyerek Türk bayrağını kastetmek; \"Ankara açıklama yaptı\" |\n\n### Benzetmenin ögeleri\n\n1. **Benzeyen** (zayıf unsur) 2. **Kendisine benzetilen** (güçlü unsur) 3. **Benzetme yönü** 4. **Benzetme edatı** (gibi, kadar, sanki…)\n- Teşbihte en az benzeyen + benzetilen bulunur; **istiarede bunlardan yalnızca biri** vardır.\n\n# Gerçeklik ve Kurmaca\n\n| Öğretici metinler | Edebî (sanatsal) metinler |\n|---|---|\n| Dış dünyadaki gerçekliği **nesnel** biçimde aktarır | **Kurmacadır**; yazar gerçekliği kendi süzgecinden geçirir |\n| Dil **göndergesel** işlevdedir, amaç bilgi vermektir | Dil **şiirsel** işlevdedir, amaç estetik hazdır |\n| Örnek: makale, gezi yazısı, anı, biyografi | Örnek: şiir, hikâye, roman, tiyatro |",
     "ornekler": [
      {
       "soru": "\"Rüzgâr kapıyı çaldı, sabırsızdı.\" cümlesindeki söz sanatını belirleyin.",
       "cozum": "Rüzgâra insana özgü **kapı çalma** ve **sabırsızlık** özellikleri verilmiştir → **teşhis (kişileştirme)**. Konuşturma olmadığı için intak yoktur."
      },
      {
       "soru": "\"Aslanım, sınavı kazandın!\" sözünde hangi sanat vardır?",
       "cozum": "Benzeyen (sen/öğrenci) söylenmemiş, yalnızca **kendisine benzetilen (aslan)** kullanılmıştır → **açık istiare**."
      },
      {
       "soru": "\"Bütün sınıf seni bekliyor.\" cümlesinde \"sınıf\" sözcüğü hangi anlamda kullanılmıştır?",
       "cozum": "Sınıf (mekân) söylenip içindeki **öğrenciler** kastedilmiştir; benzetme amacı yoktur → **mecazımürsel (ad aktarması)**."
      }
     ],
     "ozet": [
      "Teşbih: benzeyen + benzetilen birlikte · istiare: yalnızca biri.",
      "Yalnız benzetilen varsa **açık**, yalnız benzeyen varsa **kapalı** istiare.",
      "İntak olan yerde teşhis de vardır.",
      "Mecazımürsel: benzetmesiz ad aktarması (parça-bütün, yer-insan vb.).",
      "Öğretici metin = nesnel gerçeklik; edebî metin = kurmaca, öznel."
     ]
    }
   },
   {
    "id": "k3",
    "code": "1.3",
    "title": {
     "tr": "Deneme — \"Picasso'nun Hatları\" (Rasim Özdenören)",
     "en": "The essay — \"Picasso's Lines\" (Rasim Özdenören)"
    },
    "content": {
     "anlatim": "# Okuma: \"Picasso'nun Hatları\" — Rasim Özdenören\n\n- Yazar, **Pablo Picasso**'nun İslami **hat sanatına** benzer resimler yapmasını ele alır.\n- Picasso'nun İslami bir niyetle hareket etmediğini; hat sanatını yalnızca kendi niyetini gerçekleştirmek için bir **\"malzeme\"** olarak kullandığını vurgular.\n- **Gelenek ve ruh ilişkisi:** Gelenekten yararlanmak basit bir şema veya malzeme aktarımı değildir; asıl önemli olan o malzemeyi var eden **\"ruh\"**u kavramaktır.\n- Kazanım: deneme türünü tanıma, **ana fikir ve yardımcı fikirleri** bulma, gelenek-sanat ilişkisini irdeleme.\n\n# Deneme Türünün Özellikleri\n\n- Yazar seçtiği herhangi bir konuda **kesin sonuçlara varmadan** kişisel görüşlerini özgürce aktarır.\n- Anlatım **içten, samimi**dir; yazar **kendi kendine konuşur gibi** yazar (sohbet havası).\n- Konu yelpazesi geniştir: sanat, edebiyat, yaşam, felsefe…\n- Kanıtlama ve ispat kaygısı yoktur; **öznel** bir türdür.\n\n| | Temsilciler |\n|---|---|\n| Dünya edebiyatında ilk | **Montaigne** |\n| Türk edebiyatı | **Nurullah Ataç, Sabahattin Eyuboğlu, Suut Kemal Yetkin** |\n\n### Denemeyi benzer türlerden ayırma\n\n| Tür | Fark |\n|---|---|\n| **Deneme** | Kendi kendine konuşma havası, kanıtlama yok |\n| **Sohbet (söyleşi)** | Okurla karşılıklı konuşuyormuş gibi, daha az derin konular |\n| **Makale** | Bir düşünceyi **kanıtlamak** amacıyla, nesnel ve ciddi bir dille |",
     "ornekler": [
      {
       "soru": "Bir yazar \"Belki de mutluluk, aradığımızı bulmak değil aramayı sürdürmektir; bilmiyorum, bu konuda kesin bir şey söyleyemem.\" diyor. Bu ifadeler hangi türe uygundur? Neden?",
       "cozum": "**Deneme.** Yazar kişisel düşüncesini **kesin bir sonuca bağlamadan** ve samimi, kendi kendine konuşur gibi bir üslupla dile getiriyor. Makale olsaydı görüşünü kanıtlarla ispatlamaya çalışırdı."
      },
      {
       "soru": "\"Picasso'nun Hatları\" metninin ana fikri nedir?",
       "cozum": "Gelenekten yararlanmak yalnızca biçimi/malzemeyi almak değildir; o biçimi var eden **ruhu** kavramak gerekir. Picasso hattı yalnızca malzeme olarak kullanmıştır."
      }
     ],
     "ozet": [
      "Deneme: kesin sonuç yok, samimi, kendi kendine konuşur gibi.",
      "İlk temsilci Montaigne; Türk edebiyatında Nurullah Ataç, S. Eyuboğlu, S. K. Yetkin.",
      "Makale kanıtlar, deneme kanıtlamaz; sohbette okurla konuşma havası vardır.",
      "Özdenören: geleneğin malzemesi değil **ruhu** önemlidir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "1.4",
    "title": {
     "tr": "Mülakat ve çok modlu metinler (dinleme/izleme)",
     "en": "Interviews and multimodal texts (listening/viewing)"
    },
    "content": {
     "anlatim": "# Mülakat\n\n**Mülakat**, bir konuda bilgi ve görüşüne başvurulan **sanatçı, bilim insanı ya da uzman** kişiyle yapılan, **soru–cevap** düzenindeki konuşmanın yazıya ya da kayda geçirilmiş hâlidir. Temada sanatçılarla yapılmış çok modlu mülakatlar (ör. **Selim İleri'yle mülakat**) dinlenir/izlenir.\n\n| | **Mülakat** | **Röportaj** |\n|---|---|---|\n| Odak | Kişinin **görüşleri** (sanat, edebiyat, bilim) | Bir **olay, yer ya da kişi**; yazarın gözlemleri de vardır |\n| Biçim | Soru–cevap | Soru–cevap + betimleme ve izlenimler |\n| Kişi | Alanında uzman / tanınmış kişi | Herkes olabilir |\n\n# Çok Modlu Metin\n\nAnlamın **söz, görüntü, ses, müzik, yazı ve grafik** gibi birden fazla anlatım aracıyla birlikte oluşturulduğu metindir (video mülakat, belgesel, infografik, sunum).\n- İzlerken yalnızca söze değil; konuşanın **jest ve mimiklerine**, ses tonuna, görüntülere ve altyazılara da dikkat edilir.\n\n# Dinlerken / İzlerken Stratejiler\n\n1. **Hazırlık:** Konuşanı ve konuyu tanı; başlık ve görsellerden metnin amacını **tahmin et**.\n2. **Not alma:** Ana fikri, yardımcı fikirleri ve dikkat çeken ifadeleri kısa notlarla yaz.\n3. **Çıkarım:** Açıkça söylenenle **ima edileni** ayır; neden–sonuç ilişkilerini belirle.\n4. **Değerlendirme:** Tahminini içerikle karşılaştır; konuşanın görüşüne katılıp katılmadığını gerekçelendir.",
     "ornekler": [
      {
       "soru": "Bir yazarla edebiyat anlayışı üzerine yapılan soru–cevap biçimindeki konuşma ile bir gazetecinin depremzede bir kasabada insanlarla konuşup izlenimlerini de kattığı yazı arasındaki tür farkı nedir?",
       "cozum": "İlki **mülakattır**: odak, tanınmış bir kişinin bir konudaki **görüşleridir**. İkincisi **röportajdır**: bir olay ve yer ele alınır, yazarın **gözlem ve izlenimleri** de metne katılır."
      },
      {
       "soru": "Video olarak izlenen bir mülakatı, aynı mülakatın yazılı hâlinden farklı kılan unsurlar nelerdir?",
       "cozum": "Videoda anlam yalnızca sözle değil; **ses tonu, vurgu, jest–mimik, görüntü ve müzik** gibi farklı modlarla da oluşur. Bu yüzden video **çok modlu** bir metindir; dinleyici konuşanın duygusunu ve vurguladığı noktaları daha kolay fark eder."
      }
     ],
     "ozet": [
      "Mülakat: uzman/sanatçının görüşlerine dayalı soru–cevap; röportajda yazarın gözlemleri de vardır.",
      "Çok modlu metin: söz, görüntü, ses, yazı birlikte anlam oluşturur.",
      "Dinleme stratejileri: tahmin et, not al, çıkarım yap, değerlendir."
     ]
    }
   },
   {
    "id": "k5",
    "code": "1.5",
    "title": {
     "tr": "Ses bilgisi: Türkçede ses olayları",
     "en": "Phonology: sound changes in Turkish"
    },
    "content": {
     "anlatim": "# Türkçede Ses Olayları\n\nSözcükler ek aldığında ya da yan yana geldiğinde bazı sesler değişir, düşer ya da birleşir.\n\n| Ses olayı | Açıklama | Örnek |\n|---|---|---|\n| **Ünsüz benzeşmesi (sertleşme)** | Sert ünsüzle (f, s, t, k, ç, ş, h, p) biten sözcüğe c, d, g ile başlayan ek gelince ek **sertleşir**: c→ç, d→t, g→k | kitap**ç**ı, ağaç**t**an, dolap**t**a (*dolap-da*), iş**ç**i (*iş-ci*) |\n| **Ünsüz yumuşaması** | p, ç, t, k ile biten sözcüğe ünlüyle başlayan ek gelince sözcük sonu **yumuşar**: p→b, ç→c, t→d, k→ğ/g | kita**b**ı, ağa**c**ı, yur**d**u, aya**ğ**ı, ren**g**i |\n| **Ünlü daralması** | -a, -e ile biten fiillere **-yor** eki gelince a/e **ı, i, u, ü**'ye daralır | başla-yor → başl**ı**yor, izle-yor → izl**i**yor, ye-yor → **y**iyor |\n| **Ünlü düşmesi** | İki heceli bazı sözcüklere ünlüyle başlayan ek gelince ikinci hecedeki dar ünlü **düşer** | ağız → **ağzı**, burun → **burnu**, oğul → **oğlu**, alın → **alnı** |\n| **Ulama** | Ünsüzle biten sözcüğün son ünsüzü, ünlüyle başlayan sonraki sözcüğün ilk ünlüsüyle **birlikte okunur** (yazıda gösterilmez) | “Bir_elma” → bi-rel-ma; “Akşam_oldu” |\n\nDiğer ses olayları: **ünsüz düşmesi** (küçük → küçültmek), **ünsüz türemesi** (hak → hakkı), **kaynaştırma ünsüzleri** (y, n, s, ş: araba**y**ı, iki**ş**er).\n\n> **İpucu:** Tek heceli sözcüklerin çoğu yumuşamaz (top → topu, saç → saçı); özel adlarda yumuşama yazıya geçirilmez (Zonguldak'a, Sinop'a — okunuşta yumuşar).",
     "ornekler": [
      {
       "soru": "“Ağzından çıkanı kulağın duysun, kitabını ve defterini ayrı çantaya koy.” cümlesindeki ses olaylarını bulunuz.",
       "cozum": "**ağız → ağzından:** ünlü düşmesi · **kulak → kulağın:** ünsüz yumuşaması (k → ğ) · **kitap → kitabını:** ünsüz yumuşaması (p → b) · **ayrı çantaya:** kaynaştırma ünsüzü (-y-)."
      },
      {
       "soru": "“Sepette elmalar, kitapçıda dergiler var.” cümlesinde ünsüz benzeşmesi örneklerini gösteriniz.",
       "cozum": "**sepet-de → sepette** (t'den sonra d → t), **kitap-cı → kitapçı** (p'den sonra c → ç). Sert ünsüzden sonra gelen ekin ilk ünsüzü sertleşmiştir."
      }
     ],
     "ozet": [
      "Ünsüz benzeşmesi: sert ünsüzden sonra c, d, g → ç, t, k (kitapçı, sepette).",
      "Yumuşama: p, ç, t, k → b, c, d, ğ (kitabı, ağacı); daralma: başlıyor; düşme: ağzı, burnu.",
      "Ulama okunuşta olur, yazıda gösterilmez."
     ]
    }
   },
   {
    "id": "k6",
    "code": "1.6",
    "title": {
     "tr": "Yazım ve noktalama: virgül, üç nokta ve güncel yazım",
     "en": "Spelling and punctuation: comma, ellipsis and current spelling"
    },
    "content": {
     "anlatim": "# Güncel Yazım\n\nDoğru yazım için **Türk Dil Kurumu (TDK) Güncel Türkçe Sözlük** ve **Yazım Kılavuzu** esas alınır. Edebî metinlerde eski yazımlar (ör. **İslâm**, **hattâ**, **kâğıt**) görülebilir; şapka (düzeltme işareti) bugün yalnızca anlam ayrımı ve ince okunuş gereken yerlerde kullanılır: **hala** (babanın kız kardeşi) – **hâlâ** (henüz), **kar** – **kâr**, **dergâh**.\n\n# Virgül (,)\n\n| Kullanım | Örnek |\n|---|---|\n| Eş görevli sözcük ve söz öbeklerini ayırmak | Kalem, defter, kitap aldım. |\n| Uzun cümlelerde yüklemden uzak düşmüş ögeyi belirtmek | Okulumuzun yeni öğretmeni, geçen hafta Ankara'dan geldi. |\n| Hitaplardan sonra | Sevgili arkadaşım, mektubunu aldım. |\n| Sıralı cümleleri ayırmak | Eve geldi, yemeğini yedi, ödevine başladı. |\n| Ara sözleri ayırmak (iki virgül arasında) | Dedem, annemin babası, çok iyi saz çalar. |\n\n# Üç Nokta (…)\n\n| Kullanım | Örnek |\n|---|---|\n| Tamamlanmamış cümlenin sonunda | Bir gün o da gelecekti ama… |\n| Söylenmek istenmeyen ya da sayılabilecek başka şeylerin yerine | Elma, armut, ayva… meyve kasası doluydu. |\n| Alıntılarda atlanan bölümü göstermek (yay ayraç içinde) | “(…) Gün doğmadan neler doğar.” |\n| Kaba sözler ya da duygu yoğunluğu, sessizlik | Evet… haklısın… |",
     "ornekler": [
      {
       "soru": "“Annem, babam ve ben akşam yürüyüşe çıktık.” ile “Annem, babam ve ben akşam yürüyüşe çıktık mı diye sordu.” cümleleri arasındaki virgül kullanımını yorumlayınız.",
       "cozum": "İlk cümlede virgül **eş görevli ögeleri** (annem, babam) ayırmıştır. İkinci cümlede ise virgül “Annem” sözünü **hitap/özne** olarak ayırmış olabilir; virgülün yeri anlamı değiştirebilir. Yazarken anlam belirsizliğini virgülle önlemek gerekir."
      },
      {
       "soru": "Aşağıdaki cümlede yazım yanlışını bulunuz: “Hala gelmedi, hâlam endişelendi.”",
       "cozum": "**“Hala”** sözcüğü “henüz” anlamında kullanıldığı için **“hâlâ”** yazılmalıdır. “Hâlam” ise babanın kız kardeşi anlamındadır ve **“halam”** yazılır. Doğrusu: “**Hâlâ** gelmedi, **halam** endişelendi.”"
      }
     ],
     "ozet": [
      "Doğru yazım için TDK Güncel Türkçe Sözlük ve Yazım Kılavuzu esas alınır (hala – hâlâ, kar – kâr).",
      "Virgül: eş görevli ögeler, hitap, sıralı cümleler, ara sözler.",
      "Üç nokta: tamamlanmamış cümle, sayılabilecek benzerler, alıntıda atlanan bölüm (…)."
     ]
    }
   },
   {
    "id": "k7",
    "code": "1.7",
    "title": {
     "tr": "Edebiyat atölyesi: betimleyici paragraf ve düşünceyi geliştirme yolları",
     "en": "Literary workshop: descriptive paragraphs and ways of developing ideas"
    },
    "content": {
     "anlatim": "# Paragraf Yazma\n\nParagraf **giriş (konu cümlesi), gelişme ve sonuç** cümlelerinden oluşur; tek bir ana düşünceyi işler.\n\n## Betimleyici Paragraf\n\nBir varlığı, yeri ya da duyguyu okurun **zihninde canlandıracak** şekilde anlatır.\n- **Duyulardan yararlan:** görme (renk, ışık), işitme (ses), koku, tat, dokunma.\n- **Ayrıntı seç:** Her şeyi değil, varlığı **ayırt eden** özellikleri yaz.\n- **Düzenli ilerle:** Uzaktan yakına, genelden özele, soldan sağa…\n- **Söz sanatlarıyla** anlatımı güçlendir (benzetme, kişileştirme).\n\n> Şiirden yola çıkarak yazılan paragrafta şiirin uyandırdığı **duygu ve imgeler** kendi cümlelerinle betimlenir (“Duygularımı Betimliyorum”).\n\n## Düşünceyi Geliştirme Yolları\n\n| Yol | Açıklama | İpucu |\n|---|---|---|\n| **Tanımlama** | Bir kavramın ne olduğunu açıklama | “… -dır, denir” |\n| **Örneklendirme** | Düşünceyi somut örnekle destekleme | “Örneğin, mesela” |\n| **Karşılaştırma** | İki varlığın benzer ve farklı yönlerini ortaya koyma | “… -den daha, oysa” |\n| **Tanık gösterme** | Tanınmış birinin sözüne başvurma | “… der ki” |\n| **Benzetme** | Bir düşünceyi başka bir şeye benzeterek açıklama | “gibi, sanki” |\n| **Sayısal verilerden yararlanma** | İstatistikle destekleme | %, sayılar |\n\n## Konuşma (Sunum)\n\nGörüşünü sunarken düşünceyi geliştirme yollarını kullan; **göz teması**, uygun ses tonu, vurgu ve beden dili ile dinleyiciyi ikna et; sonunda düşünceni **özetle**.",
     "ornekler": [
      {
       "soru": "“Kitap okumak zihni besler. Bir araştırmaya göre düzenli kitap okuyan öğrencilerin kelime dağarcığı, okumayanlardan %30 daha geniştir.” paragrafında hangi düşünceyi geliştirme yolu kullanılmıştır?",
       "cozum": "**Sayısal verilerden yararlanma** (istatistik): Düşünce bir araştırma sonucu ve yüzde ile desteklenmiştir."
      },
      {
       "soru": "Okulunuzun bahçesini betimleyen 3–4 cümlelik bir paragraf yazınız.",
       "cozum": "Örnek: “Sabah zili çalmadan önce bahçe, çınar ağacının geniş gölgesinde uyuyan bir kedi gibi sessizdi. Islak toprağın kokusu, kantinden yayılan simit kokusuna karışıyordu. Uzakta, basketbol potasının paslı çemberi güneşte turuncu bir ışıkla parlıyordu. Birden kapılar açıldı ve bahçe kahkahalarla uyandı.” — **Görme, koku, işitme** duyuları ve **benzetme–kişileştirme** kullanılmıştır."
      }
     ],
     "ozet": [
      "Paragraf: konu cümlesi, gelişme, sonuç; tek ana düşünce.",
      "Betimleme: duyular, ayırt edici ayrıntı, düzenli ilerleme, söz sanatları.",
      "Düşünceyi geliştirme: tanımlama, örneklendirme, karşılaştırma, tanık gösterme, benzetme, sayısal veri."
     ]
    }
   }
  ]
 },
 {
  "id": "u2",
  "name": {
   "tr": "2. Tema: Anlam Arayışı",
   "en": "Theme 2: The Search for Meaning"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "2.1",
    "title": {
     "tr": "Hikâyenin yapı unsurları — \"Bir Kavak ve İnsanlar\" (Haldun Taner)",
     "en": "Elements of the short story — \"A Poplar and People\" (Haldun Taner)"
    },
    "content": {
     "anlatim": "# Okuma: \"Bir Kavak ve İnsanlar\" — Haldun Taner\n\n- Sahildeki bir kavağın altında huzur bulan bir ihtiyar, vasiyeti üzerine oraya gömülür; sonrasında ağaç adeta **ihtiyarın kimliğini kazanır**. Hikâyede **fantastik ve gerçekçi** ögeler bir aradadır.\n- Sahile fabrika kurmak isteyen zihniyetin doğayı ve kavağı yok etmesi **eleştirilir**.\n- **Doğa ve medeniyet çatışması:** doğaya değer veren ihtiyar ve köylüler ↔ kâr hırsıyla doğayı yok eden fabrikatör.\n\n# Hikâyenin Yapı Unsurları\n\n| Unsur | Açıklama |\n|---|---|\n| **Olay örgüsü** | Yaşanmış veya yaşanabilir olayların **sebep-sonuç** ilişkisiyle sıralanması |\n| **Kişi kadrosu** | Olayı yaşayan **başkarakter** ve **yardımcı karakterler** |\n| **Mekân** | Olayın geçtiği çevre veya yer |\n| **Zaman** | Olayın gerçekleştiği mevsim, yıl veya gün dilimi |\n| **Anlatıcı ve bakış açısı** | Hikâyeyi kimin, hangi açıdan anlattığı (bkz. 3. tema) |\n\n### Tema ve konu\n\n- **Konu:** Metinde anlatılan olay ya da durum (ör. bir kavağın ve onu sevenlerin başına gelenler).\n- **Tema:** Konunun dayandığı **soyut ana duygu/düşünce** (ör. doğa sevgisi, doğa-insan çatışması). Tema tek kelime/sözcük grubuyla ifade edilebilir.",
     "ornekler": [
      {
       "soru": "\"Bir Kavak ve İnsanlar\" hikâyesinin teması ve çatışması nedir?",
       "cozum": "**Tema:** doğa sevgisi / doğanın korunması. **Çatışma:** doğaya değer veren ihtiyar ve köylüler ile kâr hırsıyla doğayı yok eden fabrikatör arasında; yani **doğa ↔ medeniyet (sanayi)**."
      },
      {
       "soru": "Konu ile tema arasındaki fark nedir? Bir örnekle açıklayın.",
       "cozum": "Konu **somut** olarak anlatılan olaydır (bir çocuğun gurbette susması), tema ise bu olayın dayandığı **soyut** duygu/düşüncedir (gurbet, dil sevgisi)."
      }
     ],
     "ozet": [
      "Hikâyenin yapı unsurları: olay örgüsü, kişiler, mekân, zaman (+ anlatıcı).",
      "Olay örgüsü sebep-sonuç ilişkisine dayanır.",
      "Konu somut olay; tema soyut ana duygu/düşünce.",
      "Haldun Taner: doğa-medeniyet çatışması; fantastik + gerçekçi ögeler."
     ]
    }
   },
   {
    "id": "k2",
    "code": "2.2",
    "title": {
     "tr": "Hikâye türleri, açık ve örtük ileti — \"Hişt Hişt!\" (Sait Faik)",
     "en": "Story types, explicit and implicit messages — \"Hişt Hişt!\" (Sait Faik)"
    },
    "content": {
     "anlatim": "# Okuma: \"Hişt, Hişt!\" — Sait Faik Abasıyanık\n\n- Sait Faik, Türk edebiyatında **durum hikâyeciliğinin (Çehov tarzı)** en büyük temsilcilerindendir.\n- Hikâyede yazar doğayla, böceklerle, denizle kurduğu **dostane bağı** ve **iç sesini** sorgular.\n- İnsanın doğadaki sesleri duymasının ve **yaşam sevinciyle** dolmasının önemi işlenir.\n- Kazanım: açık ve örtük iletileri ayırt etme, yazarın bakış açısını kavrama.\n\n# Hikâye Türleri\n\n| | **Olay hikâyesi** (Maupassant tarzı) | **Durum hikâyesi** (Çehov tarzı) |\n|---|---|---|\n| Odak | Bir **olay** | Hayatın bir **kesiti**, an veya durum |\n| Plan | **Serim – düğüm – çözüm** vardır | Bu bölümler zorunlu değildir |\n| Merak | Merak ögesi canlıdır, sonuç önemlidir | Merak geri plandadır, atmosfer ve duygu önemlidir |\n| Türk edebiyatı | **Ömer Seyfettin**, Refik Halit Karay | **Sait Faik**, Memduh Şevket Esendal |\n\n# Açık ve Örtük İleti\n\n- **Açık ileti:** Metinde **doğrudan**, yorum gerektirmeden verilen mesaj.\n- **Örtük ileti:** **İmge, sembol ve çağrışımlar** yoluyla okurun sezmesine bırakılan derin anlam katmanı.\n\n> Edebî metinler çoğunlukla **örtük** iletiler taşır; okur metni yorumlayarak bu anlamı kendisi kurar.",
     "ornekler": [
      {
       "soru": "Bir hikâyede belirgin bir olay yok; yazar bir sabah iskelede balıkçıları izlerken hissettiklerini anlatıyor ve hikâye bir sonuca bağlanmıyor. Bu hangi tür hikâyedir?",
       "cozum": "**Durum (Çehov tarzı) hikâyesi.** Olaydan çok bir **an/kesit** ve duygular anlatılıyor; serim-düğüm-çözüm planı yok."
      },
      {
       "soru": "\"Hişt, Hişt!\" hikâyesinde \"doğadaki seslere kulak vermek\" ifadesinin örtük iletisi ne olabilir?",
       "cozum": "Yalnızca sesleri duymak değil; insanın **doğayla bağ kurması**, kendi iç sesini fark etmesi ve **yaşam sevincini** yeniden bulması gerektiği. Bu anlam doğrudan söylenmez, okurun sezmesine bırakılır."
      }
     ],
     "ozet": [
      "Olay hikâyesi = Maupassant tarzı, serim-düğüm-çözüm, Ömer Seyfettin.",
      "Durum hikâyesi = Çehov tarzı, hayattan kesit, Sait Faik ve Memduh Şevket.",
      "Açık ileti doğrudan; örtük ileti imge, sembol ve çağrışımla verilir."
     ]
    }
   },
   {
    "id": "k3",
    "code": "2.3",
    "title": {
     "tr": "Anı — \"Nihayet Beklediğimiz Büyük Gün\" (Halide Nusret Zorlutuna)",
     "en": "The memoir — \"The Great Day We Had Been Waiting For\" (Halide Nusret Zorlutuna)"
    },
    "content": {
     "anlatim": "# Okuma: \"Nihayet Beklediğimiz Büyük Gün\" — Halide Nusret Zorlutuna\n\n- Yazarın **\"Bir Devrin Romanı\"** adlı anı kitabından alınmıştır.\n- Osmanlı Devleti'nin yıkılış süreci, **mütareke yıllarının acıları** ve **6 Ekim 1923**'te İstanbul'un işgalden kurtuluşunun yarattığı büyük coşku anlatılır.\n- **Millî Mücadele ruhu:** Dönemin toplumsal ruh hâli, halkın vatan sevgisi ve bağımsızlık inancı **lirik** bir üslupla aktarılır.\n- Kazanım: anı türünü tanıma, **tarihî olaylar ile bireysel deneyimler** arasında bağ kurma.\n\n# Anı (Hatıra) Türünün Özellikleri\n\n- Kişilerin yaşadıkları veya **tanık oldukları** olayları, **üzerinden zaman geçtikten sonra** kendi bakış açılarıyla yazdıkları türdür.\n- **Gerçeğe bağlılık** esastır; ancak yazarın **öznel** duygu ve izlenimlerini de barındırır.\n- Genellikle **birinci tekil kişi** ağzından yazılır; tarihî dönemlere ışık tutan **belge değeri** taşır.\n- Türk edebiyatında ilk anı örneği: Babür Şah'ın **\"Babürname\"**si. **Kök Türk Kitabeleri** de anı-söylev özelliği taşır.\n\n### Anı – günlük farkı\n\n| Anı | Günlük |\n|---|---|\n| Olaylar **aradan zaman geçtikten sonra** yazılır | Olaylar **yaşandığı gün** yazılır |\n| Tarih atılması zorunlu değildir | Her yazının başında **tarih** bulunur |",
     "ornekler": [
      {
       "soru": "Anı ile günlük arasındaki temel fark nedir?",
       "cozum": "Anıda olaylar **üzerinden zaman geçtikten sonra** hatırlanarak yazılır; günlükte ise olaylar **yaşandığı gün** ve **tarih** atılarak yazılır."
      },
      {
       "soru": "Bir metnin anı türünde yazıldığını hangi özelliklerden anlarsınız?",
       "cozum": "Yazarın **kendi yaşadığı/tanık olduğu** gerçek olayları, **birinci kişi** ağzından ve **geriye dönüp hatırlayarak** anlatması; gerçek kişi, yer ve tarihlerin yer alması."
      }
     ],
     "ozet": [
      "Anı: yaşanan/tanık olunan olaylar, zaman geçtikten sonra yazılır.",
      "Gerçeğe bağlıdır ama yazarın öznel izlenimlerini taşır.",
      "İlk örnek Babürname; Kök Türk Kitabeleri anı-söylev özelliği taşır.",
      "Zorlutuna, İstanbul'un kurtuluşunu (6 Ekim 1923) lirik bir üslupla anlatır."
     ]
    }
   },
   {
    "id": "k4",
    "code": "2.4",
    "title": {
     "tr": "Şiir dinleme ve şiir yazma: halk şiiri geleneği",
     "en": "Listening to and writing poetry: the folk poetry tradition"
    },
    "content": {
     "anlatim": "# Dinleme/İzleme: Bir Aşk Şiiri (“Mihriban”)\n\nTemada dinlenen **“Mihriban”**, Abdurrahim Karakoç'un **halk şiiri** söyleyişine yakın, sade dille yazılmış ve **türkü** olarak bestelenip yaygınlaşmış bir şiiridir. Şiir bir **ayrılık ve özlem** temasını işler.\n\n## Halk Şiirinin Özellikleri\n\n| Özellik | Açıklama |\n|---|---|\n| **Ölçü** | **Hece ölçüsü** (7'li, 8'li, 11'li yaygın) |\n| **Birim** | Dörtlük (koşma, mani, türkü) |\n| **Kafiye** | Genellikle **yarım ve tam kafiye**; **redif** sık kullanılır |\n| **Dil** | Sade, halkın konuştuğu dil; somut imgeler |\n| **Tema** | Aşk, ayrılık, gurbet, doğa, ölüm |\n| **Sunuluş** | Çoğu zaman **saz eşliğinde** söylenir; son dörtlükte şairin adı geçer (**tapşırma**) |\n\n- **Âşık Veysel** (1894–1973), saz şairi geleneğinin 20. yüzyıldaki en önemli temsilcilerindendir (4. temada otobiyografisi ele alınır).\n\n# Edebiyat Atölyesi: Şiir Yazma (“Genç Şairlerden Mısralar”)\n\n1. Temaya uygun bir **duygu** seç (özlem, umut, arkadaşlık).\n2. Duyguyu taşıyacak **somut imgeler** bul (yağmur, eski bir fotoğraf, tren garı).\n3. Bir **ölçü** belirle (ör. 8'li hece: 4 + 4 durak) ya da serbest şiir yaz.\n4. **Kafiye ve redif** ile ahenk oluştur; tekrarlarla vurgu yap.\n5. Şiirini sesli oku, ahengi kontrol et ve arkadaşlarından geri bildirim al.",
     "ornekler": [
      {
       "soru": "“Bahar geldi dağlarıma” dizesi kaç hecelidir ve duraklar nasıldır?",
       "cozum": "Ba-har-gel-di / dağ-la-rı-ma → **8 hece**, **4 + 4** duraklı. Hece ölçüsünde önce heceler ayrılır, sonra okunuşta doğal olarak durulan yerler (duraklar) belirlenir; 8'li hece mani ve türkülerde sık kullanılır."
      },
      {
       "soru": "Halk şiirinde “tapşırma” nedir? Neden yapılır?",
       "cozum": "Şairin şiirin **son dörtlüğünde kendi adını** ya da mahlasını söylemesidir. Sözlü gelenekte şiirin **kime ait olduğunu** bildirmek amacıyla yapılır."
      }
     ],
     "ozet": [
      "Halk şiiri: hece ölçüsü, dörtlük, sade dil, yarım kafiye ve redif, saz eşliği.",
      "Tapşırma: şairin son dörtlükte adını söylemesi.",
      "Şiir yazarken duygu → somut imge → ölçü → kafiye/redif → sesli okuma."
     ]
    }
   }
  ]
 },
 {
  "id": "u3",
  "name": {
   "tr": "3. Tema: Anlamın Yapı Taşları",
   "en": "Theme 3: The Building Blocks of Meaning"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "3.1",
    "title": {
     "tr": "Anlatıcı ve bakış açıları — \"Eskici\" (Refik Halit Karay)",
     "en": "Narrator and point of view — \"The Junk Dealer\" (Refik Halit Karay)"
    },
    "content": {
     "anlatim": "# Okuma: \"Eskici\" — Refik Halit Karay\n\n- **\"Gurbet Hikâyeleri\"** arasında yer alır.\n- Annesini ve babasını kaybettikten sonra **Filistin**'deki halasının yanına gönderilen küçük **Hasan**'ın gurbet acısı ve **ana diline özlemi** işlenir.\n- **Gurbet ve dil:** Hasan'ın aylarca susması ve **İzmitli bir eskiciyle Türkçe konuşunca** çözülmesi, dilin insan ruhundaki birleştirici gücünü gösterir.\n\n# Anlatıcı ve Bakış Açıları\n\n| Bakış açısı | Özellik | Kişi |\n|---|---|---|\n| **Hâkim (ilahi)** | Anlatıcı **her şeyi bilir**; kahramanların iç dünyasını ve düşüncelerini okur | 3. tekil kişi |\n| **Gözlemci** | Anlatıcı yalnızca **gördüklerini** bir kamera tarafsızlığıyla aktarır; zihin okuyamaz | 3. tekil kişi |\n| **Kahraman anlatıcı** | Anlatıcı olayın içindeki karakterlerden biridir | **1. tekil kişi** |\n\n### İpuçları\n\n- \"…**diye düşündü**, içinden … **geçirdi**\" → kahramanın zihni okunuyor → **hâkim** bakış açısı.\n- Yalnızca dış görünüş, hareket ve konuşmalar → **gözlemci**.\n- \"Ben…\", \"…dım, …dik\" → **kahraman anlatıcı**.",
     "ornekler": [
      {
       "soru": "\"Hasan pencerenin önünde oturuyordu. Kimseyle konuşmuyor, sokaktan geçenlere bakıyordu.\" Bu parçada hangi bakış açısı kullanılmıştır?",
       "cozum": "Anlatıcı yalnızca **görüleni** (oturma, bakma, konuşmama) aktarıyor, Hasan'ın düşüncelerini söylemiyor → **gözlemci bakış açısı**."
      },
      {
       "soru": "\"Hasan, bu yabancı dilin içinde kaybolduğunu, kimsenin onu anlamayacağını düşünüyordu.\" Bakış açısı nedir?",
       "cozum": "Anlatıcı kahramanın **zihninden geçenleri** biliyor → **hâkim (ilahi) bakış açısı**."
      }
     ],
     "ozet": [
      "Hâkim: her şeyi bilir, zihin okur (3. kişi).",
      "Gözlemci: yalnız görüleni aktarır (3. kişi).",
      "Kahraman anlatıcı: olayın içinde, 1. kişi.",
      "\"Eskici\": gurbet ve ana dilinin birleştirici gücü."
     ]
    }
   },
   {
    "id": "k2",
    "code": "3.2",
    "title": {
     "tr": "Şiirde yapı, ahenk ve ölçü; şiir türleri",
     "en": "Structure, harmony and meter in poetry; types of poems"
    },
    "content": {
     "anlatim": "# Şiirde Yapı ve Ahenk Unsurları\n\nŞiirde anlamı ve duygu coşkusunu pekiştiren en önemli unsurlar **ahenk** ve **yapı** ögeleridir.\n\n### Nazım birimi\n\n**Dize** (tek satır) · **beyit** (iki dize) · **dörtlük** (dört dize) · **bent** (dörtten fazla dizeden oluşan birim).\n\n### Kafiye (uyak) ve redif\n\n- **Redif:** Uyaklardan sonra gelen, **yazılışı ve görevi aynı** olan ek veya kelimeler. Kafiye bulunurken **önce redif ayrılır**.\n- **Kafiye:** Dize sonlarındaki ses benzerlikleri (görevleri ya da anlamları farklı).\n\n| Kafiye türü | Ses benzerliği | Örnek |\n|---|---|---|\n| **Yarım** | Tek ses | ağa**ç** – kılı**ç** |\n| **Tam** | İki ses (ünlü + ünsüz) | y**ar** – b**ar** |\n| **Zengin** | Üç veya daha fazla ses | **anı**r – y**anı**r |\n| **Cinaslı** | Yazılışı aynı, anlamı farklı kelimeler | **yüz** (surat) – **yüz** (sayı) |\n\n### Kafiye örgüsü (uyak şeması)\n\n| Örgü | Şema |\n|---|---|\n| **Düz** | aaab, cccb / aa, bb |\n| **Çapraz** | abab |\n| **Sarmal** | abba |\n| **Mani tipi** | aaxa |\n| **Örüşük** | aba, bcb, cdc… |\n\n### Ölçü (vezin)\n\n- **Hece ölçüsü:** Dizelerdeki **hece sayılarının** eşitliğine dayanır (ör. 7'li, 8'li, 11'li); **durak** önemlidir.\n- **Aruz ölçüsü:** Hecelerin **uzunluk-kısalığına** (ses değerlerine) dayanır; Divan edebiyatında kullanılır.\n- **Serbest şiir:** Belirli bir ölçüye bağlı değildir.\n\n# Şiir Türleri (konusuna göre)\n\n| Tür | Konu |\n|---|---|\n| **Lirik** | Coşkulu duygular (aşk, ayrılık, özlem) |\n| **Epik** | Kahramanlık, yiğitlik, savaş |\n| **Pastoral** | Doğa ve çoban hayatı |\n| **Didaktik** | Öğretici, bilgi ve öğüt veren |\n| **Satirik** | Eleştirel, iğneleyici (hiciv) |",
     "ornekler": [
      {
       "soru": "\"Gönlüm hep seni arıyor / Ellerim seni sarıyor\" dizelerinde redif ve kafiyeyi bulun.",
       "cozum": "Önce redif ayrılır: her iki dizedeki **-ıyor** eki aynı görevlidir → **redif**. Geriye kalan *ar* / *sar* sözcüklerinde **\"ar\"** ses benzerliği (iki ses) → **tam kafiye**."
      },
      {
       "soru": "Kafiye şeması **abba** olan bir dörtlükte hangi uyak örgüsü vardır?",
       "cozum": "1. ile 4., 2. ile 3. dizeler uyaklıdır → **sarmal uyak**."
      },
      {
       "soru": "Kahramanlık ve savaşı anlatan şiirler hangi türdendir?",
       "cozum": "**Epik şiir.** (Aşk ve özlem → lirik; doğa ve çoban hayatı → pastoral; öğüt → didaktik; eleştiri → satirik.)"
      }
     ],
     "ozet": [
      "Nazım birimi: dize, beyit, dörtlük, bent.",
      "Önce **redif** ayrılır, sonra kafiye bulunur.",
      "Kafiye: yarım (1 ses), tam (2), zengin (3+), cinaslı (sesteş).",
      "Uyak örgüsü: düz, çapraz (abab), sarmal (abba), mani tipi (aaxa), örüşük.",
      "Hece ölçüsü sayıya, aruz uzunluk-kısalığa dayanır.",
      "Şiir türleri: lirik, epik, pastoral, didaktik, satirik."
     ]
    }
   },
   {
    "id": "k3",
    "code": "3.3",
    "title": {
     "tr": "Gezi yazısı — \"Bizim Akdeniz\" (Falih Rıfkı Atay)",
     "en": "The travel essay — \"Our Mediterranean\" (Falih Rıfkı Atay)"
    },
    "content": {
     "anlatim": "# Okuma: \"Bizim Akdeniz\" — Falih Rıfkı Atay\n\n- Türk gezi edebiyatının başyapıtlarındandır.\n- Yazar **Antalya**'nın doğasını, **Toros** dağlarını, sahil ovasını, zeytin ve portakal bahçelerini güçlü bir **gözlem** yeteneği ve akıcı bir Türkçe ile **betimler**.\n\n# Gezi Yazısının Özellikleri\n\n- Yazarın **gezip gördüğü yerlerin** doğal, tarihî, sosyal ve kültürel özelliklerini ilgi çekici bir üslupla anlattığı türdür (**seyahatname**).\n- **Gözlem, betimleme ve açıklama** anlatım biçimleri yoğun olarak kullanılır.\n- Gerçeğe bağlıdır; ama yazarın kişisel izlenimlerini de taşır. **Öğretici** metinler arasında yer alır.\n- Türk edebiyatında ilk örnek: **Seydi Ali Reis — \"Mir'âtü'l-Memâlik\"**. Türün zirvesi: **Evliya Çelebi — \"Seyahatname\"**.\n\n### Anı ile gezi yazısı farkı\n\n| Anı | Gezi yazısı |\n|---|---|\n| Geçmişteki **yaşam deneyimlerine** odaklanır | **Yeni coğrafyaların ve mekânların** tanıtımını amaçlar |\n| Merkezde **olaylar ve kişiler** vardır | Merkezde **yer** vardır |",
     "ornekler": [
      {
       "soru": "Bir metinde yazar, gittiği bir kasabanın taş evlerini, pazarını ve yöresel yemeklerini ayrıntılı biçimde anlatıyor. Bu metin hangi türe girer ve en çok hangi anlatım biçimi kullanılmıştır?",
       "cozum": "**Gezi yazısı.** Yazar gezip gördüğü yeri tanıtıyor; ağırlıklı anlatım biçimi **betimleme**dir (gözlem ve açıklamayla birlikte)."
      },
      {
       "soru": "Türk edebiyatında gezi türünün ilk örneği ve zirvesi hangi eserlerdir?",
       "cozum": "İlk örnek: Seydi Ali Reis'in **Mir'âtü'l-Memâlik**'i. Zirve: Evliya Çelebi'nin **Seyahatname**'si."
      }
     ],
     "ozet": [
      "Gezi yazısı = gezilip görülen yerin tanıtılması; betimleme ağırlıklı.",
      "İlk örnek Mir'âtü'l-Memâlik (Seydi Ali Reis); zirve Seyahatname (Evliya Çelebi).",
      "Anı olaya/kişiye, gezi yazısı yere odaklanır.",
      "Falih Rıfkı Atay — \"Bizim Akdeniz\": Antalya ve Toroslar."
     ]
    }
   },
   {
    "id": "k4",
    "code": "3.4",
    "title": {
     "tr": "Belgesel ve bilgi görseli (infografik): Nevruz",
     "en": "Documentaries and infographics: Nevruz"
    },
    "content": {
     "anlatim": "# Belgesel\n\n**Belgesel**, gerçek olay, kişi, yer ya da konuları **belgelere dayanarak**, gerçeğe sadık kalarak anlatan film ya da yayındır. Temada **Nevruz** konulu bir belgesel izlenir.\n\n| Özellik | Açıklama |\n|---|---|\n| Amaç | Bilgi vermek, farkındalık oluşturmak |\n| Kaynak | Uzman görüşleri, arşiv görüntüleri, tanıklıklar, yerinde çekimler |\n| Anlatım | **Dış ses** (anlatıcı), röportaj, müzik, harita ve grafiklerle desteklenir |\n| Dil | Öğretici; nesnel olmaya çalışır |\n\n# Nevruz\n\n**Nevruz** (“yeni gün”), baharın gelişini ve doğanın uyanışını kutlayan, **21 Mart** civarında Türk dünyası başta olmak üzere geniş bir coğrafyada kutlanan bayramdır. Türk kültüründe **Ergenekon'dan çıkış** anlatısıyla da ilişkilendirilir. Ateş üzerinden atlama, yumurta boyama, temizlik, bahar yemekleri gibi gelenekleri vardır. **UNESCO İnsanlığın Somut Olmayan Kültürel Mirası** listesinde yer alır (Türkiye'nin de aralarında bulunduğu ülkelerin ortak başvurusu).\n\n# Edebiyat Atölyesi: Bilgi Görseli (İnfografik)\n\n**İnfografik**, bilgiyi **metin, ikon, grafik, harita ve renkleri** birleştirerek kısa ve anlaşılır biçimde sunan görsel metindir.\n1. Belgeselden **ana bilgileri** not al (tarih, yer, gelenekler, anlamı).\n2. Bilgileri **gruplandır** (Ne? Nerede? Nasıl kutlanır?).\n3. Her grup için **kısa başlık + simge** belirle; uzun cümle yerine anahtar sözcük kullan.\n4. Okuma yönünü (yukarıdan aşağı, soldan sağa) ve **renk uyumunu** planla.\n5. **Kaynakları** infografiğin altına yaz.",
     "ornekler": [
      {
       "soru": "Belgeseli kurmaca bir filmden ayıran temel özellik nedir?",
       "cozum": "Belgesel **gerçek** olay, kişi ve yerleri **belgelere** (arşiv görüntüsü, tanıklık, uzman görüşü) dayanarak anlatır ve bilgi vermeyi amaçlar. Kurmaca film ise **hayal ürünü** bir olay örgüsünü sanatsal amaçla anlatır."
      },
      {
       "soru": "Nevruz belgeselinden yola çıkarak hazırlanacak bir infografikte hangi bölümler yer alabilir?",
       "cozum": "“Nevruz nedir?” (tanım, tarih: 21 Mart), “Nerede kutlanır?” (harita), “Gelenekler” (ateşten atlama, yumurta boyama — simgelerle), “Kültürel önemi” (UNESCO listesi) ve **kaynakça**. Bilgiler kısa ifadeler, ikonlar ve renklerle düzenlenir."
      }
     ],
     "ozet": [
      "Belgesel: gerçek konuları belgelere dayanarak anlatan öğretici film/yayın.",
      "Nevruz: 21 Mart, baharın gelişi; Ergenekon anlatısı; UNESCO somut olmayan kültürel miras.",
      "İnfografik: metin + ikon + grafik; bilgiyi grupla, kısa başlık ve simge kullan, kaynak yaz."
     ]
    }
   }
  ]
 },
 {
  "id": "u4",
  "name": {
   "tr": "4. Tema: Dilin Zenginliği",
   "en": "Theme 4: The Richness of Language"
  },
  "outcomes": [
   {
    "id": "k1",
    "code": "4.1",
    "title": {
     "tr": "Roman — \"Çalıkuşu\" (Reşat Nuri Güntekin)",
     "en": "The novel — \"The Wren\" (Reşat Nuri Güntekin)"
    },
    "content": {
     "anlatim": "# Okuma: \"Çalıkuşu\" — Reşat Nuri Güntekin\n\n- Türk edebiyatının en sevilen **sosyal romanlarından** biridir.\n- İstanbul'da neşeli, ele avuca sığmaz bir öğretmen adayı olan **Feride**'nin **Kâmran**'ın ihanetiyle yıkılması ve **Anadolu**'nun çeşitli köylerinde öğretmenlik yaparken geçirdiği büyük **ruhsal dönüşüm** anlatılır.\n- **Millî Edebiyat ve Anadolu:** Roman, İstanbul merkezli aydın ile **Anadolu gerçeğini** buluşturarak dönemin ideallerini yansıtır.\n- Roman büyük ölçüde **günlük/anı** biçiminde yazıldığı için üslubu içten ve samimidir.\n\n# Roman Türünün Özellikleri\n\n- İnsan ve toplum ilişkilerini, olayları **geniş bir zaman diliminde**, ayrıntılı mekân tasvirleriyle ele alan **uzun** anlatı türüdür.\n- Hikâyeye göre kişi kadrosu daha **kalabalık**, olay örgüsü daha **karmaşık**tır.\n\n| | İlk örnekler |\n|---|---|\n| Dünyada ilk modern roman | **Cervantes — \"Don Kişot\"** |\n| Türk edebiyatında ilk yerli roman | **Şemsettin Sami — \"Taaşşuk-ı Talat ve Fitnat\"** |\n| Türk edebiyatında ilk edebî roman | **Namık Kemal — \"İntibah\"** |\n\n### Roman – hikâye karşılaştırması\n\n| Roman | Hikâye |\n|---|---|\n| Uzun, geniş zaman dilimi | Kısa, dar zaman dilimi |\n| Kalabalık kişi kadrosu | Az sayıda kişi |\n| Ayrıntılı tasvirler | Ayrıntıya az yer verilir |",
     "ornekler": [
      {
       "soru": "\"Çalıkuşu\" romanı Millî Edebiyat anlayışını hangi yönüyle yansıtır?",
       "cozum": "İstanbullu bir aydının (Feride) **Anadolu'ya gidip** oranın gerçekleriyle tanışmasını anlatarak **Anadolu'yu edebiyatın merkezine** taşır; sade bir dil kullanır."
      },
      {
       "soru": "Türk edebiyatında ilk yerli roman ile ilk edebî romanı eşleştirin.",
       "cozum": "İlk yerli roman: **Taaşşuk-ı Talat ve Fitnat** (Şemsettin Sami). İlk edebî roman: **İntibah** (Namık Kemal)."
      }
     ],
     "ozet": [
      "Roman: uzun, geniş zaman, kalabalık kadro, ayrıntılı tasvir.",
      "İlk modern roman Don Kişot (Cervantes).",
      "İlk yerli roman Taaşşuk-ı Talat ve Fitnat; ilk edebî roman İntibah.",
      "Çalıkuşu: Feride'nin Anadolu'daki dönüşümü; günlük/anı formu."
     ]
    }
   },
   {
    "id": "k2",
    "code": "4.2",
    "title": {
     "tr": "Romanda anlatım teknikleri ve üslup",
     "en": "Narrative techniques and style in the novel"
    },
    "content": {
     "anlatim": "# Başlıca Anlatım Teknikleri\n\nNitelikli romanlarda yazar kurguyu güçlendirmek ve okurun dikkatini canlı tutmak için çeşitli tekniklere başvurur.\n\n| Teknik | Açıklama | İpucu |\n|---|---|---|\n| **Özetleme** | Uzun olayları veya zaman geçişlerini kısa paragraflarla aktarma | \"Aradan üç yıl geçti…\" |\n| **Diyalog** | Kahramanların karşılıklı konuşmalarına yer verme | Tırnak / konuşma çizgisi |\n| **İç çözümleme** | Anlatıcının araya girerek kahramanın zihninden geçenleri **okura aktarması** | 3. kişi: \"…diye düşünüyordu\" |\n| **Bilinç akışı** | Kahramanın düşüncelerinin **mantıksal bir sıra olmadan**, zihninden aktığı gibi verilmesi | Kopuk, çağrışımlı, noktalamasız cümleler |\n| **Geriye dönüş** | Şimdiki zamandan geçmişteki olaylara/hatıralara geçiş | \"Birden çocukluğu aklına geldi…\" |\n\n> **İç çözümleme ↔ bilinç akışı:** İç çözümlemede anlatıcı düşünceleri **düzenleyerek** aktarır; bilinç akışında düşünceler **düzensiz ve doğrudan** verilir.\n\n# Üslup (Biçem)\n\n- Sanatçının dili kullanırken gösterdiği **kişisel beceri ve seçimlerin bütünü**dür.\n- Üslubun temel ilkeleri: **açıklık, duruluk, yalınlık, özgünlük**.\n- Çalıkuşu günlük/anı formunda yazıldığı için **içten ve samimi** bir üsluba sahiptir.",
     "ornekler": [
      {
       "soru": "\"Feride o gece uyuyamadı; Kâmran'ın sözlerini, teyzesinin bakışlarını, okulun soğuk koridorlarını düşündü durdu.\" Bu cümlede hangi anlatım tekniği vardır?",
       "cozum": "Anlatıcı (3. kişi) kahramanın zihninden geçenleri **düzenli bir biçimde** okura aktarıyor → **iç çözümleme**."
      },
      {
       "soru": "\"Yağmur… annem… o mavi kapı, neden kapattılar, belki de hiç açık değildi…\" Bu ifadede hangi teknik kullanılmıştır?",
       "cozum": "Düşünceler **mantıksal sıra olmadan**, çağrışımlarla ve kopuk biçimde aktığı gibi verilmiş → **bilinç akışı**."
      }
     ],
     "ozet": [
      "Özetleme: zaman atlama; diyalog: karşılıklı konuşma.",
      "İç çözümleme: anlatıcı düşünceleri düzenleyerek aktarır.",
      "Bilinç akışı: düşünceler sırasız, aktığı gibi.",
      "Geriye dönüş: geçmişe dönüş.",
      "Üslubun ilkeleri: açıklık, duruluk, yalınlık, özgünlük."
     ]
    }
   },
   {
    "id": "k3",
    "code": "4.3",
    "title": {
     "tr": "Eleştiri — \"Parasız Yatılı\" (Mehmet Kaplan)",
     "en": "Criticism — \"Parasız Yatılı\" (Mehmet Kaplan)"
    },
    "content": {
     "anlatim": "# Okuma: \"Parasız Yatılı\" — Mehmet Kaplan\n\n- Mehmet Kaplan, **Füruzan**'ın \"Parasız Yatılı\" hikâyesini tahlil eder; edebî eser incelemesinin güzel örneklerindendir.\n- Eleştirmen, hikâyedeki **basit olayın** ve **yoksulluk** temasının sanatsal bir derinliğe nasıl kavuşturulduğunu inceler.\n- **Yaşantı hikâyesi:** Kaplan, Füruzan'ın hikâyesini klasik olay hikâyesinden ayırarak bir **\"yaşantı hikâyesi\"** olarak niteler.\n- Kazanım: eleştiri türünü tanıma; bir eseri **yapı, içerik ve üslup** yönünden değerlendirme.\n\n# Eleştiri (Tenkit) Türünün Özellikleri\n\n- Bir edebî eserin veya sanatçının **olumlu ve olumsuz** yönlerini, gerçek değerini **bilimsel ve estetik** ölçütlerle ortaya koyan yazı türüdür.\n- Batı edebiyatında **\"kritik\"** adıyla bilinir.\n- Türk edebiyatında **Tanzimat** Dönemi'nde **Namık Kemal**'in **\"Mukaddime-i Celâl\"** ve **\"Tahrib-i Harabat\"** gibi yazılarıyla önem kazanmıştır.\n- **Yapıcı** eleştiri eserin ve sanatçının gelişmesine katkı sağlar; eleştirmen kişisel kırgınlıklarla değil **ölçütlerle** hareket etmelidir.\n\n### Bir eseri değerlendirme ölçütleri\n\n1. **Yapı:** olay örgüsü, kişiler, zaman-mekân, bakış açısı\n2. **İçerik:** konu, tema, iletiler\n3. **Üslup:** dil, anlatım teknikleri, söz sanatları",
     "ornekler": [
      {
       "soru": "Eleştiri yazısının \"tanıtma yazısı\"ndan farkı nedir?",
       "cozum": "Tanıtma yazısı eseri yalnızca **tanıtıp okura önerir**; eleştiri ise eserin **olumlu ve olumsuz** yönlerini bilimsel ve estetik ölçütlerle **değerlendirir**."
      },
      {
       "soru": "Mehmet Kaplan \"Parasız Yatılı\"yı neden \"yaşantı hikâyesi\" olarak nitelendirir?",
       "cozum": "Hikâyede klasik olay hikâyesindeki gibi merak uyandıran bir olay örgüsü yerine, bir kişinin **iç yaşantısı** ve yoksulluk deneyimi öne çıkar; değer olaydan değil **yaşantının derinliğinden** gelir."
      }
     ],
     "ozet": [
      "Eleştiri: olumlu + olumsuz yönler, bilimsel ve estetik ölçüt.",
      "Batıda \"kritik\"; bizde Tanzimat'ta Namık Kemal ile önem kazandı.",
      "Değerlendirme: yapı, içerik, üslup.",
      "Kaplan: Füruzan'ın hikâyesi bir \"yaşantı hikâyesi\"dir."
     ]
    }
   },
   {
    "id": "k4",
    "code": "4.4",
    "title": {
     "tr": "Otobiyografi — \"Âşık Veysel\" belgeseli",
     "en": "Autobiography — the \"Âşık Veysel\" documentary"
    },
    "content": {
     "anlatim": "# Dinleme/İzleme: \"Âşık Veysel\" Belgeseli\n\n- Âşık Veysel'in kendi ağzından hayat hikâyesini anlattığı belgesel/otobiyografik anlatıdır.\n- **Halk ozanlığının** derinliği; **yedi yaşında çiçek hastalığı** nedeniyle gözlerini kaybetmesi ve **babasının hediye ettiği sazla** başlayan sanat yolculuğu anlatılır.\n\n# Otobiyografi Türünün Özellikleri\n\n- Bir kişinin **kendi yaşam öyküsünü** (hayatını, deneyimlerini, başarılarını) **birinci tekil kişi** ağzından anlattığı türdür.\n- **Gerçeğe bağlılık** esastır ancak anlatılanlar yazarın **kendi süzgecinden** geçer (öznel).\n\n### Biyografi – otobiyografi – anı\n\n| | Biyografi | Otobiyografi | Anı |\n|---|---|---|---|\n| Kimin hayatı? | **Başkasının** | **Kendisinin** | Yazarın yaşadığı/tanık olduğu **olaylar** |\n| Anlatım kişisi | 3. kişi | 1. kişi | 1. kişi |\n| Bakış | Tarafsızlık amaçlanır | Öznel | Öznel |\n| Odak | Hayatın bütünü | Hayatın bütünü | Belirli olaylar ve dönem |",
     "ornekler": [
      {
       "soru": "Bir yazar, ünlü bir bilim insanının doğumundan ölümüne kadar hayatını belgelere dayanarak anlatıyor. Bu metin hangi türdür?",
       "cozum": "Başkasının hayatı, 3. kişi ağzından ve belgelere dayanarak anlatılıyor → **biyografi**."
      },
      {
       "soru": "Otobiyografi ile anı arasındaki fark nedir?",
       "cozum": "Otobiyografi kişinin **hayatının bütününü** merkeze alır; anı ise yazarın yaşadığı veya tanık olduğu **belirli olayları ve dönemi** anlatır, yazar kadar çevresindeki olaylar da önemlidir."
      }
     ],
     "ozet": [
      "Otobiyografi: kişi kendi hayatını 1. kişi ağzından anlatır.",
      "Biyografi: başkasının hayatı, 3. kişi, tarafsızlık.",
      "Anı belirli olaylara, otobiyografi hayatın bütününe odaklanır.",
      "Âşık Veysel: 7 yaşında çiçek hastalığıyla görme kaybı, babasının hediye ettiği saz."
     ]
    }
   },
   {
    "id": "k5",
    "code": "4.5",
    "title": {
     "tr": "Yıl sonu genel değerlendirme",
     "en": "End-of-year general review"
    },
    "content": {
     "anlatim": "# Yıl Sonu Genel Değerlendirme\n\n9. sınıf boyunca dört tema işlendi: **Sözün İnceliği, Anlam Arayışı, Anlamın Yapı Taşları, Dilin Zenginliği**. Edebiyatın güzel sanatlar içindeki yerinden başlanarak şiir tahlili ile **sanatsal** ve **öğretici** metin türleri yapı ve üslup özellikleriyle incelendi.\n\n### Türlerin genel haritası\n\n| Tür | Grup | Okunan metin |\n|---|---|---|\n| Şiir | Sanatsal (kurmaca) | \"San'at\" — Faruk Nafiz Çamlıbel |\n| Hikâye | Sanatsal (kurmaca) | \"Bir Kavak ve İnsanlar\", \"Hişt Hişt!\", \"Eskici\" |\n| Roman | Sanatsal (kurmaca) | \"Çalıkuşu\" — Reşat Nuri Güntekin |\n| Deneme | Öğretici | \"Picasso'nun Hatları\" — Rasim Özdenören |\n| Anı | Öğretici | \"Nihayet Beklediğimiz Büyük Gün\" — H. N. Zorlutuna |\n| Gezi yazısı | Öğretici | \"Bizim Akdeniz\" — Falih Rıfkı Atay |\n| Eleştiri | Öğretici | \"Parasız Yatılı\" — Mehmet Kaplan |\n| Otobiyografi | Öğretici | \"Âşık Veysel\" belgeseli |\n\n### Temel kazanımlar\n\n- Türkçenin zengin **söz varlığını**, yapım eklerini ve ses olaylarını kavrama.\n- Metinler arası karşılaştırmalar yaparak **açık ve örtük iletileri** çözme.\n- Yazılı ve sözlü anlatım kurallarına uygun olarak **sunum, bilgi görseli ve otobiyografi** hazırlama.",
     "ornekler": [
      {
       "soru": "Aşağıdaki türleri sanatsal ve öğretici olarak ayırın: roman, anı, şiir, gezi yazısı, eleştiri, hikâye.",
       "cozum": "**Sanatsal (kurmaca):** roman, şiir, hikâye. **Öğretici:** anı, gezi yazısı, eleştiri."
      },
      {
       "soru": "Hangi okuma metni hangi türün örneğidir: \"Eskici\", \"Bizim Akdeniz\", \"Parasız Yatılı\" (Mehmet Kaplan)?",
       "cozum": "\"Eskici\" → **hikâye**; \"Bizim Akdeniz\" → **gezi yazısı**; Mehmet Kaplan'ın \"Parasız Yatılı\" yazısı → **eleştiri**."
      }
     ],
     "ozet": [
      "4 tema: Sözün İnceliği, Anlam Arayışı, Anlamın Yapı Taşları, Dilin Zenginliği.",
      "Sanatsal: şiir, hikâye, roman · Öğretici: deneme, anı, gezi, eleştiri, otobiyografi.",
      "Her metinde açık ve örtük iletileri ayırt etmeyi unutma."
     ]
    }
   },
   {
    "id": "k6",
    "code": "4.6",
    "title": {
     "tr": "Ara metin: tiyatro ve temel unsurları",
     "en": "Intermediate text: drama and its basic elements"
    },
    "content": {
     "anlatim": "# Tiyatro\n\n**Tiyatro**, bir olayın **sahnede**, oyuncular aracılığıyla **diyalog ve hareketle** canlandırılmak üzere yazılmış edebî türdür. Okunmak kadar **izlenmek** için yazılır.\n\n| Unsur | Açıklama |\n|---|---|\n| **Olay örgüsü** | Sahnelenen olaylar zinciri; giriş – gelişme (çatışma) – sonuç |\n| **Kişiler** | Oyuncuların canlandırdığı karakterler; **kişi kadrosu** metnin başında verilir |\n| **Diyalog / monolog** | Kişilerin karşılıklı konuşması / kişinin tek başına konuşması |\n| **Sahne ve dekor** | Olayın geçtiği yerin sahnede canlandırılması |\n| **Yan metin (sahne yönergesi)** | Ayraç içinde verilen, kişilerin hareketlerini, ses tonunu, ışık ve dekoru anlatan açıklamalar |\n| **Perde ve sahne** | Oyunun bölümleri |\n\n## Türleri\n\n- **Trajedi:** Soylu kişilerin acıklı yazgısı; ağır dil.\n- **Komedi:** Toplumun ve insanın gülünç yönleri; eğlendirirken düşündürür.\n- **Dram:** Trajedi ile komedinin karışımı; günlük hayattan kişiler.\n\n## Geleneksel Türk Tiyatrosu\n\n**Karagöz** (gölge oyunu), **orta oyunu**, **meddah** ve **köy seyirlik oyunları**; doğaçlamaya dayanır, sahne yönergesi ve yazılı metni yoktur.\n\n> Romanda olaylar **anlatıcı** aracılığıyla aktarılır; tiyatroda anlatıcı yoktur, olay **diyalog ve hareketle** gösterilir.",
     "ornekler": [
      {
       "soru": "Bir tiyatro metninde “(Kapıya doğru yürür, durur, sesini alçaltarak.)” ifadesi hangi unsura örnektir? İşlevi nedir?",
       "cozum": "**Yan metin (sahne yönergesi).** Oyuncuya ve yönetmene karakterin **hareketini ve ses tonunu** gösterir; okuyucunun sahneyi zihninde canlandırmasını sağlar."
      },
      {
       "soru": "Karagöz oyununu modern tiyatrodan ayıran özellikler nelerdir?",
       "cozum": "Karagöz bir **gölge oyunudur**; yazılı bir metne değil **doğaçlamaya** dayanır, sahne yönergesi yoktur, tek bir hayalî (oynatıcı) tüm karakterleri seslendirir ve kalıplaşmış bölümleri (mukaddime, muhavere, fasıl, bitiş) vardır."
      }
     ],
     "ozet": [
      "Tiyatro: sahnelenmek için yazılır; diyalog ve hareket esastır, anlatıcı yoktur.",
      "Unsurlar: olay örgüsü, kişiler, diyalog/monolog, dekor, yan metin, perde.",
      "Türler: trajedi, komedi, dram; geleneksel: Karagöz, orta oyunu, meddah."
     ]
    }
   },
   {
    "id": "k7",
    "code": "4.7",
    "title": {
     "tr": "Dilimizin zenginlikleri: söz varlığı ve sosyal medya dili",
     "en": "The richness of our language: vocabulary and social media language"
    },
    "content": {
     "anlatim": "# Söz Varlığı\n\nBir dilin **sözcükleri, deyimleri, atasözleri, kalıp sözleri ve terimlerinin** tamamıdır. Söz varlığı ne kadar zenginse duygu ve düşünceler o kadar **ince ayrımlarla** ifade edilir.\n\n| Unsur | Tanım | Örnek |\n|---|---|---|\n| **Deyim** | Genellikle mecaz anlamlı, kalıplaşmış söz öbeği | **Kulak asmamak**, **gözden düşmek** |\n| **Atasözü** | Uzun deneyimlere dayanan, öğüt veren, kalıplaşmış özlü söz | **Damlaya damlaya göl olur.** |\n| **İkileme** | Anlatımı güçlendirmek için sözcüklerin tekrarı ya da eş/zıt anlamlıların birlikte kullanımı | **yavaş yavaş, er geç, eşe dosta** |\n| **Kalıp söz** | Belirli durumlarda kullanılan sözler | **Geçmiş olsun, kolay gelsin, eline sağlık** |\n| **Terim** | Bir bilim, sanat ya da meslek alanına özgü sözcük | **fotosentez, kafiye, ivme** |\n\n# Edebî Dil ile Sosyal Medya Dili\n\n| Edebî dil | Sosyal medya dili |\n|---|---|\n| Zengin söz varlığı, imge ve söz sanatları | Kısa, hızlı, çoğu zaman kısaltmalı (slm, tşk) |\n| Yazım ve noktalama kurallarına uyulur | Kurallar çoğu zaman göz ardı edilir |\n| Kalıcıdır, estetik hazza yöneliktir | Anlık iletişime yöneliktir; emoji ve görselle desteklenir |\n| Türkçe karşılıklar tercih edilir | Yabancı sözcükler sık kullanılır (story, like) |\n\n**Konuşma etkinliği (“Dilimizin Zenginlikleri”):** Sosyal medya dilini edebî dilin özellikleri açısından eleştirirken **örnek** ver, **karşılaştır** ve yabancı sözcüklerin **Türkçe karşılıklarını** öner (beğeni, paylaşım, hikâye, çevrim içi).",
     "ornekler": [
      {
       "soru": "“Sınava bir gün kala ders çalışmaya başlayınca iş işten geçmişti.” cümlesindeki deyimi bulup anlamını yazınız.",
       "cozum": "**İş işten geçmek**: Bir şeyi yapmak ya da düzeltmek için uygun zamanın kaçmış olması."
      },
      {
       "soru": "“Bugünkü toplantı postponed oldu, linki story'de paylaştım.” cümlesini söz varlığı açısından değerlendirip Türkçe karşılıklarla yeniden yazınız.",
       "cozum": "Cümlede gereksiz **yabancı sözcükler** (postponed, link, story) kullanılmıştır. Doğrusu: “Bugünkü toplantı **ertelendi**, **bağlantıyı hikâyede** paylaştım.” Türkçede karşılığı olan sözcüklerin kullanılması dilin zenginliğini korur."
      }
     ],
     "ozet": [
      "Söz varlığı: sözcük, deyim, atasözü, ikileme, kalıp söz, terim.",
      "Deyim mecazlı söz öbeği; atasözü öğüt veren özlü söz.",
      "Sosyal medya dili kısaltmalı ve kuralsız olabilir; Türkçe karşılıklar tercih edilmelidir."
     ]
    }
   }
  ]
 }
];
