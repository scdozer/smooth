import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import HomeTitles from "../../components/HomeTitles";
import CircleSlider from "../../components/CircleSlider/CircleSlider";
import { useHistory } from "react-router-dom";
import "./../../App.css";

function Home() {
  const history = useHistory();
  const scroll = useRef();
  const shaderScroll = useRef(0);
  let distance = useRef(0);

  const scrolling = useCallback(() => {
    let rounded = Math.round(distance.current);
    let diff = rounded - distance.current;
    distance.current +=
      Math.sign(diff) * Math.pow(Math.abs(diff), 0.3) * 0.0035;
    requestAnimationFrame(() => scrolling());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  const onWheel = (e) => {
    return (
      (distance.current += e.deltaY * 0.0007), (shaderScroll.current = e.deltaY)
    );
  };
  function onPan(event, info) {
    const delta = info.delta.x;
    return (distance.current += -1 * delta * 0.0007);
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
      <CircleSlider
        distance={distance}
        shaderScroll={shaderScroll}
        history={history}
      />
      <motion.div
        className="scroll"
        style={{
          height: 220,
          overflow: "hidden",
          position: "relative",
          background: "transparent",
          // transform: `translateY(${distance.current})`,
          cursor: "pointer",
          opacity: 0,
        }}
        animate={{ opacity: distance.current > 1 ? 0 : 1 }}
        transition={{ duration: 0.05 }}
      >
        <h3>scroll down</h3>
      </motion.div>
    </motion.div>
  );
}

export default Home;
