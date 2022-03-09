import Location from './location'

class PostLocation extends Location {
  posts = []

  get size() {
    return this.posts.length
  }

  freshness(...args) {
    return Math.max(...this.posts.map(post => post.freshness(...args)))
  }
}

export default PostLocation
