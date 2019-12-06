// TypeScript file
/**
 * create by liujiang on 2019/12/3 16:22 
 * img:https://www.google.com/search?q=%E6%9B%B2%E7%BA%BF&hl=zh-CN&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiszovphZnmAhXtyIsBHWOlBQ4Q_AUoAXoECA0QAw&biw=1920&bih=969#imgrc=UjHGjrC8rLaJtM
 */

module game {
    export class LayerArcLine1 extends BaseLayer {
        constructor() {
            super()
            this.addFrame()
            this.initMoreRact()
            this.initVSlider()
            window["LayerArcLine1Ins"] = this
        }

        _count = 0
        _cernter: egret.Point
        //customFilter: egret.CustomFilter
        _voiceScale = 8
        _filtersArr = []
        initView() {
            this._count = MusicFactory.getVoicehighCount()
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            let width = Math.floor(gt.size.width / this._count)
            width = 1000
            let matrix = new egret.Matrix()
            matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
            let colors = [0x0000ff, gt.getHexColor(1, 32, 97), 0xff0000]//
            let alphas = [1, 0.9, 0.8]
            let ratios = [255 / 3, 255 / 3 * 2, 255]//
            let ract = new egret.Shape()
            ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
            ract.graphics.drawRect(200, 500, width, width);//gt.size.height
            ract.graphics.endFill();
            this.addChild(ract);
           // ract.filters = [this.customFilter];

        }
        initMoreRact() {
            this._count = MusicFactory.getVoicehighCount() / this._voiceScale
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            //正方形 行 row 列 column
            let col = Math.floor(this._count * gt.size.height / (gt.size.height + gt.size.width))
            let row = Math.floor(this._count * gt.size.width / (gt.size.height + gt.size.width))
            let width = Math.floor(gt.size.width / row)
            let matrix = new egret.Matrix()
            matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
            let colors = [0x0000ff, gt.getHexColor(1, 32, 97), 0xff0000]//
            let alphas = [1, 0.9, 0.8]
            let ratios = [255 / 3, 255 / 3 * 2, 255]//
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    let ract = new egret.Shape()
                    ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
                    ract.graphics.drawRect(i * width, j * width, width-50, width-50);//gt.size.height
                    ract.graphics.endFill();
                    this.addChild(ract);
                    let shader = this.createShader()
                    this._filtersArr.push(shader)
                    ract.filters = [shader];
                }
            }
        }

        private initVSlider(): void {
            let hSlider: eui.HSlider = new eui.HSlider();
            hSlider.width = 200;
            hSlider.x = 1000;
            hSlider.y = 20;
            hSlider.minimum = 0;//定义最小值
            hSlider.maximum = 100;//定义最大值
            hSlider.value = 0;//定义默认值
            hSlider.scaleX = hSlider.scaleY = 5
            hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
            this.addChild(hSlider);
        }
        private changeHandler(evt: eui.UIEvent): void {
            console.log(evt.target.value);
           // this.customFilter.uniforms.time = evt.target.value / 100;

        }

        createShader() {
            let vertexSrc = RES.getRes("test_vs")
            let fragmentSrc3 = RES.getRes("ractChange_fs")
            //两个曲线交错 然后 取中心就行  
            return new egret.CustomFilter(
                vertexSrc,
                fragmentSrc3,
                {
                    time: 0
                }
            );
        }
        _update() {
            super._update()
           
            this.setRact()
        }
        setRact() {
            if (this.buff.voicehigh) {
                let degre = MusicFactory.getMusicValueDegre()
                for (let i = 0; i < this._count; i++) {
                    let shader = this._filtersArr[i]
                    let val = Number(this.buff.voicehigh[i * this.buff.step * this._voiceScale])
                    let sy = val / degre
                    sy = Math.abs(sy)
                    shader.uniforms.time = sy
                }
            }
        }
    }
}