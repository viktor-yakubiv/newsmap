const transformLocation = ({ lat, lon, text }) => ({
  latitude: lat,
  longitude: lon,
  title: text,
})

const transformAuthor = author => author

const transformPost = (post) => ({
  id: post.id,
  permalink: post.permalink,
  text: post.text,
  language: post.language,
  author: transformAuthor(post.author),
  publicationDate: post.publishedAt,
  locations: post.geoLocations.map(transformLocation),
})

export {
  transformAuthor,
  transformLocation,
  transformPost,
}

// Aliases for handy `import * as trasformers`
export {
  transformAuthor as author,
  transformLocation as location,
  transformPost as post,
}
