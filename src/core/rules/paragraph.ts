import { any } from 'predicate-hof'
import type { Rule } from '../../types'
import { hasAnyOfAttributes, obeyForceHtml, toSanitisedHtmlHOF } from '../../utilities'

export const paragraph: Rule = {
    filter: ['p'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => (innerContent) =>
        (['', '<br>'].includes(innerContent) ? '<p><br></p>' : innerContent) + '\n\n',
    htmlReplacement: (element) => (innerContent) =>
        toSanitisedHtmlHOF(element, ['align'])(innerContent || '<br>'),
}
