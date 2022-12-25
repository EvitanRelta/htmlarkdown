import type { ContentAddonFunction } from '../types'
import { indentExceptHtmlCodeblocks } from './indentExceptHtmlCodeblocks'
import { isBlock, isVoid } from './nodePredicates'
import { trimTrailingNewlines } from './trimTrailingNewlines'

/**
 * Higher-order-function to generate the HTML-syntax of most rules.
 * @param element The element
 * @param allowedAttributes The attributes to include.
 * @param addExtraTrailingNewline Whether to additional trailing-newlines.
 * @param addIndent Whether to add indents to the output string.
 * @returns A `ContentAddonFunction` which returns the HTML-syntax of the element.
 */
export const toSanitisedHtmlHOF = (
    element: Element,
    allowedAttributes: string[],
    addExtraTrailingNewline = true,
    addIndent = true
): ContentAddonFunction => {
    const isAllowed = (attr: Attr) => allowedAttributes.includes(attr.name)
    const sanitisedAttributes = Array.from(element.attributes).filter(isAllowed)
    const attributesStr = sanitisedAttributes
        .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
        .join('')
    const tag = element.tagName.toLowerCase()
    const hasNoAttributes = attributesStr === ''
    const hasNoNewline = (str: string) => !/\n/.test(str)

    return (content: string = '') =>
        isVoid(element)
            ? `<${tag}${attributesStr} />`
            : !isBlock(element)
            ? `<${tag}${attributesStr}>${content}</${tag}>`
            : content === '' || (hasNoAttributes && hasNoNewline(content))
            ? `<${tag}${attributesStr}>${content}</${tag}>\n` +
              (addExtraTrailingNewline ? '\n' : '')
            : `<${tag}${attributesStr}>\n` +
              (addIndent ? indentExceptHtmlCodeblocks(trimTrailingNewlines(content)) : content) +
              `\n</${tag}>\n` +
              (addExtraTrailingNewline ? '\n' : '')
}
