import L from 'leaflet'
import joinClassNames from 'classnames'
import markerIcon from './marker.svg'

class Icon extends L.DivIcon {
  constructor({
    size = 8, // px
    className,
    ...restOptions
  } = {}) {
    super({
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      className: joinClassNames('leaflet-div-icon', className),
      ...restOptions,
    })
  }
}

export default Icon
