#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.89);
vec3 colorB = vec3(0.1);

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Black and white gradient, increasing glitch size with sin(u_time) by a multipler
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