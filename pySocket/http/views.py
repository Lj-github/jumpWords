# -*- coding: utf-8 -*-
# @Time    : 2018/11/26 下午3:39
# -*- coding: utf-8 -*-
from flask import render_template, request
from pySocket.http import app
import json
import base64

from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask import redirect

AllImgData = []


@app.route('/')
def hello_world():
    return "hello world"


@app.route('/users=<id>')  # 直接绑定 接口 好像是比ruby rails 简单一点 http://127.0.0.1:5000/users=55
def hello_users(id):
    return "{users: " + id + "}"


@app.route('/test=<id>')  # http://127.0.0.1:5000/test=55
def hello_test(id):
    return "test: " + id


@app.route('/register', methods=['POST'])
def register():
    AllImgData.append(register)
    # msg = json.loads(register)
    # print(msg.id)
    return "success: " + "aaaa"  # msg.id
    # msgID = int(msg['id'])
    # le = le + 1
    # if msgID == 0:
    #     # for i in allCode:
    #     base64Str = msg['base64'].replace('data:image/png;base64,', '')
    #     imgdata = base64.b64decode(base64Str)
    #     file = open('img/' + str(le) + '.jpg', 'wb')
    #     file.write(imgdata)
    #     file.close()

@app.route('/indexTest/', methods=['GET'])
def index_Iframe():
    return render_template('index.html')


@app.route('/ttttt', methods=['GET', 'POST'])
def create_task():
    if request.method == 'POST':
        if not request.json or not 'title' in request.json:
            abort(400)
        return jsonify({'task': "dd"}), 201

    return jsonify({'tasks': "dd"})
