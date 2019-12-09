// TypeScript file
/**
 * create by liujiang on 2019/12/9 15:24 阴天
 * 类似抖音上面的 颤动 效果
 * https://zhuanlan.zhihu.com/p/47596153
 */
module game {
    export class LayerDouYingImg extends BaseGraphics {
        img: eui.Image
        shader: egret.CustomFilter
        constructor() {
            super()
            this.addFrame()
            this.createImg()
        }
        createImg() {
            let img = new eui.Image()
            img.source = "egret_icon_png"
            this.addChild(img)
            this.img = img
            this.img.scaleX = this.img.scaleY = 10
            img.x = 500
            img.y = 100

            this.shader = this.createShader()
            this.img.filters = [this.shader]
        }
        _update() {
            super._update()
            this.setImg()

        }
        setImg() {
            if (this.buff.voicehigh) {
                let degre = MusicFactory.getMusicValueDegre()
                let shader = this.shader
                shader.uniforms.time += 0.01
                if (shader.uniforms.time >= 10) {
                    shader.uniforms.time = 0.0
                }
                let value = Number(this.buff.voicehigh[50 * this.buff.step]) / degre
                shader.uniforms.offset = value / 5
            } else {
                let shader = this.shader
                shader.uniforms.time += 0.01
                if (shader.uniforms.time >= 10) {
                    shader.uniforms.time = 0.0
                }
            }
        }

        createShader() {
            let vertexSrc = RES.getRes("test_vs")
            let fragmentSrc3 = RES.getRes("DouYing_eff_fs")
            return new egret.CustomFilter(
                vertexSrc,
                fragmentSrc3,
                {
                    time: 0,
                    speed: 0.3,
                    offset: 0.1
                }
            );
        }
    }
}