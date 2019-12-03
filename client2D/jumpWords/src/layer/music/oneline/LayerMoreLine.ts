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
        initView() {
            this._count = MusicFactory.getVoicehighCount()
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            let width = Math.floor(gt.size.width / this._count)
            let matrix = new egret.Matrix()
            matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
            let colors = [0x000000, gt.getHexColor(1, 32, 97), 0xff0000]
            let alphas = [1, 0.9, 0.8]
            let ratios = [255 / 3, 255 / 3 * 2, 255]
            for (let i = 0; i < this._count; i++) {
                let ract = new egret.Shape()
                ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
                ract.graphics.drawRect(i * width, 0, width, gt.size.height);
                ract.graphics.endFill();
                this.addChild(ract);
            }
            this.buff = <Music.musicbuffObj>{}
            this.buff.step = 0
            this.buff.voicehigh = []
            this.scaleY = -1
            this.y = gt.size.height
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
            if (this.buff.voicehigh) {
                let degre = MusicFactory.getMusicValueDegre()
                for (let i = 0; i < this.$children.length; i++) {
                    let rack = this.$children[i]
                    let sy = Number(this.buff.voicehigh[i * this.buff.step]) / degre
                    sy = Math.abs(sy)
                    rack.scaleY = sy
                }
            }
        }
        sendBase64() {
            BrowserMethodMgr.sendBase64ToJxBrowser()
        }

       
    }
}