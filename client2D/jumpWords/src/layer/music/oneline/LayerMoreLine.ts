// TypeScript file
/**
 * create by liujiang 2019/11/26 09:50 天气还可以
 * 
 * 条状的简单效果 不完美 这个就是简单的长条  上线动 
 */
module game {
    export class LayerMoreLine extends eui.Component {
        constructor() {
            super()
            this.initView()
            this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
        }
        _cernter: egret.Point
        buff: Music.musicbuffObj
        _count = 0
        degre = 0
        _ractList = []
        _shapList = []
        shapFocus: eui.Group
        lineFocus: eui.Group
        _stmp = 0
        initView() {
            this.removeChildren()
            window["dddd"] = this
            this.shapFocus = new eui.Group()
            this.lineFocus = new eui.Group()    
            this.addChild(this.lineFocus)
            this.addChild(this.shapFocus)
            this.degre = MusicFactory.getMusicValueDegre() * 2
            this._count = MusicFactory.getVoicehighCount()
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            let width = Math.floor(gt.size.width / this._count)
            let matrix = new egret.Matrix()
            matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
            let colors = [0x00688B, 0x008B8B, 0x33CCFF]// [0x000000, gt.getHexColor(1, 32, 97), 0xff0000]
            let alphas = [1, 0.9, 0.8]
            let ratios = [255 / 8, 255 / 8 * 4, 255]
            for (let i = 0; i < this._count; i++) {
                let ract = new egret.Shape()
                ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
                ract.graphics.drawRect(i * width, 0, width, gt.size.height);
                ract.graphics.endFill();
                this.lineFocus.addChild(ract);
                this._ractList.push(ract)
            }
            this.buff = <Music.musicbuffObj>{}
            this.buff.step = 0
            this.buff.voicehigh = []
            this.scaleY = -1
            this.y = gt.size.height
            this.lineFocus.filters = [gt.getLineFilter()]
        }
        getBuff() {
            this.buff = MusicFactory.getMusicBuff()
        }
        _update() {
            this.getBuff()
            this.setLine()
            this.sendBase64()
        }
        setLine() {
            this._stmp++
            if (this.buff.voicehigh) {
                for (let i = 0; i < this._ractList.length; i++) {
                    let rack = this._ractList[i]
                    let sy = Number(this.buff.voicehigh[i * this.buff.step]) / this.degre
                    sy = Math.abs(sy)
                    rack.scaleY = sy
                }
                if (this._stmp % 60 == 0) {
                    this.randomShape()
                }
            }
            this._shapList.forEach((shap: egret.Shape) => {
                shap.x++
                shap.y++
                if (shap.y > 2000) {

                }
            })


        }
        sendBase64() {
            BrowserMethodMgr.sendBase64ToJxBrowser()
        }


        randomShape() {
            let Shape = this.createShape()
            this._shapList.push(Shape)
        }
        createShape() {
            let ract = new egret.Shape()
            ract.graphics.beginFill(gt.getRandomColor());
            ract.graphics.drawRect(300, 300, 300, 300);
            ract.graphics.endFill();
            this.shapFocus.addChild(ract);
            return ract

        }
    }
}