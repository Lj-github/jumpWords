/**
     created by liujiang
     time 2019/2/11 11:07
 */
module game {
    export class LayerReadMusci extends eui.Component {
        buff: Music.musicbuffObj
        frustumSize = 1000;
        allCube : Array<egret.Shape> =[]
        musicReader: ReadMusic
        constructor() {
            super()
           // this.musicReader = new ReadMusic(App.mp3file)
            let nodeline = new NodeLine()
            nodeline.rotation = 180
            nodeline.x = 1120
            nodeline.y = 640
            this.addChild(nodeline)
            this.allCube = nodeline.lintArr
            //this.addEventListener(egret.Event.ENTER_FRAME, this.getBuf, this);
        }
        getBuf() {
            this.buff = this.musicReader.music.getBuff()
            if (this.buff) {
                for (var i = 0; i < this.allCube.length; i++) {
                    if (this.allCube[i]) {
                        var scale = this.buff.voicehigh[this.buff.step * i] / 25
                        scale = scale === 0 ? 0.00001 : scale
                        this.allCube[i].scaleY = scale/20
                    }
                }
            }

        }

    }
}