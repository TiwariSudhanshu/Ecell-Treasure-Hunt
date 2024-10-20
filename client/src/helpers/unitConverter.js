const cssUnit = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true,
};

/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {{ value: number, unit: string }} LengthObject
 */
export function parseLengthAndUnit(size) {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px",
    };
  }
  
  let value;
  const valueString = (size.match(/^[0-9.]*/) || [""])[0];
  value = valueString.includes(".") ? parseFloat(valueString) : parseInt(valueString, 10);

  const unit = (size.match(/[^0-9]*$/) || [""])[0];

  if (cssUnit[unit]) {
    return {
      value,
      unit,
    };
  }

  console.warn(`React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`);

  return {
    value,
    unit: "px",
  };
}

/**
 * Take value as an input and return valid css value
 *
 * @param {(number | string)} value
 * @return {string} valid css value
 */
export function cssValue(value) {
  const lengthWithunit = parseLengthAndUnit(value);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
}
