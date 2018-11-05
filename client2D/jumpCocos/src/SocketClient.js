var socket = new WebSocket("ws://192.168.1.214:9999");
var isConnected = false
socket.onopen = function () {
    /* 与服务器端连接成功后，自动执行 */
    console.log("链接成功")
    isConnected = true
};

socket.onmessage = function (event) {
    /* 服务器端向客户端发送数据时，自动执行 */
    var response = event.data;
    console.log("onmessage", response)
};

socket.onclose = function (event) {
    /* 服务器端主动断开连接时，自动执行 */
    console.log("关闭连接")
};

function sendMsg(txt) {
    if (isConnected) {
        socket.send(txt);
    }
}

function closeConn() {
    socket.close();
    console.log("关闭连接")
}