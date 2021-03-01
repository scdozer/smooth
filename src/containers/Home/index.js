import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import lerp from "lerp";
import HomeTitles from "../../components/HomeTitles";
import CircleSlider from "../../components/CircleSlider/CircleSlider";
import "./../../App.css";

function Home() {
  const scroll = useRef();
  const shaderScroll = useRef(0);
  let distance = useRef(0);

  const scrolling = useCallback(() => {
    let rounded = Math.round(distance.current);
    let diff = rounded - distance.current;
    // let something =
    //   distance.current + Math.sign(diff) * Math.pow(Math.abs(diff), 6) * 0.5;
    distance.current +=
      Math.sign(diff) * Math.pow(Math.abs(diff), 0.3) * 0.0035;
    requestAnimationFrame(() => scrolling());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  // const onWheel = (e) => {
  //   return (speed.current += e.deltaY * 0.0003);
  // };

  const onWheel = (e) => {
    return (
      (distance.current += e.deltaY * 0.0003), (shaderScroll.current = e.deltaY)
    );
  };
  function onPan(event, info) {
    const delta = info.delta.y;
    return (distance.current += -1 * delta * 0.0009);
  }

  function onScroll(e) {
    console.log({ e });
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeIn", duration: 3 }}
      className="app"
      ref={scroll}
      onScroll={onScroll}
      onWheel={onWheel}
      onPan={onPan}
    >
      <HomeTitles distance={distance} />
      <CircleSlider distance={distance} shaderScroll={shaderScroll} />
    </motion.div>
  );
}

export default Home;
