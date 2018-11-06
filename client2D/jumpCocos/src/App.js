var GameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        //初始化物理世界
        this.initPhysics();
        //开启计时器
        this.scheduleUpdate();
        //显示碰撞框体
        this.showDebug();

        this.len = 1
        var size = cc.winSize;
        this.helloLabel = new cc.LabelTTF("中文中文aa", "Marker", 80)
        this.helloLabel1 = new cc.LabelTTF("中文中文aa2", "font1", 80)
        this.helloLabel2 = new cc.LabelTTF("中文中文aa2", "font2", 80)
        this.addChild(this.helloLabel1);
        this.addChild(this.helloLabel2);
        this.helloLabel.x = this.helloLabel2.x = this.helloLabel1.x = size.width / 2;
        this.helloLabel.y = size.height / 2 + 200;
        this.helloLabel1.y = size.height / 2;
        this.helloLabel2.y = size.height / 2 - 200;
        //this.addChild(this.helloLabel, 5);
        this.helloLabel1.setColor(cc.color(0, 178, 255))
        this.helloLabel2.setColor(cc.color(0, 178, 111))
        this.helloLabel.setColor(cc.color(0, 233, 12))
        this.time = 0
        this.sprite = new cc.Sprite(res.HelloWorld_png)
        this.sprite.setAnchorPoint(0.5, 0.5)
        this.sprite.setPosition(size.width / 2, size.height / 2)
        this.sprite.setScale(size.height / this.sprite.getContentSize().height)
        //this.addChild(this.sprite, 0)
        //this.getScreenShotInCanvasModele()
        window.ddd = this
        var button1 = new cc.MenuItemImage(res.HelloWorld_png, res.HelloWorld_png, this.beginLoop, this)
        button1.setPosition(cc.p(551, 112))
        var button2 = new cc.MenuItemImage(res.HelloWorld_png,
            res.HelloWorld_png, this.beginLoop, this)

        button2.setPosition(cc.p(551, 112))

        this.menu = new cc.Menu(button1, button2)
        this.menu.setPosition(cc.p(-100, 300))

        this.addChild(this.menu)

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
        var body = new cp.Body(1, cp.momentForBox(1, 50, 50));    //其中参数 1 是质量(mass) |  50是框体的 宽和高
        body.setPos(p);
        this.space.addBody(body);

        var shape = new cp.BoxShape(body, 50, 50);
        shape.setElasticity(0.5);             //设置弹性系数
        shape.setFriction(0.5);               //设置摩擦力
        this.space.addShape(shape);
        //创建物理精灵

        var sprite = new cc.PhysicsSprite(res.HelloWorld_png);

        sprite.setBody(body);
        sprite.setPosition(cc.p(p.x, p.y));
        this.addChild(sprite);

        //sprite.addChild()
//shape.addCallback(new cc.LabelTTF("中文中文aa2", "font2", 80))
        return true;
    },


    beginLoop: function (btn) {
        initSocket()
        this.schedule(this.run, 1 / 30)
        this.menu.setVisible(false)
        console.log("开始录制！！")
    },
    run: function (time) {
        this.len++
        this.time += time
        let posY = cc.winSize.height * Math.sin(this.time)
        this.helloLabel.y = Math.abs(posY * .6)
        this.helloLabel1.y = Math.abs(posY * .5)
        this.helloLabel2.y = Math.abs(posY * .8)


        // 数据上传位置
        let base64Data = {}
        if (this.len < 200) {
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
        this._debugNode.visible = true;     // 为true 时, 显示物理框体
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

