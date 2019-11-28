// TypeScript file
/**
 * create by liujiang 2019/11/26 09:50 天气还可以
 * 灵感来源  一根线   exp:https://v.qq.com/x/page/g0564ua6lz1.html
 */

module game {
    //一个位置的参数 可能需要通过 音频文件里面的内容处理
    /**
     *   0,0            2,0
     * 
     * ******************************************************************中心
     * 
     *          1,2             3,2
     * 
     */
    interface ShpOneUnit {
        curveToX1: number
        curveToY1: number
        curveToX2: number
        curveToY2: number
    }

    export class LayerOneLine extends eui.Component {
        shp: egret.Shape
        constructor() {
            super()
            this.initView()
            this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
        }
        _shpY = 600
        _shpOneWidth = 50//一个曲线的宽宽
        _shpOneHeight = 300//一个曲线的高度
        initView() {
            //从中心处开始
            let shp: egret.Shape = new egret.Shape();
            this.addChild(shp);
            this.shp = shp
            this.setConfig()

        }
        //设置相关参数
        setConfig() {


        }
        _update() {
            let shp = this.shp
            shp.graphics.clear()
            shp.graphics.lineStyle(2, 0x00ff00);
            shp.graphics.moveTo(50, 300);
            shp.graphics.curveTo(75, this._shpY, 100, 300);
            shp.graphics.curveTo(125, 600 - this._shpY, 150, 300);
            shp.graphics.endFill();
            this._shpY -= 1
            if (this._shpY <= 0) {
                this._shpY = 600
            }
        }
    }
}