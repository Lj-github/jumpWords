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
     * ************************************************************************************************ mid
     * 
     *          1,2             3,2
     * 
     */
    //通过对中心点x 的调整 就能达到平滑过度
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
        _shpOneWidth = 20//一个曲线的宽宽
        _shpOneHeight = 300//一个曲线的高度
        _lineData = <ShpOneUnit[]>[]
        _cernter: egret.Point
        buff: Music.musicbuffObj
        musicReader: ReadMusic
        initView() {
            if (!App.isUseJxBrowser) {
                this.musicReader = new ReadMusic()
                //App.mp3file
            }
            //从中心处开始
            this.buff = <Music.musicbuffObj>{}
            this.buff.step = 0
            this.buff.voicehigh = []
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            let shp: egret.Shape = new egret.Shape();
            this.addChild(shp);
            this.shp = shp
        }
        //设置相关参数
        setConfig() {
            this._lineData = []
            let len = 50
            let step = Math.floor(2000 / len)
            for (let i = 1; i <= len; i++) {
                let unit = <ShpOneUnit>{}
                unit.curveToX1 = (i - 0.5) * this._shpOneWidth//0.5TODO
                unit.curveToY1 = Number(this.buff.voicehigh[step * i]) / 10 + this._cernter.y
                unit.curveToX2 = i * this._shpOneWidth
                //最终落脚点肯定是y 的中心
                unit.curveToY2 = this._cernter.y
                this._lineData.push(unit)
            }
        }
        getBuff() {
           this.buff = MusicFactory.getMusicBuff()
        }
        _update() {
            this.getBuff()
            this.setConfig()
            this.setLine()
            this.sendBase64()
        }
        setLine() {
            let shp = this.shp
            shp.graphics.clear()
            shp.graphics.lineStyle(2, 0x00ff00);
            shp.graphics.moveTo(0, this._cernter.y);
            for (let unit of this._lineData) {
                shp.graphics.curveTo(unit.curveToX1, unit.curveToY1, unit.curveToX2, unit.curveToY2);
            }
            shp.graphics.endFill();
        }
        sendBase64() {
            BrowserMethodMgr.sendBase64ToJxBrowser()
        }
    }
}