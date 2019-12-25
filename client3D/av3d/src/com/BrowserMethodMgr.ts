import { App } from "./App";
import { gt } from "./Gt";

// TypeScript file
//created by liujiang 
export class BrowserMethodMgr {
    /**
     * 把base64 存到java chrome 里面
     */

    private static fileId = 0
    static saveBase64DataToBrowser(bast64Str: string) {
        if (window.J_Base64ToImageUtil) {
            this.fileId++
            window.J_Base64ToImageUtil.base64ChangeImage(bast64Str, this.compareNumStr(this.fileId, 6) + ".png")
        } else {
            //console.log(bast64Str)
        }
    }

    static getBufferFormBrowser(): string[] {
        if (window['Js2JavaDj']) {
            let buffStr: string = window['Js2JavaDj'].getBuff()
            if (buffStr) {
                return buffStr.split("$");
            }
        }
        return []
    }

    static compareNumStr(num: number, len: number) {
        let numStr = String(num)
        return this.leftPad(numStr, len)
    }


    /**
     * 
     * @param str 补0操作
     * @param len 
     */
    static leftPad(str, len) {
        str = str + '' || '';
        len = len || 0;
        while (str.length < len) {
            str = "0" + str;
        }
        return str;
    }

    /**
     * 
     * @param str 补0操作
     * @param len 
     */
    static rightPad(str, len) {
        str = str + '' || '';
        len = len || 0;
        while (str.length < len) {
            str += "0";
        }
        return str;
    }

    static sendBase64ToJxBrowser() {
        if (App.isUseJxBrowser && App.sendBase64ToJxBrowser) {
            //获取base64
            let base64 = gt .getScreenShotInWebglModele()
            if (base64) {
                BrowserMethodMgr.saveBase64DataToBrowser(base64)
            }
        }
    }
}