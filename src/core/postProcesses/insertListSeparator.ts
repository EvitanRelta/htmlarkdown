import escapeStringRegexp from 'escape-string-regexp'
import type { PostProcess } from '../../types'
import {
    LIST_SEPARATOR,
    ORDERED_LIST_BOUNDARY,
    UNORDERED_LIST_BOUNDARY,
} from '../rules/listRules/helpers'

const escapedUnorderedBoundary = escapeStringRegexp(UNORDERED_LIST_BOUNDARY)
const escapedOrderedBoundary = escapeStringRegexp(ORDERED_LIST_BOUNDARY)

const isTwoSameBoundary = new RegExp(
    `(${escapedUnorderedBoundary}){2}|(${escapedOrderedBoundary}){2}`,
    'g'
)
const isBoundary = new RegExp(`${escapedUnorderedBoundary}|${escapedOrderedBoundary}`, 'g')

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
