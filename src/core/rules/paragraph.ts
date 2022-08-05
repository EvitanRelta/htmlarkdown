import type { Rule } from '../../types'
import { hasAnyOfAttributes, hasJustOneLinebreak, toSanitisedHtmlHOF } from '../../utilities'

export const paragraph: Rule = {
    filter: ['p', (ele) => !hasJustOneLinebreak(ele)],
    toUseHtmlPredicate: (element) => hasAnyOfAttributes(element, ['align']),
    replacement: () => (innerContent) => innerContent + '\n\n',
    htmlReplacement: (element) => toSanitisedHtmlHOF(element, ['align']),
}
