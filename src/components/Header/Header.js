import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css";

// import instagram from "./../../img/instagram.png";
// import email from "./../../img/email.png";

export default function Header() {
  return (
    <div className="header">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <h1>
          <Link to="/">bradyperron</Link>
        </h1>
        <p>videographer &middot; editor &middot; director</p>
      </motion.div>
      <motion.p
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        <Link to="https://instagram.com/bradyperron">i-&nbsp;&nbsp;&nbsp;</Link>
        <Link to="mailto:brady.perron@gmail.com">e-</Link>
      </motion.p>
    </div>
  );
}
