import useSWR from 'swr'
import { PostGroup } from './schema'

const API_BASE = '/api/sample'
const fetcher = (...args) => fetch(...args).then(res => res.json())

const transformLocation = ({ lat, lon, text }) => ({
  latitude: lat,
  longitude: lon,
  title: text,
})

const transform = ({ title, text, url, datetime, geo_coordinates, }) => ({
  url,
  title,
  body: text,
  publicationDate: datetime,
  locations: geo_coordinates.map(transformLocation),
})

const useData = () => {
  const { data, error } = useSWR(API_BASE, fetcher)

  if (error) return {
    error,
    data: [],
  }

  if (data) return {
    data: data.map(transform).map(init => new PostGroup(init)),
    error: null,
  }

  return {
    data: null,
    error: null,
  }
}

export default useData
