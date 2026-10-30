/* On-demand learning suite: portfolio and invite-only shared documents. */
(function(){
  const esc=App.utils.esc, T=(tr,en)=>App.i18n.lang==="en"?en:tr;
  const page=(title,body)=>'<div class="page v159-page"><div class="page-head"><div><h1>'+esc(title)+'</h1></div></div>'+body+'</div>';
  const notice=(el,msg,bad=false)=>{el.textContent=msg;el.classList.toggle("v159-error",bad);};
  const stamp=()=>new Date().toISOString().slice(0,10);
  const portfolioId="student-portfolio-v1";
  const id=()=>crypto.randomUUID?crypto.randomUUID():"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,10);
  const download=(name,content,type="text/html")=>{
    const blob=new Blob([content],{type:type+";charset=utf-8"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  async function portfolio(view){
    App.setTitle(T("Öğrenci Portfolyosu","Student Portfolio"));
    let record=await App.db.get("meta",portfolioId)||{id:portfolioId,entries:[]};
    if(!Array.isArray(record.entries))record.entries=[];
    const keep=async()=>{record._u=Date.now();await App.db.put("meta",record);};
    function paint(){
      view.innerHTML=page(T("Öğrenci Portfolyosu","Student Portfolio"),
        '<p class="hint">'+esc(T("Projelerini, katıldığın etkinlikleri ve öğrendiklerini bu cihazda sakla. Paylaşmadığın bilgiler özel kalır.","Keep your projects, activities and learning milestones on this device."))+'</p>'+
        '<form id="portfolioForm" class="v159-form card">'+
          '<label class="field"><span class="field__label">'+esc(T("Başlık","Title"))+'</span><input id="pfTitle" class="input" maxlength="110" required></label>'+
          '<label class="field"><span class="field__label">'+esc(T("Tür","Category"))+'</span><select id="pfType" class="select"><option value="project">'+esc(T("Proje","Project"))+'</option><option value="work">'+esc(T("Çalışma","Study work"))+'</option><option value="achievement">'+esc(T("Başarı / Katılım","Achievement / Participation"))+'</option></select></label>'+
          '<label class="field"><span class="field__label">'+esc(T("Açıklama","Description"))+'</span><textarea id="pfText" class="textarea" maxlength="3500" rows="4" required></textarea></label>'+
          '<button class="btn btn--primary" type="submit">'+App.icon("plus")+esc(T("Portfolyoya ekle","Add to portfolio"))+'</button></form>'+
        '<div class="v159-actions"><button id="pfExport" type="button" class="btn">'+App.icon("download")+esc(T("Portfolyoyu dışa aktar","Export portfolio"))+'</button></div>'+
        '<div class="v159-records">'+record.entries.slice().reverse().map(e=>
          '<article class="card v159-record" data-pf="'+esc(e.id)+'"><small>'+esc(e.type==="project"?T("Proje","Project"):e.type==="work"?T("Çalışma","Study work"):T("Başarı","Achievement"))+' · '+esc(e.date||"")+'</small><h3>'+esc(e.title)+'</h3><p>'+esc(e.description)+'</p>'+
          '<button type="button" class="btn btn--ghost btn--sm" data-pf-remove="'+esc(e.id)+'">'+App.icon("trash")+esc(T("Kaldır","Remove"))+'</button></article>').join("")+
          (record.entries.length?"":'<p class="hint">'+esc(T("Henüz portfolyo kaydı yok.","No portfolio entries yet."))+'</p>')+'</div>');
      view.querySelector("#portfolioForm").onsubmit=async event=>{
        event.preventDefault();const title=view.querySelector("#pfTitle").value.trim(),description=view.querySelector("#pfText").value.trim();
        if(!title||!description)return;
        record.entries.push({id:id(),type:view.querySelector("#pfType").value,title,description,date:stamp()});
        await keep();paint();
      };
      view.querySelector("#pfExport").onclick=()=>download("kampusai-portfolyo-"+stamp()+".json",JSON.stringify(record.entries,null,2),"application/json");
      view.querySelectorAll("[data-pf-remove]").forEach(b=>b.onclick=async()=>{
        if(!await App.ui.confirm(T("Bu kaydı silmek istiyor musun?","Delete this entry?"),T("Sil","Delete"),true))return;
        record.entries=record.entries.filter(x=>x.id!==b.dataset.pfRemove);await keep();paint();
      });
    }
    paint();
  }

  const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function roomCode(){const bytes=crypto.getRandomValues(new Uint8Array(20));return [...bytes].map(b=>alphabet[b%alphabet.length]).join("");}
  function rooms(view){
    App.setTitle(T("Ortak Çalışma Odası","Shared Study Room"));
    const base=String(App.config?.serverUrl||"").replace(/\/+$/,"").replace(/\/v1beta$/,"");
    let code="",rev=0,lastText="",dirty=false,poller=0,abort=null;
    const name=()=>String(view.querySelector("#studyName")?.value||"Öğrenci").trim().slice(0,24)||"Öğrenci";
    view.innerHTML=page(T("Ortak Çalışma Odası","Shared Study Room"),
      '<div class="card v159-form"><p class="hint">'+esc(T("Arkadaşlarınla davet kodu kullanarak ortak not tut. Kodu bilen herkes notu görebilir ve düzenleyebilir; şifre veya özel bilgilerini yazma. Oda 7 gün kullanılmazsa silinir.","Collaborate using an invite code. Anyone with the code can read and edit shared notes; do not share secrets. Rooms expire after 7 days of inactivity."))+'</p>'+
        '<label class="field"><span class="field__label">'+esc(T("Takma ad","Nickname"))+'</span><input id="studyName" class="input" maxlength="24" autocomplete="off" value="'+esc(App.prefs.get("studyNickname","Öğrenci"))+'"></label>'+
        '<label class="field"><span class="field__label">'+esc(T("Davet kodu","Invite code"))+'</span><input id="studyCode" class="input" autocomplete="off" maxlength="20" spellcheck="false" autocapitalize="characters" placeholder="20 '+esc(T("karakter","characters"))+'"></label>'+
        '<div class="v159-actions"><button type="button" class="btn" id="studyCreate">'+App.icon("plus")+esc(T("Yeni oda oluştur","Create room"))+'</button>'+
          '<button type="button" class="btn btn--primary" id="studyJoin">'+App.icon("send")+esc(T("Odaya katıl","Join room"))+'</button></div>'+
        '<p id="studyInfo" role="status" class="hint"></p></div>'+
      '<div id="studyBoard" hidden><div class="v159-actions"><button class="btn" id="studyCopy" type="button">'+App.icon("copy")+esc(T("Davet kodunu kopyala","Copy invite code"))+'</button>'+
        '<span id="studyPeople" class="hint"></span></div><label class="field"><span class="field__label">'+esc(T("Ortak not","Shared note"))+'</span>'+
        '<textarea id="studyNote" class="textarea" rows="12" maxlength="8000" placeholder="'+esc(T("Buraya birlikte not yazın…","Write together here…"))+'"></textarea></label>'+
        '<div class="v159-actions"><button id="studySave" type="button" class="btn btn--primary">'+App.icon("checkCircle")+esc(T("Değişiklikleri kaydet","Save changes"))+'</button><span class="hint">'+esc(T("Otomatik birleştirme yok; çakışmada arkadaşının notunu görebilirsin.","Concurrent edits are not auto-merged; conflicts are shown."))+'</span></div></div>');
    const info=view.querySelector("#studyInfo"),board=view.querySelector("#studyBoard"),area=view.querySelector("#studyNote"),people=view.querySelector("#studyPeople");
    if(!base)notice(info,T("Bu derlemede sunucu adresi yok. GitHub üzerinden yayımlanan sürüm gerekli.","This build has no server URL. Use a hosted release."),true);
    function stop(){clearInterval(poller);abort?.abort();poller=0;}
    async function request(action,extra={}){
      if(!base)throw Error(T("Sunucu ayarlanmamış.","Server not configured."));
      const ctrl=new AbortController();abort=ctrl;
      const res=await fetch(base+"/studyroom/"+code,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action,author:name(),...extra}),signal:ctrl.signal,cache:"no-store"});
      let data=await res.json().catch(()=>({}));
      if(!res.ok){const err=Error(res.status===409?T("Çakışma: yeni notlar var. Önce değişiklikleri kontrol et.","Conflict: remote notes changed. Review before saving."):data.error||"HTTP "+res.status);err.data=data;throw err;}
      return data;
    }
    function display(data){
      rev=data.rev;
      if(!dirty){area.value=data.note||"";lastText=area.value;}
      people.textContent=(data.people||[]).join(" · ");
    }
    async function refresh(){
      try{const data=await request("read");if(dirty && data.rev!==rev){notice(info,T("Oda değişti. Kendi metnini kaydetmeden önce karşılaştır.","Remote content changed. Review before overwriting."),true);}else display(data);}
      catch(e){if(e.name!=="AbortError")notice(info,e.message,true);}
    }
    function polling(){stop();poller=setInterval(()=>{if(!document.hidden&&!dirty)refresh();},8500);}
    view.querySelector("#studyCreate").onclick=()=>{view.querySelector("#studyCode").value=roomCode();view.querySelector("#studyJoin").click();};
    view.querySelector("#studyJoin").onclick=async()=>{
      const input=view.querySelector("#studyCode").value.toUpperCase().replace(/[\s-]/g,"");
      if(!new RegExp("^[A-HJ-NP-Z2-9]{20}$").test(input)){notice(info,T("20 karakterli geçerli davet kodunu yaz.","Enter a valid 20-character code."),true);return;}
      stop();code=input;dirty=false;App.prefs.set("studyNickname",name());
      try{const data=await request("read");board.hidden=false;display(data);notice(info,T("Odaya katıldın.","Joined the room."));polling();}
      catch(e){notice(info,e.message,true);}
    };
    area.oninput=()=>{dirty=area.value!==lastText;};
    view.querySelector("#studySave").onclick=async()=>{
      if(!code)return;const text=area.value;
      try{const data=await request("write",{note:text,base:rev});dirty=false;display(data);notice(info,T("Not kaydedildi.","Note saved."));}
      catch(e){notice(info,e.message,true);if(e.data?.note!=null){const b=document.createElement("details");b.innerHTML='<summary>'+esc(T("Sunucudaki son notu göster","Show latest remote note"))+'</summary><pre class="v159-remote"></pre>';b.querySelector("pre").textContent=e.data.note;info.after(b);rev=e.data.rev;}}
    };
    view.querySelector("#studyCopy").onclick=()=>{navigator.clipboard?.writeText(code).then(()=>notice(info,T("Kod kopyalandı.","Code copied."))).catch(()=>notice(info,code));};
    const hidden=()=>{if(document.hidden)abort?.abort();};
    document.addEventListener("visibilitychange",hidden);
    return()=>{stop();document.removeEventListener("visibilitychange",hidden);};
  }
  App.router.register("portfolyo",portfolio);
  App.v159Studio={portfolio,rooms};
})();
