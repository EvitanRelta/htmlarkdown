import { not } from 'predicate-hof'
import type { Rule } from '../../types'
import { hasAnyOfAttributes, hasJustOneLinebreak, toSanitisedHtmlHOF } from '../../utilities'

export const paragraph: Rule = {
    filter: ['p', not(hasJustOneLinebreak)],
    toUseHtmlPredicate: (element) => hasAnyOfAttributes(element, ['align']),
    replacement: () => (innerContent) => innerContent + '\n\n',
    htmlReplacement: (element) => toSanitisedHtmlHOF(element, ['align']),
}
