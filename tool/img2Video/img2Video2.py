import os
import cv2
from PIL import Image
import numpy as np

# 完美解决

# 需要 获取 图片size  和图片文件的大小
fourcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')

size = (576, 1024)

vw = cv2.VideoWriter('file.avi', fourcc=fourcc, fps=30.0, frameSize=size)

path = "/Users/admin/Desktop/vedio/"
index = 0
img_root = path
im_names = os.listdir(path)
for im_name in range(len(im_names)):
    jpgFile = img_root + "The_Path_to_Save_Your_Pics" + str(im_name + 1) + ".jpg"
    if os.path.isfile(jpgFile):
        fp, fn = os.path.split(jpgFile)
        if fn.split(".").pop() == "jpg":
            f = jpgFile
            print(f)
            f_read = cv2.imread(f)
            f_img = Image.fromarray(f_read)
            f_rs = f_img.resize([576, 1024], resample=Image.NONE)
            f_out = np.array(f_rs)
            vw.write(f_out)

vw.release()
