const isCode = (element: Element) => element.tagName === 'CODE'

export const isInCode = (
    element: Element,
    isRootElement?: (element: Element) => boolean
): boolean => {
    if (isCode(element)) return true
    if (isRootElement && isRootElement(element)) return false
    return element.parentElement !== null && isInCode(element.parentElement)
}
