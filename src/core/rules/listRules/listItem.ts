import { any } from 'predicate-hof'
import type { Rule } from '../../../types'
import {
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../../utilities'
import { getBlockTrailingNewline } from '../helpers'

/** Indents all lines except the first. */
const indentAllExceptFirstLine = (str: string, indentSize: number) =>
    str.replaceAll(/(\n)/g, '$1' + ' '.repeat(indentSize))

export const listItem: Rule = {
    filter: ['li'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: (element, _, parentOptions) => ({
        childOptions: {
            isInsideBlockElement: true,
            /**
             * To produce the markdown:
             * ```
             * - Item 1
             * - <p>Item 2</p>
             * - Item 3
             * ```
             */
            forceHtml: !parentOptions.isLooseList && element.firstChild?.nodeName === 'P',
        },
        value: (innerContent) => {
            const trimmedContent = trimTrailingNewlines(innerContent)
            const trailingNewline = getBlockTrailingNewline(parentOptions)

            if (!parentOptions.isOrderedList)
                return `- ${indentAllExceptFirstLine(trimmedContent, 2)}` + trailingNewline

            const childIndex = Array.from(element.parentElement!.children).indexOf(element)
            const prefix = String(parentOptions.olStartingNum + childIndex)
            const indentSize = prefix.length + 2
            return (
                `${prefix}. ${indentAllExceptFirstLine(trimmedContent, indentSize)}` +
                trailingNewline
            )
        },
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: {
            forceHtml: true,
            escapeHtml: true,
            escapeMarkdown: false,
            isInsideBlockElement: true,
        },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
