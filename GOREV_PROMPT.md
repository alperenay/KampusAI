# Kaydedilen görev (kullanıcının son büyük isteği, 19 Ekim 2026 22:18–22:26)

Benden onay bekleme, her şeyi onaylıyorum. Sırayla:
1. 3B performans (mobil + PC): küre ve 3B deneyler akıcı (LOD, doku, çizim çağrısı, dinamik çözünürlük, zayıf cihazda gölge kapalı). — BİTTİ
2. Maarif Modeli açık uçlu yazılı sınavlar (9–12; Matematik, Fizik, Kimya, Biyoloji, Edebiyat, Tarih, Coğrafya), cevap anahtarlı, ayrı sekme, ders/sınıf filtresi. — BİTTİ
3. Arayüzü sadeleştir (ana kalıp ve KampüsAI adı/logosu korunarak). — BİTTİ
4. iOS / Android / PC optimizasyonu. — BİTTİ (lazy-load gelecek iş)
5. Hakkında + Kaynakça güncelle, kapsamlı teknik rapor (Claude Docs "KampüsAI Proje Raporu"). — BİTTİ
6. Son sürümü yayınla (1.29.0), sonra son uygulama haline göre 2 video:
   - Video 1: ~1 dk, dikey 9:16, edit yoğun, enerjik, akıcı (v2/reel.py)
   - Video 2: ~5 dk, yatay 16:9, tanıtım (v2/long.py)
   Gerçek kişi içeren test medyası videolarda yok. API anahtarı istemek/paylaşmak yok.
   Sonunda Türkçe nihai durum raporu.

## Kalan adımlar (00:17 itibarıyla)
- Regresyon: reg_all.txt "done" ve out_v33.txt kontrol; v21, v22, v24, v32 testlerini (düzeltildi) tekrar koş.
- dal v129 itildi (8c041e0) → PR aç, birleştir, CI ve releases/latest = 1.29.0 doğrula.
- v2/cap.py desktop ve phone ile tüm klipleri (yazili, yazkey dahil) yeniden kaydet (tarayıcı işleri aynı anda koşmasın).
- python3 v2/reel.py ve python3 v2/long.py → out/KampusAI-reels-1dk.mp4, out/KampusAI-tanitim-5dk.mp4 (+ .srt); önizleme karelerini kontrol et; SendUserFile ile gönder.
- Nihai durum raporu.
