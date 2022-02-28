import dynamic from 'next/dynamic'
import styles from './styles.module.css'
import joinClassNames from 'classnames'

const DynamicMap = dynamic(() => import('./map'), {
  ssr: false,
})

const MapContainer = ({ className, tag: Tag = 'div', ...passProps }) => (
  <Tag className={joinClassNames(styles.container,className)}>
    <DynamicMap {...passProps} />
  </Tag>
)

export default MapContainer
