import * as THREE from "three";
import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";

export default function Image({ img, index, forwardRef }) {
  const mesh = useRef();
  const outer = useRef();
  const texture = useLoader(THREE.TextureLoader, img);
  useFrame(({ clock }) => {
    mesh.current.time = clock.elapsedTime;
    outer.current.position.set(0, -index * 5.2 + forwardRef.current * 5.2, 0);
  });
  return (
    <mesh ref={outer} rotation={[0, -0.25, 0]}>
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
