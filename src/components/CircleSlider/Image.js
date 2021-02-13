import * as THREE from "three";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Html } from "drei";
import { useLoader, useFrame } from "react-three-fiber";
import "./../../shaders/wackyImg";

export default function Image({ img, index, distance }) {
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
    if (slideDistance <= 1 && slideDistance > 0.87) {
      setShowHtml(true);
    } else {
      setShowHtml(false);
    }
    wack.current.distanceFromCenter = slideDistance / 2;
    mesh.current.position.set(
      4.7 * Math.cos(distance.current + radian_interval * index + radius + 0.4),
      0,
      -2.5 * Math.sin(distance.current + radian_interval * index + radius)
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
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 30, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
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
      <planeBufferGeometry attach="geometry" args={[4, 3]} />
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
