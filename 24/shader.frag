#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv =  (4.0 * gl_FragCoord.xy - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  for(float i = 1.0; i < 10.0; i++){
    uv.x += 0.6 / i * cos(i * 2.0 * uv.y + u_time);
    uv.y += 0.6 / i * cos(i * 1.5 * uv.x + u_time);
  }
    
  gl_FragColor = vec4(vec3(0.1)/abs(sin(u_time-uv.y-uv.x)),1.0);
}
