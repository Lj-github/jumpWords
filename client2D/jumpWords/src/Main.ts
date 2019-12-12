window["pb"] = {}
/**
     created by liujiang
     time 2019/2/11 11:07
 */
class Main extends eui.UILayer {
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            //  egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        gt.size = {
            width: egret.MainContext.instance.stage.stageWidth,
            height: egret.MainContext.instance.stage.stageHeight
        };
        //字体 不行
        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width =  gt.size.width - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "开始";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // //colorLabel.scaleY = colorLabel.scaleX = 5
        // colorLabel.fontFamily ="hanti";
        // this.addChild(colorLabel);
        //colorLabel.filters =  [gt.getCustomFilter(0, 255, 0)]

        App.run()
        this.createBg()
        // let music = new game.LayerReadMusci()
        // this.addChild(music)
        //let line = new game.LayerOneLine()
        let line = new game.MusicEffLineScale()
        //let line1 = new game.LayerMagicLine()
        //let line = new game.LayerMagicArc()
        // let line = new game.LayerArcLine1()
        //let lineTools = new game.LayerValueTools()
        // this.addChild(lineTools)
        //let douying = new game.LayerDouYingImg()
        this.addChild(line)
        //CanvasToWebmUtils.demo()
        //this.visible = false
    }
    createBg() {
        let black = new eui.Rect()
        black.fillColor = 0x000000
        black.width = gt.size.width
        black.height = gt.size.height
        this.removeChildren()
        this.addChild(black)
    }

    private initProto() {
        gp.initAllMessage("resource/proto/GameProtocol.proto", () => {
            // 自动寻路  例子
            let p = new Game()
            p.visible = false
            this.addChild(p);
            gt.SocketClient = new SocketClient()
            //ws://localhost:
            gt.SocketClient.connectToCoreServer("localhost", "8081/socket", () => {
                gt.SocketClient.registerOnEvent(gp.loginS2C, this.onres, this)
                // let msg = new gp.AwesomeMessage()
                // gt.SocketClient.send(msg)
            }, this)
        }, this)

    }
    onres(msg: gp.loginS2C) {
        console.log(msg)
        console.log(msg.name)
    }
    private reloadEgretFun() {
    }

    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}