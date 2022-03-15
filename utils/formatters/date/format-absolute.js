const locale = 'uk-UA' // could be configured in the future

const formats = new Map([
  ['long', new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
  })],
  ['short', new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })],
])

const formatAbsoluteDate = (date, { style = 'short' } = {}) =>
  formats.get(style).format(date)

export default formatAbsoluteDate
