import type { Rule } from '../../types'
import { hasAnyOfAttributes, hasJustOneLinebreak, toSanitizedHtmlHOF } from '../../utilities'

export const paragraph: Rule = {
    filter: ['p', (ele) => !hasJustOneLinebreak(ele)],
    toUseHtmlPredicate: (element) => hasAnyOfAttributes(element, ['align']),
    replacement: (element) => (innerContent) => innerContent + '\n\n',
    htmlReplacement: (element) => toSanitizedHtmlHOF(element, ['align']),
}
