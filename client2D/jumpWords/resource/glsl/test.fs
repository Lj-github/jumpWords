
precision lowp float;
varying vec2 vTextureCoord;
// varying vec4 vColor;
uniform float time;
uniform sampler2D uSampler;
void main() {
    vec3 p = (vec3(vTextureCoord.xy,.0) - 0.5) * abs(sin(time/10.0)) * 50.0;
    float d = sin(length(p)+time), a = sin(mod(atan(p.y, p.x) + time + sin(d+time), 3.1416/3.)*3.), v = a + d, m = sin(length(p)*4.0-a+time);
    float _r = -v*sin(m*sin(-d)+time*.1);
    float _g = v*m*sin(tan(sin(-a))*sin(-a*3.)*3.+time*.5);
    float _b = mod(v,m);
    float _a = 1.0;
    if(_r < 0.1 && _g < 0.1 && _b < 0.1) {
        _a = 0.0;
    }
    gl_FragColor = vec4(_r * _a, _g * _a, _b * _a, _a);
}