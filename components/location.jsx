import { forwardRef } from 'react'
import joinClassNames from 'classnames'
import Badge from './badge'
import styles from '@/styles/location.module.css'

const formatOptions = list => list.length
  ? [
    'Також ймовірно:',
    '',
    ...list.map(value => `•\u2002${value}`)
  ].join('\n')
  : null

const Location = forwardRef(({
  data,
  className,
  tag: Tag = 'div',
  ...passProps
}, ref) => (
  <Tag
    ref={ref}
    className={joinClassNames(styles.container, className)}
    {...passProps}
  >
    {data.main}
    {' '}
    {data.options?.length && (
      <Badge
        className={styles.badge}
        title={formatOptions(data.options)}
      >
        +{'\u202f'}{data.options.length}
      </Badge>
    )}
  </Tag>
))

Location.displayName = 'Location'

export default Location
