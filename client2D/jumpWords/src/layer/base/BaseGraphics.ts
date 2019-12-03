// TypeScript file
/**
 * create by liujiang on 2019/12/2 17/14
 */
module game {
    export class BaseGraphics extends eui.Component {
        buff: Music.musicbuffObj
        constructor() {
            super()
        }
        addFrame() {
            this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);

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

        $onRemoveFromStage() {
            this.removeEventListener(egret.Event.ENTER_FRAME, this._update, this);
            super.$onRemoveFromStage()
        }


    }
}