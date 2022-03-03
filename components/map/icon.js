import L from 'leaflet'
import markerIcon from './marker.svg'
import styles from '../../styles/marker.module.css'

class Icon extends L.DivIcon {
  constructor({ freshness = 1 } = {}) {
    super({
      html: `
        <div
          class="${styles.marker}"
          style="--freshness: ${freshness.toFixed(4)};"
        ></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }
}

export default Icon
