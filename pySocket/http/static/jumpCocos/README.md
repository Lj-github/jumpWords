 由于  shader 只能在webgl 模式下运行  所以当前问题需要解决  webgl 模式下的 todataurl
 
 修改CCboot.js _initRenderer: function (width, height) {
 
  if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            this._renderContext = cc._renderContext = cc.webglContext
             = cc.create3DContext(localCanvas, {
                'stencil': true,
                'alpha': false,
                preserveDrawingBuffer: true
            });
        }
        
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("experimental-webgl"， {preserveDrawingBuffer: true});
    实现webgl 直接 .toDataURL()
        
-************************************----
        