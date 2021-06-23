import React from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "./LoadingCircle.styles";

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

const circleStyle = {
  display: "inline-block",
  width: "15rem",
  height: "15rem",
  border: "1.5rem solid #90EE90",
  borderTop: "1.5rem solid #add8e6",
  borderRadius: "50%",
  boxSizing: "border-box",
};

export default function LoadingPage() {
  return (
    <LoadingScreen>
      <div>Page is Loading</div>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </LoadingScreen>
  );
}
