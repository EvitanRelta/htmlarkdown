import type { Postprocess } from '../../types'
import { trimNewlines } from './trimNewlines'

export const postprocesses: Postprocess[] = [trimNewlines]
