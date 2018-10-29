
interface Window{
    XMLHttpRequest:any;
    ActiveXObject:any;
}
module gt {
    export const lan_cn = "ch"// 当前先写为中文
    export const lan_en = "en"// 当前先写为中文
    const lan = lan_en
    const isDebug = true

    export let SocketClient: SocketClient
    export let size = {
        width: 0,
        height: 0
        // Number(document.getElementsByClassName("egret-player")[0].getAttribute("data-content-width")) ,
        // Number(document.getElementsByClassName("egret-player")[0].getAttribute("data-content-height"))
    }

    export function getLocalContex(id: number): string {
        if (!LC[id]) {
            console.error("没有定义 id = " + id + " 的文字")
            return
        }
        return LC[id][lan]
    }

    export function log(...params) {
        if (isDebug) {
            return
        } else {
            console.log.apply(console, arguments)
        }
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

    /**
     * 判断是否安装 MetaMask   通过他的 js 文件 判断
     */

    export const metaMaskUrl = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"

    export function isInstallMetaMask() {
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

    export function setProp(tgt, props) {
        if (!tgt || !props) {
            return
        }
        for (let key in props) {
            tgt[key] = props[key]
        }
    }

    export function arrayWeighting(arr: Array<any>) {
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

    export function isHttps() {
        return window.location.href.indexOf('https://') == 0
    }

    export var getFnName = function (callee) {
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

    export function getCustomFilter(r: number, g: number, b: number) {
        var colorMatrix = [
            r / 255, 0, 0, 0, 0,
            0, g / 255, 0, 0, 0,
            0, 0, b / 255, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter
    }

    export function setLblUnderLine(lbl: eui.Label, text?: string) {
        var str = text == void 0 ? lbl.text : text
        var httpTxt = new egret.HtmlTextParser().parser("<u>" + str + "</u>");
        lbl.textFlow = httpTxt
    }
      export function getXMLHttpRequest() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("MSXML2.XMLHTTP");
    }


export function clone<T>(obj: T): T {
        var newObj = (obj.constructor) ? (new (<any>obj).constructor) : {};
        for (var key in obj) {
            var copy = obj[key];
            // Beware that typeof null == "object" !
            if (((typeof copy) === "object") && copy &&
                !(copy instanceof egret.DisplayObject) && !(copy instanceof HTMLElement)) {
                newObj[key] = clone(copy);
            } else {
                newObj[key] = copy;
            }
        }
        return newObj;
    }



      /*
    *检测是否有中文字符
    */
    export function isContainChinese(str) {
        let reg = /[\u4e00-\u9fa5]/g
        return reg.test(str)
    }

       export function getGrayFilters(v: number) {
        var colorMatrix = [
            v, 0, 0, 0, 0,
            0, v, 0, 0, 0,
            0, 0, v, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter
    }

      /**
     * 二分法查找 返回目标索引
     */
    export function dichotomyFind(array: Array<any>, value: any, key: any): number {
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
    export function randomValue(min: number, max: number): number {
        var value: number = min + Math.random() * (max - min + 1) >> 0;
        return value;
    }



}