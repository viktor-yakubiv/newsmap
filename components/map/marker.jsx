import { useMemo } from 'react'
import { Marker as LeafletMarker } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from './marker.svg'

const MIN_OPACITY = 0.5
const calcOpacity = freshness => freshness * (1 - MIN_OPACITY) + MIN_OPACITY

const icon =new L.Icon({
    iconUrl: markerIcon.src,
    iconSize: [markerIcon.width, markerIcon.height],
    iconAnchor: [markerIcon.width / 2, markerIcon.height],
})

const Marker = ({ longitude, latitude, freshness }) => {
  const position = useMemo(() => ({
     lat: latitude,
     lng: longitude
  }), [latitude, longitude])

  return (
    <LeafletMarker
      position={position}
      icon={icon}
      opacity={calcOpacity(freshness)}
    />
  )
}

export default Marker
