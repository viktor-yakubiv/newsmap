import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import Marker from './marker'

const ukraineBounds = [
  // [52.334444, 33.288611],
  // [49.259167, 40.198056],
  // [48.430556, 22.163889],
  // [44.386389, 33.777222],
  [44.386389, 22.163889],
  [52.334444, 40.198056],
]

const kyivPosition = [49, 32]

const EventListeners = ({ onBoundsChange }) => {
  const map = useMapEvents({
    moveend: () => onBoundsChange?.call(null, map.getBounds()),
  })

  return null
}

const StaticMap = ({ data: posts, onBoundsChange }) => (
  <MapContainer bounds={ukraineBounds} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {posts.map(({ url, location, freshness }) => (
      <Marker
        key={[url, location.latitude, location.longitude].join()}
        latitude={location.latitude}
        longitude={location.longitude}
        freshness={freshness}
      />
    ))}

    <EventListeners
      onBoundsChange={onBoundsChange}
    />
  </MapContainer>
)

export default StaticMap
