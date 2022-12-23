import type { TextNode } from '../../types'

/**
 * Checks if a node is of type `TextNode`, which is a custom subtype of `Text`,
 * but with some properties narrowed down to that of a text-node.
 * @param node Node to check.
 * @returns Whether `node` is of type `TextNode`.
 */
export const isTextNode = (node: Node): node is TextNode => node.nodeType === Node.TEXT_NODE
