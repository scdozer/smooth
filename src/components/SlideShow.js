import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import { OrbitControls } from "drei";
import "./../shaders/wackyImg";

import img1 from "./../img/photo1.jpg";
import img2 from "./../img/photo2.jpg";
import img3 from "./../img/photo3.jpg";

const images = [img1, img2, img3, img2, img3];

export default function SlideShow({ forwardRef }) {
  console.log({ forwardRef });
  function Image({ img, position }) {
    const mesh = useRef();
    const texture = useLoader(THREE.TextureLoader, img);
    useFrame(({ clock }) => {
      if (mesh.current) {
        mesh.current.time = clock.elapsedTime;
      }
    });
    return (
      <mesh position={position} rotation={[0, -0.25, 0]}>
        <planeBufferGeometry attach="geometry" args={[6, 4, 20, 20]} />
        <wackyImage
          ref={mesh}
          attach="material"
          texture1={texture}
          toneMapped={false}
        />
      </mesh>
    );
  }

  return (
    <div className="canvas">
      <Canvas colorManagement>
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <group>
            {images.map((img, i) => (
              <Image
                key={i}
                img={img}
                position={[0, -i * 4.2 + forwardRef * 4.2, 0]}
              />
            ))}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
