import React from "react";
import { parseLengthAndUnit, cssValue } from "./helpers/unitConverter";

// CSS keyframes for the rotation animations
const rightKeyframes = `
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);}
`;

const leftKeyframes = `
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);}
`;

function Loader({
  loading = true,
  color = "#000000",
  speedMultiplier = 1,
  cssOverride = {},
  size = 60,
  imageSrc, // Add imageSrc prop
  ...additionalProps
}) {
  const { value, unit } = parseLengthAndUnit(size);

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: cssValue(value, unit),
    height: cssValue(value, unit),
    ...cssOverride,
  };

  const ringStyle = (i) => ({
    position: "absolute",
    top: "45vh",
    left: "45vw",
    width: `${value}${unit}`,
    height: `${value}${unit}`,
    border: `${value / 10}${unit} solid ${color}`,
    opacity: "0.4",
    borderRadius: "100%",
    animationFillMode: "forwards",
    perspective: "800px",
    animation: `${i === 1 ? "rightSpin" : "leftSpin"} ${2 / speedMultiplier}s 0s infinite linear`,
  });

  const imageStyle = {
    position: "relative",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)", // Center the image
    width: "70%", // Adjust size as needed
    height: "35%",
    zIndex: 1,
    borderRadius: "50%", // Optional if you want a circular image
  };

//   if (!loading) {
//     return null;
//   }

  return (
    <span style={wrapperStyle} {...additionalProps}>
      <style>{`
        @keyframes rightSpin {
          ${rightKeyframes}
        }
        @keyframes leftSpin {
          ${leftKeyframes}
        }
      `}</style>

      {/* The two rotating rings */}
      <span style={ringStyle(1)} />
      <span style={ringStyle(2)} />

      {/* The image in the center of the loader */}
      {imageSrc && <img src={imageSrc} alt="Loader Image" style={imageStyle} />}
    </span>
  );
}

export default Loader;
