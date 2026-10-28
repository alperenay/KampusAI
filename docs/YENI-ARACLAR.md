# KampüsAI 1.47 kullanım notları

[Kullanım](KULLANIM.md) · [Öğretmen ve sınıf](OGRETMEN.md) · [Araştırma](ARASTIRMA.md)

## Dünya küresi

Menüden **3B Dünya Küresi** açılır. Sürükleme döndürür, tekerlek/iki parmak yakınlaştırır. Üstteki düğmeler yakınlaştırma, döndürme, yatay/düşey kaydırma ve sıfırlama sağlar. Küreye klavye odağı verildiğinde oklar döndürür, Shift+sağ/sol kaydırır, +/− yakınlaştırır, Home görünümü sıfırlar. Başkentler ve önemli noktalar katmanlarını açıp işarete dokun; bilgi kartı hem küre üzerinde hem yan panelde görünür. Önemli nokta seçicisi veya ülke aramasıyla da konum seçilebilir.

NASA Blue Marble dokusu tarihsel bir bileşik görüntüdür; canlı uydu verisi değildir. NASA kredileri ve kaynak bağlantısı ekranın altındadır. Mevcut Natural Earth tabanlı sınırlar yaklaşık eğitim verileridir; siyasi/hukuki sınır doğruluğu garantisi değildir. 3B için WebGL gerekir. Doku bileşimi mobilde 2048, uygun masaüstünde en fazla 4096 piksel genişliğinde, GPU sınırlarına göre hazırlanır; NASA kaynak görseli 2048 pikseldir.

## İngilizce ve Almanca

Menüde **İngilizce ve Almanca** seçilir. English mevcut konuşma/telaffuz modunu, Deutsch yeni Almanca ekranını açar. Almancada A1, A2, B1 veya B2 seçilir:

1. **Kelimeler:** Artikelli sözcüğü oku, anlamını göster, istersen dinle. Başlangıç paketi her seviyede 12, toplam 48 sözcük içerir.
2. **Gramer:** Her seviyede üç kural ve kısa alıştırma vardır. Cevabını seçip Kontrol et; açıklamayı okuyup sonraki soruya geç.
3. **Diyalog:** Her seviyede üç adımlı bir konuşmada bağlama uygun yanıtı seç; geri bildirimi oku.

Seviyeler çalışma rehberidir; sertifikalı CEFR yerleştirme puanı değildir. İçerik uygulama için hazırlanmıştır. Seçmeli yazılı diyaloglar telaffuz doğruluğunu ölçmez. Dinleme için cihazda Almanca ses paketi gerekir; yoksa metinle devam edilir. Almanca ilk yanıt kayıtları ve seviye tercihi İngilizce istatistiklerinden ayrı saklanır. Normal test/araştırma skorlarına yazılmaz.

## AI favorileri

AI ana ekranında **Favori araçların → Favorileri düzenle** açılır. Bir aracı sabitlemek/çıkarmak tek düğmeyle yapılır. Tercihler aynı cihazda kalıcıdır ve genel yedek tercihlerine dahildir. Soru Çözücü, Sokratik Koç, Not Özetleyici, Çalışma Planlayıcı, Kart Hazırlayıcı ve Kavram Açıklayıcı başlangıçları bulunur.

Favoriye dokununca sohbet kutusuna düzenlenebilir bir başlangıç yerleşir; otomatik AI isteği gönderilmez. Kendi soru/notlarını ekleyip Gönder seçilir. Sokratik Koç mevcut Sokratik modu açar; diğer araçlar normal yanıt modunu seçer. Üretilen metinler aynı mevcut AI sağlayıcısını kullanır; otomatik karta veya test puanına dönüştürülmez.

## Çoklu sensör ölçümü

**Sensör Laboratuvarı → Çoklu sensör · grafik ve dışa aktarım** açılır.

1. İvmeölçer, jiroskop, ortam ışığı, manyetometre veya ses seviyesini seç.
2. **Gerçek cihaz** ya da **Simülasyon · ölçüm değildir** kaynağını seç. Desteklenmeyen gerçek sensör sessizce simüle edilmez.
3. Eşiği gir. Simülasyonda x/y/z değerlerini düzenle. Başlat; gerekirse cihaz iznini ver.
4. Grafiği ve sayısal değerleri izle. Vektörlü kanallarda eşik vektör büyüklüğüne uygulanır; eşik aşımı yazıyla gösterilir.
5. Durdur. CSV veya JSON indir. Dosyalar zaman, x/y/z, sensör, birim ve **device/simulation** kaynağını içerir. Yeni başlatma eski tamponu temizler.

Yaklaşık 10–12 Hz görselleştirme ve en fazla son 600 örnek tutulur; uzun kayıt arşivi değildir. İvme **m/s²** (yer çekimi dahil), dönme hızı **derece/saniye**, ortam ışığı **lux**, manyetik alan **µT**, ses **dBFS** olarak etiketlenir. dBFS dijital tam ölçeğe göre mikrofon seviyesidir; kalibre edilmiş **dB SPL ölçümü değildir**. Kamera parlaklığı lux yerine kullanılmaz. Generic Sensor API, işletim sistemi, izin ve gerçek donanım desteğine bağlı olarak ışık/manyetometre kullanılamayabilir. Bu durumda kullanıcı açıkça simülasyon seçebilir. Sayfa terk edildiğinde dinleyiciler ve açık mikrofon akışları kapatılır.

## Bozuk kayıt uyarıları

Öğretmen, araştırma ve sınıf listeleri görüntülemeden önce kayıtları doğrular. Hatalı kayıtlar ekranı çökertmek yerine uyarıyla dışarıda tutulur; otomatik silinmez. Önce **Ayarlar → Verilerini yedekle** ile yedek alınır; özgün QR/kod/JSON paketi kontrol edilip güncel cihazlar arasında yeniden aktarılır. Araştırma özetleri geçerli özgün cevaplardan yeniden hesaplanır. Sınıf sonuçları öğretmenin soru anahtarına göre hesaplanır. Eski sayfada biten bir veri yüklemesi yeni sayfanın içeriğini değiştirmez.

Yeni modüllerin JavaScript tip denetimi `npm run type-check` ile çalışır. Bu, mevcut dinamik `App` sınırına bağlı yeni modülleri kapsar; eski kod tabanının tümü TypeScript'e dönüştürülmüş değildir. Gerçek fiziksel iPhone/sensör/AR doğrulaması tarayıcı ve emülatör testlerinden ayrıdır.
