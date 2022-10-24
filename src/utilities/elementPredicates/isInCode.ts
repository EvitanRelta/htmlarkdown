import { isInside } from './isInside'

const isCode = (element: Element) => element.tagName === 'CODE'

export const isInCode = isInside(isCode)
