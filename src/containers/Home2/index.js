import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import CircleSlider from "./../../components/CircleSlider/CircleSlider";
import "./../../App.css";

function Home2() {
  const scroll = useRef();
  let speed = useRef(0);
  let position = useRef(-1);

  const scrolling = useCallback(() => {
    position.current += speed.current;
    speed.current *= 0.8;
    requestAnimationFrame(() => scrolling());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  const onWheel = (e) => {
    return (speed.current += e.deltaY * 0.0003);
  };
  function onPan(event, info) {
    const delta = info.delta.y > 0 ? info.delta.y : -1 * info.delta.x;
    return (speed.current += -1 * delta * 0.0009);
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeIn", duration: 3 }}
      className="app"
      ref={scroll}
      onWheel={onWheel}
      onPan={onPan}
    >
      <CircleSlider distance={position} />
    </motion.div>
  );
}

export default Home2;
