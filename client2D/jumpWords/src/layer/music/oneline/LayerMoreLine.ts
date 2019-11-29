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

    export class LayerMoreLine extends eui.Component {
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
        musicReader
        _count = 100
        initView() {
            // this.musicReader = new ReadMusic(App.mp3file)
            this._cernter = new egret.Point(gt.size.width / 2, gt.size.height / 2)
            this.removeChildren()
            let width = Math.floor(gt.size.width / this._count)
            for (let i = 0; i < this._count; i++) {
                let ract = new egret.Shape()
                ract.graphics.beginFill
                ract.graphics.beginFill(0xff0000, 1);
                ract.graphics.drawRect(i * width, 0, width, 500);
                ract.graphics.endFill();
                this.addChild(ract);
            }
            this.buff = <Music.musicbuffObj>{}
            this.buff.step = 0
            this.buff.voicehigh = []
            this.scaleY = -1
            this.y = gt.size.height

        }

        getBuff() {
            this.buff.voicehigh = BrowserMethodMgr.getBufferFormBrowser()
            // this.buff = this.musicReader.music.getBuff()

        }
        _update() {
            this.getBuff()
            this.setLine()
            //this.sendBase64()
        }
        setLine() {
            for (let i = 0; i < this.$children.length; i++) {
                let rack = this.$children[i]
                let sy = Number(this.buff.voicehigh[i]) / 100000
                sy = Math.abs(sy)
                rack.scaleY = sy
            }
        }
        sendBase64() {
            //获取base64
            let base64 = gt.getScreenShotInWebglModele()
            if (base64) {
                BrowserMethodMgr.saveBase64DataToBrowser(base64)
            }
        }
    }
}