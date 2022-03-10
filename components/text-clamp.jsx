import { useCallback, useEffect, useState, useRef } from 'react'
import joinClassNames from 'classnames'
import styles from '@/styles/text-clamp.module.css'

const TextClamp = ({ children, className, tag: Tag = 'div', ...restProps }) => {
  const contentRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const expand = useCallback(() => setExpanded(true), [])

  useEffect(() => {
    const element = contentRef.current
    if (element.scrollHeight <= element.clientHeight) {
      setExpanded(() => true)
    }
  }, [children])

  return (
    <Tag
      className={joinClassNames(styles.container, className)}
      {...restProps}
    >
      <div
        ref={contentRef}
        className={joinClassNames(styles.content, expanded && styles.expanded)}
      >
        {children}
      </div>

      <button
        className={styles.button}
        title="Показати текст повністю"
        hidden={expanded}
        onClick={expand}
      >
        <span aria-hidden="true">• • •</span>{' '}
        <span className={styles.caption}>Розгорнути</span>
      </button>
    </Tag>
  )
}

export default TextClamp
