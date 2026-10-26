"""Real CPU OCR test; uses installed EasyOCR weights, never synthetic OCR responses."""
import json, time, re
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw,ImageFont
import easyocr
out=Path('dist/stem-ocr');out.mkdir(parents=True,exist_ok=True)
reader=easyocr.Reader(['tr','en'],gpu=False,download_enabled=False,verbose=False)
report=[]
for width in [480,960,1920]:
    im=Image.new('RGB',(width,round(width*.36)),'white');d=ImageDraw.Draw(im)
    font=next((p for p in ['C:/Windows/Fonts/arial.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'] if Path(p).exists()))
    d.text((width*.06,width*.055),'2x + 3 = 11',font=ImageFont.truetype(font,round(width*.065)),fill='black')
    d.text((width*.06,width*.17),'x degerini bulunuz.',font=ImageFont.truetype(font,round(width*.047)),fill='black')
    im.save(out/f'question-{width}.jpg',quality=88)
    start=time.monotonic();boxes=reader.readtext(np.asarray(im),detail=1,paragraph=False)
    text=' '.join(b[1] for b in boxes);ok=all(n in re.sub(r'\s','',text) for n in ['2','3','11'])
    report.append(dict(width=width,height=im.height,text=text,confidence=[float(b[2]) for b in boxes],seconds=round(time.monotonic()-start,3),digits_preserved=ok))
    assert ok,f'{width}: {text}'
(out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(report,ensure_ascii=False,indent=2))
