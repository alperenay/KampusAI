# Müfredat veri paketi ve içerik çekme şablonları

Bu paket, Adım 2'de istenen **modüler JSON / şablon sistemi** seçeneğidir. Mevcut uygulamanın ders notlarını kayıpsız dışa aktarır, resmî program referanslarını toplar ve yeni notların hangi kaynak/çıktıya göre yazılacağını belirtir. Uygulamanın çalışan ders ağacını veya öğrencinin ilerleme anahtarlarını kendiliğinden değiştirmez.

**Bu paket bütün MEB kazanımları için tamamlanmış, uzman onaylı ders notları değildir.** Kazanım kodu bulunması, metnin o kazanımı doğru ve bütünüyle öğrettiği anlamına gelmez. Eksik metinleri boş taslak olarak açıkça gösterir; yer tutucuları tamamlanmış içerik saymaz.

## Kapsam ve dosyalar

| Dosya/klasör | İçerik |
|---|---|
| `manifest.json` | Sınıf → ders modülleri, sayılar ve SHA-256 özetleri |
| `notes/9` … `notes/12` | Projedeki 47 sınıf/ders modülü, 244 ünite ve 808 ders notu; anlatım, çözümlü örnekler ve özet |
| `official/` | 30 Ekim 2026 tarihli TYMM genel ortaöğretim portalının 27 ders programı; 65 sınıf/ders veya seçmeli modülü, 308 ünite, 2.619 **ünite içi kod referansı** |
| `official/electives/` | Portalın sınıf belirtmeden yayımladığı seçmeliler; bütün sınıflara otomatik atanmaz |
| `official/program-catalogue.json` | MEB program kataloğundaki adlar ve resmî bağlantılar; farklı kademeler ayrı programlardır |
| `pdf-index/` | 13 resmî PDF programının sayfa ve kod adayları; önceki programlar, Din Kültürü, Almanca ve Sağlık için ek referans |
| `authoring/` | Her HTML kazanım referansı için doldurulabilir JSON not şablonu |
| `coverage.json` | Kod eşleşme adayları, tekrarlar ve açık kalan kapsam maddeleri |
| `lesson.schema.json` | JSON Schema 2020-12 not biçimi; taslak ve incelenmiş not koşulları |
| `adapter.mjs` | JSON'u mevcut uygulamanın `{id, name, outcomes}` biçimine çeviren isteğe bağlı adaptör |
| `validate-lesson.mjs` | Boş/incelemesiz/hakları belirsiz taslakların yayımlanmasını engelleyen doğrulayıcı |

Sayılar **tekil bütün MEB kazanımlarının sayısı değildir**: İngilizcenin hazırlıklı/hazırlıksız programları ayrıdır; edebiyatın aynı beceri kodu farklı temalarda tekrar eder. Resmî anahtar için `program + grade + unitId + officialCode` birlikte kullanılmalıdır. Okul türlerine özgü bütün meslek, imam hatip, güzel sanatlar ve spor programları bu genel lise eşlemesine dâhil değildir.

## Program yılı ve eşleme bulguları

