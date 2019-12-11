// TypeScript file

/**
 * create by liujiang on 2019/12/9 17:22
 * 
 * TOOD:canvas  还可以直接播放 视频
 */
class MediaDrawToCanvasUtils {
    private static _instance = new MediaDrawToCanvasUtils()
    static getInstance() {
        return this._instance
    }
    beginDraw() {
        var timer = null;
        var video = <HTMLVideoElement>document.getElementById('video1');
        var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        canvas.width = window.innerWidth * 2;  //获取屏幕宽度作为canvas的宽度  这个设置的越大，画面越清晰（相当于绘制的图像大，然后被css缩小）
        canvas.height = window.innerHeight * 2;
        function draw1() {//绘制视频
            video.play();
            timer = setInterval(function () {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);//绘制视频
            }, 40);
        };
        draw1();
    }
}

