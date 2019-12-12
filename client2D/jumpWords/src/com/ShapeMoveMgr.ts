
enum ShapeType {
    triangle = 1,//三角
    circle,//圆
    rectangle,//长方
    square,//正方
    //可以扩展更多
}


class ShapeMoveMgr {
    private static _instance = new ShapeMoveMgr()
    static getInstance() {
        return this._instance
    }
    _ShapeArr = <game.RandomShape[]>[]
    constructor() {
        SecTimeHander.subscribeQuick(this.update, this)
    }
    update() {
        let exitArr = {}
        this._ShapeArr.forEach((shape) => {
            shape.tryMove()
            //if(){}//出了边界 干掉   移除tween
        })
        this._ShapeArr = this._ShapeArr.filter((shape) => {
            return !exitArr[shape.hashCode]
        })
    }
    registerShape() {


    }
    removeShape() {
        //超出边界 直接干掉





    }
    getRandomShape(type = gt.random(1, 4), pos = new egret.Point(0, 0)) {
        let shape = this.createShape(type)
        //this._ShapeArr.push(shape)
        shape.x = pos.x
        shape.y = pos.y
        return shape
    }
    createShape(type = ShapeType.circle) {
        console.log("createShape", type)
        let shape = new game.RandomShape()
        let color = gt.getRandomColor()
        switch (type) {
            case ShapeType.triangle:
                shape.graphics.lineStyle(2, color);
                shape.graphics.beginFill(color, 1);
                shape.graphics.moveTo(68, 84);
                shape.graphics.lineTo(167, 76);
                shape.graphics.lineTo(221, 118);
                shape.graphics.lineTo(68, 84);
                break
            case ShapeType.rectangle:
                shape.graphics.beginFill(color);
                shape.graphics.drawRect(300, 300, 800, 300);
                break
            case ShapeType.square:
                shape.graphics.beginFill(color);
                shape.graphics.drawRect(300, 300, 300, 300);
                break
            case ShapeType.circle:
                shape.graphics.beginFill(color);
                shape.graphics.drawArc(200, 200, 100, 0, Math.PI * 2, true);
                break
            default:
                console.log("createShape", type, "创建失败！")
                break
        }
        shape.graphics.endFill();
        return shape

    }


}