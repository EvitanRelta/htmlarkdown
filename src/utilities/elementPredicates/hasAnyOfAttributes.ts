export const hasAnyOfAttributes = (element: Element, attributes: string[]) =>
    attributes.some((attr) => element.hasAttribute(attr))
