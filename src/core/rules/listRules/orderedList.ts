import { any } from 'predicate-hof'
import type { PassDownOptions, Rule, ToUseHtmlPredicate } from '../../../types'
import {
    directChildWillBeHtml,
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../../utilities'
import { isLooseList, ORDERED_LIST_BOUNDARY } from './helpers'

const isSublistWithStart: ToUseHtmlPredicate = (element, _, parentOptions) => {
    if (!parentOptions.isInsideList) return false

    const startAttribute = element.getAttribute('start')
    if (startAttribute === null) return false
    if (parseInt(startAttribute) === 1) return false
    return true
}
const getChildOptions = (element: Element): Partial<PassDownOptions> => {
    const startAttribute = element.getAttribute('start')
    return {
        isOrderedList: true,
        isInsideBlockElement: true,
        isInsideList: true,
        olStartingNum:
            startAttribute !== null && !isNaN(parseInt(startAttribute))
                ? parseInt(startAttribute)
                : 1,
        isLooseList: isLooseList(element),
    }
}

export const orderedList: Rule = {
    filter: ['ol'],
    toUseHtmlPredicate: any<Parameters<ToUseHtmlPredicate>>(
        obeyForceHtml,
        hasAnyOfAttributes(['align', 'type']),
        isSublistWithStart,
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
            const prefix = ORDERED_LIST_BOUNDARY
            const suffix = '\n\n' + ORDERED_LIST_BOUNDARY
            return prefix + trimTrailingNewlines(innerContent) + suffix
        },
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: {
            ...getChildOptions(element),
            forceHtml: true,
            escapeHtml: true,
            escapeMarkdown: false,
        },
        value: toSanitisedHtmlHOF(
            element,
            ['align', 'start', 'type'],
            !parentOptions.isInsideBlockElement
        ),
    }),
}
