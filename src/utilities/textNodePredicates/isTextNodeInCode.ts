import type { TextNode } from '../../types'
import { isInCode } from '../elementPredicates'

/**
 * Checks whether the text-node is in a `code` element, either as a direct
 * child or a nested child.
 *
 * Used in text-processes, as text inside `code` are usually not escaped.
 *
 * Example:
 * - Text-node _`A`_ in _`<p><code>A</code>B</p>`_ is true, but _`B`_ is false.
 * - Nested text-node in _`<code><b>A</b></code>`_ is true.
 */
export const isTextNodeInCode = (textNode: TextNode) => isInCode(textNode.parentElement!)
