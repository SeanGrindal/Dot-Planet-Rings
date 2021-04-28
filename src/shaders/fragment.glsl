varying vec2 vUv;
varying vec3 vPos;
varying vec3 vColor;

void main() {
   float strength = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 5.0);

   gl_FragColor = vec4(vColor, strength);
}