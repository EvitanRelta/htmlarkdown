import type { Preprocess } from '../../types'
import { hasOnlyLinebreaks } from '../../utilities'

/**
 * Adds an extra linebreak to elements containing only linebreaks,
 * as GitHub's markdown renderer removes one in that situation.
 *
 * _**Warning:** This mutates the original 'container' element._
 */
export const addExtraLinebreak: Preprocess = (container: Element) => {
    const insertLineBreak = (element: Element) => element.append(document.createElement('br'))
    const elements = Array.from(container.querySelectorAll('li,p,h1,h2,h3,h4,h5,h6'))
    elements.filter(hasOnlyLinebreaks).forEach(insertLineBreak)
    return container
}
