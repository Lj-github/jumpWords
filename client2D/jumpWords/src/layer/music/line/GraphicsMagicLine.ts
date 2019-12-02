// TypeScript file

/**
 * create by liujiang on 2019/12/2 17/15
 */

module game {

    //想要做一个晃动的 条.
    export class GraphicsMagicLine extends BaseGraphics {
        constructor() {
            super()
            this.createLine()
        }
        line: egret.Shape
        createLine() {
            var shp: egret.Shape = new egret.Shape();

            this.addChild(shp);
            this.line = shp
        }
        refreshLine() {
            let shp = this.line
            this.line.graphics.clear()
            shp.graphics.lineStyle(2, 0x00ff00);
            shp.graphics.moveTo(0, 0);
            shp.graphics.curveTo(-100, 100, 200, 200);
            shp.graphics.endFill();

        }
        //test
        //TODO: 这有个问题就是  长度要变  改成一个弧度的 x y 明天看看怎么写
        set p2x(x: number) {
            let shp = this.line
            this.line.graphics.clear()
            shp.graphics.lineStyle(20, 0x00ff00);
            shp.graphics.moveTo(0, 0);
            shp.graphics.curveTo(x / 6, 100, x, 200);
            shp.graphics.endFill();
        }
        /**
         *-200 200
         * 
         *                 
         *      -100 100
         * 
         *              0,0
         *                    
         *        
         */
    }
}