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
  x: width < 900 ? 2 : 6,
  y: 0,
  z: width < 900 ? -2 : -6,
  w: width < 900 ? 2 : 4,
  h: width < 900 ? 1.25 : 2.25,
};

const radian_interval = (2.0 * Math.PI) / 6;
// const radius = 1;

export default function Image({ img, index, distance, shaderScroll }) {
  const [active, setActive] = useState(false);

  const mesh = useRef();
  const wack = useRef();
  const texture = useLoader(THREE.TextureLoader, img);

  useFrame(({ clock }) => {
    wack.current.time = clock.elapsedTime;
    const slideDistance = Math.sin(
      radian_interval * (index + distance.current + 0.5)
    );
    wack.current.distanceFromCenter = 1 + slideDistance;
    mesh.current.position.set(
      multiplier.z *
        Math.cos(radian_interval * (index + distance.current + 0.5)),
      0,
      multiplier.x *
        Math.sin(radian_interval * (index + distance.current + 0.5))
    );
    wack.current.speed = shaderScroll.current;

    // position.current += speed.current;
    // speed.current *= 0.8;
    // let rounded = Math.round(distance.current);
    // let diff = rounded - distance.current;
    // distance.current += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;
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
