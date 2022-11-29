// prettier-ignore
const voidTagNames = [
    'AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT',
    'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'
]

export const isVoid = (node: Node) => voidTagNames.includes(node.nodeName)
