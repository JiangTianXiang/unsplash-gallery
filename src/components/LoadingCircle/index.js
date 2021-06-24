import React from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "./LoadingCircle.styles";

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1,
};

const circleStyle = {
  display: "inline-block",
  width: "8rem",
  height: "8rem",
  border: "0.5rem solid #FFFFFF",
  borderTop: "0.5rem solid #add8e6",
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
