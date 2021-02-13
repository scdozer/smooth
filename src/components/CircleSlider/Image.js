import * as THREE from "three";
import React, { useRef, useState } from "react";
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
      -2 * Math.sin(distance.current + radian_interval * index + radius);
    if (slideDistance < 2 && slideDistance > 1.5) {
      setShowHtml(true);
    } else {
      setShowHtml(false);
    }
    wack.current.distanceFromCenter = slideDistance / 2;
    mesh.current.position.set(
      6 * Math.cos(distance.current + radian_interval * index + radius + 0.4),
      0,
      -3 * Math.sin(distance.current + radian_interval * index + radius)
      //   Math.cos(distance.current + radian_interval * index + radius),
      //   0,
      //   Math.sin(distance.current + radian_interval * index + radius)
    );
  });
  return (
    <mesh ref={mesh}>
      {showHtml && (
        <Html prepend zIndexRange={[0, 0]}>
          <h1>Slide {index + 1}</h1>
          <p>
            Content{index + 1}Content{index + 1}Content{index + 1}
          </p>
          <div
            className="slide-button"
            onClick={() => window.appHistory.push("/projects")}
          >
            More
          </div>
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