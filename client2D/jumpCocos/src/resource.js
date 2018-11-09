var res = {
    HelloWorld_png: "res/HelloWorld.png",
    lyrics: "res/lyrics/我的唇吻不到我爱的人王奕心.txt",

};

var g_resources = [
    {
        type: "font",
        name: "Marker",
        srcs: ["res/font/font3.TTF"]
    },
    {
        type: "font",
        name: "font1",
        srcs: ["res/font/font1.ttf"]
    },
    {
        type: "font",
        name: "font2",
        srcs: ["res/font/font2.ttf"]
    }

];
for (var i in res) {
    g_resources.push(res[i]);
}
