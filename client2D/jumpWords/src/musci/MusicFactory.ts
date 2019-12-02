// TypeScript file

module MusicFactory {

    export function getMusicBuff(): Music.musicbuffObj {
        if (App.isUseJxBrowser) {
            return { voicehigh: BrowserMethodMgr.getBufferFormBrowser(), step: 0 }
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
                VoicehighCount = 100
            } else {
                VoicehighCount = 1024
            }
        }
        return VoicehighCount
    }
}