import type { Preprocess } from '../../types'
import { addExtraLinebreak } from './addExtraLinebreak'
import { collapseWhitespace } from './collapseWhitespace'
import { removeTextlessFormattings } from './removeTextlessFormattings'

export const preprocesses: Preprocess[] = [
    collapseWhitespace,
    removeTextlessFormattings,
    addExtraLinebreak,
]
