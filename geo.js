const EARTH_RADIUS = 6371 // Km

const { PI, cos, sin, asin, sqrt, pow } = Math
const rad = (degree) => degree * PI / 180

const distance = (origin, destination) => {
  const [originLat, originLng] = origin.map(rad)
  const [destLat, destLng] = dest.map(rad)

  const dLat = destLat - originLat
  const dLng = destLng - originLng

  const a = pow(sin(dLat / 2), 2)
     + cos(originLat) * cos(destLat) * pow(sin(deltaLng / 2), 2)
  const c = 2 * asin(sqrt(a))

  return c * EARTH_RADIUS * 1000
}

export {
  distance,
}
