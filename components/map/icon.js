import L from 'leaflet'
import markerIcon from './marker.svg'
import styles from '../../styles/marker.module.css'

const icon =new L.DivIcon({
  html: `<div class="${styles.marker}"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export default icon
