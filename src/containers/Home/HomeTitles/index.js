import React, { useEffect, useCallback } from "react";
import { gsap } from 'gsap';
import { Link } from "react-router-dom";
import state from "./../../../state";

// working hack to remove any jitter.
const slides = state.slides.concat(state.slides);

export default function HomeTitles({ distance }) {  
  const scrolling = useCallback(() => {
    if (distance.current){
      const distanceInstance = distance.current < 0 ? distance.current + 1200 : distance.current
      const total = (distanceInstance * 200) % 1200;
      let signedTotal = total < 0 ? total : -total;
      gsap.to(".title", {
        ease: "power3.out",
        y: `${signedTotal}`,
        duration: 0.0025,
        // modifiers: {
        //   y: function(x) {
        //     console.log(x)
        //     return x % 1200 - 1200;
        //   }
        // }
      });
    }
    requestAnimationFrame(() => scrolling());
  }, [distance]);

  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, [scrolling]);
  return (
    <div className="homeTitles">
        {slides.map((slide, i) => (
          <div className="title" key={`slide-${i}`}>

          <Link to={slide.link}>
            <h2 className="slideTitle">{slide.title}</h2>
          </Link>
        </div>
        ))}
    </div>
  );
}
