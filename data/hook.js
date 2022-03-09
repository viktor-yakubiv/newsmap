import useSWR from 'swr'
import resolve from './resolve'
import request from './request'
import { transformPost } from './transformers'
import { Post, PostLocation as Location } from './schema'

const transformToSchema = rawPosts => rawPosts
  .map(rawPost => new Post(transformPost(rawPost)))

/**
 * Removes duplicated location objects from response
 * and use the same shared objects in memory for every link.
 */
const unifyData = posts => {
  const uniqueLocations = new Map()

  // Gather unique locations
  posts.flatMap(post => post.locations).forEach(l => {
    const pointKey = l.valueOf()

    const added = uniqueLocations.has(pointKey)
    const lacksId = !uniqueLocations.get(pointKey)?.id
    if (!added || (lacksId && l.id)) {
      uniqueLocations.set(pointKey, new Location(l))
    }
  })

  // Replace all locations in every Post with unique objects
  posts.forEach(p => {
    const uniqueForPost = p.locations.map(l => uniqueLocations.get(l.valueOf()))
    const deduplicated = [...new Set(uniqueForPost)]

    p.locations = deduplicated
  })

  const locations = Array.from(uniqueLocations.values())

  // Link every location to its corresponding set of posts
  locations.forEach(l => {
    const linkedPosts = posts.filter(p => p.locations.includes(l))
    l.posts.push(...linkedPosts)
  })

  return { posts, locations }
}

// When processing combined with the result, SWR memoizes processed data already
const processData = (...args) => request(...args)
  .then(transformToSchema)
  .then(unifyData)

const useData = (parameters) => {
  const url = resolve(parameters)
  return useSWR(url, processData)
}

export default useData
