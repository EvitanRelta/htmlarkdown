import type { Preprocess } from '../../types'
import { hasNoText } from '../../utilities'

/**
 * Removes any text-formattings _(eg. bold, italic)_ that has no text.
 *
 * _**Warning:** This mutates the original 'container' element._
 */
export const removeTextlessFormattings: Preprocess = (container) => {
    const removeElement = (element: Element) => element.remove()
    const textFormattings = Array.from(
        container.querySelectorAll('b,strong,i,em,u,ins,s,del,sup,sub')
    )
    textFormattings.filter(hasNoText).forEach(removeElement)
    return container
}
