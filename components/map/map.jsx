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

const maxBounds = [
  [
    40.983333, // Black Sea South
    16.975834, // Bratislava
  ],
  [
    56.166667, // Belarus North
    44.226527, // Volgograd
  ],
]

const EventListeners = ({ onBoundsChange }) => {
  const map = useMapEvents({
    moveend: () => onBoundsChange?.call(null, map.getBounds()),
  })

  return null
}

const StaticMap = ({ data: posts, onBoundsChange, onMarkerClick }) => (
  <MapContainer bounds={ukraineBounds} maxBounds={maxBounds}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {posts.map(({ id, location, freshness }) => (
      <Marker
        key={[id, location.id].join()}
        latitude={location.latitude}
        longitude={location.longitude}
        freshness={freshness}
        onClick={() => onMarkerClick?.(id)}
      />
    ))}

    <EventListeners
      onBoundsChange={onBoundsChange}
    />
  </MapContainer>
)

export default StaticMap
