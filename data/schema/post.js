import Location from './location'
import { freshness } from '../../utils/date'

class Post {
  constructor(init) {
    const { publicationDate, location, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.location = new Location(location)
  }

  get freshness() {
    return freshness(this.publicationDate)
  }
}

export default Post
