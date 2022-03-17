export const clamp = (min, value, max) => Math.max(min, Math.min(value, max))

export const mapRange = (value, {
  from = [0, 1],
  to = [0, 1],
  clamp: useClamp = false,
} = {}) => {
  const fromMin = Math.min(...from)
  const fromMax = Math.max(...from)
  const toMin = Math.min(...to)
  const toMax = Math.max(...to)
  const actualValue = useClamp ? clamp(fromMin, value, fromMax) : value

  return (actualValue - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin
}
