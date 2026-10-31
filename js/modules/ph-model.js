/* Ideal, dilute strong monoprotic acid/base solutions at 25 °C. No camera data. */
(function () {
  const KW=1e-14, CAPACITY=1.2;
  const solutions=[
    {id:'water',tr:'Saf su',en:'Pure water',charge:0},
    {id:'acid2',tr:'HCl · 0,01 M',en:'HCl · 0.01 M',charge:0.01},
    {id:'acid3',tr:'HCl · 0,001 M',en:'HCl · 0.001 M',charge:0.001},
    {id:'base12',tr:'NaOH · 0,01 M',en:'NaOH · 0.01 M',charge:-0.01},
    {id:'base11',tr:'NaOH · 0,001 M',en:'NaOH · 0.001 M',charge:-0.001},
    {id:'hcl4',tr:'Hidroklorik asit (HCl) · 0,0001 M',en:'Hydrochloric acid (HCl) · 0.0001 M',charge:0.0001},
    {id:'hcl5',tr:'Hidroklorik asit (HCl) · 0,00001 M',en:'Hydrochloric acid (HCl) · 0.00001 M',charge:0.00001},
    {id:'hno3-2',tr:'Nitrik asit (HNO₃) · 0,01 M',en:'Nitric acid (HNO₃) · 0.01 M',charge:0.01},
    {id:'hno3-3',tr:'Nitrik asit (HNO₃) · 0,001 M',en:'Nitric acid (HNO₃) · 0.001 M',charge:0.001},
    {id:'hbr-3',tr:'Hidrobromik asit (HBr) · 0,001 M',en:'Hydrobromic acid (HBr) · 0.001 M',charge:0.001},
    {id:'naoh4',tr:'Sodyum hidroksit (NaOH) · 0,0001 M',en:'Sodium hydroxide (NaOH) · 0.0001 M',charge:-0.0001},
    {id:'naoh5',tr:'Sodyum hidroksit (NaOH) · 0,00001 M',en:'Sodium hydroxide (NaOH) · 0.00001 M',charge:-0.00001},
    {id:'koh-2',tr:'Potasyum hidroksit (KOH) · 0,01 M',en:'Potassium hydroxide (KOH) · 0.01 M',charge:-0.01},
    {id:'koh-3',tr:'Potasyum hidroksit (KOH) · 0,001 M',en:'Potassium hydroxide (KOH) · 0.001 M',charge:-0.001},
    {id:'lioh-3',tr:'Lityum hidroksit (LiOH) · 0,001 M',en:'Lithium hydroxide (LiOH) · 0.001 M',charge:-0.001},
    {id:'nacl',tr:'Sodyum klorür (NaCl) · 0,01 M',en:'Sodium chloride (NaCl) · 0.01 M',charge:0},
    {id:'kcl',tr:'Potasyum klorür (KCl) · 0,01 M',en:'Potassium chloride (KCl) · 0.01 M',charge:0}

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
