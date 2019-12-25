
interface Window {
    XMLHttpRequest: any;
    ActiveXObject: any;
}
export enum Color {
    GREEN = 0x24d12c,
    GRAY = 0x949494,
    RED = 0xf4271d,
    WHITE = 0xfffff4,
    GRAY1 = 0x5e5e5e,
    PURPLE = 0xd51ff6,
    PURPLE1 = 0xE300BC,
    ORANGE = 0xf55709,
    BLUE = 0x82c3ff,
    BLACK = 0x153d44,
    BROWN_DEEP = 0x5C3723,
    BROWN_SHALLOW = 0x5B4221,
    YEL_SHALLOW = 0xFEF0C3,
    YELLOW = 0xf9ee12,
}


export class gt {
    static lan_cn = "ch"// 当前先写为中文
    static lan_en = "en"// 当前先写为中文
    static lan = gt.lan_cn
    static isDebug = true
    static size = {
        width: 0,
        height: 0
        // Number(document.getElementsByClassName("egret-player")[0].getAttribute("data-content-width")) ,
        // Number(document.getElementsByClassName("egret-player")[0].getAttribute("data-content-height"))
    }

    static getLocalContex(id: number): string {
        if (!LC[id]) {
            console.error("没有定义 id = " + id + " 的文字")
            return
        }
        return LC[id][this.lan]
    }

    static log(...params) {
        if (this.isDebug) {
            return
        } else {
            console.log.apply(console, arguments)
        }
    }


    /**
     * 判断是否安装 MetaMask   通过他的 js 文件 判断
     */

    static metaMaskUrl = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"

    static isInstallMetaMask() {
        // 检查web3是否已经注入到(Mist/MetaMask)
        if (typeof window["web3"] !== 'undefined') {
            // 使用 Mist/MetaMask 的提供者
            // web3js = new Web3(web3.currentProvider);
        } else {
            alert("没有安装 MetaMask")
        }

        // // 现在你可以启动你的应用并自由访问 Web3.js:
        // startApp()

    }

    static setProp(tgt, props) {
        if (!tgt || !props) {
            return
        }
        for (let key in props) {
            tgt[key] = props[key]
        }
    }

    static arrayWeighting(arr: Array<any>) {
        let hasMap = {}
        let list1 = []
        arr.forEach((item) => {
            if (!hasMap[item]) {
                list1.push(item)
                hasMap[item] = true
            }
        })
        return list1
    }

    static isHttps() {
        return window.location.href.indexOf('https://') == 0
    }

