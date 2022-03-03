import { useCallback, useRef } from 'react'
import joinClassNames from 'classnames'
import ActionBar from './action-bar'
import styles from '../styles/post.module.css'
import { formatDate, formatRelativeDate } from '../utils'

const formatDomain = (url) => new URL(url).hostname

const Post = ({
  data,
  onEdit,
  onDelete,
  className,
  tag: Tag = 'div',
  ...restProps
}) => {
  const isSectioning = /section|article/ig.test(Tag)
  const Header = isSectioning ? 'header' : 'div'
  const Footer = isSectioning ? 'footer' : 'div'

  return (
    <Tag
      className={joinClassNames(styles.container, className)}
      {...restProps}
    >
      <Header className={styles.header}>
        <h2 className={styles.title}>
          {data.title}
        </h2>

        <div className={styles.meta}>
          <time
            dateTime={data.publicationDate.toISOString()}
            title={formatDate(data.publicationDate)}
          >
            {formatRelativeDate(data.publicationDate)}
          </time>
        </div>
      </Header>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data.body }}
      />

      <p className={styles.location}>
        {data.locations.map(l => l.title).join('; ')}
      </p>

      <Footer className={styles.footer}>
        <p className={styles.source}>
          <a
            href={data.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            { formatDomain(data.permalink) }
          </a>
        </p>

        <ActionBar onEdit={onEdit} onDelete={onDelete} hidden />
      </Footer>
    </Tag>
  )
}

export default Post
