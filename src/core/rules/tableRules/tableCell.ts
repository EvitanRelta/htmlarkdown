import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import { hasAnyOfAttributes, obeyForceHtml, toSanitisedHtmlHOF } from '../../../utilities'

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
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(
            element,
            ['colspan', 'rowspan', 'scope', 'align', 'valign', 'width', 'height'],
            !parentOptions.isInsideBlockElement
        ),
    }),
}
