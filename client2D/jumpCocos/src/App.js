var GameLayer = cc.Layer.extend({

    lyricsIndex: 0,
    fontSizeScale: .2,
    dt:0,
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
        // Union.getLyrics(res.lyrics, this, function (data) {
        //     let lyricsTxt = data
        //
        //     console.log("data", data)
        //     this.lyrics = Union.splitLyricsToJson(data)
        //     this.beginLoop()
        // })
        this.sprite = new cc.Sprite(res.HelloWorld_png)
      this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2
      })
      this.addChild(this.sprite, 0)
         Union.getMp3(music.mp31, this, function (data) {
            console.log("data", data)
             let musciRander = new Music.ReadBuff()
             this.musciRander = musciRander
             musciRander.init(music.mp31)
            this.beginLoop()
        })
        gt.dddd = 1


        let imgLayer = new ImgRander()
        this.addChild(imgLayer)
        this.imgLayer = imgLayer

        this.initShader()
        gt.createCanvasForWEBGLRander()
        return true;
    },

    initMusicRander:function(path){
        this.musicRander = new  Music.ReadBuff(path)
    },

    initShader : function () {
        this.graySprite(this.imgLayer.img ,gt.shader.Wave.vsh,gt.shader.Wave.fsh)
    } ,
    graySprite: function (sprite,vertexSrc,grayShaderFragment){
        if(sprite){
            //!! 只能在webgl 模式下 运行...
            var  shader = new cc.GLProgram()//cc.GLProgram.create("gray.vsh", "gray.fsh")
            // var shader =cc.GLProgram.create("res/shader/gray.vsh", "res/shader/gray.fsh")
            shader.retain()
            shader.initWithVertexShaderByteArray(vertexSrc, grayShaderFragment)
            shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION)
            shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR)
            shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS)
            shader.link()
            shader.updateUniforms()
            sprite.setShaderProgram(shader)
            this.shader = shader
        }
    },
    runShader:function(delta,musicVal){
        this.dt += delta
        this.time += delta
        this.shader.use()
        this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_radius'), 0.003 * this.dt )
       // this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_vector'), musicVal / 20 )
        if(musicVal  === 0  ){musicVal = 0.01}

        this.imgLayer.img.scaleX =  (musicVal /200) * 2  + 2

        this.shader.updateUniforms()
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
        this.oldlbl = this.createPhysicLabel('中文中文aaaaa', p)
        this.drupBody()
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
        //this.schedule(this.run, 1 / 60)
         this.schedule(this.runWithMusci, 1 / 60)
        this.menu.setVisible(false)
        console.log("开始录制！！")
    },

    runWithMusci:function(time){
        let muscicBuff = this.musciRander.getBuff()
       //console.log("musicBuf",muscicBuff)
        let voicehigh = muscicBuff.voicehigh
        let step = muscicBuff.step
        //let value=voicehigh[step*gt.musicRanderLanEnum/2];
        let value=voicehigh[step*gt.musicRanderLanEnum/5];
        let all  = 0

        for (var i = 0 ;i <gt.musicRanderLanEnum;i++){
            let value=voicehigh[step*i]; // 0 -200
            if(value){
                all = all + value
                var img =  this.imgLayer['img' +i]
                img.setScaleY( value/40 || 0.01)
            }
        }
       this.runShader(time,all/gt.musicRanderLanEnum)
        // 数据上传位置
        let base64Data = {}
        //if (this.lyricsIndex <= 20) {
        if (this.len <= 6000) {
            base64Data.id = 0//base64 msg
           // base64Data.base64 = this.getScreenShotInCanvasModele()
             base64Data.base64 = this.getScreenShotInWebglModele()
        } else {
            base64Data.id = 1
            this.unschedule(this.run)
        }
        //console.log(base64Data)
        pushMsg(JSON.stringify(base64Data))
        base64Data = undefined

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
        //sendMsg(JSON.stringify(base64Data))
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
    //{preserveDrawingBuffer: true} 可以完美截图
    getScreenShotInCanvasModele: function () {
        return document.getElementById("gameCanvas").toDataURL()
    },
    getScreenShotInWebglModele: function () {
        return document.getElementById("gameCanvas").toDataURL()
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

