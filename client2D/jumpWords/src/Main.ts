window["pb"] = {}
/**
     created by liujiang
     time 2019/2/11 11:07
 */
class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })


    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        //this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
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
        let black = new eui.Rect()
        black.fillColor = 0x000000
        black.width = gt.size.width
        black.height = gt.size.height
        this.removeChildren()
        this.addChild(black)
        // let music = new game.LayerReadMusci()
        // this.addChild(music)
        //let line = new game.LayerOneLine()
        //let line = new game.LayerMoreLine()
        //let line = new game.LayerMagicLine()
        let line = new game.LayerMagicArc()
        this.addChild(line)
        //this.visible = false
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
}