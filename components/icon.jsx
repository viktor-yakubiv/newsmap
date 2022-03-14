import joinClassNames from 'classnames'
import styles from '@/styles/icon.module.css'

const Icon = ({ src, className, ...passProps }) => (
  <svg
    className={joinClassNames(styles.container, className)}
    aria-hidden="true"
    {...passProps}
  >
    <use href={src} />
  </svg>
)

export default Icon
