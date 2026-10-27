# -*- coding: utf-8 -*-
r"""9. Sınıf Tarih — 1.43 eki: İlk Türk devletleri, İslamiyet'in doğuşu ve ilk Türk-İslam devletleri (TYT/AYT kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from common import O, U

YENI = [U("u4", "4. Ünite (Ek): İlk Türk Devletleri ve Türk-İslam Devletleri", "Unit 4 (Extra): Early Turkic States and Turkic-Islamic States", [

O("k1", "TAR.9.E1", "İlk Türk devletleri: Asya Hun, Kök Türk ve Uygur", "Early Turkic states: Asian Huns, Göktürks and Uyghurs", r"""
# Asya Hun Devleti
- Bilinen **ilk Türk devletidir**; en parlak dönemi **Mete Han** zamanıdır. Mete Han orduyu **onlu sisteme** göre teşkilatlandırdı (bu sistem bugün de kullanılır).
- Çin'le mücadele ettiler; Çinliler Hun akınlarına karşı **Çin Seddi**'ni yaptı.

# Kök Türk (Göktürk) Devleti
- **Türk** adıyla kurulan ilk devlettir (552, Bumin Kağan). Doğu ve Batı olarak ikiye ayrıldı.
- **Orhun (Göktürk) Yazıtları** (Kül Tigin, Bilge Kağan, Tonyukuk adına) **Türk adının geçtiği ve Türk alfabesiyle yazılmış ilk yazılı belgelerdir**; devlet anlayışını, kağanın halka karşı sorumluluğunu anlatır.
- II. Kök Türk Devleti'ni Kutluk Kağan kurdu.

# Uygur Devleti
- **Yerleşik hayata geçen** ilk Türk devletidir; tarım, ticaret ve kalıcı mimari (saray, tapınak) gelişti.
- **Mani dinini** benimsediler; bu, savaşçı özelliklerini zayıflattı. Kendi **Uygur alfabesini** kullandılar ve **matbaayı** kullanan ilk Türk topluluğu oldular.

