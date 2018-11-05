# -*- coding: utf-8 -*-
# @Time    : 2018/11/5 下午4:28

import asyncio
import websockets  #https://websockets.readthedocs.io/en/stable/
import base64
le = 0
allCode = []

async def echo(websocket, path):
    async for message in websocket:
        # 接受到的消息
        print("recv" + message)
        global allCode
        allCode.append(message.replace('data:image/png;base64,', ''))
        global le
        le = le + 1
        if le < 300:
            # for i in allCode:
            imgdata = base64.b64decode(message.replace('data:image/png;base64,', ''))
            file = open('img/' + str(le) + '.jpg', 'wb')
            file.write(imgdata)
            file.close()
        await websocket.send("success")


asyncio.get_event_loop().run_until_complete(websockets.serve(echo, '192.168.1.214', 9999))
asyncio.get_event_loop().run_forever()
