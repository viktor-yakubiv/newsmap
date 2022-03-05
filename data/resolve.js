const API_BASE = 'https://geonames.dev.socmonitor.com.ua/api/v1/news'

const DURATION_1H = 60 * 60 * 1000 // ms
const DURATION_6H = 6 * DURATION_1H

const PRECISION = 5_000 // ms
const round = t => Math.floor(t / PRECISION) * PRECISION

const resolve = (params = {}) => {
  const now = round(Date.now())
  const {
    // Some precision required to prevent infinite request loop
    since = new Date(now - DURATION_6H).toISOString(),
    until = new Date(now).toISOString(),
    query = '*',
    token,
  } = params

  const url = new URL(API_BASE)

  // Configuration
  url.searchParams.set('from_date', since)
  url.searchParams.set('end_date', until)
  url.searchParams.set('text', query)

  // Authorization side-effect
  if (token) {
    url.searchParams.set('access_token', token)
  }

  return url.href
}

export default resolve
