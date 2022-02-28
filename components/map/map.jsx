import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const ukraineBounds = [
  // [52.334444, 33.288611],
  // [49.259167, 40.198056],
  // [48.430556, 22.163889],
  // [44.386389, 33.777222],
  [44.386389, 22.163889],
  [52.334444, 33.777222],
]

const StaticMap = ({ posts, children }) => {
  console.log(posts)

  return (
  <MapContainer bounds={ukraineBounds}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {posts.flatMap(p => p.expand()).map(({ url, location }) => (
      <Marker
        key={[url, location.latitude, location.longitude].join()}
        position={location}
      />
    ))}

    {children}
  </MapContainer>
)}

export default StaticMap
