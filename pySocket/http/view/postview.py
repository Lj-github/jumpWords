# -*- coding: utf-8 -*-
# @Time    : 2018/12/24 上午11:06
from flask import render_template, request, make_response
from pySocket.http import app
from flask import jsonify
import json
from pySocket.http.lib import lzstring
import base64
x = lzstring.LZString()

@app.route('/post/', methods=['POST'])
def postTest():
    username = request.values['username']  # json['username']
    content = request.values['content']  # .json['']
    print("username " + username)
    print("content " + content)
    loader = {}
    loader['dd'] = 5
    return json.dumps(loader), 200, {'Content-Type': 'application/json; charset=utf-8'}


@app.route('/mydict', methods=['GET', 'POST'])
def mydict():
    d = {'name': 'xmr', 'age': 18}
    return jsonify(d)

@app.route('/jumpCocos/', methods=['GET'])
def index_jumpCocos():
    return render_template('jumpCocos/index.html')


@app.route('/postSaveTxt/', methods=['POST'])
def postSaveTxt():
    username = request.values['username']
    #content = x.decompress(request.values['content'])
    content =request.values['content']
    # print('username  ' + username)
    # with open("static/txt/" + username, 'w') as f:
    #     f.write(content)
    base64Str = content.replace('data:image/png;base64,', '')
    imgdata = base64.b64decode(base64Str)
    file = open('static/txt/' + str(username) + '.jpg', 'wb')
    file.write(imgdata)
    file.close()
    loader = {}
    loader['code'] = 'success'
    return json.dumps(loader), 200, {'Content-Type': 'application/json; charset=utf-8'}
