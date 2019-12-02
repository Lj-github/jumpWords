// TypeScript file
/**
 * created by liujiang on 2019/12/2 16:28 好天气 清雾霾  北京
 */
module MusicFactory {

    export function getMusicBuff(): Music.musicbuffObj {
        if (App.isUseJxBrowser) {
            return { voicehigh: BrowserMethodMgr.getBufferFormBrowser(), step: getStep() }
        } else {
            return Music.ReadBuff.getInstance().getBuff()
        }
    }

    let MusicValueDegre = null
    export function getMusicValueDegre() {
        if (!MusicValueDegre) {
            if (App.isUseJxBrowser) {
                MusicValueDegre = 10000
            } else {
                MusicValueDegre = 200
            }
        }
        return MusicValueDegre
    }
    let VoicehighCount = null
    export function getVoicehighCount() {
        if (!VoicehighCount) {
            if (App.isUseJxBrowser) {
                VoicehighCount = 100 / getStep()
            } else {
                VoicehighCount = 1024 / getStep()
            }
        }
        return VoicehighCount
    }

    export function getStep() {
        if (App.isUseJxBrowser) {
            return 1
        } else {
            return 10
        }
    }
}