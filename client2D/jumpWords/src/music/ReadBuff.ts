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
        public voicehigh: any;
        public step: any;
        public analyser: AnalyserNode;
        private musicFilePath = "resource/music.json"
        public bf = <musicbuffObj>{}
        private static _instance = new ReadBuff()
        private _createAnalyser = false
        audioElement: HTMLAudioElement
        timer: egret.Timer
        static getInstance() {
            return this._instance
        }

        initMusic() {
            let timer: egret.Timer
            if (!this.timer) {
                timer = new egret.Timer(30, 0)
                timer.addEventListener(egret.TimerEvent.TIMER, this._update, this)
                timer.start()
                this.timer = timer
            }
            //放到html里面了

            this.audioElement = <any>document.getElementById('audio');
            let self = this

            this.audioElement.addEventListener("play", function () {   //开始播放时触发
                console.log("event play: " + (new Date()).getTime());
                if (self._createAnalyser) {
                    return
                }
                let actx = self.getAudioContext();
                self.analyser = actx.createAnalyser();
                let audioSrc = actx.createMediaElementSource(self.audioElement);
                audioSrc.connect(self.analyser);
                self.analyser.connect(actx.destination);
                self._createAnalyser = true
                let msg = <Struct.C2C_MUSIC_BEGIN_PLAY_MSG>{}
                msg.time = self.audioElement.duration
                console.log("音频时长: " + msg.time)
                //读取mp3信息 
                EZTopic.publish(App.TopicEvent.C2C_MUSIC_BEGIN_PLAY, msg)
            });
        }
        _update() {
            this.setBuff()
        }
        setBuff() {
            this.bf = undefined
            this.bf = <musicbuffObj>{}
            if (this._createAnalyser) {
                this.voicehigh = new Uint8Array(this.analyser.frequencyBinCount);
                this.analyser.getByteFrequencyData(this.voicehigh);
                this.step = MusicFactory.getStep()
                this.bf.voicehigh = this.voicehigh;
                this.bf.step = this.step;
            }
        }

        getBuff() {
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
