# Rapor sonrası arayüz düzenlemeleri

- Deney Laboratuvarı, Dersler ve kaynaklar grubuna taşındı.
- Vatandaş Bilimi Ağı, Gökyüzü Modu ve Titreşimli Grafik laboratuvar alt bölümleridir. Eski bağlantılar korunarak yönlendirilir.
- Keşif Atölyeleri katalog girişi kaldırıldı. Eski adres laboratuvara yönlenir; başka modüllerin kullandığı ortak yardımcı kod korunur.
- Laboratuvar kartlarında belirgin ikon, vurgu ve bölüm açma eylemi bulunur.
- AI yazma alanı ile araç kontrolleri iki satıra ayrıldı; ana ekrandaki Favorilerim kutusu kaldırıldı. Kayıtlı favoriler menüden yönetilebilir.
- Bilgi Evreni ünite etiketleri, statik yıldız tozu, kazanım/bağlantı özeti ve boş veri korumasıyla geliştirildi. Görsel gerçek gökyüzü değil, öğrenme haritasıdır.
- Kullanıcının son kararı doğrultusunda maskot ekleme iptal edildi; uygulamaya maskot veya yeni model eklenmedi.

## Doğrulama

npm test, npm run lint ve yapılandırılmış iki TypeScript kontrolü geçti. npm type-check ağ erişiminde takıldığı için aynı kontroller önbellekteki TypeScript ile doğrudan çalıştırıldı. Web derlemesi alındı. Chromium laboratuvar testi 60 yerleşimde; Chromium, Firefox ve WebKit üzerinde post-report-ui testi eski yönlendirmeler, grafik, ana ekran, 320/390/768/1440 genişlikleri ve Bilgi Evreni filtrelerinde geçti. Bunlar fiziksel sensör/AR cihazı testleri değildir.
