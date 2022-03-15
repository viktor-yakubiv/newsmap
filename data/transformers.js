const transformLocation = (location) => ({
  id: location.id,
  latitude: location.location.lat,
  longitude: location.location.lon,
  name: location.name,
  alternativeNames: location.alternatenames,
  countryCode: location.country_code,
  featureClass: location.feature_class,
  featureCode: location.feature_code,
})

const transformAuthor = ({ subscribers, ...author }) => ({
  ...author,
  followersCount: subscribers,
})

const transformPost = (post) => {
  const [title, text] = post.text.split(' ; ', 2)

  return {
    title,
    text,
    id: post.id,
    permalink: post.permalink,
    language: post.language,
    author: transformAuthor(post.author ?? {}),
    publicationDate: post.publishedAt,
    locations: post.locations.map(transformLocation),
  }
}

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
