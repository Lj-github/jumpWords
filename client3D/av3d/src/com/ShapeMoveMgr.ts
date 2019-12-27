import { SecTimeHander } from "./SecTimeHander"

enum ShapeType {
    triangle = 1,//三角
    circle,//圆
    rectangle,//长方
    square,//正方
    //可以扩展更多
}

//这个可以加上物理
class ShapeMoveMgr {
    private static _instance = new ShapeMoveMgr()
    static getInstance() {
        return this._instance
    }
    _ShapeArr = <game.RandomShape[]>[]
    constructor() {
        SecTimeHander .subscribeQuick(this.update, this)
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
    getRandomShape(color?, type = gt.random(1, 4), pos?: Laya.Point) {
        let shape = this.createShape(type, color)
        //this._ShapeArr.push(shape)
        if (pos) {
            shape.x = pos.x
            shape.y = pos.y
        }
        return shape
    }
    createShape(type = ShapeType.circle, _color: number) {
        //从00 点开始绘制 比较好
        let shape = new game.RandomShape()
        let color = _color ? _color : gt.getRandomColor()
        switch (type) {
            case ShapeType.triangle:
                shape.graphics.lineStyle(2, color);
                shape.graphics.beginFill(color, 1);
                shape.graphics.moveTo(0, 0);
                shape.graphics.lineTo(250, 115);
                shape.graphics.lineTo(100, 250);
                shape.graphics.lineTo(0, 0);
                break
            case ShapeType.rectangle:
                shape.graphics.beginFill(color);
                shape.graphics.drawRect(0, 0, 400, 200);
                break
            case ShapeType.square:
                shape.graphics.beginFill(color);
                shape.graphics.drawRect(0, 0, 300, 300);
                break
            case ShapeType.circle:
                shape.graphics.beginFill(color);
                shape.graphics.drawArc(0, 0, 150, 0, Math.PI * 2, true);
                break
            default:
                console.log("createShape", type, "创建失败！")
                break
        }
        shape.graphics.endFill();
        return shape

    }


}