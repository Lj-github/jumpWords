/**
     created by liujiang
     time 2019/2/11 11:07
 */
namespace App {
    /**
     * music mp3 文件路径
     */
    export const mp3file = "resource/music/anotherWay.mp3"

    /**
     * 所有跳动的线条颜色 
     */
    export const lineColor = 0xff0000
    export const lineAlpha = 1

    export function run() {
        CanvasToWebmUtils.getInstance()
        
    }
    export let exampleTar :any

   
    export const width = window.innerWidth

    export const height = window.innerHeight

    //是否走java JxBrowser
    export const isUseJxBrowser = false
    //是否向 java JxBrowser 发送图片
    export const sendBase64ToJxBrowser = false  


    export const TopicEvent = {
        C2C_MUSIC_BEGIN_PLAY :"c2c_music_begin_play"

    }


}
