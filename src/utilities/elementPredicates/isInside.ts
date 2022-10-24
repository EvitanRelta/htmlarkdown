export const isInside =
    (
        ancestorPredicate: (element: Element) => boolean,
        isRootElement?: (element: Element) => boolean
    ) =>
    (element: Element): boolean => {
        if (ancestorPredicate(element)) return true
        if (isRootElement && isRootElement(element)) return false
        return (
            element.parentElement !== null &&
            isInside(ancestorPredicate, isRootElement)(element.parentElement)
        )
    }
