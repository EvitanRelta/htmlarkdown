import type { PreProcess } from '../../types'
import { noopTags } from '../rules/miscRules/noop'

/**
 * Continuously removes elements with no child-nodes *(ie. empty)*, until no
 * more elements are removed.
 *
 * This is to remove any elements containing empty-elements like the below:
 *
 * ```html
 * <b><i></i></b>
 * ```
 *
 * _**Warning:** This mutates the 'container' element parameter._
 */
export const removeEmptyElements: PreProcess = (container) => {
    const removeElement = (element: Element) => element.remove()

    const textFormattingsSelector = 'b,strong,i,em,u,ins,s,del,sup,sub'
    const noopElementsSelector = noopTags.join(',')
    const elementSelector = textFormattingsSelector + ',' + noopElementsSelector
    const hasNoChildNodes = (element: Element) => !element.hasChildNodes()

    let prevNumOfElements = 0
    let elements: Element[] = []
    do {
        elements.filter(hasNoChildNodes).forEach(removeElement)
        prevNumOfElements = elements.length
        elements = Array.from(container.querySelectorAll(elementSelector))
    } while (elements.length !== prevNumOfElements)

    return container
}
