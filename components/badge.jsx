import { forwardRef } from 'react'
import joinClassNames from 'classnames'
import styles from '@/styles/badge.module.css'

const Badge = forwardRef(({
  children,
  className,
  tag: Tag = 'span',
  ...passProps
}, ref) => (
  <Tag
    ref={ref}
    className={joinClassNames(styles.container, className)}
    {...passProps}
  >
    {children}
  </Tag>
))

Badge.displayName = 'Badge'

export default Badge
