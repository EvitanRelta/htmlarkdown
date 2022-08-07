import type { TextNode } from '../../types'
import { isBlock } from '../elementPredicates'

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
export const isWholeLine = (textNode: TextNode) =>
    textNode.previousSibling === null &&
    textNode.nextSibling === null &&
    isBlock(textNode.parentElement!)
