import os
import cv2
from PIL import Image
import numpy as np
#完美解决

# 需要 获取 图片size  和图片文件的大小
fourcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')


size = (640,360)

vw = cv2.VideoWriter('file.avi', fourcc=fourcc, fps=1.0, frameSize=size)

path = "/Users/admin/Desktop/vedio/"
filelist = os.listdir(path)
index = 0
for f in filelist:
    fp, fn = os.path.split(f)
    if fn.split(".").pop() == "jpg":
        print(f)
        f_read = cv2.imread(path+f)
        f_img = Image.fromarray(f_read)
        f_rs = f_img.resize([640,360],resample=Image.NONE)
        f_out = np.array(f_rs)
        vw.write(f_out)
vw.release()