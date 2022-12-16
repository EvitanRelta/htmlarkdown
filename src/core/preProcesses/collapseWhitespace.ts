import { any } from 'predicate-hof'
import type { HTMLarkdownOptions, PreProcess, TagName, TextNode } from '../../types'
import { isBlock, isInside, isTextNode, isVoid } from '../../utilities'

const isBr = (node: Node) => node.nodeName === 'BR'
const startsWithWhitespace = (text: string) => Boolean(/^[ \t\r\n]/.exec(text))
const endsWithWhitespace = (text: string) => Boolean(/[ \t\r\n]$/.exec(text))
const hasNonWhitespace = (text: string) => Boolean(/[^ \t\r\n]/.exec(text))

/** Gets the most deeply-nested last-child. */
const getNestedLastChild = (node: Node): Node =>
    node.lastChild === null ? node : getNestedLastChild(node.lastChild)
/**
 * Gets the predecessor text-node/child-less-element in the DOM tree.
 * Only checks within the block-element ancestor.
 * Also, stops when the previous-sibling node is a block element.
 */
const getPredecessor = (node: Node): Node | null =>
    node.previousSibling !== null
        ? isBlock(node.previousSibling)
            ? null
            : getNestedLastChild(node.previousSibling)
        : node.parentElement === null || isBlock(node.parentElement)
        ? null
        : getPredecessor(node.parentElement)

/** Gets the most deeply-nested first-child. */
const getNestedFirstChild = (node: Node): Node =>
    node.firstChild === null ? node : getNestedFirstChild(node.firstChild)
/**
 * Gets the successor text-node/child-less-element in the DOM tree.
 * Only checks within the block-element ancestor.
 * Also, stops when the next-sibling node is a block element.
 */
const getSuccessor = (node: Node): Node | null =>
    node.nextSibling !== null
        ? isBlock(node.nextSibling)
            ? null
            : getNestedFirstChild(node.nextSibling)
        : node.parentElement === null || isBlock(node.parentElement)
        ? null
        : getSuccessor(node.parentElement)

/**
 * Checks if leading-whitespace should be collapsed into a space, or removed
 * completely (ie. for whitespaces at the ends).
 *
 * Trailing space takes precedence (eg. `<p>TRAILING <b> LEADING</b></p>`
 * collapses to `<p>TRAILING <b>LEADING</b></p>`).
 */
const toRemoveLeadingSpace = (node: Node | null): boolean => {
    // ie. No parent element or parent is a block element.
    if (node === null) return true

    if (isTextNode(node))
        return hasNonWhitespace(node.nodeValue)
            ? // Remove if its before a text-node ending with whitespace.
              endsWithWhitespace(node.nodeValue)
            : // Since the text-node doesn't have non-whitespace, it'll be
              // fully removed. Thus, recurse on its predecessor.
              toRemoveLeadingSpace(getPredecessor(node))

    // If it's not a text-node, assume it's an element.
    const element = node as Element
    return isVoid(element)
        ? // Don't remove if it's before a non-BR void element (eg. `<img />`).
          // Remove if its a BR (eg. `<p>SHOULDN'T HAVE SPACES <br> AROUND BR</p>`).
          isBr(element)
        : // Since it's not a void element, it must be a child-less element.
          // Thus, ignore it and recurse on its predecessor.
          toRemoveLeadingSpace(getPredecessor(node))
}

/**
 * Checks if trailing-whitespace should be collapsed into a space, or removed
 * completely (ie. for whitespaces at the ends).
 *
 * Trailing space takes precedence (eg. `<p>TRAILING <b> LEADING</b></p>`
 * collapses to `<p>TRAILING <b>LEADING</b></p>`).
 */
const toRemoveTrailingSpace = (node: Node | null): boolean => {
    // ie. No parent element.
    if (node === null) return true

    if (isTextNode(node))
        return hasNonWhitespace(node.nodeValue)
            ? // As long as it's after a text-node with non-whitespace, don't remove.
              false
            : // Since the text-node doesn't have non-whitespace, it'll be
              // fully removed. Thus, recurse on its successor.
              toRemoveTrailingSpace(getSuccessor(node))

    // If it's not a text-node, assume it's an element.
    const element = node as Element
    return isVoid(element)
        ? // Don't remove if it's after a non-BR void element (eg. `<img />`).
          // Remove if its a BR (eg. `<p>SHOULDN'T HAVE SPACES <br> AROUND BR</p>`).
          isBr(element)
        : // Since it's not a void element, it must be a child-less element.
          // Thus, ignore it and recurse on its successor.
          toRemoveTrailingSpace(getSuccessor(node))
}

/** Previous collapse-whitespace implementation, which was a text-process. */
const collapseWhitespaceTextProcess = (
    text: string,
    textNode: TextNode,
    options: HTMLarkdownOptions
) => {
    if (options.elementsNoWhitespaceCollapse === 'all') return text

    const isTag = (tag: TagName) => (element: Element) => element.tagName === tag.toUpperCase()
    const isInsideAnyNoCollapseElement = any(
        ...options.elementsNoWhitespaceCollapse.map((tag) => isInside(isTag(tag)))
    )
    if (isInsideAnyNoCollapseElement(textNode.parentElement!)) return text

    let escaped = text

    if (startsWithWhitespace(text)) {
        const toRemove = toRemoveLeadingSpace(getPredecessor(textNode))
        escaped = escaped.replaceAll(/^[ \t\r\n]+/g, toRemove ? '' : ' ')
    }

    if (endsWithWhitespace(text)) {
        const toRemove = toRemoveTrailingSpace(getSuccessor(textNode))
        escaped = escaped.replaceAll(/[ \t\r\n]+$/g, toRemove ? '' : ' ')
    }

    escaped = escaped.replaceAll(/[ \t\r\n]+/g, ' ')
    return escaped
}

const getNextTextNode = (node: Node): TextNode | null => {
    if (node.nextSibling !== null) {
        const nestedFirstChild = getNestedFirstChild(node.nextSibling)
        return isTextNode(nestedFirstChild) ? nestedFirstChild : getNextTextNode(nestedFirstChild)
    }
    if (node.parentElement === null) return null
    return getNextTextNode(node.parentElement)
}

/**
 * Collapses whitespaces in text-nodes in all elements except those defined in
 * `HTMLarkdownOptions.elementsNoWhitespaceCollapse`
 *
 * _**Warning:** This mutates the original 'container' element._
 */
export const collapseWhitespace: PreProcess = (container, options) => {
    if (options.elementsNoWhitespaceCollapse === 'all') return container

    const startNode = getNestedFirstChild(container)
    let textNode = isTextNode(startNode) ? startNode : getNextTextNode(startNode)
    while (textNode !== null) {
        const nextTextNode = getNextTextNode(textNode)
        const collapsedValue = collapseWhitespaceTextProcess(textNode.nodeValue, textNode, options)

        if (collapsedValue === '') textNode.remove()
        else textNode.nodeValue = collapsedValue

        textNode = nextTextNode
    }
    return container
}
