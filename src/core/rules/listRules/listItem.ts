import { any } from 'predicate-hof'
import type { Rule } from '../../../types'
import { hasAnyOfAttributes, indent, obeyForceHtml, toSanitisedHtmlHOF } from '../../../utilities'

export const listItem: Rule = {
    filter: ['li'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: (_, __, parentOptions) => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) =>
            parentOptions.isOrderedList
                ? `1. ${indent(innerContent, 3).replace(/^ {3}/, '')}\n`
                : `- ${indent(innerContent, 2).replace(/^ {2}/, '')}\n`,
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
