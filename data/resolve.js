const API_BASE = 'https://geonames.dev.socmonitor.com.ua/api/v1/news'

const resolve = (params = {}) => {
  const {
    since,
    until,
    query,
    limit = 10_000,
    token,
  } = params

  const url = new URL(API_BASE)

  // Configuration
  if (since) url.searchParams.set('start_date', since)
  if (until) url.searchParams.set('end_date', until)
  if (query) url.searchParams.set('text', query)
  if (limit) url.searchParams.set('size', limit)

  // Authorization side-effect
  if (token) url.searchParams.set('access_token', token)

  return url.href
}

export default resolve
