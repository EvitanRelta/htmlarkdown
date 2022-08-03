export const hasLeadingTrailingSpaces = (element: Element) =>
    element.textContent !== null && /^\s|\s$/.test(element.textContent)
