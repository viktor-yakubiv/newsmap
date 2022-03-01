import { useCallback, useRef } from 'react'
import joinClassNames from 'classnames'
import styles from '../styles/post.module.css'

const dateFormat = new Intl.DateTimeFormat('uk-UA', {
  dateStyle: 'short',
  timeStyle: 'short',
})
const formatDate = date => dateFormat.format(date)

const Post = ({ data, className, tag: Tag = 'div' }) => {
  const containerRef = useRef(null)
  const mouseDownTimeStamp = useRef(0)

  const isSectioning = /section|article/ig.test(Tag)
  const Header = isSectioning ? 'header' : 'div'
  const Footer = isSectioning ? 'footer' : 'div'

  const recordMouseDown = useCallback((event) => {
    mouseDownTimeStamp.current = event.timeStamp
  }, [])

  const clickLink = useCallback((event) => {
    const clickDuration = event.timeStamp - mouseDownTimeStamp.current

    if (clickDuration < 200 && containerRef?.current != null) {
      containerRef.current.querySelector('h2 a')?.click()
    }
  }, [])

  return (
    <Tag
      ref={containerRef}
      className={joinClassNames(styles.container, className)}
      onMouseDown={recordMouseDown}
      onClick={clickLink}
    >
      <Header className={styles.header}>
        <h2 className={styles.title}>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        </h2>

        <div className={styles.meta}>
          <time dateTime={data.publicationDate.toISOString()}>
            {formatDate(data.publicationDate)}
          </time>
        </div>
      </Header>

      <div className={styles.content}>
        {data.body}
      </div>

      <Footer className={styles.footer}>
        <p className={styles.location}>
          {data.locations.map(l => l.title).join('; ')}
        </p>
      </Footer>
    </Tag>
  )
}

export default Post
