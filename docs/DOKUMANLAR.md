# Dokümanlar

Yan menüde **Dersler ve kaynaklar → Dokümanlar** tek giriş noktasıdır. Üstteki dört bölüm aynı çalışma alanı içinde açılır:

1. **Belge Düzenleyici:** Yeni metin yaz, mevcut notu açıp düzenle veya dosyadan/defter fotoğrafından metin aktar. Başlık ve kayıt yeri seçerek kaydet. Genel belgeler ve konu notları aynı listede aranır. Markdown/formül önizlemesi ile TXT ve Markdown indirme seçenekleri vardır.
2. **Belgeden Çalış:** PDF, DOCX, ODF, TXT veya Markdown içeriğini cihazda oku. Metni kontrol ettikten sonra mevcut sağlayıcıyla kaynak referanslı özet, kavramlar, kartlar ve test hazırla. Kayıtlı çalışma paketleri burada kalır; özetleri Belge Düzenleyici'nin not listesine ekleyebilirsin.
3. **Deney Raporu:** Laboratuvar verisini al, hipotez/yöntem/sonuç yaz; grafik, hata hesabı ve rapor önizlemesini oluştur. PDF işlemi cihazın yazdırma penceresini kullanır. Laboratuvardaki rapora aktar düğmeleri bu bölümü açar.
4. **Ortak Belge:** Mevcut sunucu ve davet koduyla arkadaşlarınla metin düzenle. Bu bölüm internet ve sunucu gerektirir; oda oluşturma/katılma kullanıcı eylemiyle yapılır. Kodu bilen kişiler ortak notu görebilir ve düzenleyebilir. Yerel belgeler kendiliğinden bu sunucuya gönderilmez.

**AI Sunum Hazırlama kaldırıldı.** Menü, katalog, ana ekran kartları, rota kaydı, istem, üretim/dışa aktarma işleyicisi ve özel slayt CSS'i kaldırılmıştır. Portfolyo ve ortak belge kodunun kullandığı stüdyo dosyası korunmuştur. Müfredattaki sözlü sunum konuları ve mevcut ODF dosyalarından metin okuma, bu kaldırılan üretim özelliği değildir.

## Kayıtlar ve eski bağlantılar

- `notes` deposundaki genel belge ve kazanım notları, kimlikleri ve ek alanları korunur. Düzenleme aynı kaydı günceller; yeni konu metnini henüz düzenleme moduna girmeden seçili konuya kaydetmek mevcut nota ekler.
- Ders ekranındaki not alanı artık kayıtlı notun önizlemesidir; **Dokümanlarda yaz / düzenle** aynı konu kimliğini merkezî düzenleyicide açar.
- Düzenleyicide kaydedilmemiş metin yerel taslak olarak tutulur; yeni belge düğmesi bu taslağı temizler, kayıtlı belgeleri silmez. Depolama engelliyse taslak yalnız mevcut oturum belleğinde kalabilir. Kaynak metin ve rapor formu, uygulama açıkken bölümler arasında korunur; bunlar kalıcı rapor kaydı yerine geçmez. Ortak belgede sunucuya kaydetmeden ayrılma.
- Eski `#/notlar/<konu>` → `#/dokumanlar/notlar/<konu>`; `#/belge-paketi` ve `#/belgeden` → `#/dokumanlar/paket`; `#/deney-raporu` → `#/dokumanlar/rapor`; `#/calisma-odasi` → `#/dokumanlar/ortak`.
- Sabitlenen araçlar, son kullanılanlar ve ana ekran kartlarındaki eski belge girişleri tek Dokümanlar girişine dönüştürülür; kaldırılan sunum kısayolları ayıklanır. Öğrenci notları ve paket verileri silinmez. Çalışma paketleri aynı `meta` kayıtlarında saklanır.
- Dosya aktarımı metin içeriğini alır; DOCX/ODF'nin özgün sayfa düzenini veya görsellerini düzenleyip aynı biçimde geri yazan bir ofis paketi değildir. Dosya sınırları mevcut okuyucuyla aynıdır. Fotoğraf okuma için seçilen görüntü, açık AI eylemiyle ayarlı sağlayıcıya gönderilir; orijinal fotoğraf kaydedilmez.

## Doğrulama

`npm run test:documents`, `npm run test:documents-ui`, mevcut `test:workspace-ui` ve `node tools/v159-ui-check.mjs`. Kayıt kimliği/ek alanların korunması, eski bağlantılar, yerel taslak, TXT aktarımı, Markdown indirme, güvenli önizleme, arama/silme, yedekleme ve dört bölümün iki temada üç ekran boyutundaki yerleşimleri denetlenir. Paylaşımlı sunucunun gerçek çok kullanıcılı yük testi ve AI/OCR doğruluk ölçümü bu UI testleri değildir.
