// TypeScript file

module game {
    export class BaseLayer extends eui.Component {
        buff: Music.musicbuffObj
        _inLoop = false
        constructor() {
            super()
        }
        addFrame() {
            if (!this._inLoop) {
                this.addEventListener(egret.Event.ENTER_FRAME, this._update, this);
                this._inLoop = true
            }

        }
        startLoop() {
            this.addFrame()
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