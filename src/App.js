import React, { useEffect, useRef, useCallback, useMemo } from "react";
import SlideShow from "./components/SlideShow";
import img1 from "./img/photo1.jpg";
import img2 from "./img/photo2.jpg";
import img3 from "./img/photo3.jpg";
import "./App.css";

function App() {
  const slideContent = useRef();
  const scroll = useRef();
  const distance = useRef([]);
  const scale = useRef([]);
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

      scale.current[i] = 1 + 0.8 * o.dist;
      distance.current[i] = o.dist;
    });

    position.current += speed.current;
    speed.current *= 0.8;
    let rounded = Math.round(position.current);
    let diff = rounded - position.current;
    position.current += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;

    // this needs to be reliant on data and not hard coded...
    if (rounded < 0) {
      slideContent.current.innerHTML = `<h1>${
        content[0] ? content[0].title : ""
      }</h1><p>${content[0] ? content[0].description : ""}</p>`;
    } else if (rounded > 4) {
      slideContent.current.innerHTML = `<h1>${
        content[4] ? content[4].title : ""
      }</h1><p>${content[4] ? content[4].description : ""}</p>`;
    } else {
      slideContent.current.innerHTML = `<h1>${
        content[rounded] ? content[rounded].title : ""
      }</h1><p>${content[rounded] ? content[rounded].description : ""}</p>`;
    }
    requestAnimationFrame(() => scrolling());
  }, [content, objs]);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, []);

  const onWheel = (e) => {
    return (speed.current += e.deltaY * 0.0003);
  };
  return (
    <div className="app" ref={scroll} onWheel={onWheel}>
      <div className="slideContent" ref={slideContent}></div>
      <SlideShow yPosition={position} slideScale={scale} distance={distance} />
    </div>
  );
}

export default App;
