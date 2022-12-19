import { not } from 'predicate-hof'
import { isEmpty, isTextNode } from '../../../../utilities'

const hasTextNodeChild = (element: Element) => Array.from(element.childNodes).some(isTextNode)
const isLooseListItem = not(hasTextNodeChild)
const notAllEmpty = (children: Element[]) => children.some(not(isEmpty))

export const isLooseList = (list: Element) => {
    const children = Array.from(list.children)
    return children.every(isLooseListItem) && notAllEmpty(children)
}
