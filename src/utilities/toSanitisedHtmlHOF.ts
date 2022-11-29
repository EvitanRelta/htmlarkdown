import { isEmpty } from './elementPredicates'
import { indent } from './indent'
import { isBlock } from './nodePredicates'

export const toSanitisedHtmlHOF = (
    element: Element,
    allowedAttributes: string[],
    addIndent = true
) => {
    const isAllowed = (attr: Attr) => allowedAttributes.includes(attr.name)
    const sanitisedAttributes = Array.from(element.attributes).filter(isAllowed)
    const attributesStr = sanitisedAttributes
        .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
        .join('')
    const tag = element.tagName.toLowerCase()

    return (content: string = '') =>
        isEmpty(element)
            ? `<${tag}${attributesStr} />`
            : isBlock(element)
            ? `<${tag}${attributesStr}>\n` +
              (addIndent ? indent(content) : content) +
              `\n</${tag}>\n\n`
            : `<${tag}${attributesStr}>${content}</${tag}>`
}