- [2026–2027 resmî çerçeve plan açıklaması](https://tymm.meb.gov.tr/taslak-cerceve-planlari/ortaogretim), TYMM'nin hazırlık/9/10'da sürüp 11'de başlayacağını belirtir. 12. sınıfın önceki programları, seçmeliler ve okul türü ayrıca kontrol edilmelidir; portalda 12. sınıf TYMM sayfası bulunması o yıl yürürlükte olduğu anlamına gelmez.
- [11. sınıf Matematik](https://tymm.meb.gov.tr/ogretim-programlari/matematik-dersi/13) ile [Temel Matematik](https://tymm.meb.gov.tr/ogretim-programlari/ders/temel-matematik-dersi) ayrı tutulmuştur. Projedeki 11. sınıf matematik metinlerinin Temel Matematik ağırlıklı olması otomatik eşlemeye uygun değildir.
- Mevcut 808 nottan resmî HTML kodlarıyla 253 **referans eşleşme adayı** bulunur. Bu bir başarı/kapsama yüzdesi değildir. Bağımsız içerik ve sürüm incelemesi yapılmadığından doğrulanmış eşleme sayısı sıfırdır.
- Portal Sağlık Bilgisi programı için HTML ünite listesi döndürmemiştir; `emptySourceModules` alanı bunu saklamaz. [Resmî PDF kaynağı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=2217) ayrıca indekslenmiştir.
- Din Kültürü ve Almanca için [2026 Din Kültürü programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=2153), [önceki Din Kültürü programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=319) ve [Almanca programı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=333) referansları eklenmiştir. Dil seviyeleri sınıfa varsayılarak atanmaz.
- PDF kodları, tüm metin içinden makineyle çıkarılmış **adaylardır**; örneklerde geçen kodları da içerebilir. Sayfa referansı kontrol edilmeden resmî kazanım kaydı veya ders kapsamı sayılmaz. PDF metinleri ve kitap resimleri bu pakete alınmaz.

## Yeniden üretim

Proje kökünde, Python 3.10+ ve Node.js ile:

```powershell
# MEB'in herkese açık HTML/JSON uçları: ilk çalıştırmada internet gerekir.
python tools/sync-meb-curriculum.py
# Kaynakları yeniden almak için: python tools/sync-meb-curriculum.py --refresh

# PDF ek indeksi: pypdf 6.x gerektirir. Codex paketli Python'u da kullanılabilir.
python tools/sync-meb-pdf-index.py

# Mevcut notları modüler JSON'a aktar ve eşleme/şablon raporunu üret.
node tools/build-curriculum-dataset.mjs
node tools/curriculum-check.mjs
python tools/test_meb_curriculum.py
```

MEB uçları sitenin kendi kullandığı uçlardır; resmî, sürüm garantili bir geliştirici API'si değillerdir. Kaynak değişirse ayrıştırıcı ve sonuçlar yeniden incelenir. İndirmeler `tmp/meb-*` klasörlerinde tutulur; bu önbellek Git'e girmez. Ağ/sayfa hatası başarı sayılmaz. Çekici yalnız izin verilen iki resmî alan adına gider, zaman aşımı ve boyut sınırı uygular.

`build-curriculum-dataset.mjs`, düzenlenmiş `authoring` dosyalarının üzerine boş taslak yazmaz; koruduğu dosyaları raporlar. Yeni kodlar için şablon güncellemesi gerekiyorsa düzenlenmiş taslakların ayrı kopyasını saklayıp farkları inceleyin. Kaynak notların asıl düzenleme yeri mevcut `js/data/content/*.js` dosyalarıdır; `notes/` otomatik çıktıdır.

## Uygulamaya entegrasyon

Bu aşamada JSON paketi uygulama açılışına bağlanmadı ve sürüm yayımlanmadı. İlk yüklemede bütün notları indirmek yerine gereken sınıf/dersi yükleyin. Dağıtım aşamasında seçilen `curriculum/notes`, adaptör ve manifesti uygulamanın statik dosyalarına/çevrimdışı önbelleğine ekleyin. Paket, proje kökündeki ayrı klasördedir; mevcut web derleyicisi bunu kendiliğinden kopyalamaz.

```js
import {loadModule} from './curriculum/adapter.mjs';
const controller = new AbortController();
const units = await loadModule(
  new URL('./curriculum/', document.baseURI),
  9,
  'matematik',
  {signal: controller.signal}
);
// units mevcut App.data.content['9/matematik'] biçimindedir.
// Mevcut App.content yükleyicisiyle entegrasyonu tek bir yerde yapın;
// hem eski JS dosyasını hem JSON'u aynı anda içe aktarmayın.
```

`9/matematik/t1/k1` gibi eski anahtarlar aynen korunur; test, QR, hap kart ve ilerleme kayıtlarının kimliklerini dönüştürmez. `official` ünite numaralarını mevcut `u1/t1/k1` kimlikleri yerine otomatik geçirmek eski öğrenci kayıtlarını koparacağından yapılmaz.

## Yeni ders notu tamamlama akışı

1. Doğru programı, sınıfı, okul türünü ve yılı seçin. İlgili `authoring/<sınıf>/<program>.json` içindeki notu açın; yanında resmî ünite bağlantısı vardır.
2. `title`, `content.anlatim`, `content.ornekler` ve `content.ozet` alanlarını özgün anlatımla doldurun. Şema mevcut Markdown + LaTeX biçimini korur.
3. Çıktının süreç bileşenlerini de kaynak sayfadan kontrol edin; yalnız konu başlığını açıklamak yeterli sayılmaz. Çözümlü örneklerin hesaplarını, birimlerini ve formüllerini bağımsız doğrulayın.
4. İçerik/eşleme incelemesi bitmeden `status: "reviewed"` yapmayın. Gerçek inceleyen kişiyi `review.reviewer` alanına yazın. İzin/lisans kaydı olmadan bunu varsaymayın.
5. `validateLesson(lesson, {forPublication: true, sourceModule})` boş hata listesi döndürmelidir. Kaynak özeti değişirse yeniden inceleme gerekir. Bu teknik kapı, yazılmış onay alanlarının doğruluğunu veya pedagojik kaliteyi tek başına ispatlamaz.
6. İncelenen metinleri uygun mevcut anahtara açıkça eşleyin. Kapsam raporu, insan tarafından doğrulanan bu eşlemeler eklenene kadar eksiksiz kabul edilmemelidir.

## Kaynak ve kullanım hakları

Ana kaynaklar: [MEB program kataloğu](https://mufredat.meb.gov.tr/Programlar.aspx), [TYMM ortaöğretim portalı](https://tymm.meb.gov.tr/ogretim-programlari/ortaogretim), [resmî yıllık plan açıklaması](https://tymm.meb.gov.tr/taslak-cerceve-planlari/ortaogretim). Her modülde ünite URL'si, erişim tarihi, sayfa/hash bilgisi bulunur.

**Ücretsiz/kamuya açık erişim, telifsiz veya açık lisanslı olduğu anlamına gelmez.** Kaynaklarda bütün içeriği yeniden dağıtmaya izin veren açık lisans bu çalışma sırasında doğrulanmadı. Bu yüzden MEB ders kitabı metinleri, şiirleri, soru bankaları, görselleri veya PDF'leri kopyalanmadı; yalnız program adları, kodlar ve bağlantılar kullanıldı. Yeni notlar özgün yazılmalı veya açık lisans/izin kaydıyla eklenmelidir. Önceden projede bulunan notların kökeni ayrıca inceleme gerektirir; JSON'a aktarılmaları onlara yeni bir lisans kazandırmaz.
