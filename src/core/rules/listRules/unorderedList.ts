import { any } from 'predicate-hof'
import type { PassDownOptions, Rule, ToUseHtmlPredicate } from '../../../types'
import {
    directChildWillBeHtml,
    hasAnyOfAttributes,
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
    replacement: (element, _, parentOptions) => ({
        childOptions: getChildOptions(element),
        value: (innerContent) => {
            const suffix = parentOptions.isInsideList ? '' : '\n\n'
            return trimTrailingNewlines(innerContent) + suffix
        },
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: {
            ...getChildOptions(element),
            forceHtml: true,
        },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
