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
        this.schedule(this.run, 1/5)


        return true;
    },
    run: function (time) {
        this.time += time
        let posY = cc.winSize.height * Math.sin(this.time)
        this.helloLabel.y = Math.abs(posY * .6)


        //获取 canvas base64 data
        var canvas =  document.getElementById("gameCanvas");
        if(canvas){
            console.log( canvas.toDataURL())
        }


    }


});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

