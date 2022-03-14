const locale = 'uk-UA' // could be configured in the future

const NON_BREAKING_SPACE = '\u00a0'
const NARROW_NON_BREAKING_SPACE = '\u202f'

const integer = Intl.NumberFormat(locale, {
  maximumFractionDigits: 0,
})

export const formatInteger = value => integer.format(value)
  // Non-breaking space prevents numbers from stripping over line
  .replace(/\s/g, NON_BREAKING_SPACE)
