import { isBlock, isEmpty } from './elementPredicates'
import { indent } from './indent'

export const toSanitisedHtmlHOF = (
    element: Element,
    allowedAttributes: string[],
    addIndent = true
) => {
    const sanitisedAttributes = Array.from(element.attributes).filter((attribute) =>
        allowedAttributes.includes(attribute.name)
    )
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
