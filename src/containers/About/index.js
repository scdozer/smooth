import React from "react";
import { motion } from "framer-motion";
// import "./styles.css";

export default function About() {
  return (
    <div className="about">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1 }}
      >
        About
      </motion.h1>
    </div>
  );
}
