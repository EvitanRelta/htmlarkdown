import { any } from 'predicate-hof'
import type { Rule } from '../../../types'
import {
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../../utilities'

/** Indents all lines except the first. */
const indentAllExceptFirstLine = (str: string, indentSize: number) =>
    str.replaceAll(/(\n)/g, '$1' + ' '.repeat(indentSize))

export const listItem: Rule = {
    filter: ['li'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: (element, __, parentOptions) => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) => {
            const trimmedContent = trimTrailingNewlines(innerContent)

            if (!parentOptions.isOrderedList)
                return `- ${indentAllExceptFirstLine(trimmedContent, 2)}\n`

            const childIndex = Array.from(element.parentElement!.children).indexOf(element)
            const prefix = String(parentOptions.olStartingNum + childIndex)
            const indentSize = prefix.length + 2
            return `${prefix}. ${indentAllExceptFirstLine(trimmedContent, indentSize)}\n`
        },
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
