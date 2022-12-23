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

export const prettifySpaces: TextProcess = (text, textNode, _, parentOptions) => {
    if (!parentOptions.escapeNbsp) return text

    let escaped = text
    if (textNode.previousSibling === null) escaped = applyReplacement(startOfLineEscapings, escaped)
    if (textNode.nextSibling === null) escaped = applyReplacement(endOfLineEscapings, escaped)
    return applyReplacement(anywhereEscapings, escaped)
}
