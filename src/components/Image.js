import * as THREE from "three";
import React, { useRef } from "react";
import { Html } from "drei";
import { useLoader, useFrame } from "react-three-fiber";

export default function Image({ img, index, yPosition, slideScale, distance }) {
  const mesh = useRef();
  const outer = useRef();
  const html = useRef();
  const texture = useLoader(THREE.TextureLoader, img);

  useFrame(({ clock }) => {
    let rounded = Math.round(slideScale.current[index] - 0.2) === 2 ? 1 : 0;
    // console.log(slideScale.current[index]);
    mesh.current.time = clock.elapsedTime;
    if (yPosition.current >= 0 && yPosition.current < 4) {
      outer.current.position.set(
        index * 2 - yPosition.current * 2,
        0,
        slideScale.current[index] * 1.5
      );
    }
    outer.current.scale.set(
      slideScale.current[index] * 0.6,
      slideScale.current[index] * 0.6,
      slideScale.current[index] * 0.6
    );
    html.current.style.opacity = rounded;
    html.current.style.transform = `translate(0, ${distance.current[index]}+ 50)`;
    mesh.current.distanceFromCenter = distance.current[index];
  });
  return (
    <mesh ref={outer} rotation={[0, 0, 0]}>
      <Html fullscreen ref={html} className="slideContent">
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
