# -*- coding: utf-8 -*-
# @Time    : 2018/11/5 下午4:28

import asyncio
import websockets  # https://websockets.readthedocs.io/en/stable/
import base64
import json
import os

le = 0
allCode = []


async def echo(websocket, path):
    async for message in websocket:
        # 接受到的消息
        # print("recv" + message)
        global allCode
        # allCode.append(message.replace('data:image/png;base64,', ''))
        global le
        msg = json.loads(message)
        msgID = int(msg['id'])
        le = le + 1
        if msgID == 0:
            # for i in allCode:
            base64Str = msg['base64'].replace('data:image/png;base64,', '')
            imgdata = base64.b64decode(base64Str)
            file = open('img/' + str(le) + '.jpg', 'wb')
            file.write(imgdata)
            file.close()
            await websocket.send("success")
        elif msgID == 1:
            os.system("python3 img2Video2.py")
            await websocket.send("publish success!!!")


host = '192.168.1.214'
host = 'localhost'
host = '192.168.199.159'
asyncio.get_event_loop().run_until_complete(websockets.serve(echo, host, 9999))
asyncio.get_event_loop().run_forever()
print("begin")
