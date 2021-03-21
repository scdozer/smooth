import React, { useState, useEffect, useRef, useCallback } from "react";

import { Link } from "react-router-dom";
import state from "./../../../state";

import { motion } from "framer-motion";

export default function HomeTitles({ distance }) {
  const [distanceTime, setDistance] = useState(distance.current);

  const scrolling = useCallback(() => {
    const cur = Math.abs(distance.current % 10);
    let distanceTo = cur;
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
        {state.slides.map((slide) => (
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