import type { LoDashStatic, MergeWithCustomizer } from 'lodash'
import _ from 'lodash'

const overwriteArrays: MergeWithCustomizer = (_, src2) => (Array.isArray(src2) ? src2 : undefined)

/**
 * Like lodash's `_.merge`, but overwrites array values instead of merging them.
 *
 * @example
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * mergeOverwriteArray(users, ages);
 * // => { 'data': [{ 'age': 36 }, { 'age': 40 }] }
 */
// @ts-ignore
export const mergeOverwriteArray: LoDashStatic['merge'] = (...args) =>
    _.mergeWith(
        // @ts-ignore
        ...args,
        overwriteArrays
    )
