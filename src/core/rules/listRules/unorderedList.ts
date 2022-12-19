import { any } from 'predicate-hof'
import type { PassDownOptions, Rule, ToUseHtmlPredicate } from '../../../types'
import {
    directChildWillBeHtml,
    hasAnyOfAttributes,
    isTextNode,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../../utilities'

const childOptions: Partial<PassDownOptions> = {
    isOrderedList: false,
    isInsideBlockElement: true,
    isInsideList: true,
}

export const unorderedList: Rule = {
    filter: ['ul'],
    toUseHtmlPredicate: any<Parameters<ToUseHtmlPredicate>>(
        obeyForceHtml,
        hasAnyOfAttributes(['align']),
        directChildWillBeHtml(childOptions)
    ),
    replacement: (_, __, parentOptions) => ({
        childOptions,
        value: (innerContent) =>
            parentOptions.isInsideList
                ? '\n' + trimTrailingNewlines(innerContent)
                : innerContent + '\n',
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: {
            ...childOptions,
            forceHtml: true,
        },
        value: (innerContent) => {
            const isAfterTextNode = element.previousSibling && isTextNode(element.previousSibling)
            const prefix = parentOptions.isInsideList && isAfterTextNode ? '\n' : ''
            const html = toSanitisedHtmlHOF(
                element,
                ['align'],
                !parentOptions.isInsideBlockElement
            )(innerContent)
            return prefix + html
        },
    }),
}
