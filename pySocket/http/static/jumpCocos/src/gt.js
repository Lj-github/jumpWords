var gt = window.gt || {}
gt.size = cc.winSize


gt.shader = {
    Wave: {

        vsh: "\n" +
            "attribute vec4 a_position;\n" +
            "attribute vec2 a_texCoord;\n" +
            "attribute vec4 a_color;\n" +
            "varying vec4 v_fragmentColor;\n" +
            "varying vec2 v_texCoord;\n" +
            "void main()\n" +
            "\n{\n" +
            "   gl_Position = CC_PMatrix * a_position;\n" +
            "   v_fragmentColor = a_color;\n" +
            "   v_texCoord = a_texCoord;\n" +
            "}",

        fsh: "\n" +
            "varying vec2 v_texCoord;\n" +
            "uniform float u_radius;\n" +
            "uniform float u_vector;\n" +
            "void main()\n" +
            "\n{\n" +
            "   float radius = u_radius;\n" +
            "   vec2 coord = v_texCoord;\n" +
            "   coord.x += (sin(coord.y * 8.0 * 3.1415926 + radius*3.1415926 *1000.0) / 30.0  )   ;\n" +
            "   vec2 uvs = coord.xy;\n" +
            "   gl_FragColor = texture2D(CC_Texture0, coord);\n" +
            "}"

    }


}

gt.webglRanderCanvas = null
gt.createCanvasForWEBGLRander = function () {
    var oDiv = document.createElement('div');
    document.body.append(oDiv);

    var tempCanvas = document.createElement('canvas');
    oDiv.appendChild(tempCanvas);
    tempCanvas.id = 'webglRander'
    gt.webglRanderCanvas = tempCanvas
    // tempCanvas.getContext('2d').putImageData(imageData, 0, 0, 0, 0, cc.game._renderContext.drawingBufferWidth, cc.game._renderContext.drawingBufferHeight);
    // console.log(tempCanvas.toDataURL());
    //
}

gt.musicRanderLanEnum = 80
//是否socket 发送 数据
gt.isSocket = false

//长条的  倾斜度
gt.rectSkewX = 20

gt.rectWidth = 18
gt.reatHeight = 100

