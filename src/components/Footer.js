import React, { useState, useEffect, useRef, useCallback } from "react";

import { Link } from "react-router-dom";
import state from "./../../state";

import { motion } from "framer-motion";

export default function Scroll({ distance }) {
  const [distanceTime, setDistance] = useState(distance.current);
  return (
    <motion.div
      className="scroll"
      style={{
        height: 220,
        overflow: "hidden",
        position: "relative",
        background: "transparent",
        // transform: `translateY(${distance.current})`,
        cursor: "pointer",
        opacity: distance.current > 1 ? 0 : 1,
      }}
      animate={{ opacity: distance.current > 1 ? 1 : 0 }}
      transition={{ duration: 0.05 }}
    >
      <h3>scroll down</h3>
    </motion.div>
  );
}
