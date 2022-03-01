const transformLocation = ({ lat, lon, text }) => ({
  latitude: lat,
  longitude: lon,
  title: text,
})

const transformPost = ({ title, text, url, datetime, geo_coordinates, }) => ({
  url,
  title,
  body: text,
  publicationDate: datetime,
  locations: geo_coordinates.map(transformLocation),
})

export {
  transformLocation,
  transformPost,
}

// Aliases for handy `import * as trasformers`
export {
  transformLocation as location,
  transformPost as post,
}
