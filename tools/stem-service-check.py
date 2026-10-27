"""Gateway contract tests with explicit HTTP/OCR fixtures, not model accuracy tests."""
import io, json, os, sys, unittest
from pathlib import Path
from unittest.mock import patch
os.environ['STEM_API_TOKEN']='test-only-stem-token-not-production-123'
sys.path.insert(0,str(Path(__file__).parents[1]/'server'))
import stem_service as s
from fastapi.testclient import TestClient
from PIL import Image
AUTH={'Authorization':'Bearer '+s.TOKEN}
STATE={'kind':'ok'}
class Reply:
    status_code=200
    def raise_for_status(self):pass
    def json(self):return {'models':[{'name':s.MODEL+':latest'}]}
    async def __aenter__(self):return self
    async def __aexit__(self,*args):pass
    async def aiter_lines(self):
        if STATE['kind']=='bad':yield '{bad';return
        yield json.dumps({'message':{'content':'Adım 1: $x+3=8$.\nSonuç: 5'},'done':False})
        if STATE['kind']!='incomplete':yield json.dumps({'done':True,'done_reason':'stop'})
class Upstream:
    def __init__(self,*a,**kw):pass
    async def __aenter__(self):return self
    async def __aexit__(self,*a):pass
    async def get(self,*a,**kw):return Reply()
    def stream(self,*a,**kw):
        data=kw['json'];assert data['model']==s.MODEL and data['options']['num_ctx']==4096
        assert 'images' not in json.dumps(data), 'Text-only model must not receive images'
        return Reply()
class Tests(unittest.TestCase):
    def setUp(self):
        STATE['kind']='ok';self.patch=patch.object(s.httpx,'AsyncClient',Upstream);self.patch.start()
        self.client=TestClient(s.app);self.client.__enter__()
    def tearDown(self):self.client.__exit__(None,None,None);self.patch.stop()
    def test_auth(self):
        self.assertEqual(self.client.get('/health').status_code,401)
        self.assertEqual(self.client.get('/health',headers={'Authorization':'Bearer wrong'}).status_code,401)
        self.assertTrue(self.client.get('/health',headers=AUTH).json()['ok'])
    def test_cors(self):
        h={'Origin':'https://alperenay.github.io','Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'authorization,content-type','Access-Control-Request-Private-Network':'true'}
        r=self.client.options('/solve',headers=h);self.assertEqual(r.status_code,200)
        self.assertEqual(r.headers['access-control-allow-private-network'],'true')
        h['Origin']='https://unrelated.example';self.assertEqual(self.client.options('/solve',headers=h).status_code,400)
    def test_validation(self):
        for payload in [{'question':'2+2','subject':'Tarih'},{'question':' ','subject':'Fizik'},{'question':'x'*6001,'subject':'Kimya'}]:
            self.assertEqual(self.client.post('/solve',headers=AUTH,json=payload).status_code,422)
        self.assertEqual(self.client.post('/solve',headers=AUTH,content=b'X'*65537).status_code,413)
    def test_stream_and_semaphore(self):
        data={'question':'x+3=8, x kaçtır?','subject':'Matematik'}
        for mode in ['ok','bad','incomplete','ok']:
            STATE['kind']=mode;r=self.client.post('/solve',headers=AUTH,json=data)
            self.assertEqual(r.status_code,200)
            events=[json.loads(x) for x in r.text.splitlines()]
            self.assertEqual(bool(events[-1].get('done')),mode=='ok')
            if mode!='ok':self.assertIn('error',events[-1])
    def test_ocr_limits(self):
        with patch.dict(sys.modules,{'numpy':None,'easyocr':None}):
            self.assertEqual(self.client.post('/ocr',headers=AUTH,content=b'not an image').status_code,415)
        self.assertEqual(self.client.post('/ocr',headers=AUTH,content=b'x'*(s.MAX_BYTES+1)).status_code,413)
        with patch.object(s,'transcribe',return_value={'text':'2x+3=11','requires_confirmation':True}):
            self.assertTrue(self.client.post('/ocr',headers=AUTH,content=b'fixture').json()['requires_confirmation'])
    def test_image_formats_and_alpha(self):
        rgba=Image.new('RGBA',(20,15),(0,0,0,0));buf=io.BytesIO();rgba.save(buf,format='PNG')
        image=s.image_bytes(buf.getvalue());self.assertEqual(image.getpixel((0,0)),(255,255,255))
        with self.assertRaises(s.HTTPException):s.image_bytes(b'<svg></svg>')
    def test_model_missing(self):
        with patch.object(Reply,'json',return_value={'models':[]}):
            self.assertFalse(self.client.get('/health',headers=AUTH).json()['ok'])
if __name__=='__main__':unittest.main(verbosity=2)
