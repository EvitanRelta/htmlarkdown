import { indent } from './indent'
import { isBlock, isVoid } from './nodePredicates'
import { trimTrailingNewlines } from './trimTrailingNewlines'

export const toSanitisedHtmlHOF = (
    element: Element,
    allowedAttributes: string[],
    addExtraTrailingNewline = true,
    addIndent = true
) => {
    const isAllowed = (attr: Attr) => allowedAttributes.includes(attr.name)
    const sanitisedAttributes = Array.from(element.attributes).filter(isAllowed)
    const attributesStr = sanitisedAttributes
        .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
        .join('')
    const tag = element.tagName.toLowerCase()

    return (content: string = '') =>
        isVoid(element)
            ? `<${tag}${attributesStr} />`
            : !isBlock(element)
            ? `<${tag}${attributesStr}>${content}</${tag}>`
            : content === ''
            ? `<${tag}${attributesStr}>${content}</${tag}>\n` +
              (addExtraTrailingNewline ? '\n' : '')
            : `<${tag}${attributesStr}>\n` +
              (addIndent ? indent(trimTrailingNewlines(content)) : content) +
              `\n</${tag}>\n` +
              (addExtraTrailingNewline ? '\n' : '')
}