# Ortak Özellikler
**Kut** anlayışı (yönetme yetkisinin Tanrı'dan verildiğine inanılması), **töre** (yazısız hukuk), **kurultay** (danışma meclisi), **ikili teşkilat** (devletin doğu ve batı olarak yönetilmesi), **Gök Tanrı** inancı ve konargöçer hayat.
""",
 [(r"Türk adının geçtiği ilk yazılı belge hangisidir?", r"**Orhun (Göktürk) Yazıtları**."),
  (r"Uygurların Mani dinini benimsemesinin sonucu ne olmuştur?", r"Et yemeyi yasaklayan bu dinin etkisiyle **savaşçı özellikleri zayıflamış**, yerleşik hayata geçiş hızlanmıştır.")],
 [r"Asya Hun: ilk Türk devleti, Mete Han, onlu sistem.", r"Kök Türk: Türk adıyla kurulan ilk devlet; Orhun Yazıtları.",
  r"Uygur: yerleşik hayat, Mani dini, Uygur alfabesi, matbaa.", r"Ortak: kut, töre, kurultay, ikili teşkilat."]),

O("k2", "TAR.9.E2", "İslamiyet'in doğuşu ve yayılışı", "The rise and spread of Islam", r"""
# İslamiyet Öncesi Arabistan
Mekke önemli bir **ticaret** ve inanç merkeziydi (Kâbe); kabile yaşamı ve kan davaları yaygındı; siyasi birlik yoktu.

# Hz. Muhammed Dönemi (610–632)
- **610**'da peygamberlik; Mekke'de baskılar üzerine **622**'de Medine'ye **hicret** (hicri takvimin başlangıcı).
- Medine'de ilk İslam devleti örgütlendi; **Bedir**, **Uhud**, **Hendek** savaşları; **Hudeybiye Antlaşması** (628) Müslümanların siyasi varlığının Mekkeliler tarafından tanınmasıdır; **630**'da Mekke'nin fethi.

# Dört Halife Dönemi (632–661)
Halifeler seçimle iş başına geldi. İslamiyet Arap Yarımadası dışına yayıldı (İran, Suriye, Mısır); **Kur'an-ı Kerim** kitap hâline getirilip çoğaltıldı.

# Emevîler (661–750) ve Abbasîler (750–1258)
- **Emevîler:** Halifelik **saltanata** dönüştü; **Arap milliyetçiliği** (mevali politikası) Arap olmayan Müslümanları rahatsız etti ve Türklerle ilişkileri olumsuz etkiledi.
- **Abbasîler:** Arap olmayan Müslümanlara eşit davrandı; **Talas Savaşı** (751) ile Türkler ve Müslümanlar Çinlilere karşı birlikte savaştı → Türklerin **İslamiyet'e geçişi** hızlandı. **Bağdat**'taki **Beytü'l-Hikme** bilim merkezi oldu. Abbasî sarayında Türk askerlerinin etkisi arttı (Samarra şehri).
""",
 [(r"Talas Savaşı'nın Türk tarihi açısından önemi nedir?", r"Türklerle Müslüman Araplar arasındaki ilişkileri düzeltmiş ve **Türklerin İslamiyet'e geçişini hızlandırmıştır**."),
  (r"Hudeybiye Antlaşması'nın önemi nedir?", r"Mekkelilerin, Medine'deki Müslümanların **siyasi varlığını resmen tanıması**dır.")],
 [r"622 Hicret, hicri takvimin başlangıcıdır.", r"Hudeybiye (628): Müslümanların siyasi varlığı tanındı; 630 Mekke'nin fethi.",
  r"Emevîler Arap milliyetçiliği uyguladı; Abbasîler eşitlikçiydi.", r"Talas (751) Türklerin İslamiyet'e geçişini hızlandırdı."]),

O("k3", "TAR.9.E3", "İlk Türk-İslam devletleri: Karahanlılar, Gazneliler ve Büyük Selçuklu", "The first Turkic-Islamic states: Karakhanids, Ghaznavids and Great Seljuks", r"""
# Karahanlılar (840–1212)
- **İslamiyet'i resmî din olarak kabul eden ilk Türk devletidir** (Satuk Buğra Han).
- Türk dili ve kültürü korundu: **Kutadgu Bilig** (Yusuf Has Hacib — ideal devlet yöneticisi), **Divânu Lugâti't-Türk** (Kaşgarlı Mahmud — Türkçenin Arapça kadar zengin olduğunu göstermek için yazılmış ilk Türkçe sözlük), **Atabetü'l-Hakayık** (Edip Ahmet Yükneki).
- **Ribat** (kervansaray) ve medrese yapıları; mimaride Türk-İslam sentezi.

# Gazneliler (963–1187)
- En parlak dönemi **Gazneli Mahmut**: **Hindistan seferleri** ile İslamiyet'i Hindistan'a yaydı; "**sultan**" unvanını kullanan ilk Türk hükümdarı sayılır.
- Bilgin ve sanatçıları himaye ettiler: **Firdevsi** (Şehnâme), **Bîrûnî**.
- **Dandanakan Savaşı** (1040) ile Selçuklulara yenildiler.

# Büyük Selçuklu Devleti (1040–1157)
- Dandanakan zaferiyle kuruldu (Tuğrul ve Çağrı Beyler). **1071 Malazgirt Zaferi** ile Anadolu'nun kapıları Türklere açıldı.
- **Nizamiye Medreseleri** (Vezir Nizâmülmülk) ilk devlet destekli yükseköğretim kurumlarıdır; Nizâmülmülk *Siyasetnâme*'yi yazdı.
- **Abbasî halifesini Büveyhoğulları baskısından kurtararak** İslam dünyasının siyasi liderliğini üstlendiler.
- **Katvan Savaşı** (1141) ve Oğuz isyanları zayıflattı; devlet **1157**'de Sultan Sencer'in ölümüyle dağıldı.
""",
 [(r"İslamiyet'i resmî din olarak kabul eden ilk Türk devleti hangisidir?", r"**Karahanlılar** (Satuk Buğra Han döneminde)."),
  (r"Divânu Lugâti't-Türk hangi amaçla yazılmıştır?", r"Türkçenin **Arapça kadar zengin bir dil olduğunu** göstermek ve Araplara Türkçeyi öğretmek amacıyla (Kaşgarlı Mahmud).")],
 [r"Karahanlılar İslamiyet'i resmî din kabul eden ilk Türk devleti; Kutadgu Bilig ve Divânu Lugâti't-Türk.", r"Gazneli Mahmut: Hindistan seferleri, sultan unvanı.",
  r"Büyük Selçuklu: Dandanakan (1040) ile kuruldu, Malazgirt (1071) ile Anadolu'ya açıldı.", r"Nizamiye Medreseleri devlet destekli ilk yükseköğretim kurumlarıdır."]),
])]
