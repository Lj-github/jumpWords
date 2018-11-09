var Union = {}
Union.getRandomColor = function () {
    return cc.color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))
}

Union.getLyrics = function (url,tar,cb) {
    cc.loader.loadTxt(url, function (error, data) {
        cb.call(tar,data)
    });
}





