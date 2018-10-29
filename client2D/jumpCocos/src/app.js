var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("中文中文aa", "Marker", 80)
        var helloLabel1 = new cc.LabelTTF("中文中文aa2", "font1", 80)
        var helloLabel2 = new cc.LabelTTF("中文中文aa2", "font2", 80)
        this.addChild(helloLabel1);
        this.addChild(helloLabel2);
        helloLabel.x = helloLabel2.x = helloLabel1.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        helloLabel1.y = size.height / 2;
        helloLabel2.y = size.height / 2 - 200;
        this.addChild(helloLabel, 5);
        helloLabel1.setColor(cc.color(0, 178, 255))
        helloLabel2.setColor(cc.color(0, 178, 111))
        helloLabel.setColor(cc.color(0, 233, 12))
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

