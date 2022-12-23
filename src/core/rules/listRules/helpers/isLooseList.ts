import { not } from 'predicate-hof'
import { isEmpty, isTextNode } from '../../../../utilities'

const hasTextNodeChild = (element: Element) => Array.from(element.childNodes).some(isTextNode)
const isLooseListItem = not(hasTextNodeChild)
const notAllEmpty = (children: Element[]) => children.some(not(isEmpty))

/**
 * Return `true` if the list-element is a [loose-list][loose],  \
 * and `false` if the list-element is a [tight-list][tight].
 *
 * [loose]: https://github.github.com/gfm/#loose
 * [tight]: https://github.github.com/gfm/#tight
 * @param list The list-element to check.
 * @returns Whether `list` is a loose-list.
 */
export const isLooseList = (list: Element) => {
    const children = Array.from(list.children)
    return children.every(isLooseListItem) && notAllEmpty(children)
}
