#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// vec3 colorA = vec3(0.25, 0.17, 0.05);
// vec3 colorB = vec3(0.73, 0.09, 0.39);

vec3 colorA = vec3(0.91, 0.25, 0.65);
vec3 colorB = vec3(0.94, 0.05, 0.05);


// vec3 colorA = vec3(0.86, 0.58, 0.18);
// vec3 colorB = vec3(0.87, 0.08, 0.45);

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


// pink, purple, blue
void main(){
	vec2 res = gl_FragCoord.xy/u_resolution;
  
  vec2 heightAmount = res * 40.0;
  vec2 heightAmountInteger = floor(heightAmount);
  float random = random(vec2(heightAmountInteger.x * heightAmountInteger.y ));

  vec3 color = vec3(0.0);
  vec3 pct = vec3(res.x);
  pct.r = abs(tan(res.x * res.y* res.x  + u_time * random));
  pct.g = abs(atan(res.y * res.x + u_time * random ));
  pct.b = abs(tan(res.x * res.y + u_time * random / 1.0));

  color = mix(colorA, colorB, pct);
  vec3 newColor = rgb2hsb(color);

  gl_FragColor = vec4(newColor,1.0);
}