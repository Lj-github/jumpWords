var GameLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
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
        this.addChild(this.helloLabel, 5);
        this.helloLabel1.setColor(cc.color(0, 178, 255))
        this.helloLabel2.setColor(cc.color(0, 178, 111))
        this.helloLabel.setColor(cc.color(0, 233, 12))
        this.time = 0
        this.schedule(this.run, 1 / 30)

        this.sprite = new cc.Sprite(res.HelloWorld_png)
        this.sprite.setAnchorPoint(0.5, 0.5)
        this.sprite.setPosition(size.width / 2, size.height / 2)
        this.sprite.setScale(size.height / this.sprite.getContentSize().height)
        //this.addChild(this.sprite, 0)

        //this.getScreenShotInCanvasModele()
        //init()
        return true;
    },
    run: function (time) {
        this.time += time
        let posY = cc.winSize.height * Math.sin(this.time)
        this.helloLabel.y = Math.abs(posY * .6)
        sendMsg(this.getScreenShotInCanvasModele())

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

