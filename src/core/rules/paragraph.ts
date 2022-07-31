import type { Rule } from '../../types'
import { hasAnyOfAttributes, isNotEmpty, toSanitizedHtmlHOF } from '../../utilities'

export const paragraph: Rule = {
    filter: ['p', isNotEmpty],
    toUseHtmlPredicate: (element) => hasAnyOfAttributes(element, ['align']),
    replacement: (element) => (innerContent) => innerContent + '\n\n',
    htmlReplacement: (element) => toSanitizedHtmlHOF(element, ['align']),
}
