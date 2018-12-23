# -*- coding: utf-8 -*-
# @Time    : 2018/11/26 下午3:39
# -*- coding: utf-8 -*-
from flask import render_template, request
from pySocket.http import app
import json
import base64
AllImgData = []
@app.route('/')
def hello_world():
    return "hello world"


@app.route('/users=<id>')   #直接绑定 接口 好像是比ruby rails 简单一点 http://127.0.0.1:5000/users=55
def hello_users(id):
    return "users: " + id


@app.route('/test=<id>')   #http://127.0.0.1:5000/test=55
def hello_test(id):
    return "test: " + id


@app.route('/', methods=['POST'])
def index(data):
    AllImgData.append(data)
    msg = json.loads(data)
    print(msg.id)
    # msgID = int(msg['id'])
    # le = le + 1
    # if msgID == 0:
    #     # for i in allCode:
    #     base64Str = msg['base64'].replace('data:image/png;base64,', '')
    #     imgdata = base64.b64decode(base64Str)
    #     file = open('img/' + str(le) + '.jpg', 'wb')
    #     file.write(imgdata)
    #     file.close()



