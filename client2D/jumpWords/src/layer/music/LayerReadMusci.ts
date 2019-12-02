/**
 created by liujiang
 time 2019/2/11 11:07
 */
module game {
    export class LayerReadMusic extends eui.Component {
        buff: Music.musicbuffObj
        frustumSize = 1000;
        musicReader: ReadMusic
        private nodeline: NodeLine
        private nodeCircleLine: NodeCircleLine
        system: particle.ParticleSystem
        constructor() {
            super()
            this.musicReader = new ReadMusic()//App.mp3file
            let nodeline = new NodeLine()
            nodeline.rotation = 180
            nodeline.x = 1120
            nodeline.y = 640
            this.nodeline = nodeline
            this.addChild(nodeline)
            this.addEventListener(egret.Event.ENTER_FRAME, this.getBuf, this);
            /*let nodeline1 = new NodeCircleLine()
            this.addChild(nodeline1)
            nodeline1.x = 300
            nodeline1.y = 400
            this.nodeCircleLine = nodeline1*/

            var texture = RES.getRes("snow_png");
            var config = RES.getRes("snow_json");
            this.system = new particle.GravityParticleSystem(texture, config);
            this.addChild(this.system)
            this.system.start();
        }

        getBuf() {
            //this.buff = this.musicReader.music.getBuff()
            /*if (this.buff) {
                for (var i = 0; i < this.nodeCircleLine.outlintArr.length; i++) {
                    var scale = this.buff.voicehigh[this.buff.step * i] / 25
                    scale = scale === 0 ? 2 : scale
                    let scaley = scale / 20
                    if (this.nodeCircleLine.outlintArr[i]) {
                        this.nodeCircleLine.outlintArr[i].scaleY = scaley * 2
                    }
                    if (this.nodeCircleLine.inlintArr[i]) {
                        this.nodeCircleLine.inlintArr[i].scaleY = scaley
                    }
                    if (this.nodeline.lintArr[i]) {
                        this.nodeline.lintArr[i].scaleY = scaley * 5
                    }
                    if (i == 20) {
                        this.scaleX = 1 + (scaley / 50)
                    }
                }
            }*/
            //获取base64

            let base64 = gt.getScreenShotInWebglModele()
            if (base64) {
                BrowserMethodMgr.saveBase64DataToBrowser(base64)
            }
        }
    }
}