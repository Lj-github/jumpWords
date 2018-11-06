# -*- coding: utf-8 -*-
# @Time    : 2018/11/6 下午2:27
# 直接读取 酷狗音乐 里面的歌词  在浏览器network 能找到
import json

txtFile = '我的唇吻不到我爱的人王奕心.txt'

def getTxtByFile(txtFile):
    allList = []
    with open(txtFile) as f:
        fTxt = f.read().split("↵")
        for item in fTxt:
            temp = {}
            temp['time'] = item.split('[').pop().split(']')[0]
            temp['words'] = item.split('[').pop().split(']').pop()
            allList.append(temp)
        return allList


