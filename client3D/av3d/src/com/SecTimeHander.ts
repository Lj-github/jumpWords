// 每秒定时回调，不再自己添加timer
interface event {
    cb: Function
    cbTgt: any
}

export class SecTimeHander {
    private static timer: number
    private static quickTimer: number
    private static slowTimerScale = 1000
    private static quickTimerScale = 30
    private static startSecCb() {
        if (!this.timer) {
            let self = this
            this.timer = setInterval(() => {
                self.updateList()
            }, this.slowTimerScale)
        }
    }

    private static startQuick() {
        if (!this.quickTimer) {
            let self = this
            this.quickTimer = setInterval(() => {
                self.updateQuickList()
            }, this.quickTimerScale)
        }
    }


    private static updateList() {
        this.eventList.forEach((evt) => {
            evt.cb.call(evt.cbTgt)
        })
    }
    private static updateQuickList() {
        this.quickEventList.forEach((evt) => {
            evt.cb.call(evt.cbTgt)
        })
    }

    private static eventList: Array<event> = []
    private static quickEventList: Array<event> = []

    //慢
    static subscribeSlow(callback: (...args) => any, cbTarget?: any) {
        if (!this.timer) {
            this.startSecCb()
        }
        this.eventList.push({ cb: callback, cbTgt: cbTarget })
    }

    static unSubscribeSlow(callback, cbTarget) {
        this.eventList.push({ cb: callback, cbTgt: cbTarget })
        this.eventList = this.eventList.filter((evt) => {
            return evt.cbTgt != cbTarget || evt.cb != callback
        })
    }

    static unsubscribeSlowAllOnTarget(target: any) {
        if (!target) {
            return
        }
        this.eventList = this.eventList.filter((evt) => {
            return evt.cbTgt != target
        })
    }

    //快
    static subscribeQuick(callback: (...args) => any, cbTarget?: any) {
        if (!this.quickTimer) {
            this.startQuick()
        }
        this.quickEventList.push({ cb: callback, cbTgt: cbTarget })
    }

    static unSubscribeQuick(callback, cbTarget) {
        this.quickEventList.push({ cb: callback, cbTgt: cbTarget })
        this.quickEventList = this.quickEventList.filter((evt) => {
            return evt.cbTgt != cbTarget || evt.cb != callback
        })
    }

    static unsubscribeQuickAllOnTarget(target: any) {
        if (!target) {
            return
        }
        this.quickEventList = this.quickEventList.filter((evt) => {
            return evt.cbTgt != target
        })
    }

}