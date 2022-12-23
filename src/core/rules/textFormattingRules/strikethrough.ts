import type { RuleWithHTML } from '../../../types'
import { obeyForceHtml } from '../../../utilities'

export const strikethrough: RuleWithHTML = {
    filter: ['s', 'del'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `~~${innerContent}~~`,
    htmlReplacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<s>${innerContent}</s>`,
              }
            : (innerContent) => `<s>${innerContent}</s>`,
}
