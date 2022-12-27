import type { PreProcess } from '../../types'
import { addTrailingLinebreaks } from './addTrailingLinebreaks'
import { collapseWhitespace } from './collapseWhitespace'
import { removeEmptyElements } from './removeEmptyElements'

/**
 * Pre-processes are evaluated starting from the **BACK** of the array to the
 * front.
 *
 * This is so the newer pre-processes *(added by the user)* can be pushed to
 * the back and prioritised.
 */
export const preProcesses: PreProcess[] = [
    addTrailingLinebreaks,
    removeEmptyElements,
    collapseWhitespace,
]
