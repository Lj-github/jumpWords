// TypeScript file

module game {
    export class BaseLayer extends eui.Component {
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