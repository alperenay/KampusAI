(function () {
  function snapshot(year) {
    const list = App.data.discovery.history;
    return list.filter((s) => s.year <= year).slice(-1)[0] || list[0];
  }
  function render(view) {
    const u = App.discovery,
      esc = App.utils.esc,
      data = App.data.discovery,
      root = u.page(
        view,
        "tarih-haritasi",
        '<div class="notice">Bu, yaklaşık odak bölgeleri ve yollarla hazırlanmış şematik tarih öğrenme haritasıdır. Çizgiler kesin egemenlik, modern hak iddiası veya yıllık tarih atlası sınırları değildir. Dönemler arasında yapay sınır interpolasyonu yapılmaz; en son tarihli kaynaklı kesit gösterilir.</div><section class="panel"><label>Tarih: <output id="hmYear">1071</output><input id="hmTime" type="range" min="1071" max="1923" value="1071" step="1"></label><div class="controls">' +
          u.button("hmPrev", "Önceki dönem") +
          u.button("hmNext", "Sonraki dönem") +
          '<label><input id="hmTrade" type="checkbox" checked> Ticaret yolları</label><label><input id="hmCampaign" type="checkbox" checked> Döneme ait sefer yönelimi</label></div><svg id="hmMap" viewBox="0 0 1000 480" role="img" aria-label="Zamana bağlı şematik tarih haritası"></svg><div id="hmDossier"></div><p data-status role="status"></p></section><section class="panel"><h2>Bağlam ve kaynaklar</h2><p>Yollar tek bir hat değil ağlardır; burada yön ve bağlantı fikri gösterilir. Zamanı sürükle, kaynaklı dönem kartını oku ve mevcut ayrıntılı zaman çizelgesindeki olaylarla karşılaştır.</p><a href="#/zaman">Ayrıntılı tarih zaman çizelgesi</a> · <a href="#/atlas">Coğrafya atlası</a><div id="hmSources"></div></section>',
      );
    const $ = (id) => root.querySelector("#" + id),
      X = (x) => ((x - 5) / 110) * 1000,
      Y = (y) => 480 - ((y - 0) / 55) * 480;
    let current, zoom = 1;
    const cities = [[29,41,'İstanbul'],[32.85,39.93,'Ankara'],[29.06,40.19,'Bursa'],[32.49,37.87,'Konya'],[42.54,39.15,'Malazgirt'],[16.37,48.21,'Viyana'],[30.52,50.45,'Kiev']];
    const toolbar=document.createElement('div');toolbar.className='history-toolbar controls';
    toolbar.innerHTML='<label>Döneme git<select id="hmPeriod">'+data.history.map(s=>'<option value="'+s.year+'">'+s.year+' · '+esc(s.title)+'</option>').join('')+'</select></label><button class="btn" id="hmZoomIn" aria-label="Haritayı yakınlaştır">+</button><button class="btn" id="hmZoomOut" aria-label="Haritayı uzaklaştır">−</button><button class="btn" id="hmReset">Görünümü sıfırla</button><label><input type="checkbox" id="hmCities" checked> Şehirler</label>';
    $('hmMap').before(toolbar);
    const cityInfo=document.createElement('p');cityInfo.id='hmCityInfo';cityInfo.setAttribute('role','status');$('hmMap').after(cityInfo);
    const zoomMap=()=>{const w=1000/zoom,h=480/zoom;$('hmMap').setAttribute('viewBox',[(1000-w)/2,(480-h)/2,w,h].join(' '));};
    $('hmZoomIn').onclick=()=>{zoom=Math.min(4,zoom*1.4);zoomMap();};
    $('hmZoomOut').onclick=()=>{zoom=Math.max(1,zoom/1.4);zoomMap();};
    $('hmReset').onclick=()=>{zoom=1;zoomMap();};
    $('hmPeriod').onchange=()=>{$('hmTime').value=$('hmPeriod').value;paint();};
    $('hmCities').onchange=()=>paint();
    const path = (pts) =>
      pts.map((p) => X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1)).join(" ");
    function paint() {
      const year = Number($("hmTime").value),
        s = snapshot(year);
      current = s;
      $("hmPeriod").value=String(s.year);
      $("hmYear").textContent = year;
      const routes = data.routes.filter((r) =>
        r.type === "trade"
          ? $("hmTrade").checked
          : $("hmCampaign").checked && r.year === s.year,
      );
      $("hmMap").innerHTML =
        '<defs><radialGradient id="hmSea"><stop stop-color="#204b67"/><stop offset="1" stop-color="#111d35"/></radialGradient><clipPath id="hmClip"><rect width="1000" height="480"/></clipPath></defs><rect width="1000" height="480" fill="url(#hmSea)"/>'+ (App.data.globe ? '<g clip-path="url(#hmClip)">'+App.data.globe.countries.map(c=>c.r.filter(r=>r.every((p,i)=>!i||Math.abs(p[0]-r[i-1][0])<180)).map(r=>'<polygon points="'+path(r)+'" fill="#546e68" stroke="#b0c6a7" stroke-width=".5"/>').join('')).join('')+'</g>' : '') + '<text x="18" y="27" fill="#ccd8ed">Şematik bağlantı haritası • ızgara: boylam / enlem</text>' +
        [20, 40, 60, 80, 100]
          .map(
            (x) =>
              '<path d="M' +
              X(x) +
              ' 0 V480" stroke="#4a5869"/><text x="' +
              X(x) +
              '" y="470" fill="#b7c8dc">' +
              x +
              "°D</text>",
          )
          .join("") +
        [10, 30, 50]
          .map(
            (y) =>
              '<path d="M0 ' +
              Y(y) +
              ' H1000" stroke="#4a5869"/><text x="5" y="' +
              Y(y) +
              '" fill="#b7c8dc">' +
              y +
              "°K</text>",
          )
          .join("") +
        '<polygon id="hmRegion" tabindex="0" role="button" aria-label="Dönem kartını aç" points="' +
        path(s.polygon) +
        '" fill="#708dff55" stroke="#a2b7ff" stroke-width="3"/>' +
        routes
          .map(
            (r, i) =>
              '<polyline class="map-route" fill="none" stroke="' +
              (r.type === "trade" ? "#efc568" : "#f28d89") +
              '" stroke-width="3" points="' +
              path(r.points) +
              '"/><text x="18" y="' +
              (52 + i * 22) +
              '" fill="' +
              (r.type === "trade" ? "#efc568" : "#f28d89") +
              '">' +
              esc(r.name) +
              "</text>",
          )
          .join("");
      if ($('hmCities').checked) $('hmMap').insertAdjacentHTML('beforeend',cities.map(([lo,la,name],i)=>'<g class="hm-city" tabindex="0" role="button" aria-label="'+esc(name)+' konumunu göster" data-city="'+i+'"><circle cx="'+X(lo)+'" cy="'+Y(la)+'" r="5" fill="#ffdc89" stroke="#18283b" stroke-width="2"/><text x="'+(X(lo)+8)+'" y="'+(Y(la)-8)+'" fill="#fff" font-size="13">'+esc(name)+'</text></g>').join(''));
      root.querySelectorAll('[data-city]').forEach(el=>{const show=()=>{const c=cities[Number(el.dataset.city)];$('hmCityInfo').textContent=c[2]+' · '+c[1]+'°K, '+c[0]+'°D. Günümüz koordinatıyla referans noktası; o yılın başkenti olduğu anlamına gelmez.';};el.onclick=show;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show();}};});
      zoomMap();
      $("hmDossier").innerHTML =
        "<h2>" +
        s.year +
        " · " +
        esc(s.title) +
        "</h2><p>" +
        esc(s.text) +
        "</p><p>Gösterilen tarih kesiti: " +
        s.year +
        "; sürgüde seçilen yıl: " +
        year +
        '. Aradaki tüm yıllar için sınır doğruluğu iddia edilmez.</p><a target="_blank" rel="noopener" href="' +
        esc(s.source) +
        '">Dönem bilgisinin kaynağı</a>';
      $("hmSources").innerHTML = routes
        .map(
          (r) =>
            "<p>" +
            esc(r.name) +
            ' · <a target="_blank" rel="noopener" href="' +
            esc(r.source) +
            '">Kaynak</a></p>',
        )
        .join("");
      const open = () =>
        App.ui.modal({
          title: s.title,
          body:
            "<p>" +
            esc(s.text) +
            '</p><p>Harita şematiktir.</p><a target="_blank" rel="noopener" href="' +
            esc(s.source) +
            '">Kaynağı incele</a>',
        });
      root.querySelector("#hmRegion").onclick = open;
      root.querySelector("#hmRegion").onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      };
    }
    $("hmTime").oninput = paint;
    $("hmTrade").onchange = $("hmCampaign").onchange = paint;
    $("hmPrev").onclick = () => {
      $("hmTime").value = String(
        data.history
          .filter((s) => s.year < Number($("hmTime").value))
          .slice(-1)[0]?.year || 1071,
      );
      paint();
    };
    $("hmNext").onclick = () => {
      $("hmTime").value = String(
        data.history.find((s) => s.year > Number($("hmTime").value))?.year ||
          1923,
      );
      paint();
    };
    paint();
    let alive=true;
    if(App.kure) App.kure.loadData().then(()=>{if(alive&&root.isConnected)paint();}).catch(()=>{if(alive&&root.isConnected)$('hmCityInfo').textContent='Coğrafi altlık yüklenemedi; şematik harita kullanılabilir.';});
    return ()=>{alive=false;};
  }
  App.historyMap = { snapshot };
  App.router.register("tarih-haritasi", render);
})();
