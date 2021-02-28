import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import state from "./../../state";

export default function HomeTitles({ distance }) {
  let slide = state.slides[0];
  const scrolling = useCallback(() => {
    const slideNum = distance.current === -1 ? 0 : Math.round(distance.current);
    slide = state.slides[slideNum];
    requestAnimationFrame(() => scrolling());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);

  return (
    <div className="homeTitles">
      <div key={slide.link}>
        <h2 className="slideTitle">{slide.title}</h2>
        <p className="slideSubTitle">{slide.subTitle}</p>
        <Link to={`/${slide.link}`}>View</Link>
      </div>
    </div>
  );
}
