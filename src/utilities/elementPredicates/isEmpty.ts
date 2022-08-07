import { not } from 'predicate-hof'
import { isNotEmpty } from './isNotEmpty'

export const isEmpty = not(isNotEmpty)
