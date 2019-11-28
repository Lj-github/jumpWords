/**
 *
 */

//todo 添加 播放 控制 新建个类 （如果可以的话 控制快进  快退） 控制歌词 进行 3d 滚动  ！！！
//todo 待考虑 可能需要 后端 解析 lrc 文件(歌词文件)
module Music {
    //如果 是jxbrowser  只能在java 里面去获取 在js 里面获取没用
    export interface musicbuffObj {
        voicehigh: number[] | string []// 0-1023
        step: number
    }
    export class ReadBuff {

        public LINENUM = 60;
        public SHAP = 2;//1:圆   2 ：柱 3 ：线
        public voicehigh: any;
        public stepp: any;
        public analyser: AnalyserNode;
        private musicFilePath = "resource/music.json"
        public bf = <musicbuffObj>{}
        constructor(musicUrl?: string) {
            this.init(musicUrl)
        }

        private static instance = new ReadBuff()
        static getInstance() {
            return this.instance
        }
        public init(musicUrl?: string) {
            if (!musicUrl) {
                console.error("no musicUrl init !!!")
                return
            }
            //放到html里面了
            //RES.loadConfig(this.musicFilePath,this.getAllMusic,this)
            //document.body.appendChild(this.createAudioElement())
            //<audio id="audio" style=" " src="shapeofyou.mp3"></audio>
            let audio: any = document.getElementById('audio');
            let actx = this.getAudioContext();
            //  audio.src = musicUrl;//";
            this.analyser = actx.createAnalyser();
            let audioSrc = actx.createMediaElementSource(audio);
            audioSrc.connect(this.analyser);
            this.analyser.connect(actx.destination);
        }
        public getBuff() {

            this.bf = undefined
            this.bf = <musicbuffObj>{}
            this.voicehigh = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(this.voicehigh);
            this.stepp = Math.round(this.voicehigh.length / this.LINENUM);
            this.bf.voicehigh = this.voicehigh;
            this.bf.step = this.stepp;
            return this.bf;
        }
        public createAudioElement(id: string = "audio") {
            /*var audio = document.createElement("audio")
            audio.muted = false
            audio.autoplay = true
            audio.id = id
            audio.muted*/
            return document.getElementById("audio")
        }

        public getAllMusic(json) {
            console.log(json)
        }
        getAudioContext() {
            try {
                var AudioContext = window["AudioContext"] || window["webkitAudioContext"];
                return new AudioContext();
            }
            catch (e) {
                alert('NMLGBD 你的浏览器连个Web-Audio-API 都不支持！！')
            }
            return null
        }
    }
}
