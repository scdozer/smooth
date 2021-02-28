import React, { Suspense } from "react";
import Image from "./Image.js";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";
import "./../../shaders/wack";

import img1 from "./../../img/taylor/1.jpg";
import img2 from "./../../img/photo2.jpg";
import img3 from "./../../img/photo3.jpg";

const images = [img1, img2, img3, img1, img2];

export default function CircleSlider({
  yPosition,
  slideScale,
  distance,
  shaderScroll,
}) {
  return (
    <div className="canvas">
      <Canvas colorManagement>
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <group>
            {images.map((img, i) => (
              <Image
                key={`image-${i}`}
                index={i}
                img={img}
                distance={distance}
                shaderScroll={shaderScroll}
              />
            ))}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
