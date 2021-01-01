import React, { useEffect, useRef, useCallback } from "react";
import { proxy, useProxy } from "valtio";
import SlideShow from "./components/SlideShow";
import img1 from "./img/photo1.jpg";
import img2 from "./img/photo2.jpg";
import img3 from "./img/photo3.jpg";
import "./App.css";

const state = proxy({ speed: 0 });

function App() {
  const snapshot = useProxy(state);
  const scroll = useRef();
  const wrap = useRef();
  let speed = useRef(0);
  let position = useRef(0);

  const e1 = useRef();
  const e2 = useRef();
  const e3 = useRef();
  const e4 = useRef();
  const e5 = useRef();
  const elems = [e1, e2, e3, e4, e5];

  const objs = Array(5).fill({ dist: 0 });

  const scrolling = useCallback(() => {
    objs.forEach((o, i) => {
      o.dist = Math.min(Math.abs(position.current - i), 1);
      o.dist = 1 - o.dist ** 2;
      elems[i].current.style.transform = `scale(${1 + 0.4 * o.dist})`;
    });

    position.current += speed.current;
    speed.current *= 0.8;
    let rounded = Math.round(position.current);
    let diff = rounded - position.current;
    position.current += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;
    state.speed = position.current;
    wrap.current.style.transform = `translate(0, ${
      -position.current * 100 + 50
    }px`;
    requestAnimationFrame(() => scrolling());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  const onWheel = (e) => {
    return (speed.current += e.deltaY * 0.0003);
  };
  return (
    <div
      className="app"
      ref={scroll}
      onWheel={onWheel}
      // onTouchMove={onTouchMove}
    >
      <div className="box"></div>
      <div className="wrap" ref={wrap}>
        <div className="line" ref={e1}>
          <img src={img1} width={50} alt="nah" />
        </div>
        <div className="line line1" ref={e2}>
          <img src={img2} width={50} alt="nah" />
        </div>
        <div className="line line2" ref={e3}>
          <img src={img3} width={50} alt="nah" />
        </div>
        <div className="line line3" ref={e4}>
          <img src={img1} width={50} alt="nah" />
        </div>
        <div className="line line4" ref={e5}>
          <img src={img2} width={50} alt="nah" />
        </div>
      </div>
      <SlideShow forwardRef={snapshot.speed} />
    </div>
  );
}

export default App;
