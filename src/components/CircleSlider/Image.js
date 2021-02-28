import * as THREE from "three";
import React, { useRef, useState } from "react";
import lerp from "lerp";
import { motion, AnimatePresence } from "framer-motion";
import { Html } from "drei";
import { useLoader, useFrame } from "react-three-fiber";
// import "./../../shaders/wackyImg";
import "./../../shaders/wobble";

const { innerWidth: width, innerHeight: height } = window;
const multiplier = {
  x: width < 900 ? 2 : 5,
  y: 0,
  z: width < 900 ? -2 : -2.5,
  w: width < 900 ? 2 : 4,
  h: width < 900 ? 1.5 : 3,
};

const radian_interval = (2.0 * Math.PI) / 5;
const radius = 200;

export default function Image({ img, index, distance, shaderScroll }) {
  const [active, setActive] = useState(false);

  const mesh = useRef();
  const wack = useRef();
  const texture = useLoader(THREE.TextureLoader, img);

  useFrame(({ clock }) => {
    wack.current.time = clock.elapsedTime;
    const slideDistance = Math.sin(
      radian_interval * (index + distance.current)
    );
    // wack.current.distanceFromCenter = slideDistance / 2;
    // console.log({ slideDistance });
    wack.current.distanceFromCenter = 1 + slideDistance;
    mesh.current.position.set(
      multiplier.x * Math.sin(radian_interval * (index + distance.current)),
      0,
      multiplier.z * Math.cos(radian_interval * (index + distance.current))
    );
    wack.current.speed = active ? 0 : shaderScroll.current;
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
    </mesh>
  );
}
