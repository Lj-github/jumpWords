import { CanvasToWebmUtils } from "./CanvasToWebmUtils"

/**
     created by liujiang
     time 2019/2/11 11:07
 */
export class App {
    /**
     * music mp3 文件路径
     */
   static mp3file = "resource/music/anotherWay.mp3"

    /**
     * 所有跳动的线条颜色 
     */
    static lineColor = 0xff0000
    static lineAlpha = 1

    static run() {
        CanvasToWebmUtils .getInstance()
        
    }
    static exampleTar :any

   
    static width = window.innerWidth

    static height = window.innerHeight

    //是否走java JxBrowser
    static isUseJxBrowser = false
    //是否向 java JxBrowser 发送图片
    static sendBase64ToJxBrowser = false  


    static TopicEvent = {
        C2C_MUSIC_BEGIN_PLAY :"c2c_music_begin_play"

    }


}
