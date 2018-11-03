# -*- coding: utf-8 -*-
# @Time    : 2018/11/3 下午4:24

mp4File = "/Users/admin/Desktop/vedio/0012bqfTlx07nCLkfpTa01040200hbIU0k010.mp4"
#outfile 必须存在  需要提前检查文件夹
imgOutFile = "/Users/admin/Desktop/vedio/"

import cv2
'''  不行 失败    '''
try:
    from cv2 import VideoWriter, VideoWriter_fourcc, imread, resize
except:
    print("no import")
import os


def GetFileList(dir, fileList):
    newDir = dir
    if os.path.isfile(dir):

        fileList.append(dir)
    elif os.path.isdir(dir):
        for s in os.listdir(dir):
            newDir = os.path.join(dir, s)
            GetFileList(newDir, fileList)
    return fileList

img_root = "/Users/admin/Desktop/vedio/"
# Edit each frame's appearing time!
fps = 5
fourcc =VideoWriter_fourcc(*'XVID')
videoWriter = cv2.VideoWriter("The_Way_You_Want_to_Save_Your_Vid1.avi", fourcc, fps, (1200, 1200))


im_names = os.listdir(img_root)
for im_name in range(len(im_names)):
    jpgFile = img_root + im_names[im_name]
    fp,fn = os.path.split(jpgFile)
    if fn.split(".").pop() == "jpg":
    # if  os.path.isfile(jpgFile):
        frame = cv2.imread(jpgFile)
        videoWriter.write(frame)

videoWriter.release()