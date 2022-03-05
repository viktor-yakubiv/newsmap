class Location {
  constructor(rawData) {
    const { id, latitude, longitude, name } = rawData
    Object.assign(this, { id, latitude, longitude, name })
  }
}

export default Location
