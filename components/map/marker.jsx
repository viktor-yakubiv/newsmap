import { useCallback, useMemo } from 'react'
import { Marker as LeafletMarker } from 'react-leaflet'
import Icon from './icon'
import { mapRange } from '../../utils/math'

// Arbitrary values
const mapSize = value => mapRange(value, { from: [1, 9], to: [16, 24] })

const Marker = ({
  longitude,
  latitude,
  size,
  freshness,
  title,
  highlighted,
  onClick,
}) => {
  const position = useMemo(() => ({
     lat: latitude,
     lng: longitude
  }), [latitude, longitude])

  const click = useCallback(() => onClick?.(), [onClick])

  return (
    <LeafletMarker
      position={position}
      icon={new Icon({
        freshness,
        highlighted,
        title,
        size: mapSize(size),
      })}
      eventHandlers={{ click }}
    />
  )
}

export default Marker
