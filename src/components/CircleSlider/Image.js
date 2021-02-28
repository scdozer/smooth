import * as THREE from "three";
import React, { useRef, useState } from "react";
import lerp from "lerp";
import { motion, AnimatePresence } from "framer-motion";
import { Html } from "drei";
import { useLoader, useFrame } from "react-three-fiber";
// import "./../../shaders/wackyImg";
import "./../../shaders/wobble";

export default function Image({ img, index, distance, shaderScroll }) {
  const [active, setActive] = useState(false);
  const { innerWidth: width, innerHeight: height } = window;
  const multiplier = {
    x: width < 900 ? 2 : 4.7,
    y: 0,
    z: width < 900 ? -2 : -2.5,
    w: width < 900 ? 2 : 4,
    h: width < 900 ? 1.5 : 3,
  };

  const mesh = useRef();
  const wack = useRef();
  const radian_interval = (2.0 * Math.PI) / 5;
  const radius = 200;
  const texture = useLoader(THREE.TextureLoader, img);
  useFrame(({ clock }) => {
    wack.current.time = clock.elapsedTime;
    const slideDistance = Math.abs(
      Math.sin(distance.current + radian_interval * index + radius)
    );
    // wack.current.distanceFromCenter = slideDistance / 2;
    wack.current.distanceFromCenter = slideDistance;
    mesh.current.position.set(
      multiplier.x *
        Math.cos(distance.current + radian_interval * index + radius + 0.4),
      0,
      multiplier.z *
        Math.sin(distance.current + radian_interval * index + radius)
    );

    mesh.current.position.x = lerp(
      multiplier.x *
        Math.cos(distance.current + radian_interval * index + radius),
      0,
      0.01
    );

    wack.current.speed = shaderScroll.current;
    // console.log("wack", wack.current.scale);
  });
  return (
    <mesh
      ref={mesh}
      scale={active ? [2.5, 2.5, 2.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[multiplier.w, multiplier.h, 100, 100]}
      />
      <wobbleImage
        ref={wack}
        attach="material"
        texture1={texture}
        toneMapped={false}
        // wireframe={true}
      />
      {/* <meshBasicMaterial attach="material" map={texture} toneMapped={false} /> */}
    </mesh>
  );
}
