import type { PostProcess } from '../../types'
import { trimNewlines } from './trimNewlines'
import { unindentCodeblocks } from './unindentCodeblocks'

export const postProcesses: PostProcess[] = [trimNewlines, unindentCodeblocks]
