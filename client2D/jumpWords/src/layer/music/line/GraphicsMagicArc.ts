// TypeScript file

/**
 * created by liujiang 2019/12/3 11:35 天气就那样
 */
//弧度的样式 还行
//http://developer.egret.com/cn/example/egret2d/index.html#030-graph-arc

module game {
    export class LayerMagicArc extends BaseGraphics {
        constructor() {
            super()
            window['GraphicsMagicArcddd'] = this
            this.addFrame()
        }
        _update() {
            super._update()
            this.updateArc()
        }
        _tim = 0
        _isAddOne = false
        updateArc() {
            window["vvvv"] = 50
            let d = window["vvvv"] || 100
            if (this.buff && this.buff.voicehigh) {
                if (this.buff.voicehigh[d] > 140 && !this._isAddOne) {
                    this.createGraphics();
                    this._tim = 0
                    this._isAddOne = true
                }
                if (this._isAddOne) {
                    if (this._tim >= 3) {
                        this._isAddOne = false
                    }
                }
                this._tim++
            }
        }
        createGraphics() {
            let g = new GraphicsMagicArc()
            g.createIns()
            g.runAction()
            this.addChild(g)
        }
    }


    export class GraphicsMagicArc extends BaseGraphics {
        pBar: eui.ProgressBar
        private _count: number = 0;
        private _nums = [2, 3, 4, 5, 6, 9, 10, 12, 15, 18];
        _scaleTime = 50
        dispairTime = 100
        createIns() {
            this.width = gt.size.width
            this.height = gt.size.height
            this.anchorOffsetX = this.width / 2
            this.anchorOffsetY = this.height / 2
            this.x = gt.size.width / 2
            this.y = gt.size.height / 2
        }
        set count(c) {
            this._count = c
            this.drawFl()
        }
        drawFl(): void {
            this.removeChildren();
            let nums: Array<number> = this._nums
            let num: number = nums[this._count];
            let singleAng: number = 180 / num;
            let r1 = 500;
            let r2 = r1 * Math.sin(singleAng * Math.PI / 180);
            let r3 = r1 * Math.cos(singleAng * Math.PI / 180);
            for (let i: number = 0; i < num; i++) {
                let shape = new egret.Shape();
                this.addChild(shape);
                shape.x = gt.size.width / 2;
                shape.y = gt.size.height / 2;
                shape.graphics.clear();
                shape.graphics.lineStyle(10, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
                let ang = -singleAng / 2 + i * 2 * singleAng;
                shape.graphics.drawArc(r3 * Math.cos(ang * Math.PI / 180),
                    r3 * Math.sin(ang * Math.PI / 180), r2, (ang + 90) * Math.PI / 180, (ang - 90) * Math.PI / 180, true);
            }
        }

        runAction() {

            if (this._count == (this._nums.length - 1)) {
                //到最后了  消失
                egret.Tween.get(this).to({ scaleX: 2, scaleY: 2, alpha: 0.01 }, this.dispairTime).call(() => {
                    this.parent.removeChild(this)
                }, this)
                return
            }
            if (this._count == 0) {
                this.scaleX = this.scaleY = 0.01
            }
            let countLen = this._nums.length
            let scale = this._count / countLen || 0.01
            let alpha = this._count / countLen || 0.01
            this.drawFl()
            this._count++
            egret.Tween.get(this).to({ scaleX: scale, scaleY: scale, alpha: alpha }, this._scaleTime).call(this.runAction, this)
        }
    }
}