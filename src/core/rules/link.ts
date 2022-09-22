import type { Rule } from '../../types'
import { obeyForceHtml, toSanitisedHtmlHOF } from '../../utilities'

export const link: Rule = {
    filter: 'a',
    toUseHtmlPredicate: obeyForceHtml,
    replacement: (element) => (innerContent) => {
        const url = element.getAttribute('href') || ''
        return `[${innerContent}](${url})`
    },
    htmlReplacement: (element) => toSanitisedHtmlHOF(element, ['href']),
}
