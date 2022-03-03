// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const dataUrl = 'https://gist.githubusercontent.com/viktor-yakubiv/f4da988e4ef66aa63fadef582ad6bb4b/raw/5358ece78f2d9fff8f2d1d80073605e98f0e5ba0/example.json'

const [latMin, lngMin] = [44.386389, 22.163889]
const [latMax, lngMax] = [52.334444, 40.198056]

export default async function handler(req, res) {
  fetch(dataUrl)
    .then(r => r.json())
    .then(data => data.mentions)
    .then(posts => posts.map(post => {
      const lat = latMin + Math.random() * (latMax - latMin)
      const lon = lngMin + Math.random() * (lngMax - lngMin)

      return {
        ...post,
        geoLocations: [
          { lat, lon, text: [lat.toFixed(4), lon.toFixed(4)].join() }
        ],
      }
    }))
    .then(body => res.status(200).json(body))
}
