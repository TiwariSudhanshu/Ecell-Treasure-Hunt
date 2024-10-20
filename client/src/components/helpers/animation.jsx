// Animation helper for creating CSS keyframes dynamically (in case you need more complex animations)
export function createAnimation(name, keyframes, direction) {
    return `${name}-${direction}`;
  }
  