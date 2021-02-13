import * as THREE from "three";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Html } from "drei";
import { useLoader, useFrame } from "react-three-fiber";
import "./../../shaders/wackyImg";

export default function Image({ img, index, distance }) {
  const { innerWidth: width, innerHeight: height } = window;
  const multiplier = {
    x: width < 900 ? 2 : 4.7,
    y: 0,
    z: width < 900 ? -2 : -2.5,
    w: width < 900 ? 2 : 4,
    h: width < 900 ? 1.5 : 3,
  };

  console.log(multiplier.x);
  const [showHtml, setShowHtml] = useState(false);
  const mesh = useRef();
  const wack = useRef();
  //   const outer = useRef();
  //   const html = useRef();
  const radian_interval = (2.0 * Math.PI) / 5;
  const radius = 200;
  const texture = useLoader(THREE.TextureLoader, img);
  useFrame(({ clock }) => {
    wack.current.time = clock.elapsedTime;
    const slideDistance =
      -1 * Math.sin(distance.current + radian_interval * index + radius);
    if (slideDistance <= 1.2 && slideDistance > 0.66) {
      setShowHtml(true);
    } else {
      setShowHtml(false);
    }
    wack.current.distanceFromCenter = slideDistance / 2;
    mesh.current.position.set(
      multiplier.x *
        Math.cos(distance.current + radian_interval * index + radius + 0.4),
      0,
      multiplier.z *
        Math.sin(distance.current + radian_interval * index + radius)
      //   Math.cos(distance.current + radian_interval * index + radius),
      //   0,
      //   Math.sin(distance.current + radian_interval * index + radius)
    );
  });
  return (
    <mesh ref={mesh}>
      {showHtml && (
        <Html fullscreen zIndexRange={[0, 0]}>
          <motion.div
            className="slideContent"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <h1>Taylor Lundquist &middot; "Hum"</h1>
            <p>ski</p>
            <div
              className="slide-button"
              onClick={() => window.appHistory.push("/projects")}
            >
              view
            </div>
          </motion.div>
        </Html>
      )}
      <planeBufferGeometry
        attach="geometry"
        args={[multiplier.w, multiplier.h]}
      />
      <wackyImage
        ref={wack}
        attach="material"
        texture1={texture}
        toneMapped={false}
      />
      {/* <meshBasicMaterial attach="material" map={texture} toneMapped={false} /> */}
    </mesh>
  );
}
