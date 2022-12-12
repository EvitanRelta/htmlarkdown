import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import { hasAnyOfAttributes, obeyForceHtml, toSanitisedHtmlHOF } from '../../utilities'

export const tableRow: RuleWithHTML = {
    filter: ['tr'],
    toUseHtmlPredicate: any(
        obeyForceHtml,
        hasAnyOfAttributes(['align', 'valign', 'width', 'height'])
    ),
    replacement: () => (innerContent) => innerContent + '\n',
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(
            element,
            ['align', 'valign', 'width', 'height'],
            !parentOptions.isInsideBlockElement
        ),
    }),
}
