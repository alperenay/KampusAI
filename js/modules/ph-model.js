/* Ideal, dilute strong monoprotic acid/base solutions at 25 °C. No camera data. */
(function () {
  const KW=1e-14, CAPACITY=1.2;
  const solutions=[
    {id:'water',tr:'Saf su',en:'Pure water',charge:0},
    {id:'acid2',tr:'HCl · 0,01 M',en:'HCl · 0.01 M',charge:0.01},
    {id:'acid3',tr:'HCl · 0,001 M',en:'HCl · 0.001 M',charge:0.001},
    {id:'base12',tr:'NaOH · 0,01 M',en:'NaOH · 0.01 M',charge:-0.01},
    {id:'base11',tr:'NaOH · 0,001 M',en:'NaOH · 0.001 M',charge:-0.001}
  ];
  const empty=()=>({volume:0,moles:0});
  function valid(s) {
    if(!s || !Number.isFinite(s.volume) || !Number.isFinite(s.moles) || s.volume<0 || s.volume>CAPACITY+1e-10 || (s.volume===0 && s.moles!==0))throw new Error('Invalid solution state');
    if(s.volume>0 && Math.abs(s.moles/s.volume)>0.010000001)throw new Error('Unsupported concentration');
  }
  function read(s) {
    valid(s);if(s.volume<1e-12)return {volume:0,ph:null,h:null,oh:null,source:'simulation',temperature:25};
    const q=s.moles/s.volume,d=Math.hypot(q,2*Math.sqrt(KW));
    const h=q>=0?(q+d)/2:2*KW/(d-q);
    return {volume:s.volume,ph:-Math.log10(h),h,oh:KW/h,source:'simulation',temperature:25};
  }
  function pour(s,id,ml) {
    valid(s);const solution=solutions.find(x=>x.id===id);
    if(!solution || !Number.isFinite(ml) || ml<=0 || ml>10000)throw new Error('Invalid pour');
    const amount=Math.max(0,Math.min(ml/1000,CAPACITY-s.volume));
    return {volume:Math.min(CAPACITY,s.volume+amount),moles:s.moles+solution.charge*amount};
  }
  function drain(s,ml) {
    valid(s);if(!Number.isFinite(ml)||ml<=0)throw new Error('Invalid drain');
    if(ml/1000>=s.volume-1e-12)return empty();
    const volume=s.volume-ml/1000;
    return {volume,moles:s.moles*volume/s.volume};
  }
  function color(ph) {return ph==null?'#92c5d4':'hsl('+Math.round(Math.max(0,Math.min(14,ph))*19)+',65%,58%)';}
  App.phModel={KW,CAPACITY,solutions,empty,read,pour,drain,color};
})();
