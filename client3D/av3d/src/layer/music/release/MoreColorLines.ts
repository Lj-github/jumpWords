// TypeScript file

class Laser extends eui.Image {
    public life: number;
}


class MoreColorLines extends game.BaseLayer {
    private viewWidth: number
    private viewHeight: number
    private lasers: Array<Laser> = [];
    private tick: number = 0;
    private frequency: number = 80;
    private type: number = 0;



    constructor() {
        super()
        this.startLoop()
        this.viewWidth = gt.size.width
        this.viewHeight = gt.size.height
    }
    _update() {
        super._update()
        this.setLine()

    }
    setLine() {
        if (this.tick > this.frequency) {
            this.tick = 0;
            // iterate through the dudes and update the positions
            var laser: Laser = new Laser();
            laser.source = "laser0" + ((this.type % 5) + 1) + "_png"
            this.type++;

            laser.life = 0;

            var pos1: egret.Point;
            var pos2: egret.Point;
            if (this.type % 2) {
                pos1 = new egret.Point(-20, Math.random() * this.viewHeight);
                pos2 = new egret.Point(this.viewWidth, Math.random() * this.viewHeight + 20);

            }
            else {
                pos1 = new egret.Point(Math.random() * this.viewWidth, -20);
                pos2 = new egret.Point(Math.random() * this.viewWidth, this.viewHeight + 20);
            }

            var distX: number = pos1.x - pos2.x;
            var distY: number = pos1.y - pos2.y;

            var dist: number = Math.sqrt(distX * distX + distY * distY) + 40;

            laser.scaleX = dist / 20;
            laser.x = pos1.x
            laser.y = pos2.y
            //laser.pivotY = 43 / 2;
            laser.blendMode =egret.BlendMode.ADD //"lighter";

            laser.rotation = (Math.atan2(distY, distX) + Math.PI) * 180 / Math.PI;

            this.lasers.push(laser);

            this.addChild(laser);

            this.frequency *= 0.9;
        }

        for (var i: number = 0; i < this.lasers.length; i++) {
            laser = this.lasers[i];
            laser.life++;
            if (laser.life > 60 * 0.3) {
                laser.alpha *= 0.9;
                laser.scaleY = laser.alpha;
                if (laser.alpha < 0.01) {
                    this.lasers.splice(i, 1);
                    this.removeChild(laser);
                    i--;
                }
            }
        }
        // increment the ticker
        this.tick += 1;


    }

}