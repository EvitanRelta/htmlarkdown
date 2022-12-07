import { any } from 'predicate-hof'
import type { Rule } from '../../../types'
import { hasAnyOfAttributes, indent, obeyForceHtml, toSanitisedHtmlHOF } from '../../../utilities'

export const listItem: Rule = {
    filter: ['li'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: (element, __, parentOptions) => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => {
            if (!parentOptions.isOrderedList)
                return `- ${indent(innerContent, 2).replace(/^ {2}/, '')}\n`

            const childIndex = Array.from(element.parentElement!.children).indexOf(element)
            const prefix = String(parentOptions.olStartingNum + childIndex)
            const indentSize = prefix.length + 2
            return `${prefix}. ${indent(innerContent, indentSize).replace(
                new RegExp(`^ {${indentSize}}`),
                ''
            )}\n`
        },
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