    static getFnName(callee) {
        var _callee = callee.toString().replace(/[\s\?]*/g, ""),
            comb = _callee.length >= 50 ? 50 : _callee.length;
        _callee = _callee.substring(0, comb);
        var name = _callee.match(/^function([^\(]+?)\(/);
        if (name && name[1]) {
            return name[1];
        }
        var caller = callee.caller,
            _caller = caller.toString().replace(/[\s\?]*/g, "");
        var last = _caller.indexOf(_callee),
            str = _caller.substring(last - 30, last);
        name = str.match(/var([^\=]+?)\=/);
        if (name && name[1]) {
            return name[1];
        }
        return "anonymous"
    };

    static getCustomFilter(r: number, g: number, b: number) {
        var colorMatrix = [
            r / 255, 0, 0, 0, 0,
            0, g / 255, 0, 0, 0,
            0, 0, b / 255, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new Laya.ColorFilter(colorMatrix);
        return colorFlilter
    }


    static getXMLHttpRequest() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("MSXML2.XMLHTTP");
    }


    static clone<T>(obj: T): T {
        var newObj = (obj.constructor) ? (new (<any>obj).constructor) : {};
        for (var key in obj) {
            var copy = obj[key];
            // Beware that typeof null == "object" !
            if (((typeof copy) === "object") && copy &&
                !(copy instanceof Laya.Sprite) && !(copy instanceof HTMLElement)) {
                newObj[key] = this.clone(copy);
            } else {
                newObj[key] = copy;
            }
        }
        return newObj;
    }



    /*
  *检测是否有中文字符
  */
    static isContainChinese(str) {
        let reg = /[\u4e00-\u9fa5]/g
        return reg.test(str)
    }

    static getGrayFilters(v: number) {
        var colorMatrix = [
            v, 0, 0, 0, 0,
            0, v, 0, 0, 0,
            0, 0, v, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new Laya.ColorFilter(colorMatrix);
        return colorFlilter
    }

    /**
   * 二分法查找 返回目标索引
   */
    static dichotomyFind(array: Array<any>, value: any, key: any): number {
        var arr: Array<any> = gt.clone(array);
        var low: number = 0;
        var high: number = arr.length - 1;
        var middle: number;
        while (low <= high) {
            middle = low + high >> 1;
            if (value == arr[middle][key]) {
                return middle;
            }
            if (value > arr[middle][key]) {
                low = middle + 1;
            }
            if (value < arr[middle][key]) {
                high = middle - 1;
            }
        }
        return -1;
    }

    /**
    * 俩数之间随机数 min--max
    * @param min 开始值
    * @param max 结束值
    */
    static randomValue(min: number, max: number): number {
        return min + Math.random() * (max - min + 1) >> 0
    }

    // static getLineFilter(_color = getRandomColor()) {
    //     let color: number = _color;        /// 光晕的颜色，十六进制，不包含透明度
    //     let alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
    //     let blurX: number = 30;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
    //     let blurY: number = 30;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
    //     let strength: number = 10;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255
    //     let quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
    //     let inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
    //     let knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
    //     let glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
    //         strength, quality, inner, knockout);
    //     return glowFilter
    // }

    static getScreenShotInCanvasModele() {
        return document.getElementsByTagName("canvas")[0].toDataURL()
    }
    private static type = 'image/png' //图片格式，默认为 image/png
    private static encoderOptions = 1//在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
    static getScreenShotInWebglModele() {
        //模糊点 好像也还行  
        return document.getElementsByTagName("canvas")[0].toDataURL(this.type, this.encoderOptions)
        //.toDataURL("image/webp",.5)
    }

    static getHexColor(r: number, g: number, b: number): number {
        let hR = r.toString(16), hG = g.toString(16), hB = b.toString(16);
        return Number("0x" + (r < 16 ? ("0" + hR) : hR) + (g < 16 ? ("0" + hG) : hG) + (b < 16 ? ("0" + hB) : hB));
    }


    //计算贝塞尔曲线长度
    static calcBezierLength(pt0: Laya.Point, pt1: Laya.Point, pt2: Laya.Point, t: number): number {
        var ax: number = pt0.x - 2 * pt1.x + pt2.x;
        var ay: number = pt0.y - 2 * pt1.y + pt2.y;
        var bx: number = 2 * pt1.x - 2 * pt0.x;
        var by: number = 2 * pt1.y - 2 * pt0.y;

        var A: number = 4 * (ax * ax + ay * ay);
        var B: number = 4 * (ax * bx + ay * by);
        var C: number = bx * bx + by * by;

        var temp1: number = Math.sqrt(C + t * (B + A * t));
        var temp2: number = (2 * A * t * temp1 + B * (temp1 - Math.sqrt(C)));
        var temp3: number = Math.log(B + 2 * Math.sqrt(A) * Math.sqrt(C));
        var temp4: number = Math.log(B + 2 * A * t + 2 * Math.sqrt(A) * temp1);
        var temp5: number = 2 * Math.sqrt(A) * temp2;
        var temp6: number = (B * B - 4 * A * C) * (temp3 - temp4);

        return (temp5 + temp6) / (8 * Math.pow(A, 1.5));
    }
    static getRandomColor() {
        return Number('0x' +
            (function (color) {
                return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                    && (color.length == 6) ? color : arguments.callee(color);
            })(''))
    }

    //生成指定范围内的随机数
    static random(start: number, end: number) {
        let value = start + Math.random() * (end - start)
        return Math.round(value)
    }


}