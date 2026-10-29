/* One short brand entrance per document; never awaits or gates app initialisation. */
(function(){
 let el=null,timer;
 function dismiss(){clearTimeout(timer);if(el){el.remove();el=null;}window.removeEventListener('keydown',key);window.removeEventListener('pagehide',dismiss);}
 function key(e){if(['Escape','Tab','Enter',' '].includes(e.key))dismiss();}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 App.startup={dismiss,get active(){return !!el;}};
 if(reduced.matches||App.prefs.get('a11yMotion',false)||document.hidden)return;
 el=document.createElement('div');el.className='startup-brand';el.setAttribute('aria-hidden','true');
 el.innerHTML='<div class="startup-emblem"><i class="startup-orbit"></i><i class="startup-orbit startup-orbit--two"></i><i class="startup-star startup-star--one"></i><i class="startup-star startup-star--two"></i><img src="assets/icons/icon-192.png" alt="" width="84" height="84"></div><div class="startup-word">KampüsAI</div><div class="startup-caption">'+(App.i18n.lang==='en'?'Learn. Explore. Grow.':'Öğren. Keşfet. İlerle.')+'</div>';
 document.body.appendChild(el);el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();dismiss();});window.addEventListener('keydown',key);window.addEventListener('pagehide',dismiss);
 const change=()=>{if(reduced.matches)dismiss();};if(reduced.addEventListener)reduced.addEventListener('change',change,{once:true});
 // Backgrounding, keyboard navigation or a tap ends it immediately. CSS also has a fail-safe release.
 document.addEventListener('visibilitychange',()=>{if(document.hidden)dismiss();},{once:true});
 timer=setTimeout(dismiss,1050);
})();
