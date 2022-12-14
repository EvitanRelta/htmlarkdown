import type { TextProcess } from '../../types'
import type { ReplacementArray } from './helpers'
import { applyReplacement } from './helpers'

/** Escapings that's applied to text-nodes which are at the start of a block-element. */
const startOfLineEscapings: ReplacementArray = [[/^ /g, '&nbsp;']]

/** Escapings that's applied to text-nodes which encompass an entire block-element. */
const endOfLineEscapings: ReplacementArray = [[/ $/g, '&nbsp;']]

/** Escapings that's applied to every text-node _(except in `code` elements)_. */
const anywhereEscapings: ReplacementArray = [
    ['  ', ' &nbsp;'],
    [/; &nbsp;(\S)/g, ';&nbsp; $1'],
]

/**
 * Minimise the number of `&nbsp;` escapings in consecutive space / `&nbsp`  \
 * characters, to them more readable.  \
 * For example:
 * ```html
 * <p>LONG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SPACE</p>
 * ```
 *
 * Will be converted to this markdown:
 * ```html
 * LONG &nbsp; &nbsp; &nbsp; SPACE
 * ```
 *
 * Notice that the number of `&nbsp;` is minimised, and they're not adjacent   \
 * to any text for maximum readability.  \
 * _(in this case, the text are "LONG" and "SPACE")_
 *
 * _**Note:** REQUIRES non-breaking spaces _(ie. `\u00A0`)_ to be first
 * converted to space `" "`,  \
 * which is currently done by the `escapeSpecialSpaces` text-process._
 */
export const prettifySpaces: TextProcess = (text, textNode, _, parentOptions) => {
    if (!parentOptions.escapeNbsp) return text

    let escaped = text
    if (textNode.previousSibling === null) escaped = applyReplacement(startOfLineEscapings, escaped)
    if (textNode.nextSibling === null) escaped = applyReplacement(endOfLineEscapings, escaped)
    return applyReplacement(anywhereEscapings, escaped)
}
