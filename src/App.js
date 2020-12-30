import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import lerp from "lerp";
import "./App.css";

import useWindowSize from "./hooks/useWindowSize";

function App() {
  const scroll = useRef();
  const box = useRef();
  const requestRef = useRef();
  const [scrollSpeed, setScrollSpeed] = useState(0);
  // Scrolling
  const scrolling = useCallback(() => {
    const data = {
      current: scrollSpeed * 0.8,
      speed: 0,
      position: 0,
      rounded: 0,
    };
    // setScrollSpeed(data.current * 0.8);
    data.position = data.position + data.current;

    data.rounded = Math.round(data.position);
    let diff = data.rounded - data.position;
    data.position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.15;
    // data.position += diff * 0.15;
    // console.log("position", diff);
    // console.log(data.current);
    box.current.style.transform = `translate(0, ${data.position * 100}px`;

    cancelAnimationFrame(requestRef.current);
  }, [scrollSpeed]);

  useLayoutEffect(() => {
    requestRef.current = requestAnimationFrame(scrolling);
    return () => cancelAnimationFrame(requestRef.current);
  }, [scrolling]);

  useEffect(() => {
    window.addEventListener("wheel", (event) => {
      setScrollSpeed((prevSpeed) => {
        console.log({ prevSpeed });
        return prevSpeed + event.deltaY * 0.0002;
      });
    });
    // return () =>
    //   window.removeEventListener("wheel", (event) => {
    //     setScrollSpeed((prevSpeed) => {
    //       console.log({ prevSpeed });
    //       return prevSpeed + event.deltaY * 0.0002;
    //     });
    //   });
  }, []);

  console.log(scrollSpeed);
  return (
    <div className="app" ref={scroll}>
      <div className="box" ref={box}></div>
    </div>
  );
}

export default App;
