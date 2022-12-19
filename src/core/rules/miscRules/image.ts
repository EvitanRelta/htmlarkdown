import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasAnyOfAttributes, obeyForceHtml } from '../../../utilities'

export const image: RuleWithHTML = {
    filter: ['img'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['height', 'width'])),
    replacement: (element, options, parentOptions) => {
        const alt = element.getAttribute('alt') || ''
        let src = element.getAttribute('src') || ''
        if (options.urlTransformer !== null)
            src = options.urlTransformer(src, element, options, parentOptions)
        return alt || src ? `![${alt}](${src})` : ''
    },
    htmlReplacement: (element, options, parentOptions) => {
        const allowedAttributes = ['alt', 'height', 'width']
        const sanitisedAttributes = Array.from(element.attributes).filter((attribute) =>
            allowedAttributes.includes(attribute.name)
        )
        const attributesStr = sanitisedAttributes
            .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
            .join('')

        let src = element.getAttribute('src') || ''
        if (options.urlTransformer !== null)
            src = options.urlTransformer(src, element, options, parentOptions)
        return `<img${attributesStr} src="${src}" />`
    },
}
