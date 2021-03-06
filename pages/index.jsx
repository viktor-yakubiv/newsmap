import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import Icon from '@/components/icon'
import Head from 'next/head'
import PostCard from '@/components/post'
import { useData } from '@/data'
import { Location } from '@/data/schema'
import styles from '@/styles/app.module.css'
import { DURATION_DAY } from '@/utils/date'
import { formatInteger, formatDate } from '@/utils/formatters'
import { MapView } from '@/views'
import { typography } from '@/styles'
import { useTimeSpan } from '@/hooks'

const generateTitle = ({ since, count }) => [
  'Новини',
  since ? `від ${formatDate(new Date(since))}` : 'за останню добу',
  count != null && `– ${formatInteger(count)} результатів`,
].filter(v => v).join(' ')

const useAccessToken = () => {
  const router = useRouter()
  return typeof localStorage != 'undefined'
    ? localStorage.ACCESS_TOKEN
    : router.query.token // backward compatibility
}

const useQuery = () => {
  const router = useRouter()
  const { since, until } = router.query
  return { since, until }
}

const HomePage = () => {
  const token = useAccessToken()
  const query = useQuery()
  const { data, error } = useData({ ...query, token })
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

  const markers = locations.map(l => ({
    latitude: l.latitude,
    longitude: l.longitude,
    freshness: l.freshness(DURATION_DAY),
    status:
      l === selectedLocation ? 'active' :
      highlightedLocations.includes(l) ? 'highlighted' :
      'normal',
    size: l.size,
    name: l.name,
  }))

  const [timeSpanValue, selectTimeSpan] = useTimeSpan()

  return (
    <>
      <Head>
        <title>
          {generateTitle({
            since: query.since,
            count: posts.length,
          })}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MapView markers={markers} onMarkerClick={handleMarkerClick}>
        <header className={styles.header}>
          {selectedLocation && (
            <div className={styles.headerButton}>
              <button onClick={clearLocationSelection}>
                <Icon {...arrowLeft} /> до всіх
              </button>
            </div>
          )}

          <div>
            <h1 className={typography.h3}>
              {
                selectedLocation
                  ? (selectedLocation.name ?? selectedLocation.toString())
                  : 'Усі'
              }
            </h1>

            <p>
              {filteredPosts && `${formatInteger(filteredPosts.length)} із\u00a0`}
              {formatInteger(posts.length)}
              {query.since && ` від\u00a0${formatDate(new Date(query.since))}`}
            </p>
          </div>

          <div>
            <label htmlFor="time-span">
              Часовий проміжок
            </label>
            <select
              id="time-span"
              value={timeSpanValue}
              onChange={selectTimeSpan}
            >
              <option value="1h">Останню годину</option>
              <option value="3h">Останні 3 години</option>
              <option value="6h">6 годин</option>
              <option value="12h">12 годин</option>
              <option value="1d">добу</option>
              <option value="1w">тиждень</option>
            </select>
          </div>
        </header>

        {(filteredPosts ?? posts).map(post => (
          <PostCard
            key={post.valueOf()}
            data={post}
            data-id={post.id}
            onMouseEnter={highlightPost}
            onMouseLeave={clearHighlighting}
            tag="section"
          />
        ))}
      </MapView>
    </>
  )
}

export default HomePage
