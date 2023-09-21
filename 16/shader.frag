#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

vec3 hsl2rgb(vec3 hsl) {
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(hsl.xxx + k.xyz) * 6.0 - k.www);
    return hsl.z * mix(k.xxx, clamp(p - k.xxx, 0.0, 1.0), hsl.y);
}

// rainbow (animated)
void main(){
	vec2 res = gl_FragCoord.xy/u_mouse / 2.0;
  
  vec2 heightAmount = (res + 1.0) * 2.0;
  vec2 heightAmountInteger = floor(heightAmount);
  float random = random(vec2(heightAmountInteger.x * heightAmountInteger.y ));

  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float hue = st.x;
  
  vec3 hslColor = vec3(hue  + random + sin(u_time / 2.0), 0.9 , 0.9 );
  vec3 rgbColor = hsl2rgb(hslColor);

  gl_FragColor = vec4(rgbColor, 1.0);
}