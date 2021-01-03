import * as THREE from "three";
import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";

export default function Image({ img, index, yPosition, slideScale }) {
  const mesh = useRef();
  const outer = useRef();
  const texture = useLoader(THREE.TextureLoader, img);
  useFrame(({ clock }) => {
    mesh.current.time = clock.elapsedTime;
    if (yPosition.current >= 0 && yPosition.current < 4) {
      // outer.current.rotation.set(0, 0, 0);
      outer.current.position.set(0, -index * 6.2 + yPosition.current * 6.2, 0);
    }
    outer.current.scale.set(
      slideScale.current[index],
      slideScale.current[index],
      slideScale.current[index]
    );
  });
  return (
    <mesh ref={outer} rotation={[0, -0.15, 0]}>
      <planeBufferGeometry attach="geometry" args={[7.5, 5, 20, 20]} />
      <wackyImage
        ref={mesh}
        attach="material"
        texture1={texture}
        toneMapped={false}
      />
    </mesh>
  );
}
