/* Pluggable enquiry tools, sharing existing timeline events and period sources. */
(function () {
  const esc=App.utils.esc;
  function events(year,range,query,type,all) {
    const q=String(query||'').toLocaleLowerCase('tr');
    return (App.data.tarihOlay||[]).map((e,i)=>({e,i})).filter(({e})=>e[0]>=1071&&e[0]<1924&&(all||Math.abs(e[0]-year)<=range)&&(!type||e[3]===type)&&(!q||(e[1]+' '+e[4]).toLocaleLowerCase('tr').includes(q))).sort((a,b)=>a.e[0]-b.e[0]);
  }
  function mount(root,api) {
    const $=id=>root.querySelector('#'+id), svg=$('hmMap');let limit=20,selected=null;
    const link=url=>/^https:\/\//.test(url||'')?'<a target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">Kaynağı incele</a>':'';
    const box=document.createElement('section');box.className='panel hm-inquiry';
    box.innerHTML='<h2>Haritadan kanıta</h2><div class="hm-filters"><label>Olay ara<input id="hmSearch" type="search" placeholder="Lozan, matbaa, bilim…"></label><label>Yılın çevresi<select id="hmWindow"><option value="25">±25 yıl</option><option value="75" selected>±75 yıl</option><option value="150">±150 yıl</option></select></label><label>Tür<select id="hmType"><option value="">Tümü</option><option value="s">Siyasi</option><option value="w">Savaş</option><option value="a">Antlaşma</option><option value="k">Kültür ve bilim</option><option value="i">Reform</option><option value="d">Dünya</option></select></label><label>Karşılaştır<select id="hmCompare"><option value="">İkinci dönem seç</option>'+App.data.discovery.history.map(s=>'<option value="'+s.year+'">'+s.year+' · '+esc(s.title)+'</option>').join('')+'</select></label></div><div class="controls"><label><input id="hmAll" type="checkbox"> Tüm tarihlerde ara</label><label><input id="hmPins" type="checkbox" checked> Olay işaretleri</label><button class="btn" id="hmExport">Çalışma dosyasını indir</button></div><p id="hmCount" role="status"></p><div id="hmComparison"></div><div id="hmSelected" aria-live="polite"></div><div class="hm-event-list" id="hmEvents"></div><button class="btn" id="hmMore">Daha fazla olay</button>';
    root.appendChild(box);
    const key=e=>e[0]+'|'+e[1];
    const bookmarks=()=>{const a=App.prefs.get('historyBookmarks',[]);return Array.isArray(a)?a.filter(x=>typeof x==='string').slice(0,100):[];};
    function detail(i) {
      const e=App.data.tarihOlay[i];if(!e)return;selected=i;const d=e[6];
      $('hmSelected').innerHTML='<article class="hm-detail"><h3>'+Math.floor(e[0])+' · '+esc(e[1])+'</h3><p>'+esc(e[4])+'</p>'+(d?'<h4>Arka plan</h4><p>'+esc(d.background||'')+'</p><h4>Gelişme ve sonuç</h4><p>'+esc(d.development||'')+'</p><p>'+esc(d.consequences||'')+'</p>':'<p class="hint">Mevcut proje özeti: bu olayın bağımsız kaynak dosyası henüz eşlenmedi; birincil belgeyle kontrol ederek çalış.</p>')+'<h4>Düşünme sorusu</h4><p>'+esc(d?.question||'Ön koşul, doğrudan sonuç ve uzun vadeli etkiyi ayır. Konum bilgisi tek başına hangilerini kanıtlayamaz?')+'</p>'+(d?.sources||[]).map(s=>'<p>'+link(typeof s==='string'?s:s.url)+'</p>').join('')+'<button class="btn" id="hmBookmark" aria-pressed="'+bookmarks().includes(key(e))+'">'+(bookmarks().includes(key(e))?'Kaydı kaldır':'Çalışma listeme kaydet')+'</button></article>';
      $('hmBookmark').onclick=()=>{const b=bookmarks();App.prefs.set('historyBookmarks',b.includes(key(e))?b.filter(k=>k!==key(e)):[key(e),...b].slice(0,100));detail(i);};
    }
    function paint() {
      const year=Number($('hmTime').value),list=events(year,Number($('hmWindow').value),$('hmSearch').value,$('hmType').value,$('hmAll').checked);
      const base=App.historyMap.snapshot(year),other=$('hmCompare').value?App.historyMap.snapshot(Number($('hmCompare').value)):null;
      $('hmCount').textContent=list.length+' olay eşleşti; '+Math.min(limit,list.length)+' tanesi listeleniyor.';
      $('hmEvents').innerHTML=list.slice(0,limit).map(({e,i})=>'<button class="btn hm-event" data-hm-event="'+i+'"><b>'+Math.floor(e[0])+'</b><span>'+esc(e[1])+'</span></button>').join('')||'<p>Eşleşme yok. Yıl aralığını genişlet veya aramayı temizle.</p>';$('hmMore').hidden=limit>=list.length;
      $('hmComparison').innerHTML=other?'<article class="hm-detail"><h3>İki dönemi karşılaştır</h3><p><b>'+base.year+':</b> '+esc(base.text)+'</p><p><b>'+other.year+':</b> '+esc(other.text)+'</p><p>Coğrafi odağın değişmesi ile siyasal ve ekonomik nedenleri ayrı değerlendir. Renkli alanları kesin toprak kazanımı/kaybı olarak yorumlama.</p>'+link(base.source)+' · '+link(other.source)+'</article>':'';
      svg.querySelector('#hmEventPins')?.remove();
      if($('hmPins').checked){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.id='hmEventPins';g.innerHTML=list.filter(({e})=>Array.isArray(e[5])&&e[5][0]>=5&&e[5][0]<=115&&e[5][1]>=0&&e[5][1]<=55).map(({e,i})=>'<g role="button" tabindex="0" data-hm-event="'+i+'" aria-label="'+esc(Math.floor(e[0])+' '+e[1])+'"><rect x="'+(((e[5][0]-5)/110)*1000-5)+'" y="'+(480-e[5][1]/55*480-5)+'" width="10" height="10" fill="#bfd1ff" stroke="#172a3b"/><title>'+esc(Math.floor(e[0])+' '+e[1])+'</title></g>').join('');svg.appendChild(g);}
    }
    const click=e=>{const a=e.target.closest('[data-hm-event]');if(a)detail(Number(a.dataset.hmEvent));};root.addEventListener('click',click);
    const keyboard=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('g[data-hm-event]')){e.preventDefault();detail(Number(e.target.dataset.hmEvent));}};root.addEventListener('keydown',keyboard);
    for(const id of ['hmWindow','hmType','hmAll','hmPins','hmCompare'])$(id).onchange=()=>{limit=20;paint();};$('hmSearch').oninput=()=>{limit=20;paint();};$('hmMore').onclick=()=>{limit+=20;paint();};
    $('hmExport').onclick=()=>App.utils.downloadText('kampusai-tarih-calismasi.json',JSON.stringify({schemaVersion:1,year:Number($('hmTime').value),period:App.historyMap.snapshot(Number($('hmTime').value)),comparison:$('hmCompare').value?App.historyMap.snapshot(Number($('hmCompare').value)):null,bookmarks:bookmarks(),selectedEvent:selected==null?null:App.data.tarihOlay[selected],limitation:'Schematic focus regions, not historical sovereignty boundaries.'},null,2),'application/json');
    root.addEventListener('hm:paint',paint);paint();
    return ()=>{root.removeEventListener('hm:paint',paint);root.removeEventListener('click',click);root.removeEventListener('keydown',keyboard);};
  }
  App.historyExplorer={events,mount};
})();
