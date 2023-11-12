#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_1;
uniform float u_2;
uniform float u_3;
uniform float u_4;
uniform float u_5;
uniform float u_6;
uniform float u_7;

float colormap_red(float x) {
    if (x < 0.0) {
        return 54.0 / 255.0;
    } else if (x < 20049.0 / 82979.0) {
        return (829.79 * x + 54.51) / 255.0;
    } else {
        return 1.0;
    }
}

float colormap_green(float x) {
    if (x < 20049.0 / 82979.0) {
        return 0.0;
    } else if (x < 327013.0 / 810990.0) {
        return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0;
    } else if (x <= 1.0) {
        return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0;
    } else {
        return 1.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 54.0 / 255.0;
    } else if (x < 7249.0 / 82979.0) {
        return (829.79 * x + 54.51) / 255.0;
    } else if (x < 20049.0 / 82979.0) {
        return 127.0 / 255.0;
    } else if (x < 327013.0 / 810990.0) {
        return (792.02249341361393720147485376583 * x - 64.364790735602331034989206222672) / 255.0;
    } else {
        return 1.0;
    }
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}


float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm( vec2 p )
{
    float f = 0.0;

    // f += 0.500000*noise( p + u_time  ); p = mtx*p*2.02;
    // f += 0.31250*noise( p ); p = mtx*p*2.01;
    // f += u_3 *noise( p ); p = mtx*p*u_2;
    // f += 0.125000*noise( p ); p = mtx*p*2.01;
    // f += u_3 * 0.062500*noise( p ); p = mtx*p*2.04;
    // f += 0.015625*noise( p + sin(u_4) );

    f += 0.500000*noise( p + u_time  ); p = mtx*p*2.02;
    f += u_2 * 0.031250*noise( p ); p = mtx*p*2.01;
    f += u_3 *noise( p + sin(u_time)); p = mtx*p*u_2  ;
    f += 0.125000*noise( p + cos(u_time)); p = mtx*p*2.01;
    f += u_1 * 0.062500*noise( p ); p = mtx*p*2.04;
    f += 0.015625*noise( p + sin(u_time) );

    return f/0.96875;
}

float pattern( in vec2 p )
{
	return fbm( p + fbm( p + fbm( p ) ) );
}

// https://www.shadertoy.com/view/ftSSRR
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.x * u_7;
  float shade = pattern(uv);
  gl_FragColor = vec4(colormap(shade).rgb, 1.0);
}
