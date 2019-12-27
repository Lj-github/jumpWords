import { musicbuffObj } from "../../music/ReadBuff";
import { SecTimeHander } from "../../com/SecTimeHander";
import { MusicFactory } from "../../music/MusicFactory";
import { BrowserMethodMgr } from "../../com/BrowserMethodMgr";

// TypeScript file
/**
 * create by liujiang on 2019/12/2 17/14
 */
export class BaseGraphics extends Laya.Sprite {
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