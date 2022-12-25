import type { PostProcess } from '../../types'
import { insertListSeparator } from './insertListSeparator'
import { trimNewlines } from './trimNewlines'

export const postProcesses: PostProcess[] = [insertListSeparator, trimNewlines]
