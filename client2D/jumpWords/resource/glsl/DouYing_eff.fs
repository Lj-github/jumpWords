precision highp float;
uniform sampler2D u_Sampler;
uniform float offset;
uniform float speed;
uniform float time;
varying vec4 vColor;
varying vec2 vTextureCoord;
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}
float randomRange (vec2 standard ,float min, float max) {
    return min + random(standard) * (max - min);
}
void main () {
    // 原图
    vec3 color = texture2D(u_Sampler, vTextureCoord).rgb;
    // 位移值放缩 0.0-0.5
    float maxOffset = offset / 6.0;
    // 时间计算
    float cTime = floor(time * speed * 50.0);
    // 切割图片的最大位移值
    float maxSplitOffset = offset / 2.0;
    // 这里我们选择切割10次
    for (float i = 0.0; i < 10.0; i += 1.0) {
        // 切割纵向坐标 
        float sliceY = random(vec2(cTime + offset, 1999.0 + float(i)));
        // 切割高度 
        float sliceH = random(vec2(cTime + offset, 9999.0 + float(i))) * 0.25;
         // 计算随机横向偏移值 
        float hOffset = randomRange(vec2(cTime + offset, 9625.0 + float(i)), -maxSplitOffset, maxSplitOffset);
        // 计算最终坐标 
        vec2 splitOff = vTextureCoord;
        splitOff.x += hOffset;
        splitOff = fract(splitOff);
        // 片段如果在切割区间，就偏移区内图像 
        if (vTextureCoord.y > sliceY && vTextureCoord.y < fract(sliceY+sliceH)) {
            color = texture2D(u_Sampler, splitOff).rgb;
        }
    }
    vec2 texOffset = vec2(randomRange(vec2(cTime + maxOffset, 9999.0), -maxOffset, maxOffset), randomRange(vec2(cTime, 9999.0), -maxOffset, maxOffset));
    vec2 uvOff = fract(vTextureCoord + texOffset);
    // rgb随机分离
    float rnd = random(vec2(cTime, 9999.0));
    if (rnd < 0.33){
        color.r = texture2D(u_Sampler, uvOff).r;
    }else if (rnd < 0.66){
        color.g = texture2D(u_Sampler, uvOff).g;
    } else{
        color.b = texture2D(u_Sampler, uvOff).b;
    }
    gl_FragColor = vec4(color, 1.0);
}