// TypeScript file

module BrowserMethodMgr {
    /**
     * 把base64 存到java chrome 里面
     */

    let fileId = 0
    export function saveBase64DataToBrowser(bast64Str: string) {
        if (window.J_Base64ToImageUtil) {
            fileId++
            window.J_Base64ToImageUtil.base64ChangeImage(bast64Str, this.compareNumStr(fileId, 6) + ".png")
        } else {
            //console.log(bast64Str)
        }
    }

    export function compareNumStr(num: number, len: number) {
        let numStr = String(num)
        return leftPad(numStr, len)
    }


    /**
     * 
     * @param str 补0操作
     * @param len 
     */
    export function leftPad(str, len) {
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
    export function rightPad(str, len) {
        str = str + '' || '';
        len = len || 0;
        while (str.length < len) {
            str += "0";
        }
        return str;
    }
}