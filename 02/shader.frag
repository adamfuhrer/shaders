#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265359

void main() {
  vec2 m = u_mouse.xy/u_resolution;
	vec2 st = gl_FragCoord.xy/u_resolution;
  float t = sin(u_time);
    
	gl_FragColor = vec4(
      sin(m.x * st.x),
      sin(m.y * st.y),
      sin(m.x * st.x + m.y * st.y),
      1.0
    );
  
	gl_FragColor = vec4(
    sin(m.x * st.y),
    sin(m.y * st.y * t / 2.0),
    sin(m.x * st.x + m.y * st.y),
    1.0
  );


  // b & w
  gl_FragColor = vec4(
    tan(m.x * st.x + m.y * st.y),
    tan(m.x * st.x + m.y * st.y),
    tan(m.x * st.x + m.y * st.y),
    1.0
  );

  // gl_FragColor = vec4(
  //   cos(m.x * st.y* t  *2.0),
  //   sin(m.y * st.y * t ),
  //   cos(m.x * st.x * t ),
  //   1.0
  // );

	// gl_FragColor = vec4(
  //   sin(m.y * st.x + m.x * st.y )* t,
  //   sin(m.y * st.x + m.x),
  //   sin(m.y * st.x + m.x * st.y* t / 3.0)* t,
  //   1.0
  // );

  // // Figuring out where white is, bottom left is 0.0, 0.0, middle is 1.0, 1.0, (i think)
	// gl_FragColor = vec4(
  //   m.x,
  //   m.x ,
  //   m.x ,
  //   1.0
  // );

  // // lasers
  // gl_FragColor = vec4(
  //   tan(m.x * st.x + m.x * st.y) / 110.0,
  //   tan(m.x * st.x + m.y * st.y) / 112.0,
  //   tan(m.x * st.x + m.y * st.y) / 112.0,
  //   1.0
  // );

}