import { any } from 'predicate-hof'
import type { TagName, TextProcess } from '../../types'
import { isBlock, isElement, isInside, isVoid } from '../../utilities'

const isBr = (node: Node) => node.nodeName === 'BR'
const hasText = (node: Node) => Boolean(node.textContent)
const startsWithWhitespace = (text: string) => Boolean(/^[ \t\r\n]/.exec(text))
const endsWithWhitespace = (text: string) => Boolean(/[ \t\r\n]$/.exec(text))
const hasNonWhitespaceText = (node: Node) =>
    node.textContent !== null && Boolean(/[^ \t\r\n]/.exec(node.textContent))

/**
 * Checks if leading-whitespace should be collapsed into a space, or removed
 * completely (ie. for whitespaces at the ends).
 *
 * Trailing space takes precedence (eg. `<p>TRAILING <b> LEADING</b></p>`
 * collapses to `<p>TRAILING <b>LEADING</b></p>`).
 */
const toRemoveLeadingSpace = (node: Node): boolean => {
    // Stop checking once it hits a block element.
    if (isElement(node) && isBlock(node)) return true

    // Check incase it's a nested element (eg. `<p>SIBLING <em><b> NESTED_TARGET</b></em></p>`).
    if (!node.previousSibling) return toRemoveLeadingSpace(node.parentElement!)

    // Don't remove if it's after a non-BR void element (eg. `<img />`).
    // Remove if its a BR (eg. `<p>SHOULDN'T HAVE SPACES <br> AROUND BR</p>`).
    if (isElement(node.previousSibling) && isVoid(node.previousSibling))
        return isBr(node.previousSibling)

    // Ignore sibling if its empty.
    if (!hasText(node.previousSibling)) return toRemoveLeadingSpace(node.previousSibling)

    // Else, remove if prev. sibling has trailing space (eg. `<p>SIBLING <b> TARGET</b></p>`).
    return endsWithWhitespace(node.previousSibling.textContent!)
}

/**
 * Checks if trailing-whitespace should be collapsed into a space, or removed
 * completely (ie. for whitespaces at the ends).
 *
 * Trailing space takes precedence (eg. `<p>TRAILING <b> LEADING</b></p>`
 * collapses to `<p>TRAILING <b>LEADING</b></p>`).
 */
const toRemoveTrailingSpace = (node: Node): boolean => {
    // Stop checking once it hits a block element.
    if (isElement(node) && isBlock(node)) return true

    // Check incase it's a nested element (eg. `<p><em><b>NESTED_TARGET </b></em> SIBLING</p>`).
    if (!node.nextSibling) return toRemoveTrailingSpace(node.parentElement!)

    // Don't remove if it's before a non-BR void element (eg. `<img />`).
    // Remove if its a BR (eg. `<p>SHOULDN'T HAVE SPACES <br> AROUND BR</p>`).
    if (isElement(node.nextSibling) && isVoid(node.nextSibling)) return isBr(node.nextSibling)

    // Ignore sibling if its empty or only has whitespaces.
    if (!hasNonWhitespaceText(node.nextSibling)) return toRemoveTrailingSpace(node.nextSibling)

    // Don't remove if sibling isn't empty.
    return false
}

export const collapseWhitespace: TextProcess = (text, textNode, options) => {
    if (options.elementsNoWhitespaceCollapse === 'all') return text

    const isTag = (tag: TagName) => (element: Element) => element.tagName === tag.toUpperCase()
    const isInsideAnyNoCollapseElement = any(
        ...options.elementsNoWhitespaceCollapse.map((tag) => isInside(isTag(tag)))
    )
    if (isInsideAnyNoCollapseElement(textNode.parentElement!)) return text

    let escaped = text

    if (startsWithWhitespace(text))
        escaped = escaped.replaceAll(/^[ \t\r\n]+/g, toRemoveLeadingSpace(textNode) ? '' : ' ')

    if (endsWithWhitespace(text))
        escaped = escaped.replaceAll(/[ \t\r\n]+$/g, toRemoveTrailingSpace(textNode) ? '' : ' ')

    escaped = escaped.replaceAll(/[ \t\r\n]+/g, ' ')
    return escaped
}
