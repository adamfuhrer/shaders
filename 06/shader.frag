#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.89);
vec3 colorB = vec3(0.1);

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

void main(){
	vec2 res = gl_FragCoord.xy/u_resolution;

  vec2 heightAmountInteger = floor(res * 350.0 * abs(sin(u_time / 2.2)));
  float random = random(vec2(heightAmountInteger.y));

  vec3 color = vec3(0.0);
  vec3 pct = vec3(res.y);
  pct.r = smoothstep(0.0,1.0, res.x * abs(tan(res.x + u_time * random * 2.0 )));
  pct.g = smoothstep(0.0,1.0, res.x* abs(tan(res.x + u_time * random * 2.0 )));
  pct.b = smoothstep(0.0,1.0, res.x* abs(tan(res.x + u_time * random * 2.0 )));

  color = mix(colorA, colorB, pct);

  gl_FragColor = vec4(color,1.0);
}