import type { Preprocess } from '../../types'
import { addTrailingLinebreaks } from './addTrailingLinebreaks'
import { collapseWhitespace } from './collapseWhitespace'
import { removeTextlessFormattings } from './removeTextlessFormattings'

export const preprocesses: Preprocess[] = [
    collapseWhitespace,
    removeTextlessFormattings,
    addTrailingLinebreaks,
]
