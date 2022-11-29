import { any } from 'predicate-hof'
import type { PassDownOptions, Rule } from '../../../types'
import {
    hasAnyOfAttributes,
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
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
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
            const prefix = parentOptions.isInsideList ? '\n' : ''
            const html = toSanitisedHtmlHOF(
                element,
                ['align'],
                !parentOptions.isInsideBlockElement
            )(innerContent)
            return prefix + html
        },
    }),
}
