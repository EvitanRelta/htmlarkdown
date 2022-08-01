import type { Preprocess } from '../../types'
import { addExtraLinebreak } from './addExtraLinebreak'

export const preprocesses: Preprocess[] = [addExtraLinebreak]
