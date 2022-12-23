/**
 * Checks if a node is an element.
 * @param node Node to check.
 * @returns Whether `node` is an element.
 */
export const isElement = (node: Node): node is Element => node.nodeType === Node.ELEMENT_NODE
