import React from "react";
import { AnimatePresence } from "framer-motion";
import Home2 from "./containers/Home2";
import About from "./containers/About";
import Project from "./containers/Project";
import Header from "./components/Header/Header";
import "./App.css";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/projects">
          <Project />
        </Route>
        <Route path="/">
          <Home2 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
