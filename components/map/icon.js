import L from 'leaflet'
import joinClassNames from 'classnames'
import markerIcon from './marker.svg'
import styles from '../../styles/marker.module.css'

class Icon extends L.DivIcon {
  constructor({
    title,
    freshness = 1,
    highlighted = false,
  } = {}) {
    super({
      html: `
        <div
          class="${joinClassNames(styles.marker, highlighted && styles.highlighted)}"
          style="--freshness: ${freshness.toFixed(4)};"
          title="${title ?? ''}"
        ></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }
}

export default Icon
