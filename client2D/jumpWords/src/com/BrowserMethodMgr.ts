// TypeScript file

module BrowserMethodMgr {
    /**
     * 把base64 存到java chrome 里面
     */

    let fileId = 0
    export function saveBase64DataToBrowser(bast64Str: string) {
        if (window.J_Base64ToImageUtil) {
            fileId++
            window.J_Base64ToImageUtil.base64ChangeImage(bast64Str, fileId + ".jpg")
        } else {
            console.log(bast64Str)
        }
    }
}