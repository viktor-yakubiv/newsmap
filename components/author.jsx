import { forwardRef } from 'react'
import joinClassNames from 'classnames'
import styles from '@/styles/author.module.css'
import { formatInteger, selectPlural } from '@/utils/formatters'

const subscriberPluralMap = {
  one: 'підписник',
  two: 'підписники',
  few: 'підписники',
  other: 'підписників',
}

const Author = forwardRef(
  ({ data, className, tag: Tag = 'div', ...restProps }, ref) => (
    <Tag
      ref={ref}
      className={joinClassNames(styles.container, className)}
      {...restProps}
    >
      <img
        className={styles.avatar}
        src={data.avatarUrl}
        alt=""
        width={32}
        htight={32}
      />

      <p className={styles.content}>
        <span className={styles.name}>{data.name}</span>
        <span className={styles.conjunction}> — </span>
        {data.followersCount >= 0 && (
          <span className={styles.meta}>
            {formatInteger(data.followersCount)}
            &nbsp;
            {selectPlural(data.followersCount, subscriberPluralMap)}
          </span>
        )}
      </p>
    </Tag>
  )
)

Author.displayName = 'Author'

export default Author
