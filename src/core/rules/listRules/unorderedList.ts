import { any } from 'predicate-hof'
import type { PassDownOptions, Rule, ToUseHtmlPredicate } from '../../../types'
import {
    directChildWillBeHtml,
    hasAnyOfAttributes,
    obeyForceHtml,
    trimTrailingNewlines,
} from '../../../utilities'
import { isLooseList, UNORDERED_LIST_BOUNDARY } from './helpers'

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
            if (parentOptions.isInsideList) return trimTrailingNewlines(innerContent)
            /**
             * These boundary strings will be used by the 'insertListSeparator'
             * post-process to identify where to insert separators to
             * separate adjacent lists.
             * @see {@link https://github.com/EvitanRelta/htmlarkdown/issues/16}
             */
            const prefix = UNORDERED_LIST_BOUNDARY
            const suffix = '\n\n' + UNORDERED_LIST_BOUNDARY
            return prefix + trimTrailingNewlines(innerContent) + suffix
        },
    }),
    htmlReplacement: (element) => ({
        childOptions: {
            ...getChildOptions(element),
            forceHtml: true,
            escapeHtml: true,
            escapeMarkdown: false,
        },
        value: ['align'],
    }),
}
