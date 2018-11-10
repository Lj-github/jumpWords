var GameLayer = cc.Layer.extend({

    lyricsIndex: 0,
    fontSizeScale: .2,

    ctor: function () {
        this._super();
        //初始化物理世界
        this.initPhysics();
        //开启计时器
        this.scheduleUpdate();
        //显示碰撞框体
        this.showDebug();
        this.len = 1
        var size = cc.winSize
        this.time = 0
        //this.getScreenShotInCanvasModele()
        var button1 = new cc.MenuItemImage(res.HelloWorld_png, res.HelloWorld_png, this.beginLoop, this)
        button1.setPosition(cc.p(551, 112))
        var button2 = new cc.MenuItemImage(res.HelloWorld_png,
            res.HelloWorld_png, this.beginLoop, this)
        button2.setPosition(cc.p(551, 112))
        this.menu = new cc.Menu(button1, button2)
        this.menu.setPosition(cc.p(-100, 300))
        this.addChild(this.menu)
        Union.getLyrics(res.lyrics, this, function (data) {
            console.log("data", data)
            this.lyrics = Union.splitLyricsToJson(data)
            this.beginLoop()
        })
        return true;
    },

    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.TouchBegan.bind(this)
        }, this);
    },

    onExit: function () {
        this._super();
        cc.eventManager.removeListener(cc.EventListener.TOUCH_ONE_BY_ONE);
    },
    TouchBegan: function (touch, event) {
        cc.log("TouchBegan");
        var p = touch.getLocation();
        this.createPhysicLabel('中文中文aaaaa', p)
        return true;
    },
    /*
      文字  位置
     */
    createPhysicLabel: function (txt, pos) {
        var pos = pos
        if (!pos) {
            pos = cc.p(0, 0)
        }
        var p = pos
        let lbl = new cc.LabelTTF(txt, "font2", 50)
        lbl.color = Union.getRandomColor()
        lbl.setPosition(p)
        this.addChild(lbl)
        return lbl
    },

    drupBody: function () {
        if (!this.oldlbl) {
            return
        }
        this.oldlbl.removeFromParent()
        let scale = this.fontSizeScale
        var p = this.oldlbl.getPosition()
        let lbl = this.oldlbl
        let w = lbl.width
        let h = lbl.height * .9
        //设置最终大小
        var body = new cp.Body(1, cp.momentForBox(1, w, h));    //其中参数 1 是质量(mass) |  50是框体的 宽和高
        body.setPos(p);
        this.space.addBody(body);

        var shape = new cp.BoxShape(body, w * scale, h * scale);
        shape.setElasticity(0.5);             //设置弹性系数
        shape.setFriction(0.5);               //设置摩擦力
        this.space.addShape(shape);
        //创建物理精灵
        var sprite = new cc.PhysicsSprite(res.HelloWorld_png);
        sprite.opacity = 0

        sprite.setBody(body);
        sprite.setPosition(cc.p(p.x, p.y));
        this.addChild(sprite);
        lbl.setAnchorPoint(0.5, 0.5)
        lbl.setPosition(w / 2, h / 2)
        sprite.width = lbl.width
        sprite.height = lbl.height
        sprite.addChild(lbl)
        var action = cc.scaleTo(2, scale, scale);
        sprite.runAction(action);
    },

    beginLoop: function (btn) {
        initSocket()
        this.lyricsIndex = 0
        this.schedule(this.run, 1 / 60)
        this.menu.setVisible(false)
        console.log("开始录制！！")
    },
    run: function (time) {
        this.len++
        this.time += time
        let posY = cc.winSize.height * Math.sin(this.time)
        let d = new cc.p()
        d.x = gt.size.width / 2
        d.y = gt.size.height * .8
        let data = this.lyrics[this.lyricsIndex]
        let timeD = data.time.toFixed(2)
        let txt = data.txt
        let timeNow = this.time.toFixed(2)
        //console.log('timeNow', timeNow, 'timeD', timeD)
        if ((timeD - timeNow) <= 0.02) {
            this.drupBody()
            this.oldlbl = this.createPhysicLabel(txt, d)
            this.lyricsIndex++
        }
        // 数据上传位置
        let base64Data = {}
        if (this.lyricsIndex <= 20) {
            base64Data.id = 0//base64 msg
            base64Data.base64 = this.getScreenShotInCanvasModele()
        } else {
            base64Data.id = 1
            this.unschedule(this.run)
        }
        sendMsg(JSON.stringify(base64Data))
    },
    initPhysics: function () {
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -200);     //设置重力  重力向下为 200
        var staticBody = this.space.staticBody;

        var walls = [
            new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(width, 0), 0),    //最后一个参数是墙的厚度 , 很重要 , 没有厚度的墙体容易被穿透.
            new cp.SegmentShape(staticBody, cp.v(0, height), cp.v(width, height), 0),
            new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(0, height), 0),
            new cp.SegmentShape(staticBody, cp.v(width, 0), cp.v(width, height), 0)
        ];

        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setElasticity(1);     //设置弹性系数
            shape.setFriction(1);       //设置摩擦力
            this.space.addStaticShape(shape);
        }
    },
    update: function (dt) {
        var timeStep = 0.03;
        this.space.step(timeStep);    //timeStep 控制物理世界的时间流速
    },
    showDebug: function () {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = false;     // 为true 时, 显示物理框体
        this.addChild(this._debugNode);
    },


    //在project json  "renderMode":1, canvas  0 webgl
    //获取 canvas base64 data   //canvas 使用 toDataURL 可以完美截图
    getScreenShotInCanvasModele: function () {
        return document.getElementById("gameCanvas").toDataURL()
    },
    getScreenShotInWebglModele: function () {
        var listener = cc.eventManager.addListener({
            event: cc.EventListener.CUSTOM,
            eventName: cc.Director.EVENT_AFTER_DRAW,
            callback: function (event) {
                function grab(x, y, width, height) {
                    var arrayBuffer = new Uint8Array(width * height * 4);
                    cc.game._renderContext.readPixels(x, y, width, height, cc.game._renderContext.RGBA, cc.game._renderContext.UNSIGNED_BYTE, arrayBuffer);
                    var clampArray = new Uint8ClampedArray(arrayBuffer, 0, arrayBuffer.length);
                    var imageData = new ImageData(clampArray, width, height);
                    var tempCanvas = document.createElement('canvas');
                    document.appendChild(tempCanvas)
                    tempCanvas.getContext('2d').putImageData(imageData, 0, 0, 0, 0, cc.game._renderContext.drawingBufferWidth, cc.game._renderContext.drawingBufferHeight);
                    console.log(tempCanvas.toDataURL());
                }

                grab(0, 0, cc.game._renderContext.drawingBufferWidth, cc.game._renderContext.drawingBufferHeight);
                //grab(0, 0, cc.winSize.width, cc.winSize.height);

                cc.eventManager.removeListener(listener);
                listener = undefined;
            }
        }, cc.Director._getInstance().getRunningScene());// 这是 webgl 渲染下 的可以 捕捉 内容
    }

});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

