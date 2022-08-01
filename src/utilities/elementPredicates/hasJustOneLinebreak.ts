export const hasJustOneLinebreak = (element: Element) =>
    element.childNodes.length === 1 && element.firstChild!.nodeName === 'BR'
