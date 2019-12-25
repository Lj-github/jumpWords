// 每秒定时回调，不再自己添加timer
module SecTimeHander {
    var timer: egret.Timer
    let quickTimer: egret.Timer
    export const slowTimerScale = 1000
    export const quickTimerScale = 30
    function startSecCb() {
        if (!timer) {
            timer = new egret.Timer(slowTimerScale, 0)
            timer.addEventListener(egret.TimerEvent.TIMER, updateList, SecTimeHander)
            timer.start()
        }
    }

    function startQuick() {
        if (!quickTimer) {
            quickTimer = new egret.Timer(quickTimerScale, 0)
            quickTimer.addEventListener(egret.TimerEvent.TIMER, updateQuickList, SecTimeHander)
            quickTimer.start()
        }
    }


    function updateList() {
        eventList.forEach((evt) => {
            evt.cb.call(evt.cbTgt)
        })
    }
    function updateQuickList() {
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
    export function subscribeSlow(callback: (...args) => any, cbTarget?: any) {
        if (!timer) {
            startSecCb()
        }
        eventList.push({ cb: callback, cbTgt: cbTarget })
    }

    export function unSubscribeSlow(callback, cbTarget) {
        eventList.push({ cb: callback, cbTgt: cbTarget })
        eventList = eventList.filter((evt) => {
            return evt.cbTgt != cbTarget || evt.cb != callback
        })
    }

    export function unsubscribeSlowAllOnTarget(target: any) {
        if (!target) {
            return
        }
        eventList = eventList.filter((evt) => {
            return evt.cbTgt != target
        })
    }

    //快
    export function subscribeQuick(callback: (...args) => any, cbTarget?: any) {
        if (!quickTimer) {
            startQuick()
        }
        quickEventList.push({ cb: callback, cbTgt: cbTarget })
    }

    export function unSubscribeQuick(callback, cbTarget) {
        quickEventList.push({ cb: callback, cbTgt: cbTarget })
        quickEventList = quickEventList.filter((evt) => {
            return evt.cbTgt != cbTarget || evt.cb != callback
        })
    }

    export function unsubscribeQuickAllOnTarget(target: any) {
        if (!target) {
            return
        }
        quickEventList = quickEventList.filter((evt) => {
            return evt.cbTgt != target
        })
    }

}