import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import Marker from './marker'

const ukraineBounds = [
  [
    44.386389, // Foros (South)
    22.163889, // Chop (West)
  ],
  [
    52.334444, // Hremyach (North)
    40.198056, // Rannya Zorya (East)
  ],
]

// We don't expect points beyond these coordinates.
// Limiting the map to show and pan only up to those
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

const StaticMap = ({ data, onBoundsChange, onMarkerClick }) => (
  <MapContainer bounds={ukraineBounds} maxBounds={maxBounds}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {data.posts.map(({ id, location, freshness }) => (
      <Marker
        key={[id, location].join()}
        latitude={location.latitude}
        longitude={location.longitude}
        freshness={freshness}
        highlighted={data.highlighted?.includes(location.id)}
        onClick={() => onMarkerClick?.(id)}
      />
    ))}

    <EventListeners
      onBoundsChange={onBoundsChange}
    />
  </MapContainer>
)

export default StaticMap
