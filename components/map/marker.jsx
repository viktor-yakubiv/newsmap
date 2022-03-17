import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Marker as LeafletMarker } from 'react-leaflet'
import Icon from './icon'
import { mapRange } from '@/utils/math'
import styles from '@/styles/marker.module.css'

// Arbitrary value
const mapSize = value => mapRange(value, {
  from: [1, 9],
  to: [16, 24],
  clamp: true,
})

const useIconEffect = (ref, func, deps = []) => useEffect(() => {
  const iconElement = ref.current.getElement()
  return func(iconElement)
}, deps)

const statusClassNames = ['normal', 'highlighted', 'active']
  .map(name => styles[name])

const Marker = ({
  longitude,
  latitude,
  size,
  freshness,
  title,
  status = 'normal',
  onClick,
}) => {
  const markerRef = useRef()

  const position = useMemo(() => ({
     lat: latitude,
     lng: longitude
  }), [latitude, longitude])

  const icon = useMemo(() => new Icon({
    size: mapSize(size),
    className: styles.marker,
  }), [size])

  useIconEffect(markerRef, (iconElement) => {
    iconElement.setAttribute('title', title)
  }, [title])

  useIconEffect(markerRef, (iconElement) => {
    iconElement.style.setProperty('--freshness', freshness)
  }, [freshness])

  useIconEffect(markerRef, (iconElement) => {
    iconElement.classList.remove(...statusClassNames)
    iconElement.classList.add(styles[status])
  }, [status])

  const click = useCallback(
    () => onClick?.({ latitude, longitude }),
    [latitude, longitude, onClick],
  )

  return (
    <LeafletMarker
      ref={markerRef}
      position={position}
      icon={icon}
      eventHandlers={{ click }}
    />
  )
}

export default Marker
