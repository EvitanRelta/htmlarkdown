import type { PostProcess } from '../../types'
import { insertListSeparator } from './insertListSeparator'
import { trimNewlines } from './trimNewlines'
import { unindentCodeblocks } from './unindentCodeblocks'

export const postProcesses: PostProcess[] = [insertListSeparator, trimNewlines, unindentCodeblocks]
