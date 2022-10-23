// prettier-ignore
const voidTagNames = [
    'AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT',
    'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'
]

export const isVoid = (element: Element) => voidTagNames.includes(element.tagName)
