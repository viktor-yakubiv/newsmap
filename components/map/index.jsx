import dynamic from 'next/dynamic'
import styles from './styles.module.css'
import joinClassNames from 'classnames'

const DynamicMap = dynamic(() => import('./map'), {
  ssr: false,
})

const MapContainer = ({
  className,
  tag: Tag = 'div',
  children,
  ...passProps
}) => (
  <Tag className={joinClassNames(styles.container,className)}>
    <DynamicMap {...passProps}>
      {children}
    </DynamicMap>
  </Tag>
)

export default MapContainer
