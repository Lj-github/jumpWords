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
    private static _instance = new CanvasToWebmUtils()
    static getInstance() {
        return this._instance
    }

    constructor() {
        EZTopic.subscribe(App.TopicEvent.C2C_MUSIC_BEGIN_PLAY, this.onMusicBeginPlay, this)
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
    _canvas: HTMLCanvasElement
    allChunks = []
    recorder: any
    //开始记录 直接用canvas
    beginRecord(fps = 60) {
        let canvas = <HTMLCanvasElement>document.getElementsByTagName("canvas")[0];
        this._canvas = canvas
        // 回调函数执行次数通常是每秒60次
        this.allChunks = [];
        // 60 FPS recording
        const stream2 = canvas['captureStream'](fps);
        const recorder = new window.MediaRecorder(stream2, {
            mimeType: 'video/webm;codecs=vp9'
        });
        this.recorder = recorder
        let self = this
        recorder.ondataavailable = e => {
            self.allChunks.push(
                e.data
            );
        }
        //end & download
        /* setTimeout(function () {
             stopAndblobDownload()
         }, 5000);*/
        //start
        recorder.start(10);
    }

    stopAndblobDownload() {
        this.recorder.stop();
        const link = document.createElement('a');
        link.style.display = 'none';
        const fullBlob = new Blob(this.allChunks);
        const downloadUrl = window.URL.createObjectURL(fullBlob);
        link.href = downloadUrl;
        link.download = `test${Math.random()}.webm`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    onMusicBeginPlay(msg: Struct.C2C_MUSIC_BEGIN_PLAY_MSG) {
        CanvasToWebmUtils.scanCanvas(msg.time * 1000)
    }
    //验证 chrome 没问题
    static scanCanvas(timeLen: number) {
        let canvas = <HTMLCanvasElement>document.getElementsByTagName("canvas")[0];
        let x = 20;
        let speed = 4;
        // 回调函数执行次数通常是每秒60次
        let context = canvas.getContext('2d');
        let allChunks = [];
        let stream2 = canvas['captureStream'](60); // 60 FPS recording
        let recorder = new window.MediaRecorder(stream2, {
            mimeType: 'video/webm;codecs=vp9'
        });
        recorder.ondataavailable = e => {
            allChunks.push(
                e.data
            );
        }
        //end & download
        setTimeout(() => {
            stopAndblobDownload()
        }, timeLen);
        function stopAndblobDownload() {
            recorder.stop();
            const link = document.createElement('a');
            link.style.display = 'none';
            const fullBlob = new Blob(allChunks);
            const downloadUrl = window.URL.createObjectURL(fullBlob);
            link.href = downloadUrl;
            link.download = `AV_${Math.random()}.webm`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        //start
        recorder.start(10);
    }


}
