#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.141592653589793

#define cx_div(a, b) vec2(((a.x*b.x+a.y*b.y)/(b.x*b.x+b.y*b.y)),((a.y*b.x-a.x*b.y)/(b.x*b.x+b.y*b.y)))

vec2 as_polar(vec2 z) {
  return vec2(
    length(z),
    atan(z.y, z.x)
  );
}

vec2 cx_log(vec2 a) {
    vec2 polar = as_polar(a);
    float rpart = polar.x;
    float ipart = polar.y;
    if (ipart > PI) ipart=ipart-(2.0*PI);
    return vec2(log(rpart),ipart);
}

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a + b*cos( 0.38*2.*PI*(c*t+d) );
}

// Copy of this: https://hturan.com/writing/complex-numbers-glsl
// Updated to: alternating between all pink -> all blue 
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
  vec2 z = uv;
  
  float angle = sin(u_time/6.) * 2. * PI;
  float length = .3;
  
  // Spin our points in a circle of radius length
  float c = cos(angle);
  float s = sin(angle);
  vec2 p = vec2( s*length, c*length);
  vec2 q = vec2( s*-length, c*-length );
  
  // Divide z-p by z-q using complex division
  vec2 division = cx_div((z - p), (z - q));
  
  // Calculate the log of our division
  vec2 log_p_over_q = cx_log(division);

  // Extract the imaginary number
  float imaginary = log_p_over_q.y / PI;

  vec3 col = palette( 
    imaginary, 
    vec3(sin(u_time / 1.8),.52,0.53), 
    vec3(5.7,.32,.35), 
    vec3(0.2,.84,.45), 
    vec3(sin(u_time / 1.8),0.33,0.22)
    );

  gl_FragColor = vec4(col, 1.0);
}