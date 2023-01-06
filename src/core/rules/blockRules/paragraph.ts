import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasAnyOfAttributes, obeyForceHtml } from '../../../utilities'

export const paragraph: RuleWithHTML = {
    filter: ['p'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => (innerContent ? innerContent + '\n\n' : ''),
    }),
    htmlReplacement: () => ({
        childOptions: {
            forceHtml: true,
            escapeHtml: true,
            escapeMarkdown: false,
            isInsideBlockElement: true,
        },
        value: ['align'],
    }),
}
