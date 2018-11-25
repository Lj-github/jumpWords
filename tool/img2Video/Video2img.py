# -*- coding: utf-8 -*-
# @Time    : 2018/11/3 下午4:24
#没问题
# pip install opencv-python 安装
import cv2

mp4File = "/Users/admin/Desktop/vedio/0012bqfTlx07nCLkfpTa01040200hbIU0k010.mp4"
#outfile 必须存在  需要提前检查文件夹
imgOutFile = "/Users/admin/Desktop/vedio/"

vc = cv2.VideoCapture(mp4File)
#默认 好像是30 fps
c = 1
if vc.isOpened():
    rval, frame = vc.read()
else:
    rval = False
while rval:
    rval, frame = vc.read()
    cv2.imwrite(imgOutFile+'The_Path_to_Save_Your_Pics' + str(c) + '.jpg', frame)
    c = c + 1
    cv2.waitKey(1)
vc.release()


