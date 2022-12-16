import type { MergeWithCustomizer } from 'lodash'
import _ from 'lodash'

const overwriteArrays: MergeWithCustomizer = (_, src2) => (Array.isArray(src2) ? src2 : undefined)

/** Like lodash's `_.merge`, but overwrites array values. */
// @ts-ignore
export const mergeOverwriteArray: typeof _.merge = (...args) =>
    _.mergeWith(
        // @ts-ignore
        ...args,
        overwriteArrays
    )
