export const clamp = (min, value, max) => Math.max(min, Math.min(value, max))

export const mapRange = (value, {
  from = [0, 1],
  to = [0, 1],
  clamp: useClamp = false,
} = {}) => {
  const [fromMin, fromMax] = from
  const [toMin, toMax] = to
  const actualValue = useClamp ? clamp(fromMin, value, fromMax) : value

  return (value - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin
}
