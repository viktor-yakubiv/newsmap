import { useCallback, useState } from 'react'
import joinClassNames from 'classnames'
import styles from '@/styles/text-clamp.module.css'

const TextClamp = ({ children, className, tag: Tag = 'div', ...restProps }) => {
  const [expanded, setExpanded] = useState(false)
  const expand = useCallback(() => setExpanded(true), [])

  return (
    <Tag
      className={joinClassNames(styles.container, className)}
      {...restProps}
    >
      <div
        className={joinClassNames(styles.content, expanded && styles.expanded)}
      >
        {children}
      </div>

      <button onClick={expand} hidden={expanded}>
        Expand
      </button>
    </Tag>
  )
}

export default TextClamp
