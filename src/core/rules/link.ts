import type { Rule } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const link: Rule = {
    filter: 'a',
    toUseHtmlPredicate: obeyForceHtml,
    replacement: (element, options, parentOptions) => (innerContent) => {
        let url = element.getAttribute('href') || ''
        if (options.urlTransformer !== null)
            url = options.urlTransformer(url, element, options, parentOptions)
        return `[${innerContent}](${url})`
    },
    htmlReplacement: (element, options, parentOptions) => (innerContent) => {
        let url = element.getAttribute('href') || ''
        if (options.urlTransformer !== null)
            url = options.urlTransformer(url, element, options, parentOptions)
        return `<a href="${url}">${innerContent}</a>`
    },
}
