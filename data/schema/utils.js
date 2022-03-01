const DAY = 24 * 60 * 60 * 1000 // ms

export const calcFreshness = date => (Date.now() - date.getTime()) / DAY
