import { extend } from "react-three-fiber";
import { shaderMaterial } from "drei";

const WobbleImage = shaderMaterial(
  {
    time: 0,
    texture1: undefined,
    speed: 0,
    distanceFromCenter: 1,
    PI: Math.PI,
  },
  `
  uniform float time;
  uniform float PI;
  uniform float speed;
  varying vec2 vUv;
  uniform float distanceFromCenter;
  // varying vec2 vUv;
      void main() {
        vec3 pos = position;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.z += sin(modelPosition.x + (time * 0.5)) * 0.075;
        modelPosition.y += sin(modelPosition.z + (time * 0.5)) * 0.075;
        // modelPosition.x += ((sin(uv.y * PI) * speed * 0.025) * 0.125);
        modelPosition.z += ((sin(uv.y * PI) * speed * 0.015) * 0.125);
        
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
        vUv = uv;
        gl_Position = projectedPosition;
  }`,
  `
  uniform float time;
  uniform float speed;
  uniform float distanceFromCenter;
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D texture1;
  void main()
  {
    // vec4 t = texture2D(texture1, vUv) * (distanceFromCenter-1.2);
    vec4 t = texture2D(texture1, vUv);
    gl_FragColor = t;
  }`
);

extend({ WobbleImage });
