import { Rule } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const bold: Rule = {
    filter: ['b', 'strong'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `**${innerContent}**`,
    htmlReplacement: () => (innerContent) => `<b>${innerContent}</b>`,
}
