import * as THREE from "three";
import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";

export default function Image({ img, index, yPosition, slideScale, distance }) {
  const mesh = useRef();
  const outer = useRef();
  const texture = useLoader(THREE.TextureLoader, img);

  console.log(distance);
  useFrame(({ clock }) => {
    mesh.current.time = clock.elapsedTime;
    if (yPosition.current >= 0 && yPosition.current < 4) {
      outer.current.position.set(
        index * 4 - yPosition.current * 4,
        0,
        slideScale.current[index] * 0.5
      );
    }
    outer.current.scale.set(
      slideScale.current[index] * 1.5,
      slideScale.current[index] * 1.5,
      slideScale.current[index] * 1.5
    );
    mesh.current.distanceFromCenter = distance.current[index];
  });
  return (
    <mesh ref={outer} rotation={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[3, 2, 20, 20]} />
      <wackyImage
        ref={mesh}
        attach="material"
        texture1={texture}
        toneMapped={false}
      />
    </mesh>
  );
}
