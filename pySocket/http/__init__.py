# -*- coding: utf-8 -*-
# @Time    : 2018/11/26 下午3:45
from flask import Flask
import logging
from flask_cors import *

# set up logging to file - see previous section for more details
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
                    datefmt='%m-%d %H:%M',
                    filename='./flask.log',
                    filemode='w')
# define a Handler which writes INFO messages or higher to the sys.stderr
console = logging.StreamHandler()
console.setLevel(logging.DEBUG)
# set a format which is simpler for console use
formatter = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')
# tell the handler to use this format
console.setFormatter(formatter)
# add the handler to the root logger
logging.getLogger('').addHandler(console)

app = Flask(__name__)
CORS(app, supports_credentials=True)

from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask import redirect
import flask
import json


# 上传文件
@app.route('/upload', methods=["GET", 'POST'])
def upload():
    if request.method == 'OPTIONS':
        res = flask.make_response()
    if request.method == 'POST':
        upload
        data = request.data

        # data = json.loads(data)
        res = flask.make_response(data)
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'POST，GET,OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return res
