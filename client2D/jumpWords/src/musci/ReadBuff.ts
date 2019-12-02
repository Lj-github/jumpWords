/**
 *  createBy liujiang  very old ... 忘记哪天弄的了
 */
//todo 添加 播放 控制 新建个类 （如果可以的话 控制快进  快退） 控制歌词 进行 3d 滚动  ！！！
//todo 待考虑 可能需要 后端 解析 lrc 文件(歌词文件)

module Music {
    //如果 是jxbrowser  只能在java 里面去获取 在js 里面获取没用
    export interface musicbuffObj {
        voicehigh: number[] | string[]// 0-1023
        step: number
    }
    export class ReadBuff extends egret.HashObject {
        public LINENUM = 60;
        public voicehigh: any;
        public stepp: any;
        public analyser: AnalyserNode;
        private musicFilePath = "resource/music.json"
        public bf = <musicbuffObj>{}
        private static _instance = new ReadBuff()
        private _createAnalyser = false
        audioElement: any
        static getInstance() {
            return this._instance
        }

        initMusic() {
            //放到html里面了
            this.audioElement = document.getElementById('audio');
            let local = this
            this.audioElement.addEventListener("play", function () {   //开始播放时触发
                console.log("event play: " + (new Date()).getTime());
                if (local._createAnalyser) {
                    return
                }
                let actx = local.getAudioContext();
                local.analyser = actx.createAnalyser();
                let audioSrc = actx.createMediaElementSource(local.audioElement);
                audioSrc.connect(local.analyser);
                local.analyser.connect(actx.destination);
                local._createAnalyser = true
            });
        }
        getBuff() {
            this.bf = undefined
            this.bf = <musicbuffObj>{}
            if (this._createAnalyser) {
                this.voicehigh = new Uint8Array(this.analyser.frequencyBinCount);
                this.analyser.getByteFrequencyData(this.voicehigh);
                this.stepp = Math.round(this.voicehigh.length / this.LINENUM);
                this.bf.voicehigh = this.voicehigh;
                this.bf.step = this.stepp;
            }
            return this.bf;
        }
        getAudioContext() {
            try {
                let AudioContext = window["AudioContext"] || window["webkitAudioContext"];
                return new AudioContext();
            }
            catch (e) {
                alert('浏览器 不支持 Web-Audio-API！')
            }
            return null
        }
    }
}
