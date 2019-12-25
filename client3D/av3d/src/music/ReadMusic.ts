import { ReadBuff } from "./ReadBuff"

export class ReadMusic {
    private static _instance = new ReadMusic()
    private _readBuff:ReadBuff
    constructor() {
        this._readBuff = ReadBuff.getInstance()
        this._readBuff.initMusic()
    }
    static getInstance() {
        return this._instance
    }
    get readBuff() {
        return this._readBuff
    }
}