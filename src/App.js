import React, { useEffect, useRef, useCallback, useMemo } from "react";
import SlideShow from "./components/SlideShow";
import img1 from "./img/photo1.jpg";
import img2 from "./img/photo2.jpg";
import img3 from "./img/photo3.jpg";
import "./App.css";

function App() {
  const slideContent = useRef();
  const scroll = useRef();
  const wrap = useRef();
  let speed = useRef(0);
  let position = useRef(0);

  const e1 = useRef();
  const e2 = useRef();
  const e3 = useRef();
  const e4 = useRef();
  const e5 = useRef();
  const elems = useMemo(() => [e1, e2, e3, e4, e5], [e1, e2, e3, e4, e5]);

  const content = [
    {
      title: "Title 1",
      description: "description 1 description 1 description 1",
    },
    {
      title: "Title 2",
      description: "description 2 description 2 description 2",
    },
    {
      title: "Title 3",
      description: "description 3 description 3 description 3",
    },
    {
      title: "Title 4",
      description: "description 4 description 4 description 4",
    },
    {
      title: "Title 5",
      description: "description 5 description 5 description 5",
    },
  ];

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
    slideContent.current.innerHTML = `<h1>${
      content[rounded] ? content[rounded].title : ""
    }</h1><p>${content[rounded] ? content[rounded].description : ""}</p>`;
    slideContent.current.style.opacity = `translate(0,${
      position.current * 100
    }px)`;
    wrap.current.style.transform = `translate(0, ${
      -position.current * 100 - 50
    }px`;
    requestAnimationFrame(() => scrolling());
  }, [elems, objs]);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, []);

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
      <div className="slideContent" ref={slideContent}></div>
      <SlideShow forwardRef={position} />
    </div>
  );
}

export default App;
