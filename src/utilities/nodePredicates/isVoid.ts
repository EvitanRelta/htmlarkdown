// prettier-ignore
export const voidTagNames = [
    'AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT',
    'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'
]

/**
 * Checks if a node is a void-element.
 * @param node Node to check.
 * @returns Whether `node` is a void-element.
 */
export const isVoid = (node: Node) => voidTagNames.includes(node.nodeName)
