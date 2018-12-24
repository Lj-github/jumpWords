var ImgRander = cc.Layer.extend({

    ctor: function () {
        this._super();
        let img = new cc.Sprite(res.timg_jpg)
        img.x = gt.size.width / 2
        img.y = gt.size.height / 2
        img.setAnchorPoint(.5, .5)
        this.addChild(img)
        this.img = img
        this.img.scale = 2
        this.createAllImg()


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