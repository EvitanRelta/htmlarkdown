import { any } from 'predicate-hof'
import type { RuleWithHTML } from '../../types'
import {
    hasAnyOfAttributes,
    obeyForceHtml,
    toSanitisedHtmlHOF,
    trimTrailingNewlines,
} from '../../utilities'

export const blockquote: RuleWithHTML = {
    filter: ['blockquote'],
    toUseHtmlPredicate: any(obeyForceHtml, hasAnyOfAttributes(['align'])),
    replacement: () => ({
        childOptions: { isInsideBlockElement: true },
        value: (innerContent) =>
            trimTrailingNewlines(innerContent).replaceAll(/^/gm, '> ') + '\n\n',
    }),
    htmlReplacement: (element, _, parentOptions) => ({
        childOptions: { forceHtml: true, isInsideBlockElement: true },
        value: toSanitisedHtmlHOF(element, ['align'], !parentOptions.isInsideBlockElement),
    }),
}
