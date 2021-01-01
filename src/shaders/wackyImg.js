import { extend } from "react-three-fiber";
import { shaderMaterial } from "drei";

const WackyImage = shaderMaterial(
  {
    time: 0,
    // distanceFromCenter: 0,
    texture1: undefined,
    resolution: 0,
    uvRate1: 0,
  },
  `uniform float time;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform vec2 pixels;
  float PI = 3.141592653589793238;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(time)*0.07;
    vUv += sin(time)*0.04;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0 );
  }`,
  `uniform float time;
  uniform float progress;
  uniform sampler2D texture1;
  uniform vec4 resolution;
  varying vec2 vUv;
  varying vec3 vPosition;
  float PI = 3.141592653589793238;
  void main()	{
     vec4 t = texture2D(texture1, vUv);
      gl_FragColor = t;
  }`
);

extend({ WackyImage });
