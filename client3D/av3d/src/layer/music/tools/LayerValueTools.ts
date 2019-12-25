// TypeScript file

/**
 * create by liujiang on 2019/12/3  15:17 
 * 这个是为了实时查看当前的值  观察  音色范围 感觉的
 */
module game {
    export class LayerValueTools extends BaseLayer {

        constructor() {
            super()
            this.initView()
            this.addFrame()
        }
        _graphArr = []
        _labelArr = []
        _update() {
            super._update()
            this.setLine()
        }
        _cernter: egret.Point
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
                this._graphArr.push(ract)
            }

            for (let i = 0; i < this._count; i++) {
                let textVal = new eui.Label()
                textVal.text = "00"
                textVal.x = i * width
                textVal.y = gt.size.height - 50
                textVal.scaleY = -1
                // textVal.rotation = 90
                textVal.size = 50
                this.addChild(textVal);
                this._labelArr.push(textVal)
            }


            this.buff = <Music.musicbuffObj>{}
            this.buff.step = 0
            this.buff.voicehigh = []
            this.scaleY = -1
            this.y = gt.size.height
        }

        setLine() {
            if (this.buff.voicehigh) {
                let degre = MusicFactory.getMusicValueDegre()
                for (let i = 0; i < this._count; i++) {
                    let rack = this._graphArr[i]
                    let val = Number(this.buff.voicehigh[i * this.buff.step])
                    let sy = val / degre
                    sy = Math.abs(sy)
                    rack.scaleY = sy
                    let text = this._labelArr[i]
                    if (text) {
                        text.text = val + "/" + sy
                    }

                }
            }
        }


    }
}