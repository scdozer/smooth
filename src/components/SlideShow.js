import React, { Suspense, useRef } from "react";
import Image from "./Image.js";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "drei";
import "./../shaders/wackyImg";

import img1 from "./../img/photo1.jpg";
import img2 from "./../img/photo2.jpg";
import img3 from "./../img/photo3.jpg";

const images = [img1, img2, img3, img2, img3];

export default function SlideShow({ forwardRef }) {
  return (
    <div className="canvas">
      <Canvas colorManagement>
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <group>
            {images.map((img, i) => (
              <Image key={i} index={i} img={img} forwardRef={forwardRef} />
            ))}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
