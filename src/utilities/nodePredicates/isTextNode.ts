import type { TextNode } from '../../types'

export const isTextNode = (node: Node): node is TextNode => node.nodeType === Node.TEXT_NODE
