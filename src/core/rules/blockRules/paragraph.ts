import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasAnyOfAttributes, obeyForceHtml, toSanitisedHtmlHOF } from '../../../utilities'

export const paragraph: RuleWithHTML = {
    filter: ['p'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => (innerContent ? innerContent + '\n\n' : ''),
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
