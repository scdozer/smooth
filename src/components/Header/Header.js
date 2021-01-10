import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Header() {
  return (
    <div className="header">
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <Link to="/">bradyperron</Link>
      </motion.h1>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <Link to="/about">about</Link>
      </motion.p>
    </div>
  );
}
