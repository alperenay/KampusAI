import sys
from PIL import Image
fs=sys.argv[2:]; ims=[Image.open('s3d/'+f+'.png') for f in fs]; w=max(i.size[0] for i in ims); h=max(i.size[1] for i in ims); n=4; rows=(len(ims)+n-1)//n
im=Image.new('RGB',(w*n,h*rows)); [im.paste(x,((k%n)*w,(k//n)*h)) for k,x in enumerate(ims)]; im=im.resize((w*n//2,h*rows//2)); im.save('s3d/'+sys.argv[1]+'.png')
