import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import { hasAnyOfAttributes, obeyForceHtml, toSanitisedHtmlHOF } from '../../utilities'
import { BR_TAG_STR } from './linebreak'

export const paragraph: RuleWithHTML = {
    filter: ['p'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => (innerContent) => innerContent ? innerContent + '\n\n' : '',
    htmlReplacement: (element) => ({
        childOptions: { forceHtml: true },
        value: (innerContent) => toSanitisedHtmlHOF(element, ['align'])(innerContent || BR_TAG_STR),
    }),
}
