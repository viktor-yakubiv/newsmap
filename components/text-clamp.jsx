import { forwardRef, useCallback, useEffect, useState, useRef } from 'react'
import joinClassNames from 'classnames'
import { useClickEffect } from '@/utils/hooks'
import styles from '@/styles/text-clamp.module.css'

const TextClamp = forwardRef((
  { children, className, tag: Tag = 'div', ...restProps },
  ref
) => {
  const contentRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const expand = useCallback(() => setExpanded(true), [])

  const contentProps = useClickEffect(() => setExpanded(true))

  useEffect(() => {
    const element = contentRef.current
    if (element.scrollHeight <= element.clientHeight) {
      setExpanded(() => true)
    }
  }, [children])

  return (
    <Tag
      ref={ref}
      className={joinClassNames(
        styles.container,
        expanded && styles.expanded,
        className,
      )}
      {...restProps}
    >
      <div
        ref={contentRef}
        className={joinClassNames(styles.content)}
        {...(!expanded ? contentProps : {})}
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
})

TextClamp.displayName = 'TextClamp'

export default TextClamp
