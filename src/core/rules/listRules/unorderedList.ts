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
import { isLooseList } from './helpers'

const getChildOptions = (element: Element): Partial<PassDownOptions> => ({
    isOrderedList: false,
    isInsideBlockElement: true,
    isInsideList: true,
    isLooseList: isLooseList(element),
})

export const unorderedList: Rule = {
    filter: ['ul'],
    toUseHtmlPredicate: any<Parameters<ToUseHtmlPredicate>>(
        obeyForceHtml,
        hasAnyOfAttributes(['align']),
        (element, ...rest) => directChildWillBeHtml(getChildOptions(element))(element, ...rest)
    ),
    replacement: (element, __, parentOptions) => ({
        childOptions: getChildOptions(element),
        value: (innerContent) =>
            parentOptions.isInsideList
                ? '\n' + trimTrailingNewlines(innerContent)
                : trimTrailingNewlines(innerContent) + '\n\n',
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: {
            ...getChildOptions(element),
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
