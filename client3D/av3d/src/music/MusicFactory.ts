import { musicbuffObj, ReadBuff } from "./ReadBuff"
import { App } from "../com/App"
import { BrowserMethodMgr } from "../com/BrowserMethodMgr"

// TypeScript file
/**
 * created by liujiang on 2019/12/2 16:28 好天气 清雾霾  北京
 */
export class MusicFactory {

    static getMusicBuff(): musicbuffObj {
        if (App.isUseJxBrowser) {
            return { voicehigh: BrowserMethodMgr.getBufferFormBrowser(), step: this.getStep() }
        } else {
            return ReadBuff.getInstance().getBuff()
        }
    }

    static MusicValueDegre = null
    static getMusicValueDegre() {
        if (!this.MusicValueDegre) {
            if (App.isUseJxBrowser) {
                this.MusicValueDegre = 10000
            } else {
                this.MusicValueDegre = 300
            }
        }
        return this.MusicValueDegre
    }
    static VoicehighCount = null
    static getVoicehighCount() {
        if (!this.VoicehighCount) {
            if (App.isUseJxBrowser) {
                this.VoicehighCount = 100 / this.getStep()
            } else {
                this.VoicehighCount = 700 / this.getStep()//1024 个数据 但是后面的数据 都是空的
            }
        }
        return this.VoicehighCount
    }

    static getStep() {
        if (App.isUseJxBrowser) {
            return 1
        } else {
            return 5
        }
    }
}