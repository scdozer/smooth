import React from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./containers/Home";
import About from "./containers/About";
import Project from "./containers/Project";
import Header from "./components/Header/Header";
import "./App.css";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Route
        render={({ location }) => (
          <AnimatePresence initial={false}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/project" render={() => <Project />} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </>
  );
}

export default App;
