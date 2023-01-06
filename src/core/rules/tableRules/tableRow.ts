import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasAnyOfAttributes, obeyForceHtml } from '../../../utilities'

export const tableRow: RuleWithHTML = {
    filter: ['tr'],
    toUseHtmlPredicate: any(
        obeyForceHtml,
        hasAnyOfAttributes(['align', 'valign', 'width', 'height'])
    ),
    replacement: () => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => innerContent + '\n',
    }),
    htmlReplacement: () => ({
        childOptions: {
            forceHtml: true,
            escapeHtml: true,
            escapeMarkdown: false,
            isInsideBlockElement: true,
        },
        value: ['align', 'valign', 'width', 'height'],
    }),
}
