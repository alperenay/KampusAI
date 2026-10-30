/* Original teaching annotations. Focus polygons are NOT sovereignty boundaries. */
(function () {
  const D = App.data.discovery;
  /** @type {Array<[number,string,string,[number,number]]>} */
  const added = [
    [1326,'Bursa ve kentleşme','Bursa’nın alınması kentli kurumları geliştirdi. Ticaret, vakıf ve üretim ağlarını askerî genişlemeyle birlikte düşün.',[29.06,40.19]],
    [1402,'Ankara Savaşı ve Fetret','Ankara Savaşı sonrasında hanedan mücadelesi başladı. Askerî yenilgi ile yönetimin parçalanması arasındaki ilişkiyi incele.',[32.85,39.93]],
    [1413,'Siyasal birliğin yeniden kurulması','Çelebi Mehmed döneminde hanedan mücadelesi sona erdi. Kurumların devamlılığı ile siyasal birliği birbirinden ayır.',[26.56,41.68]],
    [1517,'Mısır ve Doğu Akdeniz','Mısır seferi Arap coğrafyasıyla ilişkileri değiştirdi. Deniz ticareti ve vergi kaynaklarını karşılaştır.',[31.24,30.04]],
    [1538,'Preveze ve deniz gücü','Preveze, Akdeniz’deki güç mücadelesinin dönüm noktalarındandı. Bir zaferi bütün deniz üzerinde sürekli denetimle eşitleme.',[20.75,38.95]],
    [1699,'Karlofça ve diplomasi','Karlofça Antlaşması geniş toprak kayıplarını belgeledi. Uzun savaşın sonucunu tek günlük bir değişime indirgeme.',[19.94,45.20]],
    [1774,'Küçük Kaynarca ve yeni denge','Antlaşma Osmanlı–Rus ilişkilerini değiştirdi. Kırım’ın statüsü ile sonraki ilhakını ayrı olaylar olarak incele.',[27.51,43.99]],
    [1876,'Anayasal yönetim tartışmaları','Kanûn-ı Esâsî anayasal yönetim deneyimini başlattı. Anayasa, temsil ve fiilî uygulama arasındaki farkları sorgula.',[28.98,41.01]],
    [1908,'Meşrutiyetin yeniden yürürlüğü','Meşrutiyetin yeniden yürürlüğe girmesi siyasal katılımı dönüştürdü. Basın, seçimler ve toplumsal hareketleri birlikte incele.',[28.98,41.01]],
    [1920,'Ankara’da Büyük Millet Meclisi','23 Nisan 1920’de açılan Meclis Millî Mücadele’nin karar merkezine dönüştü. Temsil ve egemenliği tutanaklardan araştır.',[32.85,39.93]],
  ];
  added.forEach(([year,title,text,[x,y]])=>D.history.push({year,title,text,polygon:[[x-2,y-1.4],[x+2,y-1.4],[x+2,y+1.4],[x-2,y+1.4]],source:year===1920?'https://www.tbmm.gov.tr/kutuphane-tutanaklara-erisim':'https://islamansiklopedisi.org.tr/osmanlilar'}));
  D.history.sort((a,b)=>a.year-b.year);
  D.historyCities=[
    [28.98,41.01,'İstanbul'],[32.85,39.93,'Ankara'],[29.06,40.19,'Bursa'],[32.49,37.87,'Konya'],[42.54,39.15,'Malazgirt'],[16.37,48.21,'Viyana'],[30.52,50.45,'Kiev'],
    [26.56,41.68,'Edirne'],[31.24,30.04,'Kahire'],[44.37,33.32,'Bağdat'],[36.29,33.51,'Şam'],[23.73,37.98,'Atina'],[20.46,44.82,'Belgrad'],[30.71,36.90,'Antalya'],[39.72,41.00,'Trabzon'],[32.55,29.97,'Süveyş'],[66.98,39.65,'Semerkant'],[108.94,34.34,'Xi’an']
  ];
})();
