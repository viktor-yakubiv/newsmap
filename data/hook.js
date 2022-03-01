import useSWR from 'swr'
import resolve from './resolve'
import request from './request'
import { transformPost } from './transformers'
import { PostGroup } from './schema'

const useData = (parameters) => {
  const url = resolve(parameters)
  const { data, error } = useSWR(url, request)

  return {
    loading: !data && !error,
    data: (data || [])
      .map(transformPost)
      .map(rawPost => new PostGroup(rawPost)),
    error,
  }
}

export default useData
