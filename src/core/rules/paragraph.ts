import { any, not } from 'predicate-hof'
import type { Rule } from '../../types'
import {
    hasAnyOfAttributes,
    hasJustOneLinebreak,
    obeyForceHtml,
    toSanitisedHtmlHOF,
} from '../../utilities'

export const paragraph: Rule = {
    filter: ['p', not(hasJustOneLinebreak)],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => (innerContent) => innerContent + '\n\n',
    htmlReplacement: (element) => toSanitisedHtmlHOF(element, ['align']),
}
