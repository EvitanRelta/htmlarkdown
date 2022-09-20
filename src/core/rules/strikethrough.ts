import type { Rule } from '../../types'
import { obeyForceHtml } from '../../utilities'

export const strikethrough: Rule = {
    filter: ['s', 'del'],
    toUseHtmlPredicate: obeyForceHtml,
    replacement: () => (innerContent) => `~~${innerContent}~~`,
    htmlReplacement: () => (innerContent) => `<s>${innerContent}</s>`,
}
