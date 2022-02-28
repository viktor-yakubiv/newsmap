const DAY = 24 * 60 * 60 * 1000 // ms

class Location {
  constructor(rawData) {
    const { latitude, longitude, title } = rawData
    Object.assign(this, { latitude, longitude, title })
  }
}

class Post {
  constructor(rawData) {
    const { title, body, publicationDate, locations } = rawData

    Object.assign(this, { title, body })
    this.publicationDate = new Date(publicationDate)
    this.locations = locations.map(init => new Location(init))
  }

  get freshness() {
    return (Date.now() - this.publicationDate.getTime()) / DAY
  }
}

export { Post, Location }
