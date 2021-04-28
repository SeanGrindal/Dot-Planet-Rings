uniform float uTime;

attribute float aScale;
attribute vec3 aColor;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vColor;

void main() {
   vUv = uv;
   vColor = aColor;

   vec3 pos = position;

   float angle = atan(pos.x, pos.z);
   float distanceToCenter = length(pos.xz);
   float angleOffset = (1.0 / distanceToCenter - 0.5) * uTime * 0.03;

   angle += angleOffset;

   pos.x = cos(angle) * distanceToCenter;
   pos.z = sin(angle) * distanceToCenter;

   pos.y = sin(uTime + pos.x * 10.0  * distanceToCenter) * 0.025;

   vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

   gl_PointSize = aScale * (1.0 / - mvPosition.z);
   gl_Position = projectionMatrix * mvPosition;
}