import { any } from 'predicate-hof'
import type { Rule } from '../../types'
import { hasAnyOfAttributes, obeyForceHtml, toSanitisedHtmlHOF } from '../../utilities'
import { BR_TAG_STR } from './linebreak'

export const paragraph: Rule = {
    filter: ['p'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => (innerContent) =>
        (['', BR_TAG_STR].includes(innerContent) ? `<p>${BR_TAG_STR}</p>` : innerContent) + '\n\n',
    htmlReplacement: (element) => ({
        childOptions: { forceHtml: true },
        value: (innerContent) => toSanitisedHtmlHOF(element, ['align'])(innerContent || BR_TAG_STR),
    }),
}
