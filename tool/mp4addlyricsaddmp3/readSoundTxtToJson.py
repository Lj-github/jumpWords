# -*- coding: utf-8 -*-
# @Time    : 2018/11/6 下午2:27
# 直接读取 酷狗音乐 里面的歌词  在浏览器network 能找到


import json

txtFile = '我的唇吻不到我爱的人王奕心.txt'




if __name__ == '__main__':
    with open(txtFile) as f:
        fTxt = f.split("↵")


    pass
