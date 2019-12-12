
/**
 * create by liujiang  2019/12/11 17:45 是时候做一个成品了  一个效果即可  长条缩放
 * randomShape 
 */
module game {

    export enum ShapeType {
        triangle = 1,//三角
        circle,//圆
        rectangle,//长方
        square,//正方
        //可以扩展更多
    }



    export class MusicEffLineScale extends BaseLayer {
        constructor() {
            super()
            this.initView()
            this.startLoop()
        }
        _update() {
            super._update()
            this.setLine()

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
                /* let ract = new egret.Shape()
                 ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
                 ract.graphics.drawRect(i * width, 0, width, gt.size.height);
                 ract.graphics.endFill();
                 this.lineFocus.addChild(ract);
                 this._ractList.push(ract)*/
            }
            this.buff = <Music.musicbuffObj>{}
            this.buff.step = 0
            this.buff.voicehigh = []
            this.scaleY = -1
            this.y = gt.size.height
            this.lineFocus.filters = [gt.getLineFilter()]
        }

        setLine() {
            this._stmp++
            if (this.buff.voicehigh) {
                /*for (let i = 0; i < this._ractList.length; i++) {
                    let rack = this._ractList[i]
                    let sy = Number(this.buff.voicehigh[i * this.buff.step]) / this.degre
                    sy = Math.abs(sy)
                    rack.scaleY = sy
            }*/
                if (this._stmp % 60 == 0) {
                    this.randomShape(gt.random(1, 4))
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

        randomShape(type) {
            let Shape = this.createShape(type)
            this._shapList.push(Shape)
        }
        createShape(type = ShapeType.circle) {

            let shape = new egret.Shape()
            switch (type) {
                case ShapeType.triangle:
                    shape.graphics.lineStyle(2, 0x00ff00);
                    shape.graphics.moveTo(68, 84);
                    shape.graphics.lineTo(167, 76);
                    shape.graphics.lineTo(221, 118);
                    shape.graphics.lineTo(68, 84);
                    break
                case ShapeType.rectangle:
                    shape.graphics.beginFill(gt.getRandomColor());
                    shape.graphics.drawRect(300, 300, 300, 300);
                    break
                case ShapeType.square:
                    shape.graphics.beginFill(gt.getRandomColor());
                    shape.graphics.drawRect(300, 300, 300, 300);
                    break
                case ShapeType.circle:
                    let r: number = 50;
                    shape.graphics.moveTo(r, r);//绘制点移动(r, r)点
                    shape.graphics.lineTo(r * 2, r);//画线到弧的起始点
                    shape.graphics.drawArc(50, 50, 50, 0, 2 * Math.PI, false);//从起始点顺时针画弧到终点
                    shape.graphics.lineTo(r, r);//从终点画线到圆形。到此扇形的封闭区域形成
                    shape.graphics.endFill();
                    break
                default:
                    console.log("createShape", type, "创建失败！")
                    break
            }
            shape.graphics.endFill();
            this.shapFocus.addChild(shape);
            return shape

        }

    }
}