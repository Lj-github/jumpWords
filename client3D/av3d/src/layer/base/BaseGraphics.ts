import { musicbuffObj } from "../../music/ReadBuff";
import { SecTimeHander } from "../../com/SecTimeHander";
import { MusicFactory } from "../../music/MusicFactory";

// TypeScript file
/**
 * create by liujiang on 2019/12/2 17/14
 */
    export class BaseGraphics extends eui.Component {
        buff: musicbuffObj
        constructor() {
            super()
        }
        addFrame() {
            SecTimeHander.subscribeQuick(this._update,this)
        }

        getBuff() {
            this.buff = MusicFactory .getMusicBuff()
        }
        _update() {
            this.getBuff()
            this.sendBase64()
        }
        sendBase64() {
            BrowserMethodMgr.sendBase64ToJxBrowser()
        }

        $onRemoveFromStage() {
            this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            super.$onRemoveFromStage()
        }


    }