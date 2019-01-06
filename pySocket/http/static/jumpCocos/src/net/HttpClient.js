var httpHelper = {}
httpHelper.isBegin = false
httpHelper.post = function (url, params, callback) {
    var nums = arguments.length
    if (nums == 2) {
        callback = arguments[1];
        params = "";
    }
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            err = false;
        } else {
            err = true;
        }
        var response = xhr.responseText;
        callback(response);
    };
    xhr.send(params);
}

var HttpClient = {}
HttpClient.post = 'http://192.168.199.115'
HttpClient.post = 'http://localhost'
HttpClient.port = '9613'

HttpClient.post_jsonp = function (url, params, callback) {
    $.ajax({
        url: url,
        data: params,
        dataType: 'jsonp',
        type: "POST",
        async: true,
        crossDomain: true,
        success: function (data) {
            console.log(data);
            callback(data)
        }
    })
}
//
// let httpClientTimer = function () {
//     if (allMsg.length === 0) {
//         httpClientTimer()
//         return
//     }
//     httpHelper.post(HttpClient.post +    ":" + HttpClient.port, {data: allMsg[0]}, httpClientTimer)
//     allMsg = allMsg.splice(1, allMsg.length)
// }
let idx = 0
let FPS = 30 //使用30 fps 比较合适  直接能成功

let isBegin = false
let time = new Date()
console.log("开始时间 " + time.getSeconds() + "s")

let old = 0
let timer
let count = 0

HttpClient.post_data =  function (id, cont) {
        $.ajax({
            type: "POST",
            url:  HttpClient.post + ":9613/postSaveTxt/",
            data: {username: idx, content: cont},
            dataType: "json",
            success: function (data) {
                if (data.code === "success") {
                    delete allMsg[0]
                    allMsg = allMsg.splice(1, allMsg.length)
                    idx = idx + 1
                    if (allMsg.length > 0) {
                        isBegin = true
                        HttpClient.post_data(idx, allMsg[0])
                    } else {
                        isBegin = false
                    }
                }
            },
            onerror:function(e){
                console.log("send fail!!",e)
            },
            //回收 主动
            complete: function (XHR, TS) {
                XHR = null
            }
        });
}
// var begin = function () {
//     timer = setInterval(function () {
//         allMsg.push(getStr())
//         count++
//         if (!isBegin) {
//             HttpClient.post_data(0, allMsg[0])
//         }
//         if (count % 60 === 0) {
//             console.log("运行时间 " + new Date().getSeconds() + " 秒")
//             console.log("数量差值 " + (count - old) + " 次数")
//             old = count
//         }
//     }, 1000 / FPS)
// }

let pushHttpData = function (data) {
    allMsg.push(data.base64)
    count++
    if (!isBegin) {
        HttpClient.post_data(0, allMsg[0])
    }
    if (count % 60 === 0) {
        old = count
    }
}

var stop = function () {
    clearInterval(timer)
}




