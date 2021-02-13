import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
// import "./styles.css";

import img1 from "./../../img/taylor/1.jpg";
import img2 from "./../../img/taylor/2.jpg";
import img3 from "./../../img/taylor/3.jpg";

export default function Projects() {
  let parallax = useRef();
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeIn", duration: 1 }}
      className="projects"
    >
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer offset={0} speed={1} style={{ pointerEvents: "none" }}>
          <img src={img1} style={{ width: "100%" }} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.7}
          speed={-0.1}
          style={{ pointerEvents: "none" }}
        >
          <img src={img2} style={{ width: "45%", marginLeft: "40%" }} />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.3} style={{ pointerEvents: "none" }}>
          <img src={img3} style={{ width: "50%", marginLeft: "5%" }} />
        </ParallaxLayer>
      </Parallax>
    </motion.div>
  );
}
