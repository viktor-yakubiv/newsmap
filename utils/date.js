const LOCALE = 'uk-UA'

const DURATION_SECOND = 1000 // ms
const DURATION_MINUTE = 60 * DURATION_SECOND
const DURATION_HOUR = 60 * DURATION_MINUTE
const DURATION_DAY = 24 * DURATION_HOUR
const DURATION_WEEK = 7 * DURATION_DAY
const DURATION_MONTH = 30 * DURATION_DAY
const DURATION_YEAR = 365 * DURATION_DAY

const locale = LOCALE // could be configured in the future

const dateFormat = new Intl.DateTimeFormat(locale, {
  dateStyle: 'long',
  timeStyle: 'short',
})

const relativeTimeFormat = new Intl.RelativeTimeFormat(locale)

const extraReplacements = new Map([
  [locale, [
    [/\b1\s/, ''],
    [/\b0\s(\w+)s/, 'менше, ніж $1'],
  ]],
])

const formatDate = date => dateFormat.format(date)

const formatRelativeDate = (target) => {
  const diff = target - Date.now()
  const candidates = ([
    [diff / DURATION_YEAR, 'years'],
    [diff / DURATION_MONTH, 'months'],
    [diff / DURATION_WEEK, 'weeks'],
    [diff / DURATION_DAY, 'days'],
    [diff / DURATION_HOUR, 'hours'],
    [diff / DURATION_MINUTE, 'minutes'],
    [diff / DURATION_SECOND, 'seconds'],
  ])
    .map(([value, unit]) => [Math.floor(Math.abs(value)), unit])

  const [value, unit] = candidates.find(([value]) => value) ??
    candidates[candidates.length - 1]
  const raw = relativeTimeFormat.format(Math.sign(diff) * value, unit)

  return (extraReplacements.get(locale) ?? [])
    // Runs generic replacements
    .reduce((s, [test, update]) => s.replace(test, update), raw)
    // Prevents breaking number from the unit adding a non-breaking space after
    .replace(/\b(\d+)\s/g, '$1\xa0')
    // Prevents floating articles or preposition in the end of the line
    .replace(/(in|a)\s/g, '$1\xa0')
}

export {
  formatDate,
  formatRelativeDate,
}
