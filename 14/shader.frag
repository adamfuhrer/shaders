#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec3 colorA = vec3(0.37, 0.69, 0.55);
vec3 colorB = vec3(0.65, 0.47, 0.47);

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

// fire
void main(){
	vec2 res = gl_FragCoord.xy/u_resolution;
  
  vec2 heightAmount = (res + 1.0) * 60.0;
  vec2 heightAmountInteger = floor(heightAmount) ;
  float random = random(vec2(tan(heightAmountInteger.x + heightAmountInteger.y) ));

  vec3 color = vec3(0.0);
  vec3 pct = vec3(heightAmountInteger.x);
  // pct.r = abs(atan(res.y * res.x + u_time * random / 1.5));
  // pct.g = abs(atan(res.y * res.x+ u_time * random / 1.5));
  
  // pct.b = abs(atan(res.x * res.x + u_time * random / 1.5));
  // pct.r = abs(acos(res.y * random / 10.5));
  pct.g = abs(tan(res.y + (res.x * 12.0) + 10.0 + u_time * 3.5 * random + 400.0 ));
  // pct.b = abs(atan( res.y / res.x + u_time * 12.0* random /10.5));

  color = mix(colorA, colorB, pct);
  // vec3 newColor = rgb2hsb(color);

  gl_FragColor = vec4(color,1.0);
}