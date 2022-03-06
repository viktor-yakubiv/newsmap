import {
  LOCALE,
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
} from './constants'

const locale = LOCALE // could be configured in the future

const relativeTimeFormat = new Intl.RelativeTimeFormat(locale)

const extraReplacements = new Map([
  [locale, [
    [/\b1\s/, ''],
    [/\b0\s(\w+)s/, 'менше, ніж $1'],
  ]],
])

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

export default formatRelativeDate
