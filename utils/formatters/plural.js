const locale = 'uk-UA' // could be configured in the future

const plural = new Intl.PluralRules(locale)

export const selectPlural = (number, map) => {
  const rule = plural.select(number)
  return (map instanceof Map)
    ? map.get(rule) ?? map.get('other')
    : map[rule] ?? map['other']
}
