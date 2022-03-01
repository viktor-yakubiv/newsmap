class Location {
  constructor(rawData) {
    const { latitude, longitude, title } = rawData
    Object.assign(this, { latitude, longitude, title })
  }
}

export default Location
