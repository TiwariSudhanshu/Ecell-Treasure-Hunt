// Helper to parse size (e.g. '60px' or '60')
export function parseLengthAndUnit(size) {
    const value = parseFloat(size);
    const unit = String(size).match(/px|em|%|rem|vw|vh/) || "px";  // Default to 'px' if no unit
    return { value, unit };
  }
  
  // Helper to ensure the size is correctly formatted
  export function cssValue(value, unit) {
    return `${value}${unit}`;
  }
  