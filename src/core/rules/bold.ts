import type { RuleWithHTML } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const bold: RuleWithHTML = {
    filter: ['b', 'strong'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `**${innerContent}**`,
    htmlReplacement: () => (innerContent) => `<b>${innerContent}</b>`,
}
