import { musicbuffObj } from "../../music/ReadBuff"
import { SecTimeHander } from "../../com/SecTimeHander"
import { BrowserMethodMgr } from "../../com/BrowserMethodMgr"
import { MusicFactory } from "../../music/MusicFactory"

// TypeScript file

export class BaseLayer extends Laya.Sprite {
    buff: musicbuffObj
    constructor() {
        super()
    }
    startLoop() {
        SecTimeHander.subscribeQuick(this._update, this)
    }
    getBuff() {
        this.buff = MusicFactory.getMusicBuff()
    }
    _update() {
        this.getBuff()
        this.sendBase64()
    }
    sendBase64() {
        BrowserMethodMgr.sendBase64ToJxBrowser()
    }

    destroy() {
        SecTimeHander.unsubscribeQuickAllOnTarget(this)
        super.destroy()
    }

}