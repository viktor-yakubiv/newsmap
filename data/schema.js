const DAY = 24 * 60 * 60 * 1000 // ms

const calculateFreshness = date => (Date.now() - date.getTime()) / DAY

class Location {
  constructor(rawData) {
    const { latitude, longitude, title } = rawData
    Object.assign(this, { latitude, longitude, title })
  }

  // Simplification for Leaflet, it should not be here
  get lat() {
    return this.latitude
  }

  get lng() {
    return this.longitude
  }
}

class Post {
  constructor(init) {
    const { publicationDate, location, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.location = new Location(location)
  }

  get freshness() {
    return calculateFreshness(this.publicationDate)
  }
}

class PostGroup {
  constructor(init) {
    const { publicationDate, locations, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.locations = locations.map(locationInit => new Location(locationInit))
  }

  get freshness() {
    return calculateFreshness(this.publicationDate)
  }

  expand() {
    return this.locations.map(location => new Post({ ...this, location }))
  }
}

export { Location, Post, PostGroup }
