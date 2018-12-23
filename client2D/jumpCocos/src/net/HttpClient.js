var httpHelper = {}
httpHelper.post = function(url,params,callback){
        var nums = arguments.length
        if(nums == 2){
            callback = arguments[1];
            params = "";
        }
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                err = false;
            }else{
                err = true;
            }
            var response = xhr.responseText;
            callback(err,response);
        };
        xhr.send(params);
    }

var HttpClient = {}
HttpClient.post = 'http://192.168.199.159'
HttpClient.port = '5000'
let httpClientTimer = function(){
    if(allMsg.length === 0){
        httpClientTimer()
        return
    }
   httpHelper.post(HttpClient.port + HttpClient.port,allMsg[0],httpClientTimer)
   allMsg = allMsg.splice(1,allMsg.length)
}



