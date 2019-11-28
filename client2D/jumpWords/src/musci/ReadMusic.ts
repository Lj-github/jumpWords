module game {
    export class ReadMusic {
        public music: Music.ReadBuff
        public buf: any
        constructor(musicPath: string) {
            this.initUI(musicPath)
        }
        initUI(musicPath: string) {
            let music = new Music.ReadBuff(musicPath)
            this.music = music
            let audio: any = document.getElementById('audio');
            egret.setTimeout(this.toggleSound, this, 2000)//兼容性...
        }
        toggleSound() {
            var music1: any = document.getElementById("audio");//获取ID  
            if (music1.paused) { //判读是否播放  
                music1.paused = false;
                music1.play(); //没有就播放 
            }
        }
        removeSelf() {

        }

    }
}