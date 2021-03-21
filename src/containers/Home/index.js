import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import lerp from "lerp";
import HomeTitles from "./HomeTitles";
import CircleSlider from "./CircleSlider/CircleSlider";
import { useHistory } from "react-router-dom";
import "./../../App.css";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function Home() {
  const history = useHistory();
  const scroll = useRef();
  const shaderScroll = useRef(0);
  let distance = useRef(0);

  const scrolling = useCallback(() => {
    let rounded = Math.round(distance.current);
    let diff = rounded - distance.current;
    let goTo =
      distance.current +
      Math.sign(diff) * Math.pow(Math.abs(diff), 0.5) * 0.005;
    distance.current = clamp(goTo, 0, 5);

    shaderScroll.current = lerp(shaderScroll.current, 0, 0.025);
    requestAnimationFrame(() => scrolling());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  const onWheel = (e) => {
    return (
      (distance.current += clamp(e.deltaY, -150, 150) * 0.0007),
      (shaderScroll.current = clamp(e.deltaY, -25, 25))
    );
  };
  function onPan(event, info) {
    const delta = info.delta.x;
    return (
      (distance.current += delta * 0.003),
      (shaderScroll.current = clamp(delta * 4, -25, 25))
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="app"
      ref={scroll}
      onWheel={onWheel}
      onPan={onPan}
    >
      <HomeTitles distance={distance} />
      <CircleSlider
        distance={distance}
        shaderScroll={shaderScroll}
        history={history}
      />
    </motion.div>
  );
}

export default Home;
