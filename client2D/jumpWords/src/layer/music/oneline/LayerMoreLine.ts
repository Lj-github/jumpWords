// TypeScript file
/**
 * create by liujiang 2019/11/26 09:50 天气还可以
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
            this._count = 1
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            let width = Math.floor(gt.size.width / this._count)
            width = 2000
            egret.Matrix
            for (let i = 0; i < this._count; i++) {
                let ract = new egret.Shape()
                ract.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xff0000, 0x0000ff], [1, 1], [0, 255]);
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
                    let sy = Number(this.buff.voicehigh[i]) / degre
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