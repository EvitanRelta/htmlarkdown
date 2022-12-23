import type { RuleWithHTML } from '../../../types'
import { obeyForceHtml } from '../../../utilities'

export const italic: RuleWithHTML = {
    filter: ['i', 'em'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `*${innerContent}*`,
    htmlReplacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<i>${innerContent}</i>`,
              }
            : (innerContent) => `<i>${innerContent}</i>`,
}
