const isLineBreak = (element: Node) => element.nodeName === 'BR'

export const hasOnlyLinebreaks = (element: Element) =>
    Array.from(element.childNodes).every(isLineBreak)
