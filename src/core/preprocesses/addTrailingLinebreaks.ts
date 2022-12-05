import { any } from 'predicate-hof'
import type { Preprocess } from '../../types'
import { isBlock, isEmpty } from '../../utilities'

const hasTrailingLinebreak = (element: Element) => element.lastChild?.nodeName === 'BR'

/**
 * Inserts a linebreak inside block-elements that are either empty or end with
 * a linebreak.
 *
 * Without this, for example, the HTML-rendering of empty paragraphs/headings
 * might have `0` height _(as it's empty)_;  \
 * and paragraphs/headings ending with a linebreak might not render the last
 * linebreak.
 *
 * _**Warning:** This mutates the original 'container' element._
 */
export const addTrailingLinebreaks: Preprocess = (container) => {
    const insertLineBreak = (element: Element) => element.append(document.createElement('br'))
    const allBlockElements = Array.from(container.querySelectorAll('*')).filter(isBlock)
    allBlockElements.filter(any(isEmpty, hasTrailingLinebreak)).forEach(insertLineBreak)
    return container
}
