import joinClassNames from 'classnames'

const Post = ({ data, className, tag: Tag = 'div' }) => (
  <Tag className={joinClassNames(className)}>
    <h2>{data.title}</h2>
    <p>{data.body}</p>
    <p>{data.locations.map(l => l.title).join('; ')}</p>
  </Tag>
)

export default Post
