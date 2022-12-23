import type { RuleWithHTML } from '../../../types'
import { obeyForceHtml } from '../../../utilities'

export const bold: RuleWithHTML = {
    filter: ['b', 'strong'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `**${innerContent}**`,
    htmlReplacement: (element) =>
        element.hasAttribute('forcehtml')
            ? {
                  childOptions: { forceHtml: true },
                  value: (innerContent) => `<b>${innerContent}</b>`,
              }
            : (innerContent) => `<b>${innerContent}</b>`,
}
