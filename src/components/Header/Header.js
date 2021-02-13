import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Header() {
  return (
    <div className="header">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <h1>
          <Link to="/">bradyperron</Link>
        </h1>
        <p>videographer &middot; editor &middot; director</p>
      </motion.div>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <Link to="/about">link link</Link>
      </motion.p>
    </div>
  );
}
