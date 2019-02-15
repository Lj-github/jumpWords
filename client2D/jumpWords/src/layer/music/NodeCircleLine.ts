// TypeScript file
/**
  created by liujiang
 */
module game {
    export class NodeCircleLine extends BaseLayer {
        confit = {
            x: -0,
            w: 5,
            h: 100,
            y: 100,
            lineCount: 60,
            r: 200
        }
        constructor() {
            super()
        }
        inlintArr: Array<egret.Shape> = []
        outlintArr: Array<egret.Shape> = []
        childrenCreated() {
            //内扣的  line 只是向内
            this.createInCirCle()
            this.createOutCirCle()
        }
        /**
         * 向外发散的 一堆 东西
         */
        createOutCirCle() {
            let x = this.confit.x
            let w = this.confit.w
            let h = this.confit.h
            let y = h
            let lineCount = this.confit.lineCount
            //圆形  
            let r = this.confit.r + 20
            for (let i = 0; i < lineCount; i++) {
                //角度
                let deg = (360 / lineCount) * i
                let rad = deg * (2 * Math.PI / 360)
                let _x = Math.sin(rad) * r
                //egret 坐标 y 是反的
                let _y = -Math.cos(rad) * r
                let line = this.createdLine(0, y, w, h, deg + 180)
                line.anchorOffsetY = h
                line.anchorOffsetX = w / 2
                console.log("_x", _x, "_y", _y)
                line.x = _x
                line.y = _y
                line.filters = [gt.getLineFilter()]
                //todo 圆角 好看
                // line.graphics.drawEllipse ellipseHeight 
                this.addChild(line)
                this.outlintArr.push(line)
            }
        }

        createInCirCle() {
            let x = this.confit.x
            let w = this.confit.w
            let h = this.confit.h
            let y = h
            let lineCount = this.confit.lineCount
            //圆形  
            let r = this.confit.r
            for (let i = 0; i < lineCount; i++) {
                //角度
                let deg = (360 / lineCount) * i
                let rad = deg * (2 * Math.PI / 360)
                let _x = Math.sin(rad) * r
                //egret 坐标 y 是反的
                let _y = -Math.cos(rad) * r
                let line = this.createdLine(0, y, w, h, deg)
                line.anchorOffsetY = h
                line.anchorOffsetX = w / 2
                console.log("_x", _x, "_y", _y)
                line.x = _x
                line.y = _y
                line.filters = [gt.getLineFilter()]
                //todo 圆角 好看
                //line.graphics.drawEllipse ellipseHeight 
                this.addChild(line)
                this.inlintArr.push(line)

            }
        }

        createdLine(x: number, y: number, w: number, h: number, rotation: number): egret.Shape {
            console.log("de", rotation)
            let line = new egret.Shape();
            line.graphics.beginFill
            line.graphics.beginFill(App.lineColor, App.lineAlpha);
            //绘制一个圆角矩形
            line.graphics.drawRoundRect(x, y, w, h, 2, 2);
            line.graphics.endFill();
            line.rotation = rotation
            return line
        }


    }
}