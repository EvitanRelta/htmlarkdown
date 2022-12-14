import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../../types'
import {
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../../utilities'
import { getBlockTrailingNewline } from '../helpers'

export const blockquote: RuleWithHTML = {
    filter: ['blockquote'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: (_, __, parentOptions) => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) =>
            trimTrailingNewlines(innerContent).replaceAll(/^/gm, '> ') +
            getBlockTrailingNewline(parentOptions),
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
