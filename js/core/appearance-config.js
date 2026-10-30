/* Allowlisted appearance preferences, shared by first paint and the settings panel. */
(function () {
  const palettes = [
    {id:'cosmic',tr:'Kozmik',en:'Cosmic',dark:['#6354d7','#7261e5','#c1baff'],light:['#5748be','#493ba8','#4d3fa8'],swatch:['#9382ff','#65beff']},
    {id:'frost',tr:'Buz',en:'Frost',dark:['#24699f','#2a78b5','#acd7fa'],light:['#246399','#1d537f','#1e5789'],swatch:['#6fa8db','#a5c8ec']},
    {id:'forest',tr:'Orman',en:'Forest',dark:['#126e5e','#167d69','#8ce4ca'],light:['#0b6956','#075742','#075e51'],swatch:['#27b398','#67ddbd']},
    {id:'sunset',tr:'Gün batımı',en:'Sunset',dark:['#91451f','#a14d24','#ffd3a6'],light:['#93441c','#783717','#843c19'],swatch:['#e69b55','#f3be84']},
    {id:'rose',tr:'Gül',en:'Rose',dark:['#99366f','#ab3e7e','#f7bde2'],light:['#933268','#7d2858','#852b5e'],swatch:['#d77ab9','#f2b6d7']},
    {id:'indigo',tr:'Gece mavisi',en:'Indigo',dark:['#474cb5','#565bc7','#bfc9ff'],light:['#4146a8','#34398f','#393f9e'],swatch:['#6c79ed','#a7b5ff']},
    {id:'teal',tr:'Turkuaz',en:'Teal',dark:['#126c77','#157b87','#88e3eb'],light:['#076570','#05545e','#075b66'],swatch:['#33b6bf','#82e1df']},
    {id:'amber',tr:'Kehribar',en:'Amber',dark:['#80530f','#916014','#f4d397'],light:['#80520b','#694309','#744908'],swatch:['#dbaf55','#f4dca2']},
    {id:'lavender',tr:'Lavanta',en:'Lavender',dark:['#7850b2','#895ec3','#ddc5fa'],light:['#70459f','#5e378b','#633c91'],swatch:['#ad8fdf','#d2b5ed']},
    {id:'slate',tr:'Grafit',en:'Graphite',dark:['#4b5d75','#5a6b83','#c1d2eb'],light:['#46576f','#38485e','#3d4e66'],swatch:['#8194af','#b8c7db']},
    {id:'cherry',tr:'Vişne',en:'Cherry',dark:['#a0324c','#b53a56','#ffbdc9'],light:['#9d2945','#842039','#8f2540'],swatch:['#db637e','#f3a4b6']},
    {id:'olive',tr:'Zeytin',en:'Olive',dark:['#59672b','#667735','#d4e3a4'],light:['#506020','#414e18','#46561c'],swatch:['#9bae58','#c4d68c']}
  ];
  const atmospheres=[
    {id:'violet',tr:'Kampüs moru',en:'Campus violet',a:'#9382ff',b:'#65beff'},
    {id:'ocean',tr:'Okyanus',en:'Ocean',a:'#37b9e6',b:'#4e7bff'},
    {id:'forest',tr:'Kutup ışığı',en:'Aurora',a:'#b7ee61',b:'#5ee9b0'},
    {id:'sunrise',tr:'Şafak',en:'Dawn',a:'#eeaf76',b:'#e997bc'},
    {id:'rose',tr:'Gül bahçesi',en:'Rose garden',a:'#de8ebc',b:'#a297e7'},
    {id:'ice',tr:'Buzul',en:'Glacier',a:'#88d9df',b:'#9cbded'},
    {id:'nebula',tr:'Bulutsu',en:'Nebula',a:'#c395ed',b:'#e695ba'},
    {id:'off',tr:'Sade',en:'Plain',a:'#9197a3',b:'#9197a3'}
  ];
  const fonts={
    system:'"Segoe UI Variable Text", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif',
    humanist:'"Trebuchet MS", "Segoe UI", system-ui, Arial, sans-serif',
    rounded:'"Arial Rounded MT Bold", "Trebuchet MS", system-ui, Arial, sans-serif',
    serif:'Georgia, "Noto Serif", "Times New Roman", serif',
    mono:'ui-monospace, "Cascadia Mono", Consolas, "SF Mono", monospace'
  };
  const choices={palette:palettes.map(x=>x.id),atmosphere:atmospheres.map(x=>x.id),style:['glass','clean','soft','outline','paper'],
    font:Object.keys(fonts),readingFont:['same','system','serif','mono'],readingSize:['small','normal','large','extra'],
    lineHeight:['compact','normal','wide'],readingWidth:['narrow','balanced','wide'],tracking:['normal','wide'],
    corners:['round','soft','sharp'],density:['normal','compact','roomy'],motion:['full','gentle','off'],
    blur:['normal','subtle','off'],background:['subtle','balanced','vivid']};
  const defaults={palette:'cosmic',atmosphere:'violet',style:'glass',font:'system',readingFont:'same',readingSize:'normal',
    lineHeight:'normal',readingWidth:'balanced',tracking:'normal',corners:'round',density:'normal',motion:'full',
    blur:'normal',background:'balanced',shadows:true,ambientMotion:true,touchFeedback:true,intro:true};
  function normalize(value){
    const out={...defaults},raw=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
    Object.keys(defaults).forEach(k=>{
      if(choices[k]?choices[k].includes(raw[k]):typeof raw[k]==='boolean')out[k]=raw[k];
    });
    return out;
  }
  function read(get){
    const saved=get('appearanceOptions',{}),base=normalize(saved);
    return normalize({...base,palette:get('v159Theme',base.palette),atmosphere:get('appearanceAtmosphere',base.atmosphere),
      ambientMotion:get('appearanceAmbientMotion',base.ambientMotion)});
  }
  function apply(root,value,mode){
    const o=normalize(value),p=palettes.find(x=>x.id===o.palette),a=atmospheres.find(x=>x.id===o.atmosphere);
    const colors=p[mode==='light'?'light':'dark'];
    Object.entries({uiTheme:o.palette,atmosphere:o.atmosphere,uiStyle:o.style,uiFont:o.font,readingFont:o.readingFont,
      readingSize:o.readingSize,readingLine:o.lineHeight,readingWidth:o.readingWidth,readingTracking:o.tracking,
      uiCorners:o.corners,uiDensity:o.density,uiMotionLevel:o.motion,uiBlur:o.blur,uiBackground:o.background,
      uiShadows:o.shadows?'on':'off',uiIntro:o.intro?'on':'off'}).forEach(([k,v])=>root.dataset[k]=v);
    const rgb=colors[0].slice(1).match(/../g).map(v=>parseInt(v,16)).join(',');
    const vars={'--custom-accent':colors[0],'--custom-accent-hover':colors[1],'--custom-accent-text':colors[2],
      '--custom-accent-soft':'rgba('+rgb+','+(mode==='light'?'.10':'.19')+')',
      '--custom-font':fonts[o.font],'--custom-reading-font':fonts[o.readingFont]||fonts[o.font],
      '--custom-atmosphere-a':a.a,'--custom-atmosphere-b':a.b,
      '--reading-size':({small:16,normal:17,large:19,extra:21})[o.readingSize]+'px',
      '--reading-line':({compact:1.55,normal:1.8,wide:2})[o.lineHeight],
      '--reading-width':({narrow:60,balanced:76,wide:92})[o.readingWidth]+'ch',
      '--reading-tracking':o.tracking==='wide'?'.025em':'normal',
      '--ui-card-padding':({compact:14,normal:18,roomy:24})[o.density]+'px'};
    Object.entries(vars).forEach(([k,v])=>root.style.setProperty(k,String(v)));
  }
  window.KampusAppearanceConfig={palettes,atmospheres,fonts,choices,defaults,normalize,read,apply};
})();
