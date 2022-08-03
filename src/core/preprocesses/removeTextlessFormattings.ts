import { Preprocess } from '../../types'
import { hasNoText } from '../../utilities'

/**
 * Removes any text-formattings _(eg. bold, italic)_ that has no text.
 *
 * _**Warning:** This mutates the original 'container' element._
 */
export const removeTextlessFormattings: Preprocess = (container: Element) => {
    const removeElement = (element: Element) => element.remove()
    const textFormattings = Array.from(container.querySelectorAll('b,strong,i,em'))
    textFormattings.filter(hasNoText).forEach(removeElement)
    return container
}
