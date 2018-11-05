# -*- coding: utf-8 -*-
# @Time    : 2018/11/3 下午7:19

strs = ''
# strs = "1.jpg"
import os
import cv2
from PIL import Image
import numpy as np
import \
    base64  # https://stackoverflow.com/questions/33754935/read-a-base-64-encoded-image-from-memory-using-opencv-python-library
from io import BytesIO


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


def readBase64(strs, resuze, vw):
    f_read = readb64(strs)
    # cv2.imshow(cvimg)
    f_img = Image.fromarray(f_read)
    f_rs = f_img.resize(resuze, resample=Image.NONE)
    f_out = np.array(f_rs)
    vw.write(f_out)


def releaseVW(vw):
    vw.release()


# 需要 获取 图片size  和图片文件的大小  只需要获取 一张即可
vw = None


def run():
    fourcc = cv2.VideoWriter_fourcc('M', 'J', 'P', 'G')
    size = (500, 1000)
    resuzea = [size[0], size[1]]
    global vw
    vw = cv2.VideoWriter('base64Test.avi', fourcc=fourcc, fps=30.0, frameSize=size)
    #readBase64("", resuze=resuzea, vw=vw)
