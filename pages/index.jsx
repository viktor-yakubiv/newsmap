import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PostsMap from '../components/map'
import PostCard from '../components/post'
import { useData } from '../data'
import { Location } from '../data/schema'
import styles from '../styles/app.module.css'
import { DURATION_DAY } from '../utils/date/constants'

const Home = () => {
  const router = useRouter()
  const { data, error } = useData({ token: router.query.token })
  const { posts = [], locations = [] } = data ?? {}

  const [selectedLocation, setSelectedLocation] = useState(null)
  const handleMarkerClick = useCallback(({ latitude, longitude }) => {
    const key = Location.prototype.toString.call([latitude, longitude])
    const location = locations.find(location => key == location)
    setSelectedLocation(location ?? null)
  }, [locations])

  const clearLocationSelection = useCallback(() => {
    setSelectedLocation(null)
  }, [])

  const filteredPosts = selectedLocation ? posts.filter(p => p.locations.includes(selectedLocation)) : null

  // TODO: Remove when decided; not used due to rendering issues
  const [highlightedLocations, setHighlightedPost] = useState(null)
  // const highlightedLocations = posts
  //   .find(({ id }) => id === highlightedPostId)
  //   ?.locations.map(({ id }) => id)

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
            {(filteredPosts ?? posts).map(post => (
              <PostCard
                key={post.valueOf()}
                data={post}
                data-id={post.id}
                tag="li"
              />
            ))}
          </ul>

          {filteredPosts && (
            <button onClick={clearLocationSelection}>
              Видалити фільтр
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
