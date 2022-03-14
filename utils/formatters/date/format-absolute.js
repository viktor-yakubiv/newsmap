const locale = 'uk-UA' // could be configured in the future

const dateFormat = new Intl.DateTimeFormat(locale, {
  dateStyle: 'long',
  timeStyle: 'short',
})

const formatAbsoluteDate = date => dateFormat.format(date)

export default formatAbsoluteDate
