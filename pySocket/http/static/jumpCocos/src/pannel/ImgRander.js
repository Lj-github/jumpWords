var ImgRander = cc.Layer.extend({

    ctor: function () {
        this._super();
        let img = new cc.Sprite(res.timg_jpg)
        img.x = gt.size.width / 2
        img.y = gt.size.height / 2
        img.setAnchorPoint(.5, .5)
        //this.addChild(img)
        this.img = img
        this.img.scale = 2
        //this.createAllImg()
        this.createRect()


        return true;
    },

    initMusicRander: function (path) {


    },
    createAllImg: function () {
        for (var i = 0; i < gt.musicRanderLanEnum; i++) {
            var img = new cc.Sprite(res.timg_jpg)
            this['img' + i] = img
            img.x = i * 20
            img.y = 0
            //img.width = 10
            img.setScaleX(.05)
            img.setAnchorPoint(.5, .5)
            this.addChild(img)
        }


    },

    createRect: function () {

        for (var i = 0; i < gt.musicRanderLanEnum; i++) {
            let drawNode = new cc.DrawNode();
            drawNode.clear();//清除节点缓存drawNode.ctor();//构造函数
            drawNode.drawRect(cc.p(i * 20, 0),
                cc.p(i * 20 + 18, 1000), // 设置的 大一些 不知道为什么 可能是bug  在  scale 设置 超过1 时候 同时 修改 scale  和 skew  会出现 偏移
                Union.getRandomColor(), 0);
            drawNode.setAnchorPoint(0, 0)
            this['img' + i] = drawNode
            this.addChild(drawNode)
            drawNode.setScaleY(.1)
            if (i === 0) {
                window["drawNode"] = drawNode
                drawNode.setSkewX(drawNode.getScaleY() * gt.rectSkewX)


            } else {
                if (i !== 1) {
                    drawNode.setVisible(false)
                }
            }
            //TODO cocos skew  也是 角度 但是 可能有bug  还 得要 调试
        }
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
        return true;
    },


});