#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.1415926535897932384626433832795
float cosh(float x) {
    return (exp(x) + exp(-x)) * 0.5;
}
float sinh(float x) {
    return (exp(x) - exp(-x)) * 0.5;
}
#define cx_mul(a, b) vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x)
#define cx_div(a, b) vec2(((a.x*b.x + a.y*b.y)/(b.x*b.x + b.y*b.y)),((a.y*b.x - a.x*b.y)/(b.x*b.x + b.y*b.y)))
#define cx_sin(a) vec2(sin(a.x) * cosh(a.y), cos(a.x) * sinh(a.y))
#define cx_cos(a) vec2(cos(a.x) * cosh(a.y), -sin(a.x) * sinh(a.y))

vec2 cx_tan(vec2 a) {return cx_div(cx_sin(a), cx_cos(a)); }
vec2 cx_log(vec2 a) {
    float rpart = sqrt((a.x*a.x)+(a.y*a.y));
    float ipart = atan(a.y,a.x);
    if (ipart > PI) ipart=ipart-(2.0*PI);
    return vec2(log(rpart),ipart);
}

vec2 as_polar(vec2 z) {
  return vec2(
    length(z),
    atan(z.y, z.x)
  );
}
vec2 cx_pow(vec2 v, float p) {
  vec2 z = as_polar(v);
  return pow(z.x, p) * vec2(cos(z.y * p), sin(z.y * p));
}

float im(vec2 z) {
  return ((atan(z.y, z.x) / PI) + 1.0) * 0.5;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos(2.*PI*(c*t+d));
}
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}
// Define our points
vec2 a0 = vec2(0.32, -0.45);
vec2 a1 = vec2(-0.49, -0.32);
vec2 a2 = vec2(-0.31, 0.38);
vec2 a3 = vec2(-0.12, 0.04);

vec2 b0 = vec2(-0.71, 0.53);
vec2 b1 = vec2(0.01, 1.23);
vec2 b2 = vec2(-0.24, 1.31);
vec2 b3 = vec2(-1.01, -0.42);

// Most code by Harley Turan: https://hturan.com/writing/complex-numbers-glsl
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
  // vec2 z = uv * u_time * 10.;
  vec2 z = uv *  6.;

  a1.y = sin(u_time );
  a1.x = cos(u_time );

  a3.y = cos(u_time / 2.);
  a3.x = sin(u_time / 2.);
  
  a2.y = atan(u_time * 3. );
  b2.x = sin(u_time / 2.);

  b1.y = cos(u_time / 2.);
  b1.x = sin(u_time / 4.);

  b3.y = cos(u_time / 2.);
  b3.y = sin(u_time / 2.);
  

  vec2 polyA = a0
    + cx_mul(a1, vec2(sin(u_time+ z)))
    + cx_mul(a2, vec2(sin(u_time)  ))
    + cx_mul(a3, cx_pow(z, cos(z.x / 2000. )));

  vec2 polyB = b0
      + cx_mul(b1, vec2(cos(u_time)))
      + cx_mul(b2, vec2( z   /1129.))
      + cx_mul(b3, cx_pow(z , sin(z.y / 2000. )));

  vec2 result = cx_div(polyA, polyB);

  float imaginary = cx_log(result).x  ;
  // float imaginary = cx_log(result).y * cx_log(result).x;

  // rainbow
  // float a = 1.66;
  // vec4 col = vec4(
  // pal(imaginary / 2.00, 
  // vec3(a,.9,0.3),
  // vec3(a,-.7,.91),
  // vec3(.8,.90,a),
  // vec3(-.55,-.3,a)),
  // 1.0);

    float a = 1.0;
  vec4 col = vec4(
  pal(imaginary, 
  vec3(a,.35,.51),
  vec3(a,.42,.31),
  vec3(.26,.30,a),
  vec3(.05,.4,a)),
  1.0);
  
  gl_FragColor = col;
}