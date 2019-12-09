
// 圆 转 正方形  转三角
precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform float time;//0-1
uniform sampler2D uSampler;
void main() {
    //x  y  0-1
    //原的曲线方程  （x-0.5)^2 + (y-0.5)^2 = r^2  r=0.5  圆心(0.5,0.5)
    vec4 fg = texture2D(uSampler, vTextureCoord);
    vec2 uvs = vTextureCoord.xy;
    float y = uvs.y;// =0
    float x = uvs.x;

    //time 0-0.5 正方形 => 圆  0.5=> 1.0 圆 => 正方形
    bool isShowC2r = false;
    // 圆 => 正方形
    float toTime = time + 0.5;
    if(time > 0.5 ){
        toTime = 1.0;
    }
    if( ((pow( x - 0.5 , 2.0) + pow(y - 0.5 , 2.0) ) * toTime) <= 0.25 ){
        isShowC2r = true;
    } 
    //  正方形 => 圆
    bool isShowR2c = true;
    if(time > 0.5 && isShowC2r){
        float x1 =  time - 0.5;
        float x2 = 1.5 - time;
        float y1 =  time - 0.5;
        float y2 = 1.5 - time;
        isShowR2c =  ( (x>x1 && x<x2) &&  (y>y1 && y<y2));
    }
    if(isShowR2c && isShowC2r){
        gl_FragColor = fg * vColor;
    } else {
        gl_FragColor = vec4(0.0,0.0, 0.0,0.0);
    }
    // vec3 p = (vec3(vTextureCoord.xy,.0) - 0.5) * abs(sin(time/10.0)) * 50.0;
    // float d = sin(length(p)+time), a = sin(mod(atan(p.y, p.x) + time + sin(d+time), 3.1416/3.)*3.), v = a + d, m = sin(length(p)*4.0-a+time);
    // float _r = -v*sin(m*sin(-d)+time*.1);
    // float _g = v*m*sin(tan(sin(-a))*sin(-a*3.)*3.+time*.5);
    // float _b = mod(v,m);
    // float _a = 1.0;
    // if(_r < 0.1 && _g < 0.1 && _b < 0.1) {
    //     _a = 0.0;
    // }
    // gl_FragColor = vec4(_r * _a, _g * _a, _b * _a, _a);
}