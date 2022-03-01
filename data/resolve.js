const EXAMPLE_BASE = 'https://example.com'
const API_BASE = '/api/sample'

const DURATION_1H = 60 * 60 * 1000 // ms
const DURATION_6H = 6 * DURATION_1H

const resolve = ({
    // Some precision required to prevent infinite request loop
    since = Math.floor((Date.now() - DURATION_6H) / 5_000) * 5_000,
  } = {}) => {
  const url = new URL(API_BASE, EXAMPLE_BASE)
  url.searchParams.set('since', since)

  return url.href.slice(EXAMPLE_BASE.length)
}

export default resolve
