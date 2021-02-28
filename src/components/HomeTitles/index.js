import React, { useState, useEffect, useRef, useCallback } from "react";

import { Link } from "react-router-dom";
import state from "./../../state";

import { motion } from "framer-motion";

export default function HomeTitles({ distance }) {
  const [distanceTime, setDistance] = useState(distance.current);

  const scrolling = useCallback(() => {
    setDistance(distance.current);
    requestAnimationFrame(() => scrolling());
  }, [distance]);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);
  return (
    <div className="homeTitles">
      <div
        style={{
          height: 250,
          overflow: "hidden",
        }}
      >
        {state.slides.map((slide) => (
          <motion.div
            style={{
              height: 250,
              overflow: "hidden",
              position: "relative",
              // transform: `translateY(${distance.current})`,
              cursor: "pointer",
            }}
            animate={{ y: -distanceTime * 210 }}
            transition={{ duration: 0.05 }}
            key={slide.title}
          >
            <h2 className="slideTitle">{slide.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
