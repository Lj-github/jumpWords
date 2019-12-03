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
            this.initShader()
            this.initView()
            this.initVSlider()
            window["LayerArcLine1Ins"] = this
        }

        _count = 0
        _cernter: egret.Point
        customFilter: egret.CustomFilter
        initView() {
            this._count = MusicFactory.getVoicehighCount()
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            let width = Math.floor(gt.size.width / this._count)
            width = 588
            let matrix = new egret.Matrix()
            matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
            let colors = [0x0000ff, gt.getHexColor(1, 32, 97), 0xff0000]//
            let alphas = [1, 0.9, 0.8]
            let ratios = [255 / 3, 255 / 3 * 2, 255]//
            let ract = new egret.Shape()
            ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
            ract.graphics.drawRect(200, 0, width, gt.size.height);
            ract.graphics.endFill();
            this.addChild(ract);
            ract.filters = [this.customFilter];

        }

        private initVSlider(): void {
            let hSlider: eui.HSlider = new eui.HSlider();
            hSlider.width = 200;
            hSlider.x = 20;
            hSlider.y = 20;
            hSlider.minimum = 0;//定义最小值
            hSlider.maximum = 100;//定义最大值
            hSlider.value = 10;//定义默认值
            hSlider.scaleX = hSlider.scaleY = 10
            hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
            this.addChild(hSlider);
        }
        private changeHandler(evt: eui.UIEvent): void {
            console.log(evt.target.value);
        }

        initShader() {
            let vertexSrc = RES.getRes("test_vs")
            let fragmentSrc3 = RES.getRes("test_fs")
            //两个曲线交错 然后 取中心就行  
            let customFilter3 = new egret.CustomFilter(
                vertexSrc,
                fragmentSrc3,
                {
                    center: { x: 0.5, y: 0.5 },
                    params: { x: 10, y: 0.8, z: 0.1 },
                    time: 0
                }
            );
            this.customFilter = customFilter3
        }
        _update() {
            super._update()
            let customFilter3 = this.customFilter
            customFilter3.uniforms.time += 0.01;
            if (customFilter3.uniforms.time > 1) {
                customFilter3.uniforms.time = 0.0;
            }
        }
    }
}