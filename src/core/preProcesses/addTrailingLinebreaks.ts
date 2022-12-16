import { all, any } from 'predicate-hof'
import type { PreProcess } from '../../types'
import { isBlock, isEmpty } from '../../utilities'

const hasTrailingLinebreak = (element: Element) => element.lastChild?.nodeName === 'BR'
const isNotPre = (element: Element) => element.tagName !== 'PRE'

/**
 * Inserts a linebreak inside block-elements that are either empty or end with
 * a linebreak.
 *
 * Without this, for example, the HTML-rendering of empty paragraphs/headings
 * might have `0` height _(as it's empty)_;  \
 * and paragraphs/headings ending with a linebreak might not render the last
 * linebreak.
 *
 * Controlled by `HTMLarkdownOptions.addTrailingLinebreak`.
 *
 * _**Warning:** This mutates the original 'container' element._
 */
export const addTrailingLinebreaks: PreProcess = (container, options) => {
    if (!options.addTrailingLinebreak) return container

    const insertLineBreak = (element: Element) => element.append(document.createElement('br'))
    const allNonPreBlockElements = Array.from(container.querySelectorAll('*')).filter(
        all(isBlock, isNotPre)
    )
    allNonPreBlockElements.filter(any(isEmpty, hasTrailingLinebreak)).forEach(insertLineBreak)
    return container
}
