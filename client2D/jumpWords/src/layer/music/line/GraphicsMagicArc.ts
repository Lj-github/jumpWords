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
            this.changeGraphics();
        }
        _update() {
            super._update()
            this.updateArc()
        }
        updateArc() {
            if (this.buff && this.buff.voicehigh) {
                this.buff.voicehigh[200]

            }
        }
        //轻触修改属性
        changeGraphics() {
            this.drawFl();
            //this.addChild(new GraphicsMagicArc())
        }
        private _count: number = 0;

        drawFl(): void {
            this.removeChildren();
            let nums: Array<number> = [18, 15, 12, 10, 9, 6, 5, 4, 3];
            let num: number = nums[this._count++];
            this._count %= nums.length;
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
    }


    export class GraphicsMagicArc extends BaseGraphics {
        pBar: eui.ProgressBar
        addBar() {
            this.pBar = new eui.ProgressBar();
            this.pBar.maximum = 210;//设置进度条的最大值
            this.pBar.minimum = 0;//设置进度条的最小值
            this.pBar.width = 200;
            this.pBar.height = 30;
            this.addChild(this.pBar);
            this.pBar.value = 42;//设置进度条的初始值
            this.pBar.addEventListener(egret.Event.CHANGE, this.onBarChange, this)
        }
        onBarChange() {
        }



    }






}