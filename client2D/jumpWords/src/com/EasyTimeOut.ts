// 方便管理页面内多个TimeOut
module EasyTimeOut {
    interface timerEvent {
        cb: Function
        cbTgt: any
        dt: number
    }

    class TimeOutOne extends egret.HashObject {
        public timerData: timerEvent
        public timerKey: number

        public startTimer(timerData: timerEvent) {
            this.timerData = timerData
            this.timerKey = egret.setTimeout(this.timerGet, this, timerData.dt)
        }

        timerGet() {
            for (let i = 0; i < arrayTimers.length; ++i) {
                let element = arrayTimers[i]
                if (element.timerKey === this.timerKey) {
                    arrayTimers.splice(i, 1)
                }
            }
            this.timerData.cb.call(this.timerData.cbTgt)
            this.timerData = null
        }

        public clear() {
            egret.clearTimeout(this.timerKey)
            this.timerData = null
        }

    }
    export var arrayTimers: Array<TimeOutOne> = []


    export function scheduleOnce(callback: Function, cbTarget: any, dt: number) {
        for (let element of arrayTimers) {
            if (element.timerData.cb === callback) {
                Logger.log('timeout exist!')
                return
            }
        }
        let timeOutOne = new TimeOutOne()
        timeOutOne.startTimer({ cb: callback, cbTgt: cbTarget, dt: dt })
        arrayTimers.push(timeOutOne)
    }

    // function makeTimeout(callback: Function, cbTarget: any, dt: number): number {
    //     return egret.setTimeout(() => {
    //         for (let i = 0; i < arrayTimers.length; ++i) {
    //             let element = arrayTimers[i]
    //             if (element.cb === callback) {
    //                 arrayTimers.splice(i, 1)
    //             }
    //         }
    //         callback.call(cbTarget)
    //     }, this, dt)
    // }

    export function unschedule(callback: Function, cbTarget) {
        for (let i = 0; i < arrayTimers.length; ++i) {
            let element = arrayTimers[i]
            if (element.timerData.cb === callback && element.timerData.cbTgt === cbTarget) {
                element.clear()
                arrayTimers.splice(i, 1)
                break
            }
        }
    }


    export function unscheduleAllOnTarget(target: any) {
        if (!target) {
            return
        }
        arrayTimers = arrayTimers.filter((evt) => {
            let evtTar = evt.timerData.cbTgt
            if (evtTar == target) {
                evt.clear()
            }
            return evtTar != target
        })
    }

}