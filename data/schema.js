const DAY = 24 * 60 * 60 * 1000 // ms

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
    const { publicationDate, locations, ...passRaw } = init

    Object.assign(this, passRaw)
    this.publicationDate = new Date(publicationDate)
    this.locations = locations.map(locationInit => new Location(locationInit))
  }

  get freshness() {
    return (Date.now() - this.publicationDate.getTime()) / DAY
  }

  expand() {
    return this.locations.map(location =>
      Object.assign(new Post(this), { location }))
  }
}

export { Post, Location }
