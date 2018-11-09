var Union = {}
Union.getRandomColor = function () {
    return cc.color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))
}

Union.getLyrics = function (url, tar, cb) {
    cc.loader.loadTxt(url, function (error, data) {
        cb.call(tar, data)
    });
}

/**
 * 返回数组形式  [  {time: 2 /秒数/,txt :‘’ /文字/}  ]
 */

Union.splitLyricsToJson = function (lyricsStr) {
    let allList = []
    let fTxt = lyricsStr.split("↵")
    for (var i  in fTxt) {
        let item = fTxt[i]
        allList.push({
            time: Union.timeToSecond(item.split('[').pop().split(']')[0]),
            txt: item.split('[').pop().split(']').pop()
        })
    }
    return allList
}

/**
 * 01:52.58
 */

Union.timeToSecond = function (timeStr) {
    let fTxt = timeStr.split(":")
    let se = 0
    for (var i  in fTxt) {
        let item = fTxt[i]
        se = se + (item-1) * Math.pow(60, i)
    }
    return se
}







