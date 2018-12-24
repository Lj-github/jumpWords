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
HttpClient.post = 'http://192.168.199.159'
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

let httpClientTimer = function () {
    if (allMsg.length === 0) {
        httpClientTimer()
        return
    }
    httpHelper.post(HttpClient.post + ":" + HttpClient.port, {data: allMsg[0]}, httpClientTimer)
    allMsg = allMsg.splice(1, allMsg.length)
}



