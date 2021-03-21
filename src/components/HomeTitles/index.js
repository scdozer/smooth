import React, { useState, useEffect, useRef, useCallback } from "react";

import { Link } from "react-router-dom";
import state from "./../../state";

import { motion } from "framer-motion";

export default function HomeTitles({ distance }) {
  const [distanceTime, setDistance] = useState(distance.current);

  const scrolling = useCallback(() => {
    console.log(distance.current);
    const cur = Math.abs(distance.current % 10);
    let distanceTo = cur;
    // if (cur > 10) {
    //   distanceTo = cur - 4;
    // }
    // if (cur > 9) {
    //   distanceTo = cur - 5;
    // }
    // if (cur > 8) {
    //   distanceTo = cur - 6;
    // }
    // if (cur > 7) {
    //   distanceTo = cur - 7;
    // }
    // if (cur > 6) {
    //   distanceTo = cur - 6;
    // }
    // if (cur > 5) {
    //   distanceTo = cur - 5;
    // }

    // let distanceTo = cur > 5.1 ? cur - 5.1 : cur;
    // console.log(distance.current % 10);
    setDistance(Math.abs(distanceTo + 0.5));
    requestAnimationFrame(() => scrolling());
  }, [distance]);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);
  return (
    <div className="homeTitles">
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {state.slides.map((slide, index) => (
          <motion.div
            style={{
              height: 220,
              overflow: "hidden",
              position: "relative",
              background: "transparent",
              // transform: `translateY(${distance.current})`,
              cursor: "pointer",
              opacity: 1,
            }}
            animate={{
              y: -distanceTime * 220 + 80,
              // opacity: index + 1 - distanceTime,
            }}
            transition={{ duration: 0.05 }}
            key={slide.title}
          >
            <Link to={slide.link}>
              <h2 className="slideTitle">{slide.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
