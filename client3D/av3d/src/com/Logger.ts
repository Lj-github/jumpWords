// log输出控制
export class Logger {
    private static _level = 0
    private static _isCollect = false
    private static _uuid = undefined
    private static isToNet = false

    private static isDebugEnabled(): boolean {
        return this._level >= 0
    };

    private static log(...params) {
        if (this._level > 0) {
            return
        } else {
            console.log.apply(console, arguments)
        }
    };

    private static logf(...params) { //无论什么环境都要打出来比较重要的流程才使用
        console.log.apply(console, arguments)
    }

    private static warn(...params) {
        console.warn.apply(console, arguments)
    };

    private static isInfoEnabled(): boolean {
        return this._level >= 1
    };

    static getFunctionName(func) {
        if (typeof func == 'function' || typeof func == 'object') {
            var name = ('' + func).match(/function\s*([\w\$]*)\s*\(/);
        }
        return name && name[1];
    }

    static error(...params) {
        if (this._level > 2) {
            return
        } else {
            console.error.apply(console, arguments)
            var stack = {};
            let errBake: any = Error
            if (errBake.captureStackTrace) {// && this.touchReachTgt instanceof Function
                let obj: any = {}
                errBake.captureStackTrace(obj)
                stack = obj.stack
            } else {
                try {
                    throw new Error();
                } catch (e) {
                    // e.stack 中包含了堆栈数据，可以进行处理从而忽略不感兴趣的堆栈信息
                    stack = e.stack
                }
            }
            // (<any>window).reportError({ message: arguments[0], ezStack: stack })
        }
    };
} 