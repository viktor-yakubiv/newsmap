import { Fragment } from 'react'
import joinClassNames from 'classnames'
import styles from '../styles/text.module.css'

const Text = ({ className, tag: Tag = 'div', value, ...restProps }) => (
  <Tag className={joinClassNames(styles.container, className)}>
    {value.trim().split(/[\n]{2,}/g).map((paragraph, i) => (
      <p key={`${paragraph} ${i}`}>
        {paragraph.split('\n').map((line, j, allLines) => (
          <Fragment key={`${line} ${j}`}>
            {line}
            {(allLines.length - j > 1) ? <br /> : null}
          </Fragment>
        ))}
      </p>
    ))}
  </Tag>
)

export default Text
