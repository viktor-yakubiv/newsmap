import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PostsMap from '../components/map'
import PostCard from '../components/post'
import { useData } from '../data'
import styles from '../styles/app.module.css'

const Home = () => {
  const router = useRouter()
  const { data, error } = useData({ token: router.query.token })
  const postGroups = data || []

  const [selectedPostId, setSelectedPost] = useState(null)
  const handleMarkerClick = useCallback((id) => setSelectedPost(id), [])

  useEffect(() => {
    document.querySelector(`[data-id="${selectedPostId}"]`)?.scrollIntoView()
  }, [selectedPostId])

  return (
    <>
      <Head>
        <title>Новини</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <PostsMap
          className={styles.map}
          data={postGroups.flatMap(p => p.expand())}
          onMarkerClick={handleMarkerClick}
        />

        <div className={styles.content}>
          <ul>
            {postGroups.map(post => (
              <PostCard
                key={post.url}
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
