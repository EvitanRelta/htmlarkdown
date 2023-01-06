import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasAnyOfAttributes, obeyForceHtml } from '../../../utilities'

export const tableCell: RuleWithHTML = {
    filter: ['th', 'td'],
    toUseHtmlPredicate: any(
        obeyForceHtml,
        hasAnyOfAttributes(['colspan', 'rowspan', 'scope', 'align', 'valign', 'width', 'height'])
    ),
    replacement: () => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => innerContent + ' | ',
    }),
    htmlReplacement: () => ({
        childOptions: {
            forceHtml: true,
            escapeHtml: true,
            escapeMarkdown: false,
            isInsideBlockElement: true,
        },
        value: ['colspan', 'rowspan', 'scope', 'align', 'valign', 'width', 'height'],
    }),
}
