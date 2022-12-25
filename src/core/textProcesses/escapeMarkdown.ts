import type { TextNode, TextProcess } from '../../types'
import { isBlock } from '../../utilities'
import type { ReplacementArray } from './helpers'
import { applyReplacement } from './helpers'

/**
 * Escapings that's applied to every text-node _(except in `code` elements)_.
 *
 * Example:
 * - _`<p># h1<br></p>`_ matches, but _`<p><br># h1</p>`_ doesn't.
 * - _`<p># h1</p>`_ matches, but _`<p><b># h1</b></p>`_ doesn't _(`b` isn't a block element)_.
 */
const anywhereEscapings: ReplacementArray = [
    [/\\/g, '\\\\'], // backslash itself
    [/(&[#a-z0-9]+;)/gi, '\\$1'], // HTML encoded characters
    [/(<(!--|\/?[a-z]))/gi, '\\$1'], // HTML tags

    [/(\[|\])/g, '\\$1'], // links, images, tick-boxes, footnotes, reference-style links

    // Might be modified by 'wholeLineEscapings' below.
    [/`/g, '\\`'], // codes
    [/~/g, '\\~'], // strikethroughs
    [/\_/g, '\\_'], // bolds, italics
    [/\*/g, '\\*'], // bolds, italics, unordered list-items (asterisk)
]

/**
 * Escapings that's applied to text-nodes which are at the start of a block-element.
 *
 * Example:
 * - _`<p># h1<br></p>`_ matches, but _`<p><br># h1</p>`_ doesn't.
 * - _`<p># h1</p>`_ matches, but _`<p><b># h1</b></p>`_ doesn't _(`b` isn't a block element)_.
 */
const startOfLineEscapings: ReplacementArray = [
    [/^(\+|-) /g, '\\$1 '], // unordered list-items ('*' syntax already escaped in 'notWholeLineEscapings')
    [/^(#{1,6} )/g, '\\$1'], // atx-style headings
    [/^>/g, '\\>'], // blockquotes
    [/^(\d+)\. /g, '$1\\. '], // ordered list-items
]

/**
 * Replacer callback used in the `wholeLineEscapings` array below.
 * - Replaces `\*\*\*` with `\***`
 * - Replaces `\*\*` with `**`
 */
const reduceEscapingCallback = (match: string) => {
    const prefix = hasThreeOrMoreEscapedChars(match) ? '\\' : ''
    return prefix + match.replaceAll('\\', '')
}
const hasThreeOrMoreEscapedChars = (match: string) => match.length >= 6

/**
 * Escapings that's applied to text-nodes which encompass an entire block-element.
 *
 * Example:
 * - _`<p>==</p>`_ matches, but _`<p>=<b>=</b></p>`_ doesn't.
 * - _`<p>#</p>`_ matches, but _`<p>#<br></p>`_ and _`<p><b>#</b></p>`_doesn't _(`b` isn't a block element)_.
 */
const wholeLineEscapings: ReplacementArray = [
    [/^(=+)$/g, '\\$1'], // setext-style level-1 headings
    [/^(-+)$/g, '\\$1'], // empty unordered list-items (dash), setext-style level-2 headings,
    [/^\+$/g, '\\+'], // empty unordered list-items (plus)
    [/^(#{1,6})$/g, '\\$1'], // empty atx-style headings
    [/^(\d+)\.$/g, '$1\\.'], // empty ordered list-items

    // Remove unnecessary escaping by 'anywhereEscapings'.
    [/^((\\`)+|(\\~)+)$/g, reduceEscapingCallback], // fenced-codeblocks
    [/^((\\_)+|(\\\*)+)$/g, reduceEscapingCallback], // horizontal rules ('-' syntax already escaped above in 'wholeLineEscapings')
]

/**
 * Checks whether the text-node is at the start of a block-element.
 *
 * Used in text-processes to check if the text will be at the start of a line
 * in the markdown output.
 *
 * Example:
 * - Text-node _`A`_ in _`<p>A<br>B</p>`_ is true, but _`B`_ is false.
 * - Text-node in _`<p>A</p>`_ is true, but in _`<p><br>A</p>`_ it's false.
 * - It's also false in _`<p><em>A</em></p>` (`em` is not a block element)_.
 */
const isStartOfLine = (textNode: TextNode) =>
    textNode.previousSibling === null && isBlock(textNode.parentElement!)

/**
 * Checks whether the text-node encompasses an entire block-element.
 *
 * Used in text-processes to check if the text will encompass an entire line in
 * the markdown output.
 *
 * Example:
 * - Text-node(s) in _`<p>AB</p>`_ is true, but in _`<p>A<b>B</b></p>`_ they're false.
 * - Text-node in _`<p>A</p>`_ is true, but in _`<p>A<br></p>`_ it's false.
 * - It's also false in _`<p><em>A</em></p>` (`em` is not a block element)_.
 */
const isWholeLine = (textNode: TextNode) =>
    textNode.previousSibling === null &&
    textNode.nextSibling === null &&
    isBlock(textNode.parentElement!)

/**
 * Escape markdown patterns in the text.  \
 * For example:
 * ```html
 * <p># _Not header nor italised_</p>
 * ```
 * Is escaped to this markdown:
 * ```md
 * \# \_Not header nor italised\_
 * ```
 * Controlled by the `PassDownOptions.escapeMarkdown` option.
 */
export const escapeMarkdown: TextProcess = (text, textNode, _, parentOptions) => {
    if (!parentOptions.escapeMarkdown) return text

    let escaped = applyReplacement(anywhereEscapings, text)
    if (isStartOfLine(textNode)) escaped = applyReplacement(startOfLineEscapings, escaped)
    if (isWholeLine(textNode)) escaped = applyReplacement(wholeLineEscapings, escaped)
    return escaped
}
