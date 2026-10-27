# -*- coding: utf-8 -*-
r"""10. Sınıf Kimya — 1.42 eki: Karışımlar ve ayırma; asitler, bazlar ve tuzlar (TYT kapsamı).
Metinler özgün olarak yazılmıştır; resmî ders kitabı ya da program metni kopyalanmamıştır."""
from _c import O, U

YENI = [U("u5", "4. Tema (Ek): Karışımlar; Asitler, Bazlar ve Tuzlar", "Theme 4 (Extra): Mixtures; Acids, Bases and Salts", [

O("k1", "KİM.10.E1", "Karışımlar ve ayırma teknikleri", "Mixtures and separation techniques", r"""
# Karışım Nedir?
İki ya da daha fazla maddenin **kimyasal özelliklerini kaybetmeden**, istenilen oranda bir araya gelmesidir. Karışımın belirli bir formülü, erime-kaynama noktası yoktur; bileşenler **fiziksel yollarla** ayrılabilir.
- **Homojen karışım (çözelti):** Her yerinde aynı özellik gösterir (tuzlu su, hava, alaşımlar).
- **Heterojen karışım:** Bileşenler ayırt edilebilir.
  - **Süspansiyon** (katı–sıvı): tebeşir tozu–su, ayran
  - **Emülsiyon** (sıvı–sıvı): zeytinyağı–su, mayonez
  - **Aerosol** (katı/sıvı–gaz): sis, deodorant spreyi
  - **Kolloit:** Tanecik boyutu çözelti ile süspansiyon arasında (jöle, süt); ışığı saçar (**Tyndall etkisi**).

# Ayırma Teknikleri
| Ayırmada kullanılan özellik | Yöntem | Örnek |
|---|---|---|
| Tanecik boyutu | **Süzme**, eleme, diyaliz | Kum–su, un eleme |
| Özkütle | **Yüzdürme**, ayırma hunisi, santrifüj, dekantasyon | Zeytinyağı–su, kan bileşenleri |
| Çözünürlük farkı | **Kristallendirme**, ekstraksiyon (özütleme) | Tuz–kum (suda çöz, süz, buharlaştır), çay demleme |
| Kaynama noktası farkı | **Basit / ayrımsal damıtma** | Ham petrolün rafinerilerde ayrılması, alkol–su |
| Erime noktası farkı | Ayrımsal erime | Alaşımların geri kazanımı |
| Manyetik özellik | **Mıknatısla ayırma** | Demir tozu–kükürt |
""",
  [(r"Tuz, kum ve demir tozundan oluşan bir karışımın bileşenleri hangi sırayla ayrılabilir?",
    r"1) **Mıknatısla** demir tozu alınır. 2) Kalan karışım **suda çözülür** ve **süzülür**: kum süzgeçte kalır. 3) Süzüntüdeki su **buharlaştırılarak** tuz elde edilir."),
   (r"Ham petrol rafineride hangi özellik farkıyla ayrılır?",
    r"Bileşenlerin **kaynama noktası farkıyla**; yöntem **ayrımsal (fraksiyonlu) damıtmadır**.")],
  [r"Karışımda bileşenler özelliklerini korur, fiziksel yollarla ayrılır.", r"Homojen = çözelti; heterojen = süspansiyon, emülsiyon, aerosol; kolloit Tyndall etkisi gösterir.",
   r"Süzme boyuta, ayırma hunisi özkütleye, damıtma kaynama noktasına, kristallendirme çözünürlüğe dayanır."]),

O("k2", "KİM.10.E2", "Asitler, bazlar ve tuzlar; nötralleşme ve günlük hayat", "Acids, bases and salts; neutralisation in daily life", r"""
# Asit ve Baz Tanımları
- **Arrhenius:** Suda çözündüğünde $\text{H}^+$ (ya da $\text{H}_3\text{O}^+$) iyonu veren madde **asit**, $\text{OH}^-$ iyonu veren madde **bazdır**.
- **Brønsted–Lowry:** Proton ($\text{H}^+$) veren **asit**, proton alan **bazdır** ($\text{NH}_3$ da bu tanıma göre bazdır).

# Özellikler
| Asitler | Bazlar |
|---|---|
| Ekşi tatlıdır (tadına bakılmaz!) | Acı tatlıdır, ele kayganlık hissi verir |
| Mavi turnusolü **kırmızıya** çevirir | Kırmızı turnusolü **maviye** çevirir |
| $\text{pH} < 7$ | $\text{pH} > 7$ |
| Aktif metallerle $\text{H}_2$ gazı açığa çıkarır | Amfoter metallerle (Al, Zn) $\text{H}_2$ çıkarır |
| Örnek: HCl (tuz ruhu), $\text{H}_2\text{SO}_4$, sirke asidi | Örnek: NaOH (sud kostik), $\text{NH}_3$, sabun |

- **Kuvvetli** asit/bazlar suda **tamamen** iyonlaşır (HCl, NaOH); zayıflar kısmen iyonlaşır ($\text{CH}_3\text{COOH}$, $\text{NH}_3$).

# pH
$\text{pH} = 7$ nötr; değer küçüldükçe asitlik artar. pH'ın 1 birim azalması $\text{H}^+$ derişiminin **10 kat** artması demektir.

# Nötralleşme ve Tuzlar
$$\text{Asit} + \text{Baz} \rightarrow \text{Tuz} + \text{Su}, \qquad \text{HCl} + \text{NaOH} \rightarrow \text{NaCl} + \text{H}_2\text{O}$$
Tepkime **ekzotermiktir** (ısı açığa çıkar).

# Günlük Hayatta
- Mide asidinin fazlası (**mide ekşimesi**) bazik antasitlerle giderilir.
- Arı sokması (asidik) karbonatlı suyla, eşek arısı sokması (bazik) sirkeyle hafifletilebilir.
- Asidik topraklara **kireç** eklenir. **Asit yağmurları** ($\text{SO}_2$, $\text{NO}_x$ kaynaklı) tarihî yapıları aşındırır.
- **Güvenlik:** Çamaşır suyu (hipoklorit) ile tuz ruhu (HCl) **asla karıştırılmamalıdır**; zehirli klor gazı oluşur. Asit seyreltilirken **asit suya** eklenir.
""",
  [(r"pH'ı 3 olan bir çözeltinin $\text{H}^+$ derişimi, pH'ı 5 olan çözeltininkinin kaç katıdır?",
    r"pH farkı 2 birim → $10^2 = $ **100 katı**."),
   (r"Temizlik yaparken çamaşır suyu ile tuz ruhunun karıştırılması neden tehlikelidir?",
    r"Hipoklorit ile hidroklorik asit tepkimeye girerek **zehirli klor gazı** ($\text{Cl}_2$) açığa çıkarır; solunum yollarına ciddi zarar verir.")],
  [r"Asit suda $\text{H}^+$, baz $\text{OH}^-$ verir (Arrhenius); Brønsted–Lowry'de asit proton verir, baz alır.", r"pH < 7 asidik, = 7 nötr, > 7 bazik; 1 birim = 10 kat.",
   r"Asit + baz → tuz + su (nötralleşme, ekzotermik).", r"Çamaşır suyu ile tuz ruhu karıştırılmaz; asit suya eklenir."]),
])]
