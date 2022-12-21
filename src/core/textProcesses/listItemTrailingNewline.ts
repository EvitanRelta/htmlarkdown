import type { TextProcess } from '../../types'

const isListItem = (element: Element) => element.tagName === 'LI'
const isList = (element: Element) => ['UL', 'OL'].includes(element.tagName)

/**
 * Without this text-process, this HTML:
 * ```html
 * <ul>
 *   <li>
 *     List-item
 *     <h1>Heading in list-item</h1>
 *   <li>
 * </ul>
 * ```
 *
 * Will be converted to this:
 * ```md
 * - List-item# Heading in list-item
 * ```
 *
 * Instead of this:
 * ```md
 * - List-item
 *   # Heading in list-item
 * ```
 * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/18}
 */
export const listItemTrailingNewline: TextProcess = (text, textNode, _, parentOptions) => {
    if (isListItem(textNode.parentElement!) && textNode.nextElementSibling) {
        const isTightList = !parentOptions.isLooseList
        const suffix =
            parentOptions.forceHtml || isTightList || isList(textNode.nextElementSibling)
                ? '\n'
                : '\n\n'
        return text + suffix
    }
    return text
}
