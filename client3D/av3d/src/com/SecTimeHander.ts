// 每秒定时回调，不再自己添加timer
export class  SecTimeHander {
    private static timer:boolean
    private static quickTimer: boolean
    private static slowTimerScale = 1000
    private static quickTimerScale = 30
    private static startSecCb() {
        if (!this.timer) {
           Laya.timer.loop(this.slowTimerScale,this,this.updateList)
           this.timer = true
        }
    }

    private static startQuick() {
        if (!this.quickTimer) {
            quickTimer = new egret.Timer(quickTimerScale, 0)
            quickTimer.addEventListener(egret.TimerEvent.TIMER, updateQuickList, SecTimeHander)
            quickTimer.start()
        }
    }


    private static updateList() {
        eventList.forEach((evt) => {
            evt.cb.call(evt.cbTgt)
        })
    }
    private static updateQuickList() {
        quickEventList.forEach((evt) => {
            evt.cb.call(evt.cbTgt)
        })
    }

    let eventList: Array<event> = []
    let quickEventList: Array<event> = []
    interface event {
        cb: Function
        cbTgt: any
    }
    //慢
    static subscribeSlow(callback: (...args) => any, cbTarget?: any) {
        if (!timer) {
            startSecCb()
        }
        eventList.push({ cb: callback, cbTgt: cbTarget })
    }

    static unSubscribeSlow(callback, cbTarget) {
        eventList.push({ cb: callback, cbTgt: cbTarget })
        eventList = eventList.filter((evt) => {
            return evt.cbTgt != cbTarget || evt.cb != callback
        })
    }

    static unsubscribeSlowAllOnTarget(target: any) {
        if (!target) {
            return
        }
        eventList = eventList.filter((evt) => {
            return evt.cbTgt != target
        })
    }

    //快
    static subscribeQuick(callback: (...args) => any, cbTarget?: any) {
        if (!quickTimer) {
            startQuick()
        }
        quickEventList.push({ cb: callback, cbTgt: cbTarget })
    }

    static unSubscribeQuick(callback, cbTarget) {
        quickEventList.push({ cb: callback, cbTgt: cbTarget })
        quickEventList = quickEventList.filter((evt) => {
            return evt.cbTgt != cbTarget || evt.cb != callback
        })
    }

    static unsubscribeQuickAllOnTarget(target: any) {
        if (!target) {
            return
        }
        quickEventList = quickEventList.filter((evt) => {
            return evt.cbTgt != target
        })
    }

}