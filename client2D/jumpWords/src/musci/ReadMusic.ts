module game {
    export class ReadMusic extends egret.HashObject {
        private static _instance = new ReadMusic()
        private _readBuff: Music.ReadBuff
        constructor() {
            super()
            this._readBuff = Music.ReadBuff.getInstance()
            this._readBuff.initMusic()
        }
        static getInstance() {
            return this._instance
        }
        get readBuff() {
            return this._readBuff
        }
    }
}