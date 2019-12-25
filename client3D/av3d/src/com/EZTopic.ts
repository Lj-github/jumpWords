// 原来简单地消息机制
interface eventOneData {
    target?: any,
    invoker: (...args) => any,
    once: boolean
}

export class EZTopic {
    private static eventMaps: any = {}

    static subscribe(topic: string, callback: (...args) => any, cbTarget?: any, once?: boolean) {
        // ("loop ------EZTopic.subscribe："+topic);
        var events = this.eventMaps[topic]
        if (!events) {
            events = []
            this.eventMaps[topic] = events
        }
        events.push({
            target: cbTarget,
            invoker: callback,
            once: once || false
        })
    }

    static unsubscribe(callback, cbTarget) {
        // ("loop ------EZTopic.unsubscribe");
        var eventMapsBake = this.eventMaps
        Object.keys(this.eventMaps).forEach((key) => {
            var items = this.eventMaps[key].filter((item) => {
                return item.target != cbTarget || item.invoker != callback
            }) // 找到不等于 target 的保留下来
            eventMapsBake[key] = items
        })
    }

    static unsubscribeAllOnTarget(target: any) {
        // ("loop ------EZTopic.unsubscribeAllOnTarget");

        if (!target) {
            return
        }
        var eventMapsBake = this.eventMaps
        Object.keys(this.eventMaps).forEach((key) => {
            var items = this.eventMaps[key].filter((item) => {
                return item.target != target
            }) // 找到不等于 target 的保留下来
            eventMapsBake[key] = items
        })
    }

    static publish(...args) {


        if (!arguments || arguments.length <= 0) {
            return
        }

        var topicId = arguments[0]
        // ("loop ------EZTopic.publish:"+topicId);
        var newArgs = Array.prototype.splice.call(arguments, 1)
        var events: [eventOneData] = this.eventMaps[topicId]
        console.log('topicId', topicId, "msg  ", newArgs)
        if (events && events.length > 0) {
            // invoker回调中有可能会对events进行修改，所以必须等所有回调执行完成之后，才能处理once参数
            var list = []
            list.push(events)
            for (let event of events) {
                event.invoker.apply(event.target, newArgs)
            }
            // # 重新取值
            events = this.eventMaps[topicId]
            // # 排除掉只能执行一次的那些 event
            var keeps = events.filter((event) => {
                return !event.once
            })
            this.eventMaps[topicId] = keeps
        }
    }
}