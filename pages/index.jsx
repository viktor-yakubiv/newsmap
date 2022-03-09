import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PostsMap from '../components/map'
import PostCard from '../components/post'
import { useData } from '../data'
import styles from '../styles/app.module.css'
import { DURATION_DAY } from '../utils/date/constants'

const Home = () => {
  const router = useRouter()
  const { data, error } = useData({ token: router.query.token })
  const { posts = [], locations = [] } = data ?? {}

  const [selectedPostId, setSelectedPost] = useState(null)
  const handleMarkerClick = useCallback((id) => setSelectedPost(id), [])

  useEffect(() => {
    document.querySelector(`[data-id="${selectedPostId}"]`)?.scrollIntoView()
  }, [selectedPostId])

  // TODO: Remove when decided; not used due to rendering issues
  const [highlightedPostId, setHighlightedPost] = useState(null)
  const highlightedLocations = posts
    .find(({ id }) => id === highlightedPostId)
    ?.locations.map(({ id }) => id)

  return (
    <>
      <Head>
        <title>Новини</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <PostsMap
          className={styles.map}
          data={{
            locations: locations.map(l => ({
              key: l.valueOf(),
              latitude: l.latitude,
              longitude: l.longitude,
              freshness: l.freshness(DURATION_DAY),
              size: l.size,
              name: l.name,
            })),
            highlighted: highlightedLocations,
          }}
          onMarkerClick={handleMarkerClick}
        />

        <div className={styles.content}>
          <ul>
            {posts.map(post => (
              <PostCard
                key={post.valueOf()}
                data={post}
                data-id={post.id}
                active={selectedPostId === post.id}
                tag="li"
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home
