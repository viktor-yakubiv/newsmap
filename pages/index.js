import Head from 'next/head'
import PostsMap from '../components/map'
import PostCard from '../components/post'
import { useData } from '../data'
import styles from '../styles/app.module.css'

const Home = () => {
  const { data, error } = useData()
  const postGroups = data || []

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
        />

        <div className={styles.content}>
          <ul>
            {postGroups.map(post => (
              <PostCard
                key={post.url}
                data={post}
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
