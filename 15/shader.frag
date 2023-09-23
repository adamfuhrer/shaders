#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.03);
vec3 colorB = vec3(1.0);

// vec3 colorA = vec3(0.39, 0.62, 0.63);
// vec3 colorB = vec3(0.73, 0.04, 0.04);

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
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

vec3 hsl2rgb(vec3 hsl) {
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(hsl.xxx + k.xyz) * 6.0 - k.www);
    return hsl.z * mix(k.xxx, clamp(p - k.xxx, 0.0, 1.0), hsl.y);
}

// rainbow (no movement)
void main(){
	vec2 res = gl_FragCoord.xy/u_mouse / 2.0;
  
  vec2 heightAmount = (res + 1.0) * 2.0;
  vec2 heightAmountInteger = floor(heightAmount);
  float random = random(vec2(heightAmountInteger.x * heightAmountInteger.y ));

  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float hue = st.x;
  
  vec3 hslColor = vec3(hue  + random , 0.9 , 0.9 );
  vec3 rgbColor = hsl2rgb(hslColor);

  gl_FragColor = vec4(rgbColor, 1.0);
}