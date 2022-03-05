const DAY = 24 * 60 * 60 * 1000 // ms

export const calcFreshness = (date, maxDuration = DAY) =>
  1 - Math.min(1, (Date.now() - date.getTime()) / maxDuration)
