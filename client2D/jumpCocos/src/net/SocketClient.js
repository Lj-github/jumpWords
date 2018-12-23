var isConnected = false
var allMsg = []
let sendSocketTimer = function(){
    setInterval(function () {
    sendMsg(allMsg[0])
    allMsg = allMsg.splice(1,allMsg.length)
},33)
}
var onopen = function () {
    /* 与服务器端连接成功后，自动执行 */
    console.log("链接成功")
    isConnected = true
};

var onmessage = function (event) {
    /* 服务器端向客户端发送数据时，自动执行 */
    var response = event.data;
    console.log("onmessage", response)
};

var onclose = function (event) {
    /* 服务器端主动断开连接时，自动执行 */
    console.log("关闭连接")
};

var sendMsg = function (txt) {
    //console.log("no txt find")
    if(!txt){return}
    if (isConnected) {
        socket.send(txt);
        txt = undefined
    }
}

var pushMsg = function (txt) {
    allMsg.push(txt)
}

function closeConn() {
    socket.close();
    console.log("关闭连接")
}

let host = 'localhost'
host = '192.168.199.159'//win8.1  home

function initSocket() {
    window.socket = new WebSocket("ws://" + host+":9999");
    socket.onopen = onopen
    socket.onclose = onclose
    socket.onmessage = onmessage

}

