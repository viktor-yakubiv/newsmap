import { distance } from '../../utils/geo'

class Location {
  constructor(init) {
    // Enables initializing from array
    try {
      const [latitude, longitude] = init
      Object.assign(this, { latitude, longitude })
    } catch (ignoredNotIterableError) {
      const { latitude, longitude } = init
      Object.assign(this, { latitude, longitude })
    }

    const { id, name } = init
    Object.assign(this, { id, name })
  }

  // Enables syntax like `[lat, lng] = locationInstance`
  *[Symbol.iterator] () {
    yield this.latitude
    yield this.longitude
  }

  distanceTo(destination) {
    return distance(this, destination)
  }
}

export default Location
