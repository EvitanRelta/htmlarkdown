import { any } from 'predicate-hof'
import type { PassDownOptions, Rule, ToUseHtmlPredicate } from '../../../types'
import {
    directChildWillBeHtml,
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../../utilities'

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
        value: (innerContent) =>
            parentOptions.isInsideList
                ? '\n' + trimTrailingNewlines(innerContent)
                : innerContent + '\n',
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: {
            ...getChildOptions(element),
            forceHtml: true,
        },
        value: (innerContent) => {
            const prefix = parentOptions.isInsideList ? '\n' : ''
            const html = toSanitisedHtmlHOF(
                element,
                ['align', 'start', 'type'],
                !parentOptions.isInsideBlockElement
            )(innerContent)
            return prefix + html
        },
    }),
}
