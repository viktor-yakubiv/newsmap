import { forwardRef } from 'react'
import PostsMap from '@/components/map'
import styles from '@/styles/app.module.css'

const MapView = forwardRef(({
  markers,
  onMarkerClick,
  children,
  tag: Tag = 'div',
  ...passProps
}, ref) => (
  <Tag
    ref={ref}
    className={styles.container}
    {...passProps}
  >
    <PostsMap
      className={styles.map}
      data={{ markers }}
      onMarkerClick={onMarkerClick}
    />

    <main className={styles.content}>
      { children }
    </main>
  </Tag>
))

MapView.displayName = 'MapView'

export default MapView
