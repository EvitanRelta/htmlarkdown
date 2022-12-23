/**
 * A higher-order-function that returns a element-predicate to check if an
 * element has any of the specified attributes.
 * @param attributes The attributes to check for.
 * @returns An element-predicate that returns `true` if the element has any
 * attributes found in `attributes`.
 */
export const hasAnyOfAttributes = (attributes: string[]) => (element: Element) =>
    attributes.some((attr) => element.hasAttribute(attr))
