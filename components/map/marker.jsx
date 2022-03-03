import { useMemo } from 'react'
import { Marker as LeafletMarker } from 'react-leaflet'
import Icon from './icon'

const MIN_OPACITY = 0.5
const calcOpacity = freshness => freshness * (1 - MIN_OPACITY) + MIN_OPACITY

const Marker = ({ longitude, latitude, freshness, onClick }) => {
  const position = useMemo(() => ({
     lat: latitude,
     lng: longitude
  }), [latitude, longitude])

  return (
    <LeafletMarker
      position={position}
      icon={new Icon({ freshness })}
      eventHandlers={{
        click: onClick,
      }}
    />
  )
}

export default Marker
