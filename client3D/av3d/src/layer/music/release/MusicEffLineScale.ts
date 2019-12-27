import { BaseLayer } from "../../base/BaseLayer"
import { musicbuffObj } from "../../../music/ReadBuff"
import { MusicFactory } from "../../../music/MusicFactory"

/**
 * create by liujiang  2019/12/11 17:45 是时候做一个成品了  一个效果即可  长条缩放
 * randomShape 
 */
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
    _cernter: Laya.Point
    buff: musicbuffObj
    _count = 0
    degre = 0
    _ractList = []
    _shapList = []

    _stmp = 0
    defColor
    initView() {
        /*this.removeChildren()
        window["dddd"] = this
        
        this.defColor = 0x472d56// gt.getHexColor(94, 255, 255)// 0x411445
      
        this.degre = MusicFactory .getMusicValueDegre()
        this._count = MusicFactory.getVoicehighCount()
        this._cernter = new Laya.Point(gt.size.width / 2, gt.size.height / 2)
        let width = Math.floor(gt.size.width / this._count)
        let matrix = new Laya.Matrix()
        matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
        let colors = [0x411445,0x45224a, 0x472d56]//[0x00688B, 0x008B8B, 0x33CCFF]// [0x000000, gt.getHexColor(1, 32, 97), 0xff0000]
        let alphas = [1, 0.9, 0.8]
        let ratios = [255 / 8, 255 / 8 * 4, 255]
        for (let i = 0; i < this._count; i++) {
            let ract = new egret.Shape()
            ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
            ract.graphics.drawRect(i * (width + 2), 0, width, gt.size.height);
            ract.graphics.endFill();
            ract.scaleY = 0.00001
            this.lineFocus.addChild(ract);
            this._ractList.push(ract)
        }
        this.buff = <Music.musicbuffObj>{}
        this.buff.step = 0
        this.buff.voicehigh = []
        this.scaleY = -1
        this.y = gt.size.height
        this.lineFocus.filters = [gt.getLineFilter(this.defColor)]*/
    }

    setLine() {
        this._stmp++
        if (this.buff.voicehigh) {
            for (let i = 0; i < this._ractList.length; i++) {
                let rack = this._ractList[i]
                let sy = Number(this.buff.voicehigh[i * this.buff.step]) / this.degre
                sy = Math.abs(sy)
                rack.scaleY = sy
            }
        }

    }


}