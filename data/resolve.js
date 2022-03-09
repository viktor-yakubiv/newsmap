import { DURATION_MINUTE, DURATION_DAY } from '../utils/date/constants'

const API_BASE = 'https://geonames.dev.socmonitor.com.ua/api/v1/news'

// Indicates how often the new data is loaded
// It should be large enough to prevent the application flickering
// but small enough so the user gets fresh data;
// the user won't see any post for the latest time period set below
// — see how `round()` works and `until` parameter.
const PRECISION = 5 * DURATION_MINUTE // ms

const round = t => Math.floor(t / PRECISION) * PRECISION

const resolve = (params = {}) => {
  const now = round(Date.now())
  const {
    // Some precision required to prevent infinite request loop
    since = new Date(now - DURATION_DAY).toISOString(),
    until = new Date(now).toISOString(),
    query,
    token,
  } = params

  const url = new URL(API_BASE)

  // Configuration
  if (since) url.searchParams.set('from_date', since)
  if (until) url.searchParams.set('end_date', until)
  if (query) url.searchParams.set('text', query)

  // Authorization side-effect
  if (token) url.searchParams.set('access_token', token)

  return url.href
}

export default resolve
