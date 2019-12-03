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
        initView() {
            this._count = MusicFactory.getVoicehighCount()
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            let width = Math.floor(gt.size.width / this._count)
            for (let i = 0; i < this._count; i++) {
                let mline = new GraphicsMagicLine()
                mline.p2x = 200
                this.addChild(mline)
                mline.x = i * width
                mline.y = 0
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
                    let rack = <GraphicsMagicLine>this.$children[i]
                    let sy = Number(this.buff.voicehigh[i * this.buff.step]) / degre
                    sy = Math.abs(sy)
                    // rack.scaleY = sy
                    rack.p2x = sy * 400 - 200
                }
            }
        }
        sendBase64() {
            BrowserMethodMgr.sendBase64ToJxBrowser()
        }
        $onRemoveFromStage() {
            this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            super.$onRemoveFromStage()
        }
    }

}