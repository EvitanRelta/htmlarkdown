import type { TextNode } from '../../types'
import { isBlock } from '../nodePredicates'

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
export const isStartOfLine = (textNode: TextNode) =>
    textNode.previousSibling === null && isBlock(textNode.parentElement!)
