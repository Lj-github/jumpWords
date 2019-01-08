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
            drawNode.clear();//����ڵ㻺��drawNode.ctor();//���캯��
            drawNode.drawRect(cc.p(i * 20, 0),
                cc.p(i * 20 + 18, 1000), // ���õ� ��һЩ ��֪��Ϊʲô ������bug  ��  scale ���� ����1 ʱ�� ͬʱ �޸� scale  �� skew  ����� ƫ��
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
            //TODO cocos skew  Ҳ�� �Ƕ� ���� ������bug  �� ��Ҫ ����
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