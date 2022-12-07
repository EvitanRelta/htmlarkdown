import type { Postprocess } from '../../types'
import { trimNewlines } from './trimNewlines'
import { unindentCodeblocks } from './unindentCodeblocks'

export const postprocesses: Postprocess[] = [trimNewlines, unindentCodeblocks]
