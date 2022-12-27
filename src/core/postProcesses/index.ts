import type { PostProcess } from '../../types'
import { insertListSeparator } from './insertListSeparator'
import { trimNewlines } from './trimNewlines'

/**
 * Post-processes are evaluated starting from the **BACK** of the array to the
 * front.
 *
 * This is so the newer post-processes *(added by the user)* can be pushed to
 * the back and prioritised.
 */
export const postProcesses: PostProcess[] = [trimNewlines, insertListSeparator]
