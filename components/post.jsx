import { forwardRef, useCallback, useRef } from 'react'
import Image from 'next/image'
import joinClassNames from 'classnames'
import ActionBar from './action-bar'
import Author from './author'
import Location from './location'
import Text from './text'
import TextClamp from './text-clamp'
import styles from '@/styles/post.module.css'
import { formatDate, formatRelativeDate, formatDomain } from '@/utils'

const formatLatitude = value => {
  const dir = ['пн.', '', 'пд.'][Math.sign(value) + 1]
  return `${value.toFixed(4)}°\u00a0${dir ? `${dir}\u202f` : ''}ш.`
}

const formatLongitude = value => {
  const dir = ['зх.', '', 'сх.'][Math.sign(value) + 1]
  return `${value.toFixed(4)}°\u00a0${dir ? `${dir}\u202f` : ''}ш.`
}

const formatLocation = ({ name, latitude, longitude }) =>
  name ?? [formatLatitude(latitude), formatLongitude(longitude)].join(', ')

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
        {data.location ? (
          <Location
            data={{
              main: data.location ? formatLocation(data.location) : null,
              options: data.locations
                .filter(l => l != data.location)
                .map(formatLocation),
            }}
            className={styles.location}
            tag="h2"
          />
        ) : (
          <h2 className={joinClassNames(styles.location, styles.disabled)}>
            Немає гео-мітки
          </h2>
        )}

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
