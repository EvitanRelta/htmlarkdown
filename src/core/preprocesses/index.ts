import type { Preprocess } from '../../types'
import { addExtraLinebreak } from './addExtraLinebreak'
import { removeTextlessFormattings } from './removeTextlessFormattings'

export const preprocesses: Preprocess[] = [removeTextlessFormattings, addExtraLinebreak]
