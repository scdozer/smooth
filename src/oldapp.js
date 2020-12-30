import { useEffect, useRef, useCallback, useState } from "react";
import "./App.css";

import useWindowSize from "./hooks/useWindowSize";

function App() {
  const app = useRef();
  const scrollContainer = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const [speed, setSpeed] = useState(0);
  const [position, setPosition] = useState(0);
  // const [rounded, setRounded] = useState(0);
  const [count, setCount] = useState(0);

  const scroller = () => {
    setPosition((prevPosition) => prevPosition + speed);
    setSpeed((prevSpeed) => prevSpeed * 0.8);
    scrollContainer.current.style.top = `${position * 100}px)`;
    requestRef.current = requestAnimationFrame(scroller);
  };

  useEffect(() => {
    window.addEventListener("wheel", (event) => {
      setSpeed((prevSpeed) => prevSpeed + event.deltaY * 0.0003);
    });
    return () =>
      window.removeEventListener("wheel", (event) => {
        // setSpeed(speed + event.deltaY * 0.0003);
      });
  }, [speed]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(scroller);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  console.log({ speed });
  return (
    <div className="app" ref={app}>
      <div className="box" ref={scrollContainer}>
        <h1>{Math.round(speed)}</h1>
      </div>
    </div>
  );
}

export default App;
