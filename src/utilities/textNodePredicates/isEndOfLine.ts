import type { TextNode } from '../../types'
import { isBlock } from '../elementPredicates'

/**
 * Checks whether the text-node is at the end of a block-element.
 *
 * Used in text-processes to check if the text will be at the end of a line in
 * the markdown output.
 *
 * Example:
 * - Text-node _`B`_ in _`<p>A<br>B</p>`_ is true, but _`A`_ is false.
 * - Text-node in _`<p>A</p>`_ is true, but in _`<p>A<br></p>`_ it's false.
 * - It's also false in _`<p><em>A</em></p>` (`em` is not a block element)_.
 */
export const isEndOfLine = (textNode: TextNode) =>
    textNode.nextSibling === null && isBlock(textNode.parentElement!)
