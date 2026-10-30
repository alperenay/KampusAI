# Belge, ödev, defter notu ve sözlü prova

Araçlar yan menüde ve **Tüm araçlar** aramasında bulunur. İçerikler, OCR metni ve AI puanları hata içerebilir; resmî not veya doğruluk garantisi değildir.

## Belgeden Çalışma Paketi

1. **Dersler ve kaynaklar → Belgeden Çalışma Paketi** ekranını aç.
2. PDF, DOCX, TXT veya MD seç; **Belgeyi cihazda oku** düğmesine bas. Dosya en fazla 12 MB, PDF en fazla 60 sayfa olabilir. Çıkarılan metin en fazla 60.000 karakterdir. Şifreli/bozuk belgelerde metin yapıştırmayı kullan.
3. Metni incele; paket için 40–12.000 karakterlik bir bölüm seç. Kaynakta kişisel bilgiler varsa sil. PDF sayfa etiketleri korunur; DOCX/TXT için uydurma sayfa numarası verilmez.
4. **Çalışma paketi oluştur** ile metni ayarlı AI sağlayıcına gönder. Özet, kavram ağı, açılır kartlar ve dört seçenekli test hazırlanır. S1, S2… bağlantıları dayanak metin bölümünü gösterir; bağlantının bulunması iddianın doğrulandığı anlamına gelmez.
5. Soruları yanıtlayıp kontrol et. Özet ve kaynakları Notlarım’a aktarabilir, paketi JSON indirebilir veya kaydı silebilirsin.

Taranmış/görüntü PDF'lerde metin katmanı olmayabilir. Böyle bir sayfanın fotoğrafını Defterden Aktar aracında okut. PDF görüntülerini sessizce metinmiş gibi değerlendirmez.

## Ödev ve Teslim Takibi

1. **Plan ve gelişim → Ödev ve Teslim Takibi** ekranını aç.
2. Başlık, ders, isteğe bağlı teslim tarihi ve her satıra bir küçük adım yaz. İnternetsiz elle giriş çalışır.
3. İstersen fotoğraf seçip AI ile taslak çıkar. Bu işlem ödevi otomatik kaydetmez. Tarih/yıl açık değilse tarihi kendin belirle.
4. **Kaydet**; adımları işaretle, ödevi tamamla/yeniden aç veya düzenle. Tamamlanmamış ve tarihli ödevler önce listelenir; geçmiş tarihli olanlar gecikti olarak gösterilir.

Bu sürüm arka planda sistem bildirimi planlamaz; tarihler ödev ekranında izlenir.

## Notlarım · Defterden Aktar

1. **Dersler ve kaynaklar → Notlarım** ekranını aç. Konu anlatımındaki **Defter fotoğrafından not ekle** düğmesi ilgili konuyu önceden seçer.
2. JPEG/PNG/WebP fotoğraf seç (en fazla 12 MB); **El yazısını oku** düğmesine bas. Metin okunamayan yerlerde `[??]` içerebilir; doğru okunduğu varsayılmaz.
3. Okunan metni düzelt; başlık ve **Genel notlarım** veya konu seç.
4. Kaydet. Konu seçilirse eski konu notu korunur ve yeni metin sonuna eklenir. Konu anlatımının Notlarım alanında aynı kayıt görünür. Genel notlar Notlarım ekranında listelenir.
5. **Aç ve düzenle** mevcut kaydı günceller; **Yeni not** ayrı kayıt hazırlar. Silme yalnız seçilen notu siler.

Fotoğraflar kalıcı saklanmaz. Okuma için seçili sağlayıcıda görsel desteği gerekir; yoksa metni elle yazabilirsin. Metin kaydı 60.000 karakterle sınırlıdır.

## Sözlü Sınav Provası

1. **Tekrar ve pratik → Sözlü Sınav Provası** ekranını aç; 40–12.000 karakterlik ders kaynağını yapıştır.
2. **Prova sorularını hazırla** ile üç soru ve soru başına üç ölçüt oluştur.
3. Soruyu sesli dinle; mikrofonla yanıtla veya yaz. Mikrofon izni, cihaz/tarayıcı konuşma hizmeti ve bazı ortamlarda ses okuyabilen internet sağlayıcısı gerekir.
4. Kaydı bitir; transkripti düzeltip **Yanıtı değerlendir** düğmesine bas. Mikrofon açıkken puanlama başlatılmaz.
5. Her ölçüt için 0 (eksik/yanlış), 1 (kısmi), 2 (desteklenen) puan ve açıklama gösterilir. Toplam 0–6 yalnız prova göstergesidir. Eksik noktayla ilgili ek soruyu düşün, örnek yanıtı aç ve sonraki soruya geç.

Tamamlanan yanıtlar önceki provalarda listelenir. Ekrandan çıkmak devam eden üretimi ve ses oturumunu sonlandırır. Gerçek öğretmen değerlendirmesinin yerini tutmaz.

## Kayıt, gizlilik ve teknik kaynaklar

- Paket, ödev ve sözlü sonuçları mevcut `meta`; notlar mevcut `notes` deposundadır. Ayarlar yedek/geri yüklemesine dahildir. Eşitleme açıksa bu kayıtlar mevcut eşitleme kapsamına girer.
- Dosya okuma yereldir. AI düğmesine basıldığında ilgili kaynak/görsel/yanıt seçili sağlayıcıya gider. Otomatik harici dosya yükleme yapılmaz. Özgün PDF/DOCX ve defter fotoğrafları kalıcı kaydedilmez; kaynak metin paket içinde saklanır.
- PDF metin okuma: [Mozilla PDF.js](https://mozilla.github.io/pdf.js/), `pdfjs-dist 6.4.299` legacy build, Apache-2.0. Paket içindeki `pdf.mjs`/`pdf.worker.mjs`, uygulama sunucularında doğru JavaScript MIME türü için `.js` adlarıyla dağıtılır; içerikleri değiştirilmez. Yalnız metin katmanı okunur, eval kapalıdır.
- DOCX ZIP açma: [fflate](https://github.com/101arrowz/fflate), `0.8.3`, MIT. Yalnız boyutu sınırlı `word/document.xml` okunur; belge ilişkileri veya dış kaynaklar açılmaz.
- Ses: uygulamanın mevcut [Web Speech API](https://webaudio.github.io/web-speech-api/), Android ve kayıt/transkripsiyon katmanı kullanılır.
- Bu sürümde **Çevrendeki Fizik** ve **Canlı AR Çözüm** kaldırıldı. Deney laboratuvarının ortak 3B/AR altyapısı ve diğer fotoğraftan soru araçları korunur.
