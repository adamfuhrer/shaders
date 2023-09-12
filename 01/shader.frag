#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 m = u_mouse.xy/u_resolution;
	vec2 st = gl_FragCoord.xy/u_resolution;
  
	gl_FragColor = vec4(
    sin(m.x * st.x),
    sin(m.y * st.y),
    sin(m.x * st.x + m.y * st.y),
    1.0
  );
}