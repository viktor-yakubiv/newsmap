import Location from './location'
import { freshness } from '@/utils/date'

class Post {
  constructor(init) {
    const { publicationDate, locations, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.locations = locations.map(locationInit => new Location(locationInit))
  }

  get location() {
    // Ideally, the one set manually, otherwise just first
    return this.locations[0]
  }

  freshness(duration) {
    return freshness(this.publicationDate, duration)
  }

  valueOf() {
    return this.id
  }

  toString() {
    this.valueOf().toString()
  }
}

export default Post
