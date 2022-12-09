import type { Preprocess } from '../../types'
import { addTrailingLinebreaks } from './addTrailingLinebreaks'
import { collapseWhitespace } from './collapseWhitespace'
import { removeEmptyElements } from './removeEmptyElements'

/**
 * Preprocesses are called starting from the FRONT of the array to the back.
 *
 * This is so the newer preprocesses *(added by the user)* that are pushed to
 * the back are ran last \
 * *(as they're probably less important than the default preprocesses)*.
 *
 * _**Note:** This is opposite of rules, which is evaluated starting from the
 * **BACK**._
 */
export const preprocesses: Preprocess[] = [
    collapseWhitespace,
    removeEmptyElements,
    addTrailingLinebreaks,
]
