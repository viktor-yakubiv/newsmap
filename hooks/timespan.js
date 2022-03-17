import { useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  floorTime,
} from '@/utils/date'

const units = new Map([
  ['h', DURATION_HOUR],
  ['d', DURATION_DAY],
  ['w', DURATION_WEEK],
])

const parseValue = value => {
  const unit = value.slice(-1)
  const unitMultiplier = units.get(unit)

  const number = parseInt(value, 10)
  const timeSpan = number * unitMultiplier
  return timeSpan
}

const selectClosestOption = (timeSpan, options) => {
  const candidates = options.map(v => Math.abs(parseValue(v) - timeSpan))
  const initialValueIndex = candidates.indexOf(Math.min(...candidates))
  return options[initialValueIndex]
}

const useTimeSpan = () => {
  const router = useRouter()
  
  const options = ['1h', '3h', '6h', '12h', '1d', '1w']
  const currentTimeSpan = router.query.since
    ? Date.now() - new Date(router.query.since)
    : DURATION_DAY

  const initialValue = selectClosestOption(currentTimeSpan, options)

  const selectTimeSpan = useCallback((event) => {
    const { value } = event.target
    const newTimeSpan = parseValue(value)
    const timeStamp = floorTime(Date.now() - newTimeSpan, DURATION_MINUTE)
    const newSince = new Date(timeStamp).toISOString()

    const targetUrl = new URL(window.location)
    targetUrl.searchParams.set('since', newSince)

    router.replace(targetUrl)
  }, [router])

  return [initialValue, selectTimeSpan]
}

export default useTimeSpan
