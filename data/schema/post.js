import Location from './location'
import { freshness } from '@/utils/date'

class Post {
  constructor(init) {
    const { publicationDate, locations, ...passData } = init

    Object.assign(this, passData)
    this.publicationDate = new Date(publicationDate)
    this.locations = locations
      .map(locationInit => new Location(locationInit))
      .sort((a, b) => {
        const country = (b.countryCode == 'UA') - (a.countryCode == 'UA')
        const specificity = b.featureClass > a.featureClass
        return 10 * country + specificity
      })
    console.log(this.locations)
  }

  get location() {
    // Ideally, the one set manually;
    // otherwise, the most specific one due to sorting in the constructor
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
