import React from "react";

// LengthType can be either a number or a string
// No need for a specific type declaration in JavaScript

// Common properties for all loaders
const CommonProps = {
  color: undefined, // optional string
  loading: undefined, // optional boolean
  cssOverride: {}, // optional object
  speedMultiplier: 1, // optional number
};

// LoaderHeightWidthProps
const LoaderHeightWidthProps = {
  ...CommonProps,
  height: undefined, // optional LengthType
  width: undefined, // optional LengthType
};

// LoaderSizeProps
const LoaderSizeProps = {
  ...CommonProps,
  size: undefined, // optional LengthType
};

// LoaderSizeMarginProps
const LoaderSizeMarginProps = {
  ...CommonProps,
  size: undefined, // optional LengthType
  margin: undefined, // optional LengthType
};

// LoaderHeightWidthRadiusProps
const LoaderHeightWidthRadiusProps = {
  ...CommonProps,
  height: undefined, // optional LengthType
  width: undefined, // optional LengthType
  radius: undefined, // optional LengthType
  margin: undefined, // optional LengthType
};

export {
  CommonProps,
  LoaderHeightWidthProps,
  LoaderSizeProps,
  LoaderSizeMarginProps,
  LoaderHeightWidthRadiusProps,
};
