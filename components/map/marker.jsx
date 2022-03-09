import { useCallback, useMemo } from 'react'
import { Marker as LeafletMarker } from 'react-leaflet'
import Icon from './icon'

const MIN_OPACITY = 0.5
const calcOpacity = freshness => freshness * (1 - MIN_OPACITY) + MIN_OPACITY

const Marker = ({ title, longitude, latitude, freshness, highlighted, onClick }) => {
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
      })}
      eventHandlers={{ click }}
    />
  )
}

export default Marker
