import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import Icon from '@/components/icon'
import Head from 'next/head'
import PostsMap from '@/components/map'
import PostCard from '@/components/post'
import { useData } from '@/data'
import { Location } from '@/data/schema'
import styles from '@/styles/app.module.css'
import { DURATION_DAY } from '@/utils/date/constants'
import { formatInteger } from '@/utils/formatters'

const Home = () => {
  const router = useRouter()
  const token = typeof localStorage != 'undefined'
    ? localStorage.ACCESS_TOKEN
    : router.query.token // backward compatibility
  const { data, error } = useData({ token })
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

  const [highlightedLocations, setHighlightedLocations] = useState([])
  const highlightPost = useCallback((event) => {
    const { id } = event.target.dataset
    const post = posts.find(p => id == p.id)

    if (post != null) {
      setHighlightedLocations([...post.locations])
    }
  }, [posts])

  const clearHighlighting = useCallback(() => {
    setHighlightedLocations([])
  }, [])

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
            markers: locations.map(l => ({
              latitude: l.latitude,
              longitude: l.longitude,
              freshness: l.freshness(DURATION_DAY),
              highlighted: highlightedLocations.includes(l),
              size: l.size,
              name: l.name,
            })),
          }}
          onMarkerClick={handleMarkerClick}
        />

        <main className={styles.content}>
          <header className={styles.header}>
            {selectedLocation ? (
              <>
                <div className={styles.headerButton}>
                  <button onClick={clearLocationSelection}>
                    <Icon {...arrowLeft} /> до всіх
                  </button>
                </div>
                <div>
                    <h1>{selectedLocation}</h1>
                    <p>
                      {formatInteger(filteredPosts.length)}
                      {' '}із&nbsp;
                      {formatInteger(posts.length)}
                    </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1>Усі</h1>
                  <p>
                    {formatInteger(posts.length)}
                  </p>
                </div>
              </>
            )}
          </header>

          <ul className={styles.list}>
            {(filteredPosts ?? posts).map(post => (
              <PostCard
                key={post.valueOf()}
                data={post}
                data-id={post.id}
                onMouseEnter={highlightPost}
                onMouseLeave={clearHighlighting}
                tag="li"
              />
            ))}
          </ul>
        </main>
      </div>
    </>
  )
}

export default Home
