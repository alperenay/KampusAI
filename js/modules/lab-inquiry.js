/* Four-step inquiry journal; independent of the experiment engines and AI. */
(function () {
  const T=(tr,en)=>App.i18n.lang==='en'?en:tr, esc=App.utils.esc;
  function mount(panel, engine, key) {
    const store='labInquiry:'+key, raw=App.prefs.get(store,{});
    const steps=[['Tahmin et','Predict','Ne olacağını düşünüyorsun? Neden?','What do you expect to happen, and why?'],['Değişkeni değiştir','Change a variable','Deneyde bir değişkeni değiştir. Neyi değiştirdin, neleri sabit tuttun?','Change one variable in the experiment. What changed and what did you keep constant?'],['Sonucu gözle','Observe','Önceki ve sonraki sonucu, birimi ve gözlem koşullarını yaz.','Record before and after results, units and observation conditions.'],['Açıkla','Explain','Gözlemin tahminini destekledi mi? Kanıtını ve modelin sınırlarını açıkla.','Did the observation support your prediction? Explain the evidence and model limits.']];
    const values=steps.map((_,i)=>typeof raw?.values?.[i]==='string'?raw.values[i].slice(0,2000):'');
    let step=Number.isInteger(raw?.step)?Math.max(0,Math.min(3,raw.step)):0, complete=raw?.complete===true&&values.every(v=>v.trim()), mode=App.prefs.get('labInquiryMode','guided')==='free'?'free':'guided';
    let changed=false;
    const save=()=>App.prefs.set(store,{values:values.slice(),step,complete,updatedAt:new Date().toISOString()});
    const change=()=>{changed=true;const el=panel.querySelector('[data-inquiry-change]');if(el)el.textContent=T('Deneyde bir kontrol değiştirildi. Sonucu gözlemleyerek kaydet.','An experiment control changed. Observe and record the result.');};
    engine.addEventListener('change',change);engine.addEventListener('input',change);
    function paint(focus=false) {
      panel.innerHTML='<div class="inquiry-head"><h2>'+T('Deney rehberi','Experiment guide')+'</h2><div role="group" aria-label="'+T('Çalışma biçimi','Study mode')+'"><button class="btn" type="button" data-inquiry-mode="guided" aria-pressed="'+(mode==='guided')+'">'+T('Rehberli deney','Guided experiment')+'</button><button class="btn" type="button" data-inquiry-mode="free" aria-pressed="'+(mode==='free')+'">'+T('Serbest kullanım','Free exploration')+'</button></div></div>'+(mode==='free'?'<p>'+T('Deneyi serbestçe kullanabilirsin. Rehbere döndüğünde notların korunur.','Explore freely. Your notes are preserved when you return to the guide.')+'</p>':'<ol class="inquiry-steps">'+steps.map((s,i)=>'<li'+(i===step?' aria-current="step"':'')+'>'+ (i+1)+' · '+esc(T(s[0],s[1]))+'</li>').join('')+'</ol><label class="inquiry-field" for="inquiryAnswer">'+esc(T(steps[step][2],steps[step][3]))+'</label><textarea class="input" id="inquiryAnswer" maxlength="2000" rows="3">'+esc(values[step])+'</textarea><p class="hint" data-inquiry-change>'+T(changed?'Deney kontrolü değiştirildi; sonucunu kendin kaydet.':'Deney aşağıda her aşamada kullanılabilir. Sonuçlar otomatik ölçülmez veya puanlanmaz.',changed?'An experiment control changed; record the result yourself.':'The experiment below is available at every step. Results are not automatically measured or graded.')+'</p><p role="status" data-inquiry-status>'+ (complete?T('Dört adım tamamlandı. Notlarını indirebilir veya düzenleyebilirsin.','All four steps completed. Download or edit your notes.'):'')+'</p><div class="inquiry-actions"><button class="btn" type="button" data-inquiry-back'+(step===0?' disabled':'')+'>'+T('Önceki','Previous')+'</button><button class="btn btn--primary" type="button" data-inquiry-next>'+T(step===3?'Çalışmayı tamamla':'Kaydet ve ilerle',step===3?'Finish inquiry':'Save and continue')+'</button><button class="btn" type="button" data-inquiry-export>'+T('Notları indir','Download notes')+'</button></div>');
      panel.querySelectorAll('[data-inquiry-mode]').forEach(b=>b.onclick=()=>{save();mode=b.dataset.inquiryMode;App.prefs.set('labInquiryMode',mode);paint();});
      const answer=panel.querySelector('#inquiryAnswer');if(!answer)return;
      answer.oninput=()=>{values[step]=answer.value;complete=false;panel.querySelector('[data-inquiry-status]').textContent='';};answer.onblur=save;
      panel.querySelector('[data-inquiry-back]').onclick=()=>{save();step--;save();paint(true);};
      panel.querySelector('[data-inquiry-next]').onclick=()=>{if(!values[step].trim()){panel.querySelector('[data-inquiry-status]').textContent=T('İlerlemeden önce bu adımla ilgili notunu yaz.','Write your note for this step before continuing.');answer.focus();return;}if(step<3)step++;else complete=true;save();paint(true);};
      panel.querySelector('[data-inquiry-export]').onclick=()=>{save();App.utils.downloadText('deney-notlari.json',JSON.stringify({schema:'kampusai.inquiry.v1',experiment:key,steps:steps.map((s,i)=>({step:i+1,title:T(s[0],s[1]),note:values[i]})),complete},null,2),'application/json');};
      if(focus)answer.focus();
    }
    paint();return ()=>{save();engine.removeEventListener('change',change);engine.removeEventListener('input',change);};
  }
  App.labInquiry={mount};
})();
