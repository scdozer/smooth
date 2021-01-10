import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import SlideShow from "./../../components/SlideShow";
import "./../../App.css";

function Home() {
  const scroll = useRef();
  const distance = useRef([]);
  const scale = useRef([]);
  let speed = useRef(0);
  let position = useRef(0);

  const objs = Array(5).fill({ dist: 0 });

  const scrolling = useCallback(() => {
    objs.forEach((o, i) => {
      o.dist = Math.min(Math.abs(position.current - i), 1);
      o.dist = 1 - o.dist ** 2;

      scale.current[i] = 1 + 0.8 * o.dist;
      distance.current[i] = o.dist;
    });

    position.current += speed.current;
    speed.current *= 0.8;
    let rounded = Math.round(position.current);
    let diff = rounded - position.current;
    position.current += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;

    requestAnimationFrame(() => scrolling());
  }, [objs]);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  const onWheel = (e) => {
    return (speed.current += e.deltaY * 0.0003);
  };
  function onPan(event, info) {
    let delta = info.delta.y > info.delta.x ? info.delta.y : info.delta.x;
    return (speed.current -= delta * 0.003);
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
      <SlideShow yPosition={position} slideScale={scale} distance={distance} />
    </motion.div>
  );
}

export default Home;
