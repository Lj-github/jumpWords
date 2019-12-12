// TypeScript file

module game {
    //加跳跃动作
    interface jumpInfo {
        a: number
        v0: number
        d: number
        sPos: egret.Point
    }
    export class RandomShape extends egret.Shape {
        _isMoveing = false
        constructor() {
            super()
        }

        //先实现 从下面 网上 飘 其他的效果 后面再说吧
        tryMove() {
            if (this._isMoveing) {
                return
            }
            this.rotationLoop()
            this.moveToTop()
            this._isMoveing = true
            this.x = gt.random(0, gt.size.width)
            //可以 bzer曲线
        }
        $onRemoveFromStage() {
            egret.Tween.removeTweens(this)
            super.$onRemoveFromStage()
        }

        rotationLoop() {
            let time = gt.random(12000, 16000)
            egret.Tween.get(this, { loop: true }).to({ rotation: 360 }, time).call(() => {
                this.rotation = 0
            }, this)

        }
        moveToTop() {
            let time = gt.random(15000, 16000)
            egret.Tween.get(this).to({ y: gt.size.height }, time)
        }

        /* 跳跃动作   */
        _jumpTime: number
        _jumpInfo: jumpInfo = <jumpInfo>{}
        set jumpTime(t: number) {
            this._jumpTime = t
            let sPos = this._jumpInfo.sPos
            let deltaX = t * this._jumpInfo.d
            let v0 = this._jumpInfo.v0
            let a = this._jumpInfo.a
            let deltaY = (v0 + (v0 - a * t)) / 2 * t
            this.x = sPos.x + deltaX
            this.y = sPos.y + deltaY
        }

        get jumpTime(): number {
            return this._jumpTime
        }

        get position(): egret.Point {
            return new egret.Point(this.x, this.y)
        }

        set position(pos: egret.Point) {
            this.x = pos.x
            this.y = pos.y
        }

        // let node = new Pb.RandomShape()           
        // node.jumpTo(new egret.Point(200,440),-400,2000)
        // node.jumpBy(new egret.Point(400,-100),-400,2000)
        jumpBy(pos: egret.Point, height: number, duration: number, easing?: Function) {
            //v = v0 + a*t
            //s = (v0+(v0-at))/2*t  => v0^2 = 2*h*a  代入结尾点得到  dy = (2v0-a*dua)*dua/2  => v0 = (dy*2/dua + a*dua)/2
            //dua^2*a2 + (4dy-8h)*a + (dy*2/dua)^2 = 0
            //
            this._jumpTime = 0
            this._jumpInfo.sPos = this.position
            this._jumpInfo.d = (pos.x) / duration //计算x随t的增长率
            let a = Math.pow(duration, 2)
            let b = 4 * pos.y - 8 * height
            let c = Math.pow((pos.y * 2) / duration, 2)
            let delta = Math.sqrt(Math.pow(b, 2) - 4 * a * c)
            let ans1 = (-b + delta) / (2 * a)
            let ans2 = (-b - delta) / (2 * a)
            let v01 = (pos.y * 2 / duration + ans1 * duration) / 2
            let v02 = (pos.y * 2 / duration + ans2 * duration) / 2
            let t01 = v01 / ans1
            let t02 = v02 / ans2
            if (t01 > 0 && t01 <= duration) {
                this._jumpInfo.a = ans1
                this._jumpInfo.v0 = v01
            } else if (t02 > 0 && t02 <= duration) {
                this._jumpInfo.a = ans2
                this._jumpInfo.v0 = v02
            } else {
                Logger.error("参数计算错误")
            }
            return egret.Tween.get(this).to({ jumpTime: duration }, duration, easing).call(() => {
                this._isMoveing = false

            }, this)
        }

        jumpTo(pos: egret.Point, height: number, duration: number, easing?: Function) {
            if (typeof pos.x === "undefined" || typeof pos.y === "undefined") { return }
            return this.jumpBy(new egret.Point(pos.x - this.x, pos.y - this.y), height, duration, easing)
        }


        /*                  椭圆旋转动作               */
        // protected _ovalHonRadius;
        // protected _ovalVerRadius;
        static r2a = 180 / Math.PI
        protected _ovalRotation: number = 0;
        public ovalIndex: number = 0
        public get ovalRotation(): number {
            return this._ovalRotation;
        }
        public set ovalRotation(v: number) {
            this._ovalRotation = v;
            this.x = this.ovalHonRadius * Math.cos(this.ovalRotation / RandomShape.r2a)
            this.y = -this.ovalVerRadius * Math.sin(this.ovalRotation / RandomShape.r2a)
        }

        protected _ovalHonRadius: number = 155;
        public get ovalHonRadius(): number {
            return this._ovalHonRadius;
        }
        public set ovalHonRadius(v: number) {
            this._ovalHonRadius = v;
        }

        private _ovalVerRadius: number = 31;
        public get ovalVerRadius(): number {
            return this._ovalVerRadius;
        }
        public set ovalVerRadius(v: number) {
            this._ovalVerRadius = v;
        }
        _bezierTime: number
        _bezierEnd: egret.Point
        protected _bezierList: Array<egret.Point>
        static PascalTriangle: Array<Array<number>> = []
        static getPascalList(i) {
            if (i > 20) {
                Logger.error("参数过大")
                return []
            }
            if (RandomShape.PascalTriangle[i]) {
                return RandomShape.PascalTriangle[i]
            }
            if (i == 1) {
                RandomShape.PascalTriangle[i] = [1]
            } else if (i == 2) {
                return RandomShape.PascalTriangle[i] = [1, 1]
            } else {
                let preList = RandomShape.getPascalList(i - 1)
                let nowList = []
                nowList.push(1)
                for (let j = 0; j < preList.length - 1; j++) {
                    nowList.push(preList[j] + preList[j + 1])
                }
                nowList.push(1)
                return RandomShape.PascalTriangle[i] = nowList
            }
            return RandomShape.PascalTriangle[i]


        }

        set bezierTime(time) {
            this._bezierTime = time
            let length = this._bezierList.length
            let x = 0
            let y = 0
            let paList = RandomShape.getPascalList(this._bezierList.length)
            for (let i = 0; i < length; i++) {
                let pTotal = paList[i] * Math.pow(1 - this._bezierTime, length - i - 1) * Math.pow(this._bezierTime, i)
                x += pTotal * this._bezierList[i].x
                y += pTotal * this._bezierList[i].y
            }
            this.x = x
            this.y = y
        }

        get bezierTime() {
            return this._bezierTime
        }

        bezierTo(bezierList: Array<egret.Point>, duration: number, easing?: Function) {
            this._bezierList = bezierList
            this.bezierTime = 0
            return egret.Tween.get(this).to({ bezierTime: 1 }, duration, easing)
        }
    }
}