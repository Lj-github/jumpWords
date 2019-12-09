// TypeScript file

/**
 * create by liujiang on 2019/12/9 17:14 is time to go home 0.0
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported //官方文档
 * //zhihu https://zhuanlan.zhihu.com/p/71528138
 * //git https://wendychengc.github.io/media-recorder-video-canvas/videocanvas.html
 * 
 * //lean https://cloud.tencent.com/developer/article/1366886  demo https://codepen.io/kaikai1024/pen/wLWbpP?editors=1111
 * 
 
 * vs里面的库 没有 new window.MediaRecorder
 * 
 * 从 shadertoy 上面 看见 可以直接从 浏览器中生成 视频 webm 文件 所以试一下
 */

class CanvasToWebmUtils {

    constructor() {
    }
    videoElem
    videoDiv;
    getVideoType(video: HTMLVideoElement) {
        var returnType = '';
        if (video.canPlayType('video/mp4') == 'probably' || video.canPlayType('video/mp4') == 'maybe') {
            returnType = 'mp4';
        } else if (video.canPlayType('video/ogg') == 'probably' || video.canPlayType('video/ogg') == 'maybe') {
            returnType = 'ogg';
        } else if (video.canPlayType('video/webm') == 'probably' || video.canPlayType('video/webm') == 'maybe') {
            returnType = 'webm';
        }
        return returnType;
    }
    createVideo() {
        this.videoElem = document.createElement("video");//创建video
        this.videoDiv = document.getElementById("videopanel");//获取video的外层容器
        this.videoDiv.appendChild(this.videoElem);
        var vtype = this.getVideoType(this.videoElem);//判断浏览器支持的格式
        if (vtype == "") {
            this.videoDiv.innerHtml('不支持video')
        } else {
            this.videoElem.setAttribute('src', "text." + vtype);
        }
    }

    demo() {
        var canvas = <HTMLCanvasElement>document.getElementById("webm-canvas");
        window.requestAnimationFrame(draw)
        var x = 20;
        var speed = 4;
        // 回调函数执行次数通常是每秒60次
        let context = canvas.getContext('2d');
        function draw() {
            //1. 先把画布清空
            context.clearRect(0, 0, canvas.width, canvas.height);
            //2. 画小球
            context.beginPath();
            context.fillStyle = "#FF0000";
            context.arc(x, 80, 20, 0, 2 * Math.PI);
            context.fillText('x:' + x, 10, 10);
            context.fill();
            //3. x要移动
            x += speed;
            if (x > canvas.width - 20 || x < 20) {
                speed = -speed;
            }
            //被优化过的动画执行方向1.递归调用；2.可以自适应浏览器的刷新的帧率
            window.requestAnimationFrame(draw);
        }

        var allChunks = [];
        const stream2 = canvas['captureStream'](60); // 60 FPS recording
        const recorder = new window.MediaRecorder(stream2, {
            mimeType: 'video/webm;codecs=vp9'
        });
        recorder.ondataavailable = e => {
            //console.log("TCL: e", e)
            allChunks.push(
                e.data
            );
        }
        //end & download
        function stopAndblobDownload() {
            recorder.stop();
            const link = document.createElement('a');
            link.style.display = 'none';
            const fullBlob = new Blob(allChunks);
            const downloadUrl = window.URL.createObjectURL(fullBlob);
            link.href = downloadUrl;
            link.download = `test${Math.random()}.webm`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        //start
        function startRecording() {

            recorder.start(10);
        }


    }


}
