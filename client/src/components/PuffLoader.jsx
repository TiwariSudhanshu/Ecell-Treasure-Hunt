import React from "react";
import { cssValue } from "./helpers/unitConverter";

// Define keyframes for the pulsating effect
const pulsateKeyframes = `
  @keyframes pulsate {
    0% { transform: scale(0.8); opacity: 0.6; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0.6; }
  }
`;

function PuffLoader({
  loading = true,
  color = "#4b79a1",
  speedMultiplier = 1,
  cssOverride = {},
  size = 60,
  imageSrc = "/images/logo.png",
  ...additionalProps
}) {
  // Wrapper style for the loader
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: cssValue(size),
    height: cssValue(size),
    ...cssOverride,
  };

  // Style for the pulsating rings
  const ringStyle = {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    border: `8px solid ${color}`,
    borderRadius: "50%",
    animation: `pulsate ${1.5 / speedMultiplier}s ease-in-out infinite`,
    opacity: 0.7,
  };

  // Centered image style
  const imageStyle = {
    position: "relative",
    width: `${size * 0.4}px`, // Image size is 40% of the loader size
    height: `${size * 0.4}px`,
    borderRadius: "50%",
    objectFit: "cover",
    zIndex: 5,
  };

  if (!loading) {
    return null; // Do not render anything if not loading
  }

  return (
    <div style={wrapperStyle} {...additionalProps}>
      {/* Inject keyframes for the pulsating animation */}
      <style>{pulsateKeyframes}</style>

      {/* Create two rings for the pulsating effect */}
      <div style={{ ...ringStyle, animationDelay: "0s" }} />
      <div style={{ ...ringStyle, animationDelay: "0.75s", width: `${size * 0.9}px`, height: `${size * 0.9}px` }} />

      {/* Centered image */}
      {imageSrc && <img src={imageSrc} alt="Loader" style={imageStyle} />}
    </div>
  );
}

export default PuffLoader;
