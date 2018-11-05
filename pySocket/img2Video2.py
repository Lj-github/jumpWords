import os
import cv2
from PIL import Image
import numpy as np
import base64
from io import BytesIO
# 完美解决

class PX():
    w = 0
    h = 0
# 图片信息 可以扩展
class imgInfo():
    PX = PX
    size = 0
def readb64(base64_string):
    sbuf = BytesIO()
    sbuf.write(base64.b64decode(base64_string))
    pimg = Image.open(sbuf)
    return cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)

# 需要 获取 图片size  和图片文件的大小

def getImgSizeAndPX(imgFile):
    im = Image.open(imgFile)  # 返回一个Image对象
    imgInfo1 = imgInfo()
    imgInfo1.PX.w = im.size[0]
    imgInfo1.PX.h = im.size[1]
    imgInfo1.size = os.path.getsize(imgFile)
    return imgInfo1

def del_file(path):
    for i in os.listdir(path):
        path_file = os.path.join(path, i)
        if os.path.isfile(path_file) :
            if path_file.find("html") <= -1:
                os.remove(path_file)
        else:
            del_file(path_file)

# 需要 获取 图片size  和图片文件的大小
# fourcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')
#
# path = "img/"
# index = 0
# img_root = path
# im_names = os.listdir(path)
#
# imgInfoB = getImgSizeAndPX(img_root + "" + str(1) + ".jpg")
# size = (imgInfoB.PX.w, imgInfoB.PX.h)
# resuze = [size[0], size[1]]
#
# vw = cv2.VideoWriter('file.avi', fourcc=fourcc, fps=30.0, frameSize=size)
#
# for im_name in range(len(im_names)):
#     jpgFile = img_root + "" + str(im_name + 1) + ".jpg"
#     if os.path.isfile(jpgFile):
#         fp, fn = os.path.split(jpgFile)
#         if fn.split(".").pop() == "jpg":
#             f = jpgFile
#             print(f)
#             f_read = cv2.imread(f)
#             f_img = Image.fromarray(f_read)
#             f_rs = f_img.resize(resuze, resample=Image.NONE)
#             f_out = np.array(f_rs)
#             vw.write(f_out)
#
# vw.release()
del_file("img/")
