import type { PostProcess } from '../../types'
import {
    LIST_SEPARATOR,
    ORDERED_LIST_BOUNDARY,
    UNORDERED_LIST_BOUNDARY,
} from '../rules/listRules/helpers'

const isTwoSameBoundary = new RegExp(
    `(${UNORDERED_LIST_BOUNDARY}){2}|(${ORDERED_LIST_BOUNDARY}){2}`,
    'g'
)
const isBoundary = new RegExp(`${UNORDERED_LIST_BOUNDARY}|${ORDERED_LIST_BOUNDARY}`, 'g')

/**
 * Inserts a string inbetween adjacent lists' markdowns, to prevent them from
 * being combined by markdown-to-HTML renderers.
 *
 * It inserts the separator based on the boundary strings added to the lists'
 * markdowns by the ordered/unordered-lists rules.
 * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/16}
 */
export const insertListSeparator: PostProcess = (rawMarkdown) =>
    rawMarkdown.replaceAll(isTwoSameBoundary, LIST_SEPARATOR).replaceAll(isBoundary, '')
