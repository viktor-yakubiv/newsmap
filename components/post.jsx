import { forwardRef, useCallback, useRef } from 'react'
import Image from 'next/image'
import joinClassNames from 'classnames'
import ActionBar from './action-bar'
import Author from './author'
import Text from './text'
import TextClamp from './text-clamp'
import styles from '@/styles/post.module.css'
import { formatDate, formatRelativeDate, formatDomain } from '@/utils'

const Post = forwardRef(({
  data,
  active,
  onEdit,
  onDelete,
  className,
  tag: Tag = 'div',
  ...restProps
}, ref) => {
  const isSectioning = /section|article/ig.test(Tag)
  const Header = isSectioning ? 'header' : 'div'
  const Footer = isSectioning ? 'footer' : 'div'

  return (
    <Tag
      ref={ref}
      className={joinClassNames(
        styles.container,
        active && styles.active,
        className,
      )}
      {...restProps}
    >
      <Header className={styles.header}>
        <span className={styles.location}>
          {data.location?.name ?? data.location}
        </span>

        <time
          className={styles.date}
          dateTime={data.publicationDate.toISOString()}
          title={formatDate(data.publicationDate, { style: 'long' })}
        >
          {formatRelativeDate(data.publicationDate)}
        </time>
      </Header>

      <div className={styles.content}>
        <TextClamp>
          <Text className={styles.content} value={data.text} />
        </TextClamp>

        {data?.author && <Author data={data.author} />}
      </div>

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
})

Post.displayName = 'Post'

export default Post
