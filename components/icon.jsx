import Image from 'next/image'
import joinClassNames from 'classnames'
import styles from '@/styles/icon.module.css'

const Icon = ({ src, className, ...passProps }) => (
  <Image
    className={joinClassNames(styles.container, className)}
    aria-hidden="true"
    src={src}
    alt=""
    {...passProps}
  />
)

export default Icon
