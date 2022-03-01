import Location from './location'
import { calcFreshness } from './utils'

class Post {
  constructor(init) {
    const { publicationDate, location, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.location = new Location(location)
  }

  get freshness() {
    return calcFreshness(this.publicationDate)
  }
}

export default Post
