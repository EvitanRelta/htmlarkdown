export const hasAnyOfAttributes = (attributes: string[]) => (element: Element) =>
    attributes.some((attr) => element.hasAttribute(attr))
