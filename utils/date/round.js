// drop milliseconds by default
export const floorTime = (value, precision = 1000) =>
  Math.floor(value / precision) * precision
