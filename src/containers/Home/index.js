import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import HomeTitles from "../../components/HomeTitles";
import CircleSlider from "../../components/CircleSlider/CircleSlider";
import "./../../App.css";

function Home() {
  const scroll = useRef();
  const shaderScroll = useRef(0);
  let distance = useRef(0);

  // const scrolling = useCallback(() => {
  //   position.current += distance.current;
  //   distance.current *= 0.8;
  //   requestAnimationFrame(() => scrolling());
  // }, []);

  // useEffect(() => {
  //   requestAnimationFrame(() => scrolling());
  // }, [scrolling]);

  const onWheel = (e) => {
    shaderScroll.current = e.deltaY;
    return (distance.current += e.deltaY * 0.0003);
  };
  function onPan(event, info) {
    const delta = info.delta.y > 0 ? info.delta.y : -1 * info.delta.x;
    return (distance.current += -1 * delta * 0.0009);
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
      <HomeTitles distance={distance} />
      <CircleSlider distance={distance} shaderScroll={shaderScroll} />
    </motion.div>
  );
}

export default Home;
