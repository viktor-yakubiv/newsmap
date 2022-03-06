import Location from './location'
import Post from './post'
import { freshness } from '../../utils/date'

class PostGroup {
  constructor(init) {
    const { publicationDate, locations, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.locations = locations.map(locationInit => new Location(locationInit))
  }

  get location() {
    return this.locations[0]
  }

  get freshness() {
    return freshness(this.publicationDate)
  }

  expand() {
    return this.locations.map(location => new Post({ ...this, location }))
  }
}

export default PostGroup
