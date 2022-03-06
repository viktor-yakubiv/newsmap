/*!
 * Calculates the freshness of the passed date, comparing the difference
 * between now and the date to maximum expected.
 *
 * In the result, 0 means not fresh at all, 1 means the most fresh date.
 *
 * For example, we expect all events happening in last 24 hours,
 * i.e. we pass `maxDuration = 24 * 60 * 60 * 1000` ms.
 * If we pass a date 12 hours old, we expect the freshness to be 0.5.
 * If we pass a date 3 hours old, we expect the freshness to be 0.875.
 * Respectively, 0 seconds old results in 1.0 freshness.
 *
 * If the `maxDuration` is not passed, it defaults to 24 hours.
 * Events, older than the `maxDuration` are clamped to 0.
 */
import { DURATION_DAY } from './constants'

const calcFreshness = (date, maxDuration = DURATION_DAY) =>
  1 - Math.min(1, (Date.now() - date.getTime()) / maxDuration)

export default calcFreshness
