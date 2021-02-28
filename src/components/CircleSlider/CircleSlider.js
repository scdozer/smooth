import React, { Suspense } from "react";
import Image from "./Image.js";
import { Canvas } from "react-three-fiber";
// import { OrbitControls } from "drei";
import "./../../shaders/wack";

import img1 from "./../../img/elaine.jpg";
import img2 from "./../../img/erne.jpg";
import img3 from "./../../img/fwb.jpg";
import img4 from "./../../img/phil.jpg";
import img5 from "./../../img/tayor.jpg";
import img6 from "./../../img/treefort.jpg";
// import img7 from "./../../img/photo3.jpg";

const images = [img1, img2, img3, img4, img5, img6];

export default function CircleSlider({ distance, shaderScroll }) {
  return (
    <div className="canvas">
      <Canvas colorManagement>
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <group position={[0, 0, -2.25]}>
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
