// TypeScript file
/**
 * create by liujiang on 2019/12/2 16:59  md 脑袋有点懵逼
 * 让线条 扭起来..
 * 
 */

module game {
    export class LayerMagicLine extends BaseLayer {
        constructor() {
            super()
            this.initView()
            this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
        }
        _cernter: egret.Point
        buff: Music.musicbuffObj
        _count = 0
        mLine: GraphicsMagicLine
        initView() {
            window["LayerMagicLineIndd"] = this

            let mline = new GraphicsMagicLine()
            this.addChild(mline)
            this.mLine = mline
            mline.x = mline.y = 800


            /* this._count = MusicFactory.getVoicehighCount()
             this._count = 0
             this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
             this.removeChildren()
             let width = Math.floor(gt.size.width / this._count)
             width = 2000
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
             this.y = gt.size.height*/
        }
        getBuff() {
            this.buff = MusicFactory.getMusicBuff()
        }
        _update() {
            /* this.getBuff()
             this.setLine()
             this.sendBase64()*/
            this.setMagicLine()
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
        p2xv = -200
        pxd = 50
        setMagicLine() {
            this.mLine.p2x = this.p2xv
            this.p2xv += this.pxd
            if (this.p2xv >= 200 || this.p2xv <= -200) {
                this.pxd = -this.pxd
            }
        }
    }

}